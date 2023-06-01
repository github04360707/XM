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
            <el-table-column label="年龄" prop="age"></el-table-column>
            <!-- <el-table-column label="职务" prop="position"></el-table-column> -->
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
                <el-form-item label="状态" :label-width="labelWidth" prop="status">
                    <!-- <el-input v-model="form.status" /> -->
					
					<input type="radio" name="radios" v-model="radio1" value="在校" @change="changes"/>在校
					<input type="radio" name="radios" v-model="radio1" value="离校" @change="changes"/>离校
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">修改</el-button>
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
		const radio1 = reactive()
		let staus='1'
        let tableData = reactive([])
        let res = await api.getStudent()
        console.log(res)
        // tableData.push(res.data)
        tableData=res.data
        const form = reactive(tableData)
        const rules = reactive({
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            subject: [
                { required: true, message: '请输入教学科目', trigger: 'blur' }
            ],
            gender: [
                { required: true, message: '请选择性别', trigger: 'change' }
            ],
            jobNumber: [
                { required: true, message: '请输入工号', trigger: 'blur' }
            ],
            position: [
                { required: true, message: '请输入职务', trigger: 'blur' }
            ],
            status: [
                { required: true, message: '请选择状态', trigger: 'change' }
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
            
            console.log(staus,form.id)
			let id = form.id
			let state = staus
			let obj ={
				id,
				state
			}
			api.updateStudent(obj).then(res=>{
				 api.getStudent().then(res=>{
					 console.log(res);
					 tableData=reactive(res.data)
					 console.log(tableData);
					 
					 
				 })
			})
            dialogVisible.value = false
        }
		const changes=(e)=>{
			// console.log(e.target.value)
			staus=e.target.value
			console.log(staus)
			// form.position = e.target.value
			
		}



    //删除数据库的内容
        const remove = (row) => {
            let Id = row.id
			console.log(Id)
			let obj ={
				Id
			}
			api.remStudent(obj).then(res=>{
				 api.getStudent().then(res=>{
					 console.log(res);
					 tableData=reactive(res.data)
					 console.log(tableData);
					 
					 
				 })
			})
			// console.log(res)
			
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