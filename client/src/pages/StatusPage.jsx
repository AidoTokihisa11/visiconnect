import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Video, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Database, 
  Server, 
  Monitor, 
  Battery
} from 'lucide-react';
import { useSystemMetrics } from '../hooks/useSystemMetrics';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #00ff88;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid #333;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const MainContent = styled.main`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const OverallStatus = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
  border: 2px solid #00ff88;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00e67a);
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const StatusIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.status === 'operational' ? 'rgba(0, 255, 136, 0.2)' : 
                       props.status === 'degraded' ? 'rgba(255, 193, 7, 0.2)' : 
                       'rgba(255, 68, 68, 0.2)'};
  color: ${props => props.status === 'operational' ? '#00ff88' : 
                    props.status === 'degraded' ? '#ffc107' : 
                    '#ff4444'};
  animation: ${props => props.status === 'operational' ? pulse : 'none'} 2s infinite;
`;

const StatusText = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #00ff88;
  margin: 0;
`;

const StatusDescription = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin: 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const MetricCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.color || '#00ff88'};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const MetricTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const MetricIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.color || '#00ff88'};
  color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${props => props.color || '#00ff88'};
  margin-bottom: 0.5rem;
`;

const MetricUnit = styled.span`
  font-size: 1rem;
  color: #888;
  font-weight: 500;
`;

const MetricChart = styled.div`
  height: 60px;
  background: #0a0a0a;
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
`;

const ChartBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 4px;
  background: ${props => props.color || '#00ff88'};
  border-radius: 2px 2px 0 0;
  transition: height 0.5s ease;
  left: ${props => props.index * 6}px;
  height: ${props => props.height}%;
  opacity: ${props => 1 - (props.index * 0.02)};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
    transform: translateY(-2px);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ServiceIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.status === 'operational' ? 'rgba(0, 255, 136, 0.1)' : 
                       props.status === 'degraded' ? 'rgba(255, 193, 7, 0.1)' : 
                       'rgba(255, 68, 68, 0.1)'};
  color: ${props => props.status === 'operational' ? '#00ff88' : 
                    props.status === 'degraded' ? '#ffc107' : 
                    '#ff4444'};
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ServiceStatus = styled.div`
  font-size: 0.9rem;
  color: ${props => props.status === 'operational' ? '#00ff88' : 
                    props.status === 'degraded' ? '#ffc107' : 
                    '#ff4444'};
  font-weight: 600;
`;

const ServiceMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ServiceMetric = styled.div`
  text-align: center;
  padding: 1rem;
  background: #0a0a0a;
  border-radius: 12px;
  border: 1px solid #222;
`;

const ServiceMetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || '#00ff88'};
  margin-bottom: 0.25rem;
`;

const ServiceMetricLabel = styled.div`
  font-size: 0.8rem;
  color: #888;
  font-weight: 500;
`;

const IncidentsSection = styled.section`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
`;

const IncidentCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${props => props.severity === 'high' ? '#ff4444' : 
                                   props.severity === 'medium' ? '#ffc107' : 
                                   '#00ff88'};
`;

const IncidentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const IncidentTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const IncidentTime = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const IncidentDescription = styled.p`
  color: #ccc;
  margin: 0;
  line-height: 1.5;
`;

const StatusPage = () => {
  const navigate = useNavigate();
  const { metrics, serverMetrics } = useSystemMetrics();
  
  const [chartData, setChartData] = useState({
    responseTime: Array.from({ length: 50 }, () => Math.random() * 100),
    throughput: Array.from({ length: 50 }, () => Math.random() * 100),
    cpuUsage: Array.from({ length: 50 }, () => Math.random() * 100),
    memoryUsage: Array.from({ length: 50 }, () => Math.random() * 100)
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Mettre à jour les graphiques avec les vraies données
    const interval = setInterval(() => {
      setChartData(prev => ({
        responseTime: [...prev.responseTime.slice(1), serverMetrics.responseTime || Math.random() * 100],
        throughput: [...prev.throughput.slice(1), serverMetrics.activeConnections * 10 || Math.random() * 100],
        cpuUsage: [...prev.cpuUsage.slice(1), serverMetrics.cpuUsage || Math.random() * 100],
        memoryUsage: [...prev.memoryUsage.slice(1), metrics.memory.percentage || Math.random() * 100]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [metrics, serverMetrics]);

  const services = [
    { 
      name: 'Serveur Principal', 
      status: serverMetrics.uptime > 0 ? 'operational' : 'degraded', 
      description: `Uptime: ${Math.floor(serverMetrics.uptime / 3600)}h ${Math.floor((serverMetrics.uptime % 3600) / 60)}m`,
      icon: <Server size={24} />,
      metrics: {
        uptime: Math.min(99.99, (serverMetrics.uptime / 86400) * 100),
        responseTime: serverMetrics.responseTime || 0,
        connections: serverMetrics.activeConnections || 0
      }
    },
    { 
      name: 'Système Client', 
      status: 'operational', 
      description: `${metrics.userAgent.browser} sur ${metrics.userAgent.os}`,
      icon: <Monitor size={24} />,
      metrics: {
        memory: metrics.memory.percentage || 0,
        screen: `${metrics.screen.width}x${metrics.screen.height}`,
        device: metrics.userAgent.device
      }
    },
    { 
      name: 'Réseau', 
      status: metrics.connection.effectiveType === '4g' ? 'operational' : 'degraded', 
      description: `Connexion ${metrics.connection.effectiveType || 'inconnue'}`,
      icon: <Wifi size={24} />,
      metrics: {
        type: metrics.connection.effectiveType || 'unknown',
        downlink: metrics.connection.downlink || 0,
        rtt: metrics.connection.rtt || 0
      }
    },
    { 
      name: 'Performance', 
      status: metrics.performance.loadTime < 3000 ? 'operational' : 'degraded', 
      description: 'Temps de chargement optimisé',
      icon: <Activity size={24} />,
      metrics: {
        loadTime: metrics.performance.loadTime || 0,
        domReady: metrics.performance.domContentLoaded || 0,
        firstPaint: Math.round(metrics.performance.firstPaint) || 0
      }
    },
    { 
      name: 'Batterie', 
      status: metrics.battery.level > 20 ? 'operational' : 'degraded', 
      description: metrics.battery.charging ? 'En charge' : 'Sur batterie',
      icon: <Battery size={24} />,
      metrics: {
        level: metrics.battery.level || 0,
        charging: metrics.battery.charging ? 'Oui' : 'Non',
        remaining: Math.floor((metrics.battery.dischargingTime || 0) / 3600)
      }
    },
    { 
      name: 'Serveur Système', 
      status: 'operational', 
      description: `${serverMetrics.activeRooms || 0} salles actives`,
      icon: <Database size={24} />,
      metrics: {
        rooms: serverMetrics.activeRooms || 0,
        users: serverMetrics.activeUsers || 0,
        memory: serverMetrics.memoryUsage || 0
      }
    }
  ];

  const incidents = [
    {
      title: "Maintenance programmée CDN",
      description: "Mise à jour des serveurs européens pour améliorer les performances",
      time: "Il y a 2 heures",
      severity: "low"
    },
    {
      title: "Résolu: Latence élevée région Asie",
      description: "Problème de routage résolu, performances normales rétablies",
      time: "Il y a 6 heures",
      severity: "medium"
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'operational': return <CheckCircle size={24} />;
      case 'degraded': return <AlertCircle size={24} />;
      default: return <Clock size={24} />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'operational': return 'Tous les systèmes opérationnels';
      case 'degraded': return 'Performance dégradée';
      default: return 'Maintenance en cours';
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded';

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Retour
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Statut Système
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Surveillance en temps réel de nos services et infrastructure
        </Subtitle>

        <OverallStatus
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatusIndicator>
            <StatusIcon status={overallStatus}>
              {getStatusIcon(overallStatus)}
            </StatusIcon>
            <div>
              <StatusText>{getStatusText(overallStatus)}</StatusText>
              <StatusDescription>
                Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
              </StatusDescription>
            </div>
          </StatusIndicator>
        </OverallStatus>

        <MetricsGrid>
          <MetricCard
            color="#00ff88"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MetricHeader>
              <MetricTitle>Temps de réponse</MetricTitle>
              <MetricIcon color="#00ff88">
                <Activity size={20} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue color="#00ff88">
              {Math.round(serverMetrics.responseTime || 0)}<MetricUnit>ms</MetricUnit>
            </MetricValue>
            <MetricChart>
              {chartData.responseTime.map((value, index) => (
                <ChartBar
                  key={index}
                  height={value}
                  index={index}
                  color="#00ff88"
                />
              ))}
            </MetricChart>
          </MetricCard>

          <MetricCard
            color="#4ecdc4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MetricHeader>
              <MetricTitle>Débit</MetricTitle>
              <MetricIcon color="#4ecdc4">
                <Wifi size={20} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue color="#4ecdc4">
              {Math.round(serverMetrics.activeConnections || 0)}<MetricUnit>conn</MetricUnit>
            </MetricValue>
            <MetricChart>
              {chartData.throughput.map((value, index) => (
                <ChartBar
                  key={index}
                  height={value}
                  index={index}
                  color="#4ecdc4"
                />
              ))}
            </MetricChart>
          </MetricCard>

          <MetricCard
            color="#ff6b6b"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <MetricHeader>
              <MetricTitle>CPU</MetricTitle>
              <MetricIcon color="#ff6b6b">
                <Cpu size={20} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue color="#ff6b6b">
              {Math.round(serverMetrics.cpuUsage || 0)}<MetricUnit>%</MetricUnit>
            </MetricValue>
            <MetricChart>
              {chartData.cpuUsage.map((value, index) => (
                <ChartBar
                  key={index}
                  height={value}
                  index={index}
                  color="#ff6b6b"
                />
              ))}
            </MetricChart>
          </MetricCard>

          <MetricCard
            color="#a55eea"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MetricHeader>
              <MetricTitle>Mémoire</MetricTitle>
              <MetricIcon color="#a55eea">
                <HardDrive size={20} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue color="#a55eea">
              {Math.round(metrics.memory.percentage || 0)}<MetricUnit>%</MetricUnit>
            </MetricValue>
            <MetricChart>
              {chartData.memoryUsage.map((value, index) => (
                <ChartBar
                  key={index}
                  height={value}
                  index={index}
                  color="#a55eea"
                />
              ))}
            </MetricChart>
          </MetricCard>
        </MetricsGrid>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <ServiceHeader>
                <ServiceIcon status={service.status}>
                  {service.icon}
                </ServiceIcon>
                <ServiceInfo>
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceStatus status={service.status}>
                    {service.description}
                  </ServiceStatus>
                </ServiceInfo>
              </ServiceHeader>
              
              <ServiceMetrics>
                {Object.entries(service.metrics).map(([key, value]) => (
                  <ServiceMetric key={key}>
                    <ServiceMetricValue color={service.status === 'operational' ? '#00ff88' : '#ffc107'}>
                      {typeof value === 'number' ? Math.round(value * 100) / 100 : value}
                    </ServiceMetricValue>
                    <ServiceMetricLabel>
                      {key === 'uptime' ? 'Uptime %' :
                       key === 'responseTime' ? 'Réponse ms' :
                       key === 'requests' ? 'Req/s' :
                       key === 'latency' ? 'Latence ms' :
                       key === 'quality' ? 'Qualité %' :
                       key === 'usage' ? 'Usage %' :
                       key === 'speed' ? 'Vitesse MB/s' :
                       key === 'success' ? 'Succès %' :
                       key === 'delivery' ? 'Livraison %' :
                       key === 'coverage' ? 'Couverture %' :
                       key}
                    </ServiceMetricLabel>
                  </ServiceMetric>
                ))}
              </ServiceMetrics>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <IncidentsSection>
          <SectionTitle>Incidents récents</SectionTitle>
          {incidents.map((incident, index) => (
            <IncidentCard
              key={index}
              severity={incident.severity}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
            >
              <IncidentHeader>
                <IncidentTitle>{incident.title}</IncidentTitle>
                <IncidentTime>{incident.time}</IncidentTime>
              </IncidentHeader>
              <IncidentDescription>{incident.description}</IncidentDescription>
            </IncidentCard>
          ))}
        </IncidentsSection>
      </MainContent>
    </Container>
  );
};

export default StatusPage;
