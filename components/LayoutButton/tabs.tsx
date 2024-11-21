import { FlatList, View } from 'react-native';
import ButtonWithIcons from './ButtonWithIcons';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';


export default function FooterTabs() {

    const router = useRouter();
    
const [buttons, setButtons] = useState([
    {
      name: 'Home',
      component: '/',
      active : true,
      icon: 'home' as const,
      onPress : (link : Href<string | object>)=>{
        setButtons(buttons.map(button => button.name === 'Home' ? { ...button, active: true } : { ...button, active: false }));
        router.push(link);
      }
    },
    {
      name: 'Perfil',
      component: '/(user)/profile',
      icon: 'user' as const,
      active : false,
      onPress : (link : Href<string | object>)=>{
        setButtons(buttons.map(button => button.name === 'Perfil' ? { ...button, active: true } : { ...button, active: false }));
        router.push(link);
      }
    },
  ]);
  return (
    <View style={{backgroundColor: '#757575', alignItems: 'center', justifyContent: 'center', borderRadius: 50, padding: 4}}>
      <FlatList
        horizontal
        contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-around'}}
        renderItem={({ item, index }) => (
          <ButtonWithIcons icon={item.icon} key={index} active={item.active} label={item.name} onPress={()=>item.onPress(item.component as Href<string | object>)} />
        )}
        data={buttons}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
