<template>
    <div v-if="showSaillingDate">
        <h1 class="flex items-center justify-center">船期信息</h1>
        <div class="table my-20px">
            <div class="mb-10px">
                <el-button type="primary">历史船期信息</el-button>
            </div>
            <el-table :data="tableData" border empty-text="暂无数据" :scrollbar-always-on="true"
                :row-class-name="tableRowClassName" :header-row-class-name="'custom-header'" show-overflow-tooltip
                @row-click="handleClickToDetail">
                <el-table-column class="table-column" v-for="column in columns" :key="column.prop" :prop="column.prop"
                    :label="column.label" :width="column.width || ''" header-align="center" align="center">
                    <template v-if="column.isAction" #default="scope">
                        <el-button type="primary" @click="handleClickToPosition(scope.row)" link style="color: #409EFF"
                            class="cursor-pointer">
                            船位跟踪
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-20px flex items-center justify-center">
                <el-pagination background layout="prev, pager, next" :total="totalData.length"
                    :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
            </div>
        </div>
    </div>
    <ShipPosition v-else ref="showPosition" />
</template>

<script lang="ts" setup>
    import { SaillingTable } from '@/typings/sailling.ts'
    import ShipPosition from '@/views/cargo/components/ShipPosition.vue'
    import { ref, nextTick, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const showSaillingDate = ref(true)
    // status: 已靠港、已离港、作业中、有计划
    const tableRowClassName = ({ row }: { row: SaillingTable }) => {
        switch (row.status) {
            case '作业中': return 'warning-row';
            case '已靠港': return 'info-row';
            case '已离港': return 'success-row';
            case '有计划': return 'error-row';
            default: return '';
        }
    };
    // 表头
    const columns = [
        {
            prop: 'index',
            label: '序号',
            width: 80
        },
        {
            prop: 'shipName',
            label: '船名/航次',
        },
        {
            prop: 'loadingDock',
            label: '装货码头',
        },
        {
            prop: 'dischargeDock',
            label: '卸货码头',
        },
        {
            prop: 'carNum',
            label: '商品车数量',
        },
        {
            prop: 'planDate',
            label: '计划离港时间',
        },
        {
            prop: 'actualDate',
            label: '实际离港时间',
        },
        {
            prop: 'expectDate',
            label: '预计到港时间',
        },
        {
            prop: 'status',
            label: '状态',
        },
        {
            prop: 'actions',
            label: '船位跟踪',
            isAction: true,
        }
    ]

    const totalData = ref < SaillingTable[] > ([]) // 当前页显示数据
    const currentPage = ref(1) // 当前页码
    const pageSize = ref(10) // 每页显示条数
    const tableData = ref < SaillingTable[] > ([]) // 总数
    // 模拟请求后端请求接口
    const generateMockData = (count = 100): SaillingTable[] => {
        const statusOptions = ['作业中', '已靠港', '已离港', '有计划']
        const shipNames = ['玫瑰公主号', '蓝精灵号', '泰坦尼克号', '海洋巡游者号', '海王号', '极光号']
        const loadingDocks = ['武汉江盛码头', '上海港', '深圳港', '广州港']
        const dischargeDocks = ['海通洋山港', '青岛港', '天津港', '大连港']
        return Array.from({ length: count }, (_, index) => ({
            index: index + 1,
            id: `000${index + 1}`,
            shipName: shipNames[Math.floor(Math.random() * shipNames.length)],
            loadingDock: loadingDocks[Math.floor(Math.random() * loadingDocks.length)],
            dischargeDock: dischargeDocks[Math.floor(Math.random() * dischargeDocks.length)],
            carNum: Math.floor(Math.random() * 500) + 100,
            planDate: '2020-01-01',
            actualDate: '2020-01-01',
            expectDate: '2020-01-01',
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
            actions: '船位跟踪'
        }))
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

    const showPosition = ref < InstanceType < typeof ShipPosition >> ()

    // 船位跟踪
    const handleClickToPosition = async (row) => {
        showSaillingDate.value = false
        await nextTick()
        console.log('child com', showPosition.value)
        showPosition.value?.getShipId(row.id)
    }
    const router = useRouter()
    // 显示舱单信息
    const handleClickToDetail = (column) => {
        console.log(column)
        router.push({
            path: '/cargo/mainfest',
            query: {
                ...column
            }
        })
    }   
</script>

<style scoepd lang="scss">
    .table {
        overflow-y: scroll;
    }

    .custom-header {
        color: #333;
        font-weight: bolder;
    }
</style>