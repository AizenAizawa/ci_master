function reset_form() {
    $("#txdivisi").val('');
    $("#txcode").val('').focus();
    $("#txname").val('');
}

function load_data() {
    document.getElementById('spinner').style.display = 'inline-block';
    document.getElementById('refreshIcon').style.display = 'none';
    $.post("department/load_data",
        {

        },
        function (data) {
            console.log(data)
            $("#table2").DataTable().clear().destroy()
            $("#table2 > tbody").html('');
            $.each(data.department, function (idx, val) {
                html = '<tr>'
                html += '<td>' + val['departmentId'] + '</td>'
                html += '<td>' + val['departmentCode'] + '</td>'
                html += '<td>' + val['departmentName'] + '</td>'
                html += '<td>' + val['divisionName'] + '</td>'
                html += '<td><span onclick="active_data(' + val['departmentId'] + ',' + val['departmentActive'] + ')" class="badge ' + ((val['departmentActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['departmentActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['departmentId'] + ')">Edit</button></td>'
                html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['departmentId'] + ')">Hapus</button></td>'
                html += '</tr>'
                $("#table2 > tbody").append(html);
            });
            $("#table2").DataTable({
                responsive: true,
                processing: true,
                pagingType: 'first_last_numbers',
                // order: [[0, 'asc']],
                dom:
                    "<'row'<'col-3'l><'col-9'f>>" +
                    "<'row dt-row'<'col-sm-12'tr>>" +
                    "<'row'<'col-4'i><'col-8'p>>",
                "language": {
                    "info": "Page _PAGE_ of _PAGES_",
                    "lengthMenu": "_MENU_",
                    "search": "",
                    "searchPlaceholder": "Search.."
                }
            });
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('refreshIcon').style.display = 'inline-block';
        }, 'json');
}

function load_divisi() {
    $.post("department/load_divisi", function (res) {
        $('#txdivisi').empty()
        $('#txdivisi').append('<option value="" disabled selected>Pilihan Divisi</option>')
        $.each(res.dataDivisi, function (i, v) {
            $('#txdivisi').append('<option value="' + v.divisionId + '" >' + v.divisionName + '</option>')
        });
    }, 'json')
}

function simpan_data() {
    let divisi = $("#txdivisi").val();
    let code = $("#txcode").val();
    let name = $("#txname").val();
    if (divisi === "" || code === ""|| name === "" ) {
        Swal.fire({
            title: 'Error!',
            text: "Ada Form belum dimasukkan!!!",
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        $.post("department/create", {
            txdivisi: divisi,
            txcode: code,
            txname: name,
        },
            function (data) {
                console.log(data.status);
                if (data.status === "error") {
                    Swal.fire({
                        title: 'Error!',
                        text: data.msg,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: data.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    reset_form();
                }
            }, 'json');
    }
}

function update_data()
{
  var id = $("#loginModal").data('id');
  let departmentDivisionId = $("#txdivisi").val();
  let departmentCode = $("#txcode").val();
  let departmentName = $("#txname").val();
  
  if (departmentDivisionId === "" || departmentCode === ""|| departmentName === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('department/update_table', { id: id, departmentDivisionId: departmentDivisionId, departmentCode: departmentCode, departmentName: departmentName}, function(data) {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
            $("#loginModal").modal("hide");
            load_data()
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
  }, 'json');
}}

function edit_data(id) {
    $.post('department/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
          $("#txdivisi").val(data.data.departmentDivisionId);
          $("#txcode").val(data.data.departmentCode);
          $("#txname").val(data.data.departmentName);
          $("#loginModal").data('id', id); 
          $("#loginModal").modal('show');
          $(".btn-submit").hide();
          $(".btn-editen").show();
        } else {
          Swal.fire({
            title: 'Error!',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
    }, 'json');
}

function active_data(id, status) {
    if (status == 1) {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Apakah Anda Ingin MENONAKTIFKAN data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Nonaktifkan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('department/active', { id: id }, function (data) {
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Success!',
                            text: data.msg,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            load_data()
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal!',
                            text: data.msg,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }, 'json');
            }
        });
    } else {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Apakah Anda Ingin MENGAKTIFKAN data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Aktifkan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('department/active', { id: id }, function (data) {
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Sukses!',
                            text: data.msg,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            load_data()
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal!',
                            text: data.msg,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }, 'json');
            }
        });
    }
}

function hapus_data(id) {
    Swal.fire({
        title: 'Apakah kamu ingin menghapus data?',
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: 'No',
        confirmButtonText: 'Yes',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            $.post('department/delete_table', { id: id }, function (data) {
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Succes!',
                        text: data.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        load_data()
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.msg,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }, 'json');
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}

$(document).ready(function () {
    $(".btn-closed").click(function () {
        reset_form()
    });
    $(".btn-add").click(function () {
        $(".btn-submit").show();
        $(".btn-editen").hide();
    })
    $(".page-title").html("DEPARTMENT")
    load_data();
    load_divisi()
});