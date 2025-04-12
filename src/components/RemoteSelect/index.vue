<template>
    <el-select v-model="selectedValues" multiple filterable remote reserve-keyword :placeholder="placeholder"
        :remote-method="handleRemoteSearch" :loading="loading" style="width: 240px">
        <el-option v-for="item in filteredOptions" :key="getItemValue(item)" :label="getItemLabel(item)"
            :value="getItemValue(item)" />
    </el-select>
</template>

<script lang="ts" setup>
    import { ref, onMounted, computed, PropType, watch } from 'vue';

    interface OptionItem {
        value: string | number;
        label: string;
    }

    const props = defineProps({
        placeholder: {
            type: String,
            default: '请选择'
        },
        remoteMethod: {
            type: Function as PropType<(query: string) => Promise<OptionItem[]>>,
            required: true
        },
        valueField: {
            type: String,
            default: 'value'
        },
        labelField: {
            type: String,
            default: 'label'
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const selectedValues = ref < string[] > ([]);
    const loading = ref(false);
    const allOptions = ref < OptionItem[] > ([]);

    // 通过计算属性动态获取显示字段
    const getItemValue = (item: any) => item[props.valueField];
    const getItemLabel = (item: any) => item[props.labelField];

    const filteredOptions = computed(() => allOptions.value);

    const handleRemoteSearch = async (query: string) => {
        if (!query) {
            allOptions.value = [];
            return;
        }
        loading.value = true;
        try {
            const results = await props.remoteMethod(query);
            allOptions.value = results;
        } finally {
            loading.value = false;
        }
    };
    watch(selectedValues, (newVal) => {
        emit('update:modelValue', newVal);
    });

    // 接收父组件的v-model绑定
    defineExpose({
        selectedValues
    });
</script>