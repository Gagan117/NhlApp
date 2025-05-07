import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Matchup = ({ game }) => {
  const[gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try{
        const response = await fetch(`https://api-web.nhle.com/v1/wsc/game-story/${game.id}`);
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
  // let home = 0;
  // let away = 0;

  return (
    <ScrollView>
      {/*{gameData.summary.scoring.map((score, index) => (*/}
      {/*  <View key={index}>*/}
      {/*    <Text>{score.periodDescriptor.number}</Text>*/}
      {/*    {score.goals.map((goal, index) => (*/}
      {/*      <View key={index}>*/}
      {/*        {goal.isHome ? home+1 : away+1}*/}
      {/*        <Text>{goal.firstName.default}</Text>*/}
      {/*        <Text>{home}</Text>*/}
      {/*      </View>*/}
      {/*    ))}*/}
      {/*  </View>*/}
      {/*))}*/}
      {gameData.summary.threeStars.map((player, index) => (
        <View style={styles.entireStarBox}>
          <View style={styles.starBox}>
            <View style={styles.star}>
              <IonIcon name="star" size={40} color="gold"></IonIcon>
              <Text>{player.star}</Text>
            </View>
            <View>
              <Image style={styles.playerImage} width={50} height={50} src={player.headshot}/>
            </View>
          </View>
          <View style={styles.playerInfo}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{player.name}</Text>
            <View style={styles.tallyBox}>
              <View>
                <Text>G</Text>
                <Text>{player.goals}</Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text>A</Text>
                <Text>{player.assists}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  entireStarBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width: '70%',
  },
  starBox: {
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tallyBox:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  playerImage:{
    borderRadius: 40,
  },
  star:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInfo: {
    width: '100%',
    marginLeft: 20,
  },
});

export default Matchup;
