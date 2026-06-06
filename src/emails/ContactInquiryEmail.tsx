import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { CSSProperties } from 'react';

import {
  emailContainer as container,
  emailDivider as divider,
  emailHeading as heading,
  emailLogoSection as logoSection,
  emailMain as main,
  emailParagraph,
} from '@/emails/styles';

interface ContactInquiryEmailProps {
  logoUrl: string;
  name: string;
  email: string;
  message: string;
}

const ContactInquiryEmail = ({ logoUrl, name, email, message }: ContactInquiryEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img src={logoUrl} alt="Rene Krajnc" width="200" height="40" />
          </Section>

          <Heading style={heading}>New Contact Form Submission</Heading>

          <Text style={paragraph}>
            You have received a new message from your website contact form.
          </Text>

          <Section style={detailsSection}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Message</Text>
            <Text style={messageValue}>{message}</Text>
          </Section>

          <Hr style={divider} />
          <Text style={footer}>Reply directly to this email to contact the sender.</Text>
        </Container>
      </Body>
    </Html>
  );
};

const paragraph: CSSProperties = {
  ...emailParagraph,
  margin: '0 0 24px',
};

const detailsSection: CSSProperties = {
  backgroundColor: '#f9fafb',
  borderRadius: '10px',
  padding: '20px',
};

const label = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.08em',
  margin: '0 0 6px',
  textTransform: 'uppercase' as const,
};

const value = {
  color: '#111827',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 16px',
};

const messageValue = {
  color: '#111827',
  fontSize: '15px',
  lineHeight: '22px',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '20px',
  margin: 0,
};

export default ContactInquiryEmail;
