<?php
class M_divisi extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    // public function insert_department($data) {
    //     return $this->db->insert('department', $data);
    // }

    public function get_divisi_data() {
        $sql = "SELECT * FROM division WHERE divisionActive = 1 order by divisionId desc; ";
        $query = $this->db->query($sql);
        
        return $query->result();
    }
    // public function delete_table($id) {
    //     $sql = "UPDATE bank SET bankDelete = 1 WHERE bankId = '$id'";
    //     return $this->db->query($sql, array($id));
    // }
    // public function active_data($id) {
    //     $sql = "UPDATE bank SET bankActive = if(bankActive = 1, 0, 1) WHERE bankId='$id'";
    //     return $this->db->query($sql);
    // }
}
?>
