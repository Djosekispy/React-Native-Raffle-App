import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context';
import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { IRaffle } from '@/interfaces/IRaffles';
import { useLocalSearchParams } from 'expo-router';
import InfoCard from '@/components/painelScreen/infoCard';
import RaffleItem from '@/components/painelScreen/raffleItem';
import StatCard from '@/components/painelScreen/statCard';
import { ICategoria } from '@/interfaces/ICategory';
import { IItens } from '@/interfaces/IItens';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RafflePDF from '@/components/raflle/rafflePDF';
import GeneratePDF from '@/components/raflle/rafflePDF';


const AdminPanel: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [view, setView] = useState<string>('main'); 
    const [selectedRaffle, setSelectedRaffle] = useState<IRaffle | null>(null);
    const [raffles, setRaffles] = useState<IRaffle[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { msg } = useLocalSearchParams<{ msg: string }>();
    const [raffle, setRaffle] = useState<IRaffle | null>(null);
    const [categories, setCategories] = useState([]);
    const [itens, setItens] = useState<IItens[]>([]);
    const handleViewDetails = (id: string) => {
        router.push({ pathname: '/(one)/', params: { id } });
    };

    const handleViewInscritos = async (raffle: IRaffle) => {
      await fetchRaffleDetails(parseInt(String(raffle.id)))
        setView('inscritos');
    };


    const fetchRaffleDetails = async (id : number) => {
      setIsLoading(true);
      try {
        const response = await api.get(`/raffles/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token_acesso}`,
          },
        });
  
        const fetchedRaffle = response.data.result;
        setRaffle(fetchedRaffle);
        setSelectedRaffle(fetchedRaffle);  
        const fetchedCategories = fetchedRaffle.categorias?.map((cat : ICategoria) => ({
          id: cat.id,
          nome: cat.nome,
        })) || [];
        setCategories(fetchedCategories);
        const fetchedItens = fetchedRaffle.categorias
        ?.flatMap((cat : ICategoria) =>
          cat.itens?.map((item : IItens) => ({
            category : cat.id,
            id: item.id,
            nome: item.nome,
            propriedades: item.propriedades,
            descricao: item.descricao,
            inscricoes : item.inscricoes
          }))
        ) || [];
      setItens(fetchedItens);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error("Erro na API:", error.response?.data?.message || "Erro desconhecido");
        } else {
          console.error("Erro inesperado:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };


    const renderMainView = () => (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            <InfoCard
                title="Instruções"
                description="Use este painel para gerenciar sorteios, categorias e itens. Clique nos botões abaixo para criar novos recursos."
            />
            <View className="flex-row justify-between mb-6">
                <View className="flex flex-col items-center">
                    <TouchableOpacity className="bg-blue-600 py-3 px-6 rounded shadow" onPress={() => router.push('/(one)/raffle_form')}>
                        <AntDesign name="codesquareo" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-600">Criar Sorteio</Text>
                </View>
                <View className="flex flex-col items-center">
                    <TouchableOpacity className="bg-purple-600 py-3 px-6 rounded shadow" onPress={() => router.push('/(one)/category_form')}>
                        <AntDesign name="barschart" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-600">Adicionar Categoria</Text>
                </View>
                <View className="flex flex-col items-center">
                    <TouchableOpacity className="bg-teal-600 py-3 px-6 rounded shadow" onPress={() => router.push('/(one)/itens_form')}>
                        <AntDesign name="plussquareo" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-600">Adicionar Item</Text>
                </View>
            </View>
            {isLoading ? <ActivityIndicator size={24} color={'gray'} /> : (
                <FlatList
                    data={raffles}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <RaffleItem
                            raffle={item}
                            onViewDetails={() => handleViewDetails(String(item.id))}
                            onViewInscritos={handleViewInscritos}
                        />
                    )}
                />
            )}
        </ScrollView>
    );

    const renderDetailsView = () => (
        <View className="flex-1 bg-gray-100 p-4">
            <Text className="text-xl font-bold mb-4">Detalhes do Sorteio</Text>
            <Text className="text-lg mb-4">Título: {selectedRaffle?.nome}</Text>
            <TouchableOpacity className="bg-yellow-600 py-3 px-6 rounded shadow">
                <Text className="text-white text-center font-semibold">Editar Sorteio</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="mt-4 py-2 px-4 bg-red-600 rounded"
                onPress={() => setView('main')}
            >
                <Text className="text-white">Voltar</Text>
            </TouchableOpacity>
        </View>
    );

    const renderInscritosView = () => (
      <View className="flex-1 bg-gray-100 p-4">
          <FlatList
              data={itens}
              keyExtractor={(item) => item.id?.toString() ?? '0'}
              renderItem={({ item }) => (
                  <React.Fragment>
                      {item.inscricoes?.map((inscricao) => (
                           <View
                           key={inscricao.id}
                           className="bg-white p-4 rounded-lg shadow-md mb-3 flex-row items-center"
                         >
                           <View className="flex-1">
                             {/* Nome do Usuário */}
                             <View className="flex-row items-center mb-2">
                               <Ionicons name="person-circle-outline" size={20} color="#4CAF50" />
                               <Text className="text-lg font-bold ml-2">{inscricao.usuario?.nome_completo}</Text>
                             </View>
                     
                             {/* Estado da Candidatura */}
                             <View className="flex-row items-center mb-2">
                               <Ionicons name="checkmark-done-outline" size={20} color="#FF9800" />
                               <Text className="text-sm ml-2">{String(inscricao.estado_candidatura).toUpperCase()}</Text>
                             </View>
                     
                             {/* Nome do Item */}
                             <View className="flex-row items-center mb-4">
                               <Ionicons name="pricetag-outline" size={20} color="#2196F3" />
                               <Text className="text-sm ml-2">{item.nome}</Text>
                             </View>
                     
                             {/* Botão de Avaliar */}
                             <TouchableOpacity
                               className="bg-green-400 p-3 rounded-md flex-row items-center justify-center"
                            
                             >
                               <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                               <Text className="font-bold text-white ml-2">Avaliar candidatura</Text>
                             </TouchableOpacity>
                           </View>
                         </View>
                      ))}
                  </React.Fragment>
              )}
          />
          <GeneratePDF
      inscritos={itens.flatMap((item) =>
        item.inscricoes?.map((inscricao) => ({
          nome: inscricao.usuario?.nome_completo,
          sorteio: raffle?.nome,
          item: item.nome,
          dataCandidatura: inscricao.createdAt,
          estadoCandidatura: inscricao.estado_candidatura,
        }))
      )}
    />
          <TouchableOpacity
              className="mt-4 py-2 px-4 bg-red-600 rounded flex-row justify-between"
              onPress={() => setView('main')}
          >
              <Text className="text-white">Voltar</Text>
              <Ionicons name='arrow-back' size={25} color='white' />
          </TouchableOpacity>
      </View>
  );

    const renderStatisticsView = () => (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            <Text className="text-xl font-bold mb-4">Estatísticas</Text>
            <View className="flex-row mb-4">
                <StatCard label="Total de Inscritos" value={120} icon="users" />
                <StatCard label="Mais Inscritos" value={45} icon="trophy" />
            </View>
            <View className="flex-row mb-4">
                <StatCard label="Item Mais Concorrido" value="Smartphone" icon="gift" />
                <StatCard label="Média de Idade" value="28 anos" icon="bar-chart" />
            </View>
            <TouchableOpacity
                className="mt-4 py-2 px-4 bg-red-600 rounded"
                onPress={() => setView('main')}
            >
                <Text className="text-white">Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    const getAllRaffles = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/raffles/users/yours', {
                headers: {
                    Authorization: `Bearer ${user?.token_acesso}`,
                },
            });
            const raffles = response.data.result;
            setRaffles(raffles);

        } catch (error) {
            if (isAxiosError(error)) {
                console.error('Error fetching raffles:', error.response?.data?.message);
            } else {
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllRaffles();
    }, []);

    return (
        <View className="flex-1 bg-gray-100">
            <View className='flex-row justify-start gap-12 items-center pt-12 px-2'>
                <Ionicons name='arrow-back' size={25} color={"#000"} onPress={() => router.back()} />
                <Text className="text-2xl font-bold text-gray-800 mb-2">Painel de gestão</Text>
            </View>
            {msg && (
                <View className="bg-green-100 border border-green-500 p-2 m-4   rounded">
                    <Text className="text-green-500 text-center">{msg}</Text>
                </View>
            )}
            {view === 'main' && renderMainView()}
            {view === 'details' && renderDetailsView()}
            {view === 'inscritos' && renderInscritosView()}
            {view === 'statistics' && renderStatisticsView()}
        </View>
    );
};

export default AdminPanel;
