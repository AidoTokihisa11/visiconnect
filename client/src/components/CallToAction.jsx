import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  padding: 5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent;
`;

const Card = styled(motion.div)`
  background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
  border-radius: 20px;
  max-width: 950px;
  width: 100%;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.25);

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

/* The + pattern exact reference */
const CrossPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15V8h2v7h7v2h-7v7h-2v-7H8v-2h7z' fill='rgba(255,255,255,0.06)' fill-rule='evenodd'/%3E%3C/svg%3E");
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: white;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  max-width: 650px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

const Button = styled(motion.button)`
  background: white;
  color: #1e40af;
  border: none;
  padding: 1rem 2.25rem;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .arrow {
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: #f8fafc;

    .arrow {
      transform: translateX(4px);
    }
  }
`;

const CallToAction = ({
  title = "Vous avez d'autres questions ?",
  description = "Notre équipe commerciale est à votre disposition pour trouver l'offre qui correspond parfaitement à vos besoins.",
  buttonText = "Contacter les ventes",
  buttonLink = "/contact",
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Card
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CrossPattern />
        <Content>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <IconBox>
              <Sparkles size={26} strokeWidth={2} />
            </IconBox>
          </motion.div>

          <Title>{title}</Title>
          <Description>{description}</Description>

          <Button onClick={() => navigate(buttonLink)}>
            {buttonText}{" "}
            <ArrowRight className="arrow" size={18} strokeWidth={2.5} />
          </Button>
        </Content>
      </Card>
    </Wrapper>
  );
};

export default CallToAction;
