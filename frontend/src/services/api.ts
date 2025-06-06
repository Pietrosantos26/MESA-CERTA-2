const API_URL = import.meta.env.VITE_API_URL;

// Helper para chamadas autenticadas
const fetchWithAuth = (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('mesaCerta_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['x-auth-token'] = token;
  }

  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
};

// Exemplo de função para buscar restaurantes
export const getRestaurants = async () => {
  const response = await fetch(`${API_URL}/restaurants`); // Assumindo que você tem essa rota no backend
  if (!response.ok) {
    throw new Error('Falha ao buscar restaurantes');
  }
  return response.json();
};

// Exemplo para buscar as reservas do usuário
export const getMyReservations = async () => {
  const response = await fetchWithAuth(`/reservations/my-reservations`); // Assumindo rota
  if (!response.ok) {
      throw new Error('Falha ao buscar reservas');
  }
  const data = await response.json();
  return data.data.reservations; // Ajuste conforme a estrutura da sua resposta
};

// Adicione outras funções de API aqui (createReservation, etc.)