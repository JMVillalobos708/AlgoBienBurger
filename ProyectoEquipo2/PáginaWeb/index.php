<?php 
// todo lo que esta detro de este php es para jalar los datos del login para mostrarlos
session_start();
require "DataBase.php";
 if (isset($_SESSION['user_id'])){
     $records = $conn->prepare('SELECT id,email,password FROM users WHERE id = :id');
     $records->bindParam(':id', $_SESSION['user_id']);
     $records->execute();
     $results = $records->fetch(PDO::FETCH_ASSOC);//obtener los datos del usuario

     $user = null;
     if(count($results) > 0){
        $user = $results;//En esta variable ya estan los datos del usuario logueado
     }
 }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="icono.png">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equipo 2</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="src/css/style.css">
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>  
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    
</head>
<body>
<!-- ======= Navbar ======= -->
<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
  <div class="container d-flex align-items-center">          
    <a class="navbar-brand carrefe" href="#"><span style="color: #161621">Equipo</span><span style="color: #a75f38">2</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse data-scroll-header navbar-collapse text-right" id="navbarColor03">
      <div style="width: 300px;"></div>
      <ul class="navbar-nav mx-auto">
        <li class="nav-itm">
          <a class="nav-link active" href="#hero">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link scrollto" href="#beneficios">Beneficios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link scrollto" href="#nosotros">Nosotros</a>
        </li>
      <?php if(isset($user['email'])) : ?>
        <li style="padding-left: 10px">
          <a class="btn btn-info rounded-pill txt-white" href="index3.php">Experimentación</a>
        </li> 
        
      <?php endif; ?>
      </ul>
    </div>
    <li class="nav-item">
      <!-- ======= Cambiar por inicio de sesión ======= --> 
      <?php if(isset($user['email'])) : ?>
        <br> <?= $user['email'] ?>
        <br><a href="logout.php">Salir</a>
    <?php else : ?>
      <a href="index2.php" >    
        Iniciar Sesión
      </a>
    <?php endif; ?>

    </li>

  </div>
</nav>
</header>   
<!-- Hero -->
<!-- Comienzo del Hero -->
<section id="hero" class="d-flex align-items-center">
  <div class="container">
    <h1>Proyecto Asfalto</h1>
    <h2>Información</h2>
    <p style="background-color: #D2D7D750; color: #000; font-weight: bold;";>Con la ayuda del residuo del cafe, crearemos asfalto. <br>Para lograr esto lo primero que hicimos es que en un laboratorio hicimos lignina de cafe para despues hacer la solucion con el chapopote y asi pudimos crear el asfalto.</p>
    <!--<a href="index3.html" class="btn-get-started scrollto">Experimentación</a>  Cambiar -->
  </div>
</section>
<!-- Final del Hero -->

<main id="main">
  <!-- Comienzo del about -->
  <section id="beneficios" class="about">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-5 col-lg-6 photo-box d-flex justify-content-center align-items-stretch position-relative">
      </div>
      <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
        <h3>Beneficios</h3>
        <p>El asfalto de cafe es mucho mas eficaz que los demas, ya que es mas duradero y mas resistente, esta hecho con materiales naturales y estamos reutilazando un material que contamina y abunda mucho.</p>

        <div class="icon-box">
          <div class="icon"><i class="bx bx-leaf"></i></div>
          <h4 class="title"><p>Biodegradable</p></h4>
          <p class="description">Al utilizar residuos del café ayudamos al medio ambiente reutilizando estos.</p>
        </div>

        <div class="icon-box">
          <div class="icon"><i class="bx bxs-hot"></i></div>
          <h4 class="title"><p>Resistencia térmica</p></h4>
          <p class="description">Garantiza una resistencia térmica mayor al asfalto promedio.</p>
        </div>

        <div class="icon-box">
          <div class="icon"><i class="bx bx-plus-medical"></i></div>
          <h4 class="title"><p>Otras</p></h4>
          <p class="description">El residuo de cafe es muy util para varias cosa, por ejemplo: la extraccion de biopolimeros.</p>
        </div>
      </div>
    </div>
  </div>
  </section>
  <!-- Fin del about -->
  <!-- ======= Nosotros Section ======= -->
  <section id="nosotros" class="services">
    <div class="container">

      <div class="section-title">
        <h2>Sobre Nosotros</h2>
        <p>Es importante que tengamos claro cuáles son nuestros objetivos y metas por lo que damos a conocer las nuestra brevemente.</p>
      </div>

      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6 d-flex align-items-stretch">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-heartbeat"></i></div>
            <h4><a href="">Nuestra Visión</a></h4>
            <p>Es aprovechar el residuo de cafe para mejorar el medio ambiente y disminuir su impacto en el ambiente.</p>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
          <div class="icon-box">
            <div class="icon"><i class="fas fa-pills"></i></div>
            <h4><a href="">Nuestra Misión</a></h4>
            <p>Es crear Asfalto a traves de residuos de cafe y estudiar sus caracteristicas.</p>
          </div>
        </div>
    </div>
  </section> 
  <!-- End nosotros Section -->

  <footer class="myfooter">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-10">
            <h3>Equipo 2</h3>

          </div>
          <div class="col-lg-3 col-md-10">
            <p>
              CUCEI
              Blvd. Gral. Marcelino García<br>
              Barragán 1421, Olímpica,<br>
              44430 Guadalajara, Jal.<br><br>
            </p>
          </div>
          <div class="col-lg-5 col-md-10">
            <p>
              <strong>Teléfono:</strong> +52 331378-5900<br>
              <strong>Página Web:</strong> http://www.cucei.udg.mx<br>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>