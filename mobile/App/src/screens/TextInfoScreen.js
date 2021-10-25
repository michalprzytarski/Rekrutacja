import React from 'react';
import {View, Text} from 'react-native';
import colors from '../constants/colors';

export default function TextInfoScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 16, color: colors.tint}}>{props.text}</Text>
    </View>
  );
}
