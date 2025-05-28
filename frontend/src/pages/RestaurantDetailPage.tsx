import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  Calendar, 
  Users, 
  DollarSign,
  Wifi,
  ParkingCircle,
  Music,
  Check,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';
import ReservationForm from '../components/reservation/ReservationForm';
import { restaurants } from '../data/restaurants';
import { reviews } from '../data/reviews';
import { users } from '../data/users';

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState(restaurants.find(r => r.id === id));
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update restaurant if id changes
    setRestaurant(restaurants.find(r => r.id === id));
  }, [id]);
  
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
  
  // Get day string for today
  const getTodayString = () => {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const today = new Date().getDay();
    return days[today];
  };
  
  // Get today's opening hours
  const today = getTodayString();
  const todayHours = restaurant.openingHours[today];
  const isOpen = todayHours && todayHours.open !== 'Fechado';
  
  // Get restaurant reviews
  const restaurantReviews = reviews.filter(review => review.restaurantId === restaurant.id);
  
  // Function to render feature icon based on feature name
  const renderFeatureIcon = (feature: string) => {
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
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      {/* Cover Image */}
      <div 
        className="w-full h-56 md:h-72 lg:h-96 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(${restaurant.coverImageUrl || restaurant.imageUrl})` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`
                text-xs font-medium rounded-full px-2 py-0.5 inline-block
                ${isOpen 
                  ? 'bg-success-500 text-white' 
                  : 'bg-gray-500 text-white'}
              `}>
                {isOpen ? 'Aberto' : 'Fechado'}
              </div>
              <div className="flex items-center space-x-1 bg-black/30 rounded-full px-2 py-0.5">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-xs font-medium">{restaurant.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-300">({restaurant.totalReviews})</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center mt-2 text-gray-200 text-sm">
              <span>{restaurant.cuisine}</span>
              <span className="mx-2">•</span>
              <span>{restaurant.priceRange}</span>
              <span className="mx-2">•</span>
              <span>{restaurant.address.split('-')[0]}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre</h2>
              <p className="text-gray-700 mb-6">{restaurant.description}</p>
              
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Localização</h3>
                    <p className="text-sm text-gray-500">{restaurant.address}</p>
                    <button 
                      onClick={() => setIsMapModalOpen(true)}
                      className="text-primary-600 hover:text-primary-700 text-sm mt-1"
                    >
                      Ver no mapa
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Horário de Funcionamento</h3>
                    <div className="text-sm text-gray-500">
                      {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize">{day}:</span>
                          <span>
                            {hours.open === 'Fechado' 
                              ? 'Fechado' 
                              : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <DollarSign size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Faixa de Preço</h3>
                    <p className="text-sm text-gray-500">
                      {restaurant.priceRange === '€' && 'Econômico'}
                      {restaurant.priceRange === '€€' && 'Moderado'}
                      {restaurant.priceRange === '€€€' && 'Alto'}
                      {restaurant.priceRange === '€€€€' && 'Luxo'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Contato</h3>
                    <p className="text-sm text-gray-500">(XX) XXXX-XXXX</p>
                    <a 
                      href="mailto:contato@exemplo.com"
                      className="text-primary-600 hover:text-primary-700 text-sm block"
                    >
                      contato@exemplo.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Features Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Comodidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-primary-600">
                      {renderFeatureIcon(feature)}
                    </span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Reviews Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Avaliações</h2>
                <div className="flex items-center space-x-1">
                  <Star size={20} className="text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-900">{restaurant.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({restaurant.totalReviews})</span>
                </div>
              </div>
              
              {restaurantReviews.length > 0 ? (
                <div className="space-y-6">
                  {restaurantReviews.map((review) => {
                    const reviewer = users.find(u => u.id === review.userId);
                    
                    return (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            {reviewer?.imageUrl ? (
                              <img 
                                src={reviewer.imageUrl} 
                                alt={reviewer.name} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-800 font-medium">
                                  {reviewer?.name.charAt(0) || '?'}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {reviewer?.name || 'Usuário anônimo'}
                                </h4>
                                <div className="flex items-center space-x-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-1">
                                    {new Date(review.date).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Este restaurante ainda não possui avaliações.
                </p>
              )}
            </section>
          </div>
          
          {/* Reservation Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ReservationForm restaurant={restaurant} />
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regras do Restaurante</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Calendar size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Reservas podem ser canceladas até 2 horas antes do horário marcado.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Users size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Para grupos acima de 10 pessoas, entre em contato diretamente com o restaurante.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    A mesa ficará reservada por 15 minutos após o horário marcado.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsMapModalOpen(false)}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Localização
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">{restaurant.address}</p>
                      {/* This would be a map in a real application */}
                      <div className="bg-gray-200 h-64 w-full rounded-md flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Mapa indisponível na demonstração</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsMapModalOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;