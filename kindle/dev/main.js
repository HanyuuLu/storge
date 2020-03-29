function mainLoad() {
    let bodyHandle = document.getElementById('root')
    let mainPage = loadMainPage()
    bodyHandle.appendChild(mainPage)
    test()
    update()
    setInterval(update, 60000);
}
function loadMainPage() {
    let pageHandle = document.createElement('div')
    pageHandle.classList = 'container'
    let timeTable = document.createElement('div')
    timeTable.classList = 'jumbotron'
    ElementList = [
        ['h1', 'timeBox', 'display-4'],
        ['p', 'dateBox', 'lead'],
        ['hr', '', 'my-4'],
        ['div', 'serverStateBox', 'lead']
    ]
    for (let i in ElementList) {
        let temp = document.createElement(ElementList[i][0])
        temp.id = ElementList[i][1]
        temp.classList = ElementList[i][2]
        timeTable.appendChild(temp)
    }
    pageHandle.appendChild(timeTable)
    let toastsBox = document.createElement('div')
    toastsBox.id = 'toastsBox'
    toastsBox.classList = 'container'
    pageHandle.appendChild(toastsBox)
    return pageHandle
}
function test() {
    (document.getElementById('timeBox')).textContent = '20:30'
    document.getElementById('dateBox').textContent = '2020/03/29'
    document.getElementById('serverStateBox').textContent = '暂时无法连接到服务器'

    toastsMessage('header', 'message')
    toastsMessage('样例标题','样例吐司消息')
}
function toastsMessage(header,message) {
    let toastsBox = document.getElementById('toastsBox')
    let newMessageBox = document.createElement('div')
    newMessageBox['classList'] = 'toast fade show'
    newMessageBox['role'] = 'alert'
    newMessageBox['aria - live'] = 'assertive'
    newMessageBox['aria-atomic'] = 'true'
    let messageHeaderBox = document.createElement('div')
    messageHeaderBox['classList'] = 'toast-header'
    let messageHeader = document.createElement('strong')
    messageHeader['classList'] = 'mr-auto'
    messageHeader['textContent'] = header
    let messageBodyBox = document.createElement('div')
    messageBodyBox['classList'] = 'toast-body'
    messageBodyBox['textContent'] = message
    toastsBox.appendChild(newMessageBox)
    messageHeaderBox.appendChild(messageHeader)
    newMessageBox.appendChild(messageHeaderBox)
    newMessageBox.appendChild(messageBodyBox)
    toastsBox.appendChild(newMessageBox)
}
function update() {
    var date = new Date()
    var utc8DiffMinutes = date.getTimezoneOffset() + 480
    date.setMinutes(date.getMinutes() + utc8DiffMinutes)
    var weekList = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.']
    var timeString = twoWidth(date.getHours()) + ':' + twoWidth(date.getMinutes())
    var dateString = date.getFullYear() + ' / ' + twoWidth(date.getMonth()) + ' / ' + twoWidth(date.getDate()) + '  ' + weekList[date.getDay()]

    var weekString = weekList[date.getDay()]

    document.getElementById("timeBox").textContent = timeString
    document.getElementById("dateBox").textContent = dateString
}
function twoWidth(src) {
    return ('0' + src).slice(-2);
}
mainLoad()