<template>
  <el-header>
    <span class="logo">zzAutumn</span>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageHeader extends Vue {

}

</script>


<style lang="less" scoped>
 .el-header{
  width: 100%;
  background: linear-gradient(to right, #614ce5, #ad57d1);
  color: #fff;
  line-height: 60px;
  .logo {
    display: inline-block;
    font-size: 24px;
    color: #fff;
    font-family: 'Lucida Sans',Geneva, Verdana, sans-serif;
  }
}
</style>
