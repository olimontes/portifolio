(() => {
    "use strict";

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionToggle = document.querySelector(".motion-toggle");
    const tiltSurfaces = [...document.querySelectorAll("[data-tilt]")];
    let savedMotion = "on";
    let motionEnabled = true;

    try {
        savedMotion = localStorage.getItem("portfolio-motion") || "on";
    } catch {
        // The site also works when browser storage is unavailable.
    }

    const resetTilt = (surface) => {
        surface.classList.remove("is-tilting");
        ["--tilt-x", "--tilt-y", "--pointer-x", "--pointer-y"].forEach((property) => surface.style.removeProperty(property));
    };

    function updateMotion() {
        motionEnabled = !reducedMotion.matches && savedMotion !== "off";
        root.dataset.motion = motionEnabled ? "on" : "off";
        motionToggle.setAttribute("aria-pressed", String(motionEnabled));
        motionToggle.disabled = reducedMotion.matches;
        motionToggle.setAttribute("aria-label", reducedMotion.matches ? "Animações reduzidas pela preferência do sistema" : "Animações");
        motionToggle.querySelector(".motion-label").textContent = motionEnabled ? "Movimento ativo" : "Movimento reduzido";
        motionToggle.title = reducedMotion.matches ? "A preferência de reduzir movimento do seu sistema está ativa." : motionEnabled ? "Pausar animações" : "Ativar animações";
        if (!motionEnabled) {
            tiltSurfaces.forEach(resetTilt);
            document.querySelectorAll(".reveal-ready").forEach((element) => element.classList.add("is-visible"));
        }
    }

    updateMotion();
    motionToggle.hidden = false;
    motionToggle.addEventListener("click", () => {
        savedMotion = motionEnabled ? "off" : "on";
        try {
            localStorage.setItem("portfolio-motion", savedMotion);
        } catch {
            // This preference still applies for the current visit.
        }
        updateMotion();
    });
    reducedMotion.addEventListener("change", updateMotion);
    finePointer.addEventListener("change", () => tiltSurfaces.forEach(resetTilt));

    // Listen on a stable outer box, so the transformed card cannot cause jitter.
    tiltSurfaces.forEach((surface) => {
        const zone = surface.closest(".tilt-zone");
        const strength = Number(surface.dataset.tiltStrength || 7);
        let frame = 0;
        let pointerX = 0;
        let pointerY = 0;

        zone.addEventListener("pointermove", (event) => {
            if (!motionEnabled || !finePointer.matches || event.pointerType === "touch") return;
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                if (!motionEnabled || !finePointer.matches) return;
                const rect = zone.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (pointerX - rect.left) / rect.width));
                const y = Math.max(0, Math.min(1, (pointerY - rect.top) / rect.height));
                surface.classList.add("is-tilting");
                surface.style.setProperty("--tilt-x", `${((.5 - y) * strength).toFixed(2)}deg`);
                surface.style.setProperty("--tilt-y", `${((x - .5) * strength).toFixed(2)}deg`);
                surface.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
                surface.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
            });
        }, { passive: true });

        const leave = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            resetTilt(surface);
        };
        zone.addEventListener("pointerleave", leave);
        zone.addEventListener("pointercancel", leave);
        surface.addEventListener("blur", leave);
    });

    const tabs = [...document.querySelectorAll('.showcase-tabs [role="tab"]')];
    const slides = [...document.querySelectorAll(".showcase-slide")];
    const selectSlide = (selected) => {
        tabs.forEach((tab, index) => {
            const active = index === selected;
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
            slides[index].dataset.position = String((index - selected + slides.length) % slides.length);
            slides[index].setAttribute("aria-hidden", String(!active));
            slides[index].inert = !active;
        });
    };
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => selectSlide(index));
        tab.addEventListener("keydown", (event) => {
            let next;
            if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
            else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = tabs.length - 1;
            else return;
            event.preventDefault();
            selectSlide(next);
            tabs[next].focus();
        });
    });
    document.querySelector(".showcase-controls").hidden = false;

    const filterButtons = [...document.querySelectorAll("[data-filter]")];
    const projects = [...document.querySelectorAll(".project[data-category]")];
    const projectGrid = document.querySelector(".project-grid");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            if (projectGrid.dataset.activeFilter === filter) return;
            projectGrid.dataset.activeFilter = filter;
            filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            let count = 0;
            projects.forEach((project) => {
                const visible = filter === "all" || project.dataset.category === filter;
                project.hidden = !visible;
                project.classList.remove("filter-enter");
                resetTilt(project.querySelector("[data-tilt]"));
                if (visible) {
                    count++;
                    project.classList.add("is-visible");
                    if (motionEnabled) project.classList.add("filter-enter");
                }
            });
            document.querySelector(".project-count").textContent = `${count} ${count === 1 ? "projeto" : "projetos"}`;
        });
    });
    document.querySelector(".project-toolbar").hidden = false;

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: .08, rootMargin: "0px 0px 30px 0px" });

        if (motionEnabled) {
            document.querySelectorAll("[data-reveal]").forEach((element) => {
                if (element.getBoundingClientRect().top < innerHeight) return;
                element.classList.add("reveal-ready");
                revealObserver.observe(element);
            });
        }
    }

    const sections = [...document.querySelectorAll("main > section[id]")];
    const navLinks = [...document.querySelectorAll(".nav-links a")];
    let scrollFrame = 0;
    const updateScroll = () => {
        scrollFrame = 0;
        const available = root.scrollHeight - innerHeight;
        root.style.setProperty("--scroll-progress", available > 0 ? String(Math.max(0, Math.min(1, scrollY / available))) : "0");
        let activeId = "";
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= 180) activeId = section.id;
        });
        navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${activeId}`) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    };
    const scheduleScroll = () => {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);
    updateScroll();

    const copyButton = document.querySelector(".copy-email");
    const copyStatus = document.querySelector("#copy-status");
    if (window.isSecureContext && navigator.clipboard?.writeText) {
        copyButton.hidden = false;
        let copyTimer;
        copyButton.addEventListener("click", async () => {
            clearTimeout(copyTimer);
            try {
                await navigator.clipboard.writeText("fgabrieloliveira1@gmail.com");
                copyButton.textContent = "E-mail copiado ✓";
                copyStatus.textContent = "E-mail copiado para a área de transferência.";
            } catch {
                copyButton.textContent = "Não foi possível copiar";
                copyStatus.textContent = "Copie o endereço exibido ao lado ou use o link para enviar um e-mail.";
            }
            copyTimer = setTimeout(() => {
                copyButton.textContent = "Copiar e-mail ⧉";
            }, 3500);
        });
    }
})();
