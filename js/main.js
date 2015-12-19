window.onload = function() {

	var oHeader = $('header');
	var oNav = $('nav');
	var oArrow = $('arrow');
	var oContent = $('content');
	var oList = $('list');
	var aLiNav = oNav.getElementsByTagName('li');
	var aLiList = getByClass(oList, 'liList');
	var aDivList = getByClass(oList, 'divList');
	var oMenu = $('menu');
	var aLiMenu = oMenu.getElementsByTagName('li');
	var oMusic = $('music');
	var oAudio = $('audio1');
	var oLoading = $('loading');

	var oHomeContent = $('homeContent');
	var oHomeContent1 = getByClass(oHomeContent,'homeContent1')[0];
	var oHomeContent2 = getByClass(oHomeContent,'homeContent2')[0];

	var oPagesContent = $('pagesContent');
	var oPagesContent3 = getByClass(oPagesContent,'pagesContent3')[0];

	var oMoveContent = $('moveContent');
	var oMoveContent2 = getByClass(oMoveContent,'moveContent2')[0];

	var oGridContent = $('gridContent');
	var oGridContent3 = getByClass(oGridContent,'gridContent3')[0];

	var oCurveContent = $('curveContent');
	var oCurveContent3 = getByClass(oCurveContent,'curveContent3')[0];

	var iNow = 0;
	var prevIndex = 0;
	var iContentHeight = 0;

	showLoading();
	contentAuto();
	listContentAuto();
	bindNav();
	mouseWheel();
	homeContent();
	pagesContent();
	moveContent();
	gridContent();
	curveContent();
	showMusic();

	window.onresize = fnResize;

	//页面加载进入动画
	function showLoading() {
		var oSpan = oLoading.getElementsByTagName('span')[0];
		var aDiv = oLoading.getElementsByTagName('div');
		var oNow = 0
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png','show1.jpg','show2.jpg','show3.jpg','show4.jpg'];
		for (var i = 0; i < arr.length; i++) {
			var objImg = new Image();
			objImg.src = 'images/' + arr[i];
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
			oLoading.parentNode.removeChild(oLoading);
			oMusic.onclick();
			cjAnimate[0].inAn();
			aLiNav[0].btn = false;
			aLiMenu[0].btn = false;
		}
	}

	//导航条和右边按钮移入效果
	function bindNav() {
		var oDiv = aLiNav[0].getElementsByTagName('div')[0];
		oDiv.style.width = '100%';
		oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth / 2 - oArrow.offsetWidth / 2 + 'px';

		for (var i = 0; i < aLiNav.length; i++) {
			aLiNav[i].index = i;
			aLiNav[i].btn = true;
			aLiNav[i].onmousedown = function() {
				if(this.btn == true) {
					for(var i = 0; i < aLiNav.length; i++) {
						if(i!=this.index) {
							aLiNav[i].btn = true;
						}
					}
					prevIndex = iNow;
					iNow = this.index; //将iNow和索引联系起来
					toMove(this.index);
				}
				this.btn = false;
			};
		};

		for (var i = 0; i < aLiMenu.length; i++) {
			aLiMenu[i].index = i;
			aLiMenu[i].btn = true;
			aLiMenu[i].onmousedown = function() {
				if(this.btn == true) {
					for(var i = 0; i < aLiNav.length; i++) {
						if(i!=this.index) {
							aLiMenu[i].btn = true;
						}
					}
					prevIndex = iNow;
					iNow = this.index; //将iNow和索引联系起来
					toMove(this.index);
				}
				this.btn = false;
			};
		};
	}

	//导航条移入运动
	function toMove(index) {

		for (var i = 0; i < aLiNav.length; i++) {
			var oDiv = aLiNav[i].getElementsByTagName('div')[0];
			oDiv.style.width = '';
		};
		var oDiv = aLiNav[index].getElementsByTagName('div')[0];
		oDiv.style.width = '100%'; //当前文字显示
		//当前箭头移动
		oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth / 2 - oArrow.offsetWidth / 2 + 'px';
		oList.style.top = -index * iContentHeight + 'px';
		for (var i = 0; i < aLiMenu.length; i++) {
			aLiMenu[i].className = '';
		}
		aLiMenu[index].className = 'active';
		if (cjAnimate[index].inAn){
			cjAnimate[index].inAn();
		}
		if (cjAnimate[prevIndex].outAn){
			cjAnimate[prevIndex].outAn();
		}
	}

	//当前模块的高度
	function contentAuto() {
		iContentHeight = viewHeight() - oHeader.offsetHeight;
		oContent.style.height = iContentHeight + 'px';
		for (var i = 0; i < aLiList.length; i++) {
			aLiList[i].style.height = iContentHeight + 'px';
		}
		oList.style.top = -iNow * iContentHeight + 'px';
	}

	//模块内容边距自动
	function listContentAuto() {
		var mt = (iContentHeight - 520) / 2;
		for (var i = 0; i < aDivList.length; i++) {
			aDivList[i].style.marginTop = mt + 'px';
		}
	}

	//屏幕分辨率改变
	function fnResize() {
		contentAuto();
		listContentAuto();
		toMove(iNow);
	}

	//滚轮操作
	function mouseWheel() {
		var btn = true;
		var timer = null;
		if (oContent.addEventListener) {
			oContent.addEventListener('DOMMouseScroll', function(ev) {
				var ev = ev || window.event;
				clearInterval(timer);
				timer = setTimeout(function() {
					toChange(ev);
				}, 200)
			}, false);
		}
		oContent.onmousewheel = function(ev) {
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
			if ((iNow == 0 && !btn) || (iNow == aLiList.length-1 && btn)) {
				return ;
			}
			prevIndex = iNow;
			if (btn) { // ↓
				if (iNow != aLiList.length - 1) {
					iNow++;
				}
				toMove(iNow);
			} else { // ↑
				if (iNow != 0) {
					iNow--;
				}
				toMove(iNow);
			}

			if (ev.preventDefault) {
				ev.preventDefault();
			} else {
				return false;
			}
		}
	}

	//CSS3轮播图
	function homeContent() {
		//oHomeContent1
		//oHomeContent2
		var aLi1 = oHomeContent1.getElementsByTagName('li');
		var aLi2 = oHomeContent2.getElementsByTagName('li');
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
		oHomeContent1.onmouseover = function() {
			clearInterval(timer);
		}
		oHomeContent1.onmouseout = function() {
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
	}


	//生成movecontent2内容
	function moveContent() {
		//moveContent2
		var data = [
			{ "img": "images/worksimg1.jpg", "text": "keyframes"},
			{ "img": "images/worksimg2.jpg", "text": "animation"},
			{ "img": "images/worksimg3.jpg", "text": "transform perspective"},
			{ "img": "images/worksimg4.jpg", "text": "rotate translate transition"}
		];
		for(var i = 0; i < data.length; i++){
			var oDivParent = document.createElement('div');
			oDivParent.className = 'moveImgParent';
			oDivParent.innerHTML = '<img class="moveImg" src="' + (data[i].img) + '" ><div class="moveImgMark"><span>' + (data[i].text) + '</span><div></div></div>' ;
			oMoveContent2.appendChild(oDivParent);
		}
	}

	//生成翻页内容
	function pagesContent() {
		//oPagesContent3
		var data = [
			{"img":"images/icon_1.png","text":"滚轮操作：onmousewheel DOMMouseScroll"},
			{"img":"images/icon_2.png","text":"获取class，getByClass封装"},
			{"img":"images/icon_3.png","text":"可视区宽高获取：clientWidth"},
			{"img":"images/icon_4.png","text":"统一的前缀设置：setStyle"},
			{"img":"images/icon_5.png","text":"入场与出场的设置：inAn outAn"},
			{"img":"images/icon_6.png","text":"曲线算法：sin与单位圆"},
			{"img":"images/icon_7.png","text":"数据的创建：{}与createElement"},
			{"img":"images/icon_8.png","text":"loading效果：new Image"},
			{"img":"images/icon_9.png","text":"CSS3事件：transitionend"},
			{"img":"images/icon_10.png","text":"canvas操作：getContext(\"2d\")"},
			{"img":"images/icon_11.png","text":"音乐播放：play pause"},
			{"img":"images/icon_12.png","text":"keyframes animation transform"}
		]
		pagesCreate();
		function pagesCreate() {
			var w = 120;
			for (var i = 0; i < 5; i++) {
				var oLine = document.createElement('div');
				oLine.className = 'pagesLine';
				oLine.style.left = w * i + 'px';
				oPagesContent3.appendChild(oLine);
			}
			for (var i = 0; i < data.length; i++) {
				var oDiv = document.createElement('div');
				oDiv.className = 'pagesLogo';
				oDiv.innerHTML = '<div class="pagesBefore" style="background-image:url('+ (data[i].img) +');"></div>' + '<div class="pagesAfter">'+ (data[i].text) +'</div>';
				oPagesContent3.appendChild(oDiv);
			}
		}
	}

	//万花筒效果
	function gridContent() {
		//oGridContent3
		var aUl = oGridContent3.getElementsByTagName('ul');
		var aSpan = oGridContent3.getElementsByTagName('span');

		for (var i = 0; i < aUl.length; i++) {
			gridChange(aUl[i],aSpan[i]);
		}

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
	}

	//canvas气泡效果
	function curveContent() {
		//oCurveContent3
		var aLi = oCurveContent3.getElementsByTagName('li');
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
			oCurveContent3.appendChild(oUl);
		}
		function bindList() {
			oCurveContent3.onmouseleave  = function() {
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
				oCurveContent3.appendChild(oC);
				bindCanvas();
			}
		}
		function removeCanvas() {
			clearInterval(timer1);
			clearInterval(timer2);
			oCurveContent3.removeChild(oC);
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
	}

	//切场动画
	var cjAnimate = [
		{
			inAn : function() {
				oHomeContent1.style.opacity = 1;
				oHomeContent2.style.opacity = 1;
				setStyle(oHomeContent1,'transform','translate(0,0)');
				setStyle(oHomeContent2,'transform','translate(0,0)');
			},
			outAn : function() {
				oHomeContent1.style.opacity = 0;
				oHomeContent2.style.opacity = 0;
				setStyle(oHomeContent1,'transform','translate(0,-150px)');
				setStyle(oHomeContent2,'transform','translate(0,100px)');
			}
		},
		{
			inAn : function() {
				var oPlane1 = getByClass(oPagesContent,'plane1')[0];
				var oPlane2 = getByClass(oPagesContent,'plane2')[0];
				var oPlane3 = getByClass(oPagesContent,'plane3')[0];
				setStyle(oPlane1,'transform','translate(0,0)');
				setStyle(oPlane2,'transform','translate(0,0)');
				setStyle(oPlane3,'transform','translate(0,0)');
			},
			outAn : function() {
				var oPlane1 = getByClass(oPagesContent,'plane1')[0];
				var oPlane2 = getByClass(oPagesContent,'plane2')[0];
				var oPlane3 = getByClass(oPagesContent,'plane3')[0];
				setStyle(oPlane1,'transform','translate(-200px,-200px)');
				setStyle(oPlane2,'transform','translate(-200px,200px)');
				setStyle(oPlane3,'transform','translate(200px,-200px)');
			}
		},
		{
			inAn : function() {
				var oPencil1 = getByClass(oMoveContent,'pencil1')[0];
				var oPencil2 = getByClass(oMoveContent,'pencil2')[0];
				var oPencil3 = getByClass(oMoveContent,'pencil3')[0];
				setStyle(oPencil1,'transform','translate(0,0)');
				setStyle(oPencil2,'transform','translate(0,0)');
				setStyle(oPencil3,'transform','translate(0,0)');
			},
			outAn : function() {
				var oPencil1 = getByClass(oMoveContent,'pencil1')[0];
				var oPencil2 = getByClass(oMoveContent,'pencil2')[0];
				var oPencil3 = getByClass(oMoveContent,'pencil3')[0];
				setStyle(oPencil1,'transform','translate(0,-200px)');
				setStyle(oPencil2,'transform','translate(0,200px)');
				setStyle(oPencil3,'transform','translate(0,200px)');
			}
		},
		{
			inAn : function() {
				var oGridImg = getByClass(oGridContent,'gridImg');
				setStyle(oGridImg[0],'transform','rotate(0)');
				setStyle(oGridImg[1],'transform','rotate(0)');
			},
			outAn : function() {
				var oGridImg = getByClass(oGridContent,'gridImg');
				setStyle(oGridImg[0],'transform','rotate(45deg)');
				setStyle(oGridImg[1],'transform','rotate(-45deg)');
			}
		},
		{
			inAn : function() {
				var oCurveContent1 = getByClass(oCurveContent,'curveContent1')[0];
				var oCurveContent2 = getByClass(oCurveContent,'curveContent2')[0];
				oCurveContent1.style.opacity = 1;
				oCurveContent2.style.opacity = 1;
				setStyle(oCurveContent1,'transform','translate(0,0)');
				setStyle(oCurveContent2,'transform','translate(0,0)');
			},
			outAn : function() {
				var oCurveContent1 = getByClass(oCurveContent,'curveContent1')[0];
				var oCurveContent2 = getByClass(oCurveContent,'curveContent2')[0];
				oCurveContent1.style.opacity = 0;
				oCurveContent2.style.opacity = 0;
				setStyle(oCurveContent1,'transform','translate(-200px,0)');
				setStyle(oCurveContent2,'transform','translate(200px,0)');
			}
		}
	];
	for(var i = 0; i < cjAnimate.length; i++) {
		cjAnimate[i].outAn();
	}

	//音乐播放
	function showMusic() {
		var onOff = true;
		oMusic.onclick = function() {
			if (onOff) {
				this.style.background = 'url(images/musicon.gif)';
				oAudio.play();
			} else {
				this.style.background = 'url(images/musicoff.gif)';
				oAudio.pause();
			}
			onOff = !onOff;
		}
	}

	//返回选择id的元素
	function $(id) {
		return document.getElementById(id);
	}

	//返回可视区的宽度
	function viewWidth() {
		return window.innerWidth || document.documentElement.clientWidth; //兼容标准浏览器和非标准浏览器
	}

	//返回可视区的宽度
	function viewHeight() {
		return window.innerHeight || document.documentElement.clientHeight; //兼容标准浏览器和非标准浏览器
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


}