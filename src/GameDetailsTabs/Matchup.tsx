import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Svg, {SvgUri} from 'react-native-svg';

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
      {gameData.summary?.teamGameStats?.length > 0 && gameData.summary.threeStars.map((player, index) => (
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
      <View style={styles.teamStatsHeader}>
        <Text>Team Stats</Text>
        <View style={styles.teamStatsLogo}>
          <SvgUri uri={gameData.homeTeam.logo} width={50} height={50}/>
          <SvgUri uri={gameData.awayTeam.logo} width={50} height={50}/>
        </View>
      </View>
      {gameData.summary?.teamGameStats?.length > 0 && gameData.summary.teamGameStats.map((game, index) => {
        const total = game.homeValue + game.awayValue || 1;
        const normalizedHome = game.homeValue / total;
        const normalizedAway = game.awayValue / total;

        return (
          <View key={index} style={{marginBottom: 9, width: '100%'}}>
            <Text style={{alignSelf: 'center'}}>{game.category}</Text>
            <View style={{ flexDirection: 'row', height: 20, backgroundColor: '#ccc' }}>
              <View style={{ flex: normalizedHome, backgroundColor: 'lightyellow' }}>
                <Text>{game.homeValue}</Text>
              </View>
              <View style={{ flex: normalizedAway, backgroundColor: 'lightblue' }}>
                <Text>{game.awayValue}</Text>
              </View>
            </View>
          </View>
        );
      })}
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
  teamStatsHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
  },
  teamStatsLogo: {
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  statsBar:{
    width: '100%',
  },
});

export default Matchup;
