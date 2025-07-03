import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";

import RootComponent from "@/root-component.vue";

const pinia = createPinia();
pinia.use(piniaPersist);

const applicationInstance = createApp(RootComponent);
applicationInstance.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
applicationInstance.use(pinia);

applicationInstance.mount("#application-container");
