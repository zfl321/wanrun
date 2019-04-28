<template>
  <div v-loading="loading">
    <el-card shadow="always">
      <el-button @click="addBtn" type="primary" style="margin-bottom: 20px;">新增</el-button>
      <!-- <i class="iconfont icon-shoes"></i> -->
      <el-table :data="tableData" border row-key="id">
        <el-table-column prop="text" label="名称" width="180"></el-table-column>
        <el-table-column prop="icon" label="图标" width="180"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type==1" type="success">按钮</el-tag>
            <el-tag v-else>菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="地址"></el-table-column>
        <el-table-column prop="permission" label="权限"></el-table-column>
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <!-- 操作按钮列 -->
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              circle
              icon="el-icon-edit"
              size="mini"
              dialogFormVisible
              @click="handleEdit(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑的弹框 -->
    <el-dialog
      title="编辑菜单或按钮"
      :visible.sync="dialogFormVisible2"
      @close="dialogClose"
      class="astrict"
    >
      <el-form :model="ediEform" :ref="ediEform" :rules="rules">
        <el-form-item label="类型	" prop="type" :label-width="formLabelWidth">
          <div>
            <el-radio
              v-model="ediEform.type"
              label="0"
              border
              @change="handleCheckAllChange"
              disabled
            >菜单</el-radio>
            <el-radio
              v-model="ediEform.type"
              label="1"
              border
              @change="handleCheckAllChange"
              disabled
            >按钮</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="ediEform.menuName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="权限	" :label-width="formLabelWidth">
          <el-input v-model="ediEform.perms" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标	" :label-width="formLabelWidth">
          <el-input
            v-model="ediEform.icon"
            clearable
            placeholder="请输入内容"
            :disabled="disabled"
            ref="inputRef"
            @focus="focusInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址	" prop="path" :label-width="formLabelWidth">
          <el-input v-model="ediEform.path" clearable placeholder="请输入内容" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="排序	" :label-width="formLabelWidth">
          <el-input-number
            v-model="ediEform.orderNum"
            controls-position="right"
            :min="1"
            :disabled="disabled"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="上级菜单	" :label-width="formLabelWidth">
          <el-tree
            :data="tableData"
            ref="tree"
            node-key="id"
            :default-checked-keys="ediEform.parentId"
            :default-expanded-keys="ediEform.parentId"
            highlight-current
            check-strictly
            show-checkbox
            accordion
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(ediEform)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增的弹框 -->
    <el-dialog title="新增菜单或按钮" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :ref="addform" :rules="rules">
        <el-form-item label="类型 " prop="type" :label-width="formLabelWidth">
          <div>
            <el-radio v-model="addform.type" label="0" border @change="handleCheckAllChange">菜单</el-radio>
            <el-radio v-model="addform.type" label="1" border @change="handleCheckAllChange">按钮</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="名称 " prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="addform.menuName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="权限	" :label-width="formLabelWidth">
          <el-input v-model="addform.perms" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标	" :label-width="formLabelWidth" style="position: relative;">
          <el-input
            v-model="addform.icon"
            clearable
            placeholder="请输入内容"
            :disabled="disabled"
            ref="inputRef1"
            @focus="focusInput"
            style="text-align: right;"
          ></el-input>
          <el-button
            icon="el-icon-setting"
            :disabled="disabled"
            class="iconModify"
            @click="dialogFormVisible3=true"
          ></el-button>
        </el-form-item>
        <el-form-item label="地址	" prop="path" :label-width="formLabelWidth">
          <el-input
            v-model="addform.path"
            clearable
            placeholder="请输入内容"
            :disabled="disabled"
            ref="inputRef"
            @focus="focusInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序	" :label-width="formLabelWidth">
          <el-input-number
            v-model="addform.orderNum"
            controls-position="right"
            :min="1"
            :disabled="disabled"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="上级菜单	" :label-width="formLabelWidth">
          <el-tree
            :data="tableData"
            ref="tree"
            node-key="id"
            :default-checked-keys="addform.parentId"
            highlight-current
            check-strictly
            show-checkbox
            accordion
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd(addform)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 图标的弹框 -->
    <el-dialog title="选择图标" :visible.sync="dialogFormVisible3" class="astrict">
      <div
        v-for="(item,index) in this.arrdata"
        :key="index"
        class="my-icon"
        @click="iconModify(item)"
      >
        <i :class="item" style></i>
        <!-- <div>{{item}}</div> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3=false">取 消</el-button>
        <el-button type="primary" @click="iconBtn" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuList, menuAdd, editMenu, delMenu } from '@/api'
export default {
  data () {
    return {
      rules: {
        menuName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        perms: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],

      },
      dialogFormVisible3: false,
      arrdata: [
        'el-icon-edit',
        'el-icon-delete',
        'el-icon-search',
        'el-icon-loading',
        'el-icon-edit-outline',
        'el-icon-rank',
        'iconfont icon-guanliyuan',
        'iconfont icon-all',
        'iconfont icon-cart',
        'iconfont icon-category',
        'iconfont icon-close',
        'iconfont icon-comments',
        'iconfont icon-cry',
        'iconfont icon-delete',
        'iconfont icon-edit',
        'iconfont icon-email',
        'iconfont icon-favorite',
        'iconfont icon-form',
        'iconfont icon-help',
        'iconfont icon-information',
        'iconfont icon-less',
        'iconfont icon-moreunfold',
        'iconfont icon-more',
        'iconfont icon-pic',
        'iconfont icon-qrcode',
        'iconfont icon-refresh',
        'iconfont icon-rfq',
        'iconfont icon-search',
        'iconfont icon-selected',
        'iconfont icon-set',
        'iconfont icon-smile',
        'iconfont icon-success',
        'iconfont icon-survey',
        'iconfont icon-training',
        'iconfont icon-viewgallery',
        'iconfont icon-viewlist',
        'iconfont icon-warning',
        'iconfont icon-wrong',
        'iconfont icon-account',
        'iconfont icon-add',
        'iconfont icon-atm',
        'iconfont icon-clock',
        'iconfont icon-remind',
        'iconfont icon-calendar',
        'iconfont icon-attachment',
        'iconfont icon-discount',
        'iconfont icon-service',
        'iconfont icon-print',
        'iconfont icon-box',
        'iconfont icon-process',
        'iconfont icon-beauty',
        'iconfont icon-electrical',
        'iconfont icon-home',
        'iconfont icon-electronics',
        'iconfont icon-gifts',
        'iconfont icon-lights',
        'iconfont icon-sports',
        'iconfont icon-toys',
        'iconfont icon-auto',
        'iconfont icon-jewelry',
        'iconfont icon-trade-assurance',
        'iconfont icon-browse',
        'iconfont icon-rfqqm',
        'iconfont icon-rfqquantity',
        'iconfont icon-atmaway',
        'iconfont icon-rfq1',
        'iconfont icon-scanning',
        'iconfont icon-compare',
        'iconfont icon-filter',
        'iconfont icon-pin',
        'iconfont icon-history',
        'iconfont icon-productfeatures',
        'iconfont icon-supplierfeatures',
        'iconfont icon-similarproduct',
        'iconfont icon-link1',
        'iconfont icon-cut',
        'iconfont icon-navlist',
        'iconfont icon-imagetext',
        'iconfont icon-text',
        'iconfont icon-move',
        'iconfont icon-subtract',
        'iconfont icon-dollar',
        'iconfont icon-shanchujinzhi',
        'iconfont icon-raw',
        'iconfont icon-office',
        'iconfont icon-agriculture',
        'iconfont icon-machinery',
        'iconfont icon-assessedbadge',
        'iconfont icon-gerenzhongxin',
        'iconfont icon-jifen',
        'iconfont icon-operation',
        'iconfont icon-remind1',
        'iconfont icon-icondownload',
        'iconfont icon-map',
        'iconfont icon-2',
        'iconfont icon-bad',
        'iconfont icon-good',
        'iconfont icon-skip',
        'iconfont icon-iconfontplay2',
        'iconfont icon-iconfontstop',
        'iconfont icon-compass',
        'iconfont icon-security',
        'iconfont icon-share',
        'iconfont icon-store',
        'iconfont icon-manageorder',
        'iconfont icon-rejectedorder',
        'iconfont icon-phone',
        'iconfont icon-bussinessman',
        'iconfont icon-shoes',
        'iconfont icon-mobilephone',
        'iconfont icon-emailfilling',
        'iconfont icon-favoritesfilling',
        'iconfont icon-accountfilling',
        'iconfont icon-creditlevel',
        'iconfont icon-creditlevelfilling',
        'iconfont icon-exl',
        'iconfont icon-pdf',
        'iconfont icon-zip',
        'iconfont icon-gouwuchetianjia',
        'iconfont icon-erweima',
        'iconfont icon-sorting',
        'iconfont icon-saoyisao',
        'iconfont icon-shouye',
        'iconfont icon-suo',
        'iconfont icon-tishi',
        'iconfont icon-wancheng',
        'iconfont icon-wodedingdan',
        'iconfont icon-yanjing',
        'iconfont icon-yijianfankui',
        'iconfont icon-zhaoxiangji',
        'iconfont icon-copy',
        'iconfont icon-kongdiao',
        'iconfont icon-lianjie',
        'iconfont icon-save',
        'iconfont icon-inquirytemplate',
        'iconfont icon-templatedefault',
        'iconfont icon-tuichu2',
        'iconfont icon-louceng0',
        'iconfont icon-louceng',
        'iconfont icon-libra',
        'iconfont icon-survey1',
        'iconfont icon-shenfenzheng',
        'iconfont icon-ship',
        'iconfont icon-ai55',
        'iconfont icon-bussinesscard',
        'iconfont icon-hot',
        'iconfont icon-cuowujinzhi',
        'iconfont icon-data',
        'iconfont icon-trade',
        'iconfont icon-onepage48',
        'iconfont icon-guanliyuan1',
        'iconfont icon-signboard',
        'iconfont icon-shuffling-banner',
        'iconfont icon-component',
        'iconfont icon-component-filling',
        'iconfont icon-color',
        'iconfont icon-color-filling',
        'iconfont icon-favorites',
        'iconfont icon-pic-filling',
        'iconfont icon-RFQ',
        'iconfont icon-louceng1',
        'iconfont icon-originalimage',
        'iconfont icon-logistic',
        'iconfont icon-Calculator',
        'iconfont icon-video',
        'iconfont icon-hold__easyico',
        'iconfont icon-earth',
        'iconfont icon-link',
        'iconfont icon-task-management',
        'iconfont icon-trust',
        'iconfont icon-password',
        'iconfont icon-column',
        'iconfont icon-apparel',
        'iconfont icon-bags',
        'iconfont icon-folder',
        'iconfont icon-column1',
        'iconfont icon-code',
        'iconfont icon-customs-clearance',
        'iconfont icon-floor-settings',
        'iconfont icon-tuichu',
        'iconfont icon-tishijinzhi',
        'iconfont icon--',
        'iconfont icon-camera',
        'iconfont icon-_kongtiao',
        'iconfont icon-ren',
        'iconfont icon-dengpao',
        'iconfont icon-fuwuyuan',
        'iconfont icon-shiliangzhinengduixiang',
        'iconfont icon-dengpao_',
        'iconfont icon-add-account',
        'iconfont icon-kongtiaokaifang',
        'iconfont icon-lianjie1',
        'iconfont icon-qiyeguanli_yuangongguanli',
        'iconfont icon-jiaoseguanli',
        'iconfont icon-jiudianfangjian',
        'iconfont icon-weibiaoti-',
        'iconfont icon-listing-content',
        'iconfont icon-warehouse-delivery',
        'iconfont icon-customization',
        'iconfont icon-inspection',
        'iconfont icon-packing-labeling',
        'iconfont icon-online-tracking',
        'iconfont icon-anquantuichu',
        'iconfont icon-fengsu',
        'iconfont icon-fengsu1',
        'iconfont icon-fengsu2',
        'iconfont icon-play-filling',
        'iconfont icon-nosound-filling',
        'iconfont icon-sound-filling',
        'iconfont icon-ren1',
        'iconfont icon-lianjie2',
        'iconfont icon-kongtiao',
        'iconfont icon-jizhongkongtiaojiance',
        'iconfont icon-electrical-equipment',
        'iconfont icon-home-appliances',
        'iconfont icon-furniture',
        'iconfont icon-fashion-accessories',
        'iconfont icon-security-protection',
        'iconfont icon-textile-products',
        'iconfont icon-tools-hardware',
        'iconfont icon-office-supplies',
        'iconfont icon-vehicles',
        'iconfont icon-yonghujiao',
      ],
      tableData: null,
      formLabelWidth: "100px",
      loading: false,
      disabled: false,
      dialogFormVisible: null,
      dialogFormVisible2: null,
      addform: {
        parentId: null,//父级ID
        menuName: null, //名称
        perms: null, //权限
        path: null, //路径
        icon: null, //图标
        orderNum: null, //排序
        type: null, //类型
      },
      ediEform: {
        parentId: null,//父级ID
        menuName: null, //名称
        perms: null, //权限
        path: null, //路径
        icon: null, //图标
        orderNum: null, //排序
        type: null, //类型
        menuId: null, //菜单id
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
    }
  },
  created () {
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {

    // 初始化表格数据
    initList (obj) {
      this.loading = true
      getMenuList(obj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.rows.children
          this.loading = false
        }
      })
    },
    //新增
    addBtn () {
      this.dialogFormVisible = true
    },
    confirmAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let number
          this.addform.parentId = this.$refs.tree.getCheckedKeys()[0]
          this.loading = true
          menuAdd(this.addform)
            .then((res) => {
              this.loading = false
              if (res.data.code == 1) {
                this.$message.success(res.data.message)
                this.initList()
                this.dialogFormVisible = false
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch(err => {
              this.loading = false
              console.log(err)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 编辑
    handleEdit (row) {
      this.ediEform.parentId = [row.parentId]
      this.ediEform.menuId = row.id
      this.ediEform.menuName = row.text
      this.ediEform.perms = row.permission
      this.ediEform.path = row.path
      this.ediEform.icon = row.icon
      this.ediEform.orderNum = row.order
      this.ediEform.type = row.type
      if (row.type == 1) {
        this.disabled = true
        this.rules.path[0].required = false
      } else {
        this.disabled = false
        this.rules.path[0].required = true
      }
      this.dialogFormVisible2 = true
    },
    //确认
    confirmEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.ediEform.parentId = this.ediEform.parentId[0]
          editMenu(this.ediEform).then(res => {
            this.loading = false
            if (res.data.code == 1) {
              this.$message.success(res.data.message)
              this.initList()
              this.dialogFormVisible2 = false
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //删除
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row)
        delMenu(row.id)
          .then(res => {
            // console.log(res)
            if (res.data.code == 1) {
              this.$message.success("删除成功")
              this.initList()
            } else {
              this.$message.error("删除失败")
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCheckAllChange (val) {
      if (val == 1) {
        this.disabled = true
        this.path = null //路径
        this.icon = null //图标
        this.orderNum = null //排序
        this.rules.path[0].required = false
      } else {
        this.disabled = false
        this.rules.path[0].required = true
      }
    },
    focusInput () {
      if (!this.addform.type && this.ediEform.type == null) {
        this.$message.error('请先选择类型')
        this.$refs.inputRef.blur()
        this.$refs.inputRef1.blur()
      }
    },
    //编辑关闭事件
    dialogClose () {
      this.ediEform.parentId = null
      this.$refs.tree.setCheckedKeys([]);
    },
    iconModify (i) {
      if (!this.addform.type && this.ediEform.type == null) {
        this.$message.error('请先选择类型')
      } else {
        this.addform.icon = i
        this.dialogFormVisible3 = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.iconModify {
  right: 0;
  top: 0;
  position: absolute;
  height: 32px;
}
.my-icon {
  margin: 9px 7px;
  display: inline-block;
  text-align: center;

  color: #666;
  i {
    font-size: 36px;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
