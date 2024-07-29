import React from 'react'

import { View, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '../constants';

const SearchInput: React.FC<any> = ({ value, handleChangeText}) => {
  return (
    <View className='space-x-4 w-full h-16 px-4 flex-row bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center'>
        <TextInput
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          placeholderTextColor='#7b7b8b'
          placeholder="Search for a video"
          value={value}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity>
          <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput