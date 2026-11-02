import { Hotel, Room, Coupon, FoodItem } from '../types/hotel.js';

export interface CityMeta {
  name: string;
  state: string;
  tagline: string;
  category: 'Luxury Heritage' | 'Mountain Retreat' | 'Coastal Villa' | 'Wellness Sanctuary' | 'Business Prime';
  region: 'North' | 'South' | 'West' | 'East' | 'Central';
  basePrice: number;
  heroImage: string;
  description: string;
}

export const CITIES_CATALOG: CityMeta[] = [
  // 1-7 Rajasthan & Royal Heritage
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Royal Haveli Courts and Forts',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 28000,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'Regal Rajputana grandeur, sandstone facades, private pool villas, and peacock courtyards.'
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'The Floating City of Marble Palaces and Lakes',
    category: 'Luxury Heritage',
    region: 'West',
    basePrice: 32000,
    heroImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    description: 'Peerless romantic sunsets over Lake Pichola, royal boat arrivals, and illuminated marble pavilions.'
  },
  {
    name: 'Jodhpur',
    state: 'Rajasthan',
    tagline: 'The Sun City Guarded by Mehrangarh Fort',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 24000,
    heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden sandstone palaces, blue-hued courtyards, rooftop fort views, and Marwar hospitality.'
  },
  {
    name: 'Jaisalmer',
    state: 'Rajasthan',
    tagline: 'The Golden City Rising from the Thar Desert',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 22000,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Opulent desert camps, carved stone havelis, star-gazing decks, and dunes sunset safaris.'
  },
  {
    name: 'Bikaner',
    state: 'Rajasthan',
    tagline: 'Oasis of Red Sandstone Palaces and Camel Trails',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 19500,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Intricately latticed jharokhas, royal courtyards, and tranquil desert palace gardens.'
  },
  {
    name: 'Pushkar',
    state: 'Rajasthan',
    tagline: 'Sacred Lake Ghats and Desert Glamping',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 18000,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Peaceful lake shores, desert luxury tents, Rose valley breezes, and heritage retreats.'
  },
  {
    name: 'Ranthambore',
    state: 'Rajasthan',
    tagline: 'Royal Wilderness and Tiger Safari Sanctuaries',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 26000,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury bush tents with private plunge pools overlooking pristine teak forests and ancient fort ruins.'
  },

  // 8-13 Historical & Sacred Heritage
  {
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'City of the Taj Mahal and Mughal Elegance',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 25000,
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct views of the Taj Mahal, Mughal fountains, terraced gardens, and artisanal royal dining.'
  },
  {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'Eternal River City of Sacred Ghats and Silk',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 21000,
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'Heritage riverside havelis on the Ganges, dawn boat ceremonies, and private sitar soirees.'
  },
  {
    name: 'Khajuraho',
    state: 'Madhya Pradesh',
    tagline: 'UNESCO Monumental Temples and Palatial Retreats',
    category: 'Luxury Heritage',
    region: 'Central',
    basePrice: 17500,
    heroImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    description: 'Architectural wonder surrounded by tranquil gardens, stone carvings, and Ayurvedic spas.'
  },
  {
    name: 'Amritsar',
    state: 'Punjab',
    tagline: 'Sanctuary of the Golden Temple and Punjabi Hospitality',
    category: 'Luxury Heritage',
    region: 'North',
    basePrice: 19000,
    heroImage: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80',
    description: 'Courtyard estates, warm hospitality, Amritsari culinary feasts, and peaceful gardens.'
  },
  {
    name: 'Mysore',
    state: 'Karnataka',
    tagline: 'The Palace City of Sandalwood and Silk',
    category: 'Luxury Heritage',
    region: 'South',
    basePrice: 20000,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Wodeyar dynasty royal architecture, illuminated palace gardens, and sandalwood wellness spas.'
  },
  {
    name: 'Hampi',
    state: 'Karnataka',
    tagline: 'UNESCO Stone Boulders and Vijayanagara Ruins',
    category: 'Luxury Heritage',
    region: 'South',
    basePrice: 24000,
    heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    description: 'Palatial stone archways, Tungabhadra river sunsets, private plunge pool suites, and ancient boulder vistas.'
  },

  // 14-23 Himalayas & Mountain Retreats
  {
    name: 'Shimla',
    state: 'Himachal Pradesh',
    tagline: 'Colonial Hill Haven in Virgin Cedar Forests',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 24000,
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    description: 'Himalayan snow peaks, roaring in-suite fireplaces, heated whirlpools, and pine forest trails.'
  },
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Alpine Valley Chalets by Rushing Mountain Torrents',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 21500,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Beas river log cabins, apple orchard villas, panoramic snow views, and Scandinavian spas.'
  },
  {
    name: 'Dharamshala',
    state: 'Himachal Pradesh',
    tagline: 'Tibetan Serenity Beneath the Dhauladhar Range',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 19000,
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'Cedar-fringed valley sanctuaries, singing bowl meditation, and dramatic granite mountain walls.'
  },
  {
    name: 'Mussoorie',
    state: 'Uttarakhand',
    tagline: 'Queen of the Hills with Doon Valley Sunsets',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 23000,
    heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Vintage colonial estates, winter-line sunset balconies, and oak tree canopy walkways.'
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tagline: 'Yoga Capital of the World along the Emerald Ganges',
    category: 'Wellness Sanctuary',
    region: 'North',
    basePrice: 27000,
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury holistic wellness sanctuaries, Himalayan hydrotherapy, sound healing, and riverside private dining.'
  },
  {
    name: 'Nainital',
    state: 'Uttarakhand',
    tagline: 'Emerald Lake Haven Encircled by Seven Peaks',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 18500,
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Private lake-facing balconies, yacht club traditions, and cozy attic fireplace suites.'
  },
  {
    name: 'Darjeeling',
    state: 'West Bengal',
    tagline: 'Queen of the Hills Overlooking Mount Kanchenjunga',
    category: 'Mountain Retreat',
    region: 'East',
    basePrice: 22500,
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    description: 'First-flush tea plantation manors, mist-shrouded valleys, and morning Kanchenjunga sunrise decks.'
  },
  {
    name: 'Gangtok',
    state: 'Sikkim',
    tagline: 'Monastic Tranquility and Eastern Himalayan Vistas',
    category: 'Mountain Retreat',
    region: 'East',
    basePrice: 21000,
    heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: 'Sikkimese teak suites, prayer flag terraces, organic farm-to-table dining, and mountain mist.'
  },
  {
    name: 'Shillong',
    state: 'Meghalaya',
    tagline: 'Scotland of the East with Pine Forests and Waterfalls',
    category: 'Mountain Retreat',
    region: 'East',
    basePrice: 19500,
    heroImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description: 'Rolling green pine hills, glasshouse lodges, living root bridges proximity, and cool mountain breezes.'
  },
  {
    name: 'Srinagar',
    state: 'Jammu & Kashmir',
    tagline: 'Dal Lake Royal Houseboats and Mughal Flower Terraces',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 29000,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: 'Handcrafted walnut wood houseboats, floating shikara markets, Chinar tree lawns, and snow-capped peaks.'
  },
  {
    name: 'Leh-Ladakh',
    state: 'Ladakh',
    tagline: 'High-Altitude Starlight Eco-Luxury & Moonscapes',
    category: 'Mountain Retreat',
    region: 'North',
    basePrice: 31000,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-luxury glamping domes, oxygen-enriched suites, stargazing telescopes, and monastery views.'
  },

  // 24-28 Southern Hills & Coffee Estates
  {
    name: 'Ooty',
    state: 'Tamil Nadu',
    tagline: 'The Blue Nilgiri Hills and Colonial Tea Estates',
    category: 'Mountain Retreat',
    region: 'South',
    basePrice: 20000,
    heroImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    description: 'Eucalyptus-scented air, vintage English country estates, botanical gardens, and toy train views.'
  },
  {
    name: 'Kodaikanal',
    state: 'Tamil Nadu',
    tagline: 'Princess of Hill Stations Framed by Misty Lakes',
    category: 'Mountain Retreat',
    region: 'South',
    basePrice: 19000,
    heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Star-shaped lake vistas, Kurinji flower hills, pine forest cottages, and glass skywalks.'
  },
  {
    name: 'Coorg',
    state: 'Karnataka',
    tagline: 'Verdant Coffee Plantations and Kodava Heritage',
    category: 'Wellness Sanctuary',
    region: 'South',
    basePrice: 23000,
    heroImage: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=1200&q=80',
    description: 'Private plunge pool villas in 300-acre working coffee estates, Vaidyasala Ayurveda, and birdsong.'
  },
  {
    name: 'Wayanad',
    state: 'Kerala',
    tagline: 'Rainforest Treehouses and Western Ghats Mist',
    category: 'Wellness Sanctuary',
    region: 'South',
    basePrice: 21000,
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Canopy treehouses, organic spice trails, infinity pool cliffs overlooking mist-draped waterfalls.'
  },
  {
    name: 'Munnar',
    state: 'Kerala',
    tagline: 'Rolling Emerald Tea Carpets and Anamudi Peak',
    category: 'Mountain Retreat',
    region: 'South',
    basePrice: 22000,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Tea planter chalets, cool mountain breezes, private garden terraces, and cascading streams.'
  },

  // 29-35 Coastal, Beaches & Backwaters
  {
    name: 'Goa',
    state: 'Goa',
    tagline: 'Pristine Coastal Sanctuaries & Portuguese Villas',
    category: 'Coastal Villa',
    region: 'West',
    basePrice: 21000,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'Private white-sand beaches, infinity edge paddy pools, bespoke seafood masterclasses, and sunset decks.'
  },
  {
    name: 'Kochi',
    state: 'Kerala',
    tagline: 'Spice Coast Heritage and Art Biennial Mansions',
    category: 'Coastal Villa',
    region: 'South',
    basePrice: 20500,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Fort Kochi Dutch colonial villas, Chinese fishing nets sunset views, and Ayurvedic rejuvenation.'
  },
  {
    name: 'Alleppey',
    state: 'Kerala',
    tagline: 'Venice of the East with Luxury Houseboat Lagoons',
    category: 'Coastal Villa',
    region: 'South',
    basePrice: 24500,
    heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: 'Private backwater houseboats with personal chefs, coconut grove lagoon villas, and serene canals.'
  },
  {
    name: 'Kovalam',
    state: 'Kerala',
    tagline: 'Crescent Beaches and Clifftop Luxury Resorts',
    category: 'Coastal Villa',
    region: 'South',
    basePrice: 22000,
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic rocky promontories, Arabian Sea infinity pools, and authentic Panchakarma wellness centers.'
  },
  {
    name: 'Pondicherry',
    state: 'Puducherry',
    tagline: 'French Riviera Chic on the Coromandel Coast',
    category: 'Coastal Villa',
    region: 'South',
    basePrice: 19500,
    heroImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    description: 'Colonial bougainvillea courtyards, French Quarter bakeries, Promenade sea breezes, and Auroville peace.'
  },
  {
    name: 'Gokarna',
    state: 'Karnataka',
    tagline: 'Untamed Cliff Beaches and Secluded Coastal Havens',
    category: 'Coastal Villa',
    region: 'South',
    basePrice: 18000,
    heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    description: 'Om Beach clifftop eco-luxury villas, pristine coastline walks, and Ayurvedic yoga shalas.'
  },
  {
    name: 'Mahabalipuram',
    state: 'Tamil Nadu',
    tagline: 'UNESCO Shore Temples and Bay of Bengal Resorts',
    category: 'Coastal Villa',
    region: 'South',
    basePrice: 20000,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: 'Ancient shore temple views, sea-facing plunge pool cottages, sculpture gardens, and fresh lobster dining.'
  },

  // 36-40 Cosmopolitan Urban & Business Luxury
  {
    name: 'New Delhi',
    state: 'Delhi NCR',
    tagline: 'Imperial Lutyens Grandeur and Diplomatic Luxury',
    category: 'Business Prime',
    region: 'North',
    basePrice: 25000,
    heroImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    description: 'Lutyens boulevard mansions, Michelin-starred fine dining, presidential suites, and rooftop infinity pools.'
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Maximum City with Marine Drive and Harbor Icons',
    category: 'Business Prime',
    region: 'West',
    basePrice: 29000,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: 'Arabian Sea waterfront palaces, high-floor skyline penthouses, celebrity ateliers, and luxury yacht charters.'
  },
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'The Garden City of High Tech and Contemporary Chic',
    category: 'Business Prime',
    region: 'South',
    basePrice: 21000,
    heroImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description: 'Urban luxury retreats surrounded by tropical palm gardens, rooftop craft lounges, and smart suites.'
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls and Nizam Palatial Splendour',
    category: 'Luxury Heritage',
    region: 'South',
    basePrice: 24000,
    heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    description: 'Hilltop palaces overlooking the city, 101-seat dining rooms, Belgian crystal chandeliers, and royal carriages.'
  },
  {
    name: 'Kolkata',
    state: 'West Bengal',
    tagline: 'The City of Joy and Grand Colonial Heritage',
    category: 'Luxury Heritage',
    region: 'East',
    basePrice: 19500,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Victorian architectural masterpieces, Hooghly river views, aristocratic tea salons, and art collections.'
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Coromandel Cultural Heart and Coastal High-Rises',
    category: 'Business Prime',
    region: 'South',
    basePrice: 18500,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Marina beach views, contemporary luxury spas, Chettinad culinary ateliers, and serene seaside pools.'
  }
];

// Room archetype templates tailored to hotel category
export interface RoomArchetype {
  roomType: string;
  name: string;
  description: string;
  capacityAdults: number;
  capacityChildren: number;
  priceMultiplier: number;
  sizeSqFt: number;
  bedType: string;
  amenities: string[];
  image: string;
}

export const ROOM_ARCHETYPES_BY_CATEGORY: Record<string, RoomArchetype[]> = {
  'Luxury Heritage': [
    {
      roomType: 'Deluxe Heritage Room',
      name: 'Deluxe Heritage Courtyard Room',
      description: 'Hand-carved sandstone details, custom royal textiles, and serene views of the central palace fountains.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.0,
      sizeSqFt: 460,
      bedType: 'King Bed',
      amenities: ['Courtyard View', 'Italian Marble Bath', 'Heritage Jharokha Seating', 'High-Speed Wi-Fi', '24/7 Butler Call'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Royal Garden Chamber',
      name: 'Royal Chamber with Private Garden Verandah',
      description: 'Opens directly onto private manicured Mughal lawns with jasmine arches and outdoor daybeds.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.15,
      sizeSqFt: 550,
      bedType: 'Four-Poster Canopy Bed',
      amenities: ['Private Garden Verandah', 'Sunken Marble Bathtub', 'High-Speed Wi-Fi', 'Artisanal Tea Atelier'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Jharokha Palace Suite',
      name: 'Jharokha Balcony Palace Suite',
      description: 'Features a traditional arched jharokha balcony overlooking the palace reflection pool and illuminated courtyards.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.35,
      sizeSqFt: 680,
      bedType: 'King Bed',
      amenities: ['Jharokha Balcony', 'Clawfoot Copper Tub', 'Complimentary High Tea', 'Personal Butler Service'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Haveli Courtyard Suite',
      name: 'Rajputana Haveli Courtyard Suite',
      description: 'Spacious living salon with historic frescoes, antique brass artifacts, and an open sky private patio.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.5,
      sizeSqFt: 820,
      bedType: 'Emperor Bed',
      amenities: ['Private Patio', 'Separate Living Salon', 'Rainforest Shower', 'Nespresso Coffee Bar', 'Walk-in Wardrobe'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Diwan-i-Khas Suite',
      name: 'Diwan-i-Khas Executive Palace Suite',
      description: 'Modeled after the emperor’s private council chambers, featuring teak paneling, silk rugs, and butler service.',
      capacityAdults: 3,
      capacityChildren: 2,
      priceMultiplier: 1.7,
      sizeSqFt: 960,
      bedType: 'Four-Poster Canopy Bed',
      amenities: ['Executive Dining Table', 'Dual Marble Vanities', 'Complimentary Champagne', '24/7 Dedicated Butler'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Rajputana Balcony Room',
      name: 'Rajputana Fort View Balcony Room',
      description: 'Elevated terrace room providing sweeping panoramas of historic fort bastions and evening sunset glows.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.25,
      sizeSqFt: 520,
      bedType: 'King Bed',
      amenities: ['Fort Panorama', 'Private Terrace', 'Complimentary Minibar', 'Aromatherapy Bath Salts'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Sheesh Mahal Mirror Suite',
      name: 'Sheesh Mahal Handcrafted Mirror Suite',
      description: 'Exquisite Belgian convex mirror inlay work on vaulted ceilings, reminiscent of ancient royal fort pavilions.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.85,
      sizeSqFt: 1050,
      bedType: 'King Bed',
      amenities: ['Mirror Inlay Ceiling', 'Jetted Jacuzzi Tub', 'Private Butler Service', 'Royal Turndown Ritual'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Maharaja Grand Suite',
      name: 'Maharaja Grand Royal Suite',
      description: 'Palatial master bedroom, private dining salon, gold leaf detailing, and 180-degree courtyard views.',
      capacityAdults: 3,
      capacityChildren: 2,
      priceMultiplier: 2.1,
      sizeSqFt: 1350,
      bedType: 'Emperor Bed',
      amenities: ['Grand Living Salon', 'Private Dining Table', 'Limousine Airport Transfer', 'Royal Spa Access'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Maharani Terrace Suite',
      name: 'Maharani Rooftop Pavilion Suite',
      description: 'A secluded rooftop sanctuary with private star-gazing gazebo, silk bolsters, and outdoor copper bathtub.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 2.3,
      sizeSqFt: 1200,
      bedType: 'Four-Poster Canopy Bed',
      amenities: ['Rooftop Gazebo', 'Outdoor Copper Tub', 'Sunset Cocktails Included', 'Private Butler'],
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Royal Pavilion Villa with Plunge Pool',
      name: 'Royal Heritage Villa with Temperature-Controlled Pool',
      description: 'Standalone private walled villa with its own private heated plunge pool, sun loungers, and personal butler service.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 2.8,
      sizeSqFt: 1650,
      bedType: 'Emperor Bed',
      amenities: ['Private Heated Plunge Pool', 'Walled Garden Sanctuary', 'In-Villa Dining Pavilion', 'Personal Butler'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Amber Fort View Penthouse',
      name: 'Amber Fort View Royal Penthouse',
      description: 'Top-tier duplex penthouse featuring double-height ceiling, private elevator, and panoramic monument vistas.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 3.2,
      sizeSqFt: 1950,
      bedType: 'Emperor Bed',
      amenities: ['Private Penthouse Elevator', 'Wrap-around Balcony', 'Grand Piano Salon', 'Dedicated Concierge & Butler'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Kohinoor Presidential Palace Suite',
      name: 'Kohinoor Presidential Masterpiece Suite',
      description: 'The pinnacle of regal Indian luxury: two master bedrooms, private wellness spa room, butler pantry, and security annex.',
      capacityAdults: 4,
      capacityChildren: 3,
      priceMultiplier: 3.8,
      sizeSqFt: 2500,
      bedType: 'Emperor Bed',
      amenities: ['In-Suite Private Spa', 'Butler Pantry & Chef Kitchen', 'Bulletproof Glass Glazing', 'Unrestricted Luxury Privileges'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    }
  ],

  'Mountain Retreat': [
    {
      roomType: 'Pine Valley Deluxe Room',
      name: 'Pine Valley Cedar Balcony Room',
      description: 'Fragrant deodar wood flooring, floor-to-ceiling windows looking out to misty pine forests and valley depths.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.0,
      sizeSqFt: 450,
      bedType: 'King Bed',
      amenities: ['Cedar Balcony', 'Heated Bathroom Floors', 'Valley View', 'Down Comforter', 'High-Speed Wi-Fi'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Cedar Wood Balcony Room',
      name: 'Himalayan Cedar Wood Balcony Room',
      description: 'Private balcony framing panoramic snow peaks, plush wool throws, and an artisanal French press coffee bar.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.15,
      sizeSqFt: 520,
      bedType: 'King Bed',
      amenities: ['Snow Peak Balcony', 'Artisanal Coffee Bar', 'Heated Duvets', 'Deep Soaking Tub'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Himalayan Vista Suite',
      name: 'Himalayan Panoramic Vista Suite',
      description: 'Corner suite with dual aspect windows framing 180-degree mountain ranges and morning sunrise glows.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.35,
      sizeSqFt: 680,
      bedType: 'King Bed',
      amenities: ['Dual Aspect Panorama', 'Jetted Hydrotherapy Tub', 'Telescope Stargazing Set', 'Fireplace'],
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Alpine Log Cabin with Fireplace',
      name: 'Alpine Timber Log Cabin with Stone Fireplace',
      description: 'Handcrafted pinewood logs, working cast-iron wood fireplace, and private heated outdoor jacuzzi deck.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.6,
      sizeSqFt: 840,
      bedType: 'Emperor Bed',
      amenities: ['Wood Burning Fireplace', 'Heated Jacuzzi Deck', 'Timber Log Architecture', 'Personal Butler'],
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Mist Valley Executive Suite',
      name: 'Mist Valley Luxury Executive Suite',
      description: 'Expansive living salon with bay windows, custom walnut furniture, and complimentary fireside hot toddies.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.45,
      sizeSqFt: 780,
      bedType: 'King Bed',
      amenities: ['Bay Window Lounges', 'Stone Fireplace', 'Complimentary Evening Toddy', 'Mountain Trek Butler'],
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Snow Peak Panoramic Chalet',
      name: 'Snow Peak Grand Panoramic Chalet',
      description: 'Duplex chalet with loft sleeping quarters, glass skylights for star-gazing, and private heated whirlpool.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 1.9,
      sizeSqFt: 1100,
      bedType: 'Emperor Bed',
      amenities: ['Duplex Loft Design', 'Stargazing Glass Skylight', 'Private Heated Whirlpool', 'Ski/Trek Equipment Locker'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Attic Skylight Romantic Suite',
      name: 'Romantic Attic Skylight Suite',
      description: 'Vaulted timber ceiling with motorized glass roof hatches, plush cashmere blankets, and freestanding copper bath.',
      capacityAdults: 2,
      capacityChildren: 0,
      priceMultiplier: 1.5,
      sizeSqFt: 620,
      bedType: 'King Bed',
      amenities: ['Motorized Glass Skylight', 'Freestanding Copper Tub', 'Champagne Breakfast Included', 'Valley Balcony'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Deodar Forest View Villa',
      name: 'Deodar Forest View Luxury Villa',
      description: 'Private detached villa nestled in dense pine woods with private wraparound balcony and outdoor barbecue.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 2.2,
      sizeSqFt: 1350,
      bedType: 'Emperor Bed',
      amenities: ['Detached Forest Villa', 'Outdoor Barbecue & Fire Pit', 'In-Villa Dining', 'Personal Butler Service'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'High Altitude Duplex Loft',
      name: 'High Altitude Alpine Duplex Loft',
      description: 'Two-story architectural loft with dramatic double-height glass framing snow-clad Himalayan mountain peaks.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 2.4,
      sizeSqFt: 1450,
      bedType: 'King Bed',
      amenities: ['Double-Height Glass Wall', 'Spiral Wooden Staircase', 'Dual Bathrooms', 'Heated Stone Floors'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Mountain Stream Cottage',
      name: 'Rushing Mountain Stream Cottage',
      description: 'Perched over a crystalline Himalayan mountain stream, providing soothing ambient water sounds and private deck.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.75,
      sizeSqFt: 880,
      bedType: 'King Bed',
      amenities: ['Over-Stream Balcony', 'Ambient River Sounds', 'Outdoor Stone Fireplace', 'Fly Fishing Gear'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Presidential Glacier Chalet',
      name: 'Presidential Glacier Grand Chalet',
      description: 'Three bedrooms, Finnish sauna, temperature-regulated heated outdoor plunge pool, and dedicated private chef.',
      capacityAdults: 6,
      capacityChildren: 3,
      priceMultiplier: 3.3,
      sizeSqFt: 2200,
      bedType: 'Emperor Bed',
      amenities: ['Private Finnish Sauna', 'Heated Outdoor Plunge Pool', 'Dedicated Private Chef', 'Chauffeur 4x4 SUV'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Heated Whirlpool Terrace Haven',
      name: 'Heated Whirlpool Terrace Haven',
      description: 'Features a sunken outdoor whirlpool tub on an infinity edge terrace overlooking deep pine-clad valleys.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 2.1,
      sizeSqFt: 980,
      bedType: 'King Bed',
      amenities: ['Outdoor Sunken Whirlpool', 'Panoramic Infinity Terrace', 'Fire Table', 'Butler Beverage Service'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'
    }
  ],

  'Coastal Villa': [
    {
      roomType: 'Coral Breeze Studio',
      name: 'Coral Breeze Ocean Studio',
      description: 'White linen curtains, teak wood louvers, and sea salt breezes with direct garden access to the sand.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.0,
      sizeSqFt: 460,
      bedType: 'King Bed',
      amenities: ['Sea Breeze Verandah', 'Outdoor Rain Shower', 'High-Speed Wi-Fi', 'Complimentary Beach Bag & Hats'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Deluxe Sea View Balcony Room',
      name: 'Deluxe Sea View Balcony Room',
      description: 'Elevated room with uninterrupted panoramic vistas of turquoise ocean waves and gentle swaying palms.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.15,
      sizeSqFt: 530,
      bedType: 'King Bed',
      amenities: ['Panoramic Ocean View', 'Balcony Daybed', 'Terrazzo Soaking Tub', 'Espresso Machine'],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Oceanfront Cabana Suite',
      name: 'Oceanfront Sunset Cabana Suite',
      description: 'Steps from the shoreline with a private timber deck, thatched roof cabana, and sunset cocktail service.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.35,
      sizeSqFt: 720,
      bedType: 'King Bed',
      amenities: ['Private Beach Cabana', 'Direct Shoreline Access', 'Outdoor Bathtub', 'Sunset Canapés Included'],
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Palm Grove Garden Villa',
      name: 'Palm Grove Walled Garden Villa',
      description: 'A secluded sanctuary sheltered by towering coconut palms, private sun deck, and tropical outdoor rain shower.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.45,
      sizeSqFt: 840,
      bedType: 'Emperor Bed',
      amenities: ['Private Palm Garden', 'Open-Air Tropical Shower', 'Hammock & Sun Loungers', 'Personal Butler'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Azure Coast Executive Room',
      name: 'Azure Coast Executive Ocean Room',
      description: 'Contemporary coastal aesthetic, bleached oak flooring, ocean-facing jacuzzi tub, and curated art.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.25,
      sizeSqFt: 600,
      bedType: 'King Bed',
      amenities: ['Ocean Facing Jacuzzi', 'Curated Coastal Art', 'Bose Sound System', 'Evening Turndown'],
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Sunset Beachfront Pavilion',
      name: 'Sunset Beachfront Grand Pavilion',
      description: 'Wraparound glass walls that fold away completely, blending indoor luxury with golden ocean sands.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.8,
      sizeSqFt: 1020,
      bedType: 'Four-Poster Canopy Bed',
      amenities: ['Fold-Away Glass Walls', 'Private Beachfront Deck', 'Wine Chiller', '24/7 Butler Service'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Private Plunge Pool Coral Villa',
      name: 'Private Plunge Pool Coral Sea Villa',
      description: 'Exclusive beachfront villa featuring a private turquoise plunge pool, sun terrace, and dedicated butler.',
      capacityAdults: 3,
      capacityChildren: 2,
      priceMultiplier: 2.3,
      sizeSqFt: 1250,
      bedType: 'Emperor Bed',
      amenities: ['Private Plunge Pool', 'Beachfront Sun Terrace', 'Sunken Living Lounge', 'Dedicated Butler'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Lagoon Overwater Suite',
      name: 'Lagoon Overwater Stilt Suite',
      description: 'Suspended over gentle lagoon waters with glass floor viewing panels to observe marine life below.',
      capacityAdults: 2,
      capacityChildren: 0,
      priceMultiplier: 2.5,
      sizeSqFt: 1100,
      bedType: 'King Bed',
      amenities: ['Glass Floor Viewing Panel', 'Overwater Hammock Net', 'Private Lagoon Ladder', 'Champagne on Arrival'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Coconut Palms Family Bungalow',
      name: 'Coconut Palms Two-Bedroom Family Bungalow',
      description: 'Two en-suite bedrooms, spacious living salon, private garden dining table, and kids beach toy kit.',
      capacityAdults: 4,
      capacityChildren: 3,
      priceMultiplier: 2.1,
      sizeSqFt: 1400,
      bedType: 'Two King Beds',
      amenities: ['Two Master Bedrooms', 'Private Garden Dining', 'Kids Beach Amenities', 'Family Butler Service'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Royal Ocean Penthouse',
      name: 'Royal Ocean Horizon Penthouse',
      description: 'Top-floor penthouse boasting 270-degree ocean views, private rooftop infinity pool, and personal chef.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 3.1,
      sizeSqFt: 1850,
      bedType: 'Emperor Bed',
      amenities: ['Rooftop Infinity Pool', '270-Degree Ocean Vista', 'Personal Private Chef', 'Luxury Yacht Access'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Tropical Horizon Villa',
      name: 'Tropical Horizon Beach Villa',
      description: 'Sprawling villa flanked by frangipani blossoms, private massage pavilion, and direct private beach gate.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 2.7,
      sizeSqFt: 1550,
      bedType: 'Emperor Bed',
      amenities: ['Private Massage Pavilion', 'Private Beach Gate', 'Outdoor Bathtub in Lotus Pond', 'Personal Butler'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Coastal Sand Dune Sanctuary',
      name: 'Coastal Dune Grand Presidential Haven',
      description: 'Ultra-private standalone estate with private swimming pool, private cinema lounge, and personal staff quarters.',
      capacityAdults: 6,
      capacityChildren: 3,
      priceMultiplier: 3.6,
      sizeSqFt: 2400,
      bedType: 'Emperor Bed',
      amenities: ['Full Sized Private Pool', 'Private Cinema Lounge', 'Staff Quarters & Chef', 'VIP Airport Limousine'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    }
  ],

  'Wellness Sanctuary': [
    {
      roomType: 'Zen Garden Studio',
      name: 'Zen Garden Bamboo Studio',
      description: 'Minimalist Japanese-inspired lines, organic unbleached linens, and views of tranquil bamboo stone gardens.',
      capacityAdults: 2,
      capacityChildren: 0,
      priceMultiplier: 1.0,
      sizeSqFt: 440,
      bedType: 'King Bed',
      amenities: ['Zen Bamboo Garden', 'Herbal Aromatherapy Diffuser', 'Singing Bowl & Yoga Mat', 'Organic Herbal Tea Bar'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Sattva Herbal Deluxe Room',
      name: 'Sattva Herbal Sanctuary Room',
      description: 'Infused with calming therapeutic herbs, natural earth-toned plaster, and forest canopy views.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.15,
      sizeSqFt: 510,
      bedType: 'King Bed',
      amenities: ['Forest Canopy View', 'Therapeutic Herb Amenities', 'Herbal Steam Shower', 'High-Speed Wi-Fi'],
      image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Ayurvedic Healing Suite',
      name: 'Ayurvedic Healing Suite with Treatment Patio',
      description: 'Features a dedicated private massage patio for in-suite Abhyanga and Shirodhara Ayurvedic treatments.',
      capacityAdults: 2,
      capacityChildren: 0,
      priceMultiplier: 1.4,
      sizeSqFt: 720,
      bedType: 'King Bed',
      amenities: ['Private Ayurvedic Treatment Patio', 'Copper Soaking Tub', 'Daily Doctor Consultation', 'Dosha-Tailored Menu'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Lotus Pond Pavilion Room',
      name: 'Lotus Pond Water Pavilion Room',
      description: 'Suspended over blooming lotus waters with private meditation deck, Koi fish feeding, and morning yoga.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.3,
      sizeSqFt: 620,
      bedType: 'King Bed',
      amenities: ['Over-Pond Meditation Deck', 'Koi Fish Pond Vistas', 'Complimentary Sound Bath', 'Organic Linen Bedding'],
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Prana Vitality Balcony Suite',
      name: 'Prana Vitality Forest Balcony Suite',
      description: 'High in the tree canopy with fresh mountain oxygen, private outdoor daybed, and infrared sauna.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.55,
      sizeSqFt: 800,
      bedType: 'King Bed',
      amenities: ['In-Suite Infrared Sauna', 'Canopy Daybed', 'Cold Pressed Juice Bar', 'Personal Wellness Guide'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Forest Bathing Treehouse Chalet',
      name: 'Forest Bathing Canopy Treehouse Chalet',
      description: 'Built high on sturdy teak trees with wrap-around glass, 360-degree rainforest views, and private plunge pool.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.85,
      sizeSqFt: 950,
      bedType: 'King Bed',
      amenities: ['Canopy Treehouse Architecture', 'Private Forest Plunge Pool', 'Outdoor Cedar Tub', 'Nature Trek Guide'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Chakra Harmony Sanctuary',
      name: 'Chakra Harmony Executive Suite',
      description: 'Designed around harmonic frequencies with crystal bowl acoustics, color therapy lighting, and organic teas.',
      capacityAdults: 2,
      capacityChildren: 0,
      priceMultiplier: 1.65,
      sizeSqFt: 850,
      bedType: 'Emperor Bed',
      amenities: ['Color Therapy Mood Lighting', 'Crystal Acoustic Bowls', 'Stone Steam Room', 'Holistic Chef Catering'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Organic Plantation Cottage',
      name: 'Organic Tea & Spice Plantation Cottage',
      description: 'Stone cottage nestled inside fragrant coffee and cardamom groves with a private fireplace and herb garden.',
      capacityAdults: 3,
      capacityChildren: 2,
      priceMultiplier: 1.75,
      sizeSqFt: 1100,
      bedType: 'King Bed',
      amenities: ['Private Herb Garden', 'Wood Fireplace', 'Private Verandah', 'Plantation Jeep Tour'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Hot Spring Jacuzzi Villa',
      name: 'Mineral Hot Spring Jacuzzi Villa',
      description: 'Features natural mineral hot spring water piped directly into a sunken outdoor volcanic stone jacuzzi.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 2.2,
      sizeSqFt: 1250,
      bedType: 'Emperor Bed',
      amenities: ['Natural Mineral Hot Jacuzzi', 'Volcanic Stone Architecture', 'Private Yoga Lawn', 'Personal Butler'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Shanti Yoga Wellness Suite',
      name: 'Shanti Master Yoga & Meditation Suite',
      description: 'Spacious hardwood floor salon with aerial yoga hammocks, Tibetan singing bowls, and sunrise mountain terrace.',
      capacityAdults: 2,
      capacityChildren: 0,
      priceMultiplier: 1.9,
      sizeSqFt: 1050,
      bedType: 'King Bed',
      amenities: ['Aerial Yoga Hammocks', 'Sunrise Meditation Terrace', 'Daily Private Guru Session', 'Ayurvedic Herb Bath'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Bamboo Forest Eco-Pavilion',
      name: 'Bamboo Forest Grand Eco-Pavilion',
      description: 'Biophilic open-air design using sustainable local materials, solar heating, and private rain-fed plunge pool.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 2.5,
      sizeSqFt: 1500,
      bedType: 'Emperor Bed',
      amenities: ['Rain-Fed Plunge Pool', 'Biophilic Open Architecture', 'Organic Farm Dining', 'Personal Butler'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Nirvana Presidential Sanctuary',
      name: 'Nirvana Presidential Healing Estate',
      description: 'A completely private wellness compound with private thermal pool, private yoga shala, and personal Ayurvedic doctor.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 3.4,
      sizeSqFt: 2200,
      bedType: 'Emperor Bed',
      amenities: ['Private Thermal Pool', 'Dedicated Yoga Shala', 'Private Ayurvedic Doctor', 'VIP Chauffeur Transfer'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    }
  ],

  'Business Prime': [
    {
      roomType: 'Executive Deluxe King Room',
      name: 'Executive Deluxe King City View Room',
      description: 'High-floor urban comfort with ergonomic workspace, high-speed fiber internet, and panoramic skyline vistas.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.0,
      sizeSqFt: 460,
      bedType: 'King Bed',
      amenities: ['Ergonomic Herman Miller Desk', 'Fiber Wi-Fi', 'Marble Rain Shower', 'Nespresso Coffee Station'],
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Smart Tech Superior Room',
      name: 'Smart Tech Superior Room',
      description: 'Voice-controlled lighting, motorized blackout curtains, wireless charging pads, and sleek modern aesthetic.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.15,
      sizeSqFt: 520,
      bedType: 'King Bed',
      amenities: ['Voice & Tablet Room Automation', 'Motorized Blackout Shades', 'Smart Mirror Display', 'High-Speed Wi-Fi'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Skyline Grand City View Room',
      name: 'Skyline Grand City View Corner Room',
      description: 'Wrap-around corner glass walls overlooking metropolitan glittering night lights and bustling cityscapes.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.3,
      sizeSqFt: 620,
      bedType: 'King Bed',
      amenities: ['Wrap-Around Corner Glass', 'Deep Soaking Window Tub', 'Executive Club Lounge Access', 'Cocktail Hour'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Club Intercontinental Room',
      name: 'Club Intercontinental Executive Lounge Room',
      description: 'Includes private club lounge privileges, complimentary breakfast, afternoon high tea, and boardroom hours.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.45,
      sizeSqFt: 680,
      bedType: 'King Bed',
      amenities: ['Club Lounge Access', 'Complimentary High Tea & Wine', '2 Hours Boardroom Access', 'Express Ironing Service'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'High-Floor Diplomatic Suite',
      name: 'High-Floor Diplomatic Executive Suite',
      description: 'Spacious living room with guest powder room, separate executive study, and private check-in service.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.7,
      sizeSqFt: 880,
      bedType: 'Emperor Bed',
      amenities: ['Separate Executive Study', 'Guest Powder Room', 'Private VIP Check-in', 'Limousine Airport Transfer'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Metropolis Junior Suite',
      name: 'Metropolis Junior Suite with Wet Bar',
      description: 'Open-concept luxury suite with bespoke cocktail wet bar, plush leather seating, and walk-in wardrobe.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.4,
      sizeSqFt: 720,
      bedType: 'King Bed',
      amenities: ['Cocktail Wet Bar', 'Walk-In Wardrobe', 'Rainforest Shower', 'Complimentary Shoeshine'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Corporate Ambassador Suite',
      name: 'Corporate Ambassador Conference Suite',
      description: 'Integrated 6-person video conferencing table, presentation screen, and soundproof bedroom suite.',
      capacityAdults: 3,
      capacityChildren: 1,
      priceMultiplier: 1.95,
      sizeSqFt: 1100,
      bedType: 'King Bed',
      amenities: ['6-Person Video Conf Table', '4K Presentation Display', 'Soundproof Partitions', 'Dedicated Concierge'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Contemporary Urban Studio',
      name: 'Contemporary Urban Chic Studio',
      description: 'Sleek metropolitan studio designed for modern digital nomads and extended stays with kitchen unit.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.2,
      sizeSqFt: 560,
      bedType: 'King Bed',
      amenities: ['Kitchenette & Induction', 'Dual Monitor Workstation', 'High-Speed Wi-Fi', 'Complimentary Laundry'],
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Corner Glass Panoramic Suite',
      name: 'Corner Glass Panoramic Executive Suite',
      description: 'Spectacular glass corner master bedroom with freestanding tub against the glass looking over the metro skyline.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 1.8,
      sizeSqFt: 950,
      bedType: 'Emperor Bed',
      amenities: ['Skyline Bathtub', 'Curated Vinyl Collection & Player', 'Private Bar', 'Butler Service'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Presidential Skyline Penthouse',
      name: 'Presidential Skyline Grand Penthouse',
      description: 'Highest floor in the tower featuring private rooftop heated infinity pool, grand piano, and private butler.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 3.2,
      sizeSqFt: 2100,
      bedType: 'Emperor Bed',
      amenities: ['Private Rooftop Heated Pool', 'Grand Piano & Fireplace', 'Private Security Entrance', '24/7 Dedicated Butler'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Royal Diplomatic Suite',
      name: 'Royal Diplomatic Two-Bedroom Suite',
      description: 'Two expansive master bedrooms, 8-person formal dining room, chef pantry, and security annex.',
      capacityAdults: 4,
      capacityChildren: 2,
      priceMultiplier: 2.6,
      sizeSqFt: 1750,
      bedType: 'Two Emperor Beds',
      amenities: ['Two Master Suites', 'Formal 8-Person Dining', 'Chef Prep Pantry', 'Chauffeur Driven Mercedes'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    },
    {
      roomType: 'Executive Terrace Loft',
      name: 'Executive Open-Air Terrace Loft',
      description: 'Double-height urban loft with private landscaped rooftop garden and outdoor gas fire pit.',
      capacityAdults: 2,
      capacityChildren: 1,
      priceMultiplier: 2.1,
      sizeSqFt: 1200,
      bedType: 'King Bed',
      amenities: ['Private Landscaped Rooftop', 'Outdoor Gas Fire Pit', 'Double-Height Living Room', 'Private Bar Service'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
    }
  ]
};

// Hotel name prefixes & suffixes for generating realistic property names
const HOTEL_NAME_PATTERNS = [
  { prefix: 'The Grand', suffix: 'Palace & Spa' },
  { prefix: 'Taj', suffix: 'Heritage Retreat' },
  { prefix: 'The Oberoi', suffix: 'Sanctuary' },
  { prefix: 'ITC', suffix: 'Imperial Resort' },
  { prefix: 'Leela', suffix: 'Palatial Haven' },
  { prefix: 'JW', suffix: 'Luxury Residence' },
  { prefix: 'Aman', suffix: 'Wilderness Sanctuary' },
  { prefix: 'Alila', suffix: 'Estate & Villas' },
  { prefix: 'Ananda', suffix: 'Wellness Enclave' },
  { prefix: 'Evolve Back', suffix: 'Plantation Resort' },
  { prefix: 'Sujan', suffix: 'Royal Camp' },
  { prefix: 'Six Senses', suffix: 'Fort & Spa' },
  { prefix: 'St. Regis', suffix: 'Manor & Suites' },
  { prefix: 'W', suffix: 'Coast Pavilion' },
  { prefix: 'Four Seasons', suffix: 'Residences' },
  { prefix: 'Ritz-Carlton', suffix: 'Towers' },
  { prefix: 'Banyan Tree', suffix: 'Haven' },
  { prefix: 'Rosewood', suffix: 'Courtyard' },
  { prefix: 'Kempinski', suffix: 'Castle' },
  { prefix: 'Mandarin Oriental', suffix: 'Suites' },
  { prefix: 'Hyatt Regency', suffix: 'Palace' },
  { prefix: 'Park Hyatt', suffix: 'Resort & Spa' },
  { prefix: 'Conrad', suffix: 'Luxury Pavilion' },
  { prefix: 'Fairmont', suffix: 'Heritage Manor' },
  { prefix: 'Sofitel', suffix: 'Imperial Retreat' },
  { prefix: 'Raffles', suffix: 'Oasis & Villas' },
  { prefix: 'Shangri-La', suffix: 'Valley Haven' },
  { prefix: 'Langham', suffix: 'Royal Residence' },
  { prefix: 'Belmond', suffix: 'Estate' },
  { prefix: 'Bvlgari', suffix: 'Sanctuary' },
  { prefix: 'One&Only', suffix: 'Private Retreat' },
  { prefix: 'Miraval', suffix: 'Living Sanctuary' }
];

const HOTEL_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
];

/**
 * Generate full catalog of ~40 cities, ~32 hotels per city (~1,280 hotels),
 * and 12 distinct room types for each hotel (~15,360 rooms).
 */
export function generateCatalog(): { hotels: Hotel[]; rooms: Room[] } {
  const hotels: Hotel[] = [];
  const rooms: Room[] = [];

  // We explicitly keep hotel-01 ("The Oberoi Rajvilas") and room-101 intact
  // as the very first hotel in Jaipur for test consistency.
  let hotelIndex = 1;

  for (const city of CITIES_CATALOG) {
    // 32 hotels per city
    for (let h = 0; h < 32; h++) {
      const hotelId = hotelIndex === 1 ? 'hotel-01' : `hotel-${hotelIndex.toString().padStart(4, '0')}`;
      const pattern = HOTEL_NAME_PATTERNS[h % HOTEL_NAME_PATTERNS.length];

      // Custom name for the flagship hotel-01
      const hotelName = hotelIndex === 1
        ? 'The Oberoi Rajvilas'
        : `${pattern.prefix} ${city.name} ${pattern.suffix}`;

      const heroImg = HOTEL_HERO_IMAGES[(hotelIndex + h) % HOTEL_HERO_IMAGES.length];
      const startingPrice = Math.round((city.basePrice + (h * 750) - 2000) / 500) * 500;
      const rating = Number((4.7 + ((h * 7) % 30) / 100).toFixed(2));
      const reviewsCount = 120 + ((h * 37) % 450);

      const hotelAmenities = [
        'High-Speed Wi-Fi',
        '24/7 Butler Service',
        'Fine Dining Restaurant',
        'Ayurvedic Spa & Wellness',
        'Outdoor Swimming Pool',
        'Fitness Center',
        'Free Valet Parking',
        'Airport Limousine Service'
      ];

      const hotelImages = [
        heroImg,
        HOTEL_HERO_IMAGES[(hotelIndex + h + 1) % HOTEL_HERO_IMAGES.length],
        HOTEL_HERO_IMAGES[(hotelIndex + h + 2) % HOTEL_HERO_IMAGES.length],
        HOTEL_HERO_IMAGES[(hotelIndex + h + 3) % HOTEL_HERO_IMAGES.length]
      ];

      const hotelObj: Hotel = {
        id: hotelId,
        name: hotelName,
        tagline: `${city.tagline} · Luxury Living`,
        description: `Experience bespoke hospitality at ${hotelName} in ${city.name}, ${city.state}. ${city.description} Featuring world-class culinary pavilions, personalized butler attention, and exquisite suites.`,
        destination: city.name,
        city: city.name,
        state: city.state,
        country: 'India',
        address: `${10 + (h * 3)} Royal Heritage Boulevard, ${city.name}`,
        category: city.category,
        rating,
        reviewsCount,
        startingPrice,
        heroImage: heroImg,
        images: hotelImages,
        amenities: hotelAmenities,
        policies: {
          checkInTime: '14:00',
          checkOutTime: '12:00',
          cancellationPolicy: 'Free cancellation up to 48 hours prior to check-in date.',
          petFriendly: h % 4 === 0,
          smokingAllowed: false
        },
        verified: true,
        ownerId: h % 2 === 0 ? 'owner-01' : 'owner-02',
        featured: h < 3 // Top 3 per city are featured
      };

      hotels.push(hotelObj);

      // Now generate 12 types of different rooms for this hotel according to its category!
      const archetypes = ROOM_ARCHETYPES_BY_CATEGORY[city.category] || ROOM_ARCHETYPES_BY_CATEGORY['Luxury Heritage'];

      for (let r = 0; r < archetypes.length; r++) {
        const arch = archetypes[r];
        // Ensure room-101 for hotel-01 matches the test expectations
        const roomId = (hotelIndex === 1 && r === 0) ? 'room-101' : `room-${hotelId.replace('hotel-', '')}-${(101 + r)}`;
        const roomNumber = `${Math.floor(r / 4) + 1}0${(r % 4) + 1}`;
        const roomPrice = Math.round((startingPrice * arch.priceMultiplier) / 250) * 250;

        const roomObj: Room = {
          id: roomId,
          hotelId: hotelId,
          roomNumber,
          roomType: (hotelIndex === 1 && r === 0) ? 'Premier Room with Garden View' : arch.roomType,
          name: (hotelIndex === 1 && r === 0) ? 'Premier Room with Garden View' : arch.name,
          description: arch.description,
          capacityAdults: arch.capacityAdults,
          capacityChildren: arch.capacityChildren,
          pricePerNight: roomPrice,
          sizeSqFt: arch.sizeSqFt,
          bedType: arch.bedType,
          amenities: arch.amenities,
          images: [
            arch.image,
            HOTEL_HERO_IMAGES[(hotelIndex + r + 4) % HOTEL_HERO_IMAGES.length],
            HOTEL_HERO_IMAGES[(hotelIndex + r + 5) % HOTEL_HERO_IMAGES.length]
          ],
          status: 'Available'
        };

        rooms.push(roomObj);
      }

      hotelIndex++;
    }
  }

  return { hotels, rooms };
}
