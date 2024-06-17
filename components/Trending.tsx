import React from 'react'

import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

// fix any
const Trending = ({ posts }: any) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.$id}
      renderItem={({ item }) => (
        <Text>{item.id}</Text>
      )}
      horizontal
    />
  )
}

export default Trending