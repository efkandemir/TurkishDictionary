import { View, Text, StatusBar, Platform, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import ActionButton, { ActionButtonTitle } from '../components/ActionButton'
import Feather from '@expo/vector-icons/Feather';
import { DetailSummaryItemContainer, DetailSummaryItemTitle, DetailSummaryItemSummary } from '../components/detailsummaryitem'
import LoaderText from '../components/loaderText'


export default function DetailsScreen({ route }) {
  const keyword = route.params?.keyword;
  const [data, setData] = useState(null)
  useFocusEffect(React.useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white')
  }, []));

  const getDetailData = async () => {
    const response = await fetch(`https://sozluk.gov.tr/gts?ara=${keyword}`)
    const data = await response.json();
    setData(data[0])
  }

  useEffect(() => {
    getDetailData();
  }, [])


  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="p-4">
        <View>
          <Text className="text-[32px] font-bold">{keyword}</Text>
          <Text className="text-textLight mt-[6px]">{data?.telaffuz && data?.telaffuz} {data?.lisan}</Text>
        </View>
        <View className="flex-row mt-4">
          <ActionButton disabled={!data}>
            <Image source={require('../assets/voiceicon.png')} className="w-6 h-6 " />
          </ActionButton>
          <ActionButton disabled={!data}>
            <Image source={require('../assets/faviconmy.png')} className="w-6 h-6 ml-[2px] " /*style={{ tintColor: '#758291' }}*/ />
          </ActionButton>
          <ActionButton className="ml-auto" disabled={!data}>
            <Image source={require('../assets/handicon.png')} className="w-6 h-6" />
            <ActionButtonTitle>Türk İşaret Dili</ActionButtonTitle>
          </ActionButton>
        </View>
        <View className="mt-10">
          {
            data ? data.anlamlarListe.map(item => (
              <DetailSummaryItemContainer key={item}>
                <DetailSummaryItemTitle>{item.anlam}</DetailSummaryItemTitle>
                <DetailSummaryItemSummary></DetailSummaryItemSummary>
              </DetailSummaryItemContainer>
            )) :
              [1, 2, 3].map(index => (
                <DetailSummaryItemContainer border={index !== 1} key={index}>
                  <LoaderText />
                  <LoaderText className="w-52 h-[10px] mt-[10px]" />
                </DetailSummaryItemContainer>
              ))

          }



        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
