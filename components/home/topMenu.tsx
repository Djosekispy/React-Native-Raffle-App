import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import raffleimage from '../../public/img/raffles.png'
import { useAuth } from "@/context";
const TopMenu = () => {
    const { logout } = useAuth()
  return (
    <View style={styles.container}>
      {/* Logotipo */}
      <View style={styles.logoContainer}>
        <Image
          source={raffleimage} // Substitua pelo caminho do seu logotipo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Sorteio App</Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="exit-outline" size={24} color="black" onPress={logout} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default TopMenu;
