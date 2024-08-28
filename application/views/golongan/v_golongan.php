<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <buton type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </buton>
                </div>
                <form action="#">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="first-name-column">Code</label>
                                    <input id="txcode" type="text" class="form-control " placeholder="Code"
                                        name="fname-column" maxlength="3">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Name</label>
                                    <input id="txname" type="text" class="form-control" placeholder="Nama"
                                        name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal</label>
                                    <input id="txnominal" type="text" class="form-control angka des"
                                        placeholder="Nominal"name="levelgroupAmount" oninput="Pembagian()">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Total Hari Dibayar</label>
                                    <input id="txtotal" type="text" class="form-control angka des"
                                        placeholder="Total Hari Dibayar" name="levelgroupDivide"
                                        oninput="Pembagian()">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal/Hari</label>
                                    <input id="txnominak" type="text" class="form-control" name="levelgroupNominal" disabled>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="city-column">Setengah Hari</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txsetengah" onchange="togglePersentAmount()">
                                            <option value="" disabled selected>Pilih</option>
                                            <option value="0">Digaji</option>
                                            <option value="1">Tidak Digaji</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="company-column" id="">Persent / Amount</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txpersentamount"
                                            onchange="amountandpercen()">
                                            <option value="" disabled selected>Pilih</option>
                                            <option value="0">Persent</option>
                                            <option value="1">Amount</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="form-group">
                                    <label for="txpersenpokok" id="label-persent-amount">Persen Pokok / Perhari</label>
                                    <input type="text" class="form-control" name="bpjsEmplPercent" id="txpersenpokok"
                                        placeholder="Masukkan Berapa Persen" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                <i class="bx bx-x d-block d-sm-none"></i>
                                <span class="btn-closed d-none d-sm-block ">Close</span>
                            </button>
                            <button type="button" class="btn btn-primary btn-submit ms-1" onclick="simpan_data()">
                                <i class="bx bx-check d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Submit</span>
                            </button>
                            <button type="button" class="btn btn-warning btn-editen ms-1" onclick="update_data()">
                                <i class="bx bx-check d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Update</span>
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
<div class="card card-dta">
    <div class="card-header">
        <h5 class="card-title">
            Form Golongan
        </h5>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i
                class="bi bi-plus-lg"> </i>Add</button>
        <button class="btn btn-primary" id="refreshButton" onclick="load_data()">
            <i id="refreshIcon" class="bi bi-arrow-clockwise"></i>
            <span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                style="display: none;"></span>
            Refresh
        </button>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Nominal</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
</section>
</div>
</div>
</section>
</div>
</section>
</div>
</div>


</body>

</html>