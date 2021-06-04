import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";
import DetailsScreen from "../screens/DetailScreen";
import ProductsScreen from "../screens/ProductScreen";
import AllProductScreen from "../screens/AllProductsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UpdateScreen from "../screens/UpdateCategory";
import AddCategoryScreen from "../screens/AddCategory";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const CategoriesNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  Products: ProductsScreen,
  ProductDetail: DetailsScreen,
  UpdateCategory: UpdateScreen,
  AddCategory: AddCategoryScreen,
});

const AllProductNavigator = createStackNavigator({
  AllProduct: AllProductScreen,
  ProductDetail: DetailsScreen,
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen,
});

const BottomTab = createBottomTabNavigator({
  Categories: {
    screen: CategoriesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons name="category" size={24} color={tabInfo.tintColor} />
        );
      },
    },
  },
  AllProduct: {
    screen: AllProductNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <AntDesign name="database" size={24} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome name="reorder" size={24} color={tabInfo.tintColor} />
        );
      },
    },
  },
});
export default createAppContainer(BottomTab);
