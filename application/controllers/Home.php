<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    public function index()
    {
        $data['title'] = 'Home';
        $data['active'] = 'sidebar-item active has-sub'; 
        //session_destroy();
        if(isset($this->session->absen_login)){
            $this->load->view('header',$data);
            $this->load->view('home/v_index');
            $this->load->view('footer');
        }else{
            $this->load->view('home/v_logout');
        }
    }
    function loadData()
    {
        echo 'Hallo';
    }
    function yasashiData()
    {
        $this->load->view('home/y_index');
    }
}
