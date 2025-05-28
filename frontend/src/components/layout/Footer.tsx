import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">MesaCerta</span>
            </div>
            <p className="text-sm">
              Encontre os melhores restaurantes e reserve sua mesa em segundos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Para Usuários
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/restaurantes" className="text-gray-400 hover:text-white transition-colors">
                  Encontrar Restaurantes
                </Link>
              </li>
              <li>
                <Link to="/minhas-reservas" className="text-gray-400 hover:text-white transition-colors">
                  Minhas Reservas
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className="text-gray-400 hover:text-white transition-colors">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to="/ajuda" className="text-gray-400 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Para Restaurantes
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/restaurantes/cadastro" className="text-gray-400 hover:text-white transition-colors">
                  Cadastre seu Restaurante
                </Link>
              </li>
              <li>
                <Link to="/restaurantes/admin" className="text-gray-400 hover:text-white transition-colors">
                  Área do Restaurante
                </Link>
              </li>
              <li>
                <Link to="/restaurantes/marketing" className="text-gray-400 hover:text-white transition-colors">
                  Soluções de Marketing
                </Link>
              </li>
              <li>
                <Link to="/restaurantes/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Planos e Preços
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/acessibilidade" className="text-gray-400 hover:text-white transition-colors">
                  Acessibilidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {year} MesaCerta. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <select
              className="bg-gray-800 border border-gray-700 text-gray-400 py-1 px-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              defaultValue="pt-BR"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;