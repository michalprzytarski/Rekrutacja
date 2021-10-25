import React from 'react';
import {View, TextInput, Alert} from 'react-native';
import colors from '../constants/colors';
import {MyButton} from './styled';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SitesNavigationBar(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 8,
      }}>
      <MyButton
        color={colors.tint}
        onPress={() => {
          if (props.siteNumber >= 1) props.setSiteNumber(props.siteNumber - 1);
        }}>
        <Icon name="navigate-before" color="white" size={16} />
      </MyButton>
      <TextInput
        placeholder={(props.siteNumber + 1).toString()}
        keyboardType="numeric"
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: colors.tint,
        }}
        onSubmitEditing={e => {
          let val = e.nativeEvent.text;
          if (!isNaN(val) && val >= 1) props.setSiteNumber(Math.round(val - 1));
          else Alert.alert('Error', "Given value isn't valide site number!");
        }}
      />

      <MyButton
        color={colors.tint}
        onPress={() => {
          props.setSiteNumber(props.siteNumber + 1);
        }}>
        <Icon name="navigate-next" color="white" size={16} />
      </MyButton>
    </View>
  );
}
