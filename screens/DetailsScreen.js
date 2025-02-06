import { View, Text, StatusBar, Platform, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import ActionButton, { ActionButtonTitle } from '../components/ActionButton'
import Feather from '@expo/vector-icons/Feather';
import { DetailSummaryItemContainer, DetailSummaryItemTitle, DetailSummaryItemSummary } from '../components/detailsummaryitem'


export default function DetailsScreen() {
  useFocusEffect(React.useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white')
  }, []));

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="p-4">
        <View>
          <Text className="text-[32px] font-bold">Kalem</Text>
          <Text className="text-textLight mt-[6px]">Arapça kalem</Text>
        </View>
        <View className="flex-row mt-4">
          <ActionButton>
            <Image source={require('../assets/voiceicon.png')} className="w-6 h-6 " />
          </ActionButton>
          <ActionButton>
            <Image source={require('../assets/favsolidicon.png')} className="w-6 h-6 " style={{ tintColor: 'red' }} />
          </ActionButton>
          <ActionButton className="ml-auto">
            <Image source={require('../assets/handicon.png')} className="w-6 h-6" />
            <ActionButtonTitle>Türk İşaret Dili</ActionButtonTitle>
          </ActionButton>
        </View>
        <View className="mt-10">
          <DetailSummaryItemContainer>
            <DetailSummaryItemTitle>Yazma, çizme vb. işlerde kullanılan çeşitli araçlar:</DetailSummaryItemTitle>
            <DetailSummaryItemSummary>"Kâğıt, kalem, mürekkep, hepsi masanın üstündedir." - Falih Rıfkı Atay</DetailSummaryItemSummary>
          </DetailSummaryItemContainer>
          <DetailSummaryItemContainer border>
            <DetailSummaryItemTitle>Yazma, çizme vb. işlerde kullanılan çeşitli araçlar:</DetailSummaryItemTitle>
            <DetailSummaryItemSummary>"Kâğıt, kalem, mürekkep, hepsi masanın üstündedir." - Falih Rıfkı Atay</DetailSummaryItemSummary>
          </DetailSummaryItemContainer>
          <DetailSummaryItemContainer border>
            <DetailSummaryItemTitle>Yazma, çizme vb. işlerde kullanılan çeşitli araçlar:</DetailSummaryItemTitle>
            <DetailSummaryItemSummary>"Kâğıt, kalem, mürekkep, hepsi masanın üstündedir." - Falih Rıfkı Atay</DetailSummaryItemSummary>
          </DetailSummaryItemContainer>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
