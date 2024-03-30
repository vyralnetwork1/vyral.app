import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function image() {

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

    const ConEDit = (ind) => { return `
  <div class="container-fluid" id="container-img" style="display:none;">
      <div class="row">
        <div class="col-md-12 col-xs-12 edtrHead" style="height:35px; position:fixed; z-index:${ind};">
          <div class="row">
            <div class="col-md-4 col-xs-4" style="height:100%;">
              <p id="cenclAllImgs" style="margin:5px; color:orangered; cursor: pointer;">Cancel</p>
            </div>
            <div class="col-md-4 col-xs-4" style="height:100%;">
              <p id="EdtImgRv" style="margin:5px; color:#1a1a1a; cursor: pointer; text-align:center; display:none;"> <img src="assets/imgs/edtimg.png" width="25px" height="25px"> </p>
            </div>
            <div class="col-md-4 col-xs-4" style="height:100%;"></div>
          </div>
        </div>
        <div class="col-md-12 col-xs-12" style="height:40px;"></div>
        <div class="col-md-3 col-xs-12"></div>
        <div class="col-md-6 col-xs-12 edtrBod" style="position:fixed; z-index:${ind-1}; height:100%;">
          <div style="margin:auto; width:100px; margin-top:35px;" id="whatImgReview">
            <br>
            
            <p class="sub_h" style="font-size:13px; margin:5px; text-align:center;"><i>Tap image bellow to edit and review</i></p>
            <img src="assets/imgs/img2.png" width="100%" height="70px">
          </div>
          <span id="inFilterImg"></span>
          
        </div>
        <div class="col-md-3 col-xs-12"></div>
        
        <div class="col-md-12 col-xs-12" id="openImgHangEd" style="position:fixed; z-index:${ind}; bottom: 0; right: 0; text-align:center; display: none;">
          <div id="ScrlImgHngUp" style="margin:auto; width:50px; height:50px; border-radius:100%; margin: auto; margin-bottom:10px; cursor: pointer; box-shadow:0px 0px 30px -10px #1a1a1a;">
            <img src="assets/imgs/up.png" alt="" width="30px" height="20px" style="margin-top: 13px;">
          </div>
        </div>
  
        <div id="ImgHangEdCon">
          <!-- image carousel container -->
          <div class="col-md-12 col-xs-12" id="scrollThrImgDiv" style="position:fixed; z-index:${ind}; bottom: 0; right: 0; height:235px;">
            <div class="row">
              <div class="col-md-4 col-xs-4" style="height:40px;">
                <p class="headings" style="margin:5px; cursor:pointer; font-weight:normal;" id="DoneFiltering">Finish</p>
              </div>
              <div class="col-md-4 col-xs-4" style="height:40px;">
                <p style="text-align:center; margin:5px; margin-top:10px;">
                  <img src="assets/imgs/dwn.png" alt="" width="30px" height="20px" class="ScrlImgHngDwn" style="cursor:pointer;">
                </p>
              </div>
              <div class="col-md-4 col-xs-4" style="height:40px;">
              </div>
              <div class="col-md-12 col-xs-12">
                <div class="imgScrllr" style="height:170px; margin:auto; margin-top:15px; width:100%; border-radius:5px; overflow-x:auto;">
                  <span id="ScrollImgBfEdt"></span>
                </div>
              </div>
            </div>
          </div>
          <!-- image edit container -->
          <div id="EdtImgCon" class="col-md-12 col-xs-12" style="position:fixed; z-index:${ind--}; bottom: 0; right: 0; height:125px; display:none;">
            <div class="row">
              <div class="col-md-4 col-xs-4" style="height:40px;">
                <p id="doneEdtImg" class="sub_h" style="margin:5px; cursor: pointer; font-weight:normal;">Done</p>
              </div>
              <div class="col-md-4 col-xs-4" style="height:40px;">
                <p style="text-align:center; margin:5px; margin-top:10px;">
                  <img src="assets/imgs/dwn.png" alt="" width="30px" height="20px" style="cursor: pointer;" class="ScrlImgHngDwn">
                </p>
              </div>
              <div class="col-md-4 col-xs-4" style="height:40px;"></div>
              <div class="col-md-3 col-xs-12"></div>
              <div class="col-md-6 col-xs-12" style="height:100px;">
                <div class="row">
                  <div class="col-xs-12 col-md-12 clsEdtrHr" style="height:50px;">
  
                      <div class="" style="width:20%; height: 100%; float:left;">
                        <div class="" style="width:25px; height:50px; margin:auto; margin-top:10px;">
                          <img id="prevFilter"  src="assets/imgs/backa.png" width="20px" height="25px" alt="" style="cursor: pointer;">
                        </div>
                      </div>
                      <div class="" style="width:60%; height: 100%; float:left;">
                        <p id="fname" style="text-align:center; color:darkorange; font-size:15px; margin-top:15px;">normal</p>
                      </div>
                      <div class="" style="width:20%; height: 100%; float:right;">
                        <div class="" style="width:25px; height:50px; margin:auto; margin-top:10px;">
                          <img id="nexFilter"  src="assets/imgs/backb.png" width="20px" height="25px" alt="" style="cursor: pointer;">
                        </div>
                      </div>
               
                  </div>
                  <div class="col-xs-12 col-md-12" style="height:0px; display:none;">
                    <!--<span style="margin:10px; color:grey; font-size:13px; float:left;"><img src="assets/imgs/brit.png" alt="" width="20px" height="25px"> opacity </span>
                    <div class="" style="width:100%; height:20px; float:left; margin-top:10px;">
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left;" id="cbrit1">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="brit1"></div>
                      </div>
                      <div class="" style="width:24%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left;" id="cbrit2">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="brit2"></div>
                      </div>
                      <div class="" style="width:24%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left" id="cbrit3">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="brit3"></div>
                      </div>
                      <div class="" style="width:24%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left;" id="cbrit4">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="brit4"></div>
                      </div>
                      <div class="" style="width:23%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; float:right;" id="cbrit5">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:block;" id="brit5"></div>
                      </div>
                    </div>-->
                    <!-- <span style="margin:10px; color:grey; font-size:13px; margin-top:10px; float:left;"><img src="assets/imgs/satu.png" alt="" width="25px" height="20px"> grey-scale </span>
                    <div class="" style="width:100%; height:20px; float:left; margin-top:10px;">
                      <div class="" style="width:1%; height:15px; float:left;" id="csat1">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:block;" id="sat1"></div>
                      </div>
                      <div class="" style="width:24%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left;" id="csat2">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="sat2"></div>
                      </div>
                      <div class="" style="width:24%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left" id="csat3">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="sat3"></div>
                      </div>
                      <div class="" style="width:24%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:left;" id="csat4">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="sat4"></div>
                      </div>
                      <div class="" style="width:23%; height:1px; background-color:#dddddd; float:left; margin-top:7px;"></div>
                      <div class="" style="width:1%; height:15px; background-color:#1a1a1a; float:right;" id="csat5">
                        <div class="" style="width:10px; height:20px; background-color:#f0f0f0; border:solid 1px #dddddd; border-radius:3px; display:none;" id="sat5"></div>
                      </div>
                    </div> -->
                  </div>
                </div>
                
              </div>
              <div class="col-md-3 col-xs-12"></div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
      `};
      const checkMode = () => {
        // light or dark effects
        if (udata.mode == 'light') {
            $('.edtrHead').css('background-color', 'white');
            $('.edtrHead').css('border-bottom', 'solid 1px #f0f0f0');
            $('.edtrBod').css('background-color', '#f0f0f0');
            $('#ScrlImgHngUp').css('background-color','#f9f9f9');
            $('#scrollThrImgDiv, #EdtImgCon').css('background-color', '#f9f9f9');
            $('.imgScrllr').css('background-color','white');
            $('.clsEdtrHr').css('border-bottom','solid 1px #f0f0f0');
            $('.clsEdtrHr').css('border-top','solid 1px #f0f0f0');
          } else {
            $('.edtrHead').css('background-color', '#292929');
            $('.edtrHead').css('border-bottom', 'solid 1px #404040');
            $('.edtrBod').css('background-color', '#333333');
            $('#ScrlImgHngUp').css('background-color','#1a1a1a');
            $('#scrollThrImgDiv, #EdtImgCon').css('background-color', '#292929');
            $('.imgScrllr').css('background-color','#1a1a1a');
            $('.clsEdtrHr').css('border-bottom','solid 1px #333333');
            $('.clsEdtrHr').css('border-top','solid 1px #333333');
          }
      };
      $('body').append(ConEDit(global.pop_no+102));
      checkMode(); Dark();
  
      var testar = new Array();
      
      // open input img
      $('#ClickImgStrIn').click(()=>{
        $('#postStrImage').click();
        $('#SendGoStrImgs').click();   
      });
  
      // scroll hanger down
      $('.ScrlImgHngDwn').click(()=>{
        $('#ImgHangEdCon').fadeOut();
        $('#openImgHangEd').fadeIn();
      });
      //scroll hanger up
      $('#ScrlImgHngUp').click(()=>{
        $('#openImgHangEd').fadeOut();
        $('#ImgHangEdCon').fadeIn();
      });
      // open editor div
      $('#EdtImgRv').click(()=>{
        $('#openImgHangEd, #scrollThrImgDiv, #EdtImgRv').fadeOut();
        $('#ImgHangEdCon, #EdtImgCon').fadeIn();
      });
  
      
      // current poster diff
      var curnt = 'None';
      // cancel
      $('#cenclAllImgs').click(()=>{
        $('.mainCloneImgs, .allImgs_app').remove(); $('.imgRevewer').remove();
        $('#shareImgCht, #postEdtStrImage, #postStrImage, #postImage, #autBckImg').val('');
        //$($('input').attr('type', 'file')).val('');
        $('#container-img').css('display', 'none');
        $('#container-body').fadeIn();
        global.img_hangLen = 0;
        /*if (curnt == 'prfp') {
          $('#fileTpeCon-prfp').css('display', 'block');
          $('#scrlimgCon-prfp').fadeIn();
        }
        if (curnt == 'aut') {
          $('#chseFltp').css('display', 'block');
          $('#scrlimgCon-aut').fadeIn();
        }
        if (curnt == 'Jrnl') {
          $('#fileTpeCon-jrn').css('display', 'block');
          $('#scrlimgCon-jrn').fadeIn();
        }
        if (curnt == 'str-thr') {
          $('#fileTpeCon-str, #reqStrInf').css('display', 'block');
          $('#scrlimgCon-str').fadeIn();
        }
        if (curnt == 'add-thr') {
          $('.edt_jrn_alrt').fadeIn();
          $('#binTypeChse').css('display', 'block');
          $('#scrlimgCon-addThr').slideUp(100);
        }
        if (curnt = 'cht') {
          $('.shareOptBod').css('display', 'none');
          $('.imgAlignDiv-cht').slideDown(200);
        }*/
      });
  
      // check value for all and append images/timer
      async function checkValAll(inp, formData) {
        global.bin_t = 'img'; global.page_ld = 'y';
        var crnt = global.bin_t; global.edt_imgs = [];
        var settings = { method: 'post', body: JSON.stringify({ id: udata._id }), headers: { "Content-type" : "application/json; charset=utf-8" } }
        try {
            const response = await fetch(`https://test-vyral.onrender.com/mobile/setBinId`, settings);
            const data = await response.json();
            if (inp.length > 0 && crnt) {
              global.img_hangLen = inp.length;
              const types = { headers: { "content-type": "multipart/form-data" } };
              $.ajax({
                url: 'https://test-vyral.onrender.com/mobile/fileUploadImg',
                method: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  $('#container-body, #settings-alrt, #settings-con').fadeOut();
                  $('#container-img').slideDown(200);
                  for (let i = 0; i < response.length; i++) {
                    global.edt_imgs[global.edt_imgs.length] = {path: `dropimg/${response[i].filename}`, class: ''};
                    displayImgs(response[i], i);
                  }
                  var yp = global.addThrNw;
                  if (yp == 'bg') {
                    $('#view-container').fadeOut();
                  }
                  global.page_ld_stt = 'off';
                  //$('#postImage').val('');
                },
                error: function(jqXHR, textStatus, errorMessage) {
                  $('#alertText').text('Error uploading: ' + errorMessage);
                  $('#allAlerts').css('display', 'block');
                  $('#alertBody').fadeIn();
                  global.page_ld_stt = 'off';
                }
              });
              return false;
            }
        } catch (error) {
            alert(error);
        }
      };
  
  
      /**
       * EXTRACT/PUSH INPUT CONTNTS TO FUNCS
       */
      // FOR JOURNALS
      $('#postImage').change(function(){
        if ($('#postImage').length > 0 && $('#postImage').length < 11) {
            global.img_hangLen = 0;
            var inp = document.getElementById('postImage').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
              formData.append('file', inp[i]);
            }
            curnt = 'Jrnl';
            checkValAll(inp, formData);
        }else {
          if ($('#postImage').length > 10) {
            $('#alertText').text('You can only post a maximum of 10 images in a Journal');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#postImage').val('');
          }
        }
      });
      // FOR authorJOURNALS
      $('#postImageAut').change(function(){
        if ($('#postImageAut').length > 0 && $('#postImageAut').length < 11) {
            global.img_hangLen = 0;
            var inp = document.getElementById('postImageAut').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
              formData.append('file', inp[i]);
            }
            curnt = 'aut';
            checkValAll(inp, formData);
        }else {
          if ($('#postImageAut').length > 10) {
            $('#alertText').text('You can only post a maximum of 10 images in a Journal');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#postImageAut').val('');
          }
        }
      });
      // for tops
      $('#postImageTop').change(function(){
        if ($('#postImageTop').length > 0 && $('#postImageTop').length < 11) {
            global.img_hangLen = 0;
            var inp = document.getElementById('postImageTop').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
              formData.append('file', inp[i]);
            }
            curnt = 'autops';
            checkValAll(inp, formData);
        }else {
          if ($('#postImageTop').length > 10) {
            $('#alertText').text('You can only post a maximum of 10 images in a Journal');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#postImageTop').val('');
          }
        }
      });
      // for strings
      $('#postStrImage').change(function(){
        if ($('#postStrImage').length > 0 && $('#postStrImage').length < 11) {
            global.img_hangLen = 0;
            var inp = document.getElementById('postStrImage').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
              formData.append('file', inp[i]);
            }
            curnt = 'str-thr';
            checkValAll(inp, formData);
        }else {
          if ($('#postStrImage').length > 10) {
            $('#alertText').text('You can only post a maximum of 10 images in a thread');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#postStrImage').val('');
          }
        }
      });
      // FOR PROF-PIC
      $('#profpicImageIn').change(function(){
        if ($('#profpicImageIn').length > 0 && $('#profpicImageIn').length < 2) {
            global.img_hangLen = 0;
            var inp = document.getElementById('profpicImageIn').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
              formData.append('file', inp[i]);
            }
            curnt = 'prfp';
            checkValAll(inp, formData);
        }else {
          if ($('#profpicImageIn').length > 1) {
            $('#alertText').text('Multiple images cannot be applied as a profile picture');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#profpicImageIn').val('');
          }
        }
      });
      // for user author
      $('#postImageUAu').change(function(){
        if ($('#postImageUAu').length > 0 && $('#postImageUAu').length < 2) {
          global.img_hangLen = 0;
          var inp = document.getElementById('postImageUAu').files;
          var formData = new FormData();
          for (let i = 0; i < inp.length; i++) {
            formData.append('file', inp[i]);
          }
          curnt = 'Uaut';
          checkValAll(inp, formData);
        }else {
          if ($('#postImageUAu').length > 1) {
            $('#alertText').text('You can only post one cover for your book');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#postImageUAu').val('');
          }
        }
      });
      $('#postImageUAuJ').change(function(){
        if ($('#postImageUAuJ').length > 0 && $('#postImageUAuJ').length < 11) {
          global.img_hangLen = 0;
          var inp = document.getElementById('postImageUAuJ').files;
          var formData = new FormData();
          for (let i = 0; i < inp.length; i++) {
            formData.append('file', inp[i]);
          }
          curnt = 'UautJ';
          checkValAll(inp, formData);
        }else {
          if ($('#postImageUAuJ').length > 10) {
            $('#alertText').text('You can only upload upton 10 images per journal');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#postImageUAuJ').val('');
          }
        }
      });
      // aut background
      $('#autBckImg').change(function(){
        if ($('#autBckImg').length > 0 && $('#autBckImg').length < 2) {
            global.img_hangLen = 0;
            var inp = document.getElementById('autBckImg').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
              formData.append('file', inp[i]);
            }
            curnt = 'abi';
            checkValAll(inp, formData);
        }else {
          if ($('#autBckImg').length > 1) {
            $('#alertText').text('Multiple images cannot be applied as a profile picture');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#autBckImg').val('');
          }
        }
      });
      
      // add thread to exstin str
    $('#postEdtStrImage').change(function(){
      if ($('#postEdtStrImage').length > 0 && $('#postEdtStrImage').length < 11) {
          global.img_hangLen = 0;
          var inp = document.getElementById('postEdtStrImage').files;
          var formData = new FormData();
          for (let i = 0; i < inp.length; i++) {
            formData.append('file', inp[i]);
          }
          //('going somewhere');
          curnt = 'add-thr';
          checkValAll(inp, formData);
      } else {
        if ($('#postEdtStrImage').length > 10) {
          $('#alertText').text('You can only apply not more than ten images to a thread');
          $('#allAlerts').css('display', 'block');
          $('#alertBody').fadeIn();
          $('#postEdtStrImage').val('');
        }
      }
    });

      // for strings
      $('#shareImgCht').change(function(){
        console.log('applied');
        if ($('#shareImgCht').length > 0 && $('#shareImgCht').length < 11) {
          global.img_hangLen = 0;
          var inp = document.getElementById('shareImgCht').files;
          var formData = new FormData();
          for (let i = 0; i < inp.length; i++) {
            formData.append('file', inp[i]);
          }
          curnt = 'cht';
          checkValAll(inp, formData);
        }else {
          if ($('#shareImgCht').length > 10) {
            $('#alertText').text('You can only share a maximum of 10 images at a time');
            $('#allAlerts').css('display', 'block');
            $('#alertBody').fadeIn();
            $('#shareImgCht').val('');
          }
        }
      });

        const InFilter = (data, posterId) => {
          return `
          <div id="filterimage" class="imgRevewer" style="width:100%; margin-top:10px;">
            <img id="${posterId}" class="none" src="" alt="" width="100%" height="100%">
          </div>
          `
        };
  
      const ImgCon = (data, ids) => { return `
        <div class="mainCloneImgs" style="width:150px; height:150px; float:left; margin-top:10px; margin-bottom:10px; margin-left:10px; cursor:pointer;">
          <img src="https://test-vyral.onrender.com/dropimg/${data.filename}" id="${ids.punchId}" class="" alt="" width="150px" height="145px" style="border-radius:5px; box-shadow:0px 0px 20px -10px black;">
        </div>
      ` };
  
      // punch image
      const punchImg = (data, punchId, posterId) => {
        const punchBtn = $(`#${punchId}`);
        $(punchBtn).click(()=>{
          $('#whatImgReview').css('display', 'none');
          $('.imgRevewer').remove();
          $('#EdtImgRv').fadeIn();
          $('#inFilterImg').after(InFilter(data, posterId));
          $(`#${posterId}`).attr('src', `https://test-vyral.onrender.com/dropimg/${data.filename}`);
          $(`#${posterId}`).attr('class', $(`#${punchId}`).attr('class'));
          // done with editing  
          // img filter functions
          var classes = ["none", "yellow", "purple", "brown", "blue", "reds", "pale", "bandw"];
          var num = 0;
  
          $('#nexFilter').click(()=>{
              num++;
              if (num >= classes.length) {
                  num = 0;
              }
              $(`#${posterId}`).attr("class", classes[num]);
              var classone = $(`#${posterId}`).attr("class");
              if (classone == "none") {
                  $("#fname").text("normal");
              }
              if (classone == "yellow") {
                  $("#fname").text("sunflower");
              }
              if (classone == "purple") {
                  $("#fname").text("purple");
              }
              if (classone == "brown") {
                  $("#fname").text("kano");
              }
              if (classone == "blue") {
                  $("#fname").text("bloom");
              }
              if (classone == "reds") {
                  $("#fname").text("rome");
              }
              if (classone == "pale") {
                  $("#fname").text("Pale");
              }
              if (classone == "bandw") {
                  $("#fname").text("Guernica");
              }
          });
  
          $('#prevFilter').click(()=>{
              num--;
              if (num < 0) {
                  num = classes.length-1;
              }
              $(`#${posterId}`).attr("class", classes[num]);
              var classone = $(`#${posterId}`).attr("class");
              if (classone == "none") {
                  $("#fname").text("normal");
              }
              if (classone == "yellow") {
                  $("#fname").text("sunflower");
              }
              if (classone == "purple") {
                  $("#fname").text("purple");
              }
              if (classone == "brown") {
                  $("#fname").text("kano");
              }
              if (classone == "blue") {
                  $("#fname").text("bloom");
              }
              if (classone == "reds") {
                  $("#fname").text("rome");
              }
              if (classone == "pale") {
                  $("#fname").text("Pale");
              }
              if (classone == "bandw") {
                  $("#fname").text("Guernica");
              }
          });
        });
      };
      
      // assign hanger
      const hangerAss = (data, punchId, posterId, i) => {
        var hangNm = ``;
        if (curnt == 'Jrnl') {
          hangNm = `imgHangerFltrd-jrn${i}`;
          $('#flowHangerFltrd-jrn').append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
          `);
        }
        if (curnt == 'aut') {
          hangNm = `imgHangerFltrd-aut${i}`;
          $('#flowHangerFltrd-aut').append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
          `);
          //$('#flowHangerFltrd-str').append(proto(hangNm));
        }
        if (curnt == 'autops') {
          hangNm = `imgHangerFltrd-autops${i}`;
          $('#flowHangerFltrd-autops').append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
          `);
        }
        if (curnt == 'str-thr') {
          hangNm = `imgHangerFltrd-thr${i}`;
          $('#flowHangerFltrd-str').append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
          `);
          //$('#flowHangerFltrd-str').append(proto(hangNm));
        }
        if (curnt == 'add-thr') {
          hangNm = `imgHangerFltrd-add-thr${i}`;
          $('#flowHangerFltrd-addThr').append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
          `);
          //$('#flowHangerFltrd-str').append(proto(hangNm));
        }
        if (curnt == 'cht') {
          var flwId = global.shr_theId;
          hangNm = `imgHangerFltrd-cht${i}`;
          $(`#${flwId}`).append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
            `);
            $(`#${hangNm}`).attr('src', $(`#${punchId}`).attr('src'));
        }
        if (curnt == 'prfp') {
          hangNm = `imgHangerFltrd-prfp${i}`;
          $('#flowHangerFltrd-prfp').append(`
            <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
              <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
            </div>
          `);
          }
          if (curnt == 'abi') {
            hangNm = `imgHangerFltrd-abi`;
            $('#flowHangerFltrd-autBI').append(`
              <div class="allImgs_app" style="width:60%; margin:auto; margin-top:5px; margin-bottom:10px;">
                <img id="${hangNm}" class="none abimgss" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
              </div>
            `);
            //$('#flowHangerFltrd-str').append(proto(hangNm));
          }
          if (curnt == 'Uaut') {
            var nwI = $(`#${punchId}`).attr('src');
            uaC = $(`#${posterId}`).attr('class');
            //hangNm = `imgHangerFltrd-UAut${i}`;
            $('#upplddImg-bookCvr').attr('src', `${nwI}`);
            //$('#flowHangerFltrd-str').append(proto(hangNm));
          }
          if (curnt == 'UautJ') {
            hangNm = `imgHangerFltrd-UautJ${i}`;
            $('#flowHangerFltrd-UautJ').append(`
              <div class="col-md-6 col-xs-6 allImgs_app" style="height:150px; margin-top:5px; margin-bottom:10px;">
                <img id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;">
              </div>
            `);
          }
          $(`#${hangNm}`).attr('src', $(`#${punchId}`).attr('src'));
      };
      
      // smart buttons
      const smartBtns = (data, punchId, posterId, i) => {
        $('#doneEdtImg').click(()=>{
          $('#EdtImgCon').fadeOut();
          $('#scrollThrImgDiv, #EdtImgRv').fadeIn();
          var poster = $(`#${posterId}`).attr('class');
          $(`#${punchId}`).attr('class', poster);
          if (curnt == 'Jrnl') {
            $(`#imgHangerFltrd-jrn${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'aut') {
            $(`#imgHangerFltrd-aut${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'autops') {
            $(`#imgHangerFltrd-autops${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'str-thr') {
            $(`#imgHangerFltrd-thr${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'cht') {
            $(`#imgHangerFltrd-cht${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'prfp') {
            $(`#imgHangerFltrd-prfp${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'abi') {
            $(`#imgHangerFltrd-abi`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'add-thr') {
            $(`#imgHangerFltrd-add-thr${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          if (curnt == 'Uaut') {
            uaC = $(`#${posterId}`).attr('class');
          }
          if (curnt == 'UautJ') {
            $(`#imgHangerFltrd-UautJ${i}`).attr('class', $(`#${posterId}`).attr('class'));
          }
          $('#fname').text('normal');
        });
      };
      
    // done with filtering and verifying image
    var uaC = '';
    $('#DoneFiltering').click(()=>{
        $('#shareImgCht, #postEdtStrImage, #postStrImage, #postImage, #autBckImg').val('');
        $('#container-img').css('display', 'none');
        $('.imgRevewer').remove();
        if (curnt == 'prfp') {
            $('#edtPrfP').fadeIn();
            $('#fileTpeCon-prfp').css('display', 'none');
            $('#scrlimgCon-prfp, #settings-alrt').fadeIn();
        }else {
            if (curnt == 'aut') {
              $('#container-body, .edt_jrn_alrt').fadeIn();
              $('#chseFltp').css('display', 'none');
              $('#scrlimgCon-aut').fadeIn();
            }
            if (curnt == 'autops') {
              $('#container-body, .edt_jrn_alrt').fadeIn();
              $('#chseFltp-top').css('display', 'none');
              $('#scrlimgCon-top').fadeIn();
            }
            if (curnt == 'Jrnl') {
              $('#container-body, .edt_jrn_alrt').fadeIn();
              $('#fileTpeCon-jrn').css('display', 'none');
              $('#scrlimgCon-jrn').fadeIn();
            }
            if (curnt == 'str-thr') {
              $('#container-body, .edt_jrn_alrt').fadeIn();
              $('#fileTpeCon-str, #reqStrInf').css('display', 'none');
              $('#scrlimgCon-str').fadeIn();
            }
            if (curnt == 'abi') {
              $('#opnChngABImg').css('display', 'none');
              $('#remABImg, #applyAutBI').fadeIn();
              $('#settings-alrt').fadeIn();
            }
            if (curnt == 'add-thr') {
              $('#binTypeChse').css('display', 'none');
              $('#scrlimgCon-addThr').slideDown(200);
              $('#container-body, .edt_jrn_alrt').fadeIn();
            }
            if (curnt == 'cht') {
              $('#container-body, .edt_jrn_alrt').fadeIn();
              //$('.shareOptBod').css('display', 'none');
              $('.imgAlignDiv-cht').slideDown(200);
            }
            if (curnt == 'Uaut') {
              $('#container-one, .edt_jrn_alrt, .write_alrts').fadeIn();
              $('#upldimg-bookCvr').css('display', 'none');
              $('#upplddImg-bookCvr, #dlt-uplddBkCvr').fadeIn();
              $('#upplddImg-bookCvr').attr('class', `${uaC}`);
            }
            if (curnt == 'UautJ') {
              $('#container-one, .edt_jrn_alrt, .write_alrts').fadeIn();
              $('#fileTpeCon-UautJ').css('display', 'none');
              $('#scrlimgCon-UautJ').fadeIn();
            }
        }
        $('.edtStrBod').fadeIn();
        $('.mainCloneImgs').remove();
    });
  
      const createIds = (data) => {
        var dataname = data.filename.slice(0, 13);
        return {
          punchId: 'punchId_' + dataname,
          posterId: 'posterId_' + dataname
        }
      };
      
      const displayImgs = (data, i) => {
        const ids = createIds(data);
        $('#ScrollImgBfEdt').append(ImgCon(data, ids));
        punchImg(data, ids.punchId, ids.posterId);
        smartBtns(data, ids.punchId, ids.posterId, i);
        hangerAss(data, ids.punchId, ids.posterId, i);
      };
    
}
// assignDb();
const checkDb = () => {
  setTimeout(() => {
    if (db_f == 'y') {
      setTimeout(() => {
        image();
      }, 500);
    } else {
        checkDb();
    }
  }, 1);
}
checkDb();
