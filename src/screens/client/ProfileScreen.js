import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Informations personnelles', color: colors.primary },
  { icon: 'card-outline', label: 'Méthodes de paiement', color: colors.secondary },
  { icon: 'heart-outline', label: 'Terrains favoris', color: '#FF6B9D' },
  { icon: 'notifications-outline', label: 'Notifications', color: colors.warning },
  { icon: 'language-outline', label: 'Langue', color: '#9C27B0' },
  { icon: 'shield-checkmark-outline', label: 'Confidentialité', color: '#00BCD4' },
  { icon: 'help-circle-outline', label: 'Aide & Support', color: '#FF9800' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Mon Profil</Text>

        {/* User Card */}
        <LinearGradient colors={['rgba(0,230,118,0.12)', 'rgba(68,138,255,0.08)']}
          style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AB</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ahmed Ben Ali</Text>
            <Text style={styles.userEmail}>ahmed@example.com</Text>
            <Text style={styles.userPhone}>+216 55 123 456</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={18} color={colors.primary} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>23</Text>
            <Text style={styles.statLbl}>Réservations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLbl}>Favoris</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>⭐ 4.8</Text>
            <Text style={styles.statLbl}>Note</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] })
        }>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.version}>MOVA v1.0.0 MVP</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 100 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 24 },
  userCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '800', color: colors.textInverse },
  userInfo: { flex: 1, marginLeft: 16 },
  userName: { fontSize: 18, fontWeight: '700', color: '#fff' },
  userEmail: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  userPhone: { fontSize: 13, color: colors.textMuted, marginTop: 1 },
  editBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statVal: { fontSize: 20, fontWeight: '800', color: '#fff' },
  statLbl: { fontSize: 11, color: colors.textMuted, marginTop: 4, fontWeight: '600' },
  menu: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 24 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, color: '#fff', fontWeight: '500', marginLeft: 14 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 14, backgroundColor: 'rgba(255,82,82,0.1)', borderWidth: 1, borderColor: 'rgba(255,82,82,0.2)', gap: 8 },
  logoutText: { fontSize: 15, fontWeight: '700', color: colors.error },
  version: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginTop: 20 },
});
