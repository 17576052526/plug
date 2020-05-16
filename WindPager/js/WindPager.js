/************创建js分页页码，代码开始**********/
var WindPager = {
    BoxID: "pagerBox",//分页按钮的父级
    IndexClass: "cheClass",//当前选择按钮样式
    Event: null,//点击页码按钮触发的方法名
    DataCount: 1000,//总数据量
    PageSize: 15,//每页显示的数量
    PageIndex: 1,//当前选择的页码
    PageNum: 7,//显示页码按钮的个数
    PageCount: 0,//总页码数量
    //插件的入口
    Start: function (obj) {

        this.BoxID = obj.BoxID;
        this.IndexClass = obj.IndexClass;
        this.Event = obj.Event;
        this.DataCount = obj.DataCount;
        this.PageSize = obj.PageSize;
        this.PageIndex = 1;
        this.PageNum = 7;
        this.PageCount = this.DataCount % this.PageSize == 0 ? this.DataCount / this.PageSize : parseInt(this.DataCount / this.PageSize) + 1;   //总的页码数量
        this.PageNum = this.PageNum > this.PageCount ? this.PageCount : this.PageNum;
        $('#' + this.BoxID).empty();//先清空子元素
        this.TagWrite();
    },
    TagWrite: function () {
        //上一页、第一页
        if (this.PageIndex == 1) {
            this.A(false, '', this.PageIndex - 1, '上一页');
            this.A(false, this.IndexClass, '1', '1');
        } else {
            this.A(true, '', this.PageIndex - 1, '上一页');
            this.A(true, '', '1', '1');
        }
        //中间页码
        var MinIndex = this.PageIndex > parseInt(this.PageNum / 2) ? this.PageIndex - parseInt(this.PageNum / 2) : 1;  //计算最小页码索引
        MinIndex = MinIndex + this.PageNum > this.PageCount ? this.PageCount - this.PageNum + 1 : MinIndex;  //计算最大的最小页码索引
        for (var i = 1; i < this.PageNum - 1; i++) {
            if (MinIndex + i == this.PageIndex)   //当前选中页
            {
                this.A(false, this.IndexClass, MinIndex + i, MinIndex + i);
            }
            else if (i == 1 && MinIndex > 1)  //前面的 ...
            {
                this.A(true, '', MinIndex + i, "...");
            }
            else if (i == this.PageNum - 2 && MinIndex + this.PageNum - 1 < this.PageCount)  //后面的 ...
            {
                this.A(true, '', MinIndex + i, "...");
            }
            else {
                this.A(true, '', MinIndex + i, MinIndex + i);
            }
        }
        //最后一页
        if (this.PageCount > 1) {
            if (this.PageIndex == this.PageCount) {
                this.A(false, this.IndexClass, this.PageIndex, this.PageCount);
            }
            else {
                this.A(true, '', this.PageCount, this.PageCount);   //最后一页
            }
        }
        //下一页
        if (this.PageIndex == this.PageCount) {
            this.A(false, '', this.PageIndex + 1, '下一页');  //下一页
        }
        else {
            this.A(true, '', this.PageIndex + 1, '下一页');  //下一页
        }
    },//event是否绑定事件、cls类样式、index页码、text显示的文本
    A: function (isEvent, cls, index, text) {
        $('#' + this.BoxID).append('<span onclick="' + (isEvent ? 'WindPager.click(' + index + ')' : '') + '" class="' + cls + '">' + text + '</span>');
    },
    click: function (index) {
        $('#' + this.BoxID).empty();
        this.PageIndex = index;
        this.TagWrite();
        this.Event();
    }
}
/************创建js分页页码，代码结束**********/