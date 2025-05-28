import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, CalendarX, History, PlusCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import ReservationCard from '../components/reservation/ReservationCard';
import { useReservations } from '../context/ReservationContext';
import { useAuth } from '../context/AuthContext';

const MyReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userReservations } = useReservations();
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/minhas-reservas' } });
    }
  }, [isAuthenticated, navigate]);
  
  // Group reservations by status
  const upcomingReservations = userReservations.filter(
    res => ['confirmed', 'pending'].includes(res.status)
  );
  
  const pastReservations = userReservations.filter(
    res => ['completed', 'cancelled'].includes(res.status)
  );
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
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
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <CalendarX size={32} className="text-primary-600" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Nenhuma reserva encontrada</h2>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Você ainda não fez nenhuma reserva. Explore nossos restaurantes e faça sua primeira reserva agora!
            </p>
            <div className="mt-6">
              <Link to="/restaurantes">
                <Button>
                  Explorar Restaurantes
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Reservations */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CalendarCheck size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Próximas Reservas</h2>
                </div>
                <Link to="/restaurantes">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<PlusCircle size={16} />}
                  >
                    Nova Reserva
                  </Button>
                </Link>
              </div>
              
              {upcomingReservations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <p className="text-gray-500">
                    Você não tem reservas futuras. Que tal fazer uma nova reserva?
                  </p>
                </div>
              )}
            </section>
            
            {/* Past Reservations */}
            {pastReservations.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <History size={20} className="text-gray-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Histórico de Reservas</h2>
                </div>
                
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