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

                return (
                    <TouchableOpacity
                        key={route.key} // Benzersiz bir `key` sağlamak
                        onPress={onPress}
                        className={`flex-1 items-center justify-center py-2 ${isFocused ? 'bg-purple-200' : 'bg-white'
                            }`}
                    >
                        {/* Search için özel ikon */}
                        {label === 'Search' && (
                            <AntDesign name="search1" size={24} color={isFocused ? 'purple' : 'black'} />
                        )}
                        {/* History için özel ikon */}
                        {label === 'History' && (
                            <FontAwesome name="history" size={24} color={isFocused ? 'purple' : 'black'} />
                        )}
                        {/* Favorite için özel ikon */}
                        {label === 'Favorite' && (
                            <Fontisto name="favorite" size={24} color={isFocused ? 'purple' : 'black'} />
                        )}
                        {/* <Text
                            className={`text-sm mt-1 ${isFocused ? 'text-purple-700 font-bold' : 'text-gray-500'
                                }`}
                        >
                            {label}
                        </Text> */}

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar;
