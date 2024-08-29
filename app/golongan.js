function reset_form() {
  $("#txcode").val('').focus();
  $("#txname").val('');
  $("#txnominal").val('');
  $("#txtotal").val('');
  $("#txnominak").val('');
  $("#txsetengah").val('');
  $("#txpersentamount").removeAttr('disabled').val('');
  $("#txpersenpokok").val('');
}

load_data();

function amountandpercen() {
  var persentAmountValue = $("#txpersentamount").val(); // Get the selected value directly
  var label = $("#label-persent-amount");
  var inputField = $("#txpersenpokok");
  var nominalPerDayValue = $("#txnominak").val(); // Get the value of txnominak

  var nominalPerDay = nominalPerDayValue ? parseFloat(nominalPerDayValue.replace(/,/g, "")) : 0;

  inputField.off("input");

  if (persentAmountValue === "0") { // User selected "Persent"
      label.text("Persen Pokok / Perhari");
      inputField.val(""); // Clear the input field
      inputField.prop("disabled", false);
      inputField.attr("max", 100); // Set maximum value to 100 for percentage
      inputField.attr("min", 0); // Set minimum value to 0
      inputField.on("input", function () {
          var value = parseFloat($(this).val().replace(/,/g, "")); // Parse value without commas
          if (!isNaN(value)) {
              if (value > 100) {
                  $(this).val(100);
              } else if (value < 0) {
                  $(this).val(0);
              }
              $(this).val(formatWithCommas($(this).val())); // Add commas for display
          } else {
              $(this).val(""); // Clear the field if value is not a number
          }
      });
  } else if (persentAmountValue === "1") { // User selected "Amount"
      label.text("Amount Pokok / Perhari");
      inputField.val(""); // Clear the input field
      inputField.prop("disabled", false);
      inputField.attr("max", nominalPerDay); // Set maximum value to nominal per day
      inputField.attr("min", 0); // Set minimum value to 0
      inputField.on("input", function () {
          var value = parseFloat($(this).val().replace(/,/g, "")); // Parse value without commas
          if (!isNaN(value)) {
              if (value > nominalPerDay) {
                  $(this).val(nominalPerDay);
              } else if (value < 0) {
                  $(this).val(0);
              }
              $(this).val(formatWithCommas($(this).val())); // Add commas for display
          } else {
              $(this).val(""); // Clear the field if value is not a number
          }
      });
  } else {
      // Disable the input field if neither Persent nor Amount is selected
      inputField.prop("disabled", true);
      inputField.val(""); // Clear the input field
      inputField.removeAttr("max");
      inputField.removeAttr("min"); 
  }
}

function formatWithCommas(value) {
  value = (typeof value === "number" ? value.toString() : value).replace(/,/g, "");
  var parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join("."); 
}



function togglePersentAmount() {
  var setengahHariValue = document.getElementById('txsetengah').value;
  var persentAmountDropdown = document.getElementById('txpersentamount');
  var inputField = document.getElementById('txpersenpokok');
  var label = document.getElementById('label-persent-amount');

  if (setengahHariValue === "0") {
    persentAmountDropdown.disabled = false;
    amountandpercen();
  } else {
    persentAmountDropdown.disabled = true;
    persentAmountDropdown.value = "";
    label.textContent = "Persen Pokok / Perhari";
    inputField.disabled = true;
    inputField.value = "";
  }
}

function Pembagian() {
  var amt = parseFloat($('[name="levelgroupAmount"]').val().replace(/,/gi, ""));
  var div = parseFloat($('[name="levelgroupDivide"]').val().replace(/,/gi, ""));
  $('[name="levelgroupNominal"]').val("");
  if (amt > 0 && div > 0) {
    nom = parseInt(amt / div);
    $('[name="levelgroupNominal"]').val(desimal(nom));
  }
}

function load_data() {
  document.getElementById('spinner').style.display = 'inline-block';
  document.getElementById('refreshIcon').style.display = 'none';
  $.post("golongan/load_data",
    {

    },
    function (data) {
      console.log(data)
      $("#table2").DataTable().clear().destroy()
      $("#table2 > tbody").html('');
      $.each(data.golongan, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['levelgroupId'] + '</td>'
        html += '<td>' + val['levelgroupCode'] + '</td>'
        html += '<td>' + val['levelgroupName'] + '</td>'
        html += '<td class="angka des">' + val['levelgroupAmount'] + '</td>'
        html += '<td><span onclick="active_data(' + val['levelgroupId'] + ',' + val['levelgroupActive'] + ')" class="badge ' + ((val['levelgroupActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['levelgroupActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['levelgroupId'] + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['levelgroupId'] + ')">Hapus</button></td>'
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
  let code = $("#txcode").val();
  let name = $("#txname").val();
  let nominal = $("#txnominal").val();
  let totalday = $("#txtotal").val();
  let nominalday = $("#txnominak").val();
  let halfday = $("#txsetengah").val();
  let persen = $("#txpersentamount").val();
  let pokok = $("#txpersenpokok").val()
  if (code === "" || name === ""|| nominal === "" || totalday === "" || nominalday === "" ) {
      Swal.fire({
          title: 'Error!',
          text: "Ada Form belum dimasukkan!!!",
          icon: 'error',
          confirmButtonText: 'OK'
      });
  } else {
      $.post("golongan/create", {
        txcode: code,
        txname: name,
        txnominal: nominal,
        txtotal: totalday,
        txnominak: nominalday,
        txsetengah: halfday,
        txpersentamount: persen,
        txpersenpokok: pokok,
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
      let levelgroupCode = $("#txcode").val();
      let levelgroupName = $("#txname").val();
      let levelgroupAmount = $("#txnominal").val();
      let levelgroupDivide = $("#txtotal").val();
      let levelgroupNominal = $("#txnominak").val();
      let levelgroupHalfDay = $("#txsetengah").val();
      let levelgroupHalfPercent = $("#txpersentamount").val();
      let levelgroupHalfAmount = $("#txpersenpokok").val();
  
  if (levelgroupCode === "" || levelgroupName === ""|| levelgroupAmount === ""||levelgroupDivide === ""|| levelgroupNominal === ""|| levelgroupHalfDay === ""){
    Swal.fire({
      title: 'Error!',
      text: 'All fields are required',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }else{
    $.post('golongan/update_table', { id: id, levelgroupCode: levelgroupCode, levelgroupName: levelgroupName, levelgroupAmount: levelgroupAmount, levelgroupDivide: levelgroupDivide, levelgroupNominal: levelgroupNominal, levelgroupHalfDay: levelgroupHalfDay, levelgroupHalfPercent: levelgroupHalfPercent, levelgroupHalfAmount: levelgroupHalfAmount}, function(data) {
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
          title: 'Error!',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
  }, 'json');
}}

function edit_data(id) {
  $.post('golongan/edit_table', { id: id }, function (data) {
      if (data.status === 'ok') {
          $("#txcode").val(data.data.levelgroupCode);
          $("#txname").val(data.data.levelgroupName);
          $("#txnominal").val(data.data.levelgroupAmount);
          $("#txtotal").val(data.data.levelgroupDivide);
          $("#txnominak").val(data.data.levelgroupNominal);
          $("#txsetengah").val(data.data.levelgroupHalfDay);
          $("#txpersentamount").val(data.data.levelgroupHalfPercent);
          $("#txpersenpokok").val(data.data.levelgroupHalfAmount);

          // Check values and set or remove the 'disabled' attribute accordingly
          if (data.data.levelgroupHalfAmount == 0) {
              $("#txpersenpokok").attr('disabled', 'disabled');
          } else {
              $("#txpersenpokok").removeAttr('disabled');
          }

          if (data.data.levelgroupHalfPercent == 0) {
              $("#txpersentamount").attr('disabled', 'disabled');
          } else {
              $("#txpersentamount").removeAttr('disabled');
          }

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
        $.post('golongan/active', { id: id }, function (data) {
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
        $.post('golongan/active', { id: id }, function (data) {
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
      $.post('golongan/delete_table', { id: id }, function (data) {
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

  
});