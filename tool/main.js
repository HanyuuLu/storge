var countOfnote = 0;
var tableParent;
var Field = { "grade": "年级", "unit": "单元", "index": "课文号", "subIndex": "子课文号", "title":"标题","author": "作者", "body": "正文" }
var OutputField = { "output": "输出" }
var NoteList = {}
init()
function init() {
    alert("正在施工中，功能暂时不可用，请勿导出")
    var mountHandle = document.getElementById('mainTable')
    for (var key in Field) {
        createLabeledTextBox(mountHandle, key, Field[key])
    }
    var noteTr = document.createElement('tr')
    // var leftTd = document.createElement('td')
    // var leftBox = document.createElement('div')
    // leftBox.innerHTML="注释"
    // leftBox.classList = "label label-default"
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
function commit() {
    var res = {};
    for(var i in Field)
    {
        res[i]=document.getElementById(i).value;
    }
    var arr = {}
    for(var i in NoteList)
    {
        arr[i]=document.getElementById(i).value
    }
    res.node = arr

    document.getElementById("output").value = JSON.stringify(res)
    alert($('.output'))
}
function addNote() {
    var parent = document.getElementById('noteTable')
    var handle = createLabeledTextBox(parent,`N${countOfnote}`,`注释 ${countOfnote}`)
    var deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.classList = 'btn btn-outline-primary'
    deleteButton.value = '❌'
    deleteButton.id = countOfnote
    deleteButton.addEventListener('click', function () { deleteRow(this) })
    handle.lastChild.appendChild(deleteButton)
    NoteList[`N${countOfnote}`]=`注释 ${countOfnote}`
    ++countOfnote
}
function deleteRow(i) {
    var parent = document.getElementById('noteTable')
    delete NoteList[`N${i.id}`]
    parent.removeChild(i.parentElement.parentElement)
}
function copy() {
    var res = document.getElementById("output")
    res.select()
    document.execCommand("Copy")
    alert("输出已复制到剪切板")
}