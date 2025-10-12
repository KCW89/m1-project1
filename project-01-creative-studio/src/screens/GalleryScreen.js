import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // Check if running in Expo Go
  // Modern approach: Use executionEnvironment (appOwnership deprecated in SDK 54+)
  const isExpoGo = Constants.executionEnvironment === 'storeClient';

  useEffect(() => {
    (async () => {
      try {
        console.log('Requesting media library permission...');
        // Request media library permission
        const { status } = await MediaLibrary.requestPermissionsAsync();
        console.log('Media library permission status:', status);
        setHasPermission(status === 'granted');
        
        if (status === 'granted') {
          loadImages();
        } else {
          console.log('Permission denied, showing alert');
          Alert.alert(
            'Photo Library Permission Required',
            'Please grant photo library permission in your device settings to access your photos.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => ImagePicker.openSettingsAsync() }
            ]
          );
        }
      } catch (error) {
        console.error('Permission request error:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  const loadImages = async () => {
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      // For Expo Go, we'll use a different approach since MediaLibrary has limitations
      if (isExpoGo) {
        // In Expo Go, we'll show a message and allow adding images via picker
        setImages([]);
        setIsLoading(false);
        return;
      }

      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
        first: 50, // Limit to first 50 images for performance
        sortBy: ['creationTime'],
      });

      setImages(assets);
    } catch (error) {
      console.error('Error loading images:', error);
      // In Expo Go, this is expected, so we'll handle it gracefully
      if (!isExpoGo) {
        Alert.alert('Error', 'Failed to load images from gallery');
      }
      // Set empty array for Expo Go to avoid infinite loading
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    console.log('+ button pressed, hasPermission:', hasPermission);
    
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
      console.log('Launching image picker...');
      
      // Simplified configuration for better compatibility
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1.0, // Full quality
        allowsEditing: false,
        aspect: undefined, // No aspect ratio constraint
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Add picked images to the list
        const newImages = result.assets.map(asset => ({
          id: asset.uri,
          uri: asset.uri,
          filename: asset.fileName || 'Image',
          creationTime: Date.now(),
        }));
        
        console.log('New images to add:', newImages);
        setImages(prev => [...newImages, ...prev]);
        Alert.alert('Success', `${result.assets.length} image(s) added to gallery`);
      } else {
        console.log('Image picker was canceled or no assets');
        if (result.canceled) {
          console.log('User canceled the image picker');
        } else {
          console.log('No assets returned from image picker');
          console.log('Result structure:', JSON.stringify(result, null, 2));
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const deleteSelectedImages = () => {
    if (selectedImages.length === 0) return;

    Alert.alert(
      'Delete Images',
      `Are you sure you want to delete ${selectedImages.length} image(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
            setSelectedImages([]);
            Alert.alert('Success', 'Images deleted from gallery');
          },
        },
      ]
    );
  };

  const shareSelectedImages = () => {
    if (selectedImages.length === 0) return;

    Alert.alert(
      'Share Images',
      `Share ${selectedImages.length} image(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Share',
          onPress: () => {
            // In a real app, you would use expo-sharing here
            Alert.alert('Sharing', 'Sharing functionality would be implemented here');
          },
        },
      ]
    );
  };

  const openImage = (image) => {
    navigation.navigate('Editor', { imageUri: image.uri });
  };

  const renderImage = ({ item }) => {
    const isSelected = selectedImages.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[styles.imageContainer, isSelected && styles.selectedImage]}
        onPress={() => openImage(item)}
        onLongPress={() => toggleImageSelection(item.id)}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        
        {isSelected && (
          <View style={styles.selectionOverlay}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
          </View>
        )}
        
        <View style={styles.imageInfo}>
          <Text style={styles.imageName} numberOfLines={1}>
            {item.filename}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="images" size={64} color="#6366f1" />
          <Text style={styles.loadingText}>Requesting permissions...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="images-off" size={64} color="#ef4444" />
          <Text style={styles.permissionTitle}>Photo Library Permission Required</Text>
          <Text style={styles.permissionText}>
            This app needs access to your photo library to display and organize images.
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
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
        
        <Text style={styles.headerTitle}>Gallery</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={() => {
              console.log('+ button pressed');
              pickImage();
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Expo Go Notice */}
      {isExpoGo && (
        <View style={styles.expoGoNotice}>
          <Ionicons name="information-circle" size={20} color="#6366f1" />
          <Text style={styles.expoGoText}>
            📱 <Text style={styles.bold}>Expo Go Mode</Text> - Use + button to add images from your photo library
          </Text>
        </View>
      )}

      {/* Selection Actions */}
      {selectedImages.length > 0 && (
        <View style={styles.selectionActions}>
          <Text style={styles.selectionText}>
            {selectedImages.length} image(s) selected
          </Text>
          <View style={styles.selectionButtons}>
            <TouchableOpacity
              style={styles.selectionButton}
              onPress={shareSelectedImages}
            >
              <Ionicons name="share" size={20} color="#6366f1" />
              <Text style={styles.selectionButtonText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.selectionButton, styles.deleteButton]}
              onPress={deleteSelectedImages}
            >
              <Ionicons name="trash" size={20} color="#ef4444" />
              <Text style={[styles.selectionButtonText, styles.deleteButtonText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Gallery Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="images" size={64} color="#6366f1" />
          <Text style={styles.loadingText}>Loading gallery...</Text>
        </View>
      ) : images.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="images-outline" size={64} color="#9ca3af" />
          <Text style={styles.emptyTitle}>No Images Found</Text>
          <Text style={styles.emptyText}>
            {isExpoGo 
              ? 'Use the + button to add images from your photo library'
              : 'Your photo library appears to be empty'
            }
          </Text>
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={pickImage}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addImageButtonText}>Add Images</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.galleryGrid}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Feature Info */}
      <View style={styles.featureInfo}>
        <Text style={styles.featureInfoTitle}>Available Features:</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Add images from photo library</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Select multiple images</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Open images in editor</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Delete selected images</Text>
          </View>
          {!isExpoGo && (
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text style={styles.featureText}>Browse existing photo library</Text>
            </View>
          )}
        </View>
      </View>
    </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
  headerRight: {
    flexDirection: 'row',
    gap: 12,
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
  selectionActions: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  selectionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 6,
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  selectionButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButtonText: {
    color: '#ef4444',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 40,
  },
  emptyTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  addImageButton: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  galleryGrid: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1f2937',
    position: 'relative',
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#6366f1',
  },
  image: {
    width: '100%',
    height: (width - 32) / 3,
    resizeMode: 'cover',
  },
  selectionOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#6366f1',
    borderRadius: 12,
  },
  imageInfo: {
    padding: 8,
  },
  imageName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
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
});

export default GalleryScreen;
