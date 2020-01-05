import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import Tabs from "./Tabs";
import { TabModel } from "./Content";

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: "row"
  }
});

interface TabHeaderProps {
  tabs: TabModel[];
  transition: Animated.Node<number>;
}

export default ({ tabs, transition }: TabHeaderProps) => {
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs.length).fill(0)
  );

  const style = {
    borderRadius: 24,
    backgroundColor: "black",
    width: measurements[0],
    flex: 1
  };

  return (
    <Animated.View style={[styles.container, { opacity: transition }]}>
      <Tabs
        onMeasurement={(i, m) => {
          measurements[i] = m;
          setMeasurements([...measurements]);
        }}
        {...{ tabs }}
      />
      <View>
        <View {...{ style }} />
      </View>
      <Tabs
        active
        onPress={() => {
          return true;
        }}
        {...{ tabs }}
      />
    </Animated.View>
  );
};
