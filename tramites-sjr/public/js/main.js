
function loadComponent(id, file) {
    fetch(`/src/components/${file}`)
      .then(response => {
        if (!response.ok) throw new Error("Error loading component");
        return response.text();
      })
      .then(html => {
        document.getElementById(id).innerHTML = html;
      })
      .catch(error => console.error(error));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "header.html");
    loadComponent("footer", "footer.html");
  });

  //funcion para verificar token de acceso
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
       window.location.href = "login.html"
    }
  }
  
  //funcion para inciar sesion
  function login (){
    console.log("Iniciando sesion");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    localStorage.setItem("Token", token);
    window.location.href = "/src/components/dashboard.html";
  }

let currentStep = 0;
showStep(currentStep);

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps[step].classList.add('active');
}

function nextStep() {
    const steps = document.querySelectorAll('.step');
    steps[currentStep].classList.remove('active');
    currentStep++;
    showStep(currentStep);
}

function prevStep() {
    const steps = document.querySelectorAll('.step');
    steps[currentStep].classList.remove('active');
    currentStep--;
    showStep(currentStep);
}

function previewFile(fileId) {
  const fileInput = document.getElementById(fileId);
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
          sessionStorage.setItem(fileId, event.target.result); // Guardar en sesión temporalmente
      };
      reader.readAsDataURL(file);
  }
}

// Abrir modal y mostrar contenido del archivo
function openModal(fileId) {
  const modal = document.getElementById('modal');
  const modalPreview = document.getElementById('modal-preview');
  const fileData = sessionStorage.getItem(fileId);

  if (fileData) {
      modalPreview.innerHTML = ''; // Limpiar el contenido del modal

      const fileInput = document.getElementById(fileId);
      const fileType = fileInput.files[0].type;

      if (fileType.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = fileData;
          img.style.maxWidth = "50%";
          img.style.height = "auto";
          modalPreview.appendChild(img);
      } else if (fileType === "application/pdf") {
        const iframe = document.createElement("iframe");
        iframe.src = fileData;
        iframe.width = "100%";
        iframe.height = "500px";
        modalPreview.appendChild(iframe);
      } else if (fileType.startsWith("text/")) {
          const textArea = document.createElement("textarea");
          textArea.value = atob(fileData.split(',')[1]);
          textArea.rows = 10;
          textArea.cols = 50;
          textArea.readOnly = true;
          modalPreview.appendChild(textArea);
      } else {
          modalPreview.textContent = "Vista previa no disponible para este tipo de archivo.";
      }

      modal.style.display = "flex";
  }
}

function closeModal() {
  document.getElementById('modal').style.display = "none";
}