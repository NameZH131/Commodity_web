const express = require('express');
const router = express.Router();
const prisma = require('./prismaClient'); // 引入Prisma客户端实例

// 验证输入
const validateInput = (username, user_email, user_phone) => {
    // 确保输入不为空
    if (!username || !user_email || !user_phone) {
        throw new Error('所有字段都是必填项。');
    }
    // 可以添加更多的验证逻辑，正则表达式验证电子邮件和电话号码格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,13}$/;
    if (!emailRegex.test(user_email)) {
        throw new Error('无效的电子邮件格式。');
    }
    if (!phoneRegex.test(user_phone)) {
        throw new Error('无效的电话号码格式。');
    }
    return {
        username,
        user_email,
        user_phone
    };
};

// 更新用户信息的路由
router.post('/', async (req, res) => {
    if (!req.session || !req.session.user)
        return res.status(401).send('User is not authenticated.');

    const { username, user_email, user_phone } = req.body;
    const userId = req.session.user.id; // 假设你有一个用户ID存储在session中

    try {
        // 验证输入
        const validatedInput = validateInput(username, user_email, user_phone);

        // 更新数据库中的用户信息
        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
                username: validatedInput.username,
                email: validatedInput.user_email,
                phone: validatedInput.user_phone
            }
        });

        req.session.user = {
            id: userId,
            username: updatedUser.username,
            email: updatedUser.email,
            phone: updatedUser.phone
        }
        res.render('userInformationSetting', { title: '用户信息设置', message: '用户信息更新成功！', req: req, user: req.session.user });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.render('userInformationSetting', { title: '用户信息设置', message: '更新失败，请检查输入是否正确！', req: req, user: req.session.user });
    }
});

module.exports = router;
