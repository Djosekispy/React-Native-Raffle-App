import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ItemProps = {
  id: string;
  title: string;
};

const ItensSorteio = ({ items }: { items: ItemProps[] }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [expanded, setExpanded] = useState(false);

  const renderItem = ({ item, index }: { item: ItemProps; index: number }) => (
    <View style={styles.item} key={index}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  const handleToggle = () => {
    if (expanded) {
      setVisibleItems(8); // Volta para o número inicial
    } else {
      setVisibleItems(items.length); // Exibe todos os itens
    }
    setExpanded(!expanded); // Alterna o estado
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
      <Text style={styles.header}>Itens para Sorteio</Text>
      <TouchableOpacity onPress={handleToggle} style={styles.button}>
        <Text style={styles.buttonText}>
          {expanded ? "Ver Menos" : "Ver Mais"}
        </Text>
      </TouchableOpacity>
      </View>
      
      <View style={styles.listContainer}>
        {items.slice(0, visibleItems).map((item, index) =>
          renderItem({ item, index })
        )}
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "47%", // 47% para margem entre itens
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  button: {
    padding: 4,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "black",
    textDecorationLine: 'underline',
    fontSize: 12,
    fontWeight: "bold",
  },
});

export { ItensSorteio, ItemProps };
