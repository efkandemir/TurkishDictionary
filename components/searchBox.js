import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from 'react-native-elements';


const SearchBox = ({ place }) => {
    const [isFocus, setFocus] = useState(false);
    const [value, setvalue] = useState("")
    const textInputRef = useRef(null); // TextInput için referans ekleyelim

    const handleBlur = () => {
        setFocus(false);
        if (textInputRef.current) {
            textInputRef.current.blur();  // Imleci kaybettiriyoruz
        }
    };
    const handleClose = () => {
        setvalue('')
    }

    return (
        <View className="w-full px-4 mt-2 flex-row items-center">
            {/* Arama Kutusu */}
            <View
                className={`bg-white border-white rounded-lg h-[52px] flex-row items-center px-3 ${isFocus ? "w-[75%]" : "w-full"
                    }`}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 24,
                    shadowOpacity: 0.1,
                    elevation: 5, // Android için gölgelendirme
                }}
            >
                {/* Arama İkonu */}
                <AntDesign name="search1" size={20} className="mr-2" color={"#0A151F"} />

                {/* Giriş Alanı */}
                <TextInput
                    ref={textInputRef}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChangeText={(text) => setvalue(text)}
                    placeholder={place ? place : "Türkçe Sözlük'te Ara"}
                    className={`flex-1 text-base ${isFocus ? "border-gray-600-600" : "border-transparent"}`}
                    value={value}
                />
                {
                    value.length > 0 && (
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" className="mr-[20px]" onPress={handleClose} />
                        </TouchableOpacity>

                    )
                }

            </View>

            {/* "Vazgeç" Butonu (Odaklanınca Görünür) */}
            {isFocus && (
                <TouchableOpacity className="ml-3" onPress={handleBlur}>
                    <Text className="text-gray-700 text-base">Vazgeç</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SearchBox;
