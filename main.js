const loaderTextWrapper = document.querySelector(".loader-text");
const loaderText = ["C", "O", "G", "N", "I", "V", "A"];
let delay = 0;

if (loaderTextWrapper != undefined) {
  for (let i = 0; i < loaderText.length; i++) {
    delay += 200;
    const span = document.createElement("span");
    span.textContent = loaderText[i];
    span.style.animationDelay = delay + "ms";
    loaderTextWrapper.append(span);
  }

  setTimeout(() => {
    const loaderScreen = document.querySelector(".loader-screen");
    loaderScreen.remove();
  }, 3200);
}

const acara = document.querySelector("#acara-section");
const pembicara = document.querySelector("#pembicara-section");
const jadwal = document.querySelector("#jadwal-section");
const tiket = document.querySelector("#tiket-section");

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((el, i) => {
  el.addEventListener("click", function (e) {
    const pageSection = document.querySelector(`#${e.target.dataset.link}`);
    const pageY = pageSection.offsetTop;
    document.documentElement.scrollTop = pageY - 60;
  });
});

const btnJelajahi = document.querySelector(".btn-jelajahi");
if (btnJelajahi != undefined) {
  btnJelajahi.addEventListener("click", function () {
    document.documentElement.scrollTop = acara.offsetTop - 60;
  });
}

const beliTiket = document.querySelector(".btn-beli-tiket");
if (beliTiket != undefined) {
  beliTiket.addEventListener("click", function () {
    document.documentElement.scrollTop = tiket.offsetTop - 60;
  });
}

const btnClose = document.querySelector(".btn-close-sidebar");
const btnHamburger = document.querySelector(".hamburger-container");
if (btnClose != undefined && btnHamburger != undefined) {
  const sidebar = document.querySelector(".nav-item-wrapper-mobile");
  btnClose.addEventListener("click", function () {
    sidebar.style.left = `-100%`;
  });

  btnHamburger.addEventListener("click", function () {
    sidebar.style.left = 0;
  });
}

const scroolTop = document.querySelector(".scrool-top");
if (scroolTop != undefined) {
  scroolTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
  });
}

window.addEventListener("scroll", function () {
  if (this.document.documentElement.scrollTop >= 500) {
    scroolTop.style.display = "flex";
  } else {
    scroolTop.style.display = "none";
  }

  window_scroolY = Math.floor(window.scrollY);
  const acaraY = acara.offsetTop - 60;
  const pembicaraY = pembicara.offsetTop - 60;
  const jadwalY = jadwal.offsetTop - 60;
  const tiketY = tiket.offsetTop - 60;
  if (
    window_scroolY >= acaraY &&
    window_scroolY < pembicaraY
  ) {
    document.querySelector(".link-acara").classList.add("active");
  } else {
    document.querySelector(".link-acara").classList.remove("active");
  }

  if (
    window_scroolY >= pembicaraY &&
    window_scroolY < jadwalY
  ) {
    document.querySelector(".link-pembicara").classList.add("active");
  } else {
    document.querySelector(".link-pembicara").classList.remove("active");
  }

  if (
    window_scroolY >= jadwalY &&
    window_scroolY < tiketY
  ) {
    document.querySelector(".link-jadwal").classList.add("active");
  } else {
    document.querySelector(".link-jadwal").classList.remove("active");
  }

  if (
    window_scroolY >= tiketY
  ) {
    document.querySelector(".link-tiket").classList.add("active");
  } else {
    document.querySelector(".link-tiket").classList.remove("active");
  }
});

fetch("http://127.0.0.1:5500/data_cuaca.json")
  .then((response) => response.json())
  .then((response) => {
    let html = ``;
    for (let i = 0; i < response.length; i++) {
      if (
        response[i].lokasi == "Bondowoso" ||
        response[i].lokasi == "Jakarta" ||
        response[i].lokasi == "Surabaya"
      ) {
        html += `
      <div class="cuaca-card">
        <div class="city">${response[i].lokasi}</div>
        <div class="date">${response[i].tanggal} ${response[i].waktu}</div>
        <div class="detail">
          <p class="suhu">${response[i].suhu}</p>
          <p class="lembab">${response[i].kelembaban}</p>
          <p class="cuaca">${response[i].cuaca}</p>
        </div>
        <p class="ket">${response[i].keterangan}</p>
      </div>
      `;
      }
    }

    const cardCuacaWrapper = document.querySelector(".cuaca-wrapper");
    cardCuacaWrapper.innerHTML = html;
  });
