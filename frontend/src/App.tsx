import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyReservationsPage from './pages/MyReservationsPage';
import ReservationConfirmationPage from './pages/ReservationConfirmationPage';
import { AuthProvider } from './context/AuthContext';
import { ReservationProvider } from './context/ReservationContext';

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurantes" element={<RestaurantsPage />} />
                <Route path="/restaurantes/:id" element={<RestaurantDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/minhas-reservas" element={<MyReservationsPage />} />
                <Route path="/reserva-confirmada" element={<ReservationConfirmationPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;