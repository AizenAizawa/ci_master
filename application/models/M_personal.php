<?php
class M_personal extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_bank($data) {
        return $this->db->insert('employee', $data);
    }

    public function get_personal_data() {
        $sql = "SELECT * FROM employee WHERE employeeDelete = 0 order by employeeId desc; ";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function active_data($id) {
        $sql = "UPDATE employee SET employeeActive = if(employeeActive = 1, 0, 1) WHERE employeeId='$id'";
        return $this->db->query($sql);
    }
    public function delete_table($id) {
        $sql = "UPDATE employee SET employeeDelete = 1 WHERE employeeId = '$id'";
        return $this->db->query($sql, array($id));
    }
}