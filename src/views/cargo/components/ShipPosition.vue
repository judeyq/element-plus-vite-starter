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

    const currentShipId = ref('')
    const getShipId = (id) => {
        currentShipId.value = id;
        console.log(currentShipId.value);
    };
    // 暴露方法给父组件
    defineExpose({
        getShipId
    });
</script>
<template>
    <div class="table">
        <h2 class="flex items-center justify-center">船位跟踪</h2>
        <div class="flex items-center justify-start">
            <el-select v-model="currentShipId" style="width: 240px" readonly>
                <template #label="{ label, value }">
                    <span>{{ label }}: </span>
                    <span style="font-weight: bold">{{ value }}</span>
                </template>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="ml-10px" type="primary">查 询</el-button>
            <div class="flex items-end ml-10px pt-10px text-[12px] color-#666">查询仅限于用户近期的有效船期表中的船舶数据。</div>
        </div>
        <div class="bg-#eef5fe w-full mt-10px h-[calc(100vh_-_220px)]">我是船位跟踪地图</div>
    </div>

</template>