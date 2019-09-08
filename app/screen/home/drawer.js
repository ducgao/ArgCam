import React from 'react'
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native'
import { isIphoneX } from '../../utils'
import theme from '../../res/theme'
import Icon from 'react-native-ionicons'

const DrawerItem = React.memo(({item, onPress, isSelected, level}) => {

  const onItemPress = () => {
    onPress(item)
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: level * 16
      }}
      onPress={onItemPress}
      activeOpacity={0.9}
    >
      <Icon name={isSelected ? "md-remove-circle" : "md-add-circle"} size={12} color={theme.colorPrimary} style={{marginLeft: 8}} />
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

  removeFromSelected(item) {
    const selected = this.state.selected.slice()
    let p = null
    while (p != item.id) {
      p = selected.pop()
    }
    
    this.setState({ selected: selected.slice() })
  }

  onItemPress = (item) => {
    const selected = this.state.selected

    if (selected.indexOf(item.id) >= 0) {
      this.removeFromSelected(item)
    }
    else {
      const parent = item.parentId
      if (parent) {
        const selected = this.state.selected
        let p = selected[selected.length - 1]
        while (p != parent) {
          selected.pop()
          p = selected[selected.length - 1]
        }  
        selected.push(item.id)
        this.setState({ selected: selected.slice() })
      }
      else {
        this.setState({ selected: [item.id] })  
      }
    }
  }

  renderItem = ({item}, level = 0) => {

    const childLevel = level + 1
    const child = this.state.selected.indexOf(item.id) >= 0 ? item.child.map(i => this.renderItem({item: i}, childLevel)) : undefined

    return (
      <View>
        <DrawerItem item={item} onPress={this.onItemPress} isSelected={this.state.selected.indexOf(item.id) >= 0} level={level} />
        {child}
      </View>
    )
  }

  getChild(item) {
    const returnList = []
    const parents = this.props.data.filter(i => i.parentId == item.id)

    parents.forEach(i => {
      returnList.push({
        ...i,
        child: this.getChild(i)
      })
    })

    return returnList
  }

  render() {
    let presentList = []
    if (Array.isArray(this.props.data)) {
      const parents = this.props.data.filter(i => i.parentId == undefined)

      parents.forEach(i => {
        presentList.push({
          ...i,
          child: this.getChild(i)
        })
      })
    }
    
    return (
      <FlatList 
        style={{
          marginTop: 44 + (isIphoneX() ? 20 : 0)
        }}
        showsVerticalScrollIndicator={false}
        data={presentList} 
        renderItem={this.renderItem}
        keyExtractor={(_, index) => 'drawer-item-' + index}
      />
    )
  }
}