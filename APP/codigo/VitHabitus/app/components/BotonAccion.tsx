import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link} from 'expo-router';

interface BotonAccionProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color: string;
  href: string;
}

export default function BotonAccion({ icon, text, color, href }: BotonAccionProps) {
  return (
    <Link href={{pathname: href as any}} asChild>
      <TouchableOpacity style={styles.actionCard}>
        <Ionicons name={icon} size={32} color={color} />
        <Text style={styles.actionText}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});