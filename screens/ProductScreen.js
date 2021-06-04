import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

import ProductGridTile from "../components/ProductGridTile";
import { Ionicons } from "@expo/vector-icons";

const ProductsScreen = (props) => {
  const [data, setData] = useState([]);
  const catId = props.navigation.getParam("categoryId");
  const product_url = "https://northwind.vercel.app/api/products";

  const alertButtonForDelete = (id, name) =>
    Alert.alert("Are you sure ?", "You want to delete the product : " + name, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => deleteProduct(id, name) },
    ]);

  const deleteProduct = (id, name) => {
    let requestOptions = {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    };
    fetch(product_url + id, requestOptions)
      .then((res) => res.json)
      .then((data) => {
        Alert.alert(name + " is deleted");
      });
  };

  const getData = () => {
    fetch(product_url)
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
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          props.navigation.navigate({
            routeName: "ProductDetail",
            params: {
              productName: itemData.item.name,
              productPrice: itemData.item.unitPrice,
              quantityPerUnit: itemData.item.quantityPerUnit,
              unitsInStock: itemData.item.unitsInStock,
            },
          });
        }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.name}>{itemData.item.name}</Text>
          <Text style={styles.count}>$ {itemData.item.unitPrice}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => {
                props.navigation.navigate({
                  routeName: "ProductDetail",
                  params: {
                    productName: itemData.item.name,
                    productPrice: itemData.item.unitPrice,
                    quantityPerUnit: itemData.item.quantityPerUnit,
                    unitsInStock: itemData.item.unitsInStock,
                  },
                });
              }}
            >
              <Text style={styles.followButtonText}>Explore now</Text>
            </TouchableOpacity>
            <Ionicons
              name="ios-trash"
              style={styles.icon}
              onPress={() =>
                alertButtonForDelete(itemData.item.id, itemData.item.name)
              }
              size={22}
              color="#3399ff"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const data2 = [];
  for (var i = 0; i < data.length; i++) {
    if (catId === data[i].categoryId) {
      data2.push(data[i]);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data2}
        renderItem={renderGridItem}
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

ProductsScreen.navigationOptions = (navigationData) => {
  const categoryName = navigationData.navigation.getParam("categoryName");
  return {
    headerTitle: categoryName,
    headerStyle: {
      backgroundColor: "#3399ff",
    },
    headerTintColor: "white",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
  },

  name: {
    textAlign: "center",
    fontSize: 18,
    flex: 1,
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    textAlign: "center",
    fontSize: 14,
    flex: 1,
    paddingTop: 10,
    color: "green",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#9a9a9a",
  },
  followButtonText: {
    color: "#9a9a9a",
    fontSize: 12,
  },
  icon: {
    marginTop: 10,
    paddingRight: 30,
    padding: 10,
  },
});
export default ProductsScreen;
