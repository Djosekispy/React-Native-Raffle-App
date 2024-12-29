import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

interface ProfileForm {
  name: string;
  label: string;
}

export default function FormProfilePDF({ name, label }: ProfileForm) {
  const handleOpenPDF = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(name);
      if (result.type === "dismiss") {
        console.log("Navegador fechado");
      }
    } catch (error) {
      console.error("Erro ao abrir o PDF:", error);
    }
  };

  return (
    <View className="flex-col mx-2 my-1">
      <Text className="text-gray-500 text-sm my-1 font-bold">
        {label}
      </Text>
      <TouchableOpacity
        className="bg-blue-500 rounded-md py-2 items-center justify-center"
        onPress={handleOpenPDF}
      >
        <Text className="text-white font-semibold text-base">
          Visualizar PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
}
