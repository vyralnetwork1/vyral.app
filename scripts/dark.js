import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
function Dark() {

   var allApps = JSON.parse(localStorage.getItem("app"));
   var app = global.app_store;
   var udata = '';
   const refreshI = () => {
         setTimeout(() => {
            extractU();
         }, 1);
   }
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
    extractU();

   // check mode box-shadow:0px 0px 20px 0px grey;
   var checkDark = () => {
      if (app.userSess !== '') {
         var userN = '';
         for (let i = 0; i < db.users.length; i++) {
            if (db.users[i]._id == app.userSess) {
               userN = db.users[i];
            }
         }
          if (userN.mode == 'light') {
             // darkmode buttons efects
             $('#darkb').css('display', 'none');
             $('#darkg').css('display', 'block');
             $('#darkXsOn').css('display', 'block');
             $('#darkXsOff').css('display', 'none');
             
             //body
             $('body, #Wholebody, .container-fluid').css('background-color', '#f9f9f9');
             $('body, .usrAutUiBodss, .botmHldr').css('background-color', '#f9f9f9');

             // text
             $('.sub_h').css('color', 'grey');
             $('.sub_hs').css('color', 'silver');
             $('.headings').css('color', '#1a1a1a');
       
             // header effects
             $('.navs, .nonExplr, .detailsBod, #sbNav, .srchCon_in, .auCats_set, .cats_backs').css('background-color', 'white');
             $('#sbNav').css('border-top', 'solid 1px #f9f9f9');
             $('.subnavs, .leftnavCat, .noneExst, #chatsDrpCon, #chtFrndsSrch').css('background-color', '#f9f9f9');
             // small header
             $('.noneExst, #chatsDrpCon').css('border', '#dddddd');
             $('.sbNav').css('border-top', '#dddddd');
             $('.sbNav, #mainSrchCon, .detailsBod').css('border-bottom', '#dddddd');
             $('.clsNavs, .nonExplr, .src_bottom, .input_btm').css('border-bottom', 'solid 1px #f0f0f0');
             $('.contNav, .bottom').css('border-bottom', 'solid 1px #f9f9f9');
             $('#naverxs, .averageBack').css('background-color', 'white');
             $('#naverxs').css('border-bottom', 'solid 1px #dddddd');
             $('#naverxs').css('border-top', 'solid 1px #dddddd');
             $('#minnaver').css('background-color', '#f9f9f9');
             $('#minnaver').css('border-bottom', '#dddddd');
             $('#openwj-xs, #openlocate-xs, #openwj, #strThrMainNav, .bodySubNav').css('background-color', 'white');
       
             // left nav effects
             $(".leftNavCon").css('border', 'solid 1px #dddddd');
             $(".leftNavCon, .comm_txtA, .xs_sliderC").css('background-color', 'white');
             $("#leftNavNav").css('background-color', 'orange');
             $('.leftNavBod').css('border-bottom', 'solid 1px #f0f0f0');
             $('#leftNaver, #darknavarea').css('background-color', '#f9f9f9');
             $('#leftNaver, #leftNavad, .comm_txtA').css('border', 'solid 1px #f0f0f0');
             $('#leftNavad').css('background-color', '#f9f9f9');
             $('#leftNavdiv').css('background-color', '#f0f0f0');
             
             // alerts effects
             $('#writej-alert, #notilg-alert, .totagcon, .theChnCon, .theTiedCon').css('background-color', 'white');
             $('#writej-alert, #notilg-alert').css('box-shadow', '0px 0px 10px -2px rgba(0, 0, 0, 0.35)');
             $('#posterClosecon').css('border-bottom', 'solid 1px #f0f0f0');
             $('#openWj, #openIj, #openTj, #openStrcondiv, #openStrfrdiv, #openStrcontdiv').css('border-bottom', 'solid 1px #f0f0f0');
             $('#jcon, #jpicdiv, #tagfrnddiv, .theChnCon, #strContDiv, #strFrDiv, .theTiedCon, #srchPubStrFlw, .pre_srcBt').css('border', 'solid 1px #f0f0f0');
             $('#jcon, #jpicdiv, #tagfrnddiv, #strContDiv, #strFrDiv, #srchPubStrFlw').css('background-color', '#f9f9f9');
             $('#closeJbutcon, #closeImgbutcon, .tagSrchbx').css('border-bottom', 'solid 1px #f0f0f0');
             $('#closeTagbutcon, #closeStrFrbutcon').css('border-top', 'solid 1px #f0f0f0');
             $('.inptJI, #mainjh, #mainjb, #mainStrn, #mainStrh, #ScStr, #tagSrch, #strConHead, #tieSrchJrn').css('border-bottom', 'solid 1px #f0f0f0');
             $('#mainjb, #mainsb, .sendMessTxt, .txtJI').css('border', 'solid 1px #f0f0f0');
             $('#mainjb, #mainsb, .sendMessTxt, .txtJI').css('background-color', 'white');
             $('.closeImgFlwCon').css('border-bottom', 'solid 1px #f0f0f0');
             $('.scrlimgCon').css('border', 'solid 1px #f0f0f0');
             $('.scrlimgCon').css('background-color', 'white');
             $('.glossFlow').css('background-color', 'white');
             
             // chats effects
             $('#chat-head').css('background-color', 'white');
             $('#chat-head').css('border', 'solid 1px #dddddd');
             $('#chtBgsrchbx').css('border-bottom', 'solid 1px #dddddd');
       
             // profile effects
             $('#profNavbar, .rte_btn').css('background-color', 'white');
             $('#profNavbar').css('border', 'solid 1px #dddddd');
             $('#chekcFrndsbtCon, .brd-rg').css('border-right', 'solid 1px #f0f0f0');
             $('#flowbod, #reaOrStr').css('background-color', '#f9f9f9');
             $('#flowbod, #reaOrStr').css('border', 'solid 1px #dddddd');
             $('#profbod').css('background-color', 'white');
             $('#profbod').css('border', 'solid 1px #dddddd');
             $('.topProfon').css('border-bottom', 'solid 1px #f0f0f0');
             $('#statusdiv, .bodySubNav').css('border-top', 'solid 1px #f9f9f9');
             $('#statusdiv').css('border-bottom', 'solid 1px #f9f9f9');
             $('#editprofilebut').css('border-bottom', 'solid 1px #f0f0f0');
             $('#editprofilebut, .profuname, .min_titls').css('color', '#1a1a1a');
             $('#openprofad').css('border-bottom', 'solid 1px #f0f0f0');
             $('#openprofad').css('color', '#1a1a1a');
             $('#editprofile').css('background-color', 'white');
             $('#editprofile, #editstat, #editname, #editpic, #chngusr, #chngpss, #chngeml, #privarea, #darkXsarea').css('border-bottom', 'solid 1px #f0f0f0');
             $('#profadsselectdiv').css('background-color', 'white');
             $('#profadsselectdiv').css('border-bottom', 'solid 1px #f0f0f0');
             $('#privAlign, #darkXsCon, #darkBgCon, .darkBgCon').css('background-color', '#f0f0f0');
             $('#privAlign, #darkXsCon, #darkBgCon, .darkBgCon').css('border', 'solid 0.5px #dddddd');
             // prof ads
             $('#frndsMainCon').css('background-color', '#f0f0f0');
             $('#frndsNavCon').css('background-color', 'white');
             $('#frndsSrchCon').css('background-color', '#f9f9f9');
             $('#frndsSrchCon, #frndsHd, #frndsNavCon').css('border-bottom', 'solid 1px #f9f9f9');
             $('#frndsSrchFrnds').css('border-right', 'solid 1px #dddddd');
             // edit pop-ups
             $('#editPopBod, #editPopBod2').css('background-color', 'white');
             $('#editPopHead, #editPopHead2').css('border-bottom', 'solid 1px #f0f0f0');
             $('#tastatus').css('border', 'solid 1px #f0f0f0');
             $('#edtnmin, #editunamein, #chckpwdin, #confpwdin, #veremlin, #confemlin, #confpwdmain').css('border-bottom', 'solid 1px #f0f0f0');
             
             // notifications-con/chats-con effects
             $('#noticon-xs').css('background-color', 'white');
             $('#noticon-xs').css('border-bottom', 'solid 1px #f0f0f0');
             $('#notibod-xs').css('background-color', 'white');
             $('#notibod-xs').css('border-bottom', 'solid 1px #f0f0f0');
       
             // searcher con
             $('#searcherCon, #chtSrchr, #chtFlwAll, #noChatsClckd, .all_books_l_c').css('background-color', 'white');
             $('#searcherCon, #chtSrchr, #chtFlwAll, #noChatsClckd').css('border', 'solid 0.6px #dddddd');
             $('#searcherNav, .usrAutCats').css('background-color', '#f9f9f9');
             $('#srchfrndstags').css('border-bottom', 'solid 1px #dddddd');
             
             // opts
             $('.areYSPCon').css('background-color', 'white');
             $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #f0f0f0');
       
             // External user 
             $('#askFollowCon, #askFollowCon2, #darknavarea').css('border-top', 'solid 1px #f0f0f0');
          }
          if (userN.mode == 'dark') {
             
             // darkmode buttons efects
             $('#darkg').css('display', 'none');
             $('#darkb').css('display', 'block');
             $('#darkXsOff').css('display', 'block');
             $('#darkXsOn').css('display', 'none');
             
             // body
             $('body, #Wholebody, .container-fluid').css('background-color', '#333333');
             $('body, .usrAutUiBodss, .botmHldr').css('background-color', '#333333');
             // text
             $('.sub_h').css('color', '#f9f9f9');
             $('.sub_hs').css('color', '#f0f0f0');
             $('.headings').css('color', 'white');
             
             // header effects
             $('.navs, .nonExplr, .detailsBod, #sbNav, .srchCon_in, .auCats_set, .cats_backs').css('background-color', '#1a1a1a');
             $('#sbNav').css('border-top', 'solid 1px #262626');
             $('.subnavs, .leftnavCat, .noneExst, #chatsDrpCon, #chtFrndsSrch, .averageBack').css('background-color', '#262626');
             // small header
             $('.noneExst, #chatsDrpCon').css('border', '#262626');
             $('.sbNav').css('border-top', '#262626');
             $('.sbNav, #mainSrchCon, .detailsBod').css('border-bottom', '#262626');
             $('.clsNavs, .nonExplr, .src_bottom').css('border-bottom', 'solid 1px #262626');
             $('.contNav, .bottom, .input_btm').css('border-bottom', 'solid 1px #404040');
             $('#naverxs').css('background-color', '#1a1a1a');
             $('#naverxs').css('border-bottom', 'solid 1px #262626');
             $('#naverxs').css('border-top', 'solid 1px #262626');
             $('#minnaver').css('background-color', '#404040');
             $('#minnaver').css('border-bottom', '#262626');
             $('#openwj-xs, #openlocate-xs, #openwj, #strThrMainNav, .bodySubNav').css('background-color', '#262626');
       
             // left nav effects
             $(".leftNavCon").css('border', 'solid 1px #404040');
             $(".leftNavCon, .comm_txtA, .xs_sliderC").css('background-color', '#292929');
             $("#leftNavNav").css('background-color', 'darkorange');
             $('.leftNavBod').css('border-bottom', 'solid 1px #404040');
             $('#leftNaver, #darknavarea').css('background-color', '#262626');
             $('#leftNaver, #leftNavad, .comm_txtA').css('border', 'solid 1px #404040');
             $('#leftNavad').css('background-color', '#262626');
             $('#leftNavdiv').css('background-color', '#404040');
       
             // alerts effects
             $('#writej-alert, #notilg-alert, .totagcon, .theChnCon, .theTiedCon').css('background-color', '#262626');
             $('#writej-alert, #notilg-alert').css('box-shadow', '0px 0px 10px -2px rgba(0, 0, 0, 0.35)');
             $('#posterClosecon, .notiTopcon').css('border-bottom', 'solid 1px #404040');
             $('#openWj, #openIj, #openTj, #openStrcondiv, #openStrfrdiv, #openStrcontdiv').css('border-bottom', 'solid 1px #404040');
             $('#jcon, #jpicdiv, #tagfrnddiv, .theChnCon, #strContDiv, #strFrDiv, .theTiedCon, #srchPubStrFlw, .pre_srcBt').css('border', 'solid 1px #404040');
             $('#jcon, #jpicdiv, #tagfrnddiv, #strContDiv, #strFrDiv, #srchPubStrFlw').css('background-color', '#1a1a1a');
             $('#closeJbutcon, #closeImgbutcon, .tagSrchbx').css('border-bottom', 'solid 1px #404040');
             $('#closeTagbutcon, #closeStrFrbutcon').css('border-top', 'solid 1px #404040');
             $('.inptJI, #mainjh, #mainjb, #mainStrn, #mainStrh, #ScStr, #tagSrch, #strConHead, #tieSrchJrn').css('border-bottom', 'solid 1px #404040');
             $('#mainjb, #mainsb, .sendMessTxt, .txtJI').css('border', 'solid 1px #404040');
             $('#mainjb, #mainsb, .sendMessTxt, .txtJI').css('background-color', '#262626');
             $('.closeImgFlwCon').css('border-bottom', 'solid 1px #404040');
             $('.scrlimgCon').css('border', 'solid 1px #404040');
             $('.scrlimgCon').css('background-color', '#262626');
             $('.glossFlow').css('background-color', '#262626');
       
             // chats effects
             $('#chat-head').css('background-color', '#262626');
             $('#chat-head').css('border', 'solid 1px #404040');
             $('#chtBgsrchbx').css('border-bottom', 'solid 1px #404040');
       
             // profile effects
             $('#profNavbar, #reaOrStr, .rte_btn').css('background-color', '#262626');
             $('#profNavbar').css('border', 'solid 1px #404040');
             $('#chekcFrndsbtCon, .brd-rg').css('border-right', 'solid 1px #404040');
             $('#flowbod').css('background-color', '#333333');
             $('#flowbod, #reaOrStr').css('border', 'solid 1px #404040');
             $('#profbod').css('background-color', '#262626');
             $('#profbod').css('border', 'solid 1px #404040');
             $('.topProfon').css('border-bottom', 'solid 1px #404040');
             $('#statusdiv, .bodySubNav').css('border-top', 'solid 1px #404040');
             $('#statusdiv').css('border-bottom', 'solid 1px #404040');
             $('#editprofilebut').css('border-bottom', 'solid 1px #404040');
             $('#editprofilebut, .profuname, .min_titls').css('color', 'white');
             $('#openprofad').css('border-bottom', 'solid 1px #404040');
             $('#openprofad').css('color', 'white');
             $('#logout').css('border-bottom', 'solid 1px #404040');
             $('#editprofile').css('background-color', '#262626');
             $('#editprofile, #editstat, #editname, #editpic, #chngusr, #chngpss, #chngeml, #privarea, #darkXsarea').css('border-bottom', 'solid 1px #404040');
             $('#privAlign, #darkXsCon, #darkBgCon, .darkBgCon').css('background-color', '#404040');
             $('#privAlign, #darkXsCon, #darkBgCon, .darkBgCon').css('border', 'solid 0.5px #4d4d4d');
             $('#profadsselectdiv').css('background-color', '#262626');
             $('#profadsselectdiv').css('border-bottom', 'solid 1px #404040');
             // pop ups
             $('#frndsMainCon').css('background-color', '#262626');
             $('#frndsNavCon').css('background-color', '#1a1a1a');
             $('#frndsSrchCon').css('background-color', '#333333');
             $('#frndsSrchCon, #frndsHd, #frndsNavCon').css('border-bottom', 'solid 1px #404040');
             $('#frndsSrchFrnds').css('border-right', 'solid 1px #404040');
             // edit pop-ups
             $('#editPopBod, #editPopBod2').css('background-color', '#262626');
             $('#editPopHead, #editPopHead2').css('border-bottom', 'solid 1px #404040');
             $('#tastatus').css('border', 'solid 1px #404040');
             $('#edtnmin, #editunamein, #chckpwdin, #confpwdin, #veremlin, #confemlin, #confpwdmain').css('border-bottom', 'solid 1px #404040');
       
             // notification effects
             $('#noticon-xs').css('background-color', '#1a1a1a');
             $('#noticon-xs').css('border-bottom', 'solid 1px #262626');
             $('#notibod-xs').css('background-color', '#262626');
             $('#notibod-xs').css('border-bottom', 'solid 1px #404040');
       
             // searcher con
             $('#searcherCon, #chtSrchr, #chtFlwAll, #noChatsClckd, .all_books_l_c').css('background-color', '#262626');
             $('#searcherCon, #chtSrchr, #chtFlwAll, #noChatsClckd').css('border', 'solid 0.6px #404040');
             $('#searcherNav, .usrAutCats').css('background-color', '#1a1a1a');
             $('#srchfrndstags').css('border-bottom', 'solid 1px #404040');
       
             // opt
             $('.areYSPCon').css('background-color', '#1a1a1a');
             $('.edtPstFlw, .areYSPCon, .areysPP, .srchCon').css('border-bottom', 'solid 1px #404040');
       
             // External user 
             $('#askFollowCon, #askFollowCon2, #darknavarea').css('border-top', 'solid 1px #404040');
          }
      }
   };
    checkDark();
    
     // dark mode settings
    $('#onDarkN').click(function() {
       $('#darknavarea').slideDown(200);
    });
    $('#darkg, #darkXsOn').click(function() {
       $('#darkg').css('display', 'none');
       $('#darkb').css('display', 'block');
       $('#darkXsOn').css('display', 'none');
       $('#darkXsOff').css('display', 'block');
       global.page_ld = 'y';
       setTimeout(() => {
          var pData = {
            section: 'settings',
            type: 'dark',
            user: udata._id,
            set: {mode: 'dark'},
         };
         postData(pData);
         refreshI();
         $('#clsSetngs-alrt').click();
       }, 100);
    });
    $('#darkb, #darkXsOff').click(function() {
       $('#darkb').css('display', 'none');
       $('#darkg').css('display', 'block');
       $('#darkXsOff').css('display', 'none');
       $('#darkXsOn').css('display', 'block');
       global.page_ld = 'y';
      setTimeout(() => {
         var pData = {
            section: 'settings',
            type: 'dark',
            user: udata._id,
            set: {mode: 'light'},
         };
         postData(pData);
         refreshI();
         $('#clsSetngs-alrt').click();
      }, 100);
    });
 
 }
 const checkDb = () => {
   setTimeout(() => {
      if (db_f == 'y') {
         setTimeout(() => {
            Dark();
         }, 500);
      } else {
          checkDb();
      }
  }, 1);
}
checkDb();

export {Dark};
