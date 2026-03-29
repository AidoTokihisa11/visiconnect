import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import FooterClean from '../components/FooterClean';
import {
  Video,
  ArrowLeft,
  Calendar,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  MapPin,
  X,
  Save
} from 'lucide-react';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  color: #1e293b;
  overflow-x: hidden;
`;

// HEADER MODERNE
const Header = styled.header`
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const Logo = styled(Link)`
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

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
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

const BackButton = styled(motion.button)`
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
const MainContent = styled.main`
  padding-top: 6rem;
`;

const HeroSection = styled.section`
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
`;

const HeroContent = styled.div`
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

const HeroText = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
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
const CalendarSection = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CalendarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavButton = styled(motion.button)`
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

const MonthYear = styled.span`
  font-weight: 600;
  color: #1e293b;
  min-width: 150px;
  text-align: center;
`;

const ViewSelector = styled.div`
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const ViewButton = styled.button`
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
const CalendarGrid = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.1);
  overflow: hidden;
`;

const CalendarWeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const WeekDay = styled.div`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
`;

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDay = styled(motion.div)`
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

const DayNumber = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EventItem = styled.div`
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
const Sidebar = styled.aside`
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

const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UpcomingEvent = styled(motion.div)`
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

const EventTime = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const EventDetails = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// MODAL
const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  flex: 1;
`;

const CloseButton = styled.button`
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

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const TextArea = styled.textarea`
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

const ModalActions = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

// Données réalistes
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    days.push({
      date: currentDate,
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: currentDate.toDateString() === today.toDateString(),
      events: getEventsForDate(currentDate)
    });
  }
  
  return days;
};

const getEventsForDate = (date) => {
  const events = [];
  const dayOfMonth = date.getDate();
  
  // Simulation d'événements réalistes
  if (dayOfMonth === 15) {
    events.push({ id: 1, title: 'Réunion équipe', time: '10:00', type: 'meeting' });
    events.push({ id: 2, title: 'Call client', time: '14:30', type: 'call' });
  }
  if (dayOfMonth === 18) {
    events.push({ id: 3, title: 'Présentation Q4', time: '09:00', type: 'presentation' });
  }
  if (dayOfMonth === 22) {
    events.push({ id: 4, title: 'Review produit', time: '11:00', type: 'meeting' });
  }
  if (dayOfMonth === 25) {
    events.push({ id: 5, title: 'Formation équipe', time: '13:00', type: 'meeting' });
  }
  
  return events;
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Réunion équipe marketing',
    time: 'Aujourd\'hui 14:30',
    attendees: 5,
    type: 'meeting',
    location: 'Salle de conférence A'
  },
  {
    id: 2,
    title: 'Call client - Projet Alpha',
    time: 'Demain 10:00',
    attendees: 3,
    type: 'call',
    location: 'En ligne'
  },
  {
    id: 3,
    title: 'Présentation résultats Q4',
    time: 'Vendredi 15:00',
    attendees: 12,
    type: 'presentation',
    location: 'Auditorium'
  }
];

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const SchedulerPageNew = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    type: 'meeting',
    location: '',
    description: '',
    attendees: ''
  });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const calendarDays = generateCalendarDays(currentYear, currentMonth);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleCreateEvent = () => {
    // Simulation de création d'événement
    setShowNewEventModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      duration: '',
      type: 'meeting',
      location: '',
      description: '',
      attendees: ''
    });
  };

  return (
    <Container>
      <Header>
        <Nav>
          <Logo to="/">
            <div className="logo-icon">
              <Video size={24} />
            </div>
            <span>VisioConnect</span>
          </Logo>
          
          <NavLinks>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/features">Fonctionnalités</NavLink>
            <NavLink to="/pricing">Tarifs</NavLink>
            <NavLink to="/about">À propos</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/scheduler" className="active">Planificateur</NavLink>
          </NavLinks>

          <BackButton
            as={Link}
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Retour
          </BackButton>
        
          <LanguageSelector /></Nav>
      </Header>

      <MainContent>
        <HeroSection>
          <HeroContent>
            <HeroText>
              <Title>Planificateur de Réunions</Title>
              <Subtitle>
                Organisez et gérez toutes vos réunions VisioConnect en un seul endroit. 
                Interface intuitive pour une planification efficace.
              </Subtitle>
              
              <QuickActions>
                <ActionButton 
                  primary
                  onClick={() => setShowNewEventModal(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={20} />
                  Nouvelle réunion
                </ActionButton>
                
                <ActionButton whileHover={{ scale: 1.02 }}>
                  <Calendar size={20} />
                  Synchroniser calendrier
                </ActionButton>
                
                <ActionButton whileHover={{ scale: 1.02 }}>
                  <Settings size={20} />
                  Paramètres
                </ActionButton>
              </QuickActions>
            </HeroText>
          </HeroContent>
        </HeroSection>

        <CalendarSection>
          <CalendarHeader>
            <CalendarTitle>
              {months[currentMonth]} {currentYear}
            </CalendarTitle>
            
            <CalendarControls>
              <MonthNavigation>
                <NavButton 
                  onClick={handlePrevMonth}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={20} />
                </NavButton>
                
                <MonthYear>
                  {months[currentMonth]} {currentYear}
                </MonthYear>
                
                <NavButton 
                  onClick={handleNextMonth}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={20} />
                </NavButton>
              </MonthNavigation>
              
              <ViewSelector>
                <ViewButton 
                  active={view === 'month'}
                  onClick={() => setView('month')}
                >
                  Mois
                </ViewButton>
                <ViewButton 
                  active={view === 'week'}
                  onClick={() => setView('week')}
                >
                  Semaine
                </ViewButton>
                <ViewButton 
                  active={view === 'day'}
                  onClick={() => setView('day')}
                >
                  Jour
                </ViewButton>
              </ViewSelector>
            </CalendarControls>
          </CalendarHeader>

          <CalendarGrid>
            <CalendarWeekHeader>
              {weekDays.map(day => (
                <WeekDay key={day}>{day}</WeekDay>
              ))}
            </CalendarWeekHeader>
            
            <CalendarBody>
              {calendarDays.map((day, index) => (
                <CalendarDay
                  key={index}
                  className={`${!day.isCurrentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DayNumber>{day.date.getDate()}</DayNumber>
                  <EventsList>
                    {day.events.map(event => (
                      <EventItem key={event.id} type={event.type}>
                        {event.time} {event.title}
                      </EventItem>
                    ))}
                  </EventsList>
                </CalendarDay>
              ))}
            </CalendarBody>
          </CalendarGrid>
        </CalendarSection>

        <Sidebar>
          <SidebarTitle>
            <Bell size={20} />
            Prochaines réunions
          </SidebarTitle>
          
          {upcomingEvents.map(event => (
            <UpcomingEvent
              key={event.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <EventTime>{event.time}</EventTime>
              <EventTitle>{event.title}</EventTitle>
              <EventDetails>
                <Users size={14} />
                {event.attendees} participants
                {event.location && (
                  <>
                    <MapPin size={14} />
                    {event.location}
                  </>
                )}
              </EventDetails>
            </UpcomingEvent>
          ))}
        </Sidebar>
      </MainContent>

      <AnimatePresence>
        {showNewEventModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewEventModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>Nouvelle réunion</ModalTitle>
                <CloseButton onClick={() => setShowNewEventModal(false)}>
                  <X size={18} />
                </CloseButton>
              </ModalHeader>
              
              <ModalBody>
                <FormGroup>
                  <Label>Titre de la réunion</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Réunion équipe marketing"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Heure</Label>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Durée</Label>
                  <Select
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, duration: e.target.value }))}
                  >
                    <option value="">Sélectionner la durée</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="90">1h30</option>
                    <option value="120">2 heures</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Type de réunion</Label>
                  <Select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="meeting">Réunion d'équipe</option>
                    <option value="call">Appel client</option>
                    <option value="presentation">Présentation</option>
                    <option value="training">Formation</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Lieu</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Salle de conférence A ou En ligne"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Participants (emails)</Label>
                  <Input
                    type="text"
                    placeholder="marie@exemple.com, paul@exemple.com"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Description</Label>
                  <TextArea
                    placeholder="Agenda et objectifs de la réunion..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  />
                </FormGroup>
              </ModalBody>

              <ModalActions>
                <ActionButton onClick={() => setShowNewEventModal(false)}>
                  Annuler
                </ActionButton>
                <ActionButton 
                  primary
                  onClick={handleCreateEvent}
                  disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                >
                  <Save size={16} />
                  Créer la réunion
                </ActionButton>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <FooterClean />
    </Container>
  );
};

export default SchedulerPageNew;