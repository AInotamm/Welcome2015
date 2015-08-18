<?php
/**
 * Created by PhpStorm.
 * User: Haku
 * Date: 15/8/14
 * Time: 01:57
 */

namespace Home\Controller;
use Think\Controller;

class ApiController extends Controller {

    private $c = ACTION_NAME;   // 跳转到该控制器
    private $a;
    private $actionlist = array(
        'login' => 'login',  // 登录
        'extra' => 'getExtraInfo', // 补充额外信息
        'info' => '_showInfo',  // 个人信息
        'data' => '_onData', // 大数据的数据展示
        'friend' => '_getExtraData' // 朋友配对
    );

    private function _invoke($clz = '', $act = '', $param, $namespace = 'Home\\Controller\\') {
        $clz = ucwords($clz);
        $clz_name = $namespace . $clz . 'Controller';
        try {
            $ref_clz = new \ReflectionClass($clz_name);
            if ($ref_clz->hasMethod($act)) {
                $ref_fun = new \ReflectionMethod($clz_name, $act);
                if($ref_fun->isPrivate() || $ref_fun->isProtected()) {
                    $ref_fun->setAccessible(true);
                }
                if($ref_fun->isStatic()) {
                    $ref_fun->invoke(null);
                } else {
                    $ref_fun_par = $ref_fun->getParameters();
                    if(!empty($param) && is_array($param)) {
                        if (is_array($ref_fun_par) && count($ref_fun_par) == count($param)) {
                            $ref_fun->invokeArgs(new $clz_name(), $param);
                        } else {
                            $ref_fun->invoke(new $clz_name());
                        }
                    } else {
                       $ref_fun->invoke(new $clz_name());
                    }
                }
            }
        } catch (\LogicException $le) {
            $this->ajaxReturn(array(
                'status' => '500',
                'info' => '服务器内部发生严重错误'
            ));
        } catch (\ReflectionException $re) {
            $this->ajaxReturn(array(
                'status' => '404',
                'info' => '访问' . $clz . '控制器下的非法操作',
                'data' => array(
//                    'trace' => $re->getTrace(),
//                    'msg' => $re->getMessage(),
                    'code' => $re->getCode()
                )
            ));
        }
    }

    public function _empty() {
        $act = I(trim('get.push'), '', 'htmlspecialchars');
        $param = I(trim('post.'), '', 'strip_tags,htmlspecialchars');
        if (array_key_exists($act, $this->actionlist)) {
            $this->a = $this->actionlist[$act];
        } else {
            $this->display('404/index');
        }
        $this->_invoke($this->c, $this->a, $param);
    }

    public function banner() {
        $name = I(trim('post.name'), '');
        /*
         * 1. banner1
         * 2. color_i (0 - 25)
         * 3. person_i (1 - 20)
         * 4. teacher_i (1 - 8)
         * */
        $path = I(trim('post.path'), '');
        /*
         * 1. index
         * 2. color
         * 3. person
         * 4. teacher
         * */
        $fix = $path == 'person' ? '.png' : '.jpg';
        $imageAddr = 'Public/image/' . $path . '/' .  $name . $fix;
        $imageInfo = is_file($imageAddr);
        if ($imageInfo) {
            $this->ajaxReturn(array(
                'status' => 204,
                'info' => $name . '已获取',
//                'data' => "data:{$imageInfo['mime']};base64," . chunk_split(base64_encode(file_get_contents($imageAddr)))
                'data' => array(
                    0 => 'http://hongyan.cqupt.edu.cn/welcome/2015/' . $imageAddr,
                    1 => null,
                    2 => null
                )
            ));
        } else {
            $this->ajaxReturn(array(
                'status' => 404,
                'info' => $name . '未找到'
            ));
        }
    }

}