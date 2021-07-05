import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import {StyleSheet, Text, View} from 'react-native';

let rootSibling = null;

function destroy() {
  if (rootSibling) {
    rootSibling.destroy();
  }
}

export default class Toast {
  static show(message) {
    if (rootSibling) {
      rootSibling.destroy();
    }
    rootSibling = new RootSiblings(
      (
        <View style={styles.toastWrapper}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )
    );
    return rootSibling;
  }
}

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 42,
    left: 0,
    zIndex: 2,
    height: 32,
    width: '100%',
    backgroundColor: '#E5F7A9',
  },
  message: {
    color: '#8560A9',
  },
});
