import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

const OrdersScreen = (props) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const category_url = "https://northwind.vercel.app/api/orders";

  var sortBy = (function () {
    var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) {
        return x;
      },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };

    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby(array, cfg) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(cfg) !== "[object Object]") cfg = {};
      if (typeof cfg.parser !== "function") cfg.parser = parse;
      cfg.desc = !!cfg.desc ? -1 : 1;
      return array.sort(function (a, b) {
        a = getItem.call(cfg, a);
        b = getItem.call(cfg, b);
        return cfg.desc * (a < b ? -1 : +(a > b));
      });
    };
  })();

  useEffect(() => {
    fetch(category_url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <View style={styles.text}>
              <Text style={styles.groupName}>Order No: {itemData.item.id}</Text>
            </View>
            <Text style={styles.countMembers}>
              Date: {itemData.item.orderDate}
            </Text>
            <Text style={styles.timeAgo}>
              Ship Name: {itemData.item.shipName}
            </Text>
            <Text style={styles.timeAgo}>
              Shipped Date: {itemData.item.shippedDate}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.sortContainer}>
        <Text style={styles.sortTitle}>Sort By - </Text>
        <TouchableOpacity
          style={styles.followButton}
          onPress={() => {
            setData(
              sortBy(data, {
                prop: "orderDate",
                desc: false,
              })
            );
            setData2(data);
          }}
        >
          <Text style={styles.followButtonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.root}
        data={data}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={renderGridItem}
        extraData={data2}
      />
    </View>
  );
};

OrdersScreen.navigationOptions = {
  headerTitle: "Orders",
  headerStyle: {
    backgroundColor: "#3399ff",
  },
  headerTintColor: "white",
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: "white",
  },
  maincontainer: {
    flex: 1,

    backgroundColor: "#ebf0f7",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3399ff",
  },
  root: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "flex-start",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight: 4,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  countMembers: {
    color: "#20B2AA",
  },
  timeAgo: {
    fontSize: 12,
    color: "#696969",
  },
  groupName: {
    fontSize: 23,
    color: "#1E90FF",
  },
  groupMembersContent: {
    flexDirection: "row",
    marginTop: 10,
  },
  headertitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  sortTitle: {
    color: "#9a9a9a",
    fontSize: 12,
    padding: 10,
    marginRight: 15,
    marginLeft: 10,
  },
  followButton: {
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
});
export default OrdersScreen;
