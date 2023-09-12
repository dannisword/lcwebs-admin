<script setup lang="ts">
// 宣告變數
const _formError = {
  projectName: "",
  boardName: "",
  stage: "",
  startDate: "",
};

const _entity = {
  id: 0,
  projectName: "",
  boardName: "",
  stage: "",
  startDate: "",
  gerberOutDate: "",
  ecad: "",
};
const entity = reactive({ ..._entity });
const formError = reactive({ ..._formError });
const state = reactive({
  container: { isLoading: false, message: "載入中" },
});
/**
 *
 */
onBeforeMount(() => {
  console.log("onBeforeMount");
});
/**
 *
 */
onMounted(() => {
  console.log("onMounted");
});
/**
 *
 */
onUnmounted(() => {
  console.log("onUnmounted");
});

const handleValid = (name: string = "") => {
  let isValid = true;
  Object.assign(formError, _formError);
  return isValid;
};
</script>
<template>
  <el-container
    v-loading="state.container.isLoading"
    :element-loading-text="state.container.message"
  >
    <div class="wrap">
      <table>
        <tr>
          <th
            colspan="4"
            style="background-color: #3f51b5; color: white; height: 38px"
          >
            Project info
          </th>
        </tr>
        <tr>
          <td>Project Name</td>
          <td>
            <el-form-item
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.projectName"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </td>
          <td>Border Name</td>
          <td>
            <el-form-item
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.boardName"
            >
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>Stage</td>
          <td>
            <el-form-item
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </td>
          <td>Revision</td>
          <td>
            <el-form-item
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td>
            <el-form-item>
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </td>
          <td>Gerber Out Date</td>
          <td>
            <el-form-item>
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th
            colspan="4"
            style="background-color: #3f51b5; color: white; height: 38px"
          >
            Data Release Date
          </th>
        </tr>
        <tr>
          <td>EF</td>
          <td>NetList</td>
          <td colspan="2">
            <el-form-item>
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="2">SL</td>
          <td>Stackup</td>
          <td colspan="2">
            <el-form-item>
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>Routing Rule</td>
          <td colspan="2">
            <el-form-item>
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="2">ME</td>
          <td>DXF</td>
          <td colspan="2">
            <el-form-item>
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>EMN</td>
          <td colspan="2">
            <el-form-item>
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: center">
            <el-form-item>
              <el-button type="primary">Save</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </td>
        </tr>
      </table>
    </div>
    <!-- <el-main> -->
    <!-- <h3>Project info</h3> -->
    <!-- <el-form ref="refForm" label-width="auto" auto-complete="on" :inline="false">
                <el-row> -->
    <!-- <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Project Name"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.projectName"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </el-col> -->
    <!-- <el-col :xl="12" :lg="12" :md="12">
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
          </el-col> -->

    <!-- <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Stage"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </el-col> -->

    <!-- <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Revision"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </el-col> -->

    <!-- <el-col :xl="12" :lg="12" :md="12">
            <el-form-item label="Start Date">
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </el-col> -->

    <!-- <el-col :xl="12" :lg="12" :md="12">
            <el-form-item label="Gerber Out Date">
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </el-col> -->
    <!-- 
          <el-col :span="24">
            <el-form-item label="ECAD">
              <el-input v-model="entity.stage"></el-input>
            </el-form-item>
          </el-col>
          -->

    <!-- <el-col :span="24">
                        <h3>Data Release Date</h3>
                    </el-col> -->
    <!-- <el-col :xl="2" :lg="2" :md="2"> EF </el-col>
                    <el-col :xl="22" :lg="22" :md="22">
                        <el-form-item label="NetList">
                            <el-input v-model="entity.boardName" @blur="handleValid('name')"></el-input>
                        </el-form-item>
                    </el-col> -->
    <!-- </el-row> -->

    <!-- <el-form-item>
                    <el-button type="primary">Save</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form> -->

    <!-- </el-main> -->
  </el-container>
</template>
<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  display: flex !important;
  width: 100%;
}

.el-select {
  width: 100%;
}

.wrap {
  padding-top: 2rem;
  width: 100%;
  height: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #ffffff;
  color: #222;
  text-align: left;
  padding-left: 10px;
}

td {
  padding-top: 8px;
  padding-left: 10px;
  background-color: #ffffff;
  height: 50px;
  text-align: left;
  padding-right: 10px;
}

tr {
  border-bottom: 1px solid #dddddd;
}

tr:last-of-type {
  border-top: 2px solid #dddddd;
}

tr:nth-of-type(even) td {
  background-color: #ffffff;
}
</style>
