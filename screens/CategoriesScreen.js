import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

import CategoryGridTile from "../components/CategoryGridTile";


const CategoriesScreen = (props) => {
  const [data, setData] = useState([]);
  

  const category_url = "https://northwind.vercel.app/api/categories";

  const getData = () => {
    fetch(category_url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.name}
        color={itemData.item.color}
        id={itemData.item.id}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Products",
            params: {
              categoryId: itemData.item.id,
              categoryName: itemData.item.name,
            },
          });
        }}
        onUpdate={() => {
          props.navigation.navigate({
            routeName: "UpdateCategory",
            params: {
              id: itemData.item.id,
              name: itemData.item.name,
              description: itemData.item.description,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderGridItem}
        numColumns={2}
        style={styles.contentList}
      />
    </View>
  );
};

CategoriesScreen.navigationOptions =navigationData => {
  return {  headerTitle: "Categories",
  headerStyle: {
    backgroundColor: "#3399ff",
  },
  headerTintColor: "white",
  headerRight: () => {
    return(
    <Button
        title="Add Category"
        color="white"
        onPress={() => {
          navigationData.navigation.navigate("AddCategory");
        }}
      />
    )
      },}

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
    color: "#3399ff",
  },
});
export default CategoriesScreen;
