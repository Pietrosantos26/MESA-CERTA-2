import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@exemplo.com',
    phone: '(11) 98765-4321',
    imageUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    role: 'customer',
  },
  {
    id: '2',
    name: 'João Oliveira',
    email: 'joao@exemplo.com',
    phone: '(21) 99876-5432',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    role: 'customer',
  },
  {
    id: '3',
    name: 'Ana Souza',
    email: 'ana@exemplo.com',
    phone: '(31) 98765-1234',
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    role: 'restaurantOwner',
  },
  {
    id: '4',
    name: 'Carlos Santos',
    email: 'carlos@exemplo.com',
    phone: '(41) 99876-4321',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    role: 'restaurantOwner',
  },
  {
    id: '5',
    name: 'Admin',
    email: 'admin@mesacerta.com',
    role: 'admin',
  },
];