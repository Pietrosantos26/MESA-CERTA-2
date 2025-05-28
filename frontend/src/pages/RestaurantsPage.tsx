import React from 'react';
import RestaurantList from '../components/restaurant/RestaurantList';
import { restaurants } from '../data/restaurants';

const RestaurantsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Restaurantes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra os melhores restaurantes para qualquer ocasião, sabor ou orçamento.
          </p>
        </div>
        
        <RestaurantList restaurants={restaurants} />
      </div>
    </div>
  );
};

export default RestaurantsPage;