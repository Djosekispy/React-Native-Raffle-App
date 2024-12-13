import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ScrollView, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context';
import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { IRaffle } from '@/interfaces/IRaffles';

interface Inscrito {
  id: number;
  name: string;
  status: string;
}

interface InfoCardProps {
  title: string;
  description: string;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof FontAwesome.glyphMap; 
}

interface RaffleItemProps {
  raffle: IRaffle;
  onViewDetails: (id: string) => void;
  onViewInscritos: (raffle: IRaffle) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => (
  <View className="bg-blue-100 p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold text-blue-800">{title}</Text>
    <Text className="text-sm text-blue-600">{description}</Text>
  </View>
);

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <View className="flex-1 bg-green-100 p-4 rounded-lg shadow-sm mr-4">
    <View className="flex-row items-center mb-2">
      <FontAwesome name={icon} size={20} color="#4CAF50" style={{ marginRight: 8 }} />
      <Text className="text-lg font-bold text-green-800">{label}</Text>
    </View>
    <Text className="text-2xl font-bold text-green-600">{value}</Text>
  </View>
);


const RaffleItem: React.FC<RaffleItemProps> = ({ raffle, onViewDetails, onViewInscritos }) => (
  <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <Text className="text-lg font-bold mb-2">{raffle.nome}</Text>
    <View className="flex-row justify-between">
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded"
        onPress={() => onViewDetails(String(raffle.id))}
      >
        <Text className="text-white">Ver Detalhes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 py-2 px-4 rounded"
        onPress={() => onViewInscritos(raffle)}
      >
        <Text className="text-white">Ver Inscritos</Text>
      </TouchableOpacity>
    </View>
  </View>
);


const AdminPanel: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
  const [view, setView] = useState<string>('main'); 
  const [selectedRaffle, setSelectedRaffle] = useState<IRaffle | null>(null);
  const [raffles, setRaffles] = useState<IRaffle[]>([]);
  const [ isLoading, setIsLoading] = useState(false)

  const handleViewDetails = (id: string) => {
    router.push({ pathname : '/(one)/', params: {id}})
  };

  const handleViewInscritos = (raffle: IRaffle) => {
    setSelectedRaffle(raffle);
    setView('inscritos');
  };

  const renderMainView = () => (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <InfoCard
        title="Instruções"
        description="Use este painel para gerenciar sorteios, categorias e itens. Clique nos botões abaixo para criar novos recursos."
      />

      <View className="flex-row justify-between mb-6">
        <View className="flex flex-col items-center">
          <TouchableOpacity className="bg-blue-600 py-3 px-6 rounded shadow">
          <AntDesign name="codesquareo" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">Criar Sorteio</Text>
        </View>
        <View className="flex flex-col items-center">
          <TouchableOpacity className="bg-purple-600 py-3 px-6 rounded shadow">
          <AntDesign name="barschart" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">Adicionar Categoria</Text>
        </View>
        <View className="flex flex-col items-center">
          <TouchableOpacity className="bg-teal-600 py-3 px-6 rounded shadow">
          <AntDesign name="plussquareo" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">Adicionar Item</Text>
        </View>
      </View>

     {isLoading ? <ActivityIndicator size={24} color={'gray'}/> : <FlatList
        data={raffles}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RaffleItem
            raffle={item}
            onViewDetails={()=>handleViewDetails(String(item.id))}
            onViewInscritos={handleViewInscritos}
          />
        )}
      />}
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
      <Text className="text-xl font-bold mb-4">Inscritos do Sorteio</Text>
      <FlatList
        data={[
          { id: 1, name: 'João', status: 'pendente' },
          { id: 2, name: 'Maria', status: 'aprovado' },
        ] as Inscrito[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-sm">Status: {item.status}</Text>
            {item.status === 'pendente' && (
              <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded mt-2">
                <Text className="text-white">Analisar Candidatura</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      <TouchableOpacity
        className="mt-4 py-2 px-4 bg-green-600 rounded"
        onPress={() => Alert.alert('PDF gerado!')}
      >
        <Text className="text-white">Imprimir PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-4 py-2 px-4 bg-red-600 rounded"
        onPress={() => setView('main')}
      >
        <Text className="text-white">Voltar</Text>
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
   if(isAxiosError(error)){
    console.error('Error fetching raffles:', error.response?.data?.message);
   }else{
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
    <View className='flex-row justify-start gap-12 items-center  pt-12 px-2'>
            <Ionicons name='arrow-back' size={25} color={"#000"}  onPress={()=>router.back()}/>
            <Text className="text-3xl font-bold text-gray-800 mb-2">Painel de gestão</Text>
    </View>
      {view === 'main' && renderMainView()}
      {view === 'details' && renderDetailsView()}
      {view === 'inscritos' && renderInscritosView()}
      {view === 'statistics' && renderStatisticsView()}
    </View>
  );
};

export default AdminPanel;
