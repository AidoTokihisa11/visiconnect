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

const CookiesPage = () => {
    const { t } = useTranslation();

    return (
        <LegalLayout title={t('cookiePolicy')} lastUpdated="21 Février 2024">
            <SectionTitle>1. Introduction</SectionTitle>
            <Paragraph>
              Chez VisioConnect, nous croyons en la transparence sur la façon dont nous utilisons vos données. Cette politique fournit des informations détaillées sur la manière et le moment où nous utilisons des cookies.
            </Paragraph>

            <SectionTitle>2. Qu'est-ce qu'un cookie ?</SectionTitle>
            <Paragraph>
              Les cookies sont de petits fichiers texte envoyés par nous à votre ordinateur ou appareil mobile. Ils sont propres à votre compte ou à votre navigateur. Les cookies basés sur la session durent uniquement tant que votre navigateur est ouvert et sont automatiquement supprimés lorsque vous le fermez. Les cookies persistants durent jusqu'à ce que vous ou votre navigateur les supprimiez ou jusqu'à leur expiration.
            </Paragraph>

            <SectionTitle>3. Comment utilisons-nous les cookies ?</SectionTitle>
            <Paragraph>
              Nous utilisons des cookies pour les objectifs suivants :
            </Paragraph>
            <List>
              <ListItem><strong>Authentification :</strong> Pour vous identifier lorsque vous visitez notre site et que vous vous connectez.</ListItem>
              <ListItem><strong>Sécurité :</strong> Pour prévenir les risques de sécurité et détecter les activités malveillantes.</ListItem>
              <ListItem><strong>Préférences :</strong> Pour mémoriser vos paramètres et préférences, comme votre langue préférée.</ListItem>
              <ListItem><strong>Performance :</strong> Pour comprendre comment vous utilisez nos services et améliorer l'expérience utilisateur.</ListItem>
            </List>

            <SectionTitle>4. Vos choix</SectionTitle>
            <Paragraph>
              Vous avez le droit de décider d'accepter ou de refuser les cookies. Vous pouvez exercer vos préférences en matière de cookies via les paramètres de votre navigateur. Notez que si vous choisissez de refuser les cookies, vous pourrez toujours utiliser notre site web, bien que votre accès à certaines fonctionnalités et zones de notre site puisse être restreint.
            </Paragraph>

            <CallToAction 
                title="Gérer vos préférences"
                description="Vous pouvez modifier vos préférences en matière de cookies à tout moment."
                buttonText="Paramètres des cookies"
                buttonLink="#"
            />
        </LegalLayout>
    );
};

export default CookiesPage;
