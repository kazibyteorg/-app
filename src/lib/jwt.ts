import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface JwtPayload {
  id: string;
  role: string;
}

export const generateToken = (user: { _id: string; role: string }): string => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET_KEY) as JwtPayload;
};

export const refreshToken = (token: string): string => {
  const decoded = jwt.verify(token, SECRET_KEY, { ignoreExpiration: true }) as JwtPayload;
  return jwt.sign({ id: decoded.id, role: decoded.role }, SECRET_KEY, { expiresIn: '1h' });
};
