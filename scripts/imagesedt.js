import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function editor() {

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
    
    $('#cbrit1').click(()=>{
        $('#brit1').css("display","block")
        $('#cbrit1').css("background-color","")
        $('#brit2, #brit3, #brit4, #brit5').css("display","none")
        $('#cbrit2, #cbrit3, #cbrit4, #cbrit5').css("background-color","#1a1a1a")
        $('#posterimage').css('opacity', '0.5');
        $('#filterimage').css('opacity', '0.6');
      });
      $('#cbrit2').click(()=>{
        $('#brit2').css("display","block")
        $('#cbrit2').css("background-color","")
        $('#brit1, #brit3, #brit4, #brit5').css("display","none")
        $('#cbrit1, #cbrit3, #cbrit4, #cbrit5').css("background-color","#1a1a1a")
        $('#posterimage').css('opacity', '0.6');
        $('#filterimage').css('opacity', '0.7');
      });
      $('#cbrit3').click(()=>{
        $('#brit3').css("display","block")
        $('#cbrit3').css("background-color","")
        $('#brit1, #brit2, #brit4, #brit5').css("display","none")
        $('#cbrit1, #cbrit2, #cbrit4, #cbrit5').css("background-color","#1a1a1a")
        $('#posterimage').css('opacity', '0.7');
        $('#filterimage').css('opacity', '0.8');
      });
      $('#cbrit4').click(()=>{
        $('#brit4').css("display","block")
        $('#cbrit4').css("background-color","")
        $('#brit1, #brit2, #brit3, #brit5').css("display","none")
        $('#cbrit1, #cbrit2, #cbrit3, #cbrit5').css("background-color","#1a1a1a")
        $('#posterimage').css('opacity', '0.8');
        $('#filterimage').css('opacity', '0.9');
      });
      $('#cbrit5').click(()=>{
        $('#brit5').css("display","block")
        $('#cbrit5').css("background-color","")
        $('#brit1, #brit2, #brit3, #brit4').css("display","none")
        $('#cbrit1, #cbrit2, #cbrit3, #cbrit4').css("background-color","#1a1a1a")
        $('#posterimage').css('opacity', '0.9');
        $('#filterimage').css('opacity', '1.0');
      });
    
}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                editor();
            }, 500);
        } else {
            checkDb();
        }
      }, 1);
}
checkDb();
