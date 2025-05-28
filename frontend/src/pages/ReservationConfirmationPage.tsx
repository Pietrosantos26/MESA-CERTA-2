import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Users, MapPin, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { Restaurant } from '../types';

interface LocationState {
  restaurant: Restaurant;
  date: string;
  time: string;
  guests: number;
}

const ReservationConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  
  useEffect(() => {
    // Redirect to home if accessed directly without state
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);
  
  if (!state) {
    return null;
  }
  
  const { restaurant, date, time, guests } = state;
  
  // Format date to display in DD/MM/YYYY format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-primary-50 p-6 flex items-center justify-center border-b border-primary-100">
            <div className="text-center">
              <div className="flex justify-center">
                <CheckCircle size={64} className="text-primary-600" />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                Reserva Confirmada!
              </h1>
              <p className="mt-2 text-primary-700">
                Sua mesa foi reservada com sucesso.
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{restaurant.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Data</h3>
                    <p className="text-sm text-gray-600">{formatDate(date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Horário</h3>
                    <p className="text-sm text-gray-600">{time}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Número de pessoas</h3>
                    <p className="text-sm text-gray-600">{guests} {guests === 1 ? 'pessoa' : 'pessoas'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Localização</h3>
                    <p className="text-sm text-gray-600">{restaurant.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Informações importantes:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Você receberá um email com os detalhes da sua reserva.</li>
                <li>• A mesa ficará reservada por 15 minutos após o horário marcado.</li>
                <li>• Você pode cancelar a reserva até 2 horas antes do horário marcado.</li>
                <li>• Em caso de dúvidas, entre em contato com o restaurante.</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
              <Link to="/minhas-reservas">
                <Button 
                  variant="primary"
                  fullWidth
                >
                  Ver minhas reservas
                </Button>
              </Link>
              
              <Link to="/">
                <Button 
                  variant="outline"
                  fullWidth
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Voltar para o início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmationPage;