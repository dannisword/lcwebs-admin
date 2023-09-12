<script setup lang="ts">
import * as store from "../../store";
import { useBasicStore } from "../../store/useBasicStore";
import { storeToRefs } from "pinia";
import { routeHandle } from "../../hooks/route-handle";
import { pageHandle } from "../../hooks/page-handle";
import * as base from "../../utils";
import * as models from "../models";
import jsonData from "./inbound.json";

const page = pageHandle();
const route = routeHandle();

const basic = useBasicStore();
//#region data
// 查詢參數
const resetParams = () => {
  return {
    carrierId: "",
    createEndDateTime: "",
    createStartDateTime: "",
    sysOrderNo: "",
    subCarrierId: "",
  };
};
const _formError = {
  projectName: "",
  boardName: "",
  stage: "",
  startDate: "",
};
const _entity = {
  id: 0,
  projectName: 0,
  boardName: "",
  stage: "",
  startDate: "",
  gerberOutDate: "",
  ecad: "",
};
const entity = reactive({ ..._entity });
const formError = reactive({ ..._formError });
const dialogs = reactive({} as any);
// DataTable
// let master = {} as models.master_model;
let master = reactive({} as models.master_model);
const state = reactive({
  params: resetParams(),
  nowDate: ref(),
  fields: ref<any[]>(),
  pageable: {} as models.pageable_model,
});

//#endregion

//#region  methods
onMounted(() => {
  dialogs.title = "New Assign PCB Designer";
  dialogs.visible = false;

  master.columns = jsonData.master_columns;
  master.custom = jsonData.master_custom;
  master.records = jsonData.master_records;

  state.fields = jsonData.advanced_search;
  state.nowDate = [base.addDay(-30), base.addDay(0)];
  // onLoad();
});

const onLoad = () => {
  page.container.isLoading = true;

  state.params.createStartDateTime = base.format(state.nowDate[0]);
  state.params.createEndDateTime = base.format(state.nowDate[1]);

  const query = base.URLSearchParams(state.params);

};

const onClear = () => {
  //  deep clone
  Object.assign(state.params, resetParams());
  state.nowDate = [base.addDay(-30), base.addDay(0)];
};
const onConfirm = (pairs: any) => {
  base.pairToParams(state.params, pairs);
  onLoad();
};

const onModalClose = (val: any) => {
  dialogs.visible = false;
};

const onTableAction = (event: string, val: any) => {
  Object.assign(entity, val);
  dialogs.visible = true;
};
const handleValid = (name: string = "") => {
  let isValid = true;
  Object.assign(formError, _formError);
  return isValid;
};
//#endregion
</script>

<template>
  <el-container
    v-loading="page.container.isLoading"
    :element-loading-text="page.container.message"
  >
    <el-main>
      <!-- 搜尋條件-->
      <el-form label-width="120px" :model="state.params" :inline="false">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item :label="$t('Create At')">
              <el-date-picker
                v-model="state.nowDate"
                type="daterange"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="Project Name">
              <el-input v-model="state.params.sysOrderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item>
              <el-button type="primary" mb-2 @click="onLoad()">
                Search
              </el-button>
              <el-button mb-2 @click="onClear()"> Clear </el-button>
              <!-- 進階查詢 -->
              <AdvancedSearch
                :fields="state.fields"
                @on-confirm="onConfirm($event)"
              ></AdvancedSearch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 主檔-->
      <DataTable
        :records="master.records"
        :columns="master.columns"
        :custom="master.custom"
        :selection="master.selection"
        :pageable="state.pageable"
        :is-actions="true"
        @onAction="onTableAction"
      >
      </DataTable>

      <!-- 開窗 -->
      <Dialog
        :optional="dialogs"
        :title="dialogs.title"
        :visible="dialogs.visible"
        :width="'30%'"
        @on-before-close="onModalClose"
      >
        <el-form
          ref="refForm"
          label-width="auto"
          auto-complete="on"
          :inline="false"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="Project Name"
                :rules="[{ required: true, trigger: 'blur' }]"
                :error="formError.projectName"
              >
                <el-input
                  v-model="entity.projectName"
                  @blur="handleValid('code')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="Border Name"
                :rules="[{ required: true, trigger: 'blur' }]"
                :error="formError.boardName"
              >
                <el-input
                  v-model="entity.boardName"
                  @blur="handleValid('name')"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item
                label="Stage"
                :rules="[{ required: true, trigger: 'blur' }]"
                :error="formError.stage"
              >
                <el-input
                  v-model="entity.stage"
                  @blur="handleValid('stage')"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="Start Date">
                <el-date-picker v-model="entity.startDate"> </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="Gerber Out Date">
                <el-date-picker v-model="entity.startDate"> </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="ECAD">
                <el-input v-model="entity.stage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </Dialog>
    </el-main>
  </el-container>
</template>
