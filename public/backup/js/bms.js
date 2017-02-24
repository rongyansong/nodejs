/**
 * Created by Administrator on 2016/8/30.
 */
//获取所有的隐藏域的值
function getFormData(){
    $('.fixed .content .table .check').each(function(){
        var bbb=$(this).find('input').val();
        if($(this).find('b:visible').length==0){
            $(this).find('input').val('');
        }else{
            $(this).find('input').val(bbb);
        }
    });
}

//头部公共部分代码
function removeLeft(){//隐藏左侧菜单
    if($('.aside').is(':hidden')){
        $('.aside').show();
        $('.main').css('width','1000px');
    }else{
        $('.aside').hide();
        $('.main').css('width','1200px');
    }
}
var isFullScreen=true;
function requestFullScreen() {
    // 判断各种浏览器，找到正确的方法
    var requestMethod = document.documentElement.requestFullScreen || //W3C
        document.documentElement.webkitRequestFullScreen ||    //Chrome等
        document.documentElement.mozRequestFullScreen || //FireFox
        document.documentElement.msRequestFullScreen; //IE11
    if (requestMethod) {
        requestMethod.call(document.documentElement);
        isFullScreen=false;
    }else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
            isFullScreen=false;
        }
    }

}

//退出全屏 判断浏览器种类
function exitFull() {
    // 判断各种浏览器，找到正确的方法
    var exitMethod = document.exitFullScreen || //W3C
        document.mozCancelFullScreen ||    //Chrome等
        document.webkitExitFullScreen || //FireFox
        document.webkitExitFullScreen; //IE11
    if (exitMethod) {
        exitMethod.call(document);
        isFullScreen=true;
    }else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
            isFullScreen=true;
        }
    }
}
///文章模块和视频管理模块关于删除和合并移动等操作定义对象//
var delMerge={
    itemId:'',
    getItemId:function(t){
        this.itemId=$(t).parents('tr').find('td:first-child span').html();
    },
    batchDel:function(){
        var ids=[];
        $('.install .content .tbody td:first-child input').each(function(){
            if($(this).is(':checked')){
                ids.push($(this).next().html());
            }
        });
        return ids.join();
    },
    article_cate_merge:function(){
        var mergeId=$('#mergeId').val();
        return mergeId;
    },
    batchMerge:function(){
        var ids=[];
        var mergeId=$('#mergeAllId').val();
        $('.install .content .tbody td:first-child input').each(function(){
            if($(this).is(':checked')){
                ids.push($(this).next().html());
            }
        });
        return [ids.join(),mergeId];
    }
};
$(function(){
    $('.install .tbody tr td:first-child input').click(function(){
        if($(this).is(':checked')){
            $(this).parents('tr').addClass('addBg');
        }else{
            $(this).parents('tr').removeClass('addBg');
        }
    });
    $('#requestFullScreen').click(function(){
        if(isFullScreen){
            requestFullScreen();
        }else{
            exitFull();
        }
    });
    //左侧菜单公共部分切换代码
    $('.aside .aside_items li h6').click(function(){
        if($(this).parents('li').find('dl').length==0){
            $('.aside .aside_items li.active').removeClass();
            $(this).parents('li').addClass('active so');
        }else{
            if($(this).parents('li').hasClass('active')){
                $(this).parents('li').removeClass();
            }else{
                $('.aside .aside_items li.active').removeClass();
                $(this).parents('li').addClass('active');
            }
        }
    });
    $('.aside .aside_items dl dd').click(function(){
        $('.aside .aside_items dl dd.now').removeClass('now');
        $(this).addClass('now');
        $(this).parents('li').addClass('active');
    });
    ///////////01我的面板
    $('.panel_head>li').click(function(){
        $(this).addClass('now').siblings().removeClass('now');
        $('.panel_content>div').hide().eq($(this).index()).show();
    });
    //////////02设置中心
    //添加管理员页面//添加角色页面
    $('.install .add_manager .jiaoseInput').click(function(e){
        if($(this).next('.jiaose').length!=0&&$(this).next('.jiaose').is(':hidden')){
            $(this).next('.jiaose').show();
        }else{
            $(this).next('.jiaose').hide();
        }
    });
    $('.install .add_manager .jiaose dd').click(function(){
        $(this).parents('li').find('input').val($(this).html());
        $(this).parent().hide();
    });
    //全选与取消全选操作
    $('.popQx').delegate('.txt_cb .sel_all','click',function(){
        $('.popQx .content .table .check .ok').show().siblings().hide();
    });
    $('.popQx').delegate(' .txt_cb .qx_sel_all','click',function(){
        $('.popQx .content .table .check').children().hide();
    });
    //弹窗控制代码
    $('.fixed').delegate(' .close, .cancel','click',function(){
        $(this).parents('.fixed').hide();
    });
    //角色管理页面
    $('.install .content .del').click(function(){
        $('#popDel').show();
    });
    //权限设置弹窗
    $('.install .content .qxsz').click(function(){
        $('.popQx').show();
        $('.popQx').html('正在加载...');
        $.ajax({
            url:'/admin.php/Index/install_power',
            type:'post',
            success:function(msg){
                $('.popQx').html(msg);
            }
        })
    });
    //成员管理弹窗
    $('.install .content .cygl').click(function(){
        $('.popCy').show();
        $('.popCy').html('正在加载...');
        $.ajax({
            url:'/admin.php/Index/install_supervise',
            type:'post',
            success:function(msg){
                $('.popCy').html(msg);
            }
        })
    });
    //栏目权限弹窗
    $('.install .content .lmqx').click(function(){
        $('.popLm').show();
        $('.popLm').html('正在加载...');
        $.ajax({
            url:'/admin.php/Index/install_column',
            type:'post',
            success:function(msg){
                //alert(msg);
                $('.popLm').html(msg);
            }
        });
        //$('.popLm').show();
    });
    //角色排序全选操作
    $('.install .content .thead td:first-child input').click(function(){
        if($(this).is(':checked')){
            $('.install .content .tbody td:first-child input').each(function(){
                this.checked='true';
                $(this).parents('tr').addClass('addBg');
            });
        }else{
            $('.install .content .tbody td:first-child input').each(function(){
                this.checked='';
                $(this).parents('tr').removeClass('addBg');
            });
        }
    });
    //弹窗多选框选中取消事件\
    $('.popQx').delegate('.table td.table_item>.check','click',function(){
        if($(this).find('.ok').is(':hidden')){
            $(this).find('.ok').show().siblings().hide();
            $(this).parents('tr').find('.check').children('.notok').hide();
            $(this).parents('tr').find('.check').children('.ok').show();
        }else{
            $(this).children().hide();
            $(this).parents('tr').find('.check').children().hide();
        }
    });
    $('.popQx').delegate('.table .content_item>.check','click',function(){
        if($(this).find('.ok').is(':hidden')){
            $(this).find('.ok').show().siblings().hide();
            $(this).parents('ul').find('.check').children('.ok').show();
        }else{
            $(this).children().hide();
            $(this).parents('ul').find('.check').children().hide();
        }
        if($(this).parents('tr').find('.content_item .ok:visible').length==$(this).parents('tr').find('.content_item').length){//判断全选
            $(this).parents('tr').find('.table_item .ok').show().siblings().hide();
        }else if($(this).parents('tr').find('.content_item b:visible').length==0){//判断全没选
            $(this).parents('tr').find('.table_item .check').children().hide();
        }else{
            $(this).parents('tr').find('.table_item .notok').show().siblings().hide();
        }
    });
    $('.popQx').delegate('.table .handle .check','click',function(){
        if($(this).find('.ok').is(':hidden')){
            $(this).find('.ok').show();
        }else{
            $(this).find('.ok').hide();
        }
        if($(this).parents('tr').find('.content_item').length==0){
            if($(this).parents('.handle').find('.check .ok:hidden').length==0){//判断全选
                $(this).parents('tr').find('.table_item .ok').show().siblings().hide();
            }else if($(this).parents('.handle').find('.check .ok:hidden').length==$(this).parents('.handle').children().length){//判断全没选
                $(this).parents('tr').find('.table_item .check').children().hide();
            }else{
                $(this).parents('tr').find('.table_item .notok').show().siblings().hide();
            }
        }else{
            if($(this).parents('.handle').find('.check .ok:hidden').length==0){//判断全选
                $(this).parents('ul').find('.content_item .ok').show().siblings().hide();
            }else if($(this).parents('.handle').find('.check .ok:hidden').length==$(this).parents('.handle').children().length){//判断全没选
                $(this).parents('ul').find('.content_item .check').children().hide();
            }else{
                $(this).parents('ul').find('.content_item .notok').show().siblings().hide();
            }

            if($(this).parents('tr').find('.content_item .ok:visible').length==$(this).parents('tr').find('.content_item').length){//判断全选
                $(this).parents('tr').find('.table_item .ok').show().siblings().hide();
            }else if($(this).parents('tr').find('.content_item b:visible').length==0){//判断全没选
                $(this).parents('tr').find('.table_item .check').children().hide();
            }else{
                $(this).parents('tr').find('.table_item .notok').show().siblings().hide();
            }
        }
    });
    //成员管理弹窗
    $('.popCy').delegate('.cy_member .persons_del','click',function(){
        var val_id = $(this).prev().val();
        $.ajax({
            url:'/admin.php/Index/install_supervise_del',
            type:'post',
            data:{mg_id:val_id},
            success:function(msg){}
        })
        $(this).parent().remove();
    });
    $('.popCy').delegate('.txt_cb .member_btn','click',function(){
        if($(this).prev().val()){
            $.ajax({
                url:'/admin.php/Index/install_supervise_add',
                type:'post',
                data:{mg_name:$(this).prev().val()},
                success:function(msg){
                    if(msg == 'ok'){
                        var str = $(this).prev().val();
                    }else{
                        var str = '请填写拼音';
                    }
                    var html='<b class="persons"><input type="text" class="persons_ps" value="'+
                        str+'"/><i class="persons_del"></i></b>';
                    $('.popCy .cy_member').append(html);
                }
            })
        }
    });
    //栏目权限弹窗
    $('.popLm').delegate('.table thead .check','click',function(){
        if($(this).find('.ok').is(':hidden')){
            $(this).find('.ok').show().siblings().hide();
            $('.popLm .table tbody .check .ok').show().siblings().hide();
        }else{
            $(this).children().hide();
            $('.popLm .table tbody .check').children().hide();
        }
    });
    $('.popLm').delegate('.table tbody td:first-child .check','click',function(){
        if($(this).find('.ok').is(':hidden')){
            $(this).find('.ok').show().siblings().hide();
            $(this).parents('tr').find('td:not(:first-child) .check .ok').show();
        }else{
            $(this).parents('tr').find('.check').children().hide();
        }
        if($('.popLm .table tbody td:first-child .check .ok:visible').length==$('.popLm .table tbody>tr').length){//判断全选
            $('.popLm .table thead .check').find('.ok').show().siblings().hide();
        }else if($('.popLm .table tbody td:first-child .check b:visible').length==0){//判断全没选
            $('.popLm .table thead .check').children().hide();
        }else{
            $('.popLm .table thead .check').find('.notok').show().siblings().hide();
        }
    });
    $('.popLm').delegate('.table tbody td:not(:first-child) .check','click',function(){
        if($(this).find('.ok').is(':hidden')){
            $(this).find('.ok').show();
        }else{
            $(this).find('.ok').hide();
        }
        //判断本行全选
        if($(this).parents('tr').find('td:not(:first-child) .check .ok:visible').length==$(this).parents('tr').find('td:not(:first-child) .check').length){//判断全选
            $(this).parents('tr').find('td:first-child .check .ok').show().siblings().hide();
        }else if($(this).parents('tr').find('td:not(:first-child) .check .ok:visible').length==0){//判断全没选
            $(this).parents('tr').find('td:first-child .check').children().hide()
        }else{
            $(this).parents('tr').find('td:first-child .check .notok').show().siblings().hide();
        }
        //判断所有行全选
        if($('.popLm .table tbody td:first-child .check .ok:visible').length==$('.popLm .table tbody>tr').length){
            $('.popLm .table thead .check').find('.ok').show().siblings().hide();
        }else if($('.popLm .table tbody td:first-child .check b:visible').length==0){
            $('.popLm .table thead .check').children().hide();
        }else{
            $('.popLm .table thead .check').find('.notok').show().siblings().hide();
        }
    });
    /////////04律师管理界面内容展示部分鼠标滑过和选中事件JS(04)
    //鼠标滑过事件
    $('.lawyersList_tab>tbody>tr').mouseover(function(){
        $(this).css('background-color','#f7f7f7');
    }).mouseout(function(){
        if($(this).children('td:first-child').children('input').is(':checked')){
            $(this).css('background-color','#f1f8e7');
        }else{
            $(this).css('background-color','#ffffff');
        }
    });
    //复选框选中事件
    $('.lawyersList_tab>tbody>tr>td:first-child>input').click(function(){
        if($(this).is(':checked')){
            $(this).parents('tr').css('background-color','#f1f8e7');
        }
    });
    //点击排序复选框，全部选中事件
    $('.lawyersList_tab>thead>tr>td:first-child>input').change(function(){
        if($(this).is(':checked')){
            $('.lawyersList_tab>tbody>tr>td:first-child>input').each(function(){
                this.checked='true';
                $(this).parent().parent().css('background-color','#f1f8e7');
            });
        }else{
            $('.lawyersList_tab>tbody>tr>td:first-child>input')
                .removeAttr('checked')
                .parent().parent().css('background-color','#ffffff');
        }
    });
    //根据状态值的不同，显示不同颜色
    $('.lawyersList_tab>tbody>tr>td:nth-child(11)>span').each(function(){
        if(!(this.innerText=='合作中')){
            this.style.color='#333333';
        }
    });
    //添加律师界面表单验证JS

    //律师管理，订单详情信息界面订单状态颜色控制
    $('.orderInformation_main>table>tbody>tr>td:nth-child(9)').each(function(){
        if(this.innerText=='未付款'){
            this.style.color='#ff0000';
        }else if(this.innerText=='服务中'){
            this.style.color='#0c7c7c';
        }
    });
    //点击已完成/未完成订单切换订单展示界面
    $('.orderInformation_tit>span').click(function(){
        $(this).addClass('span_click').siblings('span').removeClass('span_click');
        $('.orderInformation_main>table>tbody').hide();
        $('.orderInformation_main>table>tbody').eq($(this).index()).show();
    });
    /////////05 法律客服
    //订单操作管理订单切换
    $('.orderOperation_main .orderOperation_tit>div').click(function(){
        $('.orderOperation_main .orderOperation_sjx>div').eq($(this).index()).show().siblings().hide();
        $('.orderOperation_main>table tbody').eq($(this).index()).show().siblings('tbody').hide();
    });
    //批量删除操作
    $('#orderDelAll').click(function(){
        $('#popDelAll').show();
    });
    //单个订单删除
    $('.orderOperation_main .orderOperation_tab_sc').click(function(){
        $('#popDel').show();
    });
    //批量合并操作
    $('#delMove').click(function(){
        $('#popMergeAll').show();
    });
    $('.article_manager .merge').click(function(){
        $('#popMerge').show();
    });
    //受理交易纠纷
    $('.orderOperation_main .orderOperation_tab_accept').click(function(){
        $('#popAccept').show();
    });
    //退回交易纠纷
    $('.orderOperation_main .orderOperation_tab_back').click(function(){
        $('#popBack').show();
    });
    //批量选择等待批量删除操作
    $('.orderOperation_main>.table .thead td:first-child input').click(function(){
        if($(this).is(':checked')){
            $('.orderOperation_main>.table tbody:visible td:first-child input').each(function(){
                this.checked='true';
            });
        }else{
            $('.orderOperation_main>.table tbody:visible td:first-child input').each(function(){
                this.checked='';
            });
        }
    });
    ///////////////////08文章管理页面
    //添加文章
    $('#relatedBtn').click(function(){
        $(this).next('#relatedFile').click();
    });
    $('#relatedFile').change(function(event){
        if(this.value){
            for(var i= 0,m=[];i<this.files.length;i++){
                m.push(this.files[0].name);
            }
            $('#showFileName').val(m.join());
        }else{
            $('#showFileName').val('');
        }
    });
    //添加图片
    $('#relatedImgBtn').click(function(){
        $(this).next('#relatedImg').click();
    });
    $('#relatedImg').change(function(event){
        if(this.value){
            for(var i= 0,m=[];i<this.files.length;i++){
                m.push(this.files[0].name);
            }
            $('#showImgName').val(m.join());
        }else{
            $('#showImgName').val('');
        }
    });
    /*
    * 我的面板页面  修改密码时原密码的验证
    * */
    $('#oldPwd').blur(function(){
        mainTest.oldPwdValidate();
    });
    $('#newPwd').blur(function(){
        mainTest.newPwdValidate();
    });
    $('#newPwdOk').blur(function(){
        mainTest.newPwdOkValidate();
    });
    $('#oldPwd,#newPwd,#newPwdOk').focus(function(){
        $(this).next().html('');
    });
////////////受理合作渠道弹窗
    $('.install .content .pass').click(function(){
        $('#popCase').show();
    });
});

















