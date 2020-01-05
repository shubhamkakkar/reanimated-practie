import React from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';

const { height: HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = HEIGHT / 3;
const BODY_HEIGHT = HEIGHT / 2;
const BUTTON_HEIGHT = HEADER_HEIGHT * 2;

function Default({ title }) {
  return (
    <View style={s.flex}>
      <Text>{title}</Text>
    </View>
  );
}

export default function App() {
  const opacity = new Animated.Value(0);
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, []);

  const transitionHeader = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const transitionBody = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT, BODY_HEIGHT],
    extrapolate: 'clamp',
  });

  const transitionButton = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT, BUTTON_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={s.flex}>
      <Animated.View
        style={[
          s.flex,
          StyleSheet.absoluteFill,
          {
            opacity,
            transform: [{ translateY: transitionHeader }],
          },
        ]}>
        <Default title={'Header'} />
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity,
            transform: [{ translateY: transitionBody }],
          },
        ]}>
        <Default title={'Body'} />
      </Animated.View>
      <Animated.View
        style={[
          s.flex,
          StyleSheet.absoluteFill,
          {
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

