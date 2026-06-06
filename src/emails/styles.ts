import type { CSSProperties } from 'react';

// Shared inline styles for the transactional email templates. React Email requires plain
// inline style objects (no CSS modules / classes), so these are colocated and reused across
// the inquiry and confirmation emails to keep their shell visually identical.

export const emailMain: CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  margin: '0 auto',
};

export const emailContainer: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  margin: '40px auto',
  maxWidth: '560px',
  padding: '32px',
};

export const emailLogoSection: CSSProperties = {
  marginBottom: '24px',
};

export const emailHeading: CSSProperties = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0 0 16px',
};

export const emailParagraph: CSSProperties = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

export const emailDivider: CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '24px 0 16px',
};
