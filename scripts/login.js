import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
// smart value
$('#u_name_in').on('input', function(key){
  var value = $(this).val();
  $(this).val(value.replace(/ /g, '_'));
});
function logs() {
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

    var allApps = JSON.parse(localStorage.getItem("app"));
    var app = global.app_store;

    // com alert
    const Alerts = (comp) => {
        $('.alert_p').remove();
        $('#drop_logs_Comp').append(`<p class="alert_p" style="text-align: center; color:orangered; font-size: 13px; margin: 3px;">${comp}</p>`);
        $('.alert_p').fadeIn();
        var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 3);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                $('.alert_p').remove();
                clearInterval(x);
            }
        }, 1000);
    }

    // forgot pass - login
    // forgot
    $('#log_frgt').click(function() {
        if ($('#u_name_in').val() !== '') {
            var data2 = '';
            data2 = db.users.find(i => i.user_name == '@'+$('#u_name_in').val());
            if (data2 == '' || data2 == undefined) {
                const bod = 'no such user';
                Alerts(bod);
            }else {
                // fetch for q/a
                global.fp_user = '@'+$('#u_name_in').val(); global.fp_flag = 'y';
                var page = 'forgot-password'; var child = 'forgot-password';
                changeP(page); childP(child);
            }
        }else {
            const bod = 'insert username';
            Alerts(bod);
        }
    });
    
    $('#login_subm').click(()=>{
        global.page_ld = 'y';
        if ($('#u_name_in').val() !== '' && $('#ps_in').val() !== '') {
            var flag = 'n'; var userN = ''; var m_pwd = '';
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].user_name == `@${$('#u_name_in').val()}`) {
                    flag = 'y'; userN = db.users[i];
                }
            }
            for (let x = 0; x < db.hsh_pwd.length; x++) {
                if (userN._id == db.hsh_pwd[x].u_id) {
                    console.log(`user: ${userN._id}, pwd id: ${db.hsh_pwd[x].u_id}`);
                    m_pwd = db.hsh_pwd[x];
                }
            }
            if (flag == 'y') {
                async function hash() {
                    var settings = { method: 'post', body: JSON.stringify({ user: userN._id, entr: $('#ps_in').val(), hsh: userN.pwd, m_pwd: m_pwd }), headers: { "Content-type" : "application/json; charset=utf-8" } }
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/hash/unHash`, settings);
                        const mHashes = await response.json();
                        if (mHashes.prog == 'go') {
                            var page = 'home';
                            if (allApps.key == app.key) {
                                allApps.userSess = userN._id;
                            }
                            localStorage.setItem("app", JSON.stringify(allApps));
                            global.app_store.locale;
                            refreshGlob(); app = global.app_store; allApps = JSON.parse(localStorage.getItem("app"));
                            changeP(page); childP(page);
                            location.reload();
                        }else {
                            global.log_att--;
                            var attms = global.log_att;
                            if (global.log_att > 0) {
                                const comp = 'wrong login combination!';
                                Alerts(comp);
                            } else {
                                var nw = new Date();
                                var fullD = Math.floor(nw/8.64e7);
                                if (allApps.key == app.key) {
                                    allApps.log_flag = 'n';
                                    allApps.log_dte = fullD+1;
                                    global.app_store = allApps;
                                }
                                localStorage.setItem("app", JSON.stringify(allApps)); app = global.app_store;
                                if (attms <= 0) {
                                    checkAttmps();
                                }
                            }
                        }
                        global.page_ld_stt = 'off';
                    } catch (error) {
                        console.log(error);
                    }
                }
                hash()
            } else {
                global.page_ld_stt = 'off';
                const comp = 'such user does not exist!';
                Alerts(comp);
            }
        } else {
            global.page_ld_stt = 'off';
            const comp = 'complete needed information!';
            Alerts(comp);
        }
    });

    // check attempts
    const checkAttmps = () => {
        var attms = global.log_att;
        var myApp = '';
        if (allApps.key == app.key) {
            myApp = allApps;
        }
        if (myApp.log_flag == 'y') {
            if (attms > 0) {
                $('#user, #pass').val('');
                $('#logIn_con').fadeIn();
                $('#noLogCons').css('display', 'none');
            }else {
                $('#noLogCons').fadeIn();
                $('#logIn_con').css('display', 'none');
            }
        } else {
            var nw = Math.floor(date/8.64e7);
            if (nw >= myApp.log_dte) {
                myApp.log_flag = 'y'; myApp.log_dte = 0; global.log_att = 5;
                global.app_store = myApp;
                localStorage.setItem("app", JSON.stringify(myApp)); app = global.app_store;
            }else {
                $('#noLogCons').fadeIn();
                $('#logIn_con').css('display', 'none');
            }
        }
    };
      checkAttmps();

}
assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                logs();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
 }
checkDb();