<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Department extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_department');
        $this->load->model('m_divisi');
    }

    public function index()
    {
        $data['title'] = 'Department';
        $data['department'] = $this->m_department->get_department_data();
        $data['js'] = 'Department';

        $this->load->view('header', $data);
        $this->load->view('sidebar');
        $this->load->view('department/v_department', $data);
        $this->load->view('footer', $data);
    }
    public function create()
    {
        if ($this->input->post('txcode') != '') {

            $divisi = $this->input->post('txdivisi');
            $code = $this->input->post('txcode');
            $name = $this->input->post('txname');

            $query_code = $this->db->query("SELECT COUNT(*) as count FROM department WHERE departmentCode = '{$code}'");
            $result_code = $query_code->row();

            if ($result_code->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code} sudah terpakai";
            } else {
                $sql = "INSERT INTO department (departmentClientId,departmentDivisionId,departmentCode, departmentName, departmentActive) VALUES 
                (1,'{$divisi}','{$code}', '{$name}', 1)";
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
    public function load_data()
    {
        $data['department'] = $this->m_department->get_department_data();
        echo json_encode($data);
    }
    public function load_divisi()
    {
        $res['dataDivisi'] = $this->m_divisi->get_divisi_data();
        echo json_encode($res);
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM department WHERE departmentId = ?", array($id));
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
    public function update_table()
    {
        $id = $this->input->post('id');
        $departmentDivisionId = $this->input->post('departmentDivisionId');
        $departmentCode = $this->input->post('departmentCode');
        $departmentName = $this->input->post('departmentName');

        $this->db->where('departmentCode', $departmentCode);
        $this->db->where_not_in('departmentId', $id);
        $query_code = $this->db->get('department');

        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$departmentCode} sudah digunakan oleh data lain";
        } else {
            $this->db->where('departmentId', $id);
            $update_data = array(
                'departmentDivisionId' => $departmentDivisionId,
                'departmentCode' => $departmentCode,
                'departmentName' => $departmentName,
            );

            if ($this->db->update('department', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }

        echo json_encode($res);
    }
    public function delete_table()
    {
        $id = $this->input->post("id");

        $this->db->where('employmentDepartmentId', $id);
        $this->db->where('employmentDelete !=', 1);
        $query = $this->db->get('employment');

        if ($query->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Data department sedang digunakan di tabel employment dan tidak dapat dihapus.";
        } else {
            if ($this->m_department->delete_table($id)) {
                $res['status'] = 'success';
                $res['msg'] = "Data department berhasil dihapus.";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal menghapus data department.";
            }
        }
        echo json_encode($res);
    }

    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_department->active_data($id)) {
            $res["status"] = "success";
            $ket = ($status == 1) ? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil " . $ket;
        } else {
            $res["status"] = "error";
            $ket = ($status == 1) ? "Nonaktif" : "Aktif";
            $res["msg"] = "Data Gagal " . $ket;
        }
        echo json_encode($res);
    }
}
?>