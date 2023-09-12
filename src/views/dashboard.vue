<script setup lang="ts">
import { ref, computed } from "vue";
// store
//import { storeToRefs } from "pinia";
//import * as store from "../store";

// page
import { pageHandle } from "../hooks/page-handle";
const page = pageHandle();

import jsonData from "./dashboard.json";

// data
interface master_class {
  columns: any[];
  custom: any;
  records: any[];
  selection: boolean;
}
const inbound = reactive({
  title: "新增入庫單明細",
  name: "inbound",
  visible: false,
  size: "Large",
  action: "儲存",
  cancel: "清除",
  showAction: true,
});

const params = { carrierId: "", docNo: "", docType: "" };
const pageable = {
  number: 1,
  size: 10,
  totalElements: 10,
};
const master = {} as master_class;

master.columns = jsonData.master_columns;
master.custom = jsonData.master_custom;
master.records = jsonData.master_records;

const docTypeOption = ref<Array<any>>([]);
const nowDate = ref<[Date, Date]>([
  new Date(2000, 0, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);

// method
onMounted(() => {});
// methods
const toggle = async () => {
  page.navigation("/inbound/1");
  return;
  page.store.useApp().setLanguage("en");
  // page.navigation("/inbound/1");
  page.container.isLoading = true;
};

const onDatePickeChang = (e: any) => {
  console.log(nowDate.value[0]);
  console.log(nowDate.value[1]);
};

const onModalClose = (val: any) => {
  inbound.visible = false;
};
</script>

<template>
  <el-container
    v-loading="page.container.isLoading"
    :element-loading-text="page.container.message"
  >
    <el-main>
      <!-- 搜尋條件-->
      <el-form label-width="120px" :model="params" :inline="false">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item :label="$t('建立日期')">
              <el-date-picker
                v-model="nowDate"
                type="daterange"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
                @change="onDatePickeChang"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="子棧板編號">
              <el-input v-model="params.carrierId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="母棧板編號">
              <el-input v-model="params.carrierId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="單據編號">
              <el-input v-model="params.docNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form-item label="單據類別">
              <el-select v-model="params.docType" placeholder="請選擇">
                <el-option
                  v-for="item in docTypeOption"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="primary" mb-2 @click="toggle()">入庫查詢</el-button>

      <DataTable
        :records="master.records"
        :columns="master.columns"
        :custom="master.custom"
        :selection="master.selection"
        :pageable="pageable"
        :is-actions="true"
      >
      </DataTable>
    </el-main>
  </el-container>
</template>
<style scoped>
.el-select {
  width: 100%;
}
</style>
