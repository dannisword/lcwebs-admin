<script setup lang="ts">
import { ElTable } from "element-plus";
import { httpOperations } from "../../utils/http-operations";
import { pageHandle } from "../../hooks/page-handle";
import {
  clone,
  handleResponse,
  success,
  validEmpty,
  warning,
} from "../../utils";
import jsonData from "./user-record.json";
import data from "../data.json";

const page = pageHandle();

const _current = reactive({
  params: {} as any,
  entity: {} as any,
  formError: {} as any,
});

const params = reactive({
  sysUserId: "",
  disName: "",
  enable: 1,
  pageSize: 10,
  page: 1,
});

let entity = reactive({
  sysUserId: "",
  disName: "",
  password: "",
  enabled: 1,
});

let formError = reactive({
  sysUserId: "",
  disName: "",
  password: "",
});

const userModal = reactive({
  title: "New User",
  visible: false,
});

const roleModal = reactive({
  title: "Select Roles",
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

const roles = reactive({
  columns: [] as any[],
  custom: {} as any,
  records: [] as any,
  selection: true,
});
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
let user = {} as any;
let selectedRoles = [] as any;
let isUpdate = ref(false);

onBeforeMount(() => {
  _current.params = clone(params);
  _current.entity = clone(entity);
  _current.formError = clone(formError);

  master.columns = jsonData.master_columns;
  master.custom = jsonData.master_custom;
  master.records = jsonData.master_records;

  roles.columns = jsonData.roles_columns;
  roles.custom = jsonData.roles_custom;
  roles.records = jsonData.roles_records;

  const url = "/api/sysRole/getSysRoles";
  httpOperations.get(url, {}).then((response: any) => {
    if (response.successful == true) {
      roles.records = response.data.data.map((x: any) => ({
        sysRoleId: x.sysRoleId,
        disName: x.disName,
      }));
    }
  });

  load();
});

const load = () => {
  page.container.isLoading = true;
  const url = "/api/sysUserSetting/getSysUsers";
  httpOperations
    .get(url, params)
    .then((response: any) => {
      if (response.successful == true) {
        handleResponse(response.data, params);
        master.records = response.data.data;
        pageable.totalRow = response.data.totalRow;
      }
      page.container.isLoading = false;
    })
    .catch((e) => {
      page.container.isLoading = false;
    });
};

const add = () => {
  userModal.title = "New User";
  isUpdate.value = false;
  userModal.visible = true;
  resetForm();
  Object.assign(entity, _current.entity);
};

const clear = () => {
  Object.assign(params, _current.params);
};

const tableAction = async (event: any, val: any) => {
  user = val;
  // 編輯
  if (event == "onEdit") {
    userModal.title = "Edit User";
    isUpdate.value = true;
    userModal.visible = true;
    resetForm();
    const data = {
      sysUserId: val.sysUserId,
      disName: val.disName,
      password: val.password,
      enabled: val.enabled,
    };
    Object.assign(entity, data);
  }

  // 角色權限
  if (event == "onPrivilege") {
    roleModal.visible = true;
    const url = "/api/sysUserSetting/getSysUser";
    httpOperations
      .get(url, { sysUserId: val.sysUserId })
      .then((response: any) => {
        const data = response.data.userDetail.map((x: any) => ({
          sysRoleId: x.sysRoleId,
          disName: x.disName,
        }));

        for (const record of roles.records) {
          const item = data.find((x: any) => x.sysRoleId == record.sysRoleId);
          if (item) {
            multipleTableRef.value!.toggleRowSelection(record, true);
          } else {
            multipleTableRef.value!.toggleRowSelection(record, false);
          }
        }
      });
  }
};

const selectionRoles = (val: any) => {
  selectedRoles = val;
};

const userModalClose = (val: any) => {
  if (val.success == false || val.close == true) {
    userModal.visible = false;
    return;
  }
  // 更新
  if (isUpdate.value == true) {
    const isValid = handleValid("password");
    if (isValid == false) {
      return;
    }
    const data = {
      sysUserId: entity.sysUserId,
      disName: entity.disName,
      enabled: entity.enabled,
    };
    const url = "/api/sysUserSetting/updateUser";
    httpOperations.post(url, data).then((response: any) => {
      if (response.successful == true) {
        userModal.visible = false;
        load();
      }
    });
  } else {
    const isValid = handleValid();
    if (isValid == false) {
      return;
    }
    const url = "/api/sysUserSetting/createUser";
    const data = {
      sysUserId: entity.sysUserId,
      disName: entity.disName,
      password: entity.password,
      enabled: 1,
    };
    httpOperations.post(url, data).then((response: any) => {
      if (response.successful == true) {
        userModal.visible = false;
        load();
      }
    });
  }
};

const roleModalClose = (val: any) => {
  if (val.success == false || val.close == true) {
    roleModal.visible = false;
    return;
  }
  // 設定權限
  if (selectedRoles.length > 0) {
    const url = "/api/sysUserSetting/updateSysUserRole";
    const data = {
      sysUserId: user.sysUserId,
      roleList: selectedRoles.map((x: any) => x.sysRoleId.toString()),
    };
    httpOperations.post(url, data).then((response: any) => {
      if (response.successful) {
        success("Role Settings Successful");
      } else {
        warning(response.msg);
      }
    });
    roleModal.visible = false;
  } else {
    roleModal.visible = false;
  }
};

const resetForm = () => {
  Object.assign(formError, _current.formError);
};

const handleValid = (pass: any = undefined) => {
  let isValid = true;
  resetForm();
  if (validEmpty(entity.sysUserId) == true) {
    isValid = false;
    formError.sysUserId = "field is required";
  }

  if (validEmpty(entity.disName) == true) {
    isValid = false;
    formError.disName = "field is required";
  }
  if (pass == "password") {
    return isValid;
  }
  if (validEmpty(entity.password) == true) {
    isValid = false;
    formError.password = "field is required";
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
          <el-button type="primary" @click="add()"> New User </el-button>
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
      :title="userModal.title"
      :visible="userModal.visible"
      :width="'50%'"
      @on-before-close="userModalClose"
    >
      <el-form label-width="auto" auto-complete="on" :inline="false">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="Account"
              :rules="[{ required: true }]"
              :error="formError.sysUserId"
            >
              <el-input v-model="entity.sysUserId"></el-input>
            </el-form-item>
          </el-col>

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
            <el-form-item
              v-if="isUpdate == false"
              label="Password"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.password"
            >
              <el-input
                v-model="entity.password"
                @blur="handleValid()"
              ></el-input>
            </el-form-item>
          </el-col>

          <!-- 
          <el-col :span="24">
            <el-form-item
              label="Confirm Password"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.confirmPassword"
            >
              <el-input
                v-model="entity.confirmPassword"
                @blur="handleValid()"
              ></el-input>
            </el-form-item>
          </el-col>
        -->
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
    <!-- role -->
    <Dialog
      :title="roleModal.title"
      :visible="roleModal.visible"
      :width="'50%'"
      @on-before-close="roleModalClose"
    >
      <el-table
        ref="multipleTableRef"
        :data="roles.records"
        class="table-container"
        border
        stripe
        @selection-change="selectionRoles"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="角色編號" prop="sysRoleId"></el-table-column>
        <el-table-column label="角色名稱" prop="disName"></el-table-column>
      </el-table>
    </Dialog>
  </el-container>
</template>
<style scoped>
.el-select {
  width: 100%;
}
</style>
