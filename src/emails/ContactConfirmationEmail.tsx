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

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  margin: '0 auto',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  margin: '40px auto',
  maxWidth: '560px',
  padding: '32px',
};

const logoSection = {
  marginBottom: '24px',
};

const headingStyle = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0 0 16px',
};

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const signatureStyle = {
  color: '#111827',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '24px',
  margin: 0,
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0 16px',
};

export default ContactConfirmationEmail;
