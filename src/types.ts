export interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  image_url: string;
  capacity: number;
  type: 'Standard' | 'Deluxe' | 'Suite';
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
}
