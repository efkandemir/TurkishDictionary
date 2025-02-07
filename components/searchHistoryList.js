import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SimpleCardContainer, SimpleCardTitle } from './simplecard'

export default function SearchHistoryList({ data }) {
    return (
        <FlatList
            className="p-4"
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <View className="py-1">
                    <SimpleCardContainer>
                        <SimpleCardTitle>{item.title}</SimpleCardTitle>
                    </SimpleCardContainer>
                </View>
            }
            ListHeaderComponent={<Text className="uppercase text-textLight mb-[10px]">Son Aramalar</Text>}
        />
    )
}