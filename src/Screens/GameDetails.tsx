import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaybyPlay from '../GameDetailsTabs/PlaybyPlay.tsx';
import BoxScore from '../GameDetailsTabs/BoxScore.tsx';
//https://stackoverflow.com/questions/57741074/rn-could-not-find-a-declaration-file-for-module-vendor-react-native-vector-ico
import IonIcon from 'react-native-vector-icons/Ionicons';
import Matchup from '../GameDetailsTabs/Matchup.tsx';

const Tab = createBottomTabNavigator();

//page
const GameDetails = ({ route }) => {
  const { game } = route.params;

  return(
    <Tab.Navigator>
      <Tab.Screen
        name="PlaybyPlay"
        component={() => <PlaybyPlay game={game}/>}
        //https://www.youtube.com/watch?v=7hMvA0ZZcbQ
        options={{tabBarIcon: () => (
          <IonIcon name="document-text-outline" size={30}/>
          )}}
      />
      <Tab.Screen
        name="BoxScore"
        component={() => <BoxScore game={game}/>}
        options={{tabBarIcon: () => (
            <IonIcon name="stats-chart-outline" size={30}/>
          )}}
      />
      <Tab.Screen
        name="Matchup"
        component={() => <Matchup game={game}/>}
        options={{tabBarIcon: () => (
            <IonIcon name="stats-chart-outline" size={30}/>
          )}}
      />
    </Tab.Navigator>
  );

};

export default GameDetails;
