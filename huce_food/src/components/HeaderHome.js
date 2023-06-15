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

const HeaderHome = ({ title, onPress }) => (
  <View>
    <View style={styles.constainer1}>
      <View style={styles.constainer2}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: "#fe724c" }}>{"View All >>"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
export default HeaderHome;

const styles = StyleSheet.create({
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
});
