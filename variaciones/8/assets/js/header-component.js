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
                        <a href="carisma.html" class="nav-link">Quiénes Somos <span class="arrow">&#9662;</span></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item"><a href="carisma.html">Carisma</a></li>
                            <li class="dropdown-item"><a href="vida-contemplativa.html">Vida Contemplativa</a></li>
                            <li class="dropdown-item"><a href="biografia.html">Nuestra Fundadora</a></li>
                            <li class="dropdown-item"><a href="sus-escritos.html">Sus Escritos</a></li>
                            <li class="dropdown-item"><a href="novena.html">Novena</a></li>
                        </ul>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="oracion-y-alabanza.html" class="nav-link">Espiritualidad <span class="arrow">&#9662;</span></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item"><a href="oracion-y-alabanza.html">Oración y Alabanza</a></li>
                            <li class="dropdown-item"><a href="silencio.html">Sagrado Silencio</a></li>
                            <li class="dropdown-item"><a href="adoracion-eucaristica.html">Adoración Eucarística</a></li>
                            <li class="dropdown-item"><a href="amor-a-maria.html">Amor a María</a></li>
                        </ul>
                    </div>
                    <div class="nav-item">
                        <a href="que-es-el-rosario-7p.html" class="nav-link highlight">Rosario 7P</a>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="grupo-laudate-mariam.html" class="nav-link">Comunidad <span class="arrow">&#9662;</span></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item"><a href="grupo-laudate-mariam.html">Grupo Laudate Mariam</a></li>
                            <li class="dropdown-item"><a href="contacto.html">Contacto</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        `;

        // Scroll effect
        const headerEl = this.querySelector('#main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerEl.classList.add('scrolled');
            } else {
                headerEl.classList.remove('scrolled');
            }
        });

        this.highlightActiveLink();
    }

    highlightActiveLink() {
        const links = this.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                if (!link.classList.contains('highlight')) {
                    link.classList.add('active');
                }
            }
        });
    }
}

customElements.define('site-header', SiteHeader);
