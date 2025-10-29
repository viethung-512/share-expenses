export type User = {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
};

export type CreateUserPlaceholderInput = Omit<User, "id">;
