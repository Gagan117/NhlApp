import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import Event from '../components/Event.tsx';
//https://reactnavigation.org/docs/bottom-tab-navigator/
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaybyPlay from '../GameDetailsTabs/PlaybyPlay.tsx';
import BoxScore from '../GameDetailsTabs/BoxScore.tsx';

const Tab = createBottomTabNavigator();

//page
const GameDetails = ({ route }) => {
  const { game } = route.params;

  return(
    <Tab.Navigator>
      <Tab.Screen name="PlaybyPlay" component={() => <PlaybyPlay game={game}/>}/>
      <Tab.Screen name="BoxScore" component={() => <BoxScore game={game}/>}/>
    </Tab.Navigator>
  );

};

export default GameDetails;
