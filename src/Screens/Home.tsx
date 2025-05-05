import {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
//https://github.com/software-mansion/react-native-svg?tab=readme-ov-file#installation
import {SvgUri} from 'react-native-svg';
import * as React from 'react';
import GoalItem from '../components/GoalItem.tsx';

const Home = ({ navigation }) => {
  const [scoresData, setScoresData] = useState(null);
  const[day, setDay] = useState(new Date().getDate());

  const year = new Date().getFullYear();
  const month = new Date().getMonth()+1;
  const paddedMonth = month < 10 ? `0${month}` : `${month}`;
  const paddedDay = day < 10 ? `0${day}` : `${day}`;

  const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;

  const fetchScores = async (selectedDate) => {
    try {
      const response = await fetch(`https://api-web.nhle.com/v1/score/${selectedDate}`);
      const data = await response.json();
      setScoresData(data);
    } catch (error) {
      console.error('Failed to fetch scores:', error);
    }
  };

  useEffect(() => {
    fetchScores(formattedDate);
  }, [formattedDate]);

  const increment = () => {
    setDay(day+1);
  };

  const decrement = () => {
    setDay(day-1);
  };

  if (!scoresData || !scoresData.games) {
    return <Text>Loading...</Text>;
  }

  return(
    <ScrollView>
      <View style={styles.dateBox}>
        <Button title="<" onPress={() => {decrement()}}></Button>
        <Text style={styles.textStyle}>{formattedDate}</Text>
        <Button title=">" onPress={() => {increment()}}></Button>
      </View>
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
          <View>
            {game.goals && game.goals.length > 0 && game.goals.map((goal, index) => (
              <GoalItem goal={goal} key={index}/>
            ))}
          </View>
          <Button title="View Details" onPress={() => navigation.navigate('GameDetails', {game})}/>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollPage: {
    backgroundColor: 'black',
  },
  dateBox: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  teamCard: {
    width: '90%',
    alignSelf:'center',
    margin: 5,
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

export default Home;
