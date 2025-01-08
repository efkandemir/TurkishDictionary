import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';

function TabBar({ state, descriptors, navigation }) {
    return (
        <View className="flex-row bg-white py-2">
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

                // Koşullu render burada düzeltiliyor
                if (label === 'Search') {
                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            className="bg-red-500 rounded-full w-14 h-14 flex items-center justify-center mt-[-2px]"
                        >
                            {/* Search İkonu */}
                            <AntDesign name="search1" size={24} color="white" />
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            className="flex-1 flex flex-col items-center justify-center pt-1.5 h-14"
                        >
                            {/* Diğer İkonlar */}
                            {label === 'History' && (
                                <>
                                    <FontAwesome name="history" size={24} color={isFocused ? '#4682B4' : 'gray'} />
                                    <View className="mt-1 h-1 w-1">
                                        {isFocused && <View className="bg-red-500 rounded-full w-1 h-1" />}
                                    </View>
                                </>
                            )}
                            {label === 'Favorite' && (
                                <>
                                    <Fontisto name="favorite" size={24} color={isFocused ? '#4682B4' : 'gray'} />
                                    <View className="mt-1 h-1 w-1">
                                        {isFocused && <View className="bg-red-500 rounded-full w-1 h-1" />}
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
