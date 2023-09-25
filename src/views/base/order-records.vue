<script setup lang="ts">
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions";

import { pageHandle } from "../../hooks/page-handle";
import { routeHandle } from "../../hooks/route-handle";
import jsonData from "./order-records.json";
const { container } = pageHandle();
const { navigation } = routeHandle();

const activeNames = ref(["1"]);

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
});

const onCellClicked = () => {
  navigation("/order-base");
};

const handleChange = (val: any) => {
  console.log(val);
};
</script>

<template>
  <el-container
    v-loading="container.isLoading"
    :element-loading-text="container.message"
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
  </el-container>
</template>
