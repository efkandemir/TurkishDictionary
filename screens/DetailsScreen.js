import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'


export default function DetailsScreen() {
  useFocusEffect(React.useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white')
  }, [])
  )
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Detay</Text>
    </SafeAreaView>

  )
}
