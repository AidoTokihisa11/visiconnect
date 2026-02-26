import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import LegalLayout from '../components/LegalLayout';
import CallToAction from '../components/CallToAction';

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 24px;
`;

const ListItem = styled.li`
  margin-bottom: 12px;
`;

const TermsPage = () => {
    const { t } = useTranslation();

    return (
        <LegalLayout title={t('termsOfUse')} lastUpdated="21 Février 2024">
            <Paragraph>
                Bienvenue sur VisiConnect. En accédant ou en utilisant notre site web et nos services, vous acceptez d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
            </Paragraph>

            <SectionTitle>1. Accès aux Services</SectionTitle>
            <Paragraph>
                VisiConnect vous accorde une licence limitée, non exclusive et révocable pour utiliser ses services conformément à ces conditions. Vous vous engagez à ne pas utiliser le service à des fins illégales ou interdites par ces conditions.
            </Paragraph>

            <SectionTitle>2. Comptes Utilisateurs</SectionTitle>
            <Paragraph>
                Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe, ainsi que de toutes les activités qui se produisent sous votre compte.
            </Paragraph>

            <SectionTitle>3. Utilisation Acceptable</SectionTitle>
            <Paragraph>
                Vous acceptez de ne pas :
            </Paragraph>
            <List>
                <ListItem>Utiliser le service pour transmettre du contenu illégal ou nuisible.</ListItem>
                <ListItem>Tenter d'accéder sans autorisation à nos systèmes ou réseaux.</ListItem>
                <ListItem>Interférer avec l'utilisation du service par d'autres utilisateurs.</ListItem>
                <ListItem>Revendre ou exploiter commercialement le service sans autorisation.</ListItem>
            </List>

            <SectionTitle>4. Propriété Intellectuelle</SectionTitle>
            <Paragraph>
                Le service et son contenu original, ses fonctionnalités et ses fonctionnalités sont et resteront la propriété exclusive de VisiConnect et de ses concédants de licence.
            </Paragraph>
            
            <SectionTitle>5. Résiliation</SectionTitle>
            <Paragraph>
                Nous pouvons résilier ou suspendre votre accès immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans s'y limiter, si vous enfreignez les Conditions.
            </Paragraph>

            <CallToAction 
                title="Besoin de précisions ?"
                description="Notre équipe juridique est disponible pour répondre à vos questions concernant nos conditions d'utilisation."
                buttonText="Contactez-nous"
                buttonLink="/contact"
            />
        </LegalLayout>
    );
};

export default TermsPage;
