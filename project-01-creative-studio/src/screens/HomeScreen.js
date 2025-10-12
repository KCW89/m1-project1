import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // Check if running in Expo Go
  // Modern approach: Use executionEnvironment (appOwnership deprecated in SDK 54+)
  const isExpoGo = Constants.executionEnvironment === 'storeClient';
  
  // Mock data for demo purposes
  const [recentProjects] = useState([
    {
      id: 1,
      name: 'Summer Vacation',
      type: 'Photo Story',
      thumbnail: 'https://via.placeholder.com/80x80/6366f1/ffffff?text=SV',
      date: '2 hours ago'
    },
    {
      id: 2,
      name: 'Art Collection',
      type: 'Artwork',
      thumbnail: 'https://via.placeholder.com/80x80/10b981/ffffff?text=AC',
      date: '1 day ago'
    },
    {
      id: 3,
      name: 'Travel Blog',
      type: 'Video Blog',
      thumbnail: 'https://via.placeholder.com/80x80/f59e0b/ffffff?text=TB',
      date: '3 days ago'
    }
  ]);

  const [quickStats] = useState({
    photosTaken: 24,
    projectsCreated: 8,
    storageUsed: '2.4 GB'
  });

  const features = [
    {
      title: 'Camera & Photo',
      icon: 'camera',
      description: 'Take photos and record videos',
      available: true,
      expoGoNote: isExpoGo ? 'Basic photo capture via gallery' : 'Full camera access',
      action: () => navigation.navigate('Camera')
    },
    {
      title: 'Photo Editor',
      icon: 'brush',
      description: 'Edit photos with filters and tools',
      available: true,
      expoGoNote: isExpoGo ? 'Advanced editing with real effects' : 'Professional editing suite',
      action: () => navigation.navigate('Editor')
    },
    {
      title: 'Gallery',
      icon: 'images',
      description: 'Browse and organize photos',
      available: true,
      expoGoNote: isExpoGo ? 'Access via image picker' : 'Full media library access',
      action: () => navigation.navigate('Gallery')
    },
    {
      title: 'Community',
      icon: 'people',
      description: 'Share and discover creations',
      available: true,
      expoGoNote: 'Connect with other creators',
      action: () => navigation.navigate('Community')
    },
    {
      title: 'Profile',
      icon: 'person',
      description: 'Manage your account and portfolio',
      available: true,
      expoGoNote: 'Track your progress and achievements',
      action: () => navigation.navigate('Profile')
    }
  ];

  const projectTemplates = [
    {
      id: 'photo-story',
      title: 'Photo Story',
      icon: 'camera',
      description: 'Create photo narratives',
      color: '#6366f1',
      action: () => navigation.navigate('Camera')
    },
    {
      id: 'video-blog',
      title: 'Video Blog',
      icon: 'videocam',
      description: 'Record and edit videos',
      color: '#10b981',
      action: () => navigation.navigate('Camera')
    },
    {
      id: 'art-collection',
      title: 'Art Collection',
      icon: 'brush',
      description: 'Edit and organize artwork',
      color: '#f59e0b',
      action: () => navigation.navigate('Editor')
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>My Creative Studio</Text>
          <Text style={styles.subtitle}>Unleash Your Creativity</Text>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Ionicons name="images" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>{quickStats.photosTaken}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="folder" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>{quickStats.projectsCreated}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="hardware-chip" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>{quickStats.storageUsed}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Expo Go Compatibility Notice */}
      {isExpoGo && (
        <View style={styles.expoGoNotice}>
          <Ionicons name="information-circle" size={24} color="#6366f1" />
          <Text style={styles.expoGoText}>
            📱 <Text style={styles.bold}>Expo Go Mode</Text> - Core features working! Photo editing with real visual effects.
          </Text>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryAction]}
            onPress={() => navigation.navigate('Camera')}
          >
            <Ionicons name="camera" size={32} color="white" />
            <Text style={styles.actionText}>Camera</Text>
            <Text style={styles.actionSubtext}>Take Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Gallery')}
          >
            <Ionicons name="images" size={28} color="white" />
            <Text style={styles.actionText}>Gallery</Text>
            <Text style={styles.actionSubtext}>Browse Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Editor')}
          >
            <Ionicons name="brush" size={28} color="white" />
            <Text style={styles.actionText}>Editor</Text>
            <Text style={styles.actionSubtext}>Edit Photos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Projects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('Albums')}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="arrow-forward" size={16} color="#6366f1" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentProjects.map((project) => (
            <TouchableOpacity 
              key={project.id} 
              style={styles.projectCard}
              onPress={() => {
                if (project.type === 'Photo Story') {
                  navigation.navigate('Camera');
                } else if (project.type === 'Artwork') {
                  navigation.navigate('Editor');
                } else if (project.type === 'Video Blog') {
                  navigation.navigate('Camera');
                }
              }}
              activeOpacity={0.7}
            >
              <Image source={{ uri: project.thumbnail }} style={styles.projectThumbnail} />
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectType}>{project.type}</Text>
                <Text style={styles.projectDate}>{project.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Project Templates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Start New Project</Text>
        <View style={styles.templates}>
          {projectTemplates.map((template) => (
            <TouchableOpacity 
              key={template.id} 
              style={[styles.templateCard, { borderLeftColor: template.color }]}
              onPress={template.action}
              activeOpacity={0.7}
            >
              <View style={[styles.templateIcon, { backgroundColor: template.color }]}>
                <Ionicons name={template.icon} size={24} color="white" />
              </View>
              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateDescription}>{template.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Features</Text>
        {features.map((feature, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.featureItem}
            onPress={feature.action}
          >
            <View style={styles.featureHeader}>
              <Ionicons 
                name={feature.icon} 
                size={24} 
                color={feature.available ? '#10b981' : '#6b7280'} 
              />
              <Text style={[styles.featureTitle, !feature.available && styles.disabledText]}>
                {feature.title}
              </Text>
              {feature.available && (
                <Ionicons name="chevron-forward" size={20} color="#6366f1" />
              )}
            </View>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <Text style={styles.expoGoNote}>{feature.expoGoNote}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Development Build Info */}
      {isExpoGo && (
        <View style={styles.devBuildInfo}>
          <Text style={styles.devBuildTitle}>🚀 Want Full Features?</Text>
          <Text style={styles.devBuildText}>
            To access all camera, video recording, and advanced editing features, 
            you'll need to create a development build using EAS Build.
          </Text>
          <Text style={styles.devBuildText}>
            <Text style={styles.bold}>Current Mode:</Text> Expo Go (Core Features Working)
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 30,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  expoGoNotice: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  expoGoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginRight: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  primaryAction: {
    backgroundColor: '#10b981',
  },
  actionText: {
    color: 'white',
    marginTop: 8,
    fontWeight: '600',
  },
  actionSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  featureItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
    color: '#1f2937',
  },
  disabledText: {
    color: '#6b7280',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  expoGoNote: {
    fontSize: 12,
    color: '#6366f1',
    fontStyle: 'italic',
  },
  devBuildInfo: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    padding: 16,
    margin: 16,
  },
  devBuildTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  devBuildText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
    marginBottom: 4,
  },
  templates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    color: '#1f2937',
  },
  templateDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 10,
    width: width * 0.4, // Adjust as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectThumbnail: {
    width: '100%',
    height: width * 0.4 * 0.7, // Aspect ratio for thumbnail
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  projectInfo: {
    padding: 10,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  projectType: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  projectDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default HomeScreen;
