import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";

export default function HomeLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        shadowColor: 'transparent',
                    },
                    headerShadowVisible: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="home" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="featured"
                    options={{
                        tabBarLabel: 'Interesse',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="star" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="search"
                    options={{
                        tabBarLabel: 'Buscar',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="menu"
                    options={{
                        tabBarLabel: 'Menu',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="menu" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
