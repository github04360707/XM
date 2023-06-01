<template>
    <div class="table-container">
        <el-input v-model="keyword" placeholder="请输入关键词" class="search-input" @input="handleSearch" clearable />
        <el-table :data="displayData" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="人数" prop="capacity"></el-table-column>
            <el-table-column label="地址" prop="adress"></el-table-column>
            <el-table-column label="教室名字" prop="position"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" @click="edit(row)">编辑</el-button>
                    <!-- <el-button type="text" @click="remove(row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page.sync="currentPage"
            :page-sizes="pageSizes" :page-size.sync="pageSize" :total="total" :layout="paginationLayout"
            background></el-pagination>
        <el-dialog :visible="dialogVisible" title="编辑信息" v-model="dialogVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <!-- <el-form-item label="地址" :label-width="labelWidth" prop="position">
                  <el-input v-model="form.adress" />
              </el-form-item> -->
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="状态" :label-width="labelWidth" prop="status">

                        <input type="radio" name="radios" v-model="radio1" value="可用" @change="changes" />可用
                        <input type="radio" name="radios" v-model="radio1" value="维修中" @change="changes" />维修中
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
        let tableData = reactive([])
        let staus = '1'
        let res = await api.getClass()
        console.log(res)
        tableData.push(res.data)
        tableData = res.data
        const form = reactive(tableData)
        const rules = reactive({
            adress: [
                { required: true, message: '请输入地址', trigger: 'blur' }
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
                const name = item.capacity.toLowerCase()
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
            form.subject = row.subject
            form.gender = row.gender
            form.jobNumber = row.jobNumber
            form.position = row.position
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

            console.log(staus, form.id)
            let id = form.id
            let status = staus
            let obj = {
                id,
                status
            }
            api.updateClass(obj).then(res => {
                api.getClass().then(res => {
                    console.log(res);
                    tableData = reactive(res.data)
                    console.log(tableData);


                })
            })
            dialogVisible.value = false
        }




        const remove = (row) => {
            const index = tableData.indexOf(row)
            tableData.splice(index, 1)
        }
        const changes = (e) => {
            // console.log(e.target.value)
            staus = e.target.value
            console.log(staus)
            // form.position = e.target.value

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
            changes
        }
    }
}
</script>
<style></style>