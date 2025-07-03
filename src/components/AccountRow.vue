<template>
  <div class="account-row">
    <InputText
      class="account-row__tag-list"
      :invalid="!isTagListValid"
      :modelValue="joinedTagList"
      aria-describedby="Для указания нескольких меток используйте символ"
      placeholder="Метки"
      @blur="onTagListBlur"
    />

    <Dropdown
      class="account-row__type"
      v-model="form.type"
      :options="typeOptions"
      optionLabel="label"
      optionValue="value"
      @change="onTypeChange"
    />

    <InputText
      class="account-row__login"
      :invalid="!isLoginValid"
      v-model="form.login"
      placeholder="Логин"
      maxlength="100"
      @blur="onLoginBlur"
    />

    <Password
      v-if="form.type === AccountType.LOCAL"
      class="account-row__password"
      :invalid="!isPasswordValid"
      v-model="form.password"
      toggleMask
      placeholder="Пароль"
      maxlength="100"
      @blur="onPasswordBlur"
    />

    <Button
      class="account-row__delete"
      icon="pi pi-trash"
      severity="danger"
      text
      @click="remove"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import Button from "primevue/button";
import type { Account, Tag } from "@/types/account.ts";
import { AccountType } from "@/types/account.ts";
import { parseTagList } from "@/utils/parseTagList.ts";

// -----------------------------------------------------------------------------
// DEFINE COMPONENT
// -----------------------------------------------------------------------------

const props = defineProps<{ model: Account }>();
const emit = defineEmits<{
  (e: "save", a: Account): void;
  (e: "delete", id: string): void;
}>();

// -----------------------------------------------------------------------------
// FORM
// -----------------------------------------------------------------------------

const form = reactive({ ...props.model });

const joinedTagList = computed(() =>
  form.tagList.map((t: Tag) => t.text).join("; ")
);

const typeOptions = [
  { label: "Локальная", value: AccountType.LOCAL },
  { label: "LDAP", value: AccountType.LDAP },
];

// -----------------------------------------------------------------------------
// VALIDATION
// -----------------------------------------------------------------------------

const isTagListValid = computed(() => form.tagList.length <= 50);
const isLoginValid = computed(
  () => form.login.trim().length > 0 && form.login.length <= 100
);
const isPasswordValid = computed(
  () =>
    form.type === AccountType.LDAP ||
    ((form.password?.length ?? 0) > 0 && (form.password?.length ?? 0) <= 100)
);
const isValid = computed(
  () => isTagListValid.value && isLoginValid.value && isPasswordValid.value
);

// -----------------------------------------------------------------------------
// WATCHERS
// -----------------------------------------------------------------------------

watch(
  () => form.type,
  (newType) => {
    if (newType === AccountType.LDAP) form.password = null;
    if (newType === AccountType.LOCAL && form.password === null)
      form.password = "";
  }
);

watch(isValid, (ok) => {
  if (ok) emit("save", { ...form, isValid: true });
});

// -----------------------------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------------------------

function onTagListBlur(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  form.tagList = parseTagList(raw);
  emit("save", { ...form, isValid: isValid.value });
}

function onTypeChange() {
  emit("save", { ...form, isValid: isValid.value });
}

function onLoginBlur() {
  emit("save", { ...form, isValid: isValid.value });
}

function onPasswordBlur() {
  emit("save", { ...form, isValid: isValid.value });
}

function remove() {
  emit("delete", form.id);
}
</script>

<style scoped>
.account-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.account-row__type {
  width: 150px;
}

.account-row__delete {
  flex: 0 0 auto;
}
</style>
