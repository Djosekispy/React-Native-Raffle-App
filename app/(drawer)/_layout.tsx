import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        screenOptions={{
          headerTitle: '',
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: '#fff',
            borderRightWidth: 0
          },
          sceneContainerStyle: {
            backgroundColor: '#fff'
          }
        }}
      >
        <Drawer.Screen 
          name="index" 
          options={{
            headerTitle: '', 
            drawerLabel: ({color, focused}) => {
              return <Text className="text-xl font-bold" style={{ color: focused ? color : 'gray'}}>Home</Text>
            }
          }}
        />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}