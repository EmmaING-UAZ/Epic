document.addEventListener("DOMContentLoaded", function () {

  function createGalleryModal(buttonSelector, galleryData) {
    const openBtn = document.querySelector(buttonSelector);
    if (!openBtn) return;


    const menuButton = document.querySelector(".menu-collapse a");
  const sideNav = document.querySelector(".u-sidenav");
  const closeMenuButton = document.querySelector(".u-menu-close");
  const overlay = document.querySelector(".u-menu-overlay");

  // Abrir el menú lateral
  menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    sideNav.classList.add("menu-open");
    overlay.classList.add("overlay-show");
  });

  // Cerrar el menú lateral
  closeMenuButton.addEventListener("click", function () {
    sideNav.classList.remove("menu-open");
    overlay.classList.remove("overlay-show");
  });

  // Cerrar el menú al hacer clic en el overlay
  overlay.addEventListener("click", function () {
    sideNav.classList.remove("menu-open");
    overlay.classList.remove("overlay-show");
  });

  
    // Modal principal estructura
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.cssText = `
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.8);
    `;

    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
      position: relative;
      background-color: #fefefe;
      margin: 0;
      padding: 20px;
      border: 1px solid #888;
      width: 100%;
      max-width: 800px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
    `;

    // Lightbox estructura
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.style.cssText = `
      display: none;
      position: fixed;
      z-index: 1001;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.9);
      overflow: hidden;
    `;

    const lightboxContent = document.createElement("div");
    lightboxContent.className = "lightbox-content";
    lightboxContent.style.cssText = `
      position: absolute;
      transform: translate(-50%, -50%);
      position: fixed;
      top: 50%;
      left: 50%;
    `;


    const lightboxImage = document.createElement("img");
    lightboxImage.style.cssText = `
      max-height: 90vh;
      max-width: 90vh;
      object-fit: contain;
      
    `;

    function adjustImageSize(imageElement) {
      imageElement.onload = () => {
        if (imageElement.naturalWidth >= 1900) {
          imageElement.style.width = "85vw";  // Ajusta el ancho para imágenes grandes
        } else {
          imageElement.style.width = "auto";  // Mantén el tamaño original para imágenes más pequeñas
        }
      };
    }

    // Botones de navegación del lightbox
    const lightboxPrevBtn = document.createElement("button");
    lightboxPrevBtn.className = "lightbox-nav prev";
    lightboxPrevBtn.innerHTML = "&lt;";
    lightboxPrevBtn.style.cssText = `
      position: fixed;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
       background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      padding: 15px 20px;
      cursor: pointer;
      font-size: 24px;
      border-radius: 5px;
      z-index: 1002;
    `;

    const lightboxNextBtn = document.createElement("button");
    lightboxNextBtn.className = "lightbox-nav next";
    lightboxNextBtn.innerHTML = "&gt;";
    lightboxNextBtn.style.cssText = `
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      padding: 15px 20px;
      cursor: pointer;
      font-size: 24px;
      border-radius: 5px;
      z-index: 1002;
    `;

    const lightboxCloseBtn = document.createElement("button");
    lightboxCloseBtn.className = "lightbox-close";
    lightboxCloseBtn.innerHTML = "&times;";
    lightboxCloseBtn.style.cssText = `
      position: fixed;
      right: 25px;
      top: 15px;
      color: white;
      background-color: rgba(0, 0, 0, 0.7);
      border: none;
      font-size: 40px;
      cursor: pointer;
      z-index: 1002;
    `;

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
      color: #aaa;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    `;

    const galleryContainer = document.createElement("div");
    galleryContainer.className = "gallery-container";
    galleryContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

const imageContainer = document.createElement("div");
imageContainer.style.cssText = `
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 400px; /* Cambiado de 250px a 400px */
  margin-top: 40px;
  margin-bottom: 20px;
  overflow: hidden;
`;

    const galleryImage = document.createElement("img");
    galleryImage.id = "galleryImage";
    galleryImage.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    `;

    const prevBtn = document.createElement("button");
    prevBtn.className = "nav-btn prev";
    prevBtn.innerHTML = "&lt;";
    prevBtn.style.cssText = `
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0,0,0,0.5);
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      font-size: 18px;
    `;

    const nextBtn = document.createElement("button");
    nextBtn.className = "nav-btn next";
    nextBtn.innerHTML = "&gt;";
    nextBtn.style.cssText = `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0,0,0,0.5);
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      font-size: 18px;
    `;

    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";
    infoContainer.style.cssText = `
      width: 100%;
      padding: 0 20px;
    `;

    const galleryTitle = document.createElement("h2");
    galleryTitle.id = "galleryTitle";

    const galleryPrice = document.createElement("p");
    galleryPrice.id = "galleryPrice";

    const galleryDescription = document.createElement("p");
    galleryDescription.id = "galleryDescription";

    // Función para abrir el lightbox con zoom
    function openLightbox(imageUrl) {
      lightbox.style.display = "block";
      lightboxImage.src = imageUrl;
      adjustImageSize(lightboxImage); // Llama a la función para ajustar el tamaño
    }

    // Función para cerrar el lightbox
    function closeLightbox() {

      lightbox.style.display = "none";
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Construct the modal structure
    imageContainer.appendChild(galleryImage);
    imageContainer.appendChild(prevBtn);
    imageContainer.appendChild(nextBtn);

    infoContainer.appendChild(galleryTitle);
    infoContainer.appendChild(galleryPrice);
    infoContainer.appendChild(galleryDescription);

    galleryContainer.appendChild(imageContainer);
    galleryContainer.appendChild(infoContainer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(galleryContainer);

    modal.appendChild(modalContent);

    // Construir el lightbox
    lightboxContent.appendChild(lightboxImage);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(lightboxPrevBtn);
    lightbox.appendChild(lightboxNextBtn);
    lightbox.appendChild(lightboxCloseBtn);

    document.body.appendChild(modal);
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;

    lightboxContent.appendChild(lightboxImage);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(lightboxPrevBtn);
    lightbox.appendChild(lightboxNextBtn);
    lightbox.appendChild(lightboxCloseBtn);

    document.body.appendChild(modal);
    document.body.appendChild(lightbox);


    function addDownloadButton(infoContainer, galleryData, currentImageIndex) {
      const downloadBtn = document.createElement("a");
      downloadBtn.className = "download-btn";
      downloadBtn.textContent = "Descargar imagen";
      downloadBtn.style.cssText = `
        display: inline-block;
        background-color: #478ac9;
        color: white;
        padding: 10px 15px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin-top: 10px;
        margin-right: 10px; /* Agregar margen a la derecha */
        border-radius: 5px;
        cursor: pointer;
      `;

      const contactBtn = document.createElement("a");
      contactBtn.className = "contact-btn";
      contactBtn.textContent = "Contacto";
      contactBtn.href = "../../contacto.html"; 
      contactBtn.style.cssText = `
        display: inline-block;
        background-color: #478ac9;
        color: white;
        padding: 10px 15px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin-top: 10px;
        border-radius: 5px;
        cursor: pointer;
      `;
      
      downloadBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const currentData = galleryData[currentImageIndex];
        const link = document.createElement("a");
        link.href = currentData.download || currentData.src;
        link.download = currentData.title + ".jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      infoContainer.appendChild(downloadBtn);
      infoContainer.appendChild(contactBtn); // Agregar el botón de Contacto
    }

    // Add download button
    addDownloadButton(infoContainer, galleryData, currentImageIndex);

    function updateGalleryContent() {
      const currentData = galleryData[currentImageIndex];
      galleryImage.src = currentData.src;
      galleryImage.alt = currentData.title;
      galleryTitle.textContent = currentData.title;
      galleryPrice.textContent = "Precio: " + currentData.price;
      galleryDescription.textContent = currentData.description;

      // Update download button
      const downloadBtn = infoContainer.querySelector(".download-btn");
      downloadBtn.href = currentData.download || currentData.src;
      downloadBtn.download = currentData.title + ".jpg";

      if (galleryData.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        lightboxPrevBtn.style.display = "none";
        lightboxNextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        lightboxPrevBtn.style.display = "block";
        lightboxNextBtn.style.display = "block";
      }
    }

    function applyResponsiveStyles() {
      if (window.innerWidth >= 768) {
        galleryContainer.style.flexDirection = "row";
        imageContainer.style.width = "60%";
        imageContainer.style.marginBottom = "0";
        infoContainer.style.width = "35%";
      } else {
        galleryContainer.style.flexDirection = "column";
        imageContainer.style.width = "100%";
        imageContainer.style.marginBottom = "20px";
        infoContainer.style.width = "100%";
      }
      // Ajuste de la imagen en dispositivos pequeños
  if (window.innerWidth < 768) {
    lightboxImage.style.width = "80vw";        // Limita el ancho al 80% del ancho de la pantalla
    lightboxImage.style.height = "auto";       // Mantiene la proporción original de la imagen
    lightboxImage.style.maxHeight = "70vh";    // Limita la altura al 70% de la pantalla
    lightboxImage.style.objectFit = "contain"; // Asegura que la imagen se mantenga dentro de los límites sin recorte
    lightboxImage.style.margin = "0 auto";     // Centra la imagen horizontalmente
  } else {
    lightboxImage.style.maxHeight = "85vh";
    lightboxImage.style.maxWidth = "85vw"; // Usar 'vw' para más control en pantallas grandes
    lightboxImage.style.objectFit = "contain";
  }


      if (window.innerWidth >= 768) {
        galleryContainer.style.flexDirection = "row";
        imageContainer.style.width = "60%";
        imageContainer.style.marginBottom = "0";
        infoContainer.style.width = "35%";
        
        // Centrar el modal en pantallas más grandes
        modalContent.style.margin = "5% auto"; // Margen para centrar
        modalContent.style.width = "95%"; // Ancho del 90% en pantallas grandes
        modalContent.style.maxWidth = "1000px"; // Mantener el ancho máximo
      } else {
        galleryContainer.style.flexDirection = "column";
        imageContainer.style.width = "100%";
        imageContainer.style.marginBottom = "20px";
        infoContainer.style.width = "100%";
        
        // Estilo para cubrir toda la pantalla en dispositivos más pequeños
        modalContent.style.borderRadius = "0"; // Remover borde redondeado en pantallas pequeñas
        modalContent.style.maxWidth = "none"; // Quitar límite de ancho máximo
      }
    }

    function navigateGallery(direction) {
      if (galleryData.length <= 1) return;

      if (direction === "prev") {
        currentImageIndex =
          (currentImageIndex - 1 + galleryData.length) % galleryData.length;
      } else if (direction === "next") {
        currentImageIndex = (currentImageIndex + 1) % galleryData.length;
      }
      updateGalleryContent();
    }

    // Event listeners para el lightbox
    lightboxCloseBtn.addEventListener("click", closeLightbox);

    // Event listeners para la navegación del lightbox
    lightboxPrevBtn.addEventListener("click", function() {
      navigateGallery("prev");
      lightboxImage.src = galleryData[currentImageIndex].src;
    });

    lightboxNextBtn.addEventListener("click", function() {
      navigateGallery("next");
      lightboxImage.src = galleryData[currentImageIndex].src;
    });

    function initializeZoom() {
      new Drift(lightboxImage, {
        paneContainer: lightboxContent,
        inlinePane: false,
        containInline: true,
        hoverBoundingBox: true,
        zoomFactor: 2,
        touchBoundingBox: true,
        touchDelay: 500,
        sourceAttribute: "src",
        zoomWindowWidth: "100%",
        zoomWindowHeight: "100%",
        namespace: "drift-gallery",
        inlineOffsetY: -50,
        inlineOffsetX: 0,
        hoverDelay: 0,
        movementDistance: 150,
      });
    }

    // Agregar evento de carga de la imagen para inicializar el zoom
    lightboxImage.addEventListener("load", initializeZoom);


    function applyResponsiveStyles() {
      if (window.innerWidth >= 768) {
        galleryContainer.style.flexDirection = "row";
        imageContainer.style.width = "60%";
        imageContainer.style.marginBottom = "0";
        infoContainer.style.width = "35%";
      } else {
        galleryContainer.style.flexDirection = "column";
        imageContainer.style.width = "100%";
        imageContainer.style.marginBottom = "20px";
        infoContainer.style.width = "100%";
      }
      if (window.innerWidth < 768) {
        modalContent.style.borderRadius = "0"; // Remueve el borde redondeado en pantallas pequeñas
        modalContent.style.maxWidth = "none"; // Quita el límite de ancho máximo
      }

      if (window.innerWidth >= 768) {
        galleryContainer.style.flexDirection = "row";
        imageContainer.style.width = "60%";
        imageContainer.style.marginBottom = "0";
        infoContainer.style.width = "35%";
        
        // Centrar el modal en pantallas más grandes
        modalContent.style.margin = "5% auto"; // Margen para centrar
        modalContent.style.width = "95%"; // Ancho del 90% en pantallas grandes
        modalContent.style.maxWidth = "1000px"; // Mantener el ancho máximo
      } else {
        galleryContainer.style.flexDirection = "column";
        imageContainer.style.width = "100%";
        imageContainer.style.marginBottom = "20px";
        infoContainer.style.width = "100%";
        
        // Estilo para cubrir toda la pantalla en dispositivos más pequeños
        modalContent.style.borderRadius = "0"; // Remover borde redondeado en pantallas pequeñas
        modalContent.style.maxWidth = "none"; // Quitar límite de ancho máximo
      }
      
       // Ajustar imagen en pantallas pequeñas
  if (window.innerWidth < 768) {
    imageContainer.style.maxHeight = "40vh"; // Cambiar para que sea más recortada
    imageContainer.style.maxWidth = "90vw";  // Ajustar el ancho máximo
  } else {
    imageContainer.style.maxHeight = "85vh"; // Mantener el estilo para pantallas más grandes
    imageContainer.style.maxWidth = "85vh";
  }
    }

    applyResponsiveStyles();
    window.addEventListener("resize", applyResponsiveStyles);



    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "block";
      updateGalleryContent();
      document.addEventListener("keydown", handleKeyPress);
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.removeEventListener("keydown", handleKeyPress);
    });

    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        document.removeEventListener("keydown", handleKeyPress);
      }
    });

    prevBtn.addEventListener("click", function () {
      navigateGallery("prev");
    });

    nextBtn.addEventListener("click", function () {
      navigateGallery("next");
    });

    // Event listener para abrir el lightbox al hacer click en la imagen
    galleryImage.addEventListener("click", function() {
      openLightbox(this.src);
    });

  
  

    // Función para manejar las teclas de navegación
    function handleKeyPress(event) {
      if (modal.style.display === "block") {
        switch (event.key) {
          case "ArrowLeft":
            navigateGallery("prev");
            break;
          case "ArrowRight":
            navigateGallery("next");
            break;
          case "Escape":
            modal.style.display = "none";
            document.removeEventListener("keydown", handleKeyPress);
            break;
        }
      }

      if (lightbox.style.display === "block") {
        switch(event.key) {
          case "ArrowLeft":
            lightboxPrevBtn.click();
            break;
          case "ArrowRight":
            lightboxNextBtn.click();
            break;
          case "Escape":
            closeLightbox();
            break;
        }
      }
    }

    // Add ARIA attributes for accessibility
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "galleryTitle");
    closeBtn.setAttribute("aria-label", "Cerrar galería");
    prevBtn.setAttribute("aria-label", "Imagen anterior");
    nextBtn.setAttribute("aria-label", "Siguiente imagen");
    lightbox.setAttribute("role", "dialog");
    lightboxCloseBtn.setAttribute("aria-label", "Cerrar vista ampliada");
    lightboxPrevBtn.setAttribute("aria-label", "Imagen anterior");
    lightboxNextBtn.setAttribute("aria-label", "Siguiente imagen");
  }

  
    const galleryData1 = [
      {
        src: "./images/restaurantes/imagenes/2.jpg",
        title: "Restaurant de desayunos",
        price: "Desde $1,500",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/2.jpg",
      },
    ];
  
    const galleryData2 = [
      {
        src: "./images/restaurantes/imagenes/16.1.jpg",
        title: "Tienda de pasteles",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/16.1.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/16.2.jpg",
        title: "Tienda de pasteles",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/16.2.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/16.3.jpg",
        title: "Tienda de pasteles",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/16.3.jpg",
      },
      
    ];

    const galleryData3 = [
      {
        src: "./images/restaurantes/imagenes/21.1.jpg",
        title: "Restaurante",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/21.1.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/21.2.jpg",
        title: "Restaurant",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/21.2.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/21.3.jpg",
        title: "Restaurant",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/21.3.jpg",
      },
      
    ];

    const galleryData4 = [
      {
        src: "./images/restaurantes/imagenes/14.jpg",
        title: "Hamburguesas",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/14.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/14.1.jpg",
        title: "Hamburguesas",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/14.1.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/14.2.jpg",
        title: "Hamburguesas",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/14.2.jpg",
      },
      
    ];

    const galleryData5 = [
      {
        src: "./images/restaurantes/imagenes/6.jpg",
        title: "Restaurant",
        price: "Desde $1,500",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/6.jpg",
      },
    ];

    const galleryData6 = [
      {
        src: "./images/restaurantes/imagenes/7.1.jpg",
        title: "Restaurant",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/7.1.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/7.2.jpg",
        title: "Restaurant",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/7.2.jpg",
      },
      {
        src: "./images/restaurantes/imagenes/7.3.jpg",
        title: "Restaurant",
        price: "Desde $1,800",
        description:
          "Dar click en la imagen para ver el contenido completo de la página o descarga la imagen para compartir.",
        download: "./images/restaurantes/imagenes/7.3.jpg",
      },
      
    ];
  
    const allGalleryData = [galleryData1, galleryData2,galleryData3,galleryData4,galleryData5,galleryData6];
  
    for (let i = 1; i <= 25; i++) {
      const buttonSelector = `.u-btn-${i}`;
      const galleryData = allGalleryData[i - 1] || [];
      createGalleryModal(buttonSelector, galleryData);
    }
  });