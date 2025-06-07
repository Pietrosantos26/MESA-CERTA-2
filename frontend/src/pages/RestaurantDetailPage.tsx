import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurantById } from '../services/api';
import { Restaurant as RestaurantType } from '../types';
import { Star, MapPin, Clock, Check, Wifi, ParkingCircle, Music, Phone, DollarSign } from 'lucide-react';
import Button from '../components/ui/Button';
import ReservationForm from '../components/reservation/ReservationForm';

// Componente para renderizar o ícone de uma comodidade
const FeatureIcon: React.FC<{ feature: string }> = ({ feature }) => {
  switch (feature.toLowerCase()) {
    case 'wi-fi':
      return <Wifi size={16} />;
    case 'estacionamento':
    case 'estacionamento com manobrista':
      return <ParkingCircle size={16} />;
    case 'música ao vivo':
      return <Music size={16} />;
    default:
      return <Check size={16} />;
  }
};


const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      const fetchRestaurantDetails = async () => {
        setLoading(true);
        try {
          // Agora usando a função da nossa API!
          const response = await getRestaurantById(id);
          if (response.success) {
            setRestaurant(response.data.restaurant);
          } else {
            throw new Error(response.message || 'Restaurante não encontrado');
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRestaurantDetails();
    }
  }, [id]);
  
  // Estados de Carregamento e Erro
  if (loading) return <div className="min-h-screen pt-24 text-center">Carregando...</div>;
  if (error) return <div className="min-h-screen pt-24 text-center text-red-500">Erro: {error}</div>;
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurante não encontrado</h1>
          <Link to="/restaurantes">
            <Button>Voltar para lista de restaurantes</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Lógica para verificar se o restaurante está aberto (com segurança)
  const getTodayString = () => {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    return days[new Date().getDay()];
  };

  const todayHours = restaurant.opening_hours ? restaurant.opening_hours[getTodayString()] : null;
  const isOpen = todayHours && todayHours.open !== 'Fechado';

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      {/* Cover Image */}
      <div 
        className="w-full h-56 md:h-72 lg:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${restaurant.cover_image_url || restaurant.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center mt-2 text-gray-200 text-sm">
              <span>{restaurant.cuisine}</span>
              <span className="mx-2">•</span>
              <span>{restaurant.price_range}</span>
              <span className="mx-2">•</span>
              <span>{restaurant.address?.split('-')[0]}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre o Restaurante</h2>
              <p className="text-gray-700 mb-6">{restaurant.description}</p>
            </section>

            {restaurant.features && restaurant.features.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Comodidades</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {restaurant.features.map((feature, index) => (
                     <div key={index} className="flex items-center space-x-2">
                       <span className="text-primary-600">
                         <FeatureIcon feature={feature} />
                       </span>
                       <span className="text-sm text-gray-700">{feature}</span>
                     </div>
                   ))}
                 </div>
               </section>
            )}

            {/* A seção de Reviews foi removida por enquanto, pois ela depende de dados mocados.
                Ela pode ser adicionada depois com uma chamada de API própria. */}
          </div>
          
          {/* Reservation Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ReservationForm restaurant={restaurant} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
