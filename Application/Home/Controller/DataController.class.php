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
    public function index(){
        $this->display('Data/index');
    }
}