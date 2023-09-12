<script setup lang="ts">
import { reactive, onMounted } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: false, required: true },
  title: { type: String, required: true },
  cancel: { type: String, default: "取消", required: false },
  action: { type: String, default: "確認", required: false },
  showAction: { type: Boolean, default: true, required: false },
  width: { type: String, default: "50%", required: false }
});
// event
const emit = defineEmits(["on-before-close"]);

const dialogRef = reactive({
  success: false,
  close: false,
});

onMounted(() => {
  // 預設值
});
const handleClose = (event: any) => {
  dialogRef.close = true;
  emit("on-before-close", dialogRef);
};

const afterClosed = (val: boolean) => {
  dialogRef.success = val;
  emit("on-before-close", dialogRef);
};
const open = () => {

};
</script>

<template>
  <el-dialog
    v-model="props.visible"
    :title="props.title"
    :width="props.width"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="afterClosed(false)"> {{ props.cancel }}</el-button>
        <el-button type="primary" @click="afterClosed(true)">
          {{ props.action }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
