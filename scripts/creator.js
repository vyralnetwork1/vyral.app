import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function create() {

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
    console.log('creator');

    // DROP BODY
    const posterBod = (ind) => {
        return `
        <div class="container-fluid" id="writepost-con" style="display: none;">
    
            <div class="row">

                <!-- write post head -->
                <div class="col-xs-12 navs" style="position: fixed; z-index: ${ind}; height: 50px; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.3);">
                    <div style="width: 20%; height: 100%; margin-top: 5px; float: left;">
                        <div style="width: 40px; height: 40px; margin:auto;">
                            <p style="margin:0px; padding:5px; text-align:center;">
                                <img id="opnWrtJr" src="assets/imgs/read.png" alt="" width="25px" height="25px">
                            </p>
                        </div>
                    </div>
                    <div style="width: 20%; height: 100%; margin-top: 5px; float: left;">
                        <div style="width: 40px; height: 40px; margin:auto;">
                            <p style="margin:0px; padding:5px; text-align:center;">
                                <img id="opnWrtStr" src="assets/imgs/strings2.png" alt="" width="25px" height="25px">
                            </p>
                        </div>
                    </div>
                    <div style="width: 20%; height: 100%; margin-top: 5px; float: left;">
                        <div style="width: 40px; height: 40px; margin:auto;">
                            <p style="margin:0px; padding:5px; text-align:center;">
                                <img id="opnAutCrt" src="assets/imgs/authand2.png" alt="" width="25px" height="25px" style="display:none;">
                            </p>
                        </div>
                    </div>
                    <img src="assets/imgs/can.png" alt="" width="18px" height="18px" style="float:right; margin:10px;" id="clsWrt">
                </div>

                <!-- write post bodies -->
                <div class="col-xs-12 navs" style="margin-top: 50px; position:fixed; z-index:${ind-1}; height: 100%; overflow-y:auto;">
                    <br>
                    
                    <!-- write post -->
                    <span id="dropWrt"></span>

                    <br>
                </div>

            </div>

        </div>
        `
    }; 
    
    // wrt J/S btn
    $('#opnWrt').on('click',()=>{
        console.log('open creator');
        // $('#container-one').css('display', 'none');
        global.pop_no++;
        $('#container-body').css('display', 'none');
        $('#dropCons').after(posterBod(global.pop_no));
        $('#writepost-con').fadeIn();
        $('.wrtCLass').remove();
        Dark();

        // cls
        $('#clsWrt').click(()=>{
            $('#writepost-con').remove();
            //$('#container-one').fadeIn();
            global.pop_no--;
            $('.wrtCLass').remove();
            $('#container-body').fadeIn();
        });

        // naver
        $('#opnWrtJr').click(()=>{
            $('#opnWrtJr').attr('src', 'assets/imgs/read.png');
            $('#opnWrtStr').attr('src', 'assets/imgs/strings2.png');
            $('#opnAutCrt').attr('src', 'assets/imgs/authand2.png');
            dropJr();
        });
        $('#opnWrtStr').click(()=>{
            $('#opnWrtStr').attr('src', 'assets/imgs/strings.png');
            $('#opnWrtJr').attr('src', 'assets/imgs/readen.png');
            $('#opnAutCrt').attr('src', 'assets/imgs/authand2.png');
            dropStr();
        });
        $('#opnAutCrt').click(()=>{
            $('#opnAutCrt').attr('src', 'assets/imgs/authand.png');
            $('#opnWrtJr').attr('src', 'assets/imgs/readen.png');
            $('#opnWrtStr').attr('src', 'assets/imgs/strings2.png');
            dropAut();
        });
        if (udata.user_type !== 'user') {
            if (udata.user_type.status == 'on') {
                $('#opnAutCrt').fadeIn();
            }
        }

        const checkMode = () => {
            if(udata.mode == 'light') {
                $('#writej-alert, #notilg-alert, .totagcon, .theChnCon, .theTiedCon, .navs-wrt').css('background-color', 'white');
                $('#writej-alert, #notilg-alert').css('box-shadow', '0px 0px 20px -5px #1a1a1a');
                $('#posterClosecon').css('border-bottom', 'solid 1px #f0f0f0');
                $('#openWj, #openIj, #openTj, #openStrcondiv, #openStrfrdiv, #openStrcontdiv').css('border-bottom', 'solid 1px #f0f0f0');
                $('#jcon, #jpicdiv, #tagfrnddiv, .theChnCon, #strContDiv, #strFrDiv, .theTiedCon, #srchPubStrFlw').css('border', 'solid 1px #f0f0f0');
                $('#jcon, #jpicdiv, #tagfrnddiv, #strContDiv, #strFrDiv, #srchPubStrFlw').css('background-color', '#f9f9f9');
                $('#closeJbutcon, #closeImgbutcon, .tagSrchbx').css('border-bottom', 'solid 1px #f0f0f0');
                $('#closeTagbutcon, #closeStrFrbutcon').css('border-top', 'solid 1px #f0f0f0');
                $('#mainjh, #mainjb, .mainjb, #mainStrn, #mainStrh, #ScStr, #tagSrch, #strConHead, #chtFrndsSrch, #tieSrchJrn').css('border-bottom', 'solid 1px #f0f0f0');
                $('#mainjb, .mainjb, #mainsb, .sendMessTxt').css('border', 'solid 1px #f0f0f0');
                $('#mainjb, .mainjb, #mainsb, .sendMessTxt').css('background-color', 'white');
                $('.closeImgFlwCon').css('border-bottom', 'solid 1px #f0f0f0');
                $('.scrlimgCon').css('border', 'solid 1px #f0f0f0');
                $('.scrlimgCon, .OpnChptrsCr').css('background-color', 'white'); 
                $('.chptrsCr').css('background-color', '#f0f0f0');
            }else {
                $('#writej-alert, #notilg-alert, .totagcon, .theChnCon, .theTiedCon, .navs-wrt').css('background-color', '#262626');
                $('#writej-alert, #notilg-alert').css('box-shadow', '0px 0px 20px -5px #0d0d0d');
                $('#posterClosecon, .notiTopcon').css('border-bottom', 'solid 1px #404040');
                $('#openWj, #openIj, #openTj, #openStrcondiv, #openStrfrdiv, #openStrcontdiv').css('border-bottom', 'solid 1px #404040');
                $('#jcon, #jpicdiv, #tagfrnddiv, .theChnCon, #strContDiv, #strFrDiv, .theTiedCon, #srchPubStrFlw').css('border', 'solid 1px #404040');
                $('#jcon, #jpicdiv, #tagfrnddiv, #strContDiv, #strFrDiv, #srchPubStrFlw').css('background-color', '#1a1a1a');
                $('#closeJbutcon, #closeImgbutcon, .tagSrchbx').css('border-bottom', 'solid 1px #404040');
                $('#closeTagbutcon, #closeStrFrbutcon').css('border-top', 'solid 1px #404040');
                $('#mainjh, #mainjb, .mainjb, #mainStrn, #mainStrh, #ScStr, #tagSrch, #strConHead, #chtFrndsSrch, #tieSrchJrn').css('border-bottom', 'solid 1px #404040');
                $('#mainjb, .mainjb, #mainsb, .sendMessTxt').css('border', 'solid 1px #404040');
                $('#mainjb, .mainjb, #mainsb, .sendMessTxt').css('background-color', '#262626');
                $('.closeImgFlwCon').css('border-bottom', 'solid 1px #404040');
                $('.scrlimgCon').css('border', 'solid 1px #404040');
                $('.scrlimgCon, .OpnChptrsCr').css('background-color', '#262626');
                $('.chptrsCr').css('background-color', '#1a1a1a');
            }
            
        };

        // BODIES
        const writeJBod = () => {
            return `
                <!-- write post -->
                <div id="wrtJrnCon" class="wrtCLass">
                    
                    <!-- journal div -->
                    <br>
                    <input maxlength="200" id="mainjh" class="sub_h" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="header" />
                    <textarea id="mainjb" class="sub_h" style="height:60px; margin:10px; width:90%; border-radius:5px;;" placeholder="body"></textarea>
                
                    <!-- picture div -->
                    <div style="width:100%; height:35px; margin-top:10px; cursor:pointer;" id="openIj">
                        <p style="padding:8px;" class="sub_h"> <img src="assets/imgs/img.png" alt="" width="20px" height="15px"> add images/videos <span class="caret" style="color:silver; font-size:20px;"></span> </p>
                    </div>
                    <div style="width:97%; height:295px; margin:auto; margin-top:5px; border-radius:5px; display:none;" id="jpicdiv">
                        <div id="closeImgbutcon" style="width:98%; height:35px; margin:auto;">
                            <p style="text-align:center;"><img src="assets/imgs/up.png" width="20p" height:15px; style="margin:5px; cursor:pointer;" id="closeImgcon"></p>
                        </div>
                        <div style="width:100%; height:265px; overflow-y:auto;">
                            <br style="argin:7px;">
                            <div id="addimgcon">
                                <p style="text-align:center; margin:5px;">

                                    <div style="width:80%; margin:auto;">
                                        <div id="fileTpeCon-jrn" style="margin-top:10px; width:140px; margin:auto;">
                                            <img src="assets/imgs/imgtype.png" width="50px" height="60px" style="float:left; cursor:pointer; margin:5px;" id="ClickImgIn">
                                            <img src="assets/imgs/vids.png" width="50px" height="60px" style="float:right; cursor:pointer; margin:5px;" id="clickVidJrn">
                                        </div>
                                        <div id="GoImgDiv"  style="display:none; margin:auto; width:165px; margin-top:10px;">
                                            <button id="SendGoImgs" type="button" name="button" class="btn btn-default btn-xs" style="border:solid 1px darkorange; border-radius:8px; background-color:transparent; color:grey; float:left;"> verify images <strong style="color:darkorange;">+</strong> </button>
                                            <button id="multibut" type="button" name="button" class="btn btn-default btn-xs" style="border:solid 1px orangered; border-radius:8px; background-color:transparent; color:grey; float:right;"> cancel <strong style="color:orangered;">&times;</strong> </button>
                                        </div>
                                    </div>
                                    <!-- img reviewer -->
                                    <div class="row scrlimgCon" id="scrlimgCon-jrn" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                                        <div class="closeImgFlwCon" id="closeImgFlwCon-jrn" style="width:98%; height:25px; margin:auto;">
                                            <p style="text-align:center; color:orangered; margin:5px; cursor:pointer;" id="cnIm_forJrn">cancel</p>
                                        </div>
                                        <br>
                                        <span id="flowHangerFltrd-jrn"></span>
                                    </div>
                                    <!-- vid reviewer -->
                                    <div class="row scrlimgCon" id="scrlvidCon-jrn" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                                        <div class="closeImgFlwCon" id="closeImgFlwCon-jrn" style="width:98%; height:25px; margin:auto;">
                                            <p style="text-align:center; color:orangered; margin:5px; cursor:pointer;" id="cnVd_forJrn">cancel</p>
                                        </div>
                                        <br>
                                        <span id="flowHangerFltrd-vid-jrn"></span>
                                    </div>

                                </p>
                            </div>
                            <div style="width:95%; height:180px; margin:auto; background-color:white; border-radius:5px; display:none;" id="imgAlignDiv">
                                <div style="width:100%; overflow-x:auto; height:180px;">
                                    <span id="ScrollImg"></span>
                                </div>
                            </div>
                        
                        </div>

                    </div>

                    <!-- tag frnds div -->
                    <div style="width:100%; height:35px; margin-top:10px; cursor:pointer;" id="openTj">
                        <p style="padding:8px;" class="sub_h"> <img src="assets/imgs/frnds.png" alt="" width="27.5px" height="20px"> tag friends <span class="caret" style="color:silver; font-size:20px;"></span> </p>
                    </div>
                    <div style="width:97%; margin:auto; margin-top:5px; margin-bottom:5px; border-radius:5px; display:none;" id="tagfrnddiv">
                        <div class="tagSrchbx" style="width:98%; height:30px; margin:auto;">
                            <input id="tagSrchJrn" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; border:none; width:85%; margin:4px; background-color:transparent; color:skyblue;" placeholder="search friends" />
                            <img src="assets/imgs/searcha.png" width="20px" height="20px" style="float:left; margin:4px; cursor:pointer;">
                        </div>
                        <div id="tagedMainCon" class="tagSrchbx" style="width:100%; display:none;">
                            <p class="sub_h" style="font-size:12px; text-align:center; margin:0px; padding:5px; cursor:pointer;">Tagged <strong id="incTagTot"></strong> people</p>
                            <div class="theChnCon" style="margin:auto; width:90%; height:100px; margin-bottom:10px; border-radius:5px; overflow-y:auto;">
                                <span id="flowAlredTagd"></span>
                            </div>
                        </div>
                        <div style="width:100%; height:198px; overflow-y:auto;">
                            <br style="margin:5px;">

                            <div id="conjrnTagknwnsrc">
                                <span id="flowfrndinTag"></span>
                                <span id="flowfrndinTag2"></span>
                            </div>

                            <div id="conjrnTagsrc" style="display:none;">
                                <span id="flowevrinTag"></span>
                                <span id="flowevrinTag2"></span>
                            </div>

                            <br>
                        </div>
                        <div id="closeTagbutcon" style="width:98%; height:35px; margin:auto;">
                            <p style="text-align:center;"><img src="assets/imgs/up.png" width="20p" height:15px; style="margin:5px; cursor:pointer;" id="closeImgcon"></p>
                        </div>
                    </div>

                    <!-- journal div -->
                    <div style="width:100%; height:80px;">
                    </div>

                    <div class="col-xs-12 navs-wrt" style="position: fixed; z-index:  ${global.pop_no++}; height: 35px; bottom:0; right:0; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.3);">
                        <p style="text-align:center; margin:0px; padding:5px;">
                            <button class="btn btn-default btn-xs" id="doneJourn" style="border-radius:15px; background-color:transparent; border:solid 1px darkorange; color:darkorange; display:none;">add journal</button>
                        </p>
                    </div>
                </div>
            `;
        };
        const writeSBod = () => {
            return `
            <div id="wrtStrCon" class="wrtCLass">

                <br>

                <!-- public/private -->
                <div style="width:100%; height:45px;">
                    <div id="PubStrWr" style="margin:5px; width:60px; height:35px; border-bottom:solid 1px skyblue; float:left; cursor:pointer;">
                        <p class="sub_h" style="margin:0px; padding:5px; text-align:center;">Public</p>
                    </div>
                    <div id="PerStrWr" style="margin:5px; width:70px; height:35px; float:left; cursor:pointer;">
                        <p class="sub_h" style="margin:0px; padding:5px; text-align:center;">Private</p>
                    </div>
                </div>

                <input maxlength="100" id="ScStr" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="border:none; width:90%; margin:10px; background-color:transparent; color:darkorange;" placeholder="string name" />
                <input maxlength="200" id="mainStrh"class="sub_h" style="border:none; width:90%; margin:10px; background-color:transparent; display:none;" placeholder="header" />
                <br>
                <textarea id="mainsb" class="sub_h" style="height:60px; margin:10px; width:90%; border-radius:5px; display:none;" placeholder="body"></textarea>

                <!-- pub str srh flow -->
                <div id="srchPubStrFlw" style="width:100%; height:200px; margin-top:20px; overflow-y:auto; display:none;">
                    <br>
                    <div id="alrtPubStrNoE" style="width:60%; margin:auto; display:none; margin-top:30px;">
                        <p class="sub_h" style="text-align:center; margin:2px; font-size:12.5px;">This string does not exist</p>
                    </div>
                    <p id="crtNewStrCon" style="text-align:center; margin:0px; font-size:10px; display:none;">
                        <button class="btn btn-xs btn-default" id="alrtPubStrNoE-btn" style="border:solid 1px darkorange; color:orange; background-color:transparent; border-radius:7.5px;">create new string?</button>
                    </p>

                    <span id="pbStrFlw"></span>

                    <br>
                </div>
                <!-- append chsn pubStr -->
                <span id="chsnPbStr"></span>

                <!-- add-string contents div -->
                <div style="width:100%; height:35px; margin-top:10px; cursor:pointer; display:none;" id="openStrcontdiv">
                    <p class="sub_h" style="padding:8px;"> <img src="assets/imgs/img.png" alt="" width="20px" height="15px"> <img src="assets/imgs/wa.png" alt="" width="15px" height="15px"> add thread to string <span class="caret" style="color:silver; font-size:20px;"></span> </p>
                </div>
                <div style="width:97%; height:300px; margin:auto; margin-top:5px; border-radius:5px; display:none;" id="strContDiv">
                    <div id="closeImgbutcon" style="width:98%; height:35px; margin:auto;">
                        <p style="text-align:center;"><img src="assets/imgs/up.png" width="20p" height:15px; style="margin:5px; cursor:pointer;" id="closeStrcontdiv"></p>
                    </div>
                    <div style="width:100%; height:275px; overflow-y:auto;">
                        <input maxlength="200" id="strConHead" class="sub_h" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="header" />
                        <p id="reqStrInf" class="sub_h" style="text-align:center; padding:5px; margin:0px; font-size">Add images/video <strong style="color:orangered; font-size:30px;">.</strong><i style="color:orangered; font-size:10px;">required</i></p>
                        <div id="" style="width:80%; margin:auto;">
                            <div id="fileTpeCon-str" style="margin-top:10px; width:130px; margin:auto; ">
                                <img src="assets/imgs/imgtype.png" width="50px" height="60px" style="cursor:pointer; margin:5px; float:left;" id="ClickImgStrIn">
                                <img src="assets/imgs/vids.png" width="50px" height="60px" style="cursor:pointer; margin:5px; float:right;" id="clickVidStr">
                            </div>
                            <div id="GoImgStrDiv" style="display:none; margin:auto; width:165px; margin-top:10px;">
                                <button id="SendGoStrImgs" type="button" name="button" class="btn btn-default btn-xs" style="border:solid 1px darkorange; border-radius:8px; background-color:transparent; color:grey; float:left;"> verify images <strong style="color:darkorange;">+</strong> </button>
                                <button id="multibut" type="button" name="button" class="btn btn-default btn-xs" style="border:solid 1px orangered; border-radius:8px; background-color:transparent; color:grey; float:right;"> cancel <strong style="color:orangered;">&times;</strong> </button>
                            </div>
                        </div>
                        <!-- img reviewer -->
                        <div class="row scrlimgCon" id="scrlimgCon-str" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                            <div class="closeImgFlwCon" id="closeImgFlwCon-str" style="width:98%; height:25px; margin:auto;">
                                <p style="text-align:center; color:orangered; margin:5px;">cancel</p>
                            </div>
                            <br>
                            <span id="flowHangerFltrd-str"></span>
                        </div>
                        <!-- vid reviewer -->
                        <div class="row scrlimgCon" id="scrlvidCon-str" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                            <div class="closeImgFlwCon" id="closeVidFlwCon-str" style="width:98%; height:25px; margin:auto;">
                                    <p style="text-align:center; color:orangered; margin:5px;">cancel</p>
                            </div>
                            <br>
                            <span id="flowHangerFltrd-vid-str"></span>
                        </div>
                    
                    </div>

                </div>
                <!-- add-friends contents div -->
                <div style="display:none; width:100%; height:35px; margin-top:10px; cursor:pointer;" id="openStrfrdiv">
                    <p style="padding:8px;" class="sub_h"> <img src="assets/imgs/frnds.png" alt="" width="20px" height="15px"> Tie friends to string <span class="caret" style="color:silver; font-size:20px;"></span> </p>
                </div>
                <div style="width:97%; margin:auto; margin-top:5px; margin-bottom:10px; border-radius:5px; display:none;" id="strFrDiv">

                    <div class="tagSrchbx" style="width:98%; height:30px; margin:auto;">
                        <input id="tieSrchJrn" onkeypress="clsAlphaNoOnly(event)" onpaste="return false;" style="float:left; border:none; width:85%; margin:4px; background-color:transparent; color:skyblue;" placeholder="search friends" />
                        <img src="assets/imgs/searcha.png" width="20px" height="20px" style="float:left; margin:4px; cursor:pointer;">
                    </div>
                    <div id="tiedMainCon" class="tagSrchbx" style="width:100%; display:none;">
                        <p class="sub_h" style="font-size:12px; text-align:center; margin:0px; padding:5px; cursor:pointer;">Tied <strong id="incTieTot"></strong> people</p>
                        <div class="theChnCon" style="margin:auto; width:90%; height:100px; margin-bottom:10px; border-radius:5px; overflow-y:auto;">
                            <span id="flowAlredTied"></span>
                        </div>
                    </div>
                    <div style="width:100%; height:198px; overflow-y:auto;">
                        <br style="margin:5px;">

                        <div id="conjrnTieknwnsrc">
                            <span id="flowfrndinTie"></span>
                            <span id="flowfrndinTie2"></span>
                        </div>

                        <div id="conjrnTiesrc" style="display:none;">
                            <span id="flowevrinTie"></span>
                            <span id="flowevrinTie2"></span>
                        </div>

                        <br>
                    </div>

                    <div id="closeStrFrbutcon" style="width:98%; height:35px; margin:auto;">
                        <p style="text-align:center;"><img src="assets/imgs/up.png" width="20p" height:15px; style="margin:5px; cursor:pointer;" id="closeStrcontdiv"></p>
                    </div>
                </div>
                <div style="width:100%; height:80px;">

                </div>
                <div class="col-xs-12 navs-wrt" style="position: fixed; z-index: ${global.pop_no++}; height: 35px; bottom:0; right:0; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.3);">
                    <p style="text-align:center; margin:0px; padding:5px;">
                        <button class="btn btn-default btn-xs" id="donePubStr" style="border-radius:15px; background-color:transparent; border:solid 1px darkorange; color:darkorange; display:none;"></button>
                        <button class="btn btn-default btn-xs" id="donePrvStr" style="border-radius:15px; background-color:transparent; border:solid 1px darkorange; color:darkorange; display:none;">create private string</button>
                    </p>
                </div>
            </div>
            `;
        };
        const writeABod = () => {
            return `
            <div id="wrtAutSct" class="wrtCLass">
                <br>

                    <!-- book/journal -->
                    <div style="width:100%; height:45px;">
                        <div id="bookNWr" style="margin:5px; width:60px; height:35px; border-bottom:solid 1px skyblue; float:left; cursor:pointer;">
                            <p class="sub_h" style="margin:0px; padding:5px; text-align:center;">Book</p>
                        </div>
                        <div id="jourANWr" style="margin:5px; width:70px; height:35px; float:left; cursor:pointer;">
                            <p class="sub_h" style="margin:0px; padding:5px; text-align:center;">Journal</p>
                        </div>
                    </div>

                    <!-- write book con -->
                    <div style="width:100%;" id="UAWrtB">
                        <p style="margin:0px; padding:5px; color:silver; text-align:center; font-size:13px;">cover image</p>
                        <div style="width:100px; height:130px; margin:auto;">
                            <div id="upldimg-bookCvr" style="background-image:url(assets/imgs/imgtype.png); background-size:100% 100%; width:100%; height:100%; cursor: pointer;"></div>
                            <img id="upplddImg-bookCvr" style="width: 100%; height: 100%; display:none; margin:auto; border-radius: 10px;">
                        </div>
                        <p id="dlt-uplddBkCvr" style="text-align: center; margin: 0px; padding: 5px; cursor: pointer; display:none;"><img src="assets/imgs/can.png" width="25px" height="25px" alt=""></p>
                        <br>
                        <p style="text-align:center; margin:5px;"><input maxlength="200" class="inptJI sub_hs" id="bkTTlUAut" style="border:none; width:90%; margin:10px; background-color:transparent; text-align:center;" placeholder="book title" /></p>
                        <div style="width:95%; height:400px; margin:auto; margin-top:10px; border-radius:5px;" class="alrtSubCons">
                            <div style="width:100%; height:25px;">
                                <p class="sub_hs" style="margin:0px; padding:3px; text-align:center; font-size:13px;">chapters & contents</p>
                            </div>
                            <div style="width:100%; height:115px;">
                                <div style="width:99%; height:110px; margin:auto; margin-top:3.5px; border-radius:5px; overflow-x:auto;" class="glossFlow">
                                    <div id="chptOvFCon" style="width:160px; height:100%;">

                                        <div style="width:70px; height:100%; float:left; cursor:pointer;" id="rdMeChptr">
                                            <p style="text-align:center; color:silver; font-size:13px; margin:0px; padding:2px;">read me</p>
                                            <div id="rdMChptr" style="margin:auto; width:55px; height:55px; border-radius:5px; border:solid 0.8px skyblue; cursor:pointer;" class="chptrsCr">
                                                <img src="assets/imgs/bookinf.png" width="40px" height="40px" style="margin-left:7px; margin-top:7px; opacity:0.5;">
                                            </div>
                                        </div>

                                        <span id="drpWrtChptrs"></span>

                                        <div style="width:70px; height:100%; float:right;" id="addCHptrLs">
                                            <br>
                                            <div style="margin:auto; width:55px; height:55px; margin-top:-2.5px; cursor:pointer; opacity:0.8; background-image:url(assets/imgs/addxs.png); background-size:100% 100%;">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div style="width:100%; height:240px;">
                                <p id="crntChptLsTtl" class="sub_hs" style="margin:3px; padding:5px; text-align:center; font-size:13px;">read me: all needed information for the book</p>
                                <div style="width:92.5%; margin:auto;">
                                    <input maxlength="200" class="inptJI sub_hs" id="chptrTltl" style="border:none; width:100%; margin-top:5px; background-color:transparent; display:none;" placeholder="chapter heading" />
                                    <textarea class="txtJI sub_hs mainjb" id="chptrBdy" style="height:150px; margin-top:5px; width:100%; border-radius:5px;" placeholder="body"></textarea>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                    
                    <!-- write journal con -->
                    <div style="width:100%; display:none;" id="UAWrtJ">

                        <br>
                        <input maxlength="200" id="autJI" class="sub_hs inptJI" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="header" />
                        <textarea class="sub_hs txtJI" id="autJB" style="height:60px; margin:10px; width:90%; border-radius:5px;" placeholder="body"></textarea>
                    
                        <div style="width:80%; margin:auto;">
                            <div id="fileTpeCon-UautJ" style="margin-top:10px; width:140px; margin:auto;">
                                <img src="assets/imgs/imgtype.png" width="50px" height="60px" style="float:left; cursor:pointer; margin:5px;" id="ClickImgInUA">
                                <img src="assets/imgs/vids.png" width="50px" height="60px" style="float:right; cursor:pointer; margin:5px;" id="clickVidJrnUA">
                            </div>
                        </div>
                        <!-- img reviewer -->
                        <div class="row scrlimgCon" id="scrlimgCon-UautJ" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                            <div class="closeImgFlwCon" id="closeImgFlwCon-UautJ" style="width:98%; height:25px; margin:auto;">
                                <p style="text-align:center; color:orangered; margin:5px; cursor:pointer;" id="cnIm_forUautJ">cancel</p>
                            </div>
                            <br>
                            <span id="flowHangerFltrd-UautJ"></span>
                        </div>
                        <!-- vid reviewer -->
                        <div class="row scrlimgCon" id="scrlvidCon-UautJ" style="width:98%; margin:auto; border-radius:5px; border:solid 1px #f0f0f0; display:none;">
                            <div class="closeImgFlwCon" id="closeImgFlwCon-UautJ" style="width:98%; height:25px; margin:auto;">
                                <p style="text-align:center; color:orangered; margin:5px; cursor:pointer;" id="cnVd_forUautJ">cancel</p>
                            </div>
                            <br>
                            <span id="flowHangerFltrd-vid-UautJ"></span>
                        </div>


                    </div>

                    
                <div class="col-xs-12 navs-wrt" style="position: fixed; z-index: ${global.pop_no++}; height: 35px; bottom:0; right:0; box-shadow:0px 0px 10px -1px rgba(0, 0, 0, 0.3);">
                    <p style="text-align:center; margin:0px; padding:5px;">
                        <button class="btn btn-default btn-xs" id="donAutCnt" style="border-radius:15px; background-color:transparent; border:solid 1px darkorange; color:darkorange;">create book</button>
                    </p>
                </div>
                <br>
            </div>
            `
        }

        // goto prof xs
        const idExFunc_2 = (data, userIdEx) => {

            $(`#${userIdEx}`).click(()=>{
                $('.ex-slider').remove();
                global.ex_user = data;
                global.ex_flag = 'y';
            })

        };

        // jrn funcs
        const dropJr = () => {
            $('.wrtCLass').remove();
            $('#dropWrt').after(writeJBod());
            checkMode(); Dark();

            // btns
            $('#openIj').click(function(){
                $('#openIj').css('display', 'none');
                $('#jpicdiv').slideDown(200);
            });
            $('#closeImgcon').click(function(){
                $('#openIj').slideDown(200);
                $('#jpicdiv').css('display', 'none');
            });
            var tagSrc = $('#tagSrchJrn');
            $('#openTj').click(()=>{
                $('#openTj').css('display', 'none');
                $('#tagfrnddiv').slideDown(200);
                flowTag();
            });
            $('#closeTagbutcon').click(()=>{
                $('#openTj').slideDown(200);
                $('#tagfrnddiv').slideUp(100);
            });

            // BINARY CONTROL
            // --------------
            // img
            $('#ClickImgIn').click(()=>{
                $('#postImage').click();
                $('#SendGoImgs').click();   
            });
            $('#cnIm_forJrn').click(()=>{
                $('.allImgs_app').remove();
                $('#scrlimgCon-jrn').slideUp(100);
                $('#fileTpeCon-jrn').fadeIn();
                global.edt_imgs = [];
                global.bin_t = '';
            });
            // video upload clik
            $('#clickVidJrn').click(()=>{
                $('#postVideoJrnl').click();
            });
            $('#cnVd_forJrn').click(()=>{
                $('.allVids_aedt').remove();
                $('#scrlvidCon-jrn').slideUp(100);
                $('#fileTpeCon-jrn').fadeIn();
                global.edt_vids = [];
                global.bin_t = '';
            });

            // TAG AREA HERE
            //----------------
            // tag body
            const TagBod = (data, ids) => {
                var path = ''; var clss = '';
                if (data.profile_pic == 'none') {
                    path = 'assets/imgs/profb.png';
                }else {
                    path = `https://test-vyral.onrender.com/${data.profile_pic.path}`;
                    clss = data.profile_pic.class;
                }
                var user = '';
                if (data.user_name.length > 20) {
                    user = data.user_name.slice(0, 20)+'..'; 
                }else {
                   user = data.user_name;
                }
                    return `
                <div id="${ids.bodyTagId}" class="tagUflowBod" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                    <div style="width:20%; height:100%; float:left;">
                        <div class="${clss}" style="width:33px; height:33px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
                    </div>
                    <div style="width:60%; height:100%; float:left;">
                        <p id="${ids.tgPstOpnEx}" class="sub_h" style="padding:3px; margin:0px;">${user}</p>
                    </div>
                    <div style="width:20%; height:100%; float:right;">
                        <div id="${ids.passId}" style="width:20px; height:20px; display:none; margin:auto; background-image:url(assets/imgs/tag.png); background-size:100% 100%; margin-top:10px; cursor:pointer;"></div>
                    </div>
                </div>
                `
            };

            const checkModeTag = () => {
                // light or dark effects
                if(udata.mode == 'light') {
                    $('.tagUflowBod, .checkTagBody').css('border', 'solid 1px #f0f0f0');
                    $('.tagUflowBod, .checkTagBody').css('background-color', 'white');
                }
                if (udata.mode == 'dark') {
                    $('.tagUflowBod, .checkTagBody').css('border', 'solid 1px #404040');
                    $('.tagUflowBod, .checkTagBody').css('background-color', '#292929');
                }
            };

            // tag search funns
            $('#tagSrchJrn').keyup(function() {
                extractU();
                $('.tagUflowBod').remove();
                $('.tagUflowBod').css('display', 'none');
                if (tagSrc.val()) {
                    $('.tagUflowBod, .checkTagBody').remove();
                    //$('#conjrnTagknwnsrc').css('display', 'none');
                    //$('#conjrnTagsrc').css('display', 'block');
                    flowSrch($(tagSrc).val());
                } else {
                    $('.tagUflowBod, .checkTagBody').remove();
                    //$('#conjrnTagknwnsrc').css('display', 'block');
                    //$('#conjrnTagsrc').css('display', 'none');
                    flowTag();
                }
            });
            // search all users
            async function flowSrch(tagSrc) {
                const settings = {
                    method: 'post',
                    body: JSON.stringify({ srch: tagSrc }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const responce = await fetch('https://test-vyral.onrender.com/searcher/searchFrnd', settings);
                    const data = await responce.json();
                    $('.tagUflowBod, #noneExsTagSrch').remove();
                    if (data.length > 0) {
                        //$('.tagUflowBod').remove();
                        var chkPass = 'n';
                        for (let i = 0; i < data.length; i++) {
                            if (data[i]._id !== udata._id) {
                                if (pass.length > 0) {
                                    var chk = 'n';
                                    for (let z = 0; z < pass.length; z++) {
                                        //var usr = '';
                                        if (data[i]._id == pass[z] ) {
                                            dispTags(data[i]);
                                            chkPass = 'y';
                                            chk = 'y';
                                            flowTag();
                                        }
                                    }
                                    if (chk == 'n') {
                                        //alert("flowSrch: "+data[i].user_name);
                                        //flowTag();
                                        dispTags(data[i]);
                                    }
                                }else {
                                    dispTags(data[i]);
                                }
                            }else {
                                flowTag();
                            }
                        }
                        if (chkPass == 'n') {
                            flowTag();
                        }
                    }else {
                        if (tagSrc.length < 1) {
                            flowTag();
                        }else {
                            flowTag();
                            var noneF = () => {
                                return `
                                <p id="noneExsTagSrch" class="sub_h" style="text-align:center; margin:5px;">This user does not exist</p>
                                `;
                            };
                            $('#flowfrndinTag').prepend(noneF());
                        }
                        //$('.tagUflowBod, .checkTagBody').remove();
                    }
                } catch (error) {
                    console.log(error);
                }
               /* fetch('https://test-vyral.onrender.com/searcher/searchFrnd', {
                    method: 'post',
                    body: JSON.stringify({ srch: tagSrc }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }).then((response) => {
                    return response.json();
                }).then((data)=>{
                    $('.tagUflowBod, #noneExsTagSrch').remove();
                    if (data.length > 0) {
                        //$('.tagUflowBod').remove();
                        var chkPass = 'n';
                        for (let i = 0; i < data.length; i++) {
                            if (data[i]._id !== udata._id) {
                                if (pass.length > 0) {
                                    var chk = 'n';
                                    for (let z = 0; z < pass.length; z++) {
                                        //var usr = '';
                                        if (data[i]._id == pass[z] ) {
                                            dispTags(data[i]);
                                            chkPass = 'y';
                                            chk = 'y';
                                            flowTag();
                                        }
                                    }
                                    if (chk == 'n') {
                                        //alert("flowSrch: "+data[i].user_name);
                                        //flowTag();
                                        dispTags(data[i]);
                                    }
                                }else {
                                    dispTags(data[i]);
                                }
                            }else {
                                flowTag();
                            }
                        }
                        if (chkPass == 'n') {
                            flowTag();
                        }
                    }else {
                        if (tagSrc.length < 1) {
                            flowTag();
                        }else {
                            flowTag();
                            var noneF = () => {
                                return `
                                <p id="noneExsTagSrch" class="sub_h" style="text-align:center; margin:5px;">This user does not exist</p>
                                `;
                            };
                            $('#flowfrndinTag').prepend(noneF());
                        }
                        //$('.tagUflowBod, .checkTagBody').remove();
                    }
                });*/

            };
            const flowTag = () => {
                $('.checkTagBody').remove();
                var users = db.users;
                for (let z = 0; z < pass.length; z++) {
                    for (let x = 0; x < users.length; x++) {
                        if (users[x]._id == pass[z]) {
                            chk = 'y';
                            if (users[x].user_name > 15) {
                                usr = users[x].user_name.slice(0, 15)+'..';
                            }else {
                                usr = users[x].user_name;
                            }
                            viewTags(pass[z], usr, users);
                            checkModeTag(); Dark();
                        }
                    }
                }
                if (udata.following.length > 0) {
                    for (let i = 0; i < udata.following.length; i++) {
                        if (pass.length > 0) {
                            //alert('here');
                            var chk = 'n'; var usr = '';
                            for (let z = 0; z < pass.length; z++) {
                                if (udata.following[i]._id == pass[z]) {
                                    chk = 'y';
                                        for (let z = 0; z < users.length; z++) {
                                            if (users[z]._id == udata.following.user) {
                                                dispTags(users[z]);
                                            }
                                        }
                                }/*else {
                                    for (let x = 0; x < users.length; x++) {
                                        if (users[x]._id == pass[z]) {
                                            chk = 'y';
                                            if (users[x].user_name > 15) {
                                                usr = users[x].user_name.slice(0, 15)+'..';
                                            }else {
                                                usr = users[x].user_name;
                                            }
                                            viewTags(pass[z], usr, users);
                                            checkModeTag(); Dark();
                                        }
                                    }
                                }*/
                            }
                            if (chk == 'n') {
                                    for (let z = 0; z < users.length; z++) {
                                        if (users[z]._id == udata.following.user) {
                                            dispTags(users[z]);
                                        }
                                    }
                            }
                        }else {
                            $('#tagedMainCon').slideUp(100);
                                for (let z = 0; z < users.length; z++) {
                                    if (users[z]._id == udata.following.user) {
                                        dispTags(users[z]);
                                    }
                                }
                        }
                    }
                }else {
                    if (pass.length < 1) {
                        $('#tagedMainCon').slideUp(100);
                    }
                }
            };

            // const pass id to array
            var pass = new Array();
            const passTag = (data, passId, bodyTagId) => {
                $(`#${passId}`).click(()=>{
                    pass[pass.length] = data;
                    $('#tagedMainCon').fadeIn();
                    flowTag();
                    if ($(tagSrc).val()) {
                        flowSrch($(tagSrc).val());
                    }
                });
                $('#incTagTot').text(pass.length);
            };
            // view tagged
            const viewTags = (data, user, users) => {
                    var path = ''; var clss = '';
                    for (let z = 0; z < users.length; z++) {
                        if (users[z]._id == data) {
                            if (users[z].profile_pic == 'none') {
                                path = 'assets/imgs/profb.png';
                            }else {
                                path = `https://test-vyral.onrender.com/${users[z].profile_pic.path}`;
                                clss = users[z].profile_pic.class;
                            }
                        }
                    }
                    if (user.length > 15) {
                       user = user.slice(0, 15)+'..'; 
                    }
                    $('#flowAlredTagd').prepend(`
                        <div class="checkTagBody" id="${'chckTg_'+data}" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                            <div style="width:30%; height:100%; float:left;">
                                <div class="${clss}" style="width:33px; height:33px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
                            </div>
                            <div style="width:50%; height:100%; float:left;">
                                <p id="${'flwTgOpnEx_'+data}" class="sub_h" style="padding:3px; margin:0px;">${user}</p>
                            </div>
                            <div style="width:20%; height:100%; float:right;">
                                <div id="remTagd_${data}" style="width:10px; height:10px; margin:auto; background-image:url(assets/imgs/can.png); background-size:100% 100%; margin-top:15px; cursor:pointer;"></div>
                            </div>
                        </div>
                    `);
                    $(`#remTagd_${data}`).click(()=>{
                        for (let i = 0; i < pass.length; i++) {
                            if (pass[i] == data) {
                                pass.splice(i, 1);
                                flowTag();
                                if ($(tagSrc).val()) {
                                    flowSrch($(tagSrc).val());
                                }
                            }
                        }
                    });
                    // opn ex
                    $(`#flwTgOpnEx_${data}`).click(()=>{
                        $('.ex-slider').remove();
                        global.ex_user = idU;
                        global.ex_flag = 'y';
                    });
                    $('#incTagTot').text(pass.length);
            };
            // check if tagged or not
            const checkIfTd = (data, passId) => {
                var ck = 'n';
                if (pass.length > 0) {
                    for (let i = 0; i < pass.length; i++) {
                        if (pass[i] == data) {
                            ck = 'y';
                            $(`#${passId}`).css('display', 'none');
                        }                
                    }
                }
                if (ck == 'n') {
                    $(`#${passId}`).css('display', 'block');
                }
            };

            // create ids for tag
            const createIdTags = (data) => {
                return {
                    bodyTagId: 'bodyTagId_' + data,
                    tgPstOpnEx: 'tgPstOpnEx_' + data,
                    passId: 'passId_' + data
                }
            };
            // display and add tags
            const dispTags = (data) => {
                const ids = createIdTags(data._id);
                $('#flowfrndinTag').prepend(TagBod(data, ids));
                checkModeTag(); Dark();
                passTag(data._id, ids.passId, ids.bodyTagId);
                checkIfTd(data._id, ids.passId);
                idExFunc_2(data._id, ids.tgPstOpnEx);
                //viewTags(data, user);
            };

            // done 
            $('#mainjh').keyup(function() {
                if ($('#mainjh').val() !== '') {
                    $('#doneJourn').css('display', 'inline');
                }else {
                    $('#doneJourn').css('display', 'none');
                }
            });

            // add/rem like && coms contents to noti
            const likeNoti = (data, udata, act, dateNow) => {
                if (act !== '' && data.user !== udata._id) {
                    
                    const sendUser = (user) => {
                        var pData = {
                            section: 'journals',
                            type: 'tagged',
                            user: user,
                            post: data,
                            act: 'tagged',
                            id: data._id,
                        };
                        postData(pData);
                    };
                    var users = db.users;
                    if (users.length > 0) {
                        for (let i = 0; i < users.length; i++) {
                            if (data.user == users[i]._id) {
                                sendUser(users[i])
                            }
                        }
                    }

                }

            };
            
            // add posts
            $('#doneJourn').click(()=> {
                extractU();
                // post norml type
                const postNorm = () => {
                    var uname = udata._id;
                    var pData = {
                        section: 'creator',
                        type: 'crt_jrn',
                        user: udata,
                        pass: { postId: uname+'PostID'+date, type: 'User', user: uname, heading: $('#mainjh').val(), img: [], vid: '', date: [year, day, month, hour, minute], body: $('#mainjb').val(), comments: [], likedBy: [], reads: [], hidden: 'No', tagged: pass, reads: [] },
                        tags: pass,
                    };
                    postData(pData);
                };
                if ($('#mainjh').val() !== '') {
                    var crnt = global.bin_t;
                    if (crnt == 'img') {
                        var test = global.img_hangLen;
                        if (test > 0 && $('#mainjh').val() !== '') {
                            var testar = [];
                            for (let i = 0; i < test; i++) {
                                testar[i] = `imgHangerFltrd-jrn${i}`;
                            }
                            var encount = [];
                            for (let i = 0; i < test; i++) {
                                var tter = testar[i];
                                global.edt_imgs[i].class = $(`#${tter}`).attr('class');
                            }
                            var uname = udata._id;
                            var pData = {
                                section: 'creator',
                                type: 'crt_jrn',
                                user: udata,
                                pass: { postId: uname+'PostID'+date, type: 'User', user: uname, heading: $('#mainjh').val(), img:  global.edt_imgs, vid: '', date: [year, day, month, hour, minute], body: $('#mainjb').val(), comments: [], likedBy: [], reads: [], hidden: 'No', tagged: pass, reads: [] },
                                tags: pass,
                            };
                            postData(pData);
                        }
                        if ($('#mainjh').val() !== '' && test == 0) {
                            postNorm();
                        }
                    }
                    if (crnt == 'vid') {
                        var test = global.vid_hangLen;
                        if (test > 0 && $('#mainjh').val() !== '') {
                            var testar = [];
                            for (let i = 0; i < test; i++) {
                                testar[i] = `vidHangerFltrd-jrn${i}`;
                            }
                            var encount = [];
                            for (let i = 0; i < test; i++) {
                                var tter = testar[i];
                                global.edt_vids[i].class = $(`#${tter}`).attr('class');
                            }
                            var uname = udata._id;
                            var pData = {
                                section: 'creator',
                                type: 'crt_jrn',
                                user: udata,
                                pass: { postId: uname+'PostID'+date, type: 'User', user: uname, heading: $('#mainjh').val(), img: [], vid: global.edt_vids[0], date: [year, day, month, hour, minute], body: $('#mainjb').val(), comments: [], likedBy: [], reads: [], hidden: 'No', tagged: pass, reads: [] },
                                tags: pass,
                            };
                            postData(pData);
                        }
                        if ($('#mainjh').val() !== '' && test == 0) {
                            postNorm();
                        }
                    }
                    if (crnt !== 'vid' && crnt !=='img') {
                        postNorm();
                    }
                    
                } else {
                    $('#alertText').text('Insert header to complete Journal');
                    $('#allAlerts').css('display', 'block');
                    $('#alertBody').fadeIn();
                };
                
            });

        };

        // str btn
        const dropStr = () => {
            $('.wrtCLass').remove();
            $('#dropWrt').after(writeSBod());
            checkMode(); Dark();

            // extraction
            var pubin = $('#ScStr');
            var strh = $('#mainStrh');
            var strBody = $('#mainsb');
            var strConH = $('#strConHead');
            var strimg = $('#postStrImage');
            var strvid = $('#postVideoStr');

            // public diff vars
            var publ = '';
            var crtNwPub = 'none';
            var oldPubId = '';

            $('#PubStrWr').click(function() {
                $('#PerStrWr').css('border-bottom', '');
                $('#PubStrWr').css('border-bottom', 'solid 1px skyblue');
                $('#ScStr').slideDown(200);
                $('#openStrfrdiv, #mainStrh, #mainsb, #openStrcontdiv').slideUp(100);
                $('#mainStrh').val('');
                $('#donePubStr, #donePrvStr').css('display', 'none');
            });
            $('#PerStrWr').click(function() {
                $('#PubStrWr').css('border-bottom', '');
                $('#PerStrWr').css('border-bottom', 'solid 1px skyblue');
                $('#ScStr').slideUp(100);
                $('#openStrfrdiv, #mainStrh, #mainsb, #openStrcontdiv').slideDown(200);
                $('#ScStr').val('');
                // pub str init canceler
                publ = '';
                crtNwPub = 'none';
                oldPubId = '';
                $('.holdPubStr').remove();
                $('#donePubStr, #donePrvStr').css('display', 'none');
            });

            // BINARY CONTROL
            // --------------
            // img
            $('#ClickImgStrIn').click(()=>{
                $('#postStrImage').click();
                $('#SendGoStrImgs').click();   
            });
            $('#closeImgFlwCon-str').click(()=>{
                $('.allImgs_app').remove();
                $('#scrlimgCon-str').slideUp(100);
                $('#fileTpeCon-str').fadeIn();
                global.img_hangLen = 0;
                global.bin_t = '';
            });
            // vid
            $('#clickVidStr').click(()=>{
                $('#postVideoStr').click();
            });
            $('#closeVidFlwCon-str').click(()=>{
                $('.allVids_aedt').remove();
                $('#scrlvidCon-str').slideUp(100);
                $('#fileTpeCon-str').fadeIn();
                global.vid_hangLen = 0;
                global.bin_t = '';
            });
            // video user aut
            $('#clickVidJrnUA').click(()=>{
                $('#postVideoUAuJ').click();
            });

            // string area here
            $('#openStrcontdiv').click(()=>{
                $('#openStrcontdiv').slideUp(100);
                $('#strContDiv').slideDown(200);
            });
            $('#closeStrcontdiv').click(()=>{
                $('#strContDiv').slideUp(100);
                $('#openStrcontdiv').slideDown(200);
            });
            // str rfrnds
            $('#closeStrFrbutcon').click(()=>{
                $('#strFrDiv').slideUp(100);
                $('#openStrfrdiv').slideDown(200);
            });

            // priv str com?
            $('#mainStrh').keyup(function() {
                if ($('#mainStrh').val() !== '') {
                    $('#donePrvStr').css('display', 'inline');
                }else {
                    $('#donePrvStr').css('display', 'none');
                }
            });

            // smart value
            $('#ScStr').on('input', function(key){
                var value = $(this).val();
                $(this).val(value.replace(/ /g, '_'));
            });

            // search public string
            pubin.keyup(()=>{
                extractU();
                if (pubin.val() !== '') {
                    $('.srchdCon-3').remove();
                    $('#srchPubStrFlw').css('display', 'block');
                    fetchStr(pubin.val(), udata);
                }else {
                    $('.srchdCon-3').remove();
                    $('#alrtPubStrNoE, #crtNewStrCon').css('display', 'none');
                    $('#srchPubStrFlw').fadeOut();
                }
            });
            var pubFlag = '';
            const checkPubFlag = () => {
                if (pubFlag == '') {
                    $('#alrtPubStrNoE').fadeIn();
                    $('#crtNewStrCon').fadeIn();
                }
                if (pubFlag == 'grey') {
                    $('#crtNewStrCon').fadeIn();
                }
                if (pubFlag == 'white') {
                    $('#crtNewStrCon').css('display', 'none');
                }
            }
            // fetch str
            async function fetchStr(srch, udata) {
                var settings = {
                    method: 'post',
                    body: JSON.stringify({ srch: srch }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/searcher/searchStr`, settings);
                    const data = await response.json();
                    pubFlag = ''; var thrdata = db.all_posts;
                    $('.srchdCon-3').remove();
                    $('#alrtPubStrNoE, #crtNewStrCon').css('display', 'none');
                    for (let i = 0; i < data.length; i++) {
                        if (srch.length > 0) {
                            pubFlag = 'white';
                            displayStr(data[i]);
                            pubFlag = 'grey';
                            if (data[i].name == srch) {
                                pubFlag = 'white';
                            }
                        }
                        if (srch.length == 0) {
                            for (let z = 0; z < thrdata.length; z++) {
                                if (thrdata.content_type == 'thread') {
                                    if (thrdata[z].user == udata._id) {
                                        if (thrdata[z].tied_to == data[i]._id) {
                                            pubFlag = 'white';
                                            displayStr(data[i]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    setTimeout(() => {
                        checkPubFlag();
                    }, 500);
                } catch (error) {
                    console.log(error);
                }
            };

            // for strs
            const srchStr = (data, ids) => {
                return `
                <div id="${ids.conId}" class="srchdCon-3" style="width:97.5%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                    <div style="width:20%; height:100%; float:left;">
                        <div style="width:28px; height:28px; margin:auto; background-image:url(assets/imgs/strings.png); background-size:100% 100%; border-radius:100%; margin-top:5px;"></div>
                    </div>
                    <div style="width:60%; height:100%; float:left;">
                        <p style="color:skyblue; padding:5px; margin:5px;">${data.name}</p>
                    </div>
                    <div style="width:20%; height:100%; float:right;">
                        <p styl="text-align:center; margin:0px;">
                            <img id="${ids.chseId}" src="assets/imgs/addxs.png" width="25px" height="25px" style="margin-top:7px; cursor:pointer;"> 
                        </p>
                    </div>
                </div>
                `
            };
            const checkModeSrch = (data, conId) => {
                // light or dark effects
                if(udata.mode == 'light') {
                    $(`#${conId}`).css('background-color', 'white');
                    $(`#${conId}`).css('border', 'solid 1px #f0f0f0');
                }
                if (udata.mode == 'dark') {
                    $(`#${conId}`).css('background-color', '#404040');
                    $(`#${conId}`).css('border', 'solid 1px #292929');
                }
            };

            // CHOOSE PUB_STR
            // bodying
            var bod = (data) =>{ return `
            <p class="holdPubStr" style="text-align:center; margin:5px;" id="pubStrHangNme_${data}"><span class="btn btn-default btn-xs pbfndHldBd" style="border-radius: 10px; box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.3); border:none; padding:5px; font-size:16.5px; margin-top:5px;">
                ${data} <span style="color:red;" id="remTheStrNme_${data}">&times;</span>
            </span></p>
            `};
            const chseStr = (data, chseId) => {
                $(`#${chseId}`).click(()=>{
                    publ = data.name;
                    crtNwPub = 'old';
                    oldPubId = data._id;
                    pushes(data.name);
                });
            };
            // create new pub-str
            $('#alrtPubStrNoE-btn').click(()=>{
                publ = pubin.val();
                crtNwPub = 'new';
                pushes(publ);
            });
            // push contents to create new
            const pushes = (nme) => {
                $('.srchdCon-3').remove();
                pubin.css('display', 'none');
                $('#srchPubStrFlw').slideUp(100);
                $('#openStrcontdiv').slideDown(200);
                if (crtNwPub == 'new') {
                    $('#donePubStr').text('create public string');
                    $('#donePubStr').css('display', 'inline');
                }else {
                    $('#donePubStr').text('attach to public string');
                    $('#donePubStr').css('display', 'inline');
                }
                // asign
                $('#chsnPbStr').after(bod(nme));
                if(udata.mode == 'light') {
                    $(`.pbfndHldBd`).css('background-color', 'white');
                    $(`.pbfndHldBd`).css('color', 'grey');
                }
                if (udata.mode == 'dark') {
                    $(`.pbfndHldBd`).css('background-color', '#1a1a1a');
                    $(`.pbfndHldBd`).css('color', 'silver');
                }

                // btns
                $(`#remTheStrNme_${nme}`).click(()=>{
                    crtNwPub = 'none';
                    publ = '';
                    $(`#pubStrHangNme_${nme}`).remove();
                    pubin.fadeIn();
                    $('#srchPubStrFlw').slideDown(200);
                    $('#openStrcontdiv').slideUp(100);
                    $('#donePubStr').css('display', 'none');
                });

            };

            // create ids
            const createStrIds = (data) => {
                return {
                    conId: 'conId_' + data._id,
                    chseId: 'chseId_' + data._id
                }
            };
            // display func
            const displayStr = (data) => {
                const ids = createStrIds(data);
                $('#pbStrFlw').prepend(srchStr(data, ids));
                checkModeSrch(data, ids.conId); Dark();
                chseStr(data, ids.chseId);
            };

            // TIE FRIENDS
            // -----------
            // tie body
            const TieBod = (data, user, ids) => {
                var path = ''; var clas = '';
                if (data.profile_pic == 'none') {
                    path = 'assets/imgs/profpic.png';
                }else {
                    path = `https://test-vyral.onrender.com/${data.profile_pic.path}`;
                    clas = `${data.profile_pic.class}`;
                }
                return `
                <div id="${ids.bodyTieId}" class="tieUflowBod" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                    <div style="width:20%; height:100%; float:left;">
                        <div class="${clas}" style="width:33px; height:33px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
                    </div>
                    <div style="width:60%; height:100%; float:left;">
                        <p id="${ids.tieStrOpnEx}" style="color:skyblue; padding:2.5px; margin:0px;">${user}</p>
                    </div>
                    <div style="width:20%; height:100%; float:right;">
                        <div id="${ids.passId}" style="width:20px; height:20px; margin:auto; background-image:url(assets/imgs/tag.png); background-size:100% 100%; margin-top:10px; cursor:pointer;"></div>
                    </div>
                </div>
                `
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

            const flowTies = () => {
                var users = db.users;
                $('.checkTieBody').remove();
                for (let z = 0; z < pass.length; z++) {
                    for (let x = 0; x < users.length; x++) {
                        if (users[x]._id == pass[z]) {
                            chk = 'y';
                            if (users[x].user_name > 15) {
                                usr = users[x].user_name.slice(0, 15)+'..';
                            }else {
                                usr = users[x].user_name;
                            }
                            checkModeTie();
                            viewTies(pass[z], usr, users);
                        }
                    }                   
                }
                if (udata.following.length > 0) {
                    for (let i = 0; i < udata.following.length; i++) {
                        if (pass.length > 0) {
                            //alert('here');
                            var chk = 'n'; var usr = '';
                            for (let z = 0; z < pass.length; z++) {
                                if (udata.following[i]._id == pass[z]) {
                                    chk = 'y';
                                        for (let z = 0; z < users.length; z++) {
                                            if (users[z]._id == udata.following.user) {
                                                dispTie(users[z]);
                                            }
                                        }
                                }/*else {
                                        for (let x = 0; x < users.length; x++) {
                                            if (users[x]._id == pass[z]) {
                                                chk = 'y';
                                                if (users[x].user_name > 15) {
                                                    usr = users[x].user_name.slice(0, 15)+'..';
                                                }else {
                                                    usr = users[x].user_name;
                                                }
                                                checkModeTie();
                                                viewTies(pass[z], usr, users);
                                            }
                                        }
                                }*/
                            }
                            if (chk == 'n') {
                                    for (let z = 0; z < users.length; z++) {
                                        if (users[z]._id == udata.following.user) {
                                            dispTie(users[z]);
                                        }
                                    }
                            }
                        }else {
                            $('#tiedMainCon').slideUp(100);
                                for (let z = 0; z < users.length; z++) {
                                    if (users[z]._id == udata.following.user) {
                                        dispTie(users[z]);
                                    }
                                }
                        }
                    }
                }else {
                    if (pass.length < 1) {
                        $('#tagedMainCon').slideUp(100);
                    }
                }

            };
            async function checkTies(chkTies) {
                var settings = {
                    method: 'post',
                    body: JSON.stringify({ srch: chkTies }),
                    headers: { "Content-type" : "application/json; charset=utf-8" }
                }
                try {
                    const response = await fetch(`https://test-vyral.onrender.com/searcher/searchFrnd`, settings);
                    const data = await response.json();
                    $('.tieUflowBod, .checkTieBody, #noneExsTieSrch').remove();
                    if (data.length > 0) {
                        //$('.tagUflowBod').remove();
                        var chkPass = 'n';
                        for (let i = 0; i < data.length; i++) {
                            if (data[i]._id !== udata._id) {
                                if (pass.length > 0) {
                                    var chk = 'n';
                                    for (let z = 0; z < pass.length; z++) {
                                        //var usr = '';
                                        if (data[i]._id == pass[z] ) {
                                            dispTie(data[i]);
                                            chkPass = 'y';
                                            chk = 'y';
                                            flowTies();
                                        }
                                    }
                                    if (chk == 'n') {
                                        //alert("flowSrch: "+data[i].user_name);
                                        //flowTag();
                                        dispTie(data[i]);
                                    }
                                }else {
                                    dispTie(data[i]);
                                }
                            }else {
                                flowTies();
                            }
                        }
                        if (chkPass == 'n') {
                            flowTies();
                        }
                    }else {
                        if ($('#tieSrchJrn').length < 1) {
                            flowTies();
                        }else {
                            flowTies();
                            var noneF = () => {
                                return `
                                <p id="noneExsTieSrch" class="sub_h" style="text-align:center; margin:5px;">This user does not exist</p>
                                `;
                            };
                            $('#flowfrndinTie').prepend(noneF());
                        }
                        //$('.tagUflowBod, .checkTagBody').remove();
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            $('#openStrfrdiv').click(()=>{
                $('#openStrfrdiv').slideUp(100);
                $('#strFrDiv').slideDown(200);
                flowTies();
            });
            // tag srch org
            $('#tieSrchJrn').keyup(()=>{
                extractU();
                if ($('#tieSrchJrn').val() !== '') {
                    $('.tieUflowBod, .checkTieBody, #noneExsTieSrch').remove();
                    //$('#conjrnTagknwnsrc').css('display', 'none');
                    //$('#conjrnTagsrc').css('display', 'block');
                    checkTies($('#tieSrchJrn').val());
                }else {
                    $('.tieUflowBod, .checkTieBody, #noneExsTieSrch').remove();
                    //$('#conjrnTagknwnsrc').css('display', 'block');
                    //$('#conjrnTagsrc').css('display', 'none');
                    flowTies();
                }
            });
            // delete presnt usr
            const delPtieU = (bodyTieId) => {
                $(`#${bodyTieId}`).remove()
            };
            // const pass id to array
            var pass = new Array();
            const passTie = (data, user, passId, bodyTieId) => {
                $(`#${passId}`).click(()=>{
                    pass[pass.length] = data;
                    $('#tiedMainCon').fadeIn();
                    flowTies();
                    if ($('#tieSrchJrn').val()) {
                        checkTies($('#tieSrchJrn').val());
                    }
                });
                $('#incTieTot').text(pass.length);
            };
            // view tagged
            const viewTies = (data, user, users) => {

                var path = ''; var clss = '';
                    for (let z = 0; z < users.length; z++) {
                        if (users[z]._id == data) {
                            if (users[z].profile_pic == 'none') {
                                path = 'assets/imgs/profb.png';
                            }else {
                                path = `https://test-vyral.onrender.com/${users[z].profile_pic.path}`;
                                clss = `${users[z].profile_pic.class}`;
                            }
                        }
                    }
                    $('#flowAlredTied').prepend(`
                        <div class="checkTieBody" id="${'chckTg_'+data}" style="width:95%; margin:auto; height:40px; border-radius:5px; margin-top:10px;">
                            <div style="width:30%; height:100%; float:left;">
                                <div class="${clss}" style="width:33px; height:33px; margin:auto; background-image:url(${path}); background-size:cover; border-radius:100%; margin-top:3px;"></div>
                            </div>
                            <div style="width:50%; height:100%; float:left;">
                                <p id="vwTieOpEx_${data}" style="color:skyblue; padding:5px; margin:5px;">${user}</p>
                            </div>
                            <div style="width:20%; height:100%; float:right;">
                                <div id="remTied_${data}" style="width:10px; height:10px; margin:auto; background-image:url(assets/imgs/can.png); background-size:100% 100%; margin-top:15px; cursor:pointer;"></div>
                            </div>
                        </div>
                    `);
                    $(`#remTied_${data}`).click(()=>{
                        for (let i = 0; i < pass.length; i++) {
                            if (pass[i] == data) {
                                pass.splice(i, 1);
                                flowTies();
                                if ($('#tieSrchJrn').val()) {
                                    checkTies($('#tieSrchJrn').val());
                                }
                            }
                        }
                    });
                    $(`#vwTieOpEx_${data}`).click(()=>{
                        $('.ex-slider').remove();
                        global.ex_user = data;
                        global.ex_flag = 'y';
                    });
                    $('#incTieTot').text(pass.length);
                    checkModeTie();
            };
            // check if tagged or not
            const checkIfTd = (data, passId) => {
                var ck = 'n';
                if (pass.length > 0) {
                    for (let i = 0; i < pass.length; i++) {
                        if (pass[i] == data) {
                            ck = 'y';
                            $(`#${passId}`).css('display', 'none');
                        }                
                    }
                }
                if (ck == 'n') {
                    $(`#${passId}`).css('display', 'block');
                }
            };

            // create ids for tag
            const createIdTies = (data) => {
                return {
                    bodyTieId: 'bodyTieId_' + data,
                    tieStrOpnEx: 'tieStrOpnEx_' + data,
                    passId: 'passId_' + data
                }
            };
            // display and add tags
            const dispTie = (data) => {
                const ids = createIdTies(data._id);
                var user = ''; var usr = '';
                usr = data.user_name;
                if (usr.length > 15) {
                    user = usr.slice(0, 15)+'..';
                }else {
                    user = usr;
                }
                $('#flowfrndinTie').prepend(TieBod(data, user, ids));
                checkModeTie();
                passTie(data._id, user, ids.passId, ids.bodyTieId);
                checkIfTd(data._id, ids.passId);
                idExFunc_2(data._id, ids.tieStrOpnEx);
                //viewTies(data, user);
            }

            // POSTS
            //------
            // pub done
            $('#donePubStr').click(function() {
                if (publ !== '' && strh.val() == '') {
                    publicString(udata);
                }
            });
            // public str push
            const publicString = (udata) => {
                
                // fetch binary hangers
                const checkRest = () => {
                    if (publ !== '' && strConH.val() == '' && hanImg == 0 && hanVid == 0) {
                        //alert('here');
                        var act = 'emp';
                        pushItPub(udata, act);
                    }
                    if (strConH.val() !== '' && hanImg == 0 && hanVid == 0) {
                        var act = '';
                        $('#alertText').text(`Insert images/video to complete thread`);
                        $('#allAlerts').css('display', 'block');
                        $('#alertBody').fadeIn();
                    } else {
                        if (hanImg > 0) {
                            var act = 'img';
                            pushItPub(udata, act);
                        }else {
                            if (hanVid > 0) {
                                var act = 'vid';
                                pushItPub(udata, act);
                            }
                        }
                    }
                };
                var hanImg = 0; var hanVid = 0;
                const starterChk = () => {
                    var test = global.img_hangLen;
                    if (test > 0) {
                        hanImg = test;
                        checkRest();
                    }else {
                        var testVid = global.vid_hangLen;
                        if (testVid > 0) {
                            hanVid = testVid;
                            checkRest();
                        }else{
                            checkRest();
                        }
                    }
                };
                starterChk();
            };
            // push public
            const pushItPub = (udata, act) => {
                if (crtNwPub == 'new') {
                    
                    // for empt
                    if (act == 'emp') {
                        var pData = {
                            section: 'creator',
                            type: 'crt_pub_str',
                            user: udata,
                            name: pubin.val(),
                            thread: 'none',
                        };
                        postData(pData)
                    }
                    // for img
                    if (act == 'img') {
                        var test = global.img_hangLen;
                        var testar = [];
                        for (let i = 0; i < test; i++) {
                            testar[i] = `imgHangerFltrd-thr${i}`;
                        }
                        for (let i = 0; i < test; i++) {
                            var tter = testar[i];
                            global.edt_imgs[i].class = $(`#${tter}`).attr('class');
                        }
                        var pData = {
                            section: 'creator',
                            type: 'crt_pub_str',
                            user: udata,
                            name: pubin.val(),
                            thread: {type: 'tied_public', tied_to: '', user: udata._id, head: strConH.val(), act: act, img: global.edt_imgs, vid: []},
                        };
                        postData(pData);
                    }
                    // for vid
                    if (act == 'vid') {
                        var test = global.vid_hangLen;
                        var testar = [];
                        for (let i = 0; i < test; i++) {
                            testar[i] = `vidHangerFltrd-thr${i}`;
                        }
                        for (let i = 0; i < test; i++) {
                            var tter = testar[i];
                            global.edt_vids[i].class = $(`#${tter}`).attr('class');
                        }
                        var pData = {
                            section: 'creator',
                            type: 'crt_pub_str',
                            user: udata,
                            name: pubin.val(),
                            thread: {type: 'tied_public', tied_to: '', user: udata._id, head: strConH.val(), act: act, img: [], vid: global.edt_vids},
                        };
                        postData(pData);
                    }

                }
                if (crtNwPub == 'old') {
                    
                    if (act == 'img') {
                        console.log('imgs!');
                        //oldPubId
                        var test = global.img_hangLen;
                        var testar = [];
                        for (let i = 0; i < test; i++) {
                            testar[i] = `imgHangerFltrd-thr${i}`;
                        }
                        for (let i = 0; i < test; i++) {
                            var tter = testar[i];
                            global.edt_imgs[i].class = $(`#${tter}`).attr('class');
                        }
                        if (test > 0) {
                            var pData = {
                                section: 'creator',
                                type: 'crt_pub_str_old',
                                user: udata,
                                thread: {type: 'tied_public', tied_to: oldPubId, user: udata._id, head: strConH.val(), act: act, img: global.edt_imgs, vid: []},
                            };
                            postData(pData);
                        }
                    }
                    if (act == 'vid') {
                        var test = global.vid_hangLen;
                        var testar = [];
                        for (let i = 0; i < test; i++) {
                            testar[i] = `vidHangerFltrd-thr${i}`;
                        }
                        for (let i = 0; i < test; i++) {
                            var tter = testar[i];
                            global.edt_vids[i].class = $(`#${tter}`).attr('class');
                        }
                        var pData = {
                            section: 'creator',
                            type: 'crt_pub_str_old',
                            user: udata,
                            thread: {type: 'tied_public', tied_to: oldPubId, user: udata._id, head: strConH.val(), act: act, img: [], vid: global.edt_vids},
                        };
                        postData(pData);
                    }
                    if (act == 'emp') {
                        $('#alertText').html(`include thread to attach to the public string: <strong style="color:skyblue;">${publ}</strong>`);
                        $('#allAlerts').css('display', 'block');
                        $('#alertBody').fadeIn();
                    }
                }

            };

            // priv
            $('#donePrvStr').click(function() {
                if (strh.val() !== '' && pubin.val() == '') {
                    privateString(udata);
                }
            });
            const privateString = (udata) => {
                
                const yap = () => {
                    if (strh.val() !== '' && strConH.val() == '' && hanImg == 0 && hanVid == 0) {
                        act = 'emt';
                        //alert(act);
                        pushIt(udata,act);
                    }
                    if (strConH.val() !== '' && hanImg == 0 && hanVid == 0) {
                        act = '';
                        $('#alertText').text(`Insert images/video to complete thread`);
                        $('#allAlerts').css('display', 'block');
                        $('#alertBody').fadeIn();
                    } else {
                        var test = global.img_hangLen;
                        if (test > 0) {
                            act = 'img';
                            pushIt(udata,act);
                        }
                        if (act == '') {
                            var test = global.vid_hangLen;
                            if (test > 0) {
                                act = 'vid';
                                pushIt(udata, act);
                            }
                        }
                    }
                };

                // conditions
                var act = '';
                var hanImg = 0; var hanVid = 0;
                const yup = () => {
                    var test = global.img_hangLen
                    if (test > 0) {
                        hanImg = test;
                        yap();
                    }else {
                        var testVid = global.vid_hangLen;
                        if (testVid > 0) {
                            hanVid = testVid;
                            yap();
                        }else {
                            yap();
                        }
                    }
                };
                yup();
        
            };
            // pus private
            const pushIt = (udata, act) => {
                // for img
                if (act == 'img') {
                    var test = global.img_hangLen;
                    var testar = [];
                    for (let i = 0; i < test; i++) {
                        testar[i] = `imgHangerFltrd-thr${i}`;
                    }
                    var encount = [];
                    for (let i = 0; i < test; i++) {
                        var tter = testar[i];
                        global.edt_imgs[i].class = $(`#${tter}`).attr('class');
                    }
                    var pData = {
                        section: 'creator',
                        type: 'crt_prv_str',
                        user: udata,
                        head: strh.val(),
                        body: strBody.val(),
                        tied: pass,
                        thread: {type: 'tied_private', tied_to: '', user: udata._id, head: strConH.val(), act: act, img: global.edt_imgs, vid: []},
                    };
                    postData(pData);
                }
                // for vid
                if (act == 'vid') {
                    var test = global.vid_hangLen;
                    var testar = [];
                    for (let i = 0; i < test; i++) {
                        testar[i] = `vidHangerFltrd-thr${i}`;
                    }
                    var encount = [];
                    for (let i = 0; i < test; i++) {
                        var tter = testar[i];
                        global.edt_vids[i].class = $(`#${tter}`).attr('class');
                    }
                    var pData = {
                        section: 'creator',
                        type: 'crt_prv_str',
                        user: udata,
                        head: strh.val(),
                        body: strBody.val(),
                        tied: pass,
                        thread: {type: 'tied_private', tied_to: '', user: udata._id, head: strConH.val(), act: act, img: [], vid: global.edt_vids},
                    };
                    postData(pData);
                }
                if (act == 'emt') {
                    var pData = {
                        section: 'creator',
                        type: 'crt_prv_str',
                        user: udata,
                        head: strh.val(),
                        body: strBody.val(),
                        tied: pass,
                        thread: 'none',
                    };
                    postData(pData);
                }
            };

            const doneStrAdds = () => {
                $('#clsWrt').click();
                $('#opnHme').click();
                $('#flwMainStr').click();
            };

        };

        // aut functs
        const dropAut = () => {
            $('.wrtCLass').remove();
            $('#dropWrt').after(writeABod());
            checkMode(); Dark();

            // open usr-aut input
            $('#upldimg-bookCvr').click(()=>{
                $('#postImageUAu').click();
            });
            $('#ClickImgInUA').click(()=>{
                $('#postImageUAuJ').click();
            });
            // video user aut
            $('#clickVidJrnUA').click(()=>{
                $('#postVideoUAuJ').click();
            });

            // write author contents
            // ---------------------
            var curUAP = 'b';
            $('#bookNWr').click(function() {
                curUAP = 'b';
                $('#jourANWr').css('border-bottom', '');
                $('#bookNWr').css('border-bottom', 'solid 1px skyblue');
                $('#UAWrtJ').css('display', `none`);
                $('#UAWrtB').fadeIn();
                $('#donAutCnt').text('create book');
            });
            $('#jourANWr').click(function() {
                curUAP = 'j';
                $('#bookNWr').css('border-bottom', '');
                $('#jourANWr').css('border-bottom', 'solid 1px skyblue');
                $('#UAWrtB').css('display', `none`);
                $('#UAWrtJ').fadeIn();
                $('#donAutCnt').text('create author journal');
            });

            // cncl imgs
            $('#dlt-uplddBkCvr').click(function() {
                $('#upplddImg-bookCvr').css('background-image', `none`);
                $('#upplddImg-bookCvr, #dlt-uplddBkCvr').css('display', `none`);
                $('#upldimg-bookCvr').fadeIn();
                $('#postImageUAu').val('');
                global.img_hangLen = 0;
            });
            // aut
            $('#cnIm_forUautJ').click(()=>{
                $('.mainCloneImgs, .allImgs_app').remove();
                $('#scrlimgCon-UautJ').slideUp(100);
                $('#fileTpeCon-UautJ').fadeIn();
            })
            $('#cnVd_forUautJ').click(()=>{
                $('.editHangVid, .allVids_aedt').remove();
                $('#scrlvidCon-UautJ').slideUp(100);
                $('#fileTpeCon-UautJ').fadeIn();
            })
            var cover = ''; var chapters = new Array(); var curnCp = 'r'; var bRM = ''; var bTTL = ''; var bCTTL = ''; var bBDY = '';
            var targetDate0 = new Date();
            targetDate0.setMilliseconds(targetDate0.getMilliseconds() + 1);
            var countDownDate0 = targetDate0.getTime();
            var x2 = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate0 - now;
                if (distance < 0) {
                    bTTL = $('#bkTTlUAut');
                    bCTTL = $('#autJI');
                    bBDY = $('#autJB');
                    clearInterval(x2);
                }
            }, 1000);

                // chaptering
            // inserting txts to respective chptr
            $('#chptrBdy').keyup(()=>{
                if ($('#chptrBdy').val() !== '') {
                    if (curnCp == 'r') {
                        bRM = $('#chptrBdy').val();;
                    } else {
                        for (let i = 0; i < chapters.length; i++) {
                            if (i == curnCp) {
                                chapters[i].body = $('#chptrBdy').val();
                            }
                        }
                    }
                }
            });
            $('#chptrTltl').keyup(()=>{
                if ($('#chptrTltl').val() !== '') {
                    for (let i = 0; i < chapters.length; i++) {
                        if (i == curnCp) {
                            chapters[i].title = $('#chptrTltl').val();
                        }
                    }
                }
            });
            // read me sect
            $('#rdMeChptr').click(()=> {
                curnCp = 'r';
                $('.chptrsCr').css('border', '');
                $('#rdMChptr').css('border', 'solid 1px skyblue');
                $('#chptrTltl').css('display', 'none');
                $('#crntChptLsTtl').text('read me: all needed information for the book');
                $('#chptrBdy').val(bRM);
            });
            // new chapter
            var chpFW; var chpFWC; var tchp;
            const includeChpW = () => {
                chpFW = $('#chptOvFCon').css('width');
                chpFWC = chpFW.slice(0, chpFW.length-2);
                tchp = Number(chpFWC);
            }
            var targetDate2 = new Date();
            targetDate2.setMilliseconds(targetDate2.getMilliseconds() + 1);
            var countDownDate2 = targetDate2.getTime();
            var x2 = setInterval(function() {
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate2 - now;
                if (distance < 0) {
                    includeChpW();
                    clearInterval(x2);
                }
            }, 1000);
            $('#addCHptrLs').click(()=> {
                chapters[chapters.length] = {title: '', body: ''};
                chpFW = $('#chptOvFCon').css('width');
                chpFWC = chpFW.slice(0, chpFW.length-2);
                tchp = Number(chpFWC);
                $('#chptOvFCon').css('width', `${tchp+100}px`);
                vwChptLs();
                includeChpW();
            });
            const chpLsB = (ids, i) => {
                return `
                <div style="width:100px; height:100%; float:left;" class="chpLsBdy" id="${ids.body}">
                    <p class="sub_h" style="text-align:center; font-size:12px; margin:0px; padding:2px; color:grey;">chapter</p>
                    <div id="${ids.hold}" style="margin:auto; width:55px; height:55px; border-radius:5px; cursor:pointer;" class="chptrsCr">
                        <br>
                        <p style="text-align:center; font-size:30px; margin-top:-17.5px; color:grey;" class="sub_h">${i+1}</p>
                    </div>
                    <p style="text-align:center; cursor:pointer; margin:0px; padding:0px;"> <img src="assets/imgs/can.png" width="13.5px" height="13.5px" style="margin-top:5px;" id="${ids.remId}"> </p>
                </div>
                `
            };
            const chptrLsFuncs = (chp, ids, i) => {
                // current chapter btn
                const chkCurn = () => {
                    if (curnCp == i) {
                        $('.chptrsCr').css('border', '');
                        $(`#${ids.hold}`).css('border', 'solid 1px skyblue');
                        $('#chptrTltl').fadeIn();
                        $('#crntChptLsTtl').text(`chapter ${i+1}`);
                        $('#chptrTltl').val(chp.title);
                        $('#chptrBdy').val(chp.content);
                    }
                }
                chkCurn();
                $(`#${ids.hold}`).click(()=> {
                    curnCp = i;
                    chkCurn();
                });
                // rem
                $(`#${ids.remId}`).click(()=> {
                    chapters.splice(i, 1);
                    $('#chptOvFCon').css('width', `${tchp-200}px`);
                    includeChpW();
                    vwChptLs();
                });
            }
            const createChpLsIds = (i) => {
                return {
                    body: `body_chapters_listIds_${i}`,
                    hold: `hold_chapters_listIds_${i}`,
                    remId: `remId_chapters_listIds_${i}`,
                }
            }
            const dropChptLs = (chp, i) => {
                const ids = createChpLsIds(i);
                $('#drpWrtChptrs').append(chpLsB(ids, i));
                chptrLsFuncs(chp, ids, i);
            }
            // refresh chpters
            const vwChptLs = () => {
                $('.chpLsBdy').remove();
                $('#chptrTltl').val('');
                $('#chptrBdy').val('');
                if (chapters.length > 0) {
                    for (let i = 0; i < chapters.length; i++) {
                        dropChptLs(chapters[i], i);
                    }
                    checkMode();
                }
            };

            // POST author content
            $('#donAutCnt').click(()=>{
                const uploadJrn = (encount, crnt, uname) => {
                    var schm;
                    if (crnt == 'img') {
                        schm = {postId: uname+'PostID'+date, content_type: 'author_journal', type: 'User_author', user: uname, heading: bCTTL.val(), img: encount, vid: '', date: [year, day, month, hour, minute], body: bBDY.val(), hidden: 'No', tagged: [], reads: []};
                    }
                    if (crnt == 'vid') {
                        schm = {postId: uname+'PostID'+date, content_type: 'author_journal', type: 'User_author', user: uname, heading: bCTTL.val(), img: '', vid: encount, date: [year, day, month, hour, minute], body: bBDY.val(), hidden: 'No', tagged: [], reads: []};
                    }
                    if (crnt == 'none') {
                        schm = {postId: uname+'PostID'+date, content_type: 'author_journal', type: 'User_author', user: uname, heading: bCTTL.val(), img: '', vid: '', date: [year, day, month, hour, minute], body: bBDY.val(), hidden: 'No', tagged: [], reads: []};
                    }
                    var pData = {
                        section: 'creator',
                        type: 'crt_aut_jrn',
                        body: schm,
                    };
                    postData(pData);
                };
                var uname = udata._id;
                var crnt = global.bin_t;
                if (crnt == 'img') {
                    var test = global.img_hangLen;
                    if (curUAP == 'b') {
                        if (test > 0 && bTTL.val() !== '' && bRM !== '') {
                            global.edt_imgs[0].class = $('#upplddImg-bookCvr').attr('class');
                            var pData = {
                                section: 'creator',
                                type: 'crt_book',
                                user: udata._id,
                                pass: { postId: uname+'PostID'+date, user: udata._id, title: bTTL.val(), cover: global.edt_imgs[0], chapters: chapters, read_me: bRM },
                            };
                            postData(pData);
                        }else {
                            $('#alertText').text('complete book information');
                            $('#allAlerts').css('display', 'block');
                            $('#alertBody').fadeIn();
                        }
                    }else {
                        if (test > 0 && bCTTL.val() !== '') {
                            var testar = [];
                            for (let i = 0; i < test; i++) {
                                testar[i] = `imgHangerFltrd-UautJ${i}`;
                            }
                            for (let i = 0; i < test; i++) {
                                var tter = testar[i];
                                global.edt_imgs[i].class = $(`#${tter}`).attr('class');
                            }
                            uploadJrn(global.edt_imgs, crnt, udata._id);
                        }
                    }
                }else {
                    if (crnt == 'vid') {
                        var test = global.vid_hangLen;
                        var testar = [];
                        for (let i = 0; i < test; i++) {
                            testar[i] = `vidHangerFltrd-UautJ${i}`;
                        }
                        for (let i = 0; i < test; i++) {
                            var tter = testar[i];
                            global.edt_vids[i].class = $(`#${tter}`).attr('class');
                        }
                        uploadJrn(global.edt_vids[0], crnt, uname);
                    }else {
                        const cr = 'none';
                        uploadJrn(global.edt_vids, cr, uname);
                    }
                }
            });

        };

        dropJr();

    });
        
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                create();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
