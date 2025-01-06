import { PrismaClient } from "@prisma/client";

// 为了避免 Next.js 在开发模式下的热更新频繁创建 Prisma 客户端实例，
// 使用 globalThis 存储 Prisma 客户端实例。globalThis 在热更新中不会被重置，
// 因此可以确保在整个应用生命周期中只创建一个 Prisma 客户端实例。

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// export const db = new PrismaClient();
