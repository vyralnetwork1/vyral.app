import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function alerts() {

   var allApps = JSON.parse(localStorage.getItem("app"));
   var app = global.app_store;
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

    const startMainLerts = () => {
        // OPEN SCREEN LOADER
        //-------------------
        /*const opener = () => {
            return `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12" id="opener" style="position:fixed; z-index:10; height:100%; display:none;">
                            <div style="width:80px; height:65px; margin:auto; margin-top:70%;">
                                <img src="assets/imgs/newlog.png" width="100%" height="100%">
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        $('#dropCons').before(opener());*/
        const apnd = (color) => {
            //$('#hspan').before(opener());
            if (color == 'light') {
                $('#opener').css('background-color', 'white');
                $('#opener').css('display', 'block');
            }else {
                $('#opener').css('background-color', '#262626');
                $('#opener').css('display', 'block');
            }
        };
        if (udata.mode === 'light') {
            apnd('light');
        }else {
            apnd('dark');
        }
        // ALL ALERTS HOLDER
        //-------------------
        const alerter = () => {
            return `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12" id="allAlerts" style="position:fixed; z-index:${global.pop_no+99}; height:100%; background-color:black; opacity:0.7; display:none;">
                            
                        </div>
                    </div>
                </div>
            `
        };
        $('#dropCons').before(alerter());
        const apply = () => {
            const alertBody = () => {
                return `
                    <div class="col-xs-12" style="bottom:0; right:0; position:fixed; z-index:${global.pop_no+100};">
                        <div id="alertBody" style="margin-bottom:10px; border-radius:10px; display:none;">
                            <p id="alertText" style="padding:7.5px; margin:0px; color:orangered; text-align:center;"></p>
                            <div id="doneLertDiv" style="width:100%; height:40px;">
                                <p style="text-align:center; margin:0px; padding:7.5px;">
                                    <button id="doneLertBtn" class="btn btn-default btn-xs" style="border:solid 1px darkorange; border-radius:5px; background-color:transparent; color:darkorange;">ok</button>
                                </p>
                            </div>
                        </div>
                    </div>
                `
            };
            const edtJrn = () => {
                return `
                    <div class="col-xs-12" style="bottom:0; right:0; position:fixed; z-index:${global.pop_no++};">
                        <div id="edtJrnBod" class="edtAlrBod" style="margin-bottom:10px; border-radius:10px; display:none;">
                            <div style="width:100%; height:40px;">
                                <p style="margin:0px; padding:5px; text-align:center;">
                                    <img src="assets/imgs/can.png" width="15px" height="15px" id="clsEdtJrn">
                                </p>
                            </div>
                            <div class="doneLertDiv" style="width:100%; height:250px; overflow-y:auto;" id="edtJrnBod">
                                <br>
                                <input maxlength="200" class="srchCon sub_h" id="edtJrnIn" style="border:none; width:90%; margin:10px; background-color:transparent;" placeholder="header" />
                                <br>
                                <textarea id="edtJrnBdy" class="commentInput sub_h" style="height:60px; margin:10px; width:90%; border-radius:5px;" placeholder="body"></textarea>
                            </div>
                            <div class="doneLertDiv" style="width:100%; height:40px;">
                                <p id="plcEdtJrnBtn" style="text-align:center; margin:0px; padding:7.5px;">
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                `
            };
            const edtThrd = () => {
                return `
                    <div class="col-xs-12" style="bottom:0; right:0; position:fixed; z-index:${global.pop_no+100};">
                        <div id="edtThrdBod" class="edtAlrBod" style="margin-bottom:10px; border-radius:10px; display:none;">
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
                `
            };
            const edtTStr = () => {
                return `
                    
                `
            };
            $('#allAlerts').before(alertBody(), edtTStr());
            Dark();
            if (app.userSess == '' || app.userSess == null) {
                $('#alertBody, .edtAlrBod').css('background-color', 'white');
                $('#doneLertDiv, .doneLertDiv').css('border-top', 'solid 1px #dddddd');
                $('#alertText').css('color', 'grey');
            } else {
                if (udata.mode === 'light') {
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
                    $('#alertText').css('color', 'silver');
                }
            }
            $('#doneLertBtn').click(()=>{
                $('#alertBody, #allAlerts, #edtThrdBod, #edtStrBod, #edtJrnBod').fadeOut();
                $('#container-body').css('filter', '');
            });
            
            $('#clsEdtJrn').click(()=>{
                $('#alertBody, #allAlerts, #edtThrdBod, #edtStrBod, #edtJrnBod').fadeOut();
                $(`.doneEdtJrn`).remove();
                $('#container-body').css('filter', '');
            });
            //$('#allAlerts, #alertBody').fadeOut();
        };
        apply();
    }
    if (app.userSess !== '') {
        startMainLerts();
    }
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                alerts();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
