import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import Animated from 'react-native-reanimated';

function Header({ height, transform }) {
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFill,
        height,
        transform,
        backgroundColor: 'grey',
        zIndex: 1000,
        elevation: 1000,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>haeding</Text>
    </Animated.View>
  );
}

const ImageF = () => (
  <View style={{ height: 200, margin: 20 }}>
    <Image
      style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
      source={require('./assets/snack-icon.png')}
    />
  </View>
);

const HEADER_HEIGHT = 70;

export default function App() {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerHeight = Animated.interpolate(diffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header
          {...{
            height: HEADER_HEIGHT,
            transform: [{ translateY: headerHeight }],
          }}
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ])}>
          <ImageF />
          <ImageF />
          <ImageF />
          <ImageF />
          <ImageF />
          <ImageF />
          <ImageF />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

