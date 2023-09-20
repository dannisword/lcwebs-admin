<script setup lang="ts">
import { ElTable, TabsPaneContext } from "element-plus";
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
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions";

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
    title: "訂單資訊",
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

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
let user = {} as any;
let selectedRoles = [] as any;
let isUpdate = ref(false);
let columnDefs = [{ headerName: "是否廢四樓", field: "make" },
{ headerName: "會計回單時間", field: "model" },
{ headerName: "預計送達時間", field: "price" },
{ headerName: "會計回單人", field: "price" },
{ headerName: "運輸類型", field: "price" },
{ headerName: "運輸類型描述", field: "price" },
{ headerName: "溫層", field: "price" },
{ headerName: "溫層描述", field: "price" }];
let rowData = [{ make: "Toyota", model: "Celica", price: 35000 },
{ make: "Ford", model: "Mondeo", price: 32000 },
{ make: "Porsche", model: "Boxster", price: 72000 }];

const gridOptions: GridOptions = {
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application
    rowData: rowData,
    columnDefs: columnDefs,
    pagination: true,
    rowSelection: 'single',

    // EVENTS
    // Add event handlers
    onRowClicked: (event: any) => console.log('A row was clicked'),
    onColumnResized: (event: any) => console.log('A column was resized'),
    onGridReady: (event: any) => console.log('The grid is now ready'),

    // CALLBACKS
    getRowHeight: (params: any) => 25
}

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

    columnDefs = [
        { headerName: "是否廢四樓", field: "make" },
        { headerName: "會計回單時間", field: "model" },
        { headerName: "預計送達時間", field: "price" },
        { headerName: "會計回單人", field: "price" },
        { headerName: "運輸類型", field: "price" },
        { headerName: "運輸類型描述", field: "price" },
        { headerName: "溫層", field: "price" },
        { headerName: "溫層描述", field: "price" },
    ];
    rowData = [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 },
    ];


    load();
});

const load = () => {

};

const onCellClicked = () => {
    userModal.title = "訂單資訊";
    isUpdate.value = false;
    userModal.visible = true;
    resetForm();
    Object.assign(entity, _current.entity);
}

const add = () => {
    userModal.title = "訂單資訊";
    isUpdate.value = false;
    userModal.visible = true;
    resetForm();
    Object.assign(entity, _current.entity);
};

const clear = () => {
    Object.assign(params, _current.params);
};

const tableAction = async (event: any, val: any) => {



};

const selectionRoles = (val: any) => {
    selectedRoles = val;
};

const userModalClose = (val: any) => {
    userModal.visible = false;
};

const roleModalClose = (val: any) => {

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

const activeNames = ref(['1'])
const handleChange = (val: any) => {
    console.log(val);
}
</script>

<template>
    <el-container v-loading="page.container.isLoading" :element-loading-text="page.container.message">
        <el-main>
            
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="勾選筆數：Status" name="1">
            <el-scrollbar>
             <div class="status-btn-wrap">
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <Calendar />
                            </el-icon>
                            <span class="status-btn-font">尚未安排</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <Box />
                            </el-icon>
                            <span class="status-btn-font">貨物裝載中</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <Sell />
                            </el-icon>
                            <span class="status-btn-font">已提貨</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <ChatLineRound />
                            </el-icon>
                            <span class="status-btn-font">配送發生問題</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <Van />
                            </el-icon>
                            <span class="status-btn-font">配送完成</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <Remove />
                            </el-icon>
                            <span class="status-btn-font">作廢</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <CircleClose />
                            </el-icon>
                            <span class="status-btn-font">拒收</span>
                        </el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                        <el-button class="status-btn">
                            <el-icon class="el-icon--bottom">
                                <Edit />
                            </el-icon>
                            <span class="status-btn-font">ALL</span>
                        </el-button>
                    </el-badge>
                </div>
                </el-scrollbar>
          </el-collapse-item>
          </el-collapse>
            <div class="status-btn-wrap">
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Search />
                    </el-icon>
                    <span class="status-btn-font">搜尋</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Download />
                    </el-icon>
                    <span class="status-btn-font">匯出 Excel</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Plus />
                    </el-icon>
                    <span class="status-btn-font">新增</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Delete />
                    </el-icon>
                    <span class="status-btn-font">刪除</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Van />
                    </el-icon>
                    <span class="status-btn-font">發送狀況</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Remove />
                    </el-icon>
                    <span class="status-btn-font">作廢</span>
                </el-button>

                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Document />
                    </el-icon>
                    <span class="status-btn-font">面單</span>
                </el-button>
            </div>
            <!-- 搜尋條件-->
            <!-- <el-form label-width="auto" :model="params" :inline="false">
                <el-row>
                    <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
                        <el-form-item label="Name">
                            <el-input v-model="params.disName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
                        <el-form-item label="Status">
                            <el-select v-model="params.enable" placeholder="Please Select">
                                <el-option v-for="item in data.status" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-button type="success" mb-2 @click="load()"> Search </el-button>
                        <el-button @click="clear()"> Clear </el-button>
                    </el-col>
                </el-row>
            </el-form> -->
            <!-- 功能按鈕-->
            <div class="form-container">
                <div class="form-end">
                    <el-button type="primary" @click="add()"> New User </el-button>
                </div>
            </div>
            <!-- <DataTable
        :records="master.records"
        :columns="master.columns"
        :custom="master.custom"
        :selection="master.selection"
        :pageable="pageable"
        @on-action="tableAction"
      >
      </DataTable> -->


            <ag-grid-vue style="width: 100%; height: 300px" :gridOptions="gridOptions" class="ag-theme-alpine"
                :paginationAutoPageSize="true" :pagination="true" :onCellClicked="onCellClicked">
            </ag-grid-vue>


        </el-main>
        <Dialog :title="userModal.title" :visible="userModal.visible" :width="'90%'" @on-before-close="userModalClose">
            <div class="status-btn-wrap">
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Search />
                    </el-icon>
                    <span class="status-btn-font">搜尋</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Download />
                    </el-icon>
                    <span class="status-btn-font">匯出 Excel</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Plus />
                    </el-icon>
                    <span class="status-btn-font">新增</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Delete />
                    </el-icon>
                    <span class="status-btn-font">刪除</span>
                </el-button>
                <el-button class="status-btn">
                    <el-icon class="el-icon--bottom">
                        <Van />
                    </el-icon>
                    <span class="status-btn-font">發送狀況</span>
                </el-button>

            </div>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="訂單資訊" name="first">
                    <el-form label-width="auto" auto-complete="on" :inline="true">
                        <el-form-item label="系統訂單號" :rules="[{ required: true }]" :error="formError.sysUserId">
                            <el-input v-model="entity.sysUserId"></el-input>
                        </el-form-item>
                        <el-form-item label="訂單號" :rules="[{ required: true, trigger: 'blur' }]" :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item v-if="isUpdate == false" label="運輸公司名稱" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.password">
                            <el-input v-model="entity.password" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="客戶訂單號" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="倉庫訂單號碼" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="訂單狀態">
                            <el-select v-model="entity.enabled" placeholder="Please Select">
                                <el-option v-for="item in data.status" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="訂單狀態" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="預計送達時間" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="運輸類型" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="溫層">
                            <el-select v-model="entity.enabled" placeholder="Please Select">
                                <el-option v-for="item in data.status" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="運輸公司" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="倉庫地址" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="出貨類別" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="貨主名稱" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="貨主發送 mail" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="急單" :rules="[{ required: true, trigger: 'blur' }]" :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="站別" :rules="[{ required: true, trigger: 'blur' }]" :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="是否廢四機" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="提貨配送資料" name="second">
                    <el-form label-width="auto" auto-complete="on" :inline="true">
                        <el-form-item label="運輸公司" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="倉庫地址" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="出貨類別" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="貨主名稱" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="貨主發送 mail" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="急單" :rules="[{ required: true, trigger: 'blur' }]" :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="站別" :rules="[{ required: true, trigger: 'blur' }]" :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                        <el-form-item label="是否廢四機" :rules="[{ required: true, trigger: 'blur' }]"
                            :error="formError.disName">
                            <el-input v-model="entity.disName" @blur="handleValid()"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="訂單明細" name="first">
                    <DataTable :records="master.records" :columns="master.columns" :custom="master.custom"
                        :selection="master.selection" :pageable="pageable" @on-action="tableAction">
                    </DataTable>

                </el-tab-pane>
                <el-tab-pane label="圖片資訊" name="second">
                    圖片資訊
                </el-tab-pane>
                <el-tab-pane label="點貨資訊" name="third">
                    點貨資訊
                </el-tab-pane>
                <el-tab-pane label="廢四機資訊" name="fourth">
                    廢四機資訊
                </el-tab-pane>
            </el-tabs>
        </Dialog>
        <!-- role -->
        <Dialog :title="roleModal.title" :visible="roleModal.visible" :width="'50%'" @on-before-close="roleModalClose">
            <el-table ref="multipleTableRef" :data="roles.records" class="table-container" border stripe
                @selection-change="selectionRoles">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column label="角色編號" prop="sysRoleId"></el-table-column>
                <el-table-column label="角色名稱" prop="disName"></el-table-column>
            </el-table>
        </Dialog>
    </el-container>
</template>
<style lang="scss" scoped>
.el-main {
    --el-main-padding: 10px;
}

.el-select {
    width: 100%;
}

.form-container {
    margin-bottom: 10px;
}

.status-btn-wrap {
    display: flex;
    justify-content: start;
    align-items: center;
    column-gap: 5px;
    padding: 10px 0;
}
</style>
