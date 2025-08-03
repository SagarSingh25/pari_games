import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Dino_Park = () => {

    const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    // const playBubbleSound = () => {
    //     const bubbleSound = new Sound('./bubble-sound-43207.mp3', Sound.MAIN_BUNDLE, (error) => {
    //     if (error) {
    //         console.log('Failed to load sound', error);
    //         return;
    //     }
    //     // Play the sound
    //     bubbleSound.play((success) => {
    //         if (success) {
    //         console.log('Sound played successfully');
    //         } else {
    //         console.log('Sound play failed');
    //         }
    //         // Release the audio resource
    //         bubbleSound.release();
    //     });
    //     });
    // };  

    const { width, height } = Dimensions.get('window');
    const [isHovered, setIsHovered] = useState(false);
    const dino_park_log = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754192067/Screenshot_from_2025-08-03_01-59-04-removebg-preview_1_l9wfdq.png"
    const mini_fly = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754192405/mini_fly_aex3hc.png"
    const lil_drago = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754192784/mini_drago_dwmk30.png"
    const long_drago = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754193036/Screenshot_from_2025-08-03_01-52-08-removebg-preview_1_eo19jd.png"
    const translateY = useRef(new Animated.Value(0)).current;
    

     useEffect(() => {
        const animate = () => {
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -5, // Move 5px up
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 5, // Move 5px down
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0, // Return to original position
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(() => animate()); // Loop the animation
        };
    
        animate();
      }, [translateY]);
    
    
    if (!loaded) {
      return null;
    }
    

    
    return (
     <ScrollView style={{flex : 1}} >
        <Image 
            source={{
                uri: 'https://res.cloudinary.com/dqd7bujxh/image/upload/v1754191462/dino_park.png'
            }} 
            style={{
                width: width + 70,
                height: height,
            }}
            resizeMode="cover"
        />
        <Image 
            source = {{
                uri : lil_drago
            }}
            style={
                {width : 57 , height : 68 , position : 'absolute' , top : 250 , left : 300}
            }
        />
        <Animated.View
            style={{
                transform: [{ translateY }] , position : "absolute" , top: 150 , left : 400
            }}
        >

        <Image 
            source={{
            uri : mini_fly
            }}
            style={{width: 101 , height : 65 }}
        />
        </Animated.View>
        <Image
            source={{
                uri : long_drago
            }}

            style={{
                width : 75.47 , height : 122.63 , position : 'absolute' , top : 150 , right : 350
            }}
        />


        <Pressable
        // onHoverIn={() => playBubbleSound()}
        // onHoverOut={() => playBubbleSound()}
        style={{
            backgroundColor: isHovered ? 'lightblue' : 'white',
            padding: 20,
            borderRadius: 5,
        }}
        >
            <Image
                source={{
                    uri : dino_park_log
                }}
                style={{width : '55%'  , height : '30%', position : 'absolute' , bottom: 0 , right: 0}}
            />
        </Pressable>
     </ScrollView>
       
    )
}

export default Dino_Park