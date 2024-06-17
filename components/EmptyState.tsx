import React from 'react'

import { View, Image, Text } from 'react-native';
import { images } from '../constants';
import { router } from 'expo-router';

import CustomButton from './CustomButton';

const EmptyState: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />
      <Text className='text-xl text-center font-psemibold text-white mt-2'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100'>
        {subtitle}
      </Text>

      <CustomButton
        title='Create video'
        handlePress={() => router.push('/create')}
        containerStyles='w-full my-5'
      />
    </View>
  )
}

export default EmptyState