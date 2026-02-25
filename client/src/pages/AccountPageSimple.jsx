import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Edit3,
  Save,
  X
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useUserProfile } from '../hooks/useUserProfile';
import UserAPIService from '../services/UserAPIService';

const COLORS = {
  primary: '#2563eb',    // Blue 600
  secondary: '#475569',  // Slate 600
  dark: '#0f172a',       // Slate 900
  text: '#334155',       // Slate 700
  lightText: '#64748b',  // Slate 500
  background: '#f8fafc', // Slate 50
  white: '#ffffff',
  border: '#e2e8f0',     // Slate 200
  success: '#16a34a',    // Green 600
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.05);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const EditButton = styled(motion.button)`
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #64748b;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
`;

const AccountPageSimple = () => {
  const { 
    userProfile, 
    loading, 
    error,
    updateProfile
  } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    jobTitle: '',
    bio: '',
    location: '',
    website: ''
  });

  // Mettre à jour le formulaire quand les données arrivent
  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        company: userProfile.company || '',
        jobTitle: userProfile.jobTitle || '',
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        website: userProfile.website || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      await updateProfile(formData);
      
      setMessage('Profil mis à jour avec succès !');
      setIsEditing(false);
      
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      setMessage('Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Container>
        <HeaderClean />
        <Content>
          <LoadingMessage>Chargement de votre profil...</LoadingMessage>
        </Content>
        <FooterClean />
      </Container>
    );
  }

  const stats = userProfile ? UserAPIService.formatUserStats(userProfile.stats) : [];

  return (
    <Container>
      <HeaderClean />
      <Content>
        <Header>
          <Title>Mon Profil</Title>
          <Subtitle>Gérez vos informations personnelles et vos préférences</Subtitle>
        </Header>

        {message && (
          message.includes('succès') ? 
            <SuccessMessage>{message}</SuccessMessage> :
            <ErrorMessage>{message}</ErrorMessage>
        )}

        {error && <ErrorMessage>Erreur: {error}</ErrorMessage>}

        <ProfileSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileHeader>
            <Avatar>
              {userProfile?.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt="Avatar" />
              ) : (
                getInitials(userProfile?.displayName || userProfile?.email)
              )}
            </Avatar>
            
            <ProfileInfo>
              <ProfileName>
                {userProfile?.displayName || userProfile?.email?.split('@')[0] || 'Utilisateur'}
              </ProfileName>
              <ProfileEmail>{userProfile?.email}</ProfileEmail>
              
              {stats.length > 0 && (
                <ProfileStats>
                  {stats.slice(0, 3).map((stat, index) => (
                    <StatItem key={index}>
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatItem>
                  ))}
                </ProfileStats>
              )}
            </ProfileInfo>
            
            <EditButton
              onClick={() => setIsEditing(!isEditing)}
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isEditing ? <X size={18} /> : <Edit3 size={18} />}
              {isEditing ? 'Annuler' : 'Modifier'}
            </EditButton>
          </ProfileHeader>

          {isEditing && (
            <FormSection>
              <div>
                <FormGroup>
                  <Label>Nom d'affichage</Label>
                  <Input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    placeholder="Votre nom d'affichage"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Prénom</Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Votre prénom"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Nom</Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Votre nom"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Téléphone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                  />
                </FormGroup>
              </div>

              <div>
                <FormGroup>
                  <Label>Entreprise</Label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Nom de votre entreprise"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Poste</Label>
                  <Input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="Votre poste"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Localisation</Label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Ville, Pays"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Site web</Label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://votre-site.com"
                  />
                </FormGroup>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <FormGroup>
                  <Label>Biographie</Label>
                  <TextArea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Parlez-nous de vous..."
                  />
                </FormGroup>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <EditButton
                    onClick={handleSave}
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save size={18} />
                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </EditButton>
                </div>
              </div>
            </FormSection>
          )}
        </ProfileSection>
      </Content>
      
      <FooterClean />
    </Container>
  );
};

export default AccountPageSimple;