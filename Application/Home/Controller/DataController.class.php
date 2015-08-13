<?php
/**
 * Created by PhpStorm.
 * User: Haku
 * Date: 15/8/10
 * Time: 15:29
 */

namespace Home\Controller;
use Think\Controller;

class DataController extends BaseController {

    private $provScale = array( //省份比例，到时跑了改
        '重庆'=>'', '成都'=>'', '贵阳'=>'', '西安'=>'', '昆明'=>'',
        '湖南'=>'', '湖北'=>'', '兰州 ' =>'', '广西'=>'' , '河南' =>'',
        '青海' =>'', '江西' =>'', '广东' =>'', '宁夏' =>'', '安徽' =>'',
        '海南' =>'', '澳门' =>'', '山西' =>'', '香港' =>'', '河北' =>'',
        '江苏' =>'', '山东' =>'', '福建' =>'', '浙江' =>'', '内蒙古' =>'',
        '上海' =>'', '天津' =>'', '北京' =>'', '西藏' =>'', '台湾'=>'',
        '辽宁' =>'', '吉林' =>'', '新疆' =>'', '黑龙江' =>'',
    );
    private $proDistance = array(
        0 =>'重庆', 1 => '成都', 2 => '贵阳', 3 => '西安', 4 => '昆明',
        5 =>'湖南', 6 =>'湖北', 7 => '兰州', 8 => '广西', 9 => '河南',
        10 => '青海', 11 => '江西', 12 => '广东', 13 => '宁夏', 14 => '安徽',
        15 => '海南', 16 => '澳门', 17 =>'山西', 18 =>'香港', 19 => '河北',
        20 => '江苏', 21 =>'山东', 22 => '福建', 23 => '浙江', 24 => '内蒙古',
        25 => '上海', 26 => '天津', 27 => '北京', 28 => '西藏', 29 => '台湾',
        30 =>'辽宁', 31 => '吉林', 32 => '新疆', 33 => '黑龙江',
    );

    private $_stu_id;
    private $_stu_class;
    private $_stu_dorm;
    private $_stu_dept;
    private $total = 4711;
    private $techer;
    private $sameFav;
    private $sameClass;
    private $sameDorm;
    private $sameProv;
    private $otherProv;

    public function index(){  //所有的查询你测试看看，最初有没有设置session
        if(session('?stu_id')) {
            $this->_stu_id = session('stu_id');
            $this->_showInfo(false);
            $this->_getExtraData(false);
            $this->_getProv();

            $this->assign(array(
                'city' => session('stu_prov'),
                'city_wide' => $this->sameProv,
                'city_total' => $this->otherProv,
                'men' => 10,
                'women' => 1000,
                'dog_men' => 100,
                'dog_women' => 2,
                'same_birthday' => 10,
                'other_birthday' => 100,
                'same_hororray' => 20,
                'other_hororray' => 40,
                'dept' => '通信学院',
                'goAbroad' => '22.3',
                'flexTP' => '0.48',
                'stayathome' => '2.08',
                'TP' => '97.92'
            ));
        }
        $this->display('Data/index');
    }

    private function _showInfo($transfer = true){ //个人信息
        if($transfer) {
            $this->_stu_id = I(trim('post.id'), '');
            if(!$this->_stu_id) {
                $this->ajaxReturn(array(
                    'status' => 403,
                    'info' => '查询参数错误,请重试'
                ));
            }
        }
        $student = M('stuinfo');
        $condition['stu_id'] = $this->_stu_id;
        $user_student = $student->where($condition)->find();
        $opposite = array_flip($this->proDistance);
        $defeatScale = 0;
        for($i = 0;$i < $opposite[$_SESSION['stu_prov']];$i++){
            $defeatScale += $this->provScale[$i];
        }
        $defeatScale = 1 - $defeatScale;
        if ($transfer) {
            $this->ajaxReturn(array(
                'status' => 100,
                'info' => '个人信息',
                'data' => $user_student
            ));
        } else {
            $this->assign(array(
                'user_student' => $user_student,
                'defeatScale' => $defeatScale
            ));
        }

    }

    private function _searchWith($where = '', $cond = null, $query = 'select', $list = false) {
        $model = M($where);
        if ($cond instanceof \Closure) {
            $cond = $cond();
        }
        $condition = $cond;
        $first_query_result = $model->where($condition)->$query();
        if ($list) {
            foreach($first_query_result as $key => &$val) {
                if($val['stu_prov'] == '新疆') {
                    $val['stu_prov'] = '故乡';
                }
            }
        }

        return $first_query_result;
    }

    private function _getExtraData($transfer = true) {
        if($transfer) {
            $this->_stu_id = I(trim('post.id'), '');
            $this->_stu_class = I(trim('post.class'), '');
            $this->_stu_dorm = I(trim('post.dorm'), '');
            $this->_stu_dept = I(trim('post.dept'), '');
            if (!IS_POST) {
                $this->ajaxReturn(array(
                    'status' => 403,
                    'info' => '查询参数错误,请重试'
                ));
            }
        } else {
            $this->_stu_class = session('stu_class');
            $this->_stu_dorm = session('stu_dorm');
            $this->_stu_dept = session('stu_dept');
        }

        $this->sameFav = $this->_searchWith('fav', function() {
            $fav = $this->_searchWith('fav', array('stu_id' => $this->_stu_id), 'find');
            for ($i = 5; $i < 6; $i++) {
                if ($fav['fav_info' . $i] == 1) {
                    $cond['fav_info' . $i] = 1;
                }
            }
            return $cond;
        });

        $this->sameClass = $this->_searchWith('stuinfo', array(
            'stu_class' => $this->_stu_class
        ), 'select', true);

        $this->sameDorm = $this->_searchWith('stuinfo', array(
            'stu_dorm' => $this->_stu_dorm
        ), 'select', true);

        $this->techer = $this->_searchWith('stuinfo', array(
            'stu_dept' => $this->_stu_dept
        ), 'find');
        if($transfer) {
            $this->ajaxReturn(array(
                'status' => 100,
                'info' => '大数据',
                'data' => array(
//                    'Fav' => $this->sameFav,
                    'Class' => $this->sameClass,
                    'Dorm' => $this->sameDorm,
                    'Tech' => $this->techer
                )
            ));
        } else {
            $this->assign(array(
                'Fav' => $this->sameFav,
                'Class' => $this->sameClass,
                'Dorm' => $this->sameDorm,
                'Tech' => $this->techer
            ));
        }
    }

//    private function _sameGoal() {   //共同爱好的人
//        $student = M('fav');
//        $stu_condition['stu_id'] = $this->stu_id;
//        $stu_fav = $student->where($stu_condition)->select();
//
////        $m = M('stuinfo');
////        $i = 1000;
////        foreach($this->proDistance as $val) {
////            $i++;
////            $m->where(array('id' => $i))->data(array(
////                'stu_prov' => $val
////            ))->save();
////        }
////        var_dump($m->getLastSql());
////        exit;
//        $condition = array();
//        for($i = 0;$i < 8;$i++) { //判断爱好相同
//            if($stu_fav['fav_info'.$i] == 1){
//                $condition['fav_info'.$i] = 1;
//            }
//        }
//        $same_goal = $student->where($condition)->find();
//        $goal_stu = M('stuinfo');
//        $goal_condition['stu_id'] = $same_goal['stu_id'];
//        $goal_condition['stu_prov'] = $_SESSION['stu_prov'];//设置共同省份
//        $goal_result = $goal_stu->where($goal_condition)->find();
//        if (empty($goal_result)) {
//            return "无共同爱好和省份的人";
//        } else {
//            foreach ($goal_result as $key => $value) {
//                if($value['stu_prov'] == '新疆'){
//                    $this->assign('stu_prov','故乡');
//                }
//            }
//            $this->assign('goal_result',$goal_result);
//        }
//    }
//

    private function _getProv(){
        //省份比例跑的代码
        $DB = M('stuinfo');
        for ($i = 0; $i < 34 ;$i++) {
            $condition['stu_prov'] = $this->proDistance[$i];
            $num = $DB->where($condition)->count();
            $this->provScale[$this->proDistance[$i]] = $num / $this->total;
        }
        $this->sameProv = $this->provScale[session('stu_prov')] * $this->total;
        $this->otherProv = (1 - $this->sameProv) * $this->total;

    }

//    private function _getTeacher(){//查询老师
//        $tea_dept = M('teacher');
//        $condition['stu_dept'] = $_SESSION['stu_dept'];
//        $teacher = $tea_dept->where($condition)->find();
//        $this->assign('teacher',$teacher);
//        //老师名字是$teacher['tea_name'];
//        //老师简介$teacher['tea_content'];
//        //老师照片路径$teacher['tea_picpath'];
//    }
    private function _sexyScale(){

        $deptName = array('通信', '计算机', '软件', '经管', '体育',
            '自动化', '法院', '光电', '传媒', '先进制造');
        $sexyScale = array('通信' => '', '计算机' => '', '软件' => '', '经管' => '',
            '体育' => '','自动化' => '','法院' => '',
            '光电' => '', '传媒' => '', '先进制造' => '');//男生人数比例
        $getSexy = M('stu_info');
        $condition['stu_sexy'] = 0;
        for($i = 0;$i < 10 ; $i++){
            $condition['stu_dept'] = $deptName[$i];
            $dept_condition['stu_dept'] = $deptName[$i];
            $manTotal = $getSexy->where($condition)->count();
            $deptTotal = $getSexy->where($dept_condition)->count();
            $sexyScale[$i] = $manTotal / $deptTotal;
        }

    }

    private function _sameDate(){//数据展示的同年月及星座
        $birthday = M('stuinfo');
        $stuYM = substr($_SESSION['stu_date'],0,6);
        $stuMD = substr($_SESSION['stu_date'],4,4);
        $condition['stu_date'] = $stuYM;
        $lastid = '';//总共的人数
        $sameYM = $birthday->where($condition)->count();
        $same_hororray = $birthday->field('stu_date')->find();
        $sameYM = $lastid/$sameYM;//相同的比例
        $this->assign('sameYM',$sameYM);

        //星座判断
        $hororray = array('0000','0120','0219','0321','0420','0521','0621','0722','0823','0923','1023','1122','1222','1232' );
        $_SESSION['stu_horoscope'] = $hororray;
        if($hororray[1] <= $stuMD && $stuMD < $hororray[2]) {
            $horoscope = '水瓶';
        }elseif ($hororray[2] <= $stuMD && $stuMD < $hororray[3]) {
            $horoscope = '双鱼';
        }elseif ($hororray[3] <= $stuMD && $stuMD < $hororray[4]) {
            $horoscope = '白羊';
        }elseif ($hororray[4] <= $stuMD && $stuMD < $hororray[5]) {
            $horoscope = '金牛';
        }elseif ($hororray[5] <= $stuMD && $stuMD < $hororray[6]) {
            $horoscope = '双子';
        }elseif ($hororray[6] <= $stuMD && $stuMD < $hororray[7]) {
            $horoscope = '巨蟹';
        }elseif ($hororray[7] <= $stuMD && $stuMD < $hororray[8]) {
            $horoscope = '狮子';
        }elseif ($hororray[8] <= $stuMD && $stuMD < $hororray[9]) {
            $horoscope = '处女';
        }elseif ($hororray[9] <= $stuMD && $stuMD < $hororray[10]) {
            $horoscope = '天秤';
        }elseif ($hororray[10] <= $stuMD && $stuMD < $hororray[11]) {
            $horoscope = '天蝎';
        }elseif ($hororray[11] <= $stuMD && $stuMD < $hororray[12]) {
            $horoscope = '射手';
        }else{
            $horoscope = '摩羯';
        }

        //星座
        $hororray1 = array();
        $hororray2 = array();
        $hororray3 = array();
        $hororray4 = array();
        $hororray5 = array();
        $hororray6 = array();
        $hororray7 = array();
        $hororray8 = array();
        $hororray9 = array();
        $hororray10 = array();
        $hororray11 = array();
        $hororray12 = array();
        foreach($same_hororray as $key => $value){
            if($hororray[1] <= $horoday && $horoday < $hororray[2]) {
                $hororray1[$key] = $sane_hororray[$key];
            }elseif ($hororray[2] <= $horoday && $horoday < $hororray[3]) {
                $hororray2[$key] = $sane_hororray[$key];
            }elseif ($hororray[3] <= $horoday && $horoday < $hororray[4]) {
                $hororray3[$key] = $sane_hororray[$key];
            }elseif ($hororray[4] <= $horoday && $horoday < $hororray[5]) {
                $hororray4[$key] = $sane_hororray[$key];
            }elseif ($hororray[5] <= $horoday && $horoday < $hororray[6]) {
                $hororray5[$key] = $sane_hororray[$key];
            }elseif ($hororray[6] <= $horoday && $horoday < $hororray[7]) {
                $hororray6[$key] = $sane_hororray[$key];
            }elseif ($hororray[7] <= $horoday && $horoday < $hororray[8]) {
                $hororray7[$key] = $sane_hororray[$key];
            }elseif ($hororray[8] <= $horoday && $horoday < $hororray[9]) {
                $hororray8[$key] = $sane_hororray[$key];
            }elseif ($hororray[9] <= $horoday && $horoday < $hororray[10]) {
                $hororray9[$key] = $sane_hororray[$key];
            }elseif ($hororray[10] <= $horoday && $horoday < $hororray[11]) {
                $hororray10[$key] = $sane_hororray[$key];
            }elseif ($hororray[11] <= $horoday && $horoday < $hororray[12]) {
                $hororray11[$key] = $sane_hororray[$key];
            }elseif ($hororray[12] <= $horoday && $horoday < $hororray[13]) {
                $hororray12[$key] = $sane_hororray[$key];
            }
        }
        for($i=0;$i<12;$i++){
            $horocount.$i = sizeof($hororray.$i);//每个星座人数
        }

    }
}