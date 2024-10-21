declare module 'express-session' {
    interface Session {
        user: {
            id: string;
            role: string;
        };
    }
}

declare module 'jsonwebtoken' {
    interface JwtPayload {
        id: string;
        role: string;
    }
}