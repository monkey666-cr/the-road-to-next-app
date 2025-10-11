import { User as AuthUser } from "lucia";

type Entity = {
  userId: string | null;
};

export const isOwner = (
  user: AuthUser | null | undefined,
  entity: Entity | null | undefined
) => {
  if (!user || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (entity.userId !== user.id) {
    return false;
  }
  return true;
};
