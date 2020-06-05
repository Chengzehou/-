import { axios } from "@/utils/index.js";

export function Changebaseuserinfor(payload) {//修改个人信息
    return {
        type: "Changebaseuserinfor",
        payload
    }
}


export async function getbaseuserinfor() {//获取个人信息
    let res = await axios.post("/react/getusers", { userid: JSON.parse(localStorage.user).userid })
    return {
        type: "getbaseuserinfor",
        payload: res.data.result
    }
}


export async function getusertiwen() {//获取体温
    let res = null
    await axios.post("/react/wendu/list", { userid: JSON.parse(localStorage.user).userid })
        .then(val => {
            val.data.result.map((item, index) => {
                item.key = index
                return item
            })
            res = val
        })

    return {
        type: "getusertiwen",
        payload: res.data.result
    }
}

function gettime() {//时间获取 格式化
    let time = new Date()
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

export async function userpostqd() {//员工提交签到
    let timenow = gettime()
    let timeaction = new Date().getTime()
    await axios.post("/react/qiandao", { userid: JSON.parse(localStorage.user).userid, timeaction: timenow })
    let newstate = {
        timenow:timenow,
        timeaction:timeaction,
        qd:true,
        qt:false
    }
    return {
        type:"userpostqd",
        payload:newstate
    }
}

export async function userpostqt({timenow,timeaction}) {//员工提交签退
        let timeout = gettime()
        let timelast = new Date().getTime()
        let hour = Math.floor((timelast - timeaction) / (1000*3600))
        let residue = (timelast - timeaction) % (1000*3600)
        let minutes = Math.floor(residue/(1000*60))
        let workhour = `${hour}小时${minutes}分钟`;

        await axios.post("/react/qiantui",{
            userid: JSON.parse(localStorage.user).userid,
            timeaction:timenow,
            timelast:timeout,
            workhour:workhour
        })
        let newstate = {
            timelast:timelast,
            qd:false,
            qt:true
        }
    return {
        type:"userpostqd",
        payload:newstate
    }
}