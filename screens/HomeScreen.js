import { View, Text, Image, StatusBar, Platform, Animated, FlatList, Button, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import SearchBox from '../components/searchBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Bg from '../components/bg'
import { CardTitle, CardSummary, CardContainer } from '../components/card'
import { useNavigation } from '@react-navigation/native';
import { SimpleCardContainer, SimpleCardTitle } from '../components/simplecard';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';



const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
    const [isSearchFocus, setSearchFocus] = useState(false);
    const heroHeight = useState(new Animated.Value(285))[0];
    const bgOpacity = useState(new Animated.Value(1))[0]
    const [homeData, setHomeData] = useState(null)

    const getHomeData = async () => {
        try {
            const response = await fetch("https://sozluk.gov.tr/icerik");
            const data = await response.json()
            setHomeData(data);
        } catch (error) {
            console.error("Hata oluştu:", error);
        }
    };
    useEffect(() => {
        getHomeData();
    }, []);

    useEffect(() => {
        if (isSearchFocus) {
            //opacity
            Animated.timing(bgOpacity, {
                toValue: 0,
                duration: 230,
                useNativeDriver: false
            }).start();
            //hero-height
            Animated.timing(heroHeight, {
                toValue: 95,
                duration: 230,
                useNativeDriver: false
            }).start();
        }
        else {
            //opacity
            Animated.timing(bgOpacity, {
                toValue: 1,
                duration: 230,
                useNativeDriver: false
            }).start();
            //hero-height
            Animated.timing(heroHeight, {
                toValue: 285,
                duration: 230,
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
                    <Animated.View opacity={bgOpacity}>
                        <Bg>
                            <View className="flex-1 justify-center items-center">
                                <Image
                                    source={require('../assets/tdks.png')}
                                    className="w-[85px] h-[40px]"
                                    style={{ tintColor: 'white' }}
                                />
                            </View>

                        </Bg>
                    </Animated.View>


                }


                <View className={`p-2 w-full absolute left-0 ${isSearchFocus ? "bottom-0" : "bottom-[-35px]"}`}>
                    <SearchBox place="" onChangeFocus={(status) => setSearchFocus(status)} />
                </View>
            </Animated.View>

            {/* İçerik */}
            <View className={`flex-1 bg-softRed -z-10 ${isSearchFocus ? "pt-0" : "pt-[26px]"}`}>
                {isSearchFocus ? (
                    <View className="flex-1 ">
                        <FlatList
                            className="p-4"
                            data={DATA}
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

                    </View>
                ) : (
                    <View className="flex-1 px-6 py-10">
                        <View>
                            <Text className="text-textLight">Bir Kelime</Text>
                            <CardContainer className="mt-[10px]" onPress={() => navigation.navigate('Detail', { title: "on para" })}>
                                {homeData ? (
                                    <>
                                        <CardTitle>{homeData?.kelime[0].madde}</CardTitle>
                                        <CardSummary>{homeData?.kelime[0].anlam}</CardSummary>
                                    </>
                                ) :
                                    (<ActivityIndicator />)
                                }
                            </CardContainer>
                        </View>

                        <View className="mt-[40px]">
                            <Text className="text-textLight">Bir deyim-Atasözü</Text>
                            <CardContainer className="mt-[10px]" onPress={() => navigation.navigate('Detail', { title: "Siyem Siyem Ağlamak" })}>
                                {homeData ? (
                                    <>
                                        <CardTitle>{homeData?.atasoz[0].madde}</CardTitle>
                                        <CardSummary>{homeData?.atasoz[0].anlam}</CardSummary>
                                    </>
                                ) :
                                    (
                                    <ActivityIndicator />
                                )}

                            </CardContainer>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainSearch" component={HomeScreen}
                options={() => {
                    return {
                        headerShown: false
                    }
                }} />
            <Stack.Screen
                name="Detail"
                component={DetailsScreen}
                options={({ route, navigation }) => ({
                    title: route.params?.title,
                    headerStyle: {
                        backgroundColor: '#F8F8F8', // Header arka plan rengi
                        shadowColor: 'transparent'  // iOS için gölgeyi kaldırma
                    },
                    headerTintColor: '#333', // Geri butonu ve başlık rengi
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Pressable className="bg-softRed px-5 h-12 justify-center ml-[-5px]" onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-left" size={24} color="black" />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable className="bg-softRed px-5 h-12 justify-center " onPress={() => navigation.goBack()}>
                            <Feather name="more-horizontal" size={24} color="black" />
                        </Pressable>
                    )
                })}
            />


        </Stack.Navigator>
    );
}
