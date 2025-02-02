import React from 'react'
import { ImageBackground } from 'react-native'
const bg = ({ children, ...props }) => {
    return (
        <ImageBackground source={require('../assets/bg.jpg')} className="w-full h-full" {...props} >
            {children}
        </ImageBackground>
    )
}

export default bg