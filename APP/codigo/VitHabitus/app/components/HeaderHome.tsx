import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsMenu from '../components/ui/SettingsMenu';

export default function HeaderHome() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person-outline" size={30} color="#666" />
        </View>
      </View>
      <Image 
        source={require('../../assets/images/logo_inside1x.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.settingsButton} onPress={() => setShowMenu(true)}>
        <Ionicons name="settings-outline" size={24} color="#333" />
      </TouchableOpacity>

      <SettingsMenu visible={showMenu} onClose={() => setShowMenu(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    height: 40,
    width: 120,
  },
  profileSection: {
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
  },
}); 