import { Slot } from "expo-router";
import { StatusBar } from "react-native";


export default function RaffleLayout(){

    return (
        <>
        
        <StatusBar backgroundColor='transparent' translucent barStyle='dark-content' />
        <Slot/>
        </>
      )
}