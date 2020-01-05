import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useValues, onScroll } from "react-native-redash";
import HeaderImage from "./HeaderImage";
import Content, { defaultTabs } from "./Content";
import Header from "./Header";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const [y] = useValues([0], []);
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y }} />
      <Animated.ScrollView
        onScroll={onScroll({ y })}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
      >
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
      <Header {...{ tabs, y }} />
    </View>
  );
};
