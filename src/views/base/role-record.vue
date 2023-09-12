<script setup lang="ts">
import { ElTable } from "element-plus";
import { pageHandle } from "../../hooks/page-handle";
import {
  clone,
  handleResponse,
  success,
  validEmpty,
  warning,
} from "../../utils";
import jsonData from "./role-record.json";
import data from "../data.json";
const page = pageHandle();

const _current = reactive({
  params: {} as any,
  entity: {} as any,
  formError: {} as any,
});

const _funcList = ref<any>([]);

const params = reactive({
  sysRoleId: "",
  disName: "",
  enable: 1,
  pageSize: 10,
  page: 1,
});

let entity = reactive({
  sysRoleId: "",
  disName: "",
  enabled: 1,
});

let formError = reactive({
  sysUserId: "",
  disName: "",
  password: "",
});

const roleModal = reactive({
  title: "New Role",
  visible: false,
});

const funcModal = reactive({
  title: "Setting Functions",
  visible: false,
});

const pageable = reactive({
  page: 1,
  pageSize: 10,
  totalRow: 0,
});

const master = reactive({
  columns: [] as any[],
  custom: {} as any,
  records: [] as any,
  selection: false,
});
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
let role = {} as any;
let funcList = reactive([] as any[]);
let selectedFuncs = [] as any;
let isUpdate = ref(false);

onBeforeMount(() => {
  for (const menu of data.menus) {
    _funcList.value.push(...menu.subFuncs);
  }

  funcList = _funcList.value;

  _current.params = clone(params);
  _current.entity = clone(entity);
  _current.formError = clone(formError);

  master.columns = jsonData.master_columns;
  master.custom = jsonData.master_custom;
  master.records = jsonData.master_records;

  load();
});

const load = () => {
  //page.container.isLoading = true;

};

const add = () => {
  isUpdate.value = false;
  roleModal.visible = true;
  resetForm();
  Object.assign(entity, _current.entity);
};

const clear = () => {
  Object.assign(params, _current.params);
};

const tableAction = (event: any, val: any) => {
  role = val;



};

const roleModalClose = (val: any) => {

};

const funcModalClose = (val: any) => {
  if (val.success == false || val.close == true) {
    funcModal.visible = false;
    return;
  }
  const funcs = [];
  for (const item of selectedFuncs) {
    const _func = {
      func: item.funcName,
      meom: "",
      authjson: `{\"${item.authjson}\":\"true\"}`,
      enabled: 1,
    };
    funcs.push(_func);
  }
  const data = {
    sysRoleId: role.sysRoleId.toString(),
    roleFuncList: funcs,
  };
  const url = "/api/sysRole/updateSysRolefunc";

  funcModal.visible = false;
};

const selectionFuncs = (val: any) => {
  selectedFuncs = val;
};

const resetForm = () => {
  Object.assign(formError, _current.formError);
};

const handleValid = () => {
  let isValid = true;
  resetForm();

  if (validEmpty(entity.disName) == true) {
    isValid = false;
    formError.disName = "field is required";
  }
  return isValid;
};
</script>

<template>
  <el-container
    v-loading="page.container.isLoading"
    :element-loading-text="page.container.message"
  >
    <el-main>
      <!-- 搜尋條件-->
      <el-form label-width="auto" :model="params" :inline="false">
        <el-row>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
            <el-form-item label="Name">
              <el-input v-model="params.disName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
            <el-form-item label="Status">
              <el-select v-model="params.enable" placeholder="Please Select">
                <el-option
                  v-for="item in data.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="success" mb-2 @click="load()"> Search </el-button>
            <el-button @click="clear()"> Clear </el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 功能按鈕-->
      <div class="form-container">
        <div class="form-end">
          <el-button type="primary" @click="add()"> New Role </el-button>
        </div>
      </div>
      <DataTable
        :records="master.records"
        :columns="master.columns"
        :custom="master.custom"
        :selection="master.selection"
        :pageable="pageable"
        @on-action="tableAction"
      >
      </DataTable>
    </el-main>

    <Dialog
      :title="roleModal.title"
      :visible="roleModal.visible"
      :width="'50%'"
      @on-before-close="roleModalClose"
    >
      <el-form label-width="auto" auto-complete="on" :inline="false">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="Display Name"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.disName"
            >
              <el-input
                v-model="entity.disName"
                @blur="handleValid()"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Status">
              <el-select v-model="entity.enabled" placeholder="Please Select">
                <el-option
                  v-for="item in data.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Dialog>

    <Dialog
      :title="funcModal.title"
      :visible="funcModal.visible"
      :width="'50%'"
      @on-before-close="funcModalClose"
    >
      <el-table
        ref="multipleTableRef"
        :data="funcList"
        class="table-container"
        border
        stripe
        @selection-change="selectionFuncs"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="功能名稱" prop="funcName"></el-table-column>
        <el-table-column label="功能權限" prop="authjson">
          <template v-slot="scope">
            <el-select
              v-model="scope.row.authjson"
              placeholder="Please Select"
              size="small"
            >
              <el-option
                v-for="item in data.auth"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </Dialog>
  </el-container>
</template>
<style scoped>
.el-select {
  width: 100%;
}
</style>
