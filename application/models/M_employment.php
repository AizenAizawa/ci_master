<?php
class M_employment extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function insert_employment($data)
    {
        return $this->db->insert('employment', $data);
    }

    public function get_employment_data()
    {
        $sql = "SELECT a.employmentId, a.employmentCode, ifnull(b.employmentName, '-') 	atasan	, a.employmentName 	`nama`	,a.employmentActive, a.employmentDepartmentId,departmentName
        from employment a
        LEFT join employment b on b.employmentId = a.employmentParentEmploymentId
        join department on a.employmentDepartmentId = departmentId
        where a.employmentDelete = 0
        order by a.employmentId DESC; ";
        $query = $this->db->query($sql);

        return $query->result();
    }
    public function get_atasan($id)
    {
        $sql = "SELECT employmentId, employmentCode, employmentName atasan
        from employment 
        join department on employmentDepartmentId = departmentId
        where employmentDelete = 0
        and employmentDepartmentId='{$id}'; ";
        $query = $this->db->query($sql);

        return $query->result();
    }

    public function delete_table($id) {
        $sql = "UPDATE employment SET employmentDelete = 1 WHERE employmentId = '$id'";
        return $this->db->query($sql, array($id));
    }

    public function active_data($id) {
        $sql = "UPDATE employment SET employmentActive = if(employmentActive = 1, 0, 1) WHERE employmentId='$id'";
        return $this->db->query($sql);
    }
}
?>