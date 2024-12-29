import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity,  Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";

const notificationsMock: NotificationDTO[] = [
    {
      id: 1,
      usuarioId: 101,
      title: "Nova Atualização Disponível",
      message: "A versão 2.0 do aplicativo foi lançada com melhorias de desempenho e novos recursos.",
      status: "pendente",
      createdAt: new Date("2024-12-29T10:30:00"),
    },
    {
      id: 2,
      usuarioId: 102,
      title: "Sorteio Concluído",
      message: "O sorteio 'Casa dos Sonhos' foi encerrado com sucesso. Verifique os vencedores!",
      status: "lido",
      createdAt: new Date("2024-12-28T16:45:00"),
    },
    {
      id: 3,
      usuarioId: 103,
      title: "Erro no Sistema",
      message: "Houve um erro ao processar sua inscrição no sorteio. Por favor, tente novamente.",
      status: "pendente",
      createdAt: new Date("2024-12-27T08:15:00"),
    },
    {
      id: 4,
      usuarioId: 104,
      title: "Novo Sorteio Aberto",
      message: "Um novo sorteio foi aberto! Participe e concorra a prêmios incríveis.",
      status: "pendente",
      createdAt: new Date("2024-12-25T14:00:00"),
    },
    {
      id: 5,
      usuarioId: 105,
      title: "Manutenção Programada",
      message: "A manutenção do sistema será realizada na madrugada de amanhã. Fique atento às atualizações.",
      status: "lido",
      createdAt: new Date("2024-12-20T18:00:00"),
    },
  ];
  
type NotificationDTO = {
  id?: number;
  usuarioId: number;
  title: string;
  message: string;
  status?: 'lido' | 'pendente';
  createdAt?: Date;
  updatedAt?: Date;
};

const NotificationList: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationDTO[]>(notificationsMock);
  const [isLoading, setIsLoading] = useState(false);

  const getNotifications = async () => {
    setIsLoading(true);
    try {
      const token = user?.token_acesso;
      const response = await api.get('/users/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //setNotifications(response.data);  // Assuming the response is an array of NotificationDTO
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert("Erro ao carregar notificações", "Ops! Algo deu errado.");
      } else {
        Alert.alert("Erro ao carregar notificações", "Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const renderNotificationIcon = (status: string) => {
    switch (status) {
      case "info":
        return <Ionicons name="information-circle" size={24} color="#007BFF" />;
      case "success":
        return <Ionicons name="checkmark-circle" size={24} color="#28A745" />;
      case "warning":
        return <Ionicons name="alert-circle" size={24} color="#FFC107" />;
      case "error":
        return <Ionicons name="close-circle" size={24} color="#DC3545" />;
      default:
        return <Ionicons name="notifications" size={24} color="#6C757D" />;
    }
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <View className='p-4 mt-4 flex-row justify-evenly items-center'>
        <Ionicons name='arrow-back' size={25} color={"#000"} onPress={() => router.back()} />
        <Text className='font-bold text-2xl text-black px-12 text-center my-4 py-2 rounded-2xl'>Minhas Notificações</Text>
      </View>
      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id?.toString() || ""}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row items-center justify-center gap-2 p-4 mb-2 rounded-lg shadow-md ${item.status === "lido" ? "bg-gray-200" : "bg-white"}`}
          >
            <View className="mr-4">{renderNotificationIcon(item.status || "info")}</View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
              <Text className="text-sm text-gray-600">{item.message}</Text>
              <Text className="text-xs text-gray-500 mt-1">{new Date(item.createdAt || "").toLocaleString()}</Text>
            </View>
            {item.status !== "lido" && (
              <View className="ml-4 bg-blue-500 rounded-full w-3 h-3" />
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-64">
            <Ionicons name="notifications-off" size={48} color="#6C757D" />
            <Text className="text-gray-500 mt-4">Sem notificações no momento.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationList;
