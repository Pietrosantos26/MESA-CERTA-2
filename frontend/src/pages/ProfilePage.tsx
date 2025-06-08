import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Mail } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateUser, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateUser({ username, email });
      setSuccess('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível.')) {
      setLoading(true);
      try {
        await deleteAccount();
        navigate('/'); // Navega para a home após deletar e fazer logout
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  if (!user) return <div className="pt-24 text-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... seu cabeçalho da página de perfil ... */}
        <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Informações Pessoais</h3>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-6">
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <Input
                  label="Nome de Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  label="Endereço de Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button type="submit" isLoading={loading}>Salvar Alterações</Button>
                </div>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-sm mt-8">
               <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-red-700">Zona de Perigo</h3>
              </div>
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Deletar sua conta</h4>
                  <p className="text-sm text-gray-500">Esta ação é permanente.</p>
                </div>
                <Button variant="danger" onClick={handleDelete} isLoading={loading}>Deletar Conta</Button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;
