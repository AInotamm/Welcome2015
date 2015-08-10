<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends baseController {
    public function index(){
        $this->display('/index');
    }
}