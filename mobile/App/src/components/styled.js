import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

export const CardWrapper = styled.View`
  background-color: aqua;
  border-radius: 15px;
  /* display: flex; */
  /* padding: 8px; */
  margin: 8px;
  overflow: hidden;
  elevation: 20;
  shadow-color: red;
  shadow-color: ${props => props.shadowColor || '#000000'};
`;

export const CardImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  min-height: 200px;
  /* border-radius: 10px; */
  /* overflow: hidden; */
`;

export const CardContentWrapper = styled.View`
  padding: 8px;
  background-color: ${props => props.backgroundColor || '#646464'};
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
  background-color: #00000050;
  padding: 8px;
  text-shadow: 0 0 1px grey;
  /* text-transform: capitalize; */
`;

export const CardText = styled.Text`
  font-size: 12px;
  color: white;
  text-shadow: 0 0 1px grey;
  text-align: justify;
`;

export const CardDetails = styled.View`
  flex-direction: row;
  /* align-items: space-around; */
  justify-content: space-around;
`;

export const CardDetailsText = styled.Text`
  font-size: 8px;
  color: white;
`;

export const CardImage = styled.Image`
  border-radius: 5px;
  width: 150;
  height: 150;
`;

export const Separator = styled.View`
  flex: 1;
  height: 1px;
  background-color: white;
  opacity: 0.5;
  margin: 3px;
  padding: 0;
`;
