import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function carties() {

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

    // check cat
    const checkCat = () => {
        var cart = app.child_p;
        if (cart == 'home') {
            $('#reaOrStr').fadeIn();
        }else {
            $('#catImpHme').text(cart);
            $('#catImpHme').fadeIn();
        }
    };
    checkCat();

    // ---------------
    // CHNGE CART BTNS
    // ---------------
    // other carts
    const othrCrts = () => {
        $('#flwMainJrn').click();
        $('#goToHome, #goToTstr, #goToExplr, #goToTops, #goToShelf').css('color', 'grey');
        $('#goToHomeImg').attr('src', 'assets/imgs/home3.png');
        $('#goToTstrImg').attr('src', 'assets/imgs/strings2.png');
        $('#goToExpImg').attr('src', 'assets/imgs/exp2.png');
        $('#goToTopsImg').attr('src', 'assets/imgs/shop2.png');
        $('#forJrnMain').fadeIn();
        $('#explBody, #forStrMain, #topsBody, #trstrBody').css('display', 'none');
    };
    const dropNB = () => {
        $('.main_navs_btns').remove();
        /// all navs
        // basic navs
        const drop = (cat, i, flg) => {
            const btn = `btn_mainnav_${i}`;
            if (flg == 'y') {
                $('#dropCatsLft').append(`
                    <button type="button" name="button" class="${btn} btn btn-warning btn-xs main_navs_btns" style="background-color:darkorange; font-size:16.5px; color:white; border-style:solid; border-width:1px; border-color:darkorange; border-radius:15px; margin:5px; padding:5px;">${cat}</button>
                `);
            }else {
                $('#dropCatsLft').append(`
                    <button type="button" name="button" class="${btn} btn btn-warning btn-xs main_navs_btns sub_hs" style="background-color:transparent; font-size:16.5px; border-style:solid; border-width:1px; border-color:silver; border-radius:15px; margin:5px; padding:5px;">${cat}</button>
                `);
            }
            Dark();
            $(`.${btn}`).click(()=>{
                global.page_ld = 'y';
                setTimeout(() => {
                    othrCrts();
                    window.scrollTo(0, 0);
                    chngCur(cat);
                    dropNB();
                }, 10);
            });
        }
        var data2 = global.cate; var glb = db.generalCol[0];
        if (data2) {
            for (let z = 0; z < glb.categories.length; z++) {
                var flg = 'n';
                if (glb.categories[z] == data2) {
                    flg = 'y';
                }
                drop(glb.categories[z], z, flg);
            }
        }
    }
    var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                //jrns = 0; autJrns = 0;
                dropNB();
                clearInterval(x);
            }
        }, 1000);

    // CHNGE CART FUNC
    const chngCur = (crnt) => {

        global.cate = crnt;
        global.allow = 'y';
        /*childP(child);
        var targetDate = new Date();
        targetDate.setMilliseconds(targetDate.getMilliseconds() + 1);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                dropNB();
                clearInterval(x);
            }
        }, 1000);*/

    };

    
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                carties();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
