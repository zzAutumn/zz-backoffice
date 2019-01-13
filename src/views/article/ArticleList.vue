<template>
  <div class="page">
    <div class="page-title">
      文章列表
    </div>
    <div class="page-content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="标签"
          prop="tags">
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
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ArticleList extends Vue {
  tableData = [
    {
      title: 'typescript lesson01',
      tags: 'js, typescript',
      createDate: '2019-01-14 20:00:00',
      updateDate: '2019-01-15 20:00:00',
    }, {
      title: 'typescript lesson02',
      tags: 'js, typescript',
      createDate: '2019-01-14 20:00:00',
      updateDate: '2019-01-15 20:00:00',
    },
  ]
  search: string = 'test'

  handleEdit(index: number, row: object) {
    console.log(index);
    console.log(row);
  }
  handleDelete(index: number, row: object) {

  }
}
</script>
<style lang='less' scoped>

</style>
