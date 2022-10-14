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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      ref="formRef"
    >
      <a-form-item label="上级菜单" name="parentId">
        <a-tree-select
          v-model:value="modalForm.parentId"
          show-search
          class="widthP100"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
          :disabled="modalInfo.type === 'addSub'"
          :tree-data="initData.menuList"
          :field-names="{ label: 'menuName', value: 'id', options: 'children' }"
        >
          <template #title="{ value: id, menuName }">
            <b v-if="id === 0" style="color: #08c">sss</b>
            <template v-else>{{ menuName }}</template>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="菜单类型">
        <a-radio-group
          :disabled="modalInfo.type == 'addSub'"
          v-model:value="modalForm.menuType"
          @change="changeType"
        >
          <a-radio value="M">目录</a-radio>
          <a-radio value="C">菜单</a-radio>
          <!-- <a-radio value="F">按钮</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单名称:" name="menuName">
        <a-input
          type="text"
          v-model:value="modalForm.menuName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item label="显示排序:">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.orderNum"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item label="是否刷新">
        <a-radio-group v-model:value="modalForm.isRefresh">
          <a-radio value="0">是</a-radio>
          <a-radio value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="modalForm.menuType == 'C'" label="路由地址:">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.url"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-form>
  </ModalCom>
</template>
<script lang="ts" setup>
import IconCom from "@/components/modules/IconCom.vue";
interface ModalFormTs {
  parentId: string | null;
  menuType: string | null;
  perms: string | null;
  icon: string | null;
  menuName: string | null;
  id: string | null;
  orderNum: string | null;
  isRefresh: string | null;
  url: string | null;
  visible: string | null;
  status: string | null;
}

import {
  public_form_empty,
  getPlaceholder,
  setRules,
  public_form_data_replace,
  handleTree,
  setMessageTips,
} from "@/pages/utils";
import { reactive, ref, onMounted } from "vue";
import ModalCom from "@/components/modal/modalCom.vue";
import { addMenu, getMenuListByUser, updateMenu } from "@/pages/apis/menu";
const emits = defineEmits();
const formRef = ref<any>();
const modalFlag = ref<boolean>(false);
const modalProps = ref<Object>({});
const modalForm = reactive<ModalFormTs>({
  parentId: null,
  menuType: "C",
  perms: null,
  icon: null,
  menuName: null,
  id: null,
  orderNum: null,
  isRefresh: "1",
  url: "",
  visible: "1",
  status: "0",
});
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  id:null,
});
const initData = reactive({
  menuList: [] as any[],
});
const getInitData = () => {
  let params: Object = {
    pageNumber: 1,
    pageSize: 20,
  };
  getMenuListByUser(params).then((res) => {
    if (res.errorCode == "00000") {
      initData.menuList = [
        {
          id: 0,
          menuName: "顶级菜单",
          children: !res.data ? [] : handleTree(res.data),
        },
      ];
    }
  });
};

//表单验证
const formRules = reactive({
  parentId: [setRules(2)],
  menuType: [setRules(2)],
  icon: [setRules(2)],
  menuName: [setRules(2)],
  orderNum: [setRules(2)],
  isRefresh: [setRules(2)],
  url: [setRules(2)],
  visible: [setRules(2)],
  status: [setRules(2)],
});

//打开弹框
const openModal = (row: Object, type: string) => {
  getInitData();
  if (type == "edit") public_form_data_replace(modalForm, row);
  modalInfo.type = type;
  modalInfo.id = row.id;
  if (type == "addSub") {
    modalForm.parentId = row.id;
    modalForm.menuType = "C";
  }
  modalProps.value = {
    modalTitle: type == "add" || type == "addSub" ? "添加菜单" : "修改菜单",
  };
  modalFlag.value = true;
};
const changeType = (val: any) => {
  if (val != "C") {
    modalForm.url = "";
  }
};

//取消
const handleCancel = () => {
  public_form_empty(modalForm, ["status"]);
  modalFlag.value = false;
};

//确定
const handleOk = () => {
  formRef.value.validate().then(() => {
    if (modalInfo.type == "add" || modalInfo.type == "addSub") {
      addMenu(modalForm).then((res) => handleMessage(res));
    } else if (modalInfo.type == "edit") {
      let params = {
        ...modalForm,
        id: modalInfo.id,
      };
      updateMenu(params).then((res) => handleMessage(res));
    }
  });
};

//统一信息处理
const handleMessage = (res) => {
  if (res.errorCode == "00000") emits("addSubmit");
  setMessageTips(res);
  handleCancel();
};

defineExpose({
  openModal,
});
</script>
