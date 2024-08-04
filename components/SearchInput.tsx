import React, { useState } from 'react'

import { View, TextInput, Image, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput: React.FC<any> = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  
  return (
    <View className='space-x-4 w-full h-16 px-4 flex-row bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center'>
        <TextInput
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          placeholderTextColor='#CDCDE0'
          placeholder="Search for a video"
          value={query}
          onChangeText={(e) => setQuery(e)}
        />
        <TouchableOpacity onPress={() => {
          if (!query) {
            return Alert.alert('Missing query', 'Please input something to search results across database');
          }
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}>
          <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput