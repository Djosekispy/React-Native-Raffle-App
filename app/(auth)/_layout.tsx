import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';

function LayoutAuth() {
  return (
    <>
    
    <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
    <Slot/>
    </>
  )
}

export default LayoutAuth;
