
var express = require("express");
var router = express.Router();

const {
    User,
    Tw,
    Qd,
    Advise
} = require("../utils/model")

const {
    createToken
} = require("../utils/token")

// 员工注册  
router.post("/register", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({
        userid: body.userid
    }).then(data => {
        if (data) {
            res.json({
                code: 200,
                msg: "注册失败,员工号已存在",
                result: null,
                type: 0
            })
        } else {
            body.time = new Date();
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功,立马登录",
                    result: result,
                    type: 1
                })
            })
        }
    })
})
//登录验证
router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({
        userid: body.userid,
    }).then(result => {
        console.log(result);
        if (result) {
            if (result.password == body.password) {
                const token = createToken(result.userid);
                res.json({
                    msg: "登录成功",
                    code: 200,
                    type: 1,
                    result,
                    token   //  token 一定发送客户端 
                })
            } else {
                res.json({
                    msg: "登录失败,密码或者员工号不正确",
                    code: 200,
                    type: 0,
                    result
                })
            }
        } else {
            res.json({
                msg: "登录失败,员工号没有被注册",
                code: 200,
                type: 0,
                result
            })
        }

    })
})

// 修改个人信息 
router.post("/updateuser", (req, res) => {
    var body = req.body;
    User.findOne({
        userid: body.userid
    }).then(result => {
        if (result) {
            User.updateMany({
                userid: body.userid
            }, {
                $set: body
            }).then(result1 => {
                console.log(result1);
                res.json({
                    code: 200,
                    msg: "个人信息修改成功",
                    result1,
                    type: 1
                })
            })
        } else {
            res.json({
                code: 200,
                msg: "工号与登录号不符合",
                result,
                type: 0
            })
        }
    })

})

// 查询员工基本信息
router.post("/getusers", (req, res) => {
    var body = req.body;
    User.findOne({
        userid: body.userid
    }).then(result => {
        console.log(result);
        res.json({
            code: 200,
            msg: "获取信息成功",
            result: result,
            type: 1
        })
    })
})

// 提交每日体温 

router.post("/wendusubmit", (req, res) => {
    var body = req.body;
    body.toggle = body.tiwen > 37.4;
    console.log(body);
    Tw.insertMany(body).then(result => {
        res.json({
            msg: "每日体温登记成功",
            code: 200,
            result
        })
    })
})

// 查询体温记录
router.post("/wendu/list", (req, res) => {
    var body = req.body;
    Tw.find({
        userid: body.userid
    }).sort({ time: -1 })
        .then(result => {
            console.log(result);
            res.json({
                msg: "获取体温记录成功",
                code: 200,
                result
            })
        })
})

// 删除体温记录  参数 delId
router.post("/deltw", (req, res) => {
    var {
        deltime
    } = req.body;
    Tw.deleteMany({
        time: deltime
    }).then(result => {
        res.json({
            code: 200,
            msg: "删除成功..",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常",
            err,
            type: 0
        })
    })
});

//每日签到
router.post("/qiandao", (req, res) => {
    var body = req.body;
    console.log(body);
    Qd.insertMany(body).then(result => {
        res.json({
            msg: "每日签到成功",
            code: 200,
            result,
            type:1,
        })
    })
})
//签退
router.post("/qiantui", (req, res) => {
    var body = req.body;
    console.log(body);
    Qd.update({
        userid:body.userid,
        timeaction:body.timeaction
    },{
        $set:body
    }).then(result => {
        console.log(result);
        res.json({
            msg: "每日签退成功",
            code: 200,
            result,
            type:1,
        })
    })
})
//查询签到
router.post("/getqd", (req, res) => {
    var body = req.body;
    Qd.find({userid:body.userid}).sort({ timeaction: -1 })
        .then(result => {
            res.json({
                code: 200,
                msg: "获取居民信息成功",
                result: result,
                type: 1
            })
        })
})


// 插入 advise 
router.post("/addadvise", (req, res) => {
    var body = req.body;
    body.time = new Date().toLocaleString();
    console.log(body);
    
    Advise.insertMany(body).then(result => {
        res.json({
            code: 200,
            msg: "意见添加成功",
            result: result,
            type: 1
        })
    })
})
// 查询建议  
router.post("/getalladvise", (req, res) => {
    var body = req.body;
    Advise.find({userid:body.userid}).sort({ time: -1 })
        .then(result => {
            res.json({
                code: 200,
                msg: "获取意见成功",
                result: result,
                type: 1
            })
        })
})

//  删除 advise 
router.post("/deladvise", (req, res) => {
    var {
        delId
    } = req.body;
    Advise.deleteMany({
        _id: delId
    }).then(result => {
        res.json({
            code: 200,
            msg: "意见删除成功..",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常",
            err,
            type: 0
        })
    })
});

// 修改建议  
router.post("/updatadvise", (req, res) => {
    var {
        uid,
        values
    } = req.body;
    Advise.updateMany({
        _id: uid
    }, {
        $set: values
    }).then(result => {
        res.json({
            code: 200,
            msg: "意见信息修改成功",
            result,
            type: 1
        })
    })
})
module.exports = router;