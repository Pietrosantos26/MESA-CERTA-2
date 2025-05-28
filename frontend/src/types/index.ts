export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  imageUrl?: string;
  role: 'customer' | 'restaurantOwner' | 'admin';
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  coverImageUrl?: string;
  cuisine: string;
  priceRange: '€' | '€€' | '€€€' | '€€€€';
  rating: number;
  totalReviews: number;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  tables: Table[];
  features: string[];
};

export type Table = {
  id: string;
  seats: number;
  location: 'interior' | 'exterior' | 'varanda' | 'bar';
  isAvailable: boolean;
};

export type Reservation = {
  id: string;
  userId: string;
  restaurantId: string;
  tableId: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  specialRequests?: string;
};

export type Review = {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number;
  comment: string;
  date: string;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};