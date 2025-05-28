import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { restaurants } from '../data/restaurants';

const HomePage: React.FC = () => {
  // Get featured restaurants (highest rated)
  const featuredRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
            Sua Mesa está Reservada
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Encontre e reserve os melhores restaurantes em segundos. Experiências gastronômicas inesquecíveis começam aqui.
          </p>
          
          <div className="bg-white p-3 rounded-lg shadow-lg max-w-2xl mx-auto flex flex-col md:flex-row items-stretch md:items-center animate-slide-up">
            <div className="flex-grow mb-3 md:mb-0 md:mr-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Localização, cozinha ou nome do restaurante"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <Link to="/restaurantes">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  rightIcon={<Search size={18} />}
                >
                  Buscar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Restaurantes em Destaque</h2>
            <Link 
              to="/restaurantes" 
              className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
            >
              Ver todos
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Por que escolher o MesaCerta?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservas Instantâneas</h3>
              <p className="text-gray-600">
                Faça reservas em tempo real sem precisar ligar. Confirme sua mesa em segundos.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Restaurantes Selecionados</h3>
              <p className="text-gray-600">
                Curadoria dos melhores restaurantes com avaliações reais e verificadas.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.5 20.25l-.259-1.035a3.375 3.375 0 0 0-2.456-2.456L12.75 16.5l1.035-.259a3.375 3.375 0 0 0 2.456-2.456L16.5 12.75l.259 1.035a3.375 3.375 0 0 0 2.456 2.456l1.035.259-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiências Exclusivas</h3>
              <p className="text-gray-600">
                Acesso a menus especiais, eventos gastronômicos e promoções exclusivas.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Pronto para uma experiência gastronômica?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Junte-se aos milhares de usuários que já encontraram seus novos restaurantes favoritos.
          </p>
          <Link to="/restaurantes">
            <Button
              variant="secondary"
              size="lg"
            >
              Encontrar restaurantes
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;