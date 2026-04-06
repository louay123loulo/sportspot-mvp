import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import TimeSlotPicker from '../../components/TimeSlotPicker';
import Button from '../../components/Button';
import { generateTimeSlots } from '../../data/mockVenues';

const { width } = Dimensions.get('window');

export default function VenueDetailScreen({ route, navigation }) {
  const { venue } = route.params;
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const sportColor = venue.sport === 'football' ? colors.football : colors.padel;

  // Generate dates for the next 7 days
  const dates = useMemo(() => {
    const d = [];
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      d.push({
        id: i,
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        full: date.toISOString().split('T')[0],
        isToday: i === 0,
      });
    }
    return d;
  }, []);

  const timeSlots = useMemo(() => generateTimeSlots(dates[selectedDate]?.full), [selectedDate]);

  const handleBookNow = () => {
    if (selectedSlot) {
      navigation.navigate('Booking', {
        venue,
        date: dates[selectedDate],
        slot: selectedSlot,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: venue.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(10,14,33,0.8)', colors.background]}
            style={styles.heroGradient}
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="heart-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Venue Info */}
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <View style={styles.nameGroup}>
              <Text style={styles.name}>{venue.name}</Text>
              {venue.isVerified && (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </View>
            <View style={[styles.sportTag, { backgroundColor: sportColor }]}>
              <Ionicons
                name={venue.sport === 'football' ? 'football' : 'tennisball'}
                size={14}
                color={colors.textInverse}
              />
              <Text style={styles.sportTagText}>
                {venue.sport === 'football' ? 'Football' : 'Padel'}
              </Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.address}>{venue.address}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.statValue}>{venue.rating}</Text>
              <Text style={styles.statLabel}>({venue.reviewCount} avis)</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Ionicons name="time" size={16} color={colors.textMuted} />
              <Text style={styles.statValue}>{venue.openTime} - {venue.closeTime}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.priceHighlight}>{venue.pricePerHour} TND</Text>
              <Text style={styles.statLabel}>/heure</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.description}>{venue.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements</Text>
            <View style={styles.amenities}>
              {venue.amenities.map((amenity, i) => (
                <View key={i} style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Map Location */}
          {venue.latitude && venue.longitude && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Localisation ({venue.distance} km)</Text>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: venue.latitude,
                    longitude: venue.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                  }}
                >
                  <Marker
                    coordinate={{ latitude: venue.latitude, longitude: venue.longitude }}
                    title={venue.name}
                    description={venue.address}
                  />
                </MapView>
              </View>
            </View>
          )}

          {/* Date Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choisir la date</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateList}
            >
              {dates.map((d) => {
                const isActive = selectedDate === d.id;
                return (
                  <TouchableOpacity
                    key={d.id}
                    onPress={() => { setSelectedDate(d.id); setSelectedSlot(null); }}
                    style={[styles.dateCard, isActive && styles.dateCardActive]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dateDay, isActive && styles.dateDayActive]}>
                      {d.isToday ? "Auj." : d.day}
                    </Text>
                    <Text style={[styles.dateNum, isActive && styles.dateNumActive]}>
                      {d.date}
                    </Text>
                    <Text style={[styles.dateMonth, isActive && styles.dateMonthActive]}>
                      {d.month}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Time Slots */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Créneaux disponibles</Text>
            <TimeSlotPicker
              slots={timeSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceValue}>
            {selectedSlot ? selectedSlot.price : venue.pricePerHour} TND
          </Text>
          <Text style={styles.bottomPriceLabel}>/ heure</Text>
        </View>
        <View style={styles.bottomBtn}>
          <Button
            title="Réserver"
            onPress={handleBookNow}
            disabled={!selectedSlot}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceLight,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10,14,33,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10,14,33,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: spacing.xl,
    marginTop: -40,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sportTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    gap: 5,
  },
  sportTagText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  address: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  priceHighlight: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    gap: 6,
  },
  amenityText: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '600',
  },
  mapContainer: {
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  dateList: {
    gap: 10,
  },
  dateCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 64,
  },
  dateCardActive: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  dateDay: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dateDayActive: { color: colors.primary },
  dateNum: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 2,
  },
  dateNumActive: { color: colors.primary },
  dateMonth: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  dateMonthActive: { color: colors.primaryLight },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    paddingBottom: 32,
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomPrice: {
    flex: 1,
  },
  bottomPriceValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  bottomPriceLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  bottomBtn: {
    flex: 1,
  },
});
