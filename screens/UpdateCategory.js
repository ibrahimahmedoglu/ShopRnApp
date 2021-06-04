import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";

const UpdateCategory = (props) => {
  const categoryId = props.navigation.getParam("id");
  const categoryN = props.navigation.getParam("name");
  const categoryDesc = props.navigation.getParam("description");

  const [categoryName, setCategoryName] = useState(categoryN);
  const [categoryDescription, setCategoryDescription] = useState(categoryDesc);

  const category_url = `https://northwind.vercel.app/api/categories/${categoryId}`;

  const updateData = () => {
    fetch(category_url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: categoryId,
        name: categoryName,
        description: categoryDescription,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //Obje return empty
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    console.log(categoryName);
  });

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholderTextColor="grey"
        underlineColorAndroid="transparent"
        defaultValue={categoryN}
        onChangeText={(value) => setCategoryName(value)}
      />

      <Input
        style={styles.input}
        placeholderTextColor="grey"
        underlineColorAndroid="transparent"
        defaultValue={categoryDesc}
        onChangeText={(value) => setCategoryDescription(value)}
      />

      <View style={styles.button}>
        <Button title="Update" color="#3399ff" onPress={() => updateData()} />
      </View>
    </View>
  );
};

UpdateCategory.navigationOptions = (navigationData) => {
  const catName = navigationData.navigation.getParam("name");
  return {
    headerTitle: catName,
    headerStyle: {
      backgroundColor: "#3399ff",
    },
    headerTintColor: "white",
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    padding: 3,
  },
  input: {
    flex: 1,
    marginHorizontal: "5%",
    margin: 5,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0.5,
  },
  inputs: {
    backgroundColor: "white",
    height: 50,
    width: 300,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
});

export default UpdateCategory;
