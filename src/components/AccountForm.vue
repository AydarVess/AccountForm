<template>
  <Card class="account-form">
    <template #title>
      <header class="account-form__header">
        <h2 class="m-0">Учётные записи</h2>

        <Button icon="pi pi-plus" label="Добавить" @click="addAccount" />
      </header>
    </template>

    <template #content>
      <div class="account-form__content">
        <Message>
          <i class="pi pi-question-circle"></i>

          Для указания нескольких меток используйте символ <b>;</b>
        </Message>

        <AccountRow
          v-for="account in accountList"
          :key="account.id"
          :model="account"
          @save="saveAccount"
          @delete="deleteAccount"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import { useAccountListStore } from "@/stores/accountList.ts";
import Card from "primevue/card";
import Message from "primevue/message";
import AccountRow from "@/components/AccountRow.vue";

// -----------------------------------------------------------------------------
// STATE
// -----------------------------------------------------------------------------

const store = useAccountListStore();
const accountList = computed(() => store.accountList);

// -----------------------------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------------------------

function addAccount() {
  store.addBlank();
}

function saveAccount(account) {
  store.update(account);
}

function deleteAccount(id: string) {
  store.remove(id);
}
</script>

<style lang="css">
.account-form {
  padding: 2rem 100px 2rem 100px;
  background-color: var(--p-surface);
}

.account-form__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-form__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
