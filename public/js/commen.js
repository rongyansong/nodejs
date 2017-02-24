/**
 * Created by Administrator on 2017/1/11 0011.
 */
(function (doc, win) {
    // �ֱ���Resolution����
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    // һ���������ڲ�ͬ��Ļ����ʾЧ����һ����Ҫ����devicePixelRatio���޸�meta��ǩ��scale,Ҫע�������meta��ǩ
    (function () {
        var dpr = scale = 1;
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS�£�����2��3��������2���ķ������������1������
            if (devicePixelRatio >= 3) {
                dpr = 3;
            } else if (devicePixelRatio >= 2) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // �����豸�£��Ծ�ʹ��1���ķ���
            dpr = 1;
        }
        scale = 1 / dpr;
        //
        var metaEl = "";
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    })();
})(document, window);
//
//css���������ʾ
//��ȡ�����ҳ��ɼ��߶ȺͿ��
var _PageHeight = document.documentElement.clientHeight,
    _PageWidth = document.documentElement.clientWidth;

//����loading����붥�����󲿵ľ��루loading��Ŀ��Ϊ215px���߶�Ϊ61px��
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
    _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;

//����gif��ַ
var Loadimagerul = "/Content/LoadJs/Image/loading.gif";

//��ҳ��δ�������֮ǰ��ʾ��loading Html�Զ�������
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width:100px;; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff url(' + Loadimagerul + ') no-repeat scroll 5px 12px; border: 2px solid #95B8E7; color: #696969; font-family:\'Microsoft YaHei\';">����������...</div></div>';

//����loadingЧ��
document.write(_LoadingHtml);

//��������״̬�ı�
document.onreadystatechange = completeLoading;

//����״̬Ϊcompleteʱ�Ƴ�loadingЧ��
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
    }
}