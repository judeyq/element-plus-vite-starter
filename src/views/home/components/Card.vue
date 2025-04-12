<script lang="ts" setup>
    defineProps({
        title: {
            type: String,
            default: '',
        },
        count: {
            type: Number,
            default: 0
        },
        subTitle: {
            type: String,
            default: ''
        },
        itemTitle: {
            type: String,
            default: ''
        },
        units: {
            type: String,
            default: ''
        },
        num: {
            type: Number,
            default: 0
        },
        series: {
            type: String,
            default: ''
        },
        online_name: {
            type: String,
            default: ''
        },
        online_num: {
            type: Number,
        },
    });
</script>

<template>
    <el-card shadow="always" class="bg-[#fefdfd]
         shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)]
          transition-shadow duration-500 hover:translate-y-[-2px]
           border border-gray-500 border-opacity-10">
        <template #header>
            <div class="text-[24px] text-[#000] font-800">{{ title }}</div>
        </template>
        <slot>{{ count }} {{ num }} {{ series }}</slot>
        <div>{{ subTitle }}</div>
        <div>{{ itemTitle }}</div>
        <div>{{ units }}</div>
        <div>{{ online_name }}</div>
        <div>{{ online_num }}</div>
    </el-card>
</template>

<style lang="scss" scoped>
    .el-card {
        border-radius: 10px;
        background-color: #eef5fe;
    }

    :deep(.el-card__body) {
        padding: 10px 20px 10px 20px !important;

        @media (max-width: 768px) {
            padding: 12px !important;
        }
    }
</style>