import React, { useState } from "react";
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isAxiosError } from "axios";
import { useAuth } from "@/context";
import { IRaffle } from "@/interfaces/IRaffles";
import { api } from "@/utils/api";

const RaffleInfo = ({ raffle }: { raffle: IRaffle }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteRaffleData = async (id: number) => {
    setIsLoading(true);
    try {
      const token = user?.token_acesso;
      await api.delete(`/raffles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Sucesso", "Sorteio deletado com sucesso!");
      router.back();
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert("Erro ao deletar sorteio", "Ops! Algo deu errado.");
      } else {
        Alert.alert("Erro ao deletar sorteio", "Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: raffle?.cover }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>{raffle?.nome}</Text>

      <View style={styles.rowBetween}>
        <View style={styles.rowAlignCenter}>
          <Ionicons name="calendar" size={20} color="gray" />
          <Text style={styles.dateText}>
            {new Date(raffle?.data_realizacao).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.rowAlignCenter}>
          <Ionicons
            name={raffle?.status === "corrente" ? "checkmark-circle" : "close-circle"}
            size={20}
            color={raffle?.status === "corrente" ? "green" : "red"}
          />
          <Text
            style={[
              styles.statusText,
              { color: raffle?.status === "corrente" ? "green" : "red" },
            ]}
          >
            {raffle?.status === "corrente" ? "Ativo" : "Encerrado"}
          </Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.descriptionText}>{raffle?.politicas}</Text>

        {user?.id === raffle.organizadorId && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push({ pathname: "/edit/edit_raffle", params: { id: raffle.id } })}
            >
              <Ionicons name="pencil" size={16} color="white" />
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteRaffleData(raffle.id as number)}
              disabled={isLoading}
            >
              <Ionicons name="trash" size={16} color="white" />
              <Text style={styles.buttonText}>{isLoading ? "Aguarde..." : "Apagar"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default RaffleInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
