import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function HomeScreen() {
  return (
    <View>
       <TextInput  placeholder='Enter Text here to translate'/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
