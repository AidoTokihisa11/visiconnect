import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Key,
  Mail,
  Phone,
  Calendar,
  Star,
  Users,
  Video,
  Clock,
  Eye,
  EyeOff,
  Edit3,
  Save,
  X,
  Camera,
  Zap
} from 'lucide-react';
import FooterUnified from '../components/FooterUnified';

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 2rem 0;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary, #64748b);
  max-width: 600px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Sidebar = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);
  position: sticky;
  top: 2rem;

  @media (max-width: 968px) {
    position: static;
  }
`;

const NavItem = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.active ? 
    'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))' : 
    'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-primary, #1e293b)'};
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 
      'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))' : 
      'rgba(37, 99, 235, 0.1)'};
    transform: translateX(4px);
  }
`;

const MainContent = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);
  min-height: 600px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary, #1e293b);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary, #1e293b);
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(37, 99, 235, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background: rgba(37, 99, 235, 0.05);
    color: var(--text-secondary, #64748b);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(37, 99, 235, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: 2px solid transparent;
  background: ${props => props.variant === 'primary' ? 
    'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))' : 
    'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2563eb'};
  border-color: ${props => props.variant === 'primary' ? 'transparent' : '#2563eb'};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    background: ${props => props.variant === 'primary' ? 
      'linear-gradient(135deg, #1d4ed8, #0ea5e9)' : 
      'rgba(37, 99, 235, 0.1)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Card = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.08);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: var(--bg-primary, #ffffff);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary, #ffffff), var(--bg-primary, #ffffff)), 
                    var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.08);

  .stat-value {
    font-size: 2rem;
    font-weight: 900;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: var(--text-secondary, #64748b);
    font-weight: 600;
    font-size: 0.9rem;
  }

  .stat-icon {
    margin-bottom: 1rem;
    color: #2563eb;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(37, 99, 235, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  position: relative;
  cursor: pointer;

  .camera-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: var(--bg-primary, #ffffff);
    color: #2563eb;
    padding: 0.5rem;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
`;

const UserInfo = styled.div`
  flex: 1;

  .user-name {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-primary, #1e293b);
    margin-bottom: 0.5rem;
  }

  .user-email {
    color: var(--text-secondary, #64748b);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .user-status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const PasswordSection = styled.div`
  .password-input {
    position: relative;
    
    .toggle-password {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-secondary, #64748b);
      cursor: pointer;
      padding: 0.25rem;
    }
  }
`;

const NotificationItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: var(--bg-primary, #ffffff);
  border: 2px solid rgba(37, 99, 235, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;

  .notification-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;

    .notification-icon {
      background: rgba(37, 99, 235, 0.1);
      color: #2563eb;
      padding: 0.75rem;
      border-radius: 10px;
    }

    .notification-content {
      .notification-title {
        font-weight: 600;
        color: var(--text-primary, #1e293b);
        margin-bottom: 0.25rem;
      }

      .notification-description {
        color: var(--text-secondary, #64748b);
        font-size: 0.9rem;
      }
    }
  }

  .notification-toggle {
    input[type="checkbox"] {
      width: 50px;
      height: 26px;
      background: #e2e8f0;
      border-radius: 13px;
      appearance: none;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;

      &:checked {
        background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
      }

      &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        top: 3px;
        left: 3px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      &:checked::before {
        transform: translateX(24px);
      }
    }
  }
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(37, 99, 235, 0.1);

  &:last-child {
    border-bottom: none;
  }

  .activity-icon {
    background: rgba(37, 99, 235, 0.1);
    color: #2563eb;
    padding: 0.75rem;
    border-radius: 10px;
    min-width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .activity-content {
    flex: 1;
    
    .activity-title {
      font-weight: 600;
      color: var(--text-primary, #1e293b);
      margin-bottom: 0.25rem;
    }

    .activity-time {
      color: var(--text-secondary, #64748b);
      font-size: 0.9rem;
    }
  }
`;

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    company: 'VisiConnect',
    position: 'Développeur Senior',
    bio: 'Passionné de technologie et expert en communication digitale.',
    location: 'Paris, France'
  });

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'activity', label: 'Activité', icon: Clock },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const stats = [
    { icon: Video, value: '847', label: 'Réunions organisées' },
    { icon: Clock, value: '2,450', label: 'Minutes de réunion' },
    { icon: Users, value: '156', label: 'Participants uniques' },
    { icon: Star, value: '4.9', label: 'Note moyenne' }
  ];

  const notifications = [
    {
      icon: Bell,
      title: 'Notifications par email',
      description: 'Recevoir des notifications pour les nouvelles réunions',
      enabled: true
    },
    {
      icon: Phone,
      title: 'Notifications SMS',
      description: 'Recevoir des rappels par SMS',
      enabled: false
    },
    {
      icon: Calendar,
      title: 'Rappels calendrier',
      description: 'Synchroniser avec votre calendrier',
      enabled: true
    },
    {
      icon: Mail,
      title: 'Newsletter',
      description: 'Recevoir les dernières nouvelles VisiConnect',
      enabled: true
    }
  ];

  const activities = [
    {
      icon: Video,
      title: 'Réunion équipe marketing',
      time: 'Il y a 2 heures'
    },
    {
      icon: Users,
      title: 'Nouveau participant ajouté',
      time: 'Il y a 4 heures'
    },
    {
      icon: Settings,
      title: 'Paramètres mis à jour',
      time: 'Hier à 14:30'
    },
    {
      icon: Shield,
      title: 'Connexion sécurisée activée',
      time: 'Il y a 2 jours'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>
              <User size={28} />
              Mon Profil
            </SectionTitle>

            <ProfileSection>
              <Avatar>
                JD
                <div className="camera-icon">
                  <Camera size={16} />
                </div>
              </Avatar>
              
              <UserInfo>
                <div className="user-name">John Doe</div>
                <div className="user-email">john.doe@example.com</div>
                <div className="user-status">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                  Compte Premium Actif
                </div>
              </UserInfo>
              
              <Button
                variant={isEditing ? 'secondary' : 'primary'}
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? <X size={18} /> : <Edit3 size={18} />}
                {isEditing ? 'Annuler' : 'Modifier'}
              </Button>
            </ProfileSection>

            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(37, 99, 235, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stat-icon">
                    <stat.icon size={24} />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </StatCard>
              ))}
            </StatsGrid>

            <FormGrid>
              <FormGroup>
                <Label>Prénom</Label>
                <Input
                  type="text"
                  value={formData.firstName}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Nom</Label>
                <Input
                  type="text"
                  value={formData.lastName}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <Label>Téléphone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <Label>Entreprise</Label>
                <Input
                  type="text"
                  value={formData.company}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <Label>Poste</Label>
                <Input
                  type="text"
                  value={formData.position}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <Label>Localisation</Label>
              <Input
                type="text"
                value={formData.location}
                disabled={!isEditing}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label>Biographie</Label>
              <TextArea
                value={formData.bio}
                disabled={!isEditing}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Parlez-nous de vous..."
              />
            </FormGroup>

            {isEditing && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save size={18} />
                  Sauvegarder
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Annuler
                </Button>
              </div>
            )}
          </motion.div>
        );

      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>
              <Shield size={28} />
              Sécurité
            </SectionTitle>

            <Card>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary, #1e293b)' }}>
                Changer le mot de passe
              </h3>
              
              <PasswordSection>
                <FormGroup>
                  <Label>Mot de passe actuel</Label>
                  <div className="password-input">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <button 
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Nouveau mot de passe</Label>
                  <div className="password-input">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Confirmer le nouveau mot de passe</Label>
                  <div className="password-input">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                  </div>
                </FormGroup>

                <Button
                  variant="primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Key size={18} />
                  Mettre à jour le mot de passe
                </Button>
              </PasswordSection>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary, #1e293b)' }}>
                Authentification à deux facteurs
              </h3>
              <p style={{ color: 'var(--text-secondary, #64748b)', marginBottom: '2rem' }}>
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </p>
              
              <Button
                variant="primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap size={18} />
                Activer 2FA
              </Button>
            </Card>
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>
              <Bell size={28} />
              Notifications
            </SectionTitle>

            {notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="notification-info">
                  <div className="notification-icon">
                    <notification.icon size={20} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-description">{notification.description}</div>
                  </div>
                </div>
                <div className="notification-toggle">
                  <input type="checkbox" defaultChecked={notification.enabled} />
                </div>
              </NotificationItem>
            ))}
          </motion.div>
        );

      case 'activity':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>
              <Clock size={28} />
              Activité Récente
            </SectionTitle>

            <Card>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="activity-icon">
                    <activity.icon size={20} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </ActivityItem>
              ))}
            </Card>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Section en développement</SectionTitle>
            <p>Cette section sera bientôt disponible.</p>
          </motion.div>
        );
    }
  };

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mon Compte
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Gérez vos informations personnelles et paramètres de compte
        </Subtitle>
      </Header>

      <ContentContainer>
        <Sidebar
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon size={20} />
              {item.label}
            </NavItem>
          ))}
        </Sidebar>

        <MainContent
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </MainContent>
      </ContentContainer>

      <FooterUnified />
    </Container>
  );
};

export default AccountPage;