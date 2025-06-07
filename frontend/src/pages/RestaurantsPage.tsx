import React, { useState, useEffect } from 'react';
import RestaurantList from '../components/restaurant/RestaurantList';
import { getRestaurants } from '../services/api'; // Importa da nossa API
import { Restaurant } from '../types';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar os dados da API quando o componente carregar
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        if (response.success) {
          setRestaurants(response.data.restaurants); // Guarda os restaurantes no estado
        } else {
          throw new Error(response.message || 'Falha ao buscar restaurantes');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Para de carregar, independentemente do resultado
      }
    };

    fetchRestaurants();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  if (loading) {
    return (
      <div className="min-h-screen pt-24 text-center">
        <p>Carregando restaurantes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 text-center text-red-500">
        <p>Erro ao carregar restaurantes: {error}</p>
      </div>
    );
  }

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
