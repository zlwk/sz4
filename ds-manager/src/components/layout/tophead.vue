<template>
    <el-row class="myRow">
       <el-col :span="4">
           <img src="@/assets/logo.png" alt="">
       </el-col>
       <el-col :span="18">
           <h2>电商后台管理平台</h2>
       </el-col>
       <el-col :span="2">
           <a href="#" @click.prevent="loginOut">退出</a>
       </el-col>
   </el-row>
</template>

<script>
export default {
    methods: {
        loginOut() {
        this.$confirm('您确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            window.localStorage.removeItem('token'),
            this.$router.push('/login')//以path属性为基准进行跳转
            //this.$router.push({name:'login'})  //以name属性为基准进行跳转
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
      }
    },
}
</script>

<style scope>
    .myRow img{
        width: 60px;
        height:60px;
    }
    .myRow h2{
        margin:0;
        color: #fff;
    }
    .myRow a{
        text-decoration: none;
        color: goldenrod;
    }
</style>
