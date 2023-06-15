import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";

const Input = ({ title, ...props }) => {
  return (
    <View style={styles.form}>
      <Text style={styles.txt}>{title}</Text>
      <TextInput style={styles.form2} {...props}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    height: 120,
    width: "100%",
    justifyContent: "center",
  },
  form2: {
    height: 60,
    width: "100%",
    borderWidth: 1.2,
    borderColor: "#f7f7f7",
    borderRadius: 8,
    fontSize: 16,
    padding: 15,
  },
  txt: {
    marginVertical: 10,
    color: "#b2b1b9",
  },
});

export default Input;
