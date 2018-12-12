<?php
    // session_start();
    include"unpam/koneksi.php";
    $query = "SELECT * FROM register WHERE(username = '".$_POST['username']."') AND (password='".$_POST['password']."');";
    $login = mysqli_query($conn, $query);
    $rowcount = mysqli_num_rows($login);
    // echo $query;
    // echo $_POST['username'];
    // echo $_POST['password'];
    // echo $rowcount;
    if($rowcount==1){
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['password'] = $_POST['password'];
        echo "
            <script>
                alert('Anda berhasil masuk');
                window.location.href='?module=profil';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Anda gagal masuk');
                window.location.href='index.php';
            </script>
        ";
    }
    mysqli_close($conn);
?>