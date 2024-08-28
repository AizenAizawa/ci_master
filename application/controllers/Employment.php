<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Employment extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_employment');
        $this->load->model('m_department');
    }

    public function index()
    {
        $data['title'] = 'Employment';
        $data['employment'] = $this->m_employment->get_employment_data();
        $data['js'] = 'Employment';

        $this->load->view('header', $data);
        $this->load->view('sidebar');
        $this->load->view('employment/v_employment', $data);
        $this->load->view('footer', $data);
    }
    public function create()
    {
        if ($this->input->post('txcode') != '') {

            $departmen = $this->input->post('txdepartment');
            $atasan = $this->input->post('txatasan');
            $code = $this->input->post('txcode');
            $name = $this->input->post('txname');
            $query_code = $this->db->get('employment');
            $query_code = $this->db->query("SELECT COUNT(*) as count FROM employment WHERE employmentCode = '{$code}'");
            $result_code = $query_code->row();

            if ($result_code->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code} sudah terpakai";
            } else {
                $sql = "INSERT INTO employment (employmentClientId,employmentDepartmentId,employmentParentEmploymentId,employmentCode, employmentName, employmentActive) VALUES 
                (1,'{$departmen}','{$atasan}','{$code}', '{$name}', 1)";
                $exc = $this->db->query($sql);
                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$departmen} berhasil";
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
        $data['employment'] = $this->m_employment->get_employment_data();
        echo json_encode($data);
    }
    public function load_department()
    {
        if ($this->input->post('id') > 0) {
            $res['dataAtasan'] = $this->m_employment->get_atasan($this->input->post('id'));
        } else {
            $res['dataDepartment'] = $this->m_department->get_department_data();
        }
        echo json_encode($res);
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM employment WHERE employmentId = ?", array($id));
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
        $employmentDepartmentId = $this->input->post('employmentDepartmentId');
        $employmentParentEmploymentId = $this->input->post('employmentParentEmploymentId');
        $employmentCode = $this->input->post('employmentCode');
        $employmentName = $this->input->post('employmentName');

        $this->db->where('employmentCode', $employmentCode);
        $this->db->where_not_in('employmentId', $id);
        $query_code = $this->db->get('employment');

        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$employmentCode} sudah digunakan oleh data lain";
        } else {
            $this->db->where('employmentId', $id);
            $update_data = array(
                'employmentDepartmentId' => $employmentDepartmentId,
                'employmentParentEmploymentId' => $employmentParentEmploymentId,
                'employmentCode' => $employmentCode,
                'employmentName' => $employmentName,
            );

            if ($this->db->update('employment', $update_data)) {
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
        
        $employmentName = $this->input->post('employmentName');
        $this->db->where('employmentParentEmploymentId', $id);
        $this->db->where('employmentDelete !=', 1);
        $query = $this->db->get('employment');

        if ($query->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Data {$employmentName} sudah digunakan sebagai atasan";
        } else {
            if ($this->m_employment->delete_table($id)) {
                $res['status'] = 'success';
                $res['msg'] = "Data {$employmentName} berhasil di hapus";
            } else {
                $res['status'] = 'error';
                $res['msg'] = 'Gagal menghapus data';
            }
        }
        echo json_encode($res);
    }

    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_employment->active_data($id)) {
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