import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Restaurant, Table, TimeSlot } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useReservations } from '../../context/ReservationContext';

interface ReservationFormProps {
  restaurant: Restaurant;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ restaurant }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addReservation } = useReservations();
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Generate time slots based on opening hours
  useEffect(() => {
    if (date) {
      const dayOfWeek = new Date(date).getDay();
      const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
      const day = days[dayOfWeek];
      
      const hours = restaurant.openingHours[day];
      
      if (hours && hours.open !== 'Fechado') {
        // Generate time slots every 30 minutes
        const slots: TimeSlot[] = [];
        const [openHour, openMinute] = hours.open.split(':').map(Number);
        const [closeHour, closeMinute] = hours.close.split(':').map(Number);
        
        let currentHour = openHour;
        let currentMinute = openMinute;
        
        // Generate slots until 1 hour before closing
        while (
          currentHour < closeHour - 1 || 
          (currentHour === closeHour - 1 && currentMinute <= closeMinute)
        ) {
          const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
          slots.push({ time: timeString, available: true });
          
          // Increment by 30 minutes
          currentMinute += 30;
          if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute = 0;
          }
        }
        
        setAvailableTimeSlots(slots);
        if (slots.length > 0) {
          setTime(slots[0].time);
        }
      } else {
        setAvailableTimeSlots([]);
        setTime('');
      }
    }
  }, [date, restaurant.openingHours]);
  
  // Filter tables based on party size
  useEffect(() => {
    if (guests > 0) {
      const tables = restaurant.tables.filter(table => 
        table.isAvailable && table.seats >= guests && table.seats <= guests + 2
      );
      
      setAvailableTables(tables);
      if (tables.length > 0) {
        setSelectedTable(tables[0].id);
      } else {
        setSelectedTable('');
      }
    }
  }, [guests, restaurant.tables]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    if (!date || !time || !selectedTable || guests < 1) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      addReservation({
        userId: user!.id,
        restaurantId: restaurant.id,
        tableId: selectedTable,
        date,
        time,
        guests,
        specialRequests: specialRequests.trim() || undefined,
      });
      
      setIsSubmitting(false);
      navigate('/reserva-confirmada', { 
        state: { 
          restaurant, 
          date, 
          time, 
          guests 
        } 
      });
    }, 1000);
  };
  
  // Generate options for guests
  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i === 0 ? 'pessoa' : 'pessoas'}`,
  }));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Faça sua reserva</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Input
              type="date"
              label="Data"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              required
              fullWidth
              leftIcon={<Calendar size={18} />}
            />
          </div>
          
          <div>
            <Select
              label="Horário"
              options={availableTimeSlots.map(slot => ({
                value: slot.time,
                label: slot.time,
              }))}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={availableTimeSlots.length === 0}
              required
              fullWidth
            />
            {availableTimeSlots.length === 0 && date && (
              <p className="mt-1 text-sm text-error-600">
                Restaurante fechado nesta data.
              </p>
            )}
          </div>
          
          <div>
            <Select
              label="Número de pessoas"
              options={guestOptions}
              value={String(guests)}
              onChange={(e) => setGuests(Number(e.target.value))}
              required
              fullWidth
              leftIcon={<Users size={18} />}
            />
          </div>
          
          {availableTables.length > 0 ? (
            <div>
              <Select
                label="Mesa"
                options={availableTables.map(table => ({
                  value: table.id,
                  label: `Mesa para ${table.seats} pessoas (${table.location})`,
                }))}
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                required
                fullWidth
              />
            </div>
          ) : (
            guests > 0 && (
              <p className="text-sm text-error-600">
                Não há mesas disponíveis para {guests} pessoas.
              </p>
            )
          )}
          
          <div>
            <Input
              label="Solicitações especiais (opcional)"
              as="textarea"
              rows={3}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Ex: Aniversário, preferência por mesa específica, etc."
              fullWidth
            />
          </div>
          
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            disabled={
              isSubmitting || 
              !date || 
              !time || 
              !selectedTable || 
              availableTables.length === 0
            }
          >
            {isAuthenticated ? 'Reservar mesa' : 'Entre para reservar'}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Ao fazer uma reserva, você concorda com nossos termos e condições.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;