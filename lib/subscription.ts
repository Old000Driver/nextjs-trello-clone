import { auth } from "@clerk/nextjs";
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const { stripePriceId, stripeCurrentPeriodEnd } = orgSubscription;

  const isValid =
    stripePriceId &&
    stripeCurrentPeriodEnd &&
    stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
