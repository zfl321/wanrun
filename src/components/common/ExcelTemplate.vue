<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column prop="brandName" label="品牌" width="120"></el-table-column>
      <el-table-column prop="hotelName" label="门店" width="120"></el-table-column>
      <el-table-column prop="buildingName" label="建筑" width="120"></el-table-column>
      <el-table-column prop="floorName" label="楼层" width="80"></el-table-column>
      <el-table-column prop="roomTypeName" label="房间类型" width="120"></el-table-column>
      <el-table-column prop="roomNumber" label="房间号" width="70"></el-table-column>
      <el-table-column prop="mainBoardIp" label="主板ip" width="120"></el-table-column>
      <el-table-column prop="mainBoardId" label="主板id" width="120"></el-table-column>
      <el-table-column prop="remark" label="描述" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    }

  }
</script>