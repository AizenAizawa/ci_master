<?php
class M_workgroup extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_bank($data) {
        return $this->db->insert('workgroup', $data);
    }

    public function get_workgroup_data() {
        $sql = "SELECT * FROM workgroup WHERE workgroupDelete = 0 order by workgroupId desc; ";
        $query = $this->db->query($sql);
        
        return $query->result();
    }
    public function delete_table($id) {
        $sql = "UPDATE workgroup SET workgroupDelete = 1 WHERE workgroupId = '$id'";
        return $this->db->query($sql, array($id));
    }
    public function active_data($id) {
        $sql = "UPDATE workgroup SET workgroupActive = if(workgroupActive = 1, 0, 1) WHERE workgroupId='$id'";
        return $this->db->query($sql);
    }
}
?>
