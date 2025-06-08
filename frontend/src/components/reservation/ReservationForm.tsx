import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Restaurant, TimeSlot } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useReservations } from '../../context/ReservationContext';

interface ReservationFormProps {
  restaurant: Restaurant;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ restaurant }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addReservation } = useReservations();
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    if (date && restaurant.openingHours) {
      const dayOfWeek = new Date(date).getDay();
      const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
      const day = days[dayOfWeek];
      const hours = restaurant.openingHours[day];
      
      if (hours && hours.open !== 'Fechado') {
        const slots: TimeSlot[] = [];
        const [openHour] = hours.open.split(':').map(Number);
        const [closeHour] = hours.close.split(':').map(Number);
        
        let currentHour = openHour;
        let currentMinute = 0;
        
        while (currentHour < closeHour) {
          // CORREÇÃO: Removido o HTML indesejado daqui
          const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
          slots.push({ time: timeString, available: true });
          
          currentMinute += 30;
          if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute = 0;
          }
        }
        
        setAvailableTimeSlots(slots);
        if (slots.length > 0) setTime(slots[0].time);
      } else {
        setAvailableTimeSlots([]);
        setTime('');
      }
    }
  }, [date, restaurant.openingHours]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    if (!date || !time || guests < 1) {
      setError("Por favor, preencha data, horário e número de pessoas.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addReservation({
        restaurantId: restaurant.id as number,
        reservationDate: date,
        reservationTime: time,
        guests,
        specialRequests: specialRequests.trim() || undefined,
      });
      
      navigate('/reserva-confirmada', { 
        state: { restaurant, date, time, guests } 
      });

    } catch (err: any) {
      setError(err.message || "Não foi possível criar a reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i === 0 ? 'pessoa' : 'pessoas'}`,
  }));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Faça sua reserva</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <Input type="date" label="Data" value={date} onChange={(e) => setDate(e.target.value)} min={today} required fullWidth leftIcon={<Calendar size={18} />} />
        <Select label="Horário" options={availableTimeSlots.map(slot => ({ value: slot.time, label: slot.time }))} value={time} onChange={(e) => setTime(e.target.value)} disabled={availableTimeSlots.length === 0} required fullWidth />
        <Select label="Número de pessoas" options={guestOptions} value={String(guests)} onChange={(e) => setGuests(Number(e.target.value))} required fullWidth leftIcon={<Users size={18} />} />
        
        {/* REMOVIDO: Seção de seleção de mesa */}

        <Input as="textarea" label="Solicitações especiais (opcional)" rows={3} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Ex: Aniversário..." fullWidth />
        
        {/* CORREÇÃO: Condição `disabled` simplificada */}
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting || !date || !time}
        >
          {isAuthenticated ? 'Reservar mesa' : 'Entre para reservar'}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-2">
            Ao fazer uma reserva, você concorda com nossos termos e condições.
        </p>
      </form>
    </div>
  );
};

export default ReservationForm;
