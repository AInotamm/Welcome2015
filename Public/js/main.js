
	function bind(fn,context,ag){
		return function(){
			fn.call(context,ag)
		}
	}
	function Carousel(width,speed){
		if(! this instanceof Carousel){
			return new Carousel(width,speed);
		}
		this.elementArray = [];
		this.callbackElementArray = [];
		this.count = 0;
		this.width = width;
		this.speed = speed || 5000;
		this.timer = null;
		this.callbackAction = null;//哪个小点处于激活状态
		
	}
	Carousel.prototype = {
			constructor:Carousel,
			start:function(){
				this.timer = setTimeout(bind(this.left,this),this.speed);
			},
			pushElement:function(fatherNode){
				var childNode = fatherNode.children;
				for(var i = 0;i < childNode.length;i++){
					this.elementArray.push(childNode[i]);
				}
			},
			pushcallbackElement:function(fatherNode){
				var childNode = fatherNode.children;
				for(var i = 0;i < childNode.length;i++){
					this.callbackElementArray.push(childNode[i]);
					childNode[i].children[0].number = i;
				}
				this.callbackAction = this.callbackElementArray[0];
			},
			left:function(){
				var arr = this.elementArray;
					width = this.width;
				if(this.count == arr.length - 1){
					forEach(arr,function(item,index,array){
						constant(item,{"left":index*width + ""},200);
					})
					this.count = 0;
				}else{

					forEach(arr,function(item,index,array){
						constant(item,{"left":parseInt(item.style.left) - width},200);
					});
					this.count++;
				}
				!!this.callbackElementArray[0]&&this.callBack();
				this.timer = setTimeout(bind(this.left,this),this.speed);
			},
			stop:function(){
				if(this.timer) clearTimeout(this.timer);
			},
			callBack:function(){
				this.callbackAction.className = "";
				this.callbackAction = this.callbackElementArray[this.count];
				this.callbackAction.className = "action";
			},
			click:function(num){
				this.stop();
				var count = num,
					width = this.width,
					arr = this.elementArray;
				forEach(arr,function(item,index,array){
					constant(item,{"left":(index - count) * width + ""},200);
				})
				this.count = num;
				if(this.callbackElementArray.length > 1){
					this.callBack();
				}
				this.start();
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
    (function(){//轮播
    	var b = document.getElementsByTagName("ul")[1],
			a = new Carousel(740,5000),
			prv = document.getElementById("prv"),
			nex = document.getElementById("nex");
		a.pushElement(b);
		a.start();
		eventHandler.addEvent(prv,"click",function(){
			if(a.count - 1 < 0){
				a.click(a.elementArray.length - 1);
			}else{
				a.click(a.count - 1);
			}
			return false;
		});
		eventHandler.addEvent(nex,"click",function(){
			if(a.count + 1 > a.elementArray.length - 1){
				a.click(0);
			}else{
				a.click(a.count + 1);
			}
			return false;
		});
    })();
    (function(){//开学倒计时

    	var dayH = document.getElementById("days"),
    	houtH = document.getElementById("hour"),
    	branchH = document.getElementById("branch"),
    	secondsH = document.getElementById("seconds");
    	function timer(){
    		var now = new Date().getTime(),
	    		start = new Date("2015/09/10").getTime(),
	    		cha = start - now,
	    		day = Math.floor(cha/86400000),
	    		hour = Math.floor(cha % 86400000 / 3600000),
	    		branch = Math.floor(cha % 86400000 % 3600000 / 60000),
	    		seconds = Math.floor(cha % 86400000 % 3600000 % 60000 / 1000);
	    		if(day < 10){
	    			day = "0" + day;
	    		}
	    		if(hour < 10){
	    			hour = "0" + hour;
	    		}
	    		if(branch < 10){
	    			branch = "0" + branch;
	    		}
	    		if(seconds < 10){
	    			seconds = "0" + seconds;
	    		}
    			dayH.children[0].src = '/Public/image/num'+(day + "").slice(0,1)+".png";
    			dayH.children[1].src = '/Public/image/num'+(day + "").slice(1,2)+".png";
    			houtH.children[0].src = '/Public/image/num'+(hour + "").slice(0,1)+".png";
    			houtH.children[1].src = '/Public/image/num'+(hour + "").slice(1,2)+".png";
    			branchH.children[0].src = '/Public/image/num'+(branch + "").slice(0,1)+".png";
    			branchH.children[1].src = '/Public/image/num'+(branch + "").slice(1,2)+".png";
    			secondsH.children[0].src = '/Public/image/num'+(seconds + "").slice(0,1)+".png";
    			secondsH.children[1].src = '/Public/image/num'+(seconds+ "").slice(1,2)+".png";
    	}
    	timer();
    	setInterval(timer,1000);
    })();
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
    
    (function(){//云动画
        var c1 = document.getElementById("cloud01"),
            count_down = document.getElementById("count_down"),
            logo = document.getElementById("logo"),
            c5 = document.getElementById("cloud05");

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
            animation.move(c5,{"right":20},2000,c5R);
        }
        function count_downUp(){
            animation.move(count_down,{"top":220},1500,count_downD);
        }
        function count_downD(){
            animation.move(count_down,{"top":245},1500,count_downUp);
        }
        function logoUp(){
            animation.move(logo,{"top":-25},1500,logoD);
        }
        function logoD(){
            animation.move(logo,{"top":0},1500,logoUp);
        }
        c1R();
        c5R();
        count_downUp();
        logoUp();
        })();

    (function(){//顶部渐隐
        var go_top = document.getElementById("go_top"),
            b = true;
        eventHandler.addEvent(window,"scroll",function(e){
            if(window.scrollY > 800 ||!window.scrollY && document.documentElement.scrollTop > 800){
                if(b){
                    b = false;
                    animation.move(go_top,{"bottom":"300","opacity":"1.0"},300);
                }
            }else{
                if(!b){
                    b = true;
                    animation.move(go_top,{"bottom":"200","opacity":"0"},300);
                }
            }
        })
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
            login = document.getElementById("login"),
            xhr = ajaxObject.createXhr(),
            send,
            b_arr = [false,false],
            userTest = /2015[0-9]{6}/,
            passwordTest = /[0-9]{5}[0-9X]/,
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
           if(this.value.match(userTest)!=null&&this.value.match(userTest)[0].length != 10 || this.value.length != 10){
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
           if(this.value.length == 0||this.value.length < 6||passwordTest.test(this.value)){
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
                logo.src = "image/finish.png";
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

        eventHandler.addEvent(login,"click",function(){
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

    (function(){//地标
        var map = document.getElementById("map"),
            div = document.getElementById("showInf"),
            left,
            top,
            arr = [];
        for(var i = 1;i < 10;i++){
            arr.push(map.children[i]);
        }
        eventHandler.live(map,arr,"mouseover",function(e){
            left = parseFloat(getStyle(this,"left")) + 40 ;
            top = parseFloat(getStyle(this,"top")) - 20;
            animation.stop(div);
            animation.move(div,{"left":left,"top":top},300);
            switch(this.id){
                case "newGate":div.children[1].innerHTML = "新校门";
                    break;
                case "oldGate":div.children[1].innerHTML = "老校门";
                    break;
                case "sanjiao":div.children[1].innerHTML = "第三教学楼";
                    break;
                case "yifu":div.children[1].innerHTML = "逸夫楼";
                    break;
                case "oldLia":div.children[1].innerHTML = "老图书馆";
                    break;
                case "fengyu":div.children[1].innerHTML = "风雨操场";
                    break;
                case "taiji":div.children[1].innerHTML = "太极操场";
                    break;
                case "laocao":div.children[1].innerHTML = "老操场";
                    break;
                case "zidonghua":div.children[1].innerHTML = "数字图书馆";
                    break;
            }
        });
        eventHandler.live(map,arr,"click",function(){
            return false;
        })
    })();

    (function(){//其他动画
        var d1 = document.getElementById("d01"),
            d2 = document.getElementById("d2"),
            d3 = document.getElementById("d3"),
            d4 = document.getElementById("d4"),
            d5 = document.getElementById("d5"),
            d6 = document.getElementById("d6"),
            shaoma = document.getElementById("shaoma");
        function move(target){
            animation.move(target,{"left":-10},100,function(){
                animation.move(target,{"left":14},100,function(){
                     animation.move(target,{"left":0},100)
                });
             });
        }
        eventHandler.addEvent(d1,"click",function(){
            window.location.href = "map.html";
        })
        eventHandler.addEvent(d1,"mouseover",function(e){
             move(this);
        });
        eventHandler.addEvent(d2,"mouseover",function(e){
             move(this);
        });
        eventHandler.addEvent(d3,"mouseover",function(e){
             move(this);
        });
        eventHandler.addEvent(d4,"mouseover",function(e){
             move(this);
        });
        eventHandler.addEvent(d5,"mouseover",function(e){
             move(this);
        });
        eventHandler.addEvent(d6,"mouseover",function(e){
             move(this);
        });
        eventHandler.addEvent(d1,"mouseout",function(e){
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d2,"mouseout",function(e){
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d3,"mouseout",function(e){
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d4,"mouseout",function(e){
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d5,"mouseout",function(e){
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d6,"mouseout",function(e){
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(shaoma,"mouseover",function(){
            animation.move(shaoma,{"top":430},100,function(){
                animation.move(shaoma,{"top":406},100,function(){
                    animation.move(shaoma,{"top":420},50);
                })
            })
        })
    })();