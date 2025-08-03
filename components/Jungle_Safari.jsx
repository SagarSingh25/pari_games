import { useFonts } from 'expo-font';
import { Dimensions, Image, ScrollView } from 'react-native';

const Jungle_Safari = () => {


    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const { width, height } = Dimensions.get('window');

    const jungle_safari = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754219250/WhatsApp_Image_2025-08-03_at_1.47.15_AM_1_asvhm6.png"
    const title = "https://res.cloudinary.com/dqd7bujxh/image/upload/v1754220227/Screenshot_from_2025-08-03_16-53-03-removebg-preview_b4b9pg.png"    


    if (!loaded) {
      return null;
    }
    

    return (
        <ScrollView>
            <Image 
                source={{
                    uri: jungle_safari
                }} 
                style={{
                    width: width + 70,
                    height: height,
                }}
                resizeMode="cover"
            />

            <Image 
                source={{
                    uri: title
                }}
                style={{
                    width : 252,
                    height :150,
                    position : 'absolute',
                    bottom : 0,
                    right: 0
                }}
            />
        </ScrollView>
    )
}

export default Jungle_Safari