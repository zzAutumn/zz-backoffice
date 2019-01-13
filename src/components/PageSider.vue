<template>
  <el-aside width="200px">
    <el-menu
      class="zz-menu"
      background-color="#614ce5"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :default-active="activeItem"
      :default-openeds="activeArr"
      unique-opened
    >
      <el-submenu
        v-for="(item, index) in menuList"
        :key="item.name"
        :index="item.name"
      >
        <template slot="title">
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
          v-for="(subItem) in item.children"
          :key="subItem.name"
          :index="subItem.to"
        >{{subItem.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageSider extends Vue {
  activeItem: string = '/editArticle'
  activeArr: object = ['ArticleManage']
  menuList: object = [
    {
      title: '文章管理',
      name: 'ArticleManage',
      children: [
        {
          to: '/editArticle',
          title: '编辑文章',
          name: 'EditArticle',
        },
        {
          to: '/listArticle',
          title: '文章列表',
          name: 'ListArticle',
        },
      ],
    },
  ]
}

</script>

<style lang='less' scoped>
.el-aside {
  min-height: calc(100vh - 60px);
  background-color: #614ce5;
  color: #fff;
  .zz-menu {
    border-right: none;
    .el-submenu.is-active,.el-menu-item.is-active {
      background-color: #2b2b2b4f !important;
    }
  }
}
</style>
