<template>
  <div class="table-container">
    <el-input v-model="keyword" placeholder="请输入关键词" class="search-input" @input="handleSearch" clearable />
    <el-table :data="displayData" style="width: 100%">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="gender">
        <!-- <template #default="{ row }">
                    {{ row.gender === 0 ? '男' : '女' }}
                </template> -->
      </el-table-column>
      <el-table-column label="工号" prop="jobNumber"></el-table-column>
      <el-table-column label="科目" prop="subject"></el-table-column>
      <el-table-column label="职务" prop="position"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="edit(row)">编辑</el-button>
          <el-button type="text" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page.sync="currentPage"
      :page-sizes="pageSizes" :page-size.sync="pageSize" :total="total" :layout="paginationLayout"
      background></el-pagination>
    <el-dialog :visible="dialogVisible" title="编辑信息" v-model="dialogVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="教学科目" :label-width="labelWidth" prop="subject">
          <!-- <el-input v-model="form.subject" /> -->
          <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="changeobj">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="职务" :label-width="labelWidth" prop="position">
          <!-- <el-input v-model="form.position" /> -->
          <el-select v-model="values" class="m-2" placeholder="Select" size="large" @change="changezhiwu">
            <el-option v-for="item in zhiwus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="状态" :label-width="labelWidth" prop="status">

            <input type="radio" name="radios" v-model="radio1" value="在校" @change="changes" />在校
            <input type="radio" name="radios" v-model="radio1" value="离校" @change="changes" />离校
          </el-form-item>
        </el-form>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">更新</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import { reactive, toRefs, computed, ref, getCurrentInstance } from 'vue'
import { ElButton, ElPagination, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElInput, ElRadio, ElRadioGroup, ElSelect, ElOption } from 'element-plus'
import api from '../axios/api';
export default {
  components: { ElButton, ElPagination, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElInput, ElRadio, ElRadioGroup, ElSelect, ElOption },
  async setup() {
    let staus = '1'
    const value = ref('')
    const values = ref('')
    const options = [
      {
        value: '暂无',
        label: '暂无',
      },
      {
        value: '语文',
        label: '语文',
      },
      {
        value: '数学',
        label: '数学',
      },
      {
        value: '物理',
        label: '物理',
      },
      {
        value: '生物',
        label: '生物',
      },
      {
        value: '历史',
        label: '历史',
      },
      {
        value: '政治',
        label: '政治',
      },
      {
        value: '体育',
        label: '体育',
      },
      {
        value: '信息技术',
        label: '信息技术',
      },
    ]
    const zhiwus = [
      {
        value: '校长',
        label: '校长',
      },
      {
        value: '副校长',
        label: '副校长',
      },
      {
        value: '任课老师',
        label: '任课老师',
      },
      {
        value: '年级主任',
        label: '年级主任',
      },
      {
        value: '团委书记',
        label: '团委书记',
      },
      {
        value: '副团委书记',
        label: '副团委书记',
      },
      {
        value: '宣传部部长',
        label: '宣传部部长',
      },
      {
        value: '生活部部长',
        label: '生活部部长',
      },
      {
        value: '编辑部部长',
        label: '编辑部部长',
      },
      {
        value: '执行秘书长',
        label: '执行秘书长',
      },
      {
        value: '常务理事',
        label: '常务理事',
      },
      {
        value: '副常务理事',
        label: '副常务理事',
      },
    ]
    let tableData = reactive([])
    let res = await api.getData()
    console.log(res)
    tableData.push(res.data)
    tableData = res.data
    const form = reactive(tableData)
    const rules = reactive({
      subject: [
        { required: true, message: '请输入教学科目', trigger: 'blur' }
      ],
      position: [
        { required: true, message: '请输入职务', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '请选择状态', trigger: 'blur' }
      ]
    })
    const dialogVisible = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(tableData.length)
    const pageSizes = reactive([5, 10, 20, 50])
    const paginationLayout = ref('sizes, total, prev, pager, next, jumper')
    const labelWidth = ref('120px')
    const keyword = ref('')
    // 根据分页信息对数据进行切割
    // const displayData = computed(() => {
    //   const startIndex = (currentPage.value - 1) * pageSize.value
    //   const endIndex = Math.min(startIndex + pageSize.value, total.value)
    //   return tableData.slice(startIndex, endIndex)
    // })

    // 处理表格数据的展示，支持分页和搜索
    const displayData = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value
      const endIndex = startIndex + pageSize.value
      const filteredData = tableData.filter(item => {
        const name = item.name.toLowerCase()
        const keywordValue = keyword.value.trim().toLowerCase()
        return name.includes(keywordValue)
      })
      return filteredData.slice(startIndex, endIndex)
    })
    // 处理分页条数改变事件
    const pageSizeChange = (val) => {
      pageSize.value = val
      currentPage.value = 1
    }
    // 处理当前页码改变事件
    const currentPageChange = (val) => {
      currentPage.value = val
    }
    const edit = (row) => {
      form.id = row.id
      form.name = row.name
      form.subject = value
      form.gender = row.gender
      form.jobNumber = row.jobNumber
      form.position = values
      form.status = row.status
      // console.log(row.name);
      dialogVisible.value = true
      console.log(row)
      console.log(form)
    }
    function changeIN(e) {
      // console.log(e);
      form.name = e
    }
    function positionIN(e) {
      form.position = e
    }
    const submitForm = () => {
      let id = form.id
      let status = staus
      let subject = form.subject
      let position = form.position
      // console.log(id,status,subject,position)
      let obj = {
        id,
        status,
        subject,
        position
      }
      api.updateTeacher(obj).then(res => {
        api.getData().then(res => {
          console.log(res);
          tableData = reactive(res.data)
          console.log(tableData);


        })
      })
      dialogVisible.value = false
    }
    //编辑
    const changes = (e) => {
      // console.log(e.target.value)
      staus = e.target.value
      console.log(staus)
      // form.position = e.target.value

    }
    const changeobj = (e) => {
      console.log(e)
      // staus=e.target.value
      // console.log(staus)
      // form.position = e.target.value

    }
    const changezhiwu = (e) => {
      console.log(e)
      // staus=e.target.value
      // console.log(staus)
      // form.position = e.target.value

    }

    const remove = (row) => {
      let Id = row.id
      console.log(Id)
      let obj = {
        Id
      }
      api.remTeacher(obj).then(res => {
        api.getData().then(res => {
          console.log(res);
          tableData = reactive(res.data)
          console.log(tableData);


        })
      })
    }
    const handleSearch = (value) => {
      currentPage.value = 1
      keyword.value = value.trim()
    }
    return {
      tableData,
      form,
      rules,
      dialogVisible,
      currentPage,
      pageSize,
      total,
      pageSizes,
      paginationLayout,
      labelWidth,
      submitForm,
      edit,
      remove,
      currentPageChange,
      pageSizeChange,
      displayData,
      handleSearch,
      keyword,
      changeIN,
      positionIN,
      changes,
      options,
      value,
      changeobj,
      zhiwus,
      values,
      changezhiwu
    }
  }
}
</script>
<style></style>