<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
// element ui path
import { zhTw, en } from "element-plus/es/locale/index";

const { locale } = useI18n();
const userlocale = computed(() => (locale.value === "zh-tw" ? zhTw : en));

const changeLanguage = () => {
  locale.value = locale.value === "zh-tw" ? "en" : "zh-tw";
};
</script>

<template>
  <ElConfigProvider :locale="userlocale">
    <slot></slot>
  </ElConfigProvider>
</template>
