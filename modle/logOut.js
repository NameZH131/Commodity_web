const express = require('express');
const session = require('express-session');
const router = express.Router();

// 注销函数
// const logOut = (req, res) => {
//     if (!req.session) {
//         return res.status(400).json({ error: "No session to log out" });
//     }

//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Failed to log out" });
//         }
//         return res.status(200).json({ message: "Logged out successfully" });
//     });
// };
// 定义LOGOUT路由
router.get('/', (req, res) => {
    if (!req.session) {
        console.log("No session to log out");
        return res.status(400).send("No session to log out");
    }

    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to log out");
        }
        res.redirect('/');
    });
});

// 导出路由
module.exports = router;
