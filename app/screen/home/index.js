/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Drawer from 'react-native-drawer-menu';
import STRING from '../../res/string';
import Header from './header';
import CameraItem from './camera';
import CameraRepository from '../../repository/camera';
import THEME from '../../res/theme';
import {isIphoneX} from '../../utils';
import Api from '../../api';
import DrawerContent from './drawer';
import {
  navigateToCamera,
  navigateToAddCameraScanQRCode,
} from '../../common/router';
import MemHelper from './memhelper';
import lodash from 'lodash';

const PRESENT_ITEM_TYPE = {
  FOLDER: 1,
  FILE: 2,
  CAMERA: 3,
};

export default class Home extends Component {
  static navigationOptions = {header: null};

  allData = null;
  allCamera = null;

  api = Api.instance();
  cameraRepository = CameraRepository.instance();

  state = {
    refreshing: false,
    allData: null,
    presentList: null,
    selected: null,
    showBack: false,
    headerTitle: STRING.welcome,
  };

  constructor(props) {
    super(props);

    this.api.getCameraList().then(res => {
      const presentList = res.elements.map(e => {
        return {
          id: e.cameraCode,
          parentId: e.parentId,
          url: e.cameraStreamUrl,
          name: e.name,
          type: PRESENT_ITEM_TYPE.CAMERA,
          isOnline: e.online && !e.offline,
        };
      });

      this.allCamera = lodash.sortBy(presentList, 'name', 'asc');

      this.setState({presentList: this.getPresentList()});
    });

    this.api.getCameraList(true).then(res => {
      const presentList = res.elements.map(e => {
        return {
          id: e.cameraCode,
          parentId: e.parentId,
          url: e.cameraStreamUrl,
          name: e.name,
          type: PRESENT_ITEM_TYPE.CAMERA,
          isOnline: e.online && !e.offline,
        };
      });

      this.allCamera = lodash.sortBy(presentList, 'name', 'asc');
    });

    this.api.getFolder().then(res => {
      const presentList = res.elements.map(e => {
        let type = PRESENT_ITEM_TYPE.FOLDER;

        if (e.camera === true) {
          type = PRESENT_ITEM_TYPE.CAMERA;
        } else if (e.file === true) {
          type = PRESENT_ITEM_TYPE.FILE;
        }

        const parentId = e.parentId;

        return {
          id: e.id,
          name: e.name,
          parentId,
          type,
        };
      });

      this.allData = lodash.sortBy(presentList, 'name', 'asc');
      this.setState({allData: this.allData});
    });
  }

  componentDidMount() {
    this.cameraRepository.addObserver(this.camerasObserver);
  }

  componentWillUnmount() {
    this.cameraRepository.removeObserver(this.camerasObserver);
  }

  getPresentList() {
    MemHelper.instance().reset();
    if (this.state.selected == null) {
      return this.allCamera;
    } else {
      return this.allCamera.filter(i => i.parentId === this.state.selected);
    }
  }

  camerasObserver = cameras => {
    this.setState({cameraList: cameras});
  };

  onRequestPTR = () => {
    this.setState({refreshing: true});

    this.api.getCameraList().then(res => {
      const presentList = res.elements.map(e => {
        return {
          id: e.id,
          parentId: e.parentId,
          url: e.cameraStreamUrl,
          name: e.name,
          type: PRESENT_ITEM_TYPE.CAMERA,
          isOnline: e.online && !e.offline,
        };
      });

      this.allCamera = lodash.sortBy(presentList, 'name', 'asc');

      this.setState({presentList: this.getPresentList(), refreshing: false});
    });

    this.api.getFolder().then(res => {
      const presentList = res.elements.map(e => {
        let type = PRESENT_ITEM_TYPE.FOLDER;

        if (e.camera === true) {
          type = PRESENT_ITEM_TYPE.CAMERA;
        } else if (e.file === true) {
          type = PRESENT_ITEM_TYPE.FILE;
        }

        const parentId = e.parentId;

        return {
          id: e.id,
          name: e.name,
          parentId,
          type,
        };
      });

      this.allData = lodash.sortBy(presentList, 'name', 'asc');
    });
  };

  requestOpenCamera = item => {
    navigateToCamera(this, item);
  };

  requestOpenCameraSetting = item => {
    //TODO
  };

  requestAddCamera = () => {
    navigateToAddCameraScanQRCode(this);
  };

  requestOpenDrawer = () => {
    this.drawer.openDrawer();
  };

  onItemSelected = item => {
    this.setState(
      {
        selected: item.id,
      },
      () => {
        this.setState({
          presentList: this.getPresentList(),
        });
      },
    );
  };

  renderCameraItem = ({item}) => {
    return (
      <CameraItem
        style={styles.cameraItem}
        data={item}
        onPress={this.requestOpenCamera}
      />
    );
  };

  renderHeader() {
    return (
      <Header
        style={styles.header}
        onRequestAddCamera={this.requestAddCamera}
        onRequestBack={this.requestBack}
        onRequestOpenDrawer={this.requestOpenDrawer}
        headerTitle={this.state.headerTitle}
        showBack={this.state.showBack}
      />
    );
  }

  renderCameras() {
    if (this.state.presentList == null) {
      return (
        <ActivityIndicator
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        />
      );
    } else {
      return (
        <FlatList
          style={styles.cameraList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => 'camera-item-' + index}
          data={this.state.presentList}
          renderItem={this.renderCameraItem}
          numColumns={2}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRequestPTR}
            />
          }
        />
      );
    }
  }

  render() {
    const drawerContent = (
      <DrawerContent
        data={this.state.allData}
        onItemSelected={this.onItemSelected}
      />
    );

    return (
      <Drawer
        ref={r => (this.drawer = r)}
        style={styles.container}
        drawerContent={drawerContent}
        drawerPosition={Drawer.positions.Left}
        drawerWidth={DRAWER_WIDTH}>
        {this.renderHeader()}
        {this.renderCameras()}
      </Drawer>
    );
  }
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const DRAWER_WIDTH = Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
  },
  header: {
    marginTop: 44 + (isIphoneX() ? 20 : 0),
  },
  cameraList: {
    marginHorizontal: 8,
    marginTop: 12,
    paddingTop: 8,
  },
  cameraItem: {
    marginBottom: 16,
  },
});
