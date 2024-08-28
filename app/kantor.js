function reset_form()
    {
      $("#txcode").val('').focus();
      $("#txname").val('');
      $("#txemail").val('');
      $("#txtelp").val('');
      $("#txregion").val('');
      $("#txcity").val('');
      $("#txaddress").val('');
    }
    
  
function edit_data(id) {
    $.post('kantor/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
          $("#txcode").val(data.data.branchCode);
          $("#txname").val(data.data.branchName);
          $("#txemail").val(data.data.branchEmail);
          $("#txtelp").val(data.data.branchTelp);
          $("#txregion").val(data.data.branchRegion);
          $("#txcity").val(data.data.branchCity);
          $("#txaddress").val(data.data.branchAddress);
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
  let branchCode = $("#txcode").val();
  let branchName = $("#txname").val();
  let branchEmail = $("#txemail").val();
  let branchTelp = $("#txtelp").val();
  let branchRegion = $("#txregion").val();
  let branchCity = $("#txcity").val();
  let branchAddress = $("#txaddress").val();
  
  if (branchCode === "" || branchName === ""|| branchEmail === ""|| branchTelp === ""|| branchRegion === ""|| branchCity === ""|| branchAddress === ""){
    Swal.fire({
      title: 'Error!',
      text: data.msg,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('kantor/update_table', { id: id, branchCode: branchCode, branchName: branchName, branchEmail: branchEmail, branchTelp: branchTelp, branchRegion: branchRegion, branchCity: branchCity, branchAddress: branchAddress, }, function(data) {
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
  
function simpan_data() {
  let code = $("#txcode").val();
  let name = $("#txname").val();
  let email = $("#txemail").val();
  let telp = $("#txtelp").val();
  let region = $("#txregion").val();
  let city = $("#txcity").val();
  let address = $("#txaddress").val();
  
  if (code === "" || name === "" || email === "" || telp === "" ||region === "" ||city === "" ||address === "" ) {
      Swal.fire({
          title: 'Error!',
          text: "Ada Form belum dimasukkan!!!",
          icon: 'error',
          confirmButtonText: 'OK'
      });
  } else {
      $.post("kantor/create", {
          txcode: code,
          txname: name,
          txemail: email,
          txtelp: telp,
          txregion: region,
          txcity: city,
          txaddress: address
      },
      function(data) {
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
              reset_form(); // Reset the form after successful save
          }
      }, 'json');
  }
}

// function inputangka(evt) {
//   var charCode = (evt.which) ? evt.which : event.keyCode
//   if (charCode > 31 && (charCode < 48 || charCode > 57))
//     return false;
//   return true;
// }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  }) 

  function pusat_data(id, pusat) {
    if (pusat == 0) {
      swalWithBootstrapButtons.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda Ingin Menjadikan Pusat data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Jadikan Pusat',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          $.post('kantor/pusat', { id: id }, function(data) {
            if (data.pusat === 'success') {
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
                title: 'Berhasil!',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
              });
            }
          }, 'json');
        }
      });
    } else {
      Swal.fire({
        title: 'Gagal!',
        text: data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

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
          $.post('kantor/active', { id: id }, function(data) {
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
          $.post('kantor/active', { id: id }, function(data) {
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
        $.post('kantor/delete_table', { id: id }, function(data) {
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
function load_data()
    {
      $.post("kantor/load_data",
        {
          
        },
      function(data){
        console.log(data)

        $("#table2 > tbody").html('');
        $.each(data.kantor,function (idx, val) 
        {
            html='<tr>'
            html+='<td>'+val['branchId']+'</td>'
            html+='<td>'+val['branchCode']+'</td>'
            html+='<td>'+val['branchName']+'</td>'
            html+='<td>'+val['branchEmail']+'</td>'
            html+='<td>'+val['branchTelp']+'</td>'
            html+='<td>'+val['branchRegion']+'</td>'
            html+='<td>'+val['branchCity']+'</td>'
            html+='<td>'+val['branchAddress']+'</td>'
            html+='<td><span onclick="active_data('+val['branchId']+','+val['branchActive']+')" class="badge ' + ((val['branchActive']== '1') ? 'bg-success' : 'bg-danger' ) +' ">' +((val['branchActive']== '1') ? 'Active' : 'Inactive' ) +'</span></td>'
            html+='<td><span onclick="pusat_data('+val['branchId']+','+val['branchIsCenter']+')" class="badge ' + ((val['branchIsCenter']== '1') ? 'bg-success' : 'bg-secondary' ) +' ">' +((val['branchIsCenter']== '1') ? 'Pusat' : 'Nonpusat' ) +'</span></td>'
            html+='<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data('+val['branchId']+')">Edit</button></td>'
            html+='<td><button class="btn btn-danger btn-sm " onclick="hapus_data('+val['branchId']+')">Hapus</button></td>'
            html+='</tr>'
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

      },'json');
    }

$(document).ready(function(){
  $(".angka").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and . 188 untuk koma

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190,107, 189]) !== -1 ||
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
      $(".btn-closed").click(function(){
        reset_form()
      });
  
      $(".btn-add").click(function(){
        reset_form();
        $(".btn-submit").show();
        $(".btn-editen").hide();
      })
      $(".btn-add").click(function(){
        $(".btn-submit").show();
        $(".btn-editen").hide();
      })
      $(".page-title").html("BANK")
  
      load_data();
    });