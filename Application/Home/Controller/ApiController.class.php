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
        'login' => 'login', 'extra' => 'getExtraInfo', 'info' => '_showInfo',
        'data' => '_getExtraData', 'pair' => ''
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
                    'trace' => $re->getTrace(),
                    'msg' => $re->getMessage(),
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
        }
        $this->_invoke($this->c, $this->a, $param);
    }

    public function banner() {
        $imageAddr = 'Public/image/logo.png';
        $imageInfo = getimagesize($imageAddr);
        if ($imageInfo) {
            $this->ajaxReturn(array(
                'status' => 204,
                'info' => 'banner 已获取',
                'data' => "data:{$imageInfo['mime']};base64," . chunk_split(base64_encode(file_get_contents($imageAddr)))
            ));
        }
    }

//    public function info() {
//        $stu_id = I(trim('post.id'), '');
//        if(IS_POST && $stu_id) {
//            $stu = M('stuinfo');
//            $result = $stu->where(array('stu_id' => $stu_id))->find();
//            if ($result) {
//                $this->ajaxReturn(array(
//                    'status' => 100,
//                    'info' => '学生信息',
//                    'data' => $result
//                ));
//            }
//        } else {
//            $this->ajaxReturn(array(
//                'status' => 403,
//                'info' => '查询参数错误,请重试'
//            ));
//        }
//    }

}