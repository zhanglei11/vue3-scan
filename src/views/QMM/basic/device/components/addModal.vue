<template>
  <ModalCom
    v-if="modalFlag"
    :modalProps="modalProps"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <a-form
      :model="modalForm"
      :rules="formRules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
      ref="formRef"
    >
      <a-form-item :label="$t('basic.检测类别')" name="detectionType">
        <a-select
          v-model:value="modalForm.detectionType"
          :placeholder="getPlaceholder(2)"
        >
          <a-select-option value="0">清洗液浓度</a-select-option>
          <a-select-option value="1">集中供油检测</a-select-option>
          <a-select-option value="2">测试油检测</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('basic.所属部门')" name="departmentId">
        <DepartSelect
          ref="departSelectRef"
          :ID="modalForm.departmentId"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
      <a-form-item :label="$t('basic.所属工序')" name="workingProcedureId">
        <ProcedureSelect
          ref="procedureSelectRef"
          :ID="modalForm.workingProcedureId"
          @changeZ="changeProcedure"
        ></ProcedureSelect>
      </a-form-item>
      <a-form-item :label="$t('basic.设备名称')" name="equipmentName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.equipmentName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.设备编号')" name="equipmentNo">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.equipmentNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.设备昵称')" name="nickName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.nickName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.固定资产号')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.assetNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.备注')">
        <a-textarea
          :allowClear="true"
          v-model:value="modalForm.comment"
          :rows="4"
          :placeholder="getPlaceholder(1)"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </ModalCom>
</template>
<script lang="ts" setup>
import {
  public_form_empty,
  getPlaceholder,
  setRules,
  public_form_data_replace,
  setMessageTips,
} from "@/pages/utils";
import { reactive, ref, nextTick, onMounted } from "vue";
import ModalCom from "@/components/modal/modalCom.vue";
import DepartSelect from "@/components/form/departSelect.vue";
import ProcedureSelect from "@/components/form/procedureSelect.vue";
import { equipmentCreate, equipmentUpdate } from "@/apis/basic";
import { ModalFormTs } from "@/types/basicTs";
import { useI18n } from "vue-i18n";
const emits = defineEmits();
const { t } = useI18n();
const departSelectRef = ref();
const procedureSelectRef = ref();
const formRef = ref();
const modalFlag = ref<boolean>(false);
const modalProps = ref<Object>({});
const modalForm = reactive<ModalFormTs>({
  equipmentName: null,
  equipmentNo: null,
  departmentId: null,
  deptName: null,
  workingProcedureId: null,
  workingProcedureName: null,
  assetNo: null,
  comment: null,
  detectionType: null,
  nickName: null,
  aaa: null,
});
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  equipmentId: null,
});

onMounted(() => {});
//表单验证
const formRules = reactive({
  equipmentName: [setRules(1)],
  equipmentNo: [setRules(1)],
  nickName: [setRules(1)],
  departmentId: [setRules(2)],
  workingProcedureId: [setRules(2)],
});

//打开弹框
const openModal = (row: Object, type: string) => {
  if (type == "add") public_form_empty(modalForm);
  if (type == "edit") public_form_data_replace(modalForm, row);
  modalInfo.type = type;
  modalInfo.equipmentId = row.equipmentId;
  modalProps.value = {
    modalTitle: type == "add" ? t("base.新建") : t("base.编辑"),
  };
  modalFlag.value = true;
  getInit();
};

const getInit = () => {
  nextTick(() => {
    departSelectRef.value.getInit();
    if (modalInfo.type == "edit") {
      procedureSelectRef.value.getInit({
        departmentId: modalForm.departmentId,
      });
    }
  });
};

//部门
const changeDepart = ({ value, label }) => {
  modalForm.departmentId = value;
  modalForm.deptName = label;
  if (!!!value) {
    procedureSelectRef.value.resetList();
  } else {
    procedureSelectRef.value.getInit({
      departmentId: value,
    });
  }
};

//工序
const changeProcedure = ({ value, label }) => {
  modalForm.workingProcedureId = value;
  modalForm.workingProcedureName = label;
};

//取消
const handleCancel = () => {
  modalFlag.value = false;
};

//确定
const handleOk = () => {
  formRef.value.validate().then(() => {
    if (modalInfo.type == "add") addSave();
    if (modalInfo.type == "edit") editSave();
  });
};
//新增
const addSave = () => {
  let params = { ...modalForm };
  equipmentCreate(params).then((res) => handleMessage(res));
};
//编辑
const editSave = () => {
  let params = {
    ...modalForm,
    equipmentId: modalInfo.equipmentId,
  };
  equipmentUpdate(params).then((res) => handleMessage(res));
};

//统一信息处理
const handleMessage = (res) => {
  if (res.errorCode == "00000") emits("addSubmit");
  setMessageTips(res);
  handleCancel();
};

defineExpose({
  openModal
})
</script>
