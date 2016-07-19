/**
 * [mainjs description]
 * @Author   v_yuchangshuang@baidu.com
 * @DateTime 2016-07-13T13:35:32+0800
 */

var iNow = 0;
var prevIndex = 0;
var iContentHeight = 0;

var M = {
	oHeader: $('header'),
	oNav: $('nav'),
	oArrow: $('arrow'),
	oContent: $('content'),
	oList: $('list'),
	aLiNav: $('nav').getElementsByTagName('li'),
	oMenu: $('menu'),
	oMusic: $('music'),
	oAudio: $('audio1'),
	oLoading: $('loading'),

	oHomeContent: $('homeContent'),

	oPagesContent: $('pagesContent'),

	oMoveContent: $('moveContent'),

	oGridContent: $('gridContent'),

	oCurveContent: $('curveContent'),
	
	/**
	 * [cjAnimate description]
	 * @type {Array}
	 * 切场动画
	 */
	cjAnimate: [
		{
			inAn : function() {
				M.oHomeContent1.style.opacity = 1;
				M.oHomeContent2.style.opacity = 1;
				setStyle(M.oHomeContent1,'transform','translate(0,0)');
				setStyle(M.oHomeContent2,'transform','translate(0,0)');
			},
			outAn : function() {
				M.oHomeContent1.style.opacity = 0;
				M.oHomeContent2.style.opacity = 0;
				setStyle(M.oHomeContent1,'transform','translate(0,-150px)');
				setStyle(M.oHomeContent2,'transform','translate(0,100px)');
			}
		},
		{
			inAn : function() {
				var oPlane1 = getByClass(M.oPagesContent,'plane1')[0];
				var oPlane2 = getByClass(M.oPagesContent,'plane2')[0];
				var oPlane3 = getByClass(M.oPagesContent,'plane3')[0];
				setStyle(oPlane1,'transform','translate(0,0)');
				setStyle(oPlane2,'transform','translate(0,0)');
				setStyle(oPlane3,'transform','translate(0,0)');
			},
			outAn : function() {
				var oPlane1 = getByClass(M.oPagesContent,'plane1')[0];
				var oPlane2 = getByClass(M.oPagesContent,'plane2')[0];
				var oPlane3 = getByClass(M.oPagesContent,'plane3')[0];
				setStyle(oPlane1,'transform','translate(-200px,-200px)');
				setStyle(oPlane2,'transform','translate(-200px,200px)');
				setStyle(oPlane3,'transform','translate(200px,-200px)');
			}
		},
		{
			inAn : function() {
				var oPencil1 = getByClass(M.oMoveContent,'pencil1')[0];
				var oPencil2 = getByClass(M.oMoveContent,'pencil2')[0];
				var oPencil3 = getByClass(M.oMoveContent,'pencil3')[0];
				setStyle(oPencil1,'transform','translate(0,0)');
				setStyle(oPencil2,'transform','translate(0,0)');
				setStyle(oPencil3,'transform','translate(0,0)');
			},
			outAn : function() {
				var oPencil1 = getByClass(M.oMoveContent,'pencil1')[0];
				var oPencil2 = getByClass(M.oMoveContent,'pencil2')[0];
				var oPencil3 = getByClass(M.oMoveContent,'pencil3')[0];
				setStyle(oPencil1,'transform','translate(0,-200px)');
				setStyle(oPencil2,'transform','translate(0,200px)');
				setStyle(oPencil3,'transform','translate(0,200px)');
			}
		},
		{
			inAn : function() {
				var oGridImg = getByClass(M.oGridContent,'gridImg');
				setStyle(oGridImg[0],'transform','rotate(0)');
				setStyle(oGridImg[1],'transform','rotate(0)');
			},
			outAn : function() {
				var oGridImg = getByClass(M.oGridContent,'gridImg');
				setStyle(oGridImg[0],'transform','rotate(45deg)');
				setStyle(oGridImg[1],'transform','rotate(-45deg)');
			}
		},
		{
			inAn : function() {
				var oCurveContent1 = getByClass(M.oCurveContent,'curveContent1')[0];
				var oCurveContent2 = getByClass(M.oCurveContent,'curveContent2')[0];
				oCurveContent1.style.opacity = 1;
				oCurveContent2.style.opacity = 1;
				setStyle(oCurveContent1,'transform','translate(0,0)');
				setStyle(oCurveContent2,'transform','translate(0,0)');
			},
			outAn : function() {
				var oCurveContent1 = getByClass(M.oCurveContent,'curveContent1')[0];
				var oCurveContent2 = getByClass(M.oCurveContent,'curveContent2')[0];
				oCurveContent1.style.opacity = 0;
				oCurveContent2.style.opacity = 0;
				setStyle(oCurveContent1,'transform','translate(-200px,0)');
				setStyle(oCurveContent2,'transform','translate(200px,0)');
			}
		}
	],

	init: function(){
		// 切场动画全部出场
		for(var i = 0; i < this.cjAnimate.length; i++) {
			this.cjAnimate[i].outAn();
		}
		this.initEvent();
		this.showLoading();
		this.contentAuto();
		this.bindNav();
		this.mouseWheel();
		this.homeContent();
		this.pagesContent();
		this.moveContent();
		this.gridContent();
		this.curveContent();
		this.showMusic();
	},
	/**
	 * [initEvent description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:21:39+0800
	 * @return   {[type]}                  [description]
	 * 绑定事件
	 */
	initEvent: function(){
		var This = this;
		window.onresize = function(){
			This.contentAuto();
			This.toMove(iNow);
		}
	},

	/**
	 * [showLoading description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:11:08+0800
	 * @return   {[type]}                  [description]
	 * 页面加载进入动画
	 */
	showLoading: function() {
		var This = this;
		var oSpan = this.oLoading.getElementsByTagName('span')[0];
		var aDiv = this.oLoading.getElementsByTagName('div');
		var oNow = 0;
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','show1.jpg','show2.jpg','show3.jpg','show4.jpg'];
		for (var i = 0; i < arr.length; i++) {
			var objImg = new Image();
			objImg.src = '../images/works1-images/' + arr[i];
			objImg.onload = function() {
				oNow++;
				oSpan.style.width = oNow/arr.length*100 + '%';
			}
		};
		oSpan.addEventListener('webkitTransitionend',spanChange,false);
		oSpan.addEventListener('transitionend',spanChange,false);
		function spanChange() {
			if(oSpan.style.width == '100%') {
				oSpan.style.display = 'none';
				aDiv[0].style.height = 0;
				aDiv[1].style.height = 0;
			}
		}
		aDiv[0].addEventListener('webkitTransitionend',divChange,false);
		aDiv[1].addEventListener('transitionend',divChange,false);
		function divChange() {
			This.oLoading.parentNode.removeChild(This.oLoading);
			This.oMusic.onclick();
			This.cjAnimate[0].inAn();
			This.aLiNav[0].btn = false;
			This.aLiMenu[0].btn = false;
		}
	},

	/**
	 * [bindNav description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:12:35+0800
	 * @return   {[type]}                  [description]
	 * 导航条和右边按钮移入效果
	 */
	bindNav: function() {
		var This = this;
		var oDiv = this.aLiNav[0].getElementsByTagName('div')[0];
		oDiv.style.width = '100%';
		this.oArrow.style.left = this.aLiNav[0].offsetLeft + this.aLiNav[0].offsetWidth / 2 - this.oArrow.offsetWidth / 2 + 'px';
		// 导航条移入
		for (var i = 0; i < this.aLiNav.length; i++) {
			this.aLiNav[i].index = i;
			this.aLiNav[i].btn = true;
			this.aLiNav[i].onmousedown = function() {
				if(this.btn == true) {
					for(var i = 0; i < This.aLiNav.length; i++) {
						if(i!=this.index) {
							This.aLiNav[i].btn = true;
						}
					}
					prevIndex = iNow;
					iNow = this.index; //将iNow和索引联系起来
					This.toMove(this.index);
				}
				this.btn = false;
			};
		};
		// 右边按钮移入
		for (var i = 0; i < this.aLiMenu.length; i++) {
			this.aLiMenu[i].index = i;
			this.aLiMenu[i].btn = true;
			this.aLiMenu[i].onmousedown = function() {
				if(this.btn == true) {
					for(var i = 0; i < This.aLiNav.length; i++) {
						if(i!=this.index) {
							This.aLiMenu[i].btn = true;
						}
					}
					prevIndex = iNow;
					iNow = this.index; //将iNow和索引联系起来
					This.toMove(this.index);
				}
				this.btn = false;
			};
		};
	},

	/**
	 * [toMove description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:17:21+0800
	 * @param    {[type]}                  index [description]
	 * @return   {[type]}                        [description]
	 * 导航条移入运动
	 */
	toMove: function(index) {

		for (var i = 0; i < this.aLiNav.length; i++) {
			var oDiv = this.aLiNav[i].getElementsByTagName('div')[0];
			oDiv.style.width = '';
		};
		var oDiv = this.aLiNav[index].getElementsByTagName('div')[0];
		oDiv.style.width = '100%'; //当前文字显示
		//当前箭头移动
		this.oArrow.style.left = this.aLiNav[index].offsetLeft + this.aLiNav[index].offsetWidth / 2 - this.oArrow.offsetWidth / 2 + 'px';
		this.oList.style.top = -index * iContentHeight + 'px';
		for (var i = 0; i < this.aLiMenu.length; i++) {
			this.aLiMenu[i].className = '';
		}
		this.aLiMenu[index].className = 'active';
		if (this.cjAnimate[index].inAn){
			this.cjAnimate[index].inAn();
		}
		if (this.cjAnimate[prevIndex].outAn){
			this.cjAnimate[prevIndex].outAn();
		}
	},

	/**
	 * [contentAuto description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:22:08+0800
	 * @return   {[type]}                  [description]
	 * 当前模块的高度和模块边距自动
	 */
	contentAuto: function() {
		// 当前模块的高度
		iContentHeight = this.viewHeight() - this.oHeader.offsetHeight;
		this.oContent.style.height = iContentHeight + 'px';
		for (var i = 0; i < this.aLiList.length; i++) {
			this.aLiList[i].style.height = iContentHeight + 'px';
		}
		this.oList.style.top = -iNow * iContentHeight + 'px';

		// 模块内容边距自动
		var mt = (iContentHeight - 520) / 2;
		for (var i = 0; i < this.aDivList.length; i++) {
			this.aDivList[i].style.marginTop = mt + 'px';
		}
	},

	/**
	 * [mouseWheel description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:26:46+0800
	 * @return   {[type]}                  [description]
	 * 滚轮操作
	 */
	mouseWheel: function () {
		var btn = true;
		var timer = null;
		var This = this;
		if (this.oContent.addEventListener) {
			this.oContent.addEventListener('DOMMouseScroll', function(ev) {
				var ev = ev || window.event;
				clearInterval(timer);
				timer = setTimeout(function() {
					toChange(ev);
				}, 200)
			}, false);
		}
		this.oContent.onmousewheel = function(ev) {
			var ev = ev || window.event;
			clearInterval(timer);
			timer = setTimeout(function() {
				toChange(ev);
			}, 200);
		};

		function toChange(ev) {
			if (ev.detail) { //火狐
				btn = ev.detail > 0 ? true : false;
			} else { //谷歌
				btn = ev.wheelDelta < 0 ? true : false;
			}
			if ((iNow == 0 && !btn) || (iNow == This.aLiList.length-1 && btn)) {
				return ;
			}
			prevIndex = iNow;
			if (btn) { // ↓
				if (iNow != This.aLiList.length - 1) {
					iNow++;
				}
				This.toMove(iNow);
			} else { // ↑
				if (iNow != 0) {
					iNow--;
				}
				This.toMove(iNow);
			}

			if (ev.preventDefault) {
				ev.preventDefault();
			} else {
				return false;
			}
		}
	},

	/**
	 * [homeContent description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:31:00+0800
	 * @return   {[type]}                  [description]
	 * CSS3轮播图
	 */
	homeContent: function() {
		//oHomeContent1
		//oHomeContent2
		var This = this;
		var aLi1 = this.oHomeContent1.getElementsByTagName('li');
		var aLi2 = this.oHomeContent2.getElementsByTagName('li');
		var oldIndex = 0;
		var iNowMove = 0;
		var timer = null;
		clearInterval(timer);
		for (var i = 0; i < aLi2.length; i++) {
			aLi2[i].index = i;
			aLi2[i].onclick = function() {
				for (var i = 0; i < aLi2.length; i++) {
					aLi2[i].className = '';
				}
				this.className = 'active';
				if (oldIndex < this.index) { //从左向右
					aLi1[oldIndex].className = 'leftHide';
					aLi1[this.index].className = 'rightShow';
				} else if (oldIndex > this.index) { //从右向左
					aLi1[oldIndex].className = 'rightHide';
					aLi1[this.index].className = 'leftShow';
				}
				oldIndex = this.index;
				iNowMove = this.index;
			}
		}
		
		timer = setInterval(change, 4000);
		for (var i = 0; i < aLi2.length; i++) {
			aLi2[i].onmouseover = function() {
				clearInterval(timer);
			}
			aLi2[i].onmouseout = function() {
				timer = setInterval(change, 4000);
			}
		}
		This.oHomeContent1.onmouseover = function() {
			clearInterval(timer);
		}
		This.oHomeContent1.onmouseout = function() {
			timer = setInterval(change, 4000);
		}

		function change() {
			iNowMove++;
			if(iNowMove == aLi2.length) {
				iNowMove = 0;
			}
			for (var i = 0; i < aLi2.length; i++) {
				aLi2[i].className = '';
			}
			aLi2[iNowMove].className = 'active';
			aLi1[oldIndex].className = 'leftHide';
			aLi1[iNowMove].className = 'rightShow';
			oldIndex = iNowMove;
		}
	},

	/**
	 * [moveContent description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:34:29+0800
	 * @return   {[type]}                  [description]
	 * 生成movecontent2内容
	 */
	moveContent: function() {
		//moveContent2
		var data = [
			{ "img": "../images/works1-images/worksimg1.jpg", "text": "keyframes"},
			{ "img": "../images/works1-images/worksimg2.jpg", "text": "animation"},
			{ "img": "../images/works1-images/worksimg3.jpg", "text": "transform perspective"},
			{ "img": "../images/works1-images/worksimg4.jpg", "text": "rotate translate transition"}
		];
		for(var i = 0; i < data.length; i++){
			var oDivParent = document.createElement('div');
			oDivParent.className = 'moveImgParent';
			oDivParent.innerHTML = '<img class="moveImg" src="' + (data[i].img) + '" ><div class="moveImgMark"><span>' + (data[i].text) + '</span><div></div></div>' ;
			this.oMoveContent2.appendChild(oDivParent);
		}
	},

	/**
	 * [pagesContent description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:35:13+0800
	 * @return   {[type]}                  [description]
	 * 生成翻页内容
	 */
	pagesContent: function() {
		//oPagesContent3
		var This = this;
		var data = [
			{"img":"../images/works1-images/icon_1.png","text":"滚轮操作：onmousewheel DOMMouseScroll"},
			{"img":"../images/works1-images/icon_2.png","text":"获取class，getByClass封装"},
			{"img":"../images/works1-images/icon_3.png","text":"可视区宽高获取：clientWidth"},
			{"img":"../images/works1-images/icon_4.png","text":"统一的前缀设置：setStyle"},
			{"img":"../images/works1-images/icon_5.png","text":"入场与出场的设置：inAn outAn"},
			{"img":"../images/works1-images/icon_6.png","text":"曲线算法：sin与单位圆"},
			{"img":"../images/works1-images/icon_7.png","text":"数据的创建：{}与createElement"},
			{"img":"../images/works1-images/icon_8.png","text":"loading效果：new Image"},
			{"img":"../images/works1-images/icon_9.png","text":"CSS3事件：transitionend"},
			{"img":"../images/works1-images/icon_10.png","text":"canvas操作：getContext(\"2d\")"},
			{"img":"../images/works1-images/icon_11.png","text":"音乐播放：play pause"},
			{"img":"../images/works1-images/icon_12.png","text":"keyframes animation transform"}
		]
		pagesCreate();
		function pagesCreate() {
			var w = 120;
			for (var i = 0; i < 5; i++) {
				var oLine = document.createElement('div');
				oLine.className = 'pagesLine';
				oLine.style.left = w * i + 'px';
				This.oPagesContent3.appendChild(oLine);
			}
			for (var i = 0; i < data.length; i++) {
				var oDiv = document.createElement('div');
				oDiv.className = 'pagesLogo';
				oDiv.innerHTML = '<div class="pagesBefore" style="background-image:url('+ (data[i].img) +');"></div>' + '<div class="pagesAfter">'+ (data[i].text) +'</div>';
				This.oPagesContent3.appendChild(oDiv);
			}
		}
	},

	/**
	 * [gridContent description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:40:50+0800
	 * @return   {[type]}                  [description]
	 * 万花筒效果
	 */
	gridContent: function() {
		//oGridContent3
		var This = this;
		var aUl = this.oGridContent3.getElementsByTagName('ul');
		var aSpan = this.oGridContent3.getElementsByTagName('span');

		for (var i = 0; i < aUl.length; i++) {
			gridChange(aUl[i],aSpan[i]);
		}

		// 万花筒变换
		function gridChange(ul,span) {
			var w = ul.offsetWidth/2;
			var h = ul.offsetHeight/2;
			var src = ul.dataset.src;
			for (var i = 0; i < 4; i++) {
				var oLi = document.createElement('li');
				oLi.style.width = w + 'px';
				oLi.style.height = h + 'px';
				var oImg = document.createElement('img');
				oImg.src = src;
				oImg.style.left = -i%2 * w + 'px'; 
				oImg.style.top = -Math.floor(i/2) * h + 'px';
				oImg.oldleft = -i%2 * w;
				oImg.oldtop = -Math.floor(i/2) * h;
				oLi.appendChild(oImg);
				ul.appendChild(oLi);
			}
			var data = [
				{"name":"top","value":h},
				{"name":"left","value":-w*2},
				{"name":"left","value":w},
				{"name":"top","value":-h*2}
			]
			var aImg = ul.getElementsByTagName('img');
			ul.onmouseover = function() {
				for (var i = 0; i < aImg.length; i++) {
					aImg[i].style[data[i].name] = data[i].value + 'px'; 
				}
				setStyle(span,'transform','scale(1)');
			}
			ul.onmouseout = function() {
				for (var i = 0; i < aImg.length; i++) {
					aImg[i].style[data[i].name] = aImg[i]['old' + data[i].name] + 'px';
				}
				setStyle(span,'transform','scale(1.5)');
			} 
		}
	},

	/**
	 * [curveContent description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T14:43:46+0800
	 * @return   {[type]}                  [description]
	 * 万花筒气泡效果
	 */
	curveContent: function() {
		//oCurveContent3
		var aLi = this.oCurveContent3.getElementsByTagName('li');
		var This = this;
		var oC = null;
		var w = 118;
		var h = 300;
		var timer1 = null;
		var timer2 = null;
		curveCreate();
		bindList()
		function curveCreate() {
			var oUl = document.createElement('ul');
			for (var i = 0; i < 8; i++) {
				var oLi = document.createElement('li');
				oLi.style.backgroundPosition = -(i*w) + 'px 0';
				oUl.appendChild(oLi);
			};
			This.oCurveContent3.appendChild(oUl);
		}
		function bindList() {
			This.oCurveContent3.onmouseleave  = function() {
				removeCanvas();
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].style.opacity = '1';
				}
			};

			for (var i = 0; i < aLi.length; i++) {
				aLi[i].index = i;
				aLi[i].onmouseover = function() {
					addCanvas();
					oC.style.left = this.index * w + 'px';
					for (var i = 0; i < aLi.length; i++) {
						aLi[i].style.opacity = '0.5';
					}
					this.style.opacity = '1';
				}
			};
		}
		function addCanvas() {
			if(!oC) {
				oC = document.createElement('canvas');
				oC.id = 'canvasBubble';
				oC.width = w;
				oC.height = h;
				This.oCurveContent3.appendChild(oC);
				bindCanvas();
			}
		}
		function removeCanvas() {
			clearInterval(timer1);
			clearInterval(timer2);
			This.oCurveContent3.removeChild(oC);
			oC = null;
		}
		function bindCanvas(){
			var oGc = oC.getContext('2d');
			var setArr = [];

			timer1 = setInterval(function() {
				oGc.clearRect(0,0,oC.width,oC.height);

				for(var i = 0; i < setArr.length; i++){
					setArr[i].num += 5;
					setArr[i].x = setArr[i].startX - Math.sin(setArr[i].num*Math.PI/180)*setArr[i].step;

					setArr[i].y = setArr[i].startY - (setArr[i].num*Math.PI/180)*setArr[i].step;

					if(setArr[i].y < 100) {
						setArr.splice(i,1);
					}
				}

				for(var i = 0; i < setArr.length; i++){
					oGc.fillStyle = 'rgba(' + setArr[i].c1 + ',' + setArr[i].c2 + ',' + setArr[i].c3 + ',' + setArr[i].c4 + ')';
					oGc.beginPath();
					oGc.moveTo(setArr[i].x,setArr[i].y);
					oGc.arc(setArr[i].x,setArr[i].y,setArr[i].r,0,360*Math.PI/180,false);
					oGc.closePath();
					oGc.fill();
				} 
			}, 1000/60);


			timer2 = setInterval(function(){
				var x = Math.random()*oC.width;
				var y = oC.height - 10;
				var r = Math.random()*6 + 2;
				var c1 = Math.round(Math.random()*255);
				var c2 = Math.round(Math.random()*255);
				var c3 = Math.round(Math.random()*255);
				var c4 = 1;
				var num = 0;
				var step = Math.random()*20 + 10;
				var startX = x;
				var startY = y;
				setArr.push({
					x : x,
					y : y,
					r : r,
					c1 : c1,
					c2 : c2,
					c3 : c3,
					c4 : c4,
					num : num,
					step : step,
					startX : startX,
					startY : startY
				});
			}, 100);
		}
	},

	/**
	 * [showMusic description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T15:26:56+0800
	 * @return   {[type]}                  [description]
	 * 播放音乐
	 */
	showMusic:function() {
		var onOff = true;
		var This = this;
		this.oMusic.onclick = function() {
			if (onOff) {
				this.style.background = 'url(../images/works1-images/musicon.gif)';
				This.oAudio.play();
			} else {
				this.style.background = 'url(../images/works1-images/musicoff.gif)';
				This.oAudio.pause();
			}
			onOff = !onOff;
		}
	},

	/**
	 * [viewWidth description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T13:38:31+0800
	 * @return   {[type]}                  [description]
	 * 返回可视区的宽度
	 */
	viewWidth: function() {
		return window.innerWidth || document.documentElement.clientWidth; //兼容标准浏览器和非标准浏览器
	},

	/**
	 * [viewHeight description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T13:38:45+0800
	 * @return   {[type]}                  [description]
	 * 返回可视区的宽度
	 */
	viewHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight; //兼容标准浏览器和非标准浏览器
	},

	/**
	 * [getByClass description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T13:38:55+0800
	 * @param    {[type]}                  oParent [description]
	 * @param    {[type]}                  sClass  [description]
	 * @return   {[type]}                          [description]
	 * 获取class的方法
	 */
	getByClass: function(oParent, sClass) {
		var aElem = oParent.getElementsByTagName('*');
		var arr = [];
		for (var i = 0; i < aElem.length; i++) {
			if (aElem[i].className == sClass) {
				arr.push(aElem[i]);
			}
		}
		return arr;
	},

	/**
	 * [setStyle description]
	 * @Author   v_yuchangshuang@baidu.com
	 * @DateTime 2016-07-13T13:39:06+0800
	 * @param    {[type]}                  obj   [description]
	 * @param    {[type]}                  attr  [description]
	 * @param    {[type]}                  value [description]
	 * 设置浏览器css3的前缀
	 */
	setStyle: function(obj,attr,value) {
		obj.style[attr] = value;
		obj.style['webkit' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
		obj.style['moz' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
		obj.style['ms' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
		obj.style['o' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	}
};

M.aLiList = getByClass(M.oList, 'liList');
M.aDivList = getByClass(M.oList, 'divList');
M.aLiMenu = M.oMenu.getElementsByTagName('li');
M.oHomeContent1 = getByClass(M.oHomeContent,'homeContent1')[0];
M.oHomeContent2 = getByClass(M.oHomeContent,'homeContent2')[0];
M.oPagesContent3 = getByClass(M.oPagesContent,'pagesContent3')[0];
M.oMoveContent2 = getByClass(M.oMoveContent,'moveContent2')[0];
M.oGridContent3 = getByClass(M.oGridContent,'gridContent3')[0];
M.oCurveContent3 = getByClass(M.oCurveContent,'curveContent3')[0];

function $(id) {
	return document.getElementById(id);
}

//获取class的方法
function getByClass(oParent, sClass) {
	var aElem = oParent.getElementsByTagName('*');
	var arr = [];
	for (var i = 0; i < aElem.length; i++) {
		if (aElem[i].className == sClass) {
			arr.push(aElem[i]);
		}
	}
	return arr;
}

//设置浏览器css3的前缀
function setStyle(obj,attr,value) {
	obj.style[attr] = value;
	obj.style['webkit' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	obj.style['moz' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	obj.style['ms' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	obj.style['o' + attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
}

M.init();
