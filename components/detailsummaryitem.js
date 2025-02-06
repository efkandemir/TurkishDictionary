import { View, Text } from 'react-native'
import React from 'react'

export function DetailSummaryItemContainer({ children, border, ...props }) {
    return (
        <View {...props} className="bg-white px-[28px] py-[20px] relative">
            {border && (
                <View className="border-t border-gray-400 left-3 right-3 top-0 absolute" />
            )}
            <View></View>
            <View className="flex-row">
                <Text className="ml-[-14px] mr-[7px] text-textLight">1</Text>
                <Text className="text-red">İSİM</Text>
            </View>
            <View>
                <Text className="mt-[8px]">{children}</Text>
            </View>
        </View>
    )
}

export function DetailSummaryItemTitle({ children, ...props }) {
    return (

        <Text className="text-[14px] font-semibold">{children}</Text>

    )
}

export function DetailSummaryItemSummary({ children, ...props }) {
    return (
        <View>
            <Text className="text-[14px] font-medium ml-[8px] mt-[12px] text-textLight">{children}</Text>
        </View>


    )
}