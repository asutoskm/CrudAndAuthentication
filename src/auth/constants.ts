// constants.ts
/**
 * JWT (JSON Web Token) constants for token generation and verification.
 * The `secret` is used to sign the tokens. It should be a complex and unique string.
 * IMPORTANT: For production, it's crucial to store secrets outside of the codebase and
 * use environment variables or a secure secrets manager.
 */
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'elonmusk', // Replace 'elonmusk' with a strong default secret or remove it entirely.
};