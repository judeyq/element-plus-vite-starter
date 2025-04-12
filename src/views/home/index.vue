<script lang="ts" setup>
  import Card from '@/views/home/components/Card.vue'
  import { ref } from 'vue'
  // 模拟后端返回数据
  const CardList = ref([
      {
          title: '船货信息',
          count: 300,
          sub_title: '新增船期:',
          item_title: '舱单信息:',
          num: 200,
          units: '条',
          series: '条'
      },
      {
          title: '泊位策划',
          count: 3,
          sub_title: '新增:',
          item_title: '待进行泊位策划',
          units: '条',
          series: ''
      },
      {
          title: '船舶策划',
          count: 4,
          sub_title: '累计:',
          item_title: '待进行泊位策划',
          units: '条',
          series: ''
      },
      {
          title: '堆场管理',
          count: 3.2,
          num: 1.6,
          sub_title: '今日收货:',
          item_title: '发货:',
          units: '万吨',
          series: '万吨'
      },
      {
          title: '码头作业',
          count: 12,
          num: 6,
          sub_title: '今日下达操作指令:',
          item_title: '完成',
          units: '条',
          series: '条'
      },
      {
          title: '在港船舶',
          count: 12,
          num: 30,
          sub_title: '本月累计艘次:',
          item_title: '年度累计艘次',
          units: '艘',
          series: '艘',
          online_name: '在港船舶',
          online_num: 12,
          online_units: '艘'
      },
      {
          title: '在港货物',
          count: 12,
          num: 30,
          sub_title: '本月累计货运量:',
          item_title: '年度累计货运量:',
          units: '万吨',
          series: '万吨',
          online_name: '在港货物',
          online_num: 12,
          online_units: '万吨'
      }
  ])
  const getUnits = (title) => {
      return title.includes('船舶') ? '艘' : '万吨'
  }
</script>
<template>
  <div class="grid grid-cols-3  gap-4 mx-auto my-auto">
      <div v-for="item in CardList" :key="item.title">
          <Card :title="item.title">
              <div class="">{{ item.online_name }} <span class="text-[32px] text-[#367baf] font-800 mr-2">{{ item.online_num
                      }}</span>{{ item.online_units }}</div>
              <div class="flex flex-nowrap items-center justify-start mt-20px">
                  <div>{{ item.sub_title }}<span class="text-[32px] text-[#367baf] font-800 ml-2">{{ item.count
                          }}</span> {{ item.units }}, </div>
                  <div>{{ item.item_title }}<span class="text-[32px] text-[#367baf] font-800 ml-2">{{
                          item.num }}</span> {{ item.series }}</div>
              </div>
          </Card>
      </div>
  </div>
</template>

<style scoped lang="scss">
/* 样式 */
.home-container {
  display: flex;
  flex-direction: column; /* 设置基准线为上下方向 */
  justify-content: center;
}
</style>
