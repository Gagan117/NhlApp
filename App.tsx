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

//page
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

const Event = ({ typeDescKey, gameEvent }) => {
  switch (typeDescKey){
    case 'faceoff':
      return(
        <View style={styles.eventBoxSmall}>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <PlayerDetails playerId={gameEvent.details.winningPlayerId} />
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>Period: {gameEvent.periodDescriptor.number}</Text>
            <Text style={styles.eventMainText}>{gameEvent.timeRemaining}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>{gameEvent.typeDescKey} Win</Text>
          </View>
        </View>
      );
    case 'hit':
      return (
        <View style={styles.eventBoxSmall}>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <PlayerDetails playerId={gameEvent.details.hittingPlayerId} />
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>Period: {gameEvent.periodDescriptor.number}</Text>
            <Text style={styles.eventMainText}>{gameEvent.timeRemaining}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>{gameEvent.typeDescKey}</Text>
          </View>
        </View>
      );
    case 'blocked-shot':
      return(
        <View style={styles.eventBoxSmall}>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <PlayerDetails playerId={gameEvent.details.blockingPlayerId} />
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>Period: {gameEvent.periodDescriptor.number}</Text>
            <Text style={styles.eventMainText}>{gameEvent.timeRemaining}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>{gameEvent.typeDescKey}</Text>
          </View>
        </View>
      );
    case 'missed-shot':
      return(
        <View style={styles.eventBoxSmall}>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <PlayerDetails playerId={gameEvent.details.shootingPlayerId} />
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>Period: {gameEvent.periodDescriptor.number}</Text>
            <Text style={styles.eventMainText}>{gameEvent.timeRemaining}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={styles.eventMainText}>{gameEvent.typeDescKey}</Text>
            <Text>Type of Shot: {gameEvent.details.shotType}</Text>
          </View>
        </View>
      );
    default:
      return(
        <View style={styles.eventBoxSmall}>
          <View>
            <Text style={styles.eventMainText}>Period: {gameEvent.periodDescriptor.number}</Text>
            <Text style={styles.eventMainText}>{gameEvent.timeRemaining}</Text>
          </View>
          <Text>Event: {gameEvent.typeDescKey}</Text>
          <Text>ADD IN</Text>
        </View>
      );
  }
};

//page
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
          <View key={index} style={styles.eventBox}>
            <Event typeDescKey={gameEvent.typeDescKey} gameEvent={gameEvent}/>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const PlayerDetails = ({ playerId }) => {
  const[playerInfo, setPlayerInfo] = useState(null);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try{
        const response = await fetch(`https://api-web.nhle.com/v1/player/${playerId}/landing`);
        const data = await response.json();
        setPlayerInfo(data);
      }
      catch (e){
        console.error(e.message);
      }
    };

    fetchPlayerInfo();
  }, [playerId]);

  if(!playerInfo){
    return <Text>Loading...</Text>;
  }

  return(
    <View>
      <Image style={styles.eventImage} src={playerInfo.headshot} height={50} width={50}/>
      <Text>{playerInfo.firstName.default}, {playerInfo.lastName.default}</Text>
    </View>
  )
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
  // event page
  eventBox: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  eventBoxSmall: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    minHeight: 100,
    padding: 10,
  },
  eventImage: {
    borderRadius: 40,
    height: 50,
    width: 50,
  },
  eventMainText:{
    fontSize: 18,
    fontWeight: 'semibold',
  },
});

export default App;
