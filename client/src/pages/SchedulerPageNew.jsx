import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import { AnimatePresence } from 'framer-motion';
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
import {
  Container,
  Header,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  BackButton,
  MainContent,
  HeroSection,
  HeroContent,
  HeroText,
  Title,
  Subtitle,
  QuickActions,
  ActionButton,
  CalendarSection,
  CalendarHeader,
  CalendarTitle,
  CalendarControls,
  MonthNavigation,
  NavButton,
  MonthYear,
  ViewSelector,
  ViewButton,
  CalendarGrid,
  CalendarWeekHeader,
  WeekDay,
  CalendarBody,
  CalendarDay,
  DayNumber,
  EventsList,
  EventItem,
  Sidebar,
  SidebarTitle,
  UpcomingEvent,
  EventTime,
  EventTitle,
  EventDetails,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  ModalActions
} from './SchedulerPageNew.styles';
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