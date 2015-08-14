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
        '重庆' => '2740', '四川' => '310', '贵州' => '95', '陕西' => '100', '云南' => '95',
        '湖南' => '105', '湖北' => '125', '甘肃' => '60', '广西' => '50' , '河南' => '133',
        '青海' => '15', '江西' => '80', '广东' => '54', '宁夏' => '60', '安徽' => '139',
        '海南' => '40', '港澳台' =>'4', '山西' => '62', '河北' => '93',
        '江苏' => '55', '山东' => '96', '福建' => '63', '浙江' => '45', '内蒙古' => '10',
        '上海' => '8', '天津' => '11', '北京' => '6', '西藏' => '10',
        '辽宁' => '26', '吉林' => '20', '新疆' => '51', '黑龙江' => '24',
    );
    private $provMen = array(
        '重庆' => '1835', '四川' => '232', '贵州' => '56', '陕西' => '65', '云南' => '56',
        '湖南' => '48', '湖北' => '69', '甘肃' => '33', '广西' => '30' , '河南' => '59',
        '青海' => '7', '江西' => '59', '广东' => '46', '宁夏' => '41', '安徽' => '85',
        '海南' => '27', '港澳台' =>'2', '山西' => '27', '河北' => '49',
        '江苏' => '44', '山东' => '49', '福建' => '44', '浙江' => '35', '内蒙古' => '7',
        '上海' => '6', '天津' => '7', '北京' => '6', '西藏' => '7',
        '辽宁' => '16', '吉林' => '12', '新疆' => '28', '黑龙江' => '13',
    );
    private $proDistance = array(
        0 =>'重庆', 1 => '四川', 2 => '贵州', 3 => '陕西', 4 => '云南',
        5 =>'湖南', 6 =>'湖北', 7 => '甘肃', 8 => '广西', 9 => '河南',
        10 => '青海', 11 => '江西', 12 => '广东', 13 => '宁夏', 14 => '安徽',
        15 => '海南', 16 => '港澳台', 17 =>'山西', 18 => '河北',
        19 => '江苏', 20 =>'山东', 21 => '福建', 22 => '浙江', 23 => '内蒙古',
        24 => '上海', 25 => '天津', 26 => '北京', 27 => '西藏',
        28 =>'辽宁', 29 => '吉林', 30 => '新疆', 31 => '黑龙江',
    );
    private $horoscope = array(
        '0100' => '摩羯', '0119' => '水瓶', '0218' => '双鱼', '0320' => '白羊',
        '0419' => '金牛', '0520' => '双子', '0621' => '巨蟹',
        '0722' => '狮子', '0822' => '处女', '0922' => '天秤',
        '1023' => '天蝎', '1122' => '射手', '1221' => '摩羯'
    );
    private $pair = array(
        '通信' => 0.3, '传媒' => 0.5, '计算机' => 0.25,
        '软件' => 0.1, '经管' => 0.35, '理学院' => 0.1,
        '自动化' => 0.25, '先进制造' => 0.25, '生物' => 0.25,
        '国际' => 0.4, '光电' => 0.3, '体育' => 0.1,
        '法学院' => 0.3
    );

    private $deptName = array(
        '通信' => '616', '传媒' => '598', '计算机' => '578', '软件' => '502', '经管' => '542',
        '理学院' => '200', '自动化' => '537', '先进制造' => '168', '生物' => '182', '国际' => '102',
        '光电' => '501', '体育' => '60', '法学院' => '122'
    );
    private $man = array(
        '通信' => '418', '传媒' => '167', '计算机' => '449', '软件' => '426',
        '经管' => '228', '理学院' => '135', '自动化' => '432',
        '先进制造' => '158', '生物' => '111', '国际' => '71',
        '光电' => '390', '体育' => '48', '法学院' => '42'
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
    private $sameYM;
    private $sameHoro;

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
                        'from' => array(
                            'hometown' => $this->provScale[$this->_stu_prov],
                            'all' => $this->total,
                            'male' => $this->provMen[$this->_stu_prov],
                            'famale' => $this->provScale[$this->_stu_prov] - $this->provMen[$this->_stu_prov],
                        ),
                        'same' => array(
                            'samemon' => $this->sameYM,
                            'samehor' => $this->sameHoro,
                            'all' => $this->total
                        ),
                        'sex' => array(
                            'male' => $this->man[$this->_stu_dept],
                            'famale' => $this->deptName[$this->_stu_dept] - $this->man[$this->_stu_dept],
                            'fff' => ceil($this->deptName[$this->_stu_dept] * $this->pair[$this->_stu_dept]),
                            'single' => ceil($this->deptName[$this->_stu_dept] * (1 - $this->pair[$this->_stu_dept])),
                        ),
                        'college' => $this->_stu_dept
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
        $opposite = array_flip($this->proDistance);
        $defeatScale = 0;
        for($i = 0;$i < $opposite[$_SESSION['stu_prov']];$i++){
            $defeatScale += $this->provScale[$i];
        }
        $defeatScale = 1 - $defeatScale;
        if ($transfer) {
            $this->ajaxReturn(array(
                'status' => 100,
                'info' => '个人信息查询成功',
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
            $this->_stu_prov = $data['stu_prov'];

        } else {
            $this->_stu_class = session('stu_class');
            $this->_stu_dorm = session('stu_dorm');
            $this->_stu_dept = session('stu_dept');
            $this->_stu_prov = session('stu_prov');
        }

        $favlist = $this->_searchWith('fav', function() {
            $fav = $this->_searchWith('fav', array('stu_id' => $this->_stu_id), 'find');
            for ($i = 1; $i < 13; $i++) {
                if ($fav['fav_info' . $i] == 1) {
                    $cond['fav_info' . $i] = 1;
                }
            }
            return $cond;
        }, 'select');
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
            'stu_dorm' => $this->_stu_dorm
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