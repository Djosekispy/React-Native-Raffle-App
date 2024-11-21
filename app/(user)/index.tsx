import { Link } from "expo-router";
import { Text, View } from "react-native";



function Home(){
    return(
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold">Home</Text>
            <Link href='/(user)/profile'>
            <Text>Perfil</Text>
            </Link>
        </View>
    )
}


export default Home;