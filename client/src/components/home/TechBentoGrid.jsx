import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Server, Globe, Cpu, Lock } from 'lucide-react';

const COLORS = {
  primary: '#2563eb', // Blue-600
  background: '#f8fafc', // Slate-50
  white: '#ffffff', // White
  border: '#e2e8f0', // Slate-200
  text: '#0f172a', // Slate-900 (Dark text)
  muted: '#64748b', // Slate-500
};

const Section = styled.section`
  padding: 5rem 1.5rem;
  background: ${COLORS.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BentoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, minmax(200px, auto));
  }
`;

const BentoCard = styled(motion.div)`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${COLORS.primary};
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-4px);
  }

  &.large {
    grid-column: span 1;

    @media (min-width: 768px) {
      grid-column: span 2;
    }
  }

  &.tall {
    grid-row: span 1;

    @media (min-width: 768px) {
      grid-row: span 2;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const IconPill = styled.div`
  background: #eff6ff;
  color: ${COLORS.primary};
  padding: 0.5rem;
  border-radius: 12px;
  display: inline-flex;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.text};
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: ${COLORS.muted};
  line-height: 1.6;
`;

const Visualization = styled.div`
  margin-top: auto;
  height: 110px;
  background:
    radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 70%),
    linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #eff6ff 100%);
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.75rem;

  &.tall {
    height: 200px;
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

/* Diagramme WebRTC : deux navigateurs reliés en pair à pair */
const WebRTCDiagram = () => (
  <svg viewBox="0 0 320 90" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="rtcLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
        <stop offset="50%" stopColor="#2563eb" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
      </linearGradient>
    </defs>

    {/* Navigateur gauche */}
    <g transform="translate(20 22)">
      <rect width="70" height="46" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.4" />
      <rect width="70" height="10" rx="6" fill="#eff6ff" />
      <circle cx="6" cy="5" r="1.5" fill="#94a3b8" />
      <circle cx="12" cy="5" r="1.5" fill="#94a3b8" />
      <circle cx="18" cy="5" r="1.5" fill="#94a3b8" />
      <rect x="10" y="20" width="50" height="18" rx="3" fill="#dbeafe" />
    </g>

    {/* Navigateur droite */}
    <g transform="translate(230 22)">
      <rect width="70" height="46" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.4" />
      <rect width="70" height="10" rx="6" fill="#eff6ff" />
      <circle cx="6" cy="5" r="1.5" fill="#94a3b8" />
      <circle cx="12" cy="5" r="1.5" fill="#94a3b8" />
      <circle cx="18" cy="5" r="1.5" fill="#94a3b8" />
      <rect x="10" y="20" width="50" height="18" rx="3" fill="#dbeafe" />
    </g>

    {/* Lien P2P + paquets */}
    <line x1="90" y1="45" x2="230" y2="45" stroke="url(#rtcLine)" strokeWidth="2" />
    <circle cx="130" cy="45" r="3" fill="#2563eb" />
    <circle cx="160" cy="45" r="3" fill="#2563eb" opacity="0.7" />
    <circle cx="190" cy="45" r="3" fill="#2563eb" opacity="0.45" />

    {/* Badge chiffrement au milieu */}
    <g transform="translate(146 20)">
      <rect width="28" height="14" rx="7" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
      <text
        x="14"
        y="10"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="7"
        fontWeight="700"
        fill="#1d4ed8"
      >
        DTLS
      </text>
    </g>
  </svg>
);

/* Diagramme SFU : 1 serveur central diffuse aux clients */
const SFUDiagram = () => (
  <svg viewBox="0 0 300 180" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="sfuCore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>

    {/* Liens (dessinés avant les cercles pour passer en-dessous) */}
    {[
      { x: 30, y: 30 },
      { x: 270, y: 30 },
      { x: 30, y: 150 },
      { x: 270, y: 150 },
      { x: 150, y: 20 },
      { x: 150, y: 160 },
    ].map((p, i) => (
      <line
        key={i}
        x1="150"
        y1="90"
        x2={p.x}
        y2={p.y}
        stroke="#93c5fd"
        strokeWidth="1.4"
        strokeDasharray="3 3"
      />
    ))}

    {/* SFU central */}
    <circle cx="150" cy="90" r="30" fill="url(#sfuCore)" />
    <circle cx="150" cy="90" r="38" fill="none" stroke="#2563eb" strokeOpacity="0.2" strokeWidth="1" />
    <text
      x="150"
      y="87"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontSize="9"
      fontWeight="700"
      fill="#ffffff"
    >
      SFU
    </text>
    <text
      x="150"
      y="99"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontSize="7"
      fontWeight="500"
      fill="#dbeafe"
    >
      Core
    </text>

    {/* Clients autour */}
    {[
      { cx: 30, cy: 30, label: 'A' },
      { cx: 270, cy: 30, label: 'B' },
      { cx: 30, cy: 150, label: 'C' },
      { cx: 270, cy: 150, label: 'D' },
      { cx: 150, cy: 20, label: 'E' },
      { cx: 150, cy: 160, label: 'F' },
    ].map((c) => (
      <g key={c.label}>
        <circle cx={c.cx} cy={c.cy} r="14" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
        <text
          x={c.cx}
          y={c.cy + 3.5}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#1d4ed8"
        >
          {c.label}
        </text>
      </g>
    ))}
  </svg>
);

const TechBentoGrid = () => {
  return (
    <Section>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '1rem',
              letterSpacing: '-0.025em',
              color: COLORS.text,
            }}
          >
            Architecture Robuste
          </h2>
          <p style={{ color: COLORS.muted, fontSize: '1.125rem' }}>
            Construit sur les standards ouverts les plus performants.
          </p>
        </div>

        <BentoWrapper>
          <BentoCard
            className="large"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <IconPill>
                <Globe size={24} />
              </IconPill>
            </CardHeader>
            <div>
              <CardTitle>Powered by WebRTC</CardTitle>
              <CardText>
                Le standard mondial pour la communication temps réel. Pas de plugins, pas
                d'installation, juste le navigateur.
              </CardText>
            </div>
            <Visualization>
              <WebRTCDiagram />
            </Visualization>
          </BentoCard>

          <BentoCard
            className="tall"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <IconPill>
                <Server size={24} />
              </IconPill>
            </CardHeader>
            <div>
              <CardTitle>SFU Architecture</CardTitle>
              <CardText>
                Un serveur de forwarding sélectif qui optimise la bande passante pour chaque
                participant, permettant des appels de groupe massifs sans surcharge client.
              </CardText>
            </div>
            <Visualization className="tall">
              <SFUDiagram />
            </Visualization>
          </BentoCard>

          <BentoCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <IconPill>
                <Cpu size={24} />
              </IconPill>
            </CardHeader>
            <div>
              <CardTitle>Low Latency</CardTitle>
              <CardText>
                Latence &lt; 50ms sur réseau local grâce à l'optimisation UDP first.
              </CardText>
            </div>
          </BentoCard>

          <BentoCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <IconPill>
                <Lock size={24} />
              </IconPill>
            </CardHeader>
            <div>
              <CardTitle>E2E Encrypted</CardTitle>
              <CardText>Vos flux médias sont chiffrés de bout en bout.</CardText>
            </div>
          </BentoCard>
        </BentoWrapper>
      </Container>
    </Section>
  );
};

export default TechBentoGrid;
