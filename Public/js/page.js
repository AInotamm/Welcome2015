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
            obus = document.getElementById("bus"),
            turn_bus = obus.querySelectorAll(".page_mid_mid_ul"),
            obus_btn = document.getElementById("bus_btn"),
            obtn_bus = obus_btn.getElementsByTagName("a"),
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
            pre = opart_btn_2.querySelectorAll(".page_bottom_li_special")[0].children[0],
            nex = opart_btn_2.querySelectorAll(".page_bottom_li_special")[1].children[0],
            index = 0,
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
        function hehe(a, b) {
            a.style.display = "block";
            b.style.display = "none";
        }
        obtn_peo[0].onclick = function (){
            turn(turn_people[0],turn_people[1],obtn_peo[1],obtn_peo[2]);
            hehe(obtn_peo[3], obtn_peo[0]);
        }
        obtn_peo[1].onclick = function (){
            turn(turn_people[0],turn_people[1],obtn_peo[1],obtn_peo[2]);
            hehe(obtn_peo[3], obtn_peo[0]);
        }
        obtn_peo[2].onclick = function (){
            turn(turn_people[1],turn_people[0],obtn_peo[2],obtn_peo[1]);
            hehe(obtn_peo[0], obtn_peo[3]);
        }
        obtn_peo[3].onclick = function (){
            turn(turn_people[1],turn_people[0],obtn_peo[2],obtn_peo[1]);
            hehe(obtn_peo[0], obtn_peo[3]);
        }
        obtn_bus[0].onclick = function (){
            turn(turn_bus[0],turn_bus[1],obtn_bus[1],obtn_bus[2]);
            hehe(obtn_bus[3], obtn_bus[0]);
        }
        obtn_bus[1].onclick = function (){
            turn(turn_bus[0],turn_bus[1],obtn_bus[1],obtn_bus[2]);
            hehe(obtn_bus[3], obtn_bus[0]);
        }
        obtn_bus[2].onclick = function (){
            turn(turn_bus[1],turn_bus[0],obtn_bus[2],obtn_bus[1]);
            hehe(obtn_bus[0], obtn_bus[3]);
        }
        obtn_bus[3].onclick = function (){
            turn(turn_bus[1],turn_bus[0],obtn_bus[2],obtn_bus[1]);
            hehe(obtn_bus[0], obtn_bus[3]);
        }
        obtn_room[0].onclick = function (){
            turn(turn_room[0],turn_room[1],obtn_room[1],obtn_room[2]);
            hehe(obtn_room[3], obtn_room[0]);
        }
        obtn_room[1].onclick = function (){
            turn(turn_room[0],turn_room[1],obtn_room[1],obtn_room[2]);
            hehe(obtn_room[3], obtn_room[0]);
        }
        obtn_room[2].onclick = function (){
            turn(turn_room[1],turn_room[0],obtn_room[2],obtn_room[1]);
            hehe(obtn_room[0], obtn_room[3]);
        }
        obtn_room[3].onclick = function (){
            turn(turn_room[1],turn_room[0],obtn_room[2],obtn_room[1]);
            hehe(obtn_room[0], obtn_room[3]);
        }
        obtn_eat[0].onclick = function (){
            turn(turn_eat[0],turn_eat[1],obtn_eat[1],obtn_eat[2]);
            hehe(obtn_eat[3], obtn_eat[0]);
        }
        obtn_eat[1].onclick = function (){
            turn(turn_eat[0],turn_eat[1],obtn_eat[1],obtn_eat[2]);
            hehe(obtn_eat[3], obtn_eat[0]);
        }
        obtn_eat[2].onclick = function (){
            turn(turn_eat[1],turn_eat[0],obtn_eat[2],obtn_eat[1]);
            hehe(obtn_eat[0], obtn_eat[3]);
        }
        obtn_eat[3].onclick = function (){
            turn(turn_eat[1],turn_eat[0],obtn_eat[2],obtn_eat[1]);
            hehe(obtn_eat[0], obtn_eat[3]);
        }
        obtn_1[0].onclick = function (){
            turn(oturn_1[0],oturn_1[1],obtn_1[1],obtn_1[2]);
            hehe(obtn_1[3], obtn_1[0]);
        }
        obtn_1[1].onclick = function (){
            turn(oturn_1[0],oturn_1[1],obtn_1[1],obtn_1[2]);
            hehe(obtn_1[3], obtn_1[0]);
        }
        obtn_1[2].onclick = function (){
            turn(oturn_1[1],oturn_1[0],obtn_1[2],obtn_1[1]);
            hehe(obtn_1[0], obtn_1[3]);
        }
        obtn_1[3].onclick = function (){
            turn(oturn_1[1],oturn_1[0],obtn_1[2],obtn_1[1]);
            hehe(obtn_1[0], obtn_1[3]);
        }
        obtn_4[0].onclick = function (){
            turn(oturn_4[0],oturn_4[1],obtn_4[1],obtn_4[2]);
            hehe(obtn_4[3], obtn_4[0]);
        }
        obtn_4[1].onclick = function (){
            turn(oturn_4[0],oturn_4[1],obtn_4[1],obtn_4[2]);
            hehe(obtn_4[3], obtn_4[0]);
        }
        obtn_4[2].onclick = function (){
            turn(oturn_4[1],oturn_4[0],obtn_4[2],obtn_3[1]);
            hehe(obtn_4[0], obtn_4[3]);
        }
        obtn_4[3].onclick = function (){
            turn(oturn_4[1],oturn_4[0],obtn_4[2],obtn_4[1]);
            hehe(obtn_4[0], obtn_4[3]);
        }
        obtn_5[0].onclick = function (){
            turn(oturn_5[0],oturn_5[1],obtn_5[1],obtn_5[2]);
            hehe(obtn_5[3], obtn_5[0]);
        }
        obtn_5[1].onclick = function (){
            turn(oturn_5[0],oturn_5[1],obtn_5[1],obtn_5[2]);
            hehe(obtn_5[3], obtn_5[0]);
        }
        obtn_5[2].onclick = function (){
            turn(oturn_5[1],oturn_5[0],obtn_5[2],obtn_5[1]);
            hehe(obtn_5[0], obtn_5[3]);
        }
        obtn_5[3].onclick = function (){
            turn(oturn_5[1],oturn_5[0],obtn_5[2],obtn_5[1]);
            hehe(obtn_5[0], obtn_5[3]);
        }
        function oturn(page){
            if( page < 0 ) {
                page = 0;
            } else if(page > 3) {
                page = 3;
                index = 2;
            } else if(page == 0) {
                pre.style.display = "none";
                nex.style.display = "block";
            } else if(page == 3) {
                nex.style.display = "none";
                pre.style.display = "block";
            } else {
                pre.style.display = "block";
                nex.style.display = "block";
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
        var ke_btn = document.getElementById("ke_choose"),
            oke = document.getElementById("ke"),
            ke = oke.querySelectorAll(".page_mid_mid_ul"),
            kebtn = ke_btn.querySelectorAll(".page_bottom_li"),
            kebtnstyle = ke_btn.getElementsByTagName("a");
            kepre = ke_btn.querySelectorAll(".page_bottom_li_special")[0].children[0],
            kenex = ke_btn.querySelectorAll(".page_bottom_li_special")[1].children[0],
            keindex = 0,
            oke1 =  document.getElementById("ke_1"),
            oke2 =  document.getElementById("ke_2"),
            oke3 =  document.getElementById("ke_3"),
            ke1  = oke1.getElementsByTagName("a"),
            ke2  = oke2.getElementsByTagName("a"),
            ke3  = oke3.getElementsByTagName("a");

        function oketurn(page){
            if( page < 0 ){
                page = 0;
            }
            else if(page > 2){
                page = 2;
                keindex = 1;
            }
            else if(page == 0){
                kepre.style.display = "none";
                kenex.style.display = "block";
            }
            else if(page == 1){
                kepre.style.display = "block";
                kenex.style.display = "block";
            }
            else if(page == 2){
                kepre.style.display = "block";
                kenex.style.display = "none";
            }
            ke[keindex].style.display = "none";
            ke[page].style.display = "block";
            kebtnstyle[keindex+1].removeAttribute("class","page_bottom_spe");
            kebtnstyle[page+1].setAttribute("class","page_bottom_spe");
            keindex = page;
        }
        kepre.onclick = function (){
            oketurn(keindex-1)
        };
        kenex.onclick = function (){
            oketurn(keindex+1)
        };
        kebtn[0].onclick = function (){
            oketurn(0)
        };
        kebtn[1].onclick = function (){
            oketurn(1)
        };
        kebtn[2].onclick = function (){
            oketurn(2)
        };

        var she_btn = document.getElementById("she_choose"),
            oshe = document.getElementById("she"),
            she_page = oshe.querySelectorAll(".page_mid_mid_ul"),
            oshebtn = she_btn.querySelectorAll(".page_bottom_li"),
            oshebtnstyle = she_btn.getElementsByTagName("a");
            oshepre = she_btn.querySelectorAll(".page_bottom_li_special")[0].children[0],
            oshenex = she_btn.querySelectorAll(".page_bottom_li_special")[1].children[0],
            osheindex = 0,
            oshe1 =  document.getElementById("she_1"),
            oshe2 =  document.getElementById("she_2"),
            oshe3 =  document.getElementById("she_3"),
            she1  = oshe1.getElementsByTagName("a"),
            she2  = oshe2.getElementsByTagName("a"),
            she3  = oshe3.getElementsByTagName("a");

        function osheturn(page){
            if( page < 0 ){
                page = 0;
            }
            else if(page > 2){
                page = 2;
                osheindex = 1;
            }
            else if(page == 0){
                oshepre.style.display = "none";
                oshenex.style.display = "block";
            }
            else if(page == 1){
                oshepre.style.display = "block";
                oshenex.style.display = "block";
            }
            else if(page == 2){
                oshepre.style.display = "block";
                oshenex.style.display = "none";
            }
            she_page[osheindex].style.display = "none";
            she_page[page].style.display = "block";
            oshebtnstyle[osheindex+1].removeAttribute("class","page_bottom_spe");
            oshebtnstyle[page+1].setAttribute("class","page_bottom_spe");
            osheindex = page;
        }
        oshepre.onclick = function (){
            osheturn(osheindex-1)
        };
        oshenex.onclick = function (){
            osheturn(osheindex+1)
        };
        oshebtn[0].onclick = function (){
            osheturn(0)
        };
        oshebtn[1].onclick = function (){
            osheturn(1)
        };
        oshebtn[2].onclick = function (){
            osheturn(2)
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

