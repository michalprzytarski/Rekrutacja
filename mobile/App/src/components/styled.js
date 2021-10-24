import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

export const CardWrapper = styled.View`
  background-color: black;
  border-radius: 15px;
  margin: 8px;
  overflow: hidden;
  elevation: 16;
  shadow-color: ${props => props.shadowColor || '#000000'};
  min-width: 200px;
  /* min-height: 20%; */
  /* max-width: 100%; */
  aspect-ratio: 1;
`;

export const CardImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
  /* min-height: 150px; */
`;

export const CardContentWrapper = styled.View`
  padding: 8px;
  background-color: ${props => props.backgroundColor || '#646464'};
  /* flex: 1; */
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
  background-color: #00000050;
  padding: 8px 16px 4px 16px;
  text-shadow: 0 0 1px grey;
`;

export const CardText = styled.Text`
  font-size: 12px;
  padding: 0px 8px 8px 8px;
  color: white;
  text-shadow: 0 0 1px grey;
  text-align: justify;
`;

export const CardDetails = styled.View`
  flex-direction: row;
  /* align-items: space-around; */
  justify-content: space-around;
  /* flex: 1; */
`;

export const CardDetailsText = styled.Text`
  font-size: 8px;
  color: white;
`;

export const CardImage = styled.Image`
  border-radius: 5px;
  height: 150;
`;

export const Separator = styled.View`
  /* flex: 1; */
  height: 1px;
  background-color: ${props => props.color || 'white'};
  opacity: 0.5;
  margin: 8px;
  padding: 0;
`;

export const ArticleTitle = styled.Text`
  font-size: 32px;
  color: ${props => props.color || 'black'};
  font-weight: bold;
  padding: 8px;
  margin: 3px;
`;

export const AriticleImage = styled.Image`
  height: 300px;
`;

export const ArticleDate = styled.Text`
  text-align: right;
  margin: 8px 8px 8px 0px;
  font-size: 10px;
`;

export const ArticleText = styled.Text`
  text-align: justify;
  margin: 8px;
  ${props => (props.color ? {color: props.color} : {})};
`;

export const MyButton = styled.Pressable`
  background-color: ${props => props.color || 'green'};
  padding: 12px;
  margin: 6px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  shadow-color: black;
  elevation: 2;
`;

export const MyButtonText = styled.Text`
  color: ${props => props.color || 'white'};
  font-weight: bold;
  font-size: 16px;
`;
