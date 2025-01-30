import { View, TouchableOpacity, Keyboard } from 'react-native';
import { Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect, useState } from 'react';

function TabBar({ state, descriptors, navigation }) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    if (isKeyboardVisible) return null; // Klavye açıldığında TabBar gizlenir

    return (
        <View className="flex-row bg-white py-1 h-16 bottom-0">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                if (label === 'Search') {
                    return (
                        <View key={route.key} className="relative items-center justify-center">
                            {/* Beyaz Oval */}
                            <View className="absolute bg-white w-24 h-24 rounded-full top-[-22px]" />

                            <TouchableOpacity
                                key={route.key}
                                onPress={onPress}
                                className="bg-red rounded-full w-16 h-16 flex items-center justify-center mt-[-10px]"
                            >
                                <AntDesign name="search1" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            className="flex-1 flex flex-col items-center justify-center pt-1.5 h-14"
                        >
                            {label === 'History' && (
                                <>
                                    <FontAwesome name="history" size={24} color={isFocused ? '#4682B4' : 'gray'} />
                                    <View className="mt-1 h-1 w-1">
                                        {isFocused && <View className="bg-red rounded-full w-1 h-1" />}
                                    </View>
                                </>
                            )}
                            {label === 'Favorite' && (
                                <>
                                    <Fontisto name="favorite" size={24} color={isFocused ? '#4682B4' : 'gray'} />
                                    <View className="mt-1 h-1 w-1">
                                        {isFocused && <View className="bg-red rounded-full w-1 h-1" />}
                                    </View>
                                </>
                            )}
                        </TouchableOpacity>
                    );
                }
            })}
        </View>
    );
}

export default TabBar;
