import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function srch() {

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
            $('#opnSrchp').fadeIn();
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

    var pos = 'usr';
    // noti btn
    $('#opnSrchp').click(()=>{
        $('#mainSrchCon').slideDown(200);
        $('#mainFLwCon, #sbNav, #opnLfn, #refrshr_con, #genBottom').css('display', 'none');
        $('#forSrchMain').fadeIn();
        $('#opnUsrSrch').click();  
        window.scrollTo(0, 0);
    }); 
    $('#clseSrchPg').click(()=>{
        //$('#sbNav').css('display', 'none');
        $('#mainSrchCon').slideUp(100);
        $('#forSrchMain').css('display', 'none');
        $('#mainFLwCon, #sbNav, #opnLfn, #refrshr_con, #genBottom').fadeIn();
        window.scrollTo(0, 0);
    });
    // naver
    $('#opnUsrSrch').click(()=>{
        pos = 'usr';
        $('#opnUsrSrch').attr('src', 'assets/imgs/profb.png');
        $('#opnStrSrch').attr('src', 'assets/imgs/strings2.png');
        $('#opnJBsSrch').attr('src', 'assets/imgs/readen.png');
        $('#drpStrSrchdCon, #drpJbsSrcCon').css('display', 'none');
        $("#allSrchIn").attr('placeholder', 'search users');
        $('#drpUsrSrchdCon').fadeIn();
        if ($("#allSrchIn").val() !== '') {
            fetchUsers(searcher.val());
        }
    }); 
    $('#opnStrSrch').click(()=>{
        //$('#sbNav').css('display', 'none');
        pos = 'str';
        $('#opnStrSrch').attr('src', 'assets/imgs/strings.png');
        $('#opnUsrSrch').attr('src', 'assets/imgs/profbda.png');
        $('#opnJBsSrch').attr('src', 'assets/imgs/readen.png');
        $('#drpUsrSrchdCon, #drpJbsSrcCon').css('display', 'none');
        $("#allSrchIn").attr('placeholder', 'search public strings');
        $('#drpStrSrchdCon').fadeIn();
        if ($("#allSrchIn").val() !== '') {
            fetchStr(searcher.val(), udata);
        }
    });
    $('#opnJBsSrch').click(()=>{
        //$('#sbNav').css('display', 'none');
        pos = 'bjs';
        $('#opnJBsSrch').attr('src', 'assets/imgs/read.png');
        $('#opnStrSrch').attr('src', 'assets/imgs/strings2.png');
        $('#opnUsrSrch').attr('src', 'assets/imgs/profbda.png');
        $('#drpUsrSrchdCon, #drpStrSrchdCon').css('display', 'none');
        $("#allSrchIn").attr('placeholder', 'search Books + Journals');
        $('#drpJbsSrcCon').fadeIn();
        if ($("#allSrchIn").val() !== '') {
            fetchCnt(searcher.val());
        }
    });
    
    // searcher
    var searcher = $('#allSrchIn');
    // smart value
    $('#allSrchIn').on('input', function(key){
        var value = $(this).val();
        $(this).val(value.replace(/ /g, '_'));
    });
    // onkey up test
    $("#allSrchIn").keyup(function(){
        $('.srchdCon-2').remove();
        if ($("#allSrchIn").val() !== '') {
            $('#flowLoader1S').fadeIn();
            if (pos == 'usr') {
                fetchUsers(searcher.val());
            }
            if (pos == 'str') {
                fetchStr(searcher.val(), udata);
            }
            if (pos == 'bjs') {
                fetchCnt(searcher.val(), udata);
            }
        }else {
            $('#flowLoader1S').fadeOut();
        }
        $('#flowLoader1S').fadeOut();
    });
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
                var dataFlwn = udata;
                $('.srchdCon-2').remove();
                var chk = '';
                for (let i = 0; i < data.length; i++) {
                    if (srch.length > 0) {
                        chk = 'y';
                        displayUsers(data[i]);
                    }
                    if (srch.length == 0) {
                        for (let z = 0; z < dataFlwn[0].following.length; z++) {
                            if (dataFlwn[0].following[z].user == data[i]._id) {
                                chk = 'y';
                                displayUsers(data[i]);
                            }
                        }
                    }
                }
                if (chk == '') {
                    $('#noUsrSrchd').fadeIn();
                }else {
                    $('#noUsrSrchd').css('display', 'none');
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    };
    // fetch str
    async function fetchStr(srch, udata) {
        const settings = {
            method: 'post',
            body: JSON.stringify({ srch: srch }),
            headers: { "Content-type" : "application/json; charset=utf-8" }
        }
        try {
            const response = await fetch(`https://test-vyral.onrender.com/searcher/searchStr`, settings);
            const data = await response.json();
            if (data) {
                var thrdata = db.all_posts;
                $('.srchdCon-2').remove();
                var chk = '';
                for (let i = 0; i < data.length; i++) {
                    if (srch.length > 0) {
                        chk = 'y';
                        displayStr(data[i]);
                    }
                    if (srch.length == 0) {
                        for (let z = 0; z < thrdata.length; z++) {
                            if (thrdata[z].user == udata._id) {
                                if (thrdata[z].tied_to == data[i]._id) {
                                    chk = 'y';
                                    displayStr(data[i]);
                                    break;
                                }
                            }
                        }
                    }
                }
                if (chk == '') {
                    $('#noStrSrchd').fadeIn();
                }else {
                    $('#noStrSrchd').css('display', 'none');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    // fetch books + journals
    async function fetchCnt(srch) {
        const settings = {
            method: 'post',
            body: JSON.stringify({ srch: srch }),
            headers: { "Content-type" : "application/json; charset=utf-8" }
        }
        try {
            const response = await fetch(`https://test-vyral.onrender.com/searcher/searchStr`, settings);
            const data = await response.json();
            if (data) {
                var users = db.users; var psts = db.all_posts;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].content_type == 'usr_aut_book') {
                        var usr = users.find(g => g._id==data[i].user);
                        var me = '';
                        if (usr.user_type !== 'user' && usr.user_type.status == 'on') {
                            if (usr.user_type.price == 'free') {
                                var stat = 'subd';
                                srcBook(data[i], usr, stat);
                            } else {
                                me = usr.user_type.subscribers.find(h => h.user==udata._id);
                                if (me !== '') {
                                    var stat = 'subd';
                                    srcBook(data[i], usr, stat);
                                }else {
                                    var stat = 'none';
                                    srcBook(data[i], usr, stat);
                                }
                            }
                        }
                    } 
                    if (data[i].content_type == 'journal' || data[i].content_type == 'author_journal' || data[i].content_type == 'admin_aut_journal') {
                        if (data[i].content_type == 'author_journal') {
                            var usr = db.users.find(g => g._id==data[i].user);
                            var me = '';
                            if (usr.user_type !== 'user' && usr.user_type.status == 'on') {
                                if (usr.user_type.price == 'free') {
                                    var stat = 'subd';
                                    srcJrnl(data[i], usr, stat);
                                } else {
                                    me = usr.user_type.subscribers.find(h => h.user==udata._id);
                                    if (me !== '') {
                                        var stat = 'subd';
                                        srcJrnl(data[i], usr, stat);
                                    }else {
                                        var stat = 'none';
                                        srcJrnl(data[i], usr, stat);
                                    }
                                }
                            }
                        } else {
                            if (data[i].content_type == 'admin_aut_journal') {
                                var stat = 'none';
                                var usr = udata;
                                srcJrnl(data[i], usr, stat);
                            }else {
                                var usr = users.find(g => g._id==data[i].user); var me = '';
                                if (usr.user_type == 'user' && data[i].hidden == 'No') {
                                    var stat = 'none';
                                    srcJrnl(data[i], usr, stat);
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkGlobMode = () => {
        if(udata.mode == 'light') {
            $('.notiCont, #comNewNoti').css('background-color', 'white');
            $('.notiCont, #comNewNoti').css('border', 'solid 1px #f0f0f0');
            $('.notiUNholder, .revTopper').css('border-bottom', 'solid 1px #f0f0f0');
            $('#revConHead').css('background-color', 'white');
            $('#revConHead').css('border-bottom', 'solid 1px #f0f0f0');
            $('#drp-like-tag-rev-bod').css('background-color', '#f9f9f9');
            $('#drp-like-tag-rev-bod').css('border-right', 'solid 1px #dddddd');
            $('#drp-like-tag-rev-bod').css('border-left', 'solid 1px #dddddd');
            // slider
            $('.stylePosts, .ex-slider-noti, .detail_bod').css('background-color', 'white');
            $('.strFlowDiv, .slidebod, .flow_bod').css('background-color', '#f9f9f9');
            $('.stylePosts, .privStrBod, .clsStrCon, .statBod').css('border-top', 'solid 1px #f0f0f0');
        }
        if (udata.mode == 'dark') {
            $('.notiCont, #comNewNoti').css('background-color', '#292929');
            $('.notiCont, #comNewNoti').css('border', 'solid 1px #404040');
            $('.notiUNholder, .revTopper').css('border-bottom', 'solid 1px #404040');
            $('#revConHead').css('background-color', '#292929');
            $('#revConHead').css('border-bottom', 'solid 1px #404040');
            $('#drp-like-tag-rev-bod').css('background-color', '#292929');
            $('#drp-like-tag-rev-bod').css('border-right', 'solid 1px #1a1a1a');
            $('#drp-like-tag-rev-bod').css('border-left', 'solid 1px #1a1a1a');
            // slider
            $('.stylePosts, .ex-slider-noti, .detail_bod').css('background-color', '#262626');
            $('.strFlowDiv, .slidebod, .flow_bod').css('background-color', '#333333');
            $('.stylePosts, .privStrBod, .clsStrCon, .statBod').css('border-top', 'solid 1px #404040');
        }
    }
    const checkMode = (data, conId) => {
        // light or dark effects
        if(udata.mode == 'light') {
            $(`#${conId}`).css('border', 'solid 1px #f0f0f0');
            $(`#${conId}`).css('background-color', 'white');
        }
        if (udata.mode == 'dark') {
            $(`#${conId}`).css('border', 'solid 1px #404040');
            $(`#${conId}`).css('background-color', '#1a1a1a');
        }
    };

    /**
     * BODIES
     */
    // for usrs
    const srchUser = (data, ids) => {
        var path = ''; var clas = '';
        if (data.profile_pic == 'none') {
            path = 'assets/imgs/profb.png';
            clas = '';
        }else {
            path = `https://test-vyral.onrender.com/${data.profile_pic.path}`;
            clas = `${data.profile_pic.class}`;
        }
        return `
        <div id="${ids.conId}" class="srchdCon-2" style="width:100%; margin:auto; height:40px; border-radius:5px; margin-top:10px; display:none;">
            <div style="width:20%; height:100%; float:left;">
                <div class="${clas}" style="width:33px; height:33px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
            </div>
            <div style="width:60%; height:100%; float:left;">
                <p id="${ids.goToUPrf}" class="sub_h" style="padding:3px; margin:3px;">${data.user_name} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="15px" height="15px" style="margin-top:-5px; display:none;"></p>
            </div>
            <div style="width:20%; height:100%; float:right;">
                <div id="${ids.chatUpSrc}" style="width:20px; height:20px; margin:auto; background-image:url(assets/imgs/chatd.png); background-size:100% 100%; margin-top:10px; cursor:pointer;"></div>
            </div>
        </div>
        `
    };
    // for strs
    const srchStr = (data, ids) => {
        return `
        <div id="${ids.conId}" class="srchdCon-2" style="width:100%; margin:auto; height:40px; border-radius:5px; margin-top:10px; display:none;">
            <div style="width:20%; height:100%; float:left;">
                <div style="width:28px; height:28px; margin:auto; background-image:url(assets/imgs/strings2.png); background-size:100% 100%; border-radius:100%; margin-top:5px;"></div>
            </div>
            <div style="width:60%; height:100%; float:left;">
                <p class="sub_h" style="padding:3px; margin:3px;">${data.name}</p>
            </div>
            <div style="width:20%; height:100%; float:right;">
                <p styl="text-align:center; margin:0px;">
                    <button id="${ids.viewId}" class="btn btn-default btn-xs view-srchdStrCon" style="border:solid 1px orange; border-radius:15px; margin-top:7.5px; color:darkorange; background-color:transparent;"><i>VIEW</i></button>
                </p>
            </div>
        </div>
        `
    };
    // for books
    const book = (data, usr, ids) => {
        return `
        <div id="${ids.conId}" class="srchdCon-2" style="width:100%; margin:auto; border-radius:5px; margin-top:10px; display:none;">
            <div style="width:97.5%; height:30px; margin:auto;" class="src_bottom">
                <p style="float:left; margin:0px; padding:5px; font-size:13.5px;" class="sub_h"><img src="assets/imgs/authand2.png" width="14px" height="14px" style="margin:3px;"> Book </p>
                <p style="float:right; margin:0px; padding:5px; font-size:13px;" class="sub_hs" id="${ids.name}">${usr.user_name}</p>
            </div>
            <div style="width:97.5%; margin:auto;" class="">
                <p style="margin:0px; padding:5px; font-size:16.5px;" class="headings">${data.title}</p>
            </div>
            <div style="width:97.5%; margin:auto; height:35px;">
                <img id="${ids.opnBtn}" src="assets/imgs/readen.png" width="18px" height="18px" style="float:left; margin:5px;"> 
                <!-- button class="btn btn-xs btn-default sub_hs pre_srcBt" style="background-color:transparent; float:left; border-radius:15px; margin:5px; margin-left:10px;"> 
                    preview  
                    <img id="${ids.prevBtn}" src="assets/imgs/bookinf.png" width="13px" height="13px" style="float:left; margin:3px;"> 
                </button-->

            </div>
        </div>
        `
    }
    // jrnl
    const journal = (data, usr, ids) => {
        return `
        <div id="${ids.conId}" class="srchdCon-2" style="width:100%; margin:auto; border-radius:5px; margin-top:10px; display:none;">
            <div style="width:97.5%; height:30px; margin:auto;" class="src_bottom">
                <p style="float:left; margin:0px; padding:5px; font-size:13.5px;" class="sub_h"><img id="${ids.autIcn}" src="assets/imgs/authand2.png" width="14px" height="14px" style="margin:3px; display:none;"> Journal </p>
                <p style="float:right; margin:0px; padding:5px; font-size:13px;" class="sub_hs" id="${ids.name}"></p>
            </div>
            <div style="width:97.5%; margin:auto;" class="">
                <p style="margin:0px; padding:5px; font-size:16.5px;" class="headings">${data.heading}</p>
            </div>
            <div style="width:97.5%; margin:auto; height:35px;">
                <img id="${ids.opnBtn}" src="assets/imgs/readen.png" width="18px" height="18px" style="float:left; margin:5px;"> 
            </div>
        </div>
        `
    }

    // chat-up friend
    const chatUp = (exdata, chatUp) => {
        var mainUser = udata;
        if (mainUser._id == exdata) {
            $(`#${chatUp}`).css('display', 'none');
        }

        $(`#${chatUp}`).click(()=>{
            var getBoth = () => {
                checkInfo(udata, exdata);
            };
            var checkInfo = (mainUser, exdata) => {
                var allChats = db.chatbox;
                var already = (chat) => {
                    global.chat.alrdNote = 'Yes';
                    global.chat.alrdId = chat._id;
                    setTimeout(() => {
                        $('#clseSrchPg').click();
                        setTimeout(() => {
                            $('#opnCht').click();
                        }, 500);
                    }, 500);
                };
                var doesnt = (mainUser, exdata) => {
                    var pData = {
                        section: 'chat',
                        type: 'add_chat',
                        chat: {mainUser: mainUser, exdata: exdata},
                    };
                    postData(pData);
                    setTimeout(() => {
                        $('#clseSrchPg').click();
                        setTimeout(() => {
                            $('#opnCht').click();
                        }, 500);
                    }, 500);
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

     const idExFunc = (data, userIdEx) => {

        $(`#${userIdEx}`).click(()=>{
            $('.ex-slider').remove();
            if (data == udata._id) {
                setTimeout(() => {
                    $('#clseSrchPg').click();
                    setTimeout(() => {
                        $('#opnPrf').click();
                    }, 500);
                }, 500);
            }else {
                $('.ex-slider').remove();
                global.ex_user = data;
                global.ex_flag = 'y';
            }
        })

    };


    // create ids
    const createId = (data) => {
        return {
            goToUPrf: 'goToUPrf_' + data._id,
            // user prof abv
            conId: 'conId_' + data._id,
            chatUpSrc: 'chatUpSrchr_' + data._id,
            verIcon: 'verIcon_srch_' + data._id,
        }
    };
    // display function
    const displayUsers = (data) => {
        const ids = createId(data);
        $('#drpUsrSrchd').append(srchUser(data, ids));
        Dark();
        checkMode(data, ids.conId);
        idExFunc(data._id, ids.goToUPrf);
        chatUp(data._id, ids.chatUpSrc);
        if (data.verification == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 0.1);
        var countDownDate = targetDate.getTime();
            var y = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
                        // check duration to currentime
            if (distance < 0) {
                $(`#${ids.conId}`).fadeIn();
                clearInterval(y);
            }
        }, 1000);
    };

    const viewStr = (data, viewId) => {
        $(`#${viewId}`).click(()=>{
            global.src_str.accssAtt = 'Yes'; global.src_str.attCh = data._id;
        });
    };
    // create ids
    const createStrIds = (data) => {
        return {
            conId: 'conId_' + data._id,
            viewId: 'viewId_' + data._id
        }
    };
    // display func
    const displayStr = (data) => {
        const ids = createStrIds(data);
        $('#drpStrSrchd').prepend(srchStr(data, ids));
        Dark();
        checkMode(data, ids.conId);
        viewStr(data, ids.viewId);
        var targetDate = new Date();
        targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
        var countDownDate = targetDate.getTime();
            var y = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
                        // check duration to currentime
            if (distance < 0) {
                $(`#${ids.conId}`).fadeIn();
                clearInterval(y);
            }
        }, 1000);
    };

    // CHECK AND EXTRACT USER DATA
    const revBody = (ind) => { 
        return `
            <div class="container-fluid" id="review-con" style="display:none;">

                <div class="row">
                    <div id="" class="col-xs-12 ex-slider-noti" style="display:none; position:fixed; z-index:${ind}; height:98%; border-bottom-left-radius:25px; border-bottom-right-radius:25px;">
                        <div class="row" style="height:100%;">

                            <div class="col-xs-12 slidebod" style="height:92.5%; overflow-y:auto;">
                                <div class="row" style="height:100%;">

                                    <div class="col-xs-12 revTopper" style="height:7.5%;">
                                        <p id="revPresNote" class="sub_h" style="margin:0px; text-align:center; padding:5px;"></p>
                                    </div>
                                    <div class="col-xs-12" style="height:90%; overflow-y:auto;">
                                        <br>
                                            <span id="droprev-lktg"></span>
                                        <br>
                                    </div>

                                </div>
                            </div>
            
                            <!-- bottom/close area -->
                            <div id="clsRevCon" class="col-xs-12 clsStrCon" style="height:7.5%; border-top:solid 1px #f0f0f0;">
                                <p style="text-align:center; margin:0px;">
                                    <img id="clsRevBtn" src="assets/imgs/up.png" width="35px" height="22.5px" style="display:none; opacity:0.7;">
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            
            </div>
    `};
    var loadin = () => {
        return `
        <div class="col-xs-12 b4_exP" style="position:fixed; z-index:4; background-color:#1a1a1a; opacity:0.4; height:100%;"></div>
        `
    };
    // display close and header p
    const dispSetsClose = () => {

        $(`#clsRevBtn`).click(()=>{
            global.pop_no--;
            //alert('works!');
            $('.ex-slider-noti').slideUp(100);
            setTimeout(() => {
                $('#review-con, .b4_exP').remove();
            }, 500);
        });

        var targetDate = new Date();
        targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                var h1 = $(`#clsRevCon`).css('height');
                var sc = $(`#clsRevBtn`).css('height');
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
                $(`#clsRevBtn`).css('margin-top', `${m1}px`);
                $(`#clsRevBtn`).css('display', `inline`);
                clearInterval(x);
            }
        }, 1000);

    };
    
    const bookFuncs = (data, usr, stat, ids) => {
        // open jrn
        $(`#${ids.opnBtn}`).click(()=>{
            global.pop_no++;
            var ind = global.pop_no;
            $('#drp-rev-hr').append(loadin());
            $('#drp-rev-hr').before(revBody(ind));
            $('#review-con').css('display', 'block');
            checkGlobMode();
            setTimeout(() => {
                $('.ex-slider-noti').slideDown(200);
                global.rev_allw = 'yes'; global.rev_hang = data._id; global.rev_type = 'src_book';
                dispSetsClose();
            }, 500);
        })
    };
    
    const createBIds = (id) => {
        return {
            conId: `conId_book_${id}`,
            name: `name_book_${id}`,
            opnBtn: `opnBtn_book_${id}`,
            prevBtn: `prevBtn_book_${id}`
        }
    }
    // display book
    const srcBook = (data, usr, stat) => {
        const ids = createBIds(data._id);
        $('#drpJBsSrchd').prepend(book(data, usr, ids));
        Dark();
        checkMode(data, ids.conId);
        bookFuncs(data, usr, stat, ids);
        if (stat == 'none') {
            $(`#${ids.opnBtn}`).remove();
        }
        setTimeout(() => {
            $(`#${ids.conId}`).fadeIn();
        }, 1);
    }

    const jInfo = (data, usr, stat, ids) => {
        if (data.content_type == 'author_journal') {
            $(`#${ids.name}`).text(usr.user_name);
            $(`#${ids.autIcn}`).fadeIn();
            if (stat == 'none') {
                $(`#${ids.opnBtn}`).remove();
            }else {
                $(`#${ids.autIcn}`).fadeIn();
            }
        }
        if (data.content_type == 'admin_aut_journal' || data.content_type == 'journal') {
            if (data.content_type == 'admin_aut_journal') {
                $(`#${ids.autIcn}`).fadeIn();
                $(`#${ids.name}`).text('admin');
            } else {
                $(`#${ids.name}`).text(usr.user_name);
            }
        }
        // open jrn
        $(`#${ids.opnBtn}`).click(()=>{
            global.pop_no++;
            var ind = global.pop_no;
            $('#drp-rev-hr').append(loadin());
            $('#drp-rev-hr').before(revBody(ind));
            $('#review-con').css('display', 'block');
            checkGlobMode();
            setTimeout(() => {
                $('.ex-slider-noti').slideDown(200);
                global.rev_allw = 'yes'; global.rev_hang = data._id; global.rev_type = 'src_jrn';
                dispSetsClose();
            }, 500);
        })
    }
    const createJIds = (id) => {
        return {
            conId: `conId_book_${id}`,
            name: `name_book_${id}`,
            opnBtn: `opnBtn_book_${id}`,
            autIcn: `autIcn_book_${id}`,
        }
    }
    // journal
    const srcJrnl = (data, usr, stat) => {
        const ids = createJIds(data._id);
        $('#drpJBsSrchd').prepend(journal(data, usr, ids));
        Dark();
        checkMode(data, ids.conId);
        jInfo(data, usr, stat, ids);
        setTimeout(() => {
            $(`#${ids.conId}`).fadeIn();
        }, 1);
    }

}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                srch();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
