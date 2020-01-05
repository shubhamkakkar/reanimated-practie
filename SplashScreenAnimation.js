import React from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';

const { height: HEIGHT } = Dimensions.get('screen');
const HEADER_HEIGHT = HEIGHT / 6;
const BODY_HEIGHT = HEIGHT / 2;
const BUTTON_HEIGHT = HEIGHT - HEADER_HEIGHT;

function Default({ title }) {
  return (
    <View style={[s.flex, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text>{title}</Text>
    </View>
  );
}

export default function App() {
  const opacity = new Animated.Value(0);
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const transitionHeader = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, HEADER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const transitionBody = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT, BODY_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const transitionButton = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT, BUTTON_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={[s.flex, { backgroundColor: 'grey' }]}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFill,
            height: HEADER_HEIGHT,
            opacity,
            transform: [{ translateY: transitionHeader }],
          },
        ]}>
        <Default title={'Header'} />
      </Animated.View>
      <Animated.View
        style={[
          {
            backgroundColor: 'red',
            ...StyleSheet.absoluteFill,
            height: BODY_HEIGHT,
            opacity,
            top: BODY_HEIGHT/2
          },
        ]}>
        <Default title={'Body'} />
      </Animated.View>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFill,
            height: HEIGHT - BUTTON_HEIGHT,
            opacity,
            transform: [{ translateY: transitionButton }],
          },
        ]}>
        <Default title={'Button'} />
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

