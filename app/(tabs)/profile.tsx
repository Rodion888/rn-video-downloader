import React from 'react'

import { View, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { router } from 'expo-router';

import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import useAppwrite from '../../lib/useAppwrite';
import InfoBox from '../../components/InfoBox';

const Profile = () => {
  const { user, setUser, setIsLoggedIn }: any = useGlobalContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in')
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
            <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
              <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
                <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
              </TouchableOpacity>
              <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                <Image source={{ uri: user?.avatar }} resizeMode='cover' className='w-[90%] h-[90%] rounded-lg' />
              </View>
              <InfoBox title={user?.username} containerStyles='mt-5' titleStyles='text-lg' />
              <View className='mt-5 flex-row'>
                <InfoBox title={posts?.length || 0} subtitle="Posts" containerStyles='mr-10' titleStyles='text-xl' />
                <InfoBox title='1.2k' subtitle="Followers" titleStyles='text-xl' />
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

export default Profile