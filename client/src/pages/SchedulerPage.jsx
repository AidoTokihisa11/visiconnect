import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Users, Video, Plus, ChevronLeft, ChevronRight, 
  Home, Settings, Search, Filter, Download, Share2, Bell, 
  Edit3, PlayCircle, X, Save, Zap, Star
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
  overflow-x: hidden;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #1a1a1a;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #00ff88;
  cursor: pointer;
  text-decoration: none;
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &.primary {
    background: #00ff88;
    color: #0a0a0a;

    &:hover {
      background: #00e67a;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
    }
  }

  &.secondary {
    background: #222;
    color: #333;
    border: 1px solid #333;

    &:hover {
      background: #333;
      border-color: #00ff88;
      color: #00ff88;
      transform: translateY(-2px);
    }
  }

  &.danger {
    background: #ff4444;
    color: #333;

    &:hover {
      background: #ff3333;
      transform: translateY(-2px);
    }
  }

  &.ghost {
    background: transparent;
    color: #888;
    border: 1px solid #333;

    &:hover {
      background: #222;
      color: #333;
      border-color: #555;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const HeroSection = styled.section`
  padding: 4rem 2rem 2rem;
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem 0.75rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;


const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
  position: relative;
  z-index: 1;
  
  .highlight {
    color: #00ff88;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 3px;
      background: #00ff88;
      border-radius: 2px;
    }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #222;
  border-radius: 12px;
  background: #111;
  color: #333;
  font-size: 0.9rem;
  position: relative;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
  pointer-events: none;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  padding: 0 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem 1.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const StatCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.accent || '#00ff88'};
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .icon {
    width: 50px;
    height: 50px;
    background: ${props => props.accent || '#00ff88'};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 900;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #888;
    font-size: 1rem;
    font-weight: 500;
  }

  .stat-trend {
    font-size: 0.8rem;
    color: #00ff88;
    font-weight: 600;
    margin-top: 0.5rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const CalendarSection = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff88, #00e67a);
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    min-width: 250px;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      min-width: 200px;
    }

    @media (max-width: 480px) {
      font-size: 1.3rem;
      min-width: 180px;
    }
  }
`;

const NavButton = styled.button`
  background: #222;
  border: 1px solid #333;
  border-radius: 10px;
  color: #333;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #333;
    border-color: #00ff88;
    color: #00ff88;
    transform: scale(1.1);
  }
`;

const CalendarActions = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0 0.25rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
    padding: 0;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  color: #888;
  padding: 1rem 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 0.75rem 0.25rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.125rem;
    font-size: 0.7rem;
    letter-spacing: 0.25px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #333;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 0.5px;
  }
`;

const CalendarDay = styled.div`
  background: #111;
  padding: 1rem;
  min-height: 120px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: 80px;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
    min-height: 60px;
  }

  &:hover {
    background: #1a1a1a;
    border-color: #333;
  }

  &.other-month {
    opacity: 0.3;
    background: #0a0a0a;
  }

  &.today {
    background: rgba(0, 255, 136, 0.1);
    border-color: #00ff88;
  }

  &.has-events {
    background: rgba(0, 255, 136, 0.05);
  }

  .day-number {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      margin-bottom: 0.125rem;
    }
  }

  .events {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    @media (max-width: 768px) {
      gap: 0.125rem;
    }

    @media (max-width: 480px) {
      gap: 0.0625rem;
    }
  }

  .event {
    background: #00ff88;
    color: #0a0a0a;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 0.6rem;
      padding: 0.125rem 0.25rem;
    }

    @media (max-width: 480px) {
      font-size: 0.55rem;
      padding: 0.0625rem 0.125rem;
      border-radius: 2px;
    }
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1200px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const SidebarCard = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.accent || '#00ff88'};
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 1.25rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const UpcomingEvents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EventItem = styled(motion.div)`
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #00ff88;
    background: #111;
  }

  .event-time {
    color: #00ff88;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .event-title {
    color: #333;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .event-details {
    color: #888;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .event-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const QuickActionButton = styled(motion.button)`
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;

  &:hover {
    border-color: #00ff88;
    background: #111;
    transform: translateY(-2px);
  }

  .icon {
    width: 40px;
    height: 40px;
    background: #00ff88;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
  }

  .label {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

// Modal Components
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
    max-width: 90vw;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
    max-width: 95vw;
    max-height: 95vh;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00e67a);
    border-radius: 24px 24px 0 0;

    @media (max-width: 768px) {
      border-radius: 16px 16px 0 0;
    }

    @media (max-width: 480px) {
      border-radius: 12px 12px 0 0;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: #222;
  border: 1px solid #333;
  border-radius: 8px;
  color: #333;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    color: #ff4444;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: #ccc;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #222;
    border-radius: 12px;
    background: #0a0a0a;
    color: #333;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: #555;
    }

    &:focus {
      outline: none;
      border-color: #00ff88;
      box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
`;

const SchedulerPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Réunion équipe marketing',
      date: new Date(2024, 11, 15, 10, 0),
      duration: 60,
      participants: ['Alice', 'Bob', 'Charlie'],
      type: 'meeting',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Présentation client',
      date: new Date(2024, 11, 18, 14, 30),
      duration: 90,
      participants: ['David', 'Eve'],
      type: 'presentation',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Formation WebRTC',
      date: new Date(2024, 11, 20, 9, 0),
      duration: 120,
      participants: ['Frank', 'Grace', 'Henry', 'Ivy'],
      type: 'training',
      status: 'confirmed'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    participants: '',
    type: 'meeting'
  });

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDate
      });
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      const dayEvents = events.filter(event => 
        event.date.toDateString() === fullDate.toDateString()
      );
      
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: fullDate,
        isToday: fullDate.toDateString() === new Date().toDateString(),
        events: dayEvents
      });
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: nextDate
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
    const event = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      date: eventDate,
      duration: parseInt(newEvent.duration),
      participants: newEvent.participants.split(',').map(p => p.trim()).filter(p => p),
      type: newEvent.type,
      status: 'confirmed'
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      participants: '',
      type: 'meeting'
    });
    setShowNewEventModal(false);
  };

  const handleJoinMeeting = (eventId) => {
    const roomId = `meeting-${eventId}`;
    navigate(`/room/${roomId}?userName=Organisateur`);
  };

  const days = getDaysInMonth(currentDate);
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  const stats = [
    {
      icon: <Calendar size={24} />,
      value: events.length.toString(),
      label: 'Réunions planifiées',
      trend: '+12% ce mois',
      accent: '#00ff88'
    },
    {
      icon: <Clock size={24} />,
      value: `${Math.round(events.reduce((acc, event) => acc + event.duration, 0) / 60)}h`,
      label: 'Temps total prévu',
      trend: '+8% cette semaine',
      accent: '#4ecdc4'
    },
    {
      icon: <Users size={24} />,
      value: events.reduce((acc, event) => acc + event.participants.length, 0).toString(),
      label: 'Participants total',
      trend: '+15% ce mois',
      accent: '#ff6b6b'
    },
    {
      icon: <Video size={24} />,
      value: upcomingEvents.length.toString(),
      label: 'Réunions à venir',
      trend: 'Cette semaine',
      accent: '#f9ca24'
    }
  ];

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <NavActions>
            <Button 
              className="secondary"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={16} />
              Accueil
            </Button>
            <Button 
              className="ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={16} />
              Paramètres
            </Button>
          </NavActions>
        </Nav>
      </Header>

      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Planificateur <span className="highlight">Intelligent</span>
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Organisez vos visioconférences avec une interface moderne et des fonctionnalités avancées. 
          Gratuit à vie, sans limitation.
        </HeroSubtitle>
      </HeroSection>

      <ActionBar>
        <SearchSection>
          <SearchContainer>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Rechercher une réunion, participant ou date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </SearchSection>
        
        <ActionsGroup>
          <Button 
            className="ghost"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={16} />
            Filtrer
          </Button>
          <Button 
            className="ghost"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Exporter
          </Button>
          <Button 
            className="primary"
            onClick={() => setShowNewEventModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            Nouvelle Réunion
          </Button>
        </ActionsGroup>
      </ActionBar>

      <MainContent>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              accent={stat.accent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-header">
                <div className="icon">{stat.icon}</div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-trend">{stat.trend}</div>
            </StatCard>
          ))}
        </StatsGrid>

        <ContentGrid>
          <CalendarSection>
            <CalendarHeader>
              <MonthNav>
                <NavButton onClick={() => navigateMonth(-1)}>
                  <ChevronLeft size={20} />
                </NavButton>
                <h2>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <NavButton onClick={() => navigateMonth(1)}>
                  <ChevronRight size={20} />
                </NavButton>
              </MonthNav>
              <CalendarActions>
                <Button className="ghost" size="sm">
                  <Share2 size={16} />
                </Button>
                <Button className="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </CalendarActions>
            </CalendarHeader>

            <WeekDays>
              {dayNames.map(day => (
                <DayHeader key={day}>{day}</DayHeader>
              ))}
            </WeekDays>

            <CalendarGrid>
              {days.map((day, index) => (
                <CalendarDay
                  key={index}
                  className={`
                    ${!day.isCurrentMonth ? 'other-month' : ''}
                    ${day.isToday ? 'today' : ''}
                    ${day.events && day.events.length > 0 ? 'has-events' : ''}
                  `}
                  onClick={() => {
                    if (day.isCurrentMonth) {
                      setShowNewEventModal(true);
                      const dateStr = day.fullDate.toISOString().split('T')[0];
                      setNewEvent(prev => ({ ...prev, date: dateStr }));
                    }
                  }}
                >
                  <div className="day-number">{day.date}</div>
                  {day.events && day.events.length > 0 && (
                    <div className="events">
                      {day.events.slice(0, 3).map((event, eventIndex) => (
                        <div 
                          key={eventIndex} 
                          className="event"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinMeeting(event.id);
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {day.events.length > 3 && (
                        <div className="event">+{day.events.length - 3} autres</div>
                      )}
                    </div>
                  )}
                </CalendarDay>
              ))}
            </CalendarGrid>
          </CalendarSection>

          <Sidebar>
            <SidebarCard accent="#00ff88">
              <div className="card-title">
                <Bell size={20} />
                Réunions à venir
              </div>
              <UpcomingEvents>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <EventItem
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="event-time">
                        {event.date.toLocaleDateString('fr-FR', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })} à {event.date.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="event-title">{event.title}</div>
                      <div className="event-details">
                        <Users size={12} />
                        {event.participants.length} participant{event.participants.length > 1 ? 's' : ''}
                        <Clock size={12} />
                        {event.duration}min
                      </div>
                      <div className="event-actions">
                        <Button 
                          className="primary" 
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          onClick={() => handleJoinMeeting(event.id)}
                        >
                          <PlayCircle size={14} />
                          Rejoindre
                        </Button>
                        <Button 
                          className="ghost" 
                          style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <Edit3 size={14} />
                        </Button>
                        <Button 
                          className="ghost" 
                          style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <Share2 size={14} />
                        </Button>
                      </div>
                    </EventItem>
                  ))
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#888', 
                    padding: '2rem',
                    fontStyle: 'italic' 
                  }}>
                    Aucune réunion prévue
                  </div>
                )}
              </UpcomingEvents>
            </SidebarCard>

            <SidebarCard accent="#4ecdc4">
              <div className="card-title">
                <Zap size={20} />
                Actions rapides
              </div>
              <QuickActions>
                <QuickActionButton
                  onClick={() => setShowNewEventModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="icon">
                    <Plus size={20} />
                  </div>
                  <div className="label">Nouvelle réunion</div>
                </QuickActionButton>
                
                <QuickActionButton
                  onClick={() => {
                    const roomId = Math.random().toString(36).substring(2, 15);
                    navigate(`/room/${roomId}?userName=Organisateur`);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="icon">
                    <Video size={20} />
                  </div>
                  <div className="label">Réunion instantanée</div>
                </QuickActionButton>
                
                <QuickActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="icon">
                    <Share2 size={20} />
                  </div>
                  <div className="label">Partager calendrier</div>
                </QuickActionButton>
                
                <QuickActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="icon">
                    <Download size={20} />
                  </div>
                  <div className="label">Exporter</div>
                </QuickActionButton>
              </QuickActions>
            </SidebarCard>

            <SidebarCard accent="#ff6b6b">
              <div className="card-title">
                <Star size={20} />
                Conseils Pro
              </div>
              <div style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}>
                  💡 <strong>Astuce :</strong> Cliquez sur une date du calendrier pour créer rapidement une réunion.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  🎯 <strong>Pro :</strong> Utilisez la recherche pour retrouver rapidement vos réunions.
                </p>
                <p>
                  ⚡ <strong>Rapide :</strong> Créez une réunion instantanée en un clic !
                </p>
              </div>
            </SidebarCard>
          </Sidebar>
        </ContentGrid>
      </MainContent>

      {/* Modal de création d'événement */}
      <AnimatePresence>
        {showNewEventModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewEventModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <h2>Nouvelle Réunion</h2>
                <CloseButton onClick={() => setShowNewEventModal(false)}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>

              <FormGroup>
                <label>Titre de la réunion *</label>
                <input
                  type="text"
                  placeholder="Ex: Réunion équipe marketing"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <label>Description</label>
                <textarea
                  placeholder="Décrivez l'objectif de la réunion..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label>Date *</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Heure *</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Durée (minutes)</label>
                  <select
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, duration: e.target.value }))}
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 heure</option>
                    <option value={90}>1h30</option>
                    <option value={120}>2 heures</option>
                    <option value={180}>3 heures</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Type de réunion</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="meeting">Réunion</option>
                    <option value="presentation">Présentation</option>
                    <option value="training">Formation</option>
                    <option value="interview">Entretien</option>
                    <option value="webinar">Webinaire</option>
                  </select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Participants (emails séparés par des virgules)</label>
                <input
                  type="text"
                  placeholder="alice@example.com, bob@example.com"
                  value={newEvent.participants}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, participants: e.target.value }))}
                />
              </FormGroup>

              <ModalActions>
                <Button 
                  className="secondary"
                  onClick={() => setShowNewEventModal(false)}
                >
                  Annuler
                </Button>
                <Button 
                  className="primary"
                  onClick={handleCreateEvent}
                  disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                >
                  <Save size={16} />
                  Créer la réunion
                </Button>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default SchedulerPage;
