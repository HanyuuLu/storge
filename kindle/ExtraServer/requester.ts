import request from 'request';
export async function fetchBilibiliLiveStatus(roomid: string) {
    const baseURL = `https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=${roomid}`
    var res =  await new Promise(function (resolve, reject) {
        request(baseURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
        })
    })
    return res
}