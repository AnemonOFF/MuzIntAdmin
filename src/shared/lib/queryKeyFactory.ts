export const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  page: (page: number) => [...userKeys.list(), { page: page }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), { id: id }] as const,
};

export const meKeys = {
  me: ["me"] as const,
};
