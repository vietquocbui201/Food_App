import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  Alert ,
} from "react-native";
import React, { useState } from "react";
import Button from "../components/button";
import Input from "../components/fromTextInput";
import { routes } from "../navigation/routes";

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleSignUp = async () => {

    if (!fullName) {
      Alert.alert('Warning',"Họ tên không được để trống!!!");
      return;
    }

    if (!email) {
      Alert.alert('Warning',"Email không được để trống!!!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Warning',"Email chưa đúng định dạng!!!");
      return;
    }

    if (!password) {
      Alert.alert('Warning',"Mật khẩu không được để trống!!!");
      return;
    }

    if (password !== rePassword) {
      Alert.alert('Warning',"Mật không khớp nhau!!!");
      return;
    }

    if (password.length < 8) {
      Alert.alert('Warning',"Mật khẩu phải trên 8 ký tự!!!");
      return;
    }

    try {
      const response = await fetch('https://hucefood.000webhostapp.com/sign_up.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('',"Đăng ký thành công!!!" ,[
          {
            text: "OK",
            onPress: () => {
              navigation.navigate(routes.LOGIN);
            },
          },
        ]);
      } else {
        Alert.alert('', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('',"Đăng nhập thất bại!!!");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inContainer}>
        <Text style={styles.txt}>SignUP</Text>
        <Input
          title={"Full Name"}
          placeholder="Your Name"
          value={fullName}
          onChangeText={setFullName}
        ></Input>
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
        ></Input>
        <Input
          title={"Re-Password"}
          placeholder="Re Password"
          value={rePassword}
          onChangeText={setRePassword}
        ></Input>
        <View style={styles.inContainer1}>
          <Button title={"Sign Up"} onPress={handleSignUp}></Button>
          <Text>
            Already have an account?{" "}
            <Text
              style={{ color: "#fe724c" }}
              onPress={() => {
                navigation.navigate(routes.LOGIN);
              }}
            >
              Login
            </Text>
          </Text>
        </View>
        <View style={styles.formView}>
          <View style={styles.formView1}>
            <Text style={{ fontSize: 14 }}>Sign in with</Text>
          </View>
          <View style={styles.button}></View>
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
    height: 150,
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
    marginBottom: 42,
  },
});

export default SignUp;
