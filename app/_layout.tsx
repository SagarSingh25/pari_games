import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Dino_Park from '../components/Dino_Park';
import Jungle_Safari from "../components/Jungle_Safari";
import Volcano_Valley from '../components/Volcano_Valley';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const zone = [1 , 2 , 3 ]
  const [counter , setCount] = useState(0)

  const translateY = useRef(new Animated.Value(0)).current;
  const left_arrow = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754194190/lucide_step-back_awq7xr.png"

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
    // Async font loading only occurs in development.
    return null;
  }

return (
  <GestureHandlerRootView style={{ flex: 1 }} >
     {
        zone[counter % zone.length] === 1 ? <Dino_Park /> : (zone[counter % zone.length] === 2 ? <Volcano_Valley/> : <Jungle_Safari />) 
      }

      <TouchableHighlight

        onPress={() => setCount((prevState : any) => prevState + 1)}
        underlayColor="#DDDDDD"
        style={{
                  position : "absolute" , top : '50%' , left : 100
        }}
      >
      <Image

            source={{
              uri : left_arrow
            }}
            
            style={{
              height : 43.5,
              width : 43.5
            }}
          />
      </TouchableHighlight>
        

      
      <TouchableHighlight
        onPress={() => setCount((prevState : any) => prevState + 1)}
        underlayColor="#DDDDDD"
        style={{
                  position : "absolute" , top : '50%' , right : 100
        }}
      >
      <Image
        
        source={{
          uri : left_arrow
        }}

        style={{
          height : 43.5,
          width : 43.5,
          ...styles.rotate
        }}
        
      />
      </TouchableHighlight>

  </GestureHandlerRootView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  rotate : {
     transform: [{ rotate: '180deg' }]
  }
});