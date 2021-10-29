$(document).ready(function () {
    //agregando un evento submit al formulario en el HTML
    $(".formulario").on("submit", function (e) {
        e.preventDefault()
        const superHeroNumber = parseInt($(".form-control").val())
        //Validando si es número un número y si este se encuentra en el rango de la API (1 a 731)
        if (isNaN(superHeroNumber)) {
            return alert (`Únicamente se aceptan números. Vuelve a ingresar tu búsqueda`)
        }
        if (superHeroNumber < 1 || superHeroNumber > 731) {
            return alert (`El número ingresado ${superHeroNumber} no corresponde a una ID. Vuelve a ingresar un número del 1 al 731`)
        }

     llamadaAPi(superHeroNumber)   
    
    })
    
})

//función llamando a la API mediante Ajax Jquery
const llamadaAPi = (id) =>{
    $.ajax({
        type: "GET",
        url:`https://superheroapi.com/api.php/2013219502183072/${id}`,
        dataType: "json",
        success: function (res) {
            $(".superhero").fadeIn()
            $("#heroNombre").text(res.name);
            $("#heroImg").attr("src", res.image.url);
            $("#heroImg").attr("alt", res.name);
            $("#conexiones").text(res.connections["group-affiliation"]);
            $("#publicado").text(res.biography.publisher);
            $("#ocupacion").text(res.work.occupation);
            $("#aparicion").text(res.biography["first-appearance"]);
            $("#altura").text(res.appearance.height.join(" - "));
            $("#peso").text(res.appearance.weight.join(" - "));
            $("#alias").text(res.biography.aliases.join(", "));

            //agregando CanvasJS
            $("#superHeroName").text(res.name)
            canjasJsHero(res)
        },
        error: function () {
            alert("Error de conexión");
        }
    })  


}

//función de CanvasJS
function canjasJsHero(hero) {
	var options = {
		data: [
			{
				type: "pie",
				startAngle: 45,
				showInLegend: "true",
				legendText: "{label}",
				indexLabel: "{label} ({y})",
				dataPoints: [
					{ label: "Intelligence", y: hero.powerstats.intelligence },
					{ label: "Strength", y: hero.powerstats.strength },
					{ label: "Speed", y: hero.powerstats.speed },
					{ label: "Durability", y: hero.powerstats.durability },
					{ label: "Power", y: hero.powerstats.power },
					{ label: "Combat", y: hero.powerstats.combat },
				],
			},
		],
	};

	$("#chartContainer").CanvasJSChart(options);
}