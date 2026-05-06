import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, Users, Video, Globe,
  MapPin, Bell, Repeat, Link, Copy, Settings,
  Plus, Minus, ChevronDown, Check,
  Mail, MessageSquare, Share2, Save, CheckCircle2
} from 'lucide-react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
  FormSection,
  FormGrid,
  FormField,
  Input,
  TextArea,
  Select,
  ToggleSwitch,
  ParticipantsList,
  ParticipantItem,
  AddParticipantButton,
  QuickTimeSlots,
  TimeSlot,
  ModalFooter,
  ActionButton
} from './CreateMeetingModal.styles';

const CreateMeetingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [meetingId] = useState(() => Math.random().toString(36).slice(2, 11));
  const [linkCopied, setLinkCopied] = useState(false);
  const [timeError, setTimeError] = useState('');
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

  const meetingLink = `${window.location.origin}/room/${meetingId}`;

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Helper: "HH:MM" -> minutes since midnight (returns null if invalid)
  const timeToMinutes = (hhmm) => {
    if (!hhmm || typeof hhmm !== 'string') return null;
    const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
    if (!match) return null;
    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    if (h < 0 || h > 23 || m < 0 || m > 59) return null;
    return h * 60 + m;
  };

  // Helper: minutes -> "HH:MM"
  const minutesToTime = (mins) => {
    const safe = ((mins % (24 * 60)) + 24 * 60) % (24 * 60);
    const h = String(Math.floor(safe / 60)).padStart(2, '0');
    const m = String(safe % 60).padStart(2, '0');
    return `${h}:${m}`;
  };

  const isTimeRangeValid = useMemo(() => {
    const s = timeToMinutes(formData.startTime);
    const e = timeToMinutes(formData.endTime);
    if (s === null || e === null) return true; // empty => no error yet
    return e > s;
  }, [formData.startTime, formData.endTime]);

  // Re-evaluate user-facing error message reactively.
  useEffect(() => {
    if (!formData.startTime || !formData.endTime) {
      setTimeError('');
      return;
    }
    setTimeError(isTimeRangeValid
      ? ''
      : t('createMeetingModal.errors.endBeforeStart', "L'heure de fin doit être après l'heure de début."));
  }, [formData.startTime, formData.endTime, isTimeRangeValid, t]);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      // When the user picks a start time and no end time is set (or end <= start),
      // auto-fill end = start + 30 min.
      if (field === 'startTime') {
        const startMins = timeToMinutes(value);
        const endMins = timeToMinutes(prev.endTime);
        if (startMins !== null && (endMins === null || endMins <= startMins)) {
          next.endTime = minutesToTime(startMins + 30);
        }
      }
      return next;
    });
  };

  const sendInviteEmail = async (participant) => {
    try {
      await fetch('/api/send-meeting-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: participant.email,
          name: participant.name,
          meetingId,
          meetingTitle: formData.title || 'Réunion VisiConnect',
          meetingLink,
          date: formData.date,
          startTime: formData.startTime,
        }),
      });
    } catch {
      // Invite will show as sent regardless; handle silently
    }
  };

  const addParticipant = () => {
    const normalizedEmail = newParticipantEmail.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) return;

    setFormData(prev => {
      const alreadyInvited = prev.participants.some(
        p => p.email.toLowerCase() === normalizedEmail
      );
      if (alreadyInvited) return prev;

      const newParticipant = {
        id: Date.now(),
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        status: 'sent'
      };

      sendInviteEmail(newParticipant);

      return {
        ...prev,
        participants: [...prev.participants, newParticipant]
      };
    });

    setNewParticipantEmail('');
  };

  const removeParticipant = (id) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id)
    }));
  };

  const handleSubmit = () => {
    // Block submission if time range is invalid.
    if (!isTimeRangeValid) {
      setTimeError(t('createMeetingModal.errors.endBeforeStart', "L'heure de fin doit être après l'heure de début."));
      return;
    }
    onClose();
    // Use react-router navigation to keep the SPA state
    // (window.location.href would do a full page reload).
    navigate(`/room/${meetingId}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(meetingLink).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const generateMeetingLink = () => meetingLink;

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
              <Video size={22} />
              {t('createMeetingModal.title', 'Créer une réunion')}
            </h2>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={18} />
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
                    style={timeError ? { borderColor: '#ef4444' } : undefined}
                  />
                </FormField>
              </FormGrid>

              {timeError && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}>
                  ⚠️ {timeError}
                </div>
              )}

              <FormField>
                <label>Créneaux rapides</label>
                <QuickTimeSlots>
                  {timeSlots.map(time => (
                    <TimeSlot
                      key={time}
                      selected={formData.startTime === time}
                      onClick={() => {
                        // Use the same handler so end-time auto-fill stays consistent.
                        handleInputChange('startTime', time);
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
                    onChange={(event) => setNewParticipantEmail(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        addParticipant();
                      }
                    }}
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
                      <span className={`status-badge ${participant.status === 'sent' ? 'status-sent' : 'status-pending'}`}>
                        {participant.status === 'sent' ? '✓ Invité' : 'En attente'}
                      </span>
                      <button
                        className="remove"
                        onClick={() => removeParticipant(participant.id)}
                      >
                        <X size={15} />
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
            <div className="link-row">
              <span className="link-label">Lien :</span>
              <span className="link-value">{meetingLink}</span>
              <button className={`copy-btn${linkCopied ? ' copied' : ''}`} onClick={copyLink}>
                {linkCopied ? <><Check size={12} /> Copié</> : <><Copy size={12} /> Copier</>}
              </button>
            </div>

            <div className="actions">
              <ActionButton
                ghost
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
                <Save size={15} />
                Brouillon
              </ActionButton>
              
              <ActionButton
                primary
                onClick={handleSubmit}
                disabled={!isTimeRangeValid}
                whileHover={isTimeRangeValid ? { scale: 1.02 } : undefined}
                whileTap={isTimeRangeValid ? { scale: 0.98 } : undefined}
                style={!isTimeRangeValid ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
              >
                <Video size={15} />
                Démarrer la réunion
              </ActionButton>
            </div>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default CreateMeetingModal;
