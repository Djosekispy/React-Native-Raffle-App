import { Text } from "react-native";
import { TextInput, View } from "react-native";

interface ProfileForm {
    name : string,
    label : string
}

export default function FormProfile({name, label}:ProfileForm){

    return (
        <View style={{flexDirection: 'column', marginHorizontal: 4, marginVertical: 2}}>
        <Text style={{color: 'gray', fontSize: 14, marginVertical: 4, fontWeight: 'bold', fontFamily:'SpaceMono'}}>
          {label}
        </Text>
        <Text style={{padding: 8, borderRadius: 10, backgroundColor:'white',  color: 'black', fontWeight: 'bold', fontSize: 16, fontFamily:'SpaceMono'}}>
          {name}
        </Text>
      </View>

    );
}