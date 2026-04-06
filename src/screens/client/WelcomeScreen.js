import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0A0E21', '#111633', '#1A1F38']}
      style={styles.container}
    >
      {/* Background decorative elements */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      <View style={styles.content}>
        {/* Logo / Brand area */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#00E676', '#00C853']}
              style={styles.logoGradient}
            >
              <Ionicons name="football" size={40} color={colors.textInverse} />
            </LinearGradient>
          </View>
          <Text style={styles.appName}>MOVA</Text>
          <Text style={styles.tagline}>Réserve ton terrain en un clic</Text>
        </View>

        {/* Feature highlights */}
        <View style={styles.features}>
          <View style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: colors.primaryMuted }]}>
              <Ionicons name="football" size={20} color={colors.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Football & Padel</Text>
              <Text style={styles.featureDesc}>Trouve et réserve les meilleurs terrains</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: colors.secondaryMuted }]}>
              <Ionicons name="calendar" size={20} color={colors.secondary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Réservation Instantanée</Text>
              <Text style={styles.featureDesc}>Choisis ta date, ton créneau et confirme</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 183, 77, 0.15)' }]}>
              <Ionicons name="card" size={20} color={colors.warning} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Paiement Flexible</Text>
              <Text style={styles.featureDesc}>D17, Flouci ou cash sur place</Text>
            </View>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.cta}>
          <Button
            title="Commencer"
            onPress={() => navigation.navigate('Login')}
          />
          <Text style={styles.terms}>
            En continuant, vous acceptez nos{' '}
            <Text style={styles.termsLink}>conditions d'utilisation</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 230, 118, 0.04)',
    top: -80,
    right: -80,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(68, 138, 255, 0.04)',
    bottom: 100,
    left: -60,
  },
  bgCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 230, 118, 0.03)',
    top: height * 0.35,
    right: -30,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  features: {
    marginBottom: 48,
    gap: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  featureDesc: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  cta: {
    alignItems: 'center',
  },
  terms: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
