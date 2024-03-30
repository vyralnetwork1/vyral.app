import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function time() {

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

    async function assignTime(T) {
        var settings = {
            method: 'post',
            body: JSON.stringify({ id: data.user, set: {time_lapse: T} }),
            headers: { "Content-type" : "application/json; charset=utf-8" }
        }
        try {
            const response = await fetch(`https://test-vyral.onrender.com/mobile/setSet`, settings);
            const dn = await response.json();
            assignDb();
            setTimeout(() => {
                refreshI();
                startTime();
            }, 100);
        } catch (error) {
            alert(error);
        }
    }
    async function startTime() {
        setTimeout(() => {
            if (app.userSess !== '') {
                var nowT = Number(udata.time_lapse) + 10;
                assignTime(nowT);
            } else {
                startTime();
            }
        }, 10000);    
    }
    startTime();
    
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                time();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
