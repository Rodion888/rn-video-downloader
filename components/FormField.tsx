import React, { useState } from 'react'

import { View, Text, TextInput, TextInputProps, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '../constants';

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keybordType?: string;
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 flex-row bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          placeholderTextColor='#7b7b8b'
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField