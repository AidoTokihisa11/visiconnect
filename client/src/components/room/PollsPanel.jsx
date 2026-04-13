import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { X, Plus, CheckCircle, Trash2 } from 'lucide-react';

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
  
  &:hover {
    color: white;
  }
`;

export default function PollsPanel({ meetingId, currentUser, onClose }) {
  const polls = useQuery(api.polls.getPolls, { meetingId }) || [];
  const createPoll = useMutation(api.polls.createPoll);
  const votePoll = useMutation(api.polls.votePoll);
  const endPoll = useMutation(api.polls.endPoll);

  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleCreate = async () => {
    const validOptions = options.filter(o => o.trim() !== "");
    if (question.trim() === "" || validOptions.length < 2) return;
    
    await createPoll({
      meetingId,
      question,
      options: validOptions,
      createdBy: currentUser.identity || "Anonyme",
    });
    
    setIsCreating(false);
    setQuestion("");
    setOptions(["", ""]);
  };

  const totalVotes = (poll) => poll.options.reduce((acc, curr) => acc + curr.votes, 0);

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
            
            {polls.map(poll => {
              const hasVoted = poll.votedUsers?.includes(currentUser.identity);
              const total = totalVotes(poll);
              
              return (
                <PollCard key={poll._id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0 }}>{poll.question}</h4>
                    {poll.createdBy === currentUser.identity && poll.isActive && (
                      <IconButton onClick={() => endPoll({ pollId: poll._id })} title="Clôturer">
                        <CheckCircle size={16} />
                      </IconButton>
                    )}
                  </div>
                  
                  {!poll.isActive && <div style={{ fontSize: '12px', color: THEME.danger, marginBottom: '8px' }}>Sondage terminé</div>}
                  
                  {poll.options.map(opt => {
                    const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                    return (
                      <OptionBtn 
                        key={opt.id}
                        disabled={hasVoted || !poll.isActive}
                        onClick={() => votePoll({ pollId: poll._id, optionId: opt.id, userId: currentUser.identity })}
                      >
                        <span>{opt.text}</span>
                        {(hasVoted || !poll.isActive) && <span>{pct}% ({opt.votes})</span>}
                      </OptionBtn>
                    );
                  })}
                </PollCard>
              );
            })}
          </>
        ) : (
          <PollCard>
            <h4 style={{ margin: '0 0 16px 0' }}>Nouveau sondage</h4>
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
                  <IconButton onClick={() => setOptions(options.filter((_, idx) => idx !== i))} style={{ marginTop: '-8px' }}>
                    <Trash2 size={16} />
                  </IconButton>
                )}
              </div>
            ))}
            
            <Button style={{ background: 'transparent', border: `1px dashed ${THEME.primary}` }} onClick={() => setOptions([...options, ""])}>
              <Plus size={16} /> Ajouter une option
            </Button>
            
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <Button style={{ background: THEME.surface }} onClick={() => setIsCreating(false)}>Annuler</Button>
              <Button onClick={handleCreate}>Créer</Button>
            </div>
          </PollCard>
        )}
      </Content>
    </PanelContainer>
  );
}
