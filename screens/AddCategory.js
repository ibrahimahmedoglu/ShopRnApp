import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const AddCategory = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const postData = () => {
    let requestOptions = {
      method: "POST",
      body: JSON.stringify({
        name: categoryName,
        description: description,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://northwind.vercel.app/api/categories", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert(`New Category ${categoryName} added`);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Category Name"
        onChangeText={(value) => setCategoryName(value)}
      />

      <Input
        style={styles.input}
        placeholder="Description"
        onChangeText={(value) => setDescription(value)}
      />
      <View style={styles.button}>
        <Button
          onPress={() => {
            if (!categoryName || !description) {
              return Alert.alert("Please fill all field");
            }
            postData();
          }}
          title="Add Category"
        />
      </View>
    </View>
  );
};

AddCategory.navigationOptions = {
  headerTitle: "Add Category",
  headerStyle: {
    backgroundColor: "#3399ff",
  },
  headerTintColor: "white",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginHorizontal: "5%",
    margin: 5,
    height: 40,
    borderColor: "transparent",
    borderWidth: 0.5,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    padding: 3,
  },
});

export default AddCategory;
