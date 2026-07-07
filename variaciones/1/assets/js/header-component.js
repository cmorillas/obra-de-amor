class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="main-header">
            <div class="nav-container">
                <a href="index.html" class="logo-link">
                    <img src="assets/images/logo.png" alt="Obra de Amor Logo" class="logo-img">
                    <span class="logo-text">Obra de Amor</span>
                </a>
                
                <nav class="nav-menu">
                    <div class="nav-item">
                        <a href="index.html" class="nav-link">Inicio</a>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="vida-contemplativa.html" class="nav-link">Nuestra Vida (Vocaciones) <span class="arrow">&#9662;</span></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item"><a href="carisma.html">Carisma</a></li>
                            <li class="dropdown-item"><a href="vida-contemplativa.html">Vida Contemplativa</a></li>
                            <li class="dropdown-item"><a href="oracion-y-alabanza.html">Oración y Alabanza</a></li>
                            <li class="dropdown-item"><a href="silencio.html">Sagrado Silencio</a></li>
                        </ul>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="que-es-el-rosario-7p.html" class="nav-link">Espiritualidad (Para Todos) <span class="arrow">&#9662;</span></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item"><a href="que-es-el-rosario-7p.html">El Rosario 7P</a></li>
                            <li class="dropdown-item"><a href="grupo-laudate-mariam.html">Grupo Laudate Mariam</a></li>
                            <li class="dropdown-item"><a href="amor-a-maria.html">Amor a María</a></li>
                        </ul>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="biografia.html" class="nav-link">Nuestra Fundadora <span class="arrow">&#9662;</span></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item"><a href="biografia.html">Biografía</a></li>
                            <li class="dropdown-item"><a href="sus-escritos.html">Sus Escritos</a></li>
                            <li class="dropdown-item"><a href="novena.html">Novena</a></li>
                        </ul>
                    </div>
                    <div class="nav-item">
                        <a href="contacto.html" class="nav-btn">Contacto</a>
                    </div>
                </nav>
            </div>
        </header>
        `;

        // Lógica de scroll para el header (funciona en todas las páginas ahora)
        const headerElement = this.querySelector('#main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerElement.classList.add('scrolled');
            } else {
                headerElement.classList.remove('scrolled');
            }
        });

        // Marcar la página actual como activa en el menú
        this.highlightActiveLink();
    }

    highlightActiveLink() {
        const links = this.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Registrar el componente web
customElements.define('site-header', SiteHeader);
