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
  ActivityIndicator,
  RefreshControl
} from "react-native";
import SearchForHome from "../components/SearchForHome";
import FoodCard from "../components/FoodCard";
import React, { useEffect, useState, useContext  } from "react";
import { units } from "../themes/Units";
import { colors } from "../themes/Colors";
import { routes } from "../navigation/routes";
import HeaderHome from "../components/HeaderHome";
import { UserContext } from "../navigation/HomeNavigation";

const Home = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Menulist, setMenulist] = useState([]);
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Thêm state refreshing

  const user_id = useContext(UserContext);

  useEffect(() => {
    fetchMenulistFromAPI();
  }, []);

  const fetchMenulistFromAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://hucefood.000webhostapp.com/get_group_restaurants.php"
      );
      const data = await response.json();
      setMenulist(data.menulist);
      setSections(data.sections);
  
      setIsLoading(false);
      setRefreshing(false); // Đặt refreshing thành false sau khi tải lại xong
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setRefreshing(false); // Đặt refreshing thành false nếu có lỗi
    }
  };

  const AllRESTAURANTS = (id_group, Menulist, group_name, user_id) => {
    navigation.navigate(routes.AllRESTAURANTS, { id_group, Menulist, group_name, user_id });
  };
  
  const MOREDISHES = (id_RESTAURANT, name_RESTAURANT, user_id, location) => {
    navigation.navigate(routes.MOREDISHES, { id_RESTAURANT, name_RESTAURANT, user_id, location})
  };

  const Body = ({ item }) => (
    <TouchableOpacity style={styles.container} onPress={() => MOREDISHES(item.id, item.restaurant, {user_id}, item.location)}>
      <View style={styles.inContainer}>
        <ImageBackground
          source={{ uri: item.background }}
          resizeMode="cover"
          imageStyle={{
            height: 120,
            width: "75%",
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
            style={{ height: 13, width: 13 }}
            source={require("../assets/images/scooter.png")}
          ></Image>
          <Text style={{ fontSize: 14, fontWeight: "500" }}>{item.ship}</Text>
        </View>
        <View style={styles.formView5}>
          <Image
            style={{ height: 13, width: 13 }}
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

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMenulistFromAPI();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.bodyContainer}>
          <SearchForHome navigation={navigation} user_id={user_id} />
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.PRIMARY} />
              <Text>Loading...</Text>
            </View>
          ) : (
            sections.map((section, index) => (
              <View key={index}>
                <HeaderHome
                  title={section.title}
                  onPress={() =>
                    AllRESTAURANTS(section.id, Menulist, section.title, {
                      user_id,
                    })
                  }
                />
                <FlatList
                  renderItem={Body}
                  data={section.data.map((id) =>
                    Menulist.find((item) => item.id === id)
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: 210,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  bodyContainer: {
    paddingHorizontal: units.width / 20,
    marginTop: units.height / 30,
    marginBottom: units.height / 101,
  },
  list: {
    backgroundColor: colors.WHITE,
    marginTop: units.height / 40,
  },
  constainer1: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  constainer2: {
    height: "100%",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  formView4: {
    height: "100%",
    width: "53%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formView5: {
    height: "100%",
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 18,
  },
  formView6: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  formView7: {
    height: 30,
    width: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9e9e9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
