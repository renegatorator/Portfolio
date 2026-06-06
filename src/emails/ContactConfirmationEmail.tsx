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
  emailHeading as headingStyle,
  emailLogoSection as logoSection,
  emailMain as main,
  emailParagraph as paragraph,
} from '@/emails/styles';

interface ContactConfirmationEmailProps {
  logoUrl: string;
  name: string;
  preview: string;
  heading: string;
  greeting: string;
  body: string;
  outro: string;
  signature: string;
}

const ContactConfirmationEmail = ({
  body,
  greeting,
  heading,
  logoUrl,
  name,
  outro,
  preview,
  signature,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img src={logoUrl} alt="Rene Krajnc" width="200" height="40" />
          </Section>

          <Heading style={headingStyle}>{heading}</Heading>

          <Text style={paragraph}>{greeting.replace('{{name}}', name)}</Text>
          <Text style={paragraph}>{body}</Text>

          <Hr style={divider} />

          <Text style={paragraph}>{outro}</Text>
          <Text style={signatureStyle}>{signature}</Text>
        </Container>
      </Body>
    </Html>
  );
};

const signatureStyle: CSSProperties = {
  color: '#111827',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '24px',
  margin: 0,
};

export default ContactConfirmationEmail;
