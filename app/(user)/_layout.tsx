import { Text, View } from 'react-native';
import { Slot } from 'expo-router';
import FooterTabs from '@/components/LayoutButton/tabs';
export default function Layout() {
  return (
    <>
      <Slot/>
      <View className='w-full p-4 m-2 bg-transparent'>
      <FooterTabs/>
      </View>
    </>
  );
}