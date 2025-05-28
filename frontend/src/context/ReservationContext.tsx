import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Reservation } from '../types';
import { reservations as initialReservations } from '../data/reservations';
import { useAuth } from './AuthContext';

interface ReservationContextType {
  reservations: Reservation[];
  userReservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  cancelReservation: (id: string) => void;
  getReservationById: (id: string) => Reservation | undefined;
  getReservationsByRestaurant: (restaurantId: string) => Reservation[];
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const { user } = useAuth();

  const userReservations = user 
    ? reservations.filter(res => res.userId === user.id)
    : [];

  const addReservation = (newReservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const reservation: Reservation = {
      ...newReservation,
      id: `${reservations.length + 1}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    setReservations([...reservations, reservation]);
  };

  const cancelReservation = (id: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: 'cancelled' } : res
    ));
  };

  const getReservationById = (id: string) => {
    return reservations.find(res => res.id === id);
  };

  const getReservationsByRestaurant = (restaurantId: string) => {
    return reservations.filter(res => res.restaurantId === restaurantId);
  };

  return (
    <ReservationContext.Provider value={{ 
      reservations,
      userReservations,
      addReservation,
      cancelReservation,
      getReservationById,
      getReservationsByRestaurant
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};