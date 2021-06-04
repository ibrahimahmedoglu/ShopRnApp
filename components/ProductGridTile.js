import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

const ProductGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: 'gray' } }}
        >
          <Text style={styles.title} numberOfLines={2}>
            Product Name : {props.title}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            Price : {props.price}$
          </Text>
          <Text style={styles.info} numberOfLines={2}>
            For More Information Please Press Product Name
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 115,
    borderRadius: 10,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent:'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize:15,
    color: 'white'
   
  },
  info: {
    fontSize:13,
    color: 'white'
   
  }
});

export default ProductGridTile;
