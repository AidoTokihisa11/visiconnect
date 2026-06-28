import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Building2, MapPin, CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';

const contactAddress = ['contact', 'visioconnect.pro'].join('@');

const PageLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 8rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MainHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  width: 100%;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;

    span {
      color: #2563eb;
    }

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.125rem;
    color: #475569;
    line-height: 1.6;
  }
`;

const ContactContainer = styled(motion.div)`
  max-width: 1100px;
  width: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px -10px rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  overflow: hidden;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  width: 38%;
  background: #eff6ff;
  border-right: 1px solid #e2e8f0;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 3rem 2rem;
  }
`;

const PanelContent = styled.div`
  position: relative;
  z-index: 2;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 0.75rem;
  }

  p.desc {
    color: #475569;
    margin-bottom: 3rem;
    line-height: 1.6;
    font-size: 1.05rem;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 2.25rem;

  .icon-container {
    width: 44px;
    height: 44px;
    background: white;
    border: 1px solid #bfdbfe;
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    flex-shrink: 0;
  }

  .text-container {
    h4 {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin: 0 0 0.4rem 0;
      font-weight: 700;
    }
    p,
    a {
      color: #0f172a;
      font-size: 1rem;
      margin: 0;
      text-decoration: none;
      font-weight: 500;
      line-height: 1.5;
    }
    a:hover {
      color: #2563eb;
    }
  }
`;

const RightPanel = styled.div`
  width: 62%;
  padding: 4rem;
  background: white;

  @media (max-width: 992px) {
    width: 100%;
    padding: 3rem 2rem;
  }
  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155;
  }

  .sub-label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 400;
    margin-left: 0.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1.125rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: white;
  font-size: 1rem;
  color: #0f172a;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.125rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: white;
  font-size: 1rem;
  color: #0f172a;
  transition: all 0.2s ease;
  font-family: inherit;
  min-height: 140px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  select {
    width: 100%;
    padding: 0.875rem 3rem 0.875rem 1.125rem;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    background: white;
    font-size: 1rem;
    color: #0f172a;
    transition: all 0.2s ease;
    font-family: inherit;
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
  }

  .icon-right {
    position: absolute;
    right: 1.125rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    pointer-events: none;
  }
`;

const SubmitBtn = styled(motion.button)`
  background: #2563eb;
  color: white;
  border: none;
  padding: 1.125rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  width: 100%;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const AlertBox = styled(motion.div)`
  padding: 1rem 1.25rem;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 2rem;

  &.success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  &.error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export default function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', 'd56fc4c3-11c1-47e6-94ca-6e855cbb6872');

    const category = formData.get('category');
    const company = formData.get('company') || 'Particulier/Indépendant';
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const emailSubject = `[${category}] - Demande de ${firstName} ${lastName} (${company})`;

    formData.append('subject', emailSubject);
    formData.append('from_name', 'Direction VisioConnect');

    let nextStatus = 'error';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      nextStatus = data.success ? 'success' : 'error';

      if (nextStatus === 'success') {
        form.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(nextStatus);
      setIsSubmitting(false);

      if (nextStatus === 'success') {
        setTimeout(() => setStatus(null), 7000);
      }
    }
  };

  return (
    <PageLayout>
      <HeaderClean />
      <ContentWrapper>
        <MainHeader
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>
            {t('contact.header.title_part1')} <span>{t('contact.header.title_part2')}</span>
          </h1>
          <p>{t('contact.header.subtitle')}</p>
        </MainHeader>

        <ContactContainer
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Panneau d'Information (Couleurs claires VisioConnect) */}
          <LeftPanel>
            <PanelContent>
              <h3>{t('contact.info.title')}</h3>
              <p className="desc">{t('contact.info.desc')}</p>

              <InfoBlock>
                <div className="icon-container">
                  <Mail size={20} strokeWidth={2.5} />
                </div>
                <div className="text-container">
                  <h4>{t('contact.info.email_title')}</h4>
                  <a href={`mailto:${contactAddress}`}>{contactAddress}</a>
                </div>
              </InfoBlock>

              <InfoBlock>
                <div className="icon-container">
                  <Briefcase size={20} strokeWidth={2.5} />
                </div>
                <div className="text-container">
                  <h4>{t('contact.info.enterprise_title')}</h4>
                  <p>{t('contact.info.enterprise_desc')}</p>
                </div>
              </InfoBlock>

              <InfoBlock>
                <div className="icon-container">
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <div className="text-container">
                  <h4>{t('contact.info.hours_title')}</h4>
                  <p>
                    Lundi au Vendredi
                    <br />
                    09:00 - 18:00 (Paris)
                  </p>
                </div>
              </InfoBlock>
            </PanelContent>
          </LeftPanel>

          {/* Formulaire (Proportionné et responsive) */}
          <RightPanel>
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <AlertBox
                  key="success"
                  className="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0 }}
                >
                  <CheckCircle2 size={24} />
                  <div>
                    <strong>{t('contact.form.success_title')}</strong>
                    <br />
                    Notre équipe reviendra vers vous rapidement.
                  </div>
                </AlertBox>
              )}
              {status === 'error' && (
                <AlertBox
                  key="error"
                  className="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <AlertCircle size={24} />
                  <div>
                    <strong>{t('contact.form.error_title')}</strong>
                    <br />
                    Veuillez réessayer ou nous contacter directement par e-mail.
                  </div>
                </AlertBox>
              )}
            </AnimatePresence>

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <label htmlFor="firstName">{t('contact.form.first_name')}</label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={t('contact.form.first_name_placeholder')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="lastName">{t('contact.form.last_name')}</label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={t('contact.form.last_name_placeholder')}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label htmlFor="email">{t('contact.form.email')}</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('contact.form.email_placeholder')}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="phone">
                    Téléphone <span className="sub-label">(Optionnel)</span>
                  </label>
                  <Input type="tel" id="phone" name="phone" placeholder="+33 6 00 00 00 00" />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label htmlFor="company">{t('contact.form.company')}</label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={t('contact.form.company_placeholder')}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="category">{t('contact.form.category')}</label>
                <SelectWrapper>
                  <select id="category" name="category" required defaultValue="">
                    <option value="" disabled>
                      Sélectionnez un sujet...
                    </option>
                    <option value="Démo">{t('contact.form.category_options.demo')}</option>
                    <option value="Tarifs">Question sur les tarifs (Devis)</option>
                    <option value="Partenariat">Proposition de partenariat</option>
                    <option value="Support">{t('contact.form.category_options.support')}</option>
                    <option value="Autre">{t('contact.form.category_options.other')}</option>
                  </select>
                  <div className="icon-right">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <label htmlFor="message">{t('contact.form.message')}</label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder={t('contact.form.message_placeholder')}
                  required
                ></TextArea>
              </FormGroup>

              <SubmitBtn
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit_button')}
              </SubmitBtn>
            </Form>
          </RightPanel>
        </ContactContainer>
      </ContentWrapper>
      <FooterClean />
    </PageLayout>
  );
}
