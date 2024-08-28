function reset_form()
    {
      $("#txrekening").val('').focus();
      $("#txbank").val('');
    }
    
  
function edit_data(id) {
    $.post('bank/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
            $("#txrekening").val(data.data.bankBill);
            $("#txbank").val(data.data.bankName);
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
function update_data()
{
  var id = $("#loginModal").data('id');
  var bankBill = $("#txrekening").val();
  var bankName = $("#txbank").val();
  
  if (bankBill === "" || bankName === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('bank/update_table', { id: id, bankBill: bankBill, bankName: bankName }, function(data) {
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
  
function simpan_data() 
  {
  let rekening = $("#txrekening").val();
      let bank = $("#txbank").val();
        if (rekening === "" || bank === ""){
          Swal.fire({
            title: 'Error!',
            text: "Rekening atau Bank belum dimasukkan",
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }else{
          reset_form()
          $.post("bank/create",
        {
          txrekening: rekening,
          txbank: bank

        },
      function(data,status){
        console.log(data.status)
        if (data.status == "Error"){
          Swal.fire({
            title: 'Error!',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }else {
        }
        //alert("Data: " + data + "\nStatus: " + status);
      },'json');
      }
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  }) 
  function active_data(id, status) {
    if (status == 1) {
      swalWithBootstrapButtons.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda Ingin MENONAKTIFKAN data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Nonaktifkan',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          $.post('bank/active', { id: id }, function(data) {
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
          $.post('bank/active', { id: id }, function(data) {
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

function load_data()
    {
      $.post("bank/load_data",
        {
          
        },
      function(data){
        console.log(data)
        $("#table2").DataTable().clear().destroy()
        $("#table2 > tbody").html('');
        $.each(data.bank,function (idx, val) 
        {
            html='<tr>'
            html+='<td>'+val['bankId']+'</td>'
            html+='<td>'+val['bankClientId']+'</td>'
            html+='<td>'+val['bankBill']+'</td>'
            html+='<td>'+val['bankName']+'</td>'
            html+='<td><span onclick="active_data('+val['bankId']+','+val['bankActive']+')" class="badge ' + ((val['bankActive']== '1') ? 'bg-success' : 'bg-danger' ) +' ">' +((val['bankActive']== '1') ? 'Active' : 'Inactive' ) +'</span></td>'
            html+='<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data('+val['bankId']+')">Edit</button></td>'
            html+='<td><button class="btn btn-danger btn-sm " onclick="hapus_data('+val['bankId']+')">Hapus</button></td>'
            html+='</tr>'
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

      },'json');
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
          $.post('bank/delete_table', { id: id }, function(data) {
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
       } else if(result.isDenied){
        Swal.fire('Perubahan tidak tersimpan', '', 'info')
       }
      })}

    
$(document).ready(function(){
    
    $(".btn-closed").click(function(){
      reset_form()
    });

    $(".btn-add").click(function(){
      $(".btn-submit").show();
      $(".btn-editen").hide();
    })
    $(".page-title").html("BANK")

    load_data();
  });
 
  