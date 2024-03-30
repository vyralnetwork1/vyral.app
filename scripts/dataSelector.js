import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
var all_scr = {str: [], thr: [], jrn: [], aut: []}; var tt_scr = {str_scr: [], jrn: {likes: [], comments: [], reads: [], score: 0}};
var tp = {sect: 'str', streak: 'recent'};
var showO = {
    str_r: [], thr_r: [],
    books_r: {book_rd: [], book_r_asc: [], book_r_lkd: []}, 
    jrn_r: {jrn_r_asc: [], jrn_r_lkd: [], jrn_r_cmt: [], jrn_r_rd: []}, 
    aut_asc: [],
    // home sec
    jrn_h: [], thr_h: [], str_h: [], home_f: 'n', subs_j: []
}
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
var mnths = new Array(); mnths = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "Novbember", "December"]

function slector() {

    all_scr = {str: [], thr: [], jrn: [], aut: []}; var tt_scr = {str_scr: [], jrn: {likes: [], comments: [], reads: [], score: 0}};
    showO = {
        str_r: [], thr_r: [],
        books_r: {book_rd: [], book_r_asc: [], book_r_lkd: []}, 
        jrn_r: {jrn_r_asc: [], jrn_r_lkd: [], jrn_r_cmt: [], jrn_r_rd: []}, 
        aut_asc: [],
        // home sec
        jrn_h: [], thr_h: [], str_h: [], home_f: 'n', subs_j: []
    }

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

    // get explore contents
    const optimize = (tp) => {
        // for journals
        const day = '';
        var dist = 0;
        if (tp.streak == "recent") {
            dist = 150;
        } 
        if (tp.streak == "today") {
            dist = 1;
        }
        if (tp.streak == "all") {
            dist = 0;
        }
        // trending string + threads
        // -----
        // most tied strings
        if (tp.act == 'str_r') {
            // for str
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].thr.length > 0) {
                        lenAll[lenAll.length] = ssc[i].thr.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 10) {
                    len = 10;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].thr.length) {
                            showO.str_r[showO.str_r.length] = {content: ssc[m].str, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                //console.log(`day: ${nwD.getDate()}, month: ${mnths[nwD.getMonth()]}, year: ${nwD.getFullYear()}`);
                // find if assigned alrdy
                var flag = "n";
                for (let m = 0; m < all_scr.str.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (ssc[i].str._id == all_scr.str[m].string) {
                            flag = 'y';
                        }
                    }
                }
                for (let i = 0; i <  all_scr.str.length; i++) {
                    if (flag == 'n') {
                        ssc[ssc.length] = {str:  all_scr.str[i].content, thr: []};
                    }
                    for (let m = 0; m < all_scr.str[i].ties.length; m++) {
                        if (all_scr.str[i].ties[m].content.tied_to == all_scr.str[i].content._id) {
                            if (all_scr.str[i].ties[m].content.date[0] == nDate.year && all_scr.str[i].ties[m].content.date[1] == nDate.day && all_scr.str[i].ties[m].content.date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].str._id == all_scr.str[i].content._id) {
                                        ssc[b].thr[ssc[b].thr.length] = all_scr.str[i].ties[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt()
        };
        // most asc thrs
        if (tp.act == 'thr_r') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].asc.length > 0) {
                        lenAll[lenAll.length] = ssc[i].asc.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 3) {
                    len = 3;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].asc.length) {
                            showO.thr_r[showO.thr_r.length] = {content: ssc[m].thr, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.thr.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (ssc[i].thr._id == all_scr.thr[m].thread._id) {
                            flag = 'y';
                        }
                    }
                }
                for (let i = 0; i <  all_scr.thr.length; i++) {
                    if (flag == 'n') {
                        ssc[ssc.length] = {thr: all_scr.thr[i].thread, asc: []};
                    }
                    for (let m = 0; m < all_scr.thr[i].likes.length; m++) {
                        //if (all_scr.thr[i].likes[m].date[0] == nDate.year && all_scr.thr[i].likes[m].date[1] == nDate.day && all_scr.thr[i].likes[m].date[2] == nDate.month) {
                            for (let b = 0; b < ssc.length; b++) {
                                if (ssc[b].thr._id == all_scr.thr[i].thread._id) {
                                    ssc[b].asc[ssc[b].asc.length] = all_scr.thr[i].likes[m];
                                }
                            }
                        //}
                    }
                    for (let m = 0; m < all_scr.thr[i].comments.length; m++) {
                        //if (all_scr.thr[i].comments[m].date[0] == nDate.year && all_scr.thr[i].comments[m].date[1] == nDate.day && all_scr.thr[i].comments[m].date[2] == nDate.month) {
                            for (let b = 0; b < ssc.length; b++) {
                                if (ssc[b].thr._id == all_scr.thr[i].thread._id) {
                                    ssc[b].asc[ssc[b].asc.length] = all_scr.thr[i].comments[m];
                                }
                            }
                        //}
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
    
        // books
        // -----
        // most read
        if (tp.act == 'book_r') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].reads.length > 0) {
                        lenAll[lenAll.length] = ssc[i].reads.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 10) {
                    len = 10;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].reads.length) {
                            showO.books_r.book_rd[showO.books_r.book_rd.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for reads - reads
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, reads: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].reads.length; m++) {
                            if (all_scr.jrn[i].reads[m].date[0] == nDate.year && all_scr.jrn[i].reads[m].date[1] == nDate.day && all_scr.jrn[i].reads[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].reads[ssc[b].reads.length] = all_scr.jrn[i].reads[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // most asc
        if (tp.act == 'book_r_asc') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].asc.length > 0) {
                        lenAll[lenAll.length] = ssc[i].asc.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 10) {
                    len = 10;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].asc.length) {
                            showO.books_r.book_r_asc[showO.books_r.book_r_asc.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for books - asc
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, asc: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].reads.length; m++) {
                            if (all_scr.jrn[i].reads[m].date[0] == nDate.year && all_scr.jrn[i].reads[m].date[1] == nDate.day && all_scr.jrn[i].reads[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.jrn[i].reads[m];
                                    }
                                }
                            }
                        }
                        for (let m = 0; m < all_scr.jrn[i].likes.length; m++) {
                            if (all_scr.jrn[i].likes[m].date[0] == nDate.year && all_scr.jrn[i].likes[m].date[1] == nDate.day && all_scr.jrn[i].likes[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.jrn[i].likes[m];
                                    }
                                }
                            }
                        }
                        for (let m = 0; m < all_scr.jrn[i].comments.length; m++) {
                            if (all_scr.jrn[i].comments[m].date[0] == nDate.year && all_scr.jrn[i].comments[m].date[1] == nDate.day && all_scr.jrn[i].comments[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.jrn[i].comments[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // most liked
        if (tp.act == 'book_r_lkd') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].lks.length > 0) {
                        lenAll[lenAll.length] = ssc[i].lks.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 10) {
                    len = 10;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].lks.length) {
                            showO.books_r.book_r_lkd[showO.books_r.book_r_lkd.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for books - lks
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, lks: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].likes.length; m++) {
                            if (all_scr.jrn[i].likes[m].date[0] == nDate.year && all_scr.jrn[i].likes[m].date[1] == nDate.day && all_scr.jrn[i].likes[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].lks[ssc[b].lks.length] = all_scr.jrn[i].likes[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // books + journals
        // -----
        // most asc
        if (tp.act == 'genJrn_r_asc') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].asc.length > 0) {
                        lenAll[lenAll.length] = ssc[i].asc.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 3) {
                    len = 3;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].asc.length) {
                            showO.jrn_r.jrn_r_asc[showO.jrn_r.jrn_r_asc.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for books - asc
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book" || all_scr.jrn[m].type == "author_journal" || all_scr.jrn[m].type == "admin_aut_journal" || all_scr.jrn[m].type == "journal") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book" || all_scr.jrn[i].type == "author_journal" || all_scr.jrn[i].type == "admin_aut_journal" || all_scr.jrn[i].type == "journal") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, asc: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].reads.length; m++) {
                            if (all_scr.jrn[i].reads[m].date[0] == nDate.year && all_scr.jrn[i].reads[m].date[1] == nDate.day && all_scr.jrn[i].reads[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.jrn[i].reads[m];
                                    }
                                }
                            }
                        }
                        for (let m = 0; m < all_scr.jrn[i].likes.length; m++) {
                            if (all_scr.jrn[i].likes[m].date[0] == nDate.year && all_scr.jrn[i].likes[m].date[1] == nDate.day && all_scr.jrn[i].likes[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.jrn[i].likes[m];
                                    }
                                }
                            }
                        }
                        for (let m = 0; m < all_scr.jrn[i].comments.length; m++) {
                            if (all_scr.jrn[i].comments[m].date[0] == nDate.year && all_scr.jrn[i].comments[m].date[1] == nDate.day && all_scr.jrn[i].comments[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.jrn[i].comments[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // most liked
        if (tp.act == 'genJrn_r_lkd') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].lks.length > 0) {
                        lenAll[lenAll.length] = ssc[i].lks.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 3) {
                    len = 3;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].lks.length) {
                            showO.jrn_r.jrn_r_lkd[showO.jrn_r.jrn_r_lkd.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for books - lks
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book" || all_scr.jrn[m].type == "author_journal" || all_scr.jrn[m].type == "admin_aut_journal" || all_scr.jrn[m].type == "journal") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book" || all_scr.jrn[i].type == "author_journal" || all_scr.jrn[i].type == "admin_aut_journal" || all_scr.jrn[i].type == "journal") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, lks: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].likes.length; m++) {
                            if (all_scr.jrn[i].likes[m].date[0] == nDate.year && all_scr.jrn[i].likes[m].date[1] == nDate.day && all_scr.jrn[i].likes[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].lks[ssc[b].lks.length] = all_scr.jrn[i].likes[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // most cmnt
        if (tp.act == 'genJrn_r_cmt') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].cmt.length > 0) {
                        lenAll[lenAll.length] = ssc[i].cmt.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 3) {
                    len = 3;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].cmt.length) {
                            showO.jrn_r.jrn_r_cmt[showO.jrn_r.jrn_r_cmt.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for books - lks
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book" || all_scr.jrn[m].type == "author_journal" || all_scr.jrn[m].type == "admin_aut_journal" || all_scr.jrn[m].type == "journal") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book" || all_scr.jrn[i].type == "author_journal" || all_scr.jrn[i].type == "admin_aut_journal" || all_scr.jrn[i].type == "journal") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, cmt: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].comments.length; m++) {
                            if (all_scr.jrn[i].comments[m].date[0] == nDate.year && all_scr.jrn[i].comments[m].date[1] == nDate.day && all_scr.jrn[i].comments[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].cmt[ssc[b].cmt.length] = all_scr.jrn[i].comments[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // most read
        if (tp.act == 'genJrn_r_rd') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].reads.length > 0) {
                        lenAll[lenAll.length] = ssc[i].reads.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 10) {
                    len = 10;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].reads.length) {
                            showO.jrn_r.jrn_r_rd[showO.jrn_r.jrn_r_rd.length] = {content: ssc[m].jrn, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
            }
            // for reads - reads
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.jrn.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (all_scr.jrn[m].type == "usr_aut_book" || all_scr.jrn[m].type == "author_journal" || all_scr.jrn[m].type == "admin_aut_journal" || all_scr.jrn[m].type == "journal") {
                            if (ssc[i].jrn._id == all_scr.jrn[m].journal._id) {
                                flag = 'y';
                            }
                        }
                    }
                }
                for (let i = 0; i <  all_scr.jrn.length; i++) {
                    if (all_scr.jrn[i].type == "usr_aut_book" || all_scr.jrn[i].type == "author_journal" || all_scr.jrn[i].type == "admin_aut_journal" || all_scr.jrn[i].type == "journal") {
                        if (flag == 'n') {
                            ssc[ssc.length] = {jrn:  all_scr.jrn[i].journal, reads: []};
                        }
                        for (let m = 0; m < all_scr.jrn[i].reads.length; m++) {
                            if (all_scr.jrn[i].reads[m].date[0] == nDate.year && all_scr.jrn[i].reads[m].date[1] == nDate.day && all_scr.jrn[i].reads[m].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].jrn._id == all_scr.jrn[i].journal._id) {
                                        ssc[b].reads[ssc[b].reads.length] = all_scr.jrn[i].reads[m];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
        // authors
        // -----
        // most asc
        if (tp.act == 'aut_asc') {
            var ssc = new Array(); var psh = new Array();
            var lenAll = [];
            const bottomEvl = () => {
                for (let i = 0; i < ssc.length; i++) {
                    if (ssc[i].asc.length > 0) {
                        lenAll[lenAll.length] = ssc[i].asc.length;
                    }
                }
                lenAll.sort();
                lenAll.reverse();
                var len = 0;
                if (lenAll.length > 10) {
                    len = 10;
                } else {
                    len = lenAll.length;
                }
                for (let i = 0; i < len; i++) {
                    for (let m = 0; m < ssc.length; m++) {
                        if (lenAll[i] == ssc[m].asc.length) {
                            showO.aut_asc[showO.aut_asc.length] = {author: ssc[m].aut, points: lenAll[i]};
                            ssc.splice(m, 1);
                            break;
                        }
                    }
                }
                console.log('aut asc: '+showO.aut_asc.length);
            }
            // for asc
            const strtIt = () => {
                var nwD = new Date();
                nwD.setDate(nwD.getDate()-dist);
                var nDate = {day: nwD.getDate(), month: mnths[nwD.getMonth()], year: nwD.getFullYear()}
                var flag = "n";
                for (let m = 0; m < all_scr.aut.length; m++) {
                    for (let i = 0; i < ssc.length; i++) {
                        if (ssc[i].aut._id == all_scr.aut[m].author._id) {
                            flag = 'y';
                        }
                    }
                }
                for (let i = 0; i <  all_scr.aut.length; i++) {
                    if (flag == 'n') {
                        ssc[ssc.length] = {aut:  all_scr.aut[i].author, asc: []};
                    }
                    for (let p = 0; p < all_scr.aut[i].content.length; p++) {
                        for (let z = 0; z < all_scr.aut[i].content[p].reads.length; z++) {
                            if (all_scr.aut[i].content[p].reads[z].date[0] == nDate.year &&all_scr.aut[i].content[p].reads[z].date[1] == nDate.day && all_scr.aut[i].content[p].reads[z].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].aut._id == all_scr.aut[i].author._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.aut[i].content[p].reads[z];
                                    }
                                }
                            }
                        }
                    }
                    for (let p = 0; p < all_scr.aut[i].content.length; p++) {
                        for (let z = 0; z < all_scr.aut[i].content[p].likes.length; z++) {
                            if (all_scr.aut[i].content[p].likes[z].date[0] == nDate.year &&all_scr.aut[i].content[p].likes[z].date[1] == nDate.day && all_scr.aut[i].content[p].likes[z].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].aut._id == all_scr.aut[i].author._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.aut[i].content[p].likes[z];
                                    }
                                }
                            }
                        }
                    }
                    for (let p = 0; p < all_scr.aut[i].content.length; p++) {
                        for (let z = 0; z < all_scr.aut[i].content[p].comments.length; z++) {
                            if (all_scr.aut[i].content[p].comments[z].date[0] == nDate.year &&all_scr.aut[i].content[p].comments[z].date[1] == nDate.day && all_scr.aut[i].content[p].comments[z].date[2] == nDate.month) {
                                for (let b = 0; b < ssc.length; b++) {
                                    if (ssc[b].aut._id == all_scr.aut[i].author._id) {
                                        ssc[b].asc[ssc[b].asc.length] = all_scr.aut[i].content[p].comments[z];
                                    }
                                }
                            }
                        }
                    }
                }
                dist = dist-1;
                var m1 = -1;
                if (dist > m1) {
                    strtIt();
                }else {
                    bottomEvl();
                }
            };
            strtIt();
        }
    }
    // get home contents
    const home = (type) => {
        // set friends & subscribed
        var friends = new Array(); var subed = new Array(); var varient = {jrn_h: [], thr_h: [], str_h: [], home_f: 'n', subs_j: []};
        for (let u = 0; u < db.users.length; u++) {
            if (db.users[u]._id == app.userSess) {
                for (let v = 0; v < db.users[u].following.length; v++) {
                    friends[friends.length] =  db.users[u].following[v].user;
                }
            }
        }
        for (let u = 0; u < db.users.length; u++) {
            if (db.users[u].user_type !== 'user' && db.users[u].user_type.status == 'on') {
                if (db.users[u].user_type.subscribers.length > 0) {
                    for (let j = 0; j < db.users[u].user_type.subscribers.length; j++) {
                        if (db.users[u].user_type.subscribers[j].user == app.userSess) {
                            subed[subed.length] =  db.users[u]._id;
                        }
                    }
                }
            }
        }
        // for jounrals + books
        var chVF = 'n'; var vrl = db.users.find(o => o.user_name == '@vyral');
        for (let f = 0; f < friends.length; f++) {
            var usr = db.users.find(o => o._id == friends[f]);
            if (usr !== undefined) {
                if (usr.user_name == '@vyral') {
                    chVF = 'y';
                }
            }
        }
        for (let z = 0; z < all_scr.jrn.length; z++) {
            if (all_scr.jrn[z].type == "admin_aut_journal") {
                varient.jrn_h[varient.jrn_h.length] = all_scr.jrn[z].journal._id;
            } else {
                if (all_scr.jrn[z].type !== 'usr_aut_book' && all_scr.jrn[z].type !== 'author_journal') {
                    if (all_scr.jrn[z].user._id == app.userSess) {
                        varient.jrn_h[varient.jrn_h.length] = all_scr.jrn[z].journal._id;
                    }else {
                        for (let j = 0; j < friends.length; j++) {
                            if (friends[j] == all_scr.jrn[z].user._id) {
                                varient.jrn_h[varient.jrn_h.length] = all_scr.jrn[z].journal._id;
                            } 
                        }
                    }
                }else {
                    if (chVF == 'n' && vrl._id !== udata._id) {
                        if (all_scr.jrn[z].user._id == vrl._id) {
                            varient.jrn_h[varient.jrn_h.length] = all_scr.jrn[z].journal._id;
                        }
                    }
                    if (all_scr.jrn[z].user._id == app.userSess) {
                        varient.jrn_h[varient.jrn_h.length] = all_scr.jrn[z].journal._id;
                    } else {
                        for (let d = 0; d < subed.length; d++) {
                            if (subed[d] == all_scr.jrn[z].user._id) {
                                varient.jrn_h[varient.jrn_h.length] = all_scr.jrn[z].journal._id;
                            }
                        }
                    }
                }
            }
        }
        // for strings
        for (let o = 0; o < all_scr.str.length; o++) {
            for (let u = 0; u < friends.length; u++) {
                if (all_scr.str[o].content.user == friends[u]) {
                    varient.str_h[varient.str_h.length] = {content: all_scr.str[o].content._id, tie: 'Friend'};
                }
            }
        }
        for (let i = 0; i < all_scr.str.length; i++) {
            if (all_scr.str[i].content.user == app.userSess) {
                varient.str_h[varient.str_h.length] = {content: all_scr.str[i].content._id, tie: 'Own'};
            }else {
                if (all_scr.str[i].content.type == 'Private' && all_scr.str[i].content.tied.length > 0) {
                    for (let x = 0; x < all_scr.str[i].content.tied.length; x++) {
                        if (all_scr.str[i].content.tied[x] == app.userSess) {
                            varient.str_h[varient.str_h.length] = {content: all_scr.str[i].content._id, tie: 'Tied'};
                        }
                    }
                }
            }
        }
        // check length
        if (type == 'home') {
            if (varient.jrn_h > showO.jrn_h || varient.thr_h > showO.thr_h || varient.str_h > showO.str_h || varient.home_f > showO.home_f || varient.subs_j > showO.subs_j) {
                if (app.child_p == 'home') {
                    
                } else {
                    $('#opnHme').css('background-image', 'url(assets/imgs/home4.png)');
                }
            }
        } else {
            showO.jrn_h = varient.jrn_h;
            showO.thr_h = varient.thr_h;
            showO.str_h = varient.str_h;
            showO.home_f = varient.home_f;
            showO.subs_j = varient.subs_j;
        }
    }
    // evaluate scores
    var evaluate = (type) => {
        // for optimization
        if (type == 'load_all' || type == 'optimize') {
            showO = {
                str_r: [], thr_r: [],
                books_r: {book_rd: [], book_r_asc: [], book_r_lkd: []}, 
                jrn_r: {jrn_r_asc: [], jrn_r_lkd: [], jrn_r_cmt: [], jrn_r_rd: []}, 
                aut_asc: [],
                jrn_h: [], thr_h: [], str_h: [], home_f: 'n', subs_j: []
            }
            var tps = new Array();
            tps = ["str_r", "thr_r", "book_r", "book_r_asc", "book_r_lkd", "genJrn_r_asc", "genJrn_r_lkd", "genJrn_r_cmt", "genJrn_r_rd", "aut_asc"];
            for (let o = 0; o < tps.length; o++) {
                var mainT = {act: tps[o], streak: tp.streak};
                optimize(mainT);
            }
        }
        // for home
        if (type == 'load_all' || type == 'home') {
            showO.jrn_h = []; showO.thr_h = []; showO.str_h = []; showO.home_f = 'n'; showO.subs_j = [];
            home(type);
        }
    };
    // get all data
    const groupData = (pst, usrs, type) => {
        for (let z = 0; z < pst.length; z++) {
            if (pst[z].content_type == 'author_journal' || pst[z].content_type == 'usr_aut_book' || pst[z].content_type == 'admin_aut_journal' || pst[z].content_type == 'journal') {
                if (pst[z].type == 'Author') {
                    all_scr.jrn[all_scr.jrn.length] = {journal: pst[z], likes: pst[z].likedBy, comments: pst[z].comments, reads: pst[z].reads, j_scre: 0, type: pst[z].content_type};
                }else {
                    for (let x = 0; x < usrs.length; x++) {
                        if (usrs[x]._id == pst[z].user) {
                            all_scr.jrn[all_scr.jrn.length] = {journal: pst[z], user: usrs[x], likes: pst[z].likedBy, comments: pst[z].comments, reads: pst[z].reads, j_scre: 0, type: pst[z].content_type};
                        }
                    }
                }
            }
            // str && thr
            if (pst[z].content_type == 'string') {
                all_scr.str[all_scr.str.length] = {string: pst[z]._id, content: pst[z], type: pst[z].type, ties: []};
            }
        }
        // pass threads/ties
        for (let h = 0; h < all_scr.str.length; h++) {
            for (let p = 0; p < pst.length; p++) {
                if (pst[p].content_type == 'thread' && pst[p].tied_to == all_scr.str[h].string) {
                    all_scr.str[h].ties[all_scr.str[h].ties.length] = {thread: pst[p]._id, content: pst[p]};
                }
            }
        }
        // threads only
        for (let p = 0; p < pst.length; p++) {
            if (pst[p].content_type == 'thread') {
                all_scr.thr[all_scr.thr.length] = {thread: pst[p], likes: pst[p].likedBy, comments: pst[p].comments};
            }
        }
        // author heirarchy
        for (let m = 0; m < usrs.length; m++) {
            if (usrs[m].user_type !== "user") {
                if (usrs[m].user_type.status == "on") {
                    all_scr.aut[all_scr.aut.length] = {author: usrs[m], content: []};
                }
            }
        }
        for (let m = 0; m < all_scr.aut.length; m++) {
            for (let i = 0; i < pst.length; i++) {
                if (pst[i].content_type == 'author_journal' || pst[i].content_type == 'usr_aut_book') {
                    if (all_scr.aut[m].author._id == pst[i].user) {
                        all_scr.aut[m].content[all_scr.aut[m].content.length] = {journal: pst[i], user: all_scr.aut[m].author, likes: pst[i].likedBy, comments: pst[i].comments, reads: pst[i].reads, j_scre: 0, type: pst[i].content_type};;
                    }
                }
            }
        }
        evaluate(type);
    } 
    if (app.userSess !== '') {
        var pst = db.all_posts; var usrs = db.users; var type = 'load_all';
        groupData(pst, usrs, type);
    }

}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            slector();
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
export {showO, all_scr, slector};
