import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
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

export const ModalContent = styled(motion.div)`
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

export const ModalHeader = styled.div`
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

export const CloseButton = styled(motion.button)`
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

export const ModalBody = styled.div`
  padding: 2rem;
`;

export const FormSection = styled.div`
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

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
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

export const Input = styled.input`
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

export const TextArea = styled.textarea`
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

export const Select = styled.select`
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

export const ToggleSwitch = styled.div`
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

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ParticipantItem = styled.div`
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

export const AddParticipantButton = styled(motion.button)`
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

export const QuickTimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const TimeSlot = styled(motion.button)`
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

export const ModalFooter = styled.div`
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

export const ActionButton = styled(motion.button)`
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