import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  PanGestureHandler,
  State,
  ScrollView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const { height } = Dimensions.get('screen');

function Card() {
  return (
    <View style={styles.flex} contentContainerStyle={{ flexGrow: 1 }}>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
      <Text>shubhanm</Text>
    </View>
  );
}

const {
  event,
  cond,
  eq,
  greaterOrEq,
  defined,
  set,
  lessOrEq,
  lessThan,
  debug,
  greaterThan,
} = Animated;

export default class CardDrag extends React.PureComponent {
  constructor() {
    super();
    this.translateY = new Animated.Value(height - 100);
    const dragY = new Animated.Value(height - 100);
    const state = new Animated.Value(-1);
    const maxCardHeight = new Animated.Value(height / 3);
    const minCardHeight = new Animated.Value(height - 100);
    const wrong = new Animated.Value(0);
    this.onGestureEvent = event([
      {
        nativeEvent: {
          absoluteY: dragY,
          state,
        },
      },
    ]);
    const tempAnimatedValue = new Animated.Value();
    this.translateY = cond(
      eq(state, State.ACTIVE),
      [
        // active
        set(tempAnimatedValue, dragY),
        tempAnimatedValue,
      ],
      [
        //inactive
        set(
          tempAnimatedValue,
          cond(
            defined(tempAnimatedValue),
            [
              // defined
              cond(
                lessOrEq(dragY, minCardHeight),
                [
                  cond(
                    greaterThan(dragY, maxCardHeight),
                    [dragY],
                    [maxCardHeight]
                  ),
                ],
                [minCardHeight]
              ),
            ],
            [
              // not defined
              minCardHeight,
            ]
          )
        ),
        tempAnimatedValue,
      ]
    );
  }

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onGestureEvent}>
        <Animated.View
          style={{
            ...styles.cardContainer,
            transform: [{ translateY: this.translateY }],
          }}>
          <Card />
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

