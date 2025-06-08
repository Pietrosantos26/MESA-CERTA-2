import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, CalendarX, History, PlusCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import ReservationCard from '../components/reservation/ReservationCard';
import { useReservations } from '../context/ReservationContext';
import { useAuth } from '../context/AuthContext';
import { Reservation } from '../types'; // Importando o tipo

const MyReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  // Pegando os dados e estados do nosso novo contexto!
  const { userReservations, loading, error } = useReservations(); 
  const { isAuthenticated } = useAuth();
  
  // Redireciona se não estiver autenticado
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: '/minhas-reservas' } });
    }
  }, [isAuthenticated, loading, navigate]);
  
  // Tratando estados de carregamento e erro
  if (loading) {
    return <div className="min-h-screen pt-24 text-center">Carregando suas reservas...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen pt-24 text-center text-red-500">Erro ao carregar reservas: {error}</div>;
  }
  
  // Filtra as reservas APENAS depois de garantir que não há erro e não está carregando
  const upcomingReservations = userReservations.filter(
    (res: Reservation) => ['confirmed', 'pending'].includes(res.status)
  );
  
  const pastReservations = userReservations.filter(
    (res: Reservation) => ['completed', 'cancelled'].includes(res.status)
  );
  
  if (!isAuthenticated) {
    return null; // Não renderiza nada enquanto redireciona
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Minhas Reservas</h1>
          <p className="text-gray-600">
            Gerencie suas reservas atuais e veja o histórico de reservas anteriores.
          </p>
        </div>
        
        {userReservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            {/* ... seu JSX para quando não há reservas ... */}
            <h2 className="mt-4 text-lg font-medium text-gray-900">Nenhuma reserva encontrada</h2>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Seção de Próximas Reservas */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Próximas Reservas</h2>
              {upcomingReservations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingReservations.map((reservation) => (
                    // Você precisará ajustar o ReservationCard para receber os novos dados da API
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Você não tem reservas futuras.</p>
              )}
            </section>
            
            {/* Seção de Histórico de Reservas */}
            {pastReservations.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Reservas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage;
