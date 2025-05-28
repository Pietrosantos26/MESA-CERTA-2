import React from 'react';
import { MapPin, Calendar, Clock, Users, X, Check, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { Reservation } from '../../types';
import { restaurants } from '../../data/restaurants';
import { useReservations } from '../../context/ReservationContext';
import { useNavigate } from 'react-router-dom';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const { cancelReservation } = useReservations();
  const navigate = useNavigate();
  
  const restaurant = restaurants.find(r => r.restaurantId === reservation.restaurantId);
  
  if (!restaurant) {
    return null; // or a fallback UI
  }
  
  const statusColors = {
    pending: 'bg-warning-50 text-warning-800 border-warning-200',
    confirmed: 'bg-success-50 text-success-800 border-success-200',
    cancelled: 'bg-gray-50 text-gray-800 border-gray-200',
    completed: 'bg-primary-50 text-primary-800 border-primary-200',
  };
  
  const statusLabels = {
    pending: 'Pendente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Concluída',
  };
  
  const statusIcons = {
    pending: <AlertCircle size={16} />,
    confirmed: <Check size={16} />,
    cancelled: <X size={16} />,
    completed: <Check size={16} />,
  };
  
  // Format date to display in DD/MM/YYYY format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Check if reservation is in the future and can be cancelled
  const isPast = new Date(`${reservation.date}T${reservation.time}`) < new Date();
  const canCancel = ['confirmed', 'pending'].includes(reservation.status) && !isPast;
  
  return (
    <div className={`
      bg-white rounded-lg shadow-sm overflow-hidden border-l-4
      ${statusColors[reservation.status].split(' ')[2]}
    `}>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
          
          <div className={`
            inline-flex items-center space-x-1 text-xs font-medium px-2.5 py-0.5 rounded-full
            ${statusColors[reservation.status]}
            mt-1 sm:mt-0
          `}>
            <span>{statusIcons[reservation.status]}</span>
            <span>{statusLabels[reservation.status]}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <Calendar size={16} className="mt-0.5 flex-shrink-0" />
            <span>{formatDate(reservation.date)}</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <Clock size={16} className="mt-0.5 flex-shrink-0" />
            <span>{reservation.time}</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <Users size={16} className="mt-0.5 flex-shrink-0" />
            <span>{reservation.guests} {reservation.guests === 1 ? 'pessoa' : 'pessoas'}</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
            <span>{restaurant.address}</span>
          </div>
          
          {reservation.specialRequests && (
            <div className="pt-2 text-gray-700">
              <p className="text-xs font-medium mb-1">Solicitações especiais:</p>
              <p className="text-sm">{reservation.specialRequests}</p>
            </div>
          )}
        </div>
      </div>
      
      {canCancel && (
        <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/restaurantes/${restaurant.id}`)}
          >
            Ver restaurante
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={() => cancelReservation(reservation.id)}
          >
            Cancelar reserva
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;