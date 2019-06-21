<template>
  <div class="login">
    <div class="myLogin">
      <el-form :model="userObj" label-position="top" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
      >
      <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username" >
          <el-input type="text" v-model="userObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="denglu" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userObj: {
        username: '',
        password: ''
      },
      rules:{
          username:[
              { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
          ]
      }
    };
  },
  methods:{
      login(){
          this.$refs.ruleForm.validate(valid=>{
              if(valid){
                  this.$http({
                   method:'POST',
                   url:'http://localhost:8888/api/private/v1/login',
                   data:this.userObj
                  }).then(res=>{
                    let {data,meta} = res.data
                    if(meta.status ===200){
                      window.localStorage.setItem('token',data.token)//保存登录令牌
                      this.$message(meta.msg);
                      this.$router.push('/')
                    }else{
                      this.$message(meta.msg)
                    }
                  }).catch(err=>console.log(err)
                  )
              }else{
                   this.$message('请填写完整')
              }
          })
      }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.myLogin {
  width: 500px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding:25px;
  box-sizing: border-box
}
.denglu{
    width: 100%;
}
</style>
