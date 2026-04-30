import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { X, Plus, CheckCircle, Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';

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
  background: ${props => props.$color || 'rgba(255,255,255,0.12)'};
  color: ${props => props.$textColor || 'rgba(255,255,255,0.7)'};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OptionBtn = styled.button`
  background: ${props => props.$voted ? THEME.primary : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  margin-top: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s;
  
  &:hover:not(:disabled) {
    background: ${props => props.$voted ? THEME.primaryHover : 'rgba(255, 255, 255, 0.2)'};
  }
  
  &:disabled {
    cursor: default;
  }
`;

const ProgressBar = styled.div`
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.08);
  margin-top: 4px;
  margin-left: 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.$pct}%;
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
  transition: color 0.15s, background 0.15s;
  
  &:hover {
    color: white;
    background: rgba(255,255,255,0.08);
  }
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
  color: rgba(255,255,255,0.75);
  font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.06);

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
  background: ${props => props.checked ? THEME.primary : 'rgba(255,255,255,0.15)'};
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '16px' : '2px'};
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s;
  }
`;

const OptionsSection = styled.div`
  background: rgba(0,0,0,0.15);
  border-radius: 6px;
  padding: 4px 10px 8px;
  margin: 10px 0 6px;
`;

const CreatorActions = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.08);
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
  border: 1px solid ${props => props.$variant === 'danger' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)'};
  background: ${props => props.$variant === 'danger' ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.05)'};
  color: ${props => props.$variant === 'danger' ? '#f87171' : 'rgba(255,255,255,0.7)'};
  cursor: pointer;
  transition: all 0.15s;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: ${props => props.$variant === 'danger' ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.12)'};
    color: ${props => props.$variant === 'danger' ? '#fca5a5' : 'white'};
    border-color: ${props => props.$variant === 'danger' ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.25)'};
  }
`;

export default function PollsPanel({ meetingId, currentUser, onClose, onPollCreated }) {
  const polls = useQuery(api.polls.getPolls, { meetingId }) || [];
  const createPoll = useMutation(api.polls.createPoll);
  const votePoll = useMutation(api.polls.votePoll);
  const endPoll = useMutation(api.polls.endPoll);
  const toggleShowResults = useMutation(api.polls.toggleShowResults);

  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showResultsOnCreate, setShowResultsOnCreate] = useState(true);

  const handleCreate = async () => {
    const validOptions = options.filter(o => o.trim() !== "");
    if (question.trim() === "" || validOptions.length < 2) return;
    
    await createPoll({
      meetingId,
      question,
      options: validOptions,
      createdBy: currentUser.identity || "Anonyme",
      isAnonymous,
      showResults: showResultsOnCreate,
    });
    
    setIsCreating(false);
    setQuestion("");
    setOptions(["", ""]);
    setIsAnonymous(false);
    setShowResultsOnCreate(true);
    if (onPollCreated) onPollCreated();
  };

  const totalVotes = (poll) => poll.options.reduce((acc, curr) => acc + curr.votes, 0);
  const isCreator = (poll) => poll.createdBy === currentUser.identity;

  return (
    <PanelContainer>
      <Header>
        <span>Sondages</span>
        <IconButton onClick={onClose}><X size={20} /></IconButton>
      </Header>
      
      <Content>
        {!isCreating ? (
          <>
            <Button onClick={() => setIsCreating(true)}>
              <Plus size={18} /> Créer un sondage
            </Button>
            
            {polls.length === 0 && (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '24px' }}>
                Aucun sondage pour l'instant
              </div>
            )}

            {polls.map(poll => {
              const hasVoted = poll.votedUsers?.includes(currentUser.identity);
              const total = totalVotes(poll);
              const canSeeResults = (poll.showResults ?? true) || !poll.isActive || hasVoted || isCreator(poll);
              
              return (
                <PollCard key={poll._id}>
                  {/* Title row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', flex: 1 }}>{poll.question}</h4>
                  </div>

                  {/* Badges */}
                  <PollMeta>
                    {!poll.isActive && (
                      <Badge $color="rgba(239,68,68,0.15)" $textColor="#f87171">Terminé</Badge>
                    )}
                    {poll.isActive && (
                      <Badge $color="rgba(34,197,94,0.12)" $textColor="#4ade80">En cours</Badge>
                    )}
                    {poll.isAnonymous && (
                      <Badge><Lock size={9} /> Anonyme</Badge>
                    )}
                    {!(poll.showResults ?? true) && poll.isActive && !hasVoted && !isCreator(poll) && (
                      <Badge><EyeOff size={9} /> Résultats masqués</Badge>
                    )}
                    <Badge $color="rgba(255,255,255,0.06)" $textColor="rgba(255,255,255,0.45)">
                      {total} vote{total !== 1 ? 's' : ''}
                    </Badge>
                  </PollMeta>

                  {/* Options */}
                  {poll.options.map(opt => {
                    const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                    const showPct = canSeeResults;
                    return (
                      <div key={opt.id}>
                        <OptionBtn 
                          $voted={hasVoted}
                          disabled={hasVoted || !poll.isActive}
                          onClick={() => votePoll({ pollId: poll._id, optionId: opt.id, userId: currentUser.identity })}
                        >
                          <span>{opt.text}</span>
                          {showPct && <span style={{ fontSize: '12px', opacity: 0.75 }}>{pct}%</span>}
                        </OptionBtn>
                        {showPct && <ProgressBar $pct={pct} />}
                      </div>
                    );
                  })}

                  {/* Message si résultats masqués */}
                  {!canSeeResults && (
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '8px', textAlign: 'center' }}>
                      Les résultats seront visibles après votre vote
                    </div>
                  )}

                  {/* Actions créateur */}
                  {isCreator(poll) && (
                    <CreatorActions>
                      {poll.isActive && (
                        <>
                          <SmallButton
                            title={(poll.showResults ?? true) ? 'Masquer les résultats' : 'Afficher les résultats'}
                            onClick={() => toggleShowResults({ pollId: poll._id, show: !(poll.showResults ?? true) })}
                          >
                            {(poll.showResults ?? true) ? <><EyeOff size={11} /> Masquer résultats</> : <><Eye size={11} /> Afficher résultats</>}
                          </SmallButton>
                          <SmallButton $variant="danger" onClick={() => endPoll({ pollId: poll._id })} title="Clôturer le sondage">
                            <CheckCircle size={11} /> Clôturer
                          </SmallButton>
                        </>
                      )}
                      {!poll.isActive && (
                        <SmallButton
                          onClick={() => toggleShowResults({ pollId: poll._id, show: !(poll.showResults ?? true) })}
                        >
                          {(poll.showResults ?? true) ? <><EyeOff size={11} /> Masquer résultats</> : <><Eye size={11} /> Afficher résultats</>}
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
            <h4 style={{ margin: '0 0 14px 0' }}>Nouveau sondage</h4>
            <Input 
              placeholder="Votre question..." 
              value={question} 
              onChange={e => setQuestion(e.target.value)} 
            />
            
            {options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px' }}>
                <Input 
                  placeholder={`Option ${i + 1}`} 
                  value={opt} 
                  onChange={e => {
                    const newOpts = [...options];
                    newOpts[i] = e.target.value;
                    setOptions(newOpts);
                  }} 
                />
                {options.length > 2 && (
                  <IconButton onClick={() => setOptions(options.filter((_, idx) => idx !== i))} style={{ marginBottom: '8px' }}>
                    <Trash2 size={16} />
                  </IconButton>
                )}
              </div>
            ))}
            
            <Button style={{ background: 'transparent', border: `1px dashed ${THEME.primary}`, marginBottom: '12px' }} onClick={() => setOptions([...options, ""])}>
              <Plus size={16} /> Ajouter une option
            </Button>

            {/* Options avancées */}
            <OptionsSection>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Options</div>
              <ToggleRow>
                <ToggleLabel><Lock size={13} /> Vote anonyme</ToggleLabel>
                <Toggle checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} />
              </ToggleRow>
              <ToggleRow>
                <ToggleLabel><Eye size={13} /> Afficher les résultats</ToggleLabel>
                <Toggle checked={showResultsOnCreate} onChange={e => setShowResultsOnCreate(e.target.checked)} />
              </ToggleRow>
            </OptionsSection>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button style={{ background: THEME.surface }} onClick={() => { setIsCreating(false); setIsAnonymous(false); setShowResultsOnCreate(true); }}>Annuler</Button>
              <Button onClick={handleCreate}>Créer</Button>
            </div>
          </PollCard>
        )}
      </Content>
    </PanelContainer>
  );
}


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

const OptionBtn = styled.button`
  background: ${props => props.$voted ? THEME.primary : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  margin-top: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  
  &:hover {
    background: ${props => props.$voted ? THEME.primaryHover : 'rgba(255, 255, 255, 0.2)'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: default;
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
  transition: color 0.15s, background 0.15s;
  
  &:hover {
    color: white;
    background: rgba(255,255,255,0.08);
  }
`;
