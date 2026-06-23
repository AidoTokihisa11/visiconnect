import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ─── Design tokens — palette bleu/blanc site ─────────────────────────── */
const C = {
  bg: '#ffffff',
  surface: '#f8faff',
  border: '#dbeafe',
  borderFocus: '#2563eb',
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  primaryLight: '#eff6ff',
  text: '#0f172a',
  textMuted: '#64748b',
  textLight: '#94a3b8',
  danger: '#ef4444',
  dangerBg: '#fef2f2',
  success: '#16a34a',
  successBg: '#f0fdf4',
};

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalContent = styled(motion.div)`
  background: ${C.bg};
  border: 1px solid ${C.border};
  border-radius: 20px;
  width: 100%;
  max-width: 760px;
  max-height: 92vh;
  overflow-y: auto;
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.08),
    0 20px 60px -10px rgba(37, 99, 235, 0.18);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  @media (max-width: 600px) {
    border-radius: 16px;
    max-height: 97vh;
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${C.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  border-radius: 20px 20px 0 0;
  flex-shrink: 0;

  h2 {
    color: ${C.primary};
    font-size: 1.35rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    letter-spacing: -0.02em;
  }

  @media (max-width: 600px) {
    padding: 1.25rem;
    border-radius: 16px 16px 0 0;
    h2 {
      font-size: 1.1rem;
    }
  }
`;

export const CloseButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${C.border};
  background: ${C.bg};
  color: ${C.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    background: ${C.dangerBg};
    border-color: #fecaca;
    color: ${C.danger};
  }
`;

export const ModalBody = styled.div`
  padding: 1.75rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 600px) {
    padding: 1.25rem;
  }
`;

export const FormSection = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .section-title {
    color: ${C.text};
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.375rem;
  }

  .section-desc {
    color: ${C.textMuted};
    font-size: 0.85rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || '1fr'};
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    color: ${C.text};
    font-weight: 600;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .field-desc {
    color: ${C.textLight};
    font-size: 0.78rem;
    margin-top: 0.2rem;
    line-height: 1.4;
  }
`;

export const Input = styled.input`
  padding: 0.7rem 1rem;
  background: ${C.surface};
  border: 1.5px solid ${C.border};
  border-radius: 10px;
  color: ${C.text};
  font-size: 0.925rem;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${C.borderFocus};
    background: ${C.bg};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${C.textLight};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.7rem 1rem;
  background: ${C.surface};
  border: 1.5px solid ${C.border};
  border-radius: 10px;
  color: ${C.text};
  font-size: 0.925rem;
  min-height: 90px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${C.borderFocus};
    background: ${C.bg};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${C.textLight};
  }
`;

export const Select = styled.select`
  padding: 0.7rem 1rem;
  background: ${C.surface};
  border: 1.5px solid ${C.border};
  border-radius: 10px;
  color: ${C.text};
  font-size: 0.925rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${C.borderFocus};
    background-color: ${C.bg};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  option {
    background: white;
    color: ${C.text};
  }
`;

export const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;

  .switch {
    position: relative;
    width: 44px;
    height: 24px;
    background: ${(props) => (props.checked ? C.primary : '#cbd5e1')};
    border-radius: 12px;
    transition: background 0.25s;
    flex-shrink: 0;

    &::after {
      content: '';
      position: absolute;
      top: 3px;
      left: ${(props) => (props.checked ? '23px' : '3px')};
      width: 18px;
      height: 18px;
      background: white;
      border-radius: 50%;
      transition: left 0.25s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }

  .label {
    color: ${C.text};
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.7rem 0.875rem;
  background: ${C.surface};
  border: 1.5px solid ${C.border};
  border-radius: 12px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${C.primary};
  }

  .avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    min-width: 0;

    .name {
      color: ${C.text};
      font-weight: 600;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .email {
      color: ${C.textMuted};
      font-size: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .status-badge {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .status-pending {
    background: #fef9c3;
    color: #92400e;
    border: 1px solid #fde68a;
  }

  .status-sent {
    background: ${C.successBg};
    color: ${C.success};
    border: 1px solid #bbf7d0;
  }

  .remove {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    border: none;
    background: transparent;
    color: ${C.textLight};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;

    &:hover {
      background: ${C.dangerBg};
      color: ${C.danger};
    }
  }
`;

export const AddParticipantButton = styled(motion.button)`
  padding: 0.65rem 1rem;
  background: ${C.primary};
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-shrink: 0;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover {
    background: ${C.primaryHover};
  }
`;

export const QuickTimeSlots = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const TimeSlot = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: ${(props) => (props.selected ? C.primary : C.surface)};
  color: ${(props) => (props.selected ? 'white' : C.textMuted)};
  border: 1.5px solid ${(props) => (props.selected ? C.primary : C.border)};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.selected ? C.primaryHover : C.primaryLight)};
    border-color: ${C.primary};
    color: ${(props) => (props.selected ? 'white' : C.primary)};
  }
`;

export const ModalFooter = styled.div`
  padding: 1.25rem 2rem;
  border-top: 1px solid ${C.border};
  background: ${C.surface};
  border-radius: 0 0 20px 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .link-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.875rem;
    background: ${C.primaryLight};
    border: 1.5px dashed #2563eb;
    border-radius: 10px;
  }

  .link-label {
    color: ${C.textMuted};
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .link-value {
    color: ${C.primary};
    font-size: 0.8rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .copy-btn {
    padding: 0.3rem 0.65rem;
    background: ${C.primary};
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-shrink: 0;
    transition: background 0.2s;

    &:hover {
      background: ${C.primaryHover};
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    padding: 1rem 1.25rem;
    border-radius: 0 0 16px 16px;
    .actions {
      justify-content: stretch;
    }
  }
`;

export const ActionButton = styled(motion.button)`
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all 0.2s;
  white-space: nowrap;

  ${(props) =>
    props.primary
      ? `
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
    &:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.45);
      transform: translateY(-1px);
    }
  `
      : props.ghost
        ? `
    background: transparent;
    color: #64748b;
    border: 1.5px solid #e2e8f0;
    &:hover { background: #f8fafc; color: #0f172a; border-color: #cbd5e1; }
  `
        : `
    background: #eff6ff;
    color: #2563eb;
    border: 1.5px solid #dbeafe;
    &:hover { background: #dbeafe; }
  `}

  @media (max-width: 600px) {
    flex: 1;
    padding: 0.7rem 1rem;
  }
`;
