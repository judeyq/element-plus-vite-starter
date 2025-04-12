<script lang="ts" setup>
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
</script>

<template>
<div class="table">
    <h1 class="flex items-center justify-center">积载图</h1>
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
    </div>
</div>
</template>