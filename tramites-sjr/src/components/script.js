const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll("a[data-section]");

	links.forEach(link =>{
		link.addEventListener('click', function (e){
			e.preventDefault();
			document.querySelectorAll("main > div").forEach(div=>{
				div.style.display = "none";
			});

			const sectionId = this.getAttribute("data-section");
			document.getElementById(sectionId).style.display = "block";

			link.forEach(l => l.parentElement.classList.remove("active"));
			this.parentElement.classList.add("active");
		});
	});
});

function enviarToken(){
	console.log("Enviando token");
}



// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

function VerificaToken(){
    const Token = localStorage.getItem("Token");
    if(Token){
      const TokenSplit = Token.split(".");
      if (TokenSplit.length === 3){
        //window.location.href = "login.html"
        const payload = JSON.parse(atob(TokenSplit[1]));
        console.log("Payload", payload);
      }else{
        console.error("Token invalido");
      }
    }else{
      console.error("Token no encontrado");
       window.location.href = "/public/login.html"
    }
  }


function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Cerrar el modal cuando se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}