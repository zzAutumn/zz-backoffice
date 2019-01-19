<template>
  <div class="page">
    <div class="page-title">
      文章列表
    </div>
    <div class="page-content">
      <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="标签"
          prop="assignTags">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateDate">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <input
              class="input-el"
              v-model.trim="queryForm.title"
              size="mini"
              @keyup.enter="handleSearch"
              placeholder="输入标题关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="openDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

interface QueryFormType {
  pageIndex: number;
  pageSize: number;
  title: string;
}

@Component
export default class ArticleList extends Vue {
  tableData = []
  currentPage: number = 1
  total: number = 0
  pageSize: number = 10
  loading: boolean = false
  queryForm: QueryFormType = {
    pageIndex: 1,
    pageSize: 10,
    title: '',
  }

  async getData() {
    this.loading = true;
    const result = await this.$service.article.getArticles(this.queryForm);
    if (result.code === '200') {
      this.tableData = result.data.content;
      this.total = result.data.count;
      this.pageSize = result.data.pageSize;
    }
    this.loading = false;
  }

  handleEdit(index: number, row: any) {
    const { id } = row;
    localStorage.articleId = id;
    this.$router.push('/editArticle');
  }
  openDelete(index: number, row: any) {
    // console.log(index, row);
    this.$confirm('你确定删除该文章么?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      console.log(row.id);
      const result = await this.$service.article.delArticle({ id: row.id });
      if (result.code === '200') {
        this.$message.success('删除文章成功');
        this.getData();
      }
    }).catch(() => {});
  }

  handleSizeChange(val: number) {
    this.queryForm.pageIndex = 1;
    this.queryForm.pageSize = val;
    this.getData();
  }
  handleCurrentChange(val: number) {
    this.currentPage = val;
    this.queryForm.pageIndex = val;
    this.getData();
  }
  handleSearch() {
    this.getData();
  }

  created() {
    this.getData();
  }
}
</script>
<style lang='less' scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.input-el {
  height: 28px;
  line-height: 28px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
  display: inline-block;
  &:hover {
    border-color: #c0c4cc;
  }
}
</style>
