import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  Bell, 
  Video, 
  Download, 
  BarChart3, 
  Users, 
  Clock, 
  Eye, 
  EyeOff, 
  Edit3, 
  Save, 
  Check, 
  AlertTriangle, 
  Trash2, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Key, 
  Smartphone, 
  Monitor, 
  Crown,
  Zap
} from 'lucide-react';
import { useRealTimeStats } from '../hooks/useRealTimeData';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
  overflow-x: hidden;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #1a1a1a;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #00ff88;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #888;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid #333;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const MainContent = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Sidebar = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 8rem;

  @media (max-width: 1024px) {
    position: static;
    order: 2;
  }
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #222;
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #0a0a0a;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const AvatarUpload = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #00ff88;
  border: 2px solid #111;
  color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00e67a;
    transform: scale(1.1);
  }
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
`;

const UserPlan = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00ff88;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #00ff88;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.active ? 'rgba(0, 255, 136, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? '#00ff88' : 'transparent'};
  border-radius: 16px;
  color: ${props => props.active ? '#00ff88' : '#888'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: rgba(0, 255, 136, 0.05);
    color: #00ff88;
    border-color: #333;
  }
`;

const ContentArea = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #222;
`;

const ContentTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.variant === 'primary' ? '#00ff88' : 'transparent'};
  color: ${props => props.variant === 'primary' ? '#0a0a0a' : '#00ff88'};
  border: 2px solid #00ff88;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#00e67a' : 'rgba(0, 255, 136, 0.1)'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #ccc;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1rem 1.5rem;
  border: 2px solid #222;
  border-radius: 16px;
  background: #0a0a0a;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 1rem 1.5rem;
  border: 2px solid #222;
  border-radius: 16px;
  background: #0a0a0a;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }

  option {
    background: #0a0a0a;
    color: #333;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: #0a0a0a;
  border: 2px solid #222;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DeviceCard = styled(motion.div)`
  background: #0a0a0a;
  border: 2px solid #222;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
  }
`;

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DeviceIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
`;

const DeviceDetails = styled.div`
  h4 {
    color: #333;
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
  
  p {
    color: #888;
    font-size: 0.9rem;
    margin: 0;
  }
`;

const DeviceActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #333;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }

  &.danger:hover {
    border-color: #ff4444;
    color: #ff4444;
  }
`;

const PasswordField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff88;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  border: 1px solid #00ff88;
  padding: 1rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 1rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlanCard = styled(motion.div)`
  background: #0a0a0a;
  border: 2px solid ${props => props.current ? '#00ff88' : '#222'};
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.current ? '#00ff88' : '#333'};
    transform: translateY(-2px);
  }

  ${props => props.current && `
    &::before {
      content: 'Plan Actuel';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #00ff88;
      color: #0a0a0a;
      padding: 0.25rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
    }
  `}
`;

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer les statistiques en temps réel
  const { data: realTimeStats, loading: statsLoading } = useRealTimeStats();

  const [user, setUser] = useState({
    name: 'GARCES',
    email: 'garces@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    language: 'fr',
    avatar: null,
    plan: 'Pro',
    joinDate: '2024-01-15'
  });

  const [formData, setFormData] = useState({ ...user });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'devices', label: 'Appareils', icon: Monitor },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  // Utiliser les vraies statistiques ou des valeurs par défaut
  const stats = realTimeStats ? [
    { 
      label: 'Salles actives', 
      value: realTimeStats.activeRooms || 0, 
      icon: Video,
      loading: statsLoading 
    },
    { 
      label: 'Utilisateurs connectés', 
      value: realTimeStats.totalUsers || 0, 
      icon: Users,
      loading: statsLoading 
    },
    { 
      label: 'Participants en ligne', 
      value: realTimeStats.totalParticipants || 0, 
      icon: Users,
      loading: statsLoading 
    },
    { 
      label: 'Enregistrements en cours', 
      value: realTimeStats.recordingRooms || 0, 
      icon: Download,
      loading: statsLoading 
    }
  ] : [
    { label: 'Salles actives', value: '0', icon: Video, loading: true },
    { label: 'Utilisateurs connectés', value: '0', icon: Users, loading: true },
    { label: 'Participants en ligne', value: '0', icon: Users, loading: true },
    { label: 'Enregistrements en cours', value: '0', icon: Download, loading: true }
  ];

  const devices = [
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'desktop',
      browser: 'Chrome 120.0',
      location: 'Paris, France',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      type: 'mobile',
      browser: 'Safari Mobile',
      location: 'Paris, France',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'tablet',
      browser: 'Safari',
      location: 'Lyon, France',
      lastActive: '2 days ago',
      current: false
    }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '0€',
      period: '/mois',
      features: ['5 participants max', '40 min par réunion', 'Qualité HD'],
      current: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '4.99€',
      period: '/mois',
      features: ['100 participants', 'Réunions illimitées', 'Qualité 4K', 'Enregistrement'],
      current: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '12.99€',
      period: '/mois/utilisateur',
      features: ['Participants illimités', 'Serveurs dédiés', 'Support prioritaire'],
      current: false
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulation d'une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ ...formData });
      setIsEditing(false);
      setSuccessMessage('Profil mis à jour avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Erreur lors de la sauvegarde');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Simulation d'un changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccessMessage('Mot de passe modifié avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Erreur lors du changement de mot de passe');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile': return Smartphone;
      case 'tablet': return Smartphone;
      default: return Monitor;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <User size={24} />
                Informations du Profil
              </ContentTitle>
              <ActionButton
                variant={isEditing ? 'primary' : 'secondary'}
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <Clock size={16} />
                ) : isEditing ? (
                  <Save size={16} />
                ) : (
                  <Edit3 size={16} />
                )}
                {isLoading ? 'Sauvegarde...' : isEditing ? 'Sauvegarder' : 'Modifier'}
              </ActionButton>
            </ContentHeader>

            {successMessage && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Check size={16} />
                {successMessage}
              </SuccessMessage>
            )}

            {errorMessage && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertTriangle size={16} />
                {errorMessage}
              </ErrorMessage>
            )}

            <FormGrid>
              <FormGroup>
                <Label>
                  <User size={16} />
                  Nom complet
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Votre nom complet"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <Mail size={16} />
                  Email
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  placeholder="votre@email.com"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <Phone size={16} />
                  Téléphone
                </Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="+33 6 12 34 56 78"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <MapPin size={16} />
                  Adresse
                </Label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Votre adresse"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <Globe size={16} />
                  Pays
                </Label>
                <Select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Canada">Canada</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Clock size={16} />
                  Fuseau horaire
                </Label>
                <Select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </div>
        );

      case 'security':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <Shield size={24} />
                Sécurité du Compte
              </ContentTitle>
            </ContentHeader>

            {successMessage && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Check size={16} />
                {successMessage}
              </SuccessMessage>
            )}

            {errorMessage && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertTriangle size={16} />
                {errorMessage}
              </ErrorMessage>
            )}

            <FormGrid>
              <FormGroup>
                <Label>
                  <Key size={16} />
                  Mot de passe actuel
                </Label>
                <PasswordField>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder="Mot de passe actuel"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordField>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Key size={16} />
                  Nouveau mot de passe
                </Label>
                <PasswordField>
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder="Nouveau mot de passe"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordField>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Key size={16} />
                  Confirmer le mot de passe
                </Label>
                <PasswordField>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirmer le mot de passe"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordField>
              </FormGroup>
            </FormGrid>

            <ActionButton
              variant="primary"
              onClick={handleChangePassword}
              disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? <Clock size={16} /> : <Save size={16} />}
              {isLoading ? 'Modification...' : 'Changer le mot de passe'}
            </ActionButton>
          </div>
        );

      case 'billing':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <CreditCard size={24} />
                Facturation et Abonnement
              </ContentTitle>
            </ContentHeader>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {plans.map((plan) => (
                <PlanCard key={plan.id} current={plan.current}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Crown size={20} color={plan.current ? '#00ff88' : '#888'} />
                    <h3 style={{ color: '#3b82f6', margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{plan.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '900', color: '#00ff88' }}>{plan.price}</span>
                    <span style={{ color: '#888', marginLeft: '0.25rem' }}>{plan.period}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                    {plan.features.map((feature, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#ccc' }}>
                        <Check size={16} color="#00ff88" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <ActionButton variant="primary" style={{ width: '100%' }}>
                      <Zap size={16} />
                      Changer de plan
                    </ActionButton>
                  )}
                </PlanCard>
              ))}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <Bell size={24} />
                Préférences de Notifications
              </ContentTitle>
            </ContentHeader>

            <FormGrid>
              <FormGroup>
                <Label>
                  <Mail size={16} />
                  Notifications par email
                </Label>
                <Select>
                  <option value="all">Toutes les notifications</option>
                  <option value="important">Notifications importantes uniquement</option>
                  <option value="none">Aucune notification</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Bell size={16} />
                  Notifications push
                </Label>
                <Select>
                  <option value="enabled">Activées</option>
                  <option value="disabled">Désactivées</option>
                </Select>
              </FormGroup>
            </FormGrid>

            <ActionButton variant="primary">
              <Save size={16} />
              Sauvegarder les préférences
            </ActionButton>
          </div>
        );

      case 'devices':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <Monitor size={24} />
                Appareils Connectés
              </ContentTitle>
            </ContentHeader>

            {devices.map((device) => {
              const DeviceIconComponent = getDeviceIcon(device.type);
              return (
                <DeviceCard key={device.id}>
                  <DeviceInfo>
                    <DeviceIcon>
                      <DeviceIconComponent size={20} />
                    </DeviceIcon>
                    <DeviceDetails>
                      <h4>{device.name} {device.current && '(Actuel)'}</h4>
                      <p>{device.browser} • {device.location}</p>
                      <p>Dernière activité: {device.lastActive}</p>
                    </DeviceDetails>
                  </DeviceInfo>
                  <DeviceActions>
                    {!device.current && (
                      <IconButton className="danger">
                        <Trash2 size={16} />
                      </IconButton>
                    )}
                  </DeviceActions>
                </DeviceCard>
              );
            })}
          </div>
        );

      case 'stats':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <BarChart3 size={24} />
                Statistiques d'Utilisation
              </ContentTitle>
            </ContentHeader>

            <StatsGrid>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <StatCard key={index}>
                    <IconComponent size={32} color="#00ff88" style={{ marginBottom: '1rem' }} />
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                );
              })}
            </StatsGrid>
          </div>
        );

      case 'settings':
        return (
          <div>
            <ContentHeader>
              <ContentTitle>
                <Settings size={24} />
                Paramètres Généraux
              </ContentTitle>
            </ContentHeader>

            <FormGrid>
              <FormGroup>
                <Label>
                  <Globe size={16} />
                  Langue
                </Label>
                <Select value={formData.language} onChange={(e) => handleInputChange('language', e.target.value)}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Video size={16} />
                  Qualité vidéo par défaut
                </Label>
                <Select>
                  <option value="auto">Automatique</option>
                  <option value="hd">HD (720p)</option>
                  <option value="fhd">Full HD (1080p)</option>
                  <option value="4k">4K (2160p)</option>
                </Select>
              </FormGroup>
            </FormGrid>

            <ActionButton variant="primary">
              <Save size={16} />
              Sauvegarder les paramètres
            </ActionButton>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <NavLinks>
            <NavLink onClick={() => navigate('/')}>Accueil</NavLink>
            <NavLink onClick={() => navigate('/#features')}>Fonctionnalités</NavLink>
            <NavLink onClick={() => navigate('/#pricing')}>Tarifs</NavLink>
            <NavLink onClick={() => navigate('/support')}>Support</NavLink>
          </NavLinks>
          <BackButton onClick={() => navigate('/')}>
            ← Retour
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <Sidebar>
          <ProfileSection>
            <AvatarContainer>
              <Avatar>
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" />
                ) : (
                  user.name.charAt(0)
                )}
              </Avatar>
              <AvatarUpload onClick={() => document.getElementById('avatar-upload').click()}>
                <Camera size={14} />
              </AvatarUpload>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
            </AvatarContainer>
            <UserName>{user.name}</UserName>
            <UserPlan>
              <Crown size={16} />
              Plan {user.plan}
            </UserPlan>
          </ProfileSection>

          <MenuList>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <MenuItem
                  key={item.id}
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                >
                  <IconComponent size={20} />
                  {item.label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Sidebar>

        <ContentArea>
          {renderContent()}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default AccountPage;
