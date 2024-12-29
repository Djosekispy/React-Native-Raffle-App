import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@/context";
import { IItens } from "@/interfaces/IItens";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface ItemDetailProps {
  item: IItens;
  owner: number | undefined;
  onSubscribe: (itemId: number) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onSubscribe, owner }) => {
  const { user } = useAuth();

  // Verifica se o usuário está entre os inscritos
  const isUserSubscribed = useMemo(() => {
    return item.inscricoes?.some((inscricao) => inscricao.usuarioId === user?.id);
  }, [item.inscricoes, user?.id]);

  return (
    <View style={styles.container}>
      {/* Nome do Item */}
      <View style={styles.header}>
        <Text style={styles.itemName}>{item.nome}</Text>
        <Ionicons name="pricetag-outline" size={24} color="#FF7F50" />
      </View>

      {/* Descrição */}
      <Text style={styles.description}>{item.descricao}</Text>

      {/* Propriedades */}
      <View style={styles.properties}>
        {Object.entries(item.propriedades).map(([key, value]) => (
          <View key={key} style={styles.property}>
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={18} color="#FF7F50" />
            <Text style={styles.propertyText}>
              <Text style={styles.propertyKey}>{key}:</Text> {value}
            </Text>
          </View>
        ))}
      </View>

      {/* Total de Inscritos */}
      <View style={styles.subscribers}>
        <Ionicons
          name="people-outline"
          size={20}
          color={item.inscricoes && item.inscricoes.length > 0 ? "#28a745" : "#dc3545"}
        />
        <Text
          style={[
            styles.subscriberText,
            { color: item.inscricoes && item.inscricoes.length > 0 ? "#28a745" : "#dc3545" },
          ]}
        >
          Total de Inscritos: {item.inscricoes?.length || 0}
        </Text>
      </View>

      {/* Botão de Inscrição */}
      {owner !== user?.id &&
        (!isUserSubscribed ? (
          <TouchableOpacity style={styles.subscribeButton} onPress={() => onSubscribe(item.id!)}>
            <Text style={styles.subscribeButtonText}>Tornar-se participante</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.alreadySubscribed}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#28a745" />
            <Text style={styles.alreadySubscribedText}>Você já está inscrito!</Text>
          </View>
        ))}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  properties: {
    marginBottom: 16,
  },
  property: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  propertyText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  propertyKey: {
    fontWeight: "bold",
    color: "#333",
  },
  subscribers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  subscriberText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  subscribeButton: {
    backgroundColor: "#FF7F50",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  alreadySubscribed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alreadySubscribedText: {
    fontSize: 14,
    color: "#28a745",
    marginLeft: 8,
    fontStyle: "italic",
  },
});
