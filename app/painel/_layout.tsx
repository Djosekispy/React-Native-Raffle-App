import { StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Layout() {
  return (
    <SafeAreaProvider>
      
    <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
      <Slot/>
    </SafeAreaProvider>
  );
}