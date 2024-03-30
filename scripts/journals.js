import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
import { showO, all_scr, slector } from "./dataSelector.js";
function journals() {
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
        /*var thouTen = 10000;
        var thouTenOne = 10100;
        var hunThou = 100000;
        var hunThouOne = 100100;
        var mil = 1000000;
        var milOne = 1100000;
        var milTen = 10000000;
        var milTenOne = 10100000;
        var hunMil = 100000000;
        var hunMilTenOne = 100100000;
        var bil = 1000000000;
        var bilOne = 1100000000;
        var bilTen = 10000000000;
        var bilTenOne = 10100000000;
        var hunBil = 100000000000;
        var hunBilTenOne = 100100000000;*/
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
       refreshI();
    };
    // refresh
    const refreshI = () => {
        setTimeout(() => {
            extractU();
        }, 1);
    }
    extractU(); 
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
            $('.posterClosecon_edt').css('border-bottom', 'solid 1px #f0f0f0');
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
    var testChk = 0; var testPrf = 0;

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

    $('#opnHme').click(()=>{
        $('.stylePosts').remove();
        $('#home_con').css('display', 'block');
        $('#opnHme').css('border', 'solid 2px darkorange');
        $('#hmeBtnImg').attr('src', 'assets/imgs/home.png');
        $('#opnCht, #opnWrt, #opnNti, #opnPrf').css('border', 'none');
        $('#chtHD, #ntiHD, #prfHD, #prfBody, #chatsFlowBod, #notiBod, #forSrchMain').css('display', 'none');
        $('#hmeHD, #opnLfn, #refrshr_con, #sbNav, #allCartNewsFlowBod, #mainFLwCon').fadeIn(50);
        window.scrollTo(0, 0);
        setTimeout(() => {
            $('#flwMainJrn').click();
            var child = 'home';
            childP(child);
            reInstt()
            Dark();
            var tg = 'hme';
            //startChkin();
            setTimeout(() => {
                profType(tg);
            }, 100);
        }, 100);
        //get them posts
        /*if (testChk == 0) {
            profType(tg);
        }*/
    });

    // flow deiff main pg
    $('#flwMainJrn').click(()=>{
        $('#flwMainJrnImg').attr('src', 'assets/imgs/read.png');
        $('#flwMainStrImg').attr('src', 'assets/imgs/strings2.png');
        $('#refrshr_con').removeClass('refreshRD');
        $('#refrshr_con').addClass('refreshRU');
        window.scrollTo(0, 0);
        if (global.cate == 'explore') {
            $('#strBodCon-ex, #rfrshMainStr').css('display', 'none');
            $('#redBodCon-ex, #opnLfn, #rfrshMain').fadeIn();
        } else {
            $('#forStrMain, #rfrshMainStr').css('display', 'none');
            $('#forJrnMain, #opnLfn, #rfrshMain').fadeIn();
        }
    });

    // flow carties
    const checkFlow = () => {
        if (global.allow == 'y') {
            var cart = global.cate;
            checkCart(cart);
        }else {
            setTimeout(() => {
                checkFlow();
            }, 1);
        }
    };
    checkFlow();

    const checkCart = (cart) => {
        //alert(cart);
        if (cart == 'explore') {
            profType('hme');   
        }else {
            profType('hme');   
        }
        global.allow = 'n';
        checkFlow();
    }

    $('#opnJrnPrf').click(()=>{
        reInstt();
        $('#opnJrnPrf').attr('src', 'assets/imgs/read.png');
        $('#opnAutCnt').attr('src', 'assets/imgs/authand2.png');
        $('#opnStrPrf').attr('src', 'assets/imgs/strings2.png');
        $('#strPrfBd, #forPrfAut').css('display', 'none');
        $('#forJrnPrf').fadeIn();
        $('#seeFlow').click();
    });

    // prof read btn
    $('#opnAutCnt').click(()=>{
        $('#opnAutCnt').attr('src', 'assets/imgs/authand.png');
        $('#opnJrnPrf').attr('src', 'assets/imgs/readen.png');
        $('#opnStrPrf').attr('src', 'assets/imgs/strings2.png');
        $('#strPrfBd, #forJrnPrf').css('display', 'none');
        $('#forPrfAut').fadeIn();
        setTimeout(() => {
            if (app.child_p == 'profile') {
                var tg = 'prf';
                profType(tg);
                //clearInterval(x);
            }
        }, 100);
    });

    // for hide and see
    $('#seeFlow').click(function() {
        $('#seeFlow').css('border-bottom', 'solid 2px darkorange');
        $('#hidFlow').css('border-bottom', '');
        $('#seeBodCon').slideDown();
        $('#hidBodCon').slideUp();
        setTimeout(() => {
            if (app.child_p == 'profile') {
                var tg = 'prf';
                profType(tg);
                //clearInterval(x);
            }
        }, 100);
    });
    $('#hidFlow').click(function() {
        $('#hidFlow').css('border-bottom', 'solid 2px darkorange');
        $('#seeFlow').css('border-bottom', '');
        $('#hidBodCon').slideDown();
        $('#seeBodCon').slideUp();
        setTimeout(() => {
            if (app.child_p == 'profile') {
                var tg = 'prf';
                profType(tg);
                //clearInterval(x);
            }
        }, 100);
    });

    const getCart = (tg) => {
        if (app.child_p == 'home' || tg == 'prf') {
            $('.stylePosts').css('display', 'block');
        }else {
            $('.stylePosts').css('display', 'none');
            $(`.${app.child_p}`).css('display', 'block');
        }
    };

        // get existing posts
    var jrnCntr = 0; var lenAddr = 15; var jrnCntrPrf = 0; var lenCntrAut = 0; var lenAddrAut = 0; var lenAddrPrf = 10; var jrnArr = new Array();
    const getExisting = (tg, cart) => {
        reInstt();
        // $('#flowLoader1').slideDown();
        $('.stylePosts').remove();
        var chckr = 0;
        jrnCntr = 0; lenAddr = 15; jrnCntrPrf = 0; lenAddrPrf = 10; lenCntrAut = 0;  lenAddrAut = 10;
        jrnArr = [];
        global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-jrn-main';
        global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-jrn-prf';
        global.drp_ld = 'y';
        if (all_scr.jrn.length > 0) {
            if (cart == 'home' || cart == 'profile') {
                for (let k = 0; k < db.all_posts.length; k++) {
                    for (let i = 0; i < showO.jrn_h.length; i++) {
                        if (showO.jrn_h[i] == db.all_posts[k]._id) {
                            var tpeN = ''; var tdata = '';
                            if (db.all_posts[k].content_type !== 'admin_aut_journal') {
                                for (let z = 0; z < db.users.length; z++) {
                                    if (db.users[z]._id == db.all_posts[k].user) {
                                        tdata = db.users[z];
                                    }
                                }
                                if (db.all_posts[k].content_type == 'journal' && db.all_posts[k].user == app.userSess) {
                                    jrnArr[jrnArr.length] = {tag: tg, jrn: db.all_posts[k], pos: 'user', me: udata};
                                    // $('#noJsCon, #noJsConPrf').css('display', 'none');
                                    chckr++;
                                }
                                if (db.all_posts[k].content_type == 'journal' && db.all_posts[k].user !== app.userSess) {
                                    var blck = tdata.blocked_list.find(i=>i.user == udata._id);
                                    if (blck == undefined) {
                                        jrnArr[jrnArr.length] = {tag: tg, jrn: db.all_posts[k], pos: "ex-user", me: udata, you: tdata};
                                        chckr++;
                                    }
                                }
                                if (db.all_posts[k].content_type == 'usr_aut_book') {
                                    jrnArr[jrnArr.length] = {jrn: db.all_posts[k], pos: "usr_book", me: udata};
                                    getCart(tg);
                                    chckr++;
                                }
                                
                                if (db.all_posts[k].content_type == 'author_journal') {
                                    jrnArr[jrnArr.length] = {jrn: db.all_posts[k], pos: "usr_aut", me: udata};
                                    getCart(tg);
                                    chckr++;
                                }
                                //jrnArr[jrnArr.length] = {tag: tg, jrn: db.all_posts[k], pos: tpeN, me: udata};
                                checkMode();
                                //jrnArr[jrnArr.length] = {jrn: data[i], pos: "usr_aut", me: udata};
                            }else {
                                if (db.all_posts[k].content_type == 'admin_aut_journal') {
                                    jrnArr[jrnArr.length] = {jrn: db.all_posts[k], pos: "aut", me: udata};
                                    getCart(tg);
                                    chckr++;
                                }
                            }
                        }
                    }
                }
            }else {
                for (let k = 0; k < db.all_posts.length; k++) {
                    for (let i = 0; i < showO.jrn_h.length; i++) {
                        if (showO.jrn_h[i] == db.all_posts[k]._id) {
                            if (db.all_posts[k].content_type == 'admin_aut_journal') {
                                for (let y = 0; y < db.all_posts[k].categories.length; y++) {
                                    if (db.all_posts[k].categories[y] == cart) {
                                        chckr++;
                                        jrnArr[jrnArr.length] = {jrn: db.all_posts[k], pos: "aut", me: udata};
                                        getCart(tg);
                                    }
                                }
                                // var catN = db.all_posts[k].categories.find(i => i == cart);
                                // if (catN !== undefined) {
                                // }
                            }else {
                                if (db.all_posts[k].content_type == 'usr_aut_book' || db.all_posts[k].content_type == 'author_journal') {
                                    var alldata = db.users;
                                    for (let b = 0; b < alldata.length; b++) {
                                        if (alldata[b]._id == db.all_posts[k].user && alldata[b].user_type /*alldata[b].user_type.status == 'on'*/) {
                                            for (let m = 0; m < alldata[b].user_type.categories.length; m++) {
                                                if (alldata[b].user_type.categories[m] == cart) {
                                                    var drp = 'n';
                                                    if (alldata[b].user_type.status == 'on') {
                                                        if (alldata[b].user_type.subscribers.length > 0) {
                                                            for (let n = 0; n < alldata[b].user_type.subscribers.length; n++) {
                                                                if (alldata[b].user_type.subscribers[n].user == udata._id) {
                                                                    var drp = 'y';
                                                                }
                                                            }
                                                        }
                                                        if (alldata[b]._id == udata._id) {
                                                            var drp = 'y';
                                                        }
                                                    }else {
                                                        drp = 'y';
                                                    }
                                                    if (drp == 'y') {
                                                        if (db.all_posts[k].content_type == 'usr_aut_book') {
                                                            chckr++;
                                                            jrnArr[jrnArr.length] = {jrn: db.all_posts[k], pos: "usr_book", me: udata};
                                                            getCart(tg);
                                                        } 
                                                        if (db.all_posts[k].content_type == 'author_journal') {
                                                            chckr++;
                                                            jrnArr[jrnArr.length] = {jrn: db.all_posts[k], pos: "usr_aut", me: udata};
                                                            getCart(tg);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                checkMode();
            }
            if (chckr == 0) {
                $('#noJsCon').fadeIn();
            }
            // $('#flowLoader1').slideUp();
        }else {
            $('#noJsCon').css('display', 'block');
            // $('#flowLoader1').slideUp();
        }
        // $('#flowLoader1').slideUp();
        jrnCntr = 0;
        global.drp_ld_stt = 'off'; global.page_ld_stt = 'off';
        applyPosts(tg);
            
    }
    const applyPosts = (tg) => {
        $('.ldmreBtn').remove();
        lenAddr = jrnArr.length;
        /*if (jrnArr.length < lenAddr) {
            lenAddr = jrnArr.length;
        }*/
        if (tg == 'hme') {
                for (let i = 0; i < lenAddr; i++) {
                    if (jrnCntr < i+1) {
                        if (jrnArr.length > i || jrnArr.length == i) {
                            if (jrnArr[i].pos == 'user') {
                                jrnCntr++;
                                displayPosts(jrnArr[i].jrn, jrnArr[i].me, jrnArr[i].tag);
                                checkMode();
                            }
                            if (jrnArr[i].pos == 'ex-user') {
                                jrnCntr++;
                                displayPFrnds(jrnArr[i].jrn, jrnArr[i].you, jrnArr[i].me, jrnArr[i].tag);
                                checkMode();
                            }
                            if (jrnArr[i].pos == 'aut' || jrnArr[i].pos == 'usr_aut') {
                                jrnCntr++;
                                var dT = "general";
                                displayAuthors(jrnArr[i].jrn, jrnArr[i].me, dT);
                                checkMode(); 
                            }
                            if (jrnArr[i].pos == 'usr_book') {
                                jrnCntr++;
                                var dT = "general";
                                dropBBook(jrnArr[i].jrn, jrnArr[i].me, dT);
                                checkMode();
                            }
                            $('#noJsCon').slideUp();
                        }
                    }
                }
            
                if (jrnArr.length > lenAddr) {
                    $('.ldmreBtn').remove();
                    $('#dropbox-jrn-main').after(`<div class="ldmreBtn" id="ldMrJrns-mnp" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -10px black; border-radius:10px;">
                        <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                    </div>`);
                    $('#ldMrJrns-mnp').click(()=>{
                        lenAddr = lenAddr+lenAddr;
                        applyPosts(tg);
                    });
                }else {
                    $('.ldmreBtn').remove();
                }
        }
        if (tg == 'prf') {
            // journals
            var cPs = 0;
            for (let p = 0; p < jrnArr.length; p++) {
                if (jrnArr[p].pos == 'user') {
                    cPs++;
                }
            }
            if (cPs > 0) {
                $('#noJsCon, #noJsConPrf').css('display', 'none');
            }
            var myArr = new Array();
            for (let p = 0; p < jrnArr.length; p++) {
                if (jrnArr[p].pos == 'user') {
                    myArr[myArr.length] = jrnArr[p];
                }
            }
            if (myArr.length < lenAddrPrf) {
                lenAddrPrf = myArr.length;
            }
            for (let o = 0; o < lenAddrPrf; o++) {
                if (jrnCntrPrf < o+1) {
                    jrnCntrPrf++;
                    checkMode();
                    displayPosts(myArr[o].jrn, myArr[o].me, myArr[o].tag);
                }
            }
            if (myArr.length > lenAddrPrf) {
                $('.ldmreBtn_prf').remove();
                $('#dropbox-jrn-prf').after(`<div class="ldmreBtn_prf" id="ldMrJrns-mnp_prf" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                    <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                </div>`);
                $('#ldMrJrns-mnp_prf').click(()=>{
                    lenAddrPrf = lenAddrPrf+lenAddrPrf;
                    applyPosts(tg);
                });
            }else {
                $('.ldmreBtn_prf').remove();
            }
            // author contents
            var myAuts = new Array();
            for (let p = 0; p < jrnArr.length; p++) {
                if (jrnArr[p].pos == 'usr_book' || jrnArr[p].pos == 'usr_aut') {
                    myAuts[myAuts.length] = jrnArr[p];
                }
            }
            if (myAuts.length < lenAddrAut) {
                lenAddrAut = myAuts.length;
            }
            for (let o = 0; o < lenAddrAut; o++) {
                if (lenCntrAut < o+1) {
                    if (myAuts[o].pos == "usr_book" && myAuts[o].jrn.user == udata._id) {
                        lenCntrAut++;
                        checkMode(); var dT = "me_aut";
                        dropBBook(myAuts[o].jrn, myAuts[o].me, dT);
                        $('#noAutCnPrf').css('display', 'none');
                    }
                    if (myAuts[o].pos == 'usr_aut' && myAuts[o].jrn.user == udata._id) {
                        lenCntrAut++;
                        checkMode(); var dT = "me_aut";
                        displayAuthors(myAuts[o].jrn, myAuts[o].me, dT);
                        $('#noAutCnPrf').css('display', 'none');
                    }
                }
            }
            if (myAuts.length > lenAddrAut) {
                $('.ldmreBtn_aut').remove();
                $('#dropbox-aut-prf').after(`<div class="ldmreBtn_aut" id="ldMrJrns-mnp_aut" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                    <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
                </div>`);
                $('#mnp_aut-mnp_prf').click(()=>{
                    lenAddrAut = lenAddrAut+lenAddrAut;
                    applyPosts(tg);
                });
            }else {
                $('.ldmreBtn_aut').remove();
            }
        }
        getLocale(udata);
        checkMode();
    };
    // get Exuser func
    const startCart = () => {
        var inf = global.ex_jrn.flag;
        var inf2 = global.ex_autJ.flag;
        if (inf == 'y' || inf2 == 'y') {
            //getExisting();
        }else {
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    startCart();
                    clearInterval(x);
                }
            }, 1000);
            //});
        }
    };
    //startCart();

    // get locales
    const getLocale = (udata) => {
        
        var lcle = app.locale;
        var lcl = db.generalCol[0];
        var cont = ''; var count = '';
        if (lcl) {
            for (let i = 0; i < lcl.locales.length; i++) {
                for (let p = 0; p < lcl.locales[i].Countries.length; p++) {
                    if (lcl.locales[i].Countries[p] == udata.country) {
                        cont  = lcl.locales[i].Continent; count = lcl.locales[i].Countries[p];
                    }
                }
            }
        }
        if (lcle) {
            $('.stylePosts').css('display', 'block');
            if (lcle == 'cont') {
                $('.stylePosts').css('display', 'none');
                $(`.${cont}, .${count}`).fadeIn();
            }
            if (lcle == 'count') {
                $('.stylePosts').css('display', 'none');
                $(`.${count}`).fadeIn();
            }
        }
    };

    // action btns
    $('#goToHome').on("click", function(){
        $('#clsLft').click();
        $('#goToHome').css('color', 'darkorange');
        $('#goToHomeImg').attr('src', 'assets/imgs/home.png');
        $('#goToExplr, #goToTstr, #goToShelf').css('color', 'silver');
        $('#goToExpImg').attr('src', 'assets/imgs/exp2.png');
        $('#goToTstrImg').attr('src', 'assets/imgs/strings2.png');
        $('#goToTopsImg').attr('src', 'assets/imgs/shop2.png');
        // bodies
        $('#explBody, #forStrMain, #topsBody, #trstrBody').css('display', 'none');
        $('#forJrnMain, #sbNav').fadeIn();
        global.cate = 'home';
        global.page_ld = 'y';
        window.scrollTo(0, 0);
        setTimeout(() => {
            subCarts()
            setTimeout(() => {
                // $('#rfrshMain').click();
                profType('hme');   
                window.scrollTo(0, 0);
            }, 1500);
        }, 10);
    });
    $('#goToExplr').on("click", function(){
        $('#flwMainJrn, #clsLft').click();
        $('#goToExplr').css('color', 'darkorange');
        $('#goToExpImg').attr('src', 'assets/imgs/exp.png');
        $('#goToHome, #goToTstr, #goToShelf').css('color', 'silver');
        $('#goToHomeImg').attr('src', 'assets/imgs/home3.png');
        $('#goToTstrImg').attr('src', 'assets/imgs/strings2.png');
        $('#goToTopsImg').attr('src', 'assets/imgs/shop2.png');
        // bodies
        $('#forJrnMain, #forStrMain, #topsBody, #trstrBody').css('display', 'none');
        $('#explBody, #sbNav').fadeIn();
        global.cate = 'explore';
        global.page_ld = 'y';
        window.scrollTo(0, 0);
        setTimeout(() => {
            subCarts()
            setTimeout(() => {
                // $('#rfrshMain').click();
                profType('hme');   
                window.scrollTo(0, 0);
            }, 1500);
        }, 10);
    });

    // sub carts
    const subCarts = () => {
        $('.main_navs_btns').attr("style", "background-color:transparent; color:grey; border-style:solid; font-size:16.5px; border-width:1px; border-color:silver; border-radius:15px; margin:5px;");
    };
    
    const profType = (tg) => {
        var cate = 'home';
        if (tg == 'all' || tg == 'hme') {
            cate = app.child_p;
            testChk = 0;
            testPrf = 0;
        }else {
            if (tg == 'prf') {
                cate = app.child_p;
                //alert('profile');
                testPrf = 1;
            }else {
                cate = global.cate;
                testChk = 1;
            }
        }
        if (global.cate == 'home' || global.cate == 'explore') {
            $('#home_cat_title_con').fadeOut();
        } else {
            $('#home_cat_title').text(global.cate);
            $('#home_cat_title_con').fadeIn();
        }
        // $('#flowLoader1').fadeIn();
        //console.log('child_p: '+app.child_p);
        //assignDb(); 
        slector();
        if (global.cate == 'explore') {
            // global.page_ld_stt = 'off';
            getExplore(udata, db.users);
        } else {
            setTimeout(() => {
                getExisting(tg, global.cate);
            }, 1);
        }
    };
    setTimeout(() => {
        if (app.userSess !== '') {
            $('#opnHme').click();
        }
    }, 1);

    // refresh add/remove class
    $('#rfrshMain').click(()=>{
        // admn log alrt session
        if (global.cate == 'explore') {
            var tg = 'exp';
            refreshTime(tg);
        } else {
            var tg = 'hme';
            refreshTime(tg);
        }
    });
    const refreshTime = (tg) => {
        $('#rfrshMain').addClass('rfrshMain');
        var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                $('#rfrshMain').removeClass('rfrshMain');
                if (tg == 'exp') {
                    var alldata = db.users;
                    getExplore(udata, alldata);
                } else {
                    getExisting(tg, global.cate);
                }
                clearInterval(x);
            }
        }, 1000);
    };

      /**
       * EXSPLORE
       */
    var rtrF = 'o';
    $('#rte_btn_exp').click(()=>{
        if (rtrF == 'o') {
            $('#exp_ratin_con').slideUp();
            $('#rte_btn_img').attr('src', 'assets/imgs/dwn.png');
            rtrF = 'c'
        } else {
            $('#exp_ratin_con').slideDown();
            $('#rte_btn_img').attr('src', 'assets/imgs/up.png');
            rtrF = 'o';
            var alldata = db.users;
            slector();
            setTimeout(() => {
                getExplore(udata, alldata);
            }, 10);
        }
    }); 
    const getExplore = (udata, alldata) => {
        $('.stylePosts, .side_bkLsts').remove();
        // global.drp_ld_loc[global.drp_ld_loc.length] = 'dropbox-indexexp';
        // global.drp_ld = 'y';
        // authors
        var autconL = 0; $('.rated_aut_r_rd').remove(); var autLen = 0;

        
        
        if (showO.aut_asc.length > 2) {
            autLen = 2;
        }else {
            autLen = showO.aut_asc.length;
        }
        for (let m = 0; m < autLen; m++) {
            for (let i = 0; i < alldata.length; i++) {
                if (showO.aut_asc[m].author._id == alldata[i]._id) {
                    var drpF = 'n';
                    if (alldata[i].user_type !== 'user') {
                        if (alldata[i].user_type.status !== 'off' && alldata[i].user_type.price !== 'none') {
                            var me = alldata[i].user_type.subscribers.find(x => x.user == udata._id);
                            if (me !== undefined) {
                                drpF = 'y';
                            }else {
                                drpF = 'y';
                            }
                        }else {
                            if (alldata[i].user_type.price == 'none') {
                                drpF = 'y';
                            }
                        }
                    }
                    if (alldata[i]._id == udata._id) {
                        drpF = 'y';
                    }
                    if (drpF !== 'n') {
                        var nw = 'aut_r_rd';
                        autconL = autconL+270;
                        $('#exrhAuLSlide').css('width', `${autconL}px`);
                        var drop = `dropMstRd_aut_${m+1}`;
                        dropAut(alldata[i], udata, nw, drop)
                        $(`#mstRdaut_con_${m+1}`).fadeIn("slow");
                        magicNumbers(`mstRdBk_len_${m+1}`, showO.aut_asc[m].points);
                    }
                }
            }
        }
        
        var data = db.all_posts;
        var passCon = new Array();
        // get oBooks
        var bkconL = 0; $('.dsidebook_rated').remove();
        for (let i = 0; i < data.length; i++) {
            if (showO.books_r.book_rd.length > 0) {
                if (data[i].content_type == 'usr_aut_book' && data[i]._id == showO.books_r.book_rd[0].content._id) {
                    for (let u = 0; u < alldata.length; u++) {
                        if (data[i].user == alldata[u]._id) {
                            var drpF = 'n';
                            if (alldata[u].user_type !== 'user') {
                                if (alldata[u].user_type.status !== 'off' && alldata[u].user_type.price !== 'none') {
                                    var me = alldata[u].user_type.subscribers.find(x => x.user == udata._id);
                                    if (me !== undefined) {
                                        drpF = 'y';
                                    }
                                }else {
                                    if (alldata[u].user_type.price == 'none') {
                                        drpF = 'y';
                                    }
                                }
                            }
                            if (alldata[u]._id == udata._id) {
                                drpF = 'y';
                            }
                            if (drpF !== 'n') {
                                var nw = 'rtd_rd';
                                bkconL = bkconL+300;
                                $('#exrhBLSlide').css('width', `${bkconL}px`);
                                dropFBks(data[i], i, alldata[u], udata, nw);
                                $('#mstRdBk_con').fadeIn("slow");
                                magicNumbers('mstRdBk_len', showO.books_r.book_rd[0].points);
                            }
                        }                            
                    }
                }
            }
            if (showO.books_r.book_r_asc.length > 0) {
                if (data[i].content_type == 'usr_aut_book' && data[i]._id == showO.books_r.book_r_asc[0].content._id) {
                    for (let u = 0; u < alldata.length; u++) {
                        if (data[i].user == alldata[u]._id) {
                            var drpF = 'n';
                            if (alldata[u].user_type !== 'user') {
                                if (alldata[u].user_type.status !== 'off' && alldata[u].user_type.price !== 'none') {
                                    var me = alldata[u].user_type.subscribers.find(x => x.user == udata._id);
                                    if (me !== undefined) {
                                        drpF = 'y';
                                    }
                                }else {
                                    if (alldata[u].user_type.price == 'none') {
                                        drpF = 'y';
                                    }
                                }
                            }
                            if (alldata[u]._id == udata._id) {
                                drpF = 'y';
                            }
                            if (drpF !== 'n') {
                                var nw = 'rtd_asc';
                                bkconL = bkconL+300;
                                $('#exrhBLSlide').css('width', `${bkconL}px`);
                                dropFBks(data[i], i, alldata[u], udata, nw);
                                $('#mstAscBk_con').fadeIn("slow");
                                magicNumbers('mstAscBk_len', showO.books_r.book_r_asc[0].points);
                            }
                        }          
                        //dropBBook                  
                    }
                }
            }
            if (showO.books_r.book_r_lkd.length > 0) {
                if (data[i].content_type == 'usr_aut_book' && data[i]._id == showO.books_r.book_r_lkd[0].content._id) {
                    for (let u = 0; u < alldata.length; u++) {
                        if (data[i].user == alldata[u]._id) {
                            var drpF = 'n';
                            if (alldata[u].user_type !== 'user') {
                                if (alldata[u].user_type.status !== 'off' && alldata[u].user_type.price !== 'none') {
                                    var me = alldata[u].user_type.subscribers.find(x => x.user == udata._id);
                                    if (me !== undefined) {
                                        drpF = 'y';
                                    }
                                }else {
                                    if (alldata[u].user_type.price == 'none') {
                                        drpF = 'y';
                                    }
                                }
                            }
                            if (alldata[u]._id == udata._id) {
                                drpF = 'y';
                            }
                            if (drpF !== 'n') {
                                var nw = 'rtd_lkd';
                                bkconL = bkconL+300;
                                $('#exrhBLSlide').css('width', `${bkconL}px`);
                                dropFBks(data[i], i, alldata[u], udata, nw);
                                $('#mstLkdBk_con').fadeIn("slow");
                                magicNumbers('mstLkdBk_len', showO.books_r.book_r_lkd[0].points);
                            }
                        }                            
                    }
                }
            }
        }
        // get most read jrns
        var rdJLen = 0;
        if (showO.jrn_r.jrn_r_rd.length > 3) {
            rdJLen = 2;
        } else {
            rdJLen = showO.jrn_r.jrn_r_rd.length;
        }
        for (let k = 0; k < rdJLen; k++) {
            for (let n = 0; n < data.length; n++) {
                if (data[n]._id == showO.jrn_r.jrn_r_rd[k].content._id) {
                    $('#exp_jrn_MRC').fadeIn();
                    if (data[n].content_type == 'journal' || data[n].content_type == 'author_journal' || data[n].content_type == 'usr_aut_book' || data[n].content_type == 'admin_aut_journal') {
                        passCon[passCon.length] = {content: data[n], sect: 'rdJ_rt'};
                    }
                }
            }
        }
        // get most asc jrns
        var ascJLen = 0;
        if (showO.jrn_r.jrn_r_asc.length > 3) {
            ascJLen = 2;
        } else {
            ascJLen = showO.jrn_r.jrn_r_asc.length;
        }
        for (let k = 0; k < ascJLen; k++) {
            for (let n = 0; n < data.length; n++) {
                if (data[n]._id == showO.jrn_r.jrn_r_asc[k].content._id) {
                    $('#exp_jrn_MAC').fadeIn();
                    if (data[n].content_type == 'journal' || data[n].content_type == 'author_journal' || data[n].content_type == 'usr_aut_book' || data[n].content_type == 'admin_aut_journal') {
                        passCon[passCon.length] = {content: data[n], sect: 'ascJ_rt'};
                    }
                }
            }
        }
        // get most liked jrns
        var lkdJLen = 0;
        if (showO.jrn_r.jrn_r_lkd.length > 3) {
            lkdJLen = 2;
        } else {
            lkdJLen = showO.jrn_r.jrn_r_lkd.length;
        }
        for (let k = 0; k < lkdJLen; k++) {
            for (let n = 0; n < data.length; n++) {
                if (data[n]._id == showO.jrn_r.jrn_r_lkd[k].content._id) {
                    $('#exp_jrn_MLC').fadeIn();
                    if (data[n].content_type == 'journal' || data[n].content_type == 'author_journal' || data[n].content_type == 'usr_aut_book' || data[n].content_type == 'admin_aut_journal') {
                        passCon[passCon.length] = {content: data[n], sect: 'lkJ_rt'};
                    }
                }
            }
        }
        // get most comment jrns
        var cmtJLen = 0;
        if (showO.jrn_r.jrn_r_cmt.length > 3) {
            cmtJLen = 2;
        } else {
            cmtJLen = showO.jrn_r.jrn_r_cmt.length;
        }
        for (let k = 0; k < cmtJLen; k++) {
            for (let n = 0; n < data.length; n++) {
                if (data[n]._id == showO.jrn_r.jrn_r_cmt[k].content._id) {
                    $('#exp_jrn_MCC').fadeIn();
                    if (data[n].content_type == 'journal' || data[n].content_type == 'author_journal' || data[n].content_type == 'usr_aut_book' || data[n].content_type == 'admin_aut_journal') {
                        passCon[passCon.length] = {content: data[n], sect: 'cmtJ_rt'};
                    }
                }
            }
        }
        /*var ascJLen = 0;
        if (showO.jrn_r.jrn_r_asc.length > 3) {
            ascJLen = 2;
        } else {
            ascJLen = showO.jrn_r.jrn_r_asc.length;
        }
        for (let k = 0; k < ascJLen; k++) {
            for (let n = 0; n < data.length; n++) {
                if (data[n]._id == showO.jrn_r.jrn_r_asc[k].content._id) {
                    for (let p = 0; p < alldata.length; p++) {
                        if (alldata[p]._id == data[n].user) {
                            if (data[n].content_type == 'journal' || data[n].content_type == 'author_journal' || data[n].content_type == 'usr_aut_book' || data[n].content_type == 'admin_aut_journal') {
                                var nTp = 'ascJ_rt'; var drop = "none";
                                displayPosts(data[n], udata, nTp, drop);
                                $('#exp_jrn_MAC').fadeIn();
                            }
                        }
                    }
                }
            }
        }*/
        // all contents
        var allLen = 0; var jrnls = new Array();
        for (let n = 0; n < db.all_posts.length; n++) {
            if (db.all_posts[n].content_type == 'journal' || db.all_posts[n].content_type == 'author_journal' || db.all_posts[n].content_type == 'usr_aut_book' || db.all_posts[n].content_type == 'admin_aut_journal') {
                jrnls[jrnls.length] = db.all_posts[n]
            }
        }
        if (jrnls.length > 30) {
            allLen = 30;
        } else {
            allLen = jrnls.length;
        }
        for (let i = 0; i < allLen; i++) {
            passCon[passCon.length] = {content: jrnls[i], sect: 'all_exp'};
        }
        // drop all books
        var dntP = 0;
        for (let m = 0; m < data.length; m++) {
            for (let i = 0; i < alldata.length; i++) {
                if (data[m].content_type == 'usr_aut_book' && data[m].user == alldata[i]._id) {
                    if (dntP < 26) {
                        var nw = 'gen';
                        dntP++;
                        //$('#exrhBLSlide').css('width', `${bkconL}px`);
                        var drpF = 'n';
                        if (alldata[i].user_type !== 'user') {
                            if (alldata[i].user_type.status !== 'off' && alldata[i].user_type.price !== 'none') {
                                var me = alldata[i].user_type.subscribers.find(x => x.user == udata._id);
                                if (me !== undefined) {
                                    drpF = 'y';
                                }
                            }else {
                                if (alldata[i].user_type.price == 'none') {
                                    drpF = 'y';
                                }
                            }
                        }
                        if (data[m].user == udata._id) {
                            drpF = 'y';
                        }
                        if (drpF !== 'n') {
                            dropFBks(data[m], m, alldata[i], udata, nw);
                        }
                    }
                }
            }
        }

        // check availability
        if (showO.aut_asc.length > 0) {
            $('#aut_Rcon').fadeIn();
        }else {
            $('#aut_Rcon').fadeOut();
        }
        if (showO.books_r.book_rd.length > 0) {
            $('#bks_Rcon').fadeIn();
        }else {
            $('#bks_Rcon').fadeOut();
        }
        var insJ = new Array(); insJ = [{tt: 'read', f: 'n'}, {tt: 'assc', f: 'n'}, {tt: 'liked', f: 'n'}, {tt: 'cmnt', f: 'n'}];
        for (let i = 0; i < insJ.length; i++) {
            if (insJ[i].tt == 'read') {
                var nw = passCon.find(i=>i.sect == 'rdJ_rt');
                if (nw !== undefined) {
                    $('#exp_jrn_MRC').fadeIn();
                }else {
                    $('#exp_jrn_MRC').fadeOut();
                }
            }
            if (insJ[i].tt == 'assc') {
                var nw = passCon.find(i=>i.sect == 'ascJ_rt');
                if (nw !== undefined) {
                    $('#exp_jrn_MAC').fadeIn();
                }else {
                    $('#exp_jrn_MAC').fadeOut();
                }
            }
            if (insJ[i].tt == 'liked') {
                var nw = passCon.find(i=>i.sect == 'lkJ_rt');
                if (nw !== undefined) {
                    $('#exp_jrn_MLC').fadeIn();
                }else {
                    $('#exp_jrn_MLC').fadeOut();
                }
            }
            if (insJ[i].tt == 'cmnt') {
                var nw = passCon.find(i=>i.sect == 'cmtJ_rt');
                if (nw !== undefined) {
                    $('#exp_jrn_MCC').fadeIn();
                }else {
                    $('#exp_jrn_MCC').fadeOut();
                }
            }
        }

        const rollUp = (pass) => {
            for (let l = 0; l < pass.length; l++) {
                var nowU = undefined;
                var drpF = 'n';
                if (pass[l].content.content_type == 'admin_aut_journal' && pass[l].sect !== 'all_exp') {
                    drpF = 'y';
                }else {
                    nowU = alldata.find(k => k._id == pass[l].content.user);
                    if (nowU !== undefined) {
                        if (nowU.user_type !== 'user') {
                            if (nowU.user_type.status !== 'off' && nowU.user_type.price !== 'none') {
                                var me = nowU.user_type.subscribers.find(x => x.user == udata._id);
                                if (me !== undefined) {
                                    drpF = 'y';
                                }
                            }else {
                                if (nowU.user_type.price == 'none') {
                                    drpF = 'y';
                                }
                            }
                        }else {
                            drpF = 'y'; 
                        }
                    }
                    if (nowU._id == udata._id) {
                        drpF = 'y';
                    }
                }
                if (drpF !== 'n' && pass[l].sect !== 'all_exp') {
                    if (pass[l].content.content_type == 'journal') {
                        var mnU = alldata.find(k => k._id == pass[l].content.user);
                        if (mnU  !== undefined) {
                            if (mnU._id == udata._id) {
                                displayPosts(pass[l].content, udata, pass[l].sect);
                            } else {
                                displayPosts(pass[l].content, mnU, pass[l].sect);
                            }
                        }
                        // displayPosts(pass[l].content, udata, pass[l].sect);
                    }
                    if (pass[l].content.content_type == 'author_journal' || pass[l].content.content_type == 'admin_aut_journal') {
                        displayAuthors(pass[l].content, udata, pass[l].sect);
                    }
                    if (pass[l].content.content_type == 'usr_aut_book') {
                        dropBBook(pass[l].content, udata, pass[l].sect);
                    }
                    // alert(pass[l].sect);
                }
            }
            checkMode(); getLocale(udata);
            global.page_ld_stt = 'off';
        }
        const rollAll = (jrnls) => {
            for (let p = 0; p < allLen; p++) {
                var nowU2 = undefined;
                var drpF2 = 'n';
                if (jrnls[p].content_type == 'admin_aut_journal') {
                    displayAuthors(jrnls[p], udata, 'all_exp');
                }else {
                    nowU2 = alldata.find(k => k._id == jrnls[p].user);
                    if (nowU2 !== undefined) {
                        if (jrnls[p].content_type == 'journal') {
                            if (nowU2.publicity == 'public') {
                                drpF2 = 'y';
                            }
                        }else {
                            if (nowU2.user_type !== 'user') {
                                if (nowU2.user_type.status !== 'off') {
                                    if (nowU2.user_type.price !== 'none') {
                                        var me = nowU2.user_type.subscribers.find(x => x.user == udata._id);
                                        if (me !== undefined) {
                                            drpF2 = 'y';
                                        }
                                    } else {
                                        drpF2 = 'y';
                                    }
                                }else {
                                    if (jrnls[p].content_type == 'journal') {
                                        drpF2 = 'y';
                                    }
                                }
                            }else {
                                if (nowU2.publicity == 'public') {
                                    drpF2 = 'y'; 
                                }else {
                                    var meF = nowU2.followers.find(i=>i.user == udata._id);
                                    if (meF !== undefined) {
                                        drpF2 = 'y'; 
                                    } else {
                                        drpF2 = 'n';  
                                    }
                                }
                            }
                        }
                    }
                    if (nowU2._id == udata._id) {
                        drpF2 = 'y';
                    }
                    if (drpF2 !== 'n') {
                        if (jrnls[p].content_type == 'journal') {
                            var mnU = alldata.find(k => k._id == jrnls[p].user);
                            if (mnU  !== undefined) {
                                if (mnU._id == udata._id) {
                                    displayPosts(jrnls[p], udata, 'all_exp');
                                } else {
                                    displayPosts(jrnls[p], mnU, 'all_exp');
                                }
                            }

                        }
                        if (jrnls[p].content_type == 'author_journal') {
                            displayAuthors(jrnls[p], udata, 'all_exp');
                        }
                        if (jrnls[p].content_type == 'usr_aut_book') {
                            dropBBook(jrnls[p], udata, 'all_exp');
                        }
                    }
                }
            }
        }
        global.page_ld_stt = 'off';
        rollAll(jrnls);
        rollUp(passCon); 
        $('.sm_loader').remove();
    }

      /**
       * EX-USER
       */
    // get Exuser func
    const startEx = () => {
        var inf = global.ex_jrn.flag;
        var inf2 = global.ex_autJ.flag;
        if (inf == 'y' || inf2 == 'y') {
            global.ex_jrn.flag = 'n';
            global.ex_autJ.flag = 'n';
            global.ex_book.flag = 'n';
            getExuserposts();
        }else {
            var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    startEx();
                    clearInterval(x);
                }
            }, 1000);
            //});
        }
    };
    startEx();
    var jrnCntrEx = 0; var lenAddrEx = 10; var jrnArrEx = new Array();
    const getExuserposts = () => {
        var data2 = '';
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i]._id == global.ex_jrn.id) {
                data2 = db.users[i];
            }            
        }
        var drop = global.ex_jrn.drop;
        var drop2 = global.ex_autJ.drop;
        global.drp_ld_loc[global.drp_ld_loc.length] = drop;
        global.drp_ld_loc[global.drp_ld_loc.length] = drop2;
        global.drp_ld = 'y';
        if (data2 !== '') {
            var data = db.all_posts;
            jrnCntrEx = 0; lenAddrEx = 10; jrnArrEx = [];
            if (data) {
                var has = 'none';
                for (let i = 0; i < data.length; i++) {
                    // for exUser node
                    if (data[i].content_type !== 'string' && data[i].content_type !== 'thread' && data[i].content_type !== 'author_journal' && data[i].content_type !== 'usr_aut_book') {
                        if (data2._id == data[i].user && data[i].hidden == 'No') {
                            var del = `adptCart__exUsr_${data[i]._id}`;
                            $(`#${del}`).remove();
                            has = 'is';
                            jrnArrEx[jrnArrEx.length] = {jrn: data[i], pos: "ex-user", me: udata, you: data2};
                            //checkMode();
                            //displayExuser(data[i], data2, udata, drop);
                        }
                    }
                    if (data[i].content_type == 'author_journal' && data2._id == data[i].user) {
                        var del = `adptCart_${data[i]._id}_ex_user`;
                        $(`#${del}`).remove();
                        jrnArrEx[jrnArrEx.length] = {jrn: data[i], pos: "ex-aut-jrn", me: udata, you: data2};
                    }
                    if (data[i].content_type == 'usr_aut_book' && data2._id == data[i].user) {
                        var del = `adptCart_bookB_${data[i]._id}_ex_usr_book`;
                        $(`#${del}`).remove();
                        jrnArrEx[jrnArrEx.length] = {jrn: data[i], pos: "ex-aut-bk", me: udata, you: data2};
                    }
                }
                $('#flowLoader').slideUp();
                
                
                startEx();
                dropExAPply(drop, drop2);
            }
        }
        global.drp_ld_stt = 'off';
            // displayPosts(data);
            //$('.stylePosts').remove();
    };
    const dropExAPply = (drop, drop2) => {
        // alert('extracted - display info: '+jrnArrEx.length);
        lenAddrEx = jrnArrEx.length;
        /*if (jrnArrEx.length < lenAddrEx) {
            lenAddrEx = jrnArrEx.length;
        }*/
        for (let i = 0; i < lenAddrEx; i++) {
            // alert('dropping!');
            if (jrnCntrEx < i+1) {
                if (jrnArrEx[i].pos == 'ex-user') {
                    jrnCntrEx++;
                    checkMode();
                    displayExuser(jrnArrEx[i].jrn, jrnArrEx[i].you, jrnArrEx[i].me, drop)
                }
                if (jrnArrEx[i].pos == 'ex-aut-jrn') {
                    jrnCntrEx++;
                    checkMode(); var dT = {type: 'ex_user', drop: drop2};
                    displayAuthors(jrnArrEx[i].jrn, jrnArrEx[i].me, dT)
                }
                if (jrnArrEx[i].pos == 'ex-aut-bk') {
                    jrnCntrEx++;
                    checkMode(); var dT = {type: 'ex_user', drop: drop2};
                    dropBBook(jrnArrEx[i].jrn, jrnArrEx[i].me, dT);
                }
            }
        }
    
        if (jrnArrEx.length > lenAddrEx) {
            $('.ldmreBtn_ex').remove();
            $(`#${drop}`).after(`<div class="ldmreBtn_ex" id="ldMrJrns-mnp_ex" style="margin:auto; margin-top:15px; width:100px; height:25px; box-shadow:0px 0px 30px -15px black; border-radius:10px;">
                <p style="text-align:center; margin:0px; padding:3.5px; color:orange;">load more</p>
            </div>`);
            $('#ldMrJrns-mnp_ex').click(()=>{
                lenAddrEx = lenAddrEx+lenAddrEx;
                dropExAPply(drop);
            });
        }else {
            $('.ldmreBtn_ex').remove();
        }
    };

    // book shelf
    const bookShlfEx = () => {
        if (global.ex_book.flag == 'y') {
            //assignDb(); 
            extractU();
            getExShelf();
        } else {
            setTimeout(() => {
                bookShlfEx();
            }, 1);
        }
    }
    bookShlfEx();
    const getExShelf = () => {
        var id = global.ex_book.id; var data = db.all_posts;
        var user = db.users.find(i=>i._id==id);
        global.ex_book.flag = 'n'; global.ex_book.id = '';
        if (user !== undefined) {
            var tpe = user.user_name;
            dropShelf(tpe);
            for (let n = 0; n < data.length; n++) {
                if (data[n].content_type == 'usr_aut_book') {
                    if (user._id == data[n].user && user.user_type.status == 'on') {
                        var nw = 'shlf';
                        dropFBks(data[n], n, user, udata, nw);
                        checkMode();
                        //getCart();
                        //alert(alldata[y]._id);
                    }
                }
            }
        }
        bookShlfEx();
    }

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
            bodyComId: 'bodyComId_noti_' + data._id,
            // comment body id
            delId: 'delComId_noti_' + data._id,
            comBodId: 'comBodId_noti_' + data._id,
            dateFlwCom: 'dateFlwCom_noti_' + data._id,
            verIconCom: 'comNmeVerIcn_Noti_' + data._id,
            usrNme: 'comUsrNmeGo_Noti_' + data._id
        }
    };
    // get specific jrn
    const getSpec = (data, udata, type) => {
        var spec = db.all_posts;
        if (spec) {
            var flag = '';
            for (let i = 0; i < spec.length; i++) {
                if (spec[i]._id == data) {
                    if (spec[i].content_type == 'journal' || spec[i]._id == data && spec[i].content_type == 'author_journal' || spec[i]._id == data && spec[i].content_type == 'admin_aut_journal') {
                        flag = 'white';
                        checkMode();
                        displayReviews(spec[i], udata, type);
                    }
                    if (spec[i].content_type == 'usr_aut_book') {
                        flag = 'white';
                        dropBBook(spec[i], udata, type);
                        checkMode();
                    }
                }
            }
            if (flag == '') {
                $('#container-one').fadeOut();
                // hidden or not
                $('#review-con').fadeIn();
                if (type == 'like_post') {
                    $('#revPresNote').text('post liked');
                    $('#drp-like-tag-rev-bod').fadeIn();
                }
                if (type == 'tag_post') {
                    $('#revPresNote').text('shared you a post');
                    $('#drp-like-tag-rev-bod').fadeIn();
                }
                if (type == 'shr_post') {
                    $('#revPresNote').text('Tagged to a post');
                    $('#drp-like-tag-rev-bod').fadeIn();
                }
                if (type == 'comment_post') {
                    $('#revPresNote').text('commented on post');
                    $('#drp-like-tag-rev-bod').fadeIn();
                }
                if (type == 'src_jrn') {
                    $('#revPresNote').text('post');
                    $('#drp-like-tag-rev-bod').fadeIn();
                }
                $('#droprev-lktg').append(`
                    <h2 class="sub_h" style="text-align:center; margin:10px;">This post has been deleted or does not exist anymore!<h2>
                `);
                Dark();
            }

        }
    };
    const getSpecBk = (data, udata, type) => {
        var book = db.all_posts.find(i => i._id == data);
        dropBBook(book, udata, type);
    }
    // review from noti
    const getReview = (udata) => {
        var type = global.rev_type;
        if (type == 'like_post' || type == 'comment_post' || type == 'tag_post' || type == 'shr_post' || type == 'src_jrn') {
            //console.log('for journal');
            var data = global.rev_hang;
            getSpec(data, udata, type);
        }
        if (type == 'src_book') {
            //console.log('for journal');
            var data = global.rev_hang;
            getSpecBk(data, udata, type);
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
    const startProc = () => {
        checkRev(udata);
    };
    startProc();
    const termRev = (udata) => {
        //assignDb(); 
        setTimeout(() => {
            extractU();
            global.rev_allw = 'no';
            var term = global.rev_allw;
            if (term) {
                checkRev(udata);
            }
        }, 1);
    };

    /**
     * -------------
     * JRNL BODY AND FUNCS
     * -------------
     */
    // journ containing body&image
    const bodyJourn = (data, pData, ids) => {
        var path = ''; var loc = ''; var clas = '';
        if (pData.profile_pic == 'none') {
            path = 'assets/imgs/profb.png';
        }else {
            path = `https://test-vyral.onrender.com/${pData.profile_pic.path}`;
            clas = `${pData.profile_pic.class}`;
        }
        if (data.type == 'Author') {
            loc = data.location;
        }else {
            loc = pData.country;
        }
        return `
        <div class="stylePosts" style="width:100%;" id="${ids.adptCart}">
            <div style="width:100%; height:30px; display:none;" class="${ids.autSrcs} ${loc}">
                <div style="float:left; width:18px; height:18px; margin:auto; background-image:url(assets/imgs/authand.png); background-size:100% 100%; margin:5px;"></div>
                <p class="postDatefrst" style="float:left; font-size:14px; margin:0px; padding:4px;"> 
                    <span id="${ids.autInfo}"></span>
                </p>
                <img src="assets/imgs/opt.png" id="${ids.openPopId}" alt="" width="5px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                <i class="postDatefrst" style="float:right; margin:5px; color:silver; font-size:10px;" id="${ids.dateFlowAut}"></i>
            </div>
            <div style="width:100%; height:30px; display:none;" class="${ids.usrAut}">
                <div class="${clas}" style="float:left; width:20px; height:20px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin:3px; margin-top:6px;"></div>
                <p style="float:left; margin:0px; padding:3px; color:skyblue;"> 
                    <span id="${ids.userIdEx}" class="postDatefrst">${pData.user_name} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="15px" height="15px" style="margin-top:-5px; display:none;"></span>
                </p>
                <img src="assets/imgs/opt.png" id="${ids.openPopId}" alt="" width="5px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                <i class="postDatefrst" style="float:right; margin:5px; color:silver; font-size:10px;" id="${ids.dateFlow}"></i>
            </div>
            <div class="edtPstBd" id="${ids.popBodId}" style="width:100%; display:none;">
                <div class="edtPstFlw" style="width:100%; height:35px;">
                    <p style="text-align:center; margin:0px; padding:5px;"><img id="${ids.clsePopId}" src="assets/imgs/up.png" width="25px" height="15px" style="cursor:pointer;"></p>
                </div>
                <!-- delp cons -->
                <div id="${ids.delPMCId}" class="edtPstFlw" style="width:100%; height:35px;">
                    <p id="${ids.delPostId}" style="margin:5px; color:orangered; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/del.png" width="12.5px" height="15px" style="margin-right:10px;"> Delete post</p>
                </div>
                <div id="${ids.delPConId}" class="areYSPCon" style="width:100%; height:60px; display:none;">
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p class="postHeaderfrst" style="text-align:center; margin:0px; padding:5px;"> Are you sure you want to delete post?</p>
                    </div>
                    <div style="width:100%; height:30px;">
                        <div class="yesesP" style="width:49%; float:left; height:100%; float:left;">
                            <p id="${ids.yesDelPId}" style="text-align:center; color:orangered; margin:5px; cursor:pointer;">Yes</p>
                        </div>
                        <div style="width:49%; float:left; height:100%; float:right;">
                            <p class="postHeaderfrst" id="${ids.noDelPId}" style="text-align:center; margin:5px; cursor:pointer;">Cancel</p>
                        </div>
                    </div>
                </div>
                <!-- edt cons -->
                <div id="${ids.edtPost}" class="edtPstFlw" style="width:100%; height:35px;">
                    <p class="postHeaderfrst" style="margin:8px; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/wada.png" width="12.5px" height="15px" style="margin-right:10px;"> Edit post</p>
                </div>
                <!-- hide cons -->
                <div id="${ids.hidPMCId}" class="edtPstFlw" style="width:100%; height:35px;">
                    <p id="${ids.hidPostId}" class="postHeaderfrst" style="margin:8px; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/hide.png" width="15px" height="15px" style="margin-right:10px;"> <span id="${ids.tryHid}"></span> post</p>
                </div>
                <div id="${ids.hidPConId}" class="areYSPCon" style="width:100%; height:60px; display:none;">
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p class="postHeaderfrst" style="text-align:center; margin:0px; padding:5px;"> Are you sure you want to <span id="${ids.askHid}"></span>?</p>
                    </div>
                    <div style="width:100%; height:30px;">
                        <div class="yesesP" style="width:49%; float:left; height:100%; float:left;">
                            <p id="${ids.yesHidPId}" style="text-align:center; color:orangered; margin:5px; cursor:pointer;">Yes</p>
                        </div>
                        <div style="width:49%; float:left; height:100%; float:right;">
                            <p class="postHeaderfrst" id="${ids.noHidPId}" style="text-align:center; margin:5px; cursor:pointer;">Cancel</p>
                        </div>
                    </div>
                </div>
                <!-- prom cons 
                <div id="${ids.promId}" class="" style="width:100%; height:35px;">
                    <p style="margin:8px; color:skyblue; cursor:pointer; font-size:16.5px;">Promote</p>
                </div> -->
                <!-- report cons -->
                <div id="${ids.reprtId}" class="" style="width:100%; height:35px;">
                    <p class="postHeaderfrst" style="margin:8px; cursor:pointer; font-size:16.5px;"> <img src="assets/imgs/flag.png" width="15px" height="15px" style="margin-right:10px;"> Report post</p>
                </div>
                <div id="${ids.repConId}" class="areYSPCon" style="width:100%; display:none;">
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.inApRep}"> Inappropriate content </p>
                    </div>
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.abusRep}"> Abusive content </p>
                    </div>
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p class="postHeaderfrst" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.clsRep}"> cancel </p>
                    </div>
                </div>
            </div>
            <!-- binary section -->
            <video id="${ids.vidId}" style="width:100%; display:none;" poster="assets/imgs/emptback.png"></video>
            <div id="${ids.vidCntrlDiv}" class="postInfoCon" style="height:30px; width:100%; display:none;">
                <img id="${ids.vidPlay}" src="assets/imgs/playn.png" width="17.5px" height="17.5px" style="margin:5px; float:left; cursor:pointer;">
                <img id="${ids.vidPause}" src="assets/imgs/pausen.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;">
                <!-- <img id="${ids.vidStop}" src="assets/imgs/stopy.png" width="17.5px" height="17.5px" style="margin:5px; float:left; margin-left:20px; cursor:pointer;"> -->
                <img id="${ids.vidMute}" src="assets/imgs/muten.png" width="15px" height="15px" style="margin:7.5px; float:right; cursor:pointer;">
                <p style="float:right; margin:5px; font-size:13px;" class="sub_h"> <span id="${ids.vidCrntT}" style="font-size:12.5px; color:orange;"></span>/<span id="${ids.vidOrgT}" style="font-size:10px;" class="sub_h"></span> </p>    
            </div>
            <!-- video done -->
            <img id="${ids.ImgId}" src="assets/imgs/emptimg.png" loading="lazy" width="100%" height="100%" style="display:none;">
            <div class="postInfoCon" id="${ids.imSldId}" style="width:100%; height:45px; display:none;">
                <div style="width:30%; height:100%; float:left;">
                    <img id="${ids.leftId}" src="assets/imgs/backa.png" width="15px" height="35px" style="margin:5px; cursor:pointer; float:left;">
                </div>
                <div style="width:40%; height:100%; float:left;">
                    <p style="text-align:center; margin:10px; color:darkorange;"> <span id="${ids.imgNow}"></span> <i class="sub_h" style="font-size:13px;">/ <span id="${ids.imgAll}"></span></i> </p>
                </div>
                <div style="width:30%; height:100%; float:right;">
                    <img id="${ids.rightId}" src="assets/imgs/backb.png" width="15px" height="35px" style="margin:5px; cursor:pointer; float:right;">
                </div>
            </div>
            <!-- img done -->
            <p class="postHeaderfrst" style="padding:5px; margin:5px; font-size:17px; font-weight:normal; white-space: pre-wrap;" id="">${data.heading}</p>
            <div style="width:100%; height:35px;">
                <div style="float:left; margin:5px;">
                    <div style="width:20px; height:20px;">
                        <img id="${ids.likeId}" src="assets/imgs/like.png" alt="" width="100%" height="100%" style="cursor:pointer;"> 
                    </div>
                </div>
                <i id="${ids.likedBy}" style="font-size:11px; color:darkorange; margin:5px; float:left;">${data.likedBy.length}</i> 
                <div style="float:left; margin:5px;">
                    <div style="width:20px; height:20px;">
                        <img id="${ids.openCom}" src="assets/imgs/comment.png" alt="" width="100%" height="100%" style="cursor:pointer;"> 
                    </div>
                </div>
                <i id="${ids.comntLen}" style="font-size:11px; color:darkorange; margin:5px; float:left;">${data.comments.length}</i> 
                <img id="${ids.readId}" src="assets/imgs/readen.png" alt="" width="20px" height="20px" style="margin:5px; float:left; cursor:pointer; display:none;">
                <i id="${ids.readBy}" style="font-size:11px; color:darkorange; margin:5px; float:left; display:none;">${data.reads.length}</i> 
                <img id="${ids.shrPst}" src="assets/imgs/share.png" alt="" width="20px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                <img id="${ids.tagedId}" src="assets/imgs/frnds.png" alt="" width="20px" height="15px" style="margin:5px; float:right; cursor:pointer; display:none;">
            </div>
            <!-- post body area bellow -->
            <div class="postBodyCon" id="${ids.bodyId}" style="width:98%; margin:auto; height:200px; border-radius:5px; padding-bottom:5px; display:none;">
                <div style="width:100%; height:170px; overflow-y:auto;">
                    <p class="postBodtxt" style="margin:5px; font-size:16.5px; font-weight:normal; white-space: pre-wrap;">${data.body}</p>
                </div>
                <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                    <p id="${ids.closeRdId}" style="margin:2px; text-align:center; cursor:pointer;">
                        <img src="assets/imgs/up.png" width="20px" height="10px">
                    </p>
                </div>
            </div>
            <!-- comment area bellow -->
            <div class="postBodyCon" id="${ids.comBod}" style="width:98%; margin:auto; height:300px; border-radius:5px; padding-bottom:5px; display:none;">
                <div style="width:100%; height:200px; overflow-y:auto;">
                    <br>
                    <span id="${ids.comFlow}" class="comFlow"></span>
                    <br>
                </div>
                <div class="commentIn" style="height:50px;">
                    <textarea class="commentInput" placeholder="comment" style="margin:5px; width:70%; float:left; border-radius:5px; color:darkorange;" id="${ids.comIn}"></textarea>
                    <img src="assets/imgs/send.png" width="35px" height="35px" style="float:left; margin:5px;" id="${ids.comBt}">
                </div>
                <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                    <p id="${ids.closeCom}" style="margin:0px; text-align:center; cursor:pointer;">
                        <img src="assets/imgs/up.png" width="20px" height="10px">
                    </p>
                </div>
            </div>
            <!-- frnds taged -->
            <div class="postBodyCon" id="${ids.tagedBod}" style="width:98%; margin:auto; height:200px; border-radius:5px; padding-bottom:5px; display:none;">
                <div style="width:100%; height:170px; overflow-y:auto;">
                    <span id="${ids.tagedFlw}"></span>
                </div>
                <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                    <p id="${ids.closeTag}" style="margin:2px; text-align:center; cursor:pointer;">
                        <img src="assets/imgs/up.png" width="20px" height="10px">
                    </p>
                </div>
            </div>
            <!-- share content area -->
            <div class="postBodyCon" id="${ids.shrPstBd}" style="width:98%; margin:auto; height:240px; border-radius:5px; padding-bottom:5px; display:none;">
                <div class="srchCon" style="width:100%; height:30px; overflow-y:auto;">
                    <p id="" style="margin:3.5px; text-align:center; cursor:pointer;">
                        <input id="${ids.shrPstSrch}" placeholder="search friends" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; width:80%; height:80%; margin:0.5px; border:none; border-radius:7.5px;" class="srchCon_tg sub_h">
                        <img src="assets/imgs/searcha.png" width="15px" height="15px" style="float:right; margin:2.5px;">
                    </p>
                </div>
                <div style="width:100%; height:175px; overflow-y:auto; overflow-x: hidden;">
                    <span id="${ids.shrPstFlw}"></span>
                </div>
                <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                    <p id="${ids.shrPstCls}" style="margin:3.5px; text-align:center; cursor:pointer;">
                        <img src="assets/imgs/up.png" width="20px" height="10px">
                    </p>
                </div>
            </div>
            <!-- author cont area -->
            <!-- author cont area -->
            <div style="width:100%; display:none;" class="${ids.autSrcs}">
                <p style="padding:3px; margin:0px; font-size:12px; color:silver;" id=""><span id="${ids.autCats}"></span> <strong>-</strong> <i style="font-size:10px;" id="${ids.autLoc}"></i> </p>
                <div style="width:98%; margin:auto; height:200px; background-color:#f9f9f9; border-radius:5px; padding-bottom:5px; border:solid 1px #f0f0f0; display:none;" id=""></div>
                <div style="height:20px;" id="${ids.infoSrc}">
                    <p class="sub_h" style="font-size:10px; margin:0px; padding:5px;"> Source : <a href="${data.source_page}"> <i class="sub_h" style="font-size:11.5px;">${data.source}</i> </a></p>
                </div>
            </div>
            <div style="height:10px;"></div>
        </div>
        `;
    }
    
    // read post body function
    const readPost = (data, udata, readId, readBy, bodyId, comBod) => {
        if (data.body !== '') {
            $(`#${readId}`).css('display', 'block');
            let readbtn = $(`#${readId}`);
            readbtn.css('display:block;');
            if (data.reads.length > 0) {
                $(`#${readBy}`).css('display', 'block');
                for (let z = 0; z < data.reads.length; z++) {
                    if (data.reads[z].user == udata._id) {
                        $(`#${readId}`).attr('src', 'assets/imgs/read.png');
                    }                    
                }
            }
            readbtn.click(function() {
                $(`#${comBod}`).slideUp();
                $(`#${bodyId}`).slideDown();
                //$(`#${readId}`).attr('src', 'assets/imgs/readen.png');
                var cnt = 0;
                for (let i = 0; i < data.reads.length; i++) {
                    if (data.reads[i].user == udata._id) {
                        cnt++;
                    }
                }
                if (cnt == 0) {
                    var pData = {
                        section: 'journals',
                        type: 'readBy',
                        user: udata._id,
                        set: {user: udata.user_name},
                        id: data._id,
                    };
                    postData(pData);
                    $(`#${readId}`).attr('src', 'assets/imgs/read.png');
                }
            });
        } else {
            $(`#${readId}`).css('display', 'none');
        }
    }; 

    // comment functionaltes section
    //----------------------------------------
    // comment bodies
    const comBodLyt = (coms, realN, cids, slc, dispMre) => { 
        var path = ''; var clas = '';
        if (realN.profile_pic == 'none') {
            path = 'assets/imgs/profb.png';
            clas = '';
        }else {
            path = `${realN.profile_pic.path}`;
            clas = `${realN.profile_pic.class}`;
        }
    return  `
    <div id="${cids.comBodId}" style="width:100%;">
        <div class="commentBodySec" style="width:80%; margin:5px; margin-top:10px; box-shadow:0px 0px 15px -10px #1a1a1a; border-radius:5px;">
            <div style="width:100%; height:22.5px; border-top-left-radius:5px; border-top-right-radius: 5px; background-color:#f9f9f9; border-bottom:solid 0.8px #dddddd;">
                <div class="${clas}" style="float:left; width:15px; height:15px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin:3px;"></div>
                <p class="sub_h" id="${cids.usrNme}" style="font-size:12px; margin: 0px; padding:2.5px; float: left;">${realN.user_name} <img src="assets/imgs/verification.png" id="${cids.verIconCom}" width="12.5px" height="12.5px" style="margin-top:-5px; display:none;"></p>
                <p class="sub_h" style="font-size:10px; margin: 0px; padding:2px; float: right;" id="${cids.dateFlwCom}"></p>
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
            path = 'assets/imgs/profb.png';
            clas = '';
        }else {
            path = `${realN.profile_pic.path}`;
            clas = `${realN.profile_pic.class}`;
        }
    return `
    <div id="${cids.comBodId}" style="width:100%;">
        <div class="commentBodySec" style="width:80%; margin:5px; margin-top:10px; box-shadow:0px 0px 15px -10px black; border-radius:5px;">
            <div style="width:100%; height:22.5px; border-top-left-radius:5px; border-top-right-radius: 5px; background-color:#1a1a1a;">
                <div class="${clas}" style="float:left; width:15px; height:15px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin:3px;"></div>
                <p class="sub_h" id="${cids.usrNme}" style="font-size:12px; margin: 0px; padding:2.5px; float: left;">${realN.user_name} <img src="assets/imgs/verification.png" id="${cids.verIconCom}" width="12.5px" height="12.5px" style="margin-top:-5px; display:none;"></p>
                <p style="font-size:10px; margin: 0px; padding:2px; float: right; color:silver;" id="${cids.dateFlwCom}"></p>
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
    // refresh comment length and img
    const rfrshComs = (data, udata, openCom, comntLen) => {
        var comData = '';
        for (let i = 0; i < db.all_posts.length; i++) {
            if (db.all_posts[i]._id == data._id) {
                comData = db.all_posts[i].comments;
            }
        }
        // comments length
        $(`#${comntLen}`).text(comData.length);
        if (comData.length > 0) {
            $(`#${comntLen}`).css('display', 'inline-block');
            for (let i = 0; i < comData.length; i++) {
                if (comData[i].user == udata._id) {
                    $(`#${openCom}`).attr('src', 'assets/imgs/commentd.png');
                }else {
                    $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
                }
            }
        }else {
            $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
            $(`#${comntLen}`).css('display', 'none');
        }
    };
    // extract comments and apply funcs
    const comsFuncs = (data, udata, openCom, comBod, bodyId, comFlow, comntLen) => {

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
                var mth = Math.random();var strn = mth.toString();var dif = strn.slice(2, mth.length);
                var act = 'del-coment';
                var pData = {
                    section: 'journals',
                    type: 'del_comment',
                    user: udata._id,
                    post: data,
                    act: act,
                    comment: coms,
                    id: data._id,
                };
                postData(pData);
                $(`#${comBodId}`).remove();
                const extractComs = () => {
                    var targetDate = new Date();
                    targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                    var countDownDate = targetDate.getTime();
                    var x = setInterval(function() {
                        var now = new Date().getTime();
                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;
                        if (distance < 0) {
                            rfrshComs(data, udata, openCom, comntLen);
                            clearInterval(x);
                        }
                    }, 1000);
                }
                const assignF = () => {
                    var targetDate = new Date();
                    targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                    var countDownDate = targetDate.getTime();
                    var x = setInterval(function() {
                        var now = new Date().getTime();
                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;
                        if (distance < 0) {
                            // assignDb();
                            extractComs();
                            clearInterval(x);
                        }
                    }, 1000);
                }
                assignF();
            });
        };
        // disp/not rem but
        const dispRem = (data, coms, delId, comBodId) => {
            if (data.user == udata._id && coms.user == udata._id) {
                $(`#${delId}`).css('display', 'block');
            }
            if (data.user !== udata._id && coms.user == udata._id) {
                $(`#${delId}`).css('display', 'block');
            }
            if (data.user !== udata._id && coms.user !== udata._id) {
                $(`#${delId}`).css('display', 'none');
            }
        };
        const comsIds = (len) => {
            return {
                delId: 'delComId_' + len,
                comBodId: 'comBodId_' + len,
                dateFlwCom: 'dateFlwCom_' + len,
                cmntSlc: 'cmntSlc_' + len,
                mreCom: 'mreCom_' + len,
                verIconCom: 'comNmeVerIcn_' + len,
                usrNme: 'comUsrNmeGo_' + len
            }
        };
        const displayComs = (coms, len) => {
            const cids = comsIds(len);
            var realN = '';
            var cdata = '';
            for (let j = 0; j < db.users.length; j++) {
                if (db.users[j]._id == coms.user) {
                    cdata = db.users[j];
                }                    
            }
            if (cdata) {
                var curnS = 0;
                if(udata.mode == 'light') {
                    if (coms.comment.length>50) {
                        let str = coms.comment;
                        var slc = str.slice(0, 100);
                        curnS = 100;
                        var dispMre = 'inline';
                        $(`#${comFlow}`).prepend(comBodLyt(coms, cdata, cids, slc, dispMre));
                    }else {
                        var slc = coms.comment;
                        curnS = slc.length;
                        var dispMre = 'none';
                        $(`#${comFlow}`).prepend(comBodLyt(coms, cdata, cids, slc, dispMre));
                    }
                }else {
                    if (coms.comment.length>50) {
                        let str = coms.comment;
                        var slc = str.slice(0, 100);
                        curnS = 100;
                        var dispMre = 'inline';
                        $(`#${comFlow}`).prepend(comBodDrk(coms, cdata, cids, slc, dispMre));
                    }else {
                        var slc = coms.comment;
                        curnS = slc.length;
                        var dispMre = 'none';
                        $(`#${comFlow}`).prepend(comBodDrk(coms, cdata, cids, slc, dispMre));
                    }
                }
                Dark();
                if (cdata.verification == 'on') {
                    $(`#${cids.verIconCom}`).css('display', 'inline');
                }
                idExFunc_2(cdata._id, cids.usrNme);
                smartDate(coms, cids.dateFlwCom);
                delCom(coms, cids.delId, cids.comBodId);
                dispRem(data, coms, cids.delId, cids.comBodId);
                mreCom(data, coms, curnS, cids.cmntSlc, cids.mreCom);
                commentImg(data, udata, openCom, comntLen);
            }
        };
        var comData = '';
        for (let o = 0; o < db.all_posts.length; o++) {
            if (db.all_posts[o]._id == data._id) {
                comData = db.all_posts[o].comments;
            }
        }
        $('.commentBodySec').remove();
        // comments length
        $(`#${comntLen}`).text(comData.length);
        if (comData.length > 0) {
            $(`#${comntLen}`).css('display', 'inline-block');
            for (let i = 0; i < comData.length; i++) {
                const len = i;
                displayComs(comData[i], len);
                // comments img
                if (comData[i].user == udata._id) {
                    $(`#${openCom}`).attr('src', 'assets/imgs/commentd.png');
                }else {
                    $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
                }
            }
        }else {
            $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
            $(`#${comntLen}`).css('display', 'none');
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
            $(`#${openCom}`).attr('src', 'assets/imgs/comment.png');
        }
    }
    // get existing comments
    const commentSec = (data, udata, openCom, comBod, bodyId, comFlow, comntLen) => {
        
        let openCombtn = $(`#${openCom}`);
        openCombtn.click(function() {
            // assignDb();
            var targetDate = new Date();
            targetDate.setSeconds(targetDate.getSeconds() + 1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    comsFuncs(data, udata, openCom, comBod, bodyId, comFlow, comntLen);
                    clearInterval(x);
                }
            }, 1000);
            $('.postBodyCon').slideUp();
            $(`#${comBod}`).slideDown();
        });
        
    };
    // close comment section
    const closeComment = (data, closeCom, comBod) => {
        let clseCombtn = $(`#${closeCom}`);
        clseCombtn.click(function() {
            $(`#${comBod}`).slideUp();
        });
    };
    // push comment functions
    const pushComment = (data, udata, comBod, bodyId, comIn, comBt, comFlow, openCom, cmntBy, comntLen) => {
        let pushCom = $(`#${comBt}`);
        let comInput = $(`#${comIn}`);
        pushCom.click(function(){
            if (comInput.val() !== '') {
                var dateNow = [year, day, month, hour, minute, secnds];
                var mth = Math.random();var strn = mth.toString();var dif = strn.slice(2, mth.length);
                var pData = {
                    section: 'journals',
                    type: 'comment',
                    user: udata._id,
                    comment: comInput.val(),
                    post: data,
                    act: 'coment',
                    id: data._id,
                };
                postData(pData);
                //likeNoti(data, udata, act, dateNow);
                const extractComs = () => {
                    var targetDate = new Date();
                    targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                    var countDownDate = targetDate.getTime();
                    var x = setInterval(function() {
                        var now = new Date().getTime();
                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;
                        if (distance < 0) {
                            comsFuncs(data, udata, openCom, comBod, bodyId, comFlow, comntLen);
                            clearInterval(x);
                        }
                    }, 1000);
                }
                const assignF = () => {
                    var targetDate = new Date();
                    targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                    var countDownDate = targetDate.getTime();
                    var x = setInterval(function() {
                        var now = new Date().getTime();
                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;
                        if (distance < 0) {
                            // assignDb();
                            extractComs();
                            clearInterval(x);
                        }
                    }, 1000);
                }
                assignF();
            }else {
                $(`#${comIn}`).click();
            }
        });
    };

    // like post functionalities
    //------------------------------
    // check if liked function
    const likedImg = (data, udata, likeId, likedBy) => {
        for (let i = 0; i < data.likedBy.length; i++) { 
            if (data.likedBy[i].user == udata._id) {
                $(`#${likeId}`).attr('src', 'assets/imgs/liked.png');
            }
        }
        if (data.likedBy.length < 1) {
            $(`#${likedBy}`).css('display', 'none');
        }
        if (data.likedBy.length > 0) {
            $(`#${likedBy}`).css('display', 'inline-block');
        }
    }
    // LEP

    const likeLEP = (data, udata, likeId, likedBy) => {

        var len = 0;
        const checkIt = () => {
            
            const letsGo = () => {
                var scn = '';
                for (let i = 0; i < db.all_posts.length; i++) {
                    if (db.all_posts[i]._id == data._id) {
                        scn = db.all_posts[i]
                    }
                }
                if (scn.likedBy.length > len || scn.likedBy.length < len) {
                    $(`#${likedBy}`).css('display', 'none');
                    //$(`#${likedBy}`).fadeIn();
                    $(`#${likedBy}`).text(scn.likedBy.length);
                    likedImg(scn, udata, likeId, likedBy);
                    checkIt();
                }else {
                    callLetsGo();
                }

            };
            var dis = '';
            for (let i = 0; i < db.all_posts.length; i++) {
                if (db.all_posts[i]._id == data._id) {
                    dis = db.all_posts[i]
                }
            }
            len = dis.likedBy.length;
            // assignDb();
            const callLetsGo = () => {
                var targetDate = new Date();
                targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                    var now = new Date().getTime();
                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;
                    if (distance < 0) {
                        letsGo();
                        clearInterval(x);
                    }
                }, 1000);
            }
            callLetsGo();

        } 
        checkIt();

    };
    // like post function
    const getPInfo = (data, likedBy) => {
        var accData = '';
        for (let i = 0; i < db.all_posts.length; i++) {
            if (db.all_posts[i]._id == data._id) {
                accData = db.all_posts[i].likedBy;
            }
        }
        if (accData.length < 1 || accData.length == 0) {
            $(`#${likedBy}`).css('display', 'none');
        }else {
            if (accData.length > 0) {
                $(`#${likedBy}`).css('display', 'inline-block');
                $(`#${likedBy}`).text(accData.length);
            }
        }
    };
    const LikePost = (data, udata, likeId, likedBy) => {
        let alertbtn = $(`#${likeId}`);
        alertbtn.click(function() {
            const getNewL = () => {
                var targetDate = new Date();
                targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                    var now = new Date().getTime();
                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;
                    if (distance < 0) {
                        getPInfo(data, likedBy);
                        clearInterval(x);
                    }
                }, 1000);
            }
            const refreshL = () => {
                var targetDate = new Date();
                targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
                var countDownDate = targetDate.getTime();
                var x = setInterval(function() {
                    var now = new Date().getTime();
                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;
                    if (distance < 0) {
                        // assignDb();
                        getNewL();
                        clearInterval(x);
                    }
                }, 1000);
            }
            const chkImply = () => {
                if (imply == '') {
                    imply = 'liked';
                    act = 'like';
                    var pData = {
                        section: 'journals',
                        type: 'like',
                        user: udata._id,
                        set: {user: udata.user_name},
                        id: data._id,
                        act: act,
                        post: data,
                        date: [year, day, month, hour, minute, secnds]
                    };
                    postData(pData);
                    refreshL();
                    $(`#${likeId}`).attr('src', 'assets/imgs/liked.png');
                }
                $(`#${likeId}`).fadeIn("fast");
            };
            var imply = '';
            $(`#${likeId}, #${likedBy}`).css('display', 'none');
            var accData = '';
            for (let i = 0; i < db.all_posts.length; i++) {
                if (db.all_posts[i]._id == data._id) {
                    accData = db.all_posts[i].likedBy;
                }
            }
            if (accData) {
                var act = '';
                var dateNow = [year, day, month, hour, minute, secnds];
                if (accData.length > 0) {
                    for (let i = 0; i < accData.length; i++) {
                        if (accData[i].user == udata._id) {
                            imply = 'liked';
                            act = 'unlike';
                            var pData = {
                                section: 'journals',
                                type: 'unlike',
                                user: udata._id,
                                set: {user: udata.user_name},
                                id: data._id,
                                act: act,
                                post: data,
                                date: accData.date
                            };
                            postData(pData);
                            refreshL();
                            refreshI();
                            imply = 'liked';
                        }
                    }
                    $(`#${likeId}`).attr('src', 'assets/imgs/like.png');
                    chkImply();
                }else {
                    imply = 'liked';
                    act = 'like';
                    var pData = {
                        section: 'journals',
                        type: 'like',
                        user: udata._id,
                        set: {user: udata.user_name},
                        id: data._id,
                        act: act,
                        post: data,
                        date: [year, day, month, hour, minute, secnds]
                    };
                    postData(pData);
                    chkImply();
                    refreshL();
                    refreshI();
                    $(`#${likeId}`).attr('src', 'assets/imgs/liked.png');
                }
            }
        });
        /**/
    };

    // close-read btn function
    const CloseRead = (data, closeRdId, bodyId) => {
        let closbtn = $(`#${closeRdId}`);
        closbtn.click(function() {
            $(`#${bodyId}`).slideUp();
        });
    };

    // close tag body
    const openTagd = (data, tagedId, tagedBod, tagedFlw, closeTag) => {
        let openBtn = $(`#${tagedId}`);
        let closeBtn = $(`#${closeTag}`);
        if (data.tagged.length > 0) {
            var users = db.users;
            if (users) {
                $(`#${tagedId}`).css('display', 'block');
                const tids = (usr, z) => {
                    return {
                        tagIdsOpnEx: `tagIdsOpnEx_${usr}_${z}`
                    }
                };
                for (let z = 0; z < data.tagged.length; z++) {
                    var user = ''; var usr = ''; var genUsr = '';
                    for (let i = 0; i < users.length; i++) {
                        if (data.tagged[z] == users[i]._id) {
                            genUsr = users[i]
                            usr = users[i].user_name;
                        }
                    }
                    if (usr.length > 15) {
                        user = usr.slice(0, 15)+'..';
                    }else {
                        user = usr;
                    }
                    var path = ''; var clss = '';
                    if (genUsr.profile_pic == 'none') {
                        path = 'assets/imgs/profb.png';
                    }else {
                        path = `https://test-vyral.onrender.com/${genUsr.profile_pic.path}`;
                        clss = `${genUsr.profile_pic.class}`;
                    }
                    
                    if(udata.mode == 'light') {
                        $('.checkTagBody2').css('border', 'solid 1px #dddddd');
                        $('.checkTagBody2').css('background-color', 'white');
                    }else {
                        $('.checkTagBody2').css('border', 'solid 1px #404040');
                        $('.checkTagBody2').css('background-color', '#1a1a1a');
                    }
                    var ids = tids(genUsr._id, z);
                    $(`#${tagedFlw}`).prepend(`
                        <div class="checkTagBody2" id="" style="width:95%; margin:auto; height:35px; border-radius:5px; margin-top:10px;">
                            <div style="width:30%; height:100%; float:left;">
                                <div class="${clss}" style="width:25px; height:25px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
                            </div>
                            <div style="width:50%; height:100%; float:left;">
                                <p id="${ids.tagIdsOpnEx}" class="sub_h" style="padding:2.5px; margin:5px; font-size:12px;">${user}</p>
                            </div>
                            <div style="width:20%; height:100%; float:right;">
                                
                            </div>
                        </div>
                    `);
                    idExFunc_2(genUsr._id, ids.tagIdsOpnEx);
                    Dark();
                }
            
            }
            openBtn.click(function() {
                $('.postBodyCon, .bodyComNoti').slideUp();
                $(`#${tagedBod}`).slideDown();
            });
            closeBtn.click(function() {
                $(`#${tagedBod}`).slideUp();
            });
        }else {
            $(`#${tagedId}`).css('display', 'none');
        }
    };

    // goto prof xs
    const idExFunc_2 = (data, userIdEx) => {

        $(`#${userIdEx}, .${userIdEx}`).click(()=>{
            if (data.user == udata._id) {
                $('#opnPrf').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = data;
                global.ex_flag = 'y';
            }
        });
        
    };

    const shrBd = (user, path, clss, ids) => {
        return `
        <div class="shrPstBod" id="${ids.shrPstBodyId}" style="width:95%; margin:auto; height:35px; border-radius:5px; margin-top:10px; display:none;">
            <div style="width:30%; height:100%; float:left;">
                <div class="${clss}" style="width:25px; height:25px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:5px;"></div>
            </div>
            <div style="width:50%; height:100%; float:left;">
                <p id="${ids.shrPstOpnEx}" class="sub_h" style="padding:2.5px; margin:5px; font-size:12px;">${user}</p>
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
    // share funcs
    const sharePst = (data, udata, shrPst, shrPstBd, shrPstSrch, shrPstFlw, shrPstCls) => {

        //opn
        $(`#${shrPst}`).click(function() {
            $('.postBodyCon, .bodyComNoti').slideUp();
            $(`#${shrPstBd}`).slideDown();
            $('.shrPstBod').remove();
            if ($(`#${shrPstSrch}`).val() == '') {
                flowknwn();
            }else {
                flowFrndsrch($(`#${shrPstSrch}`).val());
            }
        });
        //cls
        $(`#${shrPstCls}`).click(function() {
            $(`#${shrPstBd}`).slideUp();
        });

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
                const responce = await fetch('https://test-vyral.onrender.com/searcher/searchFrnd', settings);
                const data = await responce.json();
                $('.tagUflowBod, #noneExsTagSrch').remove();
                for (let i = 0; i < data.length; i++) {
                    var users = db.users;
                    var usr = ''; var genUsrr = ''; var fulUsr = '';
                    for (let z = 0; z < users.length; z++) {
                        if (data[i]._id == users[z]._id) {
                            genUsrr = users[z]
                            usr = users[z].user_name;
                            fulUsr = users[z];
                        }
                    }
                    passMe(usr, fulUsr, genUsrr);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // create share Isd
        const createShrIds = (user) => {
            return {
                shrPstSndBtn: 'shrPstSndBtn_' + user,
                shrPstBodyId: 'shrPstBodyId_' + user,
                shrPstRtrnBtn: 'shrPstRtrnBtn_' + user,
                shrPstOpnEx: 'shrPstOpnEx_' + user
            }
        };
        const flowknwn = () => {
            for (let z = 0; z < udata.following.length; z++) {
                for (let x = 0; x < udata.chats.length; x++) {
                    
                    if (udata.following[z].user == udata.chats[x].user) {
                        
                        var users = db.users;
                        var usr = ''; var genUsrr = ''; var fulUsr = '';
                        for (let i = 0; i < users.length; i++) {
                            if (udata.following[z].user == users[i]._id && udata.chats[x].user == users[i]._id) {
                                genUsrr = users[i]
                                usr = users[i].user_name;
                                fulUsr = users[i];
                            }
                        }
                        passMe(usr, fulUsr, genUsrr);

                    }

                }
            }
        };
        // pass con
        const passMe = (usr, fulUsr, genUsrr) => {
            var user = '';
            if (usr.length > 15) {
                user = usr.slice(0, 15)+'..';
            }else {
                user = usr;
            }
            var path = ''; var clss = 'none';
            if (genUsrr.profile_pic == 'none') {
                path = 'assets/imgs/profb.png';
            }else {
                path = `https://test-vyral.onrender.com/${genUsrr.profile_pic.path}`;
                clss = genUsrr.profile_pic.class;
            }
            const ids = createShrIds(genUsrr._id);
            $(`#${shrPstFlw}`).prepend(shrBd(user, path, clss, ids));
            shrFuncs(user, genUsrr, ids.shrPstSndBtn, ids.shrPstRtrnBtn);
            idExFunc_2(fulUsr._id, ids.shrPstOpnEx);
            if(udata.mode == 'light') {
                $('.shrPstBod').css('border', 'solid 0.5px #dddddd');
                $('.shrPstBod').css('background-color', 'white');
            }else {
                $('.shrPstBod').css('border', 'solid 0.5px #404040');
                $('.shrPstBod').css('background-color', '#1a1a1a');
            }
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
                    if (genUsr.notifications[i].noti_type == 'shared_post' && genUsr.notifications[i].post == data._id && genUsr.notifications[i].user == udata._id) {
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

            //BTNS
            $(`#${send}`).click(function() {
                var act = 'shr';
                var dateNow = [year, day, month, hour, minute, secnds];
                tagNoti(genUsr, data, udata, act, dateNow);
            })
        };

    };

    // tag noti
    const tagNoti = (user, data, udata, act, dateNow) => {

        if (act == 'shr' && user.user_name !== udata.user_name) {
            
            var pData = {
                section: 'journals',
                type: 'tag_jrn',
                user: user._id,
                post: data._id,
                me: udata._id
            };
            postData(pData);
            setTimeout(() => {
                // assignDb();
                $('#container-body').css('filter', 'blur(5px)');
                $('#alertText').text(`You successfully tagged ${user.user_name} to the post!`);
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
            }, 1);
        }

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
                                            <p style="float:right; margin:5px; font-size:13px;" class="sub_h"> <span id="${ids.vidCrntT_xp}" style="font-size:12.5px; color:orange;"></span>/<span id="${ids.vidOrgT_xp}" style="font-size:10px;" class="sub_h"></span> </p>    
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

    // image functionalities
    const ImgFunc = (data, ImgId, rightId, leftId, imSldId, imgNow, imgAll) => {
        $(`#${ImgId}`).attr('src',`https://test-vyral.onrender.com/${data.img[0].path}`);
        $(`#${ImgId}`).css('display', 'block');
        $(`#${ImgId}`).attr('class', data.img[0].class);
        preloadImgs(`https://test-vyral.onrender.com/${data.img[0].path}`, ImgId);
        var num = 0;
        if (data.img.length > 1) {
            $(`#${imSldId}`).css('display', 'block');
            $(`#${ImgId}`).attr('class', data.img[0].class);
            $(`#${imgAll}`).text(data.img.length);
            $(`#${imgNow}`).text('1');
            var right = $(`#${rightId}`);
            var left = $(`#${leftId}`);
    
            right.click(function() {
                $(`#${ImgId}`).css('display', 'none');
                num++;
                if (num >= data.img.length) {
                    num = 0;
                }
                $(`#${ImgId}`).attr("src", '');
                $(`#${ImgId}`).attr("src", `https://test-vyral.onrender.com/${data.img[num].path}`);
                $(`#${ImgId}`).attr("class", data.img[num].class);
                $(`#${ImgId}`).fadeIn();
                $(`#${imgNow}`).text(num+1);
            });
    
            left.click(function() {
                $(`#${ImgId}`).css('display', 'none');
                num--;
                if (num < 0) {
                    num = data.img.length-1;
                }
                $(`#${ImgId}`).attr("src", '');
                $(`#${ImgId}`).attr("src", `https://test-vyral.onrender.com/${data.img[num].path}`);
                $(`#${ImgId}`).attr("class", data.img[num].class);
                $(`#${ImgId}`).fadeIn();
                $(`#${imgNow}`).text(num+1);
            });
        }else {
            $(`#${imSldId}`).css('display', 'none');
        }
        $(`#${ImgId}`).click(()=>{
            console.log('clicked image here');
            revImgFuncs(ImgId, global.pop_no+2, num, data);
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
    const revImgFuncs = (images, ind, num, data) => {
        const revImgIds = createReThrImIds(images);
        $(`#dropCons`).after(imgRevThrImg(revImgIds, ind));
        $(`#${revImgIds.dispCurnt}`).prepend(`
        <img src="https://test-vyral.onrender.com/${data.img[num].path}" class="${data.img[num].class}" width="100%" id="${revImgIds.shrdImgId}">
        `);
        opndRevImg(data, num, revImgIds);
    };

    // video funcs
    const VidFunc = (data, vidId, vidCntrlDiv, vidPlay, vidPause, vidStop, vidMute, vidCrntT, vidOrgT) => {
        $(`#${vidId}, #${vidCntrlDiv}`).css('display', 'block');
        $(`#${vidId}`).attr('class', `${data.vid.class}`);
        $(`#${vidId}`).attr('src', `https://test-vyral.onrender.com/${data.vid.path}`);
        var video = document.getElementById(`${vidId}`);
        video.muted = true;
        //$(`#${vidCrntT}`).text(video.currentTime);
        var dur = document.getElementById(`${vidId}`);
        //alert(`chck duration: ${video.muted}`);
        dur.onloadedmetadata = function() {
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
            preloadVids(vidId);
        };
        const getTimer = () => {
            var curmins = Math.floor(dur.currentTime / 60);
            var cursecs = Math.floor(dur.currentTime - curmins * 60);
            $(`#${vidCrntT}`).text(cursecs);
        };
        const getCurT = () => {
            setTimeout(() => {
                getTimer();
                var curmins = Math.floor(dur.currentTime / 60);
                var cursecs = Math.floor(dur.currentTime - curmins * 60);
                var durmins = Math.floor(dur.duration / 60);
                var dursecs = Math.round(dur.duration - durmins * 60);
                if (cursecs == dursecs || cursecs > dursecs) {
                    $(`#${vidCrntT}`).text(0);
                }else {
                    getCurT();
                }
            }, 1);
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
            getTimer();
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

        $(`#${vidId}`).click(()=>{
            revVidFuncs(vidId, global.pop_no+2, data) 
        });

    };
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
    const revVidFuncs = (vidBod, ind, data) => {
        const revImgIds = createReThrImIds(vidBod);
        $(`#dropCons`).after(imgRevThrImg(revImgIds, ind));
        $(`#${revImgIds.dispCurnt}`).prepend(`
        <video src="https://test-vyral.onrender.com/${data.vid.path}" poster="assets/imgs/emptback.png" class="${data.vid.class}" width="100%" id="${revImgIds.shrdVidId}"></video>
        `);
        opndRevVid(data, revImgIds);
    }

    // post edt config
    const postPop = (data, udata, openPopId, popBodId, clsePopId, reprtId, promId, edtPost, donEdtPost, hidPMCId, delPMCId) => {
        const openBtn = $(`#${openPopId}`);
        const clseBtn = $(`#${clsePopId}`);
        
        if (udata._id == data.user) {
            $(`#${reprtId}`).css('display', 'none');
            $(`#${promId}, #${edtPost}, #${hidPMCId}, #${delPMCId}`).css('display', 'block');
        } else {
            $(`#${reprtId}`).css('display', 'block');
            $(`#${promId}, #${edtPost}, #${hidPMCId}, #${delPMCId}`).css('display', 'none');
        }

        if (data.content_type == 'usr_aut_book') {
            console.log('book neh');
        }

        //open
        $(openBtn).click(()=>{
            $(`#${popBodId}`).slideDown();
        });
        //close
        $(clseBtn).click(()=>{
            $(`#${popBodId}`).slideUp();
        })

        const edtBd = (ids) => {
            var ind = global.pop_no+100;
            var title = ''; var height = ''; var place = '';
            if (data.content_type == 'usr_aut_book') {
                title = 'Book'; height = '450px'; place = 'edit book title';
            } else {
                title = 'Jounral'; height = '450px'; place = 'edit jounral';
            }
            return `
            <div id="${ids.edtBodId}" class="col-lg-4 col-xs-12" style="display:none; position:fixed; z-index:${ind};">
                <br>
                <div style="height:450px; width:100%; border-radius:5px;" class="edt_jrn_alrt">
                    <div id="" class="posterClosecon_edt" style="width:100%; height:30px; margin-bottom:15px;">
                        <p style="margin:5px; color:orange; float:left;"> Edit ${title} </p>
                        <span style="float:right; margin:5px; color:red; cursor:pointer;" id="${ids.edtClsId}"><img src="assets/imgs/can.png" width="13px" height="13px"></span>
                    </div>
                    <div style="width:100%; height:360px; overflow-y:auto;" id="">
                        <br>
                        <div class="postBodyCon row" id="${ids.binEdtBod}" style="width:98%; margin:auto; height:280px; border-radius:5px; padding-bottom:5px; overflow-y:auto; display:none;">
                            <br>
                            <spa id="${ids.drpBinEdt}"></span>
                            <br>
                        </div>
                        <input maxlength="200" class="srchCon sub_h" id="${ids.headEdt}" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="${place}" />
                        <textarea class="commentInput sub_h" id="${ids.bodyEdt}" style="height:60px; margin:10px; width:90%; border-radius:5px; display:none;" placeholder="body"></textarea>
                        <br>
                    </div>
                    <div style="height:40px; width:100%; border-top:solid 1px orange;">
                        <p class="DoneOne" style="text-align:center; margin:8px;"> <button class="btn btn-default btn-xs" style="border-radius:5px; background-color:transparent; color:grey;" id="${ids.donEdtn}">done</button> </p>
                    </div>
                </div>
            </div>
            `
        }

        //edt pst
        $(`#${edtPost}`).click(()=>{
            $('#allAlerts').fadeIn();
            $('#container-body').css('filter', 'blur(5px)');
            initEdt();
            //$('#').append();
        });

        // FUNCS
        // -----
        // cls func
        const clsEdt = (edtClsId, edtBodId) => {
            $(`#${edtClsId}`).click(()=>{
                $(`#${edtBodId}`).remove();
                $('#allAlerts').fadeOut();
                $('#container-body').css('filter', '');
            });
        };
        // body&head
        const headBod = (headEdt, bodyEdt) => {
            if (data.content_type !== 'usr_aut_book') {
                $(`#${headEdt}`).val(data.heading);
                if (data.body.length > 0) {
                    $(`#${bodyEdt}`).css('display', 'block');
                    $(`#${bodyEdt}`).val(data.body);
                }
            }else {
                $(`#${headEdt}`).val(data.title);
            }
        };
        // drp binaries
        var imgArr = []; var vidAr = '';
        const drpBins = (drpBinEdt, binEdtBod) => {
            if (data.content_type !== 'usr_aut_book') {
                if (data.vid != '' || data.img.length > 0) {
                    $(`#${binEdtBod}`).css('display', 'block');
                }
                if (data.img.length > 0) {
                    for (let i = 0; i < data.img.length; i++) {
                        imgArr[i] = data.img[i];                  
                    }
                    const appCurImg = () => {
                        $('.img_edt_hangd').remove();
                        if (imgArr.length > 0) {
                            for (let i = 0; i < imgArr.length; i++) {
                                const revBinImg = (img) => {
                                    return `
                                        <div class="col-md-6 col-xs-6 img_edt_hangd">
                                            <div class="${img.class}" style="width:100%; height:200px; background-image:url(https://test-vyral.onrender.com/${img.path}); background-size:100% 100%; border-radius:10px; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.3); margin-bottom:10px;">
                                                <img src="assets/imgs/img2.png" width="28px" height="20px" style="opacity:0.8; float:left; margin:5px; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.35);">
                                                <img src="assets/imgs/del.png" width="20px" height="30px" style="float:right; margin:5px; cursor:pointer; box-shadow:0px 0px 9px -1px rgba(0, 0, 0, 0.35)" id="delCurImg_${i}">
                                            </div>
                                        </div>
                                    `
                                }
                                $(`#${drpBinEdt}`).prepend(revBinImg(imgArr[i]));
                                // funcs
                                $(`#delCurImg_${i}`).click(()=>{
                                    imgArr.splice(i, 1);
                                    appCurImg();
                                });
                            }
                        }else {
                            $(`#${binEdtBod}`).slideUp();
                        }
                    };
                    appCurImg();
                }
                if (data.vid != '') {
                    vidAr = data.vid;
                    const appCurVid = () => {
                        $('.vid_edt_hangd').remove();
                        if (vidAr != '') {
                            const revBinVid = (vid) => {
                                return `
                                    <div class="col-md-6 col-xs-6 vid_edt_hangd">
                                        <div style="width:100%; height:200px; border-radius:10px; box-shadow:0px 0px 15px 5px #1a1a1a; margin-bottom:10px;">
                                            <video class="${vid.class}" src="https://test-vyral.onrender.com/${vid.path}" poster="assets/imgs/emptback.png" style="width:100%; height:160px; border-radius:10px;"></video>
                                            <img src="assets/imgs/playn.png" width="20px" height="20px" style="margin:5px; float:left;" id="">
                                            <img src="assets/imgs/del.png" width="20px" height="30px" style="margin:2.5px; cursor:pointer; float:right;" id="delCurVid_${data._id}">
                                        </div>
                                    </div>
                                `
                            }
                            $(`#${drpBinEdt}`).prepend(revBinVid(vidAr));
                            // funcs
                            $(`#delCurVid_${data._id}`).click(()=>{
                                vidAr = '';
                                appCurVid();
                            });
                        }else {
                            $(`#${binEdtBod}`).slideUp();
                        }
                    };
                    appCurVid();
                }
            }
        };
        // done
        const doneEdtn = (donEdtn, ids) => {
            $(`#${donEdtn}`).click(()=>{
                if ($(`#${ids.headEdt}`).val() !== '') {
                    alert($(`#${ids.headEdt}`).val());
                    if (data.content_type == 'usr_aut_book') {
                        var pData = {
                            section: 'journals',
                            type: 'edit_bk',
                            title: $(`#${ids.headEdt}`).val(),
                            post: data._id
                        };
                        postData(pData);
                    }else {
                        var pData = {
                            section: 'journals',
                            type: 'edit',
                            body: $(`#${ids.bodyEdt}`).val(),
                            heading: $(`#${ids.headEdt}`).val(),
                            img: imgArr, 
                            vid: vidAr,
                            post: data._id
                        };
                        postData(pData);
                    }
                    $(`#${ids.edtClsId}`).click();
                } else {
                    alert('a heading/title must be included for a Journal or a Book!');
                }
            })
        }
        // crtids
        const crtEdtIds = (id) => {
            return {
                edtBodId: 'edtBodId_' + id,
                // cls
                edtClsId: 'edtClsId_' + id,
                // done id
                donEdtn: 'donEdtn_' + id,
                // head&bod
                headEdt: 'headEdt_' + id,
                bodyEdt: 'bodyEdt_' + id,
                // binary sec
                binEdtBod: 'binEdtBod_' + id,
                drpBinEdt: 'drpBinEdt_' + id,
            }
        };
        // init
        const initEdt = () => {
            var ids = crtEdtIds(data._id);
            $('#allAlerts').before(edtBd(ids));
            checkMode(); Dark();
            $(`#${ids.edtBodId}`).fadeIn();
            var x = window.matchMedia("(min-width: 600px)")
            if (x.matches) {
                $(`#${ids.edtBodId}`).css('margin-left', '10px');
            }
            clsEdt(ids.edtClsId, ids.edtBodId);
            // check body and head
            headBod(ids.headEdt, ids.bodyEdt);
            // drpBin
            drpBins(ids.drpBinEdt, ids.binEdtBod);
            // done
            doneEdtn(ids.donEdtn, ids);
        }

    };

    // delete post funcs
    const deletePost = (data, delPMCId, delPostId, delPConId, yesDelPId, noDelPId) => {
        const opnBtn = $(`#${delPostId}`);
        const clseBtn = $(`#${noDelPId}`);
        const deletePbtn = $(`#${yesDelPId}`);

        // open btn
        opnBtn.click(()=>{
            $(`#${delPMCId}`).slideUp();
            $(`#${delPConId}`).slideDown();
        });
        // clse btn
        clseBtn.click(()=>{
            $(`#${delPConId}`).slideUp();
            $(`#${delPMCId}`).slideDown();
        });
        // delete post method
        deletePbtn.click(()=>{
            var pData = {
                section: 'journals',
                type: 'delete',
                post: data._id
            };
            postData(pData);
            // assignDb();
            var tg = 'hme';
            if (app.child_p == 'home') {
                tg = 'hme';
            } else {
                tg = 'prf';
            }
            getExisting(tg, app.child_p);
        });
    };

    // HIDE POST FUNCS
    //------------------
    // hide post
    const hidePost = (data, hidPMCId, hidPostId, tryHid, hidPConId, askHid, yesHidPId, noHidPId) => {
        const yesBtn = $(`#${yesHidPId}`);
        if (data.hidden == 'No') {
            $(`#${tryHid}`).text('Hide');
            $(`#${askHid}`).text('hide post');
            yesBtn.click(()=>{
                var pData = {
                    section: 'journals',
                    type: 'hide',
                    post: data._id,
                    hide: 'Yes'
                };
                postData(pData);
                    var tg = 'prf';
                if (app.child_p == 'home') {
                    $('#opnHme').click();
                    tg = 'hme';
                }else {
                    if (app.child_p == 'profile') {
                        $('#opnPrf').click();
                        tg = 'prf';
                    }
                }
                getExisting(tg, app.child_p);
            });

        } else {
            $(`#${tryHid}`).text('Un-hide');
            $(`#${askHid}`).text('un-hide post');
            yesBtn.click(()=>{
                var pData = {
                    section: 'journals',
                    type: 'hide',
                    post: data._id,
                    hide: 'No'
                };
                postData(pData);
                var tg = 'hme';
                if (app.child_p == 'home') {
                    $('#opnHme').click();
                    tg = 'hme';
                }else {
                    if (app.child_p == 'profile') {
                        $('#opnPrf').click();
                        tg = 'prf';
                    }
                }
                getExisting(tg, app.child_p);
            });
        }
        const opnBtn = $(`#${hidPostId}`);
        const clseBtn = $(`#${noHidPId}`);

        // open btn
        opnBtn.click(()=>{
            $(`#${hidPMCId}`).slideUp();
            $(`#${hidPConId}`).slideDown();
        });
        // clse btn
        clseBtn.click(()=>{
            $(`#${hidPConId}`).slideUp();
            $(`#${hidPMCId}`).slideDown();
        });
    };

    // report jrn
    const reportJrn = (data, udata, reprtId, repConId, inApRep, abusRep, clsRep) => {
        // opn/ls
        $(`#${reprtId}`).click(()=>{
            $(`#${reprtId}`).slideUp();
            $(`#${repConId}`).slideDown();
        });
        $(`#${clsRep}`).click(()=>{
            $(`#${repConId}`).slideUp();
            $(`#${reprtId}`).slideDown();
        });

        // snd inap
        $(`#${inApRep}`).click(()=>{
           var con = 'Inappropriate content'; 
           pushRep(con);
        });
        // snd abus
        $(`#${abusRep}`).click(()=>{
            var con = 'Inappropriate content'; 
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
                section: 'journals',
                type: 'report',
                user: udata._id,
                post: data._id,
                con: con,
                name: nme,
            };
            postData(pData);
            $('#container-body').css('filter', 'blur(5px)');
            $('#alertText').text('report sent');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $(`#${repConId}`).slideUp();
            $(`#${reprtId}`).slideDown();
        };

    };

    // SmartDate Func
    const smartDate = (data, dateFlow) => {
        if (data.date[0] !== year) {
            $(`#${dateFlow}`).text(`${data.date[2]} ${data.date[1]}, ${data.date[0]}`);
        }
        if (data.date[0] == year && data.date[2] == month && data.date[1] == day) {
            $(`#${dateFlow}`).html(`<strong style="font-size:10px;">Today.</strong> ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] == month && day - data.date[1] == 1) {
            $(`#${dateFlow}`).html(`<strong style="font-size:10px;">Yesterday.</strong> ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] == month && day - data.date[1] !== 1 && data.date[1] !== day) {
            $(`#${dateFlow}`).text(`${data.date[2]} ${data.date[1]}, ${data.date[3]}:${data.date[4]}`);
        }
        if (data.date[0] == year && data.date[2] !== month) {
            $(`#${dateFlow}`).text(`${data.date[2]} ${data.date[1]}, ${data.date[3]}:${data.date[4]}`);
        }

    }; 

    // user authentication
    const usrAuthent = (data, usrAut, autSrcs) => {
        $(`.${usrAut}`).css('display', 'block');
        $(`.${autSrcs}`).remove();
    };
    
    /**
     * AUTHOR AUTHENTICATIONS
     */
    const authorAut = (data, udata, tpe, autSrcs, usrAut, ids) => {
        $(`.${autSrcs}`).css('display', 'block');
        //$(`.${usrAut}`).remove();
        if (tpe == 'adm aut') {
            $(`#${ids.autInfo}`).text('vyral author');
            for (let i = 0; i < data.categories.length; i++) {
                $(`#${ids.autCats}`).append(`${data.categories[i]}, `);
            }
            $(`#${ids.autCats}`).append(data.country);
            $(`#${ids.autLoc}`).text(data.location);
        } else {
            var alldata = db.users;
            var thisU = '';
            for (let o = 0; o < alldata.length; o++) {
                if (alldata[o]._id == data.user) {
                    thisU = alldata[o];
                }
            }
            $(`#${ids.autInfo}`).text(`${thisU.user_name}`);
            $(`#${ids.autInfo}`).addClass(ids.userIdEx);
            for (let i = 0; i < thisU.user_type.categories.length; i++) {
                $(`#${ids.autCats}`).append(`${thisU.user_type.categories[i]}, `);
            }
            $(`#${ids.autLoc}`).text(thisU.country);
            $(`#${ids.infoSrc}`).remove();
            idExFunc(data, udata, ids.userIdEx, ids.adptCart);
        }
    };

    // cart authenti
    const adptCart = (data, adptCart) => {
        if (data.type == 'Author') {
            if (data.categories.length > 0) {
                for (let i = 0; i < data.categories.length; i++) {
                    $(`#${adptCart}`).addClass(data.categories[i]);
                }
            }
        }
    };

    const adptLocale = (data, adptCart) => {
        if (data.type == 'Author') {
            $(`#${adptCart}`).addClass(data.location);
            $(`#${adptCart}`).addClass('Author');
        }
    };

    const idExFunc = (data, udata, userIdEx, bodyId) => {
        
        if (data.type == 'User' || data.type == 'User_author') {
            var lcl = db.generalCol[0];
            if (lcl) {
                for (let i = 0; i < lcl.locales.length; i++) {
                    for (let p = 0; p < lcl.locales[i].Countries.length; p++) {
                        if (lcl.locales[i].Countries[p] == udata.country) {
                            $(`#${bodyId}`).addClass(`${lcl.locales[i].Continent}`);
                            $(`#${bodyId}`).addClass(`${lcl.locales[i].Countries[p]}`);
                        }
                    }
                }
            }
            $(`#${userIdEx}, .${userIdEx}`).click(()=>{
                if (data.user == udata._id) {
                    $('#opnPrf').click();
                }else {
                    $('.ex-slider').remove();
                    global.ex_user = data.user;
                    global.ex_flag = 'y';
                }
            })
        }

    };
    
     // build ids for functionalities
    const buildIDS = (id) => {
        return {
            // smart date func
            dateFlow: 'dateFlow_' + id, 
            dateFlowAut: 'dateFlowAut_' + id, 
            // user id ext 
            userIdEx: 'userIdEx_' + id,
            // like func
            likeId : 'like_' + id,
            likedBy: 'liked_'+ id,
            // read body func
            readId : 'read_' + id,
            readBy: 'readBy_' + id,
            bodyId : 'body_' + id,
            closeRdId : 'closeRead_'+ id,
            // comnt func
            openCom: 'openCom_' + id,
            comBod: 'comBod_' + id,
            closeCom: 'closeCom_' + id,
            comIn: 'comIn_' + id,
            comBt: 'comBtn_' + id,
            comFlow: 'comFlow_' + id,
            cmntBy: 'cmntBy_' + id,
            comntLen: 'cmntLen_' + id,
            // tag func
            tagedId: 'tagedId_' + id,
            tagedBod: 'tagedBod_' + id,
            closeTag: 'closeTag_' + id,
            tagedFlw: 'tagedFlw_' + id,
            // share pst funcs
            shrPst: 'shrPst_' + id,
            shrPstBd: 'shrPstBd_' + id,
            shrPstFlw: 'shrPstFlw_' + id,
            shrPstCls: 'shrPstCls_' + id,
            shrPstSrch: 'shrPstSrch_' + id,
            // img func
            ImgId: 'ImgId_' + id,
            imSldId: 'imgSld_' + id,
            rightId: 'rghId_' + id,
            leftId: 'lftId_' + id,
            imgNow: 'imgNow_' + id,
            imgAll: 'imgAll_' + id,
            // video func
            vidId: 'vidId_' + id,
            vidCntrlDiv: 'vidCntrlDiv_' + id,
            vidPlay: 'vidPlay_' + id,
            vidPause: 'vidPause_' + id,
            vidStop: 'vidStop_' + id,
            vidMute: 'vidMute_' + id,
            vidCrntT: 'vidCrntT_' + id,
            vidOrgT: 'vidOrgT_' + id,
            // post pop up funcs
            openPopId: 'openPop_' + id,
            popBodId: 'popBod_' + id,
            clsePopId: 'clsePop_' + id,
            edtPost: 'edtPost_' + id,
            // edt funcs
            donEdtPost: 'donEdtPost_' + id,
            // delete post funcs
            delPMCId: 'delPMCId_' + id,
            delPostId: 'delPost_' + id,
            delPConId: 'delPCOn_' + id,
            yesDelPId: 'yesDelP_' + id,
            noDelPId: 'noDelP_' + id,
            // hide post funcs
            hidPMCId: 'hidPMCId_' + id,
            hidPostId: 'hidPostId_' + id,
            tryHid: 'tryHid_' + id,
            hidPConId: 'hidPConId_' + id,
            askHid: 'askHid_' + id,
            yesHidPId: 'yesHidPId_' + id,
            noHidPId: 'noHidPId_' + id,
            // promote func
            promId: 'promId_' + id,
            // report post func
            reprtId: 'reprtId_' + id,
            repConId: 'repConId_' + id,
            inApRep: 'inApRep_' + id,
            abusRep: 'abusRep_' + id,
            clsRep: 'clsRep_' + id,
            // users auth
            usrAut: 'usrAut_' + id,
            verIcon: 'verIconJrn_' + id,
            // author info area
            autSrcs: 'autSrcs_' + id,
            adptCart: 'adptCart_' + id,
            autInfo: 'autInfo_'+ id,
            autCats: 'autCats_'+ id,
            autLoc: 'autLoc_'+ id,
            infoSrc: 'infoSrc_'+ id
            
        }
    }
     // display posts function
    const displayPosts = (data, udata, tg) => {
        let ids = buildIDS(`${data._id}_${tg}`);
        // hidden or not
        if (data.hidden == 'No') {
            if (tg == 'hme') {
                $('#dropbox-jrn-main').prepend(bodyJourn(data, udata, ids));
            }
            if (tg == 'prf') {
                console.log('drop in profile!');
                $('#dropbox-jrn-prf').prepend(bodyJourn(data, udata, ids));
            }
            if (tg == 'exp') {
                $('#dropbox-indexexp').prepend(bodyJourn(data, udata, ids));
            }
            if (tg == 'rdJ_rt') {
                $('#exp_drpMR').append(bodyJourn(data, udata, ids));
            }
            if (tg == 'ascJ_rt') {
                $('#exp_drpMA').append(bodyJourn(data, udata, ids));
            }
            if (tg == 'lkJ_rt') {
                $('#exp_drpML').append(bodyJourn(data, udata, ids));
            }
            if (tg == 'cmtJ_rt') {
                $('#exp_drpMC').append(bodyJourn(data, udata, ids));
            }
            // all in exp
            if (tg == 'all_exp') {
                $('#dropbox-indexexp').prepend(bodyJourn(data, udata, ids));
            }
        } else {
            $('#checknum-hd').css('display', 'none');
            $('#dropbox-hd').prepend(bodyJourn(data, udata, ids));
        }
        if (udata.verification == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        // with/without imgs
        if (data.img.length > 0) {
            ImgFunc(data, ids.ImgId, ids.rightId, ids.leftId, ids.imSldId, ids.imgNow, ids.imgAll);
        }
        // with a video
        if (data.vid !== '') {
            VidFunc(data, ids.vidId, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
        }
        checkMode(); Dark();
        // user autentications
        usrAuthent(data, ids.usrAut, ids.autSrcs);
        // cart authenti
        adptCart(data, ids.adptCart);
        // functionalities
        LikePost(data, udata, ids.likeId, ids.likedBy);
        likedImg(data, udata, ids.likeId, ids.likedBy)
        // like LEP
        likeLEP(data, udata, ids.likeId, ids.likedBy);
        // read
        readPost(data, udata, ids.readId, ids.readBy, ids.bodyId, ids.comBod);
        CloseRead(data, ids.closeRdId, ids.bodyId);
        // comments functionalities
        commentSec(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        commentImg(data, udata, ids.openCom, ids.comntLen);
        closeComment(data, ids.closeCom, ids.comBod);
        pushComment(data, udata, ids.comBod, ids.bodyId, ids.comIn, ids.comBt, ids.comFlow, ids.openCom, ids.cmntBy, ids.comntLen);
        // com LEP
        //comLep(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        // tag funcs 
        openTagd(data, ids.tagedId, ids.tagedBod, ids.tagedFlw, ids.closeTag);
        // share funcs
        sharePst(data, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls);
        // post opt funcs
        postPop(data, udata, ids.openPopId, ids.popBodId, ids.clsePopId, ids.reprtId, ids.promId, ids.edtPost, ids.donEdtPost, ids.hidPMCId, ids.delPMCId);
        deletePost(data, ids.delPMCId, ids.delPostId, ids.delPConId, ids.yesDelPId, ids.noDelPId);
        hidePost(data, ids.hidPMCId, ids.hidPostId, ids.tryHid, ids.hidPConId, ids.askHid, ids.yesHidPId, ids.noHidPId);
        //promFunc(data, ids.promId);
        // id ex
        idExFunc(data, udata, ids.userIdEx, ids.adptCart);
        smartDate(data, ids.dateFlow);
    };
    // dsplay for exUser
    const displayExuser = (data, mydata, udata, drop) => {
        let ids = buildIDS(`_exUsr_`+data._id);
        if (data.hidden == 'No') {
            $(`#${drop}`).prepend(bodyJourn(data, mydata, ids));
        }
        // with/without imgs
        if (data.img.length > 0) {
            ImgFunc(data, ids.ImgId, ids.rightId, ids.leftId, ids.imSldId, ids.imgNow, ids.imgAll);
        }
        // with a video
        if (data.vid !== '') {
            VidFunc(data, ids.vidId, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
        }
        if (mydata.verification == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        checkMode(); Dark();
        // user autentications
        usrAuthent(data, ids.usrAut, ids.autSrcs);
        // cart authenti
        adptCart(data, ids.adptCart);
        // functionalities
        LikePost(data, udata, ids.likeId, ids.likedBy);
        likedImg(data, udata, ids.likeId, ids.likedBy);
        // like LEP
        likeLEP(data, udata, ids.likeId, ids.likedBy);
        // read
        readPost(data, udata, ids.readId, ids.readBy, ids.bodyId, ids.comBod);
        CloseRead(data, ids.closeRdId, ids.bodyId);
        // comments functionalities
        commentSec(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        commentImg(data, udata, ids.openCom, ids.comntLen);
        closeComment(data, ids.closeCom, ids.comBod);
        pushComment(data, udata, ids.comBod, ids.bodyId, ids.comIn, ids.comBt, ids.comFlow, ids.openCom, ids.cmntBy, ids.comntLen);
        // com LEP
        //comLep(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        // tag funcs
        openTagd(data, ids.tagedId, ids.tagedBod, ids.tagedFlw, ids.closeTag);
        // share funcs
        sharePst(data, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls);
        // post opt funcs
        postPop(data, udata, ids.openPopId, ids.popBodId, ids.clsePopId, ids.reprtId, ids.promId, ids.edtPost, ids.donEdtPost, ids.hidPMCId, ids.delPMCId);
        deletePost(data, ids.delPMCId, ids.delPostId, ids.delPConId, ids.yesDelPId, ids.noDelPId);
        hidePost(data, ids.hidPMCId, ids.hidPostId, ids.tryHid, ids.hidPConId, ids.askHid, ids.yesHidPId, ids.noHidPId);
        //promFunc(data, ids.promId);
        // report p
        reportJrn(data, udata, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
        // id ex
        idExFunc(data, udata, ids.userIdEx, ids.adptCart);
        smartDate(data, ids.dateFlow);
    };
    // display for frnds
    const displayPFrnds = (data, tdata, udata, tg) => {
        let ids = buildIDS(`${data._id}_${tg}`);
        if (data.hidden == 'No') {
            if (tg == 'hme') {
                $('#dropbox-jrn-main').prepend(bodyJourn(data, tdata, ids));
            }
            if (tg == 'exp') {
                $('#dropbox-indexexp').prepend(bodyJourn(data, tdata, ids));
            }
        }
        // with/without imgs
        if (data.img.length > 0) {
            ImgFunc(data, ids.ImgId, ids.rightId, ids.leftId, ids.imSldId, ids.imgNow, ids.imgAll);
        }
        // with a video
        if (data.vid !== '') {
            VidFunc(data, ids.vidId, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
        }
        if (tdata.verification == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        checkMode(); Dark();
        // user autentications
        usrAuthent(data, ids.usrAut, ids.autSrcs);
        // cart authenti
        adptCart(data, ids.adptCart);
        // functionalities
        LikePost(data, udata, ids.likeId, ids.likedBy);
        likedImg(data, udata, ids.likeId, ids.likedBy);
        // like LEP
        likeLEP(data, udata, ids.likeId, ids.likedBy);
        // read
        readPost(data, udata, ids.readId, ids.readBy, ids.bodyId, ids.comBod);
        CloseRead(data, ids.closeRdId, ids.bodyId);
        // comments functionalities
        commentSec(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        commentImg(data, udata, ids.openCom, ids.comntLen);
        closeComment(data, ids.closeCom, ids.comBod);
        pushComment(data, udata, ids.comBod, ids.bodyId, ids.comIn, ids.comBt, ids.comFlow, ids.openCom, ids.cmntBy, ids.comntLen);
        // com LEP
        //comLep(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        // tag funcs
        openTagd(data, ids.tagedId, ids.tagedBod, ids.tagedFlw, ids.closeTag);
        // share funcs
        sharePst(data, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls);
        // post opt funcs
        postPop(data, udata, ids.openPopId, ids.popBodId, ids.clsePopId, ids.reprtId, ids.promId, ids.edtPost, ids.donEdtPost, ids.hidPMCId, ids.delPMCId);
        deletePost(data, ids.delPMCId, ids.delPostId, ids.delPConId, ids.yesDelPId, ids.noDelPId);
        hidePost(data, ids.hidPMCId, ids.hidPostId, ids.tryHid, ids.hidPConId, ids.askHid, ids.yesHidPId, ids.noHidPId);
        //promFunc(data, ids.promId);
        // report p
        reportJrn(data, udata, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
        // id ex
        idExFunc(data, udata, ids.userIdEx, ids.adptCart);
        smartDate(data, ids.dateFlow);
    };
    // for authors
    const displayAuthors = (data, udata, dT) => {
        var ids = '';
        if (dT.type) {
            ids = buildIDS(`${data._id}_${dT.type}`);
        } else {
            ids = buildIDS(`${data._id}_${dT}`);
        }
        if (data.type == 'Author') {
            //$('#dropbox-hd').append(bodyJourn(data, udata, ids));
            $('#dropbox-jrn-main').prepend(bodyJourn(data, udata, ids));
            var tpe = 'adm aut';
            authorAut(data, udata, tpe, ids.autSrcs, ids.usrAut, ids);
        }
        if (data.type == 'User_author') {
            if (dT.type) {
                $(`#${dT.drop}`).prepend(bodyJourn(data, udata, ids));
            } else {
                if (dT == "general") {
                    $('#dropbox-jrn-main').prepend(bodyJourn(data, udata, ids));
                }
                if (dT == "me_aut") {
                    $('#dropbox-aut-prf').prepend(bodyJourn(data, udata, ids));
                }
                if (dT == 'rdJ_rt') {
                    $('#exp_drpMR').append(bodyJourn(data, udata, ids));
                }
                if (dT == 'ascJ_rt') {
                    $('#exp_drpMA').append(bodyJourn(data, udata, ids));
                }
                if (dT == 'lkJ_rt') {
                    $('#exp_drpML').append(bodyJourn(data, udata, ids));
                }
                if (dT == 'cmtJ_rt') {
                    $('#exp_drpMC').append(bodyJourn(data, udata, ids));
                }
                // all in exp
                if (dT == 'all_exp') {
                    $('#dropbox-indexexp').prepend(bodyJourn(data, udata, ids));
                }
            }
            var tpe = 'usr aut';
            authorAut(data, udata, tpe, ids.autSrcs, ids.usrAut, ids);
        }
        smartDate(data, ids.dateFlow);
        smartDate(data, ids.dateFlowAut);
        // with/without imgs
        if (data.img.length > 0) {
            ImgFunc(data, ids.ImgId, ids.rightId, ids.leftId, ids.imSldId, ids.imgNow, ids.imgAll);
        }
        // with a video
        if (data.vid !== '' && data.vid !== "") {
            VidFunc(data, ids.vidId, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
        }
        checkMode(); Dark();
        // cart authenti
        adptCart(data, ids.adptCart);
        adptLocale(data, ids.adptCart);
        // functionalities
        LikePost(data, udata, ids.likeId, ids.likedBy);
        likedImg(data, udata, ids.likeId, ids.likedBy);
        // like LEP
        likeLEP(data, udata, ids.likeId, ids.likedBy);
        // read
        readPost(data, udata, ids.readId, ids.readBy, ids.bodyId, ids.comBod);
        CloseRead(data, ids.closeRdId, ids.bodyId);
        // comments functionalities
        commentSec(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        commentImg(data, udata, ids.openCom, ids.comntLen);
        closeComment(data, ids.closeCom, ids.comBod);
        pushComment(data, udata, ids.comBod, ids.bodyId, ids.comIn, ids.comBt, ids.comFlow, ids.openCom, ids.cmntBy, ids.comntLen);
        // com LEP
        //comLep(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        // tag funcs
        openTagd(data, ids.tagedId, ids.tagedBod, ids.tagedFlw, ids.closeTag);
        // share funcs
        sharePst(data, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls);
        // post opt funcs
        postPop(data, udata, ids.openPopId, ids.popBodId, ids.clsePopId, ids.reprtId, ids.promId, ids.edtPost, ids.donEdtPost, ids.hidPMCId, ids.delPMCId);
        deletePost(data, ids.delPMCId, ids.delPostId, ids.delPConId, ids.yesDelPId, ids.noDelPId);
        hidePost(data, ids.hidPMCId, ids.hidPostId, ids.tryHid, ids.hidPConId, ids.askHid, ids.yesHidPId, ids.noHidPId);
        //promFunc(data, ids.promId);
        // report p
        reportJrn(data, udata, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
        checkMode();
    };
    // display rev-posts function
    const displayReviews = (data, udata, type) => {
        let ids = buildIDS(data._id+'_revNoti_');
        //$('#container-one').fadeOut();
        // hidden or not
        $('#review-con').fadeIn();
        if (type == 'like_post') {
            $('#revPresNote').text('Journal liked');
           $('#drp-like-tag-rev-bod').fadeIn();
           $('#droprev-lktg').append(bodyJourn(data, udata, ids));
           // with/without imgs
        }
        if (type == 'tag_post') {
            $('#revPresNote').text('tagged to a Journal');
            $('#drp-like-tag-rev-bod').fadeIn();
            $('#droprev-lktg').append(bodyJourn(data, udata, ids));
        }
        if (type == 'shr_post') {
           $('#revPresNote').text('shared to a Journal');
           $('#drp-like-tag-rev-bod').fadeIn();
           $('#droprev-lktg').append(bodyJourn(data, udata, ids));
        }
        if (type == 'src_jrn') {
            $('#revPresNote').text('searched Journal');
            $('#droprev-lktg').append(bodyJourn(data, udata, ids));
        }
        if (type == 'comment_post') {
            let cids = comIdsNoti(data);
           $('#revPresNote').text('commented on Journal');
           $('#drp-like-tag-rev-bod').fadeIn();
           $('#droprev-lktg').append(comsBod(udata, cids.drpId, cids.bodyComId));
           $(`#${cids.bodyComId}`).after(`<p style="margin:5px; font-size:13px;" class="sub_h">journal :</p>`+bodyJourn(data, udata, ids));
           Dark();
           const fetchSpecCom = (com, data) => {
               var ext = db.all_posts.find(i=>i._id == data._id);
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
                    $(`#${cids.drpId}`).append(comBodLyt(com, user, cids, slc, dispMre));
                }else {
                     $(`#${cids.drpId}`).prepend(comBodDrk(com, user, cids, slc, dispMre));
                }
                if (user.verification == 'on') {
                    $(`#${cids.verIconCom}`).css('display', 'inline');
                }
                Dark();
           };
           var coms = global.rev_coms;
           fetchSpecCom(coms, data);
        }
        if (data.img.length > 0) {
            ImgFunc(data, ids.ImgId, ids.rightId, ids.leftId, ids.imSldId, ids.imgNow, ids.imgAll);
        }
        // with a video
        if (data.vid !== '' && data.vid !== "") {
            VidFunc(data, ids.vidId, ids.vidCntrlDiv, ids.vidPlay, ids.vidPause, ids.vidStop, ids.vidMute, ids.vidCrntT, ids.vidOrgT);
        }
        if (data.type == 'Author') {
            //$('#dropbox-hd').append(bodyJourn(data, udata, ids));
            var tpe = 'adm aut';
            authorAut(data, udata, tpe, ids.autSrcs, ids.usrAut, ids);
        }
        if (data.type == 'User_author') {
            var tpe = 'usr aut';
            authorAut(data, udata, tpe, ids.autSrcs, ids.usrAut, ids);
        }
        if (data.type == 'User') {
            usrAuthent(data, ids.usrAut, ids.autSrcs);
        }
        Dark();
        // functionalities
        LikePost(data, udata, ids.likeId, ids.likedBy);
        likedImg(data, udata, ids.likeId, ids.likedBy);
        // like LEP
        likeLEP(data, udata, ids.likeId, ids.likedBy);
        // read
        readPost(data, udata, ids.readId, ids.readBy, ids.bodyId, ids.comBod);
        CloseRead(data, ids.closeRdId, ids.bodyId);
       // comments functionalities
        commentSec(data, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        commentImg(data, udata, ids.openCom, ids.comntLen);
        closeComment(data, ids.closeCom, ids.comBod);
        pushComment(data, udata, ids.comBod, ids.bodyId, ids.comIn, ids.comBt, ids.comFlow, ids.openCom, ids.cmntBy, ids.comntLen);
       // tag funcs
       openTagd(data, ids.tagedId, ids.tagedBod, ids.tagedFlw, ids.closeTag);
       // share funcs
       sharePst(data, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls);
       // post opt funcs
       postPop(data, udata, ids.openPopId, ids.popBodId, ids.clsePopId, ids.reprtId, ids.promId, ids.edtPost, ids.donEdtPost, ids.hidPMCId, ids.delPMCId);
       deletePost(data, ids.delPMCId, ids.delPostId, ids.delPConId, ids.yesDelPId, ids.noDelPId);
       hidePost(data, ids.hidPMCId, ids.hidPostId, ids.tryHid, ids.hidPConId, ids.askHid, ids.yesHidPId, ids.noHidPId);
       //promFunc(data, ids.promId);
       // report p
       reportJrn(data, udata, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
       smartDate(data, ids.dateFlow);
       checkMode();
    };

   /**
    * BOOK SECTION
    */
    // book body
    const bookBig = (data, user, udata, ids) => {
        var loc = user.country;
        return `
        <div class="stylePosts" style="width:100%;" id="${ids.adptCart}" class="${loc}">
            <div style="width:100%; height:30px;" class="${ids.autSrcs}">
                <div style="float:left; width:18px; height:18px; margin:auto; background-image:url(assets/imgs/authand.png); background-size:100% 100%; margin:5px;"></div>
                <p class="postHeaderfrst" style="float:left; font-size:14px; margin:0px; padding:5px; height:20px;" id="${ids.autInfo}"> 
                </p>
                <img src="assets/imgs/opt.png" id="${ids.openPopId}" alt="" width="5px" height="20px" style="margin:5px; float:right; cursor:pointer;">
                <i class="postDatefrst" style="float:right; margin:5px; color:silver; font-size:10px;" id="${ids.dateFlowAut}"></i>
            </div>
            <div class="edtPstBd" id="${ids.popBodId}" style="width:100%; display:none;">
                <div class="edtPstFlw" style="width:100%; height:35px;">
                    <p style="text-align:center; margin:0px; padding:3px;"><img id="${ids.clsePopId}" src="assets/imgs/up.png" width="25px" height="15px" style="cursor:pointer;"></p>
                </div>
                <!-- delp cons -->
                <div id="${ids.delPMCId}" class="edtPstFlw" style="width:100%; height:35px;">
                    <p id="${ids.delPostId}" class="sub_h" style="margin:8px; cursor:pointer;"> <img src="assets/imgs/del.png" width="12.5px" height="15px" style="margin-right:10px;"> Delete post</p>
                </div>
                <div id="${ids.delPConId}" class="areYSPCon" style="width:100%; height:60px; display:none;">
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p class="sub_h" style="text-align:center; margin:0px; padding:5px;"> Are you sure you want to delete post?</p>
                    </div>
                    <div style="width:100%; height:30px;">
                        <div class="yesesP" style="width:49%; float:left; height:100%; float:left;">
                            <p id="${ids.yesDelPId}" style="text-align:center; color:orangered; margin:5px; cursor:pointer;">Yes</p>
                        </div>
                        <div style="width:49%; float:left; height:100%; float:right;">
                            <p class="sub_h" id="${ids.noDelPId}" style="text-align:center; margin:5px; cursor:pointer;">Cancel</p>
                        </div>
                    </div>
                </div>
                <!-- edt cons -->
                <div id="${ids.edtPost}" class="edtPstFlw" style="width:100%; height:35px;">
                    <p class="sub_h" style="margin:8px; cursor:pointer;"> <img src="assets/imgs/wada.png" width="12.5px" height="15px" style="margin-right:10px;"> Edit post</p>
                </div>
                <!-- prom cons -->
                <div id="${ids.promId}" class="" style="width:100%; height:35px;">
                    <p style="margin:8px; color:skyblue; cursor:pointer;">Promote</p>
                </div>
                <!-- report cons -->
                <div id="${ids.reprtId}" class="" style="width:100%; height:35px;">
                    <p class="sub_h" style="margin:8px; cursor:pointer;"> <img src="assets/imgs/flag.png" width="15px" height="15px" style="margin-right:10px;"> Report post</p>
                </div>
                <div id="${ids.repConId}" class="areYSPCon" style="width:100%; display:none;">
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.inApRep}"> Inapproriate content </p>
                    </div>
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p style="color:orangered; text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.abusRep}"> Abusive content </p>
                    </div>
                    <div class="areysPP" style="width:100%; height:30px;">
                        <p class="sub_h" style="text-align:center; margin:0px; padding:5px; cursor:pointer;" id="${ids.clsRep}"> cancel </p>
                    </div>
                </div>
            </div>
            <div style="width:100%; height:220px;" class="posterClosecon_edt">
                <div style="width:60%; height:215px; float:left;" id="${ids.allBCvrCon}">
                    <div style="box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.25); margin:auto; width:150px; height:180px; margin-top:10px; border-radius:5px; background-image:url(https://test-vyral.onrender.com/${data.cover.path}); background-size:100% 100%;" class="${data.cover.class} ${ids.readId}" id="${ids.coverId}"></div>
                </div>
                <div style="width:40%; height:215px; float:right;">
                    <br>
                    <div class="${ids.prevB}" style="width:70px; height:80px; margin:auto; margin-top:10px; background-image:url(assets/imgs/bookinf.png); background-size:100% 100%; cursor:pointer; opacity:0.75;">
                    </div>
                    <p class="${ids.prevB}" style="text-align:center; margin:3px; padding:3px; cursor:pointer;"><button class="btn btn-default btn-xs" style="background-color:transparent; border:solid 1px silver; color:silver;">preview</button></p>
                </div>
            </div>
            <div style="width:100%; margin:auto;">
                <p class="postHeaderfrst sub_h" style="padding:5px; margin:5px; text-align:center; font-weight:normal; font-size:17px;" id=""><span style="font-size:12px; font-weight:normal;">book - </span> ${data.title}</p>
            </div>
            <div style="width:100%; height:35px;">
                <div style="float:left; margin:5px;"><img id="${ids.likeId}" src="assets/imgs/like.png" alt="" width="20px" height="20px" style="cursor:pointer;"> <i id="${ids.likedBy}" style="font-size:11px; color:darkorange;">${data.likedBy.length}</i> </div>
                <div style="float:left; margin:5px;"><img id="${ids.openCom}" src="assets/imgs/comment.png" alt="" width="20px" height="20px" style="cursor:pointer;"> <i id="${ids.comntLen}" style="font-size:11px; color:darkorange;">${data.comments.length}</i> </div>
                <div style="float:left; margin:5px;"><img id="${ids.readId}" src="assets/imgs/readen.png" alt="" width="20px" height="20px" style="cursor:pointer;">
                <i id="${ids.readBy}" style="font-size:11px; color:darkorange; display:none;">${data.reads.length}</i> </div>
                <img id="${ids.shrPst}" src="assets/imgs/share.png" alt="" width="20px" height="20px" style="margin:5px; float:right; margin-right:10px; cursor:pointer;">
            </div>
            <!-- comment area bellow -->
            <div class="postBodyCon" id="${ids.comBod}" style="width:98%; margin:auto; height:300px; border-radius:5px; padding-bottom:5px; display:none;">
                <div style="width:100%; height:200px; overflow-y:auto;">
                    <br>
                    <span id="${ids.comFlow}" class="comFlow"></span>
                    <br>
                </div>
                <div class="commentIn" style="height:50px;">
                    <textarea class="commentInput" placeholder="comment" style="margin:5px; width:70%; float:left; border-radius:5px; color:darkorange;" id="${ids.comIn}"></textarea>
                    <img src="assets/imgs/send.png" width="35px" height="35px" style="float:left; margin:5px;" id="${ids.comBt}">
                </div>
                <div class="closeRdCon" style="width:100%; height:35px; overflow-y:auto;">
                    <p id="${ids.closeCom}" style="margin:0px; text-align:center; cursor:pointer;">
                        <img src="assets/imgs/up.png" width="20px" height="10px">
                    </p>
                </div>
            </div>
            <!-- share content area -->
            <div class="postBodyCon" id="${ids.shrPstBd}" style="width:98%; margin:auto; height:240px; border-radius:5px; padding-bottom:5px; display:none;">
                <div class="srchCon" style="width:100%; height:30px; overflow-y:auto;">
                    <p id="" style="margin:3.5px; text-align:center; cursor:pointer;">
                        <input id="${ids.shrPstSrch}" placeholder="search friends" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; width:80%; height:80%; margin:1.5px; border:none; border-radius:7.5px;" class="srchCon_tg sub_h">
                        <img src="assets/imgs/searcha.png" width="15px" height="15px" style="float:right; margin:2.5px;">
                    </p>
                </div>
                <div style="width:100%; height:175px; overflow-y:auto;">
                    <span id="${ids.shrPstFlw}"></span>
                </div>
                <div class="closeRdCon" style="width:100%; height:5px; overflow-y:auto;">
                    <p id="${ids.shrPstCls}" style="margin:1px; text-align:center; cursor:pointer;">
                        <img src="assets/imgs/up.png" width="20px" height="10px">
                    </p>
                </div>
            </div>
            <!-- author cont area -->
            <div style="width:100%;" class="${ids.autSrcs}">
                <p style="padding:3px; margin:0px; font-size:12px; color:silver;" id=""><span id="${ids.autCats}"></span> <strong>-</strong> <i style="font-size:10px;" id="${ids.autLoc}"></i> </p>
                <div style="width:98%; margin:auto; height:200px; background-color:#f9f9f9; border-radius:5px; padding-bottom:5px; border:solid 1px #f0f0f0; display:none;" id=""></div>
                <div style="height:20px;" id="${ids.infoSrc}">
                    <p class="sub_h" style="font-size:10px; margin:0px; padding:5px;"> Source : <a href="${data.source_page}"> <i class="sub_h" style="font-size:11.5px;">${data.source}</i> </a></p>
                </div>
            </div>
            <div style="height:10px;"></div>
        </div>
        `
    }
    const reedBook = (book, udata, ids) => {

        // preview
        // --------
        const prevCon = (pIds, ind) => {
            return `
            <div class="row">
                <div class="col-xs-12 col-lg-12 prevCons" id="${pIds.bodyI}" style="position:fixed; z-index:${ind}; height:100%; display:none;">
                    <div class="row">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4 col-xs-12">
                            <br>
                            <div class="bookBods" style="width:100%; height:350px; margin-top:-5px; border-radius:7.5px; box-shadow:0px 0px 15px -5px rgba(0, 0, 0, 0.3);">
                                <div style="width:100%; height:40px;">
                                    <p style="text-align:center; margin:0px; padding:5px;"> <img src="assets/imgs/can.png" width="15px" height="15px" style="cursor:pointer;" id="${pIds.clsCon}"> </p>
                                </div>
                                <div style="width:100%; height:270px; ">
                                    <div class="chptrsCr" style="width:97.5%; height:100%; margin:auto; border-radius:5px; overflow-y:auto; overflow-x: hidden;">
                                        <p style="margin:1px; padding:5px; white-space: pre-wrap; font-weight:normal; font-size:17px; white-space: pre-wrap;" class="postHeaderfrst">${book.read_me}</p>
                                    </div>
                                </div>
                                <div style="width:100%; height:40px;">
                                    <p class="sub_h" style="text-align:center; margin:0px; padding:5px; font-size:18px;">content information</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4"></div>
                    </div>
                </div>
            </div>
            `
        }
        $(`.${ids.prevB}`).click(()=>{
            var pIds = {
                clsCon: `previewB_clsCon_${book._id}`,
                bodyI: `previewB_bodyI_${book._id}`
            }
            $('#container-body').css('filter', 'blur(5px)');
            global.pop_no++;
            var ind = global.pop_no;
            $('#dropChat').prepend(prevCon(pIds, ind));
            checkMode(); Dark();
            $(`#${pIds.bodyI}`).fadeIn();
            // cls
            $(`#${pIds.clsCon}`).click(()=>{
                global.pop_no--;
                $('.prevCons').fadeOut();    
                $('#container-body').css('filter', '');
                $('.prevCons').remove();    
            });
        });

        // read funcs
        // ----------
        const readBX = (bIds, ind, usr) => {
            return `
            <div class="row" id="${bIds.bodyId}" style="display:none;">
                <div class="col-xs-12 col-lg-12 bookBods" style="height:100%; position:fixed; z-index:${ind};">
                    <div style="width:100%; height:6%;">
                        <div style="float:left; width:18px; height:18px; background-image:url(assets/imgs/authand.png); background-size:100% 100%; margin:5px; margin-top:8.5px;"></div>
                        <p class="sub_h" style="float:left; margin:0px; margin-top:3.5px; padding:5px; font-size:14px;">user author <strong>.</strong> ${usr.user_name}</p>
                        <p style="float:right; margin:0px; padding:5px;"><img src="assets/imgs/can.png" width="15px" height="15px" style="cursor:pointer;" id="${bIds.clsB}"></p>
                    </div>
                    <div style="width:100%; height:7%;" class="stylePosts">
                        <p class="postHeaderfrst sub_h" style="margin:0px; padding:5px; font-size:16.5px; text-align:center;" id="${bIds.chptrN}">${book.title}</p>
                    </div>
                    <div style="width:100%; height:69.5%;" class="stylePosts">
                        <div id="${bIds.cover}" style="width:98%; margin:auto; height:85%; margin-top:15px; border-radius:10px; background-image:url(https://test-vyral.onrender.com/${book.cover.path}); background-size:100% 100%; box-shadow:0px 0px 15px -5px rgba(0, 0, 0, 0.6);" class="${book.cover.class}"></div>
                        <div id="${bIds.chptrCon}" style="width:98%; margin:auto; height:95%; margin-top:5px; border-radius:10px; display:none; overflow-y:auto; overflow-x: hidden;" class="chptrsCr">
                            <p class="postHeaderfrst" style="margin:0px; padding:5px; font-size:18px;"><strong id="${bIds.chptrTtl}"></strong></p>
                            <p class="postHeaderfrst" id="${bIds.chptrBody}" style="margin:0px; padding:5px; font-size:16.5px; white-space: pre-wrap;"></p>
                        </div>
                    </div>
                    <div style="width:100%; height:18.5%;" class="stylePosts">
                        <br>
                        <div style="width:98%; margin:auto; height:110px; margin-top:-10px; overflow-x:auto; border-radius:10px;" class="chptrsCr">
                            <div id="${bIds.chptrLC}" style="width:170px; height:100%;">

                                <div style="width:80px; height:100%; float:left; cursor:pointer;" id="${bIds.opnCover}">
                                    <p style="text-align:center; color:silver; font-size:13px; margin:0px; padding:2px;">cover</p>
                                    <div id="${bIds.opnCvrBck}" style="margin:auto; width:65px; height:65px; border-radius:5px; border:solid 0.8px skyblue; cursor:pointer;" class="OpnChptrsCr">
                                        <div style="width:100%; height:100%; filter:blur(1px); background-image:url(https://test-vyral.onrender.com/${book.cover.path}); background-size:100% 110%; border-radius:5px; cursor:pointer;" class="${book.cover.class}">
                                        </div>
                                    </div>
                                </div>
                            
                                <div style="width:80px; height:100%; float:left; cursor:pointer;" id="${bIds.readMe}">
                                    <p style="text-align:center; color:silver; font-size:13px; margin:0px; padding:2px;">read me</p>
                                    <div id="${bIds.readMeCon}" style="margin:auto; width:65px; height:65px; border-radius:5px; cursor:pointer;" class="OpnChptrsCr">
                                        <img src="assets/imgs/bookinf.png" width="50px" height="50px" style="margin-left:7px; margin-top:7px; opacity:0.5;">
                                    </div>
                                </div>

                                <span id="${bIds.chptrLst}"></span>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        };
        const bookFuncs = (bIds) => {
            // cls
            $(`#${bIds.clsB}`).click(()=>{
                global.pop_no--;
                $(`.bookBods`).fadeOut();
                $(`.bookBods`).remove();
            });
            // chapter/cover/read_me
            var curn = 'c';
            // cover
            $(`#${bIds.opnCover}`).click(()=> {
                curn = 'c';
                $(`#${bIds.chptrN}`).text(book.title);
                $('.OpnChptrsCr').css('border', '');
                $(`#${bIds.opnCvrBck}`).css('border', 'solid 1px skyblue');
                $(`#${bIds.chptrCon}`).css('display', 'none');
                $(`#${bIds.cover}`).fadeIn();
            });
            // read me sect
            $(`#${bIds.readMe}`).click(()=> {
                curn = 'r';
                $('.OpnChptrsCr').css('border', '');
                $(`#${bIds.readMeCon}`).css('border', 'solid 1px skyblue');
                $(`#${bIds.cover}`).css('display', 'none');
                $(`#${bIds.chptrCon}`).fadeIn();
                $(`#${bIds.chptrN}`).text('read me');
                $(`#${bIds.chptrTtl}`).text('read me: all needed information for the book');
                $(`#${bIds.chptrBody}`).text(`${book.read_me}`);
            });
            // drop lst
            const chapterB = (cIds, i) => {
                return `
                <div style="float:left;" class="chpLsBdy" id="${cIds.body}">
                    <p class="postHeaderfrst" style="text-align:center; font-size:13px; margin:0px; padding:2px;">chapter</p>
                    <div id="${cIds.hold}" style="margin:auto; width:65px; height:65px; border-radius:5px; cursor:pointer;" class="OpnChptrsCr">
                        <br>
                        <p class="sub_h" style="text-align:center; font-size:30px; margin-top:-15px;">${i+1}</p>
                    </div>
                </div>
                `
            };
            const chapFuncs = (cIds, chap, i) => {
                $(`#${cIds.body}`).click(()=> {
                    curn = i;
                    $('.OpnChptrsCr').css('border', '');
                    $(`#${cIds.hold}`).css('border', 'solid 1px skyblue');
                    $(`#${bIds.cover}`).css('display', 'none');
                    $(`#${bIds.chptrCon}`).fadeIn();
                    $(`#${bIds.chptrN}`).text(`chapter ${i+1}`);
                    $(`#${bIds.chptrTtl}`).text(chap.title);
                    $(`#${bIds.chptrBody}`).text(`${chap.body}`);
                });
            };
            const createCids = (i) => {
                return {
                    body: `chptrLst_opn_body${i}`,
                    hold: `chptrLst_opn_hold${i}`,
                    remId: `chptrLst_opn_remId${i}`
                }
            };
            var tchp; var chpFW = $(`#${bIds.chptrLC}`).css('width');
            const chptrLst = (chap, i) => {
                const cIds = createCids(i);
                var x = window.matchMedia("(max-width: 600px)")
                if (x.matches) {
                    $(`#${bIds.chptrLC}`).css('width', `${tchp+200}px`);
                }
                $(`#${bIds.chptrLst}`).append(chapterB(cIds, i));
                var x = window.matchMedia("(max-width: 600px)")
                if (x.matches) {
                    $(`#${cIds.body}`).css('width', `100px`);
                    $(`#${cIds.body}`).css('height', `100%`);
                }else {
                    $(`#${cIds.body}`).css('width', `100%`);
                    $(`#${cIds.body}`).css('height', `100px`);
                }
                chapFuncs(cIds, chap, i);
                checkMode(); Dark();
            };
            for (let i = 0; i < book.chapters.length; i++) {
                var chpFWC = chpFW.slice(0, chpFW.length-2);
                tchp = Number(chpFWC);
                chptrLst(book.chapters[i], i);
            }
        };
        const createBIds = () => {
            return {
                bodyId: `bookIds_bodyId_${book._id}`,
                chptrN: `bookIds_chptrN_${book._id}`,
                clsB: `bookIds_clsB_${book._id}`,
                cover: `bookIds_cover_${book._id}`,
                chptrCon: `bookIds_chptrCon_${book._id}`,
                chptrTtl: `bookIds_chptrTtl_${book._id}`,
                chptrBody: `bookIds_chptrBody_${book._id}`,
                chptrLC: `bookIds_chptrLC_${book._id}`,
                opnCover: `bookIds_opnCover_${book._id}`,
                opnCvrBck: `bookIds_opnCvrBck_${book._id}`,
                readMe: `bookIds_readMe_${book._id}`,
                readMeCon: `bookIds_readMeCon_${book._id}`,
                chptrLst: `bookIds_chptrLst_${book._id}`,
            }
        }
        const dropBk = (usr) => {
            global.pop_no++;
            var ind = global.pop_no;
            const bIds = createBIds();
            $(`#${bIds.bodyId}`).remove();
            $('#dropChat').prepend(readBX(bIds, ind, usr));
            bookFuncs(bIds);
            checkMode();
            $(`#${bIds.bodyId}`).fadeIn("slow");
        };
        // data set
        var chkr = 0;
        if (book.reads.length > 0) {
            $(`#${ids.readBy}`).css('display', 'inline');
            for (let z = 0; z < book.reads.length; z++) {
                if (book.reads[z].user == udata._id) {
                    chkr++;
                    $(`#${ids.readId}`).attr('src', 'assets/imgs/read.png');
                    $(`#${ids.readIc}`).css('background-image', 'url(assets/imgs/read.png)');
                }                    
            }
        }
        if (chkr == 0) {
            $(`#${ids.readId}`).attr('src', 'assets/imgs/readen.png');
            $(`#${ids.readIc}`).css('background-image', 'url(assets/imgs/readen.png)');
        }
        $(`#${ids.readId}, .${ids.readId}, #${ids.readBtn}`).click(function() {
            $(`.postBodyCon`).slideUp();
            global.page_ld = 'y';
            //$(`#${ids.readId}`).attr('src', 'assets/imgs/readen.png');
            // view funcs
            var users = db.users;
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i]._id == book.user) {
                        dropBk(users[i]);
                    }
                }
            }
            // check & apply data
            var cnt = 0; var nowB = book;
            for (let i = 0; i < nowB.reads.length; i++) {
                if (nowB.reads[i].user == udata._id) {
                    cnt++;
                }
            }
            if (cnt == 0) {
                var pData = {
                    section: 'journals',
                    type: 'readBy',
                    id: book._id,
                    user: udata._id
                };
                postData(pData);
                $(`#${ids.readId}`).attr('src', 'assets/imgs/read.png');
                var spec = db.all_posts
                for (let i = 0; i < spec.length; i++) {
                    if (spec[i]._id == book._id) {
                        nowB = spec[i];
                        $(`#${ids.readBy}`).text(spec[i].reads.length);
                    }                                
                }
            }
            global.page_ld_stt = 'off';
        });
    }
    // build ids for functionalities
    const buildBkIds = (data, id) => {
    return {
        // smart date func
        dateFlow: 'dateFlow_bookB_' + data._id+id, 
        dateFlowAut: 'dateFlowAut_bookB_' + data._id+id, 
        userIdEx: 'userIdEx_bookB_' + data._id+id, 
        // like func
        likeId : 'like_bookB_' + data._id+id,
        likedBy: 'liked_bookB_'+ data._id+id,
        // read body func
        prevB: 'prevB_bookB_'+ data._id+id,
        readId : 'read_bookB_' + data._id+id,
        readBy : 'readBy_bookB_' + data._id+id,
        coverId : 'coverId_bookB_' + data._id+id,
        // comnt func
        openCom: 'openCom_bookB_' + data._id+id,
        comBod: 'comBod_bookB_' + data._id+id,
        closeCom: 'closeCom_bookB_' + data._id+id,
        comIn: 'comIn_bookB_' + data._id+id,
        comBt: 'comBtn_bookB_' + data._id+id,
        comFlow: 'comFlow_bookB_' + data._id+id,
        cmntBy: 'cmntBy_bookB_' + data._id+id,
        comntLen: 'cmntLen_bookB_' + data._id+id,
        // share pst funcs
        shrPst: 'shrPst_bookB_' + data._id+id,
        shrPstBd: 'shrPstBd_bookB_' + data._id+id,
        shrPstFlw: 'shrPstFlw_bookB_' + data._id+id,
        shrPstCls: 'shrPstCls_bookB_' + data._id+id,
        shrPstSrch: 'shrPstSrch_bookB_' + data._id+id,
        // post pop up funcs
        allBCvrCon: 'allBCvrCon_bookB_' + data._id+id,
        openPopId: 'openPop_bookB_' + data._id+id,
        popBodId: 'popBod_bookB_' + data._id+id,
        clsePopId: 'clsePop_bookB_' + data._id+id,
        edtPost: 'edtPost_bookB_' + data._id+id,
        donEdtPost: 'donEdtPost_bookB_' + data._id+id,
        // delete post funcs
        delPMCId: 'delPMCId_bookB_' + data._id+id,
        delPostId: 'delPost_bookB_' + data._id+id,
        delPConId: 'delPCOn_bookB_' + data._id+id,
        yesDelPId: 'yesDelP_bookB_' + data._id+id,
        noDelPId: 'noDelP_' + data._id+id,
        // promote func
        promId: 'promId_' + data._id+id,
        // report post func
        reprtId: 'reprtId_bookB_' + data._id+id,
        repConId: 'repConId_bookB_' + data._id+id,
        inApRep: 'inApRep_bookB_' + data._id+id,
        abusRep: 'abusRep_bookB_' + data._id+id,
        clsRep: 'clsRep_bookB_' + data._id+id,
        // users auth
        usrAut: 'usrAut_bookB_' + data._id+id,
        verIcon: 'verIconJrn_bookB_' + data._id+id,
        // author info area
        autSrcs: 'autSrcs_bookB_' + data._id+id,
        adptCart: 'adptCart_bookB_' + data._id+id,
        autInfo: 'autInfo_bookB_'+ data._id+id,
        autCats: 'autCats_bookB_'+ data._id+id,
        autLoc: 'autLoc_bookB_'+ data._id+id,
        infoSrc: 'infoSrc_bookB_'+ data._id+id,
        
        }
    }
    // drop
    const dropBBook = (book, udata, dT) => {
        var ids = '';
        if (dT.type) {
            ids = buildBkIds(book, '_ex_usr_book');
        } else {
            ids = buildBkIds(book, dT);
        }
        var alldata = db.users;
        var thisU = '';
        for (let o = 0; o < alldata.length; o++) {
            if (alldata[o]._id == book.user) {
                thisU = alldata[o];
            }
        }
        
        if (dT.type) {
            $(`#${dT.drop}`).prepend(bookBig(book, thisU, udata, ids));
        } else {
            if (dT == "general") {
                $('#dropbox-jrn-main').prepend(bookBig(book, thisU, udata, ids));
            }
            if (dT == "me_aut") {
                $('#dropbox-aut-prf').prepend(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'rdJ_rt') {
                $('#exp_drpMR').append(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'ascJ_rt') {
                $('#exp_drpMA').append(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'lkJ_rt') {
                $('#exp_drpML').append(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'cmtJ_rt') {
                $('#exp_drpMC').append(bookBig(book, thisU, udata, ids));
            }
            // all in exp
            if (dT == 'all_exp') {
                $('#dropbox-indexexp').prepend(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'like_post') {
                $('#revPresNote').text('post liked');
               $('#drp-like-tag-rev-bod').fadeIn();
               $('#droprev-lktg').append(bookBig(book, thisU, udata, ids));
               // with/without imgs
            }
            if (dT == 'tag_post') {
                $('#revPresNote').text('tagged to a post');
                $('#drp-like-tag-rev-bod').fadeIn();
                $('#droprev-lktg').append(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'shr_post') {
               $('#revPresNote').text('shared to a post');
               $('#drp-like-tag-rev-bod').fadeIn();
               $('#droprev-lktg').append(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'src_book') {
                $('#revPresNote').text('searched Book');
                $('#droprev-lktg').append(bookBig(book, thisU, udata, ids));
            }
            if (dT == 'comment_post') {
                let cids = comIdsNoti(data);
                $('#revPresNote').text('commented on post');
                $('#drp-like-tag-rev-bod').fadeIn();
                $('#droprev-lktg').append(comsBod(udata, cids.drpId, cids.bodyComId));
                $(`#${cids.bodyComId}`).after(`<p style="margin:5px; font-size:13px;" class="sub_h">post :</p>`+bookBig(book, thisU, udata, ids));
                const fetchSpecCom = (com, data) => {
                    var ext = db.all_posts.find(i=>i._id == data._id);
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
                         $(`#${cids.drpId}`).append(comBodLyt(com, user, cids, slc, dispMre));
                     }else {
                          $(`#${cids.drpId}`).prepend(comBodDrk(com, user, cids, slc, dispMre));
                     }
                     if (user.verification == 'on') {
                         $(`#${cids.verIconCom}`).css('display', 'inline');
                     }
                     Dark();
                };
                var coms = global.rev_coms;
                fetchSpecCom(coms, book);
            }
        }
        Dark();
        $(`#${ids.autInfo}`).html(`<span class="postDatefrst ${ids.userIdEx}">${thisU.user_name}</span>`);
        idExFunc(book, udata, ids.userIdEx, ids.adptCart);
        for (let i = 0; i < thisU.user_type.categories.length; i++) {
            $(`#${ids.autCats}`).append(`${thisU.user_type.categories[i]} `);
        }
        $(`#${ids.autLoc}`).text(thisU.country);
        $(`#${ids.infoSrc}`).remove();
        // like
        LikePost(book, udata, ids.likeId, ids.likedBy);
        likedImg(book, udata, ids.likeId, ids.likedBy)
        // comments functionalities
        commentSec(book, udata, ids.openCom, ids.comBod, ids.bodyId, ids.comFlow, ids.comntLen);
        commentImg(book, udata, ids.openCom, ids.comntLen);
        closeComment(book, ids.closeCom, ids.comBod);
        pushComment(book, udata, ids.comBod, ids.bodyId, ids.comIn, ids.comBt, ids.comFlow, ids.openCom, ids.cmntBy, ids.comntLen);
        // share funcs
        sharePst(book, udata, ids.shrPst, ids.shrPstBd, ids.shrPstSrch, ids.shrPstFlw, ids.shrPstCls);
        // post opt funcs 
        // donEdtPost: 'donEdtPost_' + id,
        postPop(book, udata, ids.openPopId, ids.popBodId, ids.clsePopId, ids.reprtId, ids.promId, ids.edtPost, ids.donEdtPost, ids.hidPMCId, ids.delPMCId);
        deletePost(book, ids.delPMCId, ids.delPostId, ids.delPConId, ids.yesDelPId, ids.noDelPId);
        //promFunc(book, ids.promId);
        // report p
        reportJrn(book, udata, ids.reprtId, ids.repConId, ids.inApRep, ids.abusRep, ids.clsRep);
        // edit p
        //editJrn(book, udata, ids.edtPost);
        smartDate(book, ids.dateFlowAut);
        checkMode();
        // read  funcs
        reedBook(book, udata, ids);
        preloadImgs(`https://test-vyral.onrender.com/${book.cover.path}`, ids.coverId);
        // setCover func
        /*setTimeout(() => {
            var w1 = $(`#${ids.allBCvrCon}`).css('width');
            alert(w1);
            setTimeout(() => {
                var w11 = w1.slice(0, -2);
                w11 = Number(w11);
                var scc = 180;
                // set %
                var perc = 50;
                // check % for-each
                var ev1 = perc/100*w11;
                var scev1 = perc/100*scc;
                // evaluation
                var m1 = ev1-scev1;
                // apply
                alert(m1);
            }, 500);
        }, 500);*/
    }
    // drop books lst
    const dbLstB = (book, user, lbIds, clss) => {
        return `
        <div id="${lbIds.BLTCon}" class="side_bkLsts ${clss}" style="display:none;">
            <p id="${lbIds.opnPrf}" class="postDatefrst" style="text-align: center; margin:0px; padding:4px; font-size: 14px; cursor:pointer;">${user.user_name}</p>
            <div id="${lbIds.readBtn}" style="width: 52.5%; margin:auto; height: 200px; margin-top:5px; border-radius: 10px; background-image: url(https://test-vyral.onrender.com/${book.cover.path}); background-size: 100% 100%; cursor:pointer;">
                <br>
                <div style="width:100%; height:40px;">
                    <div id="${lbIds.readIc}" style="float:left; width:30px; height:30px; margin-left:10px; margin-top:-10px; background-size: 100% 100%; background-image:url(assets/imgs/readen.png);"></div>
                    <p style="float:left; font-size:13px; margin:0px; padding:5px; margin-left:5px; margin-top:-10px; display:none; font-weight:normal; color:darkorange;" id="${lbIds.readBy}">${book.reads.length}</p>
                </div>
            </div>
            <p class="postHeaderfrst" style="text-align: center; margin: 0px; padding:3px; font-size: 16.5px; font-weight:normal;">${book.title}</p>
            <p style="text-align: center; margin: 0px; padding:3px;">
                <button class="btn btn-default btn-xs revBtns postHeaderfrst ${lbIds.prevB}" style="background-color:transparent; color:grey; font-size:13px; border-radius: 5px;">preview <img src="assets/imgs/bookinf.png" alt="" height="16px" width="14px"></button>
            </p>
        </div>
        `
    }
    const dropFBks = (book, b, user, udata, nw) => {
        var tchp; var chpFW; var chpFWC;
        const createLBD = () => {
            return {
                prevB: `preview_ls_bk_${book._id}_${user._id}_${nw}`,
                readBtn: `readBtn_ls_bk_${book._id}_${user._id}_${nw}`,
                readIc: `readIc_ls_bk_${book._id}_${user._id}_${nw}`,
                readBy: `readBy_ls_bk_${book._id}_${user._id}_${nw}`,
                BLTCon: `BLTCon_ls_bk_${book._id}_${user._id}_${nw}`,
                opnPrf: `opnPrf_ls_bk_${book._id}_${user._id}_${nw}`,
            }
        };
        const lbIds = createLBD();
        var x = window.matchMedia("(max-width: 600px)");
        if (nw == 'ex' || nw == 'me') {
            const clss = "sidebook_ex_nd_me";
            chpFW = $(`#exBLSlide`).css('width');
            chpFWC = chpFW.slice(0, chpFW.length-2); tchp = Number(chpFWC);
            if (nw == 'ex') {
                $(`#exBLSlide`).css('width', `${tchp+300}px`);
                $('#drpExBKSL').prepend(dbLstB(book, user, lbIds, clss));
                $(`#${lbIds.BLTCon}`).css('width', '100%');
                $(`#${lbIds.BLTCon}`).attr('style', 'width: 300px; height: 295px; float:left;');
                $(`#${lbIds.BLTCon}`).fadeIn();
            }
        }
        if (nw == 'gen') {
            const clss = "dsidebook_general";
            chpFW = $(`#allhBLSlide`).css('width');
            chpFWC = chpFW.slice(0, chpFW.length-2); tchp = Number(chpFWC);
            if (x.matches) {
                $(`#allhBLSlide`).css('width', `${tchp+300}px`);
                $('#drpAllhExBKSL').append(dbLstB(book, user, lbIds, clss));
                $(`#${lbIds.BLTCon}`).css('width', '100%');
                $(`#${lbIds.BLTCon}`).attr('style', 'width: 300px; height: 295px; float:left;');
                $(`#${lbIds.BLTCon}`).fadeIn();
            }else {
                console.log('drop this man here! oi!');
                $('#drp_lft_bks').append(dbLstB(book, user, lbIds, clss));
                $(`#${lbIds.BLTCon}`).attr('style', 'width: 100%; border-bottom: solid 1px rgba(87, 86, 86, 0.244); height: 295px;');
                $(`#${lbIds.BLTCon}`).fadeIn();
            }
        }
        if (nw == 'rtd_rd' || nw == 'rtd_asc' || nw == 'rtd_lkd') {
            const clss = "dsidebook_rated";
            if (nw == 'rtd_rd') {
                $('#dropMstRd_bk').prepend(dbLstB(book, user, lbIds, clss));
            }
            if (nw == 'rtd_asc') {
                $('#dropMstAsc_bk').prepend(dbLstB(book, user, lbIds, clss));
            }
            if (nw == 'rtd_lkd') {
                $('#dropMstLkd_bk').prepend(dbLstB(book, user, lbIds, clss));
            }
            $(`#${lbIds.BLTCon}`).css('width', '100%');
            $(`#${lbIds.BLTCon}`).attr('style', 'width: 100%; height: 290px; float:left; margin-top:5px;');
            $(`#${lbIds.BLTCon}`).fadeIn();
            if (udata.mode == 'light') {
                $(`#${lbIds.BLTCon}`).css('border-right', 'solid 1px #f0f0f0');
            } else {
                $(`#${lbIds.BLTCon}`).css('border-right', 'solid 1px #404040');
            }
        }
        if (nw == 'shlf') {
            const clss = "col-xs-12 col-lg-6";
            $('#drp_shlf_bks').append(dbLstB(book, user, lbIds, clss));
            $(`#${lbIds.BLTCon}`).attr('style', 'height: 295px; float:left;');
            $(`#${lbIds.BLTCon}`).fadeIn();
        }
        reedBook(book, udata, lbIds);
        idExFunc(book, udata, lbIds.opnPrf, lbIds.BLTCon);
        checkMode();
    }

    // AUTHOR - HEADS
    // --------------
    // head body
    const autHead = (ids, aut, clss) => {
        var img = {path: '', tpe: '', clss: ''};
        var nme = '';
        if (aut.user_name.length > 15) {
            nme = aut.user_name.slice(0, 15)+'..';
        } else {
            nme = aut.user_name;
        }
        if (aut.profile_pic == 'none') {
            img.path = 'assets/imgs/profpic.png';
            img.tpe = '100% 100%';
        }else {
            img.path = `https://test-vyral.onrender.com/${aut.profile_pic.path}`;
            img.clss = aut.profile_pic.class;
            img.tpe = 'cover';
        }
        return `
        <div class="author_heads ${clss}" id="${ids.body}" style="margin-top:5px;">
            <div style="width:100%; height:130px;">
                <div id="${ids.autPic}" style="width:120px; height:120px; margin:auto; margin-top:3px; background-image:url(${img.path}); background-size:${img.tpe}; border-radius:5px;" class="${img.clss}"></div>
            </div>
            <div style="width:100%; height:25px;">
                <p style="text-align:center; margin:0px; padding:2px; font-size:15px;" class="postHeaderfrst"> <img class="" src="assets/imgs/authand.png" width="16px" height="16px" alt="" style="background-color:transparent;"> ${nme}</p>
            </div>
            <div style="width:100%; height:30px;">
                <p style="text-align:center; margin:0px; padding:5px;">
                    <button id="${ids.sub}" class="btn btn-default btn-sm sub_btn_autH postDatefrst" style="border-radius:15px; background-color:transparent;"> subscribe </button>
                </p>
            </div>
        </div>
        ` 
    }
    const subSAut = (aut, ids, udata, nw, drop) => {
        var stat = 'n';
        var subsN = aut.user_type.subscribers;
        for (let h = 0; h < subsN.length; h++) {
            if (subsN[h].user == udata._id) {
                stat = 'y';
            }
        }
        if (stat == 'y') {
            $(`#${ids.sub}`).css('border', 'none');
            $(`#${ids.sub}`).text('SUBSCRIBED');
        }
        $(`#${ids.sub}`).click(()=>{
            if (aut._id == udata._id) {
                $('#opnPrf').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = aut._id;
                global.ex_flag = 'y';
            }
            /*if (stat == 'n') {
                paySub(aut, udata);
            } else {
                //location.replace(`/${aut.user_name}`);
            }*/
        });
    }
    const dropAut = (aut, udata, nw, drop) => {
        const ids = {
            body: `author_rated_${aut._id}_${nw}_body`,
            autPic: `author_rated_${aut._id}_${nw}_autPic`,
            sub: `author_rated_${aut._id}_${nw}_sub`,
        };
        var clss = '';
        if (nw == "aut_r_rd") {
            clss = 'rated_aut_r_rd';
        }
        $(`#${drop}`).prepend(autHead(ids, aut, clss));
        if (aut.profile_pic == 'none') {
            if (udata.mode == 'light') {
                $(`#${ids.autPic}`).css('background-color', '#f9f9f9');
                $(`#${ids.autPic}`).css('border', 'solid 3px #f0f0f0');
                $(`#${ids.body}`).css('border-right', 'solid 1px #f0f0f0');
            } else {
                $(`#${ids.autPic}`).css('background-color', 'black');
                $(`#${ids.autPic}`).css('border', 'solid 3px #404040');
                $(`#${ids.body}`).css('border-right', 'solid 1px #404040');
            }
        }
        if (aut._id == udata._id) {
            $(`#${ids.sub}`).text('my profile');
        }
        checkMode();
        subSAut(aut, ids, udata, nw, drop);
    }

    // book shelves
    // ------------
    // open subscribed
    $('#goToShelf').click(()=>{
        global.page_ld = 'y';
        var tpe = 'gen';
        dropShelf(tpe);
        var data = db.all_posts; var alldata = db.users;
        for (let n = 0; n < data.length; n++) {
            if (data[n].content_type == 'usr_aut_book') {
                for (let y = 0; y < alldata.length; y++) {
                    if (alldata[y]._id == data[n].user && alldata[y].user_type.status == 'on') {
                        if (alldata[y].user_type.subscribers.length > 0) {
                            for (let q = 0; q < alldata[y].user_type.subscribers.length; q++) {
                                if (alldata[y].user_type.subscribers[q].user == udata._id) {
                                    var nw = 'shlf';
                                    dropFBks(data[n], n, alldata[y], udata, nw);
                                    checkMode();
                                    //getCart();
                                }
                            }
                        }
                        //alert(alldata[y]._id);
                    }
                }
                if (udata.user_type !== 'user' && udata.user_type.status == 'on') {
                    if (data[n].user == udata._id) {
                        var nw = 'shlf';
                        dropFBks(data[n], n, udata, udata, nw);
                        checkMode();
                    }
                }
            }
        }
        global.page_ld_stt = 'off';
    });
    // open by cats
    $('#cats_bkShlfs').click(()=>{
        var data2 = global.cate; var data = db.all_posts; var alldata = db.users;
        var tpe = data2;
        dropShelf(tpe);
        for (let n = 0; n < data.length; n++) {
            if (data[n].content_type == 'usr_aut_book') {
                for (let y = 0; y < alldata.length; y++) {
                    if (alldata[y]._id == data[n].user && alldata[y].user_type.status == 'on') {
                        for (let q = 0; q < alldata[y].user_type.categories.length; q++) {
                            if (alldata[y].user_type.categories[q] == data2) {
                                console.log('found! '+data2);
                                var nw = 'shlf';
                                dropFBks(data[n], n, alldata[y], udata, nw);
                                checkMode();
                                //getCart();
                            }
                        }
                        //alert(alldata[y]._id);
                    }
                }
            }
        }
    });
    const dropShelf = (tpe) => {
        $('#dropChat').append(shelfCon(tpe));
        $('#shelf_main').fadeIn();
        $('#container-body, .ex-slider').css('filter', 'blur(5px)');
        $('#cls_shlf').click(()=>{
            $('.shelf_con').remove();
            $('#container-body, .ex-slider').css('filter', '');
        });
        checkMode();
    }
    const shelfCon = (tpe) => {
        var hd = '';
        if (tpe == 'gen') {
            hd = 'from subscriptions';
        } else {
            hd = `Books related to - ${tpe}`;
        }
        return `
        <div class="row shelf_con">
            <div class="col-lg-12 col-xs-12" style="position:fixed; z-index:${global.pop_no++}; height:100%;">
                <div class="row" style="height:100%;">
                    <div class="col-lg-3"></div>
                    <div class="col-lg-6 col-xs-12" style="height:100%;">
                        <div style="width:100%; height:96.5%; margin-top:2%; display:none; border-radius:5px; box-shadow:0px 0px 15px -1px rgba(0, 0, 0, 0.25);" id="shelf_main" class="stylePosts">
                            <div style="width:100%; height:6%;">
                                <div style="width:100%; height:100%;">
                                    <p style="float:left; margin:0px; padding:2px; color:darkorange; padding:3px;" id="shelf_inf">${hd}</p>
                                    <p style="margin:0px; padding:2px; margin-right:5px; float:right;"> <img id="cls_shlf" src="assets/imgs/can.png" width="15px" height="15px" style="cursor:pointer;"> </p>
                                </div>
                            </div>
                            <div style="width:100%; height:94%; overflow-y:auto;">
                                <span id="drp_shlf_bks"></span>
                                <br>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3"></div>
                </div>
            </div>
        </div>
        `
    };
        
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y' && db.users.length > 0) {
            setTimeout(() => {
                journals();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
