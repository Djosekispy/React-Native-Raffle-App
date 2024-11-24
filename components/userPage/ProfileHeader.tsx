import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { authService } from '@/model/service/auth';
import { useAuth } from '@/context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface ProfileHeaderProps {
    name?: string;
    email?: string;
    image? : string;
    onRefresh ? : ()=>void;
}
const userAvatar = 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, image,onRefresh}) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const { user , replaceLocalUseData} = useAuth();
    const [ isImage, setIsImage ] = useState('')
    const [imageFile, setImageFile ] = useState<DocumentPicker.DocumentPickerAsset | null>(null)
    const  [ isError, setError ] = useState('');
    const pickerDocument = async () => {
      setError('')
        if (isLoading) return;
        setIsLoading(true);
        try {
          const document = await DocumentPicker.getDocumentAsync({
            type: 'image/*', 
            copyToCacheDirectory: true, 
          });
    
          if (!document.canceled) {
            const file = document.assets?.[0];
            if (file) {
              setImageFile(file); 
              setIsImage(file.uri)
            } else {
              alert('Nenhuma imagem válida foi selecionada.');
            }
          } 
        } catch (error) {
          console.error('Erro ao selecionar documento:', error);
          alert('Ocorreu um erro ao selecionar o documento. Tente novamente.');
        } finally {
          setIsLoading(false); 
        }
      };
      const onSubmit = async () => {
        setIsLoading(true)
        setError('')
        try {
           const result = await authService.updateProfileImage(imageFile as DocumentPicker.DocumentPickerAsset,user?.token_acesso);
           if( result && 'error' in result){
            setError(result.error)
            if(!result.error){
              setError('ligação com a internet instável')
              return;
            }
           }
           const updateuser = await replaceLocalUseData();
           if('error' in updateuser){
            setError(updateuser?.error)
            return;
           }
           setImageFile(null)
           onRefresh && onRefresh()
        } catch (error) {
          setError(error as string)
        }finally{
          setIsLoading(false)
        }
      }

    return (
<>
      
        <View className="p-5 bg-gray-100 border-b border-gray-300 flex flex-row gap-4 items-center mb-4">
            <View className="mr-4 relative">
                <Image
                    source={{uri : image ? image : (isImage ? isImage : userAvatar)}}
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                />
                <TouchableOpacity disabled={isLoading} style={{ position: 'absolute', bottom: 0, right: 0 }} onPress={pickerDocument}>
              {isLoading ? <ActivityIndicator size={24} color='red' />  : <MaterialIcons name="published-with-changes" size={24} color="black" />}
                </TouchableOpacity>
            </View>
            <View>
                <Text className="text-2xl font-bold">{name}
                    <Link href='/(user)/edit' asChild>
                    
                    <Text className="text-gray-700">{'\u270E'}</Text>
                    </Link>
                    </Text>
                <Text className="text-gray-700">{email}</Text>
            </View>
        </View>
        {isError && (
         <View className="bg-red-100   rounded-md p-3 m-4">
           <Text className="text-red-700 font-medium">
             {isError}
           </Text>
         </View>
       )}
        {imageFile && (
            <TouchableOpacity
             disabled={isLoading} 
             onPress={onSubmit}
             style={{backgroundColor: '#212627'}}
             className="bg-[#212627] p-3 mt-4 rounded-lg hover:bg-blue-700 active:bg-blue-800"
             >
                <Text className='text-white text-lg text-center font-bold'>Atualizar imagem</Text>
            </TouchableOpacity>
        )}
    </>
    );
};

export default ProfileHeader;