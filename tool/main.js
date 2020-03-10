var countOfnote = 0;
var tableParent;
var Field = { "grade": "年级", "unit": "单元", "index": "课文号", "subIndex": "子课文号", "title":"标题","author": "作者", "body": "正文" }
var OutputField = { "output": "输出" }
var NoteList = {}
init()
function init() {
    // alert("正在施工中，功能暂时不可用，请勿导出")
    var mountHandle = document.getElementById('mainTable')
    for (var key in Field) {
        createLabeledTextBox(mountHandle, key, Field[key])
    }
    var noteTr = document.createElement('tr')
    var rightTd = document.createElement('td')
    var rightTable = document.createElement('table')
    rightTable.id='noteTable'
    var addRow =document.createElement('input')
    addRow.type='input'
    addRow.id = 'addNote'
    addRow.classList = 'btn btn-outline-primary btn-sm'
    addRow.value = '在下方添加一行注释'
    addRow.style="width:100%"
    addRow.addEventListener('click',addNote)
    // leftTd.appendChild(leftBox)
    rightTd.appendChild(rightTable)
    rightTd.appendChild(addRow)
    // noteTr.appendChild(leftTd)
    noteTr.appendChild(rightTd)
    mountHandle.appendChild(noteTr)

    for (var key in OutputField) {
        var handle = createLabeledTextBox(mountHandle,key,OutputField[key])
        // var td = document.createElement('td')
        var copyButton = document.createElement('input')
        copyButton.classList = "btn btn-outline-primary btn-sm"
        copyButton.value = "复制到剪切板"
        copyButton.style="width:100%"
        copyButton.addEventListener('click',copy)
        // td.appendChild(copyButton)
        handle.appendChild(copyButton)
    }
    var operateTr = document.createElement('tr')
    var operateTd = document.createElement('td')
    var load = document.createElement('input')
    load.classList = "btn btn-outline-primary btn-sm"
    load.type = 'file'
    load.style = 'width:100%'
    load.id = 'fileLoad'
    load.addEventListener('change',function(){loadFile(this.files)})
    var commit = document.createElement('input')
    commit.classList = "btn btn-primary btn-block"
    commit.type = 'button'
    commit.value = '输出'
    commit.addEventListener('click',serialize)
    operateTd.appendChild(load)
    operateTd.appendChild(commit)
    operateTr.appendChild(operateTd)
    mountHandle.appendChild(operateTr) 
    var recUp = document.getElementById('recentUpdate')
    recUp.addEventListener('click',recUpdate)
}
function createLabeledTextBox(parent, key, value) {
    var tr = document.createElement('tr')
    tr.id = `tr${key}`
    var nodeHandle = document.createElement('div');
    nodeHandle.classList = "input-group flex-nowrap"
    var leftBox = document.createElement('div')
    leftBox.className = "input-group-prepend"
    var sp = document.createElement('span')
    sp.className = "input-group-text"
    sp.style = "width:100px"
    sp.innerHTML = value
    var rightBox = document.createElement('input')
    if(key=='body'){rightBox = document.createElement('textarea'); rightBox.style="height:150pt"}
    rightBox.classList = "form-control"
    rightBox.id = key
    rightBox.type = "text"
    leftBox.appendChild(sp)
    nodeHandle.appendChild(leftBox)
    nodeHandle.appendChild(rightBox)
    tr.appendChild(nodeHandle)
    parent.appendChild(tr)
    return tr
}
function serialize() {
    var res = {};
    for(var i in Field)
    {
        res[i]=document.getElementById(i).value;
    }
    var arr = {}
    for(var i in NoteList)
    {
        arr[i]=document.getElementById(NoteList[i]).value
    }
    res.node = arr

    document.getElementById("output").value = JSON.stringify(res)
}
function addNote() {
    var parent = document.getElementById('noteTable')
    var handle = createLabeledTextBox(parent,`N${countOfnote}`,`注释 ${countOfnote}`)
    var deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.classList = 'btn btn-outline-primary'
    deleteButton.value = '❌'
    deleteButton.id = `N${countOfnote}`
    deleteButton.addEventListener('click', function () { deleteRow(this) })
    handle.lastChild.appendChild(deleteButton)
    NoteList[`N${countOfnote}`]=`N${countOfnote}`
    ++countOfnote
}
function deleteRow(i) {
    try
    {
        var parent = document.getElementById('noteTable')
        console.log(i.id)
        delete NoteList[`${i.id}`]
        
        parent.removeChild(i.parentElement.parentElement)
    }
    catch
    {
        console.error(`Delete ${i.id} failed.`)
    }
}
function copy() {
    var res = document.getElementById("output")
    res.select()
    document.execCommand("Copy")
    // alert("输出已复制到剪切板")
}
function loadFile(files)
{
    if(files.length)
    {
        var file = files[0];
        var reader = new FileReader();
        if(/application\/json/ .test(file.type))
        {
            reader.readAsText(file)
            reader.onload = function()
            {
                loadJson(this.result)
            }
        }
    }
}
function loadJson(src)
{
    // alert(src)
    src = JSON.parse(src)
    // alert('《'+src.title+'》已经导入')
    for(var i in Field)
    {
        handle = document.getElementById(i)
        handle.value  = src[i]
    }
    for(var i in NoteList)
    {
        console.log(i)
        deleteRow(document.getElementById(i))
    }
    // countOfnote = 0
    countOfnote = 0
    for(var i in src.node)
    {
        addNote()
        handle = document.getElementById(i)
        handle.value = src.node[i]
    }
}
function recUpdate()
{
    alert('\
    v0.0.1AA 修复上个版本引入删除注释异常bug(´･ω･`)?\
    v0.0.1A 修复“多次上传json文件导致注释未能完全复位”问题\n\
    v0.0.1 基本功能完成\
    ')
}