<?php 
include("localsettings.php"); // php local page for importing credential to DB connection
$password = PASSWORD;  //defined in localsettings.php
$username = USERNAME;
$db_addr = DB_ADDR;
$db_name = DB_NAME;
$db_port = DB_PORT;

//setting header to json
header('Content-Type: application/json');
// Declare a new class for the pg_connect() connect parameters

// testing input values
if ($_GET['x'] < -180 or $_GET['x'] > 180 or !is_numeric($_GET['x'])) {
	die("Wrong or missing parameter x");
} elseif ($_GET['y'] < -180 or $_GET['y'] > 180 or !is_numeric($_GET['y'])) {
	die("Wrong or missing parameter y");
} elseif (!is_numeric($_GET['epsg'])) {
	die("Wrong epsg code");
} elseif (!is_numeric($_GET['year']) or $_GET['year'] < 2015 or $_GET['year'] > 2018) {
	die("Wrong or missing year");
}

class connectionParams {}
$param = new connectionParams;
// set the database host address for the connection
$param->host = $db_addr;
$param->port = $db_port;
// set the database name for the connection
$param->dbname = $db_name;
$param->user = $username;
$param->password = $password;
// declare a new string for the pgconnect method
$hostString = "";
// use an iterator to concatenate a string to connect to PostgreSQL
foreach ($param as $key => $value) {
	// concatenate the connect params with each iteration
	$hostString = $hostString . $key . "=" . $value . " ";
}

//get connection & check success
$mysqli =  pg_connect($hostString);
if(!$mysqli){
  die("Connection failed" . $mysqli->error);
}

switch ($_GET['layer']) {
	case 1: // sigec
		switch ($_GET['year']) {
			case 2015:
				$query = sprintf("SELECT s.cult_nom, SUM(st_area(st_intersection(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000) ))) as area_exact
									FROM apiscore.sigec15 s
									WHERE st_intersects(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000))
									GROUP BY s.cult_nom
									ORDER BY area_exact DESC");
				break;
			case 2016:
				$query = sprintf("SELECT s.cult_nom, SUM(st_area(st_intersection(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000) ))) as area_exact
									FROM apiscore.sigec16 s
									WHERE st_intersects(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000))
									GROUP BY s.cult_nom
									ORDER BY area_exact DESC");
				break;
			case 2017:
				$query = sprintf("SELECT s.cult_nom, SUM(st_area(st_intersection(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000) ))) as area_exact
									FROM apiscore.sigec17 s
									WHERE st_intersects(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000))
									GROUP BY s.cult_nom
									ORDER BY area_exact DESC");
				break;
			case 2018:
				$query = sprintf("SELECT s.cult_nom, SUM(st_area(st_intersection(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000) ))) as area_exact
									FROM apiscore.sigec18 s
									WHERE st_intersects(s.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000))
									GROUP BY s.cult_nom
									ORDER BY area_exact DESC");
				break;
			default:
				echo $_GET['year'];
				die("Selected year non available !! ");
				break;
		}
		break;
	case 2: // occ sol
		$query = sprintf("SELECT wl.legend, sq2.pcount
						from(
							select
							(pvc).value covclass, sum((pvc).count) pcount
							FROM
								(SELECT
								ST_ValueCount(ST_Clip(sq1.rast, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),3812),3000), true)) pvc
								 FROM (select w.rast
									  from apiscore.walousoc w
									  WHERE st_intersects(w.rast,ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),3812),3000)))sq1
								 
								)foo
							WHERE (pvc).value != 0
							group by covclass)sq2
						inner join apiscore.walousoclegend wl ON wl.covclass = sq2.covclass
						order by sq2.pcount DESC");
		break;
	case 3: // lifewatch
		$query = sprintf("SELECT cl.label, SUM(st_area(st_intersection(l.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000) ))) as area_exact
						FROM apiscore.lifewatch l
						INNER JOIN apiscore.lccs cl ON cl.classname = CAST(l.lccs AS int)
						WHERE st_intersects(l.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000))
						GROUP BY cl.label
						ORDER BY area_exact DESC");
		break;
	case 4: // picc (haies)
		$query = sprintf("SELECT sum(p.length) as sum_lengths
							FROM apiscore.picc p
							WHERE st_intersects(p.geometry, ST_Buffer(ST_Transform(ST_SetSRID( ST_Point( $1, $2), $3),31370),3000))");
		break;
	default:
		die("Selected layer not available");
		break;
}
//query to get data from the table

//execute query
$result = pg_query_params($mysqli, $query, [$_GET['x'], $_GET['y'], $_GET['epsg']]);
if (!$result) {
  echo "Une erreur s'est produite. Verifiez les paramètres de l'URL ou contactez l'administateur.\n";
  exit;
}
//loop through the returned data
$data = array();
$sum = 0;
$i = 0;
while ($row = pg_fetch_row($result)) {
	if ($i > 5) {
		$sum += $row[1];
	} else {
		$data[] = $row;
	}
	$i += 1;
}
if ($_GET['layer'] != 4) {
	$data[] = ["autre", (string)$sum];
}

//free memory associated with result
//$result->close();

//close connection
pg_close($mysqli);

//now print the data
print json_encode($data);
?>