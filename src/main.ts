import { createApp } from "vue";
import PrimeVue from 'primevue/config';

import RootComponent from "./root-component.vue";

const applicationInstance = createApp(RootComponent);
applicationInstance.use(PrimeVue);

applicationInstance.mount("#application-container");

