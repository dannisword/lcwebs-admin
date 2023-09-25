<script setup lang="ts">
import { ElTable, TabsPaneContext } from "element-plus";
import { pageHandle } from "../../hooks/page-handle";

import jsonData from "./order-base.json";
import data from "../data.json";

const { container } = pageHandle();
const activeName = ref("first");

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

let entity = reactive({
  sysUserId: "",
  disName: "",
  password: "",
  enabled: 1,
});
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
onBeforeMount(() => {
  master.columns = jsonData.master_columns;
  master.custom = jsonData.master_custom;
  master.records = jsonData.master_records;
});
const tableAction = async (event: any, val: any) => {};
</script>

<template>
  <el-container
    v-loading="container.isLoading"
    :element-loading-text="container.message"
  >
    <el-main>
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
          <el-scrollbar>
            <el-form label-width="auto" auto-complete="on" :inline="true">
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="系統訂單號">
                    <el-input v-model="entity.sysUserId"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="訂單號">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="運輸公司名稱">
                    <el-input v-model="entity.password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="客戶訂單號">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="倉庫訂單號碼">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="訂單狀態">
                    <el-select
                      v-model="entity.enabled"
                      placeholder="Please Select"
                    >
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

              <el-row>
                <el-col :xs="12" :sm="8" :md="8" :lg="7" :xl="4">
                  <el-form-item label="訂單狀態">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="7" :xl="4">
                  <el-form-item label="預計送達時間">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="7" :xl="4">
                  <el-form-item label="運輸類型">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="溫層">
                    <el-select
                      v-model="entity.enabled"
                      placeholder="Please Select"
                    >
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
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="運輸公司">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="倉庫地址">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="6">
                  <el-form-item label="出貨類別">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="6">
                  <el-form-item label="貨主名稱">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="6">
                  <el-form-item label="貨主發送 mail">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="急單">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="站別">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="4">
                  <el-form-item label="是否廢四機">
                    <el-input v-model="entity.disName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="提貨配送資料" name="second">
          <el-form label-width="auto" auto-complete="on" :inline="true">
            <el-form-item label="運輸公司">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="倉庫地址">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="出貨類別">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="貨主名稱">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="貨主發送 mail">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="急單">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="站別">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
            <el-form-item label="是否廢四機">
              <el-input v-model="entity.disName"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="訂單明細" name="first">
          <DataTable
            :records="master.records"
            :columns="master.columns"
            :custom="master.custom"
            :selection="master.selection"
            :pageable="pageable"
            @on-action="tableAction"
          >
          </DataTable>
        </el-tab-pane>
        <el-tab-pane label="圖片資訊" name="second"> 圖片資訊 </el-tab-pane>
        <el-tab-pane label="點貨資訊" name="third"> 點貨資訊 </el-tab-pane>
        <el-tab-pane label="廢四機資訊" name="fourth"> 廢四機資訊 </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
