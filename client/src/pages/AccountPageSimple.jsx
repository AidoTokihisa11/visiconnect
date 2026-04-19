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
import { useTranslation } from '../hooks/useTranslation';
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
  const { t } = useTranslation();
  
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
      showNotification(t('account.messages.avatarSuccess'));
    } catch (error) {
      console.error('Erreur image:', error);
      showNotification(t('account.messages.avatarError'), 'error');
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
      showNotification(t('account.messages.saveSuccess'));
    } catch (error) {
      console.error('Update error:', error);
      showNotification(t('account.messages.saveError'), 'error');
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
          <h3>{t('account.avatar.title')}</h3>
          <p>{t('account.avatar.desc')}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', padding: '0.4rem 0.75rem', background: '#f1f5f9', borderRadius: '2rem', fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>
            <Shield size={14} color="#2563eb" /> {t('account.securityManaged')}
          </div>
        </ProfilePictureInfo>
      </ProfilePictureSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <FormGroup>
          <Label><User size={18} /> {t('account.fields.displayName')}</Label>
          <InputWrapper>
            <Input 
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder={t('account.placeholders.displayName')}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Mail size={18} /> {t('account.fields.email')}</Label>
          <InputWrapper>
            <Input 
              type="email"
              value={user?.primaryEmailAddress?.emailAddress || ''}
              disabled
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Phone size={18} /> {t('account.fields.phone')}</Label>
          <InputWrapper>
            <Input 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t('account.placeholders.phone')}
            />
          </InputWrapper>
        </FormGroup>
        
        <FormGroup>
          <Label><MapPin size={18} /> {t('account.fields.location')}</Label>
          <InputWrapper>
            <Input 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder={t('account.placeholders.location')}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Building size={18} /> {t('account.fields.company')}</Label>
          <InputWrapper>
            <Input 
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder={t('account.placeholders.company')}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label><Briefcase size={18} /> {t('account.fields.position')}</Label>
          <InputWrapper>
            <Input 
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder={t('account.placeholders.position')}
            />
          </InputWrapper>
        </FormGroup>
      </div>
      
      <FormGroup style={{ marginTop: '0.5rem' }}>
        <Label><LinkIcon size={18} /> {t('account.fields.website')}</Label>
        <InputWrapper>
          <Input 
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder={t('account.placeholders.website')}
          />
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label>{t('account.fields.bio')}</Label>
        <TextArea 
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder={t('account.placeholders.bio')}
        />
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
          {t('account.bioHint')}
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
          {t('account.cancel')}
        </Button>
        <Button 
          type="submit" 
          disabled={isSaving}
          whileTap={{ scale: 0.98 }}
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? t('account.saving') : t('account.save')}
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
            <Title>{t('account.dashboard')}</Title>
            <Subtitle>{t('account.subtitle')}</Subtitle>
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
                <span>{activeTab === 'profile' ? t('account.tabs.profile') : t('account.tabs.security')}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>{t('account.menu')}</span>
            </MobileNavToggle>

            <Card style={{ padding: '0.5rem' }}>
              <NavMenu $isOpen={isMobileMenuOpen}>
                <NavItem
                  $active={activeTab === 'profile'}
                  onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                >
                  <User size={20} /> {t('account.tabs.profile')}
                </NavItem>
                <NavItem
                  $active={activeTab === 'security'}
                  onClick={() => { setActiveTab('security'); setIsMobileMenuOpen(false); }}
                >
                  <Shield size={20} /> {t('account.tabs.security')}
                </NavItem>
                <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }} />
                <NavItem onClick={handleSignOut} style={{ color: '#ef4444', borderLeftColor: 'transparent' }}>
                  <LogOut size={20} /> {t('account.logout')}
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
                {activeTab === 'profile' ? t('account.personalInfo') : t('account.securityTitle')}
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
                    {t('account.securityManaged')}
                  </h3>
                  <p style={{ color: '#64748b', maxWidth: '450px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.05rem' }}>
                    {t('account.securityDesc')}
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

