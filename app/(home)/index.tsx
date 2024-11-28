import { Text } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";


export default function HomePage(){

    return(
        <ScrollView className="flex-1">
            <View className="flex-1 justify-center items-center">
                <Text className="text-2xl font-bold">Home</Text>
            </View>
        </ScrollView>
    );
}