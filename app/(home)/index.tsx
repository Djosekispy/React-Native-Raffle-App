import { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { IRaffle } from '@/interfaces/IRaffles';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context';
import { api } from '@/utils/api';
import ListaResultados from '@/components/home/itensrsult';
import CategoriesList from '@/components/home/categories';
import ImageCarousel from '@/components/home/carrosel';
import TopMenu from '@/components/home/topMenu';
import BannerPublicidade from '@/components/home/publicity';
import AdsSubscribe from '@/components/home/addSubscribe';
import { ItensSorteio } from '@/components/home/raffleItens';
import { isAxiosError } from 'axios';

const HomePage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avaliableRaffles, setAvaliableRaffles] = useState<IRaffle[]>([]);
  const [categoriesAvaliable, setCategoriesAvaliable] = useState<{ id: number; title: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);
  
  const router = useRouter();

  const itens = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    title: `item${index}`,
  }));

  const goToDetails = (id : number) => {
    router.push({pathname: '/(one)/', params: {id}});
  };

  const getAllRaffles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/raffles', {
        headers: {
          Authorization: `Bearer ${user?.token_acesso}`,
        },
      });
      const raffles = response.data.result;

      // Update raffles
      setAvaliableRaffles(raffles);

      // Extract unique categories and images
      const categoriesSet = new Map();
      const imageList: string[] = [];

      raffles.forEach((raffle : any) => {
        if (raffle.cover) {
          imageList.push(raffle.cover);
        }

        raffle.categorias?.forEach((category : any) => {
          if (!categoriesSet.has(category.id)) {
            categoriesSet.set(category.id, {
              id: category.id,
              title: category.nome,
            });
          }
        });
      });

      setImages(imageList);
      setCategoriesAvaliable([...categoriesSet.values()]);
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
    <ScrollView className="flex-1 bg-white px-4 pt-12 pb-20">
      <TopMenu />

      <View className="flex-row items-center space-x-2 mb-4 gap-2">
        <ImageCarousel images={images} />
      </View>

      <CategoriesList categories={categoriesAvaliable} onPress={() => setIsLoading(false)} />

      {isLoading ? (
        <ActivityIndicator size={35} color="gray" />
      ) : (
        <>
          <ListaResultados
            filteredResults={avaliableRaffles}
            label="Campanhas em Destaque"
            goToDetails={goToDetails}
          />
          <ListaResultados
            filteredResults={avaliableRaffles}
            label="Perto de Si"
            goToDetails={goToDetails}
          />
        </>
      )}

      <AdsSubscribe  />
      <BannerPublicidade />
      <ItensSorteio items={itens} />
    </ScrollView>
  );
};

export default HomePage;
