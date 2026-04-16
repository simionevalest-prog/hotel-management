import { Room } from './types';

export const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Royal Ocean Suite',
    type: 'Suite',
    description: 'Suite ya kifahari yenye mtazamo wa bahari, balcony binafsi na huduma zote za kisasa.',
    price_per_night: 450,
    capacity: 2,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: '2',
    name: 'Deluxe Garden Room',
    type: 'Deluxe',
    description: 'Chumba tulivu chenye mtazamo wa bustani nzuri, kimepambwa kwa mtindo wa kisasa wa Kiafrika.',
    price_per_night: 280,
    capacity: 2,
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=2074'
  },
  {
    id: '3',
    name: 'Family Executive Villa',
    type: 'Suite',
    description: 'Villa kubwa kwa ajili ya familia, yenye vyumba viwili na sebule pana.',
    price_per_night: 650,
    capacity: 4,
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2074'
  },
  {
    id: '4',
    name: 'Standard Cozy Room',
    type: 'Standard',
    description: 'Chumba kidogo lakini chenye faraja kubwa, kamili kwa wasafiri wa peke yao au wanandoa.',
    price_per_night: 150,
    capacity: 2,
    image_url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=2070'
  }
];
