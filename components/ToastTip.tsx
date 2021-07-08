import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import {StyleSheet, Text, View} from 'react-native';

let rootSibling: any = null;

export default class Toast {
  static show(message: string) {
    if (rootSibling) {
      rootSibling.destroy();
    }
    setTimeout(() => {
      if (rootSibling) {
        rootSibling.destroy();
      }
    }, 2000);

    rootSibling = new RootSiblings(
      (
        <View style={styles.toastWrapper}>
          <View style={styles.toastBackground}></View>
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
    top: 400,
    left: '50%',
    zIndex: 10,
    height: 40,
    marginLeft: -90,
    width: 180,
  },
  toastBackground: {
    backgroundColor: '#000',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 5,
  },
  message: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 14,
  },
});
