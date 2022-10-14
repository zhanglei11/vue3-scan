export interface TableDateTs {
  list: Array<Record<string, string>> //table 数据
  loading: boolean //loading
  pageNumber: number //当前页
  pageSize: number //每页条数
  totalSize: number //总数
}
