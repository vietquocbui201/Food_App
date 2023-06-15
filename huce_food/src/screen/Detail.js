import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { routes } from "../navigation/routes";
import React, { useState, useEffect } from "react";
import { colors } from "../themes/Colors";
import { units } from "../themes/Units";
import FavoritesCard from "../components/FavoritesCard";
import BackButton from "../components/BackButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RadioGroup from "react-native-radio-buttons-group";
import axios from 'axios';

const radioButtonsData = [
  {
    id: "1",
    label: `Option1 +2.3$`,
    value: "option1",
    color: colors.ORANGE,
    selected: true,
  },
  {
    id: "2",
    label: `Option2 +4.7$`,
    value: "option2",
    color: colors.ORANGE,
  },
  {
    id: "3",
    label: `Option3 +6.1$`,
    value: "option3",
    color: colors.ORANGE,
  },
];

const Detail = ({ navigation, route }) => {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [count, setCount] = useState(1);
  const { dish, user_id } = route.params;
  const img = dish.image;
  const onClickBack = () => {
    navigation.goBack();
  };

  const hadnleAddCount = () => {
    setCount(count + 1);
  };

  const handleDecreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetch('https://hucefood.000webhostapp.com/add_cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id.user_id,
          count: count,
          dish_id: dish.id,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('',"Thêm thành công!!!" ,[
          {
            text: "OK",
            onPress: () => {
              navigation.navigate(routes.BASKET);
            },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('', "Thêm thất bại!!!");
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrrol}>
        <View style={styles.topContainer}>
          <Image
            source={{uri: img}}
            style={styles.image}
            borderRadius={10}
            resizeMode="cover"
          />
          <View style={styles.topBar}>
            <BackButton onPress={onClickBack} />
            <FavoritesCard />
          </View>
        </View>
        <View>
          <Text style={styles.title}>{dish.description}</Text>
          <View style={styles.starContainer}>
            <Icon name="star" size={25} color={colors.YELLOW} />
            <Text style={styles.rate}>{dish.rate} (30+)</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{dish.money * count} $</Text>
            <View style={styles.countContainer}>
              <TouchableOpacity onPress={handleDecreaseCount}>
                <Icon
                  name="minus-circle-outline"
                  color={colors.ORANGE}
                  size={30}
                />
              </TouchableOpacity>
              <Text style={styles.countText}>{count}</Text>
              <TouchableOpacity onPress={hadnleAddCount}>
                <Icon name="plus-circle" size={30} color={colors.ORANGE} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.aboutText}>Đang đói đặt đi chờ chi ^^</Text>
          <Text style={styles.addElementText}>Lựa chọn thêm</Text>
          <RadioGroup
            radioButtons={radioButtons}
            color={colors.ORANGE}
            containerStyle={styles.radioContainer}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={addToCart}>
            <View style={styles.buttonIcon}>
              <Icon name="basket" size={25} color={colors.ORANGE} />
            </View>
            <Text style={styles.buttonTitle}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrrol: {
    paddingHorizontal: units.width / 17,
  },
  image: {
    height: units.height / 3,
    width: units.width / 1.2,
    alignSelf: "center",
  },
  topBar: {
    position: "absolute",
    flexDirection: "row",
    left: units.width / 28,
    right: units.width / 28,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: units.height / 81,
  },
  topContainer: {
    marginTop: units.height / 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.DARK,
    marginTop: units.height / 36,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: units.height / 67,
  },
  rate: {
    color: colors.DARK,
    fontWeight: "600",
    marginLeft: units.width / 46,
  },
  price: {
    color: colors.ORANGE,
    fontWeight: "600",
    lineHeight: 31,
    fontSize: 31,
    marginTop: units.height / 45,
  },
  priceContainer: {
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
  aboutText: {
    color: colors.GRAY,
    fontSize: 15,
    marginTop: units.height / 37,
  },
  addElementText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.DARK,
    marginTop: units.height / 37,
  },
  radioContainer: {
    marginTop: units.height / 81,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: colors.ORANGE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    paddingVertical: units.height / 116,
    paddingHorizontal: units.width / 53,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: units.height / 25,
  },
  buttonIcon: {
    backgroundColor: colors.WHITE,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: units.width / 31,
    paddingVertical: units.height / 67,
  },
  buttonTitle: {
    color: colors.WHITE,
    fontSize: 15,
    marginHorizontal: units.width / 31,
    fontWeight: "600",
  },
});
