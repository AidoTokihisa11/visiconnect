import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  X, Settings as SettingsIcon, Video, 
  Monitor, Camera,
  Sliders, Shield, Bell
} from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Modal = styled(motion.div)`
  background: #111;
  border-radius: 20px;
  border: 1px solid #333;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
    border: none;
    background: #0a0a0a;
    height: 100vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #222;

  @media (max-width: 768px) {
    padding: 1rem;
    background: #111;
    border-bottom: 1px solid #333;
  }
`;

const Title = styled.h2`
  color: #3b82f6;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CloseButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #222;
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    background: #00ff88;
    color: #0a0a0a;
    border-color: #00ff88;
  }

  &:hover {
    background: #333;

    @media (max-width: 768px) {
      background: #00e67a;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background: #0a0a0a;
  border-right: 1px solid #222;
  padding: 1rem 0;

  @media (max-width: 768px) {
    width: 100%;
    background: #111;
    border-right: none;
    border-bottom: 1px solid #333;
    padding: 0.75rem;
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: #222;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #00ff88;
      border-radius: 2px;
    }
  }
`;

const SidebarItem = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'rgba(0, 255, 136, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#00ff88' : '#888'};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    min-width: 120px;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    gap: 0.5rem;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    background: ${props => props.active ? '#00ff88' : '#222'};
    color: ${props => props.active ? '#0a0a0a' : '#ccc'};
    border-radius: 12px;
    border: 1px solid ${props => props.active ? '#00ff88' : '#333'};
    white-space: nowrap;
  }

  &:hover {
    background: ${props => props.active ? 'rgba(0, 255, 136, 0.1)' : '#1a1a1a'};
    color: ${props => props.active ? '#00ff88' : 'white'};

    @media (max-width: 768px) {
      background: ${props => props.active ? '#00e67a' : '#333'};
      color: ${props => props.active ? '#0a0a0a' : 'white'};
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #222;
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff88;
    border-radius: 3px;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  .title {
    color: #3b82f6;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .description {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
  }
`;

const SettingGroup = styled.div`
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    background: #111;
    border: 1px solid #333;
    padding: 1rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 0.25rem;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }

  .description {
    color: #888;
    font-size: 0.8rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }

  .control {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
      justify-content: space-between;
      width: 100%;
    }
  }
`;

const Toggle = styled(motion.button)`
  width: 50px;
  height: 26px;
  border-radius: 13px;
  border: none;
  background: ${props => props.active ? '#00ff88' : '#333'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 56px;
    height: 30px;
    border-radius: 15px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      left: ${props => props.active ? '28px' : '2px'};
      width: 26px;
      height: 26px;
    }
  }
`;

const Slider = styled.input`
  width: 120px;
  height: 6px;
  border-radius: 3px;
  background: #333;
  outline: none;
  -webkit-appearance: none;

  @media (max-width: 768px) {
    flex: 1;
    height: 8px;
    background: #222;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #00ff88;
    cursor: pointer;

    @media (max-width: 768px) {
      width: 22px;
      height: 22px;
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #00ff88;
    cursor: pointer;
    border: none;

    @media (max-width: 768px) {
      width: 22px;
      height: 22px;
    }
  }
`;

const Select = styled.select`
  background: #222;
  border: 1px solid #333;
  border-radius: 8px;
  color: #3b82f6;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    border-color: #00ff88;
    background: #1a1a1a;
    border-radius: 10px;
  }

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
  }

  option {
    background: #222;
    color: #3b82f6;

    @media (max-width: 768px) {
      background: #1a1a1a;
    }
  }
`;

const DevicePreview = styled.div`
  background: #222;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 10px;
  }

  .preview-video {
    width: 100%;
    height: 200px;
    background: #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      height: 150px;
      background: #222;
      border: 1px solid #444;
    }
  }

  .audio-bars {
    display: flex;
    gap: 2px;
    height: 20px;
    align-items: end;

    @media (max-width: 768px) {
      height: 24px;
      gap: 3px;
    }

    .bar {
      width: 4px;
      background: #00ff88;
      border-radius: 2px;
      animation: audioLevel 0.5s infinite alternate;

      @media (max-width: 768px) {
        width: 5px;
      }

      &:nth-child(1) { height: 20%; animation-delay: 0s; }
      &:nth-child(2) { height: 40%; animation-delay: 0.1s; }
      &:nth-child(3) { height: 60%; animation-delay: 0.2s; }
      &:nth-child(4) { height: 80%; animation-delay: 0.3s; }
      &:nth-child(5) { height: 100%; animation-delay: 0.4s; }
    }
  }

  @keyframes audioLevel {
    0% { opacity: 0.3; }
    100% { opacity: 1; }
  }
`;

const Settings = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('audio-video');
  const [settings, setSettings] = useState({
    // Audio/Vidéo
    micEnabled: true,
    cameraEnabled: true,
    micVolume: 80,
    speakerVolume: 75,
    videoQuality: 'hd',
    audioQuality: 'high',
    noiseCancellation: true,
    echoCancellation: true,
    
    // Affichage
    theme: 'dark',
    language: 'fr',
    showParticipantNames: true,
    showConnectionQuality: true,
    gridLayout: 'auto',
    
    // Notifications
    soundNotifications: true,
    chatNotifications: true,
    participantJoinLeave: true,
    
    // Confidentialité
    shareAnalytics: false,
    recordingConsent: true,
    
    // Avancé
    bandwidth: 'auto',
    codec: 'auto',
    debugMode: false
  });

  const [devices, setDevices] = useState({
    microphones: [],
    cameras: [],
    speakers: []
  });

  useEffect(() => {
    // Simuler la récupération des périphériques
    setDevices({
      microphones: [
        { id: 'default', label: 'Microphone par défaut' },
        { id: 'mic1', label: 'Microphone intégré' },
        { id: 'mic2', label: 'Casque Bluetooth' }
      ],
      cameras: [
        { id: 'default', label: 'Caméra par défaut' },
        { id: 'cam1', label: 'Caméra intégrée' },
        { id: 'cam2', label: 'Webcam USB' }
      ],
      speakers: [
        { id: 'default', label: 'Haut-parleurs par défaut' },
        { id: 'speaker1', label: 'Haut-parleurs intégrés' },
        { id: 'speaker2', label: 'Casque Bluetooth' }
      ]
    });
  }, []);

  const tabs = [
    { id: 'audio-video', label: 'Audio', icon: <Video size={18} /> },
    { id: 'display', label: 'Affichage', icon: <Monitor size={18} /> },
    { id: 'notifications', label: 'Alertes', icon: <Bell size={18} /> },
    { id: 'privacy', label: 'Sécurité', icon: <Shield size={18} /> },
    { id: 'advanced', label: 'Avancé', icon: <Sliders size={18} /> }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderAudioVideoSettings = () => (
    <Section>
      <div className="title">Paramètres Audio & Vidéo</div>
      <div className="description">
        Configurez vos périphériques audio et vidéo pour une expérience optimale.
      </div>

      <SettingGroup>
        <SettingItem>
          <div>
            <div className="label">Microphone</div>
            <div className="description">Sélectionnez votre microphone</div>
          </div>
          <div className="control">
            <Select defaultValue="default">
              {devices.microphones.map(mic => (
                <option key={mic.id} value={mic.id}>{mic.label}</option>
              ))}
            </Select>
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Volume du microphone</div>
            <div className="description">{settings.micVolume}%</div>
          </div>
          <div className="control">
            <Slider
              type="range"
              min="0"
              max="100"
              value={settings.micVolume}
              onChange={(e) => updateSetting('micVolume', parseInt(e.target.value))}
            />
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Suppression du bruit</div>
            <div className="description">Réduire les bruits de fond</div>
          </div>
          <div className="control">
            <Toggle
              active={settings.noiseCancellation}
              onClick={() => updateSetting('noiseCancellation', !settings.noiseCancellation)}
            />
          </div>
        </SettingItem>
      </SettingGroup>

      <SettingGroup>
        <SettingItem>
          <div>
            <div className="label">Caméra</div>
            <div className="description">Sélectionnez votre caméra</div>
          </div>
          <div className="control">
            <Select defaultValue="default">
              {devices.cameras.map(cam => (
                <option key={cam.id} value={cam.id}>{cam.label}</option>
              ))}
            </Select>
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Qualité vidéo</div>
            <div className="description">Résolution de la vidéo</div>
          </div>
          <div className="control">
            <Select 
              value={settings.videoQuality}
              onChange={(e) => updateSetting('videoQuality', e.target.value)}
            >
              <option value="low">Basse (480p)</option>
              <option value="medium">Moyenne (720p)</option>
              <option value="hd">HD (1080p)</option>
              <option value="4k">4K (2160p)</option>
            </Select>
          </div>
        </SettingItem>
      </SettingGroup>

      <DevicePreview>
        <div className="preview-video">
          <Camera size={48} color="#666" />
        </div>
        <div className="audio-bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </DevicePreview>
    </Section>
  );

  const renderDisplaySettings = () => (
    <Section>
      <div className="title">Paramètres d'Affichage</div>
      <div className="description">
        Personnalisez l'apparence et la disposition de l'interface.
      </div>

      <SettingGroup>
        <SettingItem>
          <div>
            <div className="label">Disposition de la grille</div>
            <div className="description">Comment organiser les vidéos</div>
          </div>
          <div className="control">
            <Select 
              value={settings.gridLayout}
              onChange={(e) => updateSetting('gridLayout', e.target.value)}
            >
              <option value="auto">Automatique</option>
              <option value="grid">Grille</option>
              <option value="speaker">Orateur principal</option>
              <option value="gallery">Galerie</option>
            </Select>
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Afficher les noms</div>
            <div className="description">Noms des participants sur les vidéos</div>
          </div>
          <div className="control">
            <Toggle
              active={settings.showParticipantNames}
              onClick={() => updateSetting('showParticipantNames', !settings.showParticipantNames)}
            />
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Qualité de connexion</div>
            <div className="description">Indicateurs de réseau</div>
          </div>
          <div className="control">
            <Toggle
              active={settings.showConnectionQuality}
              onClick={() => updateSetting('showConnectionQuality', !settings.showConnectionQuality)}
            />
          </div>
        </SettingItem>
      </SettingGroup>
    </Section>
  );

  const renderNotificationSettings = () => (
    <Section>
      <div className="title">Notifications</div>
      <div className="description">
        Gérez les alertes et notifications pendant les réunions.
      </div>

      <SettingGroup>
        <SettingItem>
          <div>
            <div className="label">Sons de notification</div>
            <div className="description">Sons pour les événements</div>
          </div>
          <div className="control">
            <Toggle
              active={settings.soundNotifications}
              onClick={() => updateSetting('soundNotifications', !settings.soundNotifications)}
            />
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Notifications de chat</div>
            <div className="description">Alertes pour nouveaux messages</div>
          </div>
          <div className="control">
            <Toggle
              active={settings.chatNotifications}
              onClick={() => updateSetting('chatNotifications', !settings.chatNotifications)}
            />
          </div>
        </SettingItem>

        <SettingItem>
          <div>
            <div className="label">Entrées/Sorties</div>
            <div className="description">Notifications quand quelqu'un rejoint/quitte</div>
          </div>
          <div className="control">
            <Toggle
              active={settings.participantJoinLeave}
              onClick={() => updateSetting('participantJoinLeave', !settings.participantJoinLeave)}
            />
          </div>
        </SettingItem>
      </SettingGroup>
    </Section>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'audio-video':
        return renderAudioVideoSettings();
      case 'display':
        return renderDisplaySettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return renderAudioVideoSettings();
    }
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Modal
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>
            <SettingsIcon size={24} />
            Paramètres
          </Title>
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          <Sidebar>
            {tabs.map((tab) => (
              <SidebarItem
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.icon}
                {tab.label}
              </SidebarItem>
            ))}
          </Sidebar>

          <MainContent>
            {renderContent()}
          </MainContent>
        </Content>
      </Modal>
    </Overlay>
  );
};

export default Settings;
