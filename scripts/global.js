var global = {
    flag: 'n',
    app_key: 'threadal-app-1.0.0',
    app_store: '',
    pop_no: 5,
    // login
    log_att: 5,
    // reg
    mail_v_s: 'n',
    mail_att: 5,
    mVer_c: 0,
    // fg pass
    fp_flag: 'n',
    fp_user: '',
    fp_verC: '',
    fp_codeV: false,
    // binary change
    bin_t: '',
    img_hangLen: 0,
    thr_imgHang: 0,
    addThrNw: '',
    edt_imgs: [],
    vid_hangLen: 0,
    edt_vids: [],
    // NOTI
    noti_r: 'n',
    // ex user
    ex_user: '',
    ex_flag: 'n',
    ex_jrn: {id: '', drop: '', flag: 'n'},
    // ex author
    ex_autF: 'n',
    ex_autJ: {id: '', drop: '', flag: 'n'},
    ex_book: {id: '', flag: 'n'},
    // str
    ex_str: {id: '', drop: '', flag: 'n'},
    ex_thr: {id: '', drop: '', flag: 'n'},
    // srch
    src_str: {accssAtt: 'No', attCh: ''},
    // chat
    chat: {alrdId: '', alrdNote: 'No'},
    shr_theId: '',
    // reviewer
    rev_type: '',
    rev_allw: '',
    rev_hang: '',
    rev_coms: '',
    // categories
    cate: 'home',
    allow: 'n',
    // loadings
    page_ld: 'y',
    page_ld_stt: 'on',
    drp_ld: 'n',
    drp_ld_loc: [],
    drp_ld_stt: 'on',
    // locale
    locl: '',
};
//localStorage.clear();
function declare() {
    
    // key == 'threadal-app-1.0.0'
    const setStore = () => {
        var gApp = JSON.parse(localStorage.getItem("app"));
        const setN = () => {
            var app = {};
            var flg = 'n';
            if (gApp) {
                app = gApp; 
                if (gApp.key == 'threadal-app-1.0.0') {
                    flg = 'y';
                }
            }
            var store = {
                key: global.app_key,
                page: 'login',
                child_p: 'login',
                child_f: 'n',
                locale: 'int',
                duration: '',
                userSess: '',
                dontWho: '',
                // login
                log_flag: 'y',
                log_dte: 0,
            };
            app = store;
            if (flg == 'n') {
                localStorage.setItem("app", JSON.stringify(app));
                var na = JSON.parse(localStorage.getItem("app"));
                global.flag = 'y';
                global.app_store = store;
            }
        }
        if (gApp) {
            if (gApp !== null) {
                var flag = 'n';
                if (gApp.key == 'threadal-app-1.0.0') {
                    global.flag = 'y'; global.app_store = gApp;
                    flag = 'y';
                }
                if (flag == 'n') {
                    setN();
                }
            } else {
                setN(); 
            }
        } else {
            setN(); 
        }
    }
    // check session age. if == age = remove store.
    const localCheck = () => {
        var app = JSON.parse(localStorage.getItem("app"));
        console.log(app);
        if (app) {
            if (app !== null) {
                if (app.key == 'threadal-app-1.0.0') {
                    global.flag = 'y'; global.app_store = app;
                    flag = 'y';
                }
                var flag = 'n';
                if (flag == 'n') {
                    setStore();
                }
            }else {
                setStore();
            }
        } else {
            setStore();
        }
    }
    localCheck()

}
declare();

var refreshGlob = () => {

    var allApps = JSON.parse(localStorage.getItem("app"));
    if (allApps.key == global.app_key) {
        global.app_store = allApps;
    }
    
}

const updateGlobe = (upd) => {
    var allApps = JSON.parse(localStorage.getItem("app"));
    if (upd.type == 'ex_prf') {
        allApps.ex_user = upd.user;
        allApps.ex_flag = 'y';
    }
    global.app_store = allApps;
    localStorage.setItem("app", JSON.stringify(allApps));
}


export {global, declare, refreshGlob, updateGlobe};