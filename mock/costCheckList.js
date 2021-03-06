const list = [
    {
        id: "4028aba16a0b3c03016a0b4c52590003",
        state: "创建",
        projectName: "测试",
        projectType: "信息管线",
        startDate: "",
        applyDate: "2019-04-11 15:28:32",
        applyOperator: "系统管理员",
        applyUnit: "燃气管理处",
        projectAuditDate: "",
        projectAuditOperator: "",
        projectAuditUnit: "",
        completedDate: "",
        pipeType: "给水管线",
        owner: "自来水公司",
        road: "彩虹西路",
        width: "2",
        height: "3",
        length: "12",
        nearbyRoad: "扬子江大道",
        amount: "3",
        cabinNum: null,
        attachmentMoney: "1524",
        proportionMoney: "1245",
        fusheMoney: "1101",
        zhimaiMoney: "1450",
        payment: "否",
        totalMoney: "5338",
        galley: "彩虹西路(将军岭路~鸡鸣山路)",
        galleryRecord: null
    },{
        id: "4028aba16a0b3c03016a0b4c52590004",
        state: "创建",
        projectName: "测试",
        projectType: "信息管线",
        startDate: "",
        applyDate: "2019-04-11 15:28:32",
        applyOperator: "系统管理员",
        applyUnit: "燃气管理处",
        projectAuditDate: "",
        projectAuditOperator: "",
        projectAuditUnit: "",
        completedDate: "",
        pipeType: "燃气管线",
        owner: "燃气公司",
        road: "彩虹西路",
        width: "2",
        height: "3",
        length: "12",
        nearbyRoad: "扬子江大道",
        amount: "3",
        cabinNum: null,
        attachmentMoney: "1524",
        proportionMoney: "1245",
        fusheMoney: "1101",
        zhimaiMoney: "1450",
        payment: "否",
        totalMoney: "5338",
        galley: "彩虹西路(将军岭路~鸡鸣山路)",
        galleryRecord: null
    }
]

export default {
  // 支持值为 Object 和 Array
  'GET /api/costCheckList': list,
}