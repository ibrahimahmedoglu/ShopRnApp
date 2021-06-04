import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from "react-native";

const DetailScreen = (props) => {
  const productName = props.navigation.getParam("productName");
  const unitPrice = props.navigation.getParam("productPrice");
  const quantityPerUnit = props.navigation.getParam("quantityPerUnit");
  const unitsInStock = props.navigation.getParam("unitsInStock");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center", marginHorizontal: 30 }}>
          <Text style={styles.name}>{productName}</Text>
          <Text style={styles.price}>$ {unitPrice}</Text>
          <Text style={styles.description}>
            QuantityPerUnit: {quantityPerUnit}
          </Text>
          <Text style={styles.description}>UnitsInStock: {unitsInStock}</Text>
        </View>

        <View style={styles.separator}></View>
      </ScrollView>
    </View>
  );
};
DetailScreen.navigationOptions = (navigationData) => {
  const productName = navigationData.navigation.getParam("productName");
  return {
    headerTitle: productName,
    headerStyle: {
      backgroundColor: "#3399ff",
    },
    headerTintColor: "white",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentColors: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30,
  },
});
export default DetailScreen;
