import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { getSession } from '../services/Session'; 

export default function Index() {
  const [userChecked, setUserChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const uid = await getSession();

      if (uid) {
        console.log('Usuario recordado:', uid);
        setIsLoggedIn(true); // redirigimos a home
      }

      setUserChecked(true);
    };

    checkSession();
  }, []);

  if (!userChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? '/home' : '/login'} />;
}
