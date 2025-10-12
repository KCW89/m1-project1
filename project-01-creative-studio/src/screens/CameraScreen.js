import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if running in Expo Go
  // Modern approach: Use executionEnvironment (appOwnership deprecated in SDK 54+)
  const isExpoGo = Constants.executionEnvironment === 'storeClient';

  useEffect(() => {
    (async () => {
      try {
        // Request both camera and media library permissions
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        
        // Set permission based on both statuses
        setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
        
        if (cameraStatus !== 'granted') {
          Alert.alert(
            'Camera Permission Required',
            'Please grant camera permission in your device settings to use this feature.',
            [{ text: 'OK' }]
          );
        }
        
        if (mediaStatus !== 'granted') {
          Alert.alert(
            'Photo Library Permission Required',
            'Please grant photo library permission in your device settings to save and access photos.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Permission request error:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Required', 
        'Please grant camera and photo library permissions in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => ImagePicker.openSettingsAsync() }
        ]
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pickFromGallery = async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Required', 
        'Please grant photo library permission in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => ImagePicker.openSettingsAsync() }
        ]
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery');
    } finally {
      setIsLoading(false);
    }
  };

  const saveToGallery = async () => {
    if (!capturedImage) return;

    try {
      await MediaLibrary.saveToLibraryAsync(capturedImage);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image to gallery.');
    }
  };

  const resetImage = () => {
    setCapturedImage(null);
  };

  const goToEditor = () => {
    if (capturedImage) {
      navigation.navigate('Editor', { imageUri: capturedImage });
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="camera" size={64} color="#6366f1" />
          <Text style={styles.loadingText}>Requesting permissions...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-off" size={64} color="#ef4444" />
          <Text style={styles.permissionTitle}>Permissions Required</Text>
          <Text style={styles.permissionText}>
            This app needs camera and photo library access to function properly.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => ImagePicker.openSettingsAsync()}
          >
            <Text style={styles.permissionButtonText}>Open Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.permissionButton, styles.secondaryButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={() => {
            console.log('Back button pressed');
            try {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('MainTabs');
              }
            } catch (error) {
              console.error('Navigation error:', error);
              navigation.navigate('MainTabs');
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Camera</Text>
        
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Expo Go Notice */}
      {isExpoGo && (
        <View style={styles.expoGoNotice}>
          <Ionicons name="information-circle" size={20} color="#6366f1" />
          <Text style={styles.expoGoText}>
            📱 <Text style={styles.bold}>Expo Go Mode</Text> - Using image picker for photo capture
          </Text>
        </View>
      )}

      {/* Camera Preview or Captured Image */}
      <View style={styles.cameraContainer}>
        {capturedImage ? (
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Ionicons name="camera" size={80} color="#9ca3af" />
            <Text style={styles.placeholderText}>
              {isExpoGo ? 'Tap "Take Photo" to capture' : 'Camera preview will appear here'}
            </Text>
          </View>
        )}
      </View>

      {/* Camera Controls */}
      <View style={styles.controls}>
        {!capturedImage ? (
          <View style={styles.captureControls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={pickFromGallery}
              disabled={isLoading}
            >
              <Ionicons name="images" size={24} color="#6366f1" />
              <Text style={styles.galleryButtonText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingSpinner} />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <View style={styles.galleryButton} />
          </View>
        ) : (
          <View style={styles.editControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={resetImage}
            >
              <Ionicons name="refresh" size={24} color="#6366f1" />
              <Text style={styles.controlButtonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={saveToGallery}
            >
              <Ionicons name="save" size={24} color="#6366f1" />
              <Text style={styles.controlButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={goToEditor}
            >
              <Ionicons name="brush" size={24} color="#6366f1" />
              <Text style={styles.controlButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Feature Info */}
      <View style={styles.featureInfo}>
        <Text style={styles.featureInfoTitle}>Available Features:</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Take photos via camera or gallery</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Save photos to device</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Edit photos in the editor</Text>
          </View>
          {!isExpoGo && (
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text style={styles.featureText}>Real-time camera preview</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  expoGoNotice: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    padding: 12,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expoGoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#1e40af',
  },
  bold: {
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    padding: 40,
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 20,
  },
  captureControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  galleryButton: {
    alignItems: 'center',
    padding: 16,
    minWidth: 80,
  },
  galleryButtonText: {
    color: '#6366f1',
    fontSize: 12,
    marginTop: 4,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  loadingSpinner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#6366f1',
    animation: 'spin 1s linear infinite',
  },
  editControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  controlButton: {
    alignItems: 'center',
    padding: 16,
  },
  controlButtonText: {
    color: '#6366f1',
    fontSize: 12,
    marginTop: 4,
  },
  featureInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
  },
  featureInfoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: '#d1d5db',
    fontSize: 14,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 40,
  },
  permissionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionText: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen;
