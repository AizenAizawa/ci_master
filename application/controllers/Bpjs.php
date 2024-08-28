<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bpjs extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_bpjs');
    }

	public function index()
    {
        $data['title'] = 'Bpjs';
        $data['bpjs'] = $this->m_bpjs->get_bpjs_data();
        $data['js'] = 'bpjs';
        
        $this->load->view('header', $data);
        $this->load->view('sidebar');
        $this->load->view('bpjs/v_bpjs', $data);
        $this->load->view('footer', $data);
    }
    public function load_data(){
        $data['bpjs'] = $this->m_bpjs->get_bpjs_data();
        echo json_encode($data);
    }
    public function create() {
        if ($this->input->post('txcode') != '') {
            
            $code = $this->input->post('txcode');
            $name = $this->input->post('txname');
            $kelas = $this->input->post('txkelas');
            $premi = $this->input->post('txpremi');
            $comp = $this->input->post('bpjsCompPercent');
            $empl = $this->input->post('bpjsEmplPercentPercent');
    
            $query_code = $this->db->query("SELECT COUNT(*) as count FROM bpjs WHERE bpjsCode = '{$code}'");
            $result_code = $query_code->row();
    
            if ($result_code->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code} sudah terpakai";
            }else {
                $sql = "INSERT INTO bpjs (bpjsClientId,bpjsCode, bpjsName, bpjsTotalBill, bpjsCompPercent, bpjsEmplPercentPercent, bpjsClass, bpjsActive) VALUES (1,'{$code}','{$name}', '{$premi}' ,'{$comp}','{$empl}' ,'{$kelas}' , 1)";
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
    public function delete_table() {
        $id = $this->input->post("id");
         if($this->m_bpjs->delete_table($id)) {
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
        if ($this->m_bpjs->active_data($id)) {
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
    public function update_table() {
        $id = $this->input->post('id'); 
        $bpjsCode = $this->input->post('bpjsCode');
        $bpjsName = $this->input->post('bpjsName');
        $bpjsTotalBill = $this->input->post('bpjsTotalBill');
        $bpjsCompPercent = $this->input->post('bpjsCompPercent');
        $bpjsEmplPercent = $this->input->post('bpjsEmplPercent');
        $bpjsClass = $this->input->post('bpjsClass');
    
        $this->db->where('bpjsCode', $bpjsCode);
        $this->db->where_not_in('bpjsId', $id);
        $query_code = $this->db->get('bpjs');
    
        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$bpjsCode} sudah digunakan oleh data lain";
        }else {
            $this->db->where('bpjsId', $id);
            $update_data = array(
                'bpjsCode' => $bpjsCode,
                'bpjsName' => $bpjsName,
                'bpjsTotalBill' => $bpjsTotalBill,
                'bpjsCompPercent' => $bpjsCompPercent,
                'bpjsEmplPercent' => $bpjsEmplPercent,
                'bpjsClass' => $bpjsClass
            );
    
            if ($this->db->update('bpjs', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }
    
        echo json_encode($res);
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM bpjs WHERE bpjsId = ?", array($id));
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
}
