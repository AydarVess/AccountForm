export enum AccountType {
  LOCAL = "LOCAL",
  LDAP = "LDAP",
}

export type Tag = {
  text: string;
};

export type Account = {
  id: string;
  tags: Tag[];
  type: AccountType;
  login: string;
  password: string | null;
  isValid?: boolean;
};

export function blankAccount(): Account {
  return {
    id: crypto.randomUUID(),
    tags: [],
    type: AccountType.LOCAL,
    login: "",
    password: "",
    isValid: false,
  };
}
