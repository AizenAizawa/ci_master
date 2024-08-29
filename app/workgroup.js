function reset_form() {
    $("#txname").val('').focus();
  }
  
  function load_data() {
    document.getElementById('spinner').style.display = 'inline-block';
    document.getElementById('refreshIcon').style.display = 'none';
    $.post("workgroup/load_data",
      {
  
      },
      function (data) {
        console.log(data)
        $("#table2").DataTable().clear().destroy()
        $("#table2 > tbody").html('');
        $.each(data.workgroup, function (idx, val) {
          html = '<tr>'
          html += '<td>' + val['workgroupId'] + '</td>'
          html += '<td>' + val['workgroupName'] + '</td>'
          html += '<td><span onclick="active_data(' + val['workgroupId'] + ',' + val['workgroupActive'] + ')" class="badge ' + ((val['workgroupActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['workgroupActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
          html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['workgroupId'] + ')">Edit</button></td>'
          html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['workgroupId'] + ')">Hapus</button></td>'
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
  
  function simpan_data() {
    let name = $("#txname").val();
    if (name === "") {
        Swal.fire({
            title: 'Error!',
            text: "Ada Form belum dimasukkan!!!",
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        $.post("workgroup/create", {
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
        let workgroupName = $("#txname").val();
    if (workgroupName === ""){
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      $.post('workgroup/update_table', { id: id, workgroupName: workgroupName}, function(data) {
        if (data.status === 'success') {
          Swal.fire({
            title: 'Success!',
            text: data.msg,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            $("#loginModal").modal('hide');
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
    $.post('workgroup/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
            $("#txname").val(data.data.workgroupName);
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
          $.post('workgroup/active', { id: id }, function (data) {
            if (data.status === 'success') {
              Swal.fire({
                title: 'Success!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                $("#loginModal").modal('hide');
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
          $.post('workgroup/active', { id: id }, function (data) {
            if (data.status === 'success') {
              Swal.fire({
                title: 'Sukses!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                $("#loginModal").modal('hide');
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
        $.post('workgroup/delete_table', { id: id }, function (data) {
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
  
  function desimal(input) {
    var output = input
    if (parseFloat(input)) {
      input = new String(input); // so you can perform string operations
      var parts = input.split("."); // remove the decimal part
      parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
      output = parts.join(".");
    }
    return output;
  }
  
  $(document).ready(function () {
    $(".angka").keydown(function (e) {
  
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
        (e.keyCode == 65 && e.ctrlKey === true) ||
        (e.keyCode == 67 && e.ctrlKey === true) ||
        (e.keyCode == 88 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
    $("body").on('keyup', '.angka.des', function (e) {
      if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
      }
      $(this).val(desimal($(this).val()));
    });
  
    // ketika input dengan class angka focus, maka aluenya diselect semua
    $("body").on('focus', '.angka', function (e) {
      $(this).select();
    });
  
    $(".btn-closed").click(function () {
      reset_form()
    });
    $(".btn-add").click(function () {
      reset_form();
      $(".btn-submit").show();
      $(".btn-editen").hide();
    })
    $(".page-title").html("BANK")
  
    load_data();
  });