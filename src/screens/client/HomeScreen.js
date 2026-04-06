import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import VenueCard from '../../components/VenueCard';
import { mockVenues } from '../../data/mockVenues';
import * as Location from 'expo-location';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return Math.round(d * 10) / 10;
}

const SPORTS = [
  { id: 'all', label: 'Tous', icon: 'apps' },
  { id: 'football', label: 'Football', icon: 'football' },
  { id: 'padel', label: 'Padel', icon: 'tennisball' },
];

export default function HomeScreen({ navigation }) {
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  // Compute live venues
  const liveVenues = mockVenues.map(v => {
    if (userLocation && v.latitude && v.longitude) {
      return { ...v, distance: calculateDistance(userLocation.latitude, userLocation.longitude, v.latitude, v.longitude) };
    }
    return v;
  });

  const filteredVenues = liveVenues.filter((v) => {
    const matchesSport = selectedSport === 'all' || v.sport === selectedSport;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const popularVenues = liveVenues.filter((v) => v.rating >= 4.7);

  const renderHeader = () => (
    <View>
      {/* Greeting */}
      <View style={styles.greeting}>
        <View>
          <Text style={styles.greetingText}>Salut Ahmed 👋</Text>
          <Text style={styles.greetingSubtext}>Trouve ton terrain idéal</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un terrain..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Sport Filter */}
      <View style={styles.sportFilter}>
        {SPORTS.map((sport) => {
          const isActive = selectedSport === sport.id;
          return (
            <TouchableOpacity
              key={sport.id}
              onPress={() => setSelectedSport(sport.id)}
              activeOpacity={0.7}
              style={[styles.sportChip, isActive && styles.sportChipActive]}
            >
              <Ionicons
                name={sport.icon}
                size={16}
                color={isActive ? colors.textInverse : colors.textMuted}
              />
              <Text style={[styles.sportChipText, isActive && styles.sportChipTextActive]}>
                {sport.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Popular Section */}
      {selectedSport === 'all' && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🔥 Populaires</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedSport === 'all' && (
        <FlatList
          data={popularVenues}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => 'pop-' + item.id}
          contentContainerStyle={styles.popularList}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('VenueDetail', { venue: item })}
              style={styles.popularCard}
            >
              <LinearGradient
                colors={item.sport === 'football'
                  ? ['rgba(0,230,118,0.2)', 'rgba(0,200,83,0.05)']
                  : ['rgba(68,138,255,0.2)', 'rgba(41,121,255,0.05)']}
                style={styles.popularGradient}
              >
                <Ionicons
                  name={item.sport === 'football' ? 'football' : 'tennisball'}
                  size={28}
                  color={item.sport === 'football' ? colors.football : colors.padel}
                />
                <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
                <View style={styles.popularRating}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.popularRatingText}>{item.rating}</Text>
                </View>
                <Text style={styles.popularPrice}>{item.pricePerHour} TND/h</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      )}

      {/* All Venues Header */}
      <View style={[styles.sectionHeader, { marginTop: selectedSport === 'all' ? 8 : 0 }]}>
        <Text style={styles.sectionTitle}>
          {selectedSport === 'all' ? '📍 À proximité' : `${selectedSport === 'football' ? '⚽' : '🎾'} ${selectedSport === 'football' ? 'Football' : 'Padel'}`}
        </Text>
        <Text style={styles.venueCount}>{filteredVenues.length} terrains</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={filteredVenues}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <VenueCard
              venue={item}
              onPress={() => navigation.navigate('VenueDetail', { venue: item })}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Aucun terrain trouvé</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingTop: 56,
    paddingBottom: 32,
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  greetingSubtext: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  notifBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  notifDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.base,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.base,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: 12,
    marginLeft: 10,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportFilter: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    gap: 10,
    marginBottom: spacing.lg,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  sportChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sportChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  sportChipTextActive: {
    color: colors.textInverse,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAll: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  venueCount: {
    color: colors.textMuted,
    fontSize: 13,
  },
  popularList: {
    paddingHorizontal: spacing.xl,
    gap: 12,
    marginBottom: spacing.lg,
  },
  popularCard: {
    width: 140,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  popularGradient: {
    padding: spacing.base,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 140,
    justifyContent: 'center',
  },
  popularName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
  popularRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 3,
  },
  popularRatingText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  popularPrice: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  cardWrapper: {
    paddingHorizontal: spacing.xl,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 12,
  },
});
