import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
import { showO, all_scr, slector } from "./dataSelector.js";
function strings() {

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
    // smart numbers
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
                        $(`#${tId}`).text(`${prnt}k`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}k`);
                    }
                }
                // hundred thousands
                if (curn > 99999) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`#${tId}`).text(`${prnt}k`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}k`);
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
                        $(`#${tId}`).text(`${prnt}m`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }
                // ten millions
                if (curn > 9999999 && curn < 100000000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`#${tId}`).text(`${prnt}m`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }  
                // hundred millions
                if (curn > 99999999) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`#${tId}`).text(`${prnt}m`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}m`);
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
                        $(`#${tId}`).text(`${prnt}b`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }
                // ten billions
                if (curn > 9999999999 && curn < 100000000000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`#${tId}`).text(`${prnt}b`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }  
                // hundred billions
                if (curn >= 100000000000) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`#${tId}`).text(`${prnt}b`);
                    }else {
                        $(`#${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }  
            }
        }else {
            $(`#${tId}`).text(num);
        }

    };

   var allApps = JSON.parse(localStorage.getItem("app"));
   var app = global.app_store;
    const reInstt = () => {
        allApps = JSON.parse(localStorage.getItem("app"));
        app = global.app_store;
    }
   var udata = '';
   const extractU = () => {
       if (app.userSess !== '') {
           for (let i = 0; i < db.users.length; i++) {
               if (db.users[i]._id == app.userSess) {
                   udata = db.users[i];
               }
            }
       }
    };
    extractU();
    // refresh
    const refreshI = () => {
        var targetDate = new Date();
        targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                extractU();
                clearInterval(x);
            }
        }, 1000);
    }

    // pLOAD IMAGES + VIDS
    const preloadImgs = (imag, id) => {
        const img = new Image();
        img.src = imag;
        img.onerror = function() {
            $(`#${id}`).attr('src', 'assets/imgs/emptimg.png')
        }
    }
    const preloadVids = (id) => {
        const video = document.getElementById(`${id}`);
        video.onerror = function() {
            $(`${id}`).attr('src', 'assets/imgs/emptback.png');
        }
    }

    // CHECK MODE
    const checkMode = () => {
        // light or dark effects
        if(udata.mode == 'light') {
            $('.bedrBotStr').css('border-top', 'solid 0.8px #dddddd');
            $('#thrInfoCon, .vewStrTops').css('border-bottom', 'solid 0.8px #dddddd');
            $('.strFlowDiv').css('background-color', '#f9f9f9');
            $('.strFlowDiv').css('border-right', 'solid 1px #f0f0f0');
            $('.inStrUflow').css('border', 'solid 0.5px #dddddd');
            $('.stylePosts, .ex-slider-str, .srchCon_tag, .thrldmreBtn, .thrldmreBtn_prf, .thrldmreBtn_ex, .StrldmreBtn, .strExldmreBtn_ex, .ThrVwldmreBtn, .ThrVwlAcqdmreBtn').css('background-color', 'white');
            $('.stylePosts, .privStrBod, #clsStrCon').css('border-top', 'solid 1px #f0f0f0');
            $('.postInfoCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.postDatefrst').css('color', 'grey');
            $('.postHeaderfrstStr, #thrHeadr').css('color', '#1a1a1a');
            $('.postBodyCon, .edtPstBd').css('background-color', '#f9f9f9');
            $('.areYSPCon, .privStrBod, .strHdBd, .strThrdVwr, #strActvtCon, .bottom_thr_vid, .strHdBd2, .viewThrBtn').css('background-color', 'white');
            $('.yesesP').css('border-right', 'solid 1px #f0f0f0');
            $('.postBodyCon').css('border', 'solid 1px #f0f0f0');
            $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.postBodtxt').css('color', '#1a1a1a');
            $('.closeRdCon, .commentIn').css('border-top', 'solid 1px #f0f0f0');
            $('.commentInput, .strHdBd, .strHdBd2').css('border', 'solid 1px #f0f0f0');
            $('.commentInput, .inStrUflow, .thrdBod, .tiedUBod, .vewStrTops').css('background-color', 'white');
            $('.checkTagBody2').css('border', 'solid 1px #f0f0f0');
            $('.checkTagBody2').css('background-color', 'white');
            $('.thrdBod, .tiedUBod').css('box-shadow', '0px 0px 40px -5px #dddddd');
            // alrts
            $('.edt_jrn_alrt').css('background-color', 'white');
            $('.edt_jrn_alrt').css('box-shadow', '0px 0px 20px -5px #1a1a1a');
            $('.posterClosecon_edt').css('border-bottom', 'solid 1px #f0f0f0');
            $('.closeImgFlwCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.scrlimgCon').css('border', 'solid 1px #f0f0f0');
            $('.scrlimgCon').css('background-color', 'white');
            // combod
            $('.bodyComNoti').css('border', 'solid 1px #f0f0f0');
            $('.bodyComNoti').css('background-color', 'white');
        }
        if (udata.mode == 'dark') {
            $('.bedrBotStr').css('border-top', 'solid 0.8px #404040');
            $('#thrInfoCon, .vewStrTops').css('border-bottom', 'solid 0.8px #404040');
            $('.strFlowDiv').css('background-color', '#333333');
            $('.strFlowDiv').css('border-right', 'solid 1px #404040');
            $('.inStrUflow').css('border', 'solid 0.5px #333333');
            $('.stylePosts, .ex-slider-str, .srchCon_tag, .thrldmreBtn, .thrldmreBtn_prf .thrldmreBtn_ex, .StrldmreBtn, .strExldmreBtn_ex, .ThrVwldmreBtn, .ThrVwlAcqdmreBtn').css('background-color', '#262626');
            $('.stylePosts, .privStrBod, #clsStrCon').css('border-top', 'solid 1px #404040');
            $('.postInfoCon').css('border-bottom', 'solid 1px #404040');
            $('.postDatefrst').css('color', '#f9f9f9');
            $('.postHeaderfrstStr, #thrHeadr').css('color', '#f0f0f0');
            $('.postBodyCon, .edtPstBd, .tiedUBod').css('background-color', '#333333');
            $('.areYSPCon, .privStrBod, #strThrdVwr, #strActvtCon, .bottom_thr_vid, .strHdBd2, .viewThrBtn').css('background-color', '#1a1a1a');
            $('.yesesP').css('border-right', 'solid 1px #333333');
            $('.postBodyCon, .strHdBd, .strHdBd2').css('border', 'solid 1px #404040');
            $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #404040');
            $('.postBodtxt').css('color', '#f9f9f9');
            $('.closeRdCon, .commentIn').css('border-top', 'solid 1px #404040');
            $('.commentInput').css('border', 'solid 1px #404040');
            $('.commentInput, .strHdBd, .inStrUflow, .thrdBod, .vewStrTops').css('background-color', '#262626');
            $('.checkTagBody2').css('border', 'solid 1px #404040');
            $('.checkTagBody2').css('background-color', '#292929');
            $('.thrdBod, .tiedUBod').css('box-shadow', '0px 0px 40px -5px #1a1a1a');
            // alrts
            $('.edt_jrn_alrt').css('background-color', '#262626');
            $('.edt_jrn_alrt').css('box-shadow', '0px 0px 20px -5px #0d0d0d');
            $('.posterClosecon_edt').css('border-bottom', 'solid 1px #404040');
            $('.closeImgFlwCon').css('border-bottom', 'solid 1px #404040');
            $('.scrlimgCon').css('border', 'solid 1px #404040');
            $('.scrlimgCon').css('background-color', '#262626');
            // combod
            $('.bodyComNoti').css('border', 'solid 1px #404040');
            $('.bodyComNoti').css('background-color', '#262626');
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

    // for threads
    // loader
    const Loader4 = () => {
        return `
            <div id="flowLoader4" class="flowLoader">
                <img src="assets/imgs/load.png" width="45px" height="45px">
            </div>
        `
    };
    $('#dropbox-thr-main').before(Loader4());
    // flow deiff main pg
    $('#flwMainStr').click(()=>{
        $('#flwMainStrImg').attr('src', 'assets/imgs/strings.png');
        $('#flwMainJrnImg').attr('src', 'assets/imgs/readen.png');
        window.scrollTo(0, 0);
        setTimeout(() => {
            if (global.cate == 'explore') {
                $('#redBodCon-ex, #rfrshMain').css('display', 'none');
                $('#strBodCon-ex, #opnLfn, #rfrshMainStr').fadeIn();
                var act = 'all';
                starTrStr(act);
            } else {
                $('#forJrnMain, #opnLfn, #rfrshMain').css('display', 'none');
                $('#forStrMain, #rfrshMainStr').fadeIn();
                $('#refrshr_con').removeClass('refreshRU');
                $('#refrshr_con').addClass('refreshRD');
                setTimeout(() => {
                    $('#thrFlwMainBtn').click();
                }, 1);
            }
        }, 100);
    });
    $('#thrFlwMainBtn').click(()=>{
        // for main-page
        $('#thrFlwMainBtn').css('border-bottom', 'solid 2px skyblue');
        $('#strFlwMainBtn').css('border-bottom', 'none');
        // for main pge nav
        $('#drpStrMain').css('display', 'none');
        $('#drpThrMain').fadeIn();
        // for thr/str
        /*$('#strFlowCon, #strFlwMain').css('display', 'none');
        $('#thrFlowCon, #thrFlwMain').fadeIn();
        */
       setTimeout(() => {
           var tg = 'hme';
           getUinfoThr(tg);
       }, 100);
    });
    // profile main str btn/thr
    $('#opnStrPrf').click(()=>{
        $('#opnStrPrf').attr('src', 'assets/imgs/strings.png');
        $('#opnAutCnt').attr('src', 'assets/imgs/authand2.png');
        $('#opnJrnPrf').attr('src', 'assets/imgs/readen.png');
        $('#forJrnPrf, #forPrfAut').css('display', 'none');
        $('#strPrfBd').fadeIn();
        $('#thrFlwOpn').click();
    });
    $('#thrFlwOpn').click(()=>{
        // for main-page
        $('#thrFlwOpn').css('border-bottom', 'solid 2px skyblue');
        $('#strFlwOpn').css('border-bottom', 'none');
        // for main pge nav
        $('#strFlowCon').css('display', 'none');
        $('#thrFlowCon').fadeIn();
        setTimeout(() => {
            var tg = 'prf';
            getUinfoThr(tg);
        }, 100);
    });
    // open str 
    const getUinfoThr = (tg) => {
        getThrds(udata, tg);
    };
    var thrCntr = 0; var thrlenAddr = 15; var thrCntrPrf = 0; var thrlenAddrPrf = 10; var thrArr = new Array();
    const getThrds = (udata, tg) => {
        var thrdata = db.all_posts;
        global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-thr-main';
        global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-thr';
        global.drp_ld = 'y';
        if (thrdata) {
            var users = db.users;
            //$('.privThrBod').remove();
            thrCntr = 0; thrlenAddr = 15; thrCntrPrf = 0; thrlenAddrPrf = 10;
            thrArr = [];
            for (let i = 0; i < thrdata.length; i++) {
                if (udata.following.length > 0) {
                    for (let z = 0; z < udata.following.length; z++) {
                        if (thrdata[i].user == udata.following[z].user && thrdata[i].content_type == "thread") {
                            var tdata = db.users.find(z=>z._id == thrdata[i].user);
                            var blck = tdata.blocked_list.find(i=>i.user == udata._id);
                            if (blck == undefined) {
                                var wer = 'gen';
                                $('#noStrCon').css('display', 'none');
                                var del = 'thrBody_' + thrdata[i]._id+wer;
                                $(`#${del}`).remove();
                                thrArr[thrArr.length] = { tg: tg, thr: thrdata[i], me: udata, users: users, pos: 'ex', wer: wer };
                                $('#strThrMainNav').css('display', 'block');
                                //break;
                            }
                        }
                    }
                    if (thrdata[i].user == udata._id && thrdata[i].content_type == "thread") {
                        $('#noStrCon, #checknum-t').css('display', 'none');
                        var del = 'thrBody_' + thrdata[i]._id+tg;
                        $(`#${del}`).remove();
                        thrArr[thrArr.length] = { tg: tg, thr: thrdata[i], me: udata, users: users, pos: 'usr' };
                        $('#strThrMainNav').css('display', 'block');
                    }
                }else {
                    if (thrdata[i].user == udata._id && thrdata[i].content_type == "thread") {
                        $('#noStrCon, #checknum-t').css('display', 'none');
                        var del = 'thrBody_' + thrdata[i]._id+tg;
                        $(`#${del}`).remove();
                        thrArr[thrArr.length] = { tg: tg, thr: thrdata[i], me: udata, users: users, pos: 'usr' };
                        $('#strThrMainNav').css('display', 'block');
                    }
                }
            }
            thrApplyPosts(tg);
            $('#flowLoader4').fadeOut();
        }
        global.drp_ld_stt = 'off';
              //$('#container-one').css('display', 'none');
              // $('#dropChat').after(ViewStr(data));
    };
    const thrApplyPosts = (tg) => {
        $('.thrldmreBtn').remove();
        if (tg == 'hme') {
            thrlenAddr = thrArr.length;
            /*if (thrArr.length < thrlenAddr) {
                thrlenAddr = thrArr.length;
            }*/
                for (let i = 0; i < thrlenAddr; i++) {
                    if (thrCntr < i+1) {
                        //alert(tg);
                        if (thrArr[i].pos == 'usr') {
                            thrCntr++;
                            dispThrStr(thrArr[i].thr, thrArr[i].me, thrArr[i].users, thrArr[i].tg);
                            checkMode();
                        }
                        if (thrArr[i].pos == 'ex') {
                            thrCntr++;
                            dispFrndThrStr(thrArr[i].thr, thrArr[i].me, thrArr[i].users, thrArr[i].wer);
                            checkMode();
                        }
                    }
                }
            
                if (thrArr.length > thrlenAddr) {
                    $('.thrldmreBtn').remove();
                    $('#dropbox-thr-main').after(`<div class="thrldmreBtn" id="ldMrThrs-mnp" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -10px black; border-radius:10px;">
                        <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                    </div>`);
                    checkMode();
                    $('#ldMrThrs-mnp').click(()=>{
                        thrlenAddr = thrlenAddr+thrlenAddr;
                        thrApplyPosts(tg);
                    });
                }else {
                    $('.thrldmreBtn').remove();
                }
            
        }
        if (tg == 'prf') {
            var myArr = new Array();
            for (let p = 0; p < thrArr.length; p++) {
                if (thrArr[p].pos == 'usr') {
                    myArr[myArr.length] = thrArr[p];
                }
            }
            if (myArr.length < thrlenAddrPrf) {
                thrlenAddrPrf = myArr.length;
            }
            for (let o = 0; o < thrlenAddrPrf; o++) {
                if (thrCntrPrf < o+1) {
                    thrCntrPrf++;
                    checkMode();
                    dispThrStr(myArr[o].thr, myArr[o].me, myArr[o].users, myArr[o].tg);
                }
            }
            if (myArr.length > thrlenAddrPrf) {
                $('.thrldmreBtn_prf').remove();
                $('#dropbox-thr').after(`<div class="thrldmreBtn_prf" id="ldMrThrs-mnp_prf" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                    <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                </div>`);
                checkMode();
                $('#ldMrThrs-mnp_prf').click(()=>{
                    thrlenAddrPrf = thrlenAddrPrf+thrlenAddrPrf;
                    thrApplyPosts(tg);
                });
            }else {
                $('.thrldmreBtn_prf').remove();
            }
        }
    };

    /**
     * Explore
     */
    // get explore-str
    const strTrndStr = (act) => {
        var alldata = db.users;
        var strdata = db.all_posts;
        global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-strindexexp';
        global.drp_ld = 'y';
        // drop trending strn
        $('.tieUflowBod, .privStrBod, .strRankedCon').remove();
        if (act == 'str' || act == 'all') {
            var strings = new Array();
            for (let o = 0; o < showO.str_r.length; o++) {
                for (let i = 0; i < strdata.length; i++) {
                    if (strdata[i].content_type == 'string') {
                        if (strdata[i]._id == showO.str_r[o].content._id) {
                            strings[strings.length] = {str: strdata[i], points: showO.str_r[o].points};
                        }
                    }
                }
            }
            var len = 0;
            if (strings.length > 10) {
                len = 10;
            } else {
                len = strings.length;
            }
            var dropped = new Array();
            for (let l = 0; l < len; l++) {
                var flag = 'y';
                for (let z = 0; z < dropped.length; z++) {
                    if (dropped[z] == strings[l].str._id) {
                        flag = 'n';
                    }
                }
                if (flag == 'y') {
                    var tpe = 'gen';                        
                    dispTrndStr(strings[l].str, udata, strings[l].points, tpe);
                    dropped[dropped.length] = strings[l].str._id;
                    checkModeTie();
                }
            }
        }
        // drp mosat asc thrds
        if (act == 'thr' || act == 'all') {
            var threads = new Array();
            for (let i = 0; i < showO.thr_r.length; i++) {
                for (let n = 0; n < strdata.length; n++) {
                    if (strdata[n].content_type == 'thread' && strdata[n]._id == showO.thr_r[i].content._id) {
                        threads[threads.length] = {thr: strdata[n], points: showO.thr_r[i].points};
                    }
                }
            }
            var lenT = 0;
            if (threads.length > 5) {
                lenT = 5;
            } else {
                lenT = threads.length;
            }
            for (let l = 0; l < lenT; l++) {
                //dispFrndThrStr();   
                var wrt = 'exp_thr';
                dispFrndThrStr(threads[l].thr, udata, alldata, wrt);                 
                checkMode();
                
            }
        }
        // drop em
        if (act == 'all') {
            var lenB = 0;
            for (let i = 0; i < strdata.length; i++) {
                if (lenB < 51) {
                    if (strdata[i].content_type == 'thread') {
                        var wrt = 'exp';
                        dispFrndThrStr(strdata[i], udata, alldata, wrt);                 
                        checkMode();
                        lenB++;
                    }
                    if (strdata[i].content_type == 'string') {
                        var tieType = 'explore_str';
                        displayStrings(strdata[i], udata, tieType, alldata);
                        checkMode();
                        lenB++;
                    }
                }
            }
        }
        global.drp_ld_stt = 'off';
        
    }
    const starTrStr = (act) => {
        slector();
        var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                strTrndStr(act);
                clearInterval(x);
            }
        }, 1000);
    }
    // ui 
    const trndnStrBod = (name, len, ids) => {
        var newName = '';
        if (name.length > 10) {
            newName = name.slice(0, 10)+'..';
        }else {
            newName = name;
        }
        return `
        <div id="" class="tieUflowBod strRankedCon" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
            <div style="width:15%; height:100%; float:left;">
                <div style="width:25px; height:25px; margin:auto; background-image:url(assets/imgs/strings.png); background-size:100% 100%; border-radius:100%; margin-top:5px;"></div>
            </div>
            <div style="width:65%; height:100%; float:left;">
                <p class="postDatefrst" style="padding:6.5px; margin:0px; font-size:11px;">${newName} 
                    <i class="sub_h" style="font-size:9px;">${len} <strong style="font-size:12px;">.</strong> th</i> 
                </p>
            </div>
            <div style="width:20%; height:100%; float:right;">
                <p styl="text-align:center; margin:0px;">
                    <button id="${ids.viewId}" class="btn btn-default btn-xs view-srchdStrCon" style="border:solid 1px orange; margin-top:7.5px; color:darkorange; background-color:transparent;"><i style="margin:0px; adding:0px;">VIEW</i></button>
                </p>
            </div>
        </div>
        `
    };
    // crt ids
    const createTrndStrIds = (data, tpe) => {
        return {
            viewId: 'trndn_str_view' + data._id + `_${tpe}`
        }
    };
    // funcs
    const openStr = (data, udata, viewId) => {
        //const openBgBdy = (data, udata, tieType, user, viewId) => {
            $(`#${viewId}`).click(()=>{
                var thrdata = db.all_posts;
                if (thrdata) {
                    displayView(thrdata, data, udata);
                }
            });
        //};
    }; 
    const dispTrndStr = (data, udata, len, tpe) => {
        const ids = createTrndStrIds(data, tpe);
        //al
        var name = '';
        console.log('droppped here!');
        if (data.type == "Public") {
            name = data.name;
        } else {
            name = data.head;
        }
        var x = window.matchMedia("(max-width: 600px)")
        $('#drop_trnd_Str').append(trndnStrBod(name, len, ids));
        checkMode();
        openStr(data, udata, ids.viewId);
    };

     /**
     * FOR EX-USER
     */
    // for threads
    var thrCntrEx = 0; var thrAddrEx = 2; var thrArrEx = new Array();
    const getExUserThr = () => {
        // EXTRACTION
        const getExuser = () => {
            var data2 = db.users.find(i => i._id==global.ex_thr.id);
            getExThrds(data2, udata);
        }
        const getExThrds = (data2, udata) => {
            
            var drop = global.ex_thr.drop;
            global.drp_ld_loc[global.drp_ld_loc.length] = drop;
            global.drp_ld = 'y';
            if (data2 !== '') {
                const thrdata = db.all_posts;
                var users = db.users;
                thrCntrEx = 0; thrAddrEx = 2; thrArrEx = [];
                
                if (thrdata) {
                    for (let i = 0; i < thrdata.length; i++) {
                        if (thrdata[i].user == data2._id && thrdata[i].content_type == 'thread') {
                            thrArrEx[thrArrEx.length] = { drop: drop, thr: thrdata[i], me: udata, users: users, pos: 'ex' };
                            var del = 'thrBody_' + thrdata[i]._id+drop;
                            $(`#${del}`).remove();
                            $('#checknum-tex').css('display', 'none');
                            $('#flowLoader4').fadeOut();
                        }
                    }
                    $('#flowLoader4').fadeOut();
                    global.ex_thr.flag = 'n';
                    startExThr();
                    dropExThrAPply(drop);
                }
            }
            global.drp_ld_stt = 'off';
        };
        getExuser();
    };
    const dropExThrAPply = (drop) => {
        thrAddrEx = thrArrEx.length;
        $('.thrldmreBtn_ex').remove();
        for (let i = 0; i < thrAddrEx; i++) {
            if (thrCntrEx < i+1) {
                if (thrArrEx[i].pos == 'ex') {
                    thrCntrEx++;
                    checkMode();
                    dispExThrStr(thrArrEx[i].thr, thrArrEx[i].me, thrArrEx[i].users, drop)
                }
            }
        }
    
        if (thrArrEx.length > thrAddrEx) {
            $('.thrldmreBtn_ex').remove();
            $(`#${drop}`).after(`<div class="thrldmreBtn_ex" id="thrldMrJrns-mnp_ex" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
            </div>`);
            checkMode()
            $('#thrldMrJrns-mnp_ex').click(()=>{
                thrAddrEx = thrAddrEx+thrAddrEx;
                dropExAPply(drop);
            });
        }else {
            $('.thrldmreBtn_ex').remove();
        }
    };
    // get Exuser func
    const startExThr = () => {
        var inf = global.ex_thr.flag;
        if (inf == 'y') {
            // assignDb();
            getExUserThr();
        }else {
            setTimeout(() => {
                startExThr();
            }, 1);
            //fetch('/extractEx/presLoc', { method: 'get' }).then((responce)=>{ return responce.json() }).then((loc)=>{
            //});
        }
    };
    startExThr();

    // ----------------------------
    // EXTRACT STRINGS && threads
    // ----------------------------
    // for strings
    $('#strFlwMainBtn').click(function() {
        // for main-page
        $('#strFlwMainBtn').css('border-bottom', 'solid 2px skyblue');
        $('#thrFlwMainBtn').css('border-bottom', 'none');
        // for main pge nav
        $('#drpThrMain').css('display', 'none');
        $('#drpStrMain').fadeIn();
        var chk = 'hme';
        startGoEx(chk);
    });
    // op str prf
    $('#strFlwOpn').click(function() {
        // for main-page
        $('#strFlwOpn').css('border-bottom', 'solid 2px skyblue');
        $('#thrFlwOpn').css('border-bottom', 'none');
        // for main pge nav
        $('#thrFlowCon').css('display', 'none');
        $('#strFlowCon').fadeIn();
        var chk = 'prf';
        startGoEx(chk);
    });
    var strCntr = 0; var strlenAddr = 15; var strCntrPrf = 0; var strlenAddrPrf = 10; var strArr = new Array();
    const startGoEx = (chk) => {
        // assignDb();
        // fetch user info to include as data
        const getStrNow = (data, udata) => {
            var tieType = '';
            
            global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-str-main';
            global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-str';
            global.drp_ld = 'y';
            strCntr = 0; strlenAddr = 15; strCntrPrf = 0; strlenAddrPrf = 10;
            strArr = [];
            console.log('strings relatd to me: '+showO.str_h.length);
            for (let i = 0; i < showO.str_h.length; i++) {
                console.log('drop: '+showO.str_h[i].content+', tie: '+showO.str_h[i].tie);
                var pst = data.find(item => item._id==showO.str_h[i].content);
                var usr = db.users.find(item => item._id==pst.user);
                if (showO.str_h[i].tie == 'Own') {
                    tieType = 'Own';
                    strArr[strArr.length] = {str: pst, tieT: tieType, users: db.users, pos: "usr", me: udata};
                    $('#checknum-s').css('display', 'none');
                    var del = 'strBody_' + pst._id+`_${tieType}`;
                    $(`#${del}`).remove();
                    $('#flowLoader3').fadeOut();
                }
                if (showO.str_h[i].tie == 'Friend') {
                    tieType = 'Friend';
                    strArr[strArr.length] = {str: pst, tieT: tieType, users: db.users, pos: "ex", me: udata};
                    var del = 'strBody_' + pst._id+`_${tieType}`;
                    $(`#${del}`).remove();
                    $('#checknum-s').css('display', 'none');
                }
                if (showO.str_h[i].tie == 'Tied') {
                    var tieType = 'Tied';
                    strArr[strArr.length] = {str: pst, tieT: tieType, users: db.users, pos: "usr", me: udata};
                    $('#checknum-s').css('display', 'none');
                    var del = 'strBody_' + pst._id+`_${tieType}`;
                    $(`#${del}`).remove();
                    $('#flowLoader3').fadeOut();
                }
                /*for (let z = 0; z < db.all_posts.length; z++) {
                    if (showO.str_h[i].content == db.all_posts[z]._id) {
                        for (let b = 0; b < db.users.length; b++) {
                            if (db.users[b]._id == db.all_posts[z].user) {
                                if (showO.str_h[i]) {
                                    
                                }
                            }
                        }
                    }
                }*/
            }
            strApplyPosts(chk);
            global.drp_ld_stt = 'off';
        }
        const getStrings = (udata) => {
            getStrNow(db.all_posts, udata);
            $('#flowLoader3').fadeOut();
        };

        setTimeout(() => {
            getStrings(udata);
        }, 1);
    }
    const strApplyPosts = (chk) => {
        $('.StrldmreBtn').remove();
        if (chk == 'hme') {
            strlenAddr = strArr.length;
            /*if (strArr.length < strlenAddr) {
                strlenAddr = strArr.length;
            }*/
                for (let i = 0; i < strlenAddr; i++) {
                    if (strCntr < i+1) {
                        if (strArr[i].pos == 'usr') {
                            strCntr++;
                            displayStrings(strArr[i].str, strArr[i].me, strArr[i].tieT, strArr[i].users, chk);
                            checkMode();
                        }
                        if (strArr[i].pos == 'ex') {
                            strCntr++;
                            displayStrings(strArr[i].str, strArr[i].me, strArr[i].tieT, strArr[i].users, chk);
                            checkMode();
                        }
                    }
                }
            
                if (strArr.length > strlenAddr) {
                    $('.StrldmreBtn').remove();
                    $('#dropbox-str-main').after(`<div class="StrldmreBtn" id="ldMrStrs-mnp" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -10px black; border-radius:10px;">
                        <p style="text-align:center; margin:0px; padding:2.5px; color:orange;">load more</p>
                    </div>`);
                    $('#ldMrStrs-mnp').click(()=>{
                        strlenAddr = strlenAddr+strlenAddr;
                        strApplyPosts(chk);
                    });
                }else {
                    $('.StrldmreBtn').remove();
                }
            
        }
        if (chk == 'prf') {
            var myArr = new Array();
            for (let p = 0; p < strArr.length; p++) {
                if (strArr[p].pos == 'usr') {
                    myArr[myArr.length] = strArr[p];
                }
            }
            if (myArr.length < strlenAddrPrf) {
                strlenAddrPrf = myArr.length;
            }
            for (let o = 0; o < strlenAddrPrf; o++) {
                if (strCntrPrf < o+1) {
                    strCntrPrf++;
                    displayStrings(myArr[o].str, myArr[o].me, myArr[o].tieT, myArr[o].users, chk);
                    checkMode();
                }
            }
            if (myArr.length > strlenAddrPrf) {
                $('.StrldmreBtn_prf').remove();
                $('#dropbox-str').after(`<div class="StrldmreBtn_prf" id="ldMrStr-mnp_prf" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                    <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                </div>`);
                $('#ldMrStr-mnp_prf').click(()=>{
                    strlenAddrPrf = strlenAddrPrf+strlenAddrPrf;
                    strApplyPosts(tg);
                });
            }else {
                $('.StrldmreBtn_prf').remove();
            }
        }
    };

    // EX-USER!
    var strCntrEx = 0; var strAddrEx = 10; var strArrEx = new Array();var realCount = 0;
    const getExUserStr = () => {
        const getExuser = () => {
            var data2 = db.users.find(i => i._id==global.ex_str.id);
            geExStr(data2, udata);
        }
        const geExStr = (data2, udata) => {
            var drop = global.ex_str.drop;
            const data = db.all_posts;
            const users = db.users;
            global.drp_ld_loc[global.drp_ld_loc.length] = drop;
            global.drp_ld = 'y';
            if (data2) {
                var tieType = '';
                strCntrEx = 0; strAddrEx = 10; strArrEx = [];
                for (let i = 0; i < data.length; i++) {
                    if (data2.following.length > 0) {
                        for (let z = 0; z < data2.following.length; z++) {
                            if (data2.following[z].user == data[i].user && data[i].content_type == 'string') {
                                tieType = 'Friend';
                                realCount++;
                                strArrEx[strArrEx.length] = {str: data[i], tieT: tieType, users: users, me: udata, you: data2};
                                var del = 'strBody_' + data[i]._id+`_${tieType}`;
                                $(`#${del}`).remove();
                                $('#checknum-sex').css('display', 'none');
                                break;
                            }
                        }
                    }
                }
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user == data2._id && data[i].content_type == 'string') {
                        tieType = 'Own';
                        realCount++;
                        strArrEx[strArrEx.length] = {str: data[i], tieT: tieType, users: users, me: udata, you: data2};
                        var del = 'strBody_' + data[i]._id+`_${tieType}`;
                        $(`#${del}`).remove();
                        $('#checknum-sex').css('display', 'none');
                        $('#flowLoader3').fadeOut();
                    }else {
                        if (data[i].type == 'Private' && data[i].tied.length > 0) {
                            for (let x = 0; x < data[i].tied.length; x++) {
                                if (data[i].tied[x] == data2._id && data[i].content_type == 'string') {
                                    var tieType = 'Tied';
                                    realCount++;
                                    strArrEx[strArrEx.length] = {str: data[i], tieT: tieType, users: users, me: udata, you: data2};
                                    var del = 'strBody_' + data[i]._id+`_${tieType}`;
                                    $(`#${del}`).remove();
                                    $('#checknum-sex').css('display', 'none');
                                    $('#flowLoader3').fadeOut();
                                }
                            }
                        }
                    }
                }
                $('#flowLoader3').fadeOut();
                global.ex_str.flag = 'n';
                strExApplyPosts(drop);
                
            }
            global.drp_ld_stt = 'off';
            //$('#container-one').css('display', 'none');
                    // $('#dropChat').after(ViewStr(data));
        };
        getExuser();
    }
    const strExApplyPosts = (drop) => {
        $('.strExldmreBtn_ex').remove();
        startExStr();
        strAddrEx = strArrEx.length;
        /*if (strArrEx.length < strAddrEx) {
            strAddrEx = strArrEx.length;
        }*/
        for (let i = 0; i < strAddrEx; i++) {
            if (strCntrEx < i+1) {
                strCntrEx++;
                displayExStrings(strArrEx[i].str, strArrEx[i].you, strArrEx[i].me, strArrEx[i].tieT, strArrEx[i].users, drop)
                checkMode();
            }
        }
        if (strArrEx.length > strAddrEx) {
            $('.strExldmreBtn_ex').remove();
            $(`#${drop}`).after(`<div class="strExldmreBtn_ex" id="ldMrExStrs-mnp_ex" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
            </div>`);
            checkMode();
            $('#ldMrExStrs-mnp_ex').click(()=>{
                strAddrEx = strAddrEx+strAddrEx;
                strExApplyPosts(drop);
            });
        }else {
            $('.strExldmreBtn_ex').remove();
        }
    };
    // for ex-usr
    const startExStr = () => {
        var inf = global.ex_str.flag;
        if (inf == 'y') {
            // assignDb();
            getExUserStr();
        }else {
            setTimeout(() => {
                startExStr();
            }, 1);
            //fetch('/extractEx/presLoc', { method: 'get' }).then((responce)=>{ return responce.json() }).then((loc)=>{
            //});
        }
    };
    startExStr();

    // refresh add/remove class
    $('#rfrshMainStr').click(()=>{
        $('#rfrshMainStr').addClass('rfrshMain');
        // admn log alrt session
        // assignDb();
        if (global.cate == 'explore') {
            var tg = 'exp';
            refreshTime(tg);
        } else {
            var tg = 'hme';
            refreshTime(tg);
        }
    });
    const refreshTime = (tg) => {
        $('#rfrshMainStr').addClass('rfrshMain');
        $('#flwMainStr').click();
        var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                $('#rfrshMainStr').removeClass('rfrshMain');
                if (tg == 'exp') {
                    var act = 'all';
                    starTrStr(act);
                } else {
                    startGoEx();
                }
                clearInterval(x);
            }
        }, 1000);
    };

    /**
     * REVIEW NOTIFICATION FUNCS
     */
    // if commect body
    const comsBod = (udata, drpId, bodyComId) => {
        return `
        <div id="${bodyComId}" class="bodyComNoti" id="" style="width:98%; margin:auto; height:200px; border-radius:5px; padding-bottom:5px; margin-bottom:10px;">
            <div style="width:100%; height:200px; overflow-y:auto;">
                <span id="${drpId}" class="comFlow"></span>
            </div>
        </div>
        `;
    };
    const comIdsNoti = (data) => {
        return {
            // drop Id
            drpId: 'dropCom_noti_' + data._id,
            bodyComId: 'bodyComThr_noti_' + data._id,
            // comment body id
            dateFlwComThr: 'dateFlwComThr_noti_' + data._id,
            delId: 'delComId_noti_' + data._id,
            comBodId: 'comBodId_noti_' + data._id,
            verIconCom: 'verIconCom_Thr_Noti' + data._id,
            usrNme: 'comUsrNmeGo_Thr_Noti' + data._id
        }
    };
    // get specific thr
    const getSpec = (data, udata, type) => {
        var spec = db.all_posts.find(i => i._id == data);
        if (spec !== undefined) {
            var del = 'thrBody_' + data._id+type;
            $(`#${del}`).remove();
            displayReviews(spec, udata, type);
            checkMode(); Dark();
        } else {
            $('#droprev-lktg').append(`
                <h2 class="sub_h" style="text-align:center; margin:10px;">This post has been deleted or does not exist anymore!<h2>
            `);
            Dark();
        }
    };
    // get specific thr
    const getSpecStr = (data, udata, type) => {
        var spec = db.all_posts.find(i => i._id == data);
        checkMode();
        //fetch following
        var dataFlwn = udata;
        var tieType = '';
        if (spec == undefined) {
            $('#droprev-lktg').append(`
                <h2 class="sub_h" style="text-align:center; margin:10px;">This post has been deleted or does not exist anymore!<h2>
            `);
        } else {
            Dark();
            if (dataFlwn.following.length > 0) {
                for (let z = 0; z < dataFlwn.following.length; z++) {
                    if (dataFlwn.following[z].user == spec.user) {
                        tieType = 'Friend';
                        var del = 'strBody_' + spec._id+`_${tieType}`;
                        $(`#${del}`).remove();
                        displayStrReviews(spec, udata, tieType, type);
                        break;
                    }
                }
            }
            if (spec.user == udata._id) {
                tieType = 'Own';
                displayStrReviews(spec, udata, tieType, type);
            }else {
                if (spec.type == 'Private' && spec.tied.length > 0) {
                    for (let x = 0; x < spec.tied.length; x++) {
                        if (spec.tied[x] == udata._id) {
                            var tieType = 'Tied';
                            var del = 'strBody_' + spec._id+`_${tieType}`;
                            $(`#${del}`).remove();
                            displayStrReviews(spec, udata, tieType, type);
                            $('#checknum-sex').css('display', 'none');
                            $('#flowLoader3').fadeOut();
                        }
                    }
                }
            }
           
        }
        
            /*const myStrRevDiff = (data, udata, tieType) => {
                if (data.user == udata._id) {
                    tieType = 'Own';
                    displayStrReviews(data, udata, tieType, type);
                }else {
                    if (data.tied.length > 0) {
                        for (let x = 0; x < data.tied.length; x++) {
                            if (data.tied[x] == udata._id) {
                                tieType = 'Tied';
                                displayStrReviews(data, udata, tieType, type);
                                $('#checknum-s').css('display', 'none');
                                $('#flowLoader3').fadeOut();
                            }
                        }
                    }
                }
            }*/
    };
    // review from noti
    const getReview = (udata) => {
        var type = global.rev_type;
        if (type == 'tie_string' || type == 'shr_str') {
            var data = global.rev_hang;
            getSpecStr(data, udata, type);
        }
        if (type == 'like_str' || type == 'comment_str' || type == 'shr_thr') {
            var data = global.rev_hang;
            getSpec(data, udata, type);
        }
        termRev(udata);
    };
    const checkRev = (udata) => { 

        var revLet = global.rev_allw;
        if (revLet == 'yes') {
            getReview(udata);
        }else {
            setTimeout(() => {
                checkRev(udata);
            }, 1);
        }
        
    };
    checkRev(udata);
    const termRev = (udata) => {
        // assignDb(); 
        setTimeout(() => {
            extractU();
            global.rev_allw = 'no';
            var term = global.rev_allw;
            if (term) {
                checkRev(udata);
            }
        }, 1);
    };

    // check uer prof
    const idExFunc = (data, udata, userIdEx) => {

        $(`#${userIdEx}`).click(()=>{
            if (data == udata._id) {
                $('#opnPrf').click();
                $('#closeStrVw').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = data;
                global.ex_flag = 'y';
            }
        })

    };

     // STRING TYPES
    //--------------
    // all strings
    const privString = (data, udata, user, val, fpath, ids) => {
        var path = ''; var clas = '';
        if (fpath.profile_pic == 'none') {
            path = 'assets/imgs/profpic.png'; clas = 'none';
        }else {
            path = `https://test-vyral.onrender.com/${fpath.profile_pic.path}`; clas = `${fpath.profile_pic.class}`;
        }
        return `
        <div class="privStrBod" id="${ids.strBody}" style="width:100%;">
            <p class="sub_hs" style="padding:8px; margin:0px; font-size:13.5px;"><i style="font-size:11.5px;" id="${ids.gotoProf}">${val}</i> <strong style="font-size:30px;">.</strong> </p>
            <div class="strHdBd" style="width:95%; margin:auto; border-radius:5px; margin-bottom:15px;">
                <div class="" style="width:100%; height:30px; margin-bottom:5px;">
                    <img src="assets/imgs/strings.png" id="testStrBtn" width="20px" height="20px" alt="" style="float:left; margin:5px; cursor:pointer;">
                    <img src="assets/imgs/addxs.png" id="${ids.edtId}" alt="" width="20px" height="20px" style="margin:5px; float:left; cursor:pointer; display:none;">
                    <img src="assets/imgs/opt.png" id="${ids.opnOpt}" alt="" width="5px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                    <i class="postDatefrst" style="float:right; margin:5px; font-size:10px;" id="${ids.strDate}"></i>
                </div>
                <div class="edtPstBd" id="${ids.optBody}" style="width:100%; display:none;">
                    <div class="edtPstFlw" style="width:100%; height:35px;">
                        <p style="text-align:center; margin:0px; padding:1px;"><img id="${ids.clsOpt}" src="assets/imgs/up.png" width="25px" height="15px" style="cursor:pointer;"></p>
                    </div>
                    <!-- delp cons -->
                    <div id="${ids.delStrId}" class="edtPstFlw" style="width:100%; height:35px;">
                        <p id="" style="margin:8px; color:orangered; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/del.png" width="12.5px" height="15px" style="margin-right:10px;"> Delete string</p>
                    </div>
                    <div id="${ids.delStrBod}" class="areYSPCon" style="width:100%; height:60px; display:none;">
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p class="sub_h" style="text-align:center; margin:0px; padding:5px;"> Are you sure you want to delete post?</p>
                        </div>
                        <div style="width:100%; height:30px;">
                            <div class="yesesP" style="width:49%; float:left; height:100%; float:left;">
                                <p id="${ids.delStrY}" style="text-align:center; color:orangered; margin:5px; cursor:pointer;">Yes</p>
                            </div>
                            <div style="width:49%; float:left; height:100%; float:right;">
                                <p class="sub_h" id="${ids.delStrN}" style="text-align:center; margin:5px; cursor:pointer;">Cancel</p>
                            </div>
                        </div>
                    </div>
                    <!-- report cons -->
                    <div id="${ids.repStrId}" class="" style="width:100%; height:35px;">
                        <p class="sub_h" style="margin:8px; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/flag.png" width="15px" height="15px" style="margin-right:10px;"> Report string</p>
                    </div>
                    <div id="${ids.repStrConId}" class="areYSPCon" style="width:100%; display:none;">
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.inApRepStr}"> Inappropriate content </p>
                        </div>
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.abusRepStr}"> Abusive content </p>
                        </div>
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.clsRepStr}"> cancel </p>
                        </div>
                    </div>
                </div>
                <!-- for general string viewer -->
                <div id="${ids.strBgId}" class="" style="width:70%; height:300px; margin:auto; border-radius:10px; margin-top:5px; cursor:pointer; background-image:url('assets/imgs/cbsm.png'); background-size:100% 100%; box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.3);">
                    <br>
                    <div class="${clas}" style="box-shadow:0px 0px 30px -15px #1a1a1a; width:80px; height:80px; border-radius:100%; margin:auto; margin-top:50px; background-image:url(${path}); background-size:cover;">
                    </div>
                    <p class="postDatefrst" style="text-align:center; font-size:11px; margin:0px; padding:5px; margin-top:10px; text-shadow:0px 0px 5px rgba(0, 0, 0, 0.4);"><i style="font-size:9px;">creaetd by </i> ${user}</p>
                    <p style="text-align:center; margin:0px; padding:5px;">
                        <button id="" class="btn btn-default btn-xs" style="color:darkorange; border:solid 1px darkorange; background-color:white; border-radius:10px; opacity:0.7;"><strong>V I E W</strong></button>
                    </p>
                </div>
                <p class="postHeaderfrstStr" id="${ids.strHeadId}" style="padding:7.5px; color:#1a1a1a; font-size:13px; margin:0px;">${data.head}</p>
                <p class="sub_h" id="${ids.strNameId}" style="padding:5px; font-size:11px; margin:0px;">Public <strong style="font-size:18px;">.</strong> <span style="color:skyblue; font-size:13px;">${data.name}</span> </p>
                <p class="" style="margin:0px; padding:5px;">
                    <span class="btn btn-default btn-xs strHdBd2" style="border-radius: 15px; color:lightblue; border:none; padding:2.5px; font-size:11.5px;">
                        <span style="padding:2.5px;"> <strong id="${ids.applTiesLen}"></strong> <i class="sub_h" style="font-size:10px;">threads</i> </span> 
                    </span>
                </p>
                <div style="width:100%; height:35px;">
                    <img id="${ids.opnRead}" src="assets/imgs/read.png" alt="" width="20px" height="20px" style="margin:5px; float:left; cursor:pointer; display:none;">
                    <img id="${ids.opnTied}" src="assets/imgs/frnds.png" alt="" width="25px" height="20px" style="margin:5px; float:left; cursor:pointer; display:none;">
                    <img id="${ids.shrPstStr}" src="assets/imgs/share.png" alt="" width="20px" height="20px" style="margin:5px; float:left; cursor:pointer;">
                </div>
                <!-- string body area bellow -->
                <div class="postBodyCon" id="${ids.readBody}" style="width:98%; margin:auto; height:200px; border-radius:5px; padding-bottom:5px; display:none;">
                    <div style="width:100%; height:170px; overflow-y:auto;">
                        <p class="postBodtxt" style="margin:5px; font-size:13px; white-space: pre-wrap;">${data.body}</p>
                    </div>
                    <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                        <p id="${ids.clsRead}" style="margin:2px; text-align:center; cursor:pointer;">
                            <img src="assets/imgs/up.png" width="20px" height="10px">
                        </p>
                    </div>
                </div>
                <!-- tied area -->
                <div class="postBodyCon" id="${ids.tiedBod}" style="width:98%; margin:auto; height:200px; border-radius:5px; padding-bottom:5px; display:none;">
                    <div style="width:100%; height:170px; overflow-y:auto;">
                        <span id="${ids.tiedFlow}"></span>
                    </div>
                    <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                        <p id="${ids.clsTied}" style="margin:1px; text-align:center; cursor:pointer;">
                            <img src="assets/imgs/up.png" width="20px" height="10px">
                        </p>
                    </div>
                </div>
                <!-- share content area -->
                <div class="postBodyCon" id="${ids.shrPstBdStr}" style="width:98%; margin:auto; height:240px; border-radius:5px; padding-bottom:5px; display:none;">
                    <div class="srchCon" style="width:100%; height:30px; overflow-y:auto;">
                        <p id="" style="margin:3.5px; text-align:center; cursor:pointer;">
                            <input id="${ids.shrPstSrchStr}" placeholder="search friends" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; width:80%; height:80%; margin:1.5px; border:none; border-radius:7.5px;" class="srchCon_tag sub_h">
                            <img src="assets/imgs/searcha.png" width="15px" height="15px" style="float:right; margin:2.5px;">
                        </p>
                    </div>
                    <div style="width:100%; height:175px; overflow-y:auto;">
                        <span id="${ids.shrPstFlwStr}"></span>
                    </div>
                    <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                        <p id="${ids.shrPstClsStr}" style="margin:2px; text-align:center; cursor:pointer;">
                            <img src="assets/imgs/up.png" width="20px" height="10px">
                        </p>
                    </div>
                </div>
                <div style="height:10px;"></div>
            </div>
            <div style="height:10px;"></div>
        </div>
          `};
        // tied body
        const tiedBody = () => {

        };

    /*
    --------------------
     FUNCTIONALITIES
    -------------------
    */

    // background effect
    const backEffct = (data, udata, tieType, strBgId) => {
        var thrAr = []; 
        thrAr[0] = {path: 'assets/imgs/cbsm.png', class: 'none'}; 
        const pushBck = (thr) => {
            var scrl = 0;
            const getCurT = () => {
                //$(`#${strBgId}`).css('opacity', `0.8`);
                if (scrl == 0) {
                    $(`#${strBgId}`).css('background-image', `${thr[scrl].path}`);
                    $(`#${strBgId}`).addClass(`${thr[scrl].class}`);
                } else {
                    $(`#${strBgId}`).css('background-image', `url(https://test-vyral.onrender.com/${thr[scrl].path})`);
                    $(`#${strBgId}`).addClass(`${thr[scrl].class}`);
                    $(`#${strBgId}`).css('background-size', 'cover');
                    setTimeout(() => {
                        //$(`#${strBgId}`).removeClass('backStrEffct');
                        if (scrl == thr.length-1) {
                            scrl = 0;
                        }else {
                            scrl+=1;
                        }
                        getCurT();
                    }, 2000);
                }
            }
            getCurT();
        };
        var thrdata = db.all_posts;
        if (thrdata) {
            for (let i = 0; i < thrdata.length; i++) {
                if (thrdata[i].tied_to == data._id && thrdata[i].img.length > 0) {
                    //$(`#${strBgId}`).addClass('backStrEffct');
                    if (thrAr.length < 4) {
                        thrAr[thrAr.length] = thrdata[i].img[0];
                    }
                }
            }
            if (thrAr.length > 1) {
                pushBck(thrAr);
            }
        }
    };

    // piv/pub look
    const pubPriv = (data, udata, tieType, user, strHeadId, strNameId, opnRead, opnTied) => {
        if (data.type == 'Private') {
            $(`#${strNameId}`).css('display', 'none');
        }else {
            $(`#${strHeadId}, #${opnRead}, #${opnTied}`).css('display', 'none');
        }
    };

   // open edtr
   const edtStrSm = (data, udata, edtId, clsedtId, edtBodyId, nw) => {
        // edit String
        const edtStrBod = (ids) => {
         return `
         <div class="col-xs-12" style="bottom:0; right:0; position:fixed; z-index:${global.pop_no+100};">
            <div id="edtStrBod" class="edtAlrBod" style="margin-bottom:10px; border-radius:10px; display:none;">
                <div style="width:100%; height:40px;">
                    <p style="margin:0px; padding:5px; text-align:center;">
                        <img src="assets/imgs/can.png" width="15px" height="15px" id="clsEdtStr">
                    </p>
                </div>
                <div class="doneLertDiv" style="width:100%; overflow-y:auto;" id="">
                    <br>
                    
                    <div class="edtSTrBOds" style="width:100%; height:320px; overflow-y:auto;" id="">
     
                        <div id="ownStrEdtHd" style="width:100%; height:45px;">
                            <div id="${ids.mainEdt}" style="margin:5px; width:120px; height:25px; float:left; cursor:pointer; display:none;">
                                <p class="sub_h" style="margin:0px; padding:5px; text-align:center; font-size:13px;">Edit string</p>
                            </div>
                            <div id="${ids.addThrEdt}" style="margin:5px; width:120px; height:25px; float:left; cursor:pointer; display:none;">
                                <p class="sub_h" style="margin:0px; padding:5px; text-align:center; font-size:13px;">Add thread</p>
                            </div>
                        </div>

                        <div id="${ids.strBodEdt}" style="display:none;">
                            <input maxlength="100" id="${ids.inEdtStr}" class="posterClosecon_edt sub_h" value="${data.head}" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="string head" />
                            <br>
                            <textarea id="${ids.txtEdtStr}" class="commentInput sub_h" style="height:60px; margin:10px; width:90%; border-radius:5px;" placeholder="body">${data.body}</textarea>
                        </div>

                        <div id="${ids.thrAddr}" style="display:none;">
                            <input maxlength="100" id="${ids.thrHdAdd}" class="posterClosecon_edt" style="border:none; width:90%; margin:10px; background-color:transparent; color:darkorange;" placeholder="string head" />
                            <br>
                            
                            <div id="binTypeChse" style="width:80%; margin:auto;">
                                <div style="margin-top:10px; width:180px; margin:auto; ">
                                    <img src="assets/imgs/imgtype.png" width="70px" height="80px" style="cursor:pointer; margin:5px; float:left;" id="${ids.hitImgAddThr}">
                                    <img src="assets/imgs/vids.png" width="70px" height="80px" style="cursor:pointer; margin:5px; float:right;" id="${ids.hitVidAddThr}">
                                </div>
                            </div>
                            <!-- img reviewer -->
                            <div class="row scrlimgCon" id="scrlimgCon-addThr" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                                <div class="closeImgFlwCon" id="closeImgFlwCon-addThr" style="width:98%; height:25px; margin:auto;">
                                    <p style="text-align:center; color:orangered; margin:5px;">cancel</p>
                                </div>
                                <br>
                                <span id="flowHangerFltrd-addThr"></span>
                            </div>
                            <!-- vid reviewer -->
                            <div class="row scrlimgCon" id="scrlvidCon-addThr" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                                <div class="closeImgFlwCon" id="closeVidFlwCon-addThr" style="width:98%; height:25px; margin:auto;">
                                        <p style="text-align:center; color:orangered; margin:5px;">cancel</p>
                                </div>
                                <br>
                                <span id="flowHangerFltrd-vid-addThr"></span>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="doneLertDiv" id="plcEdtStrBtns" style="width:100%; height:40px;">
                    
                </div>
            </div>
        </div>
                          
                          
             `
         };
         const  edtStrBtns = (ids) => {
             return `
            <p id="${ids.dnEdtStr}" class="edtSTrBOds" style="text-align:center; margin:8px; display:none;"> <button class="btn btn-default btn-xs" style="border-radius:5px; border:solid 1px darkorange; background-color:transparent; color:orange;" id="">edit string</button> </p>
            <p id="${ids.dnEdtThr}" class="edtSTrBOds" style="text-align:center; margin:8px; display:none;"> <button class="btn btn-default btn-xs" style="border-radius:5px; border:solid 1px darkorange; background-color:transparent; color:orange;" id="">done</button> </p>
             `
         };
       if (data.type == 'Private') {
           if (data.user == udata._id) {
                $(`#${edtId}`).css('display', 'block');
           }else {
               if (data.tied.length > 0) {
                   for (let i = 0; i < data.tied.length; i++) {
                        if (data.tied[i] == udata._id) {
                            $(`#${edtId}`).css('display', 'block');
                        }
                   }
               }
           }
       }else {
           $(`#${edtId}`).css('display', 'block');
       }
       // init
       $(`#${edtId}`).click(()=>{
            $('#allAlerts').fadeIn();
            $('#container-body').css('filter', 'blur(5px)');
            dispEdtr();
       });

       // check values
        const prvOrpub = (mainEdt, addThrEdt, strBodEdt, thrAddr, dnEdtStr, dnEdtThr) => {
            if (data.type == 'Private') {
                if (data.user == udata._id) {
                    $(`#${mainEdt}, #${addThrEdt}, #${strBodEdt}, #${dnEdtStr}`).css('display', 'block');
                    $(`#${mainEdt}`).css('border-bottom', 'solid 1px skyblue');
                    $(`#${thrAddr}, #${dnEdtThr}`).css('display', 'none');
                }else {
                    $(`#${addThrEdt}, #${thrAddr}, #${dnEdtThr}`).css('display', 'block');
                    $(`#${addThrEdt}`).css('border-bottom', 'solid 1px skyblue');
                    $(`#${strBodEdt}, #${dnEdtStr}`).css('display', 'none');
                }
            }else {
                $(`#${addThrEdt}, #${thrAddr}, #${dnEdtThr}`).css('display', 'block');
                $(`#${mainEdt}, #${strBodEdt}, #${dnEdtStr}`).css('display', 'none');
                $(`#${addThrEdt}`).css('border-bottom', 'solid 1px skyblue');
            }

            // btns
            $(`#${mainEdt}`).click(()=>{
                $(`#${mainEdt}`).css('border-bottom', 'solid 1px skyblue');
                $(`#${addThrEdt}`).css('border-bottom', '');
                $(`#${thrAddr}, #${dnEdtThr}`).css('display', 'none');
                $(`#${strBodEdt}, #${dnEdtStr}`).fadeIn();
            });
            $(`#${addThrEdt}`).click(()=>{
                $(`#${addThrEdt}`).css('border-bottom', 'solid 1px skyblue');
                $(`#${mainEdt}`).css('border-bottom', '');
                $(`#${strBodEdt}, #${dnEdtStr}`).css('display', 'none');
                $(`#${thrAddr}, #${dnEdtThr}`).fadeIn();
            });

        };
        // bins
        const binContrl = (hitImgAddThr, hitVidAddThr) => {
            // img
            $(`#${hitImgAddThr}`).click(()=>{
                $('#postEdtStrImage').click();
            });
            
            // vid
            $(`#${hitVidAddThr}`).click(()=>{
                $('#postVideo-add-thr').click();
            });
            
        };
        // dones
        const doning = (dnEdtStr, dnEdtThr, inEdtStr, txtEdtStr, thrHdAdd) => {

            $(`#${dnEdtStr}`).click(()=>{
                if ($(`#${inEdtStr}`).val() !== '') {
                    var pData = {
                        section: 'str_thr',
                        type: 'updt_str',
                        id: data._id,
                        head: $(`#${inEdtStr}`).val(), 
                        body: $(`#${txtEdtStr}`).val()
                    };
                    postData(pData);
                }else {
                    alert('insert heading for strings!');
                }
            });

            // check binary values
            $(`#${dnEdtThr}`).click(()=>{
                // check img
                var testI = global.img_hangLen;
                if (testI > 0) {
                    var testar = [];
                    for (let i = 0; i < testI; i++) {
                        testar[i] = `imgHangerFltrd-add-thr${i}`;
                    }
                    for (let i = 0; i < testI; i++) {
                        var tter = testar[i];
                        global.edt_imgs[i].class = $(`#${tter}`).attr('class');
                    }
                    if (testI > 0) {
                        var tpe = 'img';
                        pushDwn(testI, global.edt_imgs, tpe);
                    }
                }
                // check vid
                var test = global.vid_hangLen;
                if (test > 0) {
                    var testar = [];
                    for (let i = 0; i < test; i++) {
                        testar[i] = `vidHangerFltrd-addThr${i}`;
                    }
                    for (let i = 0; i < test; i++) {
                        var tter = testar[i];
                        global.edt_vids[i].class = $(`#${tter}`).attr('class');
                    }
                    if (test > 0) {
                        var tpe = 'vid';
                        pushDwn(test, global.edt_vids, tpe);
                    }
                }
            });

            const pushDwn = (test, encount, tpe) => {
                var tie = ''; var tieT = '';
                if (data.type == 'Public') {
                    tie = 'publicTieMob'; tieT = 'tied_public';
                }else {
                    tie = 'privateTieMob'; tieT = 'tied_private';
                }
                if (test > 0 && encount.length > 0) {
                    if ($(`#${thrHdAdd}`).val() !== '') {
                        if (tpe == 'img') {
                            var pData = {
                                section: 'creator',
                                type: 'crt_thr',
                                tie: tie,
                                add: {type: `${tieT}`, act: 'img', tied_to: data._id, user: udata._id, head: $(`#${thrHdAdd}`).val(), img: encount, vid: [], date: [year, day, month, hour, minute], comments: [], likedBy: []}
                            };
                            postData(pData);
                        }
                        if (tpe == 'vid') {
                            var pData = {
                                section: 'creator',
                                type: 'crt_thr',
                                tie: tie,
                                add: {type: `${tieT}`, act: 'vid', tied_to: data._id, user: udata._id, head: $(`#${thrHdAdd}`).val(), img: [], vid: encount, date: [year, day, month, hour, minute], comments: [], likedBy: []}
                            };
                            postData(pData);
                        }
                    } else {
                        alert('include heading for thread!');
                    }
                }else {

                }
            };

        };
       // crt edt IDS
        const crtEdtStr = () => {
           return {
               // navs
               mainEdt: 'mainEdt_' + data._id,
               addThrEdt: 'addThrEdt_' + data._id,
               // bodies
               strBodEdt: 'strBodEdt_' + data._id,
               thrAddr: 'thrAddr_' + data._id,
               // inputs
               inEdtStr: 'inEdtStr_' + data._id,
               txtEdtStr: 'txtEdtStr_' + data._id,
               thrHdAdd: 'thrHdAdd_' + data._id,
               // binaries
               hitImgAddThr: 'hitImgAddThr_' + data._id,
               hitVidAddThr: 'hitVidAddThr_' + data._id,
               // dones
               dnEdtStr: 'dnEdtStr_' + data._id,
               dnEdtThr: 'dnEdtThr_' + data._id,
           }
        }
        // display edtStr
        const dispEdtr = () => {
            const ids = crtEdtStr();
            checkMode();
            $('#allAlerts').before(edtStrBod(ids));
            $('#plcEdtStrBtns').append(edtStrBtns(ids));
            setTimeout(() => {
                if (udata.mode == 'light') {
                    $('.srchCon').css('border-bottom', 'solid 1px #f0f0f0');
                    $('.edtThrTxt').css('border', 'solid 1px #f0f0f0');
                    $('#alertBody, .edtAlrBod').css('background-color', 'white');
                    $('#doneLertDiv, .doneLertDiv').css('border-top', 'solid 1px #dddddd');
                    $('#alertText').css('color', 'grey');
                }else {
                    $('.srchCon').css('border-bottom', 'solid 1px #404040');
                    $('.edtThrTxt').css('border', 'solid 1px #f0f0f0');
                    $('#alertBody, .edtAlrBod').css('background-color', '#262626');
                    $('#doneLertDiv, .doneLertDiv').css('border-top', 'solid 1px #404040');
                    $('#alertText').css('color', '#f9f9f9');
                }
                $('#edtStrBod').fadeIn();
                checkMode(); Dark();
            }, 1);
            prvOrpub(ids.mainEdt, ids.addThrEdt, ids.strBodEdt, ids.thrAddr, ids.dnEdtStr, ids.dnEdtThr);
            // binares
            binContrl(ids.hitImgAddThr, ids.hitVidAddThr);
            // dones
            doning(ids.dnEdtStr, ids.dnEdtThr, ids.inEdtStr, ids.txtEdtStr, ids.thrHdAdd);
            // can img edt
            $('#closeImgFlwCon-addThr').click(()=>{
                $(`.allImgs_app`).remove();
                $('#scrlimgCon-addThr').slideUp(100);
                $('#binTypeChse').slideDown(200);
            });
            $('#closeVidFlwCon-addThr').click(()=>{
                $(`.allVids_aedt`).remove();
                $('#scrlvidCon-addThr').slideUp(100);
                $('#binTypeChse').slideDown(200);
            });
            // close con
            $('#clsEdtStr').click(()=>{
                $(`#edtStrBod`).remove();
                $('#allAlerts').fadeOut();
                $('#container-body').css('filter', '');
            });
        };
        // border-bottom:solid 1px skyblue;
    };

    // open bigBody
    // pass str
    var passStr = (data4, udata) => {
        var thrdata = db.all_posts;
        if (thrdata) {
            $('#drp-ex-ps').append(loadin());
            displayView(thrdata, data4, udata);
        }
    };
    const collectStr = () => {
        var accDat = global.src_str.accssAtt;
        if (accDat == 'No') {
            checkVal();
        }else {
            var mainDat = global.src_str.attCh;
            var data4 = db.all_posts.find(i => i._id == mainDat);
            passStr(data4, udata);
            global.src_str.accssAtt = 'No';
            checkVal();
        }
    };
    var checkVal = () => {
            var targetDate = new Date();
            targetDate.setSeconds(targetDate.getSeconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    collectStr();
                    clearInterval(x);
                }
            });
    };
    checkVal();
    var loadin = () => {
        return `
        <div class="col-xs-12 b5_exP" style="position:fixed; z-index:4; background-color:#1a1a1a; opacity:0.4; height:100%;"></div>
        `
    };
    const openBgBdy = (data, udata, tieType, user, viewId) => {
        $(`#${viewId}`).click(()=>{
            // assignDb();
            var thrdata = db.all_posts;
            if (thrdata) {
                $('#drp-ex-ps').append(loadin());
                displayView(thrdata, data, udata);
            }
            //$('#container-one').css('display', 'none');
            // $('#dropChat').after(ViewStr(data));
        });
    };

    // read body
    const readBod = (data, udata, tieType, user, opnRead, readBody, clsRead) => {
        $(`#${opnRead}`).css('display', 'block');
        $(`#${opnRead}`).click(()=>{
            $(`#${opnRead}`).attr('src', 'assets/imgs/readen.png');
            $(`#${readBody}`).slideDown(200);
        });
        $(`#${clsRead}`).click(()=>{
            $(`#${readBody}`).slideUp(100);
        });
    };

    // check friends tied
    const chckTied = (data, udata, tieType, user, opnTied, clsTied, tiedBod, tiedFlow) => {
        $(`#${opnTied}`).css('display', 'block');
        $(`#${opnTied}`).click(()=>{
            // assignDb();
            $(`#${tiedBod}`).slideDown(200);
            var users = db.users;
            //$('.checkTiedBod').css('display', 'none');
            if (users) {
                for (let z = 0; z < data.tied.length; z++) {
                    var user = ''; var usr = ''; var id = ''; var usrI = '';
                    for (let i = 0; i < users.length; i++) {
                        if (data.tied[z] == users[i]._id) {
                            usr = users[i].user_name; id = users[i]._id; usrI = users[i];
                        }
                    }
                    if (usr.length > 15) {
                        user = usr.slice(0, 15)+'..';
                    }else {
                        user = usr;
                    }
                    $(`#${tiedFlow}`).prepend(`
                        <div class="checkTiedBod" id="opn_usr-lst_str_${id}" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                            <div style="width:30%; height:100%; float:left;">
                                <div style="width:33px; height:33px; margin:auto; background-image:url(assets/imgs/profb.png); background-size:100% 100%; border-radius:100%; margin-top:3px;"></div>
                            </div>
                            <div style="width:50%; height:100%; float:left;">
                                <p class="sub_h" style="padding:5px; margin:5px;">${user}</p>
                            </div>
                            <div style="width:20%; height:100%; float:right;">
                                
                            </div>
                        </div>
                    `);
                    if(udata.mode == 'light') {
                        $('.checkTiedBod').css('border', 'solid 1px #dddddd');
                        $('.checkTiedBod').css('background-color', 'white');
                    }else {
                        $('.checkTiedBod').css('border', 'solid 1px #404040');
                        $('.checkTiedBod').css('background-color', '#1a1a1a');
                    }
                    idExFunc(id, udata, `opn_usr-lst_str_${id}`);
                    Dark();
                }
            
            }
        });
        $(`#${clsTied}`).click(()=>{
            $(`#${tiedBod}`).slideUp(100);
        });
    };

    const stringOpt = (data, udata, tieType, user, opnOpt, optBody, clsOpt) => {
        $(`#${opnOpt}`).click(()=>{
            $(`#${optBody}`).slideDown(200);
            /*if (data.type == 'Private') {
                if (data.user == udata._id) {
                    $()
                }else {

                }
            }else {

            }*/
        });
        // close
        $(`#${clsOpt}`).click(()=>{
            $(`#${optBody}`).slideUp(100);
        });
    };

    // del
    const delStr = (data, uin, tieType, user, delStrId, delStrBod, delStrY, delStrN) => {

        if (uin._id !== data.user) {
            $(`#${delStrId}`).css('display', 'none');
        }
        if (data.type == 'Public') {
            $(`#${delStrId}`).css('display', 'none');
        }

        // opn
        $(`#${delStrId}`).click(()=>{
            $(`#${delStrId}`).slideUp(100);
            $(`#${delStrBod}`).slideDown(200);
        });
        // cls
        $(`#${delStrN}`).click(()=>{
            $(`#${delStrBod}`).slideUp(100)
            $(`#${delStrId}`).slideDown(200)
        });
        // del
        $(`#${delStrY}`).click(()=>{
            var thrdata = db.all_posts;
            for (let i = 0; i < thrdata.length; i++) {
                if (thrdata[i].tied_to == data._id) {
                    delThis(thrdata[i]._id);
                }                    
            }
            // del main str
            setTimeout(() => {
                var pData = {
                    section: 'str_thr',
                    type: 'del_str',
                    id: data._id,
                };
                postData(pData);
            }, 500);
        });
        // del thrds
        const delThis = (thr) => {
            var pData = {
                section: 'str_thr',
                type: 'del_thr',
                id: thr,
            };
            postData(pData);
        };

    };

    // rep
    const repStr = (data, uin, tieType, user, repStrId, repStrConId, inApRepStr, abusRepStr, clsRepStr) => {

        if (uin._id == data.user) {
            $(`#${repStrId}`).css('display', 'none');
        }
        if (data.type == 'Public') {
            $(`#${repStrId}`).css('display', 'block');
        }

        // opn/cls
        $(`#${repStrId}`).click(()=>{
            $(`#${repStrId}`).slideUp(100);
            $(`#${repStrConId}`).slideDown(200);
        });
        $(`#${repStrConId}`).click(()=>{
            $(`#${repStrConId}`).slideUp(100);
            $(`#${repStrId}`).slideDown(200);
        });
        
        // snd inap
        $(`#${inApRepStr}`).click(()=>{
            var con = 'Inappropriate contents'; 
            pushRep(con);
        });
        // snd abus
        $(`#${abusRepStr}`).click(()=>{
            var con = 'Abusive contents'; 
            pushRep(con);
        });
 
         // report func
        const pushRep = (con) => {
 
            var nme = '';
            if (data.type == 'User') {
                nme = data.user;
            }else {
                nme = data.mail;
            }
            var pData = {
                section: 'str_thr',
                type: 'report_str',
                user: udata._id,
                post: data._id,
                con: con,
                name: nme,
            };
            postData(pData);
            setTimeout(() => {
                $('#alertText').text('report sent');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
                $(`#${repStrConId}`).slideUp(100);
                $(`#${repStrId}`).slideDown(200);
            }, 1);
        
        }

    };

    // aply thr len
    const applLenThr = (data, udata, applTiesLen) => {
        var thrdata = all_scr.thr;
        var appLen = 0;
        for (let i = 0; i < thrdata.length; i++) {
            if (thrdata[i].thread.tied_to == data._id) {
                appLen++;
            }
        }
        $(`#${applTiesLen}`).text(appLen);
    };

    // create ids
    const createIds = (data, tieType) => {
        return {
            strBody: 'strBody_' + data._id+`_${tieType}`,
            // go to profile
            gotoProf: 'gotoProf_' + data._id,
            // date
            strDate: 'strDate_' + data._id,
            // thr len
            applTiesLen: 'applTiesLen_' + data._id,
            // add contents
            edtId: 'edtId_' + data._id,
            edtBodyId: 'edtBodyId_' + data._id,
            clsedtId: 'clsedtId_' + data._id,
            // option section
            opnOpt: 'opnOpt_' + data._id,
            optBody: 'optBody_' + data._id,
            clsOpt: 'clsOpt_' + data._id,
            // background-
            strBgId: 'strBgId' + data._id,
            // read
            opnRead: 'opnRead_' + data._id,
            readBody: 'readBody_' + data._id,
            clsRead: 'clsRead_' + data._id,
            // pub/priv
            strHeadId: 'strHeadId_' + data._id,
            strNameId: 'strNameId_' + data._id,
            // del str
            delStrId: 'delStrId_' + data._id, 
            delStrBod: 'delStrBod_' + data._id, 
            delStrY: 'delStrY_' + data._id, 
            delStrN: 'delStrN_' + data._id,
            // report
            repStrId: 'repStrId_' + data._id,
            repStrConId: 'repStrConId_' + data._id,
            inApRepStr: 'inApRepStr_' + data._id,
            abusRepStr: 'abusRepStr_' + data._id,
            clsRepStr: 'clsRepStr_' + data._id,
            // tied
            opnTied: 'opnTied_' + data._id,
            clsTied: 'clsTied_' + data._id,
            tiedBod: 'tiedBod_' + data._id,
            tiedFlow: 'tiedFlow_' + data._id,
            // share ids
            shrPstStr: 'shrPstStr_' + data._id,
            shrPstBdStr: 'shrPstBdStr_' + data._id,
            shrPstSrchStr: 'shrPstSrchStr_' + data._id,
            shrPstFlwStr: 'shrPstFlwStr_' + data._id,
            shrPstClsStr: 'shrPstClsStr_' + data._id
        }
    };

    // display strings console
    const displayStrings = (data, udata, tieType, users, chk) => {
        const ids = createIds(data, tieType);
        var user = ''; var usr = ''; var fpath = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (data.user == users[i]._id) {
                    usr = users[i].user_name;
                    fpath = users[i];
                }
            }
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
        }
        if (tieType == 'Friend') {
            var val = `${user} created a string`;
            $('#dropbox-str-main').prepend(privString(data, udata, user, val, fpath, ids));
        } else {
            var difH = '';
            if (udata._id == udata._id) {
                difH = 'You';    
            }else {
                difH = udata.user_name;
            }
            if (tieType == 'Own') {
                var val = `${difH} Created a string`;
                if (data.type == 'Public') {
                    if (chk == 'hme') {
                        $('#dropbox-str-main').prepend(privString(data, udata, user, val, fpath, ids));
                    }
                    if (chk == 'prf') {
                        $('#dropbox-str').prepend(privString(data, udata, user, val, fpath, ids));
                    }
                }else {
                    if (chk == 'hme') {
                        $('#dropbox-str-main').prepend(privString(data, udata, user, val, fpath, ids));
                    }
                    if (chk == 'prf') {
                        $('#dropbox-str').prepend(privString(data, udata, user, val, fpath, ids));
                    }
                }
            }else {
                if (tieType == 'explore_str') {
                    var val = `${difH} are tied to a string`;
                    $('#dropbox-strindexexp').prepend(privString(data, udata, user, val, fpath, ids)); 
                } else {
                    var val = `${difH} are tied to a string`;
                    $('#dropbox-str, #dropbox-strex').prepend(privString(data, udata, user, val, fpath, ids));
                }
            }
            if (data.type == 'Private' && data.tied.length > 0) {
                chckTied(data, udata, tieType, user, ids.opnTied, ids.clsTied, ids.tiedBod, ids.tiedFlow);
            }
            if (data.body !== '') {
                readBod(data, udata, tieType, user, ids.opnRead, ids.readBody, ids.clsRead);
            }
        }
        Dark();
        checkMode();
        // back-big-effect
        backEffct(data, udata, tieType, ids.strBgId);
        // date
        smartDate(data, ids.strDate);
        // aplly thr len
        applLenThr(data, udata, ids.applTiesLen);
        // pub/priv look
        pubPriv(data, udata, tieType, user, ids.strHeadId, ids.strNameId, ids.opnRead, ids.opnTied);
        // edt str
        var nw = 'sm';
        edtStrSm(data, udata, ids.edtId, ids.clsedtId, ids.edtBodyId, nw);
        // opt area
        stringOpt(data, udata, tieType, user, ids.opnOpt, ids.optBody, ids.clsOpt);
        // delete str
        delStr(data, udata, tieType, user, ids.delStrId, ids.delStrBod, ids.delStrY, ids.delStrN);
        // rep
        repStr(data, udata, tieType, user, ids.repStrId, ids.repStrConId, ids.inApRepStr, ids.abusRepStr, ids.clsRepStr);
        // share funcs
        var tg = 'shr_str';
        sharePst(data, udata, ids.shrPstStr, ids.shrPstBdStr, ids.shrPstSrchStr, ids.shrPstFlwStr, ids.shrPstClsStr, tg);
        // display view
        openBgBdy(data, udata, tieType, user, ids.strBgId);
        // open profile
        idExFunc(data.user, udata, ids.gotoProf);
    }
    // drop ex
    const displayExStrings = (data, udata, me, tieType, users, drop) => {
        const ids = createIds(data, tieType);
        var user = ''; var usr = ''; var fpath = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (data.user == users[i]._id) {
                    usr = users[i].user_name;
                fpath = users[i];
                }
            }
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
        }
        var difH = '';
        if (udata._id == me._id) {
            difH = 'You';    
        }else {
            difH = udata.user_name;
        }
        
        if (tieType == 'Own') {
            var val = `${difH} Created a string`;
            if (data.type == 'Public') {
                $(`#${drop}`).append(privString(data, udata, user, val, fpath, ids));
            }else {
                $(`#${drop}`).append(privString(data, udata, user, val, fpath, ids));
            }
        }else {
            var val = `${difH} are tied to a string`;
            $(`#${drop}`).append(privString(data, udata, user, val, fpath, ids));
        }
        if (data.type == 'Private' && data.tied.length > 0) {
            chckTied(data, udata, tieType, user, ids.opnTied, ids.clsTied, ids.tiedBod, ids.tiedFlow);
        }
        if (data.body !== '') {
            readBod(data, udata, tieType, user, ids.opnRead, ids.readBody, ids.clsRead);
        }
        Dark();
        checkMode();
        // back-big-effect
        backEffct(data, udata, tieType, ids.strBgId);
        // date
        smartDate(data, ids.strDate);
        // aplly thr len
        applLenThr(data, udata, ids.applTiesLen);
        // pub/priv look
        pubPriv(data, udata, tieType, user, ids.strHeadId, ids.strNameId, ids.opnRead, ids.opnTied);
        // edt str
        var nw = 'sm';
        edtStrSm(data, udata, ids.edtId, ids.clsedtId, ids.edtBodyId, nw);
        // opt area
        stringOpt(data, udata, tieType, user, ids.opnOpt, ids.optBody, ids.clsOpt);
        // delete str
        delStr(data, udata, tieType, user, ids.delStrId, ids.delStrBod, ids.delStrY, ids.delStrN);
        // rep
        repStr(data, udata, tieType, user, ids.repStrId, ids.repStrConId, ids.inApRepStr, ids.abusRepStr, ids.clsRepStr);
        // share funcs
        var tg = 'shr_str';
        sharePst(data, udata, ids.shrPstStr, ids.shrPstBdStr, ids.shrPstSrchStr, ids.shrPstFlwStr, ids.shrPstClsStr, tg);
        // display view
        openBgBdy(data, udata, tieType, user, ids.strBgId);
        // go to profile
        idExFunc(data.user, me, ids.gotoProf);
    };
    // review disp str
    const displayStrReviews = (data, udata, tieType, type) => {
        const ids = createIds(data, tieType);
        var users = db.users;
        var user = ''; var usr = ''; var fpath = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (data.user == users[i]._id) {
                    usr = users[i].user_name;
                    fpath = users[i];
                }
            }
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
        }
        extractU();
        var uin = udata;
        if (type == 'tie_string') {
            $('#revPresNote').text('You have been tied to a string');
            $('#drp-like-tag-rev-bod').fadeIn();
        }
        if (type == 'shr_str') {
            $('#revPresNote').text('shared with you a string');
            $('#drp-like-tag-rev-bod').fadeIn();
        }
        if (tieType == 'Friend') {
            var val = `${user} created a string`;
            $('#droprev-lktg').prepend(privString(data, udata, user, val, fpath, ids));
        } else {
            var difH = '';
            if (uin._id == udata._id) {
                difH = 'You';    
            }else {
                difH = udata.user_name;
            }
            if (tieType == 'Own') {
                var val = `${difH} Created a string`;
                if (data.type == 'Public') {
                    $('#droprev-lktg').prepend(privString(data, udata, user, val, fpath, ids));
                }else {
                    $('#droprev-lktg').prepend(privString(data, udata, user, val, fpath, ids));
                }
            }else {
                var val = `${difH} are tied to a string`;
                //$('#droprev-lktg').prepend(privString(data, udata, user, val, fpath, ids));
            }
            if (data.type == 'Private' && data.tied.length > 0) {
                chckTied(data, udata, tieType, user, ids.opnTied, ids.clsTied, ids.tiedBod, ids.tiedFlow);
            }
            if (data.body !== '') {
                readBod(data, udata, tieType, user, ids.opnRead, ids.readBody, ids.clsRead);
            }
        }
        checkMode();
        Dark();
        // back-big-effect
        backEffct(data, udata, tieType, ids.strBgId);
        // date
        smartDate(data, ids.strDate);
        // aplly thr len
        applLenThr(data, udata, ids.applTiesLen);
        // pub/priv look
        pubPriv(data, uin, tieType, user, ids.strHeadId, ids.strNameId, ids.opnRead, ids.opnTied);
        // edt str
        var nw = 'sm';
        edtStrSm(data, uin, ids.edtId, ids.clsedtId, ids.edtBodyId, nw);
        // opt area
        stringOpt(data, uin, tieType, user, ids.opnOpt, ids.optBody, ids.clsOpt);
        // delete str
        delStr(data, uin, tieType, user, ids.delStrId, ids.delStrBod, ids.delStrY, ids.delStrN);
        // rep
        repStr(data, uin, tieType, user, ids.repStrId, ids.repStrConId, ids.inApRepStr, ids.abusRepStr, ids.clsRepStr);
        // share funcs
        var tg = 'shr_str';
        sharePst(data, udata, ids.shrPstStr, ids.shrPstBdStr, ids.shrPstSrchStr, ids.shrPstFlwStr, ids.shrPstClsStr, tg);
        // display view
        openBgBdy(data, uin, tieType, user, ids.strBgId);
        // open profile
        idExFunc(data.user, udata, ids.gotoProf);
        
    };

    /**
     * ---------------------------------------
     * DISPLAY THREAD AS REFERENCE FROM STRING
     * ---------------------------------------
     */

    // thread body
    const viewThread = (thrdata, udata, fpath, user, ids) => {
        var path = ''; var clas = '';
        if (fpath.profile_pic == 'none') {
            path = 'assets/imgs/profpic.png'; clas = 'none';
        }else {
            path = `https://test-vyral.onrender.com/${fpath.profile_pic.path}`; clas = `${fpath.profile_pic.class}`;
            preloadImgs(`https://test-vyral.onrender.com/${fpath.profile_pic.path}`, ids.images);
        }
        return `
        <div class="privThrBod" id="${ids.thrBody}" style="width:100%;">
            <p class="sub_h" style="padding:8px; margin:0px; font-size:13px;"><span id="${ids.noteOne}"></span><i style="font-size:11.5px;"> attached a thread to string </i> <strong style="font-size:10px;">. <span id="${ids.thrDate}"></span></strong></p>
            <div class="strHdBd" style="width:95%; margin:auto; border-radius:5px; margin-bottom:15px;">
                <!-- for general threads viewer -->
                <div id="strop" class="" style="width:100%; margin:auto; cursor:pointer; background-size:100% 100%; border-top-right-radius: 7.5px; border-top-left-radius: 7.5px;">
                    <img src="assets/imgs/emptimg.png"" alt="" width="100%" style="border-top-right-radius: 7.5px; border-top-left-radius: 7.5px; display:none;" id="${ids.images}">
                    <video src="" alt="" poster="assets/imgs/emptback.png" width="100%" style="border-top-right-radius: 7.5px; border-top-left-radius: 7.5px; display:none;" id="${ids.vidBod}"></video>
                </div>
                <!-- IMG CONTROLLER -->
                <div class="postInfoCon" id="${ids.imgThrCnt}" style="width:100%; height:45px; display:none;">
                    <div style="width:30%; height:100%; float:left;">
                        <img id="${ids.bckImg}" src="assets/imgs/backa.png" width="15px" height="35px" style="margin:5px; cursor:pointer; float:left;">
                    </div>
                    <div style="width:40%; height:100%; float:left;">
                        <p style="text-align:center; margin:10px; color:darkorange;"> <span id="${ids.curntImg}" style="font-size:15px;"></span> <i class="sub_h" style="font-size:11px;">/<span id="${ids.imgLen}"></span></i> </p>
                    </div>
                    <div style="width:30%; height:100%; float:right;">
                        <img id="${ids.fwdImg}" src="assets/imgs/backb.png" width="15px" height="35px" style="margin:5px; cursor:pointer; float:right;">
                    </div>
                </div>
                <!-- video controls -->
                <div id="${ids.vidCntrlDiv}" class="postInfoCon" style="height:30px; width:100%; display:none;">
                    <img id="${ids.vidPlay}" src="assets/imgs/playn.png" width="17.5px" height="17.5px" style="margin:5px; float:left; cursor:pointer;">
                    <img id="${ids.vidPause}" src="assets/imgs/pausen.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;">
                    <!-- <img id="${ids.vidStop}" src="assets/imgs/stopy.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;"> -->
                    <img id="${ids.vidMute}" src="assets/imgs/muten.png" width="15px" height="15px" style="margin:7.5px; float:right; cursor:pointer;">
                    <p class="sub_h" style="float:right; margin:5px; font-size:13px;"> <span id="${ids.vidCrntT}" style="font-size:12.5px; color:orange;"></span>/<span class="sub_h" id="${ids.vidOrgT}" style="font-size:10px;"></span> </p>    
                </div>
                <p class="postHeaderfrstStr" style="padding:7.5px; color:#1a1a1a; font-size:17px; margin:0px;">${thrdata.head}</p>
                <div class="edtPstBd" id="${ids.thrOptBod}" style="width:100%; display:none;">
                    <div class="edtPstFlw" style="width:100%; height:35px;">
                        <p style="text-align:center; margin:0px; padding:1px;"><img id="${ids.clsThrOpt}" src="assets/imgs/up.png" width="25px" height="15px" style="cursor:pointer;"></p>
                    </div>
                    <!-- edt cons -->
                    <div id="${ids.edtThr}" class="edtPstFlw" style="width:100%; height:35px;">
                        <p class="sub_h" style="margin:8px; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/wada.png" width="12.5px" height="15px" style="margin-right:10px;"> Edit thread header</p>
                    </div>
                    <!-- delp cons -->
                    <div id="${ids.delThrOpn}" class="edtPstFlw" style="width:100%; height:35px;">
                        <p style="margin:8px; color:orangered; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/del.png" width="12.5px" height="15px" style="margin-right:10px;"> Delete thread</p>
                    </div>
                    <div id="${ids.delThrQ}" class="areYSPCon" style="width:100%; height:60px; display:none;">
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p class="sub_h" style="text-align:center; margin:0px; padding:5px; font-size:16.5px;"> Are you sure you want to delete post?</p>
                        </div>
                        <div style="width:100%; height:30px;">
                            <div class="yesesP" style="width:49%; float:left; height:100%; float:left;">
                                <p id="${ids.delThrY}" style="text-align:center; color:orangered; margin:5px; cursor:pointer; font-size:15px;">Yes</p>
                            </div>
                            <div style="width:49%; float:left; height:100%; float:right;">
                                <p id="${ids.delThrN}" class="sub_h" style="text-align:center; margin:5px; cursor:pointer; font-size:15px;">Cancel</p>
                            </div>
                        </div>
                    </div>
                    <!-- report cons -->
                    <div id="${ids.reprtId}" class="" style="width:100%; height:35px;">
                        <p class="sub_h" style="margin:8px; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/flag.png" width="15px" height="15px" style="margin-right:10px;"> Report post</p>
                    </div>
                    <div id="${ids.repConId}" class="areYSPCon" style="width:100%; display:none;">
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer; font-size:15px;" id="${ids.inApRep}"> Inappropriate content </p>
                        </div>
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer; font-size:15px;" id="${ids.abusRep}"> Abusive content </p>
                        </div>
                        <div class="areysPP" style="width:100%; height:30px;">
                            <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer; font-size:15px;" id="${ids.clsRep}"> cancel </p>
                        </div>
                    </div>
                </div>
                <div style="width:100%; height:35px;">
                    <div style="float:left; margin:5px;">
                        <div style="width:20px; height:20px;">
                            <img id="${ids.likeThrSm}" src="assets/imgs/like.png" alt="" width="20px" height="20px" style="cursor:pointer;"> 
                        </div>
                    </div>
                    <i id="${ids.likeByThrSm}" style="font-size:11px; color:darkorange; margin:5px; float:left;">${thrdata.likedBy.length}</i> 
                    <div style="float:left; margin:5px;">
                        <div style="width:20px; height:20px;">
                            <img id="${ids.comThrOpn}" src="assets/imgs/comment.png" alt="" width="20px" height="20px" style="cursor:pointer;"> 
                        </div>
                    </div>
                    <i id="${ids.comThrLen}" style="font-size:11px; color:darkorange; margin:5px; float:left;">${thrdata.comments.length}</i> 
                    <img id="${ids.opnThrOpt}" src="assets/imgs/opt.png" alt="" width="5px" height="20px" style="margin:5px; float:right; cursor: pointer; display:none;">
                    <img id="${ids.shrPst}" src="assets/imgs/share.png" alt="" width="20px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                </div>
                <!-- string body area bellow -->
                <div class="postBodyCon" id="" style="width:98%; margin:auto; height:200px; border-radius:5px; padding-bottom:5px; display:none;">
                    <div style="width:100%; height:170px; overflow-y:auto;">
                        <p class="postBodtxt" style="margin:5px; font-size:13px;"></p>
                    </div>
                    <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                        <p id="" style="margin:3.5px; margin-top:5px; text-align:center; cursor:pointer;">
                            <img src="assets/imgs/up.png" width="20px" height="10px">
                        </p>
                    </div>
                </div>
                <!-- comment area bellow -->
                <div class="postBodyCon" id="${ids.comThrBod}" style="width:98%; margin:auto; height:297.5px; border-radius:5px; padding-bottom:5px; display:none;">
                    <div style="width:100%; height:200px; overflow-y:auto;">
                        <span id="${ids.comThrFlow}" class="comFlow"></span>
                    </div>
                    <div class="commentIn" style="height:50px;">
                        <textarea class="commentInput" placeholder="comment" style="margin:5px; width:70%; float:left; border-radius:5px; color:darkorange;" id="${ids.comThrIn}"></textarea>
                        <img src="assets/imgs/send.png" width="35px" height="35px" style="float:left; margin:5px; cursor:pointer;" id="${ids.comThrBtn}">
                    </div>
                    <div class="closeRdCon" style="width:100%; height:46px; overflow-y:auto;">
                        <p id="${ids.closeComThr}" style="margin:1px; margin-top:2px; text-align:center; cursor:pointer;">
                            <img src="assets/imgs/up.png" width="20px" height="10px">
                        </p>
                    </div>
                </div>
                <!-- share content area -->
                <div class="postBodyCon" id="${ids.shrPstBd}" style="width:98%; margin:auto; height:240px; border-radius:5px; padding-bottom:5px; display:none;">
                    <div class="srchCon" style="width:100%; height:30px; overflow-y:auto;">
                        <p id="" style="margin:3.5px; text-align:center; cursor:pointer;">
                            <input id="${ids.shrPstSrch}" placeholder="search friends" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; width:80%; height:80%; margin:1.5px; border:none;border-radius:7.5px;" class="srchCon_tag sub_h">
                            <img src="assets/imgs/searcha.png" width="15px" height="15px" style="float:right; margin:2.5px;">
                        </p>
                    </div>
                    <div style="width:100%; height:175px; overflow-y:auto;">
                        <br>
                        <span id="${ids.shrPstFlw}"></span>
                        <br>
                    </div>
                    <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                        <p id="${ids.shrPstCls}" style="margin:2px; margin-top:3px; text-align:center; cursor:pointer;">
                            <img src="assets/imgs/up.png" width="20px" height="10px">
                        </p>
                    </div>
                </div>
                <div style="height:10px;"></div>
            </div>
            <p style="margin: 5px; text-align: center;">
                <button class="btn btn-default btn-xs viewThrBtn" style="border: solid 1px darkorange; color: orange;" id="${ids.viewStr}"> VIEW STRING </button>
            </p>
            <div style="height:10px;"></div>
        </div>
        `
    };

    // IMG Shrd revwr
    const imgRevThrImg = (ids, ind) => {
        return `
            <div class="container-fluid" id="${ids.containId}">
                <div class="row">
                    <div class="col-md-12 col-xs-12" style="position:fixed; z-index:${ind-1}; width:100%; height:100%; background-color:black; opacity:0.95;">
                    </div>
                    <div class="col-md-12 col-xs-12" style="position:fixed; z-index:${ind}; width:100%; height:100%;">
                        <div class="row" style="height:100%;">
                            <div class="col-md-12 col-xs-12" style="height:5.5%;">
                                <img src="assets/imgs/can.png" width="20px" height="20px" style="margin:7.5px; float:left; cursor:pointer;" id="${ids.closeRevedCon}">
                            </div>
                            <div class="col-md-12 col-xs-12" style="height:89%; overflow-y:auto;">
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6 col-xs-12">
                                        <span id="${ids.dispCurnt}"></span>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </div>
                            <div id="${ids.multRevBtnCon}" class="col-md-12 col-xs-12" style="height:5.5%; display:none;">
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6 col-xs-12" id="goThrSntImgs" style="display:none;">
                                        <img src="assets/imgs/backa.png" width="15px" height="20px" style="margin:2.5px; float:left; cursor:pointer;" id="${ids.prevImg}">
                                        <img src="assets/imgs/backb.png" width="15px" height="20px" style="margin:2.5px; float:right; cursor:pointer;" id="${ids.nextImg}">
                                    </div>
                                    <div class="col-md-6 col-xs-12" id="goThrSntVid" style="display:none;">
                                        <div style="height:30px; width:100%;">
                                            <img id="${ids.vidPlay_xp}" src="assets/imgs/playn.png" width="17.5px" height="17.5px" style="margin:5px; float:left; cursor:pointer;">
                                            <img id="${ids.vidPause_xp}" src="assets/imgs/pausen.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;">
                                            <!-- <img id="${ids.vidStop_xp}" src="assets/imgs/stopy.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;"> -->
                                            <img id="${ids.vidMute_xp}" src="assets/imgs/muten.png" width="15px" height="15px" style="margin:7.5px; float:right; cursor:pointer;">
                                            <p class="sub_h" style="float:right; margin:5px; font-size:13px;"> <span id="${ids.vidCrntT_xp}" style="font-size:12.5px; color:orange;"></span>/<span id="${ids.vidOrgT_xp}" class="sub_h" style="font-size:10px;"></span> </p>    
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };
    const createReThrImIds = (img) => {
        return {
            containId: `container_${img}_reviewImgThr`,
            dispCurnt: `displayCurnt_${img}_reviewImgThr`,
            // img id
            shrdImgId: `shrdImgId_${img}_reviewImgThr`,
            // imgs after click
            closeRevedCon: `closeRevedCon_${img}_reviewImgThr`,
            multRevBtnCon: `multRevBtnCon_${img}_reviewImgThr`,
            prevImg: `prevImg_${img}_reviewImgThr`,
            nextImg: `nextImg_${img}_reviewImgThr`,
            // vid id
            shrdVidId: `shrdImgId_${img}_reviewImgThr`,
            // for video
            vidPlay_xp: `vidPlay_xp_${img}_reviewImgThr`,
            vidPause_xp: `vidPause_xp_${img}_reviewImgThr`,
            vidStop_xp: `vidStop_xp_${img}_reviewImgThr`,
            vidMute_xp: `vidMute_xp_${img}_reviewImgThr`,
            vidCrntT_xp: `vidCrntT_xp_${img}_reviewImgThr`,
            vidOrgT_xp: `vidOrgT_xp_${img}_reviewImgThr`,
        }
    };

    // multi-img effect
    const multiThrImg = (thrdata, udata, user, images, imgThrCnt, curntImg, imgLen, bckImg, fwdImg) => {
        $(`#${images}`).css('display', 'block');
        $(`#${images}`).attr('src', `https://test-vyral.onrender.com/${thrdata.img[0].path}`);
        $(`#${images}`).attr('class', `${thrdata.img[0].class}`);
        var left = $(`#${bckImg}`);
        var right = $(`#${fwdImg}`);
        var num = 0;
        if (thrdata.img.length > 1) {
            $(`#${imgThrCnt}`).css('display', 'block');
            $(`#${curntImg}`).text('1');
            $(`#${imgLen}`).text(`${thrdata.img.length}`);
            // left and right func
            // check multi img func
            
            left.click(function() {
                $(`#${images}`).css('display', 'none');
                num--;
                if (num < 0) {
                    num = thrdata.img.length-1;
                }
                $(`#${images}`).attr("src", '');
                $(`#${images}`).attr("src", `https://test-vyral.onrender.com/${thrdata.img[num].path}`);
                $(`#${images}`).attr("class", thrdata.img[num].class);
                $(`#${images}`).fadeIn();
                $(`#${curntImg}`).text(num+1);
            });
            
            right.click(function() {
                $(`#${images}`).css('display', 'none');
                num++;
                if (num >= thrdata.img.length) {
                    num = 0;
                }
                $(`#${images}`).attr("src", '');
                $(`#${images}`).attr("src", `https://test-vyral.onrender.com/${thrdata.img[num].path}`);
                $(`#${images}`).attr("class", thrdata.img[num].class);
                $(`#${images}`).fadeIn();
                $(`#${curntImg}`).text(num+1);
            });

            
        }else {
            $(`#${imgThrCnt}`).css('display', 'none');
        }
        $(`#${images}`).click(()=>{
            revImgFuncs(images, global.pop_no+2, num, thrdata);
        });
    }; 
    // IMG REV FUNCS
    const opndRevImg = (data2, z, ids) => {

        //close rev
        $(`#${ids.closeRevedCon}`).click(()=>{
            $(`#${ids.containId}`).remove();
        });
        $('#goThrSntImgs').fadeIn();

        if (data2.img.length > 1) {
            var num = z;
            $(`#${ids.multRevBtnCon}`).fadeIn();
            // loop thr imgs
            $(`#${ids.nextImg}`).click(()=>{
                $(`#${ids.shrdImgId}`).css('display', 'none');
                num++;
                if (num >= data2.img.length) {
                    num = 0;
                }
                $(`#${ids.shrdImgId}`).attr("src", `https://test-vyral.onrender.com/${data2.img[num].path}`);
                $(`#${ids.shrdImgId}`).attr("class", data2.img[num].class);
                $(`#${ids.shrdImgId}`).fadeIn();
                //$(`#${ids.dispCurnt}`).text(num+1);
            });
            $(`#${ids.prevImg}`).click(()=>{
                $(`#${ids.shrdImgId}`).css('display', 'none');
                num--;
                if (num < 0) {
                    num = data2.img.length-1;
                }
                $(`#${ids.shrdImgId}`).attr("src", `https://test-vyral.onrender.com/${data2.img[num].path}`);
                $(`#${ids.shrdImgId}`).attr("class", data2.img[num].class);
                $(`#${ids.shrdImgId}`).fadeIn();
                //$(`#${ids.dispCurnt}`).text(num+1);
            });
        } else {
            $(`#${ids.multRevBtnCon}`).css('display', 'none');
        }

    };
    // review imgs
    const revImgFuncs = (images, ind, num, thrdata) => {
        const revImgIds = createReThrImIds(images);
        $(`#dropCons`).after(imgRevThrImg(revImgIds, ind));
        $(`#${revImgIds.dispCurnt}`).prepend(`
        <img src="https://test-vyral.onrender.com/${thrdata.img[num].path}" class="${thrdata.img[num].class}" width="100%" id="${revImgIds.shrdImgId}">
        `);
        opndRevImg(thrdata, num, revImgIds);
        Dark();
    };

    // videos
    const videoThr = (thrdata, udata, user, vidBod, vidCntrlDiv, vidPlay, vidPause, vidStop, vidMute, vidCrntT, vidOrgT) => {
        $(`#${vidBod}`).css('display', 'block');
        $(`#${vidBod}`).attr('src', `https://test-vyral.onrender.com/${thrdata.vid[0].path}`);
        $(`#${vidBod}`).attr('class', `${thrdata.vid[0].class}`);
        var video = document.getElementById(`${vidBod}`);
        video.muted = true;
        //$(`#${vidCrntT}`).text(video.currentTime);
        var dur = document.getElementById(`${vidBod}`);
        preloadVids(vidBod);
        //alert(`chck duration: ${video.muted}`);
        dur.onloadedmetadata = function() {
            $(`#${vidCntrlDiv}`).css('display', 'block');
            var curmins = Math.floor(dur.currentTime / 60);
            var cursecs = Math.floor(dur.currentTime - curmins * 60);
            var durmins = Math.floor(dur.duration / 60);
            var dursecs = Math.round(dur.duration - durmins * 60);
            //if(cursecs < 10){ cursecs = "0"+cursecs; }
            //if(dursecs < 10){ dursecs = "0"+dursecs; }
            //if(curmins < 10){ curmins = "0"+curmins; }
            //if(durmins < 10){ durmins = "0"+durmins; }
            //document.getElementById('cur').innerText = cursecs;
            $(`#${vidCrntT}`).text(cursecs);
            $(`#${vidOrgT}`).text(dursecs);
        };
        const getTimer = () => {
            var curmins = Math.floor(dur.currentTime / 60);
            var cursecs = Math.floor(dur.currentTime - curmins * 60);
            $(`#${vidCrntT}`).text(cursecs);
        };
        const getCurT = () => {
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                // check duration to currentime
                getTimer();
                var curmins = Math.floor(dur.currentTime / 60);
                var cursecs = Math.floor(dur.currentTime - curmins * 60);
                var durmins = Math.floor(dur.duration / 60);
                var dursecs = Math.round(dur.duration - durmins * 60);
                if (cursecs == dursecs || cursecs > dursecs) {
                    $(`#${vidCrntT}`).text(0);
                    clearInterval(x);
                }
                if (distance < 0) {
                    getCurT();
                    //clearInterval(x);
                }
            }, 1000);
        };
        
        // video control buttons
        // play
        var muter = 0;
        $(`#${vidPlay}`).click(()=>{
            video.play();
            getCurT();
            //$(`#${vidCrntT}`).text(video.currentTime);
            $(`#${vidPlay}`).attr('src', 'assets/imgs/playy.png');
            if (muter < 1) {
                $(`#${vidMute}`).click();
            }
            $(`#${vidPause}`).attr('src', 'assets/imgs/pausen.png');
            $(`#${vidStop}`).attr('src', 'assets/imgs/stopn.png');
        });
        // pause
        $(`#${vidPause}`).click(()=>{
            video.pause();
            getCurT();
            $(`#${vidPause}`).attr('src', 'assets/imgs/pausey.png');
            $(`#${vidPlay}`).attr('src', 'assets/imgs/playn.png');
            $(`#${vidStop}`).attr('src', 'assets/imgs/stopn.png');
        });
        // stop
        $(`#${vidStop}`).click(()=>{
            video.stop();
            $(`#${vidStop}`).attr('src', 'assets/imgs/stopy.png');
            $(`#${vidPause}`).attr('src', 'assets/imgs/pausen.png');
            $(`#${vidPlay}`).attr('src', 'assets/imgs/playn.png');
        });
        // mute fun
        $(`#${vidMute}`).click(()=>{
            if (muter > 0) {
                $(`#${vidMute}`).attr('src', 'assets/imgs/muten.png');
                video.muted = true;
                muter = 0;
            } else {
                if (muter < 1) {
                    $(`#${vidMute}`).attr('src', 'assets/imgs/mutey.png');
                    muter = 1;
                    video.muted = false;
                }
            }
        });

        // review video
        $(`#${vidBod}`).click(()=>{
            revVidFuncs(vidBod, global.pop_no+2, thrdata) 
        });
    };
    // IMG REV FUNCS
    const opndRevVid = (data2, ids) => {
        //close rev
        $(`#${ids.closeRevedCon}`).click(()=>{
            $(`#${ids.containId}`).remove();
        });
        var video = document.getElementById(`${ids.shrdVidId}`);
        video.muted = true;
        var dur = document.getElementById(`${ids.shrdVidId}`);
        //alert(`chck duration: ${video.muted}`);
        dur.onloadedmetadata = function() {
            $(`#goThrSntVid, #${ids.multRevBtnCon}`).fadeIn();
            var curmins = Math.floor(dur.currentTime / 60);
            var cursecs = Math.floor(dur.currentTime - curmins * 60);
            var durmins = Math.floor(dur.duration / 60);
            var dursecs = Math.round(dur.duration - durmins * 60);
            //if(cursecs < 10){ cursecs = "0"+cursecs; }
            //if(dursecs < 10){ dursecs = "0"+dursecs; }
            //if(curmins < 10){ curmins = "0"+curmins; }
            //if(durmins < 10){ durmins = "0"+durmins; }
            //document.getElementById('cur').innerText = cursecs;
            $(`#${ids.vidCrntT_xp}`).text(cursecs);
            $(`#${ids.vidOrgT_xp}`).text(dursecs);
        };
        const getTimer = () => {
            var curmins = Math.floor(dur.currentTime / 60);
            var cursecs = Math.floor(dur.currentTime - curmins * 60);
            $(`#${ids.vidCrntT_xp}`).text(cursecs);
        };
        const getCurT = () => {
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                // check duration to currentime
                getTimer();
                var curmins = Math.floor(dur.currentTime / 60);
                var cursecs = Math.floor(dur.currentTime - curmins * 60);
                var durmins = Math.floor(dur.duration / 60);
                var dursecs = Math.round(dur.duration - durmins * 60);
                if (cursecs == dursecs || cursecs > dursecs) {
                    $(`#${ids.vidCrntT_xp}`).text(0);
                    clearInterval(x);
                }
                if (distance < 0) {
                    getCurT();
                    //clearInterval(x);
                }
            }, 1000);
        };
        
        // video control buttons
        // play
        var muter = 0;
        $(`#${ids.vidPlay_xp}`).click(()=>{
            video.play();
            getCurT();
            //$(`#${vidCrntT}`).text(video.currentTime);
            $(`#${ids.vidPlay_xp}`).attr('src', 'assets/imgs/playy.png');
            if (muter < 1) {
                $(`#${ids.vidMute}`).click();
            }
            $(`#${ids.vidPause_xp}`).attr('src', 'assets/imgs/pausen.png');
        });
        // pause
        $(`#${ids.vidPause_xp}`).click(()=>{
            video.pause();
            getCurT();
            $(`#${ids.vidPause_xp}`).attr('src', 'assets/imgs/pausey.png');
            $(`#${ids.vidPlay_xp}`).attr('src', 'assets/imgs/playn.png');
        });
        // mute fun
        $(`#${ids.vidMute_xp}`).click(()=>{
            if (muter > 0) {
                $(`#${ids.vidMute_xp}`).attr('src', 'assets/imgs/muten.png');
                video.muted = true;
                muter = 0;
            } else {
                if (muter < 1) {
                    $(`#${ids.vidMute_xp}`).attr('src', 'assets/imgs/mutey.png');
                    muter = 1;
                    video.muted = false;
                }
            }
        });

    }
    // review video funcs
    const revVidFuncs = (vidBod, ind, thrdata) => {
        const revImgIds = createReThrImIds(vidBod);
        $(`#dropCons`).after(imgRevThrImg(revImgIds, ind));
        $(`#${revImgIds.dispCurnt}`).prepend(`
        <video poster="assets/imgs/emptback.png" src="https://test-vyral.onrender.com/${thrdata.vid[0].path}" class="${thrdata.vid[0].class}" width="100%" id="${revImgIds.shrdVidId}"></video>
        `);
        opndRevVid(thrdata, revImgIds);
        Dark();
    }

    // notes
    const thrStrNote = (thrdata, udata, user, noteOne) => {
        if (thrdata.user == udata._id) {
            $(`#${noteOne}`).text('You');
        }else {
            $(`#${noteOne}`).text(`${user}`);
        }
    };

    // view str
    const viewString = (thrdata, udata, user, viewStr) => {
        var data4 = db.all_posts.find(item => item._id==thrdata.tied_to);
        if (data4 !== undefined) {
            var tieType = '';
            //fetch following
            var chk = '';
            for (let z = 0; z < udata.following.length; z++) {
                if (udata.following[z].user == data4.user) {
                    tieType = 'Friend'; chk = 'y';
                    openBgBdy(data4, udata, tieType, user, viewStr);
                    break;
                }
            }
            if (data4.user == udata._id) {
                tieType = 'Own';
                openBgBdy(data4, udata, tieType, user, viewStr);
            }else {
                if (data4.type == 'Public') {
                    if (chk == '') {
                        tieType = 'pub_tied';
                        openBgBdy(data4, udata, tieType, user, viewStr);
                    }
                }else {
                    if (data4.tied.length > 0 && chk == '') {
                        for (let x = 0; x < data4.tied.length; x++) {
                            if (data4.tied[x] == udata._id) {
                                var tieType = 'Tied';
                                openBgBdy(data4, udata, tieType, user, viewStr);
                            }
                        }
                    }
                }
            }
            
        }
    };

    // open/close
    // OPT
    const thrOpt = (thrdata, udata, user, opnThrOpt, thrOptBod, clsThrOpt, delThrOpn, delThrQ, delThrY, delThrN, reprtId, repConId, inApRep, abusRep, clsRep) => {
        
        $(`#${opnThrOpt}`).css('display', 'block');
        if (thrdata.user == udata._id) {
            $(`#${reprtId}`).css('display', 'none');
        }else {
            $(`#${delThrOpn}`).css('display', 'none');
        }
        
        $(`#${opnThrOpt}`).click(()=>{
            $(`#${thrOptBod}`).slideDown(200);
        });
        $(`#${clsThrOpt}`).click(()=>{
            $(`#${thrOptBod}`).slideUp(100);
        });

        // delete thr
        $(`#${delThrOpn}`).click(()=>{
            $(`#${delThrOpn}`).slideUp(100);
            $(`#${delThrQ}`).slideDown(200);
        });
        $(`#${delThrN}`).click(()=>{
            $(`#${delThrQ}`).slideUp(100);
            $(`#${delThrOpn}`).slideDown(200);
        });
        $(`#${delThrY}`).click(()=>{
            // delete post method
            var pData = {
                section: 'str_thr',
                type: 'del_thr',
                id: thrdata._id,
            };
            postData(pData);
            $('#rfrshMainStr').click();
        });

        // REPORT
        // opn/ls
        $(`#${reprtId}`).click(()=>{
            $(`#${reprtId}`).slideUp(100);
            $(`#${repConId}`).slideDown(200);
        });
        $(`#${clsRep}`).click(()=>{
            $(`#${repConId}`).slideUp(100);
            $(`#${reprtId}`).slideDown(200);
        });

        // snd inap
        $(`#${inApRep}`).click(()=>{
           var con = 'Inappropriate content'; 
           pushRep(con);
        });
        // snd abus
        $(`#${abusRep}`).click(()=>{
            var con = 'Abusive content'; 
            pushRep(con);
        });

        // report func
        const pushRep = (con) => {

            var nme = '';
            if (thrdata.type == 'User') {
                nme = thrdata.user;
            }else {
                nme = thrdata.mail;
            }
            var pData = {
                section: 'str_thr',
                type: 'report_thr',
                user: udata._id,
                post: thrdata._id,
                con: con,
                name: nme,
            };
            postData(pData);
            setTimeout(() => {
                $('#alertText').text('report sent');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
                $(`#${repConId}`).slideUp(100);
                $(`#${reprtId}`).slideDown(200);
            }, 1);
            
        };

    };

    
    // check like contents
    const chkLikeThrXs = (thrdata, udata, user, likeThrSm, likeByThrSm) => {
        var accData = db.all_posts.find(item => item._id==thrdata._id);
        if (accData.likedBy.length < 1 || accData.likedBy.length == 0) {
            $(`#${likeByThrSm}`).css('display', 'none');
        }else {
            $(`#${likeByThrSm}`).css('display', 'inline');
            for (let i = 0; i < accData.likedBy.length; i++) {
                if (accData.likedBy[i].user == udata._id) {
                    $(`#${likeThrSm}`).attr('src', 'assets/imgs/liked.png');
                    break;
                }else {
                    $(`#${likeThrSm}`).attr('src', 'assets/imgs/like.png');
                }
            }
            $(`#${likeByThrSm}`).text(accData.likedBy.length);
        }
        
    };
    // like btn
    const LikeThrXs = (thrdata, udata, user, likeThrSm, likeByThrSm) => {
        $(`#${likeThrSm}`).click(()=>{
            var accData = db.all_posts.find(i=>i._id == thrdata._id);
            if (accData !== undefined) {
                var act = '';
                var dateNow = [year, day, month, hour, minute, secnds];
                // functions
                let like = () => {
                    act = 'like';
                    var pData = {
                        section: 'str_thr',
                        type: 'like_thr',
                        user: udata._id,
                        set: {user: udata.user_name},
                        id: thrdata._id,
                        act: act,
                        post: accData,
                        date: accData.date
                    };
                    postData(pData);
                    $(`#${likeThrSm}`).attr('src', 'assets/imgs/liked.png');
                    setTimeout(() => {
                        // assignDb();
                        chkLikeThrXs(thrdata, udata, user, likeThrSm, likeByThrSm);
                    }, 500);
                };
                // unlike
                let unlike = (pushData) => {
                    act = 'unlike';
                    var pData = {
                        section: 'str_thr',
                        type: 'unlike_thr',
                        user: udata._id,
                        set: {user: udata.user_name},
                        id: thrdata._id,
                        act: act,
                        post: thrdata,
                        date: accData.date
                    };
                    postData(pData);
                    $(`#${likeThrSm}`).attr('src', 'assets/imgs/like.png');
                    setTimeout(() => {
                        // assignDb();
                        chkLikeThrXs(thrdata, udata, user, likeThrSm, likeByThrSm);
                    }, 2000);
                };
        
                // conditions
                if (accData.likedBy.length > 0) {
                    let imply = '';
                    for (let i = 0; i < accData.likedBy.length; i++) {
                        if (accData.likedBy[i].user == udata._id) {
                            imply = 'liked';
                            unlike(accData.likedBy[i]);
                        }
                    }
                    if (imply == '') {
                        like();
                    }
                }else {
                    like();
                }
            }
        });
    };
    // LEP
    const likeLEP = (data, udata, user, likeThrSm, likeByThrSm) => {

        var len = 0;
        const checkIt = () => {
            const letsGo = () => {
                var scn = db.all_posts.find(item => item._id==data._id);
                if (scn.likedBy.length > len || scn.likedBy.length < len) {
                    $(`#${likeByThrSm}`).css('display', 'none');
                    $(`#${likeByThrSm}`).fadeIn();
                    $(`#${likeByThrSm}`).text(scn.likedBy.length);
                    chkLikeThrXs(scn, udata, user, likeThrSm, likeByThrSm);
                    setTimeout(() => {
                        checkIt();
                    }, 1);
                }else {
                    setTimeout(() => {
                        letsGo();
                    }, 1);
                }

            };

            var frs = db.all_posts.find(item => item._id==data._id);
            len = frs.likedBy.length;
            letsGo();
        } 
        checkIt();

    };

    // comment bodies
    const comBodLyt = (coms, realN, cids, slc, dispMre) => { 
        var path = ''; var clas = '';
        if (realN.profile_pic == 'none') {
            path = 'assets/imgs/profpic.png';
        }else {
            path = `${realN.profile_pic.path}`;
            clas = `${realN.profile_pic.class}`;
        }
        return  `
        <div id="${cids.comBodId}" class="commentBodySec" style="width:100%;">
            <div style="width:80%; margin:5px; margin-top:10px; box-shadow:0px 0px 15px -10px #1a1a1a; border-radius:5px;">
                <div style="width:100%; height:22.5px; border-top-left-radius:5px; border-top-right-radius: 5px; background-color:white; border-bottom:solid 0.8px #dddddd;">
                    <div class="${clas}" style="float:left; width:15px; height:15px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin:3px;"></div>
                    <p class="sub_h" id="${cids.usrNme}" style="font-size:12px; margin: 0px; padding:2.5px; float: left;">${realN.user_name} <img src="assets/imgs/verification.png" id="${cids.verIconCom}" width="12.5px" height="12.5px" style="margin-top:-5px; display:none;"></p>
                    <p class="sub_h" style="font-size:10px; margin: 0px; padding:2px; float: right;" id="${cids.dateFlwComThr}"></p>
                </div>
                <div class="" style="width:100%; background-color:white;">
                    <p class="cmntShrt sub_h" style="font-size:15.5px; margin: 0px; padding:1px;"><span id="${cids.cmntSlc}">${slc}</span><span id="${cids.mreCom}" style="color:silver; display:${dispMre}; font-size:10px; cursor:pointer;">...more</span></p>
                </div>
                <div style="border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; background-color: white; height:22.5px;">
                    <!--<p style="float:left; color:skyblue; font-size: 10px; margin: 0px; padding: 1px; cursor: pointer;">reply</p>-->
                    <span style="float: right; color: orange; font-size: 13.5px; margin: 0px; padding: 2.5px; cursor: pointer;" id="${cids.delId}"><img src="assets/imgs/can.png" width="9px" height="9px"></spa>
                </div>
            </div>
        </div>
    `};
    const comBodDrk = (coms, realN, cids, slc, dispMre) => {
        var path = ''; var clas = '';
        if (realN.profile_pic == 'none') {
            path = 'assets/imgs/profpic.png';
        }else {
            path = `${realN.profile_pic.path}`;
            clas = `${realN.profile_pic.class}`;
        }
        return `
    <div id="${cids.comBodId}" class="commentBodySec" style="width:100%;">
        <div style="width:80%; margin:10px; margin-top:10px; box-shadow:0px 0px 15px -10px #1a1a1a; border-radius:5px;">
            <div style="width:100%; height:22.5px; border-top-left-radius:5px; border-top-right-radius: 5px; background-color:#1a1a1a;">
                <div class="${clas}" style="float:left; width:15px; height:15px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin:3px;"></div>
                <p id="${cids.usrNme}" style="font-size:12px; color:silver; margin: 0px; padding:2.5px; float: left;">${realN.user_name} <img src="assets/imgs/verification.png" id="${cids.verIconCom}" width="12.5px" height="12.5px" style="margin-top:-5px; display:none;"></p>
                <p style="font-size:10px; margin: 0px; padding:2px; float: right; color:silver;" id="${cids.dateFlwComThr}"></p>
            </div>
            <div class="" style="width:100%; background-color:#262626;">
                <p class="cmntShrt" style="font-size:15.5px; color:silver; margin: 0px; padding:1px;"><span id="${cids.cmntSlc}">${slc}</span><span id="${cids.mreCom}" class="sub_h" style="display:${dispMre}; font-size:10px; cursor:pointer;">...more</span></p>
            </div>
            <div style="border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; background-color: #262626; height:22.5px;">
                <!--<p style="float:left; color:skyblue; font-size: 10px; margin: 0px; padding: 1px; cursor: pointer;">reply</p>-->
                <span style="float: right;color: red; font-size: 13.5px; margin: 0px; padding: 2.5px; cursor: pointer;" id="${cids.delId}"><img src="assets/imgs/can.png" width="9px" height="9px"></spa>
            </div>
        </div>
    </div>
    `};
    // check if cmntd
    const checkComsThr = (thrdata, udata, user, comThrOpn, comThrBod, comThrFlow, comThrIn, comThrBtn, closeComThr, comThrLen) => {
        if (thrdata.comments.length > 0) {
            $(`#${comThrLen}`).css('display', 'inline');
            for (let i = 0; i < thrdata.comments.length; i++) {
                if (thrdata.comments[i].user == udata._id) {
                    $(`#${comThrOpn}`).attr('src', 'assets/imgs/commentd.png');
                }                
            }
        }else {
            $(`#${comThrLen}`).css('display', 'none');
        }
    };
    // refresh comment length and img
    const rfrshComs = (thrdata, udata, openCom, comntLen) => {
        var ext = db.all_posts.find(i => i._id == thrdata._id);
        if (ext !== undefined) {
            var comData = ext.comments;
            // comments length
            $(`#${comntLen}`).text(comData.length);
            if (comData.length > 0) {
                $(`#${comntLen}`).css('display', 'inline-block');
                for (let i = 0; i < comData.length; i++) {
                    if (comData[i].user == udata._id) {
                        $(`#${openCom}`).attr('src', 'assets/imgs/commentd.png');
                        break;
                    }else {
                        $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
                    }
                }
            }else {
                $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
                $(`#${comntLen}`).css('display', 'none');
            }
        }
    };
    // exctract comments
    const extComs = (thrdata, udata, user, comThrOpn, comThrFlow, comThrLen) => {

        // load more comment-len
        const mreCom = (data, coms, curnS, cmntSlc, mreCom) => {
            if (coms.comment.length < curnS || coms.comment.length == curnS) {
                $(`#${mreCom}`).css('display', 'none');
            }
            if (coms.comment.length > curnS) {
                $(`#${mreCom}`).css('display', 'inline');
            }
            $(`#${mreCom}`).click(()=>{
                curnS += 100;
                var slc1 = coms.comment;
                var slc = slc1.slice(0, curnS);
                if (slc.length > slc1.length || slc.length == slc1.length) {
                    $(`#${mreCom}`).css('display', 'none');
                }
                $(`#${cmntSlc}`).text(`${slc}`);
            });
        };
        
        // del com func
        const delCom = (coms, delId, comBodId) => {
            const delBtn = $(`#${delId}`);
            delBtn.click(function() {
                var dateNow = [year, day, month, hour, minute, secnds];
                var mth = Math.random();var strn = mth.toString();var dif = strn.slice(2, mth.length);
                var act = 'del-coment';
                var pData = {
                    section: 'str_thr',
                    type: 'del_comment',
                    user: udata._id,
                    post: thrdata,
                    act: act,
                    comment: coms,
                    id: thrdata._id,
                };
                postData(pData);
                $(`#${comBodId}`).remove();
                setTimeout(() => {
                    // assignDb();
                    rfrshComs(thrdata, udata, comThrOpn, comThrLen);
                }, 2000);
            });
        };
        // disp/not rem but
        const dispRem = (thrdata, coms, delId, comBodId) => {
            if (thrdata.user == udata._id && coms.user == udata._id) {
                $(`#${delId}`).css('display', 'block');
            }
            if (thrdata.user !== udata._id && coms.user == udata._id) {
                $(`#${delId}`).css('display', 'block');
            }
            if (thrdata.user !== udata._id && coms.user !== udata._id) {
                $(`#${delId}`).css('display', 'none');
            }
        };
        const comsIds = (len) => {
            return {
                dateFlwComThr: 'dateFlwComThr_' + len,
                delId: 'delComId_Thr' + len,
                comBodId: 'comBodId_Thr' + len,
                cmntSlc: 'cmntSlc_Thr' + len,
                mreCom: 'mreCom_Thr' + len,
                verIconCom: 'verIconCom_Thr' + len,
                usrNme: 'comUsrNmeGo_Thr_' + len
            }
        };
        const displayComs = (coms, len) => {
            var mode = udata.mode;
            const cids = comsIds(len);
            var realN = '';
            var cdata = db.users.find(i => i._id == coms.user);
            if (cdata !== undefined) {
                var curnS = 0;
                if(mode == 'light') {
                    if (coms.comment.length>30) {
                        let str = coms.comment;
                        var slc = str.slice(0, 100);
                        curnS = 100;
                        var dispMre = 'inline';
                        $(`#${comThrFlow}`).prepend(comBodLyt(coms, cdata, cids, slc, dispMre));
                    }else {
                        var slc = coms.comment;
                        curnS = slc.length;
                        var dispMre = 'none';
                        $(`#${comThrFlow}`).prepend(comBodLyt(coms, cdata, cids, slc, dispMre));
                    }
                }else {
                    if (coms.comment.length>30) {
                        let str = coms.comment;
                        var slc = str.slice(0, 100);
                        curnS = 100;
                        var dispMre = 'inline';
                        $(`#${comThrFlow}`).prepend(comBodDrk(coms, cdata, cids, slc, dispMre));
                    }else {
                        var slc = coms.comment;
                        curnS = slc.length;
                        var dispMre = 'none';
                        $(`#${comThrFlow}`).prepend(comBodDrk(coms, cdata, cids, slc, dispMre));
                    }
                }
                if (cdata.verification == 'on') {
                    $(`#${cids.verIconCom}`).css('display', 'inline');
                }
                idExFunc(cdata._id, udata, cids.usrNme);
                smartDate(coms, cids.dateFlwComThr);
                dispRem(thrdata, coms, cids.delId, cids.comBodId );
                delCom(coms, cids.delId, cids.comBodId);
                mreCom(thrdata, coms, curnS, cids.cmntSlc, cids.mreCom);
                //commentImg(thrdata, udata, comThrOpn, comThrLen);
            }
        };

        var comData = '';
        var ext = db.all_posts.find(i=>i._id == thrdata._id);
        comData = ext.comments;
        $('.commentBodySec').remove();
        // comments length
        $(`#${comThrLen}`).text(comData.length);
        if (comData.length > 0) {
            $(`#${comThrLen}`).css('display', 'inline');
            for (let i = 0; i < comData.length; i++) {
                const len = i;
                displayComs(comData[i], len);
                // comments img
                
            }
        }

    };
    // comments img
    const commentImg = (data, udata, openCom, comntLen) => {
        if (data.comments.length > 0) {
            $(`#${comntLen}`).css('display', 'inline-block');
            var inot = '';
            for (let i = 0; i < data.comments.length; i++) {
                if (data.comments[i].user == udata._id) {
                    inot = 'exists';
                    $(`#${openCom}`).attr('src', 'assets/imgs/commentd.png');
                }
            }
            if(inot == '') {
                $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
            }
        } else {
            $(`#${comntLen}`).css('display', 'none');
        }
    }
    // opn cmnt
    const opnCom = (thrdata, udata, user, comThrOpn, comThrBod, comThrFlow, comThrIn, comThrBtn, closeComThr, comThrLen) => {
        // opn
        $(`#${comThrOpn}`).click(()=>{
            //$('.postBodyCon').slideUp(100);
            $(`.bodyComNoti`).slideUp(100);
            $(`#${comThrBod}`).slideDown(200);
            // assignDb();
            setTimeout(() => {
                extComs(thrdata, udata, user, comThrOpn, comThrFlow, comThrLen);
            }, 1);
        });
        // close
        $(`#${closeComThr}`).click(()=>{
            $(`#${comThrBod}`).slideUp(100);
        });

        // push comments 
        //const pushComment = () => {
            let pushCom = $(`#${comThrBtn}`);
            let comInput = $(`#${comThrIn}`);
            pushCom.click(function(){
                var act = '';
                var dateNow = [year, day, month, hour, minute, secnds];
                var mth = Math.random();var strn = mth.toString();var dif = strn.slice(2, mth.length);
                if (comInput.val() !== '') {
                    act = 'unlike';
                    var pData = {
                        section: 'str_thr',
                        type: 'comment',
                        user: udata._id,
                        comment: comInput.val(),
                        post: thrdata,
                        act: 'comment_str',
                        id: thrdata._id,
                    };
                    postData(pData);
                    $(`#${comThrOpn}`).attr('src', 'assets/imgs/commentd.png');
                    setTimeout(() => {
                        // assignDb();
                        extComs(thrdata, udata, user, comThrOpn, comThrFlow, comThrLen);
                        rfrshComs(thrdata, udata, comThrOpn, comThrLen);
                    }, 2000);
                }else {
                    $(`#${comThrIn}`).click();
                }
            });
        //};

    };

    // com LEP
    const comLep = (data, udata, user, comThrOpn, comThrBod, comThrFlow, comThrIn, comThrBtn, closeComThr, comThrLen) => {
        
        var len = 0;
        const checkIt = () => {
            const letsGo = () => {
                var scn = db.all_posts.find(item => item._id==data._id);
                if (scn.comments.length > len || scn.comments.length < len) {
                    $(`#${comThrLen}`).css('display', 'none');
                    $(`#${comThrLen}`).fadeIn();
                    $(`#${comThrLen}`).text(scn.comments.length);
                    commentImg(scn, udata, comThrOpn, comThrLen)
                    //likedImg(scn, udata, likeId, likedBy);
                    setTimeout(() => {
                        checkIt();
                    }, 1);
                }else {
                    setTimeout(() => {
                        letsGo();
                    }, 1);
                }
            };
            var frs = db.all_posts.find(item => item._id==data._id);
            len = frs.comments.length;
            letsGo();
        }
        checkIt();

    };

    // create ids
    const thrIds = (thrdata, id) => {
        return {
            thrBody: 'thrBody_' + thrdata._id+id,
            // thr notes
            noteOne: 'noteOne_' + thrdata._id+id,
            // date
            thrDate: 'thrDate_' + thrdata._id+id,
            // image funcs
            images: 'images_' + thrdata._id+id,
            imgThrCnt: 'imgThrCnt_' + thrdata._id+id,
            curntImg: 'curntImg_' + thrdata._id+id,
            imgLen: 'imgLen_' + thrdata._id+id,
            bckImg: 'bckImg_' + thrdata._id+id,
            fwdImg: 'fwdImg_' + thrdata._id+id,
            // vid funcs
            vidBod: 'vidBod_' + thrdata._id,
            vidCntrlDiv: 'vidCntrlDiv_' + thrdata._id+id,
            vidPlay: 'vidPlay_' + thrdata._id+id,
            vidPause: 'vidPause_' + thrdata._id+id,
            vidStop: 'vidStop_' + thrdata._id+id,
            vidMute: 'vidMute_' + thrdata._id+id,
            vidCrntT: 'vidCrntT_' + thrdata._id+id,
            vidOrgT: 'vidOrgT_' + thrdata._id+id,
            // like funcs
            likeThrSm: 'likeThrSm_' + thrdata._id+id,
            likeByThrSm: 'likeByThrSm_' + thrdata._id+id,
            // comment funcs
            comThrOpn: 'comThrOpn_' + thrdata._id+id,
            comThrLen: 'comThrLen_' + thrdata._id+id,
            comThrBod: 'comThrBod_' + thrdata._id+id,
            comThrFlow: 'comThrFlow_' + thrdata._id+id,
            comThrIn: 'comThrIn_' + thrdata._id+id,
            comThrBtn: 'comThrBtn_' + thrdata._id+id,
            closeComThr: 'closeComThr_' + thrdata._id+id,
            // OPT
            opnThrOpt: 'opnThrOpt_' + thrdata._id+id,
            thrOptBod: 'thrOptBod_' + thrdata._id+id,
            clsThrOpt: 'clsThrOpt_' + thrdata._id+id,
            // delete thread funcs
            delThrOpn: 'delThrOpn_' + thrdata._id+id,
            delThrQ: 'delThrQ_' + thrdata._id+id, 
            delThrY: 'delThrY_' + thrdata._id+id,
            delThrN: 'delThrN_' + thrdata._id+id,
            // report post func
            reprtId: 'reprtThrId_' + thrdata._id+id,
            repConId: 'repConThrId_' + thrdata._id+id,
            inApRep: 'inApRepThr_' + thrdata._id+id,
            abusRep: 'abusRepThr_' + thrdata._id+id,
            clsRep: 'clsRepThr_' + thrdata._id+id,
            // View string
            viewStr: 'viewStr_' + thrdata._id+id,
            // share ids
            shrPst: 'shrPst_xs_' + thrdata._id+id,
            shrPstBd: 'shrPstBd_xs_' + thrdata._id+id,
            shrPstSrch: 'shrPstSrch_xs_' + thrdata._id+id,
            shrPstFlw: 'shrPstFlw_xs_' + thrdata._id+id,
            shrPstCls: 'shrPstCls_xs_' + thrdata._id+id,
            // edt 
            edtThr: 'edtThr_xs_' + thrdata._id+id
        }
    };
    
     // display threads
    const dispThrStr = (thrdata, udata, users, tg) => {
        const ids = thrIds(thrdata, tg);
        var user = ''; var usr = '';
        var user = ''; var usr = ''; var fpath = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (thrdata.user == users[i]._id) {
                    fpath = users[i];
                    usr = users[i].user_name;
                }
            }
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
        }
            checkMode();
            if (tg == 'hme') {
                $('#dropbox-thr-main').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
            }
            if (tg == 'prf') {
                $('#dropbox-thr').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
            }
            thrStrNote(thrdata, udata, user, ids.noteOne);
            // multi img effects
            if (thrdata.img.length > 0) {
                multiThrImg(thrdata, udata, user, ids.images, ids.imgThrCnt, ids.curntImg, ids.imgLen, ids.bckImg, ids.fwdImg);
            }
            // vids
            if (thrdata.vid.length > 0) {
                videoThr(thrdata, udata, user, ids.vidBod, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
            }
            checkMode(); Dark();
            // date
            smartDate(thrdata, ids.thrDate);
            // like funcs
            chkLikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            LikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            likeLEP(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            // comment funcs
            checkComsThr(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            opnCom(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            // com LEP
            comLep(thrdata, udata, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            // OPT
            thrOpt(thrdata, udata, user, ids.opnThrOpt, ids.thrOptBod, ids.clsThrOpt, ids.delThrOpn, ids.delThrQ, ids.delThrY, ids.delThrN, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
            // view str
            viewString(thrdata, udata, user, ids.viewStr);
            // edt thr
            editThr(thrdata, udata, ids.edtThr);
            // share funcs
            var tg = 'shr_thr';
            sharePst(thrdata, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls, tg);
            // go to profile
            idExFunc(thrdata.user, udata, ids.noteOne);
    };
     // display threads
     const dispExThrStr = (thrdata, udata, users, drop) => {
        const ids = thrIds(thrdata, drop);
        var user = ''; var usr = ''; var fpath = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (thrdata.user == users[i]._id) {
                    fpath = users[i];
                    usr = users[i].user_name;
                }
            }
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
        }
            checkMode();
            $(`#${drop}`).prepend(viewThread(thrdata, udata, fpath, user, ids)); 
            thrStrNote(thrdata, udata, user, ids.noteOne);
            // multi img effects
            if (thrdata.img.length > 0) {
                multiThrImg(thrdata, udata, user, ids.images, ids.imgThrCnt, ids.curntImg, ids.imgLen, ids.bckImg, ids.fwdImg);
            }
            // vids
            if (thrdata.vid.length > 0) {
                videoThr(thrdata, udata, user, ids.vidBod, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
            }
            checkMode(); Dark();
            // date
            smartDate(thrdata, ids.thrDate);
            // like funcs
            chkLikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            LikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            likeLEP(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            // comment funcs
            checkComsThr(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            opnCom(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            // com LEP
            comLep(thrdata, udata, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            // OPT
            thrOpt(thrdata, udata, user, ids.opnThrOpt, ids.thrOptBod, ids.clsThrOpt, ids.delThrOpn, ids.delThrQ, ids.delThrY, ids.delThrN, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
            // view str
            viewString(thrdata, udata, user, ids.viewStr);
            // edt thr
            editThr(thrdata, udata, ids.edtThr);
            // share funcs
            var tg = 'shr_thr';
            sharePst(thrdata, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls, tg);
            // go to profile
            idExFunc(thrdata.user, udata, ids.noteOne);
    };
    // display friend's thr
    const dispFrndThrStr = (thrdata, udata, users, wr) => {
        const ids = thrIds(thrdata, wr);
        var user = ''; var usr = ''; var fpath = '';
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (thrdata.user == users[i]._id) {
                        fpath = users[i];
                        usr = users[i].user_name;
                    }
                }
                if (usr.length > 15) {
                    user = usr.slice(0, 15)+'..';
                }else {
                    user = usr;
                }
            }
            checkMode();
            if (wr == 'gen') {
                $('#dropbox-thr-main').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
            }else {
                if (wr == 'exp_thr') {
                    $('#exp_drpTHRA').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
                }else {
                    $('#dropbox-strindexexp').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
                }
            }
            checkMode(); Dark();
            thrStrNote(thrdata, udata, user, ids.noteOne);
            // multi img effects
            if (thrdata.img.length > 0) {
                multiThrImg(thrdata, udata, user, ids.images, ids.imgThrCnt, ids.curntImg, ids.imgLen, ids.bckImg, ids.fwdImg);
            }
            // vids
            if (thrdata.vid.length > 0) {
                videoThr(thrdata, udata, user, ids.vidBod, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
            }
            // date
            smartDate(thrdata, ids.thrDate);
            // like funcs
            chkLikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            LikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            likeLEP(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
            // comment funcs
            checkComsThr(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            opnCom(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            // com LEP
            comLep(thrdata, udata, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
            // OPT
            thrOpt(thrdata, udata, user, ids.opnThrOpt, ids.thrOptBod, ids.clsThrOpt, ids.delThrOpn, ids.delThrQ, ids.delThrY, ids.delThrN, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
            // view str
            viewString(thrdata, udata, user, ids.viewStr);
            // edt thr
            editThr(thrdata, udata, ids.edtThr);
            // share funcs
            var tg = 'shr_thr';
            sharePst(thrdata, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls, tg);
            // go to profile
            idExFunc(thrdata.user, udata, ids.noteOne);
    };
    // display liked thr
    const displayReviews = (thrdata, udata, type) => {
        const ids = thrIds(thrdata, type);
        // hidden or not
        $('#review-con').fadeIn();
        
        var users = db.users;
        var user = ''; var usr = ''; var fpath = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (thrdata.user == users[i]._id) {
                    fpath = users[i];
                    usr = users[i].user_name;
                }
            }
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
        }
        checkMode();
        if (type == 'like_str') {
            $('#revPresNote').text('Thread liked');
            $('#drp-like-tag-rev-bod').fadeIn();
            $('#droprev-lktg').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
        }
        if (type == 'shr_thr') {
            $('#revPresNote').text('Shared with you a thread');
            $('#drp-like-tag-rev-bod').fadeIn();
            $('#droprev-lktg').prepend(viewThread(thrdata, udata, fpath, user, ids)); 
        }
        if (type == 'comment_str') {
            let cids = comIdsNoti(thrdata);
            $('#revPresNote').text('commented on your thread');
            $('#drp-like-tag-rev-bod').fadeIn();
            $('#droprev-lktg').append(comsBod(udata, cids.drpId, cids.bodyComId));
            $(`#${cids.bodyComId}`).after(`<p class="sub_h" style="margin:5px; font-size:13px;">thread :</p>`+viewThread(thrdata, udata, fpath, user, ids));
            Dark();
            const fetchSpecCom = (com, thrdata) => {
                var ext = db.all_posts.find(i=>i._id == thrdata._id);
                if (ext !== undefined) {
                    var comData = ext.comments;
                    if (comData.length > 0) {
                        for (let i = 0; i < comData.length; i++) {
                            if (comData[i].user == com.user && comData[i].date[0, 1, 2, 3, 4, 5] == com.date[0, 1, 2, 3, 4, 5]) {
                                pushIt(comData[i]);
                            }
                        }
                    }
                }
            };
            const pushIt = (com) => {
                var allUsers = db.users;
                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i]._id == com.user) {
                        dispComs(allUsers[i], com);
                    }
                }
            };
            const dispComs = (user, com) => {
                var str = com.comment;
                var slc = str.slice(0, 100);
                var dispMre = 'inline';
                if(udata.mode == 'light') {
                    $(`#${cids.drpId}`).append(comBodLyt(com, user, slc, cids, dispMre));
                }else {
                     $(`#${cids.drpId}`).prepend(comBodDrk(com, user, slc, cids, dispMre));
                }
                if (user.verification == 'on') {
                    $(`#${cids.verIconCom}`).css('display', 'inline');
                }
                Dark();
                idExFunc(user._id, udata, cids.usrNme);
            };
            var coms = global.rev_coms;
            fetchSpecCom(coms, thrdata);
        }
        thrStrNote(thrdata, udata, user, ids.noteOne);
        if (thrdata.img.length > 0) {
            multiThrImg(thrdata, udata, user, ids.images, ids.imgThrCnt, ids.curntImg, ids.imgLen, ids.bckImg, ids.fwdImg);
        }
        // vids
        if (thrdata.vid.length > 0) {
            videoThr(thrdata, udata, user, ids.vidBod, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
        }
        checkMode(); Dark();
        // date
        smartDate(thrdata, ids.thrDate);
        // like funcs
        chkLikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
        LikeThrXs(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
        likeLEP(thrdata, udata, user, ids.likeThrSm, ids.likeByThrSm);
        // comment funcs
        checkComsThr(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
        opnCom(thrdata, udata, user, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
        // com LEP
        comLep(thrdata, udata, ids.comThrOpn, ids.comThrBod, ids.comThrFlow, ids.comThrIn, ids.comThrBtn, ids.closeComThr, ids.comThrLen);
        // OPT
        thrOpt(thrdata, udata, user, ids.opnThrOpt, ids.thrOptBod, ids.clsThrOpt, ids.delThrOpn, ids.delThrQ, ids.delThrY, ids.delThrN, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
        // view str
        viewString(thrdata, udata, user, ids.viewStr);
        // edt thr
        editThr(thrdata, udata, ids.edtThr);
        // share funcs
        var tg = 'shr_thr';
        sharePst(thrdata, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls, tg);
        // go to profile
        idExFunc(thrdata.user, udata, ids.noteOne);

    };

    // share thr
    const shrBd = (user, path, clss, ids) => {
        return `
        <div class="shrPstBod" id="${ids.shrPstBodyId}" style="width:95%; margin:auto; height:35px; border-radius:5px; margin-top:10px;">
            <div style="width:30%; height:100%; float:left;">
                <div class="${clss}" style="width:25px; height:25px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
            </div>
            <div style="width:50%; height:100%; float:left;">
                <p id="${ids.checkUSrPrf}" class="sub_h" style="padding:2.5px; margin:5px; font-size:12px;">${user}</p>
            </div>
            <div style="width:20%; height:100%; float:right;">
                <p style="text-align:center; margin:2.5px;">
                    <img id="${ids.shrPstSndBtn}" src="assets/imgs/send.png" width="20px" height:="20px" style="margin:2.5px; cursor:pointer; display:none;">
                    <button id="${ids.shrPstRtrnBtn}" class="btn btn-default btn-xs" style="color:orange; background-color:transparent; border:solid 1px darkorange; border-radius:5px; margin:2.5px; display:none;">sent</button>
                </p>
            </div>
        </div>
        `
    };
    const sharePst = (data, udata, shrPst, shrPstBd, shrPstSrch, shrPstFlw, shrPstCls, tg) => {

        $(`#${shrPstSrch}`).on('input', function(key){
            var value = $(this).val();
            $(this).val(value.replace(/ /g, '_'));
        });

        //opn
        $(`#${shrPst}`).click(function() {
            $(`#${shrPstBd}`).slideDown(200);
            $('.shrPstBod').remove();
            if ($(`#${shrPstSrch}`).val() == '') {
                flowknwn();
            }else {
                flowFrndsrch($(`#${shrPstSrch}`).val());
            }
        });
        //cls
        $(`#${shrPstCls}`).click(function() {
            $(`#${shrPstBd}`).slideUp(100);
        });

        // modes
        const chkModeShr = () => {
            if (udata.mode == 'light') {
                $('.shrPstBod').css('border', 'solid 1px #dddddd');
                $('.shrPstBod').css('background-color', 'white');
            }else {
                $('.shrPstBod').css('border', 'solid 1px #404040');
                $('.shrPstBod').css('background-color', '#1a1a1a');
            }
        };

        // value search
        $(`#${shrPstSrch}`).keyup(()=>{
            $('.shrPstBod').remove();
            if ($(`#${shrPstSrch}`).val() == '') {
                flowknwn();
            }else {
                flowFrndsrch($(`#${shrPstSrch}`).val());
            }
        });
        async function flowFrndsrch(tagSrc) {
            const settings = {
                method: 'post',
                body: JSON.stringify({ srch: tagSrc }),
                headers: { "Content-type" : "application/json; charset=utf-8" }
            }
            try {
                const response = await fetch(`https://test-vyral.onrender.com/searcher/searchFrnd`, settings);
                const data = await response.json();
                var users = db.users;
                $('.shrPstBod').remove();
                for (let i = 0; i < data.length; i++) {
                    var usr = ''; var genUsrr = '';
                    for (let z = 0; z < users.length; z++) {
                        if (data[i]._id == users[z]._id) {
                            genUsrr = users[z]
                            usr = users[z].user_name;
                        }
                    }
                    passMe(usr, genUsrr);
                    chkModeShr();
                }
            } catch (error) {
                alert(error);
            }
        };

        // create share Isd
        const createShrIds = (user) => {
            return {
                checkUSrPrf: 'checkUSrPrf_' + user,
                // chk page done
                shrPstSndBtn: 'shrPstSndBtn_' + user,
                shrPstBodyId: 'shrPstBodyId_' + user,
                shrPstRtrnBtn: 'shrPstRtrnBtn_' + user
            }
        };
        const flowknwn = () => {
            for (let z = 0; z < udata.following.length; z++) {
                for (let x = 0; x < udata.chats.length; x++) {
                    
                    if (udata.following[z].user == udata.chats[x].user) {
                        var users = db.users;
                        var usr = ''; var genUsrr = '';
                        for (let i = 0; i < users.length; i++) {
                            if (udata.following[z].user == users[i]._id && udata.chats[x].user == users[i]._id) {
                                genUsrr = users[i]
                                usr = users[i].user_name;
                            }
                        }
                        passMe(usr, genUsrr);
                        chkModeShr();
                    }

                }
            }
        };
        // pass con
        const passMe = (usr, genUsrr) => {
            var user = '';
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
            var path = ''; var clss = '';
            if (genUsrr.profile_pic == 'none') {
                path = 'assets/imgs/profb.png';
            }else {
                path = `https://test-vyral.onrender.com/${genUsrr.profile_pic.path}`;
                clss = genUsrr.profile_pic.path;
            }
            const ids = createShrIds(genUsrr._id);
            $(`#${shrPstFlw}`).prepend(shrBd(user, path, clss, ids));
            shrFuncs(user, genUsrr, ids.shrPstSndBtn, ids.shrPstRtrnBtn);
            idExFunc(genUsrr._id, udata, ids.checkUSrPrf);
            Dark();
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 0.1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                // check duration to currentime
                if (distance < 0) {
                    $(`#${ids.shrPstBodyId}`).fadeIn();
                    clearInterval(x);
                }
            }, 1000);
            if (udata.user_name == usr) {
                $(`#${ids.shrPstBodyId}`).remove();
            }
        };
        // UN/SEND
        const shrFuncs = (user, genUsr, send, rtrn) => {
            
            // UI check
            if (genUsr.notifications.length > 0) {
                var flag = '';
                for (let i = 0; i < genUsr.notifications.length; i++) {
                    if (genUsr.notifications[i].noti_type == 'shr_thr' && genUsr.notifications[i].post == data._id && genUsr.notifications[i].user == udata._id) {
                        flag = 'white';
                        $(`#${rtrn}`).css('display', 'inline');
                    }
                }
                if (flag == '') {
                    $(`#${send}`).css('display', 'inline');
                }
            }else {
                $(`#${send}`).css('display', 'inline');
            }

            //BTNS - send
            $(`#${send}`).click(function() {
                var dateNow = [year, day, month, hour, minute, secnds];
                tagNoti(genUsr, data, udata, tg, dateNow);
                flowFrndsrch($(`#${shrPstSrch}`).val());
            });

        };

    };
    // edt thr
    const editThr = (data, udata, edtPost) => {

        if (data.user !== udata._id) {
            $(`#${edtPost}`).css('display', 'none');
        }

        const edtThrd = (ind) => {
            return `
            <div class="container-fluid" id="edtThrdBod" style="display:none;">
                <div class="row" style="height:100%;">
                    <div class="col-xs-12" style="position:fixed; z-index:${ind}; height:100%; background-color:rgba(0, 0, 0, 0.35);">
                        
                        <div class="row" style="height:100%;">
                            <div class="col-xs-12" style="bottom:0; right:0; position:fixed; z-index:${ind+1};">
                                <div class="edtAlrBod" style="margin-bottom:10px; border-radius:10px;">
                                    <div style="width:100%; height:40px;">
                                        <p style="margin:0px; padding:5px; text-align:center;">
                                            <img src="assets/imgs/can.png" width="15px" height="15px" id="clsEdtThr">
                                        </p>
                                    </div>
                                    <div class="doneLertDiv" style="width:100%; height:100px; overflow-y:auto;" id="">
                                        <br>
                                        <input maxlength="200" class="srchCon sub_h" id="edtThrIn" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="header" />
                                    </div>
                                    <div class="doneLertDiv" style="width:100%; height:40px;">
                                        <p id="plcEdtThrBtn" style="text-align:center; margin:0px; padding:7.5px;">
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                
            `
        };

        $(`#${edtPost}`).click(()=>{
            global.pop_no++;
            var ind = global.pop_no;
            $('#dropCons').before(edtThrd(ind));
            Dark();
            $('#edtThrIn').val(`${data.head}`);
            $(`#edtThrdBod`).fadeIn();
            if (udata.mode == 'light') {
                $('.srchCon').css('border-bottom', 'solid 1px #f0f0f0');
                $('.edtThrTxt').css('border', 'solid 1px #f0f0f0');
                $('#alertBody, .edtAlrBod').css('background-color', 'white');
                $('#doneLertDiv, .doneLertDiv').css('border-top', 'solid 1px #dddddd');
                $('#alertText').css('color', 'grey');
            }else {
                $('.srchCon').css('border-bottom', 'solid 1px #404040');
                $('.edtThrTxt').css('border', 'solid 1px #f0f0f0');
                $('#alertBody, .edtAlrBod').css('background-color', '#262626');
                $('#doneLertDiv, .doneLertDiv').css('border-top', 'solid 1px #404040');
                $('#alertText').css('color', '#f9f9f9');
            }
            initEdt();
        });
        
        // FUNCS
        // -----
        // done
        const doneEdtn = (donEdtn) => {
            $(`#${donEdtn}`).click(()=>{
                if ($('#edtThrIn').val() !== '') {
                    var pData = {
                        section: 'str_thr',
                        type: 'updt_thr',
                        head: $('#edtThrIn').val(),
                        id: data._id,
                    };
                    postData(pData);
                    $(`#clsEdtThr`).click();
                }
            })
        }
        // crtids
        const crtEdtIds = (id) => {
            return {
                donEdtn: 'donEdtn_' + id,
            }
        };
        // init
        const initEdt = () => {
            var ids = crtEdtIds(data._id);
            checkMode();
            $('#plcEdtThrBtn').append(`<button id="${ids.donEdtn}" class="btn btn-default btn-xs doneEdtThr" style="border:solid 1px darkorange; border-radius:5px; background-color:transparent; color:darkorange;">ok</button>`);
            doneEdtn(ids.donEdtn);
            $('#clsEdtThr').click(()=>{
                global.pop_no--;
                $('#edtThrdBod').fadeOut();
                setTimeout(() => {
                    $(`#edtThrdBod`).remove();
                }, 500);
            });
        }

    };

    // VIEW BIG-BODY AND CONTENTS
    //-----------------------------
    // body

    // CHECK AND EXTRACT USER DATA
    var loadin = () => {
        return `
        <div class="col-xs-12 b5_exP" style="position:fixed; z-index:4; background-color:#1a1a1a; opacity:0.4; height:100%;"></div>
        `
    };
    const ViewStr = (data, ind, user, path, clss, ids) => {

        return `
        <div class="row">
            <div id="" class="col-xs-12 ex-slider-str" style="display:none; position:fixed; z-index:${ind}; height:98%; box-shadow:0px 0px 20px -10px black; border-bottom-left-radius:25px; border-bottom-right-radius:25px;">
                <div class="row" style="height:100%;">

                    <div class="col-xs-12 strFlowDiv" style="height:92.5%; overflow-y:auto;">
                        <div class="row">
                            <!-- 
                                bellow contains the flow contents for strings
                                __________________________________________
                            -->
                            <div class="col-md-12 col-lg-12 col-xs-12 vewStrTops" style="height:35px; position: fixed; z-index:4; box-shadow:0px 0px 10px -5px #1a1a1a;">
                                <div class="row">
                                    <div class="col-md-3 col-xs-6">
                                        <p id="${ids.addConBut}" style="margin:5px; cursor:pointer;"><img src="assets/imgs/addxs.png" width="25px" height="25px"></p>
                                    </div>
                                    <div class="col-md-3 col-xs-6">
                                        <p style="margin:0px; padding:5px; float:right; font-size:13px;" class="sub_h">${data.type} string</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-12 col-xs-12 strContntHandlr" id="strContntHandlr" style="height:100%; margin-top:35px;">
                                <div class="row">
                    
                                <!--
                                    ------------------------
                                    thread flow area
                                    ------------------------
                                -->
                                <div class="col-md-7 col-lg-7 col-xs-12 strFlowDiv" style="overflow-y: auto; ">
                    
                                    <div class="" style="width:100%;">

                                        <!-- crtn info addConStr -->
                                        <div class="col-lg-7 col-xs-12" id="str_info_con" style="margin-bottom:10px; margin-top:10px;">
                                            <div style="width:97.5%; margin:auto; height:200px; border-radius:10px;" class="inStrUflow">
                                                <div style="width:100%; height:90px;">
                                                    <br>
                                                    <div id="" class="${clss}" style="width:75px; height:75px; margin:auto; margin-top:-10px; background-image:url(${path}); border-radius:100%; background-size:100% 100%;"></div>
                                                </div>
                                                <div style="width:100%; height:30px;">
                                                    <p id="${ids.visUsrProf}" class="sub_h" style="margin:0px; padding:5px; text-align:center;">created by <span class="postBodtxt">${user}</span></p>
                                                </div>
                                                <div style="width:100%; height:80px;">
                                                    <div style="width:95%; margin:auto; margin-top:3px; height:55px; border-radius:5px; overflow-y:auto;" class="edtPstBd">
                                                        <p style="font-size:16.5px; margin:0px; margin-left:3px; padding:5px;" class="postBodtxt">${data.head}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p id="str_pup_tt" style="display:none; text-align:center; font-size:16.5px; margin:0px; padding:3px; margin-top:10px;" class="sub_h"></p>
                                        <div class="col-lg-12 col-xs-12" style="margin-bottom:10px; margin-top:10px;">
                                            <div style="width:97.5%; margin:auto; border-radius:10px;" class="inStrUflow">
                                                <div style="width:100%; height:65px;">
                                                    <div style="width:90%; margin:auto; height:100%;" class="vewStrTops">
                                                        <br>
                                                        <p style="text-align:center; margin:0px; padding:2px; margin-top:-5px;">
                                                            <img src="assets/imgs/read.png" width="30px" height="30px" style="margin-right:5px; cursor:pointer;" id="${ids.readB}">
                                                            <img src="assets/imgs/frnds.png" width="39.5px" height="30px" style="margin-left:5px; cursor:pointer;" id="${ids.tiesB}"> <span class="sub_h" style="font-size:13px; margin:0px; padding:3px;" id="${ids.tiesL}"></span>
                                                            <img src="assets/imgs/share.png" width="30px" height="30px" id="${ids.share}" style="margin-left:5px; cursor:pointer;">
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style="width:100%; height:65px;">
                                                    <p style="text-align:center; margin:0px; padding:5px; font-size:30px;" class="postBodtxt"> <span id="bigStrVTN"></span> <span class="sub_h" style="font-weight:lighter; font-size:20px;">threads</span> </p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- <div id="pubDataShow" style="margin: auto; margin-top: 20px; display:none;">
                                                <p class="" style="margin:0px; padding:5px; text-align:center;">
                                                    <span class="btn btn-default btn-xs strHdBd" style="border-radius: 15px; box-shadow:0px 0px 30px -15px black; color:lightblue; border:none; padding:5px; font-size:15px;">
                                                        <span style="padding:5px;">${data.name}</span> <img src="assets/imgs/strings.png" width="25px" height="25px" style="padding:5px;"> 
                                                    </span>
                                                </p>
                                            <p class="sub_h" style="font-size:12px; text-align:center; margin:0px; padding:5px; margin:0px;"><i>public</i></p>
                                        </div>
                                        <p style="color:lightblue; font-size:11.5px; text-align:center; margin:0px; padding:5px;"><strong id="${ids.trhTdLen}"></strong> <i class="sub_h" style="font-size:10px;">threads</i> </p>
                                        <br>   --> 

                                    </div>
                    
                                    <!-- users tagged in string area
                                    <div id="tagBdyId" class="tagedToStrngUsrs" style="width:100%; display:none;">
                                        <br>
                                        <div style="width:100%;">
                                            <div class="row">
                        
                                            <div class="col-md-1"></div>
                                            <div class="col-md-10 col-xs-12">
                                                <div class="inStrUflow" style="width: 100%; height: 160px; border-radius: 8px; overflow-y: auto;">
                                                    <span id="${ids.dispTies}"></span>
                                                </div>
                                            </div>
                                            <div class="col-md-1"></div>
                        
                                            </div>
                                        </div>
                                        <br>
                                    </div>
                                    -->
                    
                                    <!-- acquainted area -->
                                    <div class="bedrBotStr" id="acqntdId" style="width:100%; display:none;">
                                    <p class="sub_h" style="font-size:12.5px; padding:8px; margin:0px;"> <span id="${ids.acqNote}"></span> relatable threads </p>

                                    <div class="row">
                    
                                        <div class="col-xs-6 col-lg-3">
                                            <div class="row">
                                                <span id="${ids.acqAppD1}"></span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-lg-3">
                                            <div class="row">
                                                <span id="${ids.acqAppD2}"></span>
                                            </div>
                                        </div>
                  
                                    </div>

                                    <span id="dropLoaderVwThrdsAcq"></span>
                                    
                                    <br>
                                    </div>
                    
                                    <!-- rest of the flow area -->
                                    <div class="row bedrBotStr">
                                        <br>

                                        <div class="col-xs-6 col-lg-3">
                                            <div class="row">
                                                <span id="${ids.prepAllD1}"></span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-lg-3">
                                            <div class="row">
                                                <span id="${ids.prepAllD2}"></span>
                                            </div>
                                        </div>
                    
                                        <br>
                                    </div>

                                    <span id="dropLoaderVwThrds"></span>
                                    <br>
                    
                                </div>
                    
                                <!-- thread tapped area
                                -----------------------------------
                                -->
                                <div class="col-md-5 col-lg-5 col-xs-12 strThrdVwr">
                                    
                    
                                </div>

                                </div>
                            </div>
  
                        </div>
                    </div>

                    <!-- bottom/close area -->
                    <div id="clsStrCon" class="col-xs-12" style="height:7.5%;">
                        <p style="text-align:center; margin:0px;">
                            <img id="closeStrVw" src="assets/imgs/up.png" width="35px" height="22.5px" style="display:none; opacity:0.7;">
                        </p>
                    </div>

                </div>
            </div>
        </div>
  
        `
    };
    // if tagged to private string
    const tagedTo = (user) => {
        return `
        <div class="col-md-4 col-xs-6" style="margin-top: 15px;">
            <div class="tiedUBod" style="width:100%; height:125px; border-radius:5px;">
                <div style="width:75px; height: 85px; margin: auto; padding-top: 10px; border-radius:100%;">
                    <img src="assets/imgs/profpic.png" alt="" width="100%" height="100%" style="border-radius:100%;">
                </div>
                <a href="/${user}" style="text-decoration:none;"><p style="margin: 0px; padding:5px; color:skyblue; font-size: 13px; text-align: center;">${user}</p></a>
            </div>
        </div>
        `
    };
    
    /* 
    ----------------------------------
    THREADS AND VIEW FUNCTIONALITIES
    ----------------------------------
    */
    // CHECKS BELLOW 
    //-----------------
    // check if somebody was tagged
    const checkTg = (thrdata, data, udata, dispTies) => {
        if (data.type == 'Private') {
            if (data.tied.length > 0) {
                $(`#tagBdyId`).css('display', 'block');
                // check if users tied is greater than 0
                var user = '';
                var data3 = db.users;
                for (let i = 0; i < data.tied.length; i++) {
                        if (data.tied.length > 0) {
                            if (data3) {
                                for (let z = 0; z < data3.length; z++) {
                                    if (data3[z]._id == data.tied[i]) {
                                        user = data3[z].user_name;
                                    }
                                }
                                $(`#${dispTies}`).after(tagedTo(user));
                            }
                        }
                    }
            }else {
                $(`#tagBdyId, #acqntdId`).css('display', 'none');
            }
        }
    };

    // threads prependers
    var thrCntrVw = 0; var lenAddrVw = 15; var thrArrVw = new Array(); var thrCntrVwAcq = 0; var lenAddrVwAcq = 4; var thrArrVwAcq = new Array();
    const prependers = (thrdata, data, udata, data3, dropsAll, dropsAcq, acqNote, trhTdLen, ids) => {
        var appLen = 0;
        for (let i = 0; i < thrdata.length; i++) {
            if (thrdata[i].tied_to == data._id) {
                appLen++;
            }
        }
        $(`#${trhTdLen}`).text(appLen);
        thrCntrVw = 0; lenAddrVw = 15; thrArrVw = []; thrCntrVwAcq = 0; lenAddrVwAcq = 15; thrArrVwAcq = [];
        var dataFlwn = udata;
        $('.thread_xs_cons').remove();
        for (let i = 0; i < thrdata.length; i++) {
            if (thrdata[i].content_type == "thread" && thrdata[i].tied_to == data._id) {
                //thrArrVw[thrArrVw.length] = {thr: thrdata[i], str: data, me: udata, prep: prepAll, acq: acqApp, note: acqNote};
                //displayThreads(thrdata[i], data, udata, prepAll, acqApp, acqNote);
                if (thrdata[i].user == udata._id) {
                    $('#acqntdId').slideDown(200);
                    thrArrVwAcq[thrArrVwAcq.length] = {thr: thrdata[i], str: data, me: udata, prep: dropsAll, acq: dropsAcq, note: acqNote, rel: 'y'};
                }else {
                    var vail = 'none';
                    if (dataFlwn.following.length > 0) {
                        for (let z = 0; z < dataFlwn.following.length; z++) {
                            if (thrdata[i].user == dataFlwn.following[z].user) {
                                $('#acqntdId').slideDown(200);
                                vail = 'some';
                                thrArrVwAcq[thrArrVwAcq.length] = {thr: thrdata[i], str: data, me: udata, prep: dropsAll, acq: dropsAcq, note: acqNote, rel: 'y'};
                                // date
                            }
                        }
                        if (vail == 'none') {
                            for (let s = 0; s <  data3.length; s++) {
                                if (thrdata[i].user == data3[s]._id && thrdata[i].user !== udata._id) {
                                    if (data3[s].publicity !== 'private') {
                                        thrArrVw[thrArrVw.length] = {thr: thrdata[i], str: data, me: udata, prep: dropsAll, acq: dropsAcq, note: acqNote, rel: 'n'};
                                    }
                                }
                            }
                        }
                    }else {
                        for (let s = 0; s <  data3.length; s++) {
                            if (thrdata[i].user == data3[s]._id && thrdata[i].user !== udata._id) {
                                if (data3[s].publicity !== 'private') {
                                    thrArrVw[thrArrVw.length] = {thr: thrdata[i], str: data, me: udata, prep: dropsAll, acq: dropsAcq, note: acqNote, rel: 'n'};
                                }
                            }
                        }
                    };

                }
            }
        }
        console.log('thr len: '+thrArrVw.length+', thr acq: '+thrArrVwAcq.length);
        if (thrArrVw.length > 0) {
            applyPrepThrds(dropsAll, dropsAcq);
        }
        if (thrArrVwAcq.length > 0) {
            applyPrepThrdsAcq(dropsAll, dropsAcq);
        }
        
    };
    const applyPrepThrds = (dropsAll, dropsAcq) => {
        $('.ThrVwldmreBtn').remove();
        if (lenAddrVw > thrArrVw.length) {
            lenAddrVw = thrArrVw.length;
        }
        for (let i = 0; i < lenAddrVw; i++) {
            if (thrCntrVw < i+1) {
                thrCntrVw++;
                checkMode();
                displayThreads(thrArrVw[i].thr, thrArrVw[i].str, thrArrVw[i].me, thrArrVw[i].prep, thrArrVw[i].acq, thrArrVw[i].note, thrArrVw[i].rel, dropsAll, dropsAcq);
            }
        }
        if (thrArrVw.length > lenAddrVw) {
            $('.ThrVwldmreBtn').remove();
            $(`#dropLoaderVwThrds`).after(`
            <div class="ThrVwldmreBtn" id="ThrldMrVw-mnp" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -10px black; border-radius:10px;">
                    <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                    </div>
            `);
            $('#ThrldMrVw-mnp').click(()=>{
                lenAddrVw = lenAddrVw+lenAddrVw;
                applyPrepThrds(dropsAll);
            });
        }else {
            $('.ThrVwldmreBtn').remove();
        }
    };
    const applyPrepThrdsAcq = (dropsAll, dropsAcq) => {
        $('.ThrVwlAcqdmreBtn').remove();
        if (thrArrVwAcq.length < lenAddrVwAcq) {
            lenAddrVwAcq = thrArrVwAcq.length;
        }
        for (let i = 0; i < lenAddrVwAcq; i++) {
            if (thrCntrVwAcq < i+1) {
                thrCntrVwAcq++;
                checkMode();
                displayThreads(thrArrVwAcq[i].thr, thrArrVwAcq[i].str, thrArrVwAcq[i].me, thrArrVwAcq[i].prep, thrArrVwAcq[i].acq, thrArrVwAcq[i].note, thrArrVwAcq[i].rel, dropsAll, dropsAcq);
            }
        }
        if (thrArrVwAcq.length > lenAddrVwAcq) {
            $('.ThrVwlAcqdmreBtn').remove();
            $(`#dropLoaderVwThrdsAcq`).after(`
                <div class="ThrVwlAcqdmreBtn" id="ThrldMrVwAcq-mnp" style="margin:auto; margin-top:7.5px; width:80px; height:20px; box-shadow:0px 0px 30px -10px black; border-radius:10px;">
                    <p style="text-align:center; margin:0px; padding:2px; color:orange; font-size:12px;">load more</p>
                </div>
            `);
            $('#ThrldMrVwAcq-mnp').click(()=>{
                lenAddrVwAcq = lenAddrVwAcq+lenAddrVwAcq;
                applyPrepThrdsAcq(dropsAll, dropsAcq);
            });
        }else {
            $('.ThrVwlAcqdmreBtn').remove();
        }
            
    };

    // activity funcs
    const actvtArea = (thrdata, data, udata, ids) => {
        if (data.type == 'Private') {
            $('#strActvtCon').css('display', 'block');
            if (data.body !== "") {
                $(`#${ids.readB}`).fadeIn();
            }else {
                $(`#${ids.readB}`).css('display', 'none');
            }
            if (data.tied.length > 0) {
                $(`#${ids.tiesL}`).text(data.tied.length);
            }else {
                $(`#${ids.tiesL}, #${ids.tiesB}`).fadeOut();
            }
        }else {
            $(`#${ids.readB}, #${ids.tiesB}`).fadeOut();
        }
    };

    // dataInStr
    const dataInStr = (thrdata, data, udata, ids) => {
        // assignDb();
        // str info opt body
        // --------
        const strOp = (pIds, t) => {
            var ind = global.pop_no+2;
            var info = ''; var infT = '';
            if (t == 'read') {
                info = data.body; infT = 'string body';
            } 
            if (t == 'ties') {
                infT = 'users ties to string';
            }
            if (t == 'tag') {
                infT = 'tag friends';
            }
            return `
            <div class="row">
                <div class="col-xs-12 col-lg-12 prevCons" id="${pIds.bodyI}" style="position:fixed; z-index:${ind}; height:100%; display:none;">
                    <div class="row">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4 col-xs-12">
                            <br>
                            <div class="srchCon_tag" style="width:100%; height:350px; margin-top:-5px; background-color:white; border-radius:7.5px; box-shadow:0px 0px 15px -5px rgba(0, 0, 0, 0.3);">
                                <div style="width:100%; height:40px;">
                                    <p style="text-align:center; margin:0px; padding:5px;"> <img src="assets/imgs/can.png" width="15px" height="15px" style="cursor:pointer;" id="${pIds.clsCon}"> </p>
                                </div>
                                <div style="width:100%; height:270px;">
                                    <div id="${pIds.TRbod}" class="chptrsCr" style="width:97.5%; height:100%; margin:auto; border-radius:5px; overflow-y:auto; display:none;">
                                        <p id="${pIds.strIn}" style="margin:1px; padding:5px; white-space: pre-wrap; display:none; white-space: pre-wrap;" class="postHeaderfrst">${info}</p>
                                        <span id="${pIds.TiedDr}"></span>
                                        <br>
                                    </div>
                                    <div id="${pIds.tagCon}" class="chptrsCr" style="width:97.5%; height:100%; margin:auto; border-radius:5px; display:none;">
                                        <div style="width:100%; height:40px;" class="vewStrTops">
                                            <input id="${pIds.tagIn}" placeholder="search friends" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="padding:5px; float:left; width:80%; height:27.5px; margin:5px; border:none; border-radius:15px;" class="srchCon_tag sub_h">
                                            <img src="assets/imgs/searcheda.png" width="25px" height="25px" style="float:right; margin:5px;">
                                        </div>
                                        <div style="width:100%; height:210px; overflow-y:auto;">
                                            <span id="${pIds.tagFlw}"></span>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                                <div style="width:100%; height:40px;">
                                    <p style="text-align:center; margin:0px; padding:5px; font-size:18px;" class="sub_h">${infT}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4"></div>
                    </div>
                </div>
            </div>
            `
        }
        const strVIMDFuncs = (pIds, t) => {
            var users = db.users;
            if (users) {
                for (let z = 0; z < data.tied.length; z++) {
                    var user = ''; var usr = ''; var id = '';
                    for (let i = 0; i < users.length; i++) {
                        if (data.tied[z] == users[i]._id) {
                            usr = users[i].user_name; id = users[i]._id;
                        }
                    }
                    if (usr.length > 15) {
                        user = usr.slice(0, 15)+'..';
                    }else {
                        user = usr;
                    }
                    $(`#${pIds.TiedDr}`).prepend(`
                        <div class="checkTiedBod" id="opn_usr-lst_str_${id}" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                            <div style="width:30%; height:100%; float:left;">
                                <div style="width:33px; height:33px; margin:auto; background-image:url(assets/imgs/profb.png); background-size:100% 100%; border-radius:100%; margin-top:3px;"></div>
                            </div>
                            <div style="width:50%; height:100%; float:left;">
                                <p class="sub_h" style="color:skyblue; padding:5px; margin:5px;">${user}</p>
                            </div>
                            <div style="width:20%; height:100%; float:right;">
                                
                            </div>
                        </div>
                    `);
                    if(udata.mode == 'light') {
                        $('.checkTiedBod').css('border', 'solid 1px #dddddd');
                        $('.checkTiedBod').css('background-color', 'white');
                    }else {
                        $('.checkTiedBod').css('border', 'solid 1px #404040');
                        $('.checkTiedBod').css('background-color', '#1a1a1a');
                    }
                    idExFunc(id, udata, `opn_usr-lst_str_${id}`);
                    Dark();
                }
            
            }
        }
        const shrVIFuncs = (pIds) => {
            $(`#${pIds.tagIn}`).on('input', function(key){
                var value = $(this).val();
                $(this).val(value.replace(/ /g, '_'));
            });
            
            // modes
            const chkModeShr = () => {
                refreshI();
                if(udata.mode == 'light') {
                    $('.shrPstBod').css('border', 'solid 1px #dddddd');
                    $('.shrPstBod').css('background-color', 'white');
                }else {
                    $('.shrPstBod').css('border', 'solid 1px #404040');
                    $('.shrPstBod').css('background-color', '#1a1a1a');
                }
                Dark();
            };

            // value search
            $(`#${pIds.tagIn}`).keyup(()=>{
                $('.shrPstBod').remove();
                if ($(`#${pIds.tagIn}`).val() == '') {
                    flowknwn();
                }else {
                    flowFrndsrch($(`#${pIds.tagIn}`).val());
                }
            });
            async function flowFrndsrch(tagSrc) {
                const settings = {
                    method: 'post',
                    body: JSON.stringify({ srch: tagSrc }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/searcher/searchFrnd`, settings);
                    const data = await response.json();
                    var users = db.users;
                    $('.shrPstBod').remove();
                    for (let i = 0; i < data.length; i++) {
                        
                        var usr = ''; var genUsrr = '';
                        for (let z = 0; z < users.length; z++) {
                            if (data[i]._id == users[z]._id) {
                                genUsrr = users[z]
                                usr = users[z].user_name;
                            }
                        }
                        passMe(usr, genUsrr);
                        chkModeShr();
                    }
                } catch (error) {
                    alert(error);
                }
            };
    
            // create share Isd
            const createShrIds = (user) => {
                return {
                    shrPstSndBtn: 'shrPstSndBtn_' + user,
                    shrPstBodyId: 'shrPstBodyId_' + user,
                    shrPstRtrnBtn: 'shrPstRtrnBtn_' + user
                }
            };
            const flowknwn = () => {
                if (udata.following.length > 0 && udata.chats.length > 0) {
                    for (let z = 0; z < udata.following.length; z++) {
                        for (let x = 0; x < udata.chats.length; x++) {
                            
                            if (udata.following[z].user == udata.chats[x].user) {
                                
                                var users = db.users;
                                var usr = ''; var genUsrr = '';
                                for (let i = 0; i < users.length; i++) {
                                    if (udata.following[z].user == users[i]._id && udata.chats[x].user == users[i]._id) {
                                        genUsrr = users[i]
                                        usr = users[i].user_name;
                                    }
                                }
                                passMe(usr, genUsrr);
                                chkModeShr();
        
                            }
        
                        }
                    }
                }
            };
            // pass con
            const passMe = (usr, genUsrr) => {
                var user = '';
                if (usr.length > 15) {
                    user = usr.slice(0, 15)+'..';
                }else {
                    user = usr;
                }
                var path = ''; var clss = '';
                if (genUsrr.profile_pic == 'none') {
                    path = 'assets/imgs/profb.png';
                }else {
                    clss = genUsrr.profile_pic.clas;
                    path = `https://test-vyral.onrender.com/${genUsrr.profile_pic.path}`;
                }
                const ids = createShrIds(genUsrr._id);
                $(`#${pIds.tagFlw}`).append(shrBd(user, path, clss, ids));
                shrFuncs(user, genUsrr, ids.shrPstSndBtn, ids.shrPstRtrnBtn);
                if (udata.user_name == usr) {
                    $(`#${ids.shrPstBodyId}`).remove();
                }
            };
            // UN/SEND
            const shrFuncs = (user, genUsr, send, rtrn) => {
                
                // UI check
                if (genUsr.notifications.length > 0) {
                    var flag = '';
                    for (let i = 0; i < genUsr.notifications.length; i++) {
                        if (genUsr.notifications[i].noti_type == 'shr_thr' && genUsr.notifications[i].post == data._id && genUsr.notifications[i].user == udata._id) {
                            flag = 'white';
                            $(`#${rtrn}`).css('display', 'inline');
                        }
                    }
                    if (flag == '') {
                        $(`#${send}`).css('display', 'inline');
                    }
                }else {
                    $(`#${send}`).css('display', 'inline');
                }
    
                //BTNS - send
                $(`#${send}`).click(function() {
                    var dateNow = [year, day, month, hour, minute, secnds];
                    var tg = 'shr_str';
                    tagNoti(genUsr, data, udata, tg, dateNow);
                    flowFrndsrch($(`#${pIds.tagIn}`).val());
                });
    
            };
            
        }
        const createStrinCon = () => {
            return {
                bodyI: `${data._id}_stropnCon_${udata._id}bodyI`,
                clsCon: `${data._id}_stropnCon_${udata._id}clsCon`,
                TRbod: `${data._id}_stropnCon_${udata._id}TRbod`,
                strIn: `${data._id}_stropnCon_${udata._id}strIn`,
                TiedDr: `${data._id}_stropnCon_${udata._id}TiedDr`,
                //m tag
                tagIn: `${data._id}_stropnCon_${udata._id}tagIn`,
                tagCon: `${data._id}_stropnCon_${udata._id}tagCon`,
                tagFlw: `${data._id}_stropnCon_${udata._id}tagFlw`,
            }
        }
        const dropStrBi = (t) => {
            const pIds = createStrinCon();
            $('.ex-slider-str').css('filter', 'blur(5px)');
            $('#dropChat').prepend(strOp(pIds, t));
            checkMode();
            if (t == 'ties' || t == 'read') {
                $(`#${pIds.TRbod}`).fadeIn();
                if (t == 'read') {
                    $(`#${pIds.strIn}`).fadeIn();
                }
            } else {
                $(`#${pIds.tagCon}`).fadeIn();
            }
            $(`#${pIds.bodyI}`).fadeIn();
            const vrtlBtns = {
                
            }
            // cls
            $(`#${pIds.clsCon}`).click(()=>{
                $('.prevCons').fadeOut();    
                $('.ex-slider-str').css('filter', '');
                $('.prevCons').remove();    
            });
            if (t == 'tag') {
                shrVIFuncs(pIds);
            }
            // funcs
            if (t == 'ties') {
                strVIMDFuncs(pIds, t);
            }
        }

        // BTNS
        // ----
        $(`#${ids.readB}`).click(()=>{
            const t = 'read';
            dropStrBi(t);
        });
        $(`#${ids.tiesB}`).click(()=>{
            const t = 'ties';
            dropStrBi(t);
        });
        $(`#${ids.share}`).click(()=>{
            const t = 'tag';
            dropStrBi(t);
        });
    }

    // add contents
    const addConStr = (thrdata, data, udata, addConBut, edtBody, edtClose) => {
        if (data.type == "Public") {
            $(`#${addConBut}`).css('display', 'inline');
            $(`#str_pup_tt`).fadeIn();
            $(`#str_pup_tt`).text(data.name);
            $(`#str_info_con`).css('display', 'none');
        }else {
            if (data.user == udata._id) {
                $(`#${addConBut}`).css('display', 'inline');
            }else {
                var check = '';
                for (let i = 0; i < data.tied.length; i++) {
                    if (data.tied[i] == udata._id) {
                        check = 'some';
                        $(`#${addConBut}`).css('display', 'inline');
                    }
                }
                if (check == '') {
                    $(`#${addConBut}`).css('display', 'none');
                }
            }
        }
        var nw = 'bg';
        edtStrSm(data, udata, addConBut, edtClose, edtBody, nw);
    };

    // close string view
    const closeStrVws = () => {
        $('#closeStrVw').click(()=>{
            global.pop_no--;
            $('.ex-slider-str').slideUp(100);
            $('#container-body').css('filter', '');
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
                if (distance < 0) {
                    $('#view-container, .ex-slider-str').remove();
                    $('.b5_exP').remove();
                    clearInterval(x);
                }
            }, 1000);
        });
        $('#closeThr').click(()=>{
            $('.strFlowDiv').css('display', 'block'); 
            $('.strThrdVwr').css('display', 'none'); 
        });
    };

    // check pub/priv
    const strngInfoCheck = (thrdata, data, udata) => {

        if (data.type == 'Private') {
            $('#privDataShow').fadeIn();
        }else {
            $('#pubDataShow').fadeIn();
        }

    };

    // thread ids
    const viewIds = (data, thrdata) => {
        return {
            // str top info
            addConBut: 'addConBut_' + data._id,
            readB: 'readB_view' + data._id,
            tiesB: 'tiesB_view' + data._id,
            tiesL: 'tiesL_view' + data._id,
            share: 'share_view' + data._id,
            // thrd head & img
            trhTdLen: 'trhTdLen_' + data._id,
            // vis prof
            visUsrProf: 'visUsrProf_' + data._id,
            // ties
            dispTies: 'dispTies_' + data._id,
            // prependers
            prepAllD1: 'prepAllD1_' + data._id,
            prepAllD2: 'prepAllD2_' + data._id,
            // acquianted
            acqAppD1: 'acqAppD1_' + data._id,
            acqAppD2: 'acqAppD2_' + data._id,
            acqNote: 'acqNote_' + data._id,
            // for str editor
            edtBody: 'edtBody_' + data._id,
            edtClose: 'edtClose_' + data._id
        }
    };

    // display view
    const displayView = (thrdata, data, udata) => {
        const ids = viewIds(data, thrdata);
        var user = ''; var uid = '';
        var path = ''; var clss = '';
        var data3 = db.users; global.pop_no++; var ind = global.pop_no;
        if (data3) {
            for (let i = 0; i < data3.length; i++) {
                if (data3[i]._id == data.user) {
                    user = data3[i].user_name;
                    uid = data3[i]._id;
                    if (data3[i].profile_pic == 'none') {
                        path = 'assets/imgs/profpic.png';
                    }else {
                        path = `https://test-vyral.onrender.com/${data3[i].profile_pic.path}`;
                        clss = `${data3[i].profile_pic.class}`;
                    }
                }
            }
            //$('#container-one').fadeOut(100);
            $('#container-body').css('filter', 'blur(5px)');
            $('#dropChat').after(ViewStr(data, ind, user, path, clss, ids));
            acqTDNo = 1; allTDNo = 1;
            checkMode(); Dark();
            // efftcs
            strngInfoCheck(thrdata, data, udata);
            checkTg(thrdata, data, udata, ids.dispTies);
            // prepend threads
            var dropsAcq = {
                one: ids.acqAppD1,
                two: ids.acqAppD2
            };
            var dropsAll = {
                one: ids.prepAllD1,
                two: ids.prepAllD2
            };
            prependers(thrdata, data, udata, data3, dropsAll, dropsAcq, ids.acqNote, ids.trhTdLen, ids);
            // add button/ func
            addConStr(thrdata, data, udata, ids.addConBut, ids.edtBody, ids.edtClose);
            // activity area funcs
            actvtArea(thrdata, data, udata, ids);
            //alert('here');
            idExFunc(uid, udata, ids.visUsrProf);
            //
            dataInStr(thrdata, data, udata, ids);
            // close str
            closeStrVws();
            var psts = db.all_posts;
            var nm = 0;
            for (let i = 0; i < psts.length; i++) {
                if (psts[i].content_type == 'thread' && psts[i].tied_to == data._id) {
                    nm++;
                }
            }
            magicNumbers('bigStrVTN', nm);
            setTimeout(() => {
                $('.ex-slider-str').slideDown(200);
                setTimeout(() => {
                    var h1 = $(`#clsStrCon`).css('height');
                    var sc = $(`#closeStrVw`).css('height');
                    setTimeout(() => {
                        var h11 = h1.slice(0, -2);
                        var scc = sc.slice(0, -2);
                        // set %
                        var perc = 50;
                        // check % for-each
                        var ev1 = perc/100*h11;
                        var scev1 = perc/100*scc;
                        // evaluation
                        var m1 = ev1-scev1;
                        // apply
                        $(`#closeStrVw`).css('margin-top', `${m1}px`);
                        $(`#closeStrVw`).css('display', `inline`);
                    }, 1000);
                }, 2000);
            }, 1000);
        }
    };
    
    // thread body nature
    const thread = (thrdata, secUser, ids) => {
        var thrH = thrdata.head;
        if (thrdata.head.length > 30) {
            thrH = `${thrdata.head.slice(0, 70)}..`   
        }
        return `
        <div class="col-lg-12 col-xs-12">
            <div class="thrdBod" style="border-radius: 5px; margin-bottom: 20px; cursor: pointer; width:100%;">
                <div id="${ids.thrdImgId}" style="width:100%; height:160px; border-radius: 5px; background-size: cover;">
                    <br>
                    <img id="${ids.multImgId}" src="assets/imgs/multiimg.png" alt="" width="30px" height="30px" style="bottom: 0; right: 0; margin-top:100px; margin-left:10px; opacity: 0.8; display:none;">
                </div>
                <div id="${ids.thrdVid}" style="width:100%; height:100%; border-radius: 5px; background-size: 100% 100%; display:none;">
                    <video poster="assets/imgs/emptback.png" id="${ids.thrVidSrc}" style="width:100%; height:160px; border-radius:5px;">
                        <br>
                    </video>
                    <!--<img  src="assets/imgs/playy.png" alt="" width="30px" height="30px" style="bottom: 0; right: 0; margin-top:-80px; margin-left:10px; opacity: 0.8;">-->
                </div>
                <div class="vewStrTops" style="width:95%; margin:auto;">
                    <p class="postDatefrst" id="${ids.opnUsr}" style="margin:0px; padding:2px; font-size:11px;">${secUser} </p>
                    <p class="postDatefrst" style="margin:0px; padding:1px; font-size:9px;" id="${ids.thrDateOne}"></p>
                </div>
                <p style="font-size:14px; margin:0px; padding:3px;" class="postBodtxt ${ids.thrdImgId}">${thrH}</p>
            </div>
        </div>
        `
    };

    // drop thrViewer
    const thrViewer = (thrdata, ind, backImg, opnUsrTwo, thrDate, likeThr, likeByThr, cmntThrBg, comThrBgBod, comThrBgFlow, comThrBgIn, comThrBgBtn, closeComBgThr, comThrBgLen, frwdImg, optThr, thrOptBod, clsThrOpt, delThrOpn, delThrQ, delThrY, delThrN, reprtId, repConId, inApRep, abusRep, clsRep, shareThr, closeSThr, thrImgBgTh, thrBigVidBod, vidBigThId, thrVidPly, thrVidPus, thrVidStp, thrVidCrntT, thrVidOrgT, thrVidMte, shrPst, shrPstBd, shrPstSrch, shrPstFlw, shrPstCls, edtThr) => {
        return `
        <div class="container-fluid containThr" style="display:none;">
    
            <div class="">
                <!-- close for xs -->
                <div class="row">
                    <div class="col-xs-12 clearfix visible-xs vewStrTops" style="background-color: white; box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.3); height: 37.5px; position: fixed; z-index: ${ind};">
                        <img id="${closeSThr}" class="bandw" src="assets/imgs/backa.png" alt="" width="15px" height="25px" style="margin:5px; float:left; cursor: pointer;">
                        <p class="sub_h" id="${opnUsrTwo}" style="float: left; margin: 0px; padding:5px; margin-left:10px; font-size:16px;"></p>
                        <img id="${optThr}" src="assets/imgs/opt.png" alt="" width="5px" height="20px" style="margin:5px; margin-top:6.5px; float:right; cursor: pointer;">
                        <p class="sub_hs" id="${thrDate}" style="float: right; margin: 0px; padding:5px; margin-top:5px;"></p>
                    </div>
                </div>

                <!-- opt area -->
                <div class="row">
                    <div class="col-md-5 col-xs-12 strContntHandlr" style="position: fixed; z-index: ${ind}; margin-top:50px; height:100%;;">
                        <div class="postBodyCon" id="${thrOptBod}" style="width:100%; display: none; border-radius:5px; box-shadow:0px 0px 8px -1px rgba(0, 0, 0, 0.25);">
                            <div class="edtPstFlw" style="width:100%; height:35px;">
                                <p style="text-align:center; margin:0px; padding:3px;"><img id="${clsThrOpt}" src="assets/imgs/up.png" width="25px" height="15px" style="cursor:pointer;"></p>
                            </div>
                            <!-- edt cons -->
                                <div id="${edtThr}" class="edtPstFlw" style="width:100%; height:35px;">
                                    <p class="sub_h" style="margin:8px; cursor:pointer;"> <img src="assets/imgs/wada.png" width="12.5px" height="15px" style="margin-right:10px;"> Edit thread header</p>
                                </div>
                                <!-- delp cons -->
                                <div id="${delThrOpn}" class="edtPstFlw" style="width:100%; height:35px;">
                                    <p style="margin:8px; color:orangered; cursor:pointer;"> <img src="assets/imgs/del.png" width="12.5px" height="15px" style="margin-right:10px;"> Delete thread</p>
                                </div>
                                <div id="${delThrQ}" class="areYSPCon" style="width:100%; height:60px; display:none;">
                                    <div class="areysPP" style="width:100%; height:30px;">
                                        <p class="sub_h" style="text-align:center; margin:0px; padding:5px;"> Are you sure you want to delete post?</p>
                                    </div>
                                    <div style="width:100%; height:30px;">
                                        <div class="yesesP" style="width:49%; float:left; height:100%; float:left;">
                                            <p id="${delThrY}" style="text-align:center; color:orangered; margin:5px; cursor:pointer;">Yes</p>
                                        </div>
                                        <div style="width:49%; float:left; height:100%; float:right;">
                                            <p class="sub_h" id="${delThrN}" style="text-align:center; margin:5px; cursor:pointer;">Cancel</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- report cons -->
                                <div id="${reprtId}" class="" style="width:100%; height:35px;">
                                    <p class="sub_h" style="margin:8px; cursor:pointer;"> <img src="assets/imgs/flag.png" width="15px" height="15px" style="margin-right:10px;"> Report post</p>
                                </div>
                                <div id="${repConId}" class="areYSPCon" style="width:100%; display:none;">
                                    <div class="areysPP" style="width:100%; height:30px;">
                                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${inApRep}"> Inappropriate content </p>
                                    </div>
                                    <div class="areysPP" style="width:100%; height:30px;">
                                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${abusRep}"> Abusive content </p>
                                    </div>
                                    <div class="areysPP" style="width:100%; height:30px;">
                                        <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${clsRep}"> cancel </p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                    <!-- comments area -->
                    <div class="row">
                        <div class="col-md-5 col-xs-12" style="position: fixed; z-index:${ind}; margin-top:50px;">
                            <div class="postBodyCon" id="${comThrBgBod}" style="width:98%; margin:auto; height:300px; padding-bottom:5px;  border-radius:5px; box-shadow:0px 0px 8px -1px rgba(0, 0, 0, 0.25); display: none;">
                                <div style="width:100%; height:200px; overflow-y:auto;">
                                    <span id="${comThrBgFlow}" class="comFlow"></span>
                                </div>
                                <div class="commentIn" style="height:60px;">
                                    <textarea placeholder="comment" class="commentInput" style="margin:5px; width:70%; height:47.5px; float:left; border-radius:5px; color:darkorange;" id="${comThrBgIn}"></textarea>
                                    <img src="assets/imgs/send.png" width="35px" height="35px" style="float:right; margin:5px;" id="${comThrBgBtn}">
                                </div>
                                <div class="closeRdCon" style="width:100%; height:35px;">
                                    <p id="${closeComBgThr}" style="margin:1px; text-align:center; cursor:pointer;">
                                        <img src="assets/imgs/up.png" width="20px" height="10px">
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
                <!-- share area -->
                <div class="row">
                    <div class="col-md-5 col-xs-12" style="position: fixed; z-index: ${ind}; margin-top:50px;">
                        <!-- share content area -->
                        <div class="postBodyCon" id="${shrPstBd}" style="width:98%; margin:auto; height:240px;  border-radius:5px; box-shadow:0px 0px 8px -1px rgba(0, 0, 0, 0.25); padding-bottom:5px; display:none;">
                            <div class="srchCon" style="width:100%; height:30px; overflow-y:auto;">
                                <p id="" style="margin:3.5px; text-align:center; cursor:pointer;">
                                    <input id="${shrPstSrch}" placeholder="search friends" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; width:80%; height:80%; margin:1.5px; border:none; border-radius:7.5px;" class="srchCon_tag sub_h">
                                    <img src="assets/imgs/searcha.png" width="15px" height="15px" style="float:right; margin:2.5px;">
                                </p>
                            </div>
                            <div style="width:100%; height:175px; overflow-y:auto;">
                                <span id="${shrPstFlw}"></span>
                            </div>
                            <div class="closeRdCon" style="width:100%; height:35px;">
                                <p id="${shrPstCls}" style="margin:3.5px; text-align:center; cursor:pointer;">
                                    <img src="assets/imgs/up.png" width="20px" height="10px">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- username/date amplifier -->
                <div class="row">
                    <div class="col-md-5 col-xs-12 strFlowDiv" style="position: fixed; z-index: ${ind-1}; height:100%; overflow-y:auto;">
                        <div style="width:100%; height:10000px; margin-top:30px; margin-bottom:30px;">
                            <div id="" style="width:100%; height: 30px; margin-top:30px;">
                                <div style="width:30%; height:100%; float:left;">
                                    
                                </div>
                                <div style="width:40%; height:100%; float:left;">
                                    <p id="thrImgLen" style="text-align:center; margin:10px; color:darkorange; display:none;"> <span id="thrImgPres">1</span> <i class="sub_h" style="font-size:13px;">/<span id="thrImgFull"></span></i> </p>
                                </div>
                                <div style="width:30%; height:100%; float:right;">
                                    
                                </div>
                            </div>
                            <!--img and heading container -->
                            <div class="strThrdImg" ids="strThrICon" style="width:100%; margin: auto; height:3000px; margin-bottom:30px;">
                                <p id="thrHeadr" class="postHeaderfrst" style="padding: 5px; margin:0px; margin-top: 5px; font-size:16.5px;"></p>
                                <img id="${thrImgBgTh}" src="assets/imgs/emptback.png" alt="" width="100%" style="margin-bottom: 10px; border-radius:5px; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.25);">
                                <video poster="assets/imgs/emptback.png" src="" alt="" width="100%" id="${vidBigThId}" style="border-top-right-radius: 7.5px; border-top-left-radius: 7.5px;border-radius:5px; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.25); display:none;"></video>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- activity container -->
                <div class="row">
                    <div class="col-md-5 col-xs-12" style="position:fixed; z-index:${ind}; bottom:0; right:0;">
                        <div id="strActvtCon" style="width:100%; margin:auto; margin-bottom:5px; border-radius:5px; box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.3);">
                            <div id="${thrBigVidBod}" class="postInfoCon" style="opacity:0.8; width:100%; height:30px; display:none;">
                                <img id="${thrVidPly}" src="assets/imgs/playn.png" width="17.5px" height="17.5px" style="margin:5px; float:left; cursor:pointer;">
                                <img id="${thrVidPus}" src="assets/imgs/pausen.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;">
                                <!-- <img id="${thrVidStp}" src="assets/imgs/stopy.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;"> -->
                                <img id="${thrVidMte}" src="assets/imgs/muten.png" width="15px" height="15px" style="margin:7.5px; float:right; cursor:pointer;">
                                <p class="sub_h" style="float:right; margin:5px; font-size:13px;"> <span id="${thrVidCrntT}" style="font-size:12.5px; color:orange;"></span>/<span class="sub_h" id="${thrVidOrgT}" style="font-size:10px;"></span> </p>
                            </div>
                            <div style="height:35px; width:100%;">
                                <div id="${backImg}" style="display: none; float:left; margin:5px; margin-right: 10px; cursor:pointer;"><img id="" src="assets/imgs/backa.png" alt="" width="17.5px" height="25px" style="cursor:pointer;"></div>
                                <div id="" style="float:left; margin:5px;"><img id="${likeThr}" src="assets/imgs/like.png" alt="" width="22.5px" height="22.5px" style="cursor:pointer;"> <i id="${likeByThr}" style="font-size:11px; color:darkorange;">${thrdata.likedBy.length}</i> </div>
                                <div id="" style="float:left;"><img id="${cmntThrBg}" src="assets/imgs/comment.png" alt="" width="22.5px" height="22.5px" style="margin:5px; cursor:pointer;"> <i id="${comThrBgLen}" style="font-size:11px; color:darkorange;">${thrdata.comments.length}</i> </div>
                                <div id="${frwdImg}" style="display: none; float:right; margin:5px; margin-left: 10px;"><img id="" src="assets/imgs/backb.png" alt="" width="17.5px" height="25px" style="cursor:pointer;"></div>
                                <img id="${shrPst}" src="assets/imgs/share.png" alt="" width="22.5px" height="22.5px" style="margin:5px; float:right; cursor:pointer;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    };

    /*
    --------------------
    display threads
    -------------------- 
    */
    // thr multi-img check
    const thrMulitImg = (thrdata, data, multImgId, backImg, likeThr, cmntThr, frwdImg, optThr, shareThr) => {
        if (thrdata.img.length > 1) {
                $('#strActvtCon, #thrImgLen').css('display', 'block');
                $('#thrImgFull').text(thrdata.img.length);
                $(`#${backImg}, #${frwdImg}`).css('display', 'block');
            }else {
                $(`#${multImgId}, #thrImgLen`).css('display', 'none');
            }
    };

    // multi img thr
    const multiImgThr = (thrdata, data, thrImgBgTh, multImgId, backImg, likeThr, cmntThr, frwdImg, optThr, shareThr) => {
        $('#strActvtCon, #thrImgLen').css('display', 'block');
        //multi img check
        thrMulitImg(thrdata, data, multImgId, backImg, likeThr, cmntThr, frwdImg, optThr, shareThr);
         // left and right func
         var left = $(`#${backImg}`);
         var right = $(`#${frwdImg}`);
         var num = 0;
         // check multi img func
         
         left.click(function() {
             $(`#${thrImgBgTh}`).css('display', 'none');
             num--;
             if (num < 0) {
                 num = thrdata.img.length-1;
             }
             $(`#${thrImgBgTh}`).attr("src", 'https://test-vyral.onrender.com/'+thrdata.img[num].path);
             $(`#${thrImgBgTh}`).attr("class", thrdata.img[num].class);
             $(`#${thrImgBgTh}`).fadeIn();
             $(`#thrImgPres`).text(num+1);
         });
         
         right.click(function() {
            $(`#${thrImgBgTh}`).css('display', 'none');
            num++;
            if (num >= thrdata.img.length) {
                num = 0;
            }
            $(`#${thrImgBgTh}`).attr("src", 'https://test-vyral.onrender.com/'+thrdata.img[num].path);
            $(`#${thrImgBgTh}`).attr("class", thrdata.img[num].class);
            $(`#${thrImgBgTh}`).fadeIn();
            $(`#thrImgPres`).text(num+1);
         });

        // click imge
        $(`#${thrImgBgTh}`).click(()=>{
            alert('nanne!');
            /*fetch('/navs/addDoubleIndex', { method: 'get' }).then((response) => {
                return response.json();
            }).then((ind) => {
                var img = 'thrImg';
                revImgFuncs(img, ind, num, thrdata);
            });*/
        });

    };    

    // bg vd
    const bigVideo = (thrdata, udata, thrImgBgTh, thrBigVidBod, vidBigThId, thrVidPly, thrVidPus, thrVidStp, thrVidCrntT, thrVidOrgT, thrVidMte,) => {
        if (thrdata.vid.length > 0) {
            $(`#${thrImgBgTh}`).css('display', 'none');
            $('#vidBigThId').css('display', 'block');
            $('#vidBigThId').attr('src', `https://test-vyral.onrender.com/${thrdata.vid[0].path}`);
            $('#vidBigThId').attr('class', `${thrdata.vid[0].class}`);
            preloadVids(`https://test-vyral.onrender.com/${thrdata.vid[0].path}`);
            var users = db.users;
            var user = ''; var usr = '';
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (thrdata.user == users[i]._id) {
                        usr = users[i].user_name;
                    }
                }
                if (usr.length > 15) {
                    user = usr.slice(0, 15)+'..';
                }else {
                    user = usr;
                }
            }
            checkMode();
            // multi img effects
            videoThr(thrdata, udata, user, vidBigThId, thrBigVidBod, thrVidPly, thrVidPus, thrVidStp, thrVidMte, thrVidCrntT, thrVidOrgT);
        }
    };
    // tag noti
    const tagNoti = (user, data, udata, act, dateNow) => {

        if (act == 'shr_str' || act == 'shr_thr' || act == 'shr_thr' && user.user_name !== udata.user_name) {
            if (act == 'shr_thr') {
                act = 'shr_thr';
            }
            var pData = {
                section: 'str_thr',
                type: 'shr_str_thr',
                act: act,
                user: user._id,
                post: data._id,
                me: udata._id
            };
            postData(pData);
            setTimeout(() => {
                // assignDb();
                var com = '';
                if (act == 'shr_str') {
                    com = 'string';
                } else {
                    com = 'thread';
                }
                $('#container-body').css('filter', 'blur(5px)');
                $('#alertText').text(`You successfully tagged ${user.user_name} to the ${com}!`);
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
            }, 1);
            
        }

    };

    // img diff
    const threadImg = (thrdata, data, udata, secId, secUser, opnUsr, opnUsrTwo, thrDate, thrdImgId, multImgId, backImg, thrImgBgTh, thrBigVidBod, vidBigThId, thrdVid, thrVidSrc, thrVidPly, thrVidPus, thrVidStp, thrVidCrntT, thrVidOrgT, thrVidMte, likeThr, likeByThr, cmntThrBg, comThrBgBod, comThrBgFlow, comThrBgIn, comThrBgBtn, closeComBgThr, comThrBgLen, frwdImg, optThr, thrOptBod, clsThrOpt, delThrOpn, delThrQ, delThrY, delThrN, reprtId, repConId, inApRep, abusRep, clsRep, shareThr, closeSThr, shrPst, shrPstBd, shrPstSrch, shrPstFlw, shrPstCls, edtThr) => {
        if (thrdata.img.length > 0) {
            $(`#${thrdVid}`).css('display', 'none');
            $(`#${thrdImgId}`).css('background-image', `url(https://test-vyral.onrender.com/${thrdata.img[0].path})`);
            $(`#${thrdImgId}`).attr('class', `${thrdata.img[0].class}`);
            if (thrdata.img.length > 1) {
                $(`#${multImgId}`).css('display', 'block');
            }
            preloadImgs(`https://test-vyral.onrender.com/${thrdata.img[0].path}`, thrdImgId);
        }
        if (thrdata.vid.length > 0) {
            $(`#${thrdImgId}`).css('display', 'none');
            $(`#${thrdVid}`).css('display', 'block');
            $(`#${thrVidSrc}`).attr('src', `https://test-vyral.onrender.com/${thrdata.vid[0].path}`);
            $(`#${thrVidSrc}`).attr('class', `${thrdata.vid[0].class}`);
            preloadVids(thrdVid);
        }
        $(`#${thrdImgId}, #${thrdVid}`).click(()=>{
            global.page_ld = 'y';
            child();
        });
        idExFunc(secId, udata, opnUsr);
        const child = () => {
            var flwData = db.all_posts.find(item => item._id==thrdata._id);
            global.pop_no++; var ind = global.pop_no;
            if (flwData) {
                
                var x = window.matchMedia("(max-width: 600px)")
                if (x.matches) {
                    //$('.strFlowDiv').css('display', 'none');
                    if(udata.mode == 'light') {
                        $('body').css('background-color', 'white');
                    }else {
                        $('body').css('background-color', '#333333');
                    }
                }
                $('.containThr').remove();
                $('#tapImgDisp').css('display', 'none');
                $('.view-container, #container-body').fadeOut();
                $('#dropCons').append(thrViewer(
                    flwData, ind, backImg, opnUsrTwo,
                    // date
                    thrDate,
                    // like
                    likeThr, likeByThr, 
                    // comment
                    cmntThrBg, comThrBgBod, comThrBgFlow, comThrBgIn, comThrBgBtn, closeComBgThr, comThrBgLen,
                    frwdImg, 
                    // thr opt
                    optThr, thrOptBod, clsThrOpt,
                    // thr opt funcs
                    delThrOpn, delThrQ, delThrY, delThrN, reprtId, repConId, inApRep, abusRep, clsRep,
                    // shares
                    shareThr, closeSThr,
                    // thr img
                    thrImgBgTh,
                    // for videos
                    thrBigVidBod, vidBigThId, thrVidPly, thrVidPus, thrVidStp, thrVidCrntT, thrVidOrgT, thrVidMte,
                    // for share
                    shrPst, shrPstBd, shrPstSrch, shrPstFlw, shrPstCls,
                    // edit
                    edtThr
                ));
                checkMode(); Dark();
                $('.strThrdVwr').css('display', 'block'); 
                $(`#tapImgDisp`).css('display', 'none');
                $(`#${opnUsrTwo}`).text(secUser);
                $(`#thrHeadr`).text(flwData.head);
                if (thrdata.img.length > 0) {
                    $(`#${thrImgBgTh}`).attr('src', `https://test-vyral.onrender.com/${flwData.img[0].path}`);
                    $(`#${thrImgBgTh}`).attr('class', `${flwData.img[0].class}`);
                    multiImgThr(flwData, data, thrImgBgTh, multImgId, backImg, likeThr, cmntThrBg, frwdImg, optThr, shareThr);
                    preloadImgs(`https://test-vyral.onrender.com/${flwData.img[0].path}`, thrImgBgTh);
                }
                idExFunc(secId, udata, opnUsrTwo);
                // date
                smartDate(thrdata, thrDate);
                // for videos  
                bigVideo(flwData, udata, thrImgBgTh, thrBigVidBod, vidBigThId, thrVidPly, thrVidPus, thrVidStp, thrVidCrntT, thrVidOrgT, thrVidMte);
                // like funcs
                chkLikeThrXs(flwData, udata, secUser, likeThr, likeByThr);
                LikeThrXs(flwData, udata, secUser, likeThr, likeByThr);  
                // comment funcs
                checkComsThr(flwData, udata, secUser, cmntThrBg, comThrBgBod, comThrBgFlow, comThrBgIn, comThrBgBtn, closeComBgThr, comThrBgLen);
                opnCom(flwData, udata, secUser, cmntThrBg, comThrBgBod, comThrBgFlow, comThrBgIn, comThrBgBtn, closeComBgThr, comThrBgLen);
                // close com
                closeStrThr(thrdata, closeSThr);
                // OPT
                thrOpt(thrdata, udata, secUser, optThr, thrOptBod, clsThrOpt, delThrOpn, delThrQ, delThrY, delThrN, reprtId, repConId, inApRep, abusRep, clsRep);
                // edit
                editThr(flwData, udata, edtThr);
                // share funcs
                var tg = 'shr_thr';
                sharePst(thrdata, udata, shrPst, shrPstBd, shrPstSrch, shrPstFlw, shrPstCls, tg);
                setTimeout(() => {
                    $('.containThr').fadeIn("slow");
                    setTimeout(() => {
                        global.page_ld_stt = 'off';
                    }, 500);
                }, 500);
                
            }
        };
    };
    // close thr
    const closeStrThr = (thrdata, closeSThr) => {
        $(`#${closeSThr}`).click(()=>{
            //alert('here');
            global.pop_no--;
            $('.containThr').remove();
            $('.view-container, #container-body').fadeIn();
            if(udata.mode == 'light') {
                $('body').css('background-color', '#f0f0f0');
            }else {
                $('body').css('background-color', '#333333');
            }
        });
    };

    // create thread
    const threadIds = (thrdata) => {
        return {
            opnUsr: 'opnUsr_bgth_' + thrdata._id,
            opnUsrTwo: 'opnUsrTwo_bgth_' + thrdata._id,
            // go to prof 
            thrdImgId: 'thrdImgId_bgth_' + thrdata._id,
            multImgId: 'multImgId_bgth_' + thrdata._id,
            // date
            thrDateOne: 'thrDateOne_bgth_' + thrdata._id,
            thrDate: 'thrDate_bgth_' + thrdata._id,
            // thrd vid
            thrBigVidBod: 'thrBigVidBod_bgth_' + thrdata._id,
            vidBigThId: 'vidBigThId_bgth_' + thrdata._id,
            thrdVid: 'thrdVid_bgth_' + thrdata._id,
            thrVidSrc: 'thrVidSrc_bgth_' + thrdata._id,
            thrVidPly: 'thrVidPly_bgth_' + thrdata._id,
            thrVidPus: 'thrVidPus_bgth_' + thrdata._id,
            thrVidStp: 'thrVidStp_bgth_' + thrdata._id,
            thrVidCrntT: 'thrVidCrntT_bgth_' + thrdata._id,
            thrVidOrgT: 'thrVidOrgT_bgth_' + thrdata._id,
            thrVidMte: 'thrVidMte_bgth_' + thrdata._id,
            // thrd img
            thrImgBgTh: 'thrImgBgTh_bgth_' + thrdata._id,
            // thrd actv area
            backImg: 'backImg_bgth_' + thrdata._id,
            // like funcs
            likeThr: 'likeThr_bgth_' + thrdata._id,
            likeByThr: 'likedByThr_bgth_' + thrdata._id,
            // comment funcs
            cmntThrBg: 'cmntThrBg_bgth_' + thrdata._id,
            comThrBgBod: 'comThrBgBod_bgth_' + thrdata._id, 
            comThrBgFlow: 'comThrBgFlow_bgth_' + thrdata._id, 
            comThrBgIn: 'comThrBgIn_bgth_' + thrdata._id,
            comThrBgBtn: 'comThrBgBtn_bgth_' + thrdata._id, 
            closeComBgThr: 'closeComBgThr_bgth_' + thrdata._id, 
            comThrBgLen: 'comThrBgLen_bgth_' + thrdata._id,
            //
            frwdImg: 'frwdImg_bgth_' + thrdata._id,
            shareThr: 'shareThr_bgth_' + thrdata._id,
            closeSThr: 'closeSThr_bgth_' + thrdata._id,
            // opt
            optThr: 'optThr_' + thrdata._id,
            thrOptBod: 'thrOptBod_bgth_' + thrdata._id,
            clsThrOpt: 'clsThrOpt_bgth_' + thrdata._id,
            // delete thread funcs
            delThrOpn: 'delThrOpn_bgth_' + thrdata._id,
            delThrQ: 'delThrQ_bgth_' + thrdata._id, 
            delThrY: 'delThrY_bgth_' + thrdata._id,
            delThrN: 'delThrN_bgth_' + thrdata._id,
            // report post func
            reprtId: 'reprtThrId_bgth_' + thrdata._id,
            repConId: 'repConThrId_bgth_' + thrdata._id,
            inApRep: 'inApRepThr_bgth_' + thrdata._id,
            abusRep: 'abusRepThr_bgth_' + thrdata._id,
            clsRep: 'clsRepThr_bgth_' + thrdata._id,
            // share ids
            shrPst: 'shrPst_bgth_' + thrdata._id,
            shrPstBd: 'shrPstBd_bgth_' + thrdata._id,
            shrPstSrch: 'shrPstSrch_bgth_' + thrdata._id,
            shrPstFlw: 'shrPstFlw_bgth_' + thrdata._id,
            shrPstCls: 'shrPstCls_bgth_' + thrdata._id,
            // edit
            edtThr: 'edtThr_bgth_' + thrdata._id
        }
    };

    //display threads
    var acqTDNo = 1; var allTDNo = 1;
    const displayThreads = (thrdata, data, udata, prepAll, acqApp, acqNote, rel, dropsAll, dropsAcq,) => {
        const ids = threadIds(thrdata); var secUser = ''; var secId = '';
        var data3 = db.users;
        if (data3) {
            for (let i = 0; i < data3.length; i++) {
                if (data3[i]._id == thrdata.user) {
                    secUser = data3[i].user_name;
                    secId = data3[i]._id;
                }  
            }
            if (rel == 'y') {
                if (acqTDNo == 1) {
                    $(`#${dropsAcq.one}`).prepend(thread(thrdata, secUser, ids));
                }
                if (acqTDNo == 2) {
                    $(`#${dropsAcq.two}`).prepend(thread(thrdata, secUser, ids));
                }
                acqTDNo++;
                // limitation
                if (acqTDNo == 3) {
                    acqTDNo = 1;
                }
            }else {
                if (allTDNo == 1) {
                    $(`#${dropsAll.one}`).prepend(thread(thrdata, secUser, ids));
                }
                if (allTDNo == 2) {
                    $(`#${dropsAll.two}`).prepend(thread(thrdata, secUser, ids));
                }
                allTDNo++;
                // limitation
                if (allTDNo == 3) {
                    allTDNo = 1;
                }
            }
            // disp thread/open thread/ pass info
            smartDate(thrdata, ids.thrDateOne);
            threadImg(thrdata, data, udata, secId, secUser, ids.opnUsr, ids.opnUsrTwo, ids.thrDate, ids.thrdImgId, ids.multImgId, ids.backImg, ids.thrImgBgTh, ids.thrBigVidBod, ids.vidBigThId, ids.thrdVid, ids.thrVidSrc, ids.thrVidPly, ids.thrVidPus, ids.thrVidStp, ids.thrVidCrntT, ids.thrVidOrgT, ids.thrVidMte, ids.likeThr, ids.likeByThr, ids.cmntThrBg, ids.comThrBgBod, ids.comThrBgFlow, ids.comThrBgIn, ids.comThrBgBtn, ids.closeComBgThr, ids.comThrBgLen, ids.frwdImg, ids.optThr, ids.thrOptBod, ids.clsThrOpt, ids.delThrOpn, ids.delThrQ, ids.delThrY, ids.delThrN, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep, ids.shareThr, ids.closeSThr, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls, ids.edtThr);
            checkMode(); Dark();
        }
    };

    const checkModeTie = () => {
        // light or dark effects
        if(udata.mode == 'light') {
            $('.tieUflowBod, .checkTieBody').css('border', 'solid 1px #f0f0f0');
            $('.tieUflowBod, .checkTieBody').css('background-color', 'white');
        }
        if (udata.mode == 'dark') {
            $('.tieUflowBod, .checkTagBody').css('border', 'solid 1px #404040');
            $('.tieUflowBod, .checkTieBody').css('background-color', '#292929');
        }
    };

}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                strings();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
