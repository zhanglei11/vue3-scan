<template>
  <a-card :bordered="false">
    <Query @searchQuery="searchQuery" />
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <vxe-toolbar ref="xToolbarRole" custom>
      <template #tools ref="xToolbarRole">
        <a-button type="primary" @click="add({}, 'add')">
          <template #icon>
            <IconCom type="PlusOutlined" />
          </template>
          {{ $t("base.新建") }}
        </a-button>
      </template>
    </vxe-toolbar>
    <a-col style="height: calc(100vh - 360px)">
      <vxe-table
        round
        id="roleTable"
        show-header-overflow
        show-overflow
        border
        ref="xTableRole"
        width="100%"
        auto-resize
        height="auto"
        :data="tableDate.list"
        :loading="tableDate.loading"
        align="center"
      >
        <vxe-column field="tankName" :title="$t('basic.水箱名称')"></vxe-column>
        <vxe-column field="tankNo" :title="$t('basic.水箱编号')"></vxe-column>
        <vxe-column field="deptName" :title="$t('basic.所属部门')"> </vxe-column>
        <vxe-column field="workingProcedureName" :title="$t('basic.所属工序')">
        </vxe-column>
        <vxe-column field="equipmentName" :title="$t('basic.所属设备')"></vxe-column>
        <vxe-column field="comment" :title="$t('basic.备注')"></vxe-column>
        <vxe-column field="status" :title="$t('basic.状态')">
          <template v-slot="{ row }">
            {{ tankStatus(row.status) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.操作')" fixed="right" min-width="80">
          <template v-slot="{ row }">
            <a-tooltip placement="topLeft" :title="$t('base.编辑')">
              <a-button type="primary" @click="add(row, 'edit')" class="mr10">
                <template #icon>
                  <IconCom type="EditOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <DeleteCom :row="row" @confirmSure="onDelete" />
          </template>
        </vxe-column>
      </vxe-table>
    </a-col>
    <vxe-pager
      perfect
      :current-page="tableDate.pageNumber"
      :page-size="tableDate.pageSize"
      :total="tableDate.totalSize"
      :page-sizes="pageSizesList"
      @page-change="handlePage"
      :layouts="layouts"
    ></vxe-pager>
  </a-card>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { setMoment, layouts, pageSizesList, setMessageTips } from "@/pages/utils";
import { tankStatus } from "@/utils/common";
import DeleteCom from "@/components/modules/deleteCom.vue";
import { tankPage, tankDelete } from "@/apis/basic";
import { TableDateTs } from "@/types/tableTs";
import { FormStateTs } from "@/types/basicTs";
import { VxeTableInstance, VxeToolbarInstance } from "vxe-table";
const formState = ref<FormStateTs>({});
const xToolbarRole = ref({} as VxeToolbarInstance);
const xTableRole = ref({} as VxeTableInstance);
const addModalRef = ref();
const tableDate = reactive<TableDateTs>({
  list: [],
  loading: false,
  pageNumber: 1,
  pageSize: 20,
  totalSize: 0,
});
//弹框基本信息
onMounted(() => {
  changevisible();
});

const changevisible = () => {
  xTableRole.value.connect(xToolbarRole.value);
};

//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue;
  init("initial");
};

//查询表格数据
const init = (type: string) => {
  if (type == "initial") tableDate.pageNumber = 1;
  let params: Object = {
    ...formState.value,
    pageNumber: tableDate.pageNumber,
    pageSize: tableDate.pageSize,
  };
  tableDate.loading = true;
  tankPage(params)
    .then((res) => {
      if (res.errorCode == "00000") {
        tableDate.list = !res.data.items ? [] : res.data.items;
        tableDate.pageNumber = res.data.pageNumber;
        tableDate.pageSize = res.data.pageSize;
        tableDate.totalSize = res.data.totalSize;
      }
      setMessageTips(res, false);
    })
    .finally(() => {
      tableDate.loading = false;
    });
};

//删除 内容
const onDelete = (row: Object) => {
  tankDelete({ tankId: row.tankId }).then((res) => {
    setMessageTips(res);
    init("initial");
  });
};

//分页查询
const handlePage = ({ currentPage, pageSize }) => {
  tableDate.pageNumber = currentPage;
  tableDate.pageSize = pageSize;
  init("update");
};

//新增收货
const add = (row: Object, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  init("initial");
};
</script>
