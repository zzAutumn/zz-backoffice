<template>
  <div class="main-page">
    <page-header></page-header>
    <el-container>
      <page-sider></page-sider>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageHeader from '@/components/PageHeader.vue';
import PageSider from '@/components/PageSider.vue';

@Component({
  components: {
    PageHeader,
    PageSider,
  },
})

export default class Home extends Vue {

}

</script>


<style lang="less" scoped>

</style>
