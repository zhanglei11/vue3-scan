export interface ModalFormTs {
  equipmentName?: string | null //设备名称
  equipmentNo?: string | null //设备编号
  equipmentId?: string | null //设备id
  departmentId?: string | null //部门
  deptName?: string | null //部门名称
  workingProcedureId?: string | null //工序id
  workingProcedureName: string | null //工序名称
  assetNo?: string | null //固定资产号
  comment?: string | null //备注
  tankName?: string | null //水箱名称
  tankNo?: string | null //水箱编号
  detectionType?: string | null //类别
  nickName?: string | null //设备昵称
  tankId?: string | null //水箱id
  pageNumber?: string | null
  pageSize?: string | null
}

export interface FormStateTs {
  departmentId?: string | null //部门id
  workingProcedureId?: string | null //工序id
  equipmentId?: string | null //设备id
}


