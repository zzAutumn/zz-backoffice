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
        v-for="(item) in menuList"
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
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PageSider extends Vue {
  activeItem: string = '/listArticle'
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

  // 更新菜单选中状态
  updateMenuActive(path: string) {
    this.activeItem = path;
  }

  @Watch('$route')
  onRouteChange(val: any) {
    this.updateMenuActive(val.path);
  }

  mounted() {
    const { path } = this.$route;
    this.updateMenuActive(path);
  }
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
