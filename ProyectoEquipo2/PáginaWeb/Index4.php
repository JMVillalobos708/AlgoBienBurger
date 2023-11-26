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
    <link rel="stylesheet" href="src/css/style2.css">
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>  
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <!-- CSS -->
    <link rel="stylesheet" href="src/css/cards.css">
    <link rel="stylesheet" href="src/css/tarjetas.css">
    
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
        <li class="nav-item">
          <a class="nav-link scrollto" href="index.php#hero">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link scrollto" href="index.php#beneficios">Beneficios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link scrollto" href="index.php#nosotros">Nosotros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="index4.php">Procedimientos</a>
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
      <div class="text-hero">
        <h2 style="font-weight: bold";>Recolección de Café</h2>
      <p style="font-weight: bold;";> Recolectamos en diversas cafeterías alrededor de 5.2 kg<br> de residuos de café los cuales por el hecho de<br> provenir de diferentes fuentes tuvimos que unir<br> para poder homogeneizar en una bolsa y general una<br> sola muestra.</p> 
      </div>
    </div>
  </section>
<!-- Final del Hero -->

<section class="light">
	<div class="container py-2">
		<div class="h1 text-center text-dark" id="pageHeaderTitle">Extracción de Lignina</div>

		<article class="postcard light blue">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="src/imgs/Termobalanza.jpg" alt="Image Title" />
			</a>
			<div class="postcard__text t-dark">
				<h1 class="postcard__title blue"><a href="#">Determinación de la Humedad</a></h1>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">La determinación de la humedad de las muestras era parte vital en el procedimiento ya que en base a este parámetro podríamos saber qué cantidad de la muestra nos sería realmente útil, para obtener dicho parámetro hicimos uso de una termobalanza la cual se calentará a una temperatura de entre 100 – 105 º C. <br><br>Al paso de 30 minutos la termobalanza determinó que la humedad de la muestra se encontraba en alrededor de un 59.90% lo cual nos hace inferir que por cada 100 gr de residuos obtendremos 40 gr secos.
                </div>
			</div>
		</article>
		<article class="postcard light red">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="src/imgs/Sosa.jpg" alt="Image Title" />	
			</a>
			<div class="postcard__text t-dark">
				<h1 class="postcard__title red"><a href="#">Disolución de Sosa</a></h1>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Posteriormente separamos 5100 gr de muestra en una bolsa (Figura 4) los cuales ocuparemos para la extracción de la lignina.<br>Para continuar con el proceso de la extracción de lignina utilizamos 460 gr de sosa, la cual disolveremos en 4 lts de agua (Cuando la Sosa se disuelve libera temperatura la cual calienta el agua y ayuda a una mejor homogeneización).</div>
			</div>
		</article>
		<article class="postcard light green">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="src/imgs/Reactor.jpg" alt="Image Title" />
			</a>
			<div class="postcard__text t-dark">
				<h1 class="postcard__title green"><a href="#">Reactor</a></h1>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Para continuar con el proceso de la extracción utilizamos un reactor en el cual depositamos la muestra de residuos de café y la sosa diluida en agua, para este punto teníamos todo lo necesario para comenzar con el proceso así que comenzamos a elevar la temperatura del reactor hasta alrededor de los 170 º C, al colmar esta temperatura la mantuvimos estable durante 1 hora.</div>
			</div>
		</article>
		<article class="postcard light yellow">
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="src/imgs/Centrifugado.jpg" alt="Image Title" />
			</a>
			<div class="postcard__text t-dark">
				<h1 class="postcard__title yellow"><a href="#">Filtrado y Centrifugado de Lignina</a></h1>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">Al terminar con este proceso filtramos la muestra y obtuvimos una solución en la cual convergen la sosa que diluimos en agua y nuestra muestra de residuos de café, seguidamente centrifugamos esta muestra para obtener una mejor concentración de lignina.<br>Agregamos ácido sulfúrico a la solución y mezclamos para homogeneizar la muestra, la cual dejaríamos reposar hasta el día siguiente para poder continuar con el proceso de extracción de la lignina.</div>
			</div>
		</article>
	</div>
</section>


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