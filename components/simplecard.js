import React from 'react';
import { Text, View, Button, Pressable } from 'react-native';

export function SimpleCardContainer({ children, ...props }) {
    return <Pressable className="bg-white rounded-md p-4" {...props}>
        {children}
    </Pressable>;
}

export function SimpleCardTitle({ children }) {
    return <Text className="font-bold text-base justify-start">{children}</Text>;
}
