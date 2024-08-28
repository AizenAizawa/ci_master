<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{

    public function index()
    {
        if(isset($this->session->absen_login)){
            redirect('home');
        }else{
            $this->load->view('v_login');
        }   
    }
    function check_login()
    {
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        $sql = "SELECT * FROM user WHERE userEmail = '{$username}' and userPassword = '{$password}'";
        $exc = $this->db->query($sql);
        if ($exc->num_rows() > 0) {
            $data['data'] = $exc->row();
            $data ['status'] = "oke";
            $res['msg'] = "Username atau Passwordnya belum kamu masukkan!!!";
            $session ['absen_login'] = 1;
            $session ['username'] = $data['data']->userEmail;
            $this->session->set_userdata($session);
        } else {
            $data ['data'] = "";
            $data ['status'] = "Error";
        }
        echo json_encode($data);
    }

    function logout(){
        $this->session->sess_destroy();
        redirect(base_url());
    }
    function error_page(){
        $this->load->view('home/v_logout');
    }
}
