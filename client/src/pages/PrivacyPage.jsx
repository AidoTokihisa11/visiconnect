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

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <LegalLayout title={t('privacyPolicy')} lastUpdated="21 Février 2024">
      <Paragraph>
        Chez VisiConnect, nous prenons votre confidentialité très au sérieux. Cette politique décrit
        comment nous recueillons, utilisons et protégeons vos informations personnelles lorsque vous
        utilisez nos services de visioconférence et de collaboration.
      </Paragraph>

      <SectionTitle>1. Collecte des Informations</SectionTitle>
      <Paragraph>
        Nous recueillons différents types d'informations pour vous fournir et améliorer notre
        Service :
      </Paragraph>
      <List>
        <ListItem>
          Des informations d'identification personnelle (Nom, adresse email, numéro de téléphone,
          etc.).
        </ListItem>
        <ListItem>
          Des données d'utilisation (adresse IP, type de navigateur, pages visitées).
        </ListItem>
        <ListItem>
          Des cookies et technologies de suivi pour améliorer votre expérience utilisateur.
        </ListItem>
      </List>

      <SectionTitle>2. Utilisation des Données</SectionTitle>
      <Paragraph>VisiConnect utilise les données collectées pour diverses finalités :</Paragraph>
      <List>
        <ListItem>Pour fournir et maintenir notre Service.</ListItem>
        <ListItem>Pour vous notifier des changements apportés à notre Service.</ListItem>
        <ListItem>
          Pour vous permettre d'utiliser les fonctionnalités interactives de notre Service.
        </ListItem>
        <ListItem>Pour fournir un support client et technique.</ListItem>
        <ListItem>
          Pour recueillir des analyses ou des informations précieuses afin d'améliorer notre
          Service.
        </ListItem>
      </List>

      <SectionTitle>3. Sécurité des Données</SectionTitle>
      <Paragraph>
        La sécurité de vos données est importante pour nous. Nous utilisons des protocoles de
        chiffrement avancés (tels que TLS/SSL) pour protéger vos informations lors de leur
        transmission sur Internet. Cependant, n'oubliez pas qu'aucune méthode de transmission sur
        Internet ou de stockage électronique n'est sûre à 100 %.
      </Paragraph>

      <SectionTitle>4. Vos Droits</SectionTitle>
      <Paragraph>
        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez de
        droits concernant vos données personnelles, notamment le droit d'accès, de rectification, de
        suppression et de limitation du traitement. Pour exercer ces droits, veuillez nous contacter
        via notre page de support.
      </Paragraph>

      <SectionTitle>5. Modifications de cette Politique</SectionTitle>
      <Paragraph>
        Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous
        informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur
        cette page.
      </Paragraph>

      <CallToAction
        title="Des questions sur vos données ?"
        description="Notre délégué à la protection des données est là pour répondre à toutes vos interrogations."
        buttonText="Contacter le DPO"
        buttonLink="/contact"
      />
    </LegalLayout>
  );
};

export default PrivacyPage;
