import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../themes/Colors';
import { units } from '../themes/Units';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProfileCard = ({ user_id }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const avatarName = `viet${user_id}.png`;
    const apiUrl = 'https://hucefood.000webhostapp.com/upload_avatar.php';
    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      name: avatarName,
      type: 'image/png',
    });

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success:', response.data);
    } catch (error) {
      console.log('Upload failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Image
          source={{ uri: `https://hucefood.000webhostapp.com/image/viet${user_id}.png` }}
          style={styles.image}
        />
      )}
      <TouchableOpacity style={styles.cameraContainer} onPress={pickImage}>
        <Icon name="camera" size={18} color={colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: units.width / 37,
    paddingVertical: units.height / 81,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  cameraContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: units.width / 41,
    paddingVertical: units.height / 90,
    position: 'absolute',
    right: units.width / 75,
    bottom: units.height / 81,
  },
});
