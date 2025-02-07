import { View, Text } from 'react-native'
import React from 'react'
import { CardContainer, CardSummary, CardTitle } from './card'
import LoaderText from './loaderText'

export default function SuggestionCard({ title, onPress, data, ...props }) {
    return (
        <View {...props}>
            <Text className="text-textLight">{title}</Text>
            <CardContainer className="mt-[10px]" onPress={onPress}>
                {data ? (
                    <>
                        <CardTitle>{data.madde}</CardTitle>
                        <CardSummary>{data.anlam}</CardSummary>
                    </>
                ) :
                    (
                        <View>
                            <LoaderText />
                            <LoaderText className="w-52 h-[10px] mt-[10px]" />
                        </View>

                    )}

            </CardContainer>
        </View>
    )
}