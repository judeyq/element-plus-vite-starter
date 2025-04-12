<script lang="ts" setup>
    import { ref } from 'vue'

    const value1 = ref('Option1')
    const value2 = ref(['Option1'])
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
        // 提单号
        {
            prop: 'billNo',
            label: '提单号',
            width: 120
        },
        {
            prop: 'brand',
            label: '品牌',
        },
        // 车型
        {
            prop: 'vehicleType',
            label: '车型',
        },
        // 车型明细
        {
            prop: 'vehicleTypeDetail',
            label: '车型明细',
        },
        // 型号
        {
            prop: 'model',
            label: '型号',
        },
        // VIN
        {
            prop: 'vin',
            label: 'VIN',
        },
        {
            prop: 'weight',
            label: '重量',
        },
        {
            prop: 'volume',
            label: '体积',
        },
        // 长 宽 高
        {
            prop: 'length',
            label: '长',
        },
        {
            prop: 'width',
            label: '宽',
        },
        {
            prop: 'height',
            label: '高',
        },
        // BA LR
        {
            prop: 'ba',
            label: 'BA',
        },
        {
            prop: 'lr',
            label: 'LR',
        },
        // 有无止损
        {
            prop: 'loss',
            label: '有无质损',
        },
        {
            prop: 'lossDesc',
            label: '质损描述',
        },
        {
            prop: 'updateDate',
            label: '更新时间',
        }
    ]
    // 表格数据
    const totalData = ref < SaillingTable[] > ([]) // 当前页显示数据
    const currentPage = ref(1) // 当前页码
    const pageSize = ref(10) // 每页显示条数
    const tableData = ref < SaillingTable[] > ([]) // 总数
    // 模拟请求后端请求接口
    const generateMockData = (count = 100): any[] => {
        const brands = ['丰田', '大众', '特斯拉', '比亚迪'];
        const vehicleTypes = ['轿车', 'SUV', 'MPV', '货车'];
        const models = ['Model 3', '途观', '汉兰达', '卡罗拉'];
        const vinPrefixes = ['VIN123', 'VIN456', 'VIN789', 'VINABC'];
        const baOptions = ['350', '400'];
        const lrOptions = ['300', '350'];
        const lossOptions = ['无质损', '有质损'];
        const updateDates = new Date().toISOString().slice(0, 19).replace('T', ' ');

        return Array.from({ length: count }, (_, index) => ({
            index: index + 1,
            billNo: `BL${Math.random().toString(36).substr(2, 8)}`, // 提单号
            brand: brands[Math.floor(Math.random() * brands.length)], // 品牌
            vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)], // 车型
            vehicleTypeDetail: `${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]} ${models[Math.floor(Math.random() * models.length)]}`, // 车型明细
            model: models[Math.floor(Math.random() * models.length)], // 型号
            vin: `${vinPrefixes[Math.floor(Math.random() * vinPrefixes.length)]}${Math.floor(Math.random() * 1e5)}`, // VIN
            weight: (Math.random() * 2 + 1.5).toFixed(1) + '吨', // 重量（1.5-3.5吨）
            volume: (Math.random() * 1.5 + 0.5).toFixed(1) + 'm³', // 体积（0.5-2m³）
            length: (Math.random() * 4 + 3).toFixed(1) + 'm', // 长（3-7米）
            width: (Math.random() * 1.5 + 1.2).toFixed(1) + 'm', // 宽（1.2-2.7米）
            height: (Math.random() * 1.8 + 1.4).toFixed(1) + 'm', // 高（1.4-3.2米）
            ba: baOptions[Math.floor(Math.random() * baOptions.length)], // BA认证
            lr: lrOptions[Math.floor(Math.random() * lrOptions.length)], // LR认证
            loss: lossOptions[Math.floor(Math.random() * lossOptions.length)], // 是否有质损
            lossDesc: lossOptions[Math.floor(Math.random() * lossOptions.length)] ? '轻微划痕' : '', // 质损描述
            updateDate: updateDates // 更新时间
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
</script>

<template>
    <div>
        <h1 class="flex items-center justify-center">舱单明细</h1>
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
                <el-select v-model="currentShipId" style="width: 240px" readonly class="ml-10px">
                    <template #label="{ label, value }">
                        <span>{{ label }}: </span>
                        <span style="font-weight: bold">{{ value }}</span>
                    </template>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button class="ml-10px" type="primary">查 询</el-button>
            </div>
            <div>
                <el-button class="ml-10px" type="primary">积载图</el-button>
                <el-button type="primary" @click="ElMessage('该功能正在开发中。。。')"><el-icon class="el-icon--left">
                        <Download />
                    </el-icon>导出明细</el-button>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" border stripe empty-text="暂无数据" :scrollbar-always-on="true"
                :header-row-class-name="'custom-header'" show-overflow-tooltip @row-click="handleClickToDetail">
                <el-table-column class="table-column" v-for="column in columns" :key="column.prop" :prop="column.prop"
                    :label="column.label" :width="column.width || ''" header-align="center" align="center">
                    <!-- <template v-if="column.isAction" #default="scope">
                        <el-button type="primary" @click="handleClickToPosition(scope.row)" link style="color: #409EFF">
                            船位跟踪
                        </el-button>
                    </template> -->
                </el-table-column>
            </el-table>
            <div class="mt-20px flex items-center justify-center">
                <el-pagination background layout="prev, pager, next" :total="totalData.length"
                    :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
            </div>
        </div>
    </div>
</template>