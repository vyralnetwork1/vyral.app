import { db, db_f, assignDb, postData } from "./socket.js";
import { global, declare, refreshGlob, updateGlobe } from "./global.js";

var allApps = JSON.parse(localStorage.getItem("app"));
var app = global.app_store;
const childP = (child) => {
    allApps = JSON.parse(localStorage.getItem("app"));
    app = global.app_store;
    if (allApps.key == app.key) {
        allApps.child_p = child;
        global.app_store = allApps;
    }
    localStorage.setItem("app", JSON.stringify(allApps));
    refreshGlob(); app = global.app_store; 
    setTimeout(() => {
        children();
    }, 1);
}
const changeP = (page) => {
    allApps = JSON.parse(localStorage.getItem("app"));
    app = global.app_store;
    if (allApps.key == app.key) {
        allApps.page = page;
        global.app_store = allApps;
    }
    localStorage.setItem("app", JSON.stringify(allApps));
    refreshGlob(); app = global.app_store; pages();
}
const children = () => {

    // login
    if (app.child_p == 'login') {
        $('#log_con').css('display', 'block');
    }
    // signup
    if (app.child_p == 'register') {
        $('#sign_con').css('display', 'block');
    }
    // tutorials
    if (app.child_p == 'tutorials') {
        $('#tut_con').css('display', 'block');
    }
    // tutorials
    if (app.child_p == 'forgot-password') {
        $('#frg_con').css('display', 'block');
        $('.logo_blw_con').fadeOut();
    }
    // home
    if (app.child_p == 'home') {
        
    }
    if (app.child_p == 'profile') {
        $('#seeFlow').click();
    }
    if (app.child_p == 'chats') {
        
    }
    if (app.child_p == 'noties') {
        
    }
}
const pages = () => {
    $('.all_cons, .all_childs').css('display', 'none');
    if (app.page == 'login' || app.page == 'signup' || app.page == 'tutorials' || app.page == 'forgot-password') {
        $('#container-wlcm-logs').fadeIn();
    } 
    if (app.page == 'home') {
        if (app.userSess == '' && db_f == 'y') {
            $('#container-body').fadeOut();
            var page = 'login';  var child = 'login';
            changeP(page);
        }else {
            //$('#container-body').fadeIn();
        }
    }
    setTimeout(() => {
        children();
    }, 1);
}
const checkSess = () => {
    if (app.userSess !== '') {
        $('.all_cons').css('display', 'none');
        $('#container-body').fadeIn();
        setTimeout(() => {
            global.page_ld_stt = 'off';
        }, 5000);
    } else {
        pages();
        setTimeout(() => {
            global.page_ld_stt = 'off';
        }, 5000);
    }
}
setTimeout(() => {
    $('#wlcm_con').fadeIn(10);
    setTimeout(() => {
        $('#logOpnImg').fadeIn();
        $('#logOpnImg').addClass('logOpnImg');
        setTimeout(() => {
            $('#wlcm_con').fadeOut();
            checkSess();
        }, 2000);
    }, 1000);
}, 3000);

// log + sign
$('.opn_reg').on("click", function(){
    //$('#wlcm_con').fadeIn();
    var page = 'signup'; var child = 'register';
    changeP(page); childP(child);
});
$('.opn_log').on("click", function(){
    var page = 'login'; var child = 'login';
    changeP(page); childP(child);
});
$('.opn_log_fg').on("click", function(){
    var page = 'login'; var child = 'login';
    changeP(page); childP(child);
    setTimeout(() => {
        location.reload();
    }, 1000);
});
$('.opn_tut').on("click", function(){
    var page = 'tutorials'; var child = 'tutorials';
    changeP(page); childP(child);
});

const homeNavs = () => {
    var udata = '';
    if (app.userSess !== '') {
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i]._id == app.userSess) {
                udata = db.users[i];
            }
         }
    }

    // nav bars
    const head = `
            <!-- head -->
            <div class="row">
                <div class="col-xs-12 navs" id="genHeads" style="position: fixed; z-index: 3; height:50px; box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.35);">
                    
                    <!-- home area -->
                    <div id="hmeHD" style="width: 100%; height: 100%;">
                        <div style="width: 55%; height: 40px; margin-top: 5px; float: left;">
                            <img src="assets/imgs/greyL.png" alt="" width="35px" height="30px" style="float: left; opacity:2; margin:5px;">
                        </div>
                        <div style="width: 45%; height: 100%; margin-top: 5px; float: right;">
                            <img src="assets/imgs/locate.png" id="opnLcte" alt="" width="15px" height="20px" style="margin:7px; float:right;">
                            <img src="assets/imgs/searcheda.png" alt="" width="20px" height="20px" style="margin:7px; margin-right: 15px; float:right; display:none;" id="opnSrchp">
                            <!--<img src="assets/imgs/refresh.png" alt="" width="22.5px" height="20px" style="margin:7px; margin-right: 15px; float:right;" id="rfrshMain" class="">
                            <img src="assets/imgs/refresh.png" alt="" width="22.5px" height="20px" style="margin:7px; margin-right: 15px; float:right; display:none;" id="rfrshMainStr" class="">-->
                        </div>
                    </div>
                    <!-- chat area -->
                    <div id="chtHD" style="width: 100%; height: 100%; display: none;">
                        <div style="width: 75%; height: 40px; margin-top: 5px; float: left;">
                            <input type="search" name="" onkeypress="clsAlphaNoOnly(event)" id="chtFrndsSrch" class="sub_h" style="width: 100%; padding:5px; margin:7.5px; height: 25px; border:none; border-radius:10px;" placeholder="search friends">                        
                        </div>
                        <div style="width: 25%; height: 100%; margin-top: 5px; float: right;">
                            <!-- <img src="assets/imgs/opt.png" alt="" width="10px" height="20px" style="margin:7px; float:right;"> -->
                            <img src="assets/imgs/chatd.png" alt="" width="20px" height="20px" style="margin:7px; margin-right: 15px; float:right;">
                        </div>
                    </div>
                    <!-- noti area -->
                    <div id="ntiHD" style="width: 100%; height: 100%; display: none;">
                        <div style="width: 70%; height: 40px; margin-top: 5px; float: left;">
                            <p style="margin:0px; padding:7.5px; font-size:18px; color:darkorange;">notifications</p>
                        </div>
                        <div style="width: 30%; height: 100%; margin-top: 5px; float: right;">
                            <i id="notiLen" class="sub_hs" style="float: right; margin:0px; padding: 10px; font-size: 10px;">0</i>
                        </div>
                    </div>
                    <!-- prof area -->
                    <div id="prfHD" style="width: 100%; height: 100%; display: none;">
                        <div style="width: 70%; height: 40px; margin-top: 5px; float: left;">
                            <p id="topUnmePrf" style="margin:0px; padding:7.5px; font-size:14px;" class="sub_h"></p>
                        </div>
                        <div style="width: 30%; height: 100%; margin-top: 5px; float: right;">
                            <img id="opnSetngs" src="assets/imgs/set.png" alt="" width="20px" height="20px" style="margin:7px; float:right;">
                        </div>
                    </div>
                </div>
    
                <!-- sub nav area -->
                <div id="sbNav" class="col-xs-12" style="position: fixed; z-index: 3; height:40px; margin-top: 50px; box-shadow:5px 5px 10px -10px black;">
                    <div style="width:50%; height:100%; float:left;">
                        <div id="flwMainJrn" style="width:30px; height:30px; margin:auto; margin-top:5px;">
                            <img id="flwMainJrnImg" src="assets/imgs/read.png" width="25px" height="25px" style="margin:2.5px;">
                        </div>
                    </div>
                    <div style="width:50%; height:100%; float:right;">
                        <div id="flwMainStr" style="width:30px; height:30px; margin:auto; margin-top:5px;">
                            <img id="flwMainStrImg" src="assets/imgs/strings2.png" width="25px" height="25px" style="margin:2.5px;">
                        </div>
                    </div>
                </div>
    
                <!-- srch pge/funcs -->
                <div id="mainSrchCon" class="col-xs-12 subnavs" style="position: fixed; z-index: 3; height:75px; #f9f9f9; display:none;">
                    <div class="row">
                        <div class="col-xs-12" style="height:35px;">
                            <div style="width: 75%; height:100%; margin-top: 5px; float: left;">
                                <input type="search" name="" class="srchCon_in sub_h" onkeypress="clsAlphaNoOnly(event)" id="allSrchIn" style="width: 100%; height: 25px; border:none; border-radius:7.5px;" placeholder="search users">                        
                            </div>
                            <div style="width: 25%; height: 100%; margin-top: 5px; float: right;">
                                <img id="clseSrchPg" src="assets/imgs/can.png" alt="" width="18px" height="18px" style="margin:2.5px; float:right;">
                            </div>
                        </div>
                        <div class="col-xs-12 navs" style="height:40px;">
                            <img src="assets/imgs/profb.png" id="opnUsrSrch" width="25px" height="25px" style="margin:7.5px; float:left;">
                            <img src="assets/imgs/strings2.png" id="opnStrSrch" width="25px" height="25px" style="margin:7.5px; float:left; margin-left:30px;">
                            <img src="assets/imgs/readen.png" id="opnJBsSrch" width="25px" height="25px" style="margin:7.5px; float:left; margin-left:30px;">
                        </div>
                    </div>
                </div>
    
                <!-- location div -->
                <div id="lctCon" class="col-xs-12" style="position:fixed; z-index:4; display:none;">
                    <div class="navs" style="width:200px; height:140px; box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.4); float:right; border-radius:5px; margin-top:50px;">
                        <p style="margin:0px; padding:5px; text-align:center; color:orangered;">
                            <img src="assets/imgs/can.png" style="width:13.5px; height:13.5px;" id="clseLcte">
                        </p>
                        <div style="width:100%; height:35px;" class="bottom">
                            <!-- home -->
                            <p style="margin: 0px; padding: 5px; color: darkorange;" id="wrldLcl"> World-wide </p>
                        </div>
                        <div style="width:100%; height:35px;" class="bottom">
                            <!-- home -->
                            <p style="margin: 0px; padding: 5px; color: grey;" id="contLcl"></p>
                        </div>
                        <div style="width:100%; height:35px;">
                        <!-- home -->
                            <p style="margin: 0px; padding: 5px; color: grey;" id="CountLcl"></p>
                        </div>
                    </div>
                </div>
            
            </div>
    `;
    $('#drpHD').after(head);
    // location div
    $('#opnLcte').on("click", function(){
        //$('#sbNav').css('display', 'none');
        $('#lctCon').fadeIn();
    });
    $('#clseLcte').on("click", function(){
        //$('#sbNav').css('display', 'none');
        $('#lctCon').fadeOut();
    })
    
    // bottom
    const bottom = () => {
        return `
        <div class="navs refreshRU" id="refrshr_con" style="position: fixed; z-index: 3; height:40px; width: 40px; bottom:0px; left:0; margin-left:17.5px; box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.4); border-radius: 100%;">
            <img id="rfrshMain" src="assets/imgs/refresh.png" alt="" width="22px" height="22px" style="margin:5px; margin-top:9px; margin-left:9px;">
            <img src="assets/imgs/refresh.png" alt="" width="22.5px" height="22px" height="22px" style="margin:5px; margin-top:9px; margin-left:9px; display:none;" id="rfrshMainStr" class="">
        </div>
        <div class="row">
            <div class="col-xs-12 navs" id="genBottom" style="position: fixed; z-index: 3; bottom: 0; background-color:#1a1a1a; right: 0; height:45px; box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.35);">
                <!-- home btn -->
                <div style="width:20%; height: 100%; float: left;">
                    <div class="botmHldr" id="opnHme" style="width: 35px; height: 35px; margin: auto; margin-top: 5px; border-radius: 100%; border:solid 2px darkorange;">
                        <p style="margin: 0px; margin-top:-2.5px; padding: 1px; text-align: center;">
                            <img id="hmeBtnImg" src="assets/imgs/home.png" alt="" width="20px" height="20px">
                        </p>
                    </div>
                </div>
                <!-- chat btn -->
                <div style="width:20%; height: 100%; float: left;">
                    <div class="botmHldr" id="opnCht" style="width: 35px; height: 35px; margin: auto; margin-top: 5px; border-radius: 100%;">
                        <p style="margin: 0px; margin-top:-2px; padding: 1px; padding-top:2.5px; text-align: center;">
                            <img id="chtBtnImg" src="assets/imgs/chat.png" alt="" width="20px" height="20px">
                        </p>
                    </div>
                </div>
                <!-- prof btn -->
                <div style="width:20%; height: 100%; float: left;">
                    <div class="botmHldr" id="opnPrf" style="width: 35px; height: 35px; background-image:url('assets/imgs/profb.png'); margin: auto; margin-top: 5px; border-radius: 100%;">
                        
                    </div>
                </div>
                <!-- wrt J/S btn -->
                <div style="width:20%; height: 100%; float: left;">
                    <div class="botmHldr" id="opnWrt" style="width: 35px; height: 35px; margin: auto; margin-top: 5px; border-radius: 100%;">
                        <p style="margin: 0px; margin-top:-1px; padding: 1px; text-align: center;">
                            <img id="" src="assets/imgs/wa.png" alt="" width="20px" height="20px">
                        </p>
                    </div>
                </div>
                <!-- noti btn -->
                <div style="width:20%; height: 100%; float: right;">
                    <div class="botmHldr" id="opnNti" style="width: 35px; height: 35px; margin: auto; margin-top: 5px; border-radius: 100%;">
                        <p style="margin: 0px; margin-top:-2px; padding: 1px; padding-top:2.5px; text-align: center;">
                            <img id="notiIcn" src="assets/imgs/notis.png" alt="" width="20px" height="20px">
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    $('#drpBtm').after(bottom());
    if (app.userSess !== '') {
        if (udata.profile_pic == 'none') {
            $('#opnPrf').css('background-image', 'url(assets/imgs/profb.png)');
            $('#opnPrf').css('background-size', '100% 100%');
        }else {
            $('#opnPrf').css('background-image', `url(https://test-vyral.onrender.com/${udata.profile_pic.path})`);
            $('#opnPrf').css('background-size', 'cover');
        }
    }

    /**
     * LEFT NAV
     */
    const left = () => {
        return `
        <!-- opn left nav btn -->
        <div class="navs" id="opnLfn" style="position: fixed; z-index: 3; height:55px; width: 55px; bottom:0px; left:0; margin-bottom:60px; margin-left:11.5px; box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.4); border-radius: 10px;">
            <img src="assets/imgs/log4.png" alt="" width="27.5px" height="27.5px" style="margin:15px; margin-top:15px; margin-left:15px;">
        </div>
        <!-- left nave -->
        <div class="row">
            <div id="lftNav" class="col-xs-10 navs" style="position: fixed; z-index: 4; height:100%; box-shadow: 0px 0px 20px -5px black; display: none; overflow-y: auto;">
                
                <div class="row" style="height:95%;">

                    <!-- head -->
                    <div class="col-xs-12 clsNavs" style="height: 50px; border-bottom: solid 1px #f0f0f0;">
                        <span id="clsLft" style="margin: 15px; font-size: 30px; margin: 10px; color: silver; float:right;">&times;</span>
                    </div>

                    <!-- navs -->
                    <div class="col-xs-12 contNav" style="height:35px;">
                        <!-- home -->
                        <p id="goToHome" style="margin: 0px; padding: 5px; color: darkorange; font-size:16.5px;"> <img id="goToHomeImg" src="assets/imgs/home.png" alt="" width="15px" height="15px"> home </p>
                    </div>
                    <div class="col-xs-12 contNav" style="height:35px;">
                        <!-- home -->
                        <p id="goToExplr" style="margin: 0px; padding: 5px; color: silver; font-size:16.5px;"> <img id="goToExpImg" src="assets/imgs/exp2.png" alt="" width="15px" height="15px"> explore </p>
                    </div>
                    <div class="col-xs-12 contNav" style="height:35px;">
                        <!-- my book shelf -->
                        <p id="goToShelf" style="margin: 0px; padding: 5px; color: silver; font-size:16.5px;"> <img id="goToShlfImg" class="bandw" src="assets/imgs/bread.png" alt="" width="15px" height="15px" style="opacity:0.5;"> book shelf </p>
                    </div>
                    <!-- <div class="col-xs-12 contNav" style="height:35px;">
                        <p id="goToTstr" style="margin: 0px; padding: 5px; color: silver; font-size:16.5px;"> <img id="goToTstrImg" src="assets/imgs/strings2.png" alt="" width="15px" height="15px"> Trending strings <span class="TSlen"></span> </p>
                    </div> -->
                    <br>
                    <div class="col-xs-12" style="height:310px; margin-top:12.5px;">
                        <div class="leftnavCat" style="width:100%; height:100%; border-radius:10px; overflow-y:auto;">
                            <span id="dropCatsLft"></span>
                        </div>
                    </div>
                    <br>
                    <div class="col-xs-12" style="height:50px; margin-top:10px;">
                        <p style="text-align:center; margin:5px; margin-top:20px;">
                            <button class="btn btn-default btn-sm" id="open_ExLoop" style="border-radius:3.5px; background-color:transparent; color:silver; border:solid 1px grey; padding:5px;"> user experience feedback <img src="assets/imgs/loop.png" style="width:14px; height:7px; margin:5px;"> </button>
                        </p>
                    </div>
                    
                </div>
                <div class="row" style="height:5%;">
                    <div class="col-xs-12" style="height:25px;">
                        <p id=""style="position: absolute; z-index: 3; bottom: 0; margin: 0px; padding: 4px; font-size: 13px;"><a href="https://test-vyral.onrender.com/community" style="text-decoration:none;" class="sub_hs"> About & other policies </a></p>
                    </div>
                </div>

            </div>
        </div>
        `;
    };
    $('#drpLfn').after(left());
    // left nav btns
    $('#opnLfn').on("click", function(){
        $('#opnLfn').css('display', 'none');
        $('#lftNav').fadeIn(20);
    });
    $('#clsLft').on("click", function(){
        $('#opnLfn').css('display', 'block');
        $('#lftNav').fadeOut(10);
    });
    /* action btns
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
        setTimeout(() => {
            subCarts()
            chngCur('home');
            setTimeout(() => {
                // $('#rfrshMain').click();
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
        setTimeout(() => {
            subCarts()
            chngCur('explore');
            setTimeout(() => {
                // $('#rfrshMain').click();
                window.scrollTo(0, 0);
            }, 1500);
        }, 10);
    });*/

    // other carts
    const othrCrts = () => {
        $('#goToHome, #goToTstr, #goToExplr, #goToShelf').css('color', 'grey');
        $('#goToHomeImg').attr('src', 'assets/imgs/home3.png');
        $('#goToTstrImg').attr('src', 'assets/imgs/strings2.png');
        $('#goToExpImg').attr('src', 'assets/imgs/exp2.png');
        $('#goToTopsImg').attr('src', 'assets/imgs/shop2.png');
        $('#forJrnMain, #sbNav').fadeIn();
        $('#explBody, #forStrMain, #topsBody, #trstrBody').css('display', 'none');
    };
    // sub carts
    const subCarts = () => {
        $('.main_navs_btns').attr("style", "background-color:transparent; color:grey; border-style:solid; font-size:16.5px; border-width:1px; border-color:silver; border-radius:15px; margin:5px;");
    };

    const chngCur = (crnt) => {
        var child = crnt;
        //childP(child);
        global.cate = crnt;
        global.allow = 'y';
    };
    
}
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            homeNavs();
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();

export {changeP, childP};
