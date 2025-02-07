import { View, Text } from 'react-native'
import React from 'react'

export default function LoaderText({ ...props }) {
    return (
        <View className="bg-light w-32 h-4" {...props}></View>
    )
}