import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Screens
import WelcomeScreen from '../screens/client/WelcomeScreen';
import LoginScreen from '../screens/client/LoginScreen';
import VenueDetailScreen from '../screens/client/VenueDetailScreen';
import BookingScreen from '../screens/client/BookingScreen';

// Navigators
import ClientTabs from './ClientTabs';
import OwnerTabs from './OwnerTabs';
import AdminTabs from './AdminTabs';

const Stack = createNativeStackNavigator();

// Temporary role selector for demo purposes
function RoleSelectorScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="football" size={48} color={colors.primary} />
          <Text style={styles.title}>SportSpot MVP</Text>
          <Text style={styles.subtitle}>Choisissez un rôle pour la démo</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Welcome')}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(68,138,255,0.1)' }]}>
            <Ionicons name="person" size={24} color={colors.secondary} />
          </View>
          <Text style={styles.btnText}>Expérience Client</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('OwnerTabs')}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(0,230,118,0.1)' }]}>
            <Ionicons name="business" size={24} color={colors.primary} />
          </View>
          <Text style={styles.btnText}>Espace Propriétaire</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />
      
      {/* Auth */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Main Flows */}
      <Stack.Screen name="ClientTabs" component={ClientTabs} />
      <Stack.Screen name="OwnerTabs" component={OwnerTabs} />
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      
      {/* Client Sub-screens */}
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 12 },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  btn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  iconContainer: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  btnText: { flex: 1, fontSize: 16, fontWeight: '700', color: '#fff' },
});
