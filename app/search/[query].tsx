import React, { useEffect } from 'react'

import { View, FlatList, SafeAreaView, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { searchPosts } from '../../lib/appwrite';
import { useLocalSearchParams } from 'expo-router';

import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import useAppwrite from '../../lib/useAppwrite';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={posts}
          keyExtractor={(item: any) => item.$id}
          renderItem={({ item }) => (
            <VideoCard video={item} />
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4'>
              <Text className='font-pmedium text-sm text-gray-100'>
                Search Results
              </Text>
              <Text className='text-2xl font-psemibold text-white'>
                {query}
              </Text>
              <View className='mt-6 mb-8'>
                <SearchInput initialQuery={query} />
              </View>          
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="No videos found" subtitle="No videos found for this search query" />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Search