import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// MAIN CONTAINER
export const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  color: #1e293b;
  overflow-x: hidden;
`;

// HEADER MODERNE
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: #1e40af;
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #1e40af);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3b82f6;
  }
  
  &.active {
    color: #1e40af;
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: #3b82f6;
      border-radius: 1px;
    }
  }
`;

export const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    border-color: #3b82f6;
    color: #1e40af;
    transform: translateY(-1px);
  }
`;

// MAIN CONTENT
export const MainContent = styled.main`
  padding-top: 6rem;
`;

export const HeroSection = styled.section`
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
`;

export const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#475569'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#e2e8f0'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.primary ? 'rgba(59, 130, 246, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
    ${props => !props.primary && `
      border-color: #3b82f6;
      color: #1e40af;
    `}
  }
`;

// CALENDAR SECTION
export const CalendarSection = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CalendarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
`;

export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    color: #1e40af;
    transform: scale(1.05);
  }
`;

export const MonthYear = styled.span`
  font-weight: 600;
  color: #1e293b;
  min-width: 150px;
  text-align: center;
`;

export const ViewSelector = styled.div`
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    ${props => !props.active && `
      background: #f8fafc;
      color: #1e40af;
    `}
  }
`;

// CALENDAR GRID
export const CalendarGrid = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.1);
  overflow: hidden;
`;

export const CalendarWeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

export const WeekDay = styled.div`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
`;

export const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const CalendarDay = styled(motion.div)`
  min-height: 120px;
  border-right: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:nth-child(7n) {
    border-right: none;
  }
  
  &.other-month {
    background: #f8fafc;
    color: #94a3b8;
  }
  
  &.today {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-left: 3px solid #3b82f6;
  }
  
  &:hover {
    background: #f1f5f9;
  }
`;

export const DayNumber = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const EventItem = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'meeting': return '#dbeafe';
      case 'call': return '#dcfce7';
      case 'presentation': return '#fef3c7';
      default: return '#f1f5f9';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'meeting': return '#1e40af';
      case 'call': return '#166534';
      case 'presentation': return '#92400e';
      default: return '#475569';
    }
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    opacity: 0.8;
  }
`;

// SIDEBAR
export const Sidebar = styled.aside`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.1);
  padding: 1.5rem;
  z-index: 100;
  
  @media (max-width: 1400px) {
    position: static;
    transform: none;
    margin: 2rem auto;
    max-width: 400px;
  }
`;

export const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UpcomingEvent = styled(motion.div)`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-1px);
  }
`;

export const EventTime = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

export const EventTitle = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

export const EventDetails = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// MODAL
export const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

export const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  flex: 1;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #1e40af;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const ModalActions = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
