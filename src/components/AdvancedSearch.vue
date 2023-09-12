<script setup lang="ts">
const props = defineProps({
  fields: Array as PropType<any[]>,
});
const emit = defineEmits(["on-confirm"]);

const popoverRef = ref();

const state = reactive({
  visible: false,
  params: ref<any[]>(),
});

const onRest = () => {
  if (props.fields) {
    props.fields.map((x: any) => (x.value = ""));
  }
};
const onCancel = () => {
  onRest();
  state.visible = false;
};
const onConfirm = () => {
  state.visible = false;
  emit("on-confirm", props.fields);
};
</script>
<template>
  <el-button v-popover="popoverRef" @click="state.visible = true">
    Advanced
  </el-button>

  <el-popover
    ref="popoverRef"
    :visible="state.visible"
    :width="480"
    trigger="click"
    title="進階搜尋"
    persistent
  >
    <el-form label-width="120px">
      <div v-for="item in props.fields">
        <el-col>
          <el-form-item :label="item.label">
            <el-input v-model="item.value"> </el-input>
          </el-form-item>
        </el-col>
      </div>
    </el-form>

    <div style="text-align: right; margin: 0">
      <el-button size="small" text @click="onRest()"> 重置 </el-button>
      <el-button size="small" text @click="onCancel()"> 取消 </el-button>
      <el-button size="small" type="primary" @click="onConfirm()">
        確認
      </el-button>
    </div>
  </el-popover>
</template>
