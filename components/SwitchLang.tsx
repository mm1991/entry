/**
 * 切换语言组件
 */

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {stores} from '../store';
import {Observer, useLocalObservable} from 'mobx-react';
import {i18nT} from '../i18n';
import {GREEN} from '../styles';

const SwitchLang = React.memo(() => {
  const store = useLocalObservable(() => stores);

  // 通过改变store中lang参数切换语言
  const switchLang = () => {
    store.setLang(store.lang === 'en' ? 'zh' : 'en');
  };
  return (
    <Observer>
      {() => (
        <TouchableOpacity style={styles.switchBtn} onPress={switchLang}>
          <Text style={styles.switchText}>{i18nT('switch')}</Text>
        </TouchableOpacity>
      )}
    </Observer>
  );
});

const styles = StyleSheet.create({
  switchBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 25,
    zIndex: 3,
    borderColor: GREEN,
    borderWidth: 1,
  },
  switchText: {
    color: GREEN,
    textAlign: 'center',
    lineHeight: 23,
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default SwitchLang;
