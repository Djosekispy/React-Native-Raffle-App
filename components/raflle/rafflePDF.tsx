import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

const GeneratePDF = ({ inscritos }: { inscritos: any[] }) => {
  const generatePdfContent = () => {
    const rows = inscritos.map(
      (inscrito) => `
        <tr>
          <td>${inscrito.nome}</td>
          <td>${inscrito.sorteio}</td>
          <td>${inscrito.item}</td>
          <td>${inscrito.dataCandidatura}</td>
          <td>${inscrito.estadoCandidatura}</td>
        </tr>
      `
    );

    return `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Relatório de Inscritos</h1>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sorteio</th>
                <th>Item</th>
                <th>Data de Candidatura</th>
                <th>Estado da Candidatura</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const handleGeneratePdf = async () => {
    try {
      const htmlContent = generatePdfContent();
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      Alert.alert('PDF Gerado', 'O PDF foi gerado com sucesso.');
      await shareAsync(uri);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      Alert.alert('Erro', 'Não foi possível gerar o PDF.');
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        className="mt-4 py-2 px-4 w-full flex-row justify-between bg-green-600 rounded"
        onPress={handleGeneratePdf}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Gerar PDF</Text>
      <Ionicons name='document' size={25} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default GeneratePDF;
