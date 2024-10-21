import axios, { AxiosResponse } from 'axios';

interface OAuthTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const getOAuthUrl = (provider: 'google' | 'github', clientId: string, redirectUri: string): string => {
  const urls: { [key: string]: string } = {
    google: `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email`,
    github: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`
  };
  return urls[provider];
};

export const getOAuthToken = async (
  provider: 'google' | 'github',
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<OAuthTokenResponse> => {
  const urls: { [key: string]: string } = {
    google: 'https://oauth2.googleapis.com/token',
    github: 'https://github.com/login/oauth/access_token'
  };

  const response: AxiosResponse<OAuthTokenResponse> = await axios.post(urls[provider], {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  return response.data;
};
