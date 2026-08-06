import { prisma } from "@/lib/prisma";

type SupabaseUser = {
  id: string;
  email?: string;
};

export async function syncUser(user: SupabaseUser) {
  if (!user.email) {
    throw new Error("User email is required");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
    },
  });
}