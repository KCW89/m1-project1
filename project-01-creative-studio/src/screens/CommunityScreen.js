import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Creative Artist',
        avatar: null,
        isVerified: true,
      },
      image: null,
      caption: 'Just finished this amazing digital painting! What do you think? 🎨✨',
      likes: 42,
      comments: 8,
      timeAgo: '2 hours ago',
      isLiked: false,
    },
    {
      id: 2,
      user: {
        name: 'Design Pro',
        avatar: null,
        isVerified: false,
      },
      image: null,
      caption: 'New logo design for a tech startup. Clean and modern approach! 💻',
      likes: 28,
      comments: 5,
      timeAgo: '5 hours ago',
      isLiked: true,
    },
    {
      id: 3,
      user: {
        name: 'Photo Master',
        avatar: null,
        isVerified: true,
      },
      image: null,
      caption: 'Sunset photography session today. Nature never fails to amaze me! 🌅',
      likes: 67,
      comments: 12,
      timeAgo: '1 day ago',
      isLiked: false,
    },
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const addComment = (postId) => {
    Alert.prompt(
      'Add Comment',
      'Write your comment:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Post',
          onPress: (comment) => {
            if (comment && comment.trim()) {
              setPosts(posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    comments: post.comments + 1,
                  };
                }
                return post;
              }));
              Alert.alert('Success', 'Comment added!');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const sharePost = (postId) => {
    Alert.alert('Share', 'Post shared successfully!');
  };

  const createNewPost = () => {
    if (newPostText.trim()) {
      const newPost = {
        id: Date.now(),
        user: {
          name: 'You',
          avatar: null,
          isVerified: false,
        },
        image: null,
        caption: newPostText,
        likes: 0,
        comments: 0,
        timeAgo: 'Just now',
        isLiked: false,
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
      setShowNewPost(false);
      Alert.alert('Success', 'Post created successfully!');
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color="#9ca3af" />
          </View>
          <View style={styles.userDetails}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{item.user.name}</Text>
              {item.user.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
              )}
            </View>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={styles.caption}>{item.caption}</Text>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.postImage} />
        )}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Ionicons
            name={item.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={item.isLiked ? '#ef4444' : '#6b7280'}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => addComment(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#6b7280" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => sharePost(item.id)}
        >
          <Ionicons name="share-outline" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNewPostInput = () => (
    <View style={styles.newPostContainer}>
      <View style={styles.newPostHeader}>
        <Text style={styles.newPostTitle}>Create New Post</Text>
        <TouchableOpacity onPress={() => setShowNewPost(false)}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.newPostInput}
        placeholder="What's on your mind?"
        value={newPostText}
        onChangeText={setNewPostText}
        multiline
        numberOfLines={4}
      />
      <View style={styles.newPostActions}>
        <TouchableOpacity style={styles.mediaButton}>
          <Ionicons name="image" size={20} color="#6366f1" />
          <Text style={styles.mediaButtonText}>Add Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.postButton, !newPostText.trim() && styles.postButtonDisabled]}
          onPress={createNewPost}
          disabled={!newPostText.trim()}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity onPress={() => setShowNewPost(true)}>
          <Ionicons name="add-circle" size={28} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {/* New Post Input */}
      {showNewPost && renderNewPostInput()}

      {/* Posts Feed */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.feedHeader}>
            <Text style={styles.feedTitle}>Trending Today</Text>
            <Text style={styles.feedSubtitle}>Discover amazing creations from our community</Text>
          </View>
        }
      />
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
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  newPostContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  newPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newPostTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  newPostInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  newPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediaButtonText: {
    marginLeft: 8,
    color: '#6366f1',
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  postButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  feedContainer: {
    padding: 16,
  },
  feedHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  feedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  feedSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  timeAgo: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  postContent: {
    padding: 16,
  },
  caption: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  postActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6b7280',
  },
});

export default CommunityScreen;
