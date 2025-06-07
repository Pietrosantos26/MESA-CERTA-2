import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Reservation } from '../types';
import { useAuth } from './AuthContext';
import { getMyReservations, createReservation as createReservationAPI } from '../services/api';

interface ReservationContextType {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  addReservation: (reservationData: {
    restaurantId: number;
    reservationDate: string;
    reservationTime: string;
    guests: number;
    specialRequests?: string;
  }) => Promise<any>;
  cancelReservation: (id: string) => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, token } = useAuth();

  const fetchReservations = useCallback(async () => {
    if (!isAuthenticated) {
      setReservations([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const userReservations = await getMyReservations();
      setReservations(userReservations);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]); // Depende do token também para re-fetch no login

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const addReservation = async (reservationData: any) => {
    try {
      const newReservation = await createReservationAPI(reservationData);
      // Após criar, busca a lista atualizada de reservas
      fetchReservations(); 
      return newReservation; // Retorna para quem chamou
    } catch (error) {
      console.error("Falha ao criar reserva:", error);
      throw error; // Lança o erro para ser tratado no formulário
    }
  };

  const cancelReservation = async (id: string) => {
    // Lógica para chamar a API de cancelamento aqui
    console.log("Cancelar reserva (API):", id);
    // Exemplo: await cancelReservationAPI(id);
    // Após cancelar, re-fetch as reservas
    fetchReservations();
  };

  return (
    <ReservationContext.Provider value={{
      reservations,
      loading,
      error,
      addReservation,
      cancelReservation
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
