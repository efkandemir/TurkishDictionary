import React from 'react';
import { Text, View, Button, Pressable } from 'react-native';

export function CardContainer({ children, ...props }) {
  return <Pressable className="bg-white rounded-md py-4 px-3 border-red" {...props}>
    <View className="border-l-4 border-gray-600 pl-3">{children}</View>
  </Pressable>;
}

export function CardTitle({ children }) {
  return <Text className="font-bold text-lg">{children}</Text>;
}

export function CardSummary({ children }) {
  return <Text className="text-sm mt-1 text-textMedium">{children}</Text>;
}