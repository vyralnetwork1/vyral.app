import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
// smart value
$('#u_name_in_v').on('input', function(key){
  var value = $(this).val();
  $(this).val(value.replace(/ /g, '_'));
});
function logs() {

    var allApps = JSON.parse(localStorage.getItem("app"));
    var app = global.app_store;

    var lcl = db.generalCol[0].locales;
    for (let z = 0; z < lcl.length; z++) {
        for (let i = 0; i < lcl[z].Countries.length; i++) {
            $('#lclid').append(`<option>${lcl[z].Countries[i]}</option>`);
            // <li id="male" onclick="Male()"><a href="#">male</a></li>
        }
    }

    // com alert
    const Alerts = (comp) => {
        $('.alert_p').remove();
        $('#drop_logs_Comp').append(`<p class="alert_p" style="text-align: center; color:orangered; font-size: 13px; margin: 3px;">${comp}</p>`);
        $('.alert_p').fadeIn();
        var targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + 3);
        var countDownDate = targetDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            if (distance < 0) {
                $('.alert_p').remove();
                clearInterval(x);
            }
        }, 1000);
    }
    
    /**
     * UNAME INSPECT + MAIL VERFC
     */
    var verForm = $('#form-mailv');
    var verMail = $('#mail_in_v');
    var verUnme = $('#u_name_in_v');
    var unVer = ''; var mlVer = '';
    //  uname check
    $(verUnme).keyup(()=>{
        console.log('users: '+db.users.length);
        if (verUnme.val() == '') {
            verUnme.css('borde', 'solid 1px #f0f0f0');
        } else {
            var srch = $('#u_name_in_v');
            var usr = ''; 
            usr = db.users.find(i => i.user_name == `@${srch.val()}`);
            if (usr == '' || usr == undefined) {
                unVer = 'go';
                srch.css('border', 'solid 1px lightblue');
                $('#ver-uname-no').fadeOut();
                checkCon();
            } else {
                $('#submit-mailVer').fadeOut();
                unVer = '';
                srch.css('border', 'solid 1px red');
                $('#ver-uname-no').fadeIn();
            }
        }
    });
    // mail check
    $(verMail).keyup(()=>{
        if (verMail.val() == '') {
            verMail.css('border', 'solid 1px #f0f0f0');
        } else {
            // check if user exists
            var mail = ''; 
            mail = db.users.find(i => i.email == verMail.val());
            if (mail == '' || mail == undefined) {
                mlVer = 'go';
                verMail.css('border', 'solid 1px lightblue');
                $('#ver-mail-no').fadeOut();
                checkCon();
                // check if email secure
                chekMailSec()
            }else {
                $('#submit-mailVer').fadeOut();
                mlVer = '';
                verMail.css('border', 'solid 1px red');
                $('#ver-mail-no').fadeIn();
                // check if email secure
                chekMailSec();
            }
                
        }
    });
    var chekMailSec = () => {
        if (allApps.dontWho == verMail.val()) {
            $('#submit-mailVer').fadeOut();
            $('#dontWhover-mail-no').fadeIn();
        }else {
            $('#dontWhover-mail-no').css('display', 'none');
        }
    };
    // submit mail+name
    var canSub = '';
    verForm.submit((e) => {
        e.preventDefault();
        checkCon();
        if (canSub == 'go') {
            var timeC = ''; var chkVal = '';
            /*var code = Math.random().toString();
            var verCode = code.slice(2, 8);*/
            var pData = {
                section: 'register',
                type: 'ver_mail',
                mail: verMail.val()
            };
            postData(pData);
            const checkMSent = () => {
                if (global.mail_v_s == 'y') {
                    global.mail_v_s = 'n';
                    var targetDate = new Date();
                    var seconds = targetDate.getMinutes();
                    targetDate.setMinutes(targetDate.getMinutes() + 2);
                    var countDownDate = targetDate.getTime();
                    $('#form-mailv').css('display', 'none');
                    $('#verinfo-timer-div').fadeIn();
                    $('#sentTo').text(verMail.val());
                    var x = setInterval(function() {
                      // Get today's date and time
                      var now = new Date().getTime();
                
                      // Find the distance between now and the count down date
                      var distance = countDownDate - now;
                      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                      $('#verTimer').text(`${minutes}:${seconds}`);
      
                      if (distance < 0) {
                        ranSub = false;
                        $('#verinfo-timer-div, #dontMail-div').css('display', 'none');
                        if (chkVal == '') {
                          $('#form-mailv').fadeIn();
                        }
                        verMail.val('');
                        clearInterval(x);
                      }
                    }, 1000);
                } else {
                    setTimeout(() => {
                        checkMSent();
                    }, 1);
                }
            }
            checkMSent();
            $('#submitVerCode').click(()=>{
                var attm = global.mail_att;
                if (attm > 0) {
                    if (attm < 4) {
                        $('#attmptsP').fadeIn();
                        $('#attmptsMailVer').text(attm-1);
                    }
                    checkCde();
                }else {
                    if (attm == 0) {
                        $('#verinfo-timer-div').css('display', 'none');
                        $('#dontMail-div').fadeIn();
                    }
                }
            });
            const checkCde = () => {
                //alert(verc);
                var verc = global.mVer_c;
                if (verc == $('#mail-ver-in').val()) {
                    chkVal = 'yes';
                    $('#form-mailv, #verinfo-timer-div, #dontMail-div').css('display', 'none');
                    $('#form-bg').fadeIn();
                    $('#mail').val(verMail.val());
                    $('#user-bg').val(verUnme.val());
                    $('#mail').prop('readonly', true);
                    $('#user-bg').prop('readonly', true);
                    //clearInterval(x);
                }else {
                    minC();
                }
            };
            const minC = () => {
                global.mail_att--;
                var min = global.mail_att;
                if (min < 1) {
                    if (allApps.key == app.key) {
                        allApps.dontWho = verMail.val();
                    }
                    localStorage.setItem("app", JSON.stringify(allApps));
                    $('#verinfo-timer-div').css('display', 'none');
                    $('#dontMail-div').fadeIn();
                    $('#reInsEmail').click(()=>{
                        $('#attmptsP').css('display', 'none');
                        verMail.val('');
                        $('#verinfo-timer-div, #dontMail-div').css('display', 'none');
                        $('#form-mailv').fadeIn();  
                        location.reload();
                    });
                }
            };
        }
      });
    // check inputcontents
    var checkCon = () => {
        if (verMail.val() !== '' && verUnme.val() !== '' && unVer == 'go' && mlVer == 'go') {
            canSub = 'go';
            $('#submit-mailVer').fadeIn();
        }else {
            canSub = '';
            $('#submit-mailVer').fadeOut();
        }
    };

    // data extract
    var date = new Date();
    var formbg = $('#form-bgmain');
    var userName = $('#user-bg');
    var mail = $('#mail');
    var pswd1 = $('#pwd-bgt');
    var pswd = $('#pwd-bg');
    var yrid = $('#yrid');
    var mntid = $('#mntid');
    var dayid = $('#dayid');
    var sex = $('#sexid');
    var ques = $('#quest');
    var answr = $('#ans');
    
    // password confirmtion/Q/A
    $(pswd).keyup(function() {
        if ($(pswd).val() === $('#pwd-bgt').val()) {                    
          pswd.css('border-bottom', 'solid 1px orange');
          $('#qabod').slideDown(200);
          $('#openqa').fadeOut();
          $('#cqabod').click(function(){ $('#qabod').slideUp(100); $('#openqa').css('display', 'block'); })
          $('#openqa').click(function(){ $('#qabod').slideDown(200); $('#openqa').css('display', 'none'); })
        } else {
          pswd.css('border-bottom', 'solid 1px red');
        }
    });
    
    var password = new Array();

    /* HASHING
      -----------
      */
    // starts
    const getHash = (password, pswd1) => {
       // hash math value
       var math = Math.random().toString(); var len = math.length; var slc = math.slice(2, len); var runna = slc * 5; var runner = runna.toString();
       // hash math value for alphaets
       var math2 = Math.random().toString(); var len2 = math2.length; var slc2 = math2.slice(2, len2); var runna2 = slc2 * 5; var runner2 = runna2.toString();
       // extract input and hashed variable
       Diff(password, runner, runner2, pswd1);
     };
     // alphabets/nunmber diff
     const Diff = (password, runner, runner2, pswd1) => {
         // var spacer
         var spc = 0;
         // all values holder
         var tst = '';
         // check each data
         if (pswd1.length > spc) {
             for (let i = 0; i < pswd1.length; i++) {
                 // spacer to loop thro
                 spc = spc+1; 
                 // loopn thro check
                 var check = pswd1.slice(spc-1, spc); 
                 // loopn thro runner 2
                 var chckn = runner2.slice(spc-1, spc); 
                 if (isNaN(check)) {
                     if (check == 'a' || check == 'A') { tst += 1*chckn; }; if (check == 'b' || check == 'B') { tst += 2*chckn; }; if (check == 'c' || check == 'C') { tst += 3*chckn; }; if (check == 'd' || check == 'D') { tst += 4*chckn; }; if (check == 'e' || check == 'E') { tst += 5*chckn; }; if (check == 'f' || check == 'F') { tst += 6*chckn; };         
                     if (check == 'g' || check == 'G') { tst += 7*chckn; }; if (check == 'h' || check == 'H') { tst += 8*chckn; }; if (check == 'i' || check == 'I') { tst += 9*chckn; }; if (check == 'j' || check == 'J') { tst += 10*chckn; }; if (check == 'k' || check == 'K') { tst += 11*chckn; }; if (check == 'l' || check == 'L') { tst += 12*chckn; };         
                     if (check == 'm' || check == 'M') { tst += 13*chckn; }; if (check == 'n' || check == 'N') { tst += 14*chckn; }; if (check == 'o' || check == 'O') { tst += 15*chckn; }; if (check == 'p' || check == 'P') { tst += 16*chckn; }; if (check == 'q' || check == 'Q') { tst += 17*chckn; }; if (check == 'r' || check == 'R') { tst += 18*chckn; };         
                     if (check == 's' || check == 'S') { tst += 19*chckn; }; if (check == 't' || check == 'T') { tst += 20*chckn; }; if (check == 'u' || check == 'U') { tst += 21*chckn1; }; if (check == 'v' || check == 'V') { tst += 22*chckn; }; if (check == 'w' || check == 'W') { tst += 23*chckn; }; if (check == 'x' || check == 'X') { tst += 24*chckn; }; 
                     if (check == 'y' || check == 'Y') { tst += 25*chckn; }; if (check == 'z' || check == 'Z') { tst += 26*chckn; };        
                 } else {
                     tst += check*chckn;
                 }
             }
         }
         Hasher(password, runner, runner2, tst);
     }; 
       // maths/hasher
     const Hasher = (password, runner, runner2, tst) => {
         var spc = 0;
         var tstr = tst.toString();
         var tster = '';
         // conditioning and adding hashes
         if (tstr.length > spc) {
             for (let i = 0; i < tstr.length; i++) {
                 spc = spc + 1;
                 // hasher value applyer
                 var test = runner.slice(spc-1, spc);
                 // multipling with runner to to hash up and assign value
                 if (isNaN(runner2)) {
                     tster += tester.toString();
                 }else {
                     var testing = runner2.slice(spc-1, spc)*test;
                     tster += testing.toString();
                 }
                 // input value hashing
                 var tester = tstr.slice(spc-1, spc);
                 tster += tester.toString(); 
             }
         }
         spc = 0;
         password[0] = tster;
         password[1] = runner;
         password[2] = runner2;
         // alert(`pwd = ${password[0]},  main hasher = ${password[1]}, global multi = ${password[2]}`);
     };

    // date validations
    var year = date.getFullYear();
    var yrlen = 150;
    for (let i = 0; i < yrlen; i++) {
        year--;
        var slct = `<option>${year-12}</option>`;
        $(yrid).append(slct);
    }
    var days = 0;
    if (mntid.val() == 'January') { days = 32; }
    if (mntid.val() == 'Febuary') { days = 28; }
    for (let i = 0; i < days; i++) {
       if (i === 0) {
         i = '';
       }
       if (i > 0) {
         slct = `<option>${i}</option>`;
         $(dayid).append(slct);
       }
    }
    
    var pass = false;

    //term and conditions
    $('#gotoTerms').click(()=>{
        if (userName.val() == 'user_name') {
          alert('This username has been taken');
        }else {
            if ($(userName).val() !== '') {
                if (mail.val() !== '') {
                if (pswd.val() !== '' && pswd1.val() !== '') {
                    if (ques.val() && answr.val() !== '') {
                        if ($('#phone').val() !== '') {
                            if (sex.val() !== '') {
                                pass = true;
                            }else {
                                pass = false;
                                $('#error_reg_c').text('Insert sex');
                            }
                        }else {
                            pass = false;
                            $('#error_reg_c').text('Insert your phonenumber');
                        }
                    }else {
                        pass = false
                        $('#error_reg_c').text('Insert question and answer');
                    }
                }else {
                    pass = false;
                    $('#error_reg_c').text('Insert Password');
                }
                }else {
                pass = false;
                $('#error_reg_c').text('Insert Email');
                }
            }else {
                pass = false;
                $('#error_reg_c').text('Insert your username');
            }
            if ($(userName).val() && mail.val() && pswd.val() && pswd1.val() && ques.val() && answr.val() && $('#phone').val() && sex.val() !== '') {
                $('#form-mailv, #form-bg').css('display', 'none');
                $('#tandCond').fadeIn();
            }
        };
    });

    $('#agreeSubmit').click(()=>{
        $('#agreeSubmit').fadeOut();
        getHash(password, pswd1.val());
        var grp = 1; var users = db.users;
        var curnsrs = 0;
        for (let x = 0; x < users.length; x++) {
          if (users[x].group == grp) {
              curnsrs++;
              if (curnsrs == 10000) {
                  grp++;
                  chkn();
                }
            }      
        }
        setTimeout(() => {
            global.page_ld = 'y';
            fetch('https://test-vyral.onrender.com/addUser', {
                method : 'post',
                  body : JSON.stringify({ 
                    user_name : "@"+$(userName).val(), name: $(userName).val(), pwd : password[0], email: $(mail).val(), user_type: "user",
                    DOB: $(yrid).val()+'/'+$(mntid).val()+'/'+$(dayid).val(), sex: $('#sexid').val(), country: $('#lclid').val(), Q: $(ques).val(), A: $(answr).val(), terms: 'agreed',
                    mode: "light", publicity: "public", user_status: "Hi, I am a threader!", blocked_list: [], notifications: [], new_notis: [],
                    group: grp, flow: [], home: [], promotions: [], profile_ads: [], sponsored_ads: [], profile_pic: "none", posts: '', strings: '',
                    followers: [], following: [], waiting_list: [], chats: [], verification: "off", online: "off",
                   
                }),
                headers : {
                  "Content-type" : "application/json; charset=utf-8"
                }
            }).then((response) => {
                return response.json();
            }).then((data) => {          
                fetch('https://test-vyral.onrender.com/addHash', { method: 'post', body: JSON.stringify({ u_id: data.resultId, main_hsh: password[1], glob_multi: password[2] }), headers: { "Content-type" : "application/json; charset=utf-8" } }).then((responce)=>{
                  return responce.json();
                }).then((data2)=>{
                    if (data2) {
                        fetch('https://test-vyral.onrender.com/mailer/welcomeMail', { method: 'post', body: JSON.stringify({ mail: verMail.val(), uname: verUnme.val() }), headers: { "Content-type" : "application/json; charset=utf-8" } }).then((responce)=>{
                            return responce.json();
                        }).then((verd)=>{
                            if (verd == 'sent') {
                                global.page_ld_stt = 'off';
                                $('.opn_tut').click();
                            }
                        });
        
                    }
                });
            });
        }, 100);
    });

    $(`#stat`).text('Journals');
    $('#statnum').text(1);
    $(`#pre`).fadeOut();
    // funcs starts here
    var data = ["tut1", "tut2", "tut3", "tut4", "tut5"];
    $(`#${data[0]}`).fadeIn();
    var right = $(`#nex`);
    var left = $(`#pre`);
    var num = 0;
    
    // check length to get status
    const getStat = (data) => {
        if (data == 0) {
            $(`#stat`).text('Journals');
            $('#statnum').text(1);
            $(`#pre`).css('display', 'none');
            $(`#nex`).fadeIn();
            $('#doneTut').css('display', 'none');
        }
        if (data == 1) {
            $(`#stat`).text('Categories');
            $(`#nex, #pre`).css('display', 'block');
            $('#doneTut').css('display', 'none');
        }
        if (data == 2) {
            $(`#stat`).text('Strings');
            $(`#nex, #pre`).css('display', 'block');
            $('#doneTut').css('display', 'none');
        }
        if (data == 3) {
            $(`#stat`).text('Chats');
            $(`#nex, #pre`).css('display', 'block');
            $('#doneTut').css('display', 'none');
        }
        if (data == 4) {
            $(`#stat`).text('Settings');
            $(`#nex`).css('display', 'none');
            $(`#pre`).fadeIn();
            $('#doneTut').css('display', 'inline');
        }
    };

    right.click(function() {
        $(`.tuts`).css('display', 'none');
        num++;
        if (num >= data.length) {
            num = 0;
        }
        $(`#${data[num]}`).fadeIn();
        $('#statnum').text(num+1);
        getStat(num);
    });
    
    left.click(function() {
        $(`.tuts`).css('display', 'none');
        num--;
        if (num < 0) {
            num = data.img.length-1;
        }
        $(`#${data[num]}`).fadeIn();
        $('#statnum').text(num+1);
        getStat(num);
    });

}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                logs();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
 }
checkDb();