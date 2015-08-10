
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
        userTest = /[0-9]+/,
        passwordTest = /\s+/,
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


require.config({
    paths:{
        echarts:"http://echarts.baidu.com/build/dist"
    }
});

function charst(name,value,title,bili) {
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("page_mid_next"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:title,
                    subtext:bili,
                    x:"center",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 650,
                    y:250,
                    data:name
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    radius : "30%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:value
                },
                {
                    name:"脱单率",
                    type:'pie',
                    x:0,
                    y:0,
                    radius :['40%',"55%"],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                    {"name":"脱单男","value":"30"},
                    {"name":"脱单女","value":"70"},
                    ]
                },
                ]
            };

            myChart.setOption(option);
        });
changebg(data_btu1);
page_mid_next.style.display = "block";
row.style.display = "none";
clomu.style.display = "none";
}


var data_btu1 = document.getElementById("data_btu1");
var data_btu2 = document.getElementById("data_btu2");
var data_btu3 = document.getElementById("data_btu3");
var data_btu4 = document.getElementById("data_btu4");
var data_btu5 = document.getElementById("data_btu5");
var page_mid_next = document.getElementById("page_mid_next");
var row = document.getElementById("row");
var clomu = document.getElementById("clomu");
var WH1 = document.getElementById("WH1");
var WH2 = document.getElementById("WH2");
var index = data_btu1;

function charst_sex(singleDog,notalone){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("row1"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:"所在学院男女比",
                    x:"center",
                    y:"300",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 350,
                    y:200,
                    data:["男","女","脱单女","脱单男"]
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    x:0,
                    y:0,
                    radius :'25%',
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:singleDog
                },
                {
                    name:"脱单率",
                    type:'pie',
                    x:0,
                    y:0,
                    radius :['30%',"40%"],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:notalone
                },
                ]
            };
            myChart.setOption(option);
        });
require([
    "echarts",
    "echarts/chart/pie"
    ],

    function(ec){
        myChart = ec.init(document.getElementById("row2"));
        option = {
            color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title:{
                show:true,
                text:"学校男女比",
                x:"center",
                y:"300",
                textStyle:{
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#8e6946'
                },
            },
            legend: {
                orient : 'vertical',
                x : 350,
                y:200,
                data:["男","女","脱单男","脱单女"]
            },
            calculable : true,
            series : [
            {
                type:'pie',
                x:0,
                y:0,
                radius : "25%",
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position:"center",
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                {"name":"男","value":"30"},
                {"name":"女","value":"70"},
                ]
            },
            {
                name:"脱单率",
                type:'pie',
                x:0,
                y:0,
                radius :['30%',"40%"],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                {"name":"脱单男","value":"30"},
                {"name":"脱单女","value":"70"},
                ]
            },
            ]

        };   
        myChart.setOption(option);
    });
changebg(data_btu2);
page_mid_next.style.display = "none";
row.style.display = "block";
clomu.style.display = "none";
WH1.style.display = "block";
WH2.style.display = "none";
}


function chart_age(age,agevalue,star,starvalue){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("row1"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:"同年同月比",
                    x:"center",
                    y:"300",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 300,
                    y:250,
                    data:age
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    x:0,
                    y:0,
                    radius : ['25%', '35%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position:"center",
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:agevalue
                }
                ]

            };

            myChart.setOption(option);
        });
require([
    "echarts",
    "echarts/chart/pie"
    ],

    function(ec){
        myChart = ec.init(document.getElementById("row2"));
        option = {
            color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title:{
                show:true,
                text:"同星座比例",
                x:"center",
                y:"300",
                textStyle:{
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#8e6946'
                },
            },
            legend: {
                orient : 'vertical',
                x : 300,
                y:250,
                data:star
            },
            calculable : true,
            series : [
            {
                type:'pie',
                x:0,
                y:0,
                radius : ['25%', '35%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position:"center",
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:starvalue
            }
            ]

        };   
        myChart.setOption(option);
    });
changebg(data_btu3);
page_mid_next.style.display = "none";
row.style.display = "block";
clomu.style.display = "none";
WH1.style.display = "none";
WH2.style.display = "block";
}


function charst_subject(){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("page_mid_next"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

                timeline:{
                    show:true,
                    data:["通信","计科","光电","自动化","理学院","生物","经管","体育","外国语","先进制造","传媒","软件","半导体","法学",""],
                    label:{
                        rotate:-25,
                        textStyle:{
                            fontSize:10,
                        }    
                    },
                    type:"number",
                },
                options :[
                {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    title :{
                        show:true,
                        text:"各个学院学生心中最难的科目",
                        x:"center",
                        textStyle:{
                            fontSize: 18,
                            fontWeight: 'bolder',
                            color: '#8e6946'
                        }
                    },
                    legend: {
                        orient : 'vertical',
                        x : 650,
                        y:250,
                        data:["语文","数学","英语","理综"]
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":688},
                        {"name":"数学","value":203},
                        {"name":"英语","value":19},
                        {"name":"理综","value":3}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":160},
                        {"name":"数学","value":106},
                        {"name":"英语","value":23},
                        {"name":"理综","value":4}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":167 },
                        {"name":"数学","value":55},
                        {"name":"英语","value":13},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":349},
                        {"name":"数学","value":74},
                        {"name":"英语","value":6},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":123},
                        {"name":"数学","value":23},
                        {"name":"英语","value":8},
                        {"name":"理综","value":4}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":192},
                        {"name":"数学","value":63},
                        {"name":"英语","value":12},
                        {"name":"理综","value":1}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":488},
                        {"name":"数学","value":53},
                        {"name":"英语","value":29},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":52},
                        {"name":"数学","value":7},
                        {"name":"英语","value":1},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":54},
                        {"name":"数学","value":10},
                        {"name":"英语","value":0},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":102},
                        {"name":"数学","value":12},
                        {"name":"英语","value":5},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":538},
                        {"name":"数学","value":69},
                        {"name":"英语","value":17},
                        {"name":"理综","value":27}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":494},
                        {"name":"数学","value":40},
                        {"name":"英语","value":26},
                        {"name":"理综","value":8}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":111},
                        {"name":"数学","value":27},
                        {"name":"英语","value":8},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                },
                {
                    series : [
                    {
                        name:'科目',
                        type:'pie',
                        radius : '50%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    textStyle : {
                                        fontSize : '20',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[{"name":"语文","value":51},
                        {"name":"数学","value":25},
                        {"name":"英语","value":4},
                        {"name":"理综","value":0}
                        ]
                    }
                    ]
                }
                ]
            };

            myChart.setOption(option);
        });       
changebg(data_btu4);
page_mid_next.style.display = "block";
row.style.display = "none";
clomu.style.display = "none";
}

function charst_end(content){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("clomu1"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:"全校本科生就业情况",
                    subtext:"截止2014年12月10日，2014届毕业生总人数为4834人，其中签就业协议3826人，升学出国772人，灵活就业49人，待就业187人，就业率为96.13%",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 10,
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 650,
                    y:80,
                    data:["签就业协议","升学出国","灵活就业","待就业"]
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":3826},
                    {"name":"升学出国","value":772},
                    {"name":"灵活就业","value":49},
                    {"name":"待就业","value":187}
                    ]
                }
                ]
            };

            myChart.setOption(option);
        });
require([
    "echarts",
    "echarts/chart/pie"
    ],

    function(ec){
        myChart = ec.init(document.getElementById("clomu2"));
        option = {
            color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
            timeline:{
                show:true,
                data:["通信","计科","光电","自动化","理学院","生物","经管","体育","外国语","先进制造","传媒","软件","半导体","法学",""],
                label:{
                    rotate:-25,
                    textStyle:{
                        fontSize:10,
                    }    
                },
                type:"number",
            },
            options :[
            {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title :{
                    show:true,
                    text:"本学院本科生就业情况",
                    subtext:content,
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 10,
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 650,
                    y:50,
                    data:["签就业协议","升学出国","待就业","灵活就业"]
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":688},
                    {"name":"升学出国","value":203},
                    {"name":"待就业","value":19},
                    {"name":"灵活就业","value":3}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":160},
                    {"name":"升学出国","value":106},
                    {"name":"待就业","value":23},
                    {"name":"灵活就业","value":4}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":167 },
                    {"name":"升学出国","value":55},
                    {"name":"待就业","value":13},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":349},
                    {"name":"升学出国","value":74},
                    {"name":"待就业","value":6},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":123},
                    {"name":"升学出国","value":23},
                    {"name":"待就业","value":8},
                    {"name":"灵活就业","value":4}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":192},
                    {"name":"升学出国","value":63},
                    {"name":"待就业","value":12},
                    {"name":"灵活就业","value":1}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":488},
                    {"name":"升学出国","value":53},
                    {"name":"待就业","value":29},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":52},
                    {"name":"升学出国","value":7},
                    {"name":"待就业","value":1},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":54},
                    {"name":"升学出国","value":10},
                    {"name":"待就业","value":0},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":102},
                    {"name":"升学出国","value":12},
                    {"name":"待就业","value":5},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":538},
                    {"name":"升学出国","value":69},
                    {"name":"待就业","value":17},
                    {"name":"灵活就业","value":27}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":494},
                    {"name":"升学出国","value":40},
                    {"name":"待就业","value":26},
                    {"name":"灵活就业","value":8}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":111},
                    {"name":"升学出国","value":27},
                    {"name":"待就业","value":8},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":51},
                    {"name":"升学出国","value":25},
                    {"name":"待就业","value":4},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            }
            ]
        };

        myChart.setOption(option);
    });
changebg(data_btu5);
page_mid_next.style.display = "none";
row.style.display = "none";
clomu.style.display = "block";
}


function changebg(target) {
    index.removeAttribute("class","stu_li_active");
    target.setAttribute("class","stu_li_active");
    index = target;
}

(function(){

    var timer = setInterval(function(){
        var btu = document.querySelectorAll(".jtico");
        if (btu.length == 0) {
            console.log(1);
            return;
        }else{
          for (var i = 0; i < btu.length; i++) {
            btu[i].style.opacity = "0";
        }; 
        clearInterval(timer); 
    }
},500); 
})();