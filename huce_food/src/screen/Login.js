import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import Button from "../components/button";
import Input from "../components/fromTextInput";
import { routes } from "../navigation/routes";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Warning',"Email không được để trống!!!");
      return;
    }
    if (!password) {
      Alert.alert('Warning',"Mật khẩu không được để trống!!!");
      return;
    }
    try {
      const response = await fetch('https://hucefood.000webhostapp.com/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        const id = data.user_id;
        navigation.navigate(routes.HOMETAB, { user_id: id } );
      } else {
        Alert.alert('', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('',"Đăng ký thất bại!!!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inContainer}>
        <Text style={styles.txt}>Login</Text>
        <Input
          title={"Email"}
          placeholder="Your Email address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          title={"Password"}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.inContainer1}>
          <Text>Forgot Password ?</Text>
          <Button title={"LOGIN"} onPress={handleLogin}></Button>
          <Text>
            Don't have an account?{" "}
            <Text
              style={{ color: "#fe724c" }}
              onPress={() => {
                navigation.navigate(routes.SIGNUP);
              }}
            >
              Sign Up
            </Text>
          </Text>
        </View>
        <View style={styles.formView}>
          <View style={styles.formView1}>
            <Text style={{ fontSize: 14 }}>Sign in with</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Image style={{ height: 20, width: 20 }} source={require("../assets/images/google.png")}></Image>
            <Text>  Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  inContainer: {
    height: "100%",
    width: "85%",
  },
  inContainer1: {
    height: 200,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    height: 150,
    width: "60%",
  },
  txt: { fontSize: 28, fontWeight: "600", marginTop: 90 },
  formView: {
    height: 100,
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#b2b1b9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  formView1: {
    height: 45,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    height: 60,
    width: 220,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 42,
    borderWidth: 0.8,
    flexDirection: "row",
    borderColor: "#f7f7f7",
  },
});

export default Login
