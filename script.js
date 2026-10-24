(function () {
  "use strict";

  var $ = function (seletor) { return document.querySelector(seletor); };

  /* ---------- Ano no rodapé ---------- */
  var ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Menu no celular ---------- */
  var menuBtn = $(".menu-btn");
  var menu = $("#menu");

  function fecharMenu() {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", String(aberto));
  });

  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") fecharMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharMenu();
  });

  /* ---------- Link ativo conforme a rolagem ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu a"));
  var secoes = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("ativo", a.getAttribute("href") === "#" + entrada.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    secoes.forEach(function (s) { observador.observe(s); });
  }

  /* ---------- Copiar e-mail ---------- */
  var btnCopiar = $("#btn-copiar");
  var aviso = $("#aviso-copia");
  var email = "lucianopeixoto2007@gmail.com";
  var timerAviso;

  function avisar(texto) {
    aviso.textContent = texto;
    clearTimeout(timerAviso);
    timerAviso = setTimeout(function () { aviso.textContent = ""; }, 3000);
  }

  btnCopiar.addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { avisar("E-mail copiado."); },
        function () { avisar("Não consegui copiar. O e-mail é " + email); }
      );
    } else {
      avisar("Não consegui copiar. O e-mail é " + email);
    }
  });
})();
