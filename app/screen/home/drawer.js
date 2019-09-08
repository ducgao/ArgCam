import React from 'react'
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native'
import { isIphoneX } from '../../utils'

const DrawerItem = React.memo(({item, onPress, isSelected}) => {

  const onItemPress = () => {
    onPress(item)
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isSelected ? "red" : 'white'
      }}
      onPress={onItemPress}
      activeOpacity={0.9}
    >
      <Image 
        style={{
          width: 24,
          height: 24,
          marginHorizontal: 8,
          marginVertical: 4
        }}
        source={require('../../res/images/folder.png')}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )
})

export default class DrawerContent extends React.PureComponent {

  state = {
    selected: []
  }

  onItemPress = (item) => {
    const selected = this.state.selected
    selected.push(item.id)

    this.setState({ selected: selected.slice() })
  }

  renderItem = ({item}) => {
    let isSelected = false;
    this.state.selected.forEach(e => {
      if (e.id == item.id) {
        isSelected = true
        return
      }
    })

    return <DrawerItem item={item} onPress={this.onItemPress} isSelected={isSelected} />
  }

  render() {
    return (
      <FlatList 
        style={{
          marginTop: 44 + (isIphoneX() ? 20 : 0)
        }}
        showsVerticalScrollIndicator={false}
        data={this.props.data} 
        renderItem={this.renderItem}
        keyExtractor={(_, index) => 'drawer-item-' + index}
      />
    )
  }
}