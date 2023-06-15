import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { units } from "../themes/Units";
import { colors } from "../themes/Colors";
import IconTimes from "../assets/svgs/times.svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';

const BasketCard = ({ user_id, updateBasketData }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleAddCount = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        const updatedItem = {
          ...cartItem,
          count: parseInt(cartItem.count) + 1,
        };
        updateCartDataToAPI(updatedItem);
        return updatedItem;
      }
      return cartItem;
    });
    setCart(updatedCart);
  };
  
  const handleDecreaseCount = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.count > 0) {
        const updatedItem = {
          ...cartItem,
          count: parseInt(cartItem.count) - 1,
        };
        updateCartDataToAPI(updatedItem);
        return updatedItem;
      }
      return cartItem;
    });
    setCart(updatedCart);
  };
  

  useEffect(() => {
    if (cart) {
      let totalAmount = 0;
      cart.forEach((item) => {
        const itemAmount = parseFloat(item.money) * parseInt(item.count);
        totalAmount += itemAmount;
      });
      setTotalAmount(totalAmount);
    }
  }, [cart]);

  updateBasketData(totalAmount);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post(
        'https://hucefood.000webhostapp.com/take_item_cart.php',
        {
          user_id: user_id,
        }
      );
      const data = await response.data;
      setCart(data.my_cart);
      setIsLoading(false);
      setRefreshing(false); // Dừng refreshing sau khi load xong dữ liệu
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setRefreshing(false); // Dừng refreshing sau khi load xong dữ liệu
    }
  };

  const updateCartDataToAPI = async (cartData) => {
    try {
      const response = await axios.post('https://hucefood.000webhostapp.com/update_count_dish.php', {
        cart: cartData,
        user_id: user_id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        borderRadius={20}
        style={styles.image}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {parseFloat(item.money * item.count).toFixed(2)} $
          </Text>
          <View style={styles.countContainer}>
            <TouchableOpacity onPress={() => handleDecreaseCount(item)}>
              <Icon
                name="minus-circle-outline"
                color={colors.ORANGE}
                size={30}
              />
            </TouchableOpacity>
            <Text style={styles.countText}>{item.count}</Text>
            <TouchableOpacity onPress={() => handleAddCount(item)}>
              <Icon name="plus-circle" size={30} color={colors.ORANGE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true); 
    fetchUserProfile(); 
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default BasketCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: units.width / 47,
    paddingVertical: units.height / 81,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.LIGHTGREY,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    marginHorizontal: units.width / 17,
    marginVertical: units.height / 150,
  },
  title: {
    fontSize: 16,
    color: colors.DARK,
    fontWeight: "600",
  },
  bodyContainer: {
    marginLeft: units.width / 17,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: colors.ORANGE,
    fontSize: 16,
    fontWeight: "600",
  },
  priceContainer: {
    marginTop: units.height / 51,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  countText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.DARK,
    marginHorizontal: units.width / 41,
  },
  image: {
    height: 70,
    width: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
