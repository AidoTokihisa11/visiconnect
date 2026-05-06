import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  User, Camera, Mail, Building, Briefcase, 
  MapPin, Link as LinkIcon, Save, X, Phone,
  Loader2, LogOut, Shield, Menu, CreditCard, Star, CheckCircle,
  Plus, ArrowRight, Video, Upload
} from 'lucide-react';
import CreateMeetingModal from '../components/CreateMeetingModal';
import WebcamCaptureModal from '../components/WebcamCaptureModal';
import DashboardOverview from '../components/DashboardOverview';
import Combobox from '../components/ui/Combobox';
import { COUNTRIES } from '../config/countries';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useUserProfile } from '../hooks/useUserProfile';
import { useClerk, useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { PLANS } from '../config/pricing';
import { BETA_CODES } from '../config/betaCodes';
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
  const { t, language } = useTranslation();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [planSwitching, setPlanSwitching] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinError, setJoinError] = useState('');

  const BETA_CODE_REGEX = /^VC-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

  const handleJoinRoom = (e) => {
    e.preventDefault();
    const id = joinRoomId.trim();
    if (!id) return;

    if (BETA_CODE_REGEX.test(id)) {
      const normalized = id.toUpperCase();
      if (BETA_CODES.includes(normalized)) {
        // Derive a unique, deterministic private room from the beta code
        const roomId = 'beta-' + normalized.replace(/[^A-Z0-9]/g, '').toLowerCase();
        navigate(`/room/${roomId}`);
      } else {
        setJoinError('Code bêta invalide ou déjà utilisé.');
      }
    } else {
      navigate(`/room/${id}`);
    }
  };

  const handleQuickCreate = () => {
    const id = Math.random().toString(36).substring(2, 9);
    navigate(`/room/${id}`);
  };
  
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    phone: '',
    phoneCountry: 'FR',
    company: '',
    jobTitle: '',
    location: '',
    locationCountry: '',
    website: ''
  });

  const buildProfileFormData = (profileData, metadata, fullName) => ({
    displayName: metadata.displayName || profileData.displayName || fullName || '',
    bio: metadata.bio || profileData.bio || '',
    phone: metadata.phone || profileData.phone || '',
    phoneCountry: metadata.phoneCountry || profileData.phoneCountry || 'FR',
    company: metadata.company || profileData.company || '',
    jobTitle: metadata.jobTitle || profileData.jobTitle || '',
    location: metadata.location || profileData.location || '',
    locationCountry: metadata.locationCountry || profileData.locationCountry || '',
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
    await uploadAvatarFile(file);
    // Reset input value so the same file can be re-uploaded if needed.
    e.target.value = '';
  };

  // Shared avatar upload routine (used by file picker + webcam capture).
  const uploadAvatarFile = async (file) => {
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
          <UploadButton title={t('account.avatar.upload', 'Téléverser une image')}>
            <Upload size={16} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </UploadButton>
        </AvatarWrapper>
        <ProfilePictureInfo>
          <h3>{t('account.avatar.title')}</h3>
          <p>{t('account.avatar.desc')}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setShowWebcamModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #2563eb',
                background: '#2563eb',
                color: 'white',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Camera size={14} /> {t('account.avatar.webcam', 'Prendre une photo')}
            </button>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', background: '#f1f5f9', borderRadius: '2rem', fontSize: '0.78rem', color: '#475569', fontWeight: '500' }}>
              <Shield size={13} color="#2563eb" /> {t('account.securityManaged')}
            </div>
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
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
            <div style={{ flex: '0 0 180px' }}>
              <Combobox
                value={formData.phoneCountry}
                onChange={(c) => setFormData((p) => ({ ...p, phoneCountry: c.code }))}
                items={COUNTRIES}
                getLabel={(c) => (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.05rem' }}>{c.flag}</span>
                    <span style={{ fontWeight: 600 }}>{c.dial}</span>
                    <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{c.name}</span>
                  </span>
                )}
                renderTrigger={(c) => (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.05rem' }}>{c.flag}</span>
                    <span style={{ fontWeight: 600 }}>{c.dial}</span>
                  </span>
                )}
                searchPlaceholder={t('account.fields.searchCountry', 'Rechercher un pays…')}
              />
            </div>
            <InputWrapper style={{ flex: 1 }}>
              <Input 
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="6 12 34 56 78"
              />
            </InputWrapper>
          </div>
        </FormGroup>
        
        <FormGroup>
          <Label><MapPin size={18} /> {t('account.fields.location')}</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Combobox
              value={formData.locationCountry}
              onChange={(c) => setFormData((p) => ({ ...p, locationCountry: c.code, location: p.location || c.name }))}
              items={COUNTRIES}
              getLabel={(c) => (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.05rem' }}>{c.flag}</span>
                  <span>{c.name}</span>
                </span>
              )}
              placeholder={t('account.placeholders.country', 'Sélectionner un pays…')}
              searchPlaceholder={t('account.fields.searchCountry', 'Rechercher un pays…')}
            />
            <InputWrapper>
              <Input 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t('account.placeholders.location')}
              />
            </InputWrapper>
          </div>
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

  const renderSubscriptionTab = () => {
    // Detect current plan from Clerk metadata
    const currentPlanId = user?.publicMetadata?.plan || user?.unsafeMetadata?.plan || 'starter';
    const currentPlan = PLANS[currentPlanId] || PLANS.starter;

    const tierColors = {
      starter: { bg: '#f1f5f9', border: '#cbd5e1', badge: '#64748b' },
      pro:     { bg: '#eff6ff', border: '#3b82f6', badge: '#2563eb' },
      business:{ bg: '#f0fdf4', border: '#22c55e', badge: '#16a34a' },
    };
    const colors = tierColors[currentPlanId] || tierColors.starter;

    const featuresByPlan = {
      starter: [
        t('billing.features.starter.0', "Jusqu'à 3 participants"),
        t('billing.features.starter.1', '45 min par réunion'),
        t('billing.features.starter.2', "Partage d'écran"),
      ],
      pro: [
        t('billing.features.pro.0', "Jusqu'à 50 participants"),
        t('billing.features.pro.1', 'Durée illimitée'),
        t('billing.features.pro.2', '5 Go stockage Cloud'),
        t('billing.features.pro.3', 'Support Email (24h)'),
        t('billing.features.pro.4', 'Transcriptions IA 10h/mois'),
      ],
      business: [
        t('billing.features.business.0', "Jusqu'à 200 participants"),
        t('billing.features.business.1', 'Durée illimitée'),
        t('billing.features.business.2', 'Stockage illimité'),
        t('billing.features.business.3', 'SSO & Admin avancé'),
        t('billing.features.business.4', 'Transcriptions illimitées'),
        t('billing.features.business.5', 'Support téléphonique dédié'),
      ],
    };

    const handleUpgrade = async (targetPlan) => {
      setPlanSwitching(true);
      try {
        const billingCycle = 'monthly';
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: targetPlan, billingCycle, userId: user?.id, userEmail: user?.primaryEmailAddress?.emailAddress || '', locale: language || (typeof navigator !== 'undefined' ? navigator.language : 'en') }),
        });
        const session = await res.json();
        if (session.error) { showNotification(session.error, 'error'); return; }
        if (session.url) window.location.href = session.url;
      } catch (err) {
        showNotification('Erreur lors de la redirection vers le paiement.', 'error');
      } finally {
        setPlanSwitching(false);
      }
    };

    const handleDowngrade = async () => {
      if (!window.confirm('Rétrograder vers le plan Starter ? Vous perdrez l\'accès aux fonctionnalités Pro/Business à la fin de votre période de facturation.')) return;
      setPlanSwitching(true);
      try {
        await user.update({
          unsafeMetadata: {
            ...(user.unsafeMetadata || {}),
            plan: 'starter',
            billingCycle: null,
            subscribedAt: null,
            downgradedAt: new Date().toISOString(),
          },
        });
        await user.reload();
        showNotification('Votre abonnement a été rétrogradé vers le plan Starter.');
      } catch (err) {
        showNotification('Erreur lors de la rétrogradation.', 'error');
      } finally {
        setPlanSwitching(false);
      }
    };

    return (
      <div style={{ padding: '1.5rem 0' }}>
        {/* Current plan card */}
        <div style={{
          background: colors.bg,
          border: `2px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Star size={24} color={colors.badge} fill={colors.badge} />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('billing.currentPlan', 'Plan actuel')}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>{currentPlan.name}</div>
              </div>
            </div>
            <div style={{ background: colors.badge, color: 'white', fontSize: '0.85rem', fontWeight: '700', padding: '0.35rem 1rem', borderRadius: '999px' }}>
              {currentPlan.priceMonthly === 0 ? t('billing.free', 'Gratuit') : `€${currentPlan.priceMonthly}${t('billing.perMonth', '/mois')}`}
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(featuresByPlan[currentPlanId] || []).map((feat, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                <CheckCircle size={16} color={colors.badge} /> {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* Plan selection grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {Object.values(PLANS).map(plan => {
            const isCurrentPlan = plan.id === currentPlanId;
            const planColor = tierColors[plan.id] || tierColors.starter;
            const isUpgrade = plan.priceMonthly > currentPlan.priceMonthly;
            const isDowngrade = plan.priceMonthly < currentPlan.priceMonthly && plan.id !== 'starter';
            return (
              <div key={plan.id} style={{
                background: isCurrentPlan ? planColor.bg : '#f8fafc',
                border: `1px solid ${isCurrentPlan ? planColor.border : '#e2e8f0'}`,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                {isCurrentPlan && (
                  <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: planColor.badge, color: 'white', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>{t('billing.currentBadge', 'Actuel')}</div>
                )}
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>{plan.name}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb' }}>
                  {plan.priceMonthly === 0 ? '€0' : `€${plan.priceMonthly}`}
                  <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#64748b' }}>{t('billing.perMonth', '/mois')}</span>
                </div>
                {!isCurrentPlan && (
                  <button
                    disabled={planSwitching}
                    onClick={() => isUpgrade || isDowngrade ? handleUpgrade(plan.id) : null}
                    style={{
                      marginTop: '0.25rem',
                      padding: '0.4rem 0.75rem',
                      background: isUpgrade ? planColor.badge : '#e2e8f0',
                      color: isUpgrade ? 'white' : '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      cursor: planSwitching ? 'not-allowed' : 'pointer',
                      opacity: planSwitching ? 0.7 : 1,
                    }}
                  >
                    {planSwitching
                      ? '…'
                      : isUpgrade
                        ? t('billing.upgradeAction', 'Passer à ce plan')
                        : t('billing.chooseAction', 'Choisir')}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Downgrade to starter */}
        {currentPlanId !== 'starter' && (
          <div style={{ textAlign: 'center' }}>
            <button
              disabled={planSwitching}
              onClick={handleDowngrade}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.82rem',
                cursor: planSwitching ? 'not-allowed' : 'pointer',
                textDecoration: 'underline',
              }}
            >
              {t('billing.downgradeToStarter', 'Rétrograder vers le plan Starter (gratuit)')}
            </button>
          </div>
        )}
      </div>
    );
  };

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
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.25rem', background: '#2563eb', color: 'white',
                  border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.95rem',
                  cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}
              >
                <Video size={17} /> {t('account.actions.createMeeting', 'Créer une réunion')}
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <form onSubmit={handleJoinRoom} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    value={joinRoomId}
                    onChange={e => { setJoinRoomId(e.target.value); setJoinError(''); }}
                    placeholder={t('account.actions.joinPlaceholder', 'ID de salle ou code bêta (VC-XXXX-XXXX)')}
                    style={{
                      padding: '0.6rem 1rem',
                      border: `1px solid ${joinError ? '#ef4444' : '#cbd5e1'}`,
                      borderRadius: '8px',
                      fontSize: '0.95rem', outline: 'none', width: '260px',
                      background: 'white', color: '#0f172a',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.6rem 1rem', background: 'white', color: '#2563eb',
                      border: '1px solid #2563eb', borderRadius: '8px', fontWeight: '600',
                      fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#eff6ff'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}
                  >
                    <ArrowRight size={16} /> {t('account.actions.join', 'Rejoindre')}
                  </button>
                </form>
                {joinError && (
                  <span style={{ fontSize: '0.8rem', color: '#ef4444', paddingLeft: '0.25rem' }}>
                    {joinError}
                  </span>
                )}
              </div>
            </div>
          </HeaderSection>
          <CreateMeetingModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
          <WebcamCaptureModal
            isOpen={showWebcamModal}
            onClose={() => setShowWebcamModal(false)}
            onCapture={uploadAvatarFile}
            title={t('account.avatar.webcamTitle', 'Capturer une photo de profil')}
          />
        </motion.div>

        <DashboardOverview
          user={user}
          currentPlan={PLANS[user?.publicMetadata?.plan || user?.unsafeMetadata?.plan || 'starter'] || PLANS.starter}
          onCreateMeeting={() => setShowCreateModal(true)}
          onJoinMeeting={(id) => navigate(`/room/${id}`)}
        />

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
                  $active={activeTab === 'subscription'}
                  onClick={() => { setActiveTab('subscription'); setIsMobileMenuOpen(false); }}
                >
                  <CreditCard size={20} /> {t('account.tabs.subscription', 'Mon Abonnement')}
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
                {activeTab === 'profile' ? t('account.personalInfo') : activeTab === 'subscription' ? t('account.tabs.subscription', 'Mon Abonnement') : t('account.securityTitle')}
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
                ) : activeTab === 'subscription' ? (
                  <motion.div
                    key="subscription"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderSubscriptionTab()}
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

