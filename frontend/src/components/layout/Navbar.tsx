import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Menu, X, LogIn, LogOut, User, PanelRight } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ChefHat className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MesaCerta</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-sm font-medium text-gray-900">
                Início
              </Link>
              <Link to="/restaurantes" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Restaurantes
              </Link>
              {isAuthenticated && (
                <Link to="/minhas-reservas" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Minhas Reservas
                </Link>
              )}
            </div>
          </div>

          {/* ======================= MENU DESKTOP ======================= */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center">
                {user.role === 'restaurantOwner' && (
                  <Link to="/admin" className="mr-4">
                    <Button variant="outline" size="sm" leftIcon={<PanelRight size={16} />}>
                      Painel
                    </Button>
                  </Link>
                )}
                <div className="flex items-center">
                  <Link to="/perfil" className="mr-3 flex items-center">
                    {user.imageUrl ? (
                      <img 
                        src={user.imageUrl} 
                        alt={user.username} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-800 font-medium text-sm">
                          {user.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="ml-2 text-sm font-medium text-gray-700">{user.username}</span>
                  </Link>
                  <Button variant="ghost" size="sm" leftIcon={<LogOut size={16} />} onClick={logout}>
                    Sair
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" leftIcon={<LogIn size={16} />}>
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="primary" size="sm" leftIcon={<User size={16} />}>
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ======================= MENU MOBILE ======================= */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-gray-900 bg-primary-50" onClick={() => setIsMenuOpen(false)}>
              Início
            </Link>
            <Link to="/restaurantes" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" onClick={() => setIsMenuOpen(false)}>
              Restaurantes
            </Link>
            {isAuthenticated && (
              <Link to="/minhas-reservas" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" onClick={() => setIsMenuOpen(false)}>
                Minhas Reservas
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center px-4">
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.username} // CORREÇÃO AQUI
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-800 font-medium">
                        {user.username?.charAt(0).toUpperCase()} {/* CORREÇÃO AQUI */}
                      </span>
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.username}</div> {/* CORREÇÃO AQUI */}
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link to="/perfil" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    Seu Perfil
                  </Link>
                  {user.role === 'restaurantOwner' && (
                    <Link to="/admin" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                      Painel de Administração
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link to="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
                <Link to="/cadastro" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
