import React, { useState } from 'react'

import { View, FlatList, SafeAreaView, Text, Image, RefreshControl } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { images } from '../../constants';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

const Home = () => {
  const { user }: any = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refresing, setRefresing] = useState(false);

  const onRefresh = async () => {
    setRefresing(true);
    await refetch();
    setRefresing(false);
  }

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
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start-flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>
                    Welcome back,
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    {user?.username}
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
                <Trending posts={latestPosts ?? []} />
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

export default Home;