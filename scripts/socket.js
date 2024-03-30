import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { infos } from "./info.js";
var db = {
    users: '',
    all_posts: '',
    chatbox: '',
    generalCol: '',
    hsh_pwd: '',
    reports: '',
    subscriptions: '',
    subs_returns: '',
    transactions: '',
    author_earnings: '',
    account_no: '',
    engage: '',
};
var db_f = 'n';

// post date application
var date = new Date();
var year = date.getFullYear();
var day = date.getDate();
var month = date.getMonth();
var hour = date.getHours();
var minute = date.getMinutes();
var secnds = date.getSeconds();
if (month === 0) { month = 'January' }
if (month === 1) { month = 'Febuary' }
if (month === 2) { month = 'March' }
if (month === 3) { month = 'April' }
if (month === 4) { month = 'May' }
if (month === 5) { month = 'June' }
if (month === 6) { month = 'July' }
if (month === 7) { month = 'August' }
if (month === 8) { month = 'September' }
if (month === 9) { month = 'October' }
if (month === 10) { month = 'November' }
if (month === 11) { month = 'December' }


const checkInfos = () => {
    assignDb();
    var targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() + 2);
    var countDownDate = targetDate.getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        if (distance < 0) {
            infos();
            clearInterval(x);
        }
    }, 1000);
}
async function postData(data) {
    // push notifications
    // add/rem like && coms contents to noti
    async function jrnNoti(data, udata, act, dateNow) {
        const refJrNo = () => {
            assignDb();
            setTimeout(() => {
                $('#opnHme, #clsWrt').click();
                global.page_ld_stt = 'off';
            }, 2500);
        }
        if (act !== '' && data.user !== udata) {
            try {
                const response = await fetch(`https://test-vyral.onrender.com/getUsers`);
                const users = await response.json();
                if (users.length > 0) {
                    for (let i = 0; i < users.length; i++) {
                        if (data.user == users[i]._id) {
                            sendUser(users[i])
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
            async function sendUser(user) {
                var settings = {
                    method: 'post',
                    body: JSON.stringify({ user: user._id  }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/sendNotiUser`, settings);
                    const dn = await response.json();
                    pusherNot();
                } catch (error) {
                    console.log(error);
                }
            };
            async function pusherNot() {
                // LIKES
                // add like
                if (act == 'like') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'like_post',
                            post: data._id,
                            date: dateNow
                        }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                        const dn = await response.json();
                        refJrNo();
                    } catch (error) {
                        console.log(error);
                    }
                }
                // remove lie
                if (act == 'unlike') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'like_post',
                            post: data._id,
                            date: dateNow
                        }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/remNoti`, settings);
                        const dn = await response.json();
                        refJrNo();
                    } catch (error) {
                        console.log(error);
                    }
                }

                // COMMENTS
                // add comment
                if (act == 'coment') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'comment_post',
                            post: data._id,
                            date: dateNow
                        }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                        const dn = await response.json();
                        refJrNo();
                    } catch (error) {
                        console.log(error);
                    }
                }
                // remove comment
                if (act == 'del-coment') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'comment_post',
                            post: data._id,
                            date: dateNow
                        }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/remNoti`, settings);
                        const dn = await response.json();
                        refJrNo();
                    } catch (error) {
                        console.log(error);
                    }
                }

                // TAG
                if (act == 'tag') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'tag_post',
                            post: data._id,
                            date: dateNow
                        }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                        const dn = await response.json();
                        refJrNo();
                    } catch (error) {
                        console.log(error);
                    }
                    
                }

            };

        }

    };
    // add/rem like && coms contents to noti
    async function strNoti(data, udata, act, dateNow) {
        if (act !== '' && data.user !== udata) {
            try {
                const response = await fetch(`https://test-vyral.onrender.com/getUsers`);
                const users = await response.json();
                if (users.length > 0) {
                    for (let i = 0; i < users.length; i++) {
                        if (data.user == users[i]._id) {
                            sendUser(users[i])
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

            async function sendUser(user) {
                var settings = {
                    method: 'post',
                    body: JSON.stringify({ user: user._id  }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/sendNotiUser`, settings);
                    const dn = await response.json();
                    pusherNot();
                } catch (error) {
                    console.log(error);
                }
            };
            async function pusherNot() {
                // LIKES
                // add like
                if (act == 'like') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'like_str',
                            post: data._id,
                            date: dateNow
                         }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                        const dn = await response.json();
                        assignDb();
                    } catch (error) {
                        console.log(error);
                    }
                }
                // remove lie
                if (act == 'unlike') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'like_str',
                            post: data._id,
                         }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/remNoti`, settings);
                        const dn = await response.json();
                        assignDb();
                    } catch (error) {
                        console.log(error);
                    }
                }

                // COMMENTS
                // add comment
                if (act == 'comment_str') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'comment_str',
                            post: data._id,
                            date: dateNow
                         }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                        const dn = await response.json();
                    } catch (error) {
                        console.log(error);
                    }
                }
                // remove comment
                if (act == 'del-coment') {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ 
                            user: udata,
                            noti_type: 'comment_str',
                            post: data._id,
                            date: dateNow
                         }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/remNoti`, settings);
                        const dn = await response.json();
                    } catch (error) {
                        console.log(error);
                    }
                }

            };

        }

    };
    // reg
    if (data.section == 'register') {
        if (data.type == 'ver_mail') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ email: data.mail, subject: 'threadal Signup Email verification' }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/mailer/verifyMail`, settings);
                const verd = await response.json();
                if (verd == 'sent') {
                    global.mail_v_s = 'y';
                    try {
                        const response2 = await fetch(`https://test-vyral.onrender.com/mailer/mobile_MVC`);
                        const code = await response2.json();
                        global.mVer_c = code;
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    alert('error sending email');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    // forgot
    if (data.section == 'forgot-password') {
        if (data.type == 'ver_mail') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ email: data.mail, subject: 'threadal Signup Email verification' }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/mailer/verifyMail`, settings);
                const verd = await response.json();
                if (verd == 'sent') {
                    global.mail_v_s = 'y';
                    try {
                        const response2 = await fetch(`https://test-vyral.onrender.com/mailer/mobile_MVC`);
                        const code = await response2.json();
                        global.fp_verC = code;
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    alert('error sending email');
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'change_pwd') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ pwd: data.pass.pwd, gen: data.pass.gen, glb: data.pass.glb, user: data.pass.user }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/log/updatePwdMobile`, settings);
                const dn = await response.json();
                location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }
    // settings
    if (data.section == 'settings') {
        if (data.type == 'set') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.user, set: data.set }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/mobile/setSet`, settings);
                const dn = await response.json();
                // location.reload();
                assignDb();
                setTimeout(() => {
                    $('#opnPrf').click();
                }, 3000);
            } catch (error) {
                console.log(error);
                location.reload();
            }
        }
        if (data.type == 'dark') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.user, set: data.set }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/mobile/setSet`, settings);
                const dn = await response.json();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'prof_pic') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.id, prfp: data.prfp }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/profilePicMobile`, settings);
                const dn = await response.json();
                assignDb();
                $('#chngppicalrt').fadeOut(250);
                $('#clsSetngs-alrt').click();
                var test = global.img_hangLen;
                for (let i = 0; i < test; i++) {
                    $(`imgHangerFltrd-prfp${i}`).remove();
                }
                global.img_hangLen = 0;
                $('.allImgs_app, .mainCloneImgs').remove();
                setTimeout(() => {
                    $('#opnPrf').click();
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'usr_aut_str') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.id, avail: data.cats }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/setUsrtpMobile`, settings);
                const dn = await response.json();
                var settings2 = { method: 'post', body: JSON.stringify({ id: data.id, publicity: 'public' }), headers: { "Content-type" : "application/json; charset=utf-8" } }
                try {
                    const response2 = await fetch(`https://test-vyral.onrender.com/settings/changePrivMobile`, settings2);
                    const dn2 = await response2.json();
                    $('#reg-pub-con').css('display', 'none');
                    $('#pub-cong').fadeIn();
                    assignDb();
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'usr_aut_str_upd') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.id, user_type: data.update }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/setUsrtpMobileIUp`, settings);
                const dn = await response.json();
                var settings2 = { method: 'post', body: JSON.stringify({ id: data.id, publicity: 'public' }), headers: { "Content-type" : "application/json; charset=utf-8" } }
                try {
                    const response2 = await fetch(`https://test-vyral.onrender.com/settings/changePrivMobile`, settings2);
                    const dn2 = await response2.json();
                    assignDb();
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'privacy') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.id, publicity: data.publicity }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/changePrivMobile`, settings);
                const dn = await response.json();
                alert(`Your profile is set to ${data.publicity} account!`);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'block') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ user: data.user, me: data.me }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/blockMob`, settings);
                const dn = await response.json();
                assignDb();
                $(`#${data.con}`).slideUp(100);
                $('#alertText').text('blocked user');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'un_block') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ user: data.user, me: data.me }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/unBlockMob`, settings);
                const dn = await response.json();
                assignDb();
                $(`#${data.con}`).slideUp(100);
                $('#alertText').text('Un-blocked user');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'add_acc') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ 
                    user: data.user,
                    number: data.number,
                    name: data.name,
                    bank: data.bank,
                 }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/insertAcc`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'rem_acc') {
            var settings = {
                method: 'delete'
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/settings/deleteAcc/${data.id}`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
    }
    // journals
    if (data.section == 'journals') {
        if (data.type == 'tagged') {
            var dateNow = [year, day, month, hour, minute, secnds];
            jrnNoti(data.post, data.user, data.act, dateNow);
        }
        if (data.type == 'like') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ likedBy: {user: data.user, date: [year, day, month, hour, minute, secnds]} }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                if (data.post.type == 'User' && data.post.user !== data.user) {
                    jrnNoti(data.post, data.user, data.act, dateNow);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'unlike') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ likedBy: {user: data.user} }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/unlike/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                    if (data.post.type == 'User' && data.post.user !== data.user) {
                        jrnNoti(data.post, data.user, data.act, dateNow);
                    }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'comment') {
            var mth = Math.random();var strn = mth.toString();var dif = strn.slice(2, mth.length);
            var settings = {
                method: 'put',
                body: JSON.stringify({ user: data.user, comment: data.comment, date: [year, day, month, hour, minute, secnds], id: dif }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/comment/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                    if (data.post.type == 'User' && data.post.user !== data.user) {
                        jrnNoti(data.post, data.user, data.act, dateNow);
                    }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_comment') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ comments: data.comment }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/remComment/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                if (data.post.type == 'User' && data.post.user !== data.user) {
                    jrnNoti(data.post, data.user, data.act, dateNow);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'tag_jrn') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ user: data.user }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/notifications/sendNotiUser`, settings);
                const dn = await response.json();
                tag();
            } catch (error) {
                console.log(error);
            }

            async function tag() {
                
                // TAG
                var settings = {
                    method: 'put',
                    body: JSON.stringify({ 
                        user: data.me,
                        noti_type: 'shr_post',
                        post: data.post,
                        date: [year, day, month, hour, minute, secnds]
                     }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                    const dn = await response.json();
                } catch (error) {
                    console.log(error);
                }
                
            };
        }
        if (data.type == 'readBy') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ user: data.user, date: [year, day, month, hour, minute, secnds] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/AddReadBy/${data.id}`, settings);
                const dn = await response.json();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'report') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ content: data.con, type: 'Journal', from: data.user, by: data.name, journal: data.post, date: [year, day, month, hour, minute] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/reportJrn`, settings);
                const dn = await response.json();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'hide') {
            global.page_ld = 'y';
            var settings = {
                method : "put",
                headers : {
                    "Content-type" : "application/json; charset=utf-8"
                },
                body : JSON.stringify({ hidden: data.hide })
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/hide/${data.post}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.page_ld_stt = 'off';
                    $('#opnHme').click();
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'delete') {
            global.page_ld = 'y';
            var settings = {
                method: 'delete'
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/delete/${data.post}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.page_ld_stt = 'off';
                    $('#opnHme').click();
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'edit') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ heading: data.heading, body: data.body, img: data.img, vid: data.vid }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/updateJrn/${data.post}`, settings);
                const dn = await response.json();
                $(`.doneEdtThr`).remove();
                    assignDb();
                    setTimeout(() => {
                        global.page_ld_stt = 'off';
                        $('#opnHme').click();
                    }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'edit_bk') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ title: data.title }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/updateBk/${data.post}`, settings);
                const dn = await response.json();
                assignDb();
                    setTimeout(() => {
                        global.page_ld_stt = 'off';
                        $('#opnHme').click();
                    }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
    }
    // strings + thr
    if (data.section == 'str_thr') {
        if (data.type == 'like_thr') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ likedBy: {user: data.user, date: [year, day, month, hour, minute, secnds]} }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                strNoti(data.post, data.user, data.act, dateNow);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'unlike_thr') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ likedBy: {user: data.user} }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/unlike/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                strNoti(data.post, data.user, data.act, dateNow);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'comment') {
            var mth = Math.random();var strn = mth.toString();var dif = strn.slice(2, mth.length);
            var settings = {
                method: 'put',
                body: JSON.stringify({  user: data.user, comment: data.comment, date: [year, day, month, hour, minute, secnds], id: dif }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/comment/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                strNoti(data.post, data.user, data.act, dateNow);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_comment') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ comments: data.comment }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/remComment/${data.id}`, settings);
                const dn = await response.json();
                var dateNow = [year, day, month, hour, minute, secnds];
                strNoti(data.post, data.user, data.act, dateNow);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'shr_str_thr') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ user: data.user }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/notifications/sendNotiUser`, settings);
                const dn = await response.json();
                tag();
            } catch (error) {
                console.log(error);
            }

            async function tag() {
                // TAG
                var settings = {
                    method: 'put',
                    body: JSON.stringify({ 
                        user: data.me,
                        noti_type: data.act,
                        post: data.post,
                        date: [year, day, month, hour, minute, secnds]
                     }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                    const dn = await response.json();
                    assignDb();
                } catch (error) {
                    console.log(error);
                }
            };
        }
        if (data.type == 'updt_thr') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ head: data.head }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/updateThr/${data.id}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.page_ld_stt = 'off';
                    $('#opnHme').click();
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'report_thr') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ content: data.con, type: 'Thread', from: data.user, by: data.name, thread: data.post, date: [year, day, month, hour, minute] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/reportJrn`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'report_str') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ content: data.con, type: 'String', from: data.user, by: data.name, string: data.post, date: [year, day, month, hour, minute] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/reportJrn`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_thr') {
            global.page_ld = 'y';
            var settings = {
                method: 'delete',
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/deleteThr/${data.id}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.page_ld_stt = 'off';
                    $('#opnHme').click();
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_str') {
            global.page_ld = 'y';
            var settings = {
                method: 'delete',
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/deleteStr/${data.id}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.page_ld_stt = 'off';
                    $('#opnHme').click();
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'updt_str') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ head: data.head, body: data.body }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/updateStr/${data.id}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.page_ld_stt = 'off';
                    $('#opnHme').click();
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
    }
    // chats
    if (data.section == 'chat') {
        if (data.type == 'add_chat') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ uone: {user: data.chat.mainUser._id, situ: 'unblocked', mute: 'off', rec_seen: 'yes', sen_seen: 'yes'}, utwo: {user: data.chat.exdata, situ: 'unblocked', mute: 'off', rec_seen: 'yes', sen_seen: 'yes'}, messages: [] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/addChat`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'send_m') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ id: data.chat.id, uone:  data.chat.uone, utwo: data.chat.utwo, mess: data.chat.mess }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/addMessage`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_m') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ messages: data.messages }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/delMessage/${data.id}`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'rec_seen') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.id, uone: data.uone, utwo: data.utwo, user: data.user }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/rec_seen_m`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_chat') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ chats: data.rem }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/pull/${data.me}`, settings);
                const dn = await response.json();
                var settings2 = { method: 'delete' }
                try {
                    const response2 = await fetch(`https://test-vyral.onrender.com/chats/delete/${data.id}`, settings2);
                    const dn2 = await response2.json();
                    assignDb();
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'del_cnct') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ chats: data.rem }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/pull/${data.me}`, settings);
                const dn = await response.json();
                    assignDb();
                } catch (error) {
                console.log(error);
            }
        }
    }
    // noti
    if (data.section == 'noti') {
        if (data.type == 'rem_new') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ noti: data.noti, id: data.id }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/mobile/cleanNewNoti`, settings);
                const dn = await response.json();
                assignDb();
                $('#notiNot').text('');
                $('#notiIcn').attr('src', 'assets/imgs/notis.png');
                //$('#openNotilg, #notifOpener').attr('src', 'assets/imgs/notis.png');
                $('.notiCont').remove();
                setTimeout(() => {
                    global.noti_r = 'y';
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'rem_wait') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ user: data.user, me: data.me }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/notifications/remWaitingMob`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    global.noti_r = 'y';
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }
        // action btns
        if (data.type == 'action_btns') {
            async function checkIf(data, moment, followId, unFollowId, mainUser) {
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/getUsers`);
                    const users = await response.json();
                    if (users.length > 0) {
                        for (let i = 0; i < users.length; i++) {
                            if (data.user == users[i]._id) {
                                search(users[i])
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                
                const search = (user) => {
                    if (user.notifications.length > 0) {
                        var check = 'none';
                        for (let z = 0; z < user.notifications.length; z++) {
                            if (user.notifications[z].noti_type == 'follow' && user.notifications[z].user == mainUser._id) {
                                check = 'found';
                                if (moment == 'flw') {
                                    remNoti(user);
                                    addNoti();
                                }
                                if (moment == 'unflw') {
                                    remNoti(user);
                                }
                            }
                        }
                        if (check == 'none' && moment == 'flw') {
                            addNoti();
                        }
                        if (check == 'none' && moment == 'unflw') {
                            remNoti(user);
                        }
                    }else {
                        if (moment == 'flw') {
                            addNoti();
                        }
                        if (moment == 'unflw') {
                            remNoti(user);
                        }
                    }
                };
                async function addNoti() {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ ex: data.user, noti: {user: mainUser._id, noti_type: 'follow', date: [year, day, month, hour, minute, secnds]} }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/addNotiMob`, settings);
                        const dn = await response.json();
                        checkUiChange();
                    } catch (error) {
                        console.log(error);
                    }
                };
                async function remNoti(user) {
                    var settings = {
                        method: 'put',
                        body: JSON.stringify({ eex: data.user, noti: {user: mainUser._id, noti_type: 'follow'} }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/remNotiMob`, settings);
                        const dn = await response.json();
                        checkUiChange();
                    } catch (error) {
                        console.log(error);
                    }
                };
                const checkUiChange = () => {
                    if (moment == 'flw') {
                        $(`#${followId}`).css('display', 'none');
                        $(`#${unFollowId}`).css('display', 'inline');
                    }else {
                        $(`#${unFollowId}`).css('display', 'none');
                        $(`#${followId}`).css('display', 'inline');
                    }
                };
                
            };
            var reqB = data.reqBV; var reqD = data.repDV; var followId = data.followId; var unFollowId = data.unFollowId; var mainUser = data.udata;
            if (data.sub == 'follow') {
                if (reqD == 'n') {
                    var settings = {
                        method: 'post',
                        body: JSON.stringify({ me: mainUser._id, following: {user: data.user} }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/notifications/followBackMob`, settings);
                        const dn = await response.json();
                        var moment = 'flw';
                        checkIf(data, moment, followId, unFollowId, mainUser);
                        assignDb();
                        setTimeout(() => {
                            global.noti_r = 'y';
                        }, 2000);
                    } catch (error) {
                        console.log(error);
                    }
                }
                if (reqD == 'y') {
                    if (reqB == 'y') {
                        var settings = {
                            method: 'put',
                            body: JSON.stringify({ user: mainUser._id, to: data.user }),
                            headers: { "Content-type" : "application/json; charset=utf-8" }
                        }
                        try {
                            const response = await fetch(`https://test-vyral.onrender.com/notifications/RemReq`, settings);
                            const dn = await response.json();
                            var settings2 = {
                                method: 'put',
                                body: JSON.stringify({ send: {user: mainUser._id, noti_type: 'frnd_rq'}, to: data.user }),
                                headers: { "Content-type" : "application/json; charset=utf-8" }
                            }
                            try {
                                const response2 = await fetch(`https://test-vyral.onrender.com/notifications/RemReqNoti`, settings2);
                                const dn2 = await response2.json();
                                assignDb();
                                setTimeout(() => {
                                    global.noti_r = 'y';
                                }, 2000);
                            } catch (error) {
                                console.log(error);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }else {
                        var settings = {
                            method: 'put',
                            body: JSON.stringify({ user: mainUser._id, to: data.user }),
                            headers: { "Content-type" : "application/json; charset=utf-8" }
                        }
                        try {
                            const response = await fetch(`https://test-vyral.onrender.com/notifications/AddReq`, settings);
                            const dn = await response.json();
                            var settings2 = {
                                method: 'put',
                                body: JSON.stringify({ send: {user: mainUser._id, noti_type: 'frnd_rq', date: [year, day, month, hour, minute, secnds]}, to: data.user }),
                                headers: { "Content-type" : "application/json; charset=utf-8" }
                            }
                            try {
                                const response2 = await fetch(`https://test-vyral.onrender.com/notifications/AddReqNoti`, settings2);
                                const dn2 = await response2.json();
                                assignDb();
                                setTimeout(() => {
                                    global.noti_r = 'y';
                                }, 2000);
                            } catch (error) {
                                console.log(error);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            } else {
                var settings = {
                    method: 'post',
                    body: JSON.stringify({ me: mainUser._id, following: {user: data.user} }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/unFollowMob`, settings);
                    const dn = await response.json();
                    var moment = 'unflw';
                    checkIf(data, moment, followId, unFollowId, mainUser);
                    assignDb();
                    setTimeout(() => {
                        global.noti_r = 'y';
                    }, 1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    // creator
    if (data.section == 'creator') {
        async function pushThrPb(thread) {
            var settings = {
                method: 'post',
                body: JSON.stringify({ type: thread.type, content_type: 'thread', tied_to: thread.tied_to, user: thread.user, head: thread.head, act: thread.act, img: thread.img, vid: thread.vid, date: [year, day, month, hour, minute], comments: [], likedBy: [] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/publicTie`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    $('#opnHme, #clsWrt').click();
                    global.page_ld_stt = 'off';
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        async function pushThrPr(thread) {
            var settings = {
                method: 'post',
                body: JSON.stringify({ type: thread.type, content_type: 'thread', tied_to: thread.tied_to, user: thread.user, head: thread.head, act: thread.act, img: thread.img, vid: thread.vid, date: [year, day, month, hour, minute], comments: [], likedBy: [] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/privateTie`, settings);
                const dataId = await response.json();
                if (data.tied.length > 0) {
                    for (let i = 0; i < data.tied.length; i++) {
                        var dateNow = [year, day, month, hour, minute, secnds];
                        var act = 'tie';
                        var dat = {_id: dataId, user: data.tied[i]};
                        tieNoti(dat, data.user, act, dateNow);
                    }
                } else {
                    assignDb();
                    setTimeout(() => {
                        $('#opnHme, #clsWrt').click();
                        global.page_ld_stt = 'off';
                    }, 2500);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function tieNoti(strdata, udata, act, dateNow) {
            try {
                const response = await fetch(`https://test-vyral.onrender.com/getUsers`);
                const users = await response.json();
                if (users.length > 0) {
                    for (let i = 0; i < users.length; i++) {
                        if (strdata.user == users[i]._id) {
                            sendUser(users[i]);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

            async function sendUser(user) {
                var settings = {
                    method: 'post',
                    body: JSON.stringify({ user: user._id }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/sendNotiUser`, settings);
                    const dn = await response.json();
                    pusherNot();
                } catch (error) {
                    console.log(error);
                }
            };
            async function pusherNot() {
                var settings = {
                    method: 'put',
                    body: JSON.stringify({ 
                        user: udata._id,
                        noti_type: 'tie_string',
                        string: strdata._id,
                        date: dateNow
                     }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/notifications/addNoti`, settings);
                    const dn = await response.json();
                    assignDb();
                    setTimeout(() => {
                        $('#opnHme, #clsWrt').click();
                        global.page_ld_stt = 'off';
                    }, 2500);
                } catch (error) {
                    console.log(error);
                }
                // Tie
                //alert(data);
            }
        }
        if (data.type == 'crt_thr') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ add: data.add }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/${data.tie}`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    $('#opnHme, #clsWrt').click();
                    global.page_ld_stt = 'off';
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'crt_jrn') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ postId: data.pass.postId, type: data.pass.type, user: data.pass.user, heading: data.pass.heading, img: data.pass.img, vid: data.pass.vid, date: data.pass.date, body: data.pass.body, comments: [], likedBy: [], reads: [], hidden: 'No', tagged: data.pass.tagged, reads: [] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/addPostImg`, settings);
                const ret = await response.json();
                if (ret) {
                    if (data.tags.length > 0) {
                        for (let i = 0; i < data.tags.length; i++) {
                            var dat = {_id: ret._id, user: data.tags[i]};
                            //alert(dat._id + ', user: '+dat.user);
                            var dateNow = [year, day, month, hour, minute, secnds];
                            jrnNoti(dat, data.user._id, 'tag', dateNow);
                        }
                    } else {
                        // location.reload();
                        assignDb();
                        setTimeout(() => {
                            global.page_ld_stt = 'off';
                            $('#opnHme, #clsWrt').click();
                        }, 2500);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'crt_pub_str') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ type: 'Public', content_type: 'string', user: data.user._id, name: data.name, date: [year, day, month, hour, minute] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/addPublic`, settings);
                const dataId = await response.json();
                if (data.thread !== 'none') {
                    data.thread.tied_to = dataId;
                    pushThrPb(data.thread);
                } else {
                    assignDb();
                    setTimeout(() => {
                        $('#opnHme, #clsWrt').click();
                        global.page_ld_stt = 'off';
                    }, 2500);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'crt_pub_str_old') {
            global.page_ld = 'y';
            pushThrPb(data.thread);
        };
        if (data.type == 'crt_prv_str') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ type: 'Private', content_type: 'string', user: data.user._id, head: data.head, body: data.body, tied: data.tied, date: [year, day, month, hour, minute] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/strings/addPrivate`, settings);
                const dataId = await response.json();
                if (data.thread !== 'none') {
                    data.thread.tied_to = dataId;
                    pushThrPr(data.thread);
                } else {
                    if (data.tied.length > 0) {
                        for (let i = 0; i < data.tied.length; i++) {
                            var dateNow = [year, day, month, hour, minute, secnds];
                            var act = 'tie';
                            var dat = {_id: dataId, user: data.tied[i]};
                            tieNoti(dat, data.user, act, dateNow);
                        }
                    } else {
                        assignDb();
                        setTimeout(() => {
                            $('#opnHme, #clsWrt').click();
                            global.page_ld_stt = 'off';
                        }, 2500);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'crt_book') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ postId: data.pass.postId, content_type: 'usr_aut_book', type: 'User_author', user: data.user, title: data.pass.title, cover: data.pass.cover, date: [year, day, month, hour, minute], chapters: data.pass.chapters, read_me: data.pass.read_me }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/uauthor/addBook`, settings);
                const dn = await response.json();
                assignDb();
                setTimeout(() => {
                    $('#opnHme, #clsWrt').click();
                    global.page_ld_stt = 'off';
                }, 2500);
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'crt_aut_jrn') {
            global.page_ld = 'y';
            var settings = {
                method: 'post',
                body: JSON.stringify({ body: data.body }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/uauthor/addJournal`, settings);
                const dn = await response.json();
                if (dn) {
                    assignDb();
                    setTimeout(() => {
                        $('#opnHme, #clsWrt').click();
                        global.page_ld_stt = 'off';
                    }, 2500);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    // ex user
    if (data.section == 'ex_user') {
        const idExFunc = (ex) => {
            setTimeout(() => {
                global.page_ld_stt = 'off';
                setTimeout(() => {
                    $('.ex-slider').remove();
                    global.ex_user = ex;
                    global.ex_flag = 'y';
                }, 50);
            }, 500);
        }
        if (data.type == 'follow') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ id: data.id, following: data.following, ex: data.ex }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/extractEx/FollowUserMob`, settings);
                const dn = await response.json();
                if (dn) {
                    var settings2 = {
                        method: 'put',
                        body: JSON.stringify({ ex: data.ex, noti: data.noti }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response2 = await fetch(`https://test-vyral.onrender.com/extractEx/FolToNotiMob`, settings2);
                        const dn2 = await response2.json();
                        if (dn2) {
                            assignDb();
                            if (!data.subtype) {
                                idExFunc();
                                $('#UnfollowUser').css('display', 'block');
                                $('#UnfollowUser2').css('display', 'block');
                                $('#followExUser').css('display', 'none');
                                $('#followExUser2').css('display', 'none');
                            }
                        }
                    } catch (error2) {
                        alert(error2);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } 
        if (data.type == 'unfollow') {
            var settings = {
                method: 'put',
                body: JSON.stringify({ id: data.id, following: data.following, ex: data.ex }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/extractEx/UnFollowMob`, settings);
                const dn = await response.json();
                if (dn) {
                    var settings2 = {
                        method: 'put',
                        body: JSON.stringify({ ex: data.ex, noti: data.noti }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response2 = await fetch(`https://test-vyral.onrender.com/extractEx/UnFolToNotiMob`, settings2);
                        const dn2 = await response2.json();
                        if (dn2) {
                            assignDb();
                            if (!data.subtype) {
                                $('#UnfollowUser').css('display', 'none');
                                $('#UnfollowUser2').css('display', 'none');
                                $('#followExUser').css('display', 'block');
                                $('#followExUser2').css('display', 'block');
                            }
                        }
                    } catch (error2) {
                        alert(error2);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'add_req') {
            global.page_ld = 'y';
            var settings = {
                method: 'put',
                body: JSON.stringify({ id: data.id, wait: data.wait, ex: data.ex }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/extractEx/AddReqMob`, settings);
                const dn = await response.json();
                if (dn) {
                    var settings2 = {
                        method: 'put',
                        body: JSON.stringify({ ex: data.ex, noti: data.noti }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response2 = await fetch(`https://test-vyral.onrender.com/extractEx/AddReqNotiMob`, settings2);
                        const dn2 = await response2.json();
                        if (dn2) {
                            assignDb();
                            if (!data.subtype) {
                                idExFunc(data.ex);
                            }
                        }
                    } catch (error2) {
                        alert(error2);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'rem_req') {
            global.page_ld = 'y';
            var settings = {
                method: 'put',
                body: JSON.stringify({ id: data.id, wait: data.wait, ex: data.ex }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/extractEx/RemReqMob`, settings);
                const dn = await response.json();
                if (dn) {
                    var settings2 = {
                        method: 'put',
                        body: JSON.stringify({ ex: data.ex, noti: data.noti  }),
                        headers: { "Content-type" : "application/json; charset=utf-8" }
                    }
                    try {
                        const response2 = await fetch(`https://test-vyral.onrender.com/extractEx/RemReqNotiMob`, settings2);
                        const dn2 = await response2.json();
                        if (dn2) {
                            assignDb();
                            if (!data.subtype) {
                                idExFunc(data.ex);
                            }
                        }
                    } catch (error2) {
                        alert(error2);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        // subs
        async function subNBoties(act, info) {
            if (act == 'add') {
                var settings = {
                    method: 'put',
                    body: JSON.stringify({ ex: data.ex, noti: {user: data.me, noti_type: 'sub', type: info.type, amount: info.amount, date: [year, day, month, hour, minute, secnds]} }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/extractEx/addSubntMob`, settings);
                    const dn = await response.json();
                    assignDb();
                } catch (error) {
                    console.log(error);
                }
            }
        };
        if (data.type == 'updt_sub') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ id: data.id, user_type: data.user_type }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/extractEx/setUsrtp`, settings);
                const dn = await response.json();
                assignDb();
            } catch (error) {
                console.log(error);
            }
        }
        if (data.type == 'add_sub') {
            var pass = data.pass;
            var settings = {
                method: 'post',
                body: JSON.stringify({ user: pass.user, type: pass.type, sub_to: pass.sub_to, amount: pass.amount, date: pass.date }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/extractEx/addSub`, settings);
                const dn = await response.json();
                if (dn) {
                    var act = 'add'; var info = {user: pass.user, type: pass.type, sub_to: pass.sub_to, amount: pass.amount, date: pass.date};
                    subNBoties(act, info);
                }
            } catch (error) {
                console.log(error);
            }
        }
        // report users
        if (data.type == 'report') {
            var settings = {
                method: 'post',
                body: JSON.stringify({ content: data.con, type: 'Profile', from: data.from, by: data.by, date: [year, day, month, hour, minute] }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/post/reportJrn`, settings);
                const dn = await response.json();
                if (dn) {
                    $('#alertText').text('report sent');
                    $('#allAlerts').css('display', 'block');
                    $('#alertBody').fadeIn();
                    // /$(`#${data.repCon}`).slideUp(100);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

/**
 var settings = {
     method: 'post',
     body: JSON.stringify({  }),
     headers: { "Content-type" : "application/json; charset=utf-8" }
 }
 try {
     const response = await fetch(`https://test-vyral.onrender.com/`, settings);
     const dn = await response.json();
 } catch (error) {
     console.log(error);
 }
 * 
 */

async function assignDb() {
    try {
        const response = await fetch(`https://test-vyral.onrender.com/mobile/getDb`);
        const data = await response.json();
        db = data;
        db_f = 'y';
        reAssign();
    } catch (error) {
        reAssign();
    }
}
assignDb();
const reAssign = () => {
    setTimeout(() => {
        assignDb();
    }, 1000);
}

export {db, db_f, assignDb, postData};