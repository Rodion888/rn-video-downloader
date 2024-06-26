import React, { useState } from 'react'

import { View, FlatList, SafeAreaView, Text, Image, RefreshControl } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { images } from '../../constants';

import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';

const Home = () => {
  const [refresing, setRefresing] = useState(false);

  const onRefresh = async () => {
    setRefresing(true);
    // recall if videos appeared
    setRefresing(false);
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={[]}
          keyExtractor={(item: any) => item.$id}
          renderItem={({ item }) => (
            <Text>{item.$id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start-flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>
                    Welcome Back
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    user name
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall}
                    className='w-9 h-10'
                    resizeMode='contain'
                  />
                </View>
              </View>
              <SearchInput />
              <View className='w-full flex-1 pt-5 pb-8'>
                <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Latest Videos
                </Text>
                <Trending posts={[{ id: 1 }] ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="No videos found" subtitle="Be the first one upload the video" />
          )}
          refreshControl={<RefreshControl refreshing={refresing} onRefresh={onRefresh} />}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home