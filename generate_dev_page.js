const fs = require('fs');

const code = `import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronRight, Terminal, Code2, Cpu, Globe2, Shield, Zap, BookOpen, Key, Copy, Check } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

const fadeIn = keyframes\`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
\`;

const PageWrapper = styled.div\`
  min-height: 100vh;
  background-color: #ffffff;
  color: #0f172a;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
  position: relative;
\`;

const BgGlow = styled.div\`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
  top: -200px;
  right: -100px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
\`;

const HeroSection = styled.section\`
  padding: 8rem 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
\`;

const Badge = styled.div\`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0284c7;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: \${fadeIn} 0.5s ease-out;
\`;

const Title = styled.h1\`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin-bottom: 1.5rem;
  animation: \${fadeIn} 0.5s ease-out 0.1s both;

  span {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
\`;

const Subtitle = styled.p\`
  font-size: 1.25rem;
  color: #475569;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 3rem;
  animation: \${fadeIn} 0.5s ease-out 0.2s both;
\`;

const ButtonGroup = styled.div\`
  display: flex;
  gap: 1rem;
  animation: \${fadeIn} 0.5s ease-out 0.3s both;
\`;

const PrimaryButton = styled.button\`
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
  }
\`;

const CodeShowcase = styled.div\`
  margin-top: 4rem;
  width: 100%;
  max-width: 900px;
  background: #0f172a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.5);
  border: 1px solid #334155;
  text-align: left;
  animation: \${fadeIn} 0.8s ease-out 0.4s both;
\`;

const MacHeader = styled.div\`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #1e293b;
  border-bottom: 1px solid #334155;

  .dots {
    display: flex; gap: 0.5rem; margin-right: 1.5rem;
    div { width: 12px; height: 12px; border-radius: 50%; }
    .red { background: #ef4444; }
    .yellow { background: #eab308; }
    .green { background: #22c55e; }
  }
  .tabs {
    color: #94a3b8; font-size: 0.875rem; font-family: monospace;
    .active { color: #38bdf8; }
  }
\`;

const CodeBody = styled.div\`
  padding: 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #f8fafc;
  overflow-x: auto;

  .keyword { color: #c678dd; }
  .function { color: #61afef; }
  .string { color: #98c379; }
  .comment { color: #5c6370; font-style: italic; }
  .tag { color: #e06c75; }
  .attr { color: #d19a66; }
\`;

const Section = styled.section\`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
\`;

const SectionTitle = styled.h2\`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
\`;

const BentoGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
\`;

const BentoCard = styled.div\`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.05);
    border-color: #cbd5e1;
    transform: translateY(-4px);
  }

  &:nth-child(1) { grid-column: span 2; background: linear-gradient(135deg, #f8fafc, #f0f9ff); }
  &:nth-child(4) { grid-column: span 2; }

  .icon {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: #eff6ff; color: #2563eb;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2rem;
    svg { width: 28px; height: 28px; }
  }

  h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; color: #0f172a; }
  p { color: #64748b; line-height: 1.6; font-size: 1.05rem; }
\`;

const APIGrid = styled.div\`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 32px;
  padding: 4rem;
  align-items: center;
\`;

const APIEndpoints = styled.div\`
  display: flex; flex-direction: column; gap: 1rem;
\`;

const EndpointCard = styled.div\`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex; align-items: center; gap: 1rem;
  font-family: monospace;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);

  .method {
    font-weight: 700; font-size: 0.85rem; padding: 0.35rem 0.75rem; border-radius: 8px;
    &.post { background: #dcfce7; color: #166534; }
    &.get { background: #dbeafe; color: #1e40af; }
    &.delete { background: #fee2e2; color: #991b1b; }
  }
  .url { color: #475569; font-size: 1rem; span { color: #38bdf8; } }
\`;

export default function DeveloperPageV2() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @visioconnect/react").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <PageWrapper>
      <HeaderClean />
      <BgGlow />
      <BgGlow style={{ top: '400px', left: '-300px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(255,255,255,0) 70%)' }} />
      
      <HeroSection>
        <Badge><Code2 size={16} /> VisioConnect Developer API</Badge>
        <Title>La vidéo temps réel, <br/><span>intégrée en quelques lignes</span></Title>
        <Subtitle>Une infrastructure puissante. Un SDK React robuste, des webhooks fiables et une latence ultra-faible pour vos apps.</Subtitle>
        <ButtonGroup>
          <PrimaryButton><BookOpen size={18} /> Lire la Documentation</PrimaryButton>
        </ButtonGroup>

        <CodeShowcase>
          <MacHeader>
            <div className="dots"><div className="red"></div><div className="yellow"></div><div className="green"></div></div>
            <div className="tabs"><span className="active">App.tsx</span></div>
          </MacHeader>
          <CodeBody>
            <span className="comment">// 1. Installez le package: npm install @visioconnect/react</span><br/><br/>
            <span className="keyword">import</span> {'{'} <span className="function">VisioProvider</span>, <span className="function">MeetingRoom</span> {'}'} <span className="keyword">from</span> <span className="string">'@visioconnect/react'</span>;<br/>
            <span className="keyword">import</span> <span className="string">'@visioconnect/react/styles.css'</span>;<br/><br/>
            <span className="keyword">export default function</span> <span className="function">App</span>() {'{'}<br/>
            &nbsp;&nbsp;<span className="keyword">return</span> (<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">VisioProvider</span> <span className="attr">apiKey</span>=<span className="string">"pk_live_your_key_here"</span>&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">MeetingRoom</span> <span className="attr">roomId</span>=<span className="string">"daily-standup"</span> /&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">VisioProvider</span>&gt;<br/>
            &nbsp;&nbsp;);<br/>
            {'}'}
          </CodeBody>
        </CodeShowcase>
      </HeroSection>

      <Section>
        <SectionTitle>Conçu pour les développeurs, pensé pour vos utilisateurs</SectionTitle>
        <BentoGrid>
          <BentoCard>
            <div className="icon"><Cpu /></div>
            <h3>SDKs React & Vanilla JS</h3>
            <p>Des composants prêts à l'emploi. Personnalisez totalement l'expérience ou utilisez nos interfaces par défaut ultra-optimisées.</p>
          </BentoCard>
          <BentoCard>
            <div className="icon"><Globe2 /></div>
            <h3>Réseau Edge Global</h3>
            <p>Routage intelligent permettant de connecter vos utilisateurs aux serveurs les plus proches.</p>
          </BentoCard>
          <BentoCard>
            <div className="icon"><Shield /></div>
            <h3>Sécurité E2EE</h3>
            <p>Chiffrement WebRTC de bout en bout, jetons d'accès JWT et conformité RGPD stricte.</p>
          </BentoCard>
          <BentoCard>
            <div className="icon"><Zap /></div>
            <h3>Webhooks Temps Réel</h3>
            <p>Connectez votre backend. Soyez notifié immédiatement lorsqu'une salle est créée ou qu'un participant rejoint.</p>
          </BentoCard>
          <BentoCard>
            <div className="icon"><Terminal /></div>
            <h3>CLI & Outils</h3>
            <p>Utilisez Visio CLI pour gérer vos salles et vos clés directement depuis votre terminal de commande.</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <Section style={{ paddingBottom: '8rem' }}>
        <APIGrid>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Une API REST puissante</h3>
            <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Gérez les salles, les utilisateurs et l'analytics de manière programmatique via notre API documentée (OpenAPI).</p>
            <button onClick={handleCopy} style={{ fontFamily: 'monospace', background: 'white', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', fontSize: '1rem' }}>
              $ npm install @visioconnect/react
              {copied ? <Check color="#059669" /> : <Copy color="#64748b" />}
            </button>
          </div>
          <APIEndpoints>
            <EndpointCard><div className="method post">POST</div><div className="url">/v1/rooms/<span>create</span></div></EndpointCard>
            <EndpointCard><div className="method get">GET</div><div className="url">/v1/rooms/<span>{'{id}'}</span>/participants</div></EndpointCard>
            <EndpointCard><div className="method get">GET</div><div className="url">/v1/analytics/<span>sessions</span></div></EndpointCard>
            <EndpointCard><div className="method delete">DEL</div><div className="url">/v1/rooms/<span>{'{id}'}</span></div></EndpointCard>
          </APIEndpoints>
        </APIGrid>
      </Section>
      <FooterClean />
    </PageWrapper>
  );
}
`;

fs.writeFileSync('src/pages/DeveloperPageV2.jsx', code);
console.log('Successfully wrote DeveloperPageV2.jsx');
