import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  BookOpen, Code2, ShieldCheck, Rocket, Search, Copy, Check,
  Zap, Users, Video, Settings, Key, Globe, FileText, Terminal, Lock,
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';

const C = {
  primary:'#2563eb', navy:'#0f172a', text:'#374151', muted:'#6b7280',
  border:'#e5e7eb', bg:'#f8fbff', card:'#ffffff',
  softBlue:'#eff6ff', blueTint:'#dbeafe',
};

const floatIn = keyframes`
  from { opacity:0; transform:translateY(18px) scale(0.98); }
  to   { opacity:1; transform:translateY(0)    scale(1);    }
`;
const fadeSlide = keyframes`
  from { opacity:0; transform:translateX(-10px); }
  to   { opacity:1; transform:translateX(0);     }
`;

const Page = styled.div`
  min-height:100vh;
  background:
    radial-gradient(circle at top left,rgba(37,99,235,.08),transparent 30%),
    linear-gradient(180deg,${C.bg} 0%,#fff 25%,#fff 100%);
  display:flex; flex-direction:column; color:${C.navy};
`;
const Main = styled.main`flex:1;`;
const HeroSection = styled.section`
  padding:6rem 1.5rem 5rem; border-bottom:1px solid ${C.border};
`;
const HeroContainer = styled.div`
  max-width:1200px; margin:0 auto;
  display:grid; grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);
  gap:3rem; align-items:center;
  @media(max-width:960px){grid-template-columns:1fr;}
`;
const HeroContent = styled.div`animation:${floatIn} .75s cubic-bezier(.22,1,.36,1) both;`;
const Eyebrow = styled.div`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.5rem .85rem; border-radius:999px;
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  color:${C.primary}; font-weight:700; font-size:.82rem; margin-bottom:1.25rem;
`;
const HeroTitle = styled.h1`
  font-size:clamp(2.4rem,4.5vw,3.8rem); font-weight:800;
  letter-spacing:-.03em; line-height:1.1; margin:0 0 1.1rem; color:${C.navy};
`;
const HeroSubtitle = styled.p`
  font-size:1.1rem; color:${C.muted}; line-height:1.75; margin:0 0 2rem;
`;
const SearchBar = styled.div`
  position:relative; max-width:460px;
  svg{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:${C.muted};pointer-events:none;}
`;
const SearchInput = styled.input`
  width:100%; padding:14px 20px 14px 46px; border-radius:12px;
  border:1.5px solid ${C.border}; background:#fff; font-size:.95rem;
  color:${C.navy}; box-shadow:0 4px 16px rgba(15,23,42,.05);
  transition:border-color .2s,box-shadow .2s; box-sizing:border-box;
  &::placeholder{color:${C.muted};}
  &:focus{outline:none;border-color:${C.primary};box-shadow:0 0 0 3px rgba(37,99,235,.1);}
`;
const HeroPanel = styled.div`
  background:linear-gradient(180deg,#fff 0%,${C.bg} 100%);
  border:1px solid ${C.border}; border-radius:20px; padding:1.5rem;
  box-shadow:0 20px 50px rgba(15,23,42,.08);
  animation:${floatIn} .9s .15s cubic-bezier(.22,1,.36,1) both;
`;
const PanelTitle = styled.div`
  font-size:.78rem; font-weight:700; text-transform:uppercase;
  letter-spacing:.08em; color:${C.muted}; margin-bottom:1rem;
`;
const QuickLinkGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:.75rem;`;
const QuickLinkCard = styled.button`
  display:flex; flex-direction:column; align-items:flex-start; gap:5px;
  padding:1rem; background:${C.card}; border:1px solid ${C.border};
  border-radius:12px; cursor:pointer; text-align:left;
  transition:border-color .2s,box-shadow .2s,transform .2s;
  .icon{color:${C.primary};}
  .label{font-size:.82rem;font-weight:700;color:${C.navy};}
  .desc{font-size:.74rem;color:${C.muted};line-height:1.4;}
  &:hover{border-color:${C.primary};box-shadow:0 6px 20px rgba(37,99,235,.1);transform:translateY(-1px);}
`;
const DocsWrapper = styled.div`
  max-width:1200px; margin:0 auto; padding:3rem 1.5rem 5rem;
  display:grid; grid-template-columns:260px 1fr; gap:3rem; align-items:start;
  @media(max-width:900px){grid-template-columns:1fr;}
`;
const Sidebar = styled.nav`
  position:sticky; top:90px; height:fit-content;
  background:#fff; border:1px solid ${C.border}; border-radius:16px;
  padding:1.25rem; box-shadow:0 4px 20px rgba(15,23,42,.05);
  @media(max-width:900px){
    position:static;display:flex;gap:.5rem;flex-wrap:wrap;padding:1rem;border-radius:12px;
  }
`;
const SidebarSection = styled.div`
  margin-bottom:1.5rem;&:last-child{margin-bottom:0;}
  @media(max-width:900px){margin-bottom:0;}
`;
const SidebarHeading = styled.div`
  font-size:.7rem; font-weight:800; text-transform:uppercase;
  letter-spacing:.1em; color:${C.muted}; padding:0 .5rem; margin-bottom:.4rem;
  @media(max-width:900px){display:none;}
`;
const SidebarItem = styled.button`
  display:flex; align-items:center; gap:8px; width:100%;
  padding:.55rem .75rem; border-radius:8px; border:none;
  background:${({$active})=>$active?C.softBlue:'transparent'};
  color:${({$active})=>$active?C.primary:C.text};
  font-size:.88rem; font-weight:${({$active})=>$active?'700':'500'};
  text-align:left; cursor:pointer; transition:background .15s,color .15s;
  svg{flex-shrink:0;}
  &:hover{background:${C.softBlue};color:${C.primary};}
  @media(max-width:900px){
    white-space:nowrap;width:auto;padding:.5rem .75rem;
    border:1px solid ${({$active})=>$active?C.primary:C.border};
  }
`;
const Content = styled.div`animation:${fadeSlide} .3s ease both;`;
const ContentHeader = styled.div`
  border-bottom:2px solid ${C.border}; padding-bottom:1.5rem; margin-bottom:2rem;
`;
const ContentBadge = styled.span`
  display:inline-flex; align-items:center; gap:5px;
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  color:${C.primary}; font-size:.74rem; font-weight:700;
  padding:3px 10px; border-radius:9999px; margin-bottom:.75rem;
`;
const ContentTitle = styled.h2`
  font-size:2rem; font-weight:800; letter-spacing:-.02em;
  color:${C.navy}; margin:0 0 .5rem;
`;
const ContentSubtitle = styled.p`
  font-size:1rem; color:${C.muted}; line-height:1.7; margin:0;
`;
const ArticleCard = styled.div`
  background:#fff; border:1px solid ${C.border}; border-radius:14px;
  padding:1.5rem; margin-bottom:1.25rem;
  box-shadow:0 2px 12px rgba(15,23,42,.04);
  transition:box-shadow .2s,transform .2s,border-color .2s;
  &:hover{box-shadow:0 8px 28px rgba(15,23,42,.09);transform:translateY(-1px);border-color:#d1d5db;}
`;
const ArticleTitle = styled.h3`
  font-size:1.05rem; font-weight:700; color:${C.navy};
  margin:0 0 .5rem; display:flex; align-items:center; gap:8px;
`;
const ArticleText = styled.p`
  font-size:.92rem; color:${C.text}; line-height:1.65; margin:0 0 .75rem;
`;
const CodeBlock = styled.div`
  background:#0f172a; border-radius:12px; overflow:hidden;
  margin:1rem 0; border:1px solid #1e293b;
`;
const CodeHeader = styled.div`
  display:flex; align-items:center; justify-content:space-between;
  padding:.7rem 1rem; background:#1e293b; border-bottom:1px solid #334155;
`;
const CodeLang = styled.span`
  font-size:.74rem; font-weight:600; color:#94a3b8;
  text-transform:uppercase; letter-spacing:.06em;
`;
const CopyBtn = styled.button`
  display:flex; align-items:center; gap:5px;
  background:none; border:1px solid #334155; border-radius:6px;
  color:#94a3b8; font-size:.72rem; padding:3px 8px; cursor:pointer;
  transition:border-color .15s,color .15s;
  &:hover{border-color:#60a5fa;color:#60a5fa;}
`;
const CodePre = styled.pre`
  margin:0; padding:1.25rem; overflow-x:auto;
  font-family:'JetBrains Mono','Fira Code','Courier New',monospace;
  font-size:.84rem; line-height:1.7; color:#e2e8f0;
`;
const StepsGrid = styled.div`display:grid;gap:1rem;margin:1.25rem 0;`;
const StepCard = styled.div`
  display:flex; gap:1rem; align-items:flex-start;
  padding:1.1rem; background:#fff; border:1px solid ${C.border}; border-radius:12px;
`;
const StepNum = styled.div`
  flex-shrink:0;width:30px;height:30px;border-radius:50%;
  background:${C.primary};color:#fff;font-weight:800;font-size:.84rem;
  display:flex;align-items:center;justify-content:center;
`;
const StepBody = styled.div`
  h4{font-size:.95rem;font-weight:700;color:${C.navy};margin:0 0 .25rem;}
  p{font-size:.875rem;color:${C.text};line-height:1.6;margin:0;}
`;
const InfoBox = styled.div`
  display:flex; gap:12px; padding:1rem 1.25rem;
  background:${({$type})=>$type==='warning'?'#fffbeb':C.softBlue};
  border:1px solid ${({$type})=>$type==='warning'?'#fde68a':C.blueTint};
  border-radius:10px; margin:1rem 0; font-size:.88rem;
  color:${({$type})=>$type==='warning'?'#92400e':'#1e40af'}; line-height:1.6;
`;
const TableWrap = styled.div`
  overflow-x:auto;border-radius:12px;border:1px solid ${C.border};margin:1rem 0;
`;
const Table = styled.table`
  width:100%;border-collapse:collapse;font-size:.88rem;
  thead{background:${C.softBlue};
    th{padding:.75rem 1rem;text-align:left;font-weight:700;color:${C.navy};border-bottom:1px solid ${C.blueTint};}
  }
  tbody tr{border-bottom:1px solid ${C.border};
    &:last-child{border-bottom:none;}
    &:hover{background:#f9fafb;}
    td{padding:.75rem 1rem;color:${C.text};}
  }
`;
const Badge = styled.span`
  display:inline-block;padding:2px 8px;border-radius:9999px;
  font-size:.72rem;font-weight:700;
  background:${({$color})=>$color==='green'?'#f0fdf4':$color==='blue'?C.softBlue:$color==='orange'?'#fff7ed':'#f3f4f6'};
  color:${({$color})=>$color==='green'?'#16a34a':$color==='blue'?C.primary:$color==='orange'?'#ea580c':C.muted};
`;
const Divider = styled.div`height:1px;background:${C.border};margin:2rem 0;`;

// ─── Code block with copy ─────────────────────────────────────────────────────
const CopyableCode = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = code.replace(/<[^>]+>/g,'');
    navigator.clipboard.writeText(text).catch(()=>{});
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  };
  return (
    <CodeBlock>
      <CodeHeader>
        <CodeLang>{lang}</CodeLang>
        <CopyBtn onClick={copy}>
          {copied?<Check size={12}/>:<Copy size={12}/>}
          {copied?'Copié !':'Copier'}
        </CopyBtn>
      </CodeHeader>
      <CodePre dangerouslySetInnerHTML={{__html:code}}/>
    </CodeBlock>
  );
};

// ─── Section content ──────────────────────────────────────────────────────────
const SectionContent = ({ id }) => {
  switch(id){
    case 'getting-started':return(
      <div>
        <ContentHeader>
          <ContentBadge><BookOpen size={11}/>Guide</ContentBadge>
          <ContentTitle>Premiers pas avec VisioConnect</ContentTitle>
          <ContentSubtitle>Configurez votre espace et lancez votre première réunion en moins de 5 minutes.</ContentSubtitle>
        </ContentHeader>
        <StepsGrid>
          {[['Créer votre compte','Rendez-vous sur app.visiconnect.com et inscrivez-vous avec votre email professionnel.'],
            ['Configurer votre profil','Ajoutez votre photo, nom et fuseau horaire.'],
            ['Créer votre première réunion','Cliquez sur "Nouvelle réunion", choisissez un nom et invitez des participants.'],
            ['Partager le lien','Chaque réunion génère un lien sécurisé unique à partager.'],
          ].map(([h,p],i)=>(
            <StepCard key={i}><StepNum>{i+1}</StepNum><StepBody><h4>{h}</h4><p>{p}</p></StepBody></StepCard>
          ))}
        </StepsGrid>
        <InfoBox><Zap size={16} style={{flexShrink:0,marginTop:2}}/><span>Conseil : Activez microphone et caméra dès le premier lancement pour éviter tout délai.</span></InfoBox>
        <Divider/>
        <ArticleCard>
          <ArticleTitle><Video size={16}/>Qualité vidéo recommandée</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Qualité</th><th>Résolution</th><th>Bande passante</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>720p</td><td>2 Mbps</td></tr>
              <tr><td>HD</td><td>1080p</td><td>5 Mbps</td></tr>
              <tr><td>4K UHD</td><td>2160p</td><td>25 Mbps</td></tr>
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
      </div>
    );
    case 'meetings':return(
      <div>
        <ContentHeader>
          <ContentBadge><Video size={11}/>Réunions</ContentBadge>
          <ContentTitle>Gérer vos réunions</ContentTitle>
          <ContentSubtitle>Créez, planifiez et gérez des réunions vidéo avec toutes vos équipes.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>Types de réunions</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Type</th><th>Participants max</th><th>Durée max</th></tr></thead>
            <tbody>
              <tr><td>Quick Meet</td><td>10</td><td>60 min</td></tr>
              <tr><td>Réunion planifiée</td><td>100</td><td>Illimitée</td></tr>
              <tr><td>Webinaire</td><td>1 000</td><td>Illimitée</td></tr>
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle><Settings size={16}/>Options avancées</ArticleTitle>
          <StepsGrid>
            {[['Salle d\'attente','Contrôlez l\'admission des participants.'],
              ['Chiffrement E2E','Pour les réunions sensibles.'],
              ['Enregistrement cloud','Stockage automatique sécurisé.'],
              ['Transcription IA','Résumé automatique post-réunion.'],
            ].map(([h,p])=>(
              <StepCard key={h}><Check size={17} color={C.primary} style={{marginTop:2,flexShrink:0}}/><StepBody><h4>{h}</h4><p>{p}</p></StepBody></StepCard>
            ))}
          </StepsGrid>
        </ArticleCard>
      </div>
    );
    case 'account':return(
      <div>
        <ContentHeader>
          <ContentBadge><Users size={11}/>Compte</ContentBadge>
          <ContentTitle>Compte & Profil</ContentTitle>
          <ContentSubtitle>Gérez vos informations, notifications et préférences.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>Modifier votre profil</ArticleTitle>
          <ArticleText>Depuis <strong>Paramètres → Profil</strong> : nom, photo, titre, langue (12 langues disponibles).</ArticleText>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>Sécurité — Authentification 2FA</ArticleTitle>
          <StepsGrid>
            {[['Activer la 2FA','Paramètres → Sécurité → Authentification à deux facteurs.'],
              ['Choisir une méthode','Application TOTP (recommandé) ou SMS.'],
              ['Sauvegarder les codes','Conservez les codes de récupération en lieu sûr.'],
            ].map(([h,p],i)=>(
              <StepCard key={i}><StepNum>{i+1}</StepNum><StepBody><h4>{h}</h4><p>{p}</p></StepBody></StepCard>
            ))}
          </StepsGrid>
        </ArticleCard>
      </div>
    );
    case 'api-auth':return(
      <div>
        <ContentHeader>
          <ContentBadge><Key size={11}/>API</ContentBadge>
          <ContentTitle>Authentification API</ContentTitle>
          <ContentSubtitle>JWT et OAuth 2.0 pour sécuriser tous vos appels API.</ContentSubtitle>
        </ContentHeader>
        <InfoBox><ShieldCheck size={16} style={{flexShrink:0,marginTop:2}}/><span>Toutes les requêtes doivent être sur HTTPS. Ne jamais exposer vos clés côté client.</span></InfoBox>
        <ArticleCard>
          <ArticleTitle>Obtenir votre clé API</ArticleTitle>
          <ArticleText>Dashboard → Développeurs → Clés API. Copiez-la immédiatement, elle ne sera plus affichée.</ArticleText>
        </ArticleCard>
        <CopyableCode lang="bash" code={`<span style="color:#94a3b8"># Authentification Bearer</span>
curl -X GET https://api.visiconnect.com/v1/meetings \\
  -H <span style="color:#34d399">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -H <span style="color:#34d399">"Content-Type: application/json"</span>`}/>
        <ArticleCard>
          <ArticleTitle>Endpoints OAuth 2.0</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Endpoint</th><th>URL</th></tr></thead>
            <tbody>
              <tr><td>Authorization</td><td><code>https://auth.visiconnect.com/oauth/authorize</code></td></tr>
              <tr><td>Token</td><td><code>https://auth.visiconnect.com/oauth/token</code></td></tr>
              <tr><td>Refresh</td><td><code>https://auth.visiconnect.com/oauth/refresh</code></td></tr>
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
      </div>
    );
    case 'api-rest':return(
      <div>
        <ContentHeader>
          <ContentBadge><Terminal size={11}/>REST API</ContentBadge>
          <ContentTitle>Référence REST API</ContentTitle>
          <ContentSubtitle>API RESTful complète pour intégrer VisioConnect dans vos applications.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>URL de base</ArticleTitle>
          <CopyableCode lang="text" code="https://api.visiconnect.com/v1"/>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>Créer une réunion</ArticleTitle>
          <CopyableCode lang="javascript" code={`<span style="color:#60a5fa">const</span> response = <span style="color:#60a5fa">await</span> fetch(<span style="color:#34d399">'https://api.visiconnect.com/v1/meetings'</span>, {
  method: <span style="color:#34d399">'POST'</span>,
  headers: {
    <span style="color:#34d399">'Authorization'</span>: <span style="color:#34d399">\`Bearer \${API_KEY}\`</span>,
    <span style="color:#34d399">'Content-Type'</span>: <span style="color:#34d399">'application/json'</span>,
  },
  body: JSON.stringify({
    title: <span style="color:#34d399">'Réunion équipe product'</span>,
    scheduled_at: <span style="color:#34d399">'2026-04-25T10:00:00Z'</span>,
    duration_minutes: <span style="color:#f59e0b">60</span>,
    settings: { waiting_room: <span style="color:#60a5fa">true</span>, recording: <span style="color:#60a5fa">true</span> },
  }),
});
<span style="color:#94a3b8">// → { join_url: "https://meet.visiconnect.com/abc123" }</span>`}/>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>Endpoints disponibles</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Méthode</th><th>Endpoint</th><th>Description</th></tr></thead>
            <tbody>
              {[['GET','/meetings','Lister les réunions'],['POST','/meetings','Créer une réunion'],
                ['GET','/meetings/:id','Détails'],['DELETE','/meetings/:id','Supprimer'],
                ['GET','/users','Utilisateurs'],['POST','/users/invite','Inviter'],
                ['GET','/recordings','Enregistrements'],['GET','/analytics/usage','Statistiques'],
              ].map(([m,p,d])=>(
                <tr key={p}>
                  <td><Badge $color={m==='GET'?'blue':m==='POST'?'green':'orange'}>{m}</Badge></td>
                  <td><code>{p}</code></td><td>{d}</td>
                </tr>
              ))}
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
      </div>
    );
    case 'webhooks':return(
      <div>
        <ContentHeader>
          <ContentBadge><Zap size={11}/>Webhooks</ContentBadge>
          <ContentTitle>Webhooks</ContentTitle>
          <ContentSubtitle>Notifications temps réel pour tous les événements VisioConnect.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>Événements disponibles</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Événement</th><th>Déclencheur</th></tr></thead>
            <tbody>
              {[['meeting.created','Nouvelle réunion'],['meeting.started','Réunion démarrée'],
                ['meeting.ended','Réunion terminée'],['participant.joined','Participant rejoint'],
                ['recording.ready','Enregistrement disponible'],['user.invited','Utilisateur invité'],
              ].map(([ev,d])=><tr key={ev}><td><code>{ev}</code></td><td>{d}</td></tr>)}
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>Exemple payload</ArticleTitle>
          <CopyableCode lang="json" code={`{
  <span style="color:#34d399">"event"</span>: <span style="color:#34d399">"meeting.ended"</span>,
  <span style="color:#34d399">"timestamp"</span>: <span style="color:#34d399">"2026-04-25T11:02:47Z"</span>,
  <span style="color:#34d399">"data"</span>: {
    <span style="color:#34d399">"meeting_id"</span>: <span style="color:#34d399">"m_abc123"</span>,
    <span style="color:#34d399">"duration_seconds"</span>: <span style="color:#f59e0b">3612</span>,
    <span style="color:#34d399">"participants_count"</span>: <span style="color:#f59e0b">8</span>
  }
}`}/>
        </ArticleCard>
      </div>
    );
    case 'sso':return(
      <div>
        <ContentHeader>
          <ContentBadge><Lock size={11}/>Admin</ContentBadge>
          <ContentTitle>Configuration SSO</ContentTitle>
          <ContentSubtitle>Intégrez votre fournisseur d'identité SAML 2.0 ou OIDC.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>Protocoles supportés</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Protocole</th><th>Fournisseurs</th><th>Statut</th></tr></thead>
            <tbody>
              <tr><td>SAML 2.0</td><td>Okta, Azure AD, OneLogin</td><td><Badge $color="green">Disponible</Badge></td></tr>
              <tr><td>OIDC / OAuth2</td><td>Google Workspace, Auth0</td><td><Badge $color="green">Disponible</Badge></td></tr>
              <tr><td>LDAP</td><td>Active Directory</td><td><Badge $color="blue">Enterprise</Badge></td></tr>
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>URLs de configuration SAML</ArticleTitle>
          {[['ACS URL','https://auth.visiconnect.com/sso/saml/callback'],
            ['Entity ID','https://auth.visiconnect.com/sso/saml/metadata'],
          ].map(([k,v])=>(
            <div key={k} style={{marginBottom:'0.75rem'}}>
              <div style={{fontSize:'.78rem',fontWeight:700,color:C.muted,marginBottom:4}}>{k}</div>
              <code style={{fontSize:'.84rem',color:C.primary,wordBreak:'break-all'}}>{v}</code>
            </div>
          ))}
        </ArticleCard>
      </div>
    );
    case 'security':return(
      <div>
        <ContentHeader>
          <ContentBadge><ShieldCheck size={11}/>Sécurité</ContentBadge>
          <ContentTitle>Sécurité & Conformité</ContentTitle>
          <ContentSubtitle>Chiffrement, certifications et conformité RGPD.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>Chiffrement</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Couche</th><th>Protocole</th><th>Usage</th></tr></thead>
            <tbody>
              <tr><td>Transport</td><td>TLS 1.3</td><td>Toutes les connexions</td></tr>
              <tr><td>Médias</td><td>SRTP / DTLS</td><td>Flux vidéo & audio</td></tr>
              <tr><td>E2E</td><td>AES-256-GCM</td><td>Réunions sensibles</td></tr>
              <tr><td>Stockage</td><td>AES-256</td><td>Données au repos</td></tr>
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>Certifications</ArticleTitle>
          <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap',marginTop:'.75rem'}}>
            {['ISO 27001','SOC 2 Type II','RGPD','HIPAA','HDS'].map(c=>(
              <Badge key={c} $color="green" style={{padding:'5px 12px',fontSize:'.82rem'}}>{c}</Badge>
            ))}
          </div>
        </ArticleCard>
        <InfoBox $type="warning"><ShieldCheck size={16} style={{flexShrink:0,marginTop:2}}/><span>Le mode E2E désactive la transcription et l'enregistrement cloud.</span></InfoBox>
      </div>
    );
    case 'deploy':return(
      <div>
        <ContentHeader>
          <ContentBadge><Globe size={11}/>Déploiement</ContentBadge>
          <ContentTitle>Guide de déploiement</ContentTitle>
          <ContentSubtitle>SaaS, cloud privé ou on-premise selon vos besoins.</ContentSubtitle>
        </ContentHeader>
        <ArticleCard>
          <ArticleTitle>Options</ArticleTitle>
          <TableWrap><Table>
            <thead><tr><th>Mode</th><th>Hébergement</th><th>Plan</th></tr></thead>
            <tbody>
              <tr><td>SaaS</td><td>Cloud VisioConnect</td><td><Badge $color="green">Tous</Badge></td></tr>
              <tr><td>Cloud privé</td><td>AWS / Azure / GCP</td><td><Badge $color="blue">Pro</Badge></td></tr>
              <tr><td>On-premise</td><td>Vos serveurs</td><td><Badge $color="orange">Enterprise</Badge></td></tr>
            </tbody>
          </Table></TableWrap>
        </ArticleCard>
        <ArticleCard>
          <ArticleTitle>Docker Compose (on-premise)</ArticleTitle>
          <CopyableCode lang="yaml" code={`<span style="color:#94a3b8"># docker-compose.yml</span>
version: <span style="color:#34d399">'3.8'</span>
services:
  visiconnect:
    image: <span style="color:#34d399">visiconnect/server:latest</span>
    ports:
      - <span style="color:#34d399">"443:443"</span>
    environment:
      - LICENSE_KEY=<span style="color:#34d399">YOUR_LICENSE</span>
      - DATABASE_URL=<span style="color:#34d399">postgresql://...</span>
  redis:
    image: <span style="color:#34d399">redis:7-alpine</span>`}/>
        </ArticleCard>
      </div>
    );
    default:return null;
  }
};

// ─── Nav data ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  {id:'getting-started',label:'Premiers pas',    icon:Rocket,       group:'Guide utilisateur'},
  {id:'meetings',        label:'Réunions',        icon:Video,        group:'Guide utilisateur'},
  {id:'account',         label:'Compte & Profil', icon:Users,        group:'Guide utilisateur'},
  {id:'api-auth',        label:'Authentification',icon:Key,          group:'API & Dev'},
  {id:'api-rest',        label:'REST API',         icon:Terminal,     group:'API & Dev'},
  {id:'webhooks',        label:'Webhooks',         icon:Zap,          group:'API & Dev'},
  {id:'sso',             label:'Configuration SSO',icon:Lock,         group:'Admin & Sécurité'},
  {id:'security',        label:'Sécurité',         icon:ShieldCheck,  group:'Admin & Sécurité'},
  {id:'deploy',          label:'Déploiement',      icon:Globe,        group:'Admin & Sécurité'},
];
const QUICK_LINKS = [
  {icon:Rocket,     label:'Démarrage', desc:'Votre 1ère réunion', id:'getting-started'},
  {icon:Code2,      label:'API',       desc:'Référence REST',     id:'api-rest'},
  {icon:ShieldCheck,label:'Sécurité',  desc:'Chiffrement',        id:'security'},
  {icon:Settings,   label:'Admin',     desc:'SSO & déploiement',  id:'sso'},
];

// ─── Page component ───────────────────────────────────────────────────────────
const DocsPage = () => {
  const {t} = useTranslation();
  const [activeSection, setActiveSection] = useState('getting-started');
  const [query, setQuery] = useState('');
  const contentRef = useRef(null);
  const groups = [...new Set(SECTIONS.map(s=>s.group))];
  const filtered = query.trim()
    ? SECTIONS.filter(s=>s.label.toLowerCase().includes(query.toLowerCase()))
    : SECTIONS;

  const handleNav = (id) => {
    setActiveSection(id);
    if(contentRef.current) contentRef.current.scrollIntoView({behavior:'smooth',block:'start'});
  };

  return (
    <Page>
      <HeaderClean/>
      <Main>
        <HeroSection>
          <HeroContainer>
            <HeroContent>
              <Eyebrow><FileText size={14}/>Documentation</Eyebrow>
              <HeroTitle>{t('docs.hero.title')}</HeroTitle>
              <HeroSubtitle>{t('docs.hero.subtitle')}</HeroSubtitle>
              <SearchBar>
                <Search size={18}/>
                <SearchInput
                  type="text" placeholder={t('docs.search')}
                  value={query}
                  onChange={e=>{
                    setQuery(e.target.value);
                    if(e.target.value&&filtered.length>0) handleNav(filtered[0].id);
                  }}
                />
              </SearchBar>
            </HeroContent>
            <HeroPanel>
              <PanelTitle>Accès rapide</PanelTitle>
              <QuickLinkGrid>
                {QUICK_LINKS.map(({icon:Icon,label,desc,id})=>(
                  <QuickLinkCard key={id} onClick={()=>handleNav(id)}>
                    <Icon size={20} className="icon"/>
                    <span className="label">{label}</span>
                    <span className="desc">{desc}</span>
                  </QuickLinkCard>
                ))}
              </QuickLinkGrid>
            </HeroPanel>
          </HeroContainer>
        </HeroSection>

        <DocsWrapper>
          <Sidebar>
            {groups.map(group=>{
              const items = filtered.filter(s=>s.group===group);
              if(!items.length) return null;
              return(
                <SidebarSection key={group}>
                  <SidebarHeading>{group}</SidebarHeading>
                  {items.map(({id,label,icon:Icon})=>(
                    <SidebarItem key={id} $active={activeSection===id} onClick={()=>handleNav(id)}>
                      <Icon size={15}/>{label}
                    </SidebarItem>
                  ))}
                </SidebarSection>
              );
            })}
          </Sidebar>
          <Content ref={contentRef} key={activeSection}>
            <SectionContent id={activeSection}/>
          </Content>
        </DocsWrapper>

        <CallToAction
          eyebrow="Support"
          title={t('docs.cta.title')}
          description={t('docs.cta.description')}
          buttonText={t('docs.cta.button')}
          buttonLink="/contact"
          secondaryText="Voir le statut"
          secondaryLink="/status"
        />
      </Main>
      <FooterClean/>
    </Page>
  );
};

export default DocsPage;
