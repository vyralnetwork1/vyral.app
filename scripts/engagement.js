import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
import { showO, all_scr, slector } from "./dataSelector.js";
function ex() {

    // post date application
    var date = new Date();
    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var secnds = date.getSeconds();
    if (month == 0) { month = 'January' }
    if (month == 1) { month = 'Febuary' }
    if (month == 2) { month = 'March' }
    if (month == 3) { month = 'April' }
    if (month == 4) { month = 'May' }
    if (month == 5) { month = 'June' }
    if (month == 6) { month = 'July' }
    if (month == 7) { month = 'August' }
    if (month == 8) { month = 'September' }
    if (month == 9) { month = 'October' }
    if (month == 10) { month = 'November' }
    if (month == 11) { month = 'December' }
    const magicNumbers = (tId, num) => {
        // var curn
        var curn = num;
        if (curn > 9999) {
            // curn - thousands
            if (curn < 1000000) {
                // ten thousands
                if (curn < 100000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}k`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}k`);
                    }
                }
                // hundred thousands
                if (curn > 99999) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}k`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}k`);
                    }
                }
            }
            // curn - millions
            if (curn < 1000000000 && curn >= 1000000) {
                // millions
                if (curn < 10000000) {
                    var prnt = curn.toString().slice(0, 1);
                    var prnt1 = curn.toString().slice(1, 2);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}m`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }
                // ten millions
                if (curn > 9999999 && curn < 100000000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}m`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }
                // hundred millions
                if (curn > 99999999) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}m`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }
            }
            // curn - billions
            if (curn >= 1000000000) {
                // billions
                if (curn < 10000000000) {
                    var prnt = curn.toString().slice(0, 1);
                    var prnt1 = curn.toString().slice(1, 2);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}b`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }
                // ten billions
                if (curn > 9999999999 && curn < 100000000000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}b`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }
                // hundred billions
                if (curn >= 100000000000) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}b`);
                    } else {
                        $(`${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }
            }
        } else {
            $(`${tId}`).text(num);
        }

    };
    // SmartDate Func
    const smartDate = (data, dateFlow) => {
        if (data.date[0] !== year) {
            $(`#${dateFlow}`).html(`${data.date[2]} ${data.date[1]}, ${data.date[0]}`);
        }
        if (data.date[0] == year && data.date[2] == month && data.date[1] == day) {
            $(`#${dateFlow}`).html(`<strong style="font-size:10px;">Today.</strong> ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] == month && day - data.date[1] == 1) {
            $(`#${dateFlow}`).html(`<strong style="font-size:10px;">Yesterday.</strong> ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] == month && day - data.date[1] !== 1 && data.date[1] !== day) {
            $(`#${dateFlow}`).html(`${data.date[2]} ${data.date[1]}, ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] !== month) {
            $(`#${dateFlow}`).html(`${data.date[2]} ${data.date[1]}, ${data.date[3]}:${data.date[4]}`);
        }
    }; 

    var allApps = JSON.parse(localStorage.getItem("app"));
    var app = global.app_store;
    const reInstt = () => {
        allApps = JSON.parse(localStorage.getItem("app"));
        app = global.app_store;
    }
    var udata = ''; var secUdata = '';
    const extractU = () => {
        if (app.userSess !== '') {
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i]._id == app.userSess) {
                    udata = db.users[i]; secUdata = db.users[i];
                }
            }
        }
    };
    extractU();
    var checkViewerOpt = () => {
        if (global.ex_flag == 'y') {
            pushData();
        } else {
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function () {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    checkViewerOpt();
                    clearInterval(x);
                }
            }, 1000);
        }
    };
    checkViewerOpt();
    // refresh
    const refreshI = () => {
        var targetDate = new Date();
        targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function () {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                extractU();
                checkViewerOpt();
                clearInterval(x);
            }
        }, 1000);
    }

    const checkMode = () => {
        // light or dark effects
        if(udata.mode == 'light') {
            $('.stylePosts, .bookBods,.srchCon_tg, .ldmreBtn, .ldmreBtn_prf, .ldmreBtn_ex').css('background-color', 'white');
            $('.stylePosts').css('border-top', 'solid 1px #f0f0f0');
            $('.postInfoCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.postDatefrst').css('color', 'grey');
            $('.postHeaderfrst').css('color', '#1a1a1a');
            $('.postBodyCon, .edtPstBd').css('background-color', '#f9f9f9');
            $('.areYSPCon').css('background-color', 'white');
            $('.yesesP').css('border-right', 'solid 1px #f0f0f0');
            $('.postBodyCon').css('border', 'solid 1px #f0f0f0');
            $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.postBodtxt').css('color', '#1a1a1a');
            $('.closeRdCon, .commentIn').css('border-top', 'solid 1px #f0f0f0');
            $('.commentInput').css('border', 'solid 1px #f0f0f0');
            $('.commentInput').css('background-color', 'white');
            $('.checkTagBody2').css('border', 'solid 1px #f0f0f0');
            $('.checkTagBody2, .OpnChptrsCr').css('background-color', 'white');
            $('.chptrsCr').css('background-color', '#f0f0f0');
            $('.edt_jrn_alrt').css('background-color', 'white');
            $('.edt_jrn_alrt').css('box-shadow', '0px 0px 20px -5px #1a1a1a');
            // alrts
            $('.edt_jrn_alrt').css('background-color', 'white');
            $('.edt_jrn_alrt').css('box-shadow', '0px 0px 20px -5px #1a1a1a');
            $('.posterClosecon_edt').css('border-bottom', 'solid 1px #f0f0f0');
        }
        if (udata.mode == 'dark') {
            $('.stylePosts, .bookBods, .srchCon_tg, .ldmreBtn, .ldmreBtn_prf, .ldmreBtn_ex').css('background-color', '#262626');
            $('.stylePosts').css('border-top', 'solid 1px #404040');
            $('.postInfoCon').css('border-bottom', 'solid 1px #404040');
            $('.postDatefrst').css('color', '#f9f9f9');
            $('.postHeaderfrst').css('color', 'white');
            $('.postBodyCon, .edtPstBd').css('background-color', '#333333');
            $('.areYSPCon').css('background-color', '#1a1a1a');
            $('.yesesP').css('border-right', 'solid 1px #333333');
            $('.postBodyCon').css('border', 'solid 1px #404040');
            $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #404040');
            $('.postBodtxt').css('color', 'white');
            $('.closeRdCon, .commentIn').css('border-top', 'solid 1px #404040');
            $('.commentInput').css('border', 'solid 1px #404040');
            $('.commentInput').css('background-color', '#262626');
            $('.checkTagBody2').css('border', 'solid 1px #404040');
            $('.checkTagBody2, .OpnChptrsCr').css('background-color', '#292929');
            $('.chptrsCr').css('background-color', '#404040');
            // alrts
            $('.edt_jrn_alrt').css('background-color', '#262626');
            $('.edt_jrn_alrt').css('box-shadow', '0px 0px 20px -5px #0d0d0d');
            $('.posterClosecon_edt').css('border-bottom', 'solid 1px #404040');
        }
    };

    const exCon = () => {
        return `
        <div class="row shelf_con exloop_con">
            <div class="col-lg-12 col-xs-12" style="position:fixed; z-index:${global.pop_no++}; height:100%;">
                <div class="row" style="height:100%;">
                    <div class="col-lg-3"></div>
                    <div class="col-lg-6 col-xs-12" style="height:100%;">
                        <div style="width:100%; height:96.5%; margin-top:2%; display:none; border-radius:5px; box-shadow:0px 0px 15px -1px rgba(0, 0, 0, 0.25);" id="exloop_con" class="stylePosts">
                            <div style="width:100%; height:6%;">
                                <div style="width:100%; height:100%;">
                                    <p style="float:left; margin:0px; padding:2px; color:darkorange; padding:3px;">insert experience feedback</p>
                                    <p style="margin:0px; padding:2px; margin-right:5px; float:right;"> <img id="cls_expCon" src="assets/imgs/can.png" width="15px" height="15px" style="cursor:pointer;"> </p>
                                </div>
                            </div>
                            <div style="width:100%; height:79%; overflow-y:auto;">
                                <div style="width:98%; margin:auto; height:95%; margin-top:1.5px; border-radius:5px; overflow-y:auto;" class="chptrsCr">
                                    <br>
                                    <span id="drop_feedback"></span>
                                    <br>
                                </div>
                            </div>
                            <div style="width:100%; height:15%; overflow-y:auto;">
                                <textarea class="commentInput" placeholder="insert experience" style="margin:5px; width:70%; float:left; border-radius:5px; color:darkorange;" id="rev_input"></textarea>
                                <img src="assets/imgs/send.png" width="35px" height="35px" style="float:left; margin:5px;" id="push_reviwe">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3"></div>
                </div>
            </div>
        </div>
        `
    };

    const getRevs = () => {
        var data = db.engage; var users = db.users;
        $('.exp_bod').remove();
        for (let i = 0; i < data.length; i++) {
            var usr = users.find(a=>a._id == data[i].user);
            if (usr !== undefined) {
                var type = 'ex';
                if (data[i].user == udata._id) {
                    type = 'me';
                }
                dropRev(data[i], usr, type);
            }
        }
    }

    // bodies
    const meRev = (info, ids, user) => {
        return `
        <div class="edtPstBd" style="width: 85%; margin: 10px; float: right; margin-right: 5px; border-radius:10px; margin-bottom: 10px; box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.253);">
            <div class="posterClosecon_edt" style="width: 95%; margin: auto; height: 25px;">
                <p class="postDatefrst" style="margin: 0px; padding: 2px; font-size: 13px; float: left;">${user.user_name}</p>
                <p class="postDatefrst" id="${ids.date}" style="margin: 0px; padding: 2px; font-size: 11px; float: right;">date here</p>
            </div>
            <p class="postBodtxt" style="margin: 0px; padding: 5px; font-size: 14.5px; white-space:pre;">${info.review}</p>
        </div>
        `
    }
    const exRev = (info, ids, user) => {
        return `
        <div class="areYSPCon" style="width: 85%; margin: 10px; float: left; margin-left: 5px; border-radius:10px; margin-bottom: 10px; box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.253);">
            <div class="posterClosecon_edt" style="width: 95%; margin: auto; height: 25px;">
                <p class="postDatefrst" style="margin: 0px; padding: 2px; font-size: 13px; float: left;">${user.user_name}</p>
                <p class="postDatefrst" id="${ids.date}" style="margin: 0px; padding: 2px; font-size: 11px; float: right;">date here</p>
            </div>
            <p class="postBodtxt" style="margin: 0px; padding: 5px; font-size: 14.5px; white-space:pre;">${info.review}</p>
        </div>
        `
    }
    const dropRev = (data, user, type) => {
        const ids = {
            date: `exp_rev_date_${data._id}`
        };
        if (type == 'me') {
            $('#drop_feedback').append(meRev(data, ids, user));
        } else {
            $('#drop_feedback').append(exRev(data, ids, user));
        }
        checkMode();
        smartDate(data, ids.date);
    }

    // open
    $('#open_ExLoop').on('click', function() {
        $('#dropChat').append(exCon());
        $('#exloop_con').fadeIn();
        $('#container-body, .ex-slider').css('filter', 'blur(5px)');
        checkMode();
        $('#cls_expCon').click(()=>{
            $('#exloop_con, .exloop_con').remove();
            $('#container-body, .ex-slider').css('filter', '');
        });
        setTimeout(() => {
            getRevs();
        }, 100);
        // push feed
        $('.sendFeed').click(()=>{
            if ($('#rev_input').val() !== '') {
                var inp = '';
                var x = window.matchMedia("(max-width: 600px)");
                inp = $('#rev_input');
                fetch('/addReview', {
                    method: 'post',
                    body: JSON.stringify({ 
                        user: user._id, review: inp.val(), date: [year, day, month, hour, minute]
                    }),
                    headers : {
                        "Content-type" : "application/json; charset=utf-8"
                    } 
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    assignDb();
                    setTimeout(() => {
                        getRevs();
                    }, 1000);
                });
            } else {
                alert('include experience');
            }
        })
    }) ;
    // cls


}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                ex();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();