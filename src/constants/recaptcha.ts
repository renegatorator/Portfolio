// reCAPTCHA v3 action names. Shared between the client (token generation) and the server
// verification route so the action a token is minted for always matches what is validated.
export const RecaptchaActions = {
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
} as const;

export type RecaptchaAction = (typeof RecaptchaActions)[keyof typeof RecaptchaActions];
