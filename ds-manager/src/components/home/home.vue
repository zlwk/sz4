<template>
  <el-container class="myhome">
    <el-header>
        <TopHead/>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <SideBar/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopHead from '../layout/tophead.vue'
import SideBar from '../layout/sidebar.vue'
export default {
    components:{
        TopHead,
        SideBar
    },
    mounted() {
      let token = window.localStorage.getItem('token')
      if(!token){
        this.$message.error('您还没有登录,请先登录!')
        this.$router.push('/login')
      }
    },
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .myhome{
      height: 100%;
  }
</style>
