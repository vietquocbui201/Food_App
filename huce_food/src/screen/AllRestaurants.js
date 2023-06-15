import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { routes } from "../navigation/routes";

const AllRestaurants = ({ navigation, route }) => {
  const { id_group, Menulist, group_name, user_id } = route.params;
  const filteredData = Menulist.filter((item) => item.group_id === id_group);
  const MOREDISHES = (id_RESTAURANT, name_RESTAURANT, user_id, location) => {
    navigation.navigate(routes.MOREDISHES, {id_RESTAURANT, name_RESTAURANT, user_id, location})
  };
  const Header = () => (
    <ImageBackground
      style={styles.container1}
      source={require("../assets/images/pizzaRes.png")}
    >
      <View style={styles.formView8}>
        <Text style={styles.formTxt1}>Các nhà hàng {group_name}</Text>
        <Text style={styles.formTxt2}>{filteredData.length} nhà hàng</Text>
      </View>
    </ImageBackground>
  );
  const Body = ({ item }) => (
    <TouchableOpacity style={styles.container} onPress={() => MOREDISHES(item.id, item.restaurant, {user_id}, item.location)}>
      <View style={styles.inContainer}>
        <ImageBackground
          source={{ uri: item.background}}
          resizeMode="cover"
          imageStyle={{
            height: 120,
            width: "50%",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <View style={styles.formView1}>
            <View style={styles.formView2}>
              <Text style={{ fontWeight: "600" }}>{item.rate}</Text>
              <Image
                source={require("../assets/images/star.png")}
                style={{ height: 12, width: 12, marginLeft: 8 }}
              ></Image>
            </View>
            <Image
              source={require("../assets/images/heart.png")}
              style={{ height: 30, width: 30 }}
            ></Image>
          </View>
        </ImageBackground>
      </View>
      <Text style={{ fontSize: 17, fontWeight: "500", margin: 8 }}>
        {item.restaurant}
      </Text>
      <View style={styles.formView3}>
        <View style={styles.formView4}>
          <Image
            style={styles.formImage}
            source={require("../assets/images/scooter.png")}
          ></Image>
          <Text style={{ fontSize: 14, fontWeight: "500" }}>{item.ship}</Text>
        </View>
        <View style={styles.formView5}>
          <Image
            style={[styles.formImage, { tintColor: "#fd9174" }]}
            source={require("../assets/images/clock.png")}
          ></Image>
          <Text style={{ fontSize: 14, fontWeight: "500" }}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.formView6}>
        <View style={styles.formView7}>
          <Text style={{ color: "#b6b6bd" }}>{item.dish1}</Text>
        </View>
        <View style={styles.formView7}>
          <Text style={{ color: "#b6b6bd" }}>{item.dish2}</Text>
        </View>
        <View style={styles.formView7}>
          <Text style={{ color: "#b6b6bd" }}>{item.dish3}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Header></Header>
        <FlatList
          data={filteredData}
          renderItem={Body}
          horizontal={false}
          contentContainerStyle={{ alignItems: "center", marginTop: 50 }}
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container2: { flex: 1, backgroundColor: "white" },
  container1: {
    height: 330,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 240,
    width: 340,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: "white",
  },
  inContainer: {
    height: 120,
    width: "100%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  formView1: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  formView2: {
    backgroundColor: "white",
    height: 30,
    width: 60,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formView3: {
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  formView4: {
    height: "100%",
    width: "32%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formView5: {
    height: "100%",
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 18,
  },
  formView6: {
    height: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  formView7: {
    height: 30,
    width: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    marginHorizontal: 10,
  },
  formView8: {
    height: "100%",
    width: "95%",
    justifyContent: "flex-end",
  },
  formTxt1: {
    fontSize: 30,
    fontWeight: "700",
    width: 90,
    marginBottom: 22,
    color: "#fe724c",
  },
  formTxt2: {
    color: "#b2b1b9",
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  formImage: { height: 13, width: 13, tintColor: "#feb19c" },
});

export default AllRestaurants;