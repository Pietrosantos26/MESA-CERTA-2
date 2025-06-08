import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { id, name, cuisine, rating, address, priceRange, imageUrl, openingHours } = restaurant;

  const getTodayString = () => {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    return days[new Date().getDay()];
  };

  const todayHours = openingHours ? openingHours[getTodayString()] : null;
  const isOpen = todayHours && todayHours.open !== 'Fechado';

  // Converte o rating (que pode ser string ou number) para número antes de usar.
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;

  return (
    <Link 
      to={`/restaurantes/${id}`}
      className="bg-white rounded-lg shadow-card overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
    >
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            {/* CORREÇÃO AQUI: Usamos a variável numérica */}
            <span className="text-white text-sm font-medium">
              {numericRating ? numericRating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500 mr-2">{cuisine}</span>
          <span className="text-sm text-gray-700">{priceRange}</span>
        </div>
        
        <div className="flex items-start space-x-1 text-gray-500 mb-2">
          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
          <span className="text-xs">{address?.split('-')[0]}</span>
        </div>
        
        <div className="flex items-start space-x-1 text-gray-500 mt-auto">
          <Clock size={14} className="mt-0.5 flex-shrink-0" />
          <span className="text-xs">
            {todayHours 
              ? `Hoje: ${todayHours.open} - ${todayHours.close}` 
              : 'Horário indisponível'}
          </span>
        </div>
      </div>
      
      <div className="px-4 py-2 border-t border-gray-100">
        <div className={`
          text-xs font-medium rounded-full px-2 py-0.5 inline-block
          ${isOpen 
            ? 'bg-success-100 text-success-800' 
            : 'bg-gray-100 text-gray-800'}
        `}>
          {isOpen ? 'Aberto' : 'Fechado'}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
