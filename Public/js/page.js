
    function bind(fn,context,ag){
        return function(){
            fn.call(context,ag)
        }
    }


    function constant(target,json,speed,callback){
        var timeScale = 1000 / 60,
            count = speed / timeScale,
            begin;

        if(target.timer){
            // console.log(1);
            clearTimeout(target.timer);
        }

        //设初值
        for(var key in json){
            if(window.getComputedStyle){
                begin = parseFloat(window.getComputedStyle(target,null)[key]);
            }else{
                begin = parseFloat(target.currentStyle[key]);
            }
            target[key] = (json[key] - begin) / count;
        }

        target.timer = setInterval(function(){
            var oldValue,newValue;

            var stop = true;

            for(var key in json){
                //运动算法
               if(window.getComputedStyle){
                    oldValue = parseFloat(window.getComputedStyle(target,null)[key]);
                }else{
                    oldValue = parseFloat(target.currentStyle[key]);
                }

                if(oldValue != json[key]){
                    stop = false;
                }

                if(target.addEventListener && Math.abs(oldValue - json[key]) < 1){
                    target.style[key] = json[key] + "px";
                }else if(!target.addEventListener &&  Math.abs(oldValue - json[key]) < 25){
                    target.style[key] = json[key] + "px";
                }else{
                    newValue = oldValue + target[key];
                    target.style[key] = newValue + "px";
                }
            }

            if(stop){
                clearInterval(target.timer);
                typeof callback == "function" && callback();
            }

        },timeScale);
    }
    
    (function(){//回到顶部
        var go_top = document.getElementById("go_top");
        function top(speed){
            var timeScale = 1000/60,
                timer,
                speed = speed / timeScale;
                y = window.scrollY || document.documentElement.scrollTop,
                xy = y / speed;
            if(!timer){

                timer = setInterval(function(){
                    if(window.scrollY < 100 || !window.scrollY && document.documentElement.scrollTop < 100){
                    window.scrollTo(0,0);
                    clearInterval(timer);
                    timer = null;
                }
                    window.scrollTo(0,y = y - xy);
                },timeScale)
            }
        }
        eventHandler.addEvent(go_top,"click",function(e){
            top(200);
            return false;
        })
    })();
    
    (function(){//Top渐隐
        var go_top = document.getElementById("go_top"),
            b = true;
        eventHandler.addEvent(window,"scroll",function(e){
            if(window.scrollY > 100 ||!window.scrollY && document.documentElement.scrollTop > 100){
                if(b){
                    b = false;
                    animation.move(go_top,{"bottom":"200","opacity":"1.0"},300);
                }
            }else{
                if(!b){
                    b = true;
                    animation.move(go_top,{"bottom":"100","opacity":"0"},300);
                }
            }
        })
    })();


    (function(speed,num){//顶部渐隐
        var oheader = document.getElementById("header"),
            timer,
            timeScale = 1000/60,
            count = speed / timeScale,
            x = num / count,
            bCount = true,
            exp = /[0-9]+/,
            IeFileter,
            number;
        eventHandler.addEvent(window,"scroll",function(e){
            if(window.scrollY > 300 ||!window.scrollY && document.documentElement.scrollTop > 300){
                if(!bCount) return false;
                bCount = false;
                clearInterval(timer);
                oheader.className = "header fixed";
                if(oheader.addEventListener){
                    oheader.style.opacity = 0;
                }else{
                    oheader.style.filter = "alpha(opacity=0)";
                    //filter:alpha(opacity=50);
                }
                
                oheader.style.top = "0px";
                timer = setInterval(function(){
                    if(oheader.addEventListener){
                        oheader.style.opacity = parseFloat(oheader.style.opacity) + x + "";
                    }else{
                        IeFileter = oheader.style.filter;
                        number = IeFileter.match(exp)[0];
                        oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) + x*100) + ")";
                        number = oheader.style.filter.match(exp)[0];
                    }
                    if(oheader.addEventListener && oheader.style.opacity >= "1"){
                        clearInterval(timer);
                    }else if(number >= 100){
                        clearInterval(timer);
                    }
                },timeScale);
            }else{
                if(bCount) return false;
                bCount = true;
                clearInterval(timer);
                timer = setInterval(function(){
                    if(oheader.addEventListener){
                        oheader.style.opacity = parseFloat(oheader.style.opacity) - x + "";
                    }else{
                        IeFileter = oheader.style.filter;
                        number = IeFileter.match(exp)[0];
                        oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) - x*100) + ")";
                        number = oheader.style.filter.match(exp)[0];
                    }
                    if(oheader.addEventListener&& oheader.style.opacity <= "0"){
                        clearInterval(timer);
                        oheader.className = "header";
                        oheader.style.opacity = 1;
                        oheader.style.filter = "alpha(opacity=100)";
                    }else if(number <= 10){
                        clearInterval(timer);
                        oheader.className = "header";
                        oheader.style.opacity = 1;
                        oheader.style.filter = "alpha(opacity=100)";
                    }
                },timeScale);
            }
        })
    })(500,1);
    (function(){//云动画
        var c1 = document.getElementById("cloud01"),
            c5 = document.getElementById("cloud04");
        if(!c1.addEventListener) return "IE8.........";
        function c1R(){
            animation.move(c1,{"left":100},5000,c1L);
        }
        function c1L(){
            animation.move(c1,{"left":-70},5000,c1R);
        }
        function c5R(){
            animation.move(c5,{"right":50},5000,c5L);
        }
        function c5L(){
            animation.move(c5,{"right":20},5000,c5R);
        }
        c1R();
        c5R();
            
    })();



    (function(){//登录
        var user_name_c = document.getElementById("user_name"),
            password_c = document.getElementById("password"),
            phone_d = document.getElementById("phone_d"),
            qq_d = document.getElementById("qq_d"),
            b_d = document.getElementById("behavior_d"),
            div01 = document.getElementById("user_name_d"),
            div02 = document.getElementById("password_d"),
            sub = document.getElementById("login_sub"),
            big = document.getElementById("login_page_father"),
            notice = document.getElementById("warming"),
            logo = document.getElementById("login_logo"),
            skip = document.getElementById("skip"),
            yes = document.getElementById("yes"),
            close = document.getElementById("close"),
            wap = document.getElementById("wap"),
            login1 = document.getElementById("login1"),
            login2 = document.getElementById("login2"),
            xhr = ajaxObject.createXhr(),
            send,
            b_arr = [false,false],
            userTest = /2015[0-9]{6}/,
            passwordTest = /[0-9]{5}([0-9]|[Xx])/,
            b_c = true,
            timer;
        eventHandler.addEvent(window,"resize",function(){
            if(big.style.display == "none") return;
            clearTimeout(timer);
            timer = setTimeout(function(){
                big.style.top = (document.documentElement.clientHeight - 280)/2 + "px";
            },300)
        })
        eventHandler.addEvent(user_name_c,"blur",function(){
           if((this.value.match(userTest) == null && this.value.length == 10) || this.value.length != 10){
                if(this.value != ""){
                    this.style.border = "2px solid #FF3030";
                }else{
                    this.style.border = "none";
                }
                b_arr[0] = false;
           }else{
                this.style.border = "2px solid #50930c";
                b_arr[0] = true;
           }
        })
        eventHandler.addEvent(password_c,"blur",function(){
           if(this.value.length != 6 || (this.value.length == 6 && !passwordTest.test(this.value))){
                if(this.value != ""){
                    this.style.border = "2px solid #FF3030";
                }else{
                    this.style.border = "none";
                }
                b_arr[1] = false;
           }else{
                this.style.border = "2px solid #50930c";
                b_arr[1] = true;
           }
        })
        eventHandler.addEvent(sub,"click",function(){
           if(b_arr[0] && b_arr[1]){
                send = ajaxObject.encode({"user_name":user_name_c.value,"password":password_c.value});
                //ajaxObject.POST(xhr,send,"xxx.php");
                logo.src = "/Public/image/finish.png";
                animation.move(big,{"height":"460","top":(document.documentElement.clientHeight - 460)/2 + ""},500);
                animation.move(div01,{"left":"-100","opacity":"0"},500);
                setTimeout(function(){
                        animation.move(div02,{"left":"-100","opacity":"0"},500);
                    },150)
                setTimeout(function(){
                        animation.move(sub,{"left":"-100","opacity":"0"},500);
                    },300);
                animation.move(phone_d,{"top":"72","opacity":"1.0"},1000);
                animation.move(qq_d,{"top":"132","opacity":"1.0"},1000);
                animation.move(skip,{"top":"380","opacity":"1.0"},1000);
                animation.move(yes,{"top":"380","opacity":"1.0"},1000);
                animation.move(b_d,{"top":"192","opacity":"1.0"},1000,function(){
                    div01.style.display = "none";
                    div02.style.display = "none";
                    sub.style.display = "none";
                });

           }else{
                if(!b_c){
                    return;
                }
                notice.style.display = "block";
                b_c = false;
               animation.move(notice,{"top":"110","opacity":"1.0"},1000,
                    function(){
                        animation.move(notice,{"top":"80","opacity":"0"},1000,function(){
                            notice.style.top = "140px";
                            notice.style.display = "none";
                            b_c = true;
                        })
                    }
               );
           }
        })

        eventHandler.addEvent(login1,"click",function(){
            wap.style.display = "block";
            big.style.display = "block";
            animation.move(big,{"top":"300","opacity":"1.0"},500,function(){
                if (parseFloat(getStyle(big,"top")) > 280) {
                    animation.move(big,{"top":"200"},300,function(){
                        animation.move(big,{"top":"280"},300);
                    });
                };
            });
        })
        eventHandler.addEvent(login2,"click",function(){
            wap.style.display = "block";
            big.style.display = "block";
            animation.move(big,{"top":"300","opacity":"1.0"},500,function(){
                if (parseFloat(getStyle(big,"top")) > 280) {
                    animation.move(big,{"top":"200"},300,function(){
                        animation.move(big,{"top":"280"},300);
                    });
                };
            });
        })
         eventHandler.addEvent(close,"click",function(){
            wap.style.display = "none";
            animation.move(big,{"top":"-280","opacity":"0"},1000,function(){
                big.style.display = "none";
            })
        })
    })();
    
    (function (){
        var opage_ul = document.getElementById("page_ul"),
            opage = document.querySelectorAll(".page_mid"),
            obtn = opage_ul.getElementsByTagName("a");
            for(var i = 0; i<opage.length;i++){
                var index = 1;
                obtn[i].onclick = (function (i){       
                    return function(){
                        opage[index].style.display = "none";    
                        opage[i].style.display = "block";
                        obtn[index].removeAttribute("class","page_active");
                        obtn[i].setAttribute("class","page_active");
                        index = i;
                    }
                })(i);
            }
    })();
    (function (){
        var anopage_ul = document.getElementById("an_page_ul"),
            oanpage = document.querySelectorAll(".an_page_mid"),
            oanbtn = anopage_ul.getElementsByTagName("a");
            for(var i = 0; i<oanpage.length;i++){
                var oindex = 4;
                oanbtn[i].onclick = (function (i){       
                    return function(){    
                        oanpage[oindex].style.display = "none";
                        oanpage[i].style.display = "block";
                        oanbtn[oindex].removeAttribute("class","stu_li_active");
                        oanbtn[i].setAttribute("class","stu_li_active");
                        oindex = i;                       
                    }
                })(i);
            }
    })();
    (function (){
        var opeople = document.getElementById("people"),
            turn_people = opeople.querySelectorAll(".page_num"),
            opeople_btn = document.getElementById("people_btn"),
            obtn_peo = opeople_btn.getElementsByTagName("a"),
            oroom = document.getElementById("room"),
            turn_room = oroom.querySelectorAll(".page_mid_mid_ul"),
            oroom_btn = document.getElementById("room_btn"),
            obtn_room = oroom_btn.getElementsByTagName("a"),
            oeat = document.getElementById("eat"),
            turn_eat = oeat.querySelectorAll(".page_mid_mid_ul"),
            oeat_btn = document.getElementById("eat_btn"),
            obtn_eat = oeat_btn.getElementsByTagName("a"),
            opart_1 = document.getElementById("part_1"),
            oturn_1 = opart_1.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_1 = document.getElementById("part_btn_1"),
            obtn_1 = opart_btn_1.getElementsByTagName("a"),
            opart_2 = document.getElementById("part_2"),
            oturn_2 = opart_2.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_2 = document.getElementById("part_btn_2"),
            opart_spe_btn_2 = opart_btn_2.querySelectorAll(".page_bottom_li"),
            obtn_2 = opart_btn_2.getElementsByTagName("a"),
            pre = opart_btn_2.querySelectorAll(".page_bottom_li_special")[0],
            nex = opart_btn_2.querySelectorAll(".page_bottom_li_special")[1],
            index = 0,
            opart_3 = document.getElementById("part_3"),
            oturn_3 = opart_3.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_3 = document.getElementById("part_btn_3"),
            obtn_3 = opart_btn_3.getElementsByTagName("a"),
            opart_4 = document.getElementById("part_4"),
            oturn_4 = opart_4.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_4 = document.getElementById("part_btn_4"),
            obtn_4 = opart_btn_4.getElementsByTagName("a"),
            opart_5 = document.getElementById("part_5"),
            oturn_5 = opart_5.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_5 = document.getElementById("part_btn_5"),
            obtn_5 = opart_btn_5.getElementsByTagName("a");
        function turn(a,b,x,y){
            a.style.display = "block";
            b.style.display = "none";
            x.setAttribute("class","page_bottom_spe");
            y.removeAttribute("class","page_bottom_spe");
        }
        obtn_peo[0].onclick = function (){
            turn(turn_people[0],turn_people[1],obtn_peo[1],obtn_peo[2]);
        }
        obtn_peo[1].onclick = function (){
            turn(turn_people[0],turn_people[1],obtn_peo[1],obtn_peo[2]);
        }
        obtn_peo[2].onclick = function (){
            turn(turn_people[1],turn_people[0],obtn_peo[2],obtn_peo[1]);
        }
        obtn_peo[3].onclick = function (){
            turn(turn_people[1],turn_people[0],obtn_peo[2],obtn_peo[1]);
        }
        obtn_room[0].onclick = function (){
            turn(turn_room[0],turn_room[1],obtn_room[1],obtn_room[2]);
        }
        obtn_room[1].onclick = function (){
            turn(turn_room[0],turn_room[1],obtn_room[1],obtn_room[2]);
        }
        obtn_room[2].onclick = function (){
            turn(turn_room[1],turn_room[0],obtn_room[2],obtn_room[1]);
        }
        obtn_room[3].onclick = function (){
            turn(turn_room[1],turn_room[0],obtn_room[2],obtn_room[1]);
        }
        obtn_eat[0].onclick = function (){
            turn(turn_eat[0],turn_eat[1],obtn_eat[1],obtn_eat[2]);
        }
        obtn_eat[1].onclick = function (){
            turn(turn_eat[0],turn_eat[1],obtn_eat[1],obtn_eat[2]);
        }
        obtn_eat[2].onclick = function (){
            turn(turn_eat[1],turn_eat[0],obtn_eat[2],obtn_eat[1]);
        }
        obtn_eat[3].onclick = function (){
            turn(turn_eat[1],turn_eat[0],obtn_eat[2],obtn_eat[1]);
        }
        obtn_1[0].onclick = function (){
            turn(oturn_1[0],oturn_1[1],obtn_1[1],obtn_1[2]);
        }
        obtn_1[1].onclick = function (){
            turn(oturn_1[0],oturn_1[1],obtn_1[1],obtn_1[2]);
        }
        obtn_1[2].onclick = function (){
            turn(oturn_1[1],oturn_1[0],obtn_1[2],obtn_1[1]);
        }
        obtn_1[3].onclick = function (){
            turn(oturn_1[1],oturn_1[0],obtn_1[2],obtn_1[1]);
        }
        obtn_3[0].onclick = function (){
            turn(oturn_3[0],oturn_3[1],obtn_3[1],obtn_3[2]);
        }
        obtn_3[1].onclick = function (){
            turn(oturn_3[0],oturn_3[1],obtn_3[1],obtn_3[2]);
        }
        obtn_3[2].onclick = function (){
            turn(oturn_3[1],oturn_3[0],obtn_3[2],obtn_3[1]);
        }
        obtn_3[3].onclick = function (){
            turn(oturn_3[1],oturn_3[0],obtn_3[2],obtn_3[1]);
        }
        obtn_4[0].onclick = function (){
            turn(oturn_4[0],oturn_4[1],obtn_4[1],obtn_4[2]);
        }
        obtn_4[1].onclick = function (){
            turn(oturn_4[0],oturn_4[1],obtn_4[1],obtn_4[2]);
        }
        obtn_4[2].onclick = function (){
            turn(oturn_4[1],oturn_4[0],obtn_4[2],obtn_3[1]);
        }
        obtn_4[3].onclick = function (){
            turn(oturn_4[1],oturn_4[0],obtn_4[2],obtn_4[1]);
        }
        obtn_5[0].onclick = function (){
            turn(oturn_5[0],oturn_5[1],obtn_5[1],obtn_5[2]);
        }
        obtn_5[1].onclick = function (){
            turn(oturn_5[0],oturn_5[1],obtn_5[1],obtn_5[2]);
        }
        obtn_5[2].onclick = function (){
            turn(oturn_5[1],oturn_5[0],obtn_5[2],obtn_5[1]);
        }
        obtn_5[3].onclick = function (){
            turn(oturn_5[1],oturn_5[0],obtn_5[2],obtn_5[1]);
        }
        function oturn(page){
            if( page < 0 ) {
                page = 0;
            }
            if(page > 3){
                page = 3;
                index = 2;
            }
            oturn_2[index].style.display = "none";
            oturn_2[page].style.display = "block";
            obtn_2[index+1].removeAttribute("class","page_bottom_spe");
            obtn_2[page+1].setAttribute("class","page_bottom_spe");
            index = page;
        }
        pre.onclick = function (){
                oturn(index-1)
        };
        nex.onclick = function (){
            oturn(index+1)
        };
        opart_spe_btn_2[0].onclick = function (){
            oturn(0)
        };
        opart_spe_btn_2[1].onclick = function (){
            oturn(1)
        };
        opart_spe_btn_2[2].onclick = function (){
            oturn(2)
        };
        opart_spe_btn_2[3].onclick = function (){
            oturn(3)
        };

    })();
    var _2D = document.getElementById("D2map");
    var _3D = document.getElementById("D3map");
    var btu_2D = document.getElementById("btu_2D");
    var btu_3D = document.getElementById("btu_3D");

    btu_2D.onclick = function(){
        _2D.style.display = "block";
        btu_2D.setAttribute("class", "active");
        _3D.style.display = "none";
        btu_3D.removeAttribute("class","active");

    }
    btu_3D.onclick = function(){
        _3D.style.display = "block";
        btu_3D.setAttribute("class", "active");
        _2D.style.display = "none";
        btu_2D.removeAttribute("class","active");
    }

