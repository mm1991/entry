import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Provider} from 'mobx-react';
import {stores} from './store';
import Navigation from './navigation';
import {BACK_WHITE} from './styles';

export default function App() {
  return (
    <Provider store={stores}>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACK_WHITE,
  },
});
