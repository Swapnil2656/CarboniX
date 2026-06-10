import { StyleSheet, Text, View } from 'react-native';

export default function ConsoleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💻 API Console</Text>
      <Text style={styles.subtitle}>
        Test the Carbonix API with a live Postman-style interface
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
