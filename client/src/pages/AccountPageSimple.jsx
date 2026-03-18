import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Camera, Mail, Building, Briefcase, 
  MapPin, Link as LinkIcon, Save, X, Phone,
  Loader2, LogOut, Shield, Menu
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useUserProfile } from '../hooks/useUserProfile';
import { useClerk, useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc; /* Fond clair */
  color: #334155; /* Texte foncé pour lisibilité */
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.main`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;
  text-align: left;

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #64748b;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 260px 1fr;
    gap: 2rem;
  }
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05); /* Ombre plus douce et moderne */
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`;

const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardBody = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
`;

/* Navigation Sidebar Styles */
const MobileNavToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  color: #0f172a;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 1023px) {
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: \${props => props.$active ? '#eff6ff' : 'transparent'};
  color: \${props => props.$active ? '#2563eb' : '#475569'};
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid \${props => props.$active ? '#2563eb' : 'transparent'};

  &:hover {
    background: ${props => props.$active ? '#eff6ff' : '#f8fafc'};
    color: ${props => props.$active ? '#2563eb' : '#0f172a'};
    transform: translateX(4px);
  }
`;

/* Form Styles */
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;

  svg {
    color: #2563eb;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background-color: #ffffff;
  color: #111827;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background-color: #ffffff;
  color: #111827;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const Button = styled(motion.button)`
  background-color: ${props => props.$variant === 'secondary' ? '#ffffff' : '#2563eb'};
  color: ${props => props.$variant === 'secondary' ? '#374151' : 'white'};
  border: ${props => props.$variant === 'secondary' ? '2px solid #e5e7eb' : 'none'};
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.$variant === 'secondary' ? '#f9fafb' : '#1d4ed8'};
    transform: translateY(-2px);
    box-shadow: ${props => props.$variant === 'secondary' ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.2)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* Profile Picture Upload */
const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;

  @media (min-width: 640px) {
    flex-direction: row;
    text-align: left;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const AvatarContainer = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 4px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
  flex-shrink: 0;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .fallback {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2563eb;
  }
`;

const UploadButton = styled.label`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: #2563eb;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  z-index: 10;
  
  &:hover {
    background: #1d4ed8;
    transform: scale(1.1);
  }
  
  input {
    display: none;
  }
`;

const ProfilePictureInfo = styled.div`
  flex: 1;
  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }
  p {
    font-size: 0.9rem;
    color: #64748b;
  }
`;

// Helper component for notifications
const Notification = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  left: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background: \${props => props.type === 'error' ? '#ef4444' : '#10b981'};
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;

  @media (min-width: 640px) {
    right: 2rem;
    left: auto;
    justify-content: flex-start;
  }
`;

const AccountPageSimple = () => {
  const { userProfile, loading, updateProfile } = useUserProfile();
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    phone: '',
    company: '',
    jobTitle: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    if (userProfile && !loading) {
      setFormData({
        displayName: userProfile.displayName || user?.fullName || '',
        bio: userProfile.bio || '',
        phone: userProfile.phone || '',
        company: userProfile.company || '',
        jobTitle: userProfile.jobTitle || '',
        location: userProfile.location || '',
        website: userProfile.website || ''
      });
    }
  }, [userProfile, loading, user]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;
    
    try {
      setIsSaving(true);
      await user.setProfileImage({ file });
      // Force Clerk à rafraîchir l'objet user récupéré
      await user.reload();
      showNotification('Photo de profil mise à jour avec succès !');
    } catch (error) {
      console.error('Erreur image:', error);
      showNotification('Erreur lors du changement de photo. La taille doit être inférieure à 10MB.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (user) {
        await user.update({
          firstName: formData.displayName.split(' ')[0] || '',
          lastName: formData.displayName.split(' ').slice(1).join(' ') || ''
        });
      }
      
      await updateProfile(formData);
      showNotification('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Update error:', error);
      showNotification('Erreur lors de la sauvegarde.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <PageWrapper>
        <HeaderClean />
        <ContentContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader2 className="animate-spin" size={48} color="#2563eb" />
        </ContentContainer>
        <FooterClean />
      </PageWrapper>
    );
  }

  const renderProfileTab = () => (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSave}
    >
      <ProfilePictureSection>
        <AvatarWrapper>
          <AvatarContainer whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            {user?.hasImage || user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" />
            ) : (
              <div className="fallback">{getInitials(formData.displayName)}</div>
            )}
          </AvatarContainer>
          <UploadButton>
            <Camera size={16} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </UploadButton>
        </AvatarWrapper>
        <ProfilePictureInfo>
          <h3>Photo de profil</h3>
          <p>Personnalisez votre avatar public. Formats acceptés : JPG, PNG, GIF, WEBP (Max 10MB).</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', padding: '0.4rem 0.75rem', background: '#f1f5f9', borderRadius: '2rem', fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>
            <Shield size={14} color="#2563eb" /> Sécurité gérée par Clerk
          </div>
        </ProfilePictureInfo>
      </ProfilePictureSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <FormGroup>
          <Label><User size={18} /> Pseudo / Nom d'affichage</Label>
          <InputWrapper>
            <Input 
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="Ex: TheoG"
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Mail size={18} /> Adresse Email (Lecture seule)</Label>
          <InputWrapper>
            <Input 
              type="email"
              value={user?.primaryEmailAddress?.emailAddress || ''}
              disabled
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Phone size={18} /> Téléphone</Label>
          <InputWrapper>
            <Input 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+33 6 12 34 56 78"
            />
          </InputWrapper>
        </FormGroup>
        
        <FormGroup>
          <Label><MapPin size={18} /> Localisation</Label>
          <InputWrapper>
            <Input 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Paris, France"
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Building size={18} /> Entreprise</Label>
          <InputWrapper>
            <Input 
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Nom de l'entreprise"
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Briefcase size={18} /> Poste / Profession</Label>
          <InputWrapper>
            <Input 
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Développeur, CEO..."
            />
          </InputWrapper>
        </FormGroup>
      </div>
      
      <FormGroup style={{ marginTop: '0.5rem' }}>
        <Label><LinkIcon size={18} /> Site Web</Label>
        <InputWrapper>
          <Input 
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://mon-site.fr"
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label>Description (Bio)</Label>
        <TextArea 
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Parlez de vous, vos compétences, vos passions..."
        />
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
          Apparaît sur votre profil public si vous en avez un.
        </p>
      </FormGroup>

      <ButtonsContainer>
        <Button
          type="button"
          $variant="secondary"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
             setFormData(prev => ({...prev, displayName: user?.fullName || ''}));
          }}
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          disabled={isSaving}
          whileTap={{ scale: 0.98 }}
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </ButtonsContainer>
    </motion.form>
  );

  return (
    <PageWrapper>
      <HeaderClean />
      <ContentContainer>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <HeaderSection>
            <Title>Tableau de bord</Title>
            <Subtitle>Gérez votre profil et vos préférences de compte.</Subtitle>
          </HeaderSection>
        </motion.div>

        <DashboardGrid>
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MobileNavToggle onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Menu size={20} color="#2563eb" />
                <span>{activeTab === 'profile' ? 'Mon Profil' : 'Sécurité & Connexion'}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>Menu</span>
            </MobileNavToggle>

            <Card style={{ padding: '0.5rem' }}>
              <NavMenu $isOpen={isMobileMenuOpen}>
                <NavItem
                  $active={activeTab === 'profile'}
                  onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                >
                  <User size={20} /> Mon Profil
                </NavItem>
                <NavItem
                  $active={activeTab === 'security'}
                  onClick={() => { setActiveTab('security'); setIsMobileMenuOpen(false); }}
                >
                  <Shield size={20} /> Sécurité & Connexion
                </NavItem>
                <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }} />
                <NavItem onClick={handleSignOut} style={{ color: '#ef4444', borderLeftColor: 'transparent' }}>
                  <LogOut size={20} /> Déconnexion
                </NavItem>
              </NavMenu>
            </Card>
          </motion.div>

          {/* Main Form Area */}
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle>
                {activeTab === 'profile' ? 'Informations Personnelles' : 'Sécurité du compte'}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <AnimatePresence mode="wait">
                {activeTab === 'profile' ? (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderProfileTab()}
                  </motion.div>
                ) : (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <Shield size={64} color="#2563eb" style={{ margin: '0 auto 1.5rem auto', opacity: 0.9 }} />
                  </motion.div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>
                    Sécurité gérée par Clerk
                  </h3>
                  <p style={{ color: '#64748b', maxWidth: '450px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.05rem' }}>
                    La sécurité de votre compte (mot de passe, authentification multi-facteurs) est gérée de manière totalement sécurisée et transparente par notre fournisseur d'identité partenaire.
                  </p>
                </div>
                  </motion.div>
              )}
            </AnimatePresence>
            </CardBody>
          </Card>
        </DashboardGrid>
      </ContentContainer>
      
      <FooterClean />
      
      <AnimatePresence>
        {notification && (
          <Notification
            type={notification.type}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {notification.message}
          </Notification>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default AccountPageSimple;

