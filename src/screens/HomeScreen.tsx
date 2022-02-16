import { View, Text, StyleSheet } from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import { app } from '../utils/firebase';
import { getAuth, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const auth = getAuth(app);

const HomeScreen = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(auth.currentUser);
  });

  return (
    <SafeAreaView>
      <Text> Hello Home screen </Text>
      <View style={styles.row}>
        <Text style={styles.title}>Welcome !</Text>
      </View>
      <Text style={styles.text}>Your UID is: {user ? user.uid : ''} </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000000',
  },
});
export default HomeScreen;
