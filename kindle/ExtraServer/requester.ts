import request from 'request';
export async function fetchBilibiliLiveStatus(roomid: string) {
    const baseURL = `https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=${roomid}`
    var res = await new Promise(function (resolve, reject) {
        request(baseURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }else{
                reject("failure")
            }
        })
    })
    return res;
}

export async function fetchBilibiliUserSpaceHistory(uid: string) {
    const baseURL = `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=${uid}`
    var res = await new Promise(function (resolve, reject) {
        request(baseURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject("failure")
            }
        })
    })
    return res

    
}
