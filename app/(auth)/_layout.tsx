import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function LayoutAuth() {
  return (
    <>
    
    <StatusBar backgroundColor='transparent' translucent style='dark' />
    <Slot/>
    </>
  )
}

export default LayoutAuth;
