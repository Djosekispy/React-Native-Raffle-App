import { Text } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";


export default function FeaturedPage(){

    return(
        <ScrollView className="flex flex-1">
            <View className="flex flex-1 justify-center items-center">
                <Text className="text-2xl font-bold">Featured</Text>
            </View>
        </ScrollView>
    );
}