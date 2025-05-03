import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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

  return(
    <ScrollView>
      <Text>Scores for today</Text>
      {scoresData.games.map((game, index)=> (
        <View key={index}>
          <View style={styles.teamCard}>
            <Text>{game.awayTeam.name.default}</Text>
          </View>
          <View style={styles.teamCard}>
            <Text>{game.homeTeam.name.default}</Text>
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
    height: 200,
    width: 100,
    backgroundColor: 'light-gray',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default App;
