import { IItens } from "@/interfaces/IItens";
import { View, Text } from "react-native";


const CategoryItems = ({ items }: { items: IItens[] }) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-md mb-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">Itens da Categoria</Text>
      {items.map((item) => (
        <View key={item.id} className="p-3 border-b border-gray-200">
          <Text className="text-lg font-medium text-gray-800">{item.nome}</Text>
          <Text className="text-gray-600">{item.descricao}</Text>
        </View>
      ))}
    </View>
  );
};

export default CategoryItems;
