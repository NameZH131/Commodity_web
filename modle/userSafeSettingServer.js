const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const prisma = require('./prismaClient'); // 引入Prisma客户端实例

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        // 3s后重定向
        setTimeout(() => {
            res.redirect('/index');
        }, 3000);
        res.status(401).send('User is not authenticated.');
    }
};

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.user.id;

        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            return res.render('userSafeSetting', { title: '安全设置', message: '新密码和确认密码不匹配🤑!', req: req });
        }

        // Retrieve user's current password hash from the database
        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.render('userSafeSetting', { title: '安全设置', message: '用户未找到🫠!', req: req });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        // Check if the current password is correct
        if (!passwordMatch) {
            return res.render('userSafeSetting', { title: '安全设置', message: '当前密码不正确🤨!', req: req });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password in the database
        await prisma.users.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        // Respond with success message
        res.render('userSafeSetting', { title: '安全设置', message: '密码修改成功😁!', req: req });
    } catch (error) {
        console.error('Error updating password:', error);
        res.render('userSafeSetting', { title: '安全设置', message: '丸辣服务器错误，请稍后再试😭!', req: req });
    }
});

module.exports = router;
