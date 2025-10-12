import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AlbumsScreen = ({ navigation }) => {
  const [albums] = useState([
    {
      id: 1,
      name: 'Photo Stories',
      count: 12,
      thumbnail: 'https://via.placeholder.com/80x80/6366f1/ffffff?text=PS',
      color: '#6366f1',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Art Collection',
      count: 8,
      thumbnail: 'https://via.placeholder.com/80x80/10b981/ffffff?text=AC',
      color: '#10b981',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Video Blogs',
      count: 5,
      thumbnail: 'https://via.placeholder.com/80x80/f59e0b/ffffff?text=VB',
      color: '#f59e0b',
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      name: 'Design Projects',
      count: 15,
      thumbnail: 'https://via.placeholder.com/80x80/ef4444/ffffff?text=DP',
      color: '#ef4444',
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      name: 'Personal Photos',
      count: 24,
      thumbnail: 'https://via.placeholder.com/80x80/8b5cf6/ffffff?text=PP',
      color: '#8b5cf6',
      lastUpdated: '1 week ago'
    },
    {
      id: 6,
      name: 'Creative Experiments',
      count: 7,
      thumbnail: 'https://via.placeholder.com/80x80/06b6d4/ffffff?text=CE',
      color: '#06b6d4',
      lastUpdated: '2 weeks ago'
    }
  ]);

  const renderAlbum = ({ item }) => (
    <TouchableOpacity 
      style={styles.albumCard}
      onPress={() => {
        // Navigate to album details or create new project in this category
        if (item.name === 'Photo Stories') {
          navigation.navigate('Camera');
        } else if (item.name === 'Art Collection') {
          navigation.navigate('Editor');
        } else if (item.name === 'Video Blogs') {
          navigation.navigate('Camera');
        } else {
          navigation.navigate('Editor');
        }
      }}
    >
      <View style={styles.albumHeader}>
        <Image source={{ uri: item.thumbnail }} style={styles.albumThumbnail} />
        <View style={styles.albumInfo}>
          <Text style={styles.albumName}>{item.name}</Text>
          <Text style={styles.albumCount}>{item.count} projects</Text>
          <Text style={styles.albumDate}>{item.lastUpdated}</Text>
        </View>
        <View style={styles.albumActions}>
          <TouchableOpacity 
            style={[styles.actionIcon, { backgroundColor: item.color }]}
            onPress={() => {
              if (item.name === 'Photo Stories' || item.name === 'Video Blogs') {
                navigation.navigate('Camera');
              } else {
                navigation.navigate('Editor');
              }
            }}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionIcon}
            onPress={() => {
              // View album contents
              Alert.alert('View Album', `Viewing contents of ${item.name}`);
            }}
          >
            <Ionicons name="eye" size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Albums</Text>
        
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Albums List */}
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.albumsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.quickActionText}>New Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Editor')}
        >
          <Ionicons name="brush" size={24} color="white" />
          <Text style={styles.quickActionText}>New Project</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#667eea',
  },
  headerButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  albumsList: {
    padding: 20,
  },
  albumCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  albumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  albumInfo: {
    flex: 1,
  },
  albumName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  albumCount: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  albumDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  albumActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  quickActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AlbumsScreen;
