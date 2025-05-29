import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface Props {
  placeholder : string,
  onPress? : ()=>void,
  value? : string,
  onChangeText?: (text: string) => void
}
const searchBar = ({value,placeholder, onPress, onChangeText}:Props) => {

  return (
    <View className='flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff' />
      <TextInput 
        placeholder={placeholder} 
        className='text-white font-semibold ml-2 flex-1' 
        placeholderTextColor='#ab8bff' 
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}

        />
    </View>
  )
}

export default searchBar