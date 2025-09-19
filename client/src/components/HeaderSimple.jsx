import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Menu,
  X,
  Video,
  Sparkles,
  User,
  Settings
} from 'lucide-react';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.3s ease;
  background: ${props => props.scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

const Nav = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: bold;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.nav`
  display: none;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: ${props => props.active ? '#fff' : '#3b82f6'};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const CTAButtons = styled.div`
  display: none;
  gap: 1rem;
  align-items: center;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &.primary {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #3b82f6;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
  }
  
  &.ghost {
    background: transparent;
    color: #1e40af;
    
    &:hover {
      color: #3b82f6;
    }
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #3b82f6;
  cursor: pointer;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 60;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: #3b82f6;
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const MobileNavLinks = styled.div`
  flex: 1;
  padding: 1.5rem;
  
  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    color: #3b82f6;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover, &.active {
      color: #3b82f6;
      background: rgba(255, 255, 255, 0.05);
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 40;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/', icon: Sparkles },
    { name: 'Fonctionnalités', href: '/features', icon: Video },
    { name: 'Planificateur', href: '/scheduler', icon: Settings },
    { name: 'Support', href: '/support', icon: User },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      <HeaderContainer
        initial="initial"
        animate="animate"
        variants={headerVariants}
        scrolled={scrolled}
      >
        <Nav>
          {/* Logo */}
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <div className="logo-icon">
                <Video size={18} color="#3b82f6" />
              </div>
              <span className="logo-text">Visio Pro</span>
            </Link>
          </Logo>

          {/* Navigation Desktop */}
          <NavLinks>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                active={location.pathname === item.href}
              >
                <item.icon />
                {item.name}
              </NavLink>
            ))}
          </NavLinks>

          {/* CTA Buttons */}
          <CTAButtons>
            <Button
              as={Link}
              to="/login"
              className="ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connexion
            </Button>
            <Button
              as={Link}
              to="/signup"
              className="primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer
            </Button>
          </CTAButtons>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <MobileMenuHeader>
                <h3>Menu</h3>
                <MobileMenuButton
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </MobileMenuButton>
              </MobileMenuHeader>

              <MobileNavLinks>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={location.pathname === item.href ? 'active' : ''}
                  >
                    <item.icon />
                    {item.name}
                  </Link>
                ))}
                
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    style={{ marginBottom: '1rem' }}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    Commencer
                  </Link>
                </div>
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;