import { View, Text, TouchableOpacity } from "react-native";

const CategoryList = ({ categories, onSelect }: { categories: string[]; onSelect: (category: string) => void }) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-md mb-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">Categorias</Text>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(category)} className="p-3 bg-gray-100 rounded-lg mb-2">
          <Text className="text-gray-800 font-medium">{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryList;
