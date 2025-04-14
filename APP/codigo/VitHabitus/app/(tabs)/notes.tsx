import { View, Text, StyleSheet } from 'react-native';
import useAuthRedirect from '../components/login/authRedirect';

export default function NotesScreen() {
  useAuthRedirect();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notes Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
}); 