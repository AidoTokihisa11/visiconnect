import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, Users, Video, Globe,
  MapPin, Bell, Repeat, Link, Copy, Settings,
  Plus, Minus, ChevronDown, Check, Zap,
  Mail, MessageSquare, Share2, Save
} from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, #111, #0a0a0a);
  border: 1px solid #333;
  border-radius: 24px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: #00ff88;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const CloseButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: #222;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    color: #ff4444;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  .section-title {
    color: #3b82f6;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .section-desc {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #ccc;
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .field-desc {
    color: #666;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: #222;
  border: 1px solid #333;
  border-radius: 12px;
  color: #3b82f6;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    background: #1a1a1a;
  }

  &::placeholder {
    color: #666;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background: #222;
  border: 1px solid #333;
  border-radius: 12px;
  color: #3b82f6;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    background: #1a1a1a;
  }

  &::placeholder {
    color: #666;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: #222;
  border: 1px solid #333;
  border-radius: 12px;
  color: #3b82f6;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    background: #1a1a1a;
  }

  option {
    background: #222;
    color: #3b82f6;
  }
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .switch {
    position: relative;
    width: 50px;
    height: 26px;
    background: ${props => props.checked ? '#00ff88' : '#333'};
    border-radius: 13px;
    cursor: pointer;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: ${props => props.checked ? '26px' : '2px'};
      width: 22px;
      height: 22px;
      background: white;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
  }

  .label {
    color: #ccc;
    font-weight: 500;
  }
`;

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;

  .avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #00ff88, #00e67a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .info {
    flex: 1;

    .name {
      color: #3b82f6;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .email {
      color: #888;
      font-size: 0.85rem;
    }
  }

  .remove {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: #333;
      color: #ff4444;
    }
  }
`;

const AddParticipantButton = styled(motion.button)`
  padding: 0.75rem;
  background: transparent;
  border: 2px dashed #333;
  border-radius: 12px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
    background: rgba(0, 255, 136, 0.05);
  }
`;

const QuickTimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
`;

const TimeSlot = styled(motion.button)`
  padding: 0.75rem;
  background: ${props => props.selected ? '#00ff88' : '#222'};
  color: ${props => props.selected ? '#0a0a0a' : '#ccc'};
  border: 1px solid ${props => props.selected ? '#00ff88' : '#333'};
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.selected ? '#00e67a' : '#333'};
    border-color: #00ff88;
  }
`;

const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  .actions {
    display: flex;
    gap: 1rem;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #00ff88, #00e67a)' : 
    'transparent'};
  color: ${props => props.primary ? '#0a0a0a' : '#888'};
  border: ${props => props.primary ? 'none' : '1px solid #333'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? 
      'linear-gradient(135deg, #00e67a, #00d96b)' : 
      '#333'};
    color: ${props => props.primary ? '#0a0a0a' : 'white'};
  }
`;

const CreateMeetingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'Europe/Paris',
    type: 'video',
    recurring: false,
    recurringType: 'weekly',
    maxParticipants: 10,
    requireApproval: false,
    sendReminders: true,
    allowRecording: true,
    participants: []
  });

  const [newParticipantEmail, setNewParticipantEmail] = useState('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addParticipant = () => {
    if (newParticipantEmail && newParticipantEmail.includes('@')) {
      const newParticipant = {
        id: Date.now(),
        email: newParticipantEmail,
        name: newParticipantEmail.split('@')[0],
        status: 'pending'
      };
      
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, newParticipant]
      }));
      
      setNewParticipantEmail('');
    }
  };

  const removeParticipant = (id) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id)
    }));
  };

  const handleSubmit = () => {
    console.log('Création de réunion:', formData);
    // Ici on intégrerait avec l'API
    onClose();
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substr(2, 9);
    return `https://visio-pro.com/room/${meetingId}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader>
            <h2>
              <Zap size={24} />
              Créer une réunion
            </h2>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormSection>
              <div className="section-title">
                <Video size={20} />
                Informations générales
              </div>
              <div className="section-desc">
                Définissez les détails principaux de votre réunion
              </div>
              
              <FormGrid columns="1fr">
                <FormField>
                  <label>Titre de la réunion</label>
                  <Input
                    type="text"
                    placeholder="Ex: Réunion équipe marketing"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </FormField>
                
                <FormField>
                  <label>Description (optionnel)</label>
                  <TextArea
                    placeholder="Ajoutez une description, un ordre du jour..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </FormField>
              </FormGrid>
            </FormSection>

            <FormSection>
              <div className="section-title">
                <Calendar size={20} />
                Date et heure
              </div>
              <div className="section-desc">
                Planifiez quand aura lieu votre réunion
              </div>
              
              <FormGrid columns="1fr 1fr 1fr">
                <FormField>
                  <label>Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </FormField>
                
                <FormField>
                  <label>Heure de début</label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </FormField>
                
                <FormField>
                  <label>Heure de fin</label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </FormField>
              </FormGrid>

              <FormField>
                <label>Créneaux rapides</label>
                <QuickTimeSlots>
                  {timeSlots.map(time => (
                    <TimeSlot
                      key={time}
                      selected={formData.startTime === time}
                      onClick={() => {
                        handleInputChange('startTime', time);
                        const endTime = String(parseInt(time.split(':')[0]) + 1).padStart(2, '0') + ':00';
                        handleInputChange('endTime', endTime);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {time}
                    </TimeSlot>
                  ))}
                </QuickTimeSlots>
              </FormField>
            </FormSection>

            <FormSection>
              <div className="section-title">
                <Users size={20} />
                Participants
              </div>
              <div className="section-desc">
                Invitez des personnes à votre réunion
              </div>
              
              <FormField>
                <label>Ajouter un participant</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Input
                    type="email"
                    placeholder="email@exemple.com"
                    value={newParticipantEmail}
                    onChange={(e) => setNewParticipantEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                    style={{ flex: 1 }}
                  />
                  <ActionButton
                    onClick={addParticipant}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={16} />
                    Ajouter
                  </ActionButton>
                </div>
              </FormField>

              {formData.participants.length > 0 && (
                <ParticipantsList>
                  {formData.participants.map(participant => (
                    <ParticipantItem key={participant.id}>
                      <div className="avatar">
                        {participant.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="info">
                        <div className="name">{participant.name}</div>
                        <div className="email">{participant.email}</div>
                      </div>
                      <button
                        className="remove"
                        onClick={() => removeParticipant(participant.id)}
                      >
                        <X size={16} />
                      </button>
                    </ParticipantItem>
                  ))}
                </ParticipantsList>
              )}
            </FormSection>

            <FormSection>
              <div className="section-title">
                <Settings size={20} />
                Paramètres avancés
              </div>
              <div className="section-desc">
                Configurez les options de votre réunion
              </div>
              
              <FormGrid columns="1fr 1fr">
                <FormField>
                  <label>Type de réunion</label>
                  <Select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="video">Visioconférence</option>
                    <option value="audio">Audio uniquement</option>
                    <option value="webinar">Webinaire</option>
                    <option value="hybrid">Hybride</option>
                  </Select>
                </FormField>
                
                <FormField>
                  <label>Nombre max de participants</label>
                  <Input
                    type="number"
                    min="2"
                    max="1000"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                  />
                </FormField>
              </FormGrid>

              <FormGrid columns="1fr 1fr">
                <FormField>
                  <ToggleSwitch
                    checked={formData.requireApproval}
                    onClick={() => handleInputChange('requireApproval', !formData.requireApproval)}
                  >
                    <div className="switch" />
                    <div className="label">Approbation requise</div>
                  </ToggleSwitch>
                  <div className="field-desc">
                    Les participants doivent être approuvés avant de rejoindre
                  </div>
                </FormField>
                
                <FormField>
                  <ToggleSwitch
                    checked={formData.allowRecording}
                    onClick={() => handleInputChange('allowRecording', !formData.allowRecording)}
                  >
                    <div className="switch" />
                    <div className="label">Autoriser l'enregistrement</div>
                  </ToggleSwitch>
                  <div className="field-desc">
                    Permettre l'enregistrement de la réunion
                  </div>
                </FormField>
              </FormGrid>

              <FormField>
                <ToggleSwitch
                  checked={formData.recurring}
                  onClick={() => handleInputChange('recurring', !formData.recurring)}
                >
                  <div className="switch" />
                  <div className="label">Réunion récurrente</div>
                </ToggleSwitch>
                <div className="field-desc">
                  Répéter cette réunion automatiquement
                </div>
              </FormField>

              {formData.recurring && (
                <FormField>
                  <label>Fréquence de répétition</label>
                  <Select
                    value={formData.recurringType}
                    onChange={(e) => handleInputChange('recurringType', e.target.value)}
                  >
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                    <option value="custom">Personnalisée</option>
                  </Select>
                </FormField>
              )}
            </FormSection>
          </ModalBody>

          <ModalFooter>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>
              Lien de la réunion : {generateMeetingLink()}
            </div>
            
            <div className="actions">
              <ActionButton
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Annuler
              </ActionButton>
              
              <ActionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={16} />
                Brouillon
              </ActionButton>
              
              <ActionButton
                primary
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap size={16} />
                Créer la réunion
              </ActionButton>
            </div>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default CreateMeetingModal;
