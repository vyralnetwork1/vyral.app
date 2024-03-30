import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function chats() {

    // post date application
    var date = new Date();
    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();
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
        setTimeout(() => {
            extractU();
        }, 1);
    }

    $('#opnCht').click(()=>{
        $('#opnCht').css('border', 'solid 2px darkorange');
        $('#opnHme, #opnWrt, #opnNti, #opnPrf').css('border', 'none');
        $('#hmeHD, #ntiHD, #prfHD, #opnLfn, #refrshr_con, #sbNav, #mainSrchCon, #allCartNewsFlowBod, #prfBody, #notiBod').css('display', 'none');
        $('#chtHD, #chatsFlowBod').fadeIn(50);
        window.scrollTo(0, 0);
        setTimeout(() => {
            var child = 'chats';
            childP(child);
            reInstt(); refreshI();
            Dark(); Start();
        }, 100);
    });

    // fetch user data
    const Start = () => {
        //assignDb();
        $('.chatHead').remove();
        $('#flowLoader2C').fadeIn();
        getChat(udata);
    };

    const checkMessChng = (curn, id, len) => {
        var data = db.chatbox;
        var mainUser = udata;
        var chtLen = mainUser.chats.length-1;
        if (curn == mainUser.chats[chtLen].user) {
            for (let p = 0; p < data.length; p++) {
                if (data[p]._id == id) {
                    //alert(data[p].messages.length+', old: '+len);
                    if (data[p].messages.length < len || data[p].messages.length > len) {
                        getChat(mainUser);
                    }else {
                        restrt();
                    }
                }           
            }
        }else{
            /*for (let z = 0; z < data.length; z++) {
                getChat(mainUser);  
            }*/
            getChat(mainUser);
        }
    };
    const restrt = () => {
        var loc = allApps.child_p;
        if (loc == 'cht') {
            var data = db.chatbox;
            var mainUser = udata;
            var chtLen = mainUser.chats.length-1;
            var curn = mainUser.chats[chtLen].user; var curnId = mainUser.chats[chtLen].chat; var curnLen = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i]._id == curnId) {
                    curnLen = data[i].messages.length;
                }
            }
            var targetDate = new Date();
            targetDate.setSeconds(targetDate.getSeconds() + 5);
            var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                // check duration to currentime
                if (distance < 0) {
                    checkMessChng(curn, curnId, curnLen);
                    clearInterval(x);
                }
            }, 1000);
        }
    };

    const checkChanges = (me) => {
        var chats = me.chats;
        setTimeout(() => {
            extractU()
            if (app.child_p == 'chats') {
                var user = udata;
                var upChats = user.chats; var change = 'n';
                if (chats.length < upChats.length || chats.length > upChats.length) {
                    change = 'y';
                }
                for (let i = 0; i < chats.length; i++) {
                    var nowC = upChats.find(z=>z.chat==chats[i].chat);
                    if (nowC !== undefined) {
                        if (nowC.situ !== chats[i].situ) {
                            change = 'y';
                        }
                    }
                }
                if (change == 'y') {
                    getChat(user);
                }else {
                    setTimeout(() => {
                        checkChanges(me);
                    }, 500);
                }
            }
        }, 100);
    }

    // extract chats
    var globLen = 0;
    var chtCntr = 0; var lenAddr = 15; var chtArr = new Array();
    const getChat = (mainUser) => {
        if (mainUser.chats.length > 0) {
            var data = db.chatbox;
            var users = db.users;
            $('.chatHead').remove();
            // set curnt chat vars
            var chtLen = mainUser.chats.length-1;
            var curn = mainUser.chats[chtLen].user; 
            var curnId = mainUser.chats[chtLen].chat; 
            var curnLen = 0;
            chtCntr = 0; lenAddr = 15; chtArr = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i]._id == curnId) {
                    curnLen = data[i].messages.length;
                }
            }
            globLen = 0; 
            if (data) {
                var chk = '';
                for (let z = 0; z < mainUser.chats.length; z++) {
                    
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id == mainUser.chats[z].chat) {
                            chk = 'y';
                            $('#noChtsCon').css('display', 'none');
                            if ($('#chtFrndsSrch').val() == '') {
                                $('#srchChtCon').css('display', 'none');
                                $('#drpChtCon').fadeIn();
                            }
                            chtArr[chtArr.length] = {cht: data[i], me: mainUser, situ: mainUser.chats[z].situ};
                            //displayChats(data[i], mainUser, mainUser.chats[z].situ, users);
                            if (mainUser.chats[z].situ == 'rec') {
                                globLen++;
                                applyLen();
                            }
                        }
                    }
    
                }
                if (chk == '') {
                    $('#noChtsCon').fadeIn();
                }
                $('#flowLoader2C').fadeOut();
            }
            if (chtArr.length > 0) {
                console.log('extracted chats:'+chtArr.length);
                applyChats(users);
                checkMessChng(curn, curnId, curnLen); 
            }
            checkChanges(udata);
        }else {
            $('#flowLoader2C').fadeOut();
        }
    };
    const applyLen = () => {
        $('#chatlen').text(globLen);
    };
    const applyChats = (users) => {
        $('.ChtldmreBtn').remove();
        if (chtArr.length < lenAddr) {
            lenAddr = chtArr.length;
        }
        for (let i = 0; i < lenAddr; i++) {
            if (chtCntr < i+1) {
                chtCntr++;
                displayChats(chtArr[i].cht, chtArr[i].me, chtArr[i].situ, users);
                getMode();
            }
        }
            
        if (chtArr.length > lenAddr) {
            $('.ChtldmreBtn').remove();
            $('#dpChtHr').after(`<div class="ChtldmreBtn" id="chtldMrJrns-mnp" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -10px black; border-radius:10px;">
                <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
            </div>`);
            $('#chtldMrJrns-mnp').click(()=>{
                lenAddr = lenAddr+lenAddr;
                applyChats(users);
            });
        }else {
            $('.ChtldmreBtn').remove();
        }
            
    }

    // get mode for design
    const getMode = () => {
        // light or dark effects
        if(udata.mode == 'light') {
            $('.clsSubOptBtn, .closeImgFlwCon').css('border-bottom', 'solid 1px #f0f0f0');
            $('.sendMessTxt, .chatBodBttm, .edtPstBd').css('border', 'solid 1px #f0f0f0');
            $('.chatBodTop, .chatBodBttm, .optOpts').css('background-color', '#f9f9f9');
            $(`.chatHead, .sendMessTxt, .chtng-flw, .shrBdy, .edtPstBd, .ChtldmreBtn`).css('background-color', 'white');
            $('.scrlimgCon').css('border', 'solid 1px #f0f0f0');
            $('.scrlimgCon').css('background-color', 'white');
        }
        if (udata.mode == 'dark') {
            $('.clsSubOptBtn, .closeImgFlwCon').css('border-bottom', 'solid 1px #404040');
            $('.sendMessTxt, .chatBodBttm, .edtPstBd').css('border', 'solid 1px #404040');
            $('.chatBodTop, .chatBodBttm, .optOpts').css('background-color', '#262626');
            $(`.chatHead, .sendMessTxt, .chtng-flw, .shrBdy, .edtPstBd, .ChtldmreBtn`).css('background-color', '#1a1a1a');
            $('.scrlimgCon').css('border', 'solid 1px #404040');
            $('.scrlimgCon').css('background-color', '#262626');
        }
    };

    const chtBody = (data, ind, ids, wit, pat) => {
        var puta = ''; var clas = '';
        if (wit.length > 15) {
            wit = wit.slice(0, 15)+'..';
        }
        if (pat == 'none') {
            puta = 'assets/imgs/profb.png';
            clas = 'none';
        }else {
            puta = `https://test-vyral.onrender.com/${pat.path}`;
            clas = `${pat.class}`;
        }
        return `
        <div class="chatBodClass row">
            <div class="col-xs-12 chtng-flw" style="position:fixed; z-index:${ind-1}; height:100%; overflow-y:auto; display:none;">
                <div class="row">
                    <div class="chatBodTop" style="position: fixed; z-index: ${ind};">
                        <div style="width:100%; height:50px;">
                            <div class="chtBodClsCon" style="width: 20%; height: 50px; float: left;">
                                <img src="assets/imgs/backa.png" alt="" id="${ids.closeBtn}" width="20px" height="30px" style="margin:5px; margin-top: 10px; cursor: pointer; float:left;">
                            </div>
                            <div style="width: 40%; height:  50px; float: left;">
                                <div class="${clas}" style="width:30px; height:30px; margin:5px; cursor: pointer; borde-radius:100% 100%; background-image:url(${puta}); background-size:cover; border-radius:100%; float:left; margin-top:10px;"></div>
                                <p id="${ids.opnAccInBgCht}" class="sub_h" style="margin:0px; padding-top: 15px; font-size:13px; float:left;">${wit} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                            </div>
                            <div style="width: 40%; height:  50px; float:right;">
                                <img id="${ids.bgOptOpn}" src="assets/imgs/opt.png" alt="" width="5px" height="20px" style="float: right; margin: 15px; cursor: pointer;">
                                <img id="${ids.shareOpen}" src="assets/imgs/shared.png" alt="" width="20px" height="20px" style="float: right; margin: 15px; cursor: pointer;">
                            </div>
                        </div>
                        <!-- opt area -->
                        <div class="bgOptArea" id="${ids.bgOptBod}" style="width:98%; margin:auto;">
                            <div id="${ids.drpBgOpt}" style="widht:100%;"></div>
                        </div>
                        <!-- share contents sec -->
                        <div class="shrBdy" id="${ids.shareBd}" style="display:none; width:95%; overflow-y:auto; margin:auto; margin-bottom:10px; margin-top:5px; border-radius:3px;">
                            <div class="shareOptBod" style="height:90px;">
                                <div style="width:35%; height:80px; float:left; margin-top:5px;">
                                    <div style="width:45px; height:60px; margin:auto; cursor:pointer;"> 
                                        <img id="${ids.shareImg}" src="assets/imgs/imgtype.png" width="100%" height="55px" style="margin-top:5px; cursor:pointer;">
                                    </div>
                                    <p class="sub_h" style="text-align:center; font-size:13px; margin:0px; padding:2px;">Share image</p>
                                </div>
                                <!-- <div style="width:30%; height:80px; float:left; margin-top:5px;">
                                    <div style="width:45px; height:60px; margin:auto; cursor:pointer;"> 
                                        <img src="assets/imgs/imgtype2.png" width="100%" height="50px" style="margin-top:5px; cursor:pointer;">
                                    </div>
                                    <p class="sub_h" style="text-align:center; font-size:13px; margin:0px;">Share files</p>
                                </div> -->
                                <div style="width:35%; height:80px; float:right; margin-top:5px;">
                                    <div style="width:60px; height:60px; margin:auto; cursor:pointer;"> 
                                        <img src="assets/imgs/up.png" id="${ids.shareCls}" width="100%" height="35px" style="margin-top:10px; cursor:pointer;">
                                    </div>
                                    <p class="sub_h" style="text-align:center; font-size:13px; margin:0px; padding:2px;">Cancel</p>
                                </div>
                            </div>
                            <!-- scroll thr img -->
                            <div class="scrllCht">
                                <div class="row scrlimgCon imgAlignDiv-cht" style="width:98%; height:260px; margin:auto; margin-top:5px; margin-bottom:5px; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                                    <div class="closeImgFlwCon" id="closeImgFlwCon-jrn" style="width:98%; height:25px; margin:auto;">
                                        <p style="text-align:center; color:orangered; margin:5px; cursor:pointer;" id="${ids.clsScrlImg}">cancel</p>
                                    </div>
                                    <div style="width:100%; height:200px; overflow-y:auto;">
                                        <br>
                                        <span id="${ids.shrImgFlw}"></span>
                                    </div>
                                    <div class="" id="closeImgFlwCon-jrn" style="width:98%; height:25px; margin:auto;">
                                        <p style="text-align:center; color:skyblue; margin:5px; cursor:pointer;" id="${ids.sndImgs}">send</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- share contents sec -->
                        <div class="shrBdy" id="${ids.shrdImgsCon}" style="display:none; width:95%; margin:auto; margin-bottom:10px; margin-top:5px; border-radius:3px;">
                            <div class="shareOptBod" style="height:250px; width:100%;">
                                <div class="clsSubOptBtn" style="width:98%; height:35px; margin:auto;">
                                    <p style="text-align:center; margin:1px;"><img id="${ids.shareImgCls}" src="assets/imgs/up.png" width="20p" height:15px; style="margin:5px; cursor:pointer;"></p>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-xs-12" style="height:220px; overflow-y:auto;">
                                        <div class="row">
                                            <span id="${ids.dropShrdImgs}"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chtng-flw" id="${ids.chtFlwBd}" style="width:100%; height:100%; margin-top: 50px; position: fixed; z-index: ${ind-1};">
                        <div style="width:100%; height:82.5%; overflow-y:auto;">
                            <br>
                            <span id="${ids.prepMess}" style="width:100%;"></span>
                            <br>
                        </div>
                    </div>
                    <div class="clearfix visible-xs col-xs-12" style="height:60px;"></div>
                    <div class="" style="height: 65px; width:100%; bottom:0; right:0; position:fixed; z-index:${ind};">
                        <textarea name="" id="${ids.tareaId}" style="width: 75%; height: 55px; margin: 5px; float: left; border-radius: 5px; border:none; background-color:rgba(0, 0, 0, 0.75); color:white; font-weight:bolder; font-size:17px;" placeholder="write message"></textarea>
                        <img src="assets/imgs/send.png" width="40px" height="40px" style="float:right; margin:7.5px; cursor:pointer;" id="${ids.sendId}">
                    </div>
                    <div class="chat_load" style="width:100%; height:40px; margin-bottom:85px; bottom:0; right:0; position:fixed; z-index:${ind};">
                        <div style="border-radius:15px; width:60%; margin:auto; height:100%; background-color:rgba(0, 0, 0, 0.6);">
                            <p style="color:#f9f9f9; text-align:center; margin:0px; padding:5.2px; font-size:18px; margin-top:-16.5px;"> loading chats <img src="assets/imgs/load.png" class="chtLodIc" width="18px" height="18px" style="margin-top:-3px;"> <p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    };

    const nothing = () => {

    };

    const chatHead = (data, wit, usr, ids, pat) => {
        nothing();
        if (wit.length > 15) {
            wit = wit.slice(0, 15)+'..';
        }
        var puta = ''; var cls = 'none';
        if (pat == 'none') {
            puta = 'assets/imgs/profb.png';
        }else {
            puta = `https://test-vyral.onrender.com/${pat.path}`;
            cls = `${pat.class}`;
        }
        return `
          <div id="${ids.chatBodId}" class="chatHead" style="width:98%; margin: auto; background-color:white; border-radius:5px; margin-top:5px; display:none;">
            <div style="width:100%; height:35px;">
                <div style="width:15%; height:100%; float: left;">
                    <div class="${cls}" style="width:25px; height:25px; margin:5px; cursor: pointer; borde-radius:100% 100%; background-image:url(${puta}); background-size:cover; border-radius:100%;"></div>
                </div>    
                <div style="width:45%; height:100%; float: left;">
                    <p class="sub_h" id="${ids.userIdEx}" style="margin:0px; padding:8px; font-size:11px;">${wit} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                </div>    
                <div style="width:40%; height:100%; float: right;">
                    <img id="${ids.situIcon}" src="" alt="" width="15px" height="15px" style="margin:10px; cursor: pointer;">
                    <img id="${ids.opnHdOpt}" src="assets/imgs/opt.png" alt="" width="5px" height="25px" style="margin:5px; float:right; cursor: pointer; margin-right:10px;">
                    <img id="${ids.openBodId}" src="assets/imgs/chat.png" alt="" width="25px" height="25px" style="margin:5px; float: right; cursor: pointer; margin-right:10px;">
                    <img id="${ids.blckdIcn}" src="assets/imgs/block.png" alt="" width="25px" height="25px" style="margin:5px; float:right; margin-right:10px;">
                </div>
            </div>
            <div id="${ids.chtHdOPt}" style="width:98%; margin:auto; margin-bottom:5px; display:none;">  
            </div> 
          </div>
        `;
    };
    
    // opt
    const addOpts = (wit, close, bodClss, ids) => {
        return `
        <div class="edtPstBd ${bodClss}" style="width:100%; margin:auto; border-radius:5px; margin-bottom:10px;">
            <div class="edtPstFlw" style="width:100%; height:35px; border-radius:3px;">
                <p style="text-align:center; margin:0px; margin-top:-2px; padding:0px;"><img id="${close}" src="assets/imgs/up.png" width="20px" height="10px" style="cursor:pointer;"></p>
            </div>
            <!-- vis cons -->
            <div id="" class="edtPstFlw" style="width:100%;">
                <p id="${ids.goToProf}" class="sub_h" style="margin:5px; cursor:pointer; font-size:16.5px; padding:5;"> Visit profile</p>
            </div>
            <!-- block cons -->
            <div id="" class="edtPstFlw" style="width:100%;">
                <p id="${ids.opnBlckCon}" class="sub_h" style="margin:5px; padding:5px; cursor:pointer; font-size:16.5px;"> <span id="">Block</span> chat</p>
                <div id="${ids.blkckCon}" style="width:95%; margin:auto; margin-bottom:5px; border-radius:7.5px; display:none;" class="optOpts">
                    <p class="sub_h" style="font-size:13px; text-align:center; margin:0px; padding:5px;">Are you sure you want to <span id="${ids.blckChk}"></span> this user?</p>
                    <p class="sub_h" style="font-size:13px.5px;  text-align:center; margin:0px; padding:5px;">
                        <span style="margin-right:10px; color:orangered; cursor:pointer;" id="${ids.blckYes}">Yes</span>
                        <span style="margin-left:10px; cursor:pointer;" id="${ids.blckNo}">No</span>
                    </p>
                </div>
            </div>
            <!-- reprt cons -->
            <div id="" class="edtPstFlw" style="width:100%;">
                <p id="${ids.rprtUsr}" class="sub_h" style="margin:5px; padding:5px; cursor:pointer; font-size:16.5px;"> Report user</p>
                <div id="${ids.rprtCon}" style="width:95%; margin:auto; margin-bottom:5px; border-radius:7.5px; cursor:pointer; display:none;" class="optOpts">
                    <p id="${ids.canRprt}" class="sub_h" style="font-size:13px; text-align:center; margin:0px; padding:5px;">cancel</p>
                    <p id="${ids.inapRprt}" style="font-size:13px.5px;; color:orangered; text-align:center; margin:0px; padding:5px;">Inapropriate Content</p>
                    <p id="${ids.abusRprt}" style="font-size:13px.5px;; color:orangered; text-align:center; margin:0px; padding:5px;">Abusive Content</p>
                </div>
            </div>
            <!-- del cons -->
            <div id="" style="width:100%;">
                <p id="${ids.delChtOpn}" style="margin:5px; padding:5px; color:orangered; cursor:pointer; font-size:16.5px;"> Delete chat</p>
                <div id="${ids.delChtCon}" style="width:95%; margin:auto; margin-bottom:5px; border-radius:7.5px; display:none;" class="optOpts">
                    <p class="sub_h" style="font-size:13px; text-align:center; margin:0px; padding:5px;">Are you sure you want to delete this chat?</p>
                    <p class="sub_h" style="font-size:13px.5px;; text-align:center; margin:0px; padding:5px;">
                        <span style="margin-right:10px; color:orangered; cursor:pointer;" id="${ids.delChtY}">Yes</span>
                        <span style="margin-left:10px; cursor:pointer;" id="${ids.delChtN}">No</span>
                    </p>
                </div>
            </div>
        </div>
        `
    };

    const idExFunc = (data, mainUser, userIdEx) => {
        var id1 = ''; var id2 = ''; var idM = ''; var idU = '';
        var users = db.users;
        for (let i = 0; i < users.length; i++) {
            if (data.uone.user == users[i]._id) {
                id1 = users[i]._id;
            }
            if (data.utwo.user == users[i]._id) {
                id2 = users[i]._id;
            }
        }
        if (id1 == mainUser._id) {
            idU = id2;
        }else {
            idU = id1;
        }
        $(`#${userIdEx}`).click(()=>{
            $('.ex-slider').remove();
            if (idU == udata._id) {
                $('#opnPrf').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = idU;
                global.ex_flag = 'y';
            }
        })

    };

    const verDisp = (data, mainUser, verIcon) => {
        var users = db.users;
        for (let i = 0; i < users.length; i++) {
            if (data.uone.user == users[i]._id) {
                if (users[i].verification == 'on') {
                    $(`#${verIcon}`).css('display', 'inline');
                }
            }
            if (data.utwo.user == users[i]._id) {
                if (users[i].verification == 'on') {
                    $(`#${verIcon}`).css('display', 'inline');
                }
            }
        }
    }

    // ACTION BUTTONS
    //----------------
    // creating chat ids
    const CreateChtIds = (data) => {
        return {
            opnAccInBgCht: 'opnAccInBgCht_' + data._id,
            // goto prof done
            clsBodId: 'clsBod_' + data._id,
            bodyId: 'body_' + data._id,
            sendId: 'send_' + data._id,
            tareaId: 'tarea_' + data._id,
            prepMess: 'prepMess_' + data._id,
            chtFlwBd: 'chtFlwBd_' + data._id,
            verIcon: 'verIcon_chtBd_' + data._id,
            // share funcs
            shareOpen: 'shareOpn_' + data._id,
            shareCls: 'shareCls_' + data._id,
            shareBd: 'shareBd_' + data._id,
            // opt 
            bgOptOpn: 'bgOptOpn_' + data._id,
            bgOptArea: 'bgOptArea_' + data._id,
            drpBgOpt: 'bgOptArea_' + data._id,
            clsBgOpt: 'clsBgOpt_' + data._id,
            // share images
            shareImg: 'shareImg_' + data._id,
            shrImgFlw: 'shrImgFlw_' + data._id,
            sndImgs: 'sndImgs_' + data._id,
            clsShrdImg: 'clsShrdImg_' + data._id,
            shareImgCls: 'shareImCls_' + data._id,
            clsScrlImg: 'clsScrlImg_' + data._id,
            // shared imgs
            shrdImgsCon: 'shrdImgsCon_' + data._id,
            dropShrdImgs: 'dropShrdImgs_' + data._id,
            // opt func
            optOpen: 'optOpen_' + data._id,
            optBd: 'optBd_' + data._id,
            // close funcs
            closeBtn: 'closeBtn_' + data._id
        }
    };
    var nowCHat = {status: '', chat: ''};
    // open chat body btn
    const OpenCbod = (data, chatBodId, openBodId, situIcon, wit, mainUser, pat, situ) => {
        const openBtn = $(`#${openBodId}`);
        const updtSitu = () => {
            

                for (let i = 0; i < udata.chats.length; i++) {
                    if (udata.chats[z].chat == data._id) {
                        situ = udata.chats[z].situ;
                    }
                }
            

        };
        const getThisMode = () => {
            if(udata.mode == 'light') {
                $(`#${chatBodId}`).css('border', 'solid 1px #f0f0f0');
            }else {
                $(`#${chatBodId}`).css('border', 'solid 1px #404040');
            }
        };
        if (situ == 'rec') {
            //alert(situ);
            $(`#${chatBodId}`).css('border', 'solid 0.6px darkorange');
            $(`#${situIcon}`).css('display', 'none');
        }
        if (situ == 'rec_seen') {
            $(`#${situIcon}`).css('display', 'none');
            getThisMode();
        }
        if (situ == 'sent') {
            $(`#${situIcon}`).css('display', 'inline');
            $(`#${situIcon}`).attr('src', 'assets/imgs/sent.png');
            getThisMode();
        }
        if (situ == 'sent_seen') {
            $(`#${situIcon}`).css('display', 'inline');
            $(`#${situIcon}`).attr('src', 'assets/imgs/seensent.png');
            $(`#${situIcon}`).attr('height', '9px');
            $(`#${situIcon}`).css('margin-top', '10px');
            getThisMode();
        }
        if (situ == 'none') {
            $(`#${situIcon}`).css('display', 'none');
        }

        openBtn.click(()=>{
            $(`#${chatBodId}`).remove();
            var uone = ''; var utwo = '';
            if (data.uone.user == mainUser._id) {
                uone = data.uone.user;
                utwo = data.utwo.user;
            }else {
                utwo = data.uone.user;
                uone = data.utwo.user;
            }
            if (situ == 'rec') {
                var pData = {
                    section: 'chat',
                    type: 'rec_seen',
                    user: udata._id,
                    id: data._id,
                    uone: uone,
                    utwo: utwo,
                };
                postData(pData);
                // assignDb();
                global.page_ld = 'y';
                setTimeout(() => {
                    loadIt();
                }, 2000);
                
            }else {
                loadIt();
            }
            /*$(`#${two}`).slideUp(100);
            $(`#${bodyId}`).slideDown(200);
            chtFlw.scrollBy(0, 100);*/
        });
        const loadIt = () => {
            global.pop_no+2;
            var ind = global.pop_no;
            const ids = CreateChtIds(data);
            $('#noChatsClckd').css('display', 'none');
            getMode();
            $('#headPusher-xs, #profInfoCol, #profNavCol, #nav-xs, #naverxs, #minnaver, #flowbod, #profbod, #profNavbar, #chtFlwAll, #openwj-xs').css('display', 'none');
            $('#dropChat').append(chtBody(data, ind, ids, wit, pat));
            if (udata.mode == 'light') {
                $('body').css('background-color', 'white');
                $(`#${ids.chtFlwBd}`).css('background-image', 'url(assets/imgs/chatbL.png)');
                $(`#${ids.chtFlwBd}`).css('background-size', 'cover');
                $(`#${ids.chtFlwBd}`).css('background-attachment', 'fixed');
            }else {
                $('body').css('background-color', '#1a1a1a');
                $(`#${ids.chtFlwBd}`).css('background-image', 'url(assets/imgs/chatbD.png)');
                $(`#${ids.chtFlwBd}`).css('background-size', 'cover');
                $(`#${ids.chtFlwBd}`).css('background-attachment', 'fixed');
                $(`#${ids.chtFlwBd}`).css('background-blend-mode', 'luminosity');
                //filter: grayscale(100%);
            }
            nowCHat.status = 'on'; nowCHat.chat = data._id;
            incMess = 5;
            $('.chatBodTop').css('width', '100%');
            Dark();
            SendM(data, ids.tareaId, ids.sendId, ids.prepMess, ids.chtFlwBd, ids.shrdImgsCon, ids.dropShrdImgs, mainUser);
            var scrl = 'y';
            getMess(data, ids.prepMess, ids.chtFlwBd, ids.shrdImgsCon, ids.dropShrdImgs, mainUser, scrl);
            closeBody(data, ids.closeBtn);
            Share(data, ids.shareOpen, ids.shareBd, ids.shareCls, ids.optBd);
            shareImg(data, mainUser, ids.shareImg, ids.shrImgFlw, ids.sndImgs, ids.prepMess, ids.chtFlwBd, ids.shrdImgsCon, ids.dropShrdImgs, ids.shareImgCls, ids.clsScrlImg);
            opnBgOpt(data, mainUser, wit, ids.bgOptOpn, ids.bgOptArea, ids.drpBgOpt, ids.clsBgOpt);
            idExFunc(data, mainUser, ids.opnAccInBgCht);
            verDisp(data, mainUser, ids.verIcon);
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                            // check duration to currentime
                if (distance < 0) {
                    $('.chtng-flw').fadeIn();
                    clearInterval(x);
                }
            }, 1000);
            Start();
            //getChat(mainUser);
        };
        /*clsBtn.click(()=>{
            $(`#${bodyId}`).slideUp(100);
            $(`#${chatBodId}`).slideDown(200);
        });*/
    };
    // open already exists
    const clsChkr = () => {
        global.chat.alrdNote = 'No';
        global.chat.alrdId = '';
    };
    const tryCatcho = () => {
        var mainUser = udata;
        var alData = global.chat.alrdNote;
        if (alData == 'Yes') {
            checkExists(mainUser);
        }else {
            setTimeout(() => {
                tryCatcho();
            }, 1);
        };
    };
    tryCatcho();
    const checkExists = (mainUser) => {
        var getSpecAl = (dataId, mainUser) => {
            var datam = db.chatbox.find(i => i._id==dataId);
            var wit = ''; var usr = ''; var witno = ''; var usrno = '';
            var users = db.users;
            var dt1 = ''; var dt2 = ''; var no1 = ''; var no2 = '';
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (datam.uone.user == users[i]._id) {
                        dt1 = users[i].user_name;
                        no1 = datam.uone.user;
                    }
                    if (datam.utwo.user == users[i]._id) {
                        dt2 = users[i].user_name;
                        no2 = datam.utwo.user;
                    }
                }
                if (dt1.length > 15 || dt2.length > 15) {
                    dt1 = dt1.slice(0, 15)+'..';
                    dt2 = dt2.slice(0, 15)+'..';
                }
                if (dt1 == mainUser.user_name) {
                    usr = dt1;
                    wit = dt2;
                }else {
                    usr = dt2;
                    wit = dt1;
                }
                opnBod(datam, wit, mainUser, users);
                getMode();
            }
        };
        const opnBod = (data, wit, mainUser, users) => {
            global.pop_no+2;
            var ind = global.pop_no;
            const ids = CreateChtIds(data);
            $('#noChatsClckd').css('display', 'none');
            var pat = '';
            for (let x = 0; x < users.length; x++) {
                if (users[x]._id == data.utwo.user && data.utwo.user !== mainUser._id) {
                    pat = users[x].profile_pic;
                }
                if (users[x]._id == data.uone.user && data.uone.user !== mainUser._id) {
                    pat = users[x].profile_pic;
                }
            }
            $('#headPusher-xs, #profInfoCol, #profNavCol, #nav-xs, #naverxs, #minnaver, #flowbod, #profbod, #profNavbar, #chtFlwAll, #openwj-xs').css('display', 'none');
            $('#dropChat').append(chtBody(data, ind, ids, wit, pat));
            if (udata.mode == 'light') {
                $('body').css('background-color', 'white');
                $(`#${ids.chtFlwBd}`).css('background-image', 'url(assets/imgs/chatbL.png)');
                $(`#${ids.chtFlwBd}`).css('background-size', 'cover');
                $(`#${ids.chtFlwBd}`).css('background-attachment', 'fixed');
            }else {
                $('body').css('background-color', '#1a1a1a');
                $(`#${ids.chtFlwBd}`).css('background-image', 'url(assets/imgs/chatbD.png)');
                $(`#${ids.chtFlwBd}`).css('background-size', 'cover');
                $(`#${ids.chtFlwBd}`).css('background-attachment', 'fixed');
                $(`#${ids.chtFlwBd}`).css('background-blend-mode', 'luminosity');
            }
            $('.chatBodTop').css('width', '100%');
            nowCHat.status = 'on'; nowCHat.chat = data._id;
            incMess = 5;
            SendM(data, ids.tareaId, ids.sendId, ids.prepMess, ids.chtFlwBd, ids.shrdImgsCon, ids.dropShrdImgs, mainUser);
            var scrl = 'y';
            getMess(data, ids.prepMess, ids.chtFlwBd, ids.shrdImgsCon, ids.dropShrdImgs, mainUser, scrl);
            closeBody(data, ids.closeBtn);
            Share(data, ids.shareOpen, ids.shareBd, ids.shareCls, ids.optBd);
            shareImg(data, mainUser, ids.shareImg, ids.shrImgFlw, ids.sndImgs, ids.prepMess, ids.chtFlwBd, ids.shrdImgsCon, ids.dropShrdImgs, ids.shareImgCls, ids.clsScrlImg);
            opnBgOpt(data, mainUser, wit, ids.bgOptOpn, ids.bgOptArea, ids.drpBgOpt, ids.clsBgOpt);
            idExFunc(data, mainUser, ids.opnAccInBgCht);
            verDisp(data, mainUser, ids.verIcon);
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                            // check duration to currentime
                if (distance < 0) {
                    $('.chtng-flw').fadeIn();
                    clearInterval(x);
                }
            }, 1000);
            global.chat.alrdNote = 'No';
            global.chat.alrdId = '';
        };
        var alData = global.chat.alrdNote;
        if (alData == 'Yes') {
            var dataId = global.chat.alrdId;
            getSpecAl(dataId, mainUser);
            clsChkr();
            tryCatcho();
        }
    };

    // close chat bod
    const closeBody = (data, closeBtn, chtFlwBd) => {
        $(`#${closeBtn}`).click(()=>{
            nowCHat.status = 'off'; nowCHat.chat = '';
            global.pop_no-2;
            $(`.chatBodClass`).fadeOut();
            $(`.chatBodClass`).remove();
            chkRec = 'off';
            incMess = 2;
            /*fetch('/settings/darkOrlight', { method: 'get'}).then((responce)=>{ return responce.json(); }).then((mode) => {
                if(mode == 'light') {
                    $('body').css('background-color', '#f0f0f0');
                }else {
                    $('body').css('background-color', '#333333');
                }
            });
            $('#headPusher-xs, #profInfoCol, #profNavCol, #nav-xs, #minnaver, #flowbod, #profbod, #profNavbar, #chtFlwAll, #openwj-xs').css('display', 'block');
            $('.chatBodClass').css('display', 'none');*/
        });
    };

    // opn bg opt
    const opnBgOpt = (data, mainUser, wit, bgOptOpn, bgOptArea, drpBgOpt, clsBgOpt) => {
        // open opt
        $(`#${bgOptOpn}`).click(()=>{
            $('.bgOptCht').remove();
            $(`#${bgOptArea}`).slideDown(200);
            var clas = 'bgOptCht'; 
            allOptFUncs(mainUser, data, `set_bg_ids_${data._id}`, wit, clas, drpBgOpt, clsBgOpt, bgOptArea);
            getMode(); Dark();
        });
    };

    //send message 
    const SendM = (data, tareaId, sendId, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser) => {
        const sendBtn = $(`#${sendId}`);
        const tarea = $(`#${tareaId}`);
        sendBtn.click(function(){
            if (tarea.val() !== '') {
                // message for me
                /*fetch(`/chats/messagem/${data._id}`, {method: 'put', body: JSON.stringify({ type: 'sen', chat: tarea.val() }), headers: { "Content-type" : "application/json; charset=utf-8" } }).then((response) => {
                    return response.json();
                }).then((chekId) => {
                    alert();
                });*/
                var uone = ''; var utwo = '';
                if (data.uone.user == mainUser._id) {
                    uone = data.uone.user;
                    utwo = data.utwo.user;
                }else {
                    utwo = data.uone.user;
                    uone = data.utwo.user;
                }
                var pData = {
                    section: 'chat',
                    type: 'send_m',
                    chat: { id: data._id, uone: uone, utwo: utwo, mess: {user: mainUser._id, type: 'text', chat: tarea.val(), date: [year, day, month, hour, minute]} },
                };
                postData(pData);
                $('.chat_load').fadeIn();
                async function refrshCht() {
                    try {
                        const response = await fetch(`https://test-vyral.onrender.com/chats/getChats`);
                        const newC = await response.json();
                        var cht = newC.find(i => i._id == data._id);
                        if (cht.messages.length !== data.messages.length) {
                            extractU();
                            $('.MessBod').remove();
                            $(tarea).val('');
                            incMess += 1;
                            var scrl = 'y';
                            var ids = ceateMId(cht);
                            // refreshMess(cht, prepMess, chtFlwBd, ids.loadMId, shrdImgsCon, dropShrdImgs, mainUser);
                            // console.log('new: '+cht.messages.length+', old: '+data.messages.length)
                            getMess(cht, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser, scrl);
                            Start();
                        } else {
                            refrshCht();
                        }
                    } catch (error) {
                        alert(error);
                    }
                }
                refrshCht();
            }
        });
    };

    // FOR TEXT (add = .innerText by calling the chat <p>-chat text)
    const senMess = (data, ids) => {
        return `
        <div style="width:100%;">
        <div class="MessBod" style="width:70%; float:right; margin:5px;">
            <p class="sub_h" style="font-size:10px; padding:4px; width:100%; margin:0px; font-weight:normal;"><i  id="${ids.dispTdy}" style="float:right;"></i></p>
            <div style="width:100%; float:right;"></div>
            <div style="border-radius:10px; background-color:orange; float:right; margin-right:10px;"">
                <p style="padding:5px; color:white; margin:0px; font-size:16.5px; float:left; font-weight:normal; white-space: pre-wrap;">${data.chat}</p>
                <span style="float:right; font-size:10px; color:white; padding:5px; cursor:pointer;" id="${ids.delSenM}">&times;</span>
            </div>
        </div>
        </div>
        `;
    };
    const recMess = (data, ids) => {
        return `
        <div style="width:100%;">
        <div class="MessBod" style="width:70%; float:left; margin:5px;">
            <p class="sub_h" style="float:left; font-size:10px; padding:4px; width:100%; margin:0px; font-weight:normal;"><i  id="${ids.dispTdy}"></i></p>
            <div style="border-radius:10px; background-color:#f0f0f0; float:left; margin-left:10px;">
                <p style="padding:5px; color:#1a1a1a; margin:0px; font-size:16.5px; float:left; font-weight:normal; white-space: pre-wrap;">${data.chat}</p>
            </div>
        </div>
        </div>
        `;
    };
    // FOR IMG's
    const senMessImg = (data, ids) => {
        return `
        <div style="width:100%;">
        <div class="MessBod" style="width:70%; float:right; margin:5px;">
            <p class="sub_h" style="font-size:10px; padding:4px; width:100%; margin:0px; font-weight:normal;"><i  id="${ids.dispTdy}" style="float:right;"></i></p>
            <div style="width:100%; float:right;"></div>
            <div style="border-radius:10px; background-color:orange; float:right; margin-right:10px;"">
                <div id="${ids.openShrImgs}" style="width:150px; height:65px; float:left; margin:7.5px; cursor:pointer;">
                    <div style="float:left; width:60px; height:60px;">
                        <div class="${data.chat[0].class}" style="border-radius:5px; width:100%; height:100%; background-image:url(https://test-vyral.onrender.com/${data.chat[0].path}); background-size:cover;"></div>
                    </div>
                    <div style="float:right; width:80px; height:60px;">
                        <p style="color:white; padding:10px; text-align:center; font-size:12px; margin:0px;"> <strong>${data.chat.length}</strong> images Attached</p>
                    </div>
                </div>
                <span style="float:right; font-size:10px; color:white; padding:5px; cursor:pointer;" id="${ids.delSenM}">&times;</span>
            </div>
        </div>
        </div>
        `;
    };
    const recMessImg = (data, ids) => {
        return `
        <div style="width:100%;">
        <div class="MessBod" style="width:70%; float:left; margin:5px;">
            <p class="sub_h" style="float:left; font-size:10px; padding:4px; width:100%; margin:0px; font-weight:normal;"><i  id="${ids.dispTdy}"></i></p>
            <div style="border-radius:10px; background-color:#f0f0f0; float:left; margin-left:10px;"">
                <div id="${ids.openShrImgs}" style="width:150px; height:65px; float:left; margin:7.5px; cursor:pointer;">
                    <div style="float:left; width:60px; height:60px;">
                        <div class="${data.chat[0].class}" style="border-radius:5px; width:100%; height:100%; background-image:url(https://test-vyral.onrender.com/${data.chat[0].path}); background-size:cover;"></div>
                    </div>
                    <div style="float:right; width:80px; height:60px;">
                        <p style="color:#1a1a1a; padding:10px; text-align:center; font-size:12px; margin:0px;"> <strong>${data.chat.length}</strong> images Attached</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
    };

    // Shared imgs con
    const shrdImgs = (data, ids) => {
        return `
            <div id="${ids.conId}" class="col-md-6 col-xs-6" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img src="https://test-vyral.onrender.com/${data.path}" class="${data.class}" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
        `
    };

    // IMG Shrd revwr
    const imgRev = (ids, ind) => {
        return `
            <div class="container-fluid" id="${ids.containId}">
                <div class="row">
                    <div class="col-md-12 col-xs-12" style="position:fixed; z-index:${ind-1}; width:100%; height:100%; background-color:#1a1a1a; opacity:0.9;">
                    </div>
                    <div class="col-md-12 col-xs-12" style="position:fixed; z-index:${ind}; width:100%; height:100%;">
                        <div class="row" style="height:100%;">
                            <div class="col-md-12 col-xs-12" style="height:7.5%;">
                                <img src="assets/imgs/can.png" width="20px" height="20px" style="margin:7.5px; float:left; cursor:pointer;" id="${ids.closeRevedCon}">
                            </div>
                            <div class="col-md-12 col-xs-12" style="height:85%; overflow-y:auto;">
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6 col-xs-12">
                                        <span id="${ids.dispCurnt}"></span>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </div>
                            <div id="${ids.multRevBtnCon}" class="col-md-12 col-xs-12" style="height:7.5%; display:none;">
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6 col-xs-12" id="goThrSntImgs">
                                        <img src="assets/imgs/backa.png" width="15px" height="20px" style="margin:2.5px; float:left; cursor:pointer;" id="${ids.prevImg}">
                                        <img src="assets/imgs/backb.png" width="15px" height="20px" style="margin:2.5px; float:right; cursor:pointer;" id="${ids.nextImg}">
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

    // increase/decrease messages viewed
    var incMess = 2;
    // load more button
    var loadMMess = (loadMId) => {
        return `
            <p id="${loadMId}" style="margin:0px; padding:8px; color:darkorange; text-align:center; font-size:14.5px; cursor:pointer;">more</p>
        `
    };
    var ceateMId = (data) => {
        return {
            loadMId: 'loadId_' + data._id,
            MessBodId: 'MessBod_' + data._id
        }
    };
    // display loader func
    const dspMLoader = (data2, data, prepMess, loadMId, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser) => {
        if (data2.length > incMess) {
            $(`#${prepMess}`).before(loadMMess(loadMId));
        } else {
            $(`#${loadMId}`).remove();
        }
        $(`#${loadMId}`).click(()=>{ 
            incMess += 5;
            $('.chat_load').fadeIn();
            $(`#${loadMId}, .MessBod`).remove();
            var scrl = 'n';
            getMess(data, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser, scrl);
        });
    };
    // refresh chats
    async function refreshMess(data, prepMess, chtFlwBd, loadMId, shrdImgsCon, dropShrdImgs, mainUser) {
        try {
            const response = await fetch(`https://test-vyral.onrender.com/chats/getChats`);
            const newC = await response.json();
            var data2 = newC.find(i => i._id == data._id);
            if (data2) {
                $(`#${loadMId}`).remove();
                $('.MessBod').remove();
                var scrl = 'y';
                getMess(data, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser, scrl);
            } 
        } catch (error) {
            alert(error);
        }
         // get messsages
         
    };
    var chkRec = 'off';
    const getMess = (data, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser, scrl) => {
        $('.MessBod').remove();
        // assignDb();
        chkRec = 'on';
        async function checkNwMess() {
            
            if (nowCHat.status == 'on') {
                // assignDb();
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/chats/getChats`);
                    const newC = await response.json();
                    var data2 = newC.find(i => i._id==data._id);
                    if (chkRec == 'on' && data2 !== undefined) {
                        if (data.messages.length > data2.messages.length || data.messages.length < data2.messages.length) {
                            try {
                                const response = await fetch(`https://test-vyral.onrender.com/getUsers`);
                                const users = await response.json();
                                $('.MessBod').remove();
                                var usr = users.find(i => i._id == udata._id);
                                var nowC = usr.chats.find(i=>i.chat == data2._id);
                                var uone = ''; var utwo = '';
                                getMess(data2, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser, scrl);
                                if (data.uone.user == mainUser._id) {
                                    uone = data.uone.user;
                                    utwo = data.utwo.user;
                                }else {
                                    utwo = data.uone.user;
                                    uone = data.utwo.user;
                                }
                                if (nowC.situ == 'rec') {
                                    var pData = {
                                        section: 'chat',
                                        type: 'rec_seen',
                                        user: udata._id,
                                        id: data2._id,
                                        uone: uone,
                                        utwo: utwo,
                                    };
                                    postData(pData);
                                    setTimeout(() => {
                                        getChat(usr);
                                    }, 2000);
                                }
                            } catch (error) {
                                alert(error);
                            }
                        }else {
                            setTimeout(() => {
                                checkNwMess();
                            }, 1);
                        }
                    }
                } catch (error) {
                    alert(error);
                }
            }
        }
        checkNwMess()
        // get messsages
        async function getMessSml() {
            try {
                const response = await fetch(`https://test-vyral.onrender.com/chats/getChats`);
                const newC = await response.json();
                var dataC = newC.find(i => i._id==data._id);
                var data2 = dataC.messages;
                $('.MessBod').remove();
                var ids = ceateMId(data);
                $(`#${ids.loadMId}`).remove();
                dspMLoader(data2, data, prepMess, ids.loadMId, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser);
                
                // cht date conditions
                const dispTimem = (data2, dispTdy) => {
                    if (data2.date[0] !== year) {
                        $(`#${dispTdy}`).html(`${data2.date[2]} ${data2.date[1]}, ${data2.date[0]}`);
                    }
                    if (data2.date[0] == year && data2.date[2] == month && data2.date[1] == day) {
                        $(`#${dispTdy}`).html(`<strong style="font-size:10px;">Today.</strong> ${data2.date[3]}:${data2.date[4]}`);
                    }
                    if (data2.date[0] == year && data2.date[2] == month && day - data2.date[1] == 1) {
                        $(`#${dispTdy}`).html(`<strong style="font-size:10px;">Yesterday.</strong> ${data2.date[3]}:${data2.date[4]}`);
                    }
                    if (data2.date[0] == year && data2.date[2] == month && day - data2.date[1] !== 1 && data2.date[1] !== day) {
                        $(`#${dispTdy}`).html(`${data2.date[2]} ${data2.date[1]}, ${data2.date[3]}:${data2.date[4]}`);
                    }
                    if (data2.date[0] == year && data2.date[2] !== month) {
                        $(`#${dispTdy}`).html(`${data2.date[2]} ${data2.date[1]}, ${data2.date[3]}:${data2.date[4]}`);
                    }
                };
                const delMess = (data2, data, delSenM, prepMess, chtFlwBd, i) => {
        
                    // delete recieved message
                    $(`#${delSenM}`).click(()=>{
                        var pData = {
                            section: 'chat',
                            type: 'del_m',
                            id: data._id,
                            messages: data2
                        };
                        postData(pData);
                        $('.chat_load').fadeIn();
                        const refrshCht = () => {
                            setTimeout(() => {
                                //assignDb();
                                var cht = db.chatbox.find(i => i._id == data._id);
                                if (cht.messages.length !== data.messages.length) {
                                    setTimeout(() => {
                                        extractU();
                                        incMess--;
                                        var ids = ceateMId(data);
                                        refreshMess(cht, prepMess, chtFlwBd, ids.loadMId, shrdImgsCon, dropShrdImgs, mainUser);
                                        //getMess(data, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, mainUser, scrl);
                                    }, 1);
                                } else {
                                    refrshCht();
                                }
                            }, 1);
                        }
                        refrshCht();
                        
                    });
                };
        
                // IMG REV FUNCS
                const opndRevImg = (chat, data2, z, conId, ids) => {
        
                    //close rev
                    $(`#${ids.closeRevedCon}`).click(()=>{
                        global.pop_no--;
                        $(`#${ids.containId}`).remove()
                    });
        
                    if (data2.chat.length > 1) {
                        var num = z;
                        $(`#${ids.multRevBtnCon}`).fadeIn();
                        // loop thr imgs
                        $(`#${ids.nextImg}`).click(()=>{
                            $(`#${ids.shrdImgId}`).css('display', 'none');
                            num++;
                            if (num >= data2.chat.length) {
                                num = 0;
                            }
                            $(`#${ids.shrdImgId}`).attr("src", `https://test-vyral.onrender.com/${data2.chat[num].path}`);
                            $(`#${ids.shrdImgId}`).attr("class", data2.chat[num].class);
                            $(`#${ids.shrdImgId}`).fadeIn();
                            //$(`#${ids.dispCurnt}`).text(num+1);
                        });
                        $(`#${ids.prevImg}`).click(()=>{
                            $(`#${ids.shrdImgId}`).css('display', 'none');
                            num--;
                            if (num < 0) {
                                num = data2.chat.length-1;
                            }
                            $(`#${ids.shrdImgId}`).attr("src", `https://test-vyral.onrender.com/${data2.chat[num].path}`);
                            $(`#${ids.shrdImgId}`).attr("class", data2.chat[num].class);
                            $(`#${ids.shrdImgId}`).fadeIn();
                            //$(`#${ids.dispCurnt}`).text(num+1);
                        });
                    } else {
                        $(`#${ids.multRevBtnCon}`).css('display', 'none');
                    }
        
                };
                // Img Ids
                const createRevShrdId = (chat) => {
                    const lrn = chat.path.slice(8, 20);
                    return {
                        containId: `container_${lrn}_reviewImgShrd`,
                        dispCurnt: `displayCurnt_${lrn}_reviewImgShrd`,
                        // img id
                        shrdImgId: `shrdImgId_${lrn}_reviewImgShrd`,
                        // imgs after click
                        closeRevedCon: `closeRevedCon_${lrn}_reviewImgShrd`,
                        multRevBtnCon: `multRevBtnCon_${lrn}_reviewImgShrd`,
                        prevImg: `prevImg_${lrn}_reviewImgShrd`,
                        nextImg: `nextImg_${lrn}_reviewImgShrd`,
                    }
                };
                const clickImg = (chat, data2, z, conId) => {
                    $(`#${conId}`).click(()=>{
                        global.pop_no++;
                        var ind = global.pop_no;
                        const revImgIds = createRevShrdId(chat);
                        $(`#dropCons`).after(imgRev(revImgIds, ind));
                        $(`#${revImgIds.dispCurnt}`).prepend(`
                        <img src="https://test-vyral.onrender.com/${data2.chat[z].path}" class="${data2.chat[z].class}" width="100%" id="${revImgIds.shrdImgId}">
                        `);
                        //alert('btn');
                        // opened rev btns
                        opndRevImg(chat, data2, z, conId, revImgIds);
                    });
                };
        
                var SILen = 0;
                const createShrIds = (data) => {
                    const lrn = data.path.slice(8, 20);
                    return {
                        conId: `conId_${lrn}_shrdImg`,
                    }
                };
                const imgBod = (shrIds, chat) => {
                    return `
                    <div id="${shrIds.conId}" class="col-md-4 col-xs-4 opnShrd" style="height:125px; margin-top:10px; margin-bottom:10px; cursor:pointer;">
                        <div style="width:90%; height:100%; margin:auto;">
                            <div class="${chat.class}" style="border-radius:5px; width:100%; height:100%; background-image:url(https://test-vyral.onrender.com/${chat.path}); background-size:cover;"></div>
                        </div>
                    </div>
                    `
                };
                const opnShrImg = (data2, data, openShrImgs) => {
                    $(`#${openShrImgs}`).click(()=>{
                        //aler
                        $('.opnShrd').remove();
                        $(`#${shrdImgsCon}`).slideDown(200);
                        for (let z = 0; z < data2.chat.length; z++) {
                            const shrIds = createShrIds(data2.chat[z]);
                            $(`#${dropShrdImgs}`).append(imgBod(shrIds, data2.chat[z]));
                            //alert($(`#${shrIds.conId}`).attr('class'));
                            clickImg(data2.chat[z], data2, z, shrIds.conId);
                        }
                        /*for (let i = 0; i < SILen.length; i++) {
                            
                        }
                        SILen = data2.chat.length;*/
                    });
                };
        
                const ScrollDiv = () => {
                    //document.getElementById(`${chtFlwBd}`).scrollTop= 0;
                    setTimeout(() => {
                        //document.getElementById(`${chtFlwBd}`).scrollTop = document.getElementById(`${chtFlwBd}`).scrollHeight - document.getElementById(`${chtFlwBd}`).clientHeight;
                        // window.scrollTo(0, document.body.scrollHeight);
                        var div = document.getElementById(`${chtFlwBd}`);
                        div.scrollTop = div.scrollHeight;
                    }, 100);
                };
                const chatScroll = (data2, chtFlwBd) => {
                    ScrollDiv();
                };
        
                const createMinId = (data2, i) => {
                    return {
                        // date ID
                        dispTdy: 'dispTdyMess_' + i,
                        // delete mes ID
                        delSenM: 'delSenMess_' + i,
                        // open imgs Id
                        openShrImgs: 'openShrImgs_' + i
                    }
                };
                // if (data2.length > incMess) {}else {}
                const displayMess = (data2, chtFlwBd, i) => {
                    /*if (data.date[0] == year && data.date[1] == day && data.date[2] == month) {
                        const tdyDiv = ` <></div> `;
                    }*/
                    const mids = createMinId(data2, i);
                    if (data2.user == mainUser._id) {
                        if (data2.type == 'text') {
                            $(`#${prepMess}`).prepend(senMess(data2, mids, i));
                            delMess(data2, data, mids.delSenM, prepMess, chtFlwBd, i);
                        }
                        if (data2.type == 'imgs') {
                            //alert(data2.chat);
                            $(`#${prepMess}`).prepend(senMessImg(data2, mids, i));
                            delMess(data2, data, mids.delSenM, prepMess, chtFlwBd, i);
                            opnShrImg(data2, data, mids.openShrImgs);
                        }
                    } else {
                        if (data2.type == 'text') {
                            $(`#${prepMess}`).prepend(recMess(data2, mids));
                        }
                        if (data2.type == 'imgs') {
                            $(`#${prepMess}`).prepend(recMessImg(data2, mids));
                            opnShrImg(data2, data, mids.openShrImgs);
                        }
                    }
                    if (scrl == 'y') {
                        chatScroll(data2, chtFlwBd);
                    }
                    Dark();
                    dispTimem(data2, mids.dispTdy);
                    //objDiv = document.getElementById(`${chtFlwBd}`);
                    //objDiv.scrollTop = objDiv.scrollHeight;
                    // display time conditions 
                };
                for (let i = data2.length - 1; i >= data2.length-incMess; i--) {
                    if (i >= 0) {
                        displayMess(data2[i], chtFlwBd, i);
                    }
                }
                $('.chat_load').fadeOut();
            } catch (error) {
                alert(error);
            }
        }
        getMessSml()

    };

    // share funcs
    const Share = (data, shareOpen, shareBd, shareCls, optBd) => {
        // opn
        $(`#${shareOpen}`).click(()=>{
            $(`#${optBd}`).css('display', 'none');
            $('.shareOptBod').css('display', 'block');
            $(`#${shareBd}`).slideDown(200);
        });
        //clse
        $(`#${shareCls}`).click(()=>{
            $(`#${shareBd}`).slideUp(100);
        });
    };

    // share IMg
    // add loader
    const DropLoad = () => {
        return `
            <div id="dropLoad-sentCht" style="margin-top:75px; margin:auto; width:30px; height:30px;">
                <img class="rfrshMain" src="assets/imgs/refresh.png" width="100%" height="100%">
            </div>
        `
    };
     // add thread
     const sendImgbut = () => {
         return `
        <form action="/chats/shareImg" method="post" enctype="multipart/form-data" style="display:none;">
            <input type="file" name="file" id="shareImgCht" accept="image/*" multiple>
        </form>
         `
     };
     //alert($('#shareImgCht').val().length);
     //$("#shareImgCht").remove();
     //$('#dropCons').before(sendImgbut());
    const shareImg = (data, mainUser, shareImg, shrImgFlw, sndImgs, prepMess, chtFlwBd, shrdImgsCon, dropShrdImgs, shareImgCls, clsScrlImg) => {
        
        $(`#${shareImg}`).click(()=>{
            global.shr_theId = shrImgFlw;
            var dat = global.shr_theId;
            if (dat) {
                $(`#shareImgCht`).click();
                //$(`#ShareImgChat`).click();
            }
        });
        // cancel
        $(`#${clsScrlImg}`).click(()=>{
            $('.allImgs_app').remove();
            $('.imgAlignDiv-cht').slideUp(100);
        });
        // send imgs
        $(`#${sndImgs}`).click(()=>{
            $(`#${shrImgFlw}`).before(DropLoad());
            
            //alert(test);
            var test = global.img_hangLen;
            var testar = [];
            for (let i = 0; i < test; i++) {
                testar[i] = `imgHangerFltrd-cht${i}`;
            }
            //alert(testar[0]);
            for (let i = 0; i < test; i++) {
                var tter = testar[i];
                global.edt_imgs[i].class = $(`#${tter}`).attr('class');
            }
            var uone = ''; var utwo = '';
            if (data.uone.user == mainUser._id) {
                uone = data.uone.user;
                utwo = data.utwo.user;
            }else {
                utwo = data.uone.user;
                uone = data.utwo.user;
            }
            for (let i = 0; i < test; i++) {
                $(`#imgHangerFltrd-cht${i}`).css('display', 'none');
            }
            for (let l = 0; l < global.edt_imgs.length; l++) {
                console.log(global.edt_imgs[l]);
            }
            var pData = {
                section: 'chat',
                type: 'send_m',
                chat: { id: data._id, uone: uone, utwo: utwo, type: 'binary', mess: {user: mainUser._id, type: 'imgs', chat: global.edt_imgs, date: [year, day, month, hour, minute]} },
            };
            postData(pData);
            $('.chat_load').fadeIn();
            $('.MessBod, #dropLoad-sentCht').remove();
            const refrshCht = () => {
                setTimeout(() => {
                    assignDb();
                    var cht = db.chatbox.find(i => i._id == data._id);
                    if (cht.messages.length !== data.messages.length) {
                        global.edt_imgs = []; global.img_hangLen = 0;
                        document.getElementById(`${chtFlwBd}`).scrollTop = document.getElementById(`${chtFlwBd}`).scrollHeight -  document.getElementById(`${chtFlwBd}`).clientHeight;
                        $(`#${shareImg}_done`).fadeOut();
                        $(`#${shareImg}_done`).css('display', 'none');
                        setTimeout(() => {
                            incMess += 1;
                            $('.imgAlignDiv-cht').slideUp(100);
                            var scrl = 'y';
                            var ids = ceateMId(data);
                            refreshMess(cht, prepMess, chtFlwBd, ids.loadMId, shrdImgsCon, dropShrdImgs, mainUser);
                            $('.sentImgNte, .dropLoad-sentCht, .allImgs_app').remove();
                            Start();
                        }, 1);
                    } else {
                        refrshCht();
                    }
                }, 1);
            }
            refrshCht();
        });
        $(`#${shareImgCls}`).click(()=>{
            $(`#${shrdImgsCon}`).slideUp(100);
        });
    };

    // opt funcs
    const OptFunc = (mainUser, data, opnHdOpt, chtHdOPt, clsHdOPt, ids, wit) => {
        // chk if blckd
        // block chk
        var users = db.users;
        var user = '';
        for (let x = 0; x < users.length; x++) {
            if (users[x].user_name == wit) {
                user = users[x];
            }
        }
        
        // bock usr
        var ckr = '';
        if (user.blocked_list.length < 1) {
            $(`#${ids.blckdIcn}`).css('display', 'none');;
        }else {
            for (let i = 0; i < user.blocked_list.length; i++) {
                if (user.blocked_list[i].user == mainUser._id) {
                    ckr = 'y';
                }
            }
        }
        if (ckr == 'y') {
            $(`#${ids.openBodId}`).css('display', 'none');
        }else {
            $(`#${ids.blckdIcn}`).css('display', 'none');;
        }
        // open opt
        $(`#${opnHdOpt}`).click(()=>{
            $('.smOptCht').remove();
            $(`#${chtHdOPt}`).slideDown(200);
            var clas = 'smOptCht'; 
            allOptFUncs(mainUser, data, `set_sm_ids_${data._id}`, wit, clas, chtHdOPt, clsHdOPt, chtHdOPt);
            getMode(); Dark();
        });
    };
    // optall-funcs
    const optGenFUncs = (mainUser, data, wit, ids) => {

        // opn usr
        idExFunc(data, mainUser, ids.goToProf);

        // block chk
        var users = db.users;
        var user = ''; var usrCon = '';
        for (let x = 0; x < users.length; x++) {
            if (users[x].user_name == wit) {
                user = users[x]._id;
                usrCon = users[x];
            }
        }
        
        // bock usr
        var ckr = '';
        const blkStt = () => {
            mainUser = udata;
            if (mainUser.blocked_list.length < 1) {
                $(`#${ids.blckChk}`).text(`block`);
            }else {
                for (let i = 0; i < mainUser.blocked_list.length; i++) {
                    if (mainUser.blocked_list[i].user == user) {
                        ckr = 'y';
                        $(`#${ids.blckChk}`).text(`un-block`);
                    }
                }
            }
            if (ckr == '') {
                $(`#${ids.blckChk}`).text(`block`);
            }
        }
        blkStt();
        $(`#${ids.opnBlckCon}`).click(()=>{
            $(`#${ids.blkckCon}`).slideDown(200);
        });
        $(`#${ids.blckNo}`).click(()=>{
            $(`#${ids.blkckCon}`).slideUp(100);
        });
        $(`#${ids.blckYes}`).click(()=>{
            if (ckr == 'y') {
                global.page_ld = 'y';
                var pData = {
                    section: 'settings',
                    type: 'un_block',
                    me: udata._id,
                    user: user,
                    con: ids.blkckCon,
                };
                postData(pData);
                setTimeout(() => {
                    extractU(); Start();
                    blkStt();
                    global.page_ld_stt = 'off';
                }, 2000);
            }else {
                global.page_ld = 'y';
                var pData = {
                    section: 'settings',
                    type: 'block',
                    me: udata._id,
                    user: user,
                    con: ids.blkckCon,
                };
                postData(pData);
                setTimeout(() => {
                    extractU(); Start();
                    blkStt();
                    global.page_ld_stt = 'off';
                }, 2000);
            }
        });

        // report user
        $(`#${ids.rprtUsr}`).click(()=>{
            $(`#${ids.rprtCon}`).slideDown(200);
        });
        $(`#${ids.canRprt}`).click(()=>{
            $(`#${ids.rprtCon}`).slideUp(100);
        });
        $(`#${ids.inapRprt}`).click(()=>{
            var con = 'Inapproriate contents';
            pushRep(con);
        });
        $(`#${ids.abusRprt}`).click(()=>{
            var con = 'Abusive contents';
            pushRep(con);
        });
        // report func
        const pushRep = (con) => {
            var pData = {
                section: 'ex_user',
                type: 'report',
                from: udata._id,
                by: user,
                con: con,
                repCon: ids.rprtCon,
            };
            postData(pData);
            setTimeout(() => {
                $(`#${ids.canRprt}`).click();
            }, 500);
        };

        // del cht
        $(`#${ids.delChtOpn}`).click(()=>{
            $(`#${ids.delChtCon}`).slideDown(200);
        });
        $(`#${ids.delChtN}`).click(()=>{
            $(`#${ids.delChtCon}`).slideUp(100);
        });
        $(`#${ids.delChtY}`).click(()=>{
            var fnd = '';
            for (let x = 0; x < usrCon.chats.length; x++) {
                if (usrCon.chats[x].user == mainUser._id) {
                    fnd = 'y';
                }
            }
            if (fnd == 'y') {
                delUsrCOn()
            }else {
                delChtBx()
            }
        });
        // delete current chatbx
        const delChtBx = () => {
            var remThis = '';
            mainUser = udata;
            for (let z = 0; z < mainUser.chats.length; z++) {
                if (mainUser.chats[z].user == user) {
                    remThis = mainUser.chats[z];
                }
            }
            global.page_ld = 'y';
            var pData = {
                section: 'chat',
                type: 'del_chat',
                me: mainUser._id,
                rem: remThis,
                id: data._id,
            };
            postData(pData);
            setTimeout(() => {
                extractU();
                Start();
                global.page_ld_stt = 'off';
            }, 2000);
        };
        // delete mnUsr connection
        const delUsrCOn = () => {
            var remThis = ''; mainUser = udata;
            for (let z = 0; z < mainUser.chats.length; z++) {
                if (mainUser.chats[z].user == user) {
                    remThis = mainUser.chats[z];
                }
            }
            global.page_ld = 'y';
            var pData = {
                section: 'chat',
                type: 'del_cnct',
                me: mainUser._id,
                rem: remThis,
            };
            postData(pData);
            setTimeout(() => {
                extractU();
                Start();
                global.page_ld_stt = 'off';
            }, 2000);
        };
    };
    // create op ids
    const crtOptId = (id,clas) => {
        return {
            // go to prof
            goToProf:  'goToProf_opt_' + id+clas,
            // bock sec
            opnBlckCon:  'opnBlckCon_' + id+clas,
            blkckCon:  'blkckCon_' + id+clas,
            blckChk: 'blckChk_' + id+clas,
            blckYes: 'blckYes_' + id+clas,
            blckNo: 'blckNo_' + id+clas,
            // report
            rprtUsr: 'rprtUsr_' + id+clas,
            rprtCon: 'rprtCon_' + id+clas,
            canRprt: 'canRprt' + id+clas,
            inapRprt: 'inapRprt_' + id+clas,
            abusRprt: 'abusRprt_' + id+clas,
            // del chat
            delChtOpn: 'delChtOpn_' + id+clas,
            delChtCon: 'delChtCon_' + id+clas,
            delChtY: 'delChtY_' + id+clas,
            delChtN: 'delChtN_' + id+clas,
        }
    };
    const allOptFUncs = (mainUser, data, setIds, wit, clas, dropHere, close, body) => {
        const ids = crtOptId(setIds, clas);
        $(`#${dropHere}`).append(addOpts(wit, close, clas, ids));
        optGenFUncs(mainUser, data, wit, ids);
        $(`#${close}`).click(()=>{
            if (clas = 'smOptCht') {
                // close Opt
                $('.smOptCht').slideUp(100);
            }
            if (clas = 'bgOptCht') {
                // close Opt
                $('.bgOptCht').remove();
            }
            $(`#${body}`).slideUp(100);
        });
    };
    


    // creating ids
    const CreateIds = (data) => {
        return {
            userIdEx: 'userIdEx_' + data._id,
            chatBodId: 'chatBod_' + data._id,
            openBodId: 'openBod_' + data._id,
            situIcon: 'situIcon_' + data._id,
            verIcon: 'verIcon_chtHd_' + data._id,
            // opt sec
            opnHdOpt: 'opnHdOpt_' + data._id,
            chtHdOPt: 'chtHdOPt_' + data._id,
            clsHdOPt: 'clsHdOPt_' + data._id,
            // blck icn
            blckdIcn: 'blckdIcn_' + data._id
        }
    };

    // display chats
    const displayChats = (data, mainUser, situ, users) => {
        const ids = CreateIds(data);
        var wit = ''; var usr = ''; var witno = ''; var usrno = '';
        var dt1 = ''; var dt2 = ''; var no1 = ''; var no2 = ''; 
        var witId = ''; var verIc = '';
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (data.uone.user == users[i]._id) {
                    dt1 = users[i].user_name;
                    no1 = data.uone.user;
                    if (users[i].verification == 'on') {
                        verIc = 'on';
                    }else {
                        verIc = 'off';
                    }
                }
                if (data.utwo.user == users[i]._id) {
                    dt2 = users[i].user_name;
                    no2 = data.utwo.user;
                    if (users[i].verification == 'on') {
                        verIc = 'on';
                    }else {
                        verIc = 'off';
                    }
                }
            }
            if (dt1 == mainUser.user_name) {
                usr = dt1;
                wit = dt2;
            }else {
                usr = dt2;
                wit = dt1;
                for (let z = 0; z < users.length; z++) {
                    if (users[z]._id) {
                        
                    }                    
                }
            }
        }
        var pat = '';
        for (let x = 0; x < users.length; x++) {
            if (users[x]._id == data.utwo.user && data.utwo.user !== mainUser._id) {
                pat = users[x].profile_pic;
            }
            if (users[x]._id == data.uone.user && data.uone.user !== mainUser._id) {
                pat = users[x].profile_pic;
            }
        }
        console.log('log with: '+wit);
        $('#dpChtHr').prepend(chatHead(data, wit, usr, ids, pat));
        getMode();
        Dark();
        // situation check and adj
        OpenCbod(data, ids.chatBodId, ids.openBodId, ids.situIcon, wit, mainUser, pat, situ);
        SendM(data, ids.tareaId, ids.sendId, ids.prepMess, ids.chtFlwBd);
        //getMess(data, ids.prepMess, ids.chtFlwBd, mainUser);
        OptFunc(mainUser, data, ids.opnHdOpt, ids.chtHdOPt, ids.clsHdOPt, ids, wit);
        idExFunc(data, mainUser, ids.userIdEx);
        getMode();
        if (verIc == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        setTimeout(() => {
            $(`#${ids.chatBodId}`).fadeIn();
        }, 500);
        const newMessC = () => {
            if (app.child_p == 'chats') {
                var newC = db.chatbox;
                var fnd = newC.find(i=>i._id==data._id);
                if (fnd !== undefined) {
                    if (fnd.messages.length > data.messages.length || fnd.messages.length < data.messages.length) {
                        extractU();
                        getChat(udata);
                    } else {
                        setTimeout(() => {
                            newMessC();
                        }, 500);
                    }
                }
            }
        }
        newMessC();

            /*Share(data, ids.shareOpen, ids.shareBd, ids.optBd);*/
    }

    /**
     * SEARCH FRIENDS FUNCS
     */
    // smart value
    $('#chtFrndsSrch').on('input', function(key){
        var value = $(this).val();
        $(this).val(value.replace(/ /g, '_'));
    });
    // search input funcs
    $('#chtFrndsSrch').keyup(()=>{
        $('.srchdCon-3').remove();
        if ($('#chtFrndsSrch').val() !== '') {
            $('#drpChtCon').css('display', 'none');
            $('#srchChtCon').fadeIn();
            fetchUsers($('#chtFrndsSrch').val());
        }else {
            $('.srchdCon-3').remove();
            $('#srchChtCon').css('display', 'none');
            $('#drpChtCon').fadeIn();
        }
    });
 
    const checkModeSrc = (data, conId) => {
        if(udata.mode == 'light') {
            $(`#${conId}`).css('border', 'solid 1px #f0f0f0');
        }
        if (udata.mode == 'dark') {
            $(`#${conId}`).css('border', 'solid 1px #404040');
        }
    };
 
    // for usrs
    const srchUser = (data, ids) => {
        var path = '';
        if (data.profile_pic == 'none') {
            path = 'assets/imgs/profb.png';
        }else {
            path = `${data.profile_pic.path}`;
        }
        return `
        <div id="${ids.conId}" class="srchdCon-3" style="width:97.5%; margin:auto; height:40px; border-radius:5px; margin-top:10px; display:none;">
            <div style="width:20%; height:100%; float:left;">
                <div style="width:33px; height:33px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
            </div>
            <div style="width:60%; height:100%; float:left;">
                <p id="${ids.goToUPrf}" class="sub_h" style="padding:5px; margin:5px;">${data.user_name}</p>
            </div>
            <div style="width:20%; height:100%; float:right;">
                <div id="${ids.chatUpSrc}" style="width:20px; height:20px; margin:auto; background-size:100% 100%; margin-top:10px; cursor:pointer;"></div>
            </div>
        </div>
        `
    };
    async function fetchUsers(srch) {
        const settings = {
            method: 'post',
            body: JSON.stringify({ srch: srch }),
            headers: { "Content-type" : "application/json; charset=utf-8" }
        }
        try {
            const response = await fetch(`https://test-vyral.onrender.com/searcher/searchFrnd`, settings);
            const data = await response.json();
            if (data) {
                $('.srchdCon-3').remove();
                for (let i = 0; i < data.length; i++) {
                    if (srch.length > 0) {
                        extractU();
                        displayUsers(data[i]);
                    }
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    // CHAT_BTN FUNCS
    const chatUp = (data, chatUpSrc) => {

        var user = udata;
        if (user) {

            var flag = '';
            for (let i = 0; i < user.chats.length; i++) {
                if (user.chats[i].user == data._id) {
                    flag = 'white';
                    $(`#${chatUpSrc}`).css('background-image', 'url(assets/imgs/chatd.png)');
                }
            }
            if (flag == '') {
                $(`#${chatUpSrc}`).css('background-image', 'url(assets/imgs/chat.png)');
            }
            // display none
            if (user._id == data._id) {
                $(`#${chatUpSrc}`).css('display', 'none');
            }

        }
        
        // BTN_CLICK
        $(`#${chatUpSrc}`).click(()=>{
            var getBoth = () => {
                var mainUser = udata;
                checkInfo(mainUser, data._id);
            };
            var checkInfo = (mainUser, exdata) => {
                var allChats = db.chatbox;
                var already = (chat) => {
                    global.chat.alrdNote = 'Yes';
                    global.chat.alrdId = chat._id;
                };
                var doesnt = (mainUser, exdata) => {
                    var pData = {
                        section: 'chat',
                        type: 'add_chat',
                        chat: {mainUser: mainUser, exdata: exdata},
                    };
                    postData(pData);
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
                }else {
                    doesnt(mainUser, exdata);
                }
            };
            getBoth();
        });

    };

    const idExFuncSr = (data, userIdEx) => {

        $(`#${userIdEx}`).click(()=>{
            if (data == udata._id) {
                $('#opnPrf').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = data;
                global.ex_flag = 'y';
            }
            $('.ex-slider').remove();
        })

    };

    // create ids
    const createId = (data) => {
        return {
            conId: 'conId_' + data._id,
            chatUpSrc: 'chatUpSrchr_' + data._id,
            goToUPrf: 'goToUPrf_' + data._id,
        }
    };
    // display function
    const displayUsers = (data) => {
        const ids = createId(data);
        $('#dpSrchCht').prepend(srchUser(data, ids));
        Dark();
        checkModeSrc(data, ids.conId);
        idExFuncSr(data._id, ids.goToUPrf);
        chatUp(data, ids.chatUpSrc);
        var targetDate = new Date();
                targetDate.setMilliseconds(targetDate.getMilliseconds() + 0.1);
                var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = countDownDate - now;
                    // check duration to currentime
                    if (distance < 0) {
                        $(`#${ids.conId}`).fadeIn();
                        clearInterval(x);
                    }
                }, 1000);
    };
    
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                chats();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
