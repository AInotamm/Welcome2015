<?php
/**
 * Created by PhpStorm.
 * User: Haku
 * Date: 15/8/10
 * Time: 15:30
 */

namespace Home\Controller;
use Think\Controller;

class ShowController extends BaseController {
    public function index() {
        $this->display('/show');
    }

}