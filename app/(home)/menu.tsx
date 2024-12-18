import ProfileHeader from "@/components/userPage/ProfileHeader";
import { useAuth } from "@/context";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MenuItem from "@/components/Menu/Itens";



export default function MenuPage() {
    const { user } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-white px-2">
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header do Perfil */}
                <ProfileHeader
                    email={user?.email}
                    name={user?.nome_completo}
                    image={user?.foto_perfil}
                />


                {/* Descrição do Menu */}
                
                <View style={{  
                borderTopWidth: 2,
                borderTopColor: '#CACACA',
                padding: 8,
                margin: 8
         }}>
                <Text className="text-lg" style={{
                    color : "#CACACA",
                    fontFamily: 'SpaceMono'
                }}>Principais definições</Text>
              </View>
                {/* Lista de Itens */}
                <View className="mt-2">
                    <MenuItem
                        title="Perfil"
                        description="Veja e reveja seus dados pessoais"
                        link="/(user)/profile"
                    />
                     <MenuItem
                        title="Candidaturas"
                        description="Veja suas candidaturas"
                        link="/settings"
                    />
                   {user?.tipo_perfil === 'sorteador' && ( 
                       <>  
                           <MenuItem
                               title="Criar Sorteio"
                               description="Crie sorteios de forma simples e rápida"
                               link="/(one)/raffle_form"
                           />
                           <MenuItem
                               title="Painel de Admin"
                               description="Faça a gestão eficiente dos seus sorteios"
                               link="/painel/"
                           />
                       </>
                   )}
                    <MenuItem
                        title="Feedback"
                        description="Envie suas sugestões ou reclamações"
                        link="/search"
                    />
                    <MenuItem
                        title="Caixa de Notificações"
                        description="Veja seu histórico de sorteio"
                        link="/settings"
                    />

                </View>


              <View style={{  
                borderTopWidth: 2,
                borderTopColor: '#CACACA',
                padding: 8,
                marginTop: 25
         }}>
                <Text className="text-lg" style={{
                    color : "#CACACA",
                    fontFamily: 'SpaceMono'
                }}>Mais</Text>
              </View>

                <View className="mt-2">
                <MenuItem
                        title="Seguraça"
                        description="Altere sua senha de acesso"
                        link="/featured"
                    />
                    <MenuItem
                        title="Sobre Nós"
                        description="Conheça nossa plataforma e nossos serviços"
                        link="/home"
                    />
                    <MenuItem
                        title="Politica de Privacidade"
                        description="Veja os detalhes de importantes"
                        link="/featured"
                    />
                      <MenuItem
                        title="Seguraça"
                        description="Altere sua senha de acesso"
                        link="/featured"
                    />
                </View>
              
                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        © 2024 Sorteio App. Todos os direitos reservados.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        marginVertical: 20,
        paddingHorizontal: 14,
        paddingVertical: 20,
    },
    footer: {
        marginTop: 30,
        paddingVertical: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerText: {
        color: '#888',
        fontSize: 14,
    },
});
