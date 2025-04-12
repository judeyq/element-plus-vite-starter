<script lang="ts" setup>
    import { ref, reactive, onMounted } from 'vue'
    import { statusColorMap } from '@/typings/sailling.ts'

    const ReveiveColumns = ref([
        {
            prop: 'index',
            label: '序号',
            width: '80'
        },
        {
            prop: 'dischargePort',
            label: '卸货港',
        },
        {
            prop: 'dischargeDock',
            label: '卸货码头',
        },
        {
            prop: 'subscribeInfo',
            label: '订阅信息',
        },
        {
            prop: 'subscribeDate',
            label: '订阅日期',
        },
        {
            prop: 'deadline',
            label: '截止日期',
        },
        {
            prop: 'shipDateNum',
            label: '已发船期',
        },
        {
            prop: 'mainfestNum',
            label: '已发舱单',
        },
        {
            prop: 'mainfestDetailNum',
            label: '舱单明细',
        },
        {
            prop: 'status',
            label: '状态'
        },
        {
            prop: 'actions',
            label: '操作',
            width: 300,
            isAction: true
        }
    ])
    const SendColumns = ref([
        {
            prop: 'index',
            label: '序号',
            width: '80'
        },
        // 装货港
        {
            prop: 'loadingPort',
            label: '装货港',
        },
        {
            prop: 'loadingDock',
            label: '装货码头',
        },
        // 订阅信息
        {
            prop: 'subscribeInfo',
            label: '订阅信息',
        },
        // 订阅日期
        {
            prop: 'subscribeDate',
            label: '订阅日期',
        },
        // 截止日期
        {
            prop: 'deadline',
            label: '截止日期',
        },
        // 收到船期
        {
            prop: 'receiveShipDateNum',
            label: '收到船期',
        },
        // 收到舱单
        {
            prop: 'receiveMainfestNum',
            label: '收到舱单',
        },
        // 舱单明细
        {
            prop: 'receiveMainfestDetailNum',
            label: '舱单明细',
        },
        // 状态
        {
            prop: 'status',
            label: '状态'
        },
        // 操作
        {
            prop: 'actions',
            label: '操作',
            width: 300,
            isAction: true
        }
    ])
    // 表格数据
    const totalData = ref < SaillingTable[] > ([]) // 当前页显示数据
    const currentPage = ref(1) // 当前页码
    const pageSize = ref(10) // 每页显示条数
    const tableData = ref < SaillingTable[] > ([]) // 总数
    // 模拟请求后端请求接口
    const generateMockData = (count = 100): any[] => {
        const loadingDocks = ['武汉江盛码头', '上海港', '深圳港', '广州港'];
        const loadingPorts = ['武汉江盛码头', '上海港', '深圳港', '广州港'];
        const ports = ['上海港', '青岛港', '天津港', '大连港'];
        const docks = ['海通洋山港', '青岛前湾港', '天津新港', '大连港'];
        const subscribeTypes = ['船货信息', '到港提醒', '舱单更新'];
        const statusOptions = ['待接受', '订阅中', '已关闭', '已取消'];
        const actions = ['接受', '关闭', '删除', '重启', '修订', '取消']
        const today = new Date();

        return Array.from({ length: count }, (_, index) => ({
            index: index + 1,
            loadingPort: loadingPorts[Math.floor(Math.random() * loadingPorts.length)],// 装货港
            loadingDock: loadingDocks[Math.floor(Math.random() * loadingDocks.length)], // 装货码头
            dischargePort: ports[Math.floor(Math.random() * ports.length)], // 卸货港
            dischargeDock: docks[Math.floor(Math.random() * docks.length)], // 卸货码头
            subscribeInfo: `${subscribeTypes[Math.floor(Math.random() * subscribeTypes.length)]}`, // 订阅信息
            subscribeDate: new Date(today.setDate(today.getDate() - Math.floor(Math.random() * 30))).toISOString().slice(0, 10), 
            deadline: new Date(today.setDate(today.getDate() + Math.floor(Math.random() * 90))).toISOString().slice(0, 10), 
            shipDateNum: Math.floor(Math.random() * 50) + 1,
            mainfestNum: Math.floor(Math.random() * 30) + 1, 
            mainfestDetailNum: Math.floor(Math.random() * 200), 
            receiveShipDateNum: Math.floor(Math.random() * 50) + 1,
            receiveMainfestNum: Math.floor(Math.random() * 30) + 1,
            receiveMainfestDetailNum: Math.floor(Math.random() * 200),
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)], 
            actions: actions[Math.floor(Math.random() * actions.length)]
        }));
    }

    // 模拟请求函数
    const getSaillingDate = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 100))
            const mockData = generateMockData()
            totalData.value = mockData
            updateTableData()
        } catch (error) {
            ElMessage.error('获取数据失败')
            throw error
        }
    }
    // 根据分页参数更新当前页数据
    const updateTableData = () => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        tableData.value = totalData.value.slice(start, end)
    }

    // 分页页码变化时触发
    const handlePageChange = (newPage) => {
        currentPage.value = newPage
        updateTableData()
    }
    onMounted(() => {
        getSaillingDate()
    })
    // 新增订阅弹窗
    const showSubscribeDialog = ref(false)
    const handleClickshowSubscribeDialog = () => {
        showSubscribeDialog.value = true
    }
    const form = reactive({
        route: '',
        dischargePort: '',
        dischargeDock: '',
        subscribeType: '',
        subscribeDate: '',
        deadline: '',
    })
    const startDate = ref('')
    const endDate = ref('')
</script>
<template>
    <div>
        <h1 class="flex items-center justify-center">订阅管理</h1>
        <el-tabs type="border-card">
            <el-tab-pane label="发送的订阅信息">
                <div class="flex items-center mb-20px">
                    <el-button @click="handleClickshowSubscribeDialog" type="primary">新增订阅</el-button>
                </div>
                <div class="table">
                    <el-table :data="tableData" border stripe empty-text="暂无数据" :scrollbar-always-on="true"
                        :header-row-class-name="'custom-header'" show-overflow-tooltip @row-click="handleClickToDetail">
                        <el-table-column class="table-column" v-for="column in SendColumns" :key="column.prop"
                            :prop="column.prop" :label="column.label" :width="column.width || ''" header-align="center"
                            align="center">
                            <template v-if="column.prop === 'status'" #default="scope">
                                <el-tag :type="statusColorMap[scope.row.status]">
                                    {{ scope.row.status }}
                                </el-tag>
                            </template>
                            <template v-if="column.isAction" #default="scope">
                                <el-button type="success" @click="ElMessage('该功能正在开发中。。。')">
                                    修订
                                </el-button>
                                <el-button type="info" v-if="scope.row.status === '已取消'" @click="ElMessage('该功能正在开发中。。。')">
                                    重启
                                </el-button>
                                <el-button type="info" v-else @click="ElMessage('该功能正在开发中。。。')">
                                    取消
                                </el-button>
                                <el-button type="danger" :disabled="scope.row.status === '订阅中'" @click="ElMessage('该功能正在开发中。。。')">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mt-20px flex items-center justify-center">
                        <el-pagination background layout="prev, pager, next" :total="totalData.length"
                            :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="收到的订阅信息">
                <div class="flex items-center mb-50px">
                </div>
                <div class="table">
                    <el-table :data="tableData" border stripe empty-text="暂无数据" :scrollbar-always-on="true"
                        :header-row-class-name="'custom-header'" show-overflow-tooltip @row-click="handleClickToDetail">
                        <el-table-column class="table-column" v-for="column in ReveiveColumns" :key="column.prop"
                            :prop="column.prop" :label="column.label" :width="column.width || ''" header-align="center"
                            align="center">
                            <template v-if="column.prop === 'status'" #default="scope">
                                <el-tag :type="statusColorMap[scope.row.status]">
                                    {{ scope.row.status }}
                                </el-tag>
                            </template>
                            <template v-if="column.isAction" #default="scope">
                                <el-button type="success" :disabled="scope.row.status !== '待接受'" @click="ElMessage('该功能正在开发中。。。')">
                                    接受
                                </el-button>
                                <el-button type="info" v-if="scope.row.status === '已关闭'" @click="ElMessage('该功能正在开发中。。。')">
                                    开启
                                </el-button>
                                <el-button type="info" v-else :disabled="scope.row.status === '已关闭'" @click="ElMessage('该功能正在开发中。。。')">
                                    关闭
                                </el-button>
                                <el-button type="danger" @click="ElMessage('该功能正在开发中。。。')">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mt-20px flex items-center justify-center">
                        <el-pagination background layout="prev, pager, next" :total="totalData.length"
                            :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <el-dialog v-model="showSubscribeDialog" title="船货信息订阅" width="640" center :close-on-click-modal="false">
        <template #default>
            <el-form :model="form" label-width="auto" class="px-20px">
                <el-form-item label="起运港口" required>
                    <div class="flex items-center justify-between">
                        <el-select v-model="form.route" style="width:426px" clearable placeholder="请选择上游港口航线">
                            <el-option label="长江" value="长江" />
                        </el-select>
                        <el-select class="ml-20px" v-model="form.dischargePort" clearable placeholder="请选择上游港口">
                            <el-option label="武汉江盛" value="武汉江盛" />
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="装货码头" required>
                    <el-select v-model="form.dischargeDock" placeholder="请选择港口码头">
                        <el-option label="上海海通洋山港" value="上海海通洋山港" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订阅信息" required>
                    <el-select v-model="form.subscribeType">
                        <el-option label="船货信息" value="船货信息" />
                    </el-select>
                </el-form-item>
                <el-form-item label="起订日期" required>
                    <el-date-picker v-model="form.subscribeDate" type="datetime" placeholder="请选择起订日期" />
                </el-form-item>
                <el-form-item label="截止日期" required>
                    <el-date-picker v-model="form.deadline" type="datetime" placeholder="请选择截止日期" />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="showSubscribeDialog = false">
                    发起订阅
                </el-button>
                <el-button @click="showSubscribeDialog = false">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>