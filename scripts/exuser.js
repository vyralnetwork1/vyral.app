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

    // CHECK AND EXTRACT USER DATA
    var loadin = () => {
        return `
        <div class="col-xs-12 b4_exP" style="position:fixed; z-index:4; background-color:#1a1a1a; opacity:0.4; height:100%;"></div>
        `
    };
    const pushData = () => {
        $('#drp-ex-ps').append(loadin());
        var id = global.ex_user;
        if (id) {
            global.ex_flag = 'n'; global.ex_user = '';
            if (global.ex_flag == 'n') {
                var alldata = db.users;
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i]._id == id) {
                        dispBod(alldata[i], udata);
                        checkViewerOpt();
                    }
                }
            }
        }

    };

    // CHECK MODE
    const checkMode = () => {
        // light or dark effects
        if (udata.mode == 'light') {
            $('.bedrBotStr, .subNavCOn').css('border-top', 'solid 0.8px #dddddd');
            $('#thrInfoCon, .detail_bod').css('border-bottom', 'solid 0.8px #dddddd');
            $('.strFlowDiv, .slidebod, .flow_bod').css('background-color', '#f9f9f9');
            $('.strFlowDiv').css('border-right', 'solid 1px #f0f0f0');
            $('.inStrUflow').css('border', 'solid 0.5px #dddddd');
            $('.stylePosts, .ex-slider, .detail_bod').css('background-color', 'white');
            $('.stylePosts, .privStrBod, #clsStrCon, .statBod').css('border-top', 'solid 1px #f0f0f0');
            $('.postInfoCon, .statBod').css('border-bottom', 'solid 1px #f0f0f0');
            $('.postDatefrst').css('color', 'grey');
            $('.postHeaderfrstStr, #thrHeadr').css('color', '#1a1a1a');
            $('.postBodyCon, .edtPstBd').css('background-color', '#f9f9f9');
            $('.areYSPCon, .privStrBod, .strHdBd, .strThrdVwr, #strActvtCon, .bottom_thr_vid').css('background-color', 'white');
            $('.yesesP').css('border-right', 'solid 1px #f0f0f0');
            $('.postBodyCon').css('border', 'solid 1px #f0f0f0');
            $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.postBodtxt').css('color', '#1a1a1a');
            $('.closeRdCon, .commentIn').css('border-top', 'solid 1px #f0f0f0');
            $('.commentInput, .strHdBd').css('border', 'solid 1px #f0f0f0');
            $('.commentInput, .inStrUflow, .thrdBod, .tiedUBod').css('background-color', 'white');
            $('.checkTagBody2').css('border', 'solid 1px #f0f0f0');
            $('.checkTagBody2').css('background-color', 'white');
            $('.thrdBod, .tiedUBod').css('box-shadow', '0px 0px 40px -5px #dddddd');
            $('.brd-rg').css('border-right', 'solid 1px #f0f0f0');
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
            // prof ads
            $('.frndsMainCon, .usrAutUiBodssE').css('background-color', '#f0f0f0');
            $('.frndsNavCon').css('background-color', 'white');
            $('.frndsSrchCon').css('background-color', '#f9f9f9');
            $('.frndsSrchCon, .frndsHd, .frndsNavCon').css('border-bottom', 'solid 1px #f9f9f9');
            $('.frndsSrchFrnds').css('border-right', 'solid 1px #dddddd');
        }
        if (udata.mode == 'dark') {
            $('.bedrBotStr, .subNavCOn').css('border-top', 'solid 0.8px #404040');
            $('#thrInfoCon, .detail_bod').css('border-bottom', 'solid 0.8px #404040');
            $('.strFlowDiv, .slidebod, .flow_bod').css('background-color', '#333333');
            $('.strFlowDiv').css('border-right', 'solid 1px #404040');
            $('.inStrUflow').css('border', 'solid 0.5px #333333');
            $('.stylePosts, .ex-slider, .detail_bod').css('background-color', '#262626');
            $('.stylePosts, .privStrBod, #clsStrCon, .statBod').css('border-top', 'solid 1px #404040');
            $('.postInfoCon, .statBod').css('border-bottom', 'solid 1px #404040');
            $('.postDatefrst').css('color', '#f9f9f9');
            $('.postHeaderfrstStr, #thrHeadr').css('color', 'white');
            $('.postBodyCon, .edtPstBd, .tiedUBod').css('background-color', '#333333');
            $('.areYSPCon, .privStrBod, #strThrdVwr, #strActvtCon, .bottom_thr_vid').css('background-color', '#1a1a1a');
            $('.yesesP').css('border-right', 'solid 1px #333333');
            $('.postBodyCon, .strHdBd').css('border', 'solid 1px #404040');
            $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #404040');
            $('.postBodtxt').css('color', 'white');
            $('.closeRdCon, .commentIn').css('border-top', 'solid 1px #404040');
            $('.commentInput').css('border', 'solid 1px #404040');
            $('.commentInput, .strHdBd, .inStrUflow, .thrdBod').css('background-color', '#262626');
            $('.checkTagBody2').css('border', 'solid 1px #404040');
            $('.checkTagBody2').css('background-color', '#292929');
            $('.thrdBod, .tiedUBod').css('box-shadow', '0px 0px 40px -5px #1a1a1a');
            $('.brd-rg').css('border-right', 'solid 1px #404040');
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
            // prof ads
            // pop ups
            $('.frndsMainCon').css('background-color', '#262626');
            $('.frndsNavCon, .usrAutUiBodssE').css('background-color', '#333333');
            $('.frndsSrchCon').css('background-color', '#333333');
            $('.frndsSrchCon, .frndsHd, .frndsNavCon').css('border-bottom', 'solid 1px #404040');
            $('.frndsSrchFrnds').css('border-right', 'solid 1px #404040');
        }
    };

    var costum = (ids, ind) => {
        return `
        <div class="row">
        <div id="${ids.bodyId}" class="col-xs-12 ex-slider" style="position:fixed; z-index:${ind - 1}; height:98%; box-shadow:0px 0px 20px -10px blacks; border-bottom-left-radius:25px; border-bottom-right-radius:25px; display:none;">

            <!-- friends pop-up -->
            <div class="row">
                <div id="${ids.exFRndsBod}" class="col-xs-12 col-md-4" style="position:fixed; height:90%; z-index:${ind}; display:none; margin-top:5%;">
                    <div class="frndsMainCon" style="width:100%; height:100%; box-shadow:0px 0px 10px -1px black; border-radius:5px;">
                        <div class="frndsNavCon" style="width:100%; height:92.5px; border-top-right-radius:5px; border-top-left-radius:5px;">
                            <div class="frndsHd" style="height:30px; width:100%;">
                                <p style="float:left; padding:5px; font-size:13px; color:orange; margin:0px; height:18px;">friends</p>
                                <span style="padding:1.5px; margin-right:10px; float:right; font-size:18px; color:red; cursor:pointer;" id="${ids.clsExFrnds}">&times;</span>
                            </div>
                            <div style="height:65px; width:100%;">
                                <div style="width:50%; height:65px; float:left; cursor:pointer;">
                                    <div id="${ids.opnExFllwn}" style="width: 100%; height: 40px; border-bottom:solid 1px skyblue;">
                                        <p style="padding:10px; margin:0px; text-align:center; font-size:13.5px; height:15px;" class="postBodtxt">FOLLOWING</p>
                                    </div>
                                    <div style="width: 100%; height: 22.5px;">
                                        <p id="${ids.exFlwnLen}" style="color:silver; text-align:center; font-size:12px; margin:0px; padding:5px; height:15px;"></p>
                                    </div>
                                </div>
                                <div style="width:50%; height:65px; float:right; margin-top:-1.5px; cursor:pointer;">
                                    <div id="${ids.opnExFlwrs}" style="width: 100%; height: 40px;">
                                        <p style="padding:10px; margin:0px; text-align:center; font-size:13.5px; height:15px;" class="postBodtxt">FOLLOWERS</p>
                                    </div>
                                    <div style="width: 100%; height: 22.5px;">
                                        <p id="${ids.exFlwrLen}" style="color:silver; text-align:center; font-size:12px; margin:0px; padding:5px; height:15px;"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="frndsSrchCon" style="width:100%; height:35px;">
                            <input class="frndsSrchFrnds" type="search" style="border:none; background-color:transparent; margin:5px; float:left; width:80%; float:left;" placeholder="search">
                            <img src="assets/imgs/searcha.png" alt="" width="25px" height="25px" style="margin:5px; float:left;">
                        </div> -->
                        <div style="height:295px; width:100%; overflow-y:auto;">

                            <div style="width:100%; height:293px; overflow-y:auto;" id="${ids.exFlnDiv}">
                                <span id="${ids.drpExFlwn}"></span>
                            </div>
                            <div style="width:100%; height:293px; overflow-y:auto; display:none;" id="${ids.exFlwrDiv}">
                                <span id="${ids.drpExFlwr}"></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row ex_ps_bodies" style="height:100%;">
                <!-- profile body -->
                <div class="col-xs-12 slidebod" style="height:92.5%; overflow-y:auto;">
                    <div class="row">
                        <div class="col-xs-12 detail_bod">
                            <div class="topProfon" style="width:100%; height:40px;">
                                <p class="postDatefrst" style="padding:5px; margin:0px; font-size:15px; float:left;">Details</p>
                                <img id="${ids.exProfOpt}" src="assets/imgs/opt.png" alt="" width="5px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                                <img id="${ids.chatExUsr}" src="assets/imgs/chat.png" alt="" width="20px" height="20px" style="margin:5px; margin-right:15px; float:right; cursor:pointer;">
                            </div>
                            <div  id="${ids.exOptCon}" style="display: none; width: 100%;">
                                <div class="edtPstBd" style="width:100%; border-radius:5px; margin-bottom:10px;">
                                    <div class="edtPstFlw" style="width:100%; height:35px; border-radius:3px;">
                                        <p style="text-align:center; margin:3px; padding:0px;"><img id="${ids.clsExOpt}" src="assets/imgs/up.png" width="27.5px" height="15px" style="cursor:pointer;"></p>
                                    </div>
                                    <!-- block cons -->
                                    <div id="${ids.blckExUsr}" class="edtPstFlw" style="width:100%; height:30px;">
                                        <p class="sub_h" style="margin:5px; cursor:pointer; font-size:16.5px;"> <span id="">Block</span> user</p>
                                    </div>
                                    <div id="${ids.blckExCon}" class="areYSPCon" style="width:100%; display: none;">
                                        <div class="areysPP" style="width:100%; height:30px;">
                                            <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="inApEx"> Are you sure you want to <span id="${ids.chkBlckSts}"></span> user? </p>
                                        </div>
                                        <div class="areysPP" style="width:100%; height:30px;">
                                            <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.yesBlckEx}"> Yes </p>
                                        </div>
                                        <div class="" style="width:100%; height:30px;">
                                            <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.noBlckEx}"> No </p>
                                        </div>
                                    </div>
                                    <!-- reprt cons -->
                                    <div id="${ids.repUsr}" class="" style="width:100%; height:30px;">
                                        <p class="sub_h" style="margin:5px; cursor:pointer; font-size:16.5px;"> Report user</p>
                                    </div>
                                    <div id="${ids.repCOn}" class="areYSPCon" style="width:100%; display: none;">
                                    <div class="areysPP" style="width:100%; height:30px;">
                                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.repInapp}"> Inappropriate content </p>
                                    </div>
                                    <div class="areysPP" style="width:100%; height:30px;">
                                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.repAbsv}"> Abusive content </p>
                                    </div>
                                    <div class="" style="width:100%; height:30px;">
                                        <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.repCncl}"> cancel </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row ${ids.normUsr}" style="display:none;">
                                <div class="col-xs-12">
                                    <div class="${ids.profPic}" style="width:100px; height:100px; margin:auto; margin-top:10px; border-radius:100%; background-size:100% 100%;">
                                    </div>
                                    <p style="text-align:center; font-size:10px; margin:5px;" class="sub_h"><span class="${ids.mainName}"></span> <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                                    <p class="${ids.profName}" style="color:silver; text-align:center; font-size:15px; margin:5px;"></p>
                                </div>
                            </div>
                            <div class="row ${ids.autUsr}" style="display:none;">
                                <div class="col-xs-12">
                                    <div class="row">
                                        <div id="${ids.autBack}" style="height: 160px; background-size: 100% 120%; class="col-xs-12">
                                            <br>
                                        </div>
                                            <div style="width:100%; margin-top: -80px; height:165px; position:absolute; z-index:0;">
                                                <div style="width:35%; height:100%; float:left;">
                                                    <div class="${ids.profPic}" style="width: 110px; height: 110px; margin: auto; margin-top: 20px; border-radius: 10px; box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.473); background-size:100% 100%;"></div>
                                                    <p class="sub_h" style="text-align:center; font-size:13px; margin:5px; margin-top:5px;"> <img src="assets/imgs/authand.png" width="15px" height="15px" alt="" style="background-color: transparent;"> <span class="${ids.mainName} sub_h"></span> </p>
                                                </div>
                                                <div style="width:65%; height:100%; float:right;">
                                                    <div style="width: 90%; height:65px; border-radius: 10px; box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.473); margin:auto; margin-top: 27.5px; margin-bottom: 5px; overflow-y: auto;" class="usrAutUiBodssE">
                                                        <span class="${ids.dropCats}"></span>
                                                    </div>
                                                    <p class="sub_h" style="padding:5px; margin:0px; font-size:15px; float:right;"> <a class="${ids.autMail}" href="" style="text-decoration:none;"> <img src="assets/imgs/mail.png" width="15px" height="13px" alt=""> </a> </p>
                                                </div>
                                            </div>
                                        <div style="width:100%; height:90px;"></div>
                                    </div>
                                </div>
                            </div>
                            <p class="${ids.profName} ${ids.autUsr} postBodtxt" style="text-align:center; font-size:15px; margin:5px; display:none;"></p>
                            <div class="row">
                                <div class="col-xs-12 statBod" id="" style="height:100%;">
                                    <p id="${ids.exStatus}" class="postBodtxt" style="margin:5px; font-size:13px;"></p>
                                </div>
                            </div>
                            <p id="${ids.exMail}" class="${ids.normUsr}" style="color:skyblue; text-align:center; font-size:12px; margin-top:5px; display:none;"></p>

                            <!-- people section -->
                            <div class="${ids.normUsr}" style="width: 100%; height: 60px; display:none;">
                                <p class="${ids.frnLen} ${ids.frnAr} ${ids.opnFrndsEx} postBodtxt" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                                <p class="${ids.frnAr} ${ids.opnFrndsEx}" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; color:silver; cursor:pointer;">friends</p>
                            </div>
                            <div class="${ids.autUsr}" style=" : 100%; height: 50px; display:none;">
                                <div style="height: 40px; width:50%; margin-top: 5px; float:left;" class="brd-rg">
                                    <p class="${ids.frnLen} ${ids.frnAr} ${ids.opnFrndsEx} postBodtxt" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                                    <p class="${ids.frnAr} ${ids.opnFrndsEx}" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; color:silver; cursor:pointer;">friends</p>
                                </div>
                                <div style="height: 40px; width:50%; margin-top: 5px; float:left;">
                                    <p class="${ids.subAr} ${ids.subLen} subArBtns postBodtxt" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                                    <p class="${ids.subAr} subArBtns" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; color:silver; cursor:pointer;">subscribers</p>
                                </div>
                            </div>
                            
                            <hr id="ex-adhr" style="display:none; margin-top:-10px;">
                            <p id="${ids.exCart}" style="margin:5px; color:skyblue; display:none; margin-top:-10px;"></p>
                            <p class="checkBlck postBodtxt" style="font-size: 12px; text-align: center; padding: 5px; margin: 0px; display: none;">You have no access to this account</p>
                            <div id="askFollowCon" style="width:100%; height:45px; display:none;">
                                <p style="text-align:center; padding:5px; margin:0px; float: left;">
                                    <button id="followExUser" class="btn btn-default btn-sm" style="border:solid 1px darkorange; color:darkorange; border-radius:5px; background:transparent;"> F O L L O W </button>
                                    <button id="UnfollowUser" class="btn btn-default btn-sm" style="border:solid 1px #ff8c00; border-radius:5px; color:darkorange; background:transparent;"> F O L L O W I N G </button>
                                </p>
                                <p class="${ids.autUsr}" style="text-align:center; padding:5px; margin:0px; float: left; display:none;">
                                    <button class="btn btn-default btn-sm ${ids.subBtn}">  </button>
                                </p>
                            </div>
                            <div id="askFollowCon2" style="width:100%; height:45px; display:none;">
                                <p style="text-align:center; padding:5px; margin:0px;">
                                    <button id="followExUser2" class="btn btn-default btn-sm" style="border:solid 1px darkorange; color:darkorange; border-radius:5px; background:transparent;"> R E Q U E S T </button>
                                    <button id="UnfollowUser2" class="btn btn-default btn-sm" style="border:solid 1px #ff8c00; border-radius:5px; color:darkorange; background:transparent;"> R E Q U E S T E D </button>
                                </p>
                                <p class="${ids.autUsr}" style="text-align:center; padding:5px; margin:0px; float: left; display:none;">
                                    <button class="btn btn-default btn-sm ${ids.subBtn}"> </button>
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 subNavCOn" id="" style="height:40px; border-top: solid 0.6px #dddddd;">
                                    <div id="exprofNavArea" style="width: 100%; height: 100%;">
                                        <img id="${ids.opnJrnBtn}" src="assets/imgs/read.png" alt="" width="20px" height="20px" style="margin:5px; margin-top:7px; float:left;">
                                        <img id="${ids.opnStrBtn}" src="assets/imgs/strings2.png" alt="" width="20px" height="20px" style="margin:5px; margin-top:7px; float:left; margin-left:15px;">
                                        <img id="${ids.opnAutBtn}" class="${ids.autUsr}" src="assets/imgs/authand2.png" alt="" width="20px" height="20px" style="margin:5px; margin-top:7px; float:left; margin-left:15px; display:none;">
                                        <img class="${ids.opnFrndsEx}" src="assets/imgs/frnds.png" alt="" width="25px" height="20px" style="margin:5px; margin-top:7px; float:right;">
                                    </div>
                                    <p class="checkpriv sub_h" style="display:none; padding:5px; text-align:center;">This account is private <img src="assets/imgs/lock.png" alt="" width="12.5px" height="12.5px"> </p>
                                    <p class="checkBlck sub_h" style="display:none; padding:5px; text-align:center;">Access denied <img src="assets/imgs/block.png" alt="" width="12.5px" height="12.5px"> </p>
                                </div>
                            </div>

                        </div>
                    </div>

                        <!-- bodies -->
                        <div class="row">

                            <div id="${ids.opnJrns}" class="col-xs-12 flow_bod">
                            
                                <div class="row">
                                    <div style="height:30px;" class="col-xs-12">
                                        <div style="heiht:10%; width:100%;">
                                            <p class="sub_h" style="text-align:center; font-size:12.5px; margin:0px; padding:5px;"> <img src="assets/imgs/read.png" width="13px" height="13px" style="margin-top:-2.5px; margin-right:5px;"> reads <span style="color:orange; font-size:14px;" id="${ids.readTLen}">0</span> </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="checkpriv" style="margin:auto; width:150px; display:none;">
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/lock.png" alt="" width="100%" height="70px">
                                </div>
                                    <p style="margin:5px; margin-bottom:15px; font-size:12px; text-align:center;" class="sub_h"> This account is private</p>
                                </div>
        
                                <div class="checkBlck" style="margin:auto; width:150px; display:none;">
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/block.png" alt="" width="100%" height="70px">
                                </div>
                                    <p style="margin:5px; margin-bottom:15px; font-size:12px; text-align:center;" class="sub_h"> Access denied </p>
                                </div>
                                
                                <div class="row dropbox-exj">
                                    <div id="${ids.noJrns}">
                                        <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">user have no Journals yet!</p>
                                    </div>
                                    <span id="${ids.dropExJrn}"></span>
                                </div>

                                <br>
                            </div>

                            <div id="${ids.opnStr}" class="col-xs-12 flow_bod" style="display:none;">
                                
                                <div style="width:100%; height:40px;">
                                    <div style="width:50%; float:left; height:100%;">
                                        <div id="${ids.thrOpn}" style="width:80px; height:30px; margin:auto; margin-top:5px; cursor:pointer; border-bottom:solid 2px skyblue;">
                                            <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="postBodtxt">threads</p>
                                        </div>
                                    </div>
                                    <div style="width:50%; float:left; height:100%;">
                                        <div id="${ids.strOpn}" style="width:80px; height:30px; margin:auto; margin-top:5px; cursor:pointer;">
                                            <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="postBodtxt">strings</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- thr str -->
                                <div class="row" id="${ids.thrBody}">
                                    <div id="${ids.noThr}">
                                        <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">user have no Threads yet!</p>
                                    </div>
                                    <span id="${ids.dropExThr}"></span>
                                </div>

                                <!-- flow str -->
                                <div class="row" id="${ids.strBody}" style="display:none;">
                                    <div id="${ids.noStr}">
                                        <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">user have no Strings yet!</p>
                                    </div>
                                    <span id="${ids.dropExStr}"></span>
                                </div>

                                <br>
                            </div>

                            <div id="${ids.opnAutC}" class="col-xs-12 flow_bod" style="display:none;">
                                <div style="height:37px; width:100%;">
                                    <p class="sub_h" style="font-size:12.5px; margin:0px; padding:5px; float:left;"> <img src="assets/imgs/read.png" width="13px" height="13px" style="margin-top:-2.5px; margin-right:5px;"> reads <span style="color:orange; font-size:14px;" id="${ids.autReads}">0</span> </p>
                                    <button style="color: none; border: none; background-color: transparent; border-radius: 15px; margin: 3px; float: right;" class="btn btn-default sub_hs rte_btn" id="${ids.opnExBookS}">
                                        <span style="margin: 3px; font-weight: normal;"> <img src="assets/imgs/bread.png" alt="" width="13px" height="13px" style="margin: 1.5px;"> books </span>
                                    </button>
                                </div>
                                
                                <div id="${ids.noAutCon}">
                                    <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">Author has no Contents yet!</p>
                                </div>
                                
                                <div class="row">
                                    <span id="${ids.dropAutCnt}"></span>
                                </div>

                                <br>
                            </div>

                            <br>
                        </div>

                        
                </div>

                <!-- bottom/close area -->
                <div id="${ids.closeCon}" class="col-xs-12 clsStrCon" style="height:7.5%;">
                    <p style="text-align:center; margin:0px;">
                        <img id="${ids.ClsBodyId}" src="assets/imgs/up.png" width="35px" height="22.5px" style="display:none; opacity:0.7;">
                    </p>
                </div>
            </div>
        </div>
        </div>
        `
    };

    // close body
    const closeBod = (user, closeCon, ClsBodyId, bodyId) => {

        // cls btn
        $(`#${ClsBodyId}`).click(() => {
            $('#container-body').css('filter', '');
            global.pop_no = global.pop_no - 2;
            $(`#${bodyId}`).slideUp(100);
            $('.b4_exP').remove();
            global.ex_jrn.flag = 'n';
            // jrn done
            global.ex_thr.flag = 'n';
            // thr done
            global.ex_str.flag = 'n';
            // str done
            global.ex_autJ.flag = 'n';
            // aut jrns done
            global.ex_book.flag = 'n';
            Dark();
            setTimeout(() => {
                $(`#${bodyId}, .ex-slider`).remove();
            }, 100);
        });

    };

    // asign
    const asignExInf = (user, udata, ids) => {
        if (user.user_type == "user") {
            $(`.${ids.normUsr}`).fadeIn();
        } else {
            if (user.user_type.status == 'on') {
                $(`.${ids.autUsr}`).fadeIn();
                const hive = (hi) => {
                    return `
                    <div class="hiveBody" id="" style="float:left; margin:3px; height:25px; border-radius:15px; border:none; margin-bottom:5px;z">
                        <p style="float:left; margin:3px; padding:2px; color:rgb(255, 149, 0); font-size:11.5px; margin-top:3px;"> ${hi} </p>
                    </div>
                    `
                }
                for (let i = 0; i < user.user_type.categories.length; i++) {
                    $(`.${ids.dropCats}`).append(hive(user.user_type.categories[i]));
                    if (udata.mode == 'light') {
                        $('.hiveBody').css('background-color', 'white');
                    } else {
                        $('.hiveBody').css('background-color', '#262626');
                    }
                }
                magicNumbers(`.${ids.subLen}`, user.user_type.subscribers.length);
                if (user.user_type.background == 'none') {
                    $(`#${ids.autBack}`).css('background-image', `url(assets/imgs/cb2.png)`);
                    $(`#${ids.autBack}`).addClass(`none`);
                } else {
                    $(`#${ids.autBack}`).css('background-image', `url(https://test-vyral.onrender.com/${user.user_type.background.path})`);
                    $(`#${ids.autBack}`).addClass(`${user.user_type.background.class}`);
                }
                if (udata.mode == 'light') {
                    $(`.${ids.profPic}`).css('background-color', 'white');
                    $(`.${ids.profPic}`).css('border', 'solid 3px #f0f0f0');
                } else {
                    $(`.${ids.profPic}`).css('background-color', '#1a1a1a');
                    $(`.${ids.profPic}`).css('border', 'solid 3px #404040');
                }
                var meF = user.user_type.subscribers.find(i => i.user == udata._id);
                if (meF == undefined) {
                    $(`#${ids.opnAutBtn}`).css('display', 'none');
                } else {
                    $(`#${ids.opnAutBtn}`).fadeIn();
                }

            } else {
                $(`.${ids.normUsr}`).fadeIn();
            }
        }
        magicNumbers(`.${ids.frnLen}`, user.following.length + user.followers.length);
        if (user.profile_pic == 'none') {
            $(`.${ids.profPic}`).css('background-image', 'url(assets/imgs/profpic.png)');
            $(`.${ids.profPic}`).attr('class', 'none');
            $(`.${ids.profPic}`).css('background-size', '100% 100%');
        } else {
            $(`.${ids.profPic}`).css('background-image', `url(https://test-vyral.onrender.com/${user.profile_pic.path})`);
            $(`.${ids.profPic}`).css('background-size', 'cover');
            $(`.${ids.profPic}`).addClass(`${user.profile_pic.class}`);
        }
        if (user.verification == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        $(`.${ids.mainName}`).text(`${user.user_name}`);
        $(`.${ids.profName}`).text(`${user.name}`);
        $(`#${ids.exStatus}`).text(`${user.user_status}`);
        $(`#${ids.exMail}`).text(`${user.email}`);
        var psts = db.all_posts;
        var reads = 0; var autReads = 0;
        for (let i = 0; i < psts.length; i++) {
            if (psts[i].user == user._id) {
                if (psts[i].body !== '' && psts[i].content_type !== "thread" && psts[i].content_type !== "string" && psts[i].content_type !== "author_journal" && psts[i].content_type !== "usr_aut_book") {
                    reads = reads + psts[i].reads.length;
                }
                if (psts[i].content_type == "author_journal" || psts[i].content_type == "usr_aut_book") {
                    autReads = autReads + psts[i].reads.length;
                }
            }
        }
        $(`#${ids.readTLen}`).text(reads);
        $(`#${ids.autReads}`).text(autReads);
    };

    // check and asign jrns
    const forPosts = (user, udata, ids, opnJrnBtn, opnJrns, dropExJrn, dropAutCnt, noJrns, opnStrBtn, opnStr, thrOpn, strOpn, thrBody, strBody, noThr, noStr, dropExThr, dropExStr) => {

        /**
         * JRN SECTION
         */
        // extract jrns
        const lesJrns = () => {
            var data = db.all_posts;
            var chk = 'n';
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user == user._id && data[i].content_type == 'journal') {
                        chk = 'y';
                        $(`#${noJrns}`).fadeOut();
                    }
                }
            }
            global.ex_jrn.id = user._id;
            global.ex_jrn.drop = dropExJrn;
            if (chk == 'y') {
                global.ex_jrn.flag = 'y';
            }
        };
        lesJrns();
        // opn jrn-btn
        $(`#${opnJrnBtn}`).click(() => {
            $(`#${opnJrnBtn}`).attr('src', 'assets/imgs/read.png');
            $(`#${opnStrBtn}`).attr('src', 'assets/imgs/strings2.png');
            $(`#${ids.opnAutBtn}`).attr('src', 'assets/imgs/authand2.png');
            $(`#${opnStr}, #${ids.opnAutC}`).css('display', 'none');
            $(`#${opnJrns}`).fadeIn();
            lesJrns();
            //$(`#${}`)
            //$(`#${}`)
        });

        /**
         * STR SECTION
         */
        // extract thrds
        const letsThr = () => {
            var data = db.all_posts;
            var chk = 'n';
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user == user._id && data[i].content_type == 'thread') {
                        chk = 'y';
                        $(`#${noThr}`).fadeOut();
                    }
                }
            }
            global.ex_thr.id = user._id;
            global.ex_thr.drop = dropExThr;
            if (chk == 'y') {
                global.ex_thr.flag = 'y';
            }
        };
        // extract thrds
        const letsStr = () => {
            var data = db.all_posts;
            var chk = 'n';
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user == user._id && data[i].type == 'Private' && data[i].content_type == 'string') {
                        chk = 'y';
                        $(`#${noStr}`).fadeOut();
                    }
                }
            }
            global.ex_str.id = user._id;
            global.ex_str.drop = dropExStr;
            if (chk == 'y') {
                global.ex_str.flag = 'y';
            }
        };
        // opn str-btn
        $(`#${opnStrBtn}`).click(() => {
            $(`#${opnStrBtn}`).attr('src', 'assets/imgs/strings.png');
            $(`#${opnJrnBtn}`).attr('src', 'assets/imgs/readen.png');
            $(`#${ids.opnAutBtn}`).attr('src', 'assets/imgs/authand2.png');
            $(`#${opnJrns}, #${ids.opnAutC}`).css('display', 'none');
            $(`#${opnStr}`).fadeIn();
            $(`#${thrOpn}`).click();
            letsThr();
            //$(`#${}`)
            //$(`#${}`)
        });
        // click thr
        $(`#${thrOpn}`).click(() => {
            // for main-page
            $(`#${thrOpn}`).css('border-bottom', 'solid 2px skyblue');
            $(`#${strOpn}`).css('border-bottom', 'none');
            // for main pge nav
            $(`#${strBody}`).css('display', 'none');
            $(`#${thrBody}`).fadeIn();
            letsThr();
        });
        // click str
        $(`#${strOpn}`).click(() => {
            // for main-page
            $(`#${strOpn}`).css('border-bottom', 'solid 2px skyblue');
            $(`#${thrOpn}`).css('border-bottom', 'none');
            // for main pge nav
            $(`#${thrBody}`).css('display', 'none');
            $(`#${strBody}`).fadeIn();
            letsStr();
        });

        // AUT CON
        // -------
        // extract jrns
        const letAutC = () => {
            var data = db.all_posts;
            var chk = 'n';
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user == user._id) {
                        if (data[i].content_type == 'author_journal' || data[i].content_type == 'usr_aut_book') {
                            chk = 'y';
                            $(`#${ids.noAutCon}`).fadeOut();
                        }
                    }
                }
            }
            global.ex_autJ.id = user._id;
            global.ex_autJ.drop = dropAutCnt;
            if (chk == 'y') {
                console.log('yhap!');
                global.ex_autJ.flag = 'y';
            }
        };
        letAutC();
        // opn btn
        $(`#${ids.opnAutBtn}`).click(() => {
            $(`#${opnJrnBtn}`).attr('src', 'assets/imgs/readen.png');
            $(`#${opnStrBtn}`).attr('src', 'assets/imgs/strings2.png');
            $(`#${ids.opnAutBtn}`).attr('src', 'assets/imgs/authand.png');
            $(`#${opnStr}, #${opnJrns}`).css('display', 'none');
            $(`#${ids.opnAutC}`).fadeIn();
            lesJrns();
            //$(`#${}`)
            //$(`#${}`)
        });
        // book shelf
        global.ex_book.id = user._id;
        $(`#${ids.opnExBookS}`).click(() => {
            global.ex_book.flag = 'y';
        });

    };

    const chkACtn = (data, mainUser) => {

        var ckr = '';
        if (data.blocked_list.length < 1) {
            ckr = '';
        } else {
            for (let i = 0; i < data.blocked_list.length; i++) {
                if (data.blocked_list[i].user == mainUser._id) {
                    ckr = 'y';
                }
            }
        }
        // PUBLICITY SETTINGS
        if (ckr == 'y') {
            $('.checkBlck').css('display', 'block');
            $('#askFollowCon2, #askFollowCon, #exprofNavArea, #chatUser').css('display', 'none');
            $('.dropbox-exj, #checknum-exj').remove();
        } else {
            if (data.publicity == 'public') {
                $('.checkpriv').css('display', 'none');
                $('#askFollowCon2').css('display', 'none');
                $('#exprofNavArea').css('display', 'block');
                $('#askFollowCon').css('display', 'block');
            } else {
                var ch = 'n';
                for (let i = 0; i < data.followers.length; i++) {
                    if (data.followers[i].user == mainUser._id) {
                        $('.checkpriv').css('display', 'none');
                        $('#askFollowCon2').css('display', 'none');
                        $('#exprofNavArea').css('display', 'block');
                        $('#askFollowCon').css('display', 'block');
                        ch = 'y';
                    }
                }
                if (ch == 'n') {
                    $('#askFollowCon').css('display', 'none');
                    $('.dropbox-exj, .checknum-exj').remove();
                    $('#exprofNavArea').css('display', 'none');
                    $('.checkpriv').css('display', 'block');
                    $('#askFollowCon2').css('display', 'block');
                }
            }
        }

        // ADD/REMOVE/REQUEST USER AS FRIEND
        //------------------------------------
        // fetch friend-functionalities
        const Follow = () => {
            var pData = {
                section: 'ex_user',
                type: 'follow',
                id: udata._id,
                following: { user: data._id },
                ex: data._id,
                noti: { user: mainUser._id, noti_type: 'follow', date: [year, day, month, hour, minute, secnds] }
            };
            postData(pData);
        };
        const AddReq = () => {
            var pData = {
                section: 'ex_user',
                type: 'add_req',
                id: udata._id,
                wait: { user: udata._id },
                ex: data._id,
                noti: { user: mainUser._id, noti_type: 'frnd_rq', date: [year, day, month, hour, minute, secnds] }
            };
            postData(pData);
        };
        const UnFollow = () => {
            var pData = {
                section: 'ex_user',
                type: 'unfollow',
                id: udata._id,
                following: { user: data._id },
                ex: data._id,
                noti: { user: mainUser._id, noti_type: 'follow' }
            };
            postData(pData);
        };
        const RemReq = () => {
            var pData = {
                section: 'ex_user',
                type: 'rem_req',
                id: udata._id,
                wait: { user: udata._id },
                ex: data._id,
                noti: { user: mainUser._id, noti_type: 'frnd_rq' }
            };
            postData(pData);

        };
        // tap friends functions
        $('#UnfollowUser').click(function () {
            $('#UnfollowUser').fadeOut();
            UnFollow();
        });
        $('#UnfollowUser2').click(function () {
            $('#UnfollowUser2').fadeOut();
            RemReq();
        });
        $('#followExUser').click(function () {
            $('#followExUser').fadeOut();
            Follow();
        });
        $('#followExUser2').click(function () {
            $('#followExUser2').fadeOut();
            AddReq();
        });
        // publicity/waiting list nuerons
        var pubCheck = () => {
            if (data.publicity == 'private') {
                if (data.waiting_list.length > 0) {
                    for (let i = 0; i < data.waiting_list.length; i++) {
                        if (data.waiting_list[i].user == mainUser._id) {
                            $('#followExUser2').css('display', 'none');
                            $('#UnfollowUser2').css('display', 'block');
                            break;
                        }
                        $('#UnfollowUser2').css('display', 'none');
                        $('#followExUser2').css('display', 'block');
                    }
                } else {
                    $('#UnfollowUser2').css('display', 'none');
                    $('#followExUser2').css('display', 'block');
                }
            } else {
                $('#UnfollowUser').css('display', 'none');
                $('#followExUser').css('display', 'block');
            }
        }
        // external profile conditions
        if (mainUser.following.length > 0) {
            var folF = '';
            for (let i = 0; i < mainUser.following.length; i++) {
                if (mainUser.following[i].user == data._id) {
                    folF = 'y';
                    $('#followExUser').css('display', 'none');
                    $('#followExUser2').css('display', 'none');
                    $('#UnfollowUser').css('display', 'block');
                    $('#UnfollowUser2').css('display', 'block');
                    break;
                }
            }
            if (folF == '') {
                pubCheck();
            }
        } else {
            pubCheck();
        }

    };

    // check friends
    const checkFrnds = (user, udata2, ids) => {

        $(`.${ids.opnFrndsEx}`).click(() => {
            $(`#${ids.exFRndsBod}`).fadeIn();
            $(`#${ids.opnExFllwn}`).click();
            $('.ex_ps_bodies').css('filter', 'blur(5px)');
            getFlwn();
            addFrndsLen();
        });
        $(`#${ids.clsExFrnds}`).click(() => {
            $(`#${ids.exFRndsBod}`).fadeOut();
            $('.ex_ps_bodies').css('filter', '');
            getFlwr();
        });
        // navs
        $(`#${ids.opnExFllwn}`).click(() => {
            $(`#${ids.exFlwrDiv}`).fadeOut();
            $(`#${ids.exFlnDiv}`).fadeIn();
            $(`#${ids.opnExFllwn}`).css('border-bottom', 'solid 1px skyblue');
            $(`#${ids.opnExFlwrs}`).css('border-bottom', '');
            getFlwn();
        });
        $(`#${ids.opnExFlwrs}`).click(() => {
            $(`#${ids.exFlnDiv}`).fadeOut();
            $(`#${ids.exFlwrDiv}`).fadeIn();
            $(`#${ids.opnExFlwrs}`).css('border-bottom', 'solid 1px skyblue');
            $(`#${ids.opnExFllwn}`).css('border-bottom', '');
            getFlwr();
        });

        // check modes
        const chkFrndMode = () => {
            if (udata.mode == 'light') {
                $('.frndsChild').css('border', 'solid 1px #dddddd');
                $('.frndsChild').css('background-color', 'white');
            } else {
                $('.frndsChild').css('border', 'solid 1px #404040');
                $('.frndsChild').css('background-color', '#1a1a1a');
            }
        }

        // fetch following
        const getFlwn = () => {
            extractU();
            var thisU = db.users.find(i => i._id == user._id);
            if (thisU !== undefined) {
                var data3 = db.users;
                $('.frndsChild').remove()
                for (let i = 0; i < thisU.following.length; i++) {
                    for (let z = 0; z < data3.length; z++) {
                        if (data3[z]._id == thisU.following[i].user) {
                            var exType = 'flwn'; var meType = 'none';
                            for (let x = 0; x < udata.following.length; x++) {
                                if (data3[z]._id == udata.following[x].user) {
                                    meType = 'friend';
                                }
                            }
                            displayFriends(data3[z], udata, exType, meType);
                            chkFrndMode();
                            addFrndsLen();
                        }
                    }
                }
            }
        };

        // fetch followers
        const getFlwr = () => {
            extractU();
            var thisU = db.users.find(i => i._id == user._id);
            if (thisU) {
                var data3 = db.users;
                $('.frndsChild').remove();
                for (let i = 0; i < thisU.followers.length; i++) {
                    for (let z = 0; z < data3.length; z++) {
                        if (data3[z]._id == thisU.followers[i].user) {
                            var exType = 'flwr'; var meType = 'none';
                            for (let x = 0; x < udata.following.length; x++) {
                                if (data3[z]._id == udata.following[x].user) {
                                    meType = 'friend';
                                }
                            }
                            displayFriends(data3[z], udata, exType, meType);
                            chkFrndMode();
                            addFrndsLen();
                        }
                    }
                }
            }
        };

        const addFrndsLen = () => {
            if (user) {
                $(`#${ids.exFlwnLen}`).text(user.following.length);
                $(`#${ids.exFlwrLen}`).text(user.followers.length);
            }
        };
        addFrndsLen();

        // body users
        const frndBody = (user2, ids2) => {
            var path = ''; var clss = 'none';
            if (user2.profile_pic == 'none') {
                path = 'assets/imgs/profb.png';
            } else {
                path = `https://test-vyral.onrender.com/${user2.profile_pic.path}`;
                clss = user2.profile_pic.class;
            }
            return `
            <div class="frndsChild" style="width:98%; margin:auto; height:40px; border-radius:5px; margin-top:7.5px; display:none;">
                <div style="width:25%; height:100%; float:left; margin-top:2.5px;">
                    <div class="${clss}" style="width:25px; height:25px; float:left; margin:5px; background-image:url(${path}); background-size:cover; border-radius:100%;"></div>
                    <img src="assets/imgs/chat.png" width="25px" height="25px" style="margin:5px; float:left; cursor:pointer;" id="${ids2.chatUp2}">
                </div>
                <div style="width:45%; height:100%; float:left; margin-top:2.5px;">
                    <p id="${ids.goUser}" style="margin:0px; padding:8px; color:skyblue; font-size:12px;">${user2.user_name}</p>
                </div>
                <div style="width:30%; height:100%; float:right; margin-top:2.5px;">
                    <button id="${ids2.unfllwId2}" class="btn btn-default btn-xs" style="margin:5px; color:white; background-color:orange; border:solid 1px orange; margin-top:8px; display:none;"></button>
                    <button id="${ids2.followId2}" class="btn btn-default btn-xs" style="margin:5px; color:grey; background-color:transparent; border:solid 1px orange; margin-top:8px; display:none;"></button>  
                </div>
            </div>
            `
        };

        // check btns
        const chkForFrnBtns = (data, udata, me, followId2, unfllwId2, chatUp2) => {
            if (data.user_name !== udata.user_name) {
                $(`#${unfllwId2}`).text('unfollow');
                $(`#${followId2}`).text('follow');
                if (me == 'none') {
                    $(`#${unfllwId2}`).css('display', 'none');
                    $(`#${followId2}`).css('display', 'block');
                }
                if (me == 'friend') {
                    $(`#${followId2}`).css('display', 'none');
                    $(`#${unfllwId2}`).css('display', 'block');
                }
                if (data.publicity == 'private') {
                    var chk = '';
                    $(`#${chatUp2}`).css('display', 'none');
                    for (let y = 0; y < data.followers.length; y++) {
                        if (data.followers[y].user == udata._id) {
                            chk = 'y';
                            $(`#${chatUp2}`).css('display', 'block');
                            $(`#${unfllwId2}`).css('display', 'block');
                            $(`#${followId2}`).css('display', 'none');
                        }
                    }
                    if (chk !== 'y') {
                        var ck = '';
                        for (let y = 0; y < data.waiting_list.length; y++) {
                            if (data.waiting_list[y].user == udata._id) {
                                ck = 'y';
                                $(`#${unfllwId2}`).css('display', 'block');
                                $(`#${followId2}`).css('display', 'none');
                                $(`#${unfllwId2}`).text('requested');
                            }
                        }
                        if (ck == '') {
                            $(`#${unfllwId2}`).css('display', 'none');
                            $(`#${followId2}`).css('display', 'block');
                            $(`#${followId2}`).text('request');
                        }
                    }
                }
            } else {
                $(`#${chatUp2}`).css('display', 'none');
            }

        };

        // actions
        const btnActions = (data, udata2, me, ex, ids) => {

            // follow
            $(`#${ids.followId2}`).click(() => {
                extractU();
                //assignDb();
                const priv = (usr, mainUser) => {
                    if (usr.publicity == 'private') {
                        addReq(mainUser);
                    } else {
                        cnct(mainUser);
                    }
                };
                const addReq = (mainUser) => {
                    var pData = {
                        section: 'ex_user',
                        type: 'add_req',
                        id: udata._id,
                        wait: { user: udata._id },
                        ex: data._id,
                        noti: { user: mainUser, noti_type: 'frnd_rq', date: [year, day, month, hour, minute, secnds] },
                        subtype: 'add_req'
                    };
                    postData(pData);
                    $('.frndsChild').remove();
                    //assignDb();
                    setTimeout(() => {
                        if (ex == 'flwn') {
                            getFlwn();
                        } else {
                            if (ex == 'flwr') {
                                getFlwr();
                            }
                        }
                        addFrndsLen();
                    }, 2000);
                };
                const cnct = (mainUser) => {
                    console.log('follow');
                    var pData = {
                        section: 'ex_user',
                        type: 'follow',
                        id: udata._id,
                        following: { user: data._id },
                        ex: data._id,
                        noti: { user: mainUser._id, noti_type: 'follow', date: [year, day, month, hour, minute, secnds] },
                        subtype: 'follow_list'
                    };
                    postData(pData);
                    $('.frndsChild').remove();
                    //assignDb();
                    setTimeout(() => {
                        if (ex == 'flwn') {
                            getFlwn();
                        } else {
                            if (ex == 'flwr') {
                                getFlwr();
                            }
                        }
                        addFrndsLen();
                    }, 2000);
                };
                var users = db.users; var mainUser = udata;
                for (let i = 0; i < users.length; i++) {
                    if (users[i]._id == data._id) {
                        priv(users[i], mainUser)
                    }
                }
            });

            // unfollow
            $(`#${ids.unfllwId2}`).click(() => {
                const cnct = (mainUser) => {
                    var pData = {
                        section: 'ex_user',
                        type: 'unfollow',
                        id: udata._id,
                        following: { user: data._id },
                        ex: data._id,
                        noti: { user: mainUser._id, noti_type: 'follow' },
                        subtype: 'follow_list'
                    };
                    postData(pData);
                    $('.frndsChild').remove();
                    // assignDb();
                    setTimeout(() => {
                        if (ex == 'flwn') {
                            reqs(mainUser);
                            getFlwn();
                        } else {
                            if (ex == 'flwr') {
                                getFlwr();
                            }
                        }
                        addFrndsLen();
                    }, 2000);
                };
                const reqs = (mainUser) => {
                    var pData = {
                        section: 'ex_user',
                        type: 'rem_req',
                        id: udata._id,
                        wait: { user: udata._id },
                        ex: data._id,
                        noti: { user: mainUser._id, noti_type: 'frnd_rq' },
                        subtype: 'frnd_list'
                    };
                    postData(pData);
                    // assignDb();
                    setTimeout(() => {
                        if (ex == 'flwn') {
                            getFlwn();
                        } else {
                            if (ex == 'flwr') {
                                getFlwr();
                            }
                        }
                    }, 2000);
                };
                extractU();
                var mainUser = udata;
                if (data.publicity == 'private') {
                    var chkReq = '';
                    for (let x = 0; x < data.waiting_list.length; x++) {
                        if (data.waiting_list[x].user == mainUser._id) {
                            reqs(mainUser);
                            chkReq = 'y';
                        }
                    }
                    if (chkReq !== 'y') {
                        for (let y = 0; y < data.followers.length; y++) {
                            if (data.followers[y].user == mainUser._id) {
                                cnct(mainUser);
                            }
                        }
                    }
                } else {
                    cnct(mainUser);
                }
            });
            // requests

            // cht up
            $(`#${ids.chatUp2}`).click(() => { });

        };

        const idExFunc = (data, mainUser, userIdEx) => {
            var id1 = ''; var id2 = ''; var idM = ''; var idU = '';
            var users = db.users;
            for (let i = 0; i < users.length; i++) {
                if (data == users[i]._id) {
                    id1 = users[i]._id;
                }
                if (data == users[i]._id) {
                    id2 = users[i]._id;
                }
            }
            if (id1 == mainUser._id) {
                idU = id2;
            } else {
                idU = id1;
            }
            $(`#${userIdEx}`).click(() => {
                $('.ex-slider').remove();
                if (data == mainUser._id) {
                    $('.b4_exP').remove();
                    $('#opnPrf').click();
                } else {
                    global.ex_user = idU;
                    global.ex_flag = 'y';
                }
            })

        };

        // create ids for following
        const createIds2 = (data) => {
            return {
                goUser: 'goUser_prof_' + data,
                // go done
                followId2: 'unfllw2_prof_' + data,
                unfllwId2: 'unfllw2_' + data,
                // cat up funcs
                chatUp2: 'chatUp2_' + data,
            }
        };
        // display
        const displayFriends = (data, udata, ex, me) => {
            let ids2 = createIds2(data._id);
            if (ex == 'flwn') {
                $(`#${ids.drpExFlwn}`).prepend(frndBody(data, ids2));
            } else {
                if (ex == 'flwr') {
                    $(`#${ids.drpExFlwr}`).prepend(frndBody(data, ids2));
                }
            }
            chkForFrnBtns(data, udata, me, ids2.followId2, ids2.unfllwId2, ids2.chatUp2);
            btnActions(data, udata, me, ex, ids2);
            idExFunc(data._id, udata, ids.goUser);
            $('.frndsChild').fadeIn();
        };

    };

    // rpof opt
    const profOpts = (usr, udata, ids) => {

        $(`#${ids.exProfOpt}`).click(() => {
            $(`#${ids.exOptCon}`).slideDown(200);
        });
        $(`#${ids.clsExOpt}`).click(() => {
            $(`#${ids.exOptCon}`).slideUp(100);
        });

        // BLOCK USER FUNCS
        //-----------------
        // bock usr
        var ckr = '';
        const blkStt = () => {
            var mainUser = secUdata;
            if (mainUser.blocked_list.length < 1) {
                $(`#${ids.chkBlckSts}`).text(`block`);
            } else {
                for (let i = 0; i < mainUser.blocked_list.length; i++) {
                    if (mainUser.blocked_list[i].user == usr._id) {
                        ckr = 'y';
                        $(`#${ids.chkBlckSts}`).text(`un-block`);
                    }
                }
            }
            if (ckr == '') {
                $(`#${ids.chkBlckSts}`).text(`block`);
            };
        };
        blkStt();
        $(`#${ids.blckExUsr}`).click(() => {
            blkStt();
            $(`#${ids.blckExCon}`).slideDown(200);
        });
        $(`#${ids.noBlckEx}`).click(() => {
            $(`#${ids.blckExCon}`).slideUp(100);
        });
        $(`#${ids.yesBlckEx}`).click(() => {
            if (ckr == 'y') {
                global.page_ld = 'y';
                var pData = {
                    section: 'settings',
                    type: 'un_block',
                    me: udata._id,
                    user: usr._id,
                    con: ids.blckExCon,
                };
                postData(pData);
                setTimeout(() => {
                    extractU();
                    blkStt();
                    global.page_ld_stt = 'off';
                }, 2000);
            } else {
                global.page_ld = 'y';
                var pData = {
                    section: 'settings',
                    type: 'block',
                    me: udata._id,
                    user: usr._id,
                    con: ids.blckExCon,
                };
                postData(pData);
                setTimeout(() => {
                    extractU();
                    blkStt();
                    global.page_ld_stt = 'off';
                }, 2000);
            }
        });

        // REP USR
        //----------
        $(`#${ids.repUsr}`).click(() => {
            $(`#${ids.repCOn}`).slideDown(200);
        });
        $(`#${ids.repCncl}`).click(() => {
            $(`#${ids.repCOn}`).slideUp(100);
        });

        // snd inap
        $(`#${ids.repInapp}`).click(() => {
            var con = 'Inappropriate content';
            pushRep(con);
        });
        // snd abus
        $(`#${ids.repAbsv}`).click(() => {
            var con = 'Inappropriate content';
            pushRep(con);
        });

        // report func
        const pushRep = (con) => {

            var pData = {
                section: 'ex_user',
                type: 'report',
                from: udata._id,
                by: usr._id,
                con: con,
                repCon: ids.repCOn,
            };
            postData(pData);
            setTimeout(() => {
                $(`#${ids.repCncl}`).click();
            }, 500);
        }

    };

    // chat-up friend
    const chatUp = (exdata, clsBod, chatUp) => {

        $(`#${chatUp}`).click(() => {
            var getBoth = () => {
                checkInfo(udata, exdata);
            };
            var checkInfo = (mainUser, exdata) => {
                var allChats = db.chatbox;
                var already = (chat) => {
                    global.chat.alrdNote = 'Yes';
                    global.chat.alrdId = chat._id;
                    setTimeout(() => {
                        $(`#${clsBod}`).click();
                        $('#opnCht').click();
                    }, 1000);
                };
                var doesnt = (mainUser, exdata) => {
                    var pData = {
                        section: 'chat',
                        type: 'add_chat',
                        chat: { mainUser: mainUser, exdata: exdata },
                    };
                    postData(pData);
                    setTimeout(() => {
                        $(`#${clsBod}`).click();
                        $('#opnCht').click();
                    }, 1000);
                };

                if (allChats.length > 0) {
                    var check = 'none';
                    for (let i = 0; i < allChats.length; i++) {
                        if (allChats[i].uone.user == mainUser._id && allChats[i].utwo.user == exdata || allChats[i].uone.user == exdata && allChats[i].utwo.user == mainUser._id) {
                            check = 'exists';
                            already(allChats[i]);
                        }
                    }
                    if (check == 'none') {
                        doesnt(mainUser, exdata);
                    }
                } else {
                    doesnt(mainUser, exdata);
                }
            };
            getBoth();
        });

    };

    // subs
    const subFuncs = (user, udata, ids) => {
        // subs check
        const typeN = (nw) => {
            if (nw == 'n') {
                $(`.${ids.subBtn}`).attr('style', 'border:solid 1px darkorange; color:darkorange; border-radius:5px; background:transparent;');
                $(`.${ids.subBtn}`).html(`SUBSCRIBE <img src="assets/imgs/sub.png" width="20px" height="13px" style="margin-top:-3px; margin-left:3px;">`);
            } else {
                $(`.${ids.subBtn}`).attr('style', 'border:none; color:silver; border-radius:5px; background:transparent;');
                $(`.${ids.subBtn}`).html(`SUBSCRIBED <img src="assets/imgs/subs.png" width="20px" height="13px" style="margin-top:-3px; margin-left:3px;">`);
            }
        };
        var nwS = '';
        if (user.user_type !== 'user') {
            if (user.user_type.status == 'on') {
                if (user.user_type.subscribers.length > 0) {
                    for (let i = 0; i < user.user_type.subscribers.length; i++) {
                        if (user.user_type.subscribers[i].user == udata._id) {
                            nwS = 'y';
                            typeN(nwS);
                            break;
                        } else {
                            nwS = 'n';
                            typeN(nwS);
                        }
                    }
                } else {
                    nwS = 'n';
                    typeN(nwS);
                }
            }
        }
        // pay sub edtstatalert editPopBod editPopHead
        const paySub = (neData) => {
            const checkMode = () => {
                if (udata.mode == 'light') {
                    $('#askPayBod').css('background-color', 'white');
                    $('#askPayHd').css('border-bottom', 'solid 1px #f0f0f0');
                    $('.pay_con').css('background-color', '#f0f0f0');
                    $('.p_divider').css('color', '#f0f0f0');
                    $('.ssp_main').css('color', 'grey');
                } else {
                    $('#askPayBod').css('background-color', '#262626');
                    $('#askPayHd').css('border-bottom', 'solid 1px #404040');
                    $('.pay_con').css('background-color', '#404040');
                    $('.p_divider').css('color', '#262626');
                    $('.ssp_main').css('color', '#f0f0f0');
                }
            }
            const askSubCons = () => {
                return `
                <div class="row sub_m_con">
                    <div class="col-lg-4"></div>
                    <div class="col-md-4 col-lg-4 col-xs-12" style="position:fixed; z-index:${global.pop_no + 2}; margin-top:30px; display:none;" id="askPayCon">
                        <div id="askPayBod" class="" style="width:100%; height:470px; box-shadow:0px 0px 15px -5px rgba(0, 0, 0, 0.3); border-radius:5px;">
                            <div id="askPayHd" class=""style="width:100%; height:35px; margin-bottom:15px;">
                                <p style="margin:5px; color:orange; float:left;"> edit status </p>
                                <span style="float:right; margin:3px; margin-right:5px; color:red; font-size:18px; cursor:pointer;" id="clsPaySUB"><img src="assets/imgs/can.png" width="13px" height="13px"></span>
                            </div>
                            <div style="width:100%; height:375px; border-bottom:solid 1px orange;">
                                <div style="width:100%; height:190px;">
                                    <p style="text-align:center; margin:0px; padding:4px;" class="sub_h"> Make payment to subscribe to <span style="font-weight:normal;">${neData.user_name}</span>'s Author Contents </p>
                                    <p class="headings" style="margin:0px; padding:5px; text-align:center;"> <span class="sub_h" style="font-weight:normal; font-size:18px;">NGN</span> <span style="font-size:35px;" id="subExPrcT"></span> </p>
                                    <hr style="margin:5px; width:95%;">
                                    <p style="text-align:center; margin:0px; padding:3px; font-size:14px;" class="sub_h">duration</p>
                                    <div class="row" style="width:95%; margin:auto;">
                                        <div class="col-lg-4 col-xs-4" style="height:20px;"> <p style="text-align:center; margin:0px; padding:2.5px; font-size:13px;" class="headings">1 month <input type="checkbox" class="subDrCs" checked id="subDr1"></p>  </div>
                                        <div class="col-lg-4 col-xs-4" style="height:20px;"> <p style="text-align:center; margin:0px; padding:2.5px; font-size:13px;" class="headings">6 month <input type="checkbox" class="subDrCs" id="subDr6"></p>  </div>
                                        <div class="col-lg-4 col-xs-4" style="height:20px;"> <p style="text-align:center; margin:0px; padding:2.5px; font-size:13px;" class="headings">1 year <input type="checkbox" class="subDrCs" id="subDrY"></p>  </div>
                                    </div>
                                </div>
                                <div style="width:100%; height:155px;">
                                    <div class="pay_con" style="width:90%; margin:auto; height:140px; border-radius:10px; margin-top:10px;"></div>
                                </div>
                            </div>
                            <p style="margin:5px;text-align:center;"> <button class="btn btn-default btn-xs sub_h" style="border-radius:5px; background-color:transparent;" id="paySDone">submit</button> </p>
                        </div>
                    </div>
                    <div class="col-lg-4"></div>
                </div>
                `
            }
            $('#dropChat').prepend(askSubCons());
            $('#container-one').css('filter', 'blur(5px)');
            $('#askPayCon').fadeIn();
            checkMode(); Dark();
            // check success
            const subScss = (pay, tr) => {
                var targetDate = new Date();
                targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                var countDownDate = targetDate.getTime();
                var x = setInterval(function () {
                    var now = new Date().getTime();
                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;
                    if (distance < 0) {
                        if (tr == 'successful') {
                            var nSubs = neData.user_type.subscribers;
                            nSubs[nSubs.length] = { user: udata._id, type: 'paid', duration: pay.info.duration, exp: pay.info.exp }; var pass = { user: udata._id, type: 'paid', sub_to: neData._id, amount: pay.info.amount, date: pay.info.date };
                            meSubNoti(neData, pay, pass);
                            subscribeF(neData, nSubs, pass);
                            clearInterval(x);
                        } else {
                            if (tr == 'unsuccessful') {
                                alert('Something happened, Your transaction was not completed!');
                                tr = 'none';
                                clearInterval(x);
                            }
                        }
                    }
                }, 1000);
            }
            // duration con
            var nw = new Date();
            var fullD = Math.floor(nw / 8.64e7);
            var durt = 30; var dLen = '1 month'; var totalP = Number(neData.user_type.price);
            var perc = 1.55 / 100 * totalP;
            var amnt = perc + totalP;
            $('#subExPrcT').text(amnt);
            const chngDur = () => {
                perc = 1.55 / 100 * totalP; amnt = perc + totalP;
                $('#subExPrcT').text(amnt);
                if (durt == 30) {
                    document.getElementById('subDr6').checked = false;
                    document.getElementById('subDrY').checked = false;
                    document.getElementById('subDr1').checked = true;
                }
                if (durt == 180) {
                    document.getElementById('subDr1').checked = false;
                    document.getElementById('subDrY').checked = false;
                    document.getElementById('subDr6').checked = true;
                }
                if (durt == 365) {
                    document.getElementById('subDr1').checked = false;
                    document.getElementById('subDr6').checked = false;
                    document.getElementById('subDrY').checked = true;
                }
            }
            $('#subDr1').click(() => {
                durt = 30; dLen = '1 month'; totalP = Number(neData.user_type.price);
                chngDur();
            });
            $('#subDr6').click(() => {
                durt = 180; dLen = '6 months'; totalP = Number(neData.user_type.price * 6);
                chngDur();
            });
            $('#subDrY').click(() => {
                durt = 365; dLen = '1 year'; totalP = Number(neData.user_type.price * 12);
                chngDur();
            });
            // make payment
            function payWithPaystack(k, pay) {

                let handler = PaystackPop.setup({
                    key: k, // Replace with your public key
                    email: udata.email,
                    amount: amnt * 100,
                    ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                    // label: "Optional string that replaces customer email"
                    onClose: function () {
                        alert('Window closed.');
                        var tr = 'unsuccessful';
                        subScss(pay, tr);
                    },
                    callback: function (response) {
                        let message = 'Payment complete! Reference: ' + response.reference;
                        //var reciept = { name: $('#name_cust').val(), mail: $('#mail_cust').val(), amount: totalP, rate_amnt: amnt, items: items, transaction_inf: response, date: [year, day, month, hour, minute, secnds]};
                        fetch('https://test-vyral.onrender.com/gate/addRec', {
                            method: 'post',
                            body: JSON.stringify({ name: udata.user_name, mail: udata.email, user: udata._id, amount: totalP, rate_amnt: amnt, for: "subscription", sub_to: neData._id, transaction_inf: response, date: [year, day, month, hour, minute, secnds] }),
                            headers: {
                                "Content-type": "application/json; charset=utf-8"
                            }
                        }).then((response) => {
                            return response.json();
                        }).then((data) => {
                            alert(message);
                            var tr = 'successful';
                            subScss(pay, tr);
                        });
                    }
                });

                handler.openIframe();
            }
            $('#paySDone').click(() => {
                async function pay() {
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/gate/pub_k`);
                        const k = await response.json();
                        var pay = {
                            transact: {
                                type: 'usr_sub', amount: amnt
                            }, info: {
                                user: udata._id, type: 'paid', duration: dLen, exp: fullD + durt, sub_to: neData._id, amount: amnt, date: [year, day, month, hour, minute, secnds]
                            }
                        };
                        payWithPaystack(k, pay)
                    } catch (error) {
                        console.log(error);
                    }
                }
                pay();
            });
            //cls
            $('#clsPaySUB').click(() => {
                $('.sub_m_con').fadeOut();
                $('#container-one').css('filter', '');
                $('.sub_m_con').remove();
            });
        };
        // send sub noti
        const meSubNoti = (neData, pay, pass) => {
            fetch('/transct/payUNoti', { method: 'put', headers: { "Content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ noti_type: 'sub', type: "paid", sub_to: neData._id, amount: pay.info.amount, duration: pay.info.duration, date: [year, day, month, hour, minute, secnds] }) }).then((response) => { return response.json() }).then((followedDt2) => {
                if (followedDt2) {
                    //location.reload();
                }
            });
        }
        // subscribe
        var subscribeF = (usr, subs, pass) => {
            var neData = db.users.find(i => i._id == user._id);
            global.page_ld = 'y';
            var pData = {
                section: 'ex_user',
                type: 'updt_sub',
                id: neData._id,
                user_type: { type: usr.user_type.type, categories: usr.user_type.categories, subscritpions: usr.user_type.subscritpions, subscribers: subs, status: usr.user_type.status, price: usr.user_type.price, background: usr.user_type.background },
            };
            postData(pData);
            setTimeout(() => {
                var pData = {
                    section: 'ex_user',
                    type: 'add_sub',
                    ex: neData._id,
                    me: udata._id,
                    pass: { user: pass.user, type: pass.type, sub_to: pass.sub_to, amount: pass.amount, date: pass.date },
                };
                postData(pData);
                setTimeout(() => {
                    // assignDb(); 
                    extractU();
                    var usr = db.users.find(i => i._id == user._id);
                    var me = db.users.find(i => i._id == udata._id);
                    //chkACtn(usr, me); subFuncs(usr, me, ids); asignExInf(usr, me, ids);
                    $(`#${ids.ClsBodyId}, #clsPaySUB`).click();
                    global.page_ld_stt = 'off';
                    setTimeout(() => {
                        global.ex_user = usr._id;
                        global.ex_flag = 'y';
                    }, 1500);
                }, 2000);
            }, 500);

        }
        // sub btn
        $(`.${ids.subBtn}`).click(() => {
            // assignDb();
            setTimeout(() => {
                var neData = db.users.find(i => i._id == user._id);
                if (nwS == 'n') {
                    var nSubs = new Array();
                    nSubs = neData.user_type.subscribers;
                    if (neData.user_type.price == 'none') {
                        nSubs[nSubs.length] = { user: udata._id, type: 'free', duration: 'none', exp: 'none' }; var pass = { user: udata._id, type: 'free', sub_to: neData._id, amount: 'none', date: [year, day, month, hour, minute, secnds] };
                        subscribeF(neData, nSubs, pass);
                    } else {
                        paySub(neData);
                    }
                } else {
                    $('#dropChat').prepend(`
                    <div class="row" id="expAskUnsubCon" style="display:none; background-color:rgba(0, 0, 0, 0.25);">
                        <div class="col-lg-12 col-xs-12" style="position:fixed; height:100%; z-index:${global.pop_no + 2};">
                            <div class="row">
                                <div class="col-lg-4" style=""></div>
                                <div class="col-lg-4 col-xs-12" style="margin-top:10px;">
                                    <div class="editPopBod2" style="width:100%; height:140px; box-shadow:0px 0px 15px -5px rgba(0, 0, 0, 0.3); border-radius:5px;">
                                        <div style="width:100%; height:100px;">
                                            <p style="text-align:center; margin:0px; padding:4px; font-size:17px;" class="postHeaderfrst">Are you sure you want unsubscribe to this account? <br>All access to this account's <span style="font-weight:normal;">Author Contents</span> will be lost!</p>
                                        </div>    
                                        <div style="width:100%; height:40px;" class="ask_con">
                                            <p id="yesUnsubAut" style="float:left; cursor:pointer; color:orangered; margin:0px; padding:5px; font-size:18px;">Yes</p>                                                
                                            <p class="postHeaderfrst" id="noUnsubAut" style="float:right; cursor:pointer; margin:0px; padding:5px; font-size:18px;">Cancel</p>                                                
                                        </div>    
                                    </div>
                                </div>
                                <div class="col-lg-4" style=""></div>
                            </div>
                        </div>
                    </div>    
                    `);
                    if (udata.mode == 'light') {
                        $('.editPopBod2').css('background-color', 'white');
                        $('.postHeaderfrst').css('color', '#1a1a1a');
                        $('.ask_con').css('border-top', 'solid 1px #f0f0f0');
                    } else {
                        $('.editPopBod2').css('background-color', '#262626');
                        $('.postHeaderfrst').css('color', 'silver');
                        $('.ask_con').css('border-top', 'solid 1px #404040');
                    }
                    Dark();
                    $('#container-body').css('filter', 'blur(5px)');
                    //$('#container-one').css('filter', '');
                    $('#expAskUnsubCon').fadeIn();
                    // cancel
                    $('#noUnsubAut').click(() => {
                        $('#expAskUnsubCon').fadeOut();
                        $('#container-body').css('filter', '');
                        $('#expAskUnsubCon').remove();
                    });
                    // un-subscribe
                    $('#yesUnsubAut').click(() => {
                        var subsN = neData.user_type.subscribers;
                        for (let h = 0; h < subsN.length; h++) {
                            if (subsN[h].user == udata._id) {
                                subsN.splice(h, 1);
                            }
                        }
                        global.page_ld = 'y';
                        var pData = {
                            section: 'ex_user',
                            type: 'updt_sub',
                            id: neData._id,
                            user_type: { type: neData.user_type.type, categories: neData.user_type.categories, subscritpions: neData.user_type.subscritpions, subscribers: subsN, status: neData.user_type.status, price: neData.user_type.price, background: neData.user_type.background },
                        };
                        postData(pData);
                        setTimeout(() => {
                            // assignDb(); 
                            extractU();
                            var usr = db.users.find(i => i._id == user._id);
                            var me = db.users.find(i => i._id == udata._id);
                            //chkACtn(usr, me); subFuncs(usr, me, ids); asignExInf(usr, me, ids);
                            $('#noUnsubAut').click();
                            $(`#${ids.ClsBodyId}`).click();
                            global.page_ld_stt = 'off';
                            setTimeout(() => {
                                global.ex_user = usr._id;
                                global.ex_flag = 'y';
                            }, 1500);
                        }, 2000);
                    });
                }
            }, 500);
        });
    };


    const createIds = (user) => {
        return {
            bodyId: 'exU_BodyId_' + user._id,
            // norm user info
            normUsr: `normUsr_ex_${user._id}`,
            // author
            autUsr: `autUsr_ex_${user._id}`,
            autBack: `autBack_ex_${user._id}`,
            dropCats: `dropCats_ex_${user._id}`,
            autMail: `autMail_ex_${user._id}`,
            subLen: `subLen_ex_${user._id}`,
            subAr: `subAr_ex_${user._id}`,
            subBtn: `subBtn_ex_${user._id}`,
            // aut flow
            opnAutBtn: `opnAutBtn_ex_${user._id}`,
            opnAutC: `opnAutC_ex_${user._id}`,
            autReads: `autReads_ex_${user._id}`,
            noAutCon: `noAutCon_ex_${user._id}`,
            dropAutCnt: `dropAutCnt_ex_${user._id}`,
            // close body
            closeCon: 'exU_closeCon_' + user._id,
            ClsBodyId: 'exU_ClsBodyId_' + user._id,
            // chat ex user
            chatExUsr: 'exU_chatExUsr_' + user._id,
            // pro opt
            exProfOpt: 'exU_exProfOpt_' + user._id,
            exOptCon: 'exU_exOptCon_' + user._id,
            // blck
            clsExOpt: 'exU_clsExOpt_' + user._id,
            blckExUsr: 'exU_blckExUsr_' + user._id,
            blckExCon: 'exU_blckExCon_' + user._id,
            chkBlckSts: 'exU_chkBlckSts_' + user._id,
            yesBlckEx: 'exU_yesBlckEx_' + user._id,
            noBlckEx: 'exU_noBlckEx_' + user._id,
            // req
            repUsr: 'exU_repUsr_' + user._id,
            repCOn: 'exU_repCOn_' + user._id,
            repInapp: 'exU_repInapp_' + user._id,
            repAbsv: 'exU_repAbsv_' + user._id,
            repCncl: 'exU_repCncl_' + user._id,
            //asign info
            profPic: 'exU_profPic_' + user._id,
            mainName: 'exU_mainName_' + user._id,
            profName: 'exU_profName_' + user._id,
            exStatus: 'exU_exStatus_' + user._id,
            exMail: 'exU_exMail_' + user._id,
            exCart: 'exU_exCart_' + user._id,
            verIcon: 'exU_verIcon_' + user._id,
            readTLen: 'exU_readTLen_' + user._id,
            frnLen: `frnLen_ex_${user._id}`,
            frnAr: `frnAr_ex_${user._id}`,
            // journals
            opnJrnBtn: 'exU_opnJrnBtn_' + user._id,
            opnJrns: 'exU_opnJrns_' + user._id,
            noJrns: 'exU_noJrns_' + user._id,
            dropExJrn: 'exU_dropExJrn_' + user._id,
            opnExBookS: 'exU_opnExBookS_' + user._id,
            // friends opt
            opnFrndsEx: 'exU_opnFrndsEx_' + user._id,
            exFRndsBod: 'exU_exFRndsBod_' + user._id,
            clsExFrnds: 'exU_clsExFrnds_' + user._id,
            opnExFllwn: 'exU_opnExFllwn_' + user._id,
            opnExFlwrs: 'exU_opnExFlwrs_' + user._id,
            exFlwnLen: 'exU_exFlwnLen_' + user._id,
            exFlwrLen: 'exU_exFlwrLen_' + user._id,
            exFlnDiv: 'exU_exFlnDiv_' + user._id,
            exFlwrDiv: 'exU_exFlwrDiv_' + user._id,
            drpExFlwn: 'exU_drpExFlwn_' + user._id,
            drpExFlwr: 'exU_drpExFlwr_' + user._id,
            // strings
            opnStrBtn: 'exU_opnStrBtn_' + user._id,
            opnStr: 'exU_opnStr_' + user._id,
            thrOpn: 'exU_thrOpn_' + user._id,
            strOpn: 'exU_strOpn_' + user._id,
            thrBody: 'exU_thrBody_' + user._id,
            strBody: 'exU_strBody_' + user._id,
            noThr: 'exU_noThr_' + user._id,
            noStr: 'exU_noStr_' + user._id,
            dropExThr: 'exU_dropExThr_' + user._id,
            dropExStr: 'exU_dropExStr_' + user._id,
        }
    };

    // display body
    const dispBod = (user, udata) => {
        const ids = createIds(user);
        global.pop_no = global.pop_no + 2;
        var ind = global.pop_no;
        $('#container-body').css('filter', 'blur(5px)');
        $('#dropChat').append(costum(ids, ind));
        //$(`#${ids.bodyId}`).slideDown("slow");
        checkMode(); Dark();
        // BODY FUNCS
        // ----------
        // check action btns
        chkACtn(user, udata);
        closeBod(user, ids.closeCon, ids.ClsBodyId, ids.bodyId);
        // check frnds
        checkFrnds(user, udata, ids);
        // asign info
        asignExInf(user, udata, ids);
        // prof opt
        profOpts(user, udata, ids);
        // subs
        subFuncs(user, udata, ids);
        // chat 
        chatUp(user._id, ids.ClsBodyId, ids.chatExUsr);
        // check and asign jrns
        forPosts(user, udata, ids, ids.opnJrnBtn, ids.opnJrns, ids.dropExJrn, ids.dropAutCnt, ids.noJrns, ids.opnStrBtn, ids.opnStr, ids.thrOpn, ids.strOpn, ids.thrBody, ids.strBody, ids.noThr, ids.noStr, ids.dropExThr, ids.dropExStr);
        setTimeout(() => {
            $(`#${ids.bodyId}`).slideDown("slow");
            setTimeout(() => {
                var h1 = $(`#${ids.closeCon}`).css('height');
                var sc = $(`#${ids.ClsBodyId}`).css('height');
                setTimeout(() => {
                    var h11 = h1.slice(0, -2);
                    var scc = sc.slice(0, -2);
                    // set %
                    var perc = 50;
                    // check % for-each
                    var ev1 = perc / 100 * h11;
                    var scev1 = perc / 100 * scc;
                    // evaluation
                    var m1 = ev1 - scev1;
                    // apply
                    $(`#${ids.ClsBodyId}`).css('margin-top', `${m1}px`);
                    $(`#${ids.ClsBodyId}`).css('display', `inline`);
                }, 500);
            }, 500);
        }, 10);
    };

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