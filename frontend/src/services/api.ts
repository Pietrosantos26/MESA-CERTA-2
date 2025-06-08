// Define a URL base da API a partir das variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Função helper para realizar chamadas à API que necessitam de autenticação.
 * Ela automaticamente anexa o token JWT, se disponível.
 * @param endpoint O endpoint da API a ser chamado (ex: '/users/profile').
 * @param options Opções adicionais para a chamada fetch (method, body, etc.).
 * @returns Uma Promise com a resposta da API.
 */
const fetchWithAuth = (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('mesaCerta_token');

  // Usa a classe Headers para uma construção mais segura e robusta dos cabeçalhos
  const headers = new Headers(options.headers);

  // Define o Content-Type como JSON, evitando duplicatas se já existir.
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Adiciona o token de autenticação se ele existir
  if (token) {
    headers.set('x-auth-token', token);
  }

  // Realiza a chamada fetch com a URL completa e os headers construídos
  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
};

/**
 * Busca todos os restaurantes da API.
 * Esta é uma rota pública e não precisa de autenticação.
 */
export const getRestaurants = async () => {
  // Note: Esta rota é pública, então não usamos fetchWithAuth.
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) {
    throw new Error('Falha ao buscar restaurantes');
  }
  return response.json();
};

/**
 * Busca todas as reservas do usuário autenticado.
 */
export const getMyReservations = async () => {
  const response = await fetchWithAuth(`/reservations/my-reservations`);
  if (!response.ok) {
    throw new Error('Falha ao buscar suas reservas');
  }
  const data = await response.json();
  // Retorna os dados dentro da propriedade 'data', conforme a estrutura do backend
  return data.data.reservations; 
};

/**
 * Cria uma nova reserva.
 * @param reservationData Dados da reserva a ser criada.
 */
export const createReservation = async (reservationData: {
  restaurantId: number;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  specialRequests?: string;
}) => {
    const response = await fetchWithAuth('/reservations', {
        method: 'POST',
        body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao criar reserva');
    }

    return response.json();
}

export const getRestaurantById = async (id: string) => {
  // Note que não precisa do `fetchWithAuth` pois esta é uma rota pública
  const response = await fetch(`${API_URL}/restaurants/${id}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar detalhes do restaurante');
  }
  return response.json();
};

/**
 * Atualiza o perfil do usuário autenticado.
 */
export const updateUserProfile = async (userData: { username?: string; email?: string }) => {
  const response = await fetchWithAuth(`/users/profile`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha ao atualizar perfil');
  }
  return response.json();
};

/**
 * Deleta a conta do usuário autenticado.
 */
export const deleteUserAccount = async () => {
  const response = await fetchWithAuth(`/users`, {
    method: 'DELETE',
  });
   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha ao deletar a conta');
  }
  return response.json();
};
