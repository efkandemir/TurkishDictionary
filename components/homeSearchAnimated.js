import { View, Text, Animated, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import Bg from './bg';
import SearchBox from './searchBox';

export default function HomeSearchAnimated({ isSearchFocus, onSearchFocus }) {
    const heroHeight = useState(new Animated.Value(285))[0];
    const bgOpacity = useState(new Animated.Value(1))[0]

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
    return (
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
                <SearchBox place="" onChangeFocus={(status) => onSearchFocus(status)} />
            </View>
        </Animated.View>
    )
}