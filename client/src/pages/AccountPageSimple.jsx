import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import {
  PageWrapper,
  ContentContainer,
  HeaderSection,
  Title,
  Subtitle,
  DashboardGrid,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  MobileNavToggle,
  NavMenu,
  NavItem,
  FormGroup,
  Label,
  InputWrapper,
  Input,
  TextArea,
  ButtonsContainer,
  Button,
  ProfilePictureSection,
  AvatarWrapper,
  AvatarContainer,
  UploadButton,
  ProfilePictureInfo,
  Notification
} from './AccountPageSimple.styles';

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

  const buildProfileFormData = (profileData, metadata, fullName) => ({
    displayName: metadata.displayName || profileData.displayName || fullName || '',
    bio: metadata.bio || profileData.bio || '',
    phone: metadata.phone || profileData.phone || '',
    company: metadata.company || profileData.company || '',
    jobTitle: metadata.jobTitle || profileData.jobTitle || '',
    location: metadata.location || profileData.location || '',
    website: metadata.website || profileData.website || '',
  });

  useEffect(() => {
    if (loading || !userProfile || !user) return;
    const metadata = user.unsafeMetadata || {};
    setFormData(buildProfileFormData(userProfile, metadata, user.fullName));
  }, [loading, user, userProfile]);

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
        const [firstName = '', ...lastNameParts] = formData.displayName.split(' ');
        const lastName = lastNameParts.join(' ');

        try {
          await user.update({
            firstName,
            lastName,
          });
        } catch (clerkError) {
          console.warn("Mise à jour standard Clerk ignorée (paramètre first_name/last_name non activé sur votre dashboard Clerk): ", clerkError);
        }

        await user.update({
          unsafeMetadata: formData,
        });
        await user.reload();
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

