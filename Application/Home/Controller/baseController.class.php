<?php
/**
 * Created by PhpStorm.
 * User: Haku
 * Date: 15/8/10
 * Time: 15:31
 */

namespace Home\Controller;
use Think\Controller;

abstract class BaseController extends Controller {
    public function _before_index() {
        $this->display('/header');
    }
    public function index(){}
    public function _after_index() {
        $this->display('/footer');
    }
}