<script setup lang="ts">
import { ElTable, TabsPaneContext } from "element-plus";
import { pageHandle } from "../../hooks/page-handle";
import { routeHandle } from "../../hooks/route-handle";
import {
  clone,
  handleResponse,
  success,
  validEmpty,
  warning,
} from "../../utils";
import jsonData from "./order-records.json";
import data from "../data.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions";

const page = pageHandle();
const { navigation} = routeHandle()

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


const multipleTableRef = ref<InstanceType<typeof ElTable>>();
let user = {} as any;
let selectedRoles = [] as any;
let isUpdate = ref(false);
let columnDefs = [
  { headerName: "是否廢四樓", field: "make" },
  { headerName: "會計回單時間", field: "model" },
  { headerName: "預計送達時間", field: "price" },
  { headerName: "會計回單人", field: "price" },
  { headerName: "運輸類型", field: "price" },
  { headerName: "運輸類型描述", field: "price" },
  { headerName: "溫層", field: "price" },
  { headerName: "溫層描述", field: "price" },
];
let rowData = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxster", price: 72000 },
];

const gridOptions: GridOptions = {
  // PROPERTIES
  // Objects like myRowData and myColDefs would be created in your application
  rowData: rowData,
  columnDefs: columnDefs,
  pagination: true,
  rowSelection: "single",

  // EVENTS
  // Add event handlers
  onRowClicked: (event: any) => console.log("A row was clicked"),
  onColumnResized: (event: any) => console.log("A column was resized"),
  onGridReady: (event: any) => console.log("The grid is now ready"),

  // CALLBACKS
  getRowHeight: (params: any) => 25,
};

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

const load = () => {};

const onCellClicked = () => {
/*
  userModal.title = "訂單資訊";
  isUpdate.value = false;
  userModal.visible = true;
  resetForm();
  Object.assign(entity, _current.entity);*/
  navigation("/order-base");
};




const selectionRoles = (val: any) => {
  selectedRoles = val;
};

const userModalClose = (val: any) => {
  userModal.visible = false;
};

const resetForm = () => {
  Object.assign(formError, _current.formError);
};



const activeNames = ref(["1"]);
const handleChange = (val: any) => {
  console.log(val);
};
</script>

<template>
  <el-container
    v-loading="page.container.isLoading"
    :element-loading-text="page.container.message"
  >
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
      <div>
        <el-scrollbar>
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
        </el-scrollbar>
      </div>

      <ag-grid-vue
        style="width: 100%; height: 300px"
        :gridOptions="gridOptions"
        class="ag-theme-alpine"
        :paginationAutoPageSize="true"
        :pagination="true"
        :onCellClicked="onCellClicked"
      >
      </ag-grid-vue>
    </el-main>
    <Dialog
      :title="userModal.title"
      :visible="userModal.visible"
      :width="'90%'"
      @on-before-close="userModalClose"
    >

    </Dialog>

  </el-container>
</template>
