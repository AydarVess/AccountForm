export enum AccountType {
  LOCAL = "LOCAL",
  LDAP = "LDAP",
}

export type Tag = {
  text: string;
};

export type Account = {
  id: string;
  tagList: Tag[];
  type: AccountType;
  login: string;
  password: string | null;
  isValid?: boolean;
};

export function blankAccount(): Account {
  return {
    id: crypto.randomUUID(),
    tagList: [],
    type: AccountType.LOCAL,
    login: "",
    password: "",
    isValid: false,
  };
}
