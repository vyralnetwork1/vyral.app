import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
// smart value
$('#u_name_in').on('input', function(key){
  var value = $(this).val();
  $(this).val(value.replace(/ /g, '_'));
});
function fpass() {

    var allApps = JSON.parse(localStorage.getItem("app"));
    var app = global.app_store;

    // com alert
    const Alerts = (comp) => {
        $('.alert_p').remove();
        $('#drop_fpass_Comp').append(`<p class="alert_p" style="text-align: center; color:orangered; font-size: 13px; margin: 3px; display:none;">${comp}</p>`);
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

    if (app.page == 'forgot-password') {
        if (global.fp_user == '') {
            $('.opn_log').click();
        }else {
            getInfos();
        }
    }
   
    // globe status
    $('#globeStat').text('You have forgotten your password we see... Well, let\'s get you a new one, shall we?');

    // get infos
    var info = '';
    const getInfos = () => {
        info = db.users.find(i => i.user_name == global.fp_user);
        $('#questFGPqa').text(info.Q);
    };
    const checkFlag = () => {
        if (global.fp_flag == 'y') {
            getInfos();
        } else {
            setTimeout(() => {
                checkFlag();
            }, 1);
        }
    }
    checkFlag();

    // Q/A
    $('#subQst').click(()=>{
        var ans = $('#inAnswer');
        // q/a verification
        var data = 'false';
        if (info.A == ans.val()) {
            data = 'true';
        } else {
            data = 'false';
        }
        if (data == 'true') {
            $('#stepOne, #alertPar').css('display', 'none');
            $('#stepTwo').fadeIn();
        }else {
            var comp = 'The answer is incorrect'; 
            Alerts(comp);
        };
    });
    
    // send verification code
    var ranSub = false;
    $('#sendVer, #resendVer').click(()=>{
        // random value
        $('#alertPar').css('display', 'none');
        ranSub = true;
        var email = info.email;
        console.log('send mail');
        // Set && send the date we're counting down to
        $('#tElapse, #resendVer').css('display', 'none');
        var pData = {
            section: 'forgot-password',
            type: 'ver_mail',
            mail: email
        };
        postData(pData);
        const checkMail = () => {
            var targetDate = new Date();
            var seconds = targetDate.getMinutes();
            targetDate.setMinutes(targetDate.getMinutes() + 2);
            var countDownDate = targetDate.getTime();
            var x = setInterval(function() {
                $('#sendVer').css('display', 'none');
                $('#verTimerFGP, #subCodeFGP').css('display', 'inline');
    
                // Get today's date and time
                var now = new Date().getTime();
    
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                $('#verTimerFGP').text(`${minutes}:${seconds}`);
                if (distance < 0) {
                    ranSub = false;
                    $('#sendVer, #verTimerFGP, #subCodeFGP').css('display', 'none');
                    $('#tElapse, #resendVer').css('display', 'inline');
                    clearInterval(x);
                }
            }, 1000);
        }
        checkMail();
    });
    // submit code
    $('#subCodeFGP').click(()=>{
        if (ranSub == true) {
            var codeIn = $('#codeIn'); var glb = global.fp_verC;
            if (codeIn.val() == glb) {
                global.fp_codeV = true;
                if (global.fp_codeV == true) {
                    checkRan();
                }
            }else {
                var comp = 'Incorrect verification code.';
                Alerts(comp);
            }
        }else {
            var comp = 'Resend code. Your time has elapsed';
            Alerts(comp);
        }
    });

    const checkRan = () => {
        if (global.fp_codeV == true) {
            $('#stepOne').css('display', 'none');
            $('#stepTwo').css('display', 'none');
            $('#stepThr').css('display', 'block');
            $('#globeStat').text('You have successfully verified your account.');
            $('#curStatus').attr('src', 'assets/imgs/locked.png');
        }else {
            $('#stepOne').css('display', 'none');
            $('#stepThr').css('display', 'none');
            $('#stepTwo').css('display', 'block');
            $('#globeStat').text('You have forgotten your password i see... Well, let\'s get you a new one shall we?');
            $('#curStatus').attr('src', 'assets/imgs/lock.png');
        }
    };

    // pd confirmation and push
    $('#passTwo').keyup(function() {
        if ($('#passTwo').val() === $('#passOne').val()) {                    
          $('#passTwo').css('border-bottom', 'solid 1px orange');
          $('#submitPwd').fadeIn();
        } else {
          $('#passTwo').css('border-bottom', 'solid 1px red');
          $('#submitPwd').fadeOut();
        }
    })
    // push
    $('#submitPwd').click(function() {
        var pswd1 = $('#passTwo');
        getHash(password, pswd1.val());
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
              // update pwd
              updatePwd();
              // alert(`pwd = ${password[0]},  main hasher = ${password[1]}, global multi = ${password[2]}`);
    };

    const updatePwd = () => {
        const pwd = password[0];
        const gen = password[1];
        const glb = password[2];
        var pData = {
            section: 'forgot-password',
            type: 'change_pwd',
            pass: {pwd: pwd, gen: gen, glb: glb, user: info._id}
        };
        postData(pData);
    };

}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                fpass();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
 }
checkDb();