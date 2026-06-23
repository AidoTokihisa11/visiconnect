import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { X, Plus, Trash2, Users, ArrowRight } from 'lucide-react';
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
const RoomCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  color: white;
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
const Input = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 8px;
  outline: none;
`;

export default function BreakoutRoomsPanel({ meetingId, activeParticipants = [], onClose }) {
  const { t } = useTranslation();
  const activeBreakout = useQuery(api.breakout.getActiveBreakout, { meetingId });
  const startBreakout = useMutation(api.breakout.startBreakout);
  const closeBreakout = useMutation(api.breakout.closeBreakout);

  const [rooms, setRooms] = useState([
    { id: 'room-1', name: t('room.breakout.room', 'Salle') + ' 1', participants: [] },
    { id: 'room-2', name: t('room.breakout.room', 'Salle') + ' 2', participants: [] },
  ]);

  const unassignedParticipants = activeParticipants.filter(
    (p) => !rooms.some((r) => r.participants.includes(p.identity))
  );

  const handleAssign = (roomId, participantId) => {
    setRooms((prev) =>
      prev.map((r) => ({
        ...r,
        participants:
          r.id === roomId
            ? [...r.participants, participantId]
            : r.participants.filter((id) => id !== participantId),
      }))
    );
  };

  const handleStart = async () => {
    await startBreakout({ meetingId, rooms });
  };

  const handleClose = async () => {
    await closeBreakout({ meetingId });
    setRooms([
      { id: 'room-1', name: t('room.breakout.room', 'Salle') + ' 1', participants: [] },
      { id: 'room-2', name: t('room.breakout.room', 'Salle') + ' 2', participants: [] },
    ]);
  };

  return (
    <PanelContainer>
      <Header>
        <span>{t('room.breakout.title', 'Salles de sous-commission')}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </Header>

      <Content>
        {activeBreakout ? (
          <div>
            <div
              style={{
                color: THEME.success,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{ width: 8, height: 8, borderRadius: '50%', background: THEME.success }}
              />
              {t('room.breakout.inProgress', 'Breakout sessions en cours')}
            </div>

            {activeBreakout.rooms.map((room) => (
              <RoomCard key={room.id} style={{ marginBottom: 16 }}>
                <h4>{room.name}</h4>
                <p style={{ fontSize: 12, opacity: 0.7 }}>
                  {room.participants.length} participant(s)
                </p>
                <div style={{ marginTop: 8 }}>
                  {room.participants.map((pid) => (
                    <div
                      key={pid}
                      style={{
                        fontSize: 13,
                        padding: '4px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {activeParticipants.find((p) => p.identity === pid)?.name || pid}
                    </div>
                  ))}
                </div>
              </RoomCard>
            ))}

            <Button style={{ background: THEME.danger }} onClick={handleClose}>
              {t('room.breakout.close', 'Clôturer les salles')}
            </Button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'white' }}>
                {t('room.breakout.unassigned', 'Participants non assignés')} (
                {unassignedParticipants.length})
              </h4>
              {unassignedParticipants.map((sp) => (
                <div
                  key={sp.identity}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    padding: 8,
                    borderRadius: 4,
                    marginBottom: 4,
                    color: 'white',
                    fontSize: 12,
                  }}
                >
                  <span>{sp.name || sp.identity}</span>
                  <select
                    style={{
                      background: THEME.bg,
                      color: 'white',
                      border: 'none',
                      padding: 4,
                      borderRadius: 4,
                    }}
                    onChange={(e) => handleAssign(e.target.value, sp.identity)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t('room.breakout.assignTo', 'Assigner à...')}
                    </option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {rooms.map((room, i) => (
              <RoomCard key={room.id} style={{ marginBottom: 16 }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Input
                    value={room.name}
                    onChange={(e) => {
                      const newRooms = [...rooms];
                      newRooms[i].name = e.target.value;
                      setRooms(newRooms);
                    }}
                    style={{ width: 'auto', margin: 0 }}
                  />
                </div>

                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {room.participants.map((pid) => (
                    <div
                      key={pid}
                      style={{
                        fontSize: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{activeParticipants.find((p) => p.identity === pid)?.name || pid}</span>
                      <button
                        onClick={() => {
                          setRooms((prev) =>
                            prev.map((r) =>
                              r.id === room.id
                                ? { ...r, participants: r.participants.filter((id) => id !== pid) }
                                : r
                            )
                          );
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: THEME.danger,
                          cursor: 'pointer',
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {room.participants.length === 0 && (
                    <span style={{ fontSize: 12, opacity: 0.5 }}>
                      {t('room.breakout.empty', 'Vide')}
                    </span>
                  )}
                </div>
              </RoomCard>
            ))}

            <Button
              style={{ background: 'transparent', border: `1px dashed ${THEME.primary}` }}
              onClick={() =>
                setRooms([
                  ...rooms,
                  {
                    id: `room-${rooms.length + 1}`,
                    name: `${t('room.breakout.room', 'Salle')} ${rooms.length + 1}`,
                    participants: [],
                  },
                ])
              }
            >
              <Plus size={16} /> {t('room.breakout.addRoom', 'Ajouter une salle')}
            </Button>

            <Button onClick={handleStart} style={{ marginTop: 24 }}>
              {t('room.breakout.start', 'Démarrer les sessions')}
            </Button>
          </div>
        )}
      </Content>
    </PanelContainer>
  );
}
