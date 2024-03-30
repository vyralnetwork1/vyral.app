import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
import { infos } from "./info.js";
function profile() {

   var allApps = JSON.parse(localStorage.getItem("apps"));
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
    
    const profBod = () => {
        return `
        <div class="col-xs-12" id="prfBody" style="margin-top: 70px; display: none;">

            <!-- friends pop-up -->
                <div id="openFriends" class="col-xs-12 col-md-4" style="position:fixed; height:90%; z-index:4; display:none; margin-top:-15%;">
                    <div id="frndsMainCon" style="width:100%; height:100%; box-shadow:0px 0px 10px -1px #1a1a1a; border-radius:5px;">
                        <div id="frndsNavCon" style="width:100%; height:92.5px; border-top-right-radius:5px; border-top-left-radius:5px;">
                            <div id="frndsHd" style="height:30px; width:100%;">
                                <p style="float:left; padding:5px; font-size:13px; color:orange; margin:0px;">friends</p>
                                <img src="assets/imgs/can.png" width="15px" height="15px" style="margin:7.5px; float:right;" id="closeFriends">
                            </div>
                            <div style="height:62.5px; width:100%;">
                            <div style="width:50%; height:62.5px; float:left; cursor:pointer;">
                                <div id="opnFlwn" style="width: 100%; height: 40px; border-bottom:solid 1px skyblue;">
                                <p class="sub_h" style="padding:10px; margin:0p; text-align:center;">FOLLOWING</p>
                                </div>
                                <div style="width: 100%; height: 22.5px;">
                                <p id="getFlwnMe" class="sub_h" style="text-align:center; font-size:12px; margin:0px; padding:5px;"></p>
                                </div>
                            </div>
                            <div style="width:50%; height:62.5px; float:right; margin-top:-1.5px; cursor:pointer;">
                                <div id="opnFlwr" style="width: 100%; height: 40px;">
                                <p class="sub_h" style="padding:10px; margin:0px; text-align:center;">FOLLOWERS</p>
                                </div>
                                <div style="width: 100%; height: 22.5px;">
                                <p id="getFlwrsMe" class="sub_h" style="text-align:center; font-size:12px; margin:0px; padding:5px;"></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <!-- <div id="frndsSrchCon" style="width:100%; height:35px;">
                            <input id="frndsSrchFrnds" type="search" style="border:none; background-color:transparent; margin:5px; float:left; width:80%; float:left;" placeholder="search">
                            <img src="assets/imgs/searcha.png" alt="" width="25px" height="25px" style="margin:5px; float:left;">
                        </div> -->
                        <div style="height:295px; width:100%; overflow-y:auto;">

                            <div style="width:100%; height:293px; overflow-y:auto;" id="flwnDiv">
                            <span id="drop-flwn"></span>
                            </div>
                            <div style="width:100%; height:293px; overflow-y:auto; display:none;" id="flwrDiv">
                            <span id="drop-flwr"></span>
                            </div>

                        </div>
                    </div>
                </div>

            <div class="col-xs-12 detailsBod">
                <div class="norm_usr_me" style="width:100%; display:none;">
                    <div id="profpicdiv" class="" style="width:100px; height:100px; margin:auto; margin-top:10px; border-radius:100%;">
                    </div>
                    <p class="sub_hs" style="text-align:center; font-size:10px; margin:5px;"><span class="profuname"></span> <img src="assets/imgs/verification.png" id="verIcon" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                    <p class="profusername sub_h" style="text-align:center; font-size:15px; margin:5px;"></p>
                </div>
                <div class="aut_usr_me" style="width:100%; display:none;">
                    <div class="row">
                        <div id="autBckImgCon" style="height: 160px; background-size: 100% 120%; class="col-xs-12">
                            <br>
                        </div>
                            <div style="width:100%; margin-top:-80px; height:165px; position:absolute; z-index:0;">
                                <div style="width:35%; height:100%; float:left;">
                                    <div id="profPicdivA" style="width: 110px; height: 110px; margin: auto; margin-top: 20px; border-radius: 10px; box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.473); background-image:url(assets/imgs/profpic.png); background-size:100% 100%;"></div>
                                    <p class="sub_h" style="text-align:center; font-size:13px; margin:5px; margin-top:5px;"> <img id="usrAuth" class="" src="assets/imgs/authand.png" width="15px" height="15px" alt="" style="background-color: transparent;"> <span class="profuname"></span> </p>
                                </div>
                                <div style="width:65%; height:100%; float:right;">
                                    <div style="width: 90%; height:65px; border-radius: 10px; box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.473); margin:auto; margin-top: 27.5px; margin-bottom: 5px; display: none; overflow-y: auto;" id="catsAttCon" class="usrAutUiBodss usrAutCats">
                                        <span class="drpCatsAtt"></span>
                                    </div>
                                    <p class="sub_hs" style="font-size:11px; margin:5px; padding:5px;  cursor:pointer; float:right;" class="editProfprofy">EDIT</p>
                                    <p class="sub_h" style="padding:5px; margin:0px; font-size:15px; float:right;"> <a class="mailInf" href="" style="text-decoration:none;"> <img src="assets/imgs/mail.png" width="15px" height="13px" alt=""> </a> </p>
                                </div>
                            </div>
                        <div style="width:100%; height:90px;"></div>
                    </div>
                    <p class="profusername min_titls" style="font-size:15px; margin:3px;"></p>    
                </div>
                <div class="row">
                    <div class="col-xs-12" id="statusdiv" style="height:100%; border-top: solid 1px #f0f0f0; border-bottom: solid 1px #f0f0f0;">
                        <p id="statusbod" class="min_titls" style="margin:5px; font-size:13px;">Hi i'm a threader!</p>
                    </div>
                </div>
                <div class="norm_usr_me" style="width: 100%; height: 60px; display:none;">
                  <p class="frndLen frnAr sub_h" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                  <p class="frnAr sub_hs" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; cursor:pointer;">friends</p>
                </div>
                <div class="aut_usr_me" style="width: 100%; height: 50px; display:none;">
                  <div style="height: 40px; width:50%; margin-top: 5px; float:left;" class="brd-rg">
                    <p class="frndLen frnAr sub_h" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                    <p class="frnAr sub_hs" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; cursor:pointer;">friends</p>
                  </div>
                  <div style="height: 40px; width:50%; margin-top: 5px; float:left;">
                    <p class="subAr subsLen subArBtns sub_h" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                    <p class="subAr subArBtns sub_hs" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; cursor:pointer;">subscribers</p>
                  </div>
                </div>
                <p id="mail" style="color:skyblue; text-align:center; font-size:12px; margin-top:5px;"></p>
                <hr id="adhr" style="display:none; margin-top:-10px;">
                <p id="adcart" style="margin:5px; color:skyblue; display:none; margin-top:-10px;"></p>
                <div class="row">
                    <div class="col-xs-12 sbNav" id="" style="height:40px;">
                        <img id="opnJrnPrf" src="assets/imgs/read.png" alt="" width="25px" height="25px" style="margin:5px; float:left;">
                        <img id="opnStrPrf" src="assets/imgs/strings2.png" alt="" width="25px" height="25px" style="margin:5px; float:left; margin-left:15px;">
                        <img id="opnAutCnt" class="aut_usr_me" src="assets/imgs/authand2.png" alt="" width="25px" height="25px" style="margin:5px; float:left; margin-left:15px; display:none;">
                        <img id="frnAr" src="assets/imgs/frnds.png" alt="" width="25px" height="20px" style="margin:5px; float:right;">
                    </div>
                </div>
            </div>

            <div class="col-xs-12" style="margin-top: 0px;">

                <div class="row">

                    <!-- jrn body below -->
                    <div id="forJrnPrf" class="col-xs-12 noneExst" style="margin-bottom:20px;">
                        <div class="row">
                            <div style="height:70px;" class="col-xs-12 bodySubNav">
                                <div style="height:30px; width:100%;">
                                    <p class="sub_h" style="text-align:center; font-size:12.5px; margin:0px; padding:5px;"> <img src="assets/imgs/read.png" width="13px" height="13px" style="margin-top:-2.5px; margin-right:5px;"> reads <span style="color:orange; font-size:14px;" id="myReadsLen">0</span> </p>
                                </div>
                                <div style="width:50%; float:left; height:40px;">
                                    <div id="seeFlow" style="width:45px; height:30px; margin:auto; margin-top:5px; cursor:pointer; border-bottom:solid 2px darkorange;">
                                        <div style="width:45px; height:10px; margin:auto; margin-top:5px;">
                                            <p style="text-align:center; font-size:13.5px; margin:0px; padding:3px;" class="sub_h">seen</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="width:50%; float:left; height:40px;">
                                    <div id="hidFlow" style="width:50px; height:30px; margin:auto; margin-top:5px; cursor:pointer;">
                                        <div style="width:50px; height:15px; margin:auto; margin-top:5px;">
                                            <p style="text-align:center; font-size:13.5px; margin:0px; padding:3px;" class="sub_h">hidden</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="seeBodCon" class="row">
                            <div id="noJsConPrf">
                                <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">You have no Journals yet!</p>
                                <div class="nonExplr" style="margin:auto; border-radius:15px; width: 150px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/addxs.png" alt="" width="15px" height="15px"> add Journals </p> </div>
                            </div>
                            <span id="dropbox-jrn-prf"></span>
                        </div>

                        <div id="hidBodCon" style="width:100%; display:none;">
                            <p class="sub_h" style="font-size:14px; margin:5px; text-align:center;">Hidden posts <img src="assets/imgs/lock.png" alt="" width="13px" height="13px"></p>
                            <div id="checknum-hd" style="margin:auto; width:150px; cursor:pointer;">
                                <br>
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/block.png" alt="" width="100%" height="70px" style="opacity:0.3;">
                                </div>
                                <p class="sub_h" style="margin:5px; font-size:12px; text-align:center;"> You have no hidden journals </p>
                            </div>
                            <span id="dropbox-hd"></span>
                        </div>

                        <br>
                    </div>

                    <!-- str body bellow -->
                    <div id="strPrfBd" class="col-xs-12 noneExst" style="margin-bottom:20px; display:none;">
                         <div style="width:100%; height:40px;">
                            <div style="width:50%; float:left; height:100%;">
                                <div id="thrFlwOpn" style="width:80px; height:30px; margin:auto; margin-top:5px; cursor:pointer; border-bottom:solid 2px skyblue;">
                                    <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="min_titls">threads</p>
                                </div>
                            </div>
                            <div style="width:50%; float:left; height:100%;">
                                <div id="strFlwOpn" style="width:80px; height:30px; margin:auto; margin-top:5px; cursor:pointer;">
                                    <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="min_titls">strings</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- thr str -->
                        <div class="row" id="thrFlowCon">
                            <div id="checknum-t" style="margin:auto; width:150px; cursor:pointer;">
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/addxs.png" alt="" width="100%" height="70px">
                                </div>
                                    <p class="sub_h" style="margin:5px; font-size:12px; text-align:center;"> <strong style="font-size:15px;">+</strong> Add threads</p>
                            </div>
    
                            <span id="dropbox-thr"></span>
                        </div>

                        <!-- flow str -->
                        <div class="row" id="strFlowCon" style="display: none;">
                            <div id="checknum-s" style="margin:auto; width:150px; cursor:pointer;">
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/addxs.png" alt="" width="100%" height="70px">
                                </div>
                                    <p class="sub_h" style="margin:5px; font-size:12px; text-align:center;"> <strong style="font-size:15px;">+</strong> Add Strings</p>
                            </div>
                            <span id="dropbox-str"></span>
                        </div>

                        <br>
                    </div>

                    <!-- aut body below -->
                    <div id="forPrfAut" class="col-xs-12 noneExst" style="margin-bottom:20px; display:none;">
                        <div style="width:100%; height:37px;">
                            <p class="sub_h" style="float:left; font-size:12.5px; margin:0px; padding:5px;"> <img src="assets/imgs/read.png" width="13px" height="13px" style="margin-top:-2.5px; margin-right:5px;"> reads <span style="color:orange; font-size:14px;" id="myReadsLenAut">0</span> </p>
                            <button style="color: none; border: none; background-color: transparent; border-radius: 15px; margin: 3px; float: right;" class="btn btn-default sub_hs rte_btn" id="opnMyBksShlf">
                                <span style="margin: 3px; font-weight: normal;"> <img src="assets/imgs/bread.png" alt="" width="13px" height="13px" style="margin: 1.5px;"> books </span>
                            </button>
                        </div>

                        <div id="noAutCnPrf">
                            <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">You have no Author Contents yet!</p>
                            <div class="nonPrfaut" style="margin:auto; border-radius:15px; width: 150px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/addxs.png" alt="" width="15px" height="15px"> add Journals </p> </div>
                        </div>
                        
                        <div class="row">
                            <span id="dropbox-aut-prf"></span>
                        </div>

                        <br>
                    </div>

                </div>


                <div style="height:40px;"></div>
                

            </div>

        </div>
        `
    };
    // $('#drpPrf').append(profBod());

   // nav profile btn
   $('#opnPrf').click(()=>{
        $('#opnPrf').css('border', 'solid 3px darkorange');
        $('#opnCht, #opnWrt, #opnNti, #opnHme, #hmeHD, #chtHD, #ntiHD, #opnLfn, #refrshr_con, #sbNav, #mainSrchCon, #allCartNewsFlowBod, #chatsFlowBod, #notiBod').css('border', 'none');
        $('#prfHD, #prfBody').fadeIn(50);
        $('#goToHome').click();
        window.scrollTo(0, 0);
        setTimeout(() => {
            var child = 'profile';
            childP(child);
            reInstt();
            //$('.stylePosts').remove();
            infos();
            Dark();
            $('#opnCht, #opnWrt, #opnNti, #opnHme, #hmeHD, #chtHD, #ntiHD, #opnLfn, #refrshr_con, #sbNav, #mainSrchCon, #allCartNewsFlowBod, #chatsFlowBod, #notiBod').css('border', 'none');
            $('#hmeHD, #chtHD, #ntiHD, #opnLfn, #refrshr_con, #sbNav, #mainSrchCon, #allCartNewsFlowBod, #chatsFlowBod, #notiBod').css('display', 'none');
            setTimeout(() => {
                $('#opnJrnPrf').click();
            }, 1500);
        }, 100);
    });

    // checknnum-add bns
    $('#noJsConPrf').click(()=>{
        $('#opnWrt').click();
        $('#opnWrtJr').click();
    });
    $('#checknum-t').click(()=>{
        $('#opnWrt').click();
        $('#opnWrtStr').click();
    });
    $('#checknum-s').click(()=>{
        $('#opnWrt').click();
        $('#opnWrtStr').click();
    });
    var locNow = 'flwn';
    $('#frnAr').click(function(){
        // assignDb();
        $('#openFriends').fadeIn();
        $('#flwnDiv').css('display', 'block');
        $('#flwrDiv').css('display', 'none');
        $('#opnFlwn').css('border-bottom', 'solid 1px skyblue');
        $('#opnFlwr').css('border-bottom', '');
        $('.frndsChild').remove();
        locNow = 'flwn';
        getFlwnp();
        addFrndsLen();
        Dark();
    });
    $('#closeFriends').click(function(){
        $('#openFriends').fadeOut();
    });
    $('#opnFlwn').click(function(){
      $('#flwnDiv').css('display', 'block');
      $('#flwrDiv').css('display', 'none');
      $('#opnFlwn').css('border-bottom', 'solid 1px skyblue');
      $('#opnFlwr').css('border-bottom', '');
      $('.frndsChild').remove();
        locNow = 'flwn';
        getFlwnp();
        addFrndsLen();
    });
    $('#opnFlwr').click(function(){
      $('#flwrDiv').css('display', 'block');
      $('#flwnDiv').css('display', 'none');
      $('#opnFlwr').css('border-bottom', 'solid 1px skyblue');
      $('#opnFlwn').css('border-bottom', '');
      $('.frndsChild').remove();
        locNow = 'flwrs';
        getFlwrs();
        addFrndsLen();
    });

    // open books
    // book shelf
    $(`#opnMyBksShlf`).click(()=>{
        global.ex_book.id = udata._id;
        global.ex_book.flag = 'y';
    });

    // settings
    $('#editProfprofy').click(()=>{
        $('#opnSetngs').click();
    })
        
    // EXTRACTION AND NODES FUNCTIONALITIES
    //--------------------------------------
    // fetch followers
    const getFlwrs = () => {
        //$('.frndsChild').remove();
        refreshI(); extractU();
        if (udata.followers.length > 0) {
            for (let y = 0; y < udata.followers.length; y++) {
                console.log('follower: '+udata.followers[y].user);
                display(udata.following, udata.followers[y]);
            }
        }
        Dark();
    };
    // fetch following
    const getFlwnp = () => {
        //$('.frndsChild').remove();
        refreshI(); extractU();
        for (let i = 0; i < udata.following.length; i++) {
            displayFlwn(udata.following[i].user);
        }
        Dark();
    }; 
    const addFrndsLen = () => {
        refreshI();
        $('#getFlwnMe').text(udata.following.length);
        $('#getFlwrsMe').text(udata.followers.length);
    };
    
    // FRIENDS BOD TYPES
    // following
    const Folwn = (data, ids, path, clas, bkg) => {
       return `
         <div class="frndsChild" style="width:98%; margin:auto; height:40px; border-radius:5px; margin-top:7.5px; display:none;">
             <div style="width:25%; height:100%; float:left;">
                 <div class="${clas}" style="width:25px; height:25px; float:left; background-image:url(${path}); background-size:${bkg}; border-radius:100%; margin:3px; margin-top:6.5px;"></div>
                 <img src="assets/imgs/chat.png" width="25px" height="25px" style="margin:5px; float:left; cursor:pointer; margin-top:7px;" id="${ids.chatUp}">
             </div>
             <div style="width:45%; height:100%; float:left;">
                 <p id="${ids.goUser}" class="sub_h" style="margin:0px; padding:8px; margin-top:3px; font-size:12px;">${data} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
             </div>
             <div style="width:30%; height:100%; float:right;">
                 <button id="${ids.unfllwId}" class="btn btn-default btn-xs" style="margin:5px; color:white; background-color:orange; border:solid 1px orange; margin-top:8px;">unfollow</button>
             </div>
         </div>
       `
    };
    // following
    const Folwn2 = (user, ids, path, clas, bkg) => {
        return `
            <div class="frndsChild" style="width:98%; margin:auto; height:40px; border-radius:5px; margin-top:7.5px; display:none;">
                <div style="width:25%; height:100%; float:left;">
                    <div class="${clas}" style="width:25px; height:25px; float:left; background-image:url(${path}); background-size:${bkg}; border-radius:100%; margin:3px; margin-top:6.5px;"></div>
                    <img src="assets/imgs/chat.png" width="25px" height="25px" style="margin:5px; float:left; cursor:pointer; margin-top:7px;" id="${ids.chatUp2}">
                </div>
                <div style="width:45%; height:100%; float:left;">
                <p id="${ids.goUser}" class="sub_h" style="margin:0px; padding:8px; margin-top:3px; font-size:12px;">${user} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                </div>
                <div style="width:30%; height:100%; float:right;">
                    <button id="${ids.unfllwId2}" class="btn btn-default btn-xs" style="margin:5px; color:white; background-color:orange; border:solid 1px orange; margin-top:8px;">unfollow</button>
                </div>
            </div>
        `
    };
    // not following
    const Folwr = (data, ids, path, clas, bkg) => {
        return `
        <div class="frndsChild" style="width:98%; margin:auto; height:40px; border-radius:5px; margin-top:7.5px; display:none;">
                <div style="width:25%; height:100%; float:left;">
                    <div class="${clas}" style="width:25px; height:25px; float:left; background-image:url(${path}); background-size:${bkg}; border-radius:100%; margin:3px; margin-top:6.5px;"></div>
                    <img src="assets/imgs/chat.png" width="25px" height="25px" style="margin:5px; float:left; cursor:pointer; margin-top:7px;">
                </div>
                <div style="width:45%; height:100%; float:left;">
                <p id="${ids.goUser}" class="sub_h" style="margin:0px; padding:8px; margin-top:3px; font-size:12px;">${data} <img src="assets/imgs/verification.png" id="${ids.verIcon}" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                </div>
                <div style="width:30%; height:100%; float:right;">
                    <button id="${ids.followId}" class="btn btn-default btn-xs" style="margin:5px; color:grey; background-color:transparent; border:solid 1px orange; margin-top:8px;">follow</button>
                </div>
        </div>
        `
    };
     
    // ACTION BUTTONS
    //----------------
    const checkBtns = (user, followId, unfllwId) => {
        var users = db.users;
        const thrw = (usr, main) => {
            for (let i = 0; i < usr.waiting_list.length; i++) {
                if (usr.waiting_list[i].user == main._id) {
                    $(`#${followId}`).text('requested');
                    $(`#${followId}`).css('color', 'white');
                    $(`#${followId}`).css('background-color', 'orange');
                }
            }                        
        };
        if (users) {
            for (let i = 0; i < users.length; i++) {
                    if (users[i]._id == user) {
                        thrw(users[i], udata);
                    }                       
            }
        }
   };
    // follow button
    const follow = (data, followId, unfllwId) => {
        const btn = $(`#${followId}`);
        btn.click(function(){
            const priv = (usr, mainUser) => {
                if (usr.publicity == 'private') {
                    addReq(mainUser);
                }else {
                    cnct(mainUser);
                }
            };
            const addReq = (mainUser) => {
                var pData = {
                    section: 'ex_user',
                    type: 'add_req',
                    id: udata._id, 
                    wait: {user: udata._id}, 
                    ex: data,
                    noti: {user: mainUser, noti_type: 'frnd_rq', date: [year, day, month, hour, minute, secnds]},
                    subtype: 'add_req'
                };
                postData(pData);
                $('.frndsChild').remove();
                // assignDb();
                setTimeout(() => {
                    getFlwrs();
                    addFrndsLen();
                }, 2000);
            };
            const cnct = (mainUser) => {
                var pData = {
                    section: 'ex_user',
                    type: 'follow',
                    id: udata._id, 
                    following: {user: data}, 
                    ex: data,
                    noti: {user: mainUser._id, noti_type: 'follow', date: [year, day, month, hour, minute, secnds]},
                    subtype: 'follow_list'
                };
                postData(pData);
                $('.frndsChild').remove();
                // assignDb();
                setTimeout(() => {
                    getFlwrs();
                    addFrndsLen();
                }, 2000);
            };
            // assignDb();
            setTimeout(() => {
                var mainUser = udata;
                if (mainUser) {
                    var users = db.users;
                    for (let i = 0; i < users.length; i++) {
                        if (users[i]._id == data) {
                            priv(users[i], mainUser)
                        }                               
                    }
                }
            }, 1);
        });
    };
    // unfollow button
    const unfollow = (data, unfllwId) => {
          const btn = $(`#${unfllwId}`);
        btn.click(function(){
            extractU();
            const cnct = (mainUser) => {
                var pData = {
                    section: 'ex_user',
                    type: 'unfollow',
                    id: udata._id, 
                    following: {user: data}, 
                    ex: data,
                    noti: {user: mainUser._id, noti_type: 'follow'},
                    subtype: 'follow_list'
                };
                postData(pData);
                $('.frndsChild').remove();
                // assignDb();
                setTimeout(() => {
                    if (locNow == 'flwn') {
                        getFlwnp();
                        reqs(mainUser);
                    }else {
                        getFlwrs();
                    }
                    addFrndsLen();
                }, 2000);
            };
            cnct(udata);
        })
        // requests
        const reqs = (mainUser) => {
            var pData = {
                section: 'ex_user',
                type: 'rem_req',
                id: udata._id, 
                wait: {user: udata._id}, 
                ex: data,
                noti: {user: mainUser._id, noti_type: 'frnd_rq'},
                subtype: 'frnd_list'
            };
            postData(pData);
            // assignDb();
            setTimeout(() => {
                getFlwrs();
            }, 2000);
        };
    };
    // chat-up friend
    const chatUp = (exdata, chatUp) => {
        
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
                        $('#opnCht').click();
                    }, 1000);
                };
                var doesnt = (mainUser, exdata) => {
                    var pData = {
                        section: 'chat',
                        type: 'add_chat',
                        chat: {mainUser: mainUser, exdata: exdata},
                    };
                    postData(pData);
                    setTimeout(() => {
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
                }else {
                    doesnt(mainUser, exdata);
                }
                
            };
            getBoth();
        });

    };
       
    
    const idExFunc = (data, users, userIdEx) => {
     
        $(`#${userIdEx}`).click(()=>{
            $('.ex-slider').remove();
            $('#closeFriends').click();
            if (data == udata._id) {
                $('#opnPrf').click();
            }else {
                $('.ex-slider').remove();
                global.ex_user = data;
                global.ex_flag = 'y';
            }
            
        });
    };

    // create ids for followers
    const createIds = (user2) => {
        return {
             goUser: 'goUser_' + user2.user,
             // go prof done
             verIcon: 'verIcon_you_' + user2.user,
             // vrification check done
            followId: 'follow_' + user2.user,
            unfllwId: 'unfllw_prof_' + user2.user,
            // cat up funcs
            chatUp: 'chatUp_' + user2.user
        }
    };

    // create ids for following
    const createIds2 = (data) => {
        return {
             goUser: 'goUser_me_' + data,
             // go prof done
             verIcon: 'verIcon_me_' + data,
             // vrification check done
             followId2: 'follow_me_' + data,
             unfllwId2: 'unfllw2_me_' + data,
             // cat up funcs
             chatUp2: 'chatUp2_me_' + data,
        }
    };
    
    // DISPLAY FRIENDS
    //-----------------
    // display followers
    const display = (user, user2) => {
        const ids = createIds(user2);
        var unme = ''; var ver = '';
        // light or dark effects
        var data3 = db.users;
        for (let z = 0; z < data3.length; z++) {
            if (data3[z]._id == user2.user) {
                unme = data3[z].user_name;
                ver = data3[z].verification;
            }
        }
        var path = ''; var clas = ''; var bkg = '';
        for (let x = 0; x < data3.length; x++) {
            if (data3[x]._id == user2.user) {
              if (data3[x].profile_pic == 'none') {
                  path = 'assets/imgs/profb.png';
                  clas = '';
                  bkg = '100% 100%';
              }else {
                  path = `https://test-vyral.onrender.com/${data3[x].profile_pic.path}`;
                  clas = `${data3[x].profile_pic.class}`;
                  bkg = 'cover';
              }
            }
        }
        var whoIs = '';
        for (let i = 0; i < user.length; i++) {
            if (user[i].user == user2.user) {
                whoIs = user[i].user;
                $('#drop-flwr').prepend(Folwn(unme, ids, path, clas, bkg));
            }
        }
        if (whoIs == '') {
            $('#drop-flwr').prepend(Folwr(unme, ids, path, clas, bkg));
        }
        if (udata.mode == 'light') {
            $('.frndsChild').css('border', 'solid 1px #dddddd');
            $('.frndsChild').css('background-color', 'white');
        }else {
            $('.frndsChild').css('border', 'solid 1px #404040');
            $('.frndsChild').css('background-color', '#1a1a1a');
        }
        checkBtns(user2.user, ids.followId, ids.unfllwId);
        follow(user2.user, ids.followId, ids.unfllwId);
        unfollow(user2.user, ids.unfllwId);
        chatUp(user2.user, ids.chatUp);
        idExFunc(user2.user, data3, ids.goUser);
        if (ver == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        var targetDate = new Date();
          targetDate.setMilliseconds(targetDate.getMilliseconds() + 0.1);
          var countDownDate = targetDate.getTime();
          var x = setInterval(function() {
              var now = new Date().getTime();
              var distance = countDownDate - now;
              // check duration to currentime
              if (distance < 0) {
                  $('.frndsChild').fadeIn();
                  clearInterval(x);
              }
          }, 1000);
        
   };

   const displayFlwn = (data) => {
        const ids = createIds2(data);
        var unme2 = ''; var ver = '';
       var data3 = db.users;
        for (let z = 0; z < data3.length; z++) {
            if (data3[z]._id == data) {
                unme2 = data3[z].user_name;
                ver = data3[z].verification
            }
        }
        var path = ''; var clas = ''; var bkg = '';
        for (let x = 0; x < data3.length; x++) {
            if (data3[x]._id == data) {
                if (data3[x].profile_pic == 'none') {
                    path = 'assets/imgs/profb.png';
                    clas = '';
                    bkg = '100% 100%';
                }else {
                    path = `https://test-vyral.onrender.com/${data3[x].profile_pic.path}`;
                    clas = `${data3[x].profile_pic.class}`;
                    bkg = 'cover';
                }
            }
        }
        $('#drop-flwn').prepend(Folwn2(unme2, ids, path, clas, bkg));
        if (udata.mode == 'light') {
            $('.frndsChild').css('border', 'solid 1px #dddddd');
            $('.frndsChild').css('background-color', 'white');
        }else {
            $('.frndsChild').css('border', 'solid 1px #404040');
            $('.frndsChild').css('background-color', '#1a1a1a');
        }
        unfollow(data, ids.unfllwId2);
        chatUp(data, ids.chatUp2);
        idExFunc(data, data3, ids.goUser);
        if (ver == 'on') {
            $(`#${ids.verIcon}`).css('display', 'inline');
        }
        var targetDate = new Date();
            targetDate.setMilliseconds(targetDate.getMilliseconds() + 0.1);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                // check duration to currentime
                if (distance < 0) {
                    $('.frndsChild').fadeIn();
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
                profile();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
