import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function infos() {

    const magicNumbers = (tId, num) => {
        // var curn
        var curn = num;
        if (curn > 9999) {
            // curn - thousands
            if (curn < 1000000) {
                // ten thousands
                if (curn < 100000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}k`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}k`);
                    }
                }
                // hundred thousands
                if (curn > 99999) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}k`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}k`);
                    }
                }
            }
            // curn - millions
            if (curn < 1000000000 && curn >= 1000000) {
                // millions
                if (curn < 10000000) {
                    var prnt = curn.toString().slice(0, 1);
                    var prnt1 = curn.toString().slice(1, 2);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}m`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }
                // ten millions
                if (curn > 9999999 && curn < 100000000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}m`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }  
                // hundred millions
                if (curn > 99999999) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}m`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}m`);
                    }
                }  
            }
            // curn - billions
            if (curn >= 1000000000) {
                // billions
                if (curn < 10000000000) {
                    var prnt = curn.toString().slice(0, 1);
                    var prnt1 = curn.toString().slice(1, 2);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}b`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }
                // ten billions
                if (curn > 9999999999 && curn < 100000000000) {
                    var prnt = curn.toString().slice(0, 2);
                    var prnt1 = curn.toString().slice(2, 3);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}b`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }  
                // hundred billions
                if (curn >= 100000000000) {
                    var prnt = curn.toString().slice(0, 3);
                    var prnt1 = curn.toString().slice(3, 4);
                    if (prnt1 == 0) {
                        $(`${tId}`).text(`${prnt}b`);
                    }else {
                        $(`${tId}`).text(`${prnt}.${prnt1}b`);
                    }
                }  
            }
        }else {
            $(`${tId}`).text(num);
        }

    };

   var allApps = JSON.parse(localStorage.getItem("app"));
   var app = global.app_store;
    const reInstt = () => {
        allApps = JSON.parse(localStorage.getItem("app"));
        app = global.app_store;
    }
   var udata = '';
   // get locale
    const getLocales = (udata) => {
        var cont = ''; var count = '';
        var lcl = db.generalCol[0];
        if (lcl) {
            for (let i = 0; i < lcl.locales.length; i++) {
                for (let p = 0; p < lcl.locales[i].Countries.length; p++) {
                    if (lcl.locales[i].Countries[p] == udata.country) {
                        cont = lcl.locales[i].Continent; count = lcl.locales[i].Countries[p];
                        $(`#contLcl`).text(`${lcl.locales[i].Continent}`);
                        $(`#CountLcl`).text(`${lcl.locales[i].Countries[p]}`);
                    }
                }
            }
        }
        getLcls(app.locale);
        // inter
        $('#wrldLcl').click(()=>{
            if (allApps.key == app.key) {
                allApps.locale = 'int';
                global.app_store.locale = 'init';
            }
            localStorage.setItem("app", JSON.stringify(allApps));
            location.reload();
        });
        // Continent
        $('#contLcl').click(()=>{
            if (allApps.key == app.key) {
                allApps.locale = 'cont';
                global.app_store.locale = 'init';
            }
            localStorage.setItem("app", JSON.stringify(allApps));
            location.reload();
        });
        // country
        $('#CountLcl').click(()=>{
            if (allApps.key == app.key) {
                allApps.locale = 'count';
                global.app_store.locale = 'init';
            }
            localStorage.setItem("app", JSON.stringify(allApps));
            location.reload();
        });
    }
    // get lcls
    const getLcls = (lcle) => {
        if (lcle) {
            if (lcle == 'int') {
                $('#wrldLcl').css('color', 'darkorange');
                $('#contLcl, #CountLcl').css('color', 'grey');
            }
            if (lcle == 'cont') {
                $('#contLcl').css('color', 'darkorange');
                $('#wrldLcl, #CountLcl').css('color', 'grey');
            }
            if (lcle == 'count') {
                $('#CountLcl').css('color', 'darkorange');
                $('#contLcl, #wrldLcl').css('color', 'grey');
            }
        }
    };
    const infoSet = () => {
        if (app.userSess !== '') {
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i]._id == app.userSess) {
                    udata = db.users[i];
                }
            }
            if (udata.user_type == "user" || udata.user_type.status !== 'on') {
                $('.norm_usr_me').fadeIn();
                $('#pblsSP').text('Upgrade profile to Author Account');
            }else {
                $('.aut_usr_me').fadeIn();
                $('#pblsSP').text('Manage Author Settings');
                if (udata.user_type.status == 'on') {
                    $('.hiveBody').remove();
                    $('.usrAutUiBodss, .usrAutUiBodssN').fadeIn();
                    $('#profInfoCol').css('display', 'none');
                    const hive = (hi) => {
                        return `
                        <div class="hiveBody" id="" style="float:left; margin:3px; height:25px; border-radius:15px; border:none; margin-bottom:5px;z">
                            <p style="float:left; margin:3px; padding:2px; color:rgb(255, 149, 0); font-size:11.5px; margin-top:3px;"> ${hi} </p>
                        </div>
                        `
                    }
                    for (let i = 0; i < udata.user_type.categories.length; i++) {
                        $('.drpCatsAtt').append(hive(udata.user_type.categories[i]));
                        if (udata.mode == 'light') {
                            $('.hiveBody').css('background-color', 'white');
                        } else {
                            $('.hiveBody').css('background-color', '#262626');
                        }
                    }
                    magicNumbers('.subsLen', udata.user_type.subscribers.length);
                    if (udata.user_type.background == 'none') {
                        $('#autBckImgCon').css('background-image', `url(assets/imgs/cb2.png)`);
                        $('#autBckImgCon').attr('class', `none`);
                    }else {
                        $('#autBckImgCon').css('background-image', `url(https://test-vyral.onrender.com/${udata.user_type.background.path})`);
                        $('#autBckImgCon').addClass(`${udata.user_type.background.class}`);
                    }
                }
            }
            if (udata.mode == 'light') {
                $('#profPicdivA').css('background-color', 'white');
                $('#profPicdivA').css('border', 'solid 3px #f0f0f0');
            } else {
                $('#profPicdivA').css('background-color', '#1a1a1a');
                $('#profPicdivA').css('border', 'solid 3px #404040');
            }
            //location.replace(`/${udata.user_name}`);
            $('.profuname, #topUnmePrf').text(udata.user_name);
            $('.profusername').html(udata.name);
            $('#mail').text(udata.email);
            $('#mailInf').attr('href', `${udata.email}`);
            $('#statusbod').html(udata.user_status);
            if (udata.profile_pic == 'none') {
                $('#profpicdiv, #profPicdivA, #profnav, #profnavXs').css('background-image', 'url(assets/imgs/profpic.png)');
                $('#profpicdiv, #profPicdivA, #profnav, #profnavXs').attr('class', 'none');
                $('#profpicdiv, #profnav, #profnavXs, #profPicdivA').css('background-size', '100% 100%');
                $('#opnPrf').css('background-image', 'url(assets/imgs/profb.png)');
                $('#opnPrf').css('background-size', '100% 100%');
            }else {
                $('#profpicdiv, #profPicdivA, #profnav, #profnavXs').css('background-image', `url(https://test-vyral.onrender.com/${udata.profile_pic.path})`);
                $('#profpicdiv, #profnav, #profnavXs, #profPicdivA').addClass(`${udata.profile_pic.class}`);
                $('#profpicdiv, #profnav, #profnavXs, #profPicdivA').css('background-size', 'cover');
                $('#opnPrf').css('background-image', `url(https://test-vyral.onrender.com/${udata.profile_pic.path})`);
                $('#opnPrf').css('background-size', 'cover');
            }
            if (udata.verification == 'on') {
                $('#verIcon').css('display', 'inline');
            }
            var ttF = udata.following.length+udata.followers.length;
            magicNumbers('.frndLen', ttF);
            var psts = db.all_posts;
            var reads = 0; var readsAut = 0;
            for (let i = 0; i < psts.length; i++) {
                if (psts[i].user === udata._id) {
                    if (psts[i].body !== '' && psts[i].content_type !== 'thread' && psts[i].content_type !== 'string') {
                        if (psts[i].content_type == 'journal') {
                            reads = reads+psts[i].reads.length;
                        }
                        if (psts[i].content_type == 'author_journal') {
                            readsAut = readsAut+psts[i].reads.length;
                        }
                    }
                    if (psts[i].content_type == 'usr_aut_book') {
                        readsAut = readsAut+psts[i].reads.length;
                    }
                }
            }
            $('#myReadsLen').text(reads);
            $('#myReadsLenAut').text(readsAut);
            getLocales(udata);

            // check ststus
            const checkStat = () => {
                const dropBusy = () => {
                    $('#container-body').css('filter', 'blur(5px)');
                    const busy = () => {
                        return `
                        <div class="container-fluid" id="busyScreen" style="display:none;">
                            <div class="row" style="height: 100%;">
                                <div class="col-xs-12 col-lg-12" style="height: 100%; position: fixed; z-index: 100; background-color: rgba(255, 255, 255, 0.85); filter: blur(10px);"></div>
                                <div class="col-xs-12 col-lg-12" style="position: fixed; z-index: 101; height: 100%;">
                                    <div style="width:100%; height:20%;"></div>
                                    <div style="margin:auto; width:150px; height:150px; background-image:url(assets/imgs/setblu.png); background-size:100% 100%;"></div>
                                    <p style="text-align:center; color:#404040; margin:5px; padding:5px; font-size:20px; font-weight:normal;">Server busy</p>
                                    <p style="text-align:center; color:grey; margin:0px; padding:3px; font-size:16.5px;">Our system/server might be going through some maintenance<br> Be patient with us!</p>
                                </div>
                            </div>
                        </div>
                        `
                    }
                    $('#dropCons').append(busy());
                    $('#busyScreen').fadeIn(50);
                    const checkAgain = () => {
                        const glb = db.generalCol[0];
                        if (glb.status == 'busy') {
                            setTimeout(() => {
                                checkAgain();
                            }, 1000);
                        }else {
                            location.reload();
                        }
                    }
                    checkAgain();
                }
                const checkIt = () => {
                    const glb = db.generalCol[0];
                    if (glb.status == 'busy') {
                        dropBusy();
                    }else {
                        setTimeout(() => {
                            checkIt();
                        }, 1000);
                    }
                }
                checkIt();
            }
            setTimeout(() => {
                checkStat(); 
            }, 4000);
        }
    }
    infoSet();

    setTimeout(() => {
        global.page_ld_stt = 'off';
    }, 5000);
    
}
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                infos();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();

export {infos};
