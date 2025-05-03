//npm install @react-navigation/stack
//npm install @react-navigation/native
//npm install react-native-screens react-native-safe-area-context

import * as React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
//https://github.com/software-mansion/react-native-svg?tab=readme-ov-file#installation
import {SvgUri} from 'react-native-svg';
import {createContext, useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const ScoreContext = createContext();

const ScoreProvider = ({children}) => {
  const [scoresData, setScoresData] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('https://api-web.nhle.com/v1/score/now'); // replace with your actual API
        const data = await response.json();
        setScoresData(data);
      } catch (error) {
        console.error('Failed to fetch scores:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <ScoreContext.Provider value={{ scoresData }}>
      {children}
    </ScoreContext.Provider>
  );
};

const Home = ({ navigation }) => {
  const {scoresData} = useContext(ScoreContext);

  if (!scoresData || !scoresData.games) {
    return <Text>Loading...</Text>;
  }

  var date = new Date().getDate();
  var month = new Date().getMonth();
  var year = new Date().getFullYear();

  return(
    <ScrollView>
      <Text style={styles.textStyle}>Scores for {month}/{date}/{year}</Text>
      {scoresData.games.map((game, index)=> (
        <View key={index} style={styles.teamCard}>
          <Text>{game.id}</Text>
          <View style={styles.teamCardDisplay}>
            <View style={styles.teamInfo}>
              <SvgUri
                height={50}
                width={50}
                uri = {game.awayTeam.logo}
              />
              <Text style={styles.textStyle}>{game.awayTeam.name.default}</Text>
            </View>
            <View style={styles.teamScore}>
              <Text style={styles.textStyle}>{game.awayTeam.score}</Text>
            </View>
          </View>

          <View style={styles.teamCardDisplay}>
            <View style={styles.teamInfo}>
              <SvgUri
                height={50}
                width={50}
                uri = {game.homeTeam.logo}
              />
              <Text style={styles.textStyle}>{game.homeTeam.name.default}</Text>
            </View>
            <View style={styles.teamScore}>
              <Text style={styles.textStyle}>{game.homeTeam.score}</Text>
            </View>
          </View>
          <Button title="View Details" onPress={() => navigation.navigate('GameDetails', {game})}/>
        </View>
      ))}
    </ScrollView>
  );
};

const GameDetails = ({ route }) => {
  const { game } = route.params;
  const[gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try{
        const response = await fetch(`https://api-web.nhle.com/v1/gamecenter/2024030156/play-by-play`);
        const data = await response.json();
        setGameData(data);
      }
      catch (e){
        console.error(e.message);
      }
    };

    fetchGameData();
  },[game.id]);

  if(!gameData){
    return <Text>Loading details</Text>;
  }

  return (
    <View>
      <Text>{gameData.gameDate}</Text>
      <ScrollView>
        {gameData.plays.map((gameEvent, index) => (
          <View key={index}>
              <Text>{gameEvent.typeDescKey}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return(
    <ScoreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameDetails" component={GameDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScoreProvider>
  );
};

const styles = StyleSheet.create({
  scrollPage: {
    backgroundColor: 'black',
  },
  teamCard: {
    width: '90%',
    alignSelf:'center',
    margin: 'auto',
    backgroundColor: 'light-gray',
    borderWidth: 1,
    borderColor: 'black',
  },
  teamCardDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  teamInfo:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 'auto',
    fontWeight: 'bold',
  },
  teamScore: {
    marginRight: 10,
  },
});

export default App;
