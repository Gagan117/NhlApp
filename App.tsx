import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
//https://github.com/software-mansion/react-native-svg?tab=readme-ov-file#installation
import {SvgUri} from 'react-native-svg';
import {useEffect, useState} from 'react';



const Home = () => {
  const[scoresData, setScoresData] = useState(null);
  const[error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async ()=> {
      try {
        const response = await fetch('https://api-web.nhle.com/v1/score/2025-05-02');
        if(!response.ok){
          throw new Error('Data no found');
        }
        const data = await response.json();
        setScoresData(data);
      }
      catch(e){
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

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
        </View>
      ))}
    </ScrollView>
  );
};

const App = () => {
  return(
    <View>
      <Home/>
    </View>
  );
};

const styles = StyleSheet.create({
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
