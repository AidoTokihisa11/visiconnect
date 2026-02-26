import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Card = styled(motion.div)`
  background: #2563eb;
  border-radius: 32px;
  padding: 5rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.2), 0 10px 10px -5px rgba(37, 99, 235, 0.1);

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  background: white;
  color: #2563eb;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  &:hover {
    background: #f8fafc;
    transform: translateY(-2px);
  }
`;

const Decoration = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
`;

const CallToAction = ({ 
  title = "Prêt à commencer ?", 
  description = "Rejoignez des milliers d'équipes qui utilisent VisioConnect pour collaborer efficacement.", 
  buttonText = "Commencer gratuitement", 
  buttonLink = "/signup" 
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <Card
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Decoration style={{ width: 400, height: 400, top: -100, right: -100 }} />
          <Decoration style={{ width: 300, height: 300, bottom: -50, left: -50 }} />
          
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(buttonLink)}
          >
            {buttonText} <ArrowRight size={20} />
          </Button>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default CallToAction;
