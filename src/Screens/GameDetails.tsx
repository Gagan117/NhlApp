import {ScrollView, StyleSheet, Text, View} from 'react-native';
//https://github.com/software-mansion/react-native-svg?tab=readme-ov-file#installation
import {SvgUri} from 'react-native-svg';
import {useEffect, useState} from 'react';
import Event from '../components/Event.tsx';

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

const styles = StyleSheet.create({
  // event related
  eventBox: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
});

export default GameDetails;
