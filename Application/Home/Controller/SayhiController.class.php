<?php
namespace Home\Controller;
use Think\Controller;

class SayhiController extends BaseController {
    private $data_id;

    public function index() {
        $this->showTitle();
        $this->display('');
    }

    public function postTitle() {
        if (!session('?stu_id')) {
            $this->error('请登录后使用', 'index');
        } else if(trim('post.title_content') == '' || !I(trim('post.title_name'))) {
            $this->error('请完整填写所有内容', 'index');
        } else {
            $content['hi_time']= date("Y-m-d h:i:s", time());
            $content['hi_content'] = I(trim('post.title_content'));
            $content['hi_title'] = I(trim('post.title_name'));
            $content['stu_name'] = session('stu_name');
            $content['hi_state'] = 1;
            $title = M('sayhi');
            $title->data($content)->add();
        }
        $this->redirect('Sayhi/index');
    }

    public function showTitle(){
        $title = M('sayhi');
        $condition['hi_state'] = 1;
        $titleAll = $title->where($condition)->select();
        $article_num = M('remark');
        $sayhinum = $title->count();

        for($i = 0 ; $i < $sayhinum ; $i++){
            $condition['content_id'] = $i+1;
            $remarknum = $article_num->where($condition)->count();
            $titleAll[$i]['remark_num'] = $remarknum;
        }

        $this->assign('title',$titleAll);
    }

    public function titleRemark(){
        $remark = M('remark');
        $titleid = I(trim('post.data-id')); //怎么获取待定
        $content['remark_data'] = date("Y-m-d h:i:s", time());
        $content['stu_name'] = session('stu_name');
        $content['content_id'] = $titleid;
        $content['remark_content'] = I(trim('post.remark_content'));
        $content['remark_state'] = 1;
        if(!$content['stu_name']) {
            $this->error('请登录后评论', 'index');
        }
        $remark->data($content)->add();
        $this->redirect('Sayhi/index');
    }

    public function showArticle(){
        if(IS_POST) {
            $this->data_id = I(trim('post.data_id'), '');
        }
        $remark= M('sayhi');
        $condition['id'] = $this->data_id;
        $remarkContent = $remark->where($condition)->find();
        if($remarkContent) {
            $this->ajaxReturn(array(
                'status' => 100,
                'content' => $remarkContent
            ));
        }
    }


    public function showRemark(){
        $this->data_id = I(trim('post.data_id'), '');
        if($this->data_id) {
            $remark= M('remark');
            $condition['remark_state']= 1;
            $condition['content_id'] = $this->data_id;
            $remarkAll= $remark->where($condition)->select();
            $this->ajaxReturn(array(
                'status' => 100,
                'info' => '评论查询成功',
                'post_id' => $this->data_id,
                'data' => $remarkAll
            ));
        } else {
            $this->ajaxReturn(array(
                'status' => 400,
                'info' => '内容ID错误'
            ));
        }
    }
    public function checklogin(){
        if(!session('?stu_id')) {
            $this->ajaxReturn(array(
                'status' => 401,
                'info' => '请登录后使用'
            ));
        };
    }
}