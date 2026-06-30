import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { apiFetch } from '../lib/apiClient';
import { AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Users,
  Video,
  Globe,
  MapPin,
  Bell,
  Repeat,
  Link,
  Copy,
  Settings,
  Plus,
  Minus,
  ChevronDown,
  Check,
  Loader2,
  AlertCircle,
  Mail,
  MessageSquare,
  Share2,
  Save,
  CheckCircle2,
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
  ActionButton,
} from './CreateMeetingModal.styles';

const CreateMeetingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [meetingId] = useState(() => Math.random().toString(36).slice(2, 11));
  const [linkCopied, setLinkCopied] = useState(false);
  const [timeError, setTimeError] = useState('');
  // Async state for the "Démarrer la réunion" submission.
  const [isStarting, setIsStarting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitInfo, setSubmitInfo] = useState('');
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
    participants: [],
  });

  const [newParticipantEmail, setNewParticipantEmail] = useState('');

  // Public meeting URL: routes to MeetingRoomPage (the actual conference room).
  const meetingLink = `${window.location.origin}/meeting/${meetingId}`;

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

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
    setTimeError(
      isTimeRangeValid
        ? ''
        : t(
            'createMeetingModal.errors.endBeforeStart',
            "L'heure de fin doit être après l'heure de début."
          )
    );
  }, [formData.startTime, formData.endTime, isTimeRangeValid, t]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
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
    // Returns { ok: boolean, error?: string } so the caller can aggregate results.
    try {
      const response = await apiFetch('/api/send-meeting-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: participant.email,
          name: participant.name,
          meetingId,
          meetingTitle:
            formData.title || t('createMeetingModal.defaultTitle', 'Réunion VisioConnect'),
          meetingLink,
          date: formData.date,
          startTime: formData.startTime,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        return { ok: false, error: body?.error || `HTTP ${response.status}` };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err?.message || 'network' };
    }
  };

  const addParticipant = () => {
    const normalizedEmail = newParticipantEmail.trim().toLowerCase();
    // Strict email validation — prevents "foo@bar" without TLD.
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(normalizedEmail)) {
      setSubmitError(t('createMeetingModal.errors.invalidEmail', 'Adresse email invalide.'));
      return;
    }

    setFormData((prev) => {
      const alreadyInvited = prev.participants.some(
        (p) => p.email.toLowerCase() === normalizedEmail
      );
      if (alreadyInvited) return prev;

      const newParticipant = {
        id: Date.now(),
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        status: 'pending', // becomes 'sent' once "Démarrer" is clicked
      };

      return {
        ...prev,
        participants: [...prev.participants, newParticipant],
      };
    });

    setSubmitError('');
    setNewParticipantEmail('');
  };

  const removeParticipant = (id) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
    }));
  };

  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitInfo('');
    // Block submission if time range is invalid.
    if (!isTimeRangeValid) {
      setTimeError(
        t(
          'createMeetingModal.errors.endBeforeStart',
          "L'heure de fin doit être après l'heure de début."
        )
      );
      return;
    }

    setIsStarting(true);
    try {
      // 1) Send invitations to every participant in parallel — each email
      //    contains the final title/date and a CTA pointing to /meeting/:id.
      const recipients = formData.participants || [];
      let sentCount = 0;
      let failed = [];
      if (recipients.length > 0) {
        const results = await Promise.all(recipients.map((p) => sendInviteEmail(p)));
        results.forEach((r, i) => {
          if (r.ok) sentCount += 1;
          else failed.push(recipients[i].email);
        });
        // Update participant statuses based on actual results.
        setFormData((prev) => ({
          ...prev,
          participants: prev.participants.map((p, i) => ({
            ...p,
            status: results[i]?.ok ? 'sent' : 'failed',
          })),
        }));
      }

      // 2) Persist meeting locally so dashboard widgets show recent activity.
      try {
        const STORAGE_KEY = 'visiconnect.recentMeetings';
        const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const entry = {
          id: meetingId,
          title: formData.title || t('createMeetingModal.defaultTitle', 'Réunion VisioConnect'),
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          link: meetingLink,
          participants: recipients.length,
          createdAt: Date.now(),
        };
        const next = [entry, ...previous.filter((m) => m.id !== meetingId)].slice(0, 25);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage may be unavailable — non-blocking
      }

      // 3) If some invites failed, surface a non-blocking warning but still
      //    let the host enter the room — they can resend manually later.
      if (failed.length > 0) {
        setSubmitInfo(
          t(
            'createMeetingModal.partialInvite',
            `Invitation envoyée à ${sentCount}/${recipients.length} participants. Échec : ${failed.join(', ')}`
          )
        );
      }

      onClose();
      navigate(`/meeting/${meetingId}`);
    } catch (err) {
      console.error('[CreateMeeting] handleSubmit failed:', err);
      setSubmitError(
        err?.message ||
          t(
            'createMeetingModal.errors.startFailed',
            'Impossible de démarrer la réunion. Réessayez.'
          )
      );
    } finally {
      setIsStarting(false);
    }
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
            <CloseButton onClick={onClose} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <X size={18} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <FormSection>
              <div className="section-title">
                <Video size={20} />
                {t('createMeetingModal.sections.general.title', 'Informations générales')}
              </div>
              <div className="section-desc">
                {t(
                  'createMeetingModal.sections.general.desc',
                  'Définissez les détails principaux de votre réunion'
                )}
              </div>

              <FormGrid columns="1fr">
                <FormField>
                  <label>{t('createMeetingModal.fields.title', 'Titre de la réunion')}</label>
                  <Input
                    type="text"
                    placeholder={t(
                      'createMeetingModal.placeholders.title',
                      'Ex: Réunion équipe marketing'
                    )}
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </FormField>

                <FormField>
                  <label>
                    {t('createMeetingModal.fields.description', 'Description (optionnel)')}
                  </label>
                  <TextArea
                    placeholder={t(
                      'createMeetingModal.placeholders.description',
                      'Ajoutez une description, un ordre du jour...'
                    )}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </FormField>
              </FormGrid>
            </FormSection>

            <FormSection>
              <div className="section-title">
                <Calendar size={20} />
                {t('createMeetingModal.sections.datetime.title', 'Date et heure')}
              </div>
              <div className="section-desc">
                {t(
                  'createMeetingModal.sections.datetime.desc',
                  'Planifiez quand aura lieu votre réunion'
                )}
              </div>

              <FormGrid columns="1fr 1fr 1fr">
                <FormField>
                  <label>{t('createMeetingModal.fields.date', 'Date')}</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </FormField>

                <FormField>
                  <label>{t('createMeetingModal.fields.startTime', 'Heure de début')}</label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </FormField>

                <FormField>
                  <label>{t('createMeetingModal.fields.endTime', 'Heure de fin')}</label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    style={timeError ? { borderColor: '#ef4444' } : undefined}
                  />
                </FormField>
              </FormGrid>

              {timeError && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px',
                    color: '#dc2626',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}
                >
                  ⚠️ {timeError}
                </div>
              )}

              <FormField>
                <label>{t('createMeetingModal.fields.quickSlots', 'Créneaux rapides')}</label>
                <QuickTimeSlots>
                  {timeSlots.map((time) => (
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
                {t('createMeetingModal.sections.participants.title', 'Participants')}
              </div>
              <div className="section-desc">
                {t(
                  'createMeetingModal.sections.participants.desc',
                  'Invitez des personnes à votre réunion'
                )}
              </div>

              <FormField>
                <label>
                  {t('createMeetingModal.fields.addParticipant', 'Ajouter un participant')}
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Input
                    type="email"
                    placeholder={t('createMeetingModal.placeholders.email', 'email@exemple.com')}
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
                    {t('createMeetingModal.buttons.add', 'Ajouter')}
                  </ActionButton>
                </div>
              </FormField>

              {formData.participants.length > 0 && (
                <ParticipantsList>
                  {formData.participants.map((participant) => (
                    <ParticipantItem key={participant.id}>
                      <div className="avatar">{participant.name.charAt(0).toUpperCase()}</div>
                      <div className="info">
                        <div className="name">{participant.name}</div>
                        <div className="email">{participant.email}</div>
                      </div>
                      <span
                        className={`status-badge ${
                          participant.status === 'sent'
                            ? 'status-sent'
                            : participant.status === 'failed'
                              ? 'status-pending'
                              : 'status-pending'
                        }`}
                      >
                        {participant.status === 'sent'
                          ? t('createMeetingModal.status.invited', '✓ Invité')
                          : participant.status === 'failed'
                            ? t('createMeetingModal.status.failed', 'Échec d’envoi')
                            : t('createMeetingModal.status.pending', 'En attente')}
                      </span>
                      <button className="remove" onClick={() => removeParticipant(participant.id)}>
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
                {t('createMeetingModal.sections.advanced.title', 'Paramètres avancés')}
              </div>
              <div className="section-desc">
                {t(
                  'createMeetingModal.sections.advanced.desc',
                  'Configurez les options de votre réunion'
                )}
              </div>

              <FormGrid columns="1fr 1fr">
                <FormField>
                  <label>{t('createMeetingModal.fields.meetingType', 'Type de réunion')}</label>
                  <Select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="video">
                      {t('createMeetingModal.types.video', 'Visioconférence')}
                    </option>
                    <option value="audio">
                      {t('createMeetingModal.types.audio', 'Audio uniquement')}
                    </option>
                    <option value="webinar">
                      {t('createMeetingModal.types.webinar', 'Webinaire')}
                    </option>
                    <option value="hybrid">
                      {t('createMeetingModal.types.hybrid', 'Hybride')}
                    </option>
                  </Select>
                </FormField>

                <FormField>
                  <label>
                    {t('createMeetingModal.fields.maxParticipants', 'Nombre max de participants')}
                  </label>
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
                    <div className="label">
                      {t('createMeetingModal.toggles.requireApproval.label', 'Approbation requise')}
                    </div>
                  </ToggleSwitch>
                  <div className="field-desc">
                    {t(
                      'createMeetingModal.toggles.requireApproval.desc',
                      'Les participants doivent être approuvés avant de rejoindre'
                    )}
                  </div>
                </FormField>

                <FormField>
                  <ToggleSwitch
                    checked={formData.allowRecording}
                    onClick={() => handleInputChange('allowRecording', !formData.allowRecording)}
                  >
                    <div className="switch" />
                    <div className="label">
                      {t(
                        'createMeetingModal.toggles.allowRecording.label',
                        "Autoriser l'enregistrement"
                      )}
                    </div>
                  </ToggleSwitch>
                  <div className="field-desc">
                    {t(
                      'createMeetingModal.toggles.allowRecording.desc',
                      "Permettre l'enregistrement de la réunion"
                    )}
                  </div>
                </FormField>
              </FormGrid>

              <FormField>
                <ToggleSwitch
                  checked={formData.recurring}
                  onClick={() => handleInputChange('recurring', !formData.recurring)}
                >
                  <div className="switch" />
                  <div className="label">
                    {t('createMeetingModal.toggles.recurring.label', 'Réunion récurrente')}
                  </div>
                </ToggleSwitch>
                <div className="field-desc">
                  {t(
                    'createMeetingModal.toggles.recurring.desc',
                    'Répéter cette réunion automatiquement'
                  )}
                </div>
              </FormField>

              {formData.recurring && (
                <FormField>
                  <label>
                    {t('createMeetingModal.fields.recurringFrequency', 'Fréquence de répétition')}
                  </label>
                  <Select
                    value={formData.recurringType}
                    onChange={(e) => handleInputChange('recurringType', e.target.value)}
                  >
                    <option value="daily">
                      {t('createMeetingModal.frequencies.daily', 'Quotidienne')}
                    </option>
                    <option value="weekly">
                      {t('createMeetingModal.frequencies.weekly', 'Hebdomadaire')}
                    </option>
                    <option value="monthly">
                      {t('createMeetingModal.frequencies.monthly', 'Mensuelle')}
                    </option>
                    <option value="custom">
                      {t('createMeetingModal.frequencies.custom', 'Personnalisée')}
                    </option>
                  </Select>
                </FormField>
              )}
            </FormSection>
          </ModalBody>

          <ModalFooter>
            {(submitError || submitInfo) && (
              <div
                role={submitError ? 'alert' : 'status'}
                style={{
                  margin: '0 0 0.75rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  background: submitError ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)',
                  border: `1px solid ${submitError ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                  color: submitError ? '#dc2626' : '#92400e',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{submitError || submitInfo}</span>
              </div>
            )}
            <div className="link-row">
              <span className="link-label">{t('createMeetingModal.linkLabel', 'Lien :')}</span>
              <span className="link-value">{meetingLink}</span>
              <button className={`copy-btn${linkCopied ? ' copied' : ''}`} onClick={copyLink}>
                {linkCopied ? (
                  <>
                    <Check size={12} /> {t('createMeetingModal.buttons.copied', 'Copié')}
                  </>
                ) : (
                  <>
                    <Copy size={12} /> {t('createMeetingModal.buttons.copy', 'Copier')}
                  </>
                )}
              </button>
            </div>

            <div className="actions">
              <ActionButton
                ghost
                onClick={onClose}
                disabled={isStarting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('createMeetingModal.buttons.cancel', 'Annuler')}
              </ActionButton>

              <ActionButton
                disabled={isStarting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={15} />
                {t('createMeetingModal.buttons.draft', 'Brouillon')}
              </ActionButton>

              <ActionButton
                primary
                onClick={handleSubmit}
                disabled={!isTimeRangeValid || isStarting}
                whileHover={isTimeRangeValid && !isStarting ? { scale: 1.02 } : undefined}
                whileTap={isTimeRangeValid && !isStarting ? { scale: 0.98 } : undefined}
                style={
                  !isTimeRangeValid || isStarting
                    ? { opacity: 0.7, cursor: 'not-allowed' }
                    : undefined
                }
              >
                {isStarting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />{' '}
                    {t('createMeetingModal.buttons.starting', 'Démarrage…')}
                  </>
                ) : (
                  <>
                    <Video size={15} />{' '}
                    {t('createMeetingModal.buttons.start', 'Démarrer la réunion')}
                  </>
                )}
              </ActionButton>
            </div>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default CreateMeetingModal;
