<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-link">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="myrow">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" plain>添加账户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
          </el-row>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesizes:[3,5],
      pagesize: 3,
      total: 3
    };
  },
  methods: {
    getDataList() {
      this.$http({
        method: "GET",
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data.users
          this.pagenum = data.pagenum
          this.total = data.total
        }
      });
    },
    SizeChange(pagesize) {
      this.pagesize = pagesize
      this.pagenum = 1
      this.getDataList()
    },
    CurrentChange(currentPage) {
      this.pagenum = currentPage
      this.getDataList();
    },
    search(){
       this.pagenum = 1
      this.getDataList()
    }
  },
  mounted() {
    this.getDataList()
  }
};
</script>

<style scope>
.myrow {
  margin-top: 20px
}
</style>
