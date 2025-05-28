import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    rating: 5,
    comment: 'Excelente atendimento e comida deliciosa! O ambiente é muito agradável e aconchegante.',
    date: '2025-05-15',
  },
  {
    id: '2',
    userId: '2',
    restaurantId: '1',
    rating: 4,
    comment: 'Gostei bastante da experiência. A comida estava ótima, mas o tempo de espera foi um pouco longo.',
    date: '2025-05-18',
  },
  {
    id: '3',
    userId: '1',
    restaurantId: '2',
    rating: 5,
    comment: 'As massas são incríveis! Definitivamente o melhor restaurante italiano da cidade.',
    date: '2025-05-20',
  },
  {
    id: '4',
    userId: '2',
    restaurantId: '3',
    rating: 5,
    comment: 'Frutos do mar extremamente frescos e bem preparados. A vista para o mar é um diferencial.',
    date: '2025-05-22',
  },
  {
    id: '5',
    userId: '1',
    restaurantId: '4',
    rating: 4,
    comment: 'Carnes de alta qualidade e bem preparadas. O buffet de saladas tem muitas opções.',
    date: '2025-05-10',
  },
  {
    id: '6',
    userId: '2',
    restaurantId: '5',
    rating: 5,
    comment: 'Uma experiência única para quem aprecia comida vegetariana de qualidade. Tudo muito fresco!',
    date: '2025-05-25',
  },
];