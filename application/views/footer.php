<footer>
                <div class="footer clearfix mb-0 text-muted">
                    <div class="float-start">
                        <p>2024 &copy; Absensi</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="assets/js/dark.js"></script>
    <script src="assets/js/perfect-scrollbar/perfect-scrollbar.min.js"></script>

    <script src="assets/js/app.js"></script>

    <!-- Need: Apexcharts -->
    <script src="assets/js/apexcharts.min.js"></script>
    <script src="assets/js/dashboard.js"></script>
    
    <!-- Choices -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/choices.js"></script>
    <script src="assets/js/form-element-select.js"></script>
    <script src="assets/js/jquery.dataTables.min.js"></script><!--Datatable-->
    <script src="assets/js/dataTables.bootstrap5.min.js"></script><!--databases-->
    <script src="https://unpkg.com/notie"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script>var base_url = '<?= base_url(); ?>'</script>
    <?php if (isset($js)){?>
        <script src="<?php echo base_url('app/'.$js.'.js');?>"></script>
    <?php }?>


</body>
</html>
