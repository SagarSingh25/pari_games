import { useFonts } from 'expo-font';
import { Dimensions, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

const Volcano_Valley = () => {


    const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const { width, height } = Dimensions.get('window');

    const volcano_valley_bg = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754218421/WhatsApp_Image_2025-08-03_at_1.07.47_AM_2_sofney.png"
    const title = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754218803/Group_4_xxbjte.png"


    if (!loaded) {
      return null;
    }
    

    return (
        <ScrollView style={{flex : 1}}>
            <Image 
                source={{
                    uri: volcano_valley_bg
                }} 
                style={{
                    width: width + 70,
                    height: height,
                }}
                resizeMode="cover"
            />
            <Image 
                source={{
                    uri : title
                }}

                style={{
                    width : 406,
                    height : 164,
                    position : "absolute",
                    bottom : 0,
                    right: 0
                }}
            />

        </ScrollView>
    )
}

export default Volcano_Valley