import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";



function Home(){
    return(
        <SafeAreaView>
        <View className="flex-1 items-start px-12">
            <Text className="text-2xl font-bold">Sorteio App</Text>
            <Text>Inscreva-te a vários sorteio e conquiste os seus sonhos</Text>
            <Link href='/(user)/profile'>
            <Text>Perfil</Text>
            </Link>
        </View>
        </SafeAreaView>
    )
}


export default Home;