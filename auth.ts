import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import axios from "axios";

import type { NextAuthConfig, Session } from "next-auth";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const microsoftClientId = process.env.AZURE_AD_CLIENT_ID;
const microsoftClientSecret = process.env.AZURE_AD_CLIENT_SECRET;
const microsoftTenantId = process.env.AZURE_AD_TENANT_ID;

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/calendar",
          ].join(" "),
          response: "code",
        },
      },
    }),
    AzureADProvider({
      clientId: microsoftClientId,
      clientSecret: microsoftClientSecret,
      tenantId: microsoftTenantId,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      return !!auth;
    },
    async signIn({ user, account, profile }) {
      if (user.email && user.name) {
        try {
          const fullName = user.name.split(" ");
          const fisrtName = fullName[0];
          const lastName = fullName[1];

          await axios.post(`${process.env.NEXTAUTH_URL}/api/add-user`, {
            email: user.email,
            first_name: fisrtName,
            last_name: lastName,
          });
        } catch (error) {
          console.error("Error while saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID as string,
              client_secret: process.env.AUTH_GOOGLE_SECRET as string,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
  },
} satisfies NextAuthConfig;

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);
