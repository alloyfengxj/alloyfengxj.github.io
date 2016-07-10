window.onload = function() {
    var oBody = document.getElementsByTagName('body')[0];
    var oLoadingLine = document.getElementById('loadingLine');
    var oLoadingAnimal = document.getElementById('loadingAnimal');
    var oLoadingInner = document.getElementById('loadingInner');
    var oLoading = document.getElementById('loading');
    var oLoadingTop = document.getElementById('loadingTop');
    var oLoadingBottom = document.getElementById('loadingBottom');
    var oClientH = document.documentElement.clientHeight;

    if (oClientH < 643) {
        oBody.style.height = 643 + 'px';
    } else {
        oBody.style.height = oClientH + 'px';
    };
    //oLoadingLine
    move(oLoadingLine, {
        width: 110
    }, {
        duration: 2000, //线
        measure: '%'
    });
    var i = 0;
    move(oLoadingAnimal, {
        left: 110
    }, {
        duration: 3000, //狗
        measure: '%',
        complete: function() {
            oLoadingInner.style.display = 'none';
            move(oLoadingTop, {
                top: -50
            }, {
                duration: 1000, //loadingtop
                measure: '%',
                easing: 'ease-out'
            });
            move(oLoadingBottom, {
                bottom: -50
            }, {
                duration: 1000, //loadingbottom
                measure: '%',
                easing: 'ease-out',
                complete: function() {
                    oLoading.style.display = 'none';
                    fnCover();
                }
            });
        }
    });
    //sub-nav
    var oSub_nav = document.getElementById('subnav');
    var aLi_sub = oSub_nav.getElementsByTagName('li');

    for (var i = 0; i < aLi_sub.length; i++) {
        (function(index) {
            aLi_sub[index].onmouseover = function() {
                var oRoundPic = this.children[0].children[0];
                move(this, { marginTop: -20 }, { duration: 600 });
                move(oRoundPic, { top: -20 }, { duration: 600, easing: 'ease-in' });
                this.style.background = 'rgba(255,255,255,0.7)'
            };
        })(i);
        (function(index) {
            aLi_sub[index].onmouseout = function() {
                var oRoundPic = this.children[0].children[0];
                move(this, { marginTop: 0 }, { duration: 600 });
                move(oRoundPic, { top: 0 }, { duration: 600, easing: 'ease-in' });
                this.style.background = 'rgba(255,255,255,0.4)';
            };
        })(i);
    };

    var oNav = document.getElementById('nav');
    var aLi_nav = oNav.getElementsByTagName('li');
    var oPortfolio = document.getElementById('myPortfolio');
    var aDiv_overval = oBody.children;
    var oIconfont = document.getElementById('iconfont');
    var aLi_oIconfont = oIconfont.getElementsByTagName('li');

    for (var i = 0; i < aLi_sub.length; i++) {
        (function(index) {
            aLi_nav[index + 1].onclick = aLi_sub[index].onclick = function() {
                aLi_oIconfont[0].children[0].innerHTML = '&#xe651;';
                aLi_oIconfont[0].children[0].className = 'icon iconfont';
                aLi_oIconfont[index + 1].children[0].innerHTML = '&#xe621;';
                aLi_oIconfont[index + 1].children[0].className = 'icon iconfont color';
                move(aDiv_overval[index + 3], { top: 0 }, { duration: 500, easing: 'ease-out' })
            };
        })(i);
    };

    //圆环进度条
    /*
     * 执行定时任务
     * id：画布id
     * start：初始百分比
     * end：结束百分比
     * interval：时间间隔
     */
    function StartTimer(id, start, end, interval) {
        window.setTimeout(function() {
            circle(id, start / 100);
            start++;
            if (start < end + 1) {
                StartTimer(id, start, end, interval);
            }
        }, interval);
    }

    function circle(id, percent) {
        var p = (percent * 100).toFixed(0);
        var c = document.getElementById(id);
        var cxt = c.getContext("2d");
        //生成圆形（底圆）
        cxt.fillStyle = "#6C6E69";
        cxt.beginPath();
        cxt.moveTo(0, 0);
        cxt.arc(150, 75, 70, 0, Math.PI * 2, false);
        cxt.closePath();
        cxt.fill();
        //生成扇形
        cxt.fillStyle = "#E87E04";
        cxt.beginPath();
        cxt.moveTo(150, 75);
        if (percent == 1) {
            cxt.arc(150, 75, 70, 0, Math.PI * 2, false);
        } else if (percent == 0) {
            cxt.arc(150, 75, 70, 0, 0, true);
        } else {
            cxt.arc(150, 75, 70, Math.PI, Math.PI + Math.PI * 2 * percent, false);
        }
        cxt.closePath();
        cxt.fill();
        //生成圆形（上层园）
        cxt.fillStyle = "transparent";
        cxt.beginPath();
        cxt.moveTo(150, 75);
        cxt.arc(150, 75, 50, 0, Math.PI * 2, false);
        cxt.closePath();
        cxt.fill();
        //生成中间百分比文字
        cxt.font = "20px arial";
        cxt.fillStyle = "white";
        cxt.fillText(p + "%", 150, 75);
        //  cxt.fillText("0%",160,75);
    }
    //调用圆环进度条
    var oSkillDetails = document.getElementById('skillDetails');
    var aCanvas = oSkillDetails.getElementsByTagName('canvas');

    if (aDiv_overval[4].style.top == 0) {
        StartTimer("Canvas1", 0, 85, 150);
        StartTimer("Canvas2", 0, 65, 200);
        StartTimer("Canvas3", 0, 75, 200);
        StartTimer("Canvas4", 0, 70, 250);
        StartTimer("Canvas5", 0, 70, 250);
        StartTimer("Canvas6", 0, 30, 350);
    };

    // 滚轮函数
    function addEvent(obj, ev, fn) {
        obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent('on' + ev, fn); //后一种IE
    }

    function addWheel(obj, fn) {
        function wheel(ev) {
            var oE = ev || event;

            var bDown = oE.detail ? oE.detail > 0 : oE.wheelDelta < 0; //判断滚轮方向

            fn && fn(bDown);
            oE.preventDefault && oE.preventDefault(); //火狐清除默认样式
            return false;
        }

        if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            obj.addEventListener('DOMMouseScroll', wheel, false); //火狐
        } else {
            addEvent(obj, 'mousewheel', wheel); //IE 谷歌!
        }
    }
    //调整body直接子集的z-index
    for (var i = 2; i < oBody.children.length; i++) {
        (function(index) {
            oBody.children[index].style.zIndex = index;
        })(i);

    };
    //调用滚轮函数
    for (var i = 2; i < oBody.children.length; i++) {
        (function(index) {
            switch (index) {
                case 2:
                    //调用滚轮函数并且改变右边圆圈进度状态
                    addWheel(oBody.children[2], function(bDown) {
                        var next = oBody.children[2].nextElementSibling || oBody.children[1].nextSibling;
                        if (bDown) {
                            //改变右边圆圈进度状态
                            setTimeout(function() {
                                    aLi_oIconfont[0].children[0].innerHTML = '&#xe651;';
                                    aLi_oIconfont[0].children[0].className = 'icon iconfont';
                                    aLi_oIconfont[1].children[0].innerHTML = '&#xe621;';
                                    aLi_oIconfont[1].children[0].className = 'icon iconfont color';
                                }, 500)
                                //页面切换
                            move(next, { top: 0 }, {
                                duration: 700,
                                easing: 'ease-out',
                                complete: function() {
                                    oBody.children[2].style.top = '100%';
                                }
                            });

                        };
                    });

                    break;
                case 6:
                    addWheel(oBody.children[6], function(bDown) {
                        var pre = oBody.children[6].previousElementSibling || oBody.children[6].previousSibling;
                        if (!bDown) {
                            aLi_oIconfont[4].children[0].innerHTML = '&#xe651;';
                            aLi_oIconfont[4].children[0].className = 'icon iconfont';
                            aLi_oIconfont[3].children[0].innerHTML = '&#xe621;';
                            aLi_oIconfont[3].children[0].className = 'icon iconfont color';
                            pre.style.zIndex = index + 1;
                            move(pre, { top: 0 }, {
                                duration: 700,
                                easing: 'ease-out',
                                complete: function() {
                                    oBody.children[6].style.top = '400%';
                                    pre.style.zIndex = index - 1;
                                }
                            });
                        };
                    });
                    break;
                default:
                    addWheel(oBody.children[index], function(bDown) {
                        var next = oBody.children[index].nextElementSibling || oBody.children[1].nextSibling;
                        var pre = oBody.children[index].previousElementSibling || oBody.children[5].previousSibling;
                        if (bDown) {
                            setTimeout(function() {
                                aLi_oIconfont[index - 2].children[0].innerHTML = '&#xe651;';
                                aLi_oIconfont[index - 2].children[0].className = 'icon iconfont';
                                aLi_oIconfont[index - 1].children[0].innerHTML = '&#xe621;';
                                aLi_oIconfont[index - 1].children[0].className = 'icon iconfont color';
                            }, 100)

                            move(next, { top: 0 }, {
                                duration: 1000,
                                easing: 'ease-out',
                                complete: function() {
                                    oBody.children[index].style.top = index * 100 + '%';
                                }
                            });
                        } else {
                            setTimeout(function() {
                                aLi_oIconfont[index - 2].children[0].innerHTML = '&#xe651;';
                                aLi_oIconfont[index - 2].children[0].className = 'icon iconfont';
                                aLi_oIconfont[index - 3].children[0].innerHTML = '&#xe621;';
                                aLi_oIconfont[index - 3].children[0].className = 'icon iconfont color';
                            }, 500)

                            pre.style.zIndex = index + 1;
                            move(pre, { top: 0 }, {
                                duration: 700,
                                easing: 'ease-out',
                                complete: function() {
                                    oBody.children[index].style.top = index * 100 + '%';
                                    pre.style.zIndex = index - 1
                                }
                            });
                        };
                    });
            };
        })(i);
    };
    //点击右边圆圈变换页面
    for (var j = 0; j < aLi_oIconfont.length; j++) {
        (function(inde) {
            aLi_oIconfont[inde].onclick = function() {
                setTimeout(function() {
                    for (var k = 0; k < aLi_oIconfont.length; k++) {
                        aLi_oIconfont[k].children[0].innerHTML = '&#xe651;';
                        aLi_oIconfont[k].children[0].className = 'icon iconfont';
                    };
                    aLi_oIconfont[inde].children[0].innerHTML = '&#xe621;';
                    aLi_oIconfont[inde].children[0].className = 'icon iconfont color';
                }, 100)
                oBody.children[inde + 2].style.zIndex = oBody.children.length + 1;
                move(oBody.children[inde + 2], { top: 0 }, {
                    duration: 700,
                    easing: 'ease-out',
                    complete: function() {
                        for (var i = 0; i < aLi_oIconfont.length; i++) {
                            if (i !== inde) {
                                oBody.children[i + 2].style.top = '100%';
                            };
                        };
                        oBody.children[inde + 2].style.zIndex = inde + 2;
                    }
                });
            };
        })(j);
    };

    //MY PORTFOLIO
    var oProject = document.getElementById('project');
    var oDemo = document.getElementById('demo');
    var oBtn_project = document.getElementById('btn_project');
    var oBtn_demo = document.getElementById('btn_demo');
    oBtn_demo.onclick = function() {
        this.style.color = "#f4f5f6";
        oBtn_project.style.color = "#616E7C";
        oProject.style.display = "none";
        oDemo.style.display = "block";
    };
    oBtn_project.onclick = function() {
        this.style.color = "#f4f5f6";
        oBtn_demo.style.color = "#616E7C";
        oDemo.style.display = "none";
        oProject.style.display = "block";
    };
};
