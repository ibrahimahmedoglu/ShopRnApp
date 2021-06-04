import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const category_url = "https://northwind.vercel.app/api/categories/";

const alertButtonForDelete = (id, name) =>
  Alert.alert("Are you sure ?", "You want to delete the category : " + name, [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "Yes", onPress: () => deleteCategory(id, name) },
  ]);

const deleteCategory = (id, name) => {
  let requestOptions = {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  };
  fetch(category_url + id, requestOptions)
    .then((res) => res.json)
    .then((data) => {
      Alert.alert(name + " deleted");
    });
};

const CategoryGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Feather
          name="edit"
          onPress={props.onUpdate}
          size={20}
          color="#3399ff"
        />
        <Ionicons
          name="ios-trash"
          onPress={() => alertButtonForDelete(props.id, props.title)}
          size={20}
          color="#3399ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#3399ff",
  },
});

export default CategoryGridTile;
