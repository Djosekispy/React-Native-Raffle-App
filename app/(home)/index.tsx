import ImageCarousel from "@/components/home/carrosel";
import ProfileHeader from "@/components/userPage/ProfileHeader";
import { useAuth } from "@/context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";


const images = [
  'https://source.unsplash.com/random/800x600?car',
  'https://source.unsplash.com/random/800x600?nature',
  'https://source.unsplash.com/random/800x600?city',
  'https://source.unsplash.com/random/800x600?technology',
];
function formatarData(data : string) {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
  
    const date = new Date(data);
    const mes = meses[date.getMonth()]; 
    const ano = date.getFullYear();
  
    return `${mes} ${ano}`;
  }
  
  
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("data"); // "data" ou "hora"
  const { user} = useAuth();
  // Mock de categorias
  const categories = ["Todas", "Tecnologia", "Moda", "Viagens", "Outros"];
  
  // Mock de resultados
  const results = [
    {
      id: 1,
      title: "Sorteio de um iPhone 15",
      category: "Tecnologia",
      inscritos: 1200,
      data: "2024-12-10",
      estado: "Aberto",
      image: "https://picsum.photos/150/150",
    },
    {
      id: 2,
      title: "Viagem para Bali",
      category: "Viagens",
      inscritos: 450,
      data: "2024-12-15",
      estado: "Encerrado",
      image: "https://picsum.photos/150/150",
    },
  ];

  const handleFilterSelect = (filter : any) => {
    setSelectedFilter(filter);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "data" ? "hora" : "data"));
  };

  const filteredResults = results.filter((item) =>
    selectedFilter === "Todas" ? true : item.category === selectedFilter
  );

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Cabeçalho */}
      <Text className="text-2xl font-bold mb-4">Sorteio App !</Text>
      <ProfileHeader
                    email={user?.email}
                    name={user?.nome_completo}
                    image={user?.foto_perfil}
                />
      {/* Formulário de Busca */}
      <View className="flex-row items-center space-x-2 mb-4 gap-2">
      <ImageCarousel images={images} />
      </View>

      {/* Filtros por Categoria */}
      <View className="flex-row space-x-2 mb-4">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleFilterSelect(category)}
            className={`px-4 py-2 rounded-lg mx-2 ${
              selectedFilter === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedFilter === category ? "text-white" : "text-gray-800"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Opção de Alterar Ordem */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-600">Ordenar por:</Text>
        <TouchableOpacity onPress={handleSortChange}>
          <Text className="text-blue-500 font-medium">
            {sortOrder === "data" ? "Data" : "Hora"}
          </Text>
        </TouchableOpacity>
      </View>

{/* Lista de Resultados */}
<FlatList
  showsVerticalScrollIndicator={false}
  data={filteredResults}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2} // Número de colunas
  columnWrapperStyle={{
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  }}
  renderItem={({ item }) => (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4 w-[48%]">
      {/* Imagem */}
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-44"
          resizeMode="cover"
          style={{ aspectRatio: 1 / 1 }}
        />

        {/* Categoria (Inferior Esquerdo) */}
        <Text
          className="absolute bottom-2 left-2 bg-black text-white text-xs font-medium py-1 px-2 rounded"
        >
          {item.category}
        </Text>

        {/* Total de Inscritos (Superior Direito) */}
        <View
          className="absolute top-2 right-2 bg-black text-white text-xs font-medium py-1 px-2 rounded flex-row items-center"
        >
          <Ionicons name="people" size={12} color="white" />
          <Text className="ml-1 text-white">{item.inscritos}</Text>
        </View>
      </View>

      {/* Conteúdo */}
      <View className="p-4">
        <Text   numberOfLines={1} className="text-lg font-bold mb-2">{item.title}</Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="calendar" size={20} color="gray" />
          <Text className="text-sm text-gray-600 ml-2 font-medium">
            {formatarData(item.data)}
            </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons
            name={item.estado === 'Aberto' ? 'checkmark-circle' : 'close-circle'}
            size={20}
            color={item.estado === 'Aberto' ? 'green' : 'red'}
          />
          <Text
            className={`text-sm font-medium ml-2 ${
              item.estado === 'Aberto' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {item.estado}
          </Text>
        </View>
      </View>
    </View>
  )}
/>


    </View>
  );
};

export default HomePage;
