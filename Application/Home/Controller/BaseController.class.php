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
                'login1' => 'login1',
                'login2' => 'login2',
                'checkLogin' => '新生登录',
                'checkState' => '#'
            ));
        } else {
            $this->assign(array(
                'login1' => 'loginnot1',
                'login2' => 'loginnot2',
                'checkLogin' => '退出登录',
                'checkState' => U(CONTROLLER_NAME . '/destroySession')
            ));
        }
    }

    public function login() {
        $this->_onLogging();
        $this->_getStuInfo();
    }

    private function _onLogging() {
        static::$username = I(trim('post.user_name'));
        static::$password = I(trim('post.password'));
        if (!IS_POST && empty(static::$username) && empty(static::$password)) {
            $this->ajaxReturn(array(
                'status' => 302,
                'info' => '请求发生转移,请重试'
            ));
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
                'info' => '登录失败,学号或身份证后六位错误',
            ));
        }
    }

    public function getExtraInfo() {
        $stu_tel = I(trim('post.stu_tel'));
        $stu_qq = I(trim('post.stu_qq'));
        $beh_arr = array(
            I(trim('post.beh_arr0')),
            I(trim('post.beh_arr1')),
            I(trim('post.beh_arr2'))
        );
        if (!IS_POST && !$stu_tel && !$stu_qq) {
            $this->ajaxReturn(array(
                'status' => 401,
                'info' => '抱歉,信息未填写完整'
            ));
        }
        $this->_cfav = M('fav');
        $extraInfo['stu_id'] = session('stu_id');
        $extra_exist = $this->_cfav->where($extraInfo)->find();
        //兴趣爱好提交，如果填了一次第二次没有，就这么输入
        if (isset($extra_exist)) {
            $this->_cfav->where($extraInfo)->filter('strip_tags')->data(array(
                'fav_info1' => $beh_arr[0],
                'fav_info2' => $beh_arr[1],
                'fav_info3' => $beh_arr[2]
            ))->save();
        }
        $str = implode(',', $beh_arr);
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
            if (!empty($tel) && !empty($qq) && count($fav_arr) == 3) {
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
        $_SESSION['stu_dorm'] = $data['stu_dorm'];
        $_SESSION['stu_qq'] = $data['stu_qq'];
        $_SESSION['stu_tel'] = $data['stu_tel'];
        $_SESSION['stu_class']= $data['stu_class'];
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
        $this->redirect(CONTROLLER_NAME . '/index');
    }
}