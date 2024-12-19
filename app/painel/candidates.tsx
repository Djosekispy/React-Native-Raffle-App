import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/context";
import { api } from "@/utils/api";
import { isAxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Candidate() {
    const { user } = useAuth();
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null); 
    const router = useRouter();

    const loadUserParticipations = async () => {
        try {
            const response = await api.get("/users/me/participations", {
                headers: {
                    Authorization: `Bearer ${user?.token_acesso}`,
                },
            });
            setParticipations(response.data.user);
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error.response?.data);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const cancelSubscription = async (participationId: number) => {
        try {
            await api.delete(`/raffles/${participationId}/participate`, {
                headers: {
                    Authorization: `Bearer ${user?.token_acesso}`,
                },
            });
            Alert.alert("Sucesso", "Subscrição cancelada com sucesso!");
            loadUserParticipations();
        } catch (error) {
            Alert.alert("Erro", "Falha ao cancelar subscrição.");
        }
    };
    useEffect(() => {
        loadUserParticipations();
    }, []);

    const renderParticipation = ({ item } ) => {
        const isExpanded = expandedId === item.id;
        const currentDate = new Date();
        const drawDate = new Date(item.item.categoria.sorteio.data_realizacao);

        return (
            <TouchableOpacity
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
                <Text className="text-lg font-bold text-green-500">
                     {item.item.categoria.sorteio.nome}
                </Text>
                <Text className="text-sm text-gray-600">
                    Estado da candidatura: {item.estado_candidatura}
                </Text>

                {isExpanded && (
                    <>
                    <View className="mt-2 flex-row justify-between">
                        <View className="flex-row items-center">
                            <Ionicons name="folder" size={24} color="gray" />
                            <Text className="text-sm text-gray-600 ml-2">
                               {item.item.categoria.nome}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="document" size={24} color="gray" />
                            <Text className="text-sm text-gray-600 ml-2">
                                 {item.item.nome}
                            </Text>
                        </View>
                    </View>
                {currentDate < drawDate ? (
                    <TouchableOpacity
                        onPress={() => cancelSubscription(item.id)}
                        className="mt-4 bg-red-500 p-2 rounded"
                    >
                        <Text className="text-center text-white font-bold">
                            Cancelar Subscrição
                        </Text>
                    </TouchableOpacity>
                ) :  (
                    <TouchableOpacity
                        className="mt-4 bg-green-500 p-2 rounded"
                        disabled
                    >
                        <Text className="text-center text-white font-bold">
                            Este Sorteio já foi realizado
                        </Text>
                    </TouchableOpacity>
                ) }
                    </>
                )}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#22c55e" />
                <Text className="mt-4 text-gray-700">Carregando candidaturas...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <View className="flex-row items-center justify-start py-4">
                <TouchableOpacity onPress={() => router.back()} className="ml-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-center px-4 text-gray-800">
                    Minhas Candidaturas
                </Text>
                <View className="w-6" />
            </View>

            {participations.length > 0 ? (
                <FlatList
                    data={participations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderParticipation}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <Text className="text-center text-gray-500 mt-8">
                    Nenhuma candidatura encontrada.
                </Text>
            )}
        </View>
    );
}
