import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

type CategoryProps = {
  categories: {
    id : number;
    title : string
  }[];
  onPress: (category: number) => void;
};

const CategoriesList = ({ categories, onPress }: CategoryProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row flex-wrap gap-2 px-4 py-2">
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          className="bg-black rounded-lg px-4 py-2 mx-2"
          onPress={() => onPress(category.id)}
        >
          <Text className="text-white text-xs font-medium" numberOfLines={1}>
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoriesList;
