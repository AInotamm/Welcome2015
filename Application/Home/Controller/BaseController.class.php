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
    public function login() {
        $this->_getStuInfo();
    }

    /**
     * 前置操作,判断用户登录情况
     */
    public function _before_index(){
        if(empty(session('stu_id'))) {
            $this->assign('checklogin','新生登陆');
            $this->assign('checkState','');
        } else {
            $this->assign('checklogin','退出登录');
            $this->assign('checksState',"{:U(Base/destroySession)}");
        }
    }

    public function destroySession(){
        session_unset();
        $proDistance = array(
            0 =>'重庆', 266 => '成都', 328 => '贵阳', 572 => '西安',
            621 => '昆明', 647 =>'湖南省', 762 =>'湖北', 768 => '兰州', 770 => '广西省',
            893 => '河南省', 906 => '青海省', 911 => '江西省', 977 => '广东省', 979 => '宁夏',
            1061 => '安徽', 1073 => '海南', 1075 => '澳门', 1081 =>'山西', 1108 =>'香港',
            1195 => '河北', 1207 => '江苏', 1253 =>'山东', 1312 => '福建', 1314 => '浙江',
            1342 => '内蒙古', 1445 => '上海', 1447 => '天津', 1465.2 => '北京', 1485 => '西藏',
            1561 => '台湾', 2040 =>'辽宁', 2301 => '吉林', 2306 => '新疆', 2515 => '黑龙江',
        );
    }

    private function _checkUserState(){
        if (session('userName') == null) {
        } else {

        }
    }

    private function _getInfo(){
        $stu_tel = I(trim('post.stu_tel'));
        $stu_qq = I(trim('post.stu_qq'));
        $beh_arr0 = I(trim('post.beh_arr0'));
        $beh_arr1 = I(trim('post.beh_arr1'));
        $beh_arr2 = I(trim('post.beh_arr2'));
        $student = M('stu_info');
        $condition['stu_id'] = $_SESSION('stu_id');
        $goal['stu_tel'] = $stu_tel;
        $goal['stu_qq'] = $stu_qq;
        $goal['stu_status'] = '1';
        $stu = $student->where($condition)->save($goal);
    }

    private function _getStuInfo(){//查询学生
        $stuId = I(trim('post.user_name'));
        $password = I(trim('post.password'));
        // md5(hash('sha256', ($password >> ($password%3)).substr($password, 1, 3)));
        $condition = array(
            'stu_id' => $stuId,
            'stu_passwd' => $password
        );
        $stuinfo = M('stuinfo');
        $stu = $stuinfo->where($condition)->find();
        if ($stu && $stu['stu_id'] == $stuId) {
            $this->_saveSession($stu);
            $this->_checkUserState();
            $this->_checkExtraInfo();
            $this->ajaxReturn(array(
                'status' => 200,
                'info' => '用户登录成功'
            ));
        } else {
            $this->ajaxReturn(array(
                'status' => 400,
                'info' => '用户登录失败',
                'describe' => '学号或密码错误'
            ));
        }
    }

    private function _checkExtraInfo(){//判断qqtel是否有数据是否弹窗
        if ($_SESSION['stu_qq'] == null && $_SESSION['stu_tel'] == null) {

        } else {
        }
    }

    private function _saveSession($data) {
        $_SESSION['stu_id'] = $data['stu_id'];
        $_SESSION['stu_unicode'] = $data['stu_unicode'];
        $_SESSION['stu_sexy'] = $data['stu_sexy'];
        // $_SESSION['stu_data'] = $data['stu_data'];
        $_SESSION['stu_id'] = $data['stu_id'];
        $_SESSION['stu_dept'] = $data['stu_dept'];
//        $_SESSION['stu_qq'] = $data['stu_qq'];
//        $_SESSION['stu_tel'] = $data['stu_tel'];

    }

    // private function _getIp(){//ip获取
    // 	$stuIp=get_client_ip();
    // 	// $Ip = new Org</br>et\IpLocation('UTFWry.dat'); // 实例化类 参数表示IP地址库文件
    // 	// $area = $Ip->getlocation($stuIp); // 获取某个IP地址所在的位置
    // 	// echo $area;
    // }
}