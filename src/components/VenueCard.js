import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { borderRadius, spacing, shadows } from '../theme/spacing';

export default function VenueCard({ venue, onPress }) {
  const sportColor = venue.sport === 'football' ? colors.football : colors.padel;
  const sportIcon = venue.sport === 'football' ? 'football' : 'tennisball';
  const sportLabel = venue.sport === 'football' ? 'Football' : 'Padel';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: venue.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
          <View style={[styles.sportBadge, { backgroundColor: sportColor }]}>
            <Ionicons name={sportIcon} size={12} color={colors.textInverse} />
            <Text style={styles.sportText}>{sportLabel}</Text>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{venue.pricePerHour} TND</Text>
            <Text style={styles.priceUnit}>/h</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>{venue.name}</Text>
            {venue.isVerified && (
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            )}
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.address} numberOfLines={1}>{venue.address}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{venue.rating}</Text>
                <Text style={styles.reviewCount}>({venue.reviewCount})</Text>
              </View>
              {venue.distance && (
                <View style={styles.distanceRow}>
                  <Ionicons name="navigate" size={12} color={colors.primary} />
                  <Text style={styles.distanceText}>{venue.distance} km</Text>
                </View>
              )}
            </View>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={13} color={colors.textMuted} />
              <Text style={styles.timeText}>{venue.openTime} - {venue.closeTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceLight,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 14, 33, 0.2)',
  },
  sportBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  sportText: {
    color: colors.textInverse,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(10, 14, 33, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  priceText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  priceUnit: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 2,
  },
  content: {
    padding: spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    marginRight: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    color: colors.textMuted,
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  reviewCount: {
    color: colors.textMuted,
    fontSize: 12,
    marginLeft: 3,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  distanceText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: colors.textMuted,
    fontSize: 12,
    marginLeft: 4,
  },
});
