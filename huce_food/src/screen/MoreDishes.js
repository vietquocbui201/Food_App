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
  RefreshControl
} from "react-native";
import { colors } from '../themes/Colors';
import { useEffect, useState } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { routes } from "../navigation/routes";


const MoreDishes = ({ navigation, route }) => {
  const { id_RESTAURANT, name_RESTAURANT, user_id, location } = route.params;
  const [menudishes, setMenudishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMenulistFromAPI();
  }, []);

  const fetchMenulistFromAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://hucefood.000webhostapp.com/get_dishes.php"
      );
      const data = await response.json();
      setMenudishes(data.menudishes);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  const DETAIL = (dish, user_id) => {
    navigation.navigate(routes.DETAIL, { dish, user_id })
  };
  const filteredDishes = menudishes.filter((item) => item.id_restaurant === id_RESTAURANT);

  const Header = () => (
    <View style={styles.container}>
      <View style={styles.formView1}>
        <View style={styles.formView2}>
          <View>
            <Text style={{ fontSize: 26, fontWeight: "600", marginBottom: 8 }}>
              {name_RESTAURANT}
            </Text>
            <View style={styles.formView3}>
              <Image
                source={require("../assets/images/placeholder.png")}
                style={styles.formImage1}
              ></Image>
              <TextInput
                placeholder={location}
                style={{ fontSize: 15, marginLeft: 5 }}
              ></TextInput>
            </View>
          </View>
          <Image
            source={{ uri: `https://hucefood.000webhostapp.com/image/viet${user_id}.png` }}
            style={styles.formImage2}
          ></Image>
        </View>
      </View>
    </View>
  );
  const Body = ({ item }) => (
    <TouchableOpacity style={styles.buton2} onPress={() => DETAIL(item, user_id)}>
      <Image style={styles.formImage3} source={{ uri: item.image }}></Image>
      <View style={styles.formView4}>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
          {item.description}
        </Text>
        <View style={styles.formView5}>
          <Text style={{ color: "white" }}>{item.money} $</Text>
          <Image
            source={require("../assets/images/add.png")}
            style={styles.formImage4}
          ></Image>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true); 
    fetchMenulistFromAPI(); 
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
    <FlatList
      ListHeaderComponent={Header}
      numColumns={2}
      data={filteredDishes}
      renderItem={Body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  buton1: {
    height: 25,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: "#fe724c",
  },
  buton2: {
    height: 215,
    width: 180,
    margin: 8,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#fe724c",
  },
  container: {
    height: 220,
    width: "100%",
  },
  formView1: {
    height: 125,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formView2: {
    height: "100%",
    width: "85%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  formView3: { flexDirection: "row" },
  formView4: {
    height: 60,
    width: "85%",
    marginTop: 8,
    justifyContent: "space-around",
  },
  formView5: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formImage1: { height: 28, width: 28 },
  formImage2: { height: 50, width: 50, borderRadius: 10 },
  formImage3: { height: 135, width: 170, borderRadius: 15, marginTop: 5 },
  formImage4: { height: 25, width: 25, tintColor: "white" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default MoreDishes;
