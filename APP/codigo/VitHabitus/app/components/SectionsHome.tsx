import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

interface SectionProps {
  title: string;
  seeAllLink: string;
  emptyText: string;
}

export default function SectionsHome() {
  return (
    <>
      <Section 
        title="Últimos Resultados"
        seeAllLink="/(tabs)/results"
        emptyText="Sin resultados"
      />
      <Section 
        title="Últimas Notas"
        seeAllLink="/(tabs)/notes"
        emptyText="Sin notas"
      />
    </>
  );
}

function Section({ title, seeAllLink, emptyText }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Link href={{ pathname: seeAllLink as any }} style={styles.seeAllLink}>See all</Link>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#2196F3',
  },
  contentContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
}); 