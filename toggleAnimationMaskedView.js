import * as React from 'react';
import MaskedView from '@react-native-community/masked-view';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
const { width } = Dimensions.get('screen');
export default function ToggleMasked() {
  const [toggleTrue, setToggleTrue] = React.useState(true);
  const sizeMasked = width / 2 - 20;
  const opacity = new Animated.Value(toggleTrue ? 0 : 1);
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: toggleTrue ? 1 : 0,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [toggleTrue]);

  const translateX = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [20, sizeMasked],
    extrapolate: 'CLAMP',
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={() => setToggleTrue(prevState => !prevState)}>
        <MaskedView
          style={{
            backgroundColor: 'transparent',
          }}
          maskElement={
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderWidth: 1,
                marginHorizontal: 20,
                borderRadius: 20,
              }}>
              <Text>title {toggleTrue ? 'yes' : 'no'} </Text>
              <Text>tile B</Text>
            </View>
          }>
          <View style={{ padding: 20, backgroundColor: 'red' }} />
        </MaskedView>
        <Animated.View
          style={{
            flexDirection: 'row',
            backgroundColor: 'black',
            ...StyleSheet.absoluteFill,
            width: width / 2,
            borderWidth: 1,
            borderRadius: 20,
            transform: [{ translateX }],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Text style={{ color: 'white' }}>
            {toggleTrue ? 'title A' : 'title B'}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

