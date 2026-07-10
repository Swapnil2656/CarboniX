/**
 * Auth-specific DB abstraction layer.
 * Wraps Prisma calls for user, verificationToken, and profile (created on signup).
 * Extend this for your app-specific models.
 */
import { userType } from "@/generated/prisma";
import { prisma } from "./prisma";

export const db = {
    user: {
        create: async (data: {
            userName: string;
            email: string;
            password: string;
            type?: userType;
            isOnboarded?: boolean;
        }) => prisma.user.create({ data }),

        findUnique: async (where: { id?: string; email?: string; userName?: string }) => {
            if (where.id) {
                return prisma.user.findUnique({ where: { id: where.id } });
            }
            if (where.email) {
                return prisma.user.findUnique({ where: { email: where.email } });
            }
            if (where.userName) {
                return prisma.user.findUnique({ where: { userName: where.userName } });
            }
            throw new Error("Provide id, email, or userName for findUnique");
        },

        update: async (
            where: { id: string },
            data: {
                userName?: string;
                email?: string;
                password?: string;
                isVerified?: boolean;
                type?: userType;
            }
        ) => prisma.user.update({ where, data }),
    },

    verificationToken: {
        create: async (data: { token: string; userId: string; expires: Date }) =>
            prisma.verificationToken.create({ data }),

        findUnique: async (where: { token: string }) =>
            prisma.verificationToken.findUnique({ where }),

        delete: async (where: { id: string }) =>
            prisma.verificationToken.delete({ where }),
    },

    profile: {
        create: async (data: { userId: string; fullName?: string }) =>
            prisma.profile.create({ data }),

        findUnique: async (where: { userId: string }) =>
            prisma.profile.findUnique({ where }),

        update: async (
            where: { userId: string },
            data: { fullName?: string; avatarUrl?: string; phoneNumber?: string }
        ) => prisma.profile.update({ where, data }),
    },
};
