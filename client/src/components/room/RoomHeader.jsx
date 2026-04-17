import React, { useState } from 'react';
import styled from 'styled-components';
import { Shield, Signal, Users, Cpu, Copy, Check } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { InviteModal } from './InviteModal';

const HeaderContainer = styled.header`
  flex-shrink: 0; /* Ne jamais shrink */
  height: 72px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${THEME.border};
  background-color: ${THEME.cardBg};
  z-index: 10;
  
  @media (max-width: 768px) {
    height: 60px;
    padding: 0 1rem;
  }
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const RoomName = styled.h1`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${THEME.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${THEME.accentSoft};
  color: #059669;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const InviteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${THEME.accentSoft};
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${THEME.accentSoft};
  }
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  .status-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.875rem;
    color: ${THEME.textDim};
    font-weight: 500;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const RoomHeader = ({ roomName, isSecure, participantCount, quality }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenInvite = () => {
    setIsModalOpen(true);
  };

  return (
    <HeaderContainer>
      <RoomInfo>
        <RoomName>
          {roomName || 'Réunion en cours'}
          {isSecure && (
            <SecureBadge>
              <Shield size={14} />
              Sécurisé (E2EE)
            </SecureBadge>
          )}
        </RoomName>
        <InviteButton onClick={handleOpenInvite} title="Inviter des participants">
          Inviter
        </InviteButton>
      </RoomInfo>

      <ConnectionStatus>
        <div className="status-item" title="Participants">
          <Users />
          <span>{participantCount || 1}</span>
        </div>

        <div className="status-item" title="Qualité du signal">
          <Signal className={quality === 'excellent' ? 'text-green-500' : 'text-yellow-500'} />
          <span>{quality === 'excellent' ? 'HD Stable' : 'Standard'}</span>     
        </div>

        <div className="status-item" title="Performance">
          <Cpu />
          <span>Optimisé</span>
        </div>
      </ConnectionStatus>

      <InviteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </HeaderContainer>  );
};