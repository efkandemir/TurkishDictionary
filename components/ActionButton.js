import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ActionButton({ children, ...props }) {
    return (
        <TouchableOpacity
            title=""
            className="bg-white min-w-[48px] h-[48px] flex-row px-[10px] items-center rounded-full"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.16,
                shadowRadius: 4,
            }}
            {...props} // Buraya eklemelisin!
        >
            {children}
        </TouchableOpacity>
    );
}


export function ActionButtonTitle({ children }) {
    return (
        <Text className="mr-2 ml-2 text-textLight font-bold">{children}</Text>
    );
}
