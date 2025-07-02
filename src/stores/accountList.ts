import { defineStore } from "pinia";
import type { Account } from "@/types/account.ts";
import { blankAccount } from "@/types/account.ts";

export const useAccountListStore = defineStore("accountList", {
  state: () => ({
    accountList: [] as Account[],
  }),

  getters: {
    hasInvalid: (state) =>
      state.accountList.some((account) => !account.isValid),
    total: (state) => state.accountList.length,
  },

  actions: {
    addBlank() {
      this.accountList.push(blankAccount());
    },

    update(updated: Account) {
      const index = this.accountList.findIndex(
        (account) => account.id === updated.id
      );
      if (index === -1) {
        this.accountList.push({ ...updated });
      } else {
        this.accountList.splice(index, 1, { ...updated });
      }
    },

    remove(id: string) {
      this.accountList = this.accountList.filter(
        (account) => account.id !== id
      );
    },

    clear() {
      this.accountList = [];
    },
  },

  persist: {
    key: "accountList",
    storage: localStorage,
  },
});
