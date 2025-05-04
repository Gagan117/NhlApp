import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';

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
  );
};

const styles = StyleSheet.create({
  eventImage: {
    borderRadius: 40,
    height: 50,
    width: 50,
  },
});

export default PlayerDetails;
