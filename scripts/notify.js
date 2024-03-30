import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function noti() {

    // post date application
    var date = new Date();
    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var secnds = date.getSeconds();
    if (month === 0) { month = 'January' }
    if (month === 1) { month = 'February' }
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
        refreshI();
    };
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
    extractU();
    
    // noti btn
    $('#opnNti').on('click', function(){
        $('#opnNti').css('border', 'solid 2px darkorange');
        $('#opnCht, #opnWrt, #opnHme, #opnPrf').css('border', 'none');
        $('#hmeHD, #chtHD, #prfHD, #opnLfn, #refrshr_con, #sbNav, #mainSrchCon, #allCartNewsFlowBod, #prfBody, #chatsFlowBod').css('display', 'none');
        $('#ntiHD, #notiBod').fadeIn(50);
        $('.notiCont').remove();
        window.scrollTo(0, 0);
        setTimeout(() => {
            var child = 'noties'; $('#flowLoader3N').fadeIn();
            childP(child);
            reInstt()
            Dark();
            getNoti();
        }, 100);
    });
    console.log('extrracted for noti');

    const checkNoti = () => {
        var len = 0;
        var now = udata;
        if (app.userSess !== '') {
            len = now.new_notis.length;
            if (now.new_notis.length > 0) {
                $('#notiLen').fadeIn();
                $('#notiLen').text(now.new_notis.length);
                $('#notiIcn').attr('src', 'assets/imgs/noti.png');
            }
            setTimeout(() => {
                checkNoti();
            }, 1000);
        }
    };
    checkNoti();

    // get notifications
    const getNoti = () => {
            
        var data = udata;
        var mainUser = udata;
        /*if (data.new_notis.length > 0) {
            $('#recNewNotCon').css('display', 'block');
            for (let i = 0; i < data.new_notis.length; i++) {
                var frame = 'new';
                    var test = 0+i;
                    displayNoti(data.new_notis[i], test, frame, mainUser);
                    cleanNot(data.new_notis[i].user);
                }
        }else {
            $('#recNewNotCon').fadeOut();
        }*/
        if (data.new_notis.length > 0) {
            $('#recNewNotCon').css('display', 'block');
        }else {
            $('#recNewNotCon').fadeOut();
        }
        if (data) {
            $('.notiCont').remove();
            assignDb();
            var data2 = db.users;
            // for all notifications
            setTimeout(() => {
                if (data.notifications.length > 0) {
                    var len = 0;
                    cleanNot(data.notifications, data.new_notis, data.new_notis.length);
                    for (let i = data.notifications.length-1; i >= 0; i--) {
                        len++;
                        if (len < 16) {
                            var fnd = '';
                            for (let z = 0; z < data.new_notis.length; z++) {
                                if (!data.notifications[i].sub_to) {
                                    if (data.notifications[i].user == data.new_notis[z].user && data.notifications[i].noti_type == data.new_notis[z].noti_type && data.notifications[i].date[0, 1, 2, 3, 4, 5] == data.new_notis[z].date[0, 1, 2, 3, 4, 5]) {
                                        
                                        fnd = 'f';
                                        var frame = 'new';
                                        var test = 0+i; var usrI = data.notifications[i].user;
                                        $('#noNotiCon').css('display', 'none');
                                        displayNoti(data.notifications[i], usrI, test, frame, mainUser, data2, i);
                                    }
                                }else {
                                    if (data.notifications[i].sub_to == data.new_notis[z].sub_to && data.notifications[i].noti_type == data.new_notis[z].noti_type && data.notifications[i].date[0, 1, 2, 3, 4, 5] == data.new_notis[z].date[0, 1, 2, 3, 4, 5]) {
                                        fnd = 'f';
                                        var frame = 'new';
                                        var test = 0+i; var usrI = data.notifications[i].user;
                                        $('#noNotiCon').css('display', 'none');
                                        displayNoti(data.notifications[i], usrI, test, frame, mainUser, data2, i);
                                    }
                                }
                            }
                            if (fnd == '') {
                                var frame = 'old';
                                var test = 0+i; var usrI = '';
                                $('#noNotiCon').css('display', 'none');
                                if (data.notifications[i].noti_type == 'sub') {
                                    var usrI = data.notifications[i].sub_to;
                                }else {
                                    var usrI = data.notifications[i].user;
                                }
                                displayNoti(data.notifications[i], usrI, test, frame, mainUser, data2, i);
                            }
                        }
                    }
                }
            }, 2000);
        }
        $('#flowLoader3N').slideUp(100);
        //$('#flowLoader6').slideUp(100);
    };

    
    // CHECK TERMS AND SER
    const termsChk = () => {
        if (udata.terms == 'unsigned') {
            $('#notiIcn').attr('src', 'assets/imgs/noti.png');
            $('#comNewNoti').fadeIn();
        }else {
            $('#notiIcn').attr('src', 'assets/imgs/notis.png');
            $('#comNewNoti').css('display', 'none');
        }
    };
    termsChk();

    // include loader
    const Loader = () => {
        return `
            <div id="flowLoader10" style="display:none;">
                <img src="assets/imgs/load.png" width="45px" height="45px">
            </div>
        `
    };
    $('#recNewNotCon').before(Loader());
    // clean recent timer
    const cleanNot = (passed, newNoti, len) => {
        if (len > 0) {
            var targetDate = new Date();
            targetDate.setSeconds(targetDate.getSeconds() + 15);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    cleaUp();
                    clearInterval(x);
                }
            }, 1000);
        }
        const cleaUp = () => {
            for (let y = 0; y < passed.length; y++) {
                for (let p = 0; p < newNoti.length; p++) {
                    if (passed[y].user == newNoti[p].user && passed[y].noti_type == newNoti[p].noti_type && passed[y].date[0, 1, 2, 3, 4, 5] == newNoti[p].date[0, 1, 2, 3, 4, 5]) {
                        remNewNot(newNoti[p]);
                    }
                }
                
            }
            setTimeout(() => {
                assignDb();
                extractU();
                getNoti();
                termsChk();
            }, 2000);
        };
        const remNewNot = (noti) => {
            var pData = {
                section: 'noti',
                type: 'rem_new',
                noti: noti,
                id: udata._id
            };
            postData(pData);
        }
    };

    const checkMode = () => {
        // light or dark effects
        if (udata.mode == 'light') {
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
        } else {
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
    };

    const NewFriend = (data, user, ids, udt) => { 
        var path = ''; var clas = '';
        if (udt.profile_pic == 'none') {
            path = 'assets/imgs/profb.png';
        }else {
            path = `https://test-vyral.onrender.com/${udt.profile_pic.path}`;
            clas =  `${udt.profile_pic.class}`;
        }    
        return `
        <div id="${ids.conId}" class="notiCont" style="width:100%; height:70px; margin:auto; border-radius:5px; margin-bottom:10px; display:none;">
            <div style="width:20%; height:100%; float:left;">
                <p style="margin:2px; margin-top:15px; text-align:center;">
                    <button id="${ids.followId}" class="btn btn-default btn-xs" style="border:solid 1px darkorange; background-color:transparent; border-radius:5px; color:orange; display:none; font-size:13px;">follow</button>
                    <button id="${ids.acceptId}" class="btn btn-default btn-xs" style="border:solid 1px darkorange; background-color:transparent; border-radius:5px; color:orange; display:none; font-size:13px;">accept</button>
                    <button id="${ids.unFollowId}" class="btn btn-default btn-xs" style="border:solid 1px darkorange; border-radius:5px; color:white; background-color:darkorange; display:none; font-size:13px;">unfollow</button>
                    <img id="${ids.likedId}" class="opnRevw" src="assets/imgs/liked.png" style="width:25px; height:25px; display:none; cursor:pointer;">
                    <img id="${ids.comntId}" class="opnRevw" src="assets/imgs/commentd.png" style="width:25px; height:25px; display:none; cursor:pointer;">
                    <img id="${ids.shrdId}" class="opnRevw" src="assets/imgs/tagd.png" style="width:25px; height:25px; display:none; cursor:pointer;">
                    <img id="${ids.strTId}" class="opnRevw" src="assets/imgs/str.png" style="width:25px; height:25px; display:none; cursor:pointer;">
                    <img id="${ids.tagdId}" class="opnRevw" src="assets/imgs/frnds.png" style="width:30px; height:25px; display:none; cursor:pointer;">
                    <img id="${ids.payIcn}" class="opnRevw" src="assets/imgs/naira.png" style="width:25px; height:25px; display:none; cursor:pointer;">
                    <img id="${ids.subIcn}" class="opnRevw" src="assets/imgs/subs.png" style="width:30px; height:25px; display:none; cursor:pointer;">
                </p>
            </div>
            <div style="width:60%; height:100%; float:left;">
                <div style="height:35%; width:100%;" cass="notiUNholder">
                    <br>
                    <p class="sub_h" style="text-align:center; margin:1.5px; margin-top:-20px; font-size:10px;" id="${ids.userIdEx}"> <img class="${clas}" src="${path}" alt="" height="15px" width="15px" style="border-radius:100%;"> ${user} </p>
                </div>
                <div style="height:65%; width:100%;">
                    <p id="${ids.notiNote}" class="sub_h" style="text-align:center; margin:0px; padding:2px; font-size:12.5px;"></p>
                </div>
            </div>
            <div style="width:20%; height:100%; float:right;">
                <i class="sub_h" style="text-align:center; margin:0px; padding:2px; font-size:10px;" id="${ids.dateFlow}"></i>
            </div>
        </div>
        `
    };

    //---------
    // BUTTONS
    //---------
    // var req dif
    // check notification type
    const checkNoTyp = (data, mainUser, subIcn, payIcn, followId, unFollowId, likedId, comntId, shrdId, tagdId, strTId, notiNote, acceptId, reqD, reqB) => {
        reqD = 'n'; reqB = 'n';
        // fetch frnds
        // assignDb();
        var flwn = db.users.find(i => i._id==udata._id);
        if (data.noti_type == 'follow') {
            var track = 'none';
            $(`#${notiNote}`).text('Started following you');
            if (flwn.following.length > 0) {
                for (let i = 0; i < flwn.following.length; i++) {
                    if (data.user == flwn.following[i].user) {
                        track = 'some';
                        $(`#${followId}`).css('display', 'none');
                        $(`#${unFollowId}`).css('display', 'inline');
                        $(`#${likedId}`).css('display', 'none');
                        $(`#${comntId}`).css('display', 'none');
                        $(`#${shrdId}`).css('display', 'none');
                        $(`#${tagdId}`).css('display', 'none');
                        $(`#${strTId}`).css('display', 'none');
                        $(`#${acceptId}`).css('display', 'none');
                    }
                }
            }
            if (track == 'none') {
                $(`#${followId}`).css('display', 'inline');
                $(`#${unFollowId}`).css('display', 'none');
                $(`#${likedId}`).css('display', 'none');
                $(`#${comntId}`).css('display', 'none');
                $(`#${shrdId}`).css('display', 'none');
                $(`#${tagdId}`).css('display', 'none');
                $(`#${strTId}`).css('display', 'none');
                $(`#${acceptId}`).css('display', 'none');
            }
            var usrs = db.users;
            for (let i = 0; i < usrs.length; i++) {
                if (data.user == usrs[i]._id && usrs[i].publicity == 'private' ) {
                    reqD = 'y';
                    for (let z = 0; z < usrs[i].waiting_list.length; z++) {
                        if (usrs[i].waiting_list[z].user == mainUser._id) {
                            reqB = 'y';
                            $(`#${followId}`).text('requested');
                            $(`#${followId}`).css('background-color', 'darkorange');
                            $(`#${followId}`).css('color', 'white');
                        }
                    }
                }
            }
        }
        if (data.noti_type == 'frnd_rq') {
            var ch = '';
            for (let i = 0; i < mainUser.waiting_list.length; i++) {
                if (mainUser.waiting_list[i].user == data.user) {
                    ch = 'y';
                    $(`#${acceptId}`).css('display', 'inline');
                    $(`#${followId}, #${unFollowId}`).css('display', 'none');
                }
            }
            if (ch == '') {
                for (let x = 0; x < mainUser.followers.length; x++) {
                    if (mainUser.followers[x].user == data.user) {
                        $(`#${followId}`).css('display', 'inline');
                        $(`#${acceptId}, #${unFollowId}`).css('display', 'none');
                    }                                
                }
                for (let p = 0; p < mainUser.following.length; p++) {
                    if (mainUser.following[p].user == data.user) {
                        $(`#${unFollowId}`).css('display', 'inline');
                        $(`#${acceptId}, #${followId}`).css('display', 'none');
                    }   
                }
            }
            $(`#${notiNote}`).text('Requested to be your friend');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'like_post') {
            $(`#${notiNote}`).text('Liked your post');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'inline');
            $(`#${comntId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'like_str') {
            $(`#${notiNote}`).text('Liked your thread');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'inline');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'comment_post') {
            $(`#${notiNote}`).text('Commented on your post');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'inline');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'comment_str') {
            $(`#${notiNote}`).text('Commented on your thread');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'inline');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'tag_post') {
            $(`#${notiNote}`).text('tagged you to a post');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'inline');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'tie_string') {
            $(`#${notiNote}`).text('tied you to a string');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'inline');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'shr_post') {
            $(`#${notiNote}`).text('shared you a post');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'inline');
            $(`#${strTId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'shr_str') {
            $(`#${notiNote}`).text('shared you a string');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'inline');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'shr_thr') {
            $(`#${notiNote}`).text('shared you a thread');
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'inline');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            $(`#${subIcn}`).css('display', 'none');
        }
        if (data.noti_type == 'sub') { 
            $(`#${subIcn}`).css('display', 'none');
            $(`#${payIcn}`).css('display', 'none');
            if (data.sub_to) {
                $(`#${notiNote}`).html(`subscription payment successful <span style="font-weight:normal;">${data.amount}<span>`);
                $(`#${payIcn}`).css('display', 'inline');
            }
            if (data.user && data.type == 'paid') {
                $(`#${notiNote}`).html(`subscription payment recieved <span style="font-weight:normal;">${data.amount}<span>`);
                $(`#${payIcn}`).css('display', 'inline');
            }
            if (data.user && data.type == 'free') {
                $(`#${notiNote}`).html(`subscription payment recieved <span style="font-weight:normal;">${data.amount}<span>`);
                $(`#${subIcn}`).css('display', 'inline');
            }
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
        }
        if (data.noti_type == 'earn_rec') {
            $(`#${notiNote}`).css('font-size', '9px');
            $(`#${notiNote}`).html(`your earnings of ${data.month}, ${data.year} in the amount of NGN${data.amount} has been dispersed to your account!`);
            $(`#${payIcn}`).css('display', 'inline');
            // none
            $(`#${followId}`).css('display', 'none');
            $(`#${unFollowId}`).css('display', 'none');
            $(`#${likedId}`).css('display', 'none');
            $(`#${comntId}`).css('display', 'none');
            $(`#${shrdId}`).css('display', 'none');
            $(`#${tagdId}`).css('display', 'none');
            $(`#${strTId}`).css('display', 'none');
            $(`#${acceptId}`).css('display', 'none');
        }
    };

    // follow back
    const FollowUn = (data, mainUser, followId, unFollowId, reqD, reqB) => {
        //let folbtn = $(`#${followId}`);
        var nreqB = 'n'; var nreqD = 'n';
        var usrs = db.users;
        for (let i = 0; i < usrs.length; i++) {
            if (data.user == usrs[i]._id && usrs[i].publicity == 'private' ) {
                nreqD = 'y';
                for (let z = 0; z < usrs[i].waiting_list.length; z++) {
                    if (usrs[i].waiting_list[z].user == mainUser._id) {
                        nreqB = 'y';
                        $(`#${followId}`).text('requested');
                        $(`#${followId}`).css('background-color', 'darkorange');
                        $(`#${followId}`).css('color', 'white');
                    }
                }
            }
        }
        $(`#${followId}`).click(()=>{
            $(`#${followId}`).fadeOut();
            var pData = {
                section: 'noti',
                type: 'action_btns',
                sub: 'follow',
                repDV: nreqD, 
                reqBV: nreqB,
                user: data.user,
                udata: udata,
                followId: followId,
                unFollowId: unFollowId,
            };
            postData(pData);
            checkNotR();
        });

        $(`#${unFollowId}`).click(()=>{
            $(`#${unFollowId}`).fadeOut();
            var pData = {
                section: 'noti',
                type: 'action_btns',
                sub: 'unfollow',
                repDV: nreqD, 
                reqBV: nreqB,
                user: data.user,
                udata: udata,
                followId: followId,
                unFollowId: unFollowId,
            };
            postData(pData);
            checkNotR();
            
        });

    };

    // accept follower
    const Accpt = (data, mainUser, acceptId) => {
        let accbtn = $(`#${acceptId}`);
        accbtn.click(function() {
            $(`#${acceptId}`).fadeOut();
            var pData = {
                section: 'noti',
                type: 'rem_wait',
                me: udata._id, 
                user: data.user
            };
            postData(pData);
            checkNotR();
        });
    };

    const checkNotR = () => {
        setTimeout(() => {
            if (global.noti_r == 'y') {
                assignDb();
                setTimeout(() => {
                    extractU();
                    $('#opnNti').click();
                    global.noti_r = 'n';
                }, 100);
            } else {
                checkNotR();
            }
        }, 1);
    }

    // CHECK AND EXTRACT USER DATA
    const revBody = () => { 
        return `
            <div class="container-fluid" id="review-con" style="display:none;">

                <div class="row">
                    <div id="" class="col-xs-12 ex-slider-noti" style="display:none; position:fixed; z-index:7; height:98%; border-bottom-left-radius:25px; border-bottom-right-radius:25px;">
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
    // smart reviewers 
    const reviewNoti = (data, mainUser, likedId, comntId, tagdId, shrdId, strTId) => {
        const revOpn = () => {
            $('#drp-rev-hr').append(loadin());
            checkMode()
            $('#drp-rev-hr').before(revBody());
            setTimeout(() => {
                $('#review-con').css('display', 'block');
                $('.ex-slider-noti').slideDown(100);
                setTimeout(() => {
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
                }, 1000);
            }, 500);
            dispSetsClose();
            checkMode();
        }
        // for liked post
        $(`#${likedId}`).click(()=>{
            revOpn();
            global.rev_allw = 'yes'; global.rev_hang = data.post; global.rev_type = data.noti_type;
        });
        // for commntd
        $(`#${comntId}`).click(()=>{
            revOpn();
            global.rev_allw = 'yes'; global.rev_hang = data.post; global.rev_type = data.noti_type; global.rev_coms = data;
        });
        // for tagged post
        $(`#${tagdId}`).click(()=>{
            revOpn();
            global.rev_allw = 'yes'; global.rev_hang = data.post; global.rev_type = data.noti_type;
        });
        // shared jrnl
        $(`#${shrdId}`).click(()=>{
            revOpn();
            global.rev_allw = 'yes'; global.rev_hang = data.post; global.rev_type = data.noti_type;
        });
        // FOR STR AND THR
        // tied to str
        $(`#${strTId}`).click(()=>{
            revOpn();
            global.rev_allw = 'yes'; global.rev_hang = data.post; global.rev_type = data.noti_type;
        });
        // terminate rev

    };

    const idExFunc = (data, udata, userIdEx) => {
        
        $(`#${userIdEx}`).click(()=>{
            if (data == udata._id) {
                $('#opnPrf').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = data.user;
                global.ex_flag = 'y';
            }
        });

    };

    // display close and header p
    const dispSetsClose = () => {

        $(`#clsRevBtn`).click(()=>{
            //alert('works!');
            $('.ex-slider-noti').slideUp(100);
            var targetDate2 = new Date();
            targetDate2.setMilliseconds(targetDate2.getSeconds() + 1);
            var countDownDate2 = targetDate2.getTime();
            var y = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate2 - now;
                if (distance < 0) {
                    $('#review-con, .b4_exP').remove();
                    clearInterval(y);
                }
            }, 1000);
        });

    };

    // SmartDate Func
    const smartDate = (data, dateFlow) => {

        if (data.date[0] !== year) {
            $(`#${dateFlow}`).html(`${data.date[2]} ${data.date[1]}, ${data.date[0]}`);
        }
        if (data.date[0] == year && data.date[2] == month && data.date[1] == day) {
            $(`#${dateFlow}`).html(`<strong style="font-size:10px; margin:0px;">Today.</strong> ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] == month && day - data.date[1] == 1) {
            $(`#${dateFlow}`).html(`<strong style="font-size:10px; margin:0px;">Yesterday.</strong> ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] == month && day - data.date[1] !== 1 && data.date[1] !== day) {
            $(`#${dateFlow}`).html(`${data.date[2]} ${data.date[1]}, ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] !== month) {
            $(`#${dateFlow}`).html(`${data.date[2]} ${data.date[1]}, ${data.date[3]}:${data.date[4]}`);
        }

    }; 

    // create ids for actions
    const createIds = (data, usrI, test, i) => {
        var usrN = usrI;
        return {
            conId: 'conId_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // note
            notiNote: 'notiNote_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // follow/un-follow funcs
            followId: 'follow_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            unFollowId: 'unFollow_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // likd post
            likedId: 'likedId_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // comment post
            comntId: 'comntId_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // shared
            shrdId: 'shrdId_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // tagd post
            tagdId: 'tagdId_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // str tied
            strTId: 'strTId_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // accept user opt
            acceptId: 'accpt_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // go to user
            userIdEx: 'userIdEx_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // smart date
            dateFlow: 'date_noti_' + `${usrN}_${data.user}_${data.noti_type}_${i}`,
            // transaction success
            payIcn: 'payIcn_noti_' + `${usrN}_${data.noti_type}_${i}`,
            // subs
            subIcn: 'subIcn_noti_' + `${usrN}_${data.noti_type}_${i}`,

        }
    };

    // pass in data/ids, differentiate and display
    const displayNoti = (data, usrI, test, frame, mainUser, data2, i) => {
        let ids = createIds(data, usrI, test, i);
        var user = ''; var udt = '';
        for (let i = 0; i < data2.length; i++) {
            if (!data.sub_to) {
                if (data2[i]._id == data.user) {
                    user = data2[i].user_name;
                    udt = data2[i];
                };                
            }else {
                if (data2[i]._id == data.sub_to) {
                    user = data2[i].user_name;
                    udt = data2[i];
                };
            }            
        }
        checkMode();
        if (data.noti_type == 'earn_rec') {
            if (frame == 'new') {
                $('#dropnoti-rec').append(NewFriend(data, mainUser.user_name, ids, mainUser));
            }
            if (frame == 'old') {
                $('#drp_noties').append(NewFriend(data, mainUser.user_name, ids, mainUser));
            }
        }else {
            if (frame == 'new') {
                $('#dropnoti-rec').append(NewFriend(data, user, ids, udt));
            }
            if (frame == 'old') {
                $('#drp_noties').append(NewFriend(data, user, ids, udt));
            }
        }
        Dark(); var reqD = 'n'; var reqB = 'n';
        checkNoTyp(data, mainUser, ids.subIcn, ids.payIcn, ids.followId, ids.unFollowId, ids.likedId, ids.comntId, ids.shrdId, ids.tagdId, ids.strTId, ids.notiNote, ids.acceptId, reqD, reqB);
        FollowUn(data, mainUser, ids.followId, ids.unFollowId, reqD, reqB);
        Accpt(data, mainUser, ids.acceptId);
        reviewNoti(data, mainUser, ids.likedId, ids.comntId, ids.tagdId, ids.shrdId, ids.strTId);
        // id ex
        idExFunc(data, mainUser, ids.userIdEx);
        smartDate(data, ids.dateFlow);
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
        checkMode();
    };
    
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                noti();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
