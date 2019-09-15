import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from './constants/Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PurpleBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
