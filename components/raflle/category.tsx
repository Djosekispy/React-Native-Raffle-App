
import { ICategoria } from "@/interfaces/ICategory";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const CategoryList = ({ categories, onSelect, selected }: { categories: ICategoria[]; onSelect: (category: string) => void, selected : number; }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row flex-wrap gap-2 px-4 py-2">
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          className="bg-black rounded-lg px-4 py-2 mx-2"
          onPress={() => onSelect(String(category.id))}
        >
          <Text className="text-white text-xs font-medium" numberOfLines={1}>
           # {category.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


export default CategoryList;
