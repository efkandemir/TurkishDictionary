import { View, Text, Image, StatusBar, Platform, Animated, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import SearchBox from '../components/searchBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Bg from '../components/bg'
import { CardTitle, CardSummary, CardContainer } from '../components/card'
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
    const [isSearchFocus, setSearchFocus] = useState(false);
    const heroHeight = useState(new Animated.Value(285))[0];

    useEffect(() => {
        if (isSearchFocus) {
            Animated.timing(heroHeight, {
                toValue: 95, // Odaklanınca yukarı kaydır, çıkınca eski haline getir
                duration: 230, // 0.5 saniyede animasyon
                useNativeDriver: false
            }).start();
        }
        else {
            Animated.timing(heroHeight, {
                toValue: 285, // Odaklanınca yukarı kaydır, çıkınca eski haline getir
                duration: 230, // 0.5 saniyede animasyon
                useNativeDriver: false
            }).start();
        }

    }, [isSearchFocus]);

    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBackgroundColor(isSearchFocus ? 'white' : '#E11E3C');
            StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content');
        }, [isSearchFocus])
    );


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            description: "Efkan 1"
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            description: "Efkan 2"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            description: "Efkan 3"
        }
    ];

    return (
        <SafeAreaView className={`flex-1 ${isSearchFocus ? "bg-softRed" : "bg-red"}`}>

            {/* Arama kutusu odaklandığında yukarı kayma efekti */}
            <Animated.View style={{ height: heroHeight }}>
                {
                    !isSearchFocus && (
                        <Bg>
                            <View className="flex-1 justify-center items-center">
                                <Image
                                    source={require('../assets/tdks.png')}
                                    className="w-[85px] h-[40px]"
                                    style={{ tintColor: 'white' }}
                                />
                            </View>

                        </Bg>
                    )
                }


                <View className={`p-2 w-full absolute left-0 ${isSearchFocus ? "bottom-0" : "bottom-[-38px]"}`}>
                    <SearchBox place="" onChangeFocus={(status) => setSearchFocus(status)} />
                </View>
            </Animated.View>

            {/* İçerik */}
            <View className={`flex-1 bg-softRed -z-10 ${isSearchFocus ? "pt-0" : "pt-[26px]"}`}>
                {isSearchFocus ? (
                    <View className="flex-1 p-[30px]">
                        <Text>History</Text>
                    </View>
                ) : (
                    <View className="flex-1 px-6 py-10">

                        <View>
                            <Text className="text-textLight">Bir deyim</Text>
                            <CardContainer className="mt-[10px]" onPress={() => navigation.navigate('Detail')}>
                                <CardTitle>on para</CardTitle>
                                <CardSummary>çok az  (para).</CardSummary>
                            </CardContainer>
                        </View>

                        <View className="mt-[40px]">
                            <Text className="text-textLight">Bir deyim-Atasözü</Text>
                            <CardContainer className="mt-[10px]" onPress={() => navigation.navigate('Detail')}>
                                <CardTitle>siyem siyem ağlamak</CardTitle>
                                <CardSummary>hafif hafif,ince ince,durmadan gözyaşı dökmek</CardSummary>
                            </CardContainer>
                        </View>


                        {/* <FlatList
                            data={DATA}
                            renderItem={({ item }) =>
                                <View className="py-1">
                                    <CardContainer >
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardSummary>{item.description}</CardSummary>
                                    </CardContainer>
                                </View>
                            }
                            keyExtractor={item => item.id}
                        /> */}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainSearch" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailsScreen} options={{ title: 'Detail', headerShown: false }} />
        </Stack.Navigator>
    );
}
