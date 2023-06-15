import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import React from 'react';
import { colors } from '../themes/Colors';
import ProfileCard from '../components/ProfileCard';
import { units } from '../themes/Units';
import { routes } from '../navigation/routes';
import CustomButton from '../components/CustomButton';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Profile = ({ navigation, route }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { user_id } = route.params;
      const response = await axios.post(
        'https://hucefood.000webhostapp.com/show_profile.php',
        {
          user_id: user_id,
        }
      );
      const data = await response.data;
      setUserProfile(data);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onClickNavigatesave = async () => {
    const { user_id } = route.params;
    if (!userProfile.name) {
      Alert.alert('Warning', "Họ tên không được để trống!!!");
      return;
    }
    if (userProfile.phone_number.length < 10 && userProfile.phone_number.length > 11) {
      Alert.alert('Warning', "Số điện thoại chưa đúng định dạng!!!");
      return;
    }
    try {
      const response = await fetch('https://hucefood.000webhostapp.com/edit_profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userProfile.name,
          phone_number: userProfile.phone_number,
          user_id: user_id,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('', "Cập nhật thành công!!!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert('', "Đăng nhập thất bại!!!");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.PRIMARY} />
            <Text>Loading...</Text>
      </View>
    );
  }

  const onRefresh = () => {
    setRefreshing(true); 
    fetchUserProfile(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <View>
          <Image
            source={require('../assets/images/profileBg.png')}
            style={styles.image}
          />
          <View style={styles.profie}>
          <ProfileCard user_id={route.params.user_id} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.editText}>Edit Profile</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <Text style={styles.fieldTitle}>Full Name</Text>
            <View style={styles.fieldContainer}>
              <TextInput //name
                style={styles.userName}
                value={userProfile.name}
                onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
              />
            </View>
          </View>
          <View style={{ marginTop: units.height / 50 }}>
            <Text style={styles.fieldTitle}>E-mail</Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.userName}>{userProfile.email}</Text>
            </View>
          </View>
          <View style={{ marginTop: units.height / 50 }}>
            <Text style={styles.fieldTitle}>Phone Number</Text>
            <View style={styles.fieldContainer}>
              <TextInput // sdt
                style={styles.userName}
                value={userProfile.phone_number}
                onChangeText={(text) => setUserProfile({ ...userProfile, phone_number: text })}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Save" onPress={onClickNavigatesave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    alignSelf: 'center',
  },
  profie: {
    position: 'absolute',
    bottom: units.height / 41,
    left: 0,
    right: 0,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.DARK,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: units.height / -41,
  },
  editText: {
    color: colors.GRAY,
    marginTop: units.height / 81,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: colors.ORANGE,
    borderRadius: 10,
    paddingVertical: units.height / 48,
    paddingLeft: units.width / 23,
    marginTop: units.height / 67,
  },
  bodyContainer: {
    marginHorizontal: units.width / 21,
    marginTop: units.height / 25,
  },
  fieldTitle: {
    fontSize: 16,
    color: colors.GRAY,
  },
  buttonContainer: {
    marginHorizontal: units.width / 12,
    marginTop: units.height / 38,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
});