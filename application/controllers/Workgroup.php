<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WorkGroup extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_workgroup');
    }

	public function index()
	{
        $data['title'] = 'Workgroup';
        $data['workgroup'] = $this->m_workgroup->get_workgroup_data();
        $data['js'] = 'workgroup';

		$this->load->view('header', $data);
        $this->load->view('sidebar');
        $this->load->view('workgroup/v_workgroup', $data);
        $this->load->view('footer', $data);
	}
    public function load_data(){
        $data['workgroup'] = $this->m_workgroup->get_workgroup_data();
        echo json_encode($data);
    }
    public function create() {
        if ($this->input->post('txname') != '') {
            
            $name = $this->input->post('txname');
    
            $query_code = $this->db->query("SELECT COUNT(*) as count FROM workgroup WHERE workgroupName = '{$name}'");
            $result_code = $query_code->row();
    
            if ($result_code->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$name} sudah terpakai";
            } else {
                $sql = "INSERT INTO workgroup(workgroupClientId,workgroupName, workgroupActive) VALUES 
                (1,'{$name}', 1)";
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
        $sql = $this->db->query("SELECT * FROM workgroup WHERE workgroupId = ?", array($id));
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
        $workgroupName = $this->input->post('workgroupName');

        $this->db->where('workgroupName', $workgroupName);
        $this->db->where_not_in('workgroupId', $id);
        $query_code = $this->db->get('workgroup');
    
        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Name {$workgroupName} sudah digunakan oleh data lain";
        } else {
            $this->db->where('workgroupId', $id);
            
            $update_data = array(
                'workgroupName' => $workgroupName
            );
    
            if ($this->db->update('workgroup', $update_data)) {
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
         if($this->m_workgroup->delete_table($id)) {
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
        if ($this->m_workgroup->active_data($id)) {
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
