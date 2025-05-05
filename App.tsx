//npm install @react-navigation/stack
//npm install @react-navigation/native
//npm install react-native-screens react-native-safe-area-context
//npm install react-native-vector-icons

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/Screens/Home.tsx';
import GameDetails from './src/Screens/GameDetails.tsx';

const Stack = createStackNavigator();

const App = () => {
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameDetails" component={GameDetails} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
