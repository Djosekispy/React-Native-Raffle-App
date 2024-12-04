import RaffleInfo from "@/components/raflle/info";
import { IRaffle } from "@/interfaces/IRaffles";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import CategoryItems from "@/components/raflle/itens";
import CategoryList from "@/components/raflle/category";
import { IItens } from "@/interfaces/IItens";
import Button from "@/components/raflle/button";

const RaffleDescription = ({
  raffle,
  categories,
  itemsByCategory,
  onParticipate,
  onEdit,
}: {
  raffle: IRaffle;
  categories: string[];
  itemsByCategory: Record<string, IItens[]>;
  onParticipate: () => void;
  onEdit: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ScrollView className="p-4 bg-gray-100">
      <RaffleInfo raffle={raffle} />
      <CategoryList categories={categories} onSelect={setSelectedCategory} />
      {selectedCategory && <CategoryItems items={itemsByCategory[selectedCategory]} />}
      <View className="mt-6 flex-row justify-between">
        <Button title="Participar" onPress={onParticipate} />
        <Button title="Editar Sorteio" onPress={onEdit} style="bg-gray-700" />
      </View>
    </ScrollView>
  );
};

export default RaffleDescription;
