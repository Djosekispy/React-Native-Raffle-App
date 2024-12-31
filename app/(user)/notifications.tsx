import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity,  Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";

  
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
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
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
      setNotifications(response.data.notifications);  
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
      case "pendente":
        return <Ionicons name="information-circle" size={24} color="#007BFF" />;
      case "lido":
        return <Ionicons name="checkmark-circle" size={24} color="#28A745" />;
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
              <Text className="text-md font-semibold text-gray-800">{item.title}</Text>
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
