<template>
  <el-aside width="200px">
    <el-menu
      class="zz-menu"
      background-color="#614ce5"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>文章管理</span>
        </template>
        <el-menu-item index="1-1">编辑文章</el-menu-item>
        <el-menu-item index="1-2">文章列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageSider extends Vue {

}

</script>

<style lang='less' scoped>
.el-aside {
  min-height: calc(100vh - 60px);
  background-color: #614ce5;
  color: #fff;
  .zz-menu {
    border-right: none;
  }
}
</style>
