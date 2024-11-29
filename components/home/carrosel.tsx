import React, { useRef, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Avança o slide automaticamente
  React.useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current?.snapToNext();
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={true}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200, // Altura do carrossel
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ddd',
  },
});

export default ImageCarousel;
