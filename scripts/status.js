import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
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

const body = () => {
    return `
    <div class="container-fluid" id="offlineCon">
        <div class="row" style="height:100%;">
            <div class="col-xs-12" style="height:100%; position:fixed; z-index:100; background-color:white;">
                <br>
                <div style="width:100%; height:150px;"></div>
                <div style="width:200px; height:185px; background-image:url(assets/imgs/offline.png); background-size:100% 100%; margin:auto;"></div>
                <p style="text-align:center; color:grey; margin:5px; padding:5px;" id="statQoute"></p>
            </div>
        </div>
    </div>
    `
}
const dropOff = () => {
    $('#drp-rev-hr').append(body());
    $('#statQoute').text('offline');
}
const statusOff = () => {
    if (navigator.onLine) {
        location.reload();
    } else {
        setTimeout(() => {
            statusOff();
        }, 50);
    }
}    
const checkSTat = () => {
    if (navigator.onLine) {
        setTimeout(() => {
            checkSTat();
        }, 1000);
    } else {
        dropOff();
        setTimeout(() => {
            statusOff();
        }, 1000);
    }
}
setTimeout(() => {
    checkSTat();
}, 4000);

// check with timer
const dropTime = () => {
    $('#drp-rev-hr').append(body());
    $('#statQoute').html('service took too much time to respond.<br> Check your mobile data or wait until our network is resolved.');
    // check ncurrent status
    const refCheck = () => {
        if (db_f == 'y') {
           location.reload(); 
        } else {
            setTimeout(() => {
                refCheck();
            }, 1000);
        }
    }
    refCheck()
}
setTimeout(() => {
    if (db_f !== 'y') {
        dropTime();
    }
}, 15000);