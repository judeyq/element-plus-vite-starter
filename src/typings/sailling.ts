// 船期table
export interface SaillingTable {
    id: number;
    shipName: string; // 船名
    loadingDock: string; // 装货码头
    dischargeDock: string; /// 卸货码头
    carNum: number; // 车数量
    planDate: string; // 计划离港日期
    actualDate: string; // 实际离港日期
    expectDate: string; // 预计到港日期
    status: '作业中' | '已靠港' | '已离港' | '有计划'; // 状态
    actions: string;
}
// el-tag类型
export const statusColorMap = {
    '待接受': 'info',   // 蓝色
    '订阅中': 'success', // 绿色
    '已关闭': 'warning', // 橙色
    '已取消': 'danger'   // 红色
  };

// 收到的订阅表头字段
export interface ReceiveColumnsTypes {
    index: number;
    dischargePort: string; // 卸货港
    dischargeDock: string; // 卸货码头
    subscribeInfo: string; // 订阅信息
    subscribeDate: string; // 订阅日期
    deadline: string; // 截止日期
    shipDateNum: string; // 已发船期
    mainfestNum:string; // 已发舱单
    mainfestDetailNum: number; 舱单明细
    status: '待接受' | '订阅中' | '已关闭' | '已取消'; // 状态
    actions: string;
}