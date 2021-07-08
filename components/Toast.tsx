/**
 * 输入框
 */

import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {TEXT_PURPLE, ACTIVE_GREEN} from '../styles';

const Toast = React.memo(
  forwardRef((props, ref: any) => {
    const [message, setMessage] = useState('');
    const top = useRef(new Animated.Value(-86)).current;
    useImperativeHandle(ref, () => ({
      // changeVal 就是暴露给父组件的方法
      showToast: (message: string) => {
        setMessage(message);
        Animated.timing(top, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          Animated.timing(top, {
            toValue: -86,
            duration: 800,
            useNativeDriver: true,
          }).start();
        }, 2000);
      },
    }));

    return (
      <Animated.View
        style={[
          styles.toastWrapper,
          {
            transform: [
              {
                translateY: top,
              },
            ],
          },
        ]}
      >
        <View style={styles.toastBg}></View>
        <Text style={styles.toastMessage}>{message}</Text>
      </Animated.View>
    );
  })
);

const styles = StyleSheet.create({
  toastWrapper: {
    height: 32,
    position: 'absolute',
    top: 86,
    left: 0,
    width: '100%',
    zIndex: 3,
  },
  toastBg: {
    backgroundColor: ACTIVE_GREEN,
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 32,
  },
  toastMessage: {
    textAlign: 'center',
    color: TEXT_PURPLE,
    fontWeight: 'bold',
    lineHeight: 32,
  },
});

export default Toast;
