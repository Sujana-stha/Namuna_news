export const BASE_PATH = "http://127.0.0.1:8000";

const TOKEN_KEY = 'jwt';

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    var hours = 1
    var now = new Date().getTime();
    console.log('now', now);
    var setupTime = localStorage.getItem('setupTime'); 
    if ((now-localStorage['setupTime'] <= hours*60*60*1000) && localStorage['access_token']) {
        return true;
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
        }
        return false;
    }
    
}