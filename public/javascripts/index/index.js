//收藏网站
function showBookmarkAlert() {
    var alert = document.getElementById('bookmarkAlert');
    alert.style.display = 'block';
    setTimeout(function () {
        alert.style.display = 'none';
    }, 3000);
}


// allgoods弹出菜单的交互

document.addEventListener('DOMContentLoaded', function () {
    const allGoodsNavigation = document.querySelector('.allGoodsNavigation');
    const popover = document.getElementById('popover');

    allGoodsNavigation.addEventListener('mouseenter', function () {
        popover.style.display = 'block';
    });

    allGoodsNavigation.addEventListener('mouseleave', function () {
        setTimeout(() => {
            if (!popover.matches(':hover')) {
                popover.style.display = 'none';
            }
        }, 200); // 延迟100毫秒，确保鼠标已经离开popover
    });

    popover.addEventListener('mouseenter', function () {
        popover.style.display = 'block';
    });

    popover.addEventListener('mouseleave', function () {
        popover.style.display = 'none';
    });
});

// 关注我们
document.addEventListener('DOMContentLoaded', function () {
    const followUs = document.querySelector('.follow-us');
    const qrCode = document.querySelector('.qr-code');

    followUs.addEventListener('mouseenter', function () {
        qrCode.style.display = 'block';
    });

    followUs.addEventListener('mouseleave', function () {
        qrCode.style.display = 'none';
    });

    qrCode.addEventListener('mouseenter', function () {
        qrCode.style.display = 'block';
    });

    qrCode.addEventListener('mouseleave', function () {
        qrCode.style.display = 'none';
    });
});

//登录注册
// 获取模态窗口
var modal = document.getElementById("loginModal");

// 获取打开模态窗口的链接
var loginLink = document.querySelector('.iconshaking.iconfont.icon-denglu');

// 获取关闭按钮
var closeBtn = document.getElementById("closeModal");

// 点击登录/注册链接时显示模态窗口
loginLink.addEventListener('click', function (event) {
    event.preventDefault(); // 阻止默认链接行为
    modal.style.display = "block"; // 显示模态窗口
});

// 点击关闭按钮时关闭模态窗口
closeBtn.addEventListener('click', function () {
    modal.style.display = "none"; // 隐藏模态窗口
});

// 点击窗口外部时关闭模态窗口
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; // 隐藏模态窗口
    }
};


// 切换标签函数
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; // 隐藏所有标签内容
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", ""); // 移除激活状态
    }
    document.getElementById(tabName).style.display = "block"; // 显示当前标签内容
    evt.currentTarget.className += " active"; // 添加激活状态
}





// 眼睛点击切换密码显示
// 登录部分
var loginEye = document.getElementById('loginIcon');
var loginPwd = document.getElementById('password');
var loginFlag = 0;

loginEye.onclick = function () {
    if (loginFlag === 0) {
        loginPwd.type = 'text';
        loginEye.className = 'iconfont icon-yanjing-kai';
        loginFlag = 1;
    } else {
        loginPwd.type = 'password';
        loginFlag = 0;
        loginEye.className = 'iconfont icon-yanjing-guan';
    }
};

// 注册部分
var registerEye = document.getElementById('registerIcon');
var registerPwd = document.getElementById('newPassword');
var registerFlag = 0;

registerEye.onclick = function () {
    if (registerFlag === 0) {
        registerPwd.type = 'text';
        registerEye.className = 'iconfont icon-yanjing-kai';
        registerFlag = 1;

    } else {
        registerPwd.type = 'password';
        registerFlag = 0;
        registerEye.className = 'iconfont icon-yanjing-guan';
    }

}

