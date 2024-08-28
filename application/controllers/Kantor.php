<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kantor extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_kantor');
    }

	public function index()
	{
        $data['title'] = 'Kantor';
        $data['kantor'] = $this->m_kantor->get_kantor_data();
        $data['js'] = 'kantor';

		$this->load->view('header', $data);
        $this->load->view('sidebar');
        $this->load->view('kantor/v_kantor', $data);
        $this->load->view('footer', $data);
	}
    public function load_data(){
        $data['kantor'] = $this->m_kantor->get_kantor_data();
        echo json_encode($data);
    }
    public function create() {
        if ($this->input->post('txcode') != '') {
            
            $code = $this->input->post('txcode');
            $name = $this->input->post('txname');
            $email = $this->input->post('txemail');
            $telp = $this->input->post('txtelp');
            $region = $this->input->post('txregion');
            $city = $this->input->post('txcity');
            $address = $this->input->post('txaddress');
    
            $query_code = $this->db->query("SELECT COUNT(*) as count FROM branch WHERE branchCode = '{$code}'");
            $result_code = $query_code->row();

            $query_email = $this->db->query("SELECT COUNT(*) as count FROM branch WHERE branchEmail = '{$email}'");
            $result_email = $query_email->row();

            $query_telp = $this->db->query("SELECT COUNT(*) as count FROM branch WHERE branchTelp = '{$telp}' ");
            $result_telp = $query_telp->row();
    
            if ($result_code->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code} sudah terpakai";
            }elseif ($result_email->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Email {$email} sudah terpakai";
            }elseif ($result_telp->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Telp {$telp} sudah terpakai";
            } else {
                $sql = "INSERT INTO branch (branchClientId,branchManagerEmployeeId,branchCode, branchName, branchEmail, branchTelp, branchRegion, branchCity, branchAddress, branchActive,branchIsCenter) VALUES (1,0,'{$code}','{$name}', '{$email}' ,'{$telp}','{$region}' ,'{$city}' ,'{$address}' , 1, 0)";
                $exc = $this->db->query($sql);
    
                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$name} berhasil";

                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$name} gagal";
                }
            }
            echo json_encode($res);
        }
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM branch WHERE branchId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Code tidak ditemukan";
        }
        echo json_encode($res);
    }
    public function update_table() {
        $id = $this->input->post('id'); 
        $branchCode = $this->input->post('branchCode');
        $branchName = $this->input->post('branchName');
        $branchEmail = $this->input->post('branchEmail');
        $branchTelp = $this->input->post('branchTelp');
        $branchRegion = $this->input->post('branchRegion');
        $branchCity = $this->input->post('branchCity');
        $branchAddress = $this->input->post('branchAddress');
    
        $this->db->where('branchCode', $branchCode);
        $this->db->where_not_in('branchId', $id);
        $query_code = $this->db->get('branch');

        $this->db->where('branchEmail', $branchEmail);
        $this->db->where_not_in('branchId', $id);
        $query_email = $this->db->get('branch');

        $this->db->where('branchTelp', $branchTelp);
        $this->db->where_not_in('branchId', $id);
        $query_telp = $this->db->get('branch');
    
        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$branchCode} sudah digunakan oleh data lain";
        }elseif ($query_email->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Email {$branchEmail} sudah digunakan oleh data lain";
        }elseif ($query_telp->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Telp {$branchTelp} sudah digunakan oleh data lain";
        } else {
            $this->db->where('branchId', $id);
            $update_data = array(
                'branchCode' => $branchCode,
                'branchName' => $branchName,
                'branchEmail' => $branchEmail,
                'branchTelp' => $branchTelp,
                'branchRegion' => $branchRegion,
                'branchCity' => $branchCity,
                'branchAddress' => $branchAddress
            );
    
            if ($this->db->update('branch', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }
    
        echo json_encode($res);
    }
    
    public function delete_table() {
        $id = $this->input->post("id");
         if($this->m_kantor->delete_table($id)) {
            $res['status'] = 'success';
            $res['msg'] = 'Data Berhasil dihapus';
         } else {
            $res['status'] = 'error';
            $res['msg'] = 'Data Gagagl dihapus';
         }
         echo json_encode($res);
    }

    public function active() {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_kantor->active_data($id)) {
            $res["status"] = "success";
            $ket=($status == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil ". $ket;
        } else {
            $res["status"] = "error";
            $ket=($status == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data Gagal ". $ket;
        }
        echo json_encode($res);
    }
    public function pusat(){
        $id = $this->input->post("id");
        $pusat = $this->input->post("pusat"); 
        if ($this->m_kantor->pusat_data($id)) {
            $res["pusat"] = "success";
            $ket=($pusat == 1)? "Nonpusat" : "Pusat";
            $res["msg"] = "Data berhasil ". $ket;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data Gagal ";
        }
        echo json_encode($res);
    }
}
