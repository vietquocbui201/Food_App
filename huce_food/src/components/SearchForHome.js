import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import OptionsIcon from "../assets/svgs/options.svg";
import { routes } from "../navigation/routes";
import axios from "axios";
import { colors } from "../themes/Colors";

const SearchForHome = ({ navigation, user_id }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleTextChange = (text) => {
    setSearchText(text);
  };

  const handleInputBlur = async () => {
    setLoading(true); 

    try {
      const response = await axios.post(
        "https://hucefood.000webhostapp.com/search_restaurant.php",
        {
          searchText: searchText,
        }
      );
      const data = await response.data;

      const Menulist = data.menulist;
      const id_group = data.group_id;
      const group_name = data.group_name;

      navigation.navigate(routes.AllRESTAURANTS, {
        id_group,
        Menulist,
        group_name,
        user_id,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "100%", width: "90%" }}>
        <View style={styles.formView}>
          <Image
            style={styles.image}
            source={require("../assets/images/list.png")}
          ></Image>
          <Image
            style={styles.image}
            source={{
              uri: `https://hucefood.000webhostapp.com/image/viet${user_id}.png`,
            }}
          ></Image>
        </View>
        <Text style={styles.formTxt}>What would you like to order?</Text>
        <View style={styles.formView1}>
          <View style={styles.formView2}>
            <Image
              style={{ height: 25, width: 25, marginHorizontal: 15 }}
              source={require("../assets/images/search.png")}
            ></Image>
            <TextInput
              placeholder="Tìm Kiếm Nhà Hàng ..."
              style={styles.formInput}
              onChangeText={handleTextChange}
              onBlur={handleInputBlur}
            ></TextInput>
          </View>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { height: 43, width: 43, borderRadius: 15 },
  formView: {
    height: 95,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  formView1: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formView2: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eeeeee",
    borderColor: "#b2b1b9",
  },
  formInput: {
    width: "80%",
    height: "100%",
    fontSize: 15,
    padding: 10,
  },
  formTxt: { fontSize: 30, fontWeight: "600", marginVertical: 8 },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchForHome;
