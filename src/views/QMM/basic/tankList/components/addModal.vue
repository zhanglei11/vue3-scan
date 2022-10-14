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
      <a-form-item :label="$t('basic.所属设备')" name="equipmentId">
        <DeviceSelect
          ref="deviceSelectRef"
          :ID="modalForm.equipmentId"
          @changeZ="changeDevice"
        ></DeviceSelect>
      </a-form-item>
      <a-form-item :label="$t('basic.水箱名称')" name="tankName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.tankName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.水箱编号')" name="tankNo">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.tankNo"
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
import {
  reactive,
  ref,
  nextTick,
  onMounted,
} from "vue";
import ModalCom from "@/components/modal/modalCom.vue";
import DepartSelect from "@/components/form/departSelect.vue";
import ProcedureSelect from "@/components/form/procedureSelect.vue";
import DeviceSelect from "@/components/form/deviceSelect.vue";
import { tankCreate, tankUpdate } from "@/apis/basic";
import { ModalFormTs } from "@/types/basicTs";
import { useI18n } from "vue-i18n";
const emits = defineEmits();
const { t } = useI18n();
const departSelectRef = ref();
const procedureSelectRef = ref();
const deviceSelectRef = ref();
const formRef = ref();
const modalFlag = ref<boolean>(false);
const modalProps = ref<Object>({});
const modalForm = reactive<ModalFormTs>({
  tankName: null,
  tankNo: null,
  departmentId: null, //部门id
  deptName: null, //部门名称
  workingProcedureId: null, //工序
  workingProcedureName: null, //工序
  equipmentId: null, //设备
  equipmentName: null, //设备
  comment: null,
});

//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  tankId: null,
});

onMounted(() => {});
//表单验证
const formRules = reactive({
  tankName: [setRules(1)],
  tankNo: [setRules(1)],
  departmentId: [setRules(2)],
  workingProcedureId: [setRules(2)],
  equipmentId: [setRules(2)],
});

//打开弹框
const openModal = (row, type) => {
  if (type == "add") public_form_empty(modalForm);
  if (type == "edit") public_form_data_replace(modalForm, row);
  modalInfo.type = type;
  modalInfo.tankId = row.tankId;
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
      deviceSelectRef.value.getInit({
        departmentId: modalForm.departmentId,
        workingProcedureId: modalForm.workingProcedureId,
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
  if (!!!value) {
    deviceSelectRef.value.resetList();
  } else {
    deviceSelectRef.value.getInit({
      departmentId: modalForm.departmentId,
      workingProcedureId: value,
    });
  }
};

const changeDevice = ({ value, label }) => {
  modalForm.equipmentId = value;
  modalForm.equipmentName = label;
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
  tankCreate({ ...modalForm }).then((res) => handleMessage(res));
};
//编辑
const editSave = () => {
  tankUpdate({
    ...modalForm,
    tankId: modalInfo.tankId,
  }).then((res) => handleMessage(res));
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
