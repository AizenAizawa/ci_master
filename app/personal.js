var arrAlamat = []
var arrAsuransi = []
var arrKontak = []
var arrPendidikan = []
var alamatId = null
var asuransiId = null
var kontakId = null
var pendidikanId = null

function openModal() {
    arrAlamat = []
    arrAsuransi = []
    arrKontak = []
    arrPendidikan = []
    alamatId = null
    asuransiId = null
    kontakId = null
    pendidikanId = null
    load_cabang()
    tampil_alamat()
    tampil_asuransi()
    tampil_contact()
    tampil_pendidikan()
    $("#loginModal").modal('show')
}

function cek_alamat(val, x) {
    console.log(val)
    $.post("personal/cek_info", { val: val, x: x }, function (res) {
        if (res.status == 'error') {
            Swal.fire({
                title: 'Error!',
                text: res.msg,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        if (x == 1) {
            $('#txnama').val('').focus();
        } else if (x == 2) {
            $('#txkode').val('').focus();
        } else if (x == 3) {
            $('#txemail').val('').focus();
        } else if (x == 4) {
            $('#txktp').val('').focus();
        } else if (x == 5) {
            $('#txrekening').val('').focus();
        } else if (x == 6) {
            $('#txnobpjs').val('').focus();
        } else if (x == 7) {
            $('#txnpwp').val('').focus();
        }
    }, 'json')
}

function load_cabang() {
    $.post("personal/load_cabang", function (res) {
        $('#txcabang,txbank,txbpjs,txasuransi').empty()
        $('#txcabang').append('<option value="" disabled selected>Pilihan Cabang</option>')
        $('#txbank').append('<option value="" disabled selected>Pilihan Bank</option>')
        $('#txbpjs').append('<option value="" disabled selected>Pilihan Bpjs</option>')
        $('#txasuransi').append('<option value="" disabled selected>Pilihan Asuransi</option>')
        $.each(res.dataKantor, function (i, v) {
            $('#txcabang').append('<option value="' + v.branchId + '" >' + v.branchName + '</option>')
        });
        $.each(res.dataBank, function (i, v) {
            $('#txbank').append('<option value="' + v.bankId + '" >' + v.bankName + '</option>')
        });
        $.each(res.dataBpjs, function (i, v) {
            $('#txbpjs').append('<option value="' + v.bpjsId + '" >' + v.bpjsName + '</option>')
        });
        $.each(res.dataInsurance, function (i, v) {
            $('#txasuransi').append('<option value="' + v.insuranceId + '" >' + v.insuranceType + '</option>')
        });
    }, 'json')
}

// ========Alamat========= //

function tambah_alamat() {
    if (alamatId == null) {
        let empladdressJalan = $("#txjalan").val();
        let empladdressKelurahan = $("#txkelurahan").val();
        let empladdressKecamatan = $("#txkecamatan").val();
        let empladdressKota = $("#txkota").val();
        let empladdressProvinsi = $("#txprovinsi").val();
        let empladdressPhone = $("#txphone").val();
        if (empladdressJalan === "" || empladdressKelurahan === "" || empladdressKecamatan === "" || empladdressKota === "" || empladdressProvinsi === "" || empladdressPhone === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            arrAlamat.push
                ({
                    'empladdressClientId': 1,
                    'empladdressEmployeeId': 0,
                    'empladdressJalan': $('#txjalan').val(),
                    'empladdressKelurahan': $('#txkelurahan').val(),
                    'empladdressKecamatan': $('#txkecamatan').val(),
                    'empladdressKota': $('#txkota').val(),
                    'empladdressProvinsi': $('#txprovinsi').val(),
                    'empladdressPhone': $('#txphone').val()
                })

        }
    }
    tampil_alamat()
}

function tampil_alamat() {
    $("#table_alamat").DataTable().clear().destroy()
    $("#table_alamat > tbody").html('');
    $.each(arrAlamat, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['empladdressJalan'] + '</td>'
        html += '<td>' + val['empladdressKelurahan'] + '</td>'
        html += '<td>' + val['empladdressKecamatan'] + '</td>'
        html += '<td>' + val['empladdressKota'] + '</td>'
        html += '<td>' + val['empladdressProvinsi'] + '</td>'
        html += '<td>' + val['empladdressPhone'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_alamat(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_alamat(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_alamat > tbody").append(html);
        $(".input_alamat").val('');

    });
    $("#table_alamat").DataTable({
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
}

function edit_alamat(idx) {
    var alamat = arrAlamat[idx];
    alamatId = idx
    $("#txjalan").val(alamat.empladdressJalan);
    $("#txkelurahan").val(alamat.empladdressKelurahan);
    $("#txkecamatan").val(alamat.empladdressKecamatan);
    $("#txkota").val(alamat.empladdressKota);
    $("#txprovinsi").val(alamat.empladdressProvinsi);
    $("#txphone").val(alamat.empladdressPhone);
    $("#tmbhalmt").removeClass('btn-success').addClass('btn-warning')
    $(".btnalmt").html('Update')
    $(".cnclalmt").show()
}

function update_alamat() {
    var alamat = arrAlamat[alamatId];
    let empladdressJalan = $("#txjalan").val();
    let empladdressKelurahan = $("#txkelurahan").val();
    let empladdressKecamatan = $("#txkecamatan").val();
    let empladdressKota = $("#txkota").val();
    let empladdressProvinsi = $("#txprovinsi").val();
    let empladdressPhone = $("#txphone").val();


    if (empladdressJalan === "" || empladdressKelurahan === "" || empladdressKecamatan === "" || empladdressKota === "" || empladdressProvinsi === "" || empladdressPhone === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (alamat) {
            alamat.empladdressJalan = empladdressJalan;
            alamat.empladdressKelurahan = empladdressKelurahan;
            alamat.empladdressKecamatan = empladdressKecamatan;
            alamat.empladdressKota = empladdressKota;
            alamat.empladdressProvinsi = empladdressProvinsi;
            alamat.empladdressPhone = empladdressPhone;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrAlamat)
            tampil_alamat();
            alamatId = null
            $("#tmbhalmt").addClass('btn-success').removeClass('btn-warning')
            $(".btnalmt").html('Tambah')
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function hapus_alamat(id) {
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
            alamatId = id
            arrAlamat.splice(id, 1)
            tampil_alamat()
            alamatId = null
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}

function cancel_alamat() {
    alamatId = null
    $("#tmbhalmt").addClass('btn-success').removeClass('btn-warning')
    $(".btnalmt").html('Tambah')
    $(".cnclalmt").hide()
    $(".input_alamat").val('');
}

// ========Asuransi========= //

function tambah_asuransi() {
    if (asuransiId == null) {
        let emplinsuranceBpjsId = $("#txasuransi").val();
        let emplinsuranceNo = $("#txasuransino").val();
        if (emplinsuranceBpjsId === "" || emplinsuranceNo === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            arrAsuransi.push
                ({
                    'emplinsuranceClientId': 1,
                    'emplinsuranceEmployeeId': 0,
                    'emplinsuranceBpjsId': $('#txasuransi').val(),
                    'emplinsuranceNo': $('#txasuransino').val(),
                })
        }
    }
    tampil_asuransi()
}
function tampil_asuransi() {
    $("#table_asuransi").DataTable().clear().destroy()
    $("#table_asuransi > tbody").html('');
    $.each(arrAsuransi, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['emplinsuranceBpjsId'] + '</td>'
        html += '<td>' + val['emplinsuranceNo'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_asuransi(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_asuransi(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_asuransi > tbody").append(html);
        $(".input_asuransi").val('');
    });
    $("#table_asuransi").DataTable({
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
    console.log(arrAsuransi)
}

function edit_asuransi(idx) {
    var asuransi = arrAsuransi[idx];
    asuransiId = idx
    $("#txasuransi").val(asuransi.emplinsuranceBpjsId);
    $("#txasuransino").val(asuransi.emplinsuranceNo);
    $("#tmbhasnr").removeClass('btn-success').addClass('btn-warning')
    $(".btnasnr").html('Update')
    $(".cnclasr").show()
}

function update_asuransi() {
    var asuransi = arrAsuransi[asuransiId];
    let emplinsuranceBpjsId = $("#txasuransi").val();
    let emplinsuranceNo = $("#txasuransino").val();

    if (emplinsuranceBpjsId === "" || emplinsuranceNo === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (asuransi) {
            asuransi.emplinsuranceBpjsId = emplinsuranceBpjsId;
            asuransi.emplinsuranceNo = emplinsuranceNo;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrAsuransi)
            tambah_asuransi();
            asuransiId = null
            $("#tmbhasnr").addClass('btn-success').removeClass('btn-warning')
            $(".btnasnr").html('Tambah')
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function hapus_asuransi(id) {
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
            asuransiId = id
            arrAsuransi.splice(id, 1)
            tambah_asuransi()
            asuransiId = null
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}

function cancel_asuransi() {
    asuransiId = null
    $("#tmbhasnr").addClass('btn-success').removeClass('btn-warning')
    $(".btnasnr").html('Tambah')
    $(".cnclasr").hide()
    $(".input_asuransi").val('');
}

// ========Contact========= //

function tambah_contact() {
    if (kontakId == null) {
        let emplcontactName = $("#txnama1").val();
        let emplcontactAddress = $("#txalamat1").val();
        let emplcontactProfesion = $("#txprofesi").val();
        let emplcontactHubungan = $("#txhubungan").val();
        let empladdressPhone = $("#txphone1").val();
        if (emplcontactName === "" || emplcontactAddress === "" || emplcontactProfesion === "" || emplcontactHubungan === "" || empladdressPhone === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            arrKontak.push
                ({
                    'emplcontactClientId': 1,
                    'emplcontactEmployeeId': 0,
                    'emplcontactName': $('#txnama1').val(),
                    'emplcontactAddress': $('#txalamat1').val(),
                    'emplcontactProfesion': $('#txprofesi').val(),
                    'emplcontactHubungan': $('#txhubungan').val(),
                    'emplcontactPhone': $('#txphone1').val(),
                })
        }
    }
    tampil_contact()
}

function tampil_contact() {
    $("#table_kontak").DataTable().clear().destroy()
    $("#table_kontak > tbody").html('');
    $.each(arrKontak, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['emplcontactName'] + '</td>'
        html += '<td>' + val['emplcontactAddress'] + '</td>'
        html += '<td>' + val['emplcontactProfesion'] + '</td>'
        html += '<td>' + val['emplcontactHubungan'] + '</td>'
        html += '<td>' + val['emplcontactPhone'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_contact(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_contact(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_kontak > tbody").append(html);
        $(".input_kontak").val('');
    });
    $("#table_kontak").DataTable({
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
}

function edit_contact(idx) {
    var kontak = arrKontak[idx];
    kontakId = idx
    $("#txnama1").val(kontak.emplcontactName);
    $("#txalamat1").val(kontak.emplcontactAddress);
    $("#txprofesi").val(kontak.emplcontactProfesion);
    $("#txhubungan").val(kontak.emplcontactHubungan);
    $("#txphone1").val(kontak.emplcontactPhone);
    $("#tmbhcntc").removeClass('btn-success').addClass('btn-warning')
    $(".btncntc").html('Update')
    $(".cnclcon").show()
}

function update_contact() {
    var kontak = arrKontak[kontakId];
    let emplcontactName = $("#txnama1").val();
    let emplcontactAddress = $("#txalamat1").val();
    let emplcontactProfesion = $("#txprofesi").val();
    let emplcontactHubungan = $("#txhubungan").val();
    let emplcontactPhone = $("#txphone1").val();

    if (emplcontactName === "" || emplcontactAddress === "" || emplcontactProfesion === "" || emplcontactHubungan === "" || emplcontactPhone === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (kontak) {
            kontak.emplcontactName = emplcontactName;
            kontak.emplcontactAddress = emplcontactAddress;
            kontak.emplcontactProfesion = emplcontactProfesion;
            kontak.emplcontactHubungan = emplcontactHubungan;
            kontak.emplcontactPhone = emplcontactPhone;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrKontak)
            tambah_contact();
            kontakId = null
            $("#tmbhcntc").addClass('btn-success').removeClass('btn-warning')
            $(".btncntc").html('Tambah')
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function hapus_contact(id) {
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
            kontakId = id
            arrKontak.splice(id, 1)
            tambah_contact()
            kontakId = null
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}

function cancel_contact() {
    kontakId = null
    $("#tmbhcntc").addClass('btn-success').removeClass('btn-warning')
    $(".btncnct").html('Tambah')
    $(".cnclcon").hide()
    $(".input_kontak").val('');
}

// ========Pendidikan========= //

function tambah_pendidikan() {
    if (pendidikanId == null) {
        let empleduJenjang = $("#txjenjang").val();
        let empleduInstansi = $("#txinstansi").val();
        let empleduJurusan = $("#txjurusan").val();
        let empleduTahunlulus = $("#txlulus").val();

        if (empleduJenjang === "" || empleduInstansi === "" || empleduJurusan === "" || empleduTahunlulus === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            arrPendidikan.push
                ({
                    'empleduClientId': 1,
                    'empleduEmployeeId': 0,
                    'empleduJenjang': $('#txjenjang').val(),
                    'empleduInstansi': $('#txinstansi').val(),
                    'empleduJurusan': $('#txjurusan').val(),
                    'empleduTahunlulus': $('#txlulus').val(),
                })
        }
    }
    tampil_pendidikan()
}
function tampil_pendidikan() {
    $("#table_pendidikan").DataTable().clear().destroy()
    $("#table_pendidikan > tbody").html('');
    $.each(arrPendidikan, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['empleduJenjang'] + '</td>'
        html += '<td>' + val['empleduInstansi'] + '</td>'
        html += '<td>' + val['empleduJurusan'] + '</td>'
        html += '<td>' + val['empleduTahunlulus'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_pendidikan(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_pendidikan(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_pendidikan > tbody").append(html);
        $(".input_pendididikan").val('');
    });
    $("#table_pendidikan").DataTable({
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
}

function edit_pendidikan(idx) {
    var pendidikan = arrPendidikan[idx];
    pendidikanId = idx
    $("#txjenjang").val(pendidikan.empleduJenjang);
    $("#txinstansi").val(pendidikan.empleduInstansi);
    $("#txjurusan").val(pendidikan.empleduJurusan);
    $("#txlulus").val(pendidikan.empleduTahunlulus);
    $("#tmbhpen").removeClass('btn-success').addClass('btn-warning')
    $(".btnpen").html('Update')
    $(".cnclpen").show()
}

function update_pendidikan() {
    var pendidikan = arrPendidikan[pendidikanId];
    let empleduJenjang = $("#txjenjang").val();
    let empleduInstansi = $("#txinstansi").val();
    let empleduJurusan = $("#txjurusan").val();
    let empleduTahunlulus = $("#txlulus").val();

    if (empleduJenjang === "" || empleduInstansi === "" || empleduJurusan === "" || empleduTahunlulus === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (pendidikan) {
            pendidikan.empleduJenjang = empleduJenjang;
            pendidikan.empleduInstansi = empleduInstansi;
            pendidikan.empleduJurusan = empleduJurusan;
            pendidikan.empleduTahunlulus = empleduTahunlulus;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrPendidikan)
            tambah_contact();
            pendidikanId = null
            $("#tmbhpen").addClass('btn-success').removeClass('btn-warning')
            $(".btnpen").html('Tambah')
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function hapus_pendidikan(id) {
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
            pendidikanId = id
            arrPendidikan.splice(id, 1)
            tambah_pendidikan()
            pendidikanId = null
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}

function cancel_pendidikan() {
    pendidikanId = null
    $("#tmbhpen").addClass('btn-success').removeClass('btn-warning')
    $(".btnpen").html('Tambah')
    $(".cnclpen").hide()
    $(".input_pendididikan").val('');
}

function load_data() {
    $.post("personal/load_data",
        {

        },
        function (data) {
            console.log(data)
            $("#table2").DataTable().clear().destroy()
            $("#table2 > tbody").html('');
            $.each(data.employee, function (idx, val) {
                html = '<tr>'
                html += '<td>' + val['employeeCode'] + '</td>'
                html += '<td>' + val['employeeName'] + '</td>'
                html += '<td><img src="' + base_url + val['employeePhoto'] + '" width = "120px"></td>'
                html += '<td><span onclick="active_data(' + val['employeeId'] + ',' + val['employeeActive'] + ')" class="badge ' + ((val['employeeActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['employeeActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['employeeId'] + ')">Edit</button></td>'
                html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['employeeId'] + ')">Hapus</button></td>'
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
                $.post('personal/active', { id: id }, function (data) {
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
                $.post('personal/active', { id: id }, function (data) {
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
            $.post('personal/delete_table', { id: id }, function (data) {
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Succes!',
                        text: data.msg,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        load_data
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

function reset_form() {
    $(".input_alamat").val('');
    $(".input_asuransi").val('');
    $(".input_kontak").val('');
    $(".input_pendididikan").val('');
    $("#txcabang").val('');
    $("#txbank").val('');
    $("#txnama").val('');
    $("#txnamalkp").val('');
    $("#txkode").val('');
    $("#txemail").val('');
    $("#txktp").val('');
    $("#txgender").val('');
    $("#txgolongan").val('');
    $("#txnamaibu").val('');
    $("#txagama").val('');
    $("#txkebangsaan").val('');
    $("#txrekening").val('');
    $("#txgaji").val('');
    $("#txbpjs").val('');
    $("#txnobpjs").val('');
    $("#txnpwp").val('');
    $("#txexcl").val('');
    $("#txtglmasuk").val('');
    $("#txtglaktif").val('');
    $("#txtglkeluar").val('');
    $("#table_alamat").val('');
    $("#table_asuransi").val('');
    $("#table_kontak").val('');
    $("#table_pendididikan").val('');
    tampil_alamat()
    tampil_asuransi()
    tampil_contact()
    tampil_pendidikan()
}

function simpan_data() {
    console.log($('#txfoto')[0].files[0], JSON.stringify(arrAlamat), JSON.stringify(arrAsuransi))
    var formData = new FormData();
    formData.append('cabang', $('#txcabang').val())
    formData.append('bank', $('#txbank').val())
    formData.append('nama', $('#txnama').val())
    formData.append('namalkp', $('#txnamalkp').val())
    formData.append('kode', $('#txkode').val())
    formData.append('email', $('#txemail').val())
    formData.append('ktp', $('#txktp').val())
    formData.append('gender', $('#txgender').val())
    formData.append('golongan', $('#txgolongan').val())
    formData.append('namaibu', $('#txnamaibu').val())
    formData.append('agama', $('#txagama').val())
    formData.append('kebangsaan', $('#txkebangsaan').val())
    formData.append('rekening', $('#txrekening').val())
    formData.append('gaji', $('#txgaji').val())
    formData.append('bpjs', $('#txbpjs').val())
    formData.append('nobpjs', $('#txnobpjs').val())
    formData.append('npwp', $('#txnpwp').val())
    formData.append('foto', $('#txfoto')[0].files[0])
    formData.append('tglmasuk', $('#txtglmasuk').val())
    formData.append('tglaktif', $('#txtglaktif').val())
    formData.append('tglkeluar', $('#txtglkeluar').val())
    formData.append('alamat', JSON.stringify(arrAlamat))
    formData.append('asuransi', JSON.stringify(arrAsuransi))
    formData.append('kontak', JSON.stringify(arrKontak))
    formData.append('pendidikan', JSON.stringify(arrPendidikan))

    $.ajax({
        url: 'personal/create',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            console.log(data.status);
            if (data.status === "error") {
                document.getElementById('spinnerSimpan').style.display = 'none';
                document.getElementById('simpanIcon').style.display = 'inline-block';
                Swal.fire({
                    title: 'Error!',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                document.getElementById('spinnerSimpan').style.display = 'none';
                document.getElementById('simpanIcon').style.display = 'inline-block';
                Swal.fire({
                    title: 'Success!',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    reset_form();
                });
            }
        }
    });
}

function edit_data(id) {
    $('#home-tab').tab('show');
    $.post('personal/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
            $("#txcabang").val(data.data.employee.employeeBranchId);
            $("#txbank").val(data.data.employee.employeeBankId);
            $("#txnama").val(data.data.employee.employeeName);
            $("#txnamalkp").val(data.data.employee.employeeFullname);
            $("#txkode").val(data.data.employee.employeeCode);
            $("#txemail").val(data.data.employee.employeeEmail);
            $("#txktp").val(data.data.employee.employeeKtp);
            $("#txgender").val(data.data.employee.employeeGender);
            $("#txgolongan").val(data.data.employee.employeeBlood);
            $("#txnamaibu").val(data.data.employee.employeeMother);
            $("#txagama").val(data.data.employee.employeeReligion);
            $("#txkebangsaan").val(data.data.employee.employeeNation);
            $("#txrekening").val(data.data.employee.employeeBill);
            $("#txgaji").val(data.data.employee.employeeSalaryType);
            $("#txbpjs").val(data.data.employee.employeeBpjsId);
            $("#txnobpjs").val(data.data.employee.employeeBpjsNo);
            $("#txnpwp").val(data.data.employee.employeeNpwp);
            $("#txtglmasuk").val(data.data.employee.employeeInDate);
            $("#txtglaktif").val(data.data.employee.employeeActiveDate);
            $("#txtglkeluar").val(data.data.employee.employeeOutDate);
            $("#table_alamat").val(data.data.employee.empladdress);
            $("#table_asuransi").val(data.data.employee.emplinsuranse);
            $("#table_kontak").val(data.data.employee.emplcontact);
            $("#table_pendididikan").val(data.data.employee.empledu);
            arrAlamat = data.data.address
            tampil_alamat()
            arrAsuransi = data.data.insurance
            tampil_asuransi()
            arrKontak = data.data.contact
            tampil_contact()
            arrPendidikan = data.data.education
            tampil_pendidikan()
            $("#loginModal").data('id', id);
            $("#loginModal").modal('show');
            $(".btn-submit").hide();
            $(".btn-editen").show();
            $(".homelala").focus();
            $(".cnclalmt").hide();
            $(".cnclasr").hide();
            $(".cnclcon").hide();
            $(".cnclpen").hide();
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

function update_data() {
    var id = $("#loginModal").data('id');
    var empladdress = JSON.stringify(arrAlamat);
    var emplinsuranse = JSON.stringify(arrAsuransi);
    var emplcontact = JSON.stringify(arrKontak);
    var empledu = JSON.stringify(arrPendidikan);

    let employeeHarus = {
        id: id,
        employeeBranchId: $("#txcabang").val(),
        employeeBankId: $("#txbank").val(),
        employeeBpjsId: $("#txbpjs").val(),
    }

    let employeeData = {
        employeeName: $("#txnama").val(),
        employeeFullname: $("#txnamalkp").val(),
        employeeCode: $("#txkode").val(),
        employeeEmail: $("#txemail").val(),
        employeeKtp: $("#txktp").val(),
        employeeGender: $("#txgender").val(),
        employeeBlood: $("#txgolongan").val(),
        employeeMother: $("#txnamaibu").val(),
        employeeReligion: $("#txagama").val(),
        employeeNation: $("#txkebangsaan").val(),
        employeeBill: $("#txrekening").val(),
        employeeSalaryType: $("#txgaji").val(),
        employeeBpjsNo: $("#txnobpjs").val(),
        employeeNpwp: $("#txnpwp").val(),
        employeeInDate: $("#txtglmasuk").val(),
        employeeActiveDate: $("#txtglaktif").val(),
        employeeOutDate: $("#txtglkeluar").val(),
        empladdress: empladdress,
        emplinsuranse: emplinsuranse,
        emplcontact: emplcontact,
        empledu: empledu,
    };

    var gabung = Object.assign({}, employeeHarus, employeeData)
    if (Object.values(employeeHarus).some(val => val === "")) {
        document.getElementById('spinnerUpdate').style.display = 'none';
        document.getElementById('updateIcon').style.display = 'inline-block';
        Swal.fire({
            title: 'Error!',
            text: 'Please fill out all fields',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        $.post('personal/update_table', gabung, function (data) {
            if (data.status === 'success') {
                document.getElementById('spinnerUpdate').style.display = 'none';
                document.getElementById('updateIcon').style.display = 'inline-block';
                Swal.fire({
                    title: 'Success!',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    $("#loginModal").modal("hide");
                });
            } else {
                document.getElementById('spinnerUpdate').style.display = 'none';
                document.getElementById('updateIcon').style.display = 'inline-block';
                Swal.fire({
                    title: 'Error!',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }, 'json');
    }
}


function import_excel() {
    $("#importModal").modal('show');
}

function import_excel1() {
    console.log($('#txexcl')[0].files[0])
    var formData = new FormData();
    formData.append('file', $('#txexcl')[0].files[0])
    $.ajax({
        url: 'personal/import_excel',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
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
                }).then(() => {
                    reset_form();
                });
            }
        }
    });
}

function name(params) {
    
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
    $("#refreshButton").click(function () {
        document.getElementById('spinner').style.display = 'inline-block';
        document.getElementById('refreshIcon').style.display = 'none';
    });
    $("#simpanButton").click(function () {
        document.getElementById('spinnerSimpan').style.display = 'inline-block';
        document.getElementById('simpanIcon').style.display = 'none';
    });
    $("#updateButton").click(function () {
        document.getElementById('spinnerUpdate').style.display = 'inline-block';
        document.getElementById('updateIcon').style.display = 'none';
    });
    $(".btn-closed").click(function () {
        reset_form()

        $('#home-tab').tab('show');
    });

    $(".btn-add").click(function () {
        // reset_form();
        $(".btn-submit").show();
        $(".btn-editen").hide();
        $(".cnclalmt").hide();
        $(".cnclasr").hide();
        $(".cnclcon").hide();
        $(".cnclpen").hide();
        $(".homelala").focus();
    })

    $(".page-title").html("BANK")

    load_data();
    load_cabang();
});