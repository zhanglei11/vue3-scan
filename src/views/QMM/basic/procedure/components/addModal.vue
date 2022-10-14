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
      <a-form-item :label="$t('basic.工序名称')" name="workingProcedureName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.workingProcedureName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.部门')" name="departmentId">
        <DepartSelect
          ref="departSelectRef"
          :ID="modalForm.departmentId"
          @changeZ="changeDepart"
        ></DepartSelect>
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
import { procedureCreate, procedureUpdate } from "@/apis/basic";
import { ModalFormTs } from "@/types/basicTs";
import { useI18n } from "vue-i18n";
const emits = defineEmits();
const { t } = useI18n();
const departSelectRef = ref();
const formRef = ref();
const modalFlag = ref<boolean>(false);
const modalProps = ref<Object>({});
const modalForm = reactive<ModalFormTs>({
  workingProcedureName: null,
  departmentId: null, //部门id
  deptName: null, //部门名称
  comment: null,
});
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  workingProcedureId: null,
});

onMounted(() => {});
//表单验证
const formRules = reactive({
  workingProcedureName: [setRules(1)],
  departmentId: [setRules(2)],
});

//打开弹框
const openModal = (row: Object, type: string) => {
  if (type == "add") public_form_empty(modalForm);
  if (type == "edit") public_form_data_replace(modalForm, row);
  modalInfo.type = type;
  modalInfo.workingProcedureId = row.workingProcedureId;
  modalProps.value = {
    modalTitle: type == "add" ? t("base.新建") : t("base.编辑"),
  };
  modalFlag.value = true;
  getInit();
};

const getInit = () => {
  nextTick(() => {
    departSelectRef.value.getInit();
  });
};

//取消
const handleCancel = () => {
  modalFlag.value = false;
};

//部门
const changeDepart = ({ value, label }) => {
  modalForm.departmentId = value;
  modalForm.deptName = label;
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
  let params = {
    ...modalForm,
  };
  procedureCreate(params).then((res) => handleMessage(res));
};
//编辑
const editSave = () => {
  let params = {
    ...modalForm,
    workingProcedureId: modalInfo.workingProcedureId,
  };
  procedureUpdate(params).then((res) => handleMessage(res));
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
