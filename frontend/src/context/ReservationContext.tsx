import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Reservation } from '../types';
import { useAuth } from './AuthContext';
import { getMyReservations, createReservation as createReservationAPI } from '../services/api'; // Supondo que você também terá uma função para cancelar

// Interface para o que o contexto vai fornecer
interface ReservationContextType {
  userReservations: Reservation[];
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
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Função para buscar as reservas da API
  const fetchUserReservations = useCallback(async () => {
    // Se o usuário não está logado, não há o que buscar.
    if (!isAuthenticated) {
      setUserReservations([]); // Limpa as reservas
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const reservationsFromAPI = await getMyReservations();
      setUserReservations(reservationsFromAPI);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // Roda novamente se o status de autenticação mudar

  // Executa a busca quando o componente é montado ou a autenticação muda
  useEffect(() => {
    fetchUserReservations();
  }, [fetchUserReservations]);

  const addReservation = async (reservationData: any) => {
    try {
      const newReservation = await createReservationAPI(reservationData);
      // Após criar uma nova reserva, busca a lista atualizada
      fetchUserReservations();
      return newReservation;
    } catch (error) {
      console.error("Falha ao criar reserva no contexto:", error);
      throw error; // Re-lança o erro para o formulário poder tratar
    }
  };

  const cancelReservation = async (id: string) => {
    // Aqui viria a chamada para a API de cancelamento
    // await cancelReservationAPI(id); 
    // Após cancelar, busca a lista atualizada
    console.log(`Cancelando reserva ${id}...`);
    fetchUserReservations();
  };

  return (
    <ReservationContext.Provider value={{
      userReservations, // Fornece a lista de reservas
      loading,          // Fornece o estado de carregamento
      error,            // Fornece o estado de erro
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
