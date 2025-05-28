import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import RestaurantCard from './RestaurantCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Restaurant } from '../../types';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Get unique cuisines for filter
  const cuisines = useMemo(() => {
    const uniqueCuisines = [...new Set(restaurants.map(r => r.cuisine))];
    return [
      { value: '', label: 'Todas as cozinhas' },
      ...uniqueCuisines.map(cuisine => ({ value: cuisine, label: cuisine }))
    ];
  }, [restaurants]);

  // Price range options
  const priceRanges = [
    { value: '', label: 'Todos os preços' },
    { value: '€', label: '€ - Econômico' },
    { value: '€€', label: '€€ - Moderado' },
    { value: '€€€', label: '€€€ - Alto' },
    { value: '€€€€', label: '€€€€ - Luxo' },
  ];

  // Filter restaurants based on search and filters
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCuisine = cuisineFilter === '' || restaurant.cuisine === cuisineFilter;
      const matchesPrice = priceFilter === '' || restaurant.priceRange === priceFilter;
      
      return matchesSearch && matchesCuisine && matchesPrice;
    });
  }, [restaurants, searchTerm, cuisineFilter, priceFilter]);

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Buscar restaurantes por nome, cozinha ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              leftIcon={<Search size={18} />}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-40">
              <Select
                options={cuisines}
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                fullWidth
              />
            </div>
            
            <div className="w-40">
              <Select
                options={priceRanges}
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
      
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center">
            <Filter size={48} className="text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum restaurante encontrado</h3>
          <p className="mt-2 text-gray-500">
            Tente ajustar seus filtros ou buscar por outro termo.
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;