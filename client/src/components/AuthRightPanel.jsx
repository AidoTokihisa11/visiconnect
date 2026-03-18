import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PanelContainer = styled.div`
  flex: 1;
  display: flex;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  min-height: 400px;

  @media (min-width: 1024px) {
    padding: 4rem;
    min-height: 100vh;
  }
`;

const DecorativeGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(56, 189, 248, 0.05) 0%, transparent 50%);
  z-index: 1;
`;

const ContentText = styled(motion.div)`
  z-index: 10;
  max-width: 480px;
  position: relative;
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (min-width: 1024px) {
    font-size: 2.75rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.6;

  @media (min-width: 1024px) {
    font-size: 1.15rem;
  }
`;

const AuthRightPanel = ({ title, description }) => {
  return (
    <PanelContainer>
      <DecorativeGradient />

      <ContentText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentText>
    </PanelContainer>
  );
};

export default AuthRightPanel;
