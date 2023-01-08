import { SafeAreaView, ScrollView, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  { key: 'K' }, { key: 'L' }, { key: 'M' }, { key: 'N' }, { key: 'P' }, { key: 'Q' }, { key: 'R' }, { key: 'S' }, { key: 'T' }, { key: 'U' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <FontAwesome size={22} style={{ marginBottom: -3 }} name={"gear"} />
          <FontAwesome size={22} style={{ marginBottom: -3 }} name={"bar-chart"} />
        </View>

        <FlatList
          data={formatData(data, 3)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={3}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    marginVertical: 20,
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#FFF",
    flexWrap: 'wrap',
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  box: {
    width: '30%',
    height: 80,
  },
  image: {
    width: 50,
    height: 100,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
