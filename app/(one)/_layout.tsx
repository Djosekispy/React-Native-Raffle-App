import { StatusBar, Text, View } from 'react-native';
import { Slot } from 'expo-router';
import FooterTabs from '@/components/LayoutButton/tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Layout() {
  return (
    <SafeAreaProvider>
      
    <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
      <Slot/>
    </SafeAreaProvider>
  );
}