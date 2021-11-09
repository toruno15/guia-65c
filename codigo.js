var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='action'></td></tr>";
var productos=null;
const API = 'https://retoolapi.dev/gdrN0Q/productos';

  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
		var precio=document.getElementById("price"); 
		precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
		var num=productos.length;
		var listado=document.getElementById("listado");
		var ids,titles,prices,descriptions,categories,fotos;
		var tbody=document.getElementById("tbody"),nfila=0;
		tbody.innerHTML="";
		var catcode;
		for(i=0;i<num;i++) tbody.innerHTML+=fila;
		var tr
		var btnEliminar = document.getElementsByClassName("action");
		ids=document.getElementsByClassName("id");
		titles=document.getElementsByClassName("title");
		descriptions=document.getElementsByClassName("description");
		categories=document.getElementsByClassName("category");   
		fotos=document.getElementsByClassName("foto");   
		prices=document.getElementsByClassName("price");  
	 
		if(orden===0) {
			 orden=-1;precio.innerHTML="price"
		}
	 	 else
			if(orden==1) {
				ordenarAsc(productos,"price");
				precio.innerHTML="Precio A";
				precio.style.color="darkgreen"			}
			else 
				if(orden==-1) {
						ordenarDesc(productos,"price");
					precio.innerHTML="Precio D";
					precio.style.color="blue"
				}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
		  try{
			ids[nfila].innerHTML=productos[nfila].id;
			titles[nfila].innerHTML=productos[nfila].title;
			descriptions[nfila].innerHTML=productos[nfila].description;
			categories[nfila].innerHTML=productos[nfila].category;
			catcode=codigoCat(productos[nfila].category);
			tr=categories[nfila].parentElement;
			tr.setAttribute("class",catcode);
			prices[nfila].innerHTML="$"+productos[nfila].price;
			fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
			fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
			
			//ingresando los atributos al boton de eliminar productos
			btnEliminar[nfila].innerHTML = "<button>Eliminar</button>";
			btnEliminar[nfila].firstChild.setAttribute("class", "eliminar");
			btnEliminar[nfila].firstChild.setAttribute("id",productos[nfila].id);
			btnEliminar[nfila].firstChild.setAttribute("onclick",`deleteProducto(${productos[nfila].id})`)
		  }
		  catch(error){
			console.error(error);
		  }
		}
	}

	//metodo para obtener productos
	function obtenerProductos() {
	  	fetch(API)
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(function(producto) {
					producto.price = parseFloat(producto.price)
				});
				listarProductos(data)
			});
	}


	//metodo para eliminar un producto
	function deleteProducto(ident) {
		fetch(`${API}/${ident}`,{method: "DELETE"})
			.then(res=>res.json())
			.then(data=>productos=data);
			alert(`Se ha eliminado el producto numero ${ident} de manera correcta`)
	}

	//metodo para agregar un producto
	function addProductos() {
		var nuevoProducto={
			image: document.getElementById("imagen").value ,
			price: parseFloat(document.getElementById("precio").value),
			title: document.getElementById("titulo").value,
			category: document.getElementById("categoria").value,
			description: document.getElementById("descripcion").value
		}
	  	fetch(API,
		{
			method:"POST",
			body: JSON.stringify(nuevoProducto),
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
		.then(res=>res.json())
		.then(data=>{
			productos=data;
			listarProductos(data);
		});
		alert("Nuevo producto agregado correctamente")
	}

	/*Metodos de ordenamiento en base al precio de manera ascendente y descendente*/
function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}