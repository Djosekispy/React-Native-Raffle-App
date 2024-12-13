import { ICategoria } from "@/interfaces/ICategory";
import { View, Text, TouchableOpacity } from "react-native";

const CategoryList = ({ categories, onSelect, selected }: { categories: ICategoria[]; onSelect: (category: string) => void, selected : number; }) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-md mb-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Categorias</Text>
      <View className="flex-row gap-4 flex-wrap">
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(String(category.id))} className={`rounded-md p-3 ${selected === category.id ? 'bg-blue-500' : 'bg-black'}`}>
            <Text className="text-white text-base font-medium">{category.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


export default CategoryList;
