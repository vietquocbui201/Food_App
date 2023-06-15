import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext  } from "react";
import BasketCard from "../components/BasketCard";
import { colors } from "../themes/Colors";
import { units } from "../themes/Units";
import CustomButton from "../components/CustomButton";
import { routes } from "../navigation/routes";
import { UserContext } from "../navigation/HomeNavigation";

const Basket = ({ navigation, route }) => {
  const user_id = useContext(UserContext);
  const [basketData, setBasketData] = useState(null);
  const updateBasketData = (data) => {
    setBasketData(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Giả Hàng</Text>
      </View>
      <BasketCard user_id={user_id} updateBasketData={updateBasketData} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Mã giảm giá" style={{ flex: 1 }} />
        <TouchableOpacity style={styles.promeButton}>
          <Text style={styles.promeText}>Áp Dụng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Tổng Tiền:</Text>
          <Text style={styles.priceText}>{parseFloat(basketData).toFixed(2)} $</Text>
        </View>
        <View style={[styles.priceContainer, { marginTop: units.height / 81 }]}>
          <Text style={styles.priceTitle}>Phí Vận Chuyển:</Text>
          <Text style={styles.priceText}>{parseFloat(1).toFixed(2)} $</Text>
        </View>
        <View style={[styles.priceContainer, { marginTop: units.height / 81 }]}>
          <Text style={styles.priceTitle}>Tổng Thanh Toán:</Text>
          <Text style={styles.priceText}>{parseFloat(basketData + 1).toFixed(2)} $</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Đặt Hàng" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Basket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: units.height / 34,
  },
  title: {
    color: colors.DARK,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  list: {
    marginTop: units.height / 40,
    maxHeight: units.height / 2.5,
    backgroundColor: colors.WHITE,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.DARRWHITE,
    borderRadius: 100,
    paddingHorizontal: units.width / 31,
    paddingVertical: units.height / 101,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: units.height / 34,
    marginHorizontal: units.width / 17,
  },
  promeButton: {
    backgroundColor: colors.ORANGE,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: units.width / 14,
    paddingVertical: units.width / 50,
  },
  promeText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.WHITE,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHTGREY,
    paddingBottom: units.height / 81,
  },
  priceTitle: {
    fontSize: 16,
    color: colors.DARK,
  },
  bottomContainer: {
    marginHorizontal: units.width / 17,
  },
  priceText: {
    fontSize: 19,
    color: colors.DARK,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: units.height / 50,
    marginHorizontal: units.width / 7,
    marginBottom: units.height / 81,
  },
  emptyText: {
    color: colors.ORANGE,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
});
