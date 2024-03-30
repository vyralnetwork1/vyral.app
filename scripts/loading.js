import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
import { infos } from "./info.js";
function load() {

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

    const bigLoad = () => {
        return  `
        <div class="container-fluid big_loader" style="display:none;">
            <div class="row" style="height:100%;">
                <div class="col-xs-12" style="height:100%; position:fixed; z-index:${global.pop_no+10}; background-color:rgba(0, 0, 0, 0.65);">
                    <div style="width:100%; height:20%;"></div>
                    <div style="width:130px; height:130px; margin:auto;" class="icosaLoader">
                    </div>
                </div>
            </div>
        </div>
        `
    }
    $('#dropCons').after(bigLoad());
    var loadF = 'n'; var fScope = 0;
    const dropPgLoad = () => {
        setTimeout(() => {
            if (loadF == 'y') {
                fScope++;
                if (fScope == 3 || fScope > 3) {
                    $('.big_loader').fadeOut();
                    loadF = 'n'; fScope = 0;
                    dropPgLoad();
                } else {
                    dropPgLoad();
                }
            } else {
                fScope = 0; loadF = 'n';
                dropPgLoad();
            }
        }, 10000);
    }
    dropPgLoad();

    const smlLoad = () => {
        return `
        <div class="sm_loader" style="width:100%; height:60px;">
            <div style="width:40px; height:40px; margin:auto; margin-top:7.5px;">
                <img src="assets/imgs/load.png" class="flowLoader" width="100%" height="100%">
            </div>
        </div>
        `
    }
    const dropLoader = (loc) => {
        $(`#${loc}`).prepend(smlLoad())
    }

    const checkLoad = () => {
        if (global.page_ld == 'y' || global.drp_ld == 'y') {
            if (global.page_ld == 'y') {
                global.page_ld = 'n';
                loadF = 'y'; fScope++;
                $('.big_loader').fadeIn();
            } 
            if (global.drp_ld == 'y') {
                global.drp_ld = 'n';
                for (let i = 0; i < global.drp_ld_loc.length; i++) {
                    dropLoader(global.drp_ld_loc[i]);
                }
                global.drp_ld_loc = [];
            }
            setTimeout(() => {
                checkLoad();
            }, 1);
        } else {
            setTimeout(() => {
                checkLoad();
            }, 1);
        }
    }
    setTimeout(() => {
        //$('#container-body').css('display', 'none');
        checkLoad();
        setTimeout(() => {
            if (app.userSess !== '') {
                $('#container-body').fadeIn();
            }
        }, 3000);
    }, 5000);

    const checkOff = () => {
        if (global.page_ld_stt == 'off' || global.drp_ld_stt == 'off') {
            if (global.page_ld_stt == 'off') {
                global.page_ld_stt = 'on'; loadF = 'n'; 
                setTimeout(() => {
                    $('.big_loader').fadeOut();
                    // $('.big_loader').remove();
                }, 500);
            } 
            if (global.drp_ld_stt == 'off') {
                global.drp_ld_stt = 'on';
                $('.sm_loader').slideUp(100);
                setTimeout(() => {
                    $('.sm_loader').remove();
                }, 500);
            }
            setTimeout(() => {
                checkOff();
            }, 1);
        } else {
            setTimeout(() => {
                checkOff();
            }, 1);
        }
    }
    checkOff();
    
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                load();
            }, 500);
        } else {
            checkDb();
        }
    }, 1000);
}
checkDb();
