export const mockVenues = [
  {
    id: '1',
    name: 'Terrain El Menzah',
    address: 'Complexe Sportif El Menzah, Tunis',
    sport: 'football',
    rating: 4.8,
    reviewCount: 124,
    pricePerHour: 90,
    currency: 'TND',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800',
    images: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800',
      'https://images.unsplash.com/photo-1551280857-2b9bbe520442?w=800',
    ],
    description: 'Un terrain 5v5 extérieur avec un gazon synthétique dernière génération. Idéal pour vos matchs entre amis le soir grâce au nouvel éclairage LED.',
    amenities: ['Parking gratuit', 'Vestiaires', 'Buvette', 'Éclairage LED'],
    openTime: '08:00',
    closeTime: '23:30',
    ownerId: 'owner1',
    isVerified: true,
    distance: 2.3,
    latitude: 36.8392,
    longitude: 10.1815,
  },
  {
    id: '2',
    name: 'Padel Pro Lac 2',
    address: 'Les Berges du Lac 2, Tunis',
    sport: 'padel',
    rating: 4.9,
    reviewCount: 89,
    pricePerHour: 60,
    currency: 'TND',
    image: 'https://images.unsplash.com/photo-1626244669865-1d044cdb2d87?w=800',
    images: [
      'https://images.unsplash.com/photo-1626244669865-1d044cdb2d87?w=800',
    ],
    description: 'Club indoor premium 100% Padel. Venez profiter de nos 4 terrains panoramiques protégés du vent et du soleil.',
    amenities: ['Couvert', 'Raquettes à louer', 'Café', 'Climatisation'],
    openTime: '06:00',
    closeTime: '00:00',
    ownerId: 'owner2',
    isVerified: true,
    distance: 5.1,
    latitude: 36.8346,
    longitude: 10.2662,
  },
  {
    id: '3',
    name: 'City Foot Ariana',
    address: 'Zone Industrielle Chotrana, Ariana',
    sport: 'football',
    rating: 4.5,
    reviewCount: 210,
    pricePerHour: 110,
    currency: 'TND',
    image: 'https://images.unsplash.com/photo-1551280857-2b9bbe520442?w=800',
    images: [
      'https://images.unsplash.com/photo-1551280857-2b9bbe520442?w=800',
    ],
    description: "L'un des rares complexes Indoor à Ariana. Parfait pour l'hiver ou l'été en cas de canicule.",
    amenities: ['Indoor', 'Ballons fournis', 'Chasubles', 'Gradins'],
    openTime: '09:00',
    closeTime: '23:00',
    ownerId: 'owner1',
    isVerified: false,
    distance: 6.8,
    latitude: 36.8797,
    longitude: 10.1989,
  },
  {
    id: '4',
    name: 'Olympia Padel Marsa',
    address: 'Route du Relais, La Marsa',
    sport: 'padel',
    rating: 4.7,
    reviewCount: 56,
    pricePerHour: 50,
    currency: 'TND',
    image: 'https://images.unsplash.com/photo-1622359416550-6d4ef633e6f5?w=800',
    images: [
      'https://images.unsplash.com/photo-1622359416550-6d4ef633e6f5?w=800',
    ],
    description: "Nouveau club de padel sur La Marsa avec un shop Pro intégré. Ambience très conviviale.",
    amenities: ['Parking', 'Douches', 'Shop', 'Terrasse'],
    openTime: '07:00',
    closeTime: '22:00',
    ownerId: 'owner2',
    isVerified: true,
    distance: 12.4,
    latitude: 36.8789,
    longitude: 10.3168,
  }
];

export const generateTimeSlots = (date) => {
  const slots = [];
  let currentHour = 16;
  const endHour = 23;
  
  while (currentHour <= endHour) {
    const isAvailable = Math.random() > 0.3;
    slots.push({
      id: `${currentHour}:00`,
      time: `${currentHour}:00`,
      isAvailable,
      price: currentHour >= 18 ? 120 : 90 
    });
    
    if (currentHour !== endHour) {
      const isHalfAvailable = Math.random() > 0.4;
      slots.push({
        id: `${currentHour}:30`,
        time: `${currentHour}:30`,
        isAvailable: isHalfAvailable,
        price: currentHour >= 18 ? 120 : 90
      });
    }
    currentHour++;
  }
  
  return slots;
};
