import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';

const BoxScore = ({ game }) => {
  const[gameData, setGameData] = useState(null);
  const[currentTeam, setCurrentTeam] = useState('away');

  useEffect(() => {
    const fetchGameData = async () => {
      try{
        const response = await fetch(`https://api-web.nhle.com/v1/gamecenter/${game.id}/boxscore`);
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
    <ScrollView style={{flex: 1}}>
      <View style={styles.buttonStyles}>
        <Button title={gameData.awayTeam.commonName.default} onPress={() => setCurrentTeam('away')} />
        <Button title={gameData.homeTeam.commonName.default} onPress={() => setCurrentTeam('home')} />
      </View>
      <ScrollView horizontal>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.table}>
            <Text style={[styles.cell, styles.nameCell]}>Name</Text>
            <Text style={styles.cell}>G</Text>
            <Text style={styles.cell}>A</Text>
            <Text style={styles.cell}>+/-</Text>
            <Text style={styles.cell}>PIM</Text>
            <Text style={styles.cell}>Hits</Text>
            <Text style={styles.cell}>SOG</Text>
            <Text style={styles.cell}>TOI</Text>
            <Text style={styles.cell}>PPG</Text>
          </View>
          {currentTeam === 'away' && gameData.playerByGameStats?.awayTeam?.forwards?.map((player, index) => (
            <View key={index}>
              <View style={styles.table}>
                <Text style={[styles.cell, styles.nameCell]}>{player.name.default}</Text>
                <Text style={styles.cell}>{player.goals}</Text>
                <Text style={styles.cell}>{player.assists}</Text>
                <Text style={styles.cell}>{player.plusMinus}</Text>
                <Text style={styles.cell}>{player.pim}</Text>
                <Text style={styles.cell}>{player.hits}</Text>
                <Text style={styles.cell}>{player.sog}</Text>
                <Text style={styles.cell}>{player.toi}</Text>
                <Text style={styles.cell}>{player.powerPlayGoals}</Text>
              </View>
            </View>
          ))}
          {currentTeam === 'away' && gameData.playerByGameStats?.awayTeam?.defense?.map((player, index) => (
            <View key={index}>
              <View style={styles.table}>
                <Text style={[styles.cell, styles.nameCell]}>{player.name.default}</Text>
                <Text style={styles.cell}>{player.goals}</Text>
                <Text style={styles.cell}>{player.assists}</Text>
                <Text style={styles.cell}>{player.plusMinus}</Text>
                <Text style={styles.cell}>{player.pim}</Text>
                <Text style={styles.cell}>{player.hits}</Text>
                <Text style={styles.cell}>{player.sog}</Text>
                <Text style={styles.cell}>{player.toi}</Text>
                <Text style={styles.cell}>{player.powerPlayGoals}</Text>
              </View>
            </View>
          ))}

          {currentTeam === 'home' && gameData.playerByGameStats?.homeTeam?.forwards?.map((player, index) => (
            <View key={index}>
              <View style={styles.table}>
                <Text style={[styles.cell, styles.nameCell]}>{player.name.default}</Text>
                <Text style={styles.cell}>{player.goals}</Text>
                <Text style={styles.cell}>{player.assists}</Text>
                <Text style={styles.cell}>{player.plusMinus}</Text>
                <Text style={styles.cell}>{player.pim}</Text>
                <Text style={styles.cell}>{player.hits}</Text>
                <Text style={styles.cell}>{player.sog}</Text>
                <Text style={styles.cell}>{player.toi}</Text>
                <Text style={styles.cell}>{player.powerPlayGoals}</Text>
              </View>
            </View>
          ))}
          {currentTeam === 'home' && gameData.playerByGameStats?.homeTeam?.defense?.map((player, index) => (
            <View key={index}>
              <View style={styles.table}>
                <Text style={[styles.cell, styles.nameCell]}>{player.name.default}</Text>
                <Text style={styles.cell}>{player.goals}</Text>
                <Text style={styles.cell}>{player.assists}</Text>
                <Text style={styles.cell}>{player.plusMinus}</Text>
                <Text style={styles.cell}>{player.pim}</Text>
                <Text style={styles.cell}>{player.hits}</Text>
                <Text style={styles.cell}>{player.sog}</Text>
                <Text style={styles.cell}>{player.toi}</Text>
                <Text style={styles.cell}>{player.powerPlayGoals}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  cell:{
    width: 80,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameCell: {
    width: 120, // wider cell for player name
    textAlign: 'left',
    paddingRight: 8,
  },
  buttonStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  }
});

export default BoxScore;


