<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Bank extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_bank');
    }

    public function index()
    {
        $data['title'] = 'Bank';
        $data['bank'] = $this->m_bank->get_bank_data();
        $data['js'] = 'Bank';

        $this->load->view('header', $data);
        $this->load->view('sidebar');
        $this->load->view('bank/v_bank', $data);
        $this->load->view('footer', $data);
    }
    public function create() {
        if ($this->input->post('txrekening') != '') {
            
            $rekening = $this->input->post('txrekening');
            $bank = $this->input->post('txbank');
    
            $query = $this->db->query("SELECT COUNT(*) as count FROM bank WHERE bankBill = '{$rekening}'");
            $result = $query->row();
    
            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Nomor Rekening {$rekening} sudah terpakai";
            }else {
                $sql = "INSERT INTO bank (bankClientId, bankBill, bankName, bankActive) VALUES (1,'{$rekening}', '{$bank}', 1)";
                $exc = $this->db->query($sql);
    
                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$bank} berhasil";

                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$bank} gagal";
                }
            }
            echo json_encode($res);
        }
    }
    public function load_data(){
        $data['bank'] = $this->m_bank->get_bank_data();
        echo json_encode($data);
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM bank WHERE bankId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Bank tidak ditemukan";
        }
        echo json_encode($res);
    }
    public function update_table() {
        $id = $this->input->post('id');
        $bankBill = $this->input->post('bankBill');
        $bankName = $this->input->post('bankName');
    
        $this->db->where('bankBill', $bankBill);
        $this->db->where_not_in('bankId', $id);
        $query = $this->db->get('bank');
    
        if ($query->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Nomor rekening sudah digunakan oleh data lain";
        } else {
            $this->db->where('bankId', $id);
            $update_data = array(
                'bankBill' => $bankBill,
                'bankName' => $bankName
            );
    
            if ($this->db->update('bank', $update_data)) {
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
         if($this->m_bank->delete_table($id)) {
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
        if ($this->m_bank->active_data($id)) {
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
}
?>
