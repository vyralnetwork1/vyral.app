import { global, declare, refreshGlob, updateGlobe } from "./global.js";
import { changeP, childP } from "./nav.js";
import { db, db_f, assignDb, postData } from "./socket.js";
function Star() {
    
    const Bodies = () => {
        return `
            
      <!-- MAIN PAGE BODY -->
      <div class="col-xs-12" id="allCartNewsFlowBod" style="margin-top: 75px;">
          
          <!-- main body -->
          <div class="row" id="mainFLwCon">

              <div id="forJrnMain" class="col-xs-12" style="">
                  <br>

                  <div id="home_cat_title_con" style="width: 100%; margin-top:10px; margin-bottom:5px; height: 35px; display: none;">
                    <p style="font-size:20px; margin:0px; padding:5px; float:left;" class="sub_h" id="home_cat_title"></p> 
                    <button style="color: none; border: none; background-color: transparent; border-radius: 15px; margin: 3px; float: right;" class="btn btn-default sub_hs rte_btn clearfix visible-xs" id="cats_bkShlfs">
                      <span style="margin: 3px; font-weight: normal;"> <img src="assets/imgs/bread.png" alt="" width="13px" height="13px" style="margin: 1.5px;"> books </span>
                    </button>
                  </div>
                  <div class="noneExst" id="noJsCon" style="width:100%; border-radius: 5px; display:none; margin-bottom:5px; margin-top:10px;">
                      <p class="sub_h" style="padding: 7.5px; text-align: center; font-size: 13px; margin:0px;">Nothing to see here!</p>
                      <div class="nonExplr" style="margin:auto; border-radius:15px; width: 100px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/exp.png" alt="" width="15px" height="15px"> explore </p> </div>
                      <br>    
                  </div>

                    <div id="all_books_l_c" class="xs_sliderC" style="width: 100%; height: 350px; margin-bottom:10px; display:none;">
                        <div style="width: 100%; height: 30px;">
                            <p class="sub_h" style="margin: 0px; padding:5px; font-size: 12.5px;" id="all_bks_hms">  </p>
                        </div>
                        <div class="usrAutCats" style="width:96%; margin:auto; height: 310px; border-radius: 10px; overflow-y: auto;">
                            <div id="allhBLSlide" style="height: 100%; width: 100%;">
                                <span id="drpAllhExBKSL"></span>
                            </div>
                        </div>
                    </div>
                  
                    <div class="row">
                        <span id="dropbox-jrn-main"></span>
                    </div>

                  <br>
                  <br>
                  <br>
              </div>

              <div class="col-xs-12" id="forStrMain" style="display:none;">
                  <br>
                  <!-- string/thr flow -->
                    <div class="row">
                      <div class="col-xs-12" style="height:45px; display:none;" id="strThrMainNav">
                        <!-- info flow area -->
                        <div style="width:100%; height:40px;">
                         <div style="width:50%; float:left; height:100%;">
                           <div id="thrFlwMainBtn" style="width:80px; height:30px; margin:auto; margin-top:8px; cursor:pointer; border-bottom: solid 2px skyblue;">
                                <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="min_titls">threads</p>
                           </div>
                         </div>
                         <div style="width:50%; float:left; height:100%;">
                           <div id="strFlwMainBtn" style="width:80px; height:30px; margin:auto; margin-top:8px; cursor:pointer;">
                                <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="min_titls">strings</p>
                           </div>
                         </div>
                       </div>
                     </div>
                    </div>

                  <div class="noneExst" id="noStrCon" style="width:100%; border-radius: 5px;">
                      <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">There are no strings or threads from you or your friends yet!</p>
                      <div class="nonExplr" style="margin:auto; border-radius:15px; width: 100px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/exp.png" alt="" width="15px" height="15px"> explore </p> </div>
                      <br>    
                  </div>

                  <div id="drpThrMain" class="row">
                      <span id="dropbox-thr-main"></span>
                  </div> 
                  
                  <div id="drpStrMain" class="row" style="display:none;">
                      <span id="dropbox-str-main"></span>
                  </div> 

                  <br>
              </div>

                <!-- explore body -->
                <div id="explBody" class="col-xs-12" style="display:none; margin-top:-35px;">
                    <br>
                    <!-- hide and see nav above -->
                    <div class="leftNavCon" id="trndStrAr" style="width:100%; border-radius:5px; margin-top:10px; display:none;">
                        <div id="" style="width:100%; height:30px; border-top-right-radius:5px; border-top-left-radius:5px;">
                            <p style="padding:3px;" class="sub_h"> <img src="assets/imgs/strings.png" alt="" width="20px" height="20px" id="homeind"> <span id="winame">Trending strings</span> </p>
                        </div>
                        <div class="theChnCon" style="width:95%; height:150px; margin:auto; overflow-y: auto; border-radius:5px; margin-bottom:10px;">
                            <span id="dispTrndStr"></span>
                            <br>
                        </div>
                    </div>
                    <p style="text-align:center; margin:0px; padding:5px; margin-top:20px;" class="sub_h">explore <img src="assets/imgs/exp2.png" width="15px" heght="15px"> </p>
                    
                    <div class="row">
                    <div id="redBodCon-ex" class="col-xs-21">

                      <!-- books/authors/journal by category/none ranking <img src="assets/imgs/chart.png" alt="" width="15px" height="15px" style="margin:3px;"> -->
                      <p style="padding: 3px; margin: auto; cursor: pointer;" class="sub_hs">
                        <button style="color: none; border: none; background-color: transparent; border-radius: 15px; margin: 3px;" class="btn btn-default sub_hs rte_btn" id="rte_btn_exp">
                          <span style="margin: 3px; font-weight: normal;"> <img src="assets/imgs/chart.png" alt="" width="13px" height="13px" style="margin:2px;"> rated contents <img src="assets/imgs/up.png" id="rte_btn_img" alt="" width="13px" height="7.5px" style="margin: 1.5px;"> </span>
                        </button>
                      </p>
                      <div id="exp_ratin_con" style="width: 100%; margin-bottom:10px;">
                        
                        <!-- authors -->
                        <div style="width:100%; height: 320px;" class="xs_sliderC" id="aut_Rcon">
                          <div style="width: 100%; height: 30px;">
                            <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_aut_rnk">authors </p>
                          </div>
                          <div class="usrAutCats" style="width:96%; margin:auto; height: 280px; border-radius: 10px; overflow-x: auto;">
                            <div id="exrhAuLSlide" style="height: 100%;">

                              <div id="mstRdaut_con_1" style="width: 260px; height: 100%; float: left; display: none;">
                                <div style="height: 20px; width: 100%;">
                                  <p class="sub_hs" style="text-align: center; font-size: 14px; margin: 0px; padding: 3px;">1</p>
                                </div>
                                <div style="height: 200px; width: 100%;">
                                  <span id="dropMstRd_aut_1"></span>
                                </div>
                                <div style="height: 40px; width: 100%;">
                                  <p style="text-align: center; margin: 0px; padding: 3px;"> <img src="assets/imgs/read.png" width="15px" height="15px" style="opacity: 0.6;" alt=""> </p>
                                  <p style="text-align: center; margin: 0px; padding: 1px; font-size: 11px;" id="mstRdBk_len_1" class="sub_hs"></p>
                                </div>
                              </div>
                              <div id="mstRdaut_con_2" style="width: 260px; height: 100%; float: left; display: none;">
                                <div style="height: 20px; width: 100%;">
                                  <p class="sub_hs" style="text-align: center; font-size: 14px; margin: 0px; padding: 3px;">2</p>
                                </div>
                                <div style="height: 200px; width: 100%;">
                                  <span id="dropMstRd_aut_2"></span>
                                </div>
                                <div style="height: 40px; width: 100%;">
                                  <p style="text-align: center; margin: 0px; padding: 3px;"> <img src="assets/imgs/read.png" width="20px" height="15px" style="opacity: 0.6;" alt=""> </p>
                                  <p style="text-align: center; margin: 0px; padding: 1px; font-size: 11px;" id="mstRdBk_len_2" class="sub_hs"></p>
                                </div>
                              </div>
                              <div id="mstRdaut_con_3" style="width: 260px; height: 100%; float: left; display: none;">
                                <div style="height: 20px; width: 100%;">
                                  <p class="sub_hs" style="text-align: center; font-size: 14px; margin: 0px; padding: 3px;">3</p>
                                </div>
                                <div style="height: 200px; width: 100%;">
                                  <span id="dropMstRd_aut_3"></span>
                                </div>
                                <div style="height: 40px; width: 100%;">
                                  <p style="text-align: center; margin: 0px; padding: 3px;"> <img src="assets/imgs/read.png" width="15px" height="15px" style="opacity: 0.6;" alt=""> </p>
                                  <p style="text-align: center; margin: 0px; padding: 1px; font-size: 11px;" id="mstRdBk_len_3" class="sub_hs"></p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div style="width:100%;" class="xs_sliderC" id="">
                          <!-- 
                            Journal rankings bellow
                          -->
                          <!-- most read -->
                          <div style="width: 100%; display: none;" class="" id="exp_jrn_MRC">
                            <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_aut_rnk"> most read <img src="assets/imgs/read.png" width="11px" height="11px" style="opacity: 0.6;" alt=""> </p>
                            <span id="exp_drpMR"></span>
                          </div>
                          <!-- most associated -->
                          <div style="width: 100%; display: none;" class="" id="exp_jrn_MAC">
                            <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_aut_rnk"> most associated  <img src="assets/imgs/frnds.png" width="13.5px" height="11px" style="opacity: 0.6;" alt=""> </p>
                            <span id="exp_drpMA"></span>
                          </div>
                          <!-- most liked -->
                          <div style="width: 100%; display: none;" class="" id="exp_jrn_MLC">
                            <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_aut_rnk"> most liked  <img src="assets/imgs/liked.png" width="11px" height="11px" style="opacity: 0.6;" alt=""> </p>
                            <span id="exp_drpML"></span>
                          </div>
                          <!-- most commented -->
                          <div style="width: 100%; display: none;" class="" id="exp_jrn_MCC">
                            <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_aut_rnk"> most commented <img src="assets/imgs/commentd.png" width="11px" height="11px" style="opacity: 0.6;" alt=""> </p>
                            <span id="exp_drpMC"></span>
                          </div>
                        </div>
                        <!-- books -->
                        <div style="width:100%; height: 410px;" class="xs_sliderC" id="bks_Rcon">
                          <div style="width: 100%; height: 30px;">
                            <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_bks_rnk">trending books </p>
                          </div>
                          <div class="usrAutCats" style="width:96%; margin:auto; height: 370px; border-radius: 10px; overflow-x: auto;">
                            <div id="exrhBLSlide" style="height: 100%;">

                              <div id="mstRdBk_con" style="width: 290px; height: 100%; float: left; display: none;">
                                <div style="height: 300px; width: 100%;">
                                  <span id="dropMstRd_bk"></span>
                                </div>
                                <div style="height: 20px; width: 100%;">
                                  <p style="text-align: center; font-size: 14px; margin: 0px; padding: 3px;" class="sub_h">most read</p>
                                </div>
                                <div style="height: 40px; width: 100%;">
                                  <p style="text-align: center; margin: 0px; padding: 3px;"> <img src="assets/imgs/read.png" width="15px" height="15px" style="opacity: 0.6;" alt=""> </p>
                                  <p style="text-align: center; margin: 0px; padding: 1px; font-size: 11px;" id="mstRdBk_len" class="sub_hs"></p>
                                </div>
                              </div>
                              <div id="mstAscBk_con" style="width: 290px; height: 100%; float: left; display: none;">
                                <div style="height: 300px; width: 100%;">
                                  <span id="dropMstAsc_bk"></span>
                                </div>
                                <div style="height: 20px; width: 100%;">
                                  <p style="text-align: center; font-size: 14px; margin: 0px; padding: 3px;" class="sub_h">most associated</p>
                                </div>
                                <div style="height: 40px; width: 100%;">
                                  <p style="text-align: center; margin: 0px; padding: 3px;"> <img src="assets/imgs/frnds.png" width="20px" height="15px" style="opacity: 0.6;" alt=""> </p>
                                  <p style="text-align: center; margin: 0px; padding: 1px; font-size: 11px;" id="mstAscBk_len" class="sub_hs"></p>
                                </div>
                              </div>
                              <div id="mstLkdBk_con" style="width: 290px; height: 100%; float: left; display: none;">
                                <div style="height: 300px; width: 100%;">
                                  <span id="dropMstLkd_bk"></span>
                                </div>
                                <div style="height: 20px; width: 100%;">
                                  <p style="text-align: center; font-size: 14px; margin: 0px; padding: 3px;" class="sub_h">most liked</p>
                                </div>
                                <div style="height: 40px; width: 100%;">
                                  <p style="text-align: center; margin: 0px; padding: 3px;"> <img src="assets/imgs/liked.png" width="15px" height="15px" style="opacity: 0.6;" alt=""> </p>
                                  <p style="text-align: center; margin: 0px; padding: 1px; font-size: 11px;" id="mstLkdBk_len" class="sub_hs"></p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>

                      <!-- drop all -->
                      <p class="sub_hs" style="margin: 0px; padding:5px; font-size: 12.5px; text-align: center;" id="exp_aut_rnk"> general <img src="assets/imgs/flowa.png" width="13.5px" height="11px" style="opacity: 0.6;" alt=""> </p>
                      <span id="dropbox-indexexp"></span>
                      
                      <div style="width:100%; height:80px;"></div>
                    </div>
                    </div>

                    <div class="row">
                    <div id="strBodCon-ex" style="width:100%; display:none;">
                      <div style="width:100%;" class="xs_sliderC" id="">
                        <p style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" class="sub_h" id="exp_aut_rnk"> <img src="assets/imgs/chart.png" alt="" width="13px" height="13px" style="margin:2px;"> strings </p>
                        <div class="usrAutCats clearfix visible-xs" style="width:96%; margin:auto; border-radius: 10px; overflow-y: auto;">
                          <span id="drop_trnd_Str"></span>
                          <br>
                        </div>
                        <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px;" id="exp_aut_rnk"> most associated threads <img src="assets/imgs/frnds.png" width="13.5px" height="11px" style="opacity: 0.6;" alt=""> </p>
                        <span id="exp_drpTHRA"></span>
                        <br>
                      </div>
                      <p class="sub_hs" style="margin: 0px; margin-left:10px; padding:5px; font-size: 12.5px; text-align: center;" id="exp_aut_rnk"> general <img src="assets/imgs/flowa.png" width="13.5px" height="11px" style="opacity: 0.6;" alt=""> </p>
                      <span id="dropbox-strindexexp"></span>
                    </div>
                    </div>

                </div>

              <!-- trending strings body -->
              <div id="trstrBody" class="col-xs-12" style="display:none; margin-top:-35px;">
                  <p style="text-align:center; margin:0px; padding:5px;" class="sub_H">trending strings <img src="assets/imgs/strings.png" width="15px" heght="15px"> </p>
                  <div class="row" id="strBodCon-ex">
                      <span id="dropbox-strindexexp"></span>
                  </div>
                  <!-- main flow div done -->
              </div>
  
              <!-- top shop body -->
              <div id="topsBody" class="col-xs-12" style="display:none; margin-top:-35px;">
                  <p style="text-align:center; margin:0px; padding:5px;" class="sub_h">topshop <img src="assets/imgs/shop.png" width="15px" heght="15px"> </p>
                  <div class="row" id="strBodCon-ex">
                      <span id="dropbox-indextop"></span>
                  </div>
              </div>

          </div>
  
          <!-- searcher -->
          <div class="row" id="forSrchMain" style="display:none; margin-top:0px;">

            <div id="flowLoader1S" style="margin:auto; height:60px; display:none;">
              <div class="flowLoader" style="width:45px; height:45px; margin:auto; margin-top:10px; background-image:url(assets/imgs/load.png); background-size:100% 100%;"></div>
            </div>

              <!-- search usr -->
              <div class="col-xs-12" id="drpUsrSrchdCon" style="display:none;">
              
                  <div class="noneExst" id="noUsrSrchd" style="width:100%; margin-top:10px; border-radius: 5px; display:none;">
                      <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">user does not exist</p>
                  </div>
                  <span id="drpUsrSrchd"></span>
              
              </div>

              <!-- search str -->
              <div class="col-xs-12" id="drpStrSrchdCon" style="display:none;">
              
                  <div class="noneExst" id="noStrSrchd" style="width:100%; margin-top:10px; border-radius: 5px; display:none;">
                      <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">string does not exist</p>
                  </div>
                  <span id="drpStrSrchd"></span>
              
              </div>

              <!-- search str -->
              <div class="col-xs-12" id="drpJbsSrcCon" style="display:none;">
              
                  <div class="noneExst" id="noJBsSrchd" style="width:100%; margin-top:10px; border-radius: 5px; display:none;">
                      <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">Book or Journal Heading does not exist</p>
                  </div>
                  <span id="drpJBsSrchd"></span>
              
              </div>

          </div>


          <div style="width:100%; height:120px;"></div>

      </div>

      <!-- CHATS BODY -->
      <div class="col-xs-12" id="chatsFlowBod" style="margin-top: 70px; display:none;">

          <div id="chatsDrpCon" style="width:100%; border-radius: 5px;">
              <br>

              <div id="flowLoader2C" style="margin:auto; height:60px;">
                <div class="flowLoader" style="width:45px; height:45px; margin:auto; margin-top:10px; background-image:url(assets/imgs/load.png); background-size:100% 100%;"></div>
              </div>
              
              <div class="noneExst" id="noChtsCon" style="display:none;">
                  <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">You have not chats yet!</p>
                  <div class="nonExplr" style="margin:auto; border-radius:15px; width: 100px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/exp.png" alt="" width="15px" height="15px"> explore </p> </div>
              </div>

              <!-- drop chat area -->
              <div id="drpChtCon" style="display:none;">
                  <span id="dpChtHr"></span>
              </div>
                  
              <!-- sech chat area -->
              <div id="srchChtCon" style="display:none;">
                  <span id="dpSrchCht"></span>
              </div>

              <br>
          </div>
      
      </div>

      <!-- profile body -->
      <div id="prfBody" style="margin-top: 50px; display: none;">

            <!-- friends pop-up -->
                <div id="openFriends" class="col-xs-12 col-md-4" style="position:fixed; height:90%; z-index:4; display:none; margin-top:7.5%;">
                    <div id="frndsMainCon" style="width:100%; height:100%; box-shadow:0px 0px 10px -1px #1a1a1a; border-radius:5px;">
                        <div id="frndsNavCon" style="width:100%; height:92.5px; border-top-right-radius:5px; border-top-left-radius:5px;">
                            <div id="frndsHd" style="height:30px; width:100%;">
                                <p style="float:left; padding:5px; font-size:13px; color:orange; margin:0px; height:18px;">friends</p>
                                <img src="assets/imgs/can.png" width="15px" height="15px" style="margin:7.5px; float:right;" id="closeFriends">
                            </div>
                            <div style="height:65px; width:100%;">
                              <div style="width:50%; height:65px; float:left; cursor:pointer;">
                                  <div id="opnFlwn" style="width: 100%; height: 40px; border-bottom:solid 1px skyblue;">
                                    <p class="sub_h" style="padding:10px; margin:0px; text-align:center; font-size:13.5px; height:15px;">FOLLOWING</p>
                                  </div>
                                  <div style="width: 100%; height: 22.5px;">
                                    <p id="getFlwnMe" class="sub_h" style="text-align:center; font-size:12px; margin:0px; padding:5px; height:15px;"></p>
                                  </div>
                              </div>
                              <div style="width:50%; height:65px; float:right; margin-top:-1.5px; cursor:pointer;">
                                  <div id="opnFlwr" style="width: 100%; height: 40px;">
                                    <p class="sub_h" style="padding:10px; margin:0px; text-align:center; font-size:13.5px; height:15px;">FOLLOWERS</p>
                                  </div>
                                  <div style="width: 100%; height: 22.5px;">
                                    <p id="getFlwrsMe" class="sub_h" style="text-align:center; font-size:12px; margin:0px; padding:5px; height:15px;"></p>
                                  </div>
                              </div>
                            </div>
                        </div>
                        <!-- <div id="frndsSrchCon" style="width:100%; height:35px;">
                            <input id="frndsSrchFrnds" type="search" style="border:none; background-color:transparent; margin:5px; float:left; width:80%; float:left;" placeholder="search">
                            <img src="assets/imgs/searcha.png" alt="" width="25px" height="25px" style="margin:5px; float:left;">
                        </div> -->
                        <div style="height:295px; width:100%; overflow-y:auto;">

                            <div style="width:100%; height:293px; overflow-y:auto;" id="flwnDiv">
                            <span id="drop-flwn"></span>
                            </div>
                            <div style="width:100%; height:293px; overflow-y:auto; display:none;" id="flwrDiv">
                            <span id="drop-flwr"></span>
                            </div>

                        </div>
                    </div>
                </div>

            <div class="col-xs-12 detailsBod">
                <div class="norm_usr_me" style="width:100%; display:none;">
                    <div id="profpicdiv" class="" style="width:100px; height:100px; margin:auto; margin-top:10px; border-radius:100%;">
                    </div>
                    <p class="sub_hs" style="text-align:center; font-size:10px; margin:5px;"><span class="profuname"></span> <img src="assets/imgs/verification.png" id="verIcon" width="13.5px" height="13.5px" style="margin-top:-3.5px; display:none;"></p>
                    <p class="profusername sub_h" style="text-align:center; font-size:15px; margin:5px;"></p>
                </div>
                <div class="aut_usr_me" style="width:100%; display:none;">
                    <div class="row">
                        <div id="autBckImgCon" style="height: 160px; background-size: 100% 120%; class="col-xs-12">
                            <br>
                        </div>
                            <div style="width:100%; margin-top:-80px; height:165px; position:absolute; z-index:0;">
                                <div style="width:35%; height:100%; float:left;">
                                    <div id="profPicdivA" style="width: 110px; height: 110px; margin: auto; margin-top: 20px; border-radius: 10px; box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.473); background-image:url(assets/imgs/profpic.png); background-size:100% 100%;"></div>
                                    <p class="sub_h" style="text-align:center; font-size:13px; margin:5px; margin-top:5px;"> <img id="usrAuth" class="" src="assets/imgs/authand.png" width="15px" height="15px" alt="" style="background-color: transparent;"> <span class="profuname"></span> </p>
                                </div>
                                <div style="width:65%; height:100%; float:right;">
                                    <div style="width: 90%; height:65px; border-radius: 10px; box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.473); margin:auto; margin-top: 27.5px; margin-bottom: 5px; display: none; overflow-y: auto;" id="catsAttCon" class="usrAutUiBodss usrAutCats">
                                        <span class="drpCatsAtt"></span>
                                    </div>
                                    <p class="sub_hs" style="font-size:11px; margin:5px; padding:5px;  cursor:pointer; float:right;" class="editProfprofy">EDIT</p>
                                    <p class="sub_h" style="padding:5px; margin:0px; font-size:15px; float:right;"> <a class="mailInf" href="" style="text-decoration:none;"> <img src="assets/imgs/mail.png" width="15px" height="13px" alt=""> </a> </p>
                                </div>
                            </div>
                        <div style="width:100%; height:90px;"></div>
                    </div>
                    <p class="profusername min_titls" style="font-size:15px; margin:3px;"></p>    
                </div>
                <div class="row">
                    <div class="col-xs-12" id="statusdiv" style="height:100%; border-top: solid 1px #f0f0f0; border-bottom: solid 1px #f0f0f0;">
                        <p id="statusbod" class="min_titls" style="margin:5px; font-size:13px;">Hi i'm a threader!</p>
                    </div>
                </div>
                <div class="norm_usr_me" style="width: 100%; height: 60px; display:none;">
                  <p class="frndLen frnAr sub_h" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                  <p class="frnAr sub_hs" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; cursor:pointer;">friends</p>
                </div>
                <div class="aut_usr_me" style="width: 100%; height: 50px; display:none;">
                  <div style="height: 40px; width:50%; margin-top: 5px; float:left;" class="brd-rg">
                    <p class="frndLen frnAr sub_h" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                    <p class="frnAr sub_hs" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; cursor:pointer;">friends</p>
                  </div>
                  <div style="height: 40px; width:50%; margin-top: 5px; float:left;">
                    <p class="subAr subsLen subArBtns sub_h" style="text-align: center; margin:0px; padding:1.5px; font-size:16px; cursor:pointer;"></p>
                    <p class="subAr subArBtns sub_hs" style="text-align: center; margin:0px; padding:1px; font-size:12.5px; cursor:pointer;">subscribers</p>
                  </div>
                </div>
                <p id="mail" style="color:skyblue; text-align:center; font-size:12px; margin-top:5px;"></p>
                <hr id="adhr" style="display:none; margin-top:-10px;">
                <p id="adcart" style="margin:5px; color:skyblue; display:none; margin-top:-10px;"></p>
                <div class="row">
                    <div class="col-xs-12 sbNav" id="" style="height:40px;">
                        <img id="opnJrnPrf" src="assets/imgs/read.png" alt="" width="25px" height="25px" style="margin:5px; float:left;">
                        <img id="opnStrPrf" src="assets/imgs/strings2.png" alt="" width="25px" height="25px" style="margin:5px; float:left; margin-left:15px;">
                        <img id="opnAutCnt" class="aut_usr_me" src="assets/imgs/authand2.png" alt="" width="25px" height="25px" style="margin:5px; float:left; margin-left:15px; display:none;">
                        <img id="frnAr" src="assets/imgs/frnds.png" alt="" width="25px" height="20px" style="margin:5px; float:right;">
                    </div>
                </div>
            </div>

            <div class="col-xs-12" style="margin-top: 0px;">

                <div class="row">

                    <!-- jrn body below -->
                    <div id="forJrnPrf" class="col-xs-12 noneExst" style="margin-bottom:20px;">
                        <div class="row">
                            <div style="height:70px;" class="col-xs-12 bodySubNav">
                                <div style="height:30px; width:100%;">
                                    <p class="sub_h" style="text-align:center; font-size:12.5px; margin:0px; padding:5px;"> <img src="assets/imgs/read.png" width="13px" height="13px" style="margin-top:-2.5px; margin-right:5px;"> reads <span style="color:orange; font-size:14px;" id="myReadsLen">0</span> </p>
                                </div>
                                <div style="width:50%; float:left; height:40px;">
                                    <div id="seeFlow" style="width:45px; height:30px; margin:auto; margin-top:5px; cursor:pointer; border-bottom:solid 2px darkorange;">
                                        <div style="width:45px; height:10px; margin:auto; margin-top:5px;">
                                            <p style="text-align:center; font-size:13.5px; margin:0px; padding:3px;" class="sub_h">seen</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="width:50%; float:left; height:40px;">
                                    <div id="hidFlow" style="width:50px; height:30px; margin:auto; margin-top:5px; cursor:pointer;">
                                        <div style="width:50px; height:15px; margin:auto; margin-top:5px;">
                                            <p style="text-align:center; font-size:13.5px; margin:0px; padding:3px;" class="sub_h">hidden</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="seeBodCon" class="row">
                            <div id="noJsConPrf">
                                <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">You have no Journals yet!</p>
                                <div class="nonExplr" style="margin:auto; border-radius:15px; width: 150px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/addxs.png" alt="" width="15px" height="15px"> add Journals </p> </div>
                            </div>
                            <span id="dropbox-jrn-prf"></span>
                        </div>

                        <div id="hidBodCon" style="width:100%; display:none;">
                            <p class="sub_h" style="font-size:14px; margin:5px; text-align:center;">Hidden posts <img src="assets/imgs/lock.png" alt="" width="13px" height="13px"></p>
                            <div id="checknum-hd" style="margin:auto; width:150px; cursor:pointer;">
                                <br>
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/block.png" alt="" width="100%" height="70px" style="opacity:0.3;">
                                </div>
                                <p class="sub_h" style="margin:5px; font-size:12px; text-align:center;"> You have no hidden journals </p>
                            </div>
                            <span id="dropbox-hd"></span>
                        </div>

                        <br>
                    </div>

                    <!-- str body bellow -->
                    <div id="strPrfBd" class="col-xs-12 noneExst" style="margin-bottom:20px; display:none;">
                         <div style="width:100%; height:40px;">
                            <div style="width:50%; float:left; height:100%;">
                                <div id="thrFlwOpn" style="width:80px; height:30px; margin:auto; margin-top:5px; cursor:pointer; border-bottom:solid 2px skyblue;">
                                    <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="min_titls">threads</p>
                                </div>
                            </div>
                            <div style="width:50%; float:left; height:100%;">
                                <div id="strFlwOpn" style="width:80px; height:30px; margin:auto; margin-top:5px; cursor:pointer;">
                                    <p style="font-size:18px; text-align:center; margin:0px; padding:5px;" class="min_titls">strings</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- thr str -->
                        <div class="row" id="thrFlowCon">
                            <div id="checknum-t" style="margin:auto; width:150px; cursor:pointer;">
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/addxs.png" alt="" width="100%" height="70px">
                                </div>
                                    <p class="sub_h" style="margin:5px; font-size:12px; text-align:center;"> <strong style="font-size:15px;">+</strong> Add threads</p>
                            </div>
    
                            <span id="dropbox-thr"></span>
                        </div>

                        <!-- flow str -->
                        <div class="row" id="strFlowCon" style="display: none;">
                            <div id="checknum-s" style="margin:auto; width:150px; cursor:pointer;">
                                <div  style="margin:auto; width:70px; cursor:pointer;">
                                    <img src="assets/imgs/addxs.png" alt="" width="100%" height="70px">
                                </div>
                                    <p class="sub_h" style="margin:5px; font-size:12px; text-align:center;"> <strong style="font-size:15px;">+</strong> Add Strings</p>
                            </div>
                            <span id="dropbox-str"></span>
                        </div>

                        <br>
                    </div>

                    <!-- aut body below -->
                    <div id="forPrfAut" class="col-xs-12 noneExst" style="margin-bottom:20px; display:none;">
                        <div style="width:100%; height:37px;">
                            <p class="sub_h" style="float:left; font-size:12.5px; margin:0px; padding:5px;"> <img src="assets/imgs/read.png" width="13px" height="13px" style="margin-top:-2.5px; margin-right:5px;"> reads <span style="color:orange; font-size:14px;" id="myReadsLenAut">0</span> </p>
                            <button style="color: none; border: none; background-color: transparent; border-radius: 15px; margin: 3px; float: right;" class="btn btn-default sub_hs rte_btn" id="opnMyBksShlf">
                                <span style="margin: 3px; font-weight: normal;"> <img src="assets/imgs/bread.png" alt="" width="13px" height="13px" style="margin: 1.5px;"> books </span>
                            </button>
                        </div>

                        <div id="noAutCnPrf">
                            <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;">You have no Author Contents yet!</p>
                            <div class="nonPrfaut" style="margin:auto; border-radius:15px; width: 150px;"> <p class="sub_h" style="text-align: center; padding: 5px; margin:0px;"> <img src="assets/imgs/addxs.png" alt="" width="15px" height="15px"> add Journals </p> </div>
                        </div>
                        
                        <div class="row">
                            <span id="dropbox-aut-prf"></span>
                        </div>

                        <br>
                    </div>

                </div>


                <div style="height:40px;"></div>
                

            </div>

        </div>

      <!-- NOTI BODY -->
      <div class="col-xs-12" id="notiBod" style="margin-top: 70px; display:none;">

        <span style="margin-bottom:10px;">
            <div id="comNewNoti" style="display:none; width:100%; border:solid 0.6px #f0f0f0; border-radius:7px;">
                <div style="margin:auto; margin-top:10px; width:55px; height:35px; background-image:url(assets/imgs/terms.png); background-size:100% 100%;"></div>
                <p style="margin:0px; padding:5px; font-size:11.5px; text-align:center;" class="sub_h">There have been new terms and other information concerning our rules and community guidelines.</p>
                <p style="margin:0px; padding:5px; text-align:center;">
                    <button class="btn btn-default btn-xs" style="border-radius:10px; color:darkorange; border:solid 1px darkorange; background-color:transparent;">go to about and other poolicies</button>
                </p>
            </div>
        </span>

          <div class="noneExst" id="noNotiCon" style="width:100%; border-radius: 5px;">
              <br>

              <div id="">
                  <p class="sub_h" style="padding: 10px; text-align: center; font-size: 13px; margin:0px;"> No notifications yet </p>
                  <p style="text-align: center; padding: 5px; margin:0px;" class="sub_h">
                      <img src="assets/imgs/notis.png" width="45px" height="45px">
                  </p>
              </div>
              
              <br>
          </div>

          <div id="flowLoader3N" style="margin:auto; height:60px;">
            <div class="flowLoader" style="width:45px; height:45px; margin:auto; margin-top:10px; background-image:url(assets/imgs/load.png); background-size:100% 100%;"></div>
          </div>
          
          <span id="recNewNotCon" style="display:none;">
            <div style="width:100%; border:solid 0.6px orange; border-radius:7px;">
                <p class="sub_h" style="margin:0px; padding:5px; font-size:11.5px;">recent</p>
                <span id="dropnoti-rec"></span>
            </div>
          </span>
          <br style="margin:5px;">

          <span id="drp_noties"></span>
          <br>
          <div style="margin:auto; width:100%; height:100px;"></div>
      
      </div>

        `
    };
    $('#drpBds').append(Bodies());
    $('#user').on('input', function(key){
        var value = $(this).val();
        $(this).val(value.replace(/ /g, '_'));
    });

    // none exist btns
    $('#noJsCon').on("click", function(){
        $('#goToExplr').click();
    });

    //  go to explores\
    $('.nonExplr').on("click", function(){
      console.log('disco dancer');
      $('#opnHme').click();
      setTimeout(() => {
          $('#goToExplr').click();
      }, 500);
    })

}
// assignDb();
const checkDb = () => {
  
  setTimeout(() => {
    if (db_f == 'y') {
      Star();
    } else {
       checkDb();
    }
  }, 100);
}
checkDb();