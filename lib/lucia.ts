// lib/lucia.ts
import lucia from "lucia";
import prismaAdapter from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";

export const auth = lucia({
    adapter: prismaAdapter(prisma),
    env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
    transformDatabaseUser: (userData) => ({
        id: userData.id,
        email: userData.email,
    }),
});

export type Auth = typeof auth;
