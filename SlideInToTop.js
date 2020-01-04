import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

function SlideInToTop({ children }) {
  let [refreshed, setRefreshed] = useState(true);
  const ref = useRef();

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={400} interpolation="easeIn" />
      <Transition.Change />
      <Transition.Together>
        <Transition.In
          type="slide-bottom"
          durationMs={400}
          interpolation="easeOut"
          propagation="bottom"
        />
        <Transition.In type="fade" durationMs={200} delayMs={200} />
      </Transition.Together>
    </Transition.Sequence>
  );

  React.useEffect(() => {
    ref.current.animateNextTransition();
    setRefreshed(!refreshed);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <View key={refreshed}>{children}</View>
      </Transitioning.View>
    </View>
  );
}

export default function App() {
  return (
    <SlideInToTop>
      <View>
        <Text>shubham</Text>
      </View>
    </SlideInToTop>
  );
}

