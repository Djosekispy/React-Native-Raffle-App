import { View, Text, TouchableOpacity } from "react-native";

const CategoryList = ({ categories, onSelect }: { categories: string[]; onSelect: (category: string) => void }) => {
  return (
    <View style={{padding: 16, backgroundColor: 'white', borderRadius: 8, shadowColor: 'black', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4, marginBottom: 24}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'gray', marginBottom: 16}}>Categorias</Text>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(category)} style={{backgroundColor: '#3b82f6', borderRadius: 8, padding: 8, margin: 8}}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default CategoryList;
