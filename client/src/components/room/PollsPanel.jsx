import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { X, Plus, CheckCircle, Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const PanelContainer = styled.div`
  width: 320px;
  background-color: ${THEME.panelBg};
  border-left: 1px solid ${THEME.border};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${THEME.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-weight: 600;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PollCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  color: white;
`;

const PollMeta = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const Badge = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  background: ${(props) => props.$color || 'rgba(255,255,255,0.12)'};
  color: ${(props) => props.$textColor || 'rgba(255,255,255,0.7)'};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OptionBtn = styled.button`
  background: ${(props) =>
    props.$selected
      ? THEME.primary
      : props.$voted
        ? 'rgba(59, 130, 246, 0.18)'
        : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${(props) => (props.$selected ? THEME.primary : 'transparent')};
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 8px;
  color: white;
  margin-top: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${(props) => (props.$selected ? 600 : 400)};
  transform: ${(props) => (props.$selected ? 'scale(1.02)' : 'scale(1)')};
  box-shadow: ${(props) => (props.$selected ? `0 4px 12px ${THEME.primary}55` : 'none')};

  &:hover:not(:disabled) {
    background: ${(props) => (props.$voted ? THEME.primaryHover : 'rgba(255, 255, 255, 0.2)')};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: default;
  }
`;

const ProgressBar = styled.div`
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.08);
  margin-top: 4px;
  margin-left: 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${(props) => props.$pct}%;
    background: ${THEME.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 8px;
  outline: none;

  &:focus {
    border-color: ${THEME.primary};
  }
`;

const Button = styled.button`
  background: ${THEME.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  margin-top: 8px;
  transition: background 0.15s;

  &:hover {
    background: ${THEME.primaryHover};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${THEME.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition:
    color 0.15s,
    background 0.15s;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-of-type {
    border-bottom: none;
  }
`;

const ToggleLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Toggle = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 32px;
  height: 18px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;
  flex-shrink: 0;

  &:checked {
    background: ${THEME.primary};
    box-shadow: 0 0 0 2px ${THEME.primary}33;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s;
  }

  &:checked::after {
    left: 16px;
  }
`;

const OptionsSection = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 4px 10px 8px;
  margin: 10px 0 6px;
`;

const CreatorActions = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const SmallButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 8px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.$variant === 'danger' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)')};
  background: ${(props) =>
    props.$variant === 'danger' ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.05)'};
  color: ${(props) => (props.$variant === 'danger' ? '#f87171' : 'rgba(255,255,255,0.7)')};
  cursor: pointer;
  transition: all 0.15s;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: ${(props) =>
      props.$variant === 'danger' ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.12)'};
    color: ${(props) => (props.$variant === 'danger' ? '#fca5a5' : 'white')};
    border-color: ${(props) =>
      props.$variant === 'danger' ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.25)'};
  }
`;

export default function PollsPanel({ meetingId, currentUser, onClose, onPollCreated }) {
  const { t } = useTranslation();
  const polls = useQuery(api.polls.getPolls, { meetingId }) || [];
  const createPoll = useMutation(api.polls.createPoll);
  const votePoll = useMutation(api.polls.votePoll);
  const endPoll = useMutation(api.polls.endPoll);
  const toggleShowResults = useMutation(api.polls.toggleShowResults);

  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showResultsOnCreate, setShowResultsOnCreate] = useState(true);
  const [createError, setCreateError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Stocke l'option votée par poll, côté client (le backend ne le stocke pas)
  const [myVotes, setMyVotes] = useState(() => {
    try {
      const raw = localStorage.getItem('visiconnect_my_poll_votes');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const resetForm = () => {
    setIsCreating(false);
    setQuestion('');
    setOptions(['', '']);
    setIsAnonymous(false);
    setShowResultsOnCreate(true);
    setCreateError('');
  };

  const handleCreate = async () => {
    setCreateError('');
    const validOptions = options.filter((o) => o.trim() !== '');
    if (question.trim() === '') {
      setCreateError(t('room.polls.errEmptyQuestion', 'Veuillez saisir une question.'));
      return;
    }
    if (validOptions.length < 2) {
      setCreateError(t('room.polls.errMinOptions', 'Ajoutez au moins 2 options.'));
      return;
    }
    if (!meetingId) {
      // Defensive guard: in demo flows the meetingId might be missing if the
      // user landed directly on /meeting without a route param. Surface a
      // clear message rather than the opaque Convex 400.
      setCreateError(
        t(
          'room.polls.errNoMeeting',
          'Salle introuvable \u2014 rejoignez une r\u00e9union avant de cr\u00e9er un sondage.'
        )
      );
      return;
    }
    setIsLoading(true);
    try {
      await createPoll({
        meetingId,
        question: question.trim(),
        options: validOptions,
        createdBy: currentUser?.identity || t('room.polls.anonymous', 'Anonyme'),
        isAnonymous,
        showResults: showResultsOnCreate,
      });
      resetForm();
      if (onPollCreated) onPollCreated();
    } catch (err) {
      console.error('createPoll error:', err);
      // Convex surfaces validation errors via err.data; auth/network via err.message.
      const detail =
        err?.data?.message ||
        (typeof err?.data === 'string' ? err.data : null) ||
        err?.message ||
        t('room.polls.errUnknown', 'Erreur inconnue');
      const friendly = /unauth|forbidden|not authenticated/i.test(detail)
        ? t('room.polls.errAuth', 'Connectez-vous pour cr\u00e9er un sondage.')
        : /network|failed to fetch/i.test(detail)
          ? t('room.polls.errNetwork', 'Erreur r\u00e9seau \u2014 v\u00e9rifiez votre connexion.')
          : detail;
      setCreateError(
        `${t('room.polls.errCreate', 'Erreur lors de la cr\u00e9ation')} : ${friendly}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const totalVotes = (poll) => poll.options.reduce((acc, curr) => acc + curr.votes, 0);
  const isCreator = (poll) => poll.createdBy === currentUser.identity;

  return (
    <PanelContainer>
      <Header>
        <span>{t('room.polls.title', 'Sondages')}</span>
        <IconButton onClick={onClose}>
          <X size={20} />
        </IconButton>
      </Header>

      <Content>
        {!isCreating ? (
          <>
            <Button onClick={() => setIsCreating(true)}>
              <Plus size={18} /> {t('room.polls.create', 'Créer un sondage')}
            </Button>

            {polls.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                  marginTop: '24px',
                }}
              >
                {t('room.polls.empty', "Aucun sondage pour l'instant")}
              </div>
            )}

            {polls.map((poll) => {
              const hasVoted = poll.votedUsers?.includes(currentUser.identity);
              const total = totalVotes(poll);
              const canSeeResults =
                (poll.showResults ?? true) || !poll.isActive || hasVoted || isCreator(poll);

              return (
                <PollCard key={poll._id}>
                  {/* Title row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      gap: '8px',
                    }}
                  >
                    <h4 style={{ margin: 0, fontSize: '14px', flex: 1 }}>{poll.question}</h4>
                  </div>

                  {/* Badges */}
                  <PollMeta>
                    {!poll.isActive && (
                      <Badge $color="rgba(239,68,68,0.15)" $textColor="#f87171">
                        {t('room.polls.ended', 'Terminé')}
                      </Badge>
                    )}
                    {poll.isActive && (
                      <Badge $color="rgba(34,197,94,0.12)" $textColor="#4ade80">
                        {t('room.polls.active', 'En cours')}
                      </Badge>
                    )}
                    {poll.isAnonymous && (
                      <Badge>
                        <Lock size={9} /> {t('room.polls.anon', 'Anonyme')}
                      </Badge>
                    )}
                    {!(poll.showResults ?? true) &&
                      poll.isActive &&
                      !hasVoted &&
                      !isCreator(poll) && (
                        <Badge>
                          <EyeOff size={9} /> {t('room.polls.hidden', 'Résultats masqués')}
                        </Badge>
                      )}
                    <Badge $color="rgba(255,255,255,0.06)" $textColor="rgba(255,255,255,0.45)">
                      {total}{' '}
                      {t(
                        total !== 1 ? 'room.polls.votes' : 'room.polls.vote',
                        total !== 1 ? 'votes' : 'vote'
                      )}
                    </Badge>
                  </PollMeta>

                  {/* Options */}
                  {poll.options.map((opt) => {
                    const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                    const showPct = canSeeResults;
                    return (
                      <div key={opt.id}>
                        <OptionBtn
                          $voted={hasVoted}
                          $selected={hasVoted && myVotes[poll._id] === opt.id}
                          disabled={hasVoted || !poll.isActive}
                          onClick={async () => {
                            try {
                              await votePoll({
                                pollId: poll._id,
                                optionId: opt.id,
                                userId: currentUser.identity,
                              });
                              const next = { ...myVotes, [poll._id]: opt.id };
                              setMyVotes(next);
                              try {
                                localStorage.setItem(
                                  'visiconnect_my_poll_votes',
                                  JSON.stringify(next)
                                );
                              } catch {}
                            } catch (e) {
                              console.error('votePoll error:', e);
                            }
                          }}
                        >
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                          >
                            {hasVoted && myVotes[poll._id] === opt.id && (
                              <CheckCircle size={16} style={{ flexShrink: 0 }} />
                            )}
                            {opt.text}
                          </span>
                          {showPct && (
                            <span style={{ fontSize: '12px', opacity: 0.85 }}>{pct}%</span>
                          )}
                        </OptionBtn>
                        {showPct && <ProgressBar $pct={pct} />}
                      </div>
                    );
                  })}

                  {/* Message si résultats masqués */}
                  {!canSeeResults && (
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.35)',
                        marginTop: '8px',
                        textAlign: 'center',
                      }}
                    >
                      {t('room.polls.afterVote', 'Les résultats seront visibles après votre vote')}
                    </div>
                  )}

                  {/* Actions créateur */}
                  {isCreator(poll) && (
                    <CreatorActions>
                      {poll.isActive && (
                        <>
                          <SmallButton
                            title={
                              (poll.showResults ?? true)
                                ? t('room.polls.hideResults', 'Masquer les résultats')
                                : t('room.polls.showResults', 'Afficher les résultats')
                            }
                            onClick={() =>
                              toggleShowResults({
                                pollId: poll._id,
                                show: !(poll.showResults ?? true),
                              })
                            }
                          >
                            {(poll.showResults ?? true) ? (
                              <>
                                <EyeOff size={11} />{' '}
                                {t('room.polls.hideShort', 'Masquer résultats')}
                              </>
                            ) : (
                              <>
                                <Eye size={11} /> {t('room.polls.showShort', 'Afficher résultats')}
                              </>
                            )}
                          </SmallButton>
                          <SmallButton
                            $variant="danger"
                            onClick={() => endPoll({ pollId: poll._id })}
                            title={t('room.polls.close', 'Clôturer le sondage')}
                          >
                            <CheckCircle size={11} /> {t('room.polls.closeShort', 'Clôturer')}
                          </SmallButton>
                        </>
                      )}
                      {!poll.isActive && (
                        <SmallButton
                          onClick={() =>
                            toggleShowResults({
                              pollId: poll._id,
                              show: !(poll.showResults ?? true),
                            })
                          }
                        >
                          {(poll.showResults ?? true) ? (
                            <>
                              <EyeOff size={11} /> {t('room.polls.hideShort', 'Masquer résultats')}
                            </>
                          ) : (
                            <>
                              <Eye size={11} /> {t('room.polls.showShort', 'Afficher résultats')}
                            </>
                          )}
                        </SmallButton>
                      )}
                    </CreatorActions>
                  )}
                </PollCard>
              );
            })}
          </>
        ) : (
          <PollCard>
            <h4 style={{ margin: '0 0 14px 0' }}>{t('room.polls.newPoll', 'Nouveau sondage')}</h4>
            <Input
              placeholder={t('room.polls.questionPlaceholder', 'Votre question...')}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            {options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px' }}>
                <Input
                  placeholder={t('room.polls.optionPlaceholder', 'Option {{n}}', { n: i + 1 })}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[i] = e.target.value;
                    setOptions(newOpts);
                  }}
                />
                {options.length > 2 && (
                  <IconButton
                    onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
                    style={{ marginBottom: '8px' }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                )}
              </div>
            ))}

            <Button
              style={{
                background: 'transparent',
                border: `1px dashed ${THEME.primary}`,
                marginBottom: '12px',
              }}
              onClick={() => setOptions([...options, ''])}
            >
              <Plus size={16} /> {t('room.polls.addOption', 'Ajouter une option')}
            </Button>

            {/* Options avancées */}
            <OptionsSection>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                {t('room.polls.options', 'Options')}
              </div>
              <ToggleRow>
                <ToggleLabel>
                  <Lock size={13} /> {t('room.polls.anonymousVote', 'Vote anonyme')}
                </ToggleLabel>
                <Toggle checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
              </ToggleRow>
              <ToggleRow>
                <ToggleLabel>
                  <Eye size={13} /> {t('room.polls.showResultsOpt', 'Afficher les résultats')}
                </ToggleLabel>
                <Toggle
                  checked={showResultsOnCreate}
                  onChange={(e) => setShowResultsOnCreate(e.target.checked)}
                />
              </ToggleRow>
            </OptionsSection>

            {createError && (
              <div
                style={{
                  color: '#f87171',
                  fontSize: '12px',
                  marginTop: '8px',
                  padding: '6px 10px',
                  background: 'rgba(239,68,68,0.08)',
                  borderRadius: '6px',
                  border: '1px solid rgba(239,68,68,0.25)',
                }}
              >
                {createError}
              </div>
            )}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button
                style={{ background: THEME.surface }}
                onClick={resetForm}
                disabled={isLoading}
              >
                {t('room.polls.cancel', 'Annuler')}
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.6 : 1 }}
              >
                {isLoading
                  ? t('room.polls.creating', 'Création...')
                  : t('room.polls.submit', 'Créer')}
              </Button>
            </div>
          </PollCard>
        )}
      </Content>
    </PanelContainer>
  );
}
