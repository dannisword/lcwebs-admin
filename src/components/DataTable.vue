<script setup lang="ts">
import { PropType } from "vue";
import data from "../views/data.json";

const props = defineProps({
  columns: Array as PropType<any[]>,
  records: Array as PropType<any[]>,
  custom: {} as PropType<any>,
  pageable: {} as PropType<any>,
  selection: Boolean,
});

const emit = defineEmits([
  "on-action",
  "on-sort-change",
  "on-current-change",
  "on-current-change",
  "on-row-dblclick",
  "on-selection-change",
]);
/**
 *
 * @param event
 * @param val
 */
const onAction = (event: any, val: any) => {
  emit("on-action", event, val);
};
/**
 *
 * @param val
 */
const onSortChange = (val: any) => {
  emit("on-sort-change", val);
};
/**
 *
 * @param val
 */
const onCurrentChange = (val: any) => {
  emit("on-current-change", val);
};

const onRowdblClick = (val: any) => {
  emit("on-row-dblclick", val);
};

const onSelectionChange = (val: any) => {
  emit("on-selection-change", val);
};

const formatEnable = (val: any) => {
  const state = data.status.find((x: any) => x.value == val);
  return state?.label;
};
</script>

<template>
  <div>
    <!-- 資料 -->
    <el-table
      ref="multipleTableRef"
      :data="records"
      class="table-container"
      border
      stripe
      @sort-change="onSortChange"
      @row-dblclick="onRowdblClick"
      @selection-change="onSelectionChange"
    >
      <!-- column -->
      <el-table-column v-if="selection == true" type="selection">
      </el-table-column>

      <el-table-column
        v-for="column in columns"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :align="column.align"
      >
        <template v-slot="scope">
          <!-- checkbox -->
          <el-checkbox
            v-if="column.type == 'checkbox'"
            v-model.lazy="scope.row[column.prop]"
            @change="onAction(column.type, scope.row)"
          >
          </el-checkbox>
          <!-- button  -->
          <el-button
            v-else-if="column.type == 'button'"
            @click="onAction(column.event, scope.row)"
            size="small"
          >
            {{ column.name }}
          </el-button>
          <!-- link -->
          <el-link
            v-else-if="column.type == 'link'"
            size="mini"
            type="primary"
            @click="onAction(column.event, scope.row)"
          >
            {{ scope.row[column.prop] }}
          </el-link>
          <!-- input -->
          <el-input
            v-else-if="column.type == 'input'"
            :type="column.dataType"
            size="small"
            v-model.lazy="scope.row[column.prop]"
            @keyup.enter.native="onAction(column.event, scope.row)"
          >
            <el-button
              slot="append"
              icon="el-icon-edit"
              @click="onAction(column.event, scope.row)"
            >
            </el-button>
          </el-input>
          <!-- STATUS-->
          <div v-else-if="column.type == 'STATUS'">
            <span>{{ formatEnable(scope.row[column.prop]) }}</span>
          </div>
          <!-- 欄位值 -->
          <div v-else>
            {{ scope.row[column.prop] }}
          </div>
        </template>
      </el-table-column>
      <!-- actions -->
      <el-table-column
        v-if="custom != undefined"
        :fixed="custom.fixed"
        :prop="custom.prop"
        :label="custom.label"
        :min-width="custom.minWidth"
        :align="custom.align"
      >
        <template v-slot="scope">
          <el-button
            v-for="action in custom.actions"
            @click="onAction(action.event, scope.row)"
            :type="action.type"
            :icon="action.icon"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分頁 -->
    <div class="pagination-content" v-if="pageable != undefined">
      <el-pagination
        v-model:current-page="pageable.page"
        v-model:page-size="pageable.pageSize"
        :total="pageable.totalRow"
        layout="total, jumper, prev, pager, next"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>
<style scoped>
.pagination-content {
  float: right;
}
</style>
