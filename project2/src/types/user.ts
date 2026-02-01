export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export type SafeUser = Omit<User, "passwordHash">;
