import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import WelcomeCard from './components/WelcomeCard';
import { colors } from './styles/colors';

export default function App() {
  return (
    <View style={styles.container}>
      {/* TODO #1: Modify this welcome message
          Instructions: Change "Welcome to React Native!" to your own custom message
          Example: "Hello, [Your Name]!" or "My First Mobile App!"
      */}
      <Text style={styles.title}>Welcome to React Native!</Text>

      {/* Pre-built WelcomeCard component - Already working! */}
      <WelcomeCard />

      {/* TODO #3: Add custom image
          Instructions: Replace the image source with your own image URL
          Example: source={{ uri: 'https://picsum.photos/200/200' }}
          Or use a local image: source={require('./assets/your-image.png')}
      */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />

      {/* TODO #4: Create additional text component
          Instructions: Add a new Text component below with your own message
          Example: <Text style={styles.subtitle}>This is my first React Native app!</Text>
          Remember to use the <Text> wrapper for all text content!
      */}

      {/* TODO #5: Test hot reload
          Instructions: Make any change to the text above and save the file
          You should see the app update automatically in 2-3 seconds
          Try changing the welcome message, colors, or adding more text
      */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
});
