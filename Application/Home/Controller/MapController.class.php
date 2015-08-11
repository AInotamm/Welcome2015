<?php
/**
 * Created by PhpStorm.
 * User: Haku
 * Date: 15/8/10
 * Time: 15:28
 */

namespace Home\Controller;
use Think\Controller;

class MapController extends BaseController {
    public function index(){
        $this->display('Map/index');
    }
}