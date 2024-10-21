import speakeasy from 'speakeasy';

export const generate2FASecret = (): speakeasy.GeneratedSecret => {
  const secret = speakeasy.generateSecret({ length: 20 });
  return secret;
};

export const verify2FAToken = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
  });
};
