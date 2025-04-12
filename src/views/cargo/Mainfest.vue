<script lang="ts" setup>
    import MainfestDetail from '@/views/cargo/components/MainfestDetail.vue'
    import { useRoute } from 'vue-router'
    import { ref, watch } from 'vue'
    const route = useRoute()

    const showMainfest = ref(true)
    const value1 = ref < string > ('Option1')
    const value2 = ref < string[] > (['Option1'])
    const currentShipId = ref < string > ('0001')
    // 模拟下拉框数据
    const options = [
        {
            value: '0001',
            label: '玫瑰公主号',
        },
        {
            value: '0002',
            label: '蓝精灵号',
        },
        {
            value: '0003',
            label: '泰坦尼克号',
        },
        {
            value: '0004',
            label: '海洋巡游者号',
        }
    ]
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
            width: 120
        },
        {
            prop: 'layer',
            label: '舱层',
        },
        {
            prop: 'section',
            label: '舱段',
        },
        // 贸易类型
        {
            prop: 'tradeType',
            label: '贸易类型',
        },
        // 提单号
        {
            prop: 'billNo',
            label: '提单号',
        },
        // 品牌类型
        {
            prop: 'brandType',
            label: '品牌类型',
        },
        // 唛头
        {
            prop: 'mark',
            label: '唛头',
        },
        // 数量
        {
            prop: 'num',
            label: '数量',
        },
        // 重量
        {
            prop: 'weight',
            label: '重量',
        },
        // 体积
        {
            prop: 'volume',
            label: '体积',
        },
        {
            prop: 'loadingDock',
            label: '装货码头',
        },
        {
            prop: 'dischargeDock',
            label: '卸货码头',
        },
        // 发货人
        {
            prop: 'shipName',
            label: '发货人',
        },
        // 收货人
        {
            prop: 'receiver',
            label: '收货人',
        },
        {
            prop: 'status',
            label: '货物状态',
        }
    ]

    // 表格数据
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
        const tradeTypes = ['进口', '出口', '中转']
        const brands = ['丰田', '大众', '特斯拉', '比亚迪']
        const receivers = ['上海港务集团', '青岛港物流', '天津港务局']
        return Array.from({ length: count }, (_, index) => ({
            index: index + 1,
            id: `000${index + 1}`,
            shipName: shipNames[Math.floor(Math.random() * shipNames.length)],
            layer: `A${Math.floor(Math.random() * 5) + 1}层`, // 舱层（如 A1层）
            section: `第${Math.floor(Math.random() * 10) + 1}区`, // 舱段
            tradeType: tradeTypes[Math.floor(Math.random() * tradeTypes.length)],
            billNo: `BL${Math.random().toString(36).substr(2, 8)}`, // 提单号（如 BL1a2b3c4）
            brandType: brands[Math.floor(Math.random() * brands.length)],
            mark: `MARK-${Math.floor(Math.random() * 1000)}`, // 唛头
            num: Math.floor(Math.random() * 200) + 1, // 数量（1-200）
            weight: (Math.random() * 50 + 10).toFixed(1), // 重量（10-60 吨）
            volume: (Math.random() * 30 + 5).toFixed(1), // 体积（5-35 立方米）
            loadingDock: loadingDocks[Math.floor(Math.random() * loadingDocks.length)],
            dischargeDock: dischargeDocks[Math.floor(Math.random() * dischargeDocks.length)],
            receiver: receivers[Math.floor(Math.random() * receivers.length)],
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
    const handleClickToDetail = (item) => {
        console.log('点击了', item)
        showMainfest.value = false
    }
    // 监听路由传参
    watch(
        useRoute(),
        () => {
            console.log('路由传参拿到滚装船id,显示舱单信息', JSON.parse(JSON.stringify(route.query)))
        }
    )
</script>
<template>
    <div v-if="showMainfest">
        <h1 class="flex items-center justify-center">舱单信息</h1>
        <div class="flex items-center justify-between my-20px">
            <div>
                <el-select v-model="currentShipId" style="width: 240px" readonly>
                    <template #label="{ label, value }">
                        <span>{{ label }}: </span>
                        <span style="font-weight: bold">{{ value }}</span>
                    </template>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button class="ml-10px" type="primary">查 询</el-button>
            </div>
            <div>
                <el-button type="primary" @click="ElMessage('该功能正在开发中。。。')"><el-icon class="el-icon--left"><Download /></el-icon>导出舱单</el-button>
                <el-button type="primary" @click="ElMessage('该功能正在开发中。。。')">历史舱单</el-button>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" border stripe empty-text="暂无数据" :scrollbar-always-on="true"
                :header-row-class-name="'custom-header'" show-overflow-tooltip @row-click="handleClickToDetail">
                <el-table-column class="table-column" v-for="column in columns" :key="column.prop" :prop="column.prop"
                    :label="column.label" :width="column.width || ''" header-align="center" align="center">
                </el-table-column>
            </el-table>
            <div class="mt-20px flex items-center justify-center">
                <el-pagination background layout="prev, pager, next" :total="totalData.length"
                    :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
            </div>
        </div>
    </div>
    <MainfestDetail v-else ref="MainfestDetailRef" />
</template>
<style lang="scss" scoped>
    .el-table {
        cursor: pointer;
    }

    .table {
        overflow-y: scroll;
    }

    .custom-header {
        color: #333;
        font-weight: bolder;
    }
</style>