import { View, Text, StyleSheet } from 'react-native';
import useAuthRedirect from '../components/login/authRedirect';
import CFOGauge from '../components/ui/Cfomedidor';
export default function ResultsrScreen() {
    useAuthRedirect();
    const mockORI = 50;
    return (
      <View style={styles.container}>
        <CFOGauge value={mockORI} />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});