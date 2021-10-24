import React from 'react';
import {View, Button, Text} from 'react-native';
import {MyButton, MyButtonText} from './styled';

export default function SitesNavigationBar(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <MyButton
        onPress={() => {
          if (props.siteNumber >= 1) props.setSiteNumber(props.siteNumber - 1);
        }}>
        <MyButtonText> {'<'} </MyButtonText>
      </MyButton>
      <Text>{props.siteNumber + 1}</Text>
      <MyButton
        title=">"
        onPress={() => {
          props.setSiteNumber(props.siteNumber + 1);
        }}>
        <MyButtonText> {'>'} </MyButtonText>
      </MyButton>
    </View>
  );
}
