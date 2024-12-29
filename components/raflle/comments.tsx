import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from "react-native";
import { useAuth } from "@/context";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { User } from "@/interfaces/user";
import { IRaffle } from "@/interfaces/IRaffles";

type RaffleComments = {
  titulo: "Avaliação" | "Crítica";
  conteudo: string;
  sorteioId?: number;
};

type Comment = {
  id: number;
  titulo: "Avaliação" | "Crítica";
  conteudo: string;
  usuario: User,
  sorteio : IRaffle
};

function Comments({ id }: { id: number }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<"Avaliação" | "Crítica" | "">("");
  const [formData, setFormData] = useState<RaffleComments>({
    titulo: "Avaliação",
    conteudo: "",
  });
  const getComments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/complaints/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      setComments(response.data.response);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const sendComment = async (data: RaffleComments) => {
    setIsLoading(true);
    try {
      data.sorteioId = id;
      const response = await api.post(`/complaints`, data, {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      Alert.alert('Message',`Sua ${data.titulo} foi enviado com sucesso`)
      await(getComments)
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Erro ao comentar',error.response?.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, [id]);

  const filteredComments = filter
    ? comments.filter((comment) => comment.titulo === filter)
    : comments;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>Comentários</Text>
      <View style={{ marginBottom: 16 }}>
        <View style={{ marginBottom: 8 }}>
          <TouchableOpacity
            onPress={() =>
              setFormData((prev) => ({
                ...prev,
                titulo: prev.titulo === "Avaliação" ? "Crítica" : "Avaliação",
              }))
            }
            style={{
              backgroundColor: "#f0f0f0",
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Text>{formData.titulo}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
          }}
          placeholder="Escreva seu comentário..."
          value={formData.conteudo}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, conteudo: text }))}
        />
        <TouchableOpacity
          onPress={() => sendComment(formData)}
          disabled={isLoading || !formData.conteudo}
          style={{
            backgroundColor: isLoading || !formData.conteudo ? "#ccc" : "#007bff",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            {isLoading ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setFilter("Avaliação")}
          style={{
            backgroundColor: filter === "Avaliação" ? "#ddd" : "#f0f0f0",
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text>Avaliação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("Crítica")}
          style={{
            backgroundColor: filter === "Crítica" ? "#ddd" : "#f0f0f0",
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text>Crítica</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("")}
          style={{
            backgroundColor: filter === "" ? "#ddd" : "#f0f0f0",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Text>Todos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 16,
              padding: 12,
              backgroundColor: "#f9f9f9",
              borderRadius: 8,
            }}
          >
            <Image
              source={{ uri: item.usuario.foto_perfil }}
              style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
            />
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.usuario.nome_completo}</Text>
              <Text style={{ fontStyle: "italic", color: "#555" }}>{item.titulo}</Text>
              <Text>{item.conteudo}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum comentário encontrado.</Text>}
      />
      {isLoading && <ActivityIndicator size="large" color="#007bff" />}
    </View>
  );
}

export default Comments;
