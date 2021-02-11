export {};

declare module 'express-session' {
  interface SessionData {
    userID: number;
  }
}
