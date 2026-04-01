import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  color: #334155;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.main`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const HeaderSection = styled.div`
  margin-bottom: 2rem;
  text-align: left;

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #64748b;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 260px 1fr;
    gap: 2rem;
  }
`;

export const Card = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`;

export const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CardBody = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const MobileNavToggle = styled.button`
  display: flex;
  margin-bottom: 1.5rem;
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  font-size: 1.25rem;
  gap: 0.5rem;
  align-items: center;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const NavMenu = styled(motion.nav)`
  display: none;

  @media (max-width: 1024px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const NavItem = styled.button`
  padding: 0.75rem 1rem;
  background: ${props => props.$active ? '#2563eb' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#64748b'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.$hasIcon ? '0.75rem 0.75rem 0.75rem 2.75rem' : '0.75rem'};
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &,
  &::placeholder {
    color: #0f172a;
  }

  &::placeholder {
    color: #94a3b8;
  }

  &:disabled {
    background-color: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &:disabled {
    background-color: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${props => props.$variant === 'primary' ? `
    background: #2563eb;
    color: #ffffff;
    &:hover { background: #1d4ed8; }
    &:disabled { background: #cbd5e1; }
  ` : props.$variant === 'danger' ? `
    background: #ef4444;
    color: #ffffff;
    &:hover { background: #dc2626; }
    &:disabled { background: #cbd5e1; }
  ` : `
    background: #e2e8f0;
    color: #0f172a;
    &:hover { background: #cbd5e1; }
    &:disabled { background: #f1f5f9; }
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ProfilePictureSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1.5rem;
  }
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
`;

export const AvatarContainer = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #e2e8f0;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadButton = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #2563eb;
  border-radius: 50%;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: #1d4ed8;
    transform: scale(1.1);
  }

  input {
    display: none;
  }
`;

export const ProfilePictureInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }

  p {
    font-size: 0.9rem;
    color: #64748b;
  }
`;

export const Notification = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  left: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background: ${props => props.type === 'error' ? '#ef4444' : '#10b981'};
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;

  @media (min-width: 640px) {
    right: 2rem;
    left: auto;
    justify-content: flex-start;
  }
`;
