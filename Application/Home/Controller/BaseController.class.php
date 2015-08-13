<?php
/**
 * Created by PhpStorm.
 * User: Haku
 * Date: 15/8/11
 * Time: 03:08
 */
namespace Home\Controller;
use Think\Controller;

abstract class BaseController extends Controller {

    private $status_code;
    private $status_msg;

    protected static $username;
    protected static $password;

    private $_cinfo;
    private $_cfav;
    private $_cip;

    /**
     * 前置操作,判断用户登录情况
     */
    public function _before_index(){
        if(!session('?stu_id')) {
            $this->assign(array(
                'checkLogin' => '新生登录',
                'checkState' => '#'
            ));
        } else {
            $this->assign(array(
                'checkLogin' => '退出登录',
                'checkState' => U(CONTROLLER_NAME . '/destroySession')
            ));
        }
    }

    public function login() {
        ob_start();
        $this->_onLogging();
        $this->_getStuInfo();
    }

    private function _onLogging() {
        static::$username = I(trim('post.user_name'));
        static::$password = I(trim('post.password'));
        if (!IS_POST && empty(static::$username) && empty(static::$password)) {
//            $this->display('Index/index');
        }
    }

    private function _getStuInfo(){  //查询学生
        // md5(hash('sha256', ($password >> ($password%3)).substr($password, 1, 3)));
        $condition = array(
            'stu_id' => static::$username, 'stu_passwd' => static::$password
        );
        $this->_cinfo = M('stuinfo');
        $stu = $this->_cinfo->where($condition)->find();
        //关于IP判断，防刷
        $this->_cip = M('blackip');
        $ban_ip = array('black_ip' => $this->_getIp());
        $blacktime = $this->_cip->where($ban_ip)->find();
        if ($blacktime['blacktime'] > 5) { //5次后永久gg这里添加个View层或者别的直接指向gg页面
            // $this->display('');
            $this->error('你的 IP 已被攻陷!');
        } else if($_SESSION['IP_state'] > 10) {//该次登陆如果连续10次，session默认失效时间是24分钟
            $goal['blacktime'] = $blacktime['blacktime'] + 1;
            $this->_cip->where($ban_ip)->save($goal);
        } else if($stu && $stu['stu_id'] == static::$username) {
            $this->_saveSession($stu);
            if (!$stu['stu_status']) {
                $this->_cinfo->where($condition)->save(array('stu_status' => 1));
            }
            //
            $this->status_msg = ob_get_contents();
            ob_end_flush();
            //
            $this->status_code = 200;
            $this->status_msg = "登录成功";
            $this->_checkExtraInfo();
            $this->ajaxReturn(array(
                'status' => $this->status_code,
                'info' => $this->status_msg
            ));
        } else {
            if (empty($_SESSION['IP'])) {
                $_SESSION['IP_state'] = 0;
            } else {
                $_SESSION['IP_state'] = $_SESSION['IP_state'] + 1;
            }
            $this->ajaxReturn(array(
                'status' => 400,
                'info' => '登录失败,帐号或密码错误',
            ));
        }
    }

    public function getExtraInfo() {
        $stu_tel = I(trim('post.stu_tel'));
        $stu_qq = I(trim('post.stu_qq'));
        $beh_arr = array(
            'fav_info1' => I(trim('post.beh_arr0')),
            'fav_info2' => I(trim('post.beh_arr1')),
            'fav_info3' => I(trim('post.beh_arr2'))
        );
        $this->_cfav = M('fav');
        $extraInfo['stu_id'] = session('stu_id');
        $extra_exist = $this->_cfav->where($extraInfo)->find();
        //兴趣爱好提交，如果填了一次第二次没有，就这么输入
        if (isset($extra_exist)) {
            $this->_cfav->data(array(
                'stu_id' => $extraInfo['stu_id'],
                'fav_info1' => $beh_arr['fav_info1'],
                'fav_info2' => $beh_arr['fav_info2'],
                'fav_info3' => $beh_arr['fav_info3']
            ))->add();
            $str = implode(',', $beh_arr);
        }

        $this->_cinfo = M('stuinfo');
        $goal['stu_tel'] = $stu_tel;
        $goal['stu_qq'] = $stu_qq;
        $goal['stu_fav'] = $str;
        $this->_cinfo->where($extraInfo)->save($goal);

        $this->ajaxReturn(array(
            'status' => 203,
            'info' => '信息更新成功'
        ));
    }

    private function _checkExtraInfo(){//判断qqtel是否有数据是否弹窗
        $id = session('stu_id');
        if($id) {
            $extra = $this->_cinfo->where(array('stu_id' => $id))->getField('stu_id, stu_tel, stu_qq, stu_fav');
            $extra = array_values(each($extra)[1]);
            list(, $tel, $qq, $fav) = $extra;
            $fav_arr = explode(',', $fav);
            if (isset($tel, $qq, $fav) && count($fav_arr) == 3) {
                $this->status_code = 201;
                $this->status_msg .= ",信息完整";
            } else {
                $this->status_code = 202;
                $this->status_msg = "信息未补充,请填写";
            }
        }
    }

    private function _saveSession($data) {
        //int类型的生日
        $_SESSION['stu_date'] = $data['stu_date'];
        $_SESSION['stu_id'] = $data['stu_id'];
        $_SESSION['stu_unicode'] = $data['stu_unicode'];
        $_SESSION['stu_sexy'] = $data['stu_sexy'];
//        $_SESSION['stu_data'] = $data['stu_data'];
        $_SESSION['stu_id'] = $data['stu_id'];
        $_SESSION['stu_dept'] = $data['stu_dept'];
//        $_SESSION['stu_qq'] = $data['stu_qq'];
//        $_SESSION['stu_tel'] = $data['stu_tel'];
//        $_SESSION['stu_class']= $data['stu_class'];
    }

    /**
     * 获取客户端IP地址
     * @return mixed
     */
    private function _getIp(){
        return get_client_ip();
//         $Ip = new Org</br>et\IpLocation('UTFWry.dat'); // 实例化类 参数表示IP地址库文件
//         $area = $Ip->getlocation($stuIp); // 获取某个IP地址所在的位置
//         echo $area;
    }


    public function destroySession(){
        session(null);
//        $proDistance = array(
//            0 =>'重庆', 266 => '成都', 328 => '贵阳', 572 => '西安',
//            621 => '昆明', 647 =>'湖南省', 762 =>'湖北', 768 => '兰州', 770 => '广西省',
//            893 => '河南省', 906 => '青海省', 911 => '江西省', 977 => '广东省', 979 => '宁夏',
//            1061 => '安徽', 1073 => '海南', 1075 => '澳门', 1081 =>'山西', 1108 =>'香港',
//            1195 => '河北', 1207 => '江苏', 1253 =>'山东', 1312 => '福建', 1314 => '浙江',
//            1342 => '内蒙古', 1445 => '上海', 1447 => '天津', 1465.2 => '北京', 1485 => '西藏',
//            1561 => '台湾', 2040 =>'辽宁', 2301 => '吉林', 2306 => '新疆', 2515 => '黑龙江',
//        );
        $this->redirect(CONTROLLER_NAME . '/index');
    }
}