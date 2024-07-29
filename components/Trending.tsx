import React, { useState } from 'react'

import * as Animatable from 'react-native-animatable';

import { ImageBackground, Image, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn: any = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}
const zoomOut: any = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrandingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className='mr-5' duration={500} animation={activeItem === item.$id ? zoomIn : zoomOut}>
      {play ? (
        <Video 
          source={{ uri: item.video }}
          className='w-52 h-72 mt-3 rounded-[35px] bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground
            source={{
              uri: item.thumbnail
            }}
            resizeMode='cover'
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].$id)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.$id}
      renderItem={({ item }) => (
        <TrandingItem
          activeItem={activeItem}
          item={item}
        />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  )
}

export default Trending