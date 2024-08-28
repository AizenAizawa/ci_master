load_data()
function reset_form() {
    $("#txcode").val('').focus();
    $("#txname").val('');
    $("#txkelas").val('');
    $("#txpremi").val('');
    $("#bpjsCompPercent").val('');
    $("#bpjsEmplPercent").val('');
}
function onmax(input, max) {
    if (input.value > max) {
        input.value = max;
    }
}
function onmin(input, min) {
    if (input.value < min) {
        input.value = min;
    }
}
function changecomp() {
    const companyPercent = parseFloat($('#bpjsCompPercent').val()) || 0;
    const employeePercent = 100 - companyPercent;
    $('#bpjsEmplPercent').val(employeePercent)
}
function changeemp() {
    const employeePercent = parseFloat($('#bpjsEmplPercent').val()) || 0;
    const companyPercent = 100 - employeePercent;
    $('#bpjsCompPercent').val(companyPercent)
}
function load_data() {
    $.post("bpjs/load_data",
        {

        },
        function (data) {
            console.log(data)

            $("#table2 > tbody").html('');
            $.each(data.bpjs, function (idx, val) {
                html = '<tr>'
                html += '<td>' + val['bpjsId'] + '</td>'
                html += '<td>' + val['bpjsCode'] + '</td>'
                html += '<td>' + val['bpjsName'] + '</td>'
                html += '<td>' + val['bpjsTotalBill'] + '</td>'
                html += '<td>' + val['bpjsCompPercent'] + '</td>'
                html += '<td>' + val['bpjsEmplPercent'] + '</td>'
                html += '<td>' + val['bpjsClass'] + '</td>'
                html += '<td><span onclick="active_data(' + val['bpjsId'] + ',' + val['bpjsActive'] + ')" class="badge ' + ((val['bpjsActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['bpjsActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['bpjsId'] + ')">Edit</button></td>'
                html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['bpjsId'] + ')">Hapus</button></td>'
                html += '</tr>'
                $("#table2 > tbody").append(html);
            });
            $("#table2").DataTable().destroy()
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

        }, 'json');
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
            $.post('bpjs/delete_table', { id: id }, function (data) {
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Succes!',
                        text: data.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        location.reload();
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
function simpan_data() {
    let code = $("#txcode").val();
    let name = $("#txname").val();
    let kelas = $("#txkelas").val();
    let premi = $("#txpremi").val();
    let comp = $("#bpjsCompPercent").val();
    let empl = $("#bpjsEmplPercent").val();
    if (code === "" || name === "" || kelas === null || premi === "" || comp === "" || empl === "") {
        Swal.fire({
            title: 'Error!',
            text: "Ada Form belum dimasukkan!!!",
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        $.post("bpjs/create", {
            txcode: code,
            txname: name,
            txkelas: kelas,
            txpremi: premi,
            bpjsCompPercent: comp,
            bpjsEmplPercent: empl,
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
          $.post('bpjs/active', { id: id }, function(data) {
            if (data.status === 'success') {
              Swal.fire({
                title: 'Success!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                $("#loginModal").modal('hide');
                location.reload();
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
          $.post('bpjs/active', { id: id }, function(data) {
            if (data.status === 'success') {
              Swal.fire({
                title: 'Sukses!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                $("#loginModal").modal('hide');
                location.reload();
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
  function update_data()
{
  var id = $("#loginModal").data('id');
  let bpjsCode = $("#txcode").val();
  let bpjsName = $("#txname").val();
  let bpjsTotalBill = $("#txpremi").val();
  let bpjsCompPercent = $("#bpjsCompPercent").val();
  let bpjsEmplPercent = $("#bpjsEmplPercent").val();
  let bpjsClass = $("#txkelas").val();
  
  if (bpjsCode === "" || bpjsName === ""|| bpjsTotalBill === ""|| bpjsCompPercent === ""|| bpjsEmplPercent === ""|| bpjsClass === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('bpjs/update_table', { id: id, bpjsCode: bpjsCode, bpjsName: bpjsName, bpjsTotalBill: bpjsTotalBill, bpjsCompPercent: bpjsCompPercent, bpjsEmplPercent: bpjsEmplPercent, bpjsClass: bpjsClass}, function(data) {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          location.reload();
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
    $.post('bpjs/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
          $("#txcode").val(data.data.bpjsCode);
          $("#txname").val(data.data.bpjsName);
          $("#txpremi").val(data.data.bpjsTotalBill);
          $("#bpjsCompPercent").val(data.data.bpjsCompPercent);
          $("#bpjsEmplPercent").val(data.data.bpjsEmplPercent);
          $("#txkelas").val(data.data.bpjsClass);
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
$(document).ready(function () {
    $(".angka").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and . 188 untuk koma

        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $(".btn-closed").click(function () {
        reset_form()
    });

    $(".btn-add").click(function () {
        reset_form();
        $(".btn-submit").show();
        $(".btn-editen").hide();
    })
    $(".btn-add").click(function () {
        $(".btn-submit").show();
        $(".btn-editen").hide();
    })
    $(".page-title").html("BANK")

    load_data();
});