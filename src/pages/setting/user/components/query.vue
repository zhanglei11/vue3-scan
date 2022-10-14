<template>
  <SearchQuery>
    <a-col :span="4">
      <a-form-item :label="$t('setting.部门')">
        <DepartSelect
          ref="departSelectRef"
          :ID="formState.deptId"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item :label="$t('setting.用户名称')">
        <a-input
          type="text"
          v-model:value="formState.userName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item :label="$t('setting.手机号')">
        <a-input
          type="text"
          v-model:value="formState.mobile"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('setting.创建时间')">
        <a-range-picker
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :placeholder="getPlaceholder(3)"
          :value="dateTimeValue"
          @change="onChange"
        />
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script lang="ts" setup>
interface FormStateTs {
  userName: any;
  mobile: any;
  status: any;
  startTime: any;
  endTime: any;
  deptId: any;
}

import {
  public_form_empty,
  getPlaceholder,
  filterOption,
  handleTree,
} from "@/pages/utils";
import { reactive, onMounted, ref, watch, onActivated } from "vue";
import IconCom from "@/components/modules/IconCom.vue";
import DepartSelect from "@/components/form/departSelect.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
const emits = defineEmits();
const departSelectRef = ref();
onMounted(() => {
  departSelectRef.value.getInit();
});

const formState = reactive<FormStateTs>({
  userName: null,
  mobile: null,
  status: null,
  startTime: null,
  endTime: null,
  deptId: null,
});

const dateTimeValue = ref<any>([]);
//选择时间
const onChange = (val: any): void => {
  dateTimeValue.value = val;
  formState.startTime = !!dateTimeValue.value ? String(dateTimeValue.value[0]) : null;
  formState.endTime = !!dateTimeValue.value ? String(dateTimeValue.value[1]) : null;
};

//重置
const reset = () => {
  public_form_empty(formState); //清空
  dateTimeValue.value = [];
  departSelectRef.value.reset();
};

//搜索
const search = () => {
  emits("searchQuery", formState);
};

//部门
const changeDepart = ({ value }: any) => {
  formState.deptId = value;
};
onActivated(() => {
  search();
});
</script>
