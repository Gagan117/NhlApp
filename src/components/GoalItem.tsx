import {Image, StyleSheet, Text, View} from 'react-native';

const GoalItem = ({ goal }) => {
  return(
    <View style={styles.goalCard}>
      <Image style={styles.goalCardImage} src={goal.mugshot} height={50} width={50}/>
      <View style={{flex: 1}}>
        <View style={styles.goalInfo}>
          <Text style={styles.goalScorer}>{goal.name.default}</Text>
          <Text style={styles.goalNumber}>({goal.goalsToDate})</Text>
        </View>
        <Text style={styles.goalPeriod}>{goal.period === 1 ? '1st' : goal.period === 2 ? '2nd' : goal.period === 3 ? '3rd' : `OT`} Period</Text>
        <View style={styles.assistBox}>
          <Text>{goal.timeInPeriod} - </Text>
          {goal.assists.map((assist, index) => (
            <Text>{assist.name.default}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalCard: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
    margin: 5,
  },
  goalCardImage: {
    borderRadius: 40,
  },
  goalScorer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalInfo: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    flex: 1,
  },
  goalNumber: {
    justifyContent:'center',
    alignItems:'center',
    color: 'light-gray',
    fontSize: 13,
  },
  assistPerson: {
    fontSize: 12,
  },
  assistBox: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    flex: 1,
  },
  goalPeriod: {
    alignSelf:'center',
  },
});

export default GoalItem;
