import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import PlayerDetails from './PlayerDetails.tsx';

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

const styles = StyleSheet.create({
  // event page
  eventBoxSmall: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    minHeight: 100,
    padding: 10,
  },
  eventMainText:{
    fontSize: 18,
    fontWeight: 'semibold',
  },
});

export default Event;


