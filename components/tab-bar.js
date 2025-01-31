import { View, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { KeyboardAvoidingView } from 'react-native';

function TabBar({ state, descriptors, navigation }) {


    return (
        <View className="flex-row bg-white py-1 h-16 bottom-0"
            style={{
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: Platform.OS === "ios" ? 20 : 10,
                ...Platform.select({
                    ios: {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                    },
                    android: {
                        elevation: 10, // Gölgelenmeyi artırdım
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 10 }, // Android için ekstra gölge efekti
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                    },
                }),
            }}
        >
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
