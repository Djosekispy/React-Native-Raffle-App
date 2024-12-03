import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

type CategoryProps = {
  categories: string[];
  onPress: (category: string) => void;
};

const CategoriesList = ({ categories, onPress }: CategoryProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row flex-wrap gap-2 px-4 py-2">
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          className="bg-blue-500 rounded-lg px-4 py-2 mx-2"
          onPress={() => onPress(category)}
        >
          <Text className="text-white text-xs font-medium" numberOfLines={1}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoriesList;
