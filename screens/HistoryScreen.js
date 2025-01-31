import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

export default function HistoryScreen() {
  useFocusEffect(React.useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white')
  }, [])
  )
  return (
    <View className="flex-1 justify-center items-center">
      <Text>HistoryScreen</Text>
    </View>
  )
}