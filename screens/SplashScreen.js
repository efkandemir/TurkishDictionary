import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            // Doğrudan ekran değiştirmek için `navigation.replace` kullanıyoruz
            navigation.replace('Main'); // TabNavigator'a geçiş
        }, 2000);
    }, [navigation]);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-red-500 text-3xl font-extrabold">Türkçe Sözlük</Text>
        </View>
    );
}
