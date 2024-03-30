import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
import { Dark } from "./dark.js";
function video() {

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
        var x = setInterval(function () {
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

    // video body
    const vidEdit = (ind) => {
        return `
        <div class="container-fluid" id="container-vid" style=" display:none;">
            <div class="row">

                <div class="col-md-12 col-xs-12 edtrHead" style="height:35px; position:fixed; z-index:${ind};">
                    <div class="row">
                        <div class="col-md-4 col-xs-4" style="height:100%;">
                            <p style="margin:5px; color:orangered; cursor: pointer;" id="can_edt_vids">Cancel</p>
                        </div>
                        <div class="col-md-4 col-xs-4" style="height:100%;">
                            <p id="fnshEdtVid" style="margin:5px; color:skyblue; cursor: pointer; text-align:center;"> Done </p>
                        </div>
                        <div class="col-md-4 col-xs-4" style="height:100%;"></div>
                    </div>
                </div>

                <!-- view vid -->
                <div class="col-md-12 col-xs-12" style="height:40px;"></div>
                <div class="col-md-3 col-xs-12"></div>
                <div class="col-md-6 col-xs-12 edtrBod" style="height:100%; position:fixed; z-index:${ind - 1};">
                    <br>
                    
                    <span id="inFiltVid" style="margin-top:35px;"></span>
                    
                </div>
                <div class="col-md-3 col-xs-12"></div>

                <!-- open edtr -->
                <div class="col-md-12 col-xs-12" id="openVidHangEd" style="position:fixed; z-index:${ind}; bottom: 0; right: 0; text-align:center;">
                    <div id="opnVidEdtr" style="margin:auto; width:50px; height:50px; border-radius:100%; margin: auto; margin-bottom:10px; cursor: pointer; box-shadow:0px 0px 30px -10px #1a1a1a;">
                        <img src="assets/imgs/edtimg.png" alt="" width="30px" height="30px" style="margin-top: 5px;">
                    </div>
                </div>

                <!-- vid edit container -->
                <div id="EdtVidCon" class="col-md-12 col-xs-12" style="position:fixed; z-index:${ind - 1}; bottom: 0; right: 0; height:160px;display:none;">
                    <div class="row">

                        <div class="col-md-4 col-xs-4" style="height:40px;">
                            <p id="doneEdtVid" style="margin:5px; color:skyblue; cursor: pointer;">Done</p>
                        </div>
                        <div class="col-md-4 col-xs-4" style="height:40px;">
                            <p style="text-align:center; margin:5px; margin-top:10px;">
                                <img src="assets/imgs/dwn.png" alt="" width="30px" height="20px" style="cursor: pointer;" class="ScrlVidHngDwn">
                            </p>
                        </div>
                        <div class="col-md-4 col-xs-4" style="height:40px;"></div>
                        <div class="col-md-3 col-xs-12"></div>
                        <div class="col-md-6 col-xs-12" style="height:240px;">
                            <div class="row">
                                <div class="col-xs-12 col-md-12 clsEdtrHr" style="height:50px;">

                                    <div class="" style="width:20%; height: 100%; float:left;">
                                        <div class="" style="width:25px; height:50px; margin:auto; margin-top:10px;">
                                            <img id="prevFilterVid" src="assets/imgs/backa.png" width="20px" height="25px" alt="" style="cursor: pointer;">
                                        </div>
                                    </div>
                                    <div class="" style="width:60%; height: 100%; float:left;">
                                        <p id="fnameVid" style="text-align:center; color:darkorange; font-size:15px; margin-top:15px;">normal</p>
                                    </div>
                                    <div class="" style="width:20%; height: 100%; float:right;">
                                        <div class="" style="width:25px; height:50px; margin:auto; margin-top:10px;">
                                            <img id="nexFilterVid" src="assets/imgs/backb.png" width="20px" height="25px" alt="" style="cursor: pointer;">
                                        </div>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-xs-12"></div>

                    </div>
                </div>

            </div>

        </div>
        `
    };
    const checkMode = () => {
        // light or dark effects
        if (udata.mode == 'light') {
            $('.edtrHead').css('background-color', 'white');
            $('.edtrHead').css('border-bottom', 'solid 1px #f0f0f0');
            $('.edtrBod').css('background-color', '#f0f0f0');
            $('#opnVidEdtr').css('background-color', '#f9f9f9');
            $('#EdtVidCon').css('background-color', 'white');
            $('.clsEdtrHr').css('border-bottom', 'solid 1px #f0f0f0');
            $('.clsEdtrHr').css('border-top', 'solid 1px #f0f0f0');
        } else {
            $('.edtrHead').css('background-color', '#292929');
            $('.edtrHead').css('border-bottom', 'solid 1px #404040');
            $('.edtrBod').css('background-color', '#333333');
            $('#opnVidEdtr').css('background-color', '#1a1a1a');
            $('#EdtVidCon').css('background-color', '#1a1a1a');
            $('.clsEdtrHr').css('border-bottom', 'solid 1px #333333');
            $('.clsEdtrHr').css('border-top', 'solid 1px #333333');
        }
    };
    $('body').append(vidEdit(global.pop_no + 102));
    checkMode(); Dark();

    // scroll hanger down
    $('.ScrlVidHngDwn').click(() => {
        $('#EdtVidCon').fadeOut();
        $('#openVidHangEd').fadeIn();
    });
    //scroll hanger up
    $('#opnVidEdtr').click(() => {
        $('#openVidHangEd').fadeOut();
        $('#EdtVidCon').fadeIn();
    });

    var curnt = '';

    // cancel editing
    $('#can_edt_vids').click(() => {
        $('.editHangVid, .allVids_aedt').remove();
        $('#postVideoJrnl, #postVideo-add-thr').val('');
        $('#container-vid').css('display', 'none');
        $('#container-one').fadeIn();
    });

    // check value for all and append images/timer
    async function checkValAll(inp, formData) {
        global.bin_t = 'vid'; global.page_ld = 'y';
        var crnt = global.bin_t; global.edt_vids = [];
        const settings = {
            method: 'post',
            body: JSON.stringify({ id: udata._id }),
            headers: { "Content-type" : "application/json; charset=utf-8" }
        }
        try {
            const response = await fetch(`https://test-vyral.onrender.com/mobile/setBinId`, settings);
            const data = await response.json();
            if (inp.length > 0 && crnt) {
                global.vid_hangLen = inp.length;
                const types = { headers: { "content-type": "multipart/form-data" } };
                $.ajax({
                    url: 'https://test-vyral.onrender.com/video/videoUpload',
                    method: 'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        $('#container-body, .edt_jrn_alrt').fadeOut();
                        $('#container-vid').slideDown(200);
                        for (let i = 0; i < response.length; i++) {
                            global.edt_vids[global.edt_vids.length] = { path: `dropvid/${response[i].filename}`, class: '' };
                            displayVids(response[i], i);
                        }
                        var yp = global.addThrNw;
                        if (yp == 'bg') {
                            $('#view-container').fadeOut();
                        }
                        global.page_ld_stt = 'off';
                        //$('#postImage').val('');
                    },
                    error: function (jqXHR, textStatus, errorMessage) {
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
    $('#postVideoJrnl').change(function () {
        if ($('#postVideoJrnl').length > 0 && $('#postVideoJrnl').length < 2) {
            global.vid_hangLen = 0;
            var inp = document.getElementById('postVideoJrnl').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
                formData.append('file', inp[i]);
            }
            curnt = 'Jrnl';
            checkValAll(inp, formData);
        } else {
            if ($('#postVideoJrnl').length > 1) {
                $('#alertText').text('You can only post a maximum of 1 video in a Journal');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
                $('#postVideoJrnl').val('');
            }
        }
    });
    // FOR STRINGS
    $('#postVideoStr').change(function () {
        if ($('#postVideoStr').length > 0 && $('#postVideoStr').length < 2) {
            global.vid_hangLen = 0;
            var inp = document.getElementById('postVideoStr').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
                formData.append('file', inp[i]);
            }
            curnt = 'str-thr';
            checkValAll(inp, formData);
        } else {
            if ($('#postVideoStr').length > 1) {
                $('#alertText').text('You can only post a maximum of 1 video in a thread');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
                $('#postVideoStr').val('');
            }
        }
    });

    // FOR USER AUTHOR
    $('#postVideoUAuJ').change(function () {
        if ($('#postVideoUAuJ').length > 0 && $('#postVideoUAuJ').length < 2) {
            global.vid_hangLen = 0;
            var inp = document.getElementById('postVideoUAuJ').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
                formData.append('file', inp[i]);
            }
            curnt = 'UautJ';
            checkValAll(inp, formData);
        } else {
            if ($('#postVideoUAuJ').length > 1) {
                $('#alertText').text('You can only post a maximum of 1 video in a Journal');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
                $('#postVideoUAuJ').val('');
            }
        }
    });

    // get vids for add-thrds
    $('#postVideo-add-thr').change(function () {
        if ($('#postVideo-add-thr').length > 0 && $('#postVideo-add-thr').length < 2) {
            global.vid_hangLen = 0;
            var inp = document.getElementById('postVideo-add-thr').files;
            var formData = new FormData();
            for (let i = 0; i < inp.length; i++) {
                formData.append('file', inp[i]);
            }
            curnt = 'add-thr';
            checkValAll(inp, formData);
        } else {
            if ($('#postVideo-add-thr').length > 1) {
                $('#alertText').text('You can only post a maximum of 1 video in a thread');
                $('#allAlerts').css('display', 'block');
                $('#alertBody').fadeIn();
                $('#postVideo-add-thr').val('');
            }
        }
    });

    // editor controls
    const punches = (vid, num, punchId) => {

        // img filter functions
        var classes = ["none", "yellow", "purple", "brown", "blue", "reds", "pale", "bandw"];
        var num = 0;

        $('#nexFilterVid').click(() => {
            num++;
            if (num >= classes.length) {
                num = 0;
            }
            $(`#${punchId}`).attr("class", classes[num]);
            var classone = $(`#${punchId}`).attr("class");
            if (classone === "none") {
                $("#fnameVid").text("normal");
            }
            if (classone === "yellow") {
                $("#fnameVid").text("sunflower");
            }
            if (classone === "purple") {
                $("#fnameVid").text("purple");
            }
            if (classone === "brown") {
                $("#fnameVid").text("kano");
            }
            if (classone === "blue") {
                $("#fnameVid").text("bloom");
            }
            if (classone === "reds") {
                $("#fnameVid").text("rome");
            }
            if (classone === "pale") {
                $("#fnameVid").text("Pale");
            }
            if (classone === "bandw") {
                $("#fnameVid").text("Guernica");
            }
        });

        $('#prevFilterVid').click(() => {
            num--;
            if (num < 0) {
                num = classes.length - 1;
            }
            $(`#${punchId}`).attr("class", classes[num]);
            var classone = $(`#${punchId}`).attr("class");
            if (classone === "none") {
                $("#fnameVid").text("normal");
            }
            if (classone === "yellow") {
                $("#fnameVid").text("sunflower");
            }
            if (classone === "purple") {
                $("#fnameVid").text("purple");
            }
            if (classone === "brown") {
                $("#fnameVid").text("kano");
            }
            if (classone === "blue") {
                $("#fnameVid").text("bloom");
            }
            if (classone === "reds") {
                $("#fnameVid").text("rome");
            }
            if (classone === "pale") {
                $("#fnameVid").text("Pale");
            }
            if (classone === "bandw") {
                $("#fnameVid").text("Guernica");
            }
        });

    };

    // assign hanger
    const hangerAss = (data, punchId, posterId, i) => {
        var hangNm = ``;
        if (curnt == 'Jrnl') {
            hangNm = `vidHangerFltrd-jrn${i}`;
            $('#flowHangerFltrd-vid-jrn').append(`
            <div class="col-md-6 col-xs-6 allVids_aedt" style="height:150px; margin-top:5px; margin-bottom:10px;">
            <video id="${hangNm}" class="none" style="width:120px; height:150px; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;"></video>
            </div>
        `);
        }
        if (curnt == 'str-thr') {
            hangNm = `vidHangerFltrd-thr${i}`;
            $('#flowHangerFltrd-vid-str').append(`
            <div class="col-md-6 col-xs-6 allVids_aedt" style="height:150px; margin-top:5px; margin-bottom:10px;">
            <video id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;"></video>
            </div>
        `);
            //$('#flowHangerFltrd-str').append(proto(hangNm));
        }
        if (curnt == 'UautJ') {
            hangNm = `vidHangerFltrd-UautJ${i}`;
            $('#flowHangerFltrd-vid-UautJ').append(`
              <div class="col-md-6 col-xs-6 allVids_aedt" style="height:150px; margin-top:5px; margin-bottom:10px;">
                <video id="${hangNm}" class="none" style="width:120px; height:150px; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;"></video>
              </div>
            `);
        }
        if (curnt == 'add-thr') {
            hangNm = `vidHangerFltrd-addThr${i}`;
            $('#flowHangerFltrd-vid-addThr').append(`
                <div class="col-md-6 col-xs-6 allVids_aedt" style="height:150px; margin-top:5px; margin-bottom:10px;">
                <video id="${hangNm}" class="none" style="width:100%; height:100%; border-radius:5px; box-shadow:0px 0px 20px -10px #1a1a1a;"></video>
                </div>
            `);
        }

        $(`#${hangNm}`).attr('src', $(`#${punchId}`).attr('src'));
    };

    // smart buttons
    const smartBtns = (data, punchId, posterId, i) => {
        $('#doneEdtVid').click(() => {
            $('#EdtVidCon').fadeOut();
            $('#openVidHangEd').fadeIn();
            if (curnt == 'Jrnl') {
                $(`#vidHangerFltrd-jrn${i}`).attr('class', $(`#${punchId}`).attr('class'));
            }
            if (curnt == 'str-thr') {
                $(`#vidHangerFltrd-thr${i}`).attr('class', $(`#${punchId}`).attr('class'));
            }
            if (curnt == 'add-thr') {
                $(`#vidHangerFltrd-addThr${i}`).attr('class', $(`#${punchId}`).attr('class'));
            }
            if (curnt == 'cht') {
                $(`#vidHangerFltrd-cht${i}`).attr('class', $(`#${punchId}`).attr('class'));
            }
            if (curnt == 'prfp') {
                $(`#vidHangerFltrd-prfp${i}`).attr('class', $(`#${punchId}`).attr('class'));
            }
            if (curnt == 'UautJ') {
                $(`#vidHangerFltrd-UautJ${i}`).attr('class', $(`#${punchId}`).attr('class'));
            }
            $('#fnameVid').text('normal');
        });
    };

    // done with filtering and verifying image
    $('#fnshEdtVid').click(() => {
        $('#postVideoJrnl, #postVideo-add-thr').val('');
        $('#container-vid').css('display', 'none');
        /*if (curnt == 'prfp') {
          $('#container-one').fadeIn();
          $('#fileTpeCon-prfp').css('display', 'none');
          $('#scrlimgCon-prfp').fadeIn();
        }*/
        if (curnt == 'Jrnl') {
            $('#container-one').fadeIn();
            $('#fileTpeCon-jrn').css('display', 'none');
            $('#scrlvidCon-jrn').fadeIn();
        }
        if (curnt == 'str-thr') {
            $('#container-one').fadeIn();
            $('#fileTpeCon-str').css('display', 'none');
            $('#scrlvidCon-str').fadeIn();
        }
        if (curnt == 'UautJ') {
            $('#container-one, .write_alrts').fadeIn();
            $('#fileTpeCon-UautJ').css('display', 'none');
            $('#scrlvidCon-UautJ').fadeIn();
        }
        if (curnt == 'add-thr') {
            $('#binTypeChse').css('display', 'none');
            $('#scrlvidCon-addThr').fadeIn();
            $('#container-one, .edt_jrn_alrt').fadeIn();
        }
        /*if (curnt = 'cht') {
          $('.shareOptBod').css('display', 'none');
          $('.imgAlignDiv-cht').slideDown(200);
        }
        $('.edtStrBod').fadeIn();
        $('.mainCloneImgs').remove();*/
        $('.editHangVid').remove();
    });

    const createIds = (data) => {
        var dataname = data.filename.slice(0, 13);
        return {
            punchId: 'punchId_' + dataname,
            posterId: 'posterId_' + dataname
        }
    };
    // ALL VIDEO EDT FUNC
    const displayVids = (vid, num) => {
        const ids = createIds(vid);
        $('#inFiltVid').append(`
                <video id="${ids.punchId}" class="editHangVid none" src="https://test-vyral.onrender.com/dropvid/${vid.filename}" controls style="width:100%;"></video>
            `);
        punches(vid, num, ids.punchId);
        smartBtns(vid, ids.punchId, ids.posterId, num);
        hangerAss(vid, ids.punchId, ids.posterId, num);
    }

}
// assignDb();
const checkDb = () => {
    setTimeout(() => {
        if (db_f == 'y') {
            setTimeout(() => {
                video();
            }, 500);
        } else {
            checkDb();
        }
    }, 100);
}
checkDb();
