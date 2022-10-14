<template>
  <!-- 设备 v2.0 -->
  <a-select
    v-model:value="ID_"
    :allowClear="true"
    :placeholder="getPlaceholder(2)"
    show-search
    :disabled="DIS_"
    :filterOption="filterOption"
    @change="changeID()"
    :mode="MODE_"
  >
    <a-select-option
      v-for="item in LIST_"
      :key="item.equipmentId"
      :value="item.equipmentId"
      :data="item.equipmentName"
    >
      {{ item.equipmentName }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
import { filterOption, getPlaceholder } from "@/utils/common";
import { ref, watch } from "vue";
import { equipmentList } from "@/apis/basic";
const emits = defineEmits();
const props = defineProps({
  ID: {
    required: true,
  },
  DIS: {
    required: false,
    default: () => {
      return false;
    },
  },
  MODE: {
    required: false,
    default: () => {
      return "combobox";
    },
  },
});

const ID_ = ref<any>(props.ID);
const DIS_ = ref<any>(props.DIS);
const MODE_ = ref<any>(props.MODE);
const LIST_ = ref<any>([]);
const getInit = (params: Object) => {
  LIST_.value = [];
  equipmentList(params).then((res) => {
    if (res.errorCode == "00000") {
      LIST_.value = !res.data ? [] : res.data;
    } else {
      LIST_.value = [];
    }
  });
};

//重置
const reset = () => {
  ID_.value = MODE_.value == "combobox" ? null : [];
};

//重置所有
const resetList = () => {
  reset();
  LIST_.value = [];
};
watch(
  () => ID_.value,
  (newVal, oldVal) => {
    ID_.value = newVal;
    changeID();
  }
);
const changeID = (): void => {
  let obj: Object = {
    value: null,
    label: null,
    detectionType: null,
  };
  if (!!!ID_.value) {
    obj = {
      value: null,
      label: null,
      detectionType: null,
    };
  } else {
    LIST_.value.forEach((item: Object) => {
      if (ID_.value == item.equipmentId) {
        (obj.value = item.equipmentId),
          (obj.label = item.equipmentName),
          (obj.detectionType = item.detectionType);
      }
    });
  }
  emits("changeZ", obj);
};
defineExpose({
  changeID,
  resetList,
  reset,
  getInit,
});
</script>
