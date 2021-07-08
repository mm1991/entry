/**
 * 导航栏 - 时间筛选
 */

import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {selectTime} from '../../../globalConfig';
import {formatDatePicker} from '../../../utils/formatTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateFrom from '../../../assets/images/date-from.svg';
import DateTo from '../../../assets/images/date-to.svg';
import {Observer, useLocalObservable} from 'mobx-react';
import {stores} from '../../../store';
import {PURPLE, TEXT_PURPLE, BACK_WHITE, ACTIVE_GREEN} from '../../../styles';

export default function TimeList({
  seleced,
  onSelectTime,
}: {
  seleced: number;
  onSelectTime: Function;
}) {
  const store = useLocalObservable(() => stores);
  // 是否选中LATER
  const [showSelect, setShowSelct] = useState(seleced === 5);
  // 是否展示日期选择器
  const [showPicker, setShowPicker] = useState(false);
  // 当前选中日期
  const [date, setDate] = useState(new Date().getTime());
  // 判断LATER选中开始还是结束
  const [startShow, setStartShow] = useState(true);

  // 选择日期
  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    // 收起日期选择器
    setShowPicker(false);
    if (startShow && currentDate) {
      // 设置LATER开始时间
      store.setStartTime(new Date(currentDate).getTime());
    } else {
      // 设置LATER结束时间
      store.setEndTime(new Date(currentDate).getTime());
    }
    onSelectTime(5);
  };
  const channelNodes = selectTime.map(times => {
    return (
      <View
        style={[
          styles.labelContainer,
          seleced === times.id && styles.selectLabelBackActive,
        ]}
        key={times.id}
      >
        <Text
          style={[
            styles.selectLabel,
            seleced === times.id && styles.selectLabelActive,
          ]}
          onPress={() => {
            onSelectTime(times.id);
            setShowSelct(times.id === 5);
          }}
        >
          {times.name}
        </Text>
      </View>
    );
  });
  return (
    <Observer>
      {() => (
        <View>
          <View style={styles.selectLabelWrapper}>{channelNodes}</View>
          {showSelect && seleced === 5 && (
            <View style={styles.dateSelectWrapper}>
              <View style={styles.dateSelectSubWrapper}>
                <DateFrom style={styles.dateImage} />
                <Text
                  style={[
                    styles.dateText,
                    showPicker && startShow && styles.selectLabelBackActive,
                  ]}
                  onPress={() => {
                    if (!showPicker) {
                      setDate(store.startTime);
                      setShowPicker(true);
                      setStartShow(true);
                    }
                  }}
                >
                  {formatDatePicker(store.startTime)}
                </Text>
              </View>
              <Text style={styles.lineText}>-</Text>
              <View style={styles.dateSelectSubWrapper}>
                <DateTo style={styles.dateImage} />
                <Text
                  style={[
                    styles.dateText,
                    showPicker && !startShow && styles.selectLabelBackActive,
                  ]}
                  onPress={() => {
                    if (!showPicker) {
                      setDate(store.endTime);
                      setShowPicker(true);
                      setStartShow(false);
                    }
                  }}
                >
                  {formatDatePicker(store.endTime)}
                </Text>
              </View>
            </View>
          )}
          {showPicker && (
            <View style={styles.datePicker}>
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(date)}
                is24Hour={true}
                onChange={onChange}
                style={{flex: 1}}
                display={'spinner'}
                textColor={'white'}
              />
            </View>
          )}
        </View>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({
  selectLabelWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  labelContainer: {
    borderRadius: 24,
  },
  selectLabel: {
    color: '#E8E8E8',
    fontSize: 13,
    lineHeight: 24,
    paddingLeft: 7,
    paddingRight: 7,
  },
  selectLabelActive: {
    color: PURPLE,
    fontWeight: 'bold',
  },
  selectLabelBackActive: {
    backgroundColor: ACTIVE_GREEN,
  },
  datePicker: {
    width: 250,
    height: 200,
    left: -20,
  },
  dateImage: {
    width: 12,
    height: 12,
  },
  dateSelectSubWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSelectWrapper: {
    flexDirection: 'row',
    backgroundColor: BACK_WHITE,
    marginRight: 16,
    height: 38,
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: -5,
  },
  dateText: {
    color: TEXT_PURPLE,
    lineHeight: 20,
    marginLeft: 6,
  },
  lineText: {
    paddingLeft: 8,
    paddingRight: 8,
    color: '#E5F7A9',
    marginTop: 10,
  },
});
