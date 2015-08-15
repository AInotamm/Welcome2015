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

    private $provScale = array(
        '重庆市' => '2740', '四川省' => '310', '贵州省' => '95', '陕西省' => '100', '云南省' => '95',
        '湖南省' => '105', '湖北省' => '125', '甘肃省' => '60', '广西' => '50' , '河南省' => '133',
        '青海省' => '15', '江西省' => '80', '广东省' => '54', '宁夏' => '60', '安徽省' => '139',
        '海南省' => '40', '港澳台' =>'4', '山西省' => '62', '河北省' => '93',
        '江苏省' => '55', '山东省' => '96', '福建省' => '63', '浙江省' => '45', '内蒙古' => '10',
        '上海市' => '8', '天津市' => '11', '北京市' => '6', '西藏' => '10',
        '辽宁省' => '26', '吉林省' => '20', '新疆' => '51', '黑龙江省' => '24',
    );
    private $provMen = array(
        '重庆市' => '1835', '四川省' => '232', '贵州省' => '56', '陕西省' => '65', '云南省' => '56',
        '湖南省' => '48', '湖北省' => '69', '甘肃省' => '33', '广西' => '30' , '河南省' => '59',
        '青海省' => '7', '江西省' => '59', '广东省' => '46', '宁夏' => '41', '安徽省' => '85',
        '海南省' => '27', '港澳台' =>'2', '山西省' => '27', '河北省' => '49',
        '江苏省' => '44', '山东省' => '49', '福建省' => '44', '浙江省' => '35', '内蒙古' => '7',
        '上海市' => '6', '天津市' => '7', '北京市' => '6', '西藏' => '7',
        '辽宁省' => '16', '吉林省' => '12', '新疆' => '28', '黑龙江省' => '13',
    );
    private $proDistance = array(
        0 =>'重庆市', 1 => '四川省', 2 => '贵州省', 3 => '陕西省', 4 => '云南省',
        5 =>'湖南省', 6 =>'湖北省', 7 => '甘肃省', 8 => '广西', 9 => '河南省',
        10 => '青海省', 11 => '江西省', 12 => '广东省', 13 => '宁夏', 14 => '安徽省',
        15 => '海南省', 16 => '港澳台', 17 =>'山西省', 18 => '河北省',
        19 => '江苏省', 20 =>'山东省', 21 => '福建省', 22 => '浙江省', 23 => '内蒙古',
        24 => '上海市', 25 => '天津市', 26 => '北京市', 27 => '西藏',
        28 =>'辽宁省', 29 => '吉林省', 30 => '新疆', 31 => '黑龙江省',
    );
    private $horoscope = array(
        '0100' => '摩羯', '0119' => '水瓶', '0218' => '双鱼', '0320' => '白羊',
        '0419' => '金牛', '0520' => '双子', '0621' => '巨蟹',
        '0722' => '狮子', '0822' => '处女', '0922' => '天秤',
        '1023' => '天蝎', '1122' => '射手', '1221' => '摩羯'
    );
    private $pair = array(
        '通信与信息工程学院' => 0.3, '传媒艺术学院' => 0.5, '计算机科学与技术学院' => 0.25,
        '软件工程学院' => 0.1, '经济管理学院' => 0.35, '理学院' => 0.1,
        '自动化学院' => 0.25, '先进制造工程学院' => 0.25, '生物信息学院' => 0.25,
        '国际学院' => 0.4, '光电工程学院/重庆国际半导体学院' => 0.3, '体育学院' => 0.1,
        '法学院' => 0.3
    );

    private $deptName = array(
        '通信与信息工程学院' => '616', '传媒艺术学院' => '598', '计算机科学与技术学院' => '578', '软件工程学院' => '502', '经济管理学院' => '542',
        '理学院' => '200', '自动化学院' => '537', '先进制造工程学院' => '168', '生物信息学院' => '182', '国际学院' => '102',
        '光电工程学院/重庆国际半导体学院' => '501', '体育学院' => '60', '法学院' => '122'
    );
    private $man = array(
        '通信与信息工程学院' => '418', '传媒艺术学院' => '167', '计算机科学与技术学院' => '449', '软件工程学院' => '426',
        '经济管理学院' => '228', '理学院' => '135', '自动化学院' => '432',
        '先进制造工程学院' => '158', '生物信息学院' => '111', '国际学院' => '71',
        '光电工程学院/重庆国际半导体学院' => '390', '体育学院' => '48', '法学院' => '42'
    );
    private $dept = array(
        '通信与信息工程学院' => 'tx', '传媒艺术学院' => 'cm', '计算机科学与技术学院' => 'jsj', '软件工程学院' => 'rj',
        '经济管理学院' => 'jg', '理学院' => 'lxy', '自动化学院' => 'zdh',
        '先进制造工程学院' => 'xjzz', '生物信息学院' => 'sw', '国际学院' => 'gj',
        '光电工程学院/重庆国际半导体学院' => 'gd', '体育学院' => 'ty', '法学院' => 'fxy'
    );


    private $_stu_id;
    private $_stu_name;
    private $_stu_class;
    private $_stu_dorm;
    private $_stu_dept;
    private $_stu_horo;
    private $_stu_prov;
    private $total = 4711;
    private $teacher;
    private $sameFav = array();
    private $sameClass;
    private $sameDorm;
    private $sameBuilding;
    private $sameYM;
    private $sameHoro;
    private $_stu_building;

    public function index(){  //所有的查询你测试看看，最初有没有设置session
        $this->_onData();
        $this->display('Data/index');
    }

    private function _onData() {
        if(IS_POST) {
            $name = I(trim('post.name'), '');
            $pass = I(trim('post.pwd'), '');
            $pass = md5(hash('sha256', ($pass >> ($pass % 3)) . substr($pass, 1, 3)));
        }

        if(session('?stu_id') || ($name && $pass)) {
            $this->_stu_id = session('stu_id');
            $stu = M('stuinfo')->where(array('stu_id' => $this->_stu_id))->find();
            $this->_stu_name = $stu['stu_name'];
            $this->_showInfo(false);
            $this->_getExtraData(false);
            $this->_sameDate();

            if(!IS_POST && empty($name) && empty($pass)) {
                $this->assign(array(
                    'city' => $this->_stu_prov,
                    'city_wide' => $this->provScale[$this->_stu_prov],
                    'city_total' => $this->total - $this->provScale[$this->_stu_prov],
                    'prov_men' => $this->provMen[$this->_stu_prov],
                    'prov_women' => $this->provScale[$this->_stu_prov] - $this->provMen[$this->_stu_prov],
                    'deptmen' => $this->man[$this->_stu_dept],
                    'deptwomen' => $this->deptName[$this->_stu_dept] - $this->man[$this->_stu_dept],
                    'pair' => ceil($this->deptName[$this->_stu_dept] * $this->pair[$this->_stu_dept]),
                    'dog' => ceil($this->deptName[$this->_stu_dept] * (1 - $this->pair[$this->_stu_dept])),
                    'same_birth' => $this->sameYM,
                    'other_birth' => $this->total - $this->sameYM,
                    'horo' => $this->_stu_horo,
                    'same_horo' => $this->sameHoro,
                    'other_horo' => $this->total - $this->sameHoro,
                ));
            } else if ($pass && $name) {
                $this->_sameDate($name, $pass);
                $this->ajaxReturn(array(
                    'status' => 100,
                    'info' => '查询成功',
                    'data' => array(
                        'college' => $this->dept[$this->_stu_dept],
                        'from' => array(
                            'hometown' => $this->provScale[$this->_stu_prov],
                            'others' => $this->total,
                            'male' => $this->provMen[$this->_stu_prov],
                            'famale' => $this->provScale[$this->_stu_prov] - $this->provMen[$this->_stu_prov],
                        ),
                        'same' => array(
                            'samemon' => $this->sameYM,
                            'samehor' => $this->sameHoro,
                            'others' => $this->total
                        ),
                        'sex' => array(
                            'male' => $this->man[$this->_stu_dept],
                            'famale' => $this->deptName[$this->_stu_dept] - $this->man[$this->_stu_dept],
                            'fff' => ceil($this->deptName[$this->_stu_dept] * $this->pair[$this->_stu_dept]),
                            'single' => ceil($this->deptName[$this->_stu_dept] * (1 - $this->pair[$this->_stu_dept])),
                        )
                    )
                ));
            } else {
                $this->ajaxReturn(array(
                    'status' => 404,
                    'info' => '参数错误'
                ));
            }
        }
    }

    private function _showInfo($transfer = true){ //个人信息
        if($transfer) {
            $this->_stu_name = I(trim('post.name'), '');
            $pass = I(trim('post.pwd'), '');
            if(!$this->_stu_name || !$pass) {
                $this->ajaxReturn(array(
                    'status' => 403,
                    'info' => '查询参数错误,请重试'
                ));
            }
        }
        $student = M('stuinfo');
        $condition['stu_name'] = $this->_stu_name;
        if ($pass) {
            $condition['stu_passwd'] = md5(hash('sha256', ($pass >> ($pass % 3)) . substr($pass, 1, 3)));
        }
        $user_student = $student->where($condition)->find();
        if ($transfer) {
            $this->ajaxReturn(array(
                'status' => 100,
                'info' => '个人信息查询成功',
                'data' => $user_student
            ));
        } else {
            $this->assign(array(
                'user_student' => $user_student
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

    /**
     * 得到学生的具体信息
     * 及同班同宿舍辅导员查询
     * 辅导员对应的数据库teacher，数据未填
     * 老师名字是$teacher['tea_name'];
     * 老师简介$teacher['tea_content'];
     * 老师照片路径$teacher['tea_picpath'];
     */
    private function _getExtraData($transfer = true) {
        if($transfer) {
            $this->_stu_name = I(trim('post.name'), '');
            $stu_pass = I(trim('post.pwd'), '');
            if (!IS_POST || !$this->_stu_name || !$stu_pass) {
                $this->ajaxReturn(array(
                    'status' => 403,
                    'info' => '查询参数错误,请重试'
                ));
            }

            $stuinfo = M('stuinfo');
            $data = $stuinfo->where(array(
                'stu_name' => $this->_stu_name,
                'stu_passwd' => md5(hash('sha256', ($stu_pass >> ($stu_pass % 3)) . substr($stu_pass, 1, 3)))
            ))->find();

            $this->_stu_dept = $data['stu_dept'];
            $this->_stu_class = $data['stu_class'];
            $this->_stu_dorm = $data['stu_dorm'];
            $this->_stu_prov = $data['stu_prov'] == '故乡' ? '新疆' : $data['stu_prov'];

        } else {
            $this->_stu_class = session('stu_class');
            $this->_stu_dorm = session('stu_dorm');
            $this->_stu_dept = session('stu_dept');
            $this->_stu_prov = session('stu_prov') == '故乡' ? '新疆' : session('stu_prov');
            $this->_stu_building = session('stu_building');
        }

        $fav = $this->_searchWith('fav', array('stu_id' => $this->_stu_id), 'find');
        for ($i = 1; $i < 13; $i++) {
            if ($fav['fav_info' . $i] == 1) {
                $cond['fav_info' . $i] = 1;
            }
        }
        $favlist = $this->_searchWith('fav', $cond, 'select');
        for($i = 0; $i < count($favlist); $i++) {
            $this->sameFav[] = $this->_searchWith('stuinfo', array(
                'stu_id' => $favlist[$i]['stu_id']
            ), 'find');
        }

        $this->sameClass = $this->_searchWith('stuinfo', array(
            'stu_class' => $this->_stu_class
        ), 'select', true);

        $this->assign('page_total', ceil(count($this->sameClass) / 14));

        $this->sameDorm = $this->_searchWith('stuinfo', array(
            'stu_dorm' => $this->_stu_dorm,
            'stu_building'=> $this->_stu_building
        ), 'select', true);

        $this->teacher = $this->_searchWith('teacher', array(
            'stu_dept' => $this->_stu_dept
        ), 'select');

        if($transfer) {
            $this->ajaxReturn(array(
                'status' => 100,
                'info' => '大数据',
                'data' => array(
                    'Fav' => $this->sameFav,
                    'Class' => $this->sameClass,
                    'Dorm' => $this->sameDorm,
                    'Tech' => $this->teacher
                )
            ));
        } else {
            $this->assign(array(
                'Fav' => $this->sameFav,
                'Class' => $this->sameClass,
                'Dorm' => $this->sameDorm,
                'Tech' => $this->teacher
            ));
        }
    }

    private function _sameDate($name = '', $pass = ''){
        //数据展示的同年月及星座
        $birthday = M('stuinfo');
        if (!empty($name) && !empty($pass)) {
            $stu_data = $birthday->where(array(
                'stu_name' => $name, 'stu_passwd' => $pass
            ))->find();

            if (!$stu_data) {
                $this->ajaxReturn(array(
                    'status' => 404,
                    'info' => '用户查询失败'
                ));
            }

            $this->_stu_prov = $stu_data['stu_prov'];
            $this->_stu_dept = $stu_data['stu_dept'];
        }


        $stuYM = substr(session('stu_date'),0,4);
        $stuMD = substr(session('stu_date'),5,2);
        $stuDA = substr(session('stu_date'),8,2);
        $condition['stu_date'] = array('like', $stuYM . '-' . $stuMD . '%');
        $this->sameYM = $birthday->where($condition)->count();

        // 本人星座判断
        foreach($arr = array_keys($this->horoscope) as $key => $val) {
            if($stuMD . $stuDA > $val) {} else {
                $this->_stu_horo = $this->horoscope[$arr[$key - 1]];
                break;
            }
        }

        // 星座
        $date = $birthday->field('stu_date')->select();
        $horoData = array();
        foreach($date as $v) {
            $month = substr($v['stu_date'],5,2);
            $day = substr($v['stu_date'],8,2);
            foreach($arr = array_keys($this->horoscope) as $key => $val) {
                if($month . $day > $val) {} else {
                    $horoData[] = $this->horoscope[$arr[$key - 1]];
                    break;
                }
            }
        }
        $countSameHoro = array_count_values($horoData);
        $this->sameHoro = $countSameHoro[$this->_stu_horo];
    }

    public function _empty() {
        $this->display('404/index');
    }
}