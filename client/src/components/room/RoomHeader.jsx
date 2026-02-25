import React from 'react';
import styled from 'styled-components';
import { Shield, Signal, Users, Cpu, Activity } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const HeaderContainer = styled.header`
  height: 72px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${THEME.border};
  background-color: ${THEME.bg};
  z-index: 10;
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
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(16, 185, 129, 0.2);
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
    </HeaderContainer>
  );
};
