export function bilibiliUserSpaceHistoryFileter(src:string)
{
    var cardList: Array<any>  = JSON.parse(src).data.cards;
    var infoList = new Array();
    for(var i =  0;i<cardList.length;++i)
    {
        try
        {
            infoList.push(JSON.parse(cardList[i].card).item.description)
        }
        catch(err)
        {
            console.error(err)
        }
    }
    return infoList
}