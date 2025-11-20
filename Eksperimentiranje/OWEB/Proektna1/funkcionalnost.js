var Logiran = false;
var whosLoggedIn = "";
//LOADIRAJ GI REVIEWS OD DATATA
var reviews = [
  {
    grad: "website",
    username: "admin",
    izreka: "Abe prekrasno so da ti raspravam",
    rating: "⭐️⭐️⭐️⭐️⭐️",
  },
];

var users = [{ username: "admin", password: "admin" }];
var gradoviNames = ["Stip", "Gevgelija", "Skopje"];
var gradSlikiLokacii = [
  [
    "Galerija/Stip/stip_1.jpg",
    "Galerija/Stip/stip_2.jpg",
    "Galerija/Stip/stip_3.jpg",
  ],
  [
    "Galerija/Gevgelija/gev_1.jpg",
    "Galerija/Gevgelija/gev_2.jpg",
    "Galerija/Gevgelija/gev_3.jpg",
  ],
  [
    "Galerija/Skopje/sk_1.png",
    "Galerija/Skopje/sk_2.jpg",
    "Galerija/Skopje/sk_3.jpg",
  ],
];
var currGradoviSlikiIndeksi = new Array(gradoviNames.length).fill(0);
slidingGalery = document.getElementById("sliderCityGalery");
prevslideBtn = document.getElementById("prevslideBtn");
nextslideBtn = document.getElementById("nextslideBtn");
visitCityBtn = document.getElementById("visit-city-btn");
cityIntroName = document.getElementById("city-intro-name");
logOrRvwBtn = document.getElementById("loginBtn");
sgnUpOrLogOut = document.getElementById("signUpBtn");

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("continueToLin")
    .addEventListener("click", function () {
      console.log("ja go ja");
      const username = document.getElementById("usernameInputSup").value.trim();
      const password = document.getElementById("passwordInputSup").value.trim();
      handleSignUp(username, password);
    });
});

function handleSignUp(usernamee, passwordd) {
  if (users.some((user) => user.username === usernamee)) {
    alert("Username already taken!");
    return;
  }
  users.push({ username: usernamee, password: passwordd });
  alert("Sign up successful!", users);
  const signUpModal = bootstrap.Modal.getInstance(
    document.getElementById("signUpModal")
  );

  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  signUpModal.hide();
  loginModal.show();
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("continueToWebsite")
    .addEventListener("click", function () {
      const username = document.getElementById("usernameInputLin").value.trim();
      const password = document.getElementById("passwordInputLin").value.trim();

      handleLogin(username, password);
    });
});

function handleLogin(usernamee, passwordd) {
  const user = users.find((user) => user.username === usernamee);
  if (user) {
    if (user.password === passwordd) {
      whosLoggedIn = usernamee;
      Logiran = true;
      alert("Logged in!");
      azurirajLogiran();
      const loginModal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      loginModal.hide();
    } else {
      alert("Netocen pasvord");
      return;
    }
  } else {
    alert("nepostoe usero");
    return;
  }
}
function logOFF() {
  Logiran = false;
  azurirajLogiran();
}

function azurirajLogiran() {
  if (Logiran) {
    logOrRvwBtn.textContent = "Leave a Review";
    logOrRvwBtn.setAttribute("data-bs-target", "#reviewModal");
    sgnUpOrLogOut.textContent = "Log Out";
    sgnUpOrLogOut.removeAttribute("data-bs-toggle");
    sgnUpOrLogOut.removeAttribute("data-bs-target");
    sgnUpOrLogOut.onclick = logOFF;
  } else {
    logOrRvwBtn.textContent = "Login";
    logOrRvwBtn.setAttribute("data-bs-target", "#loginModal");
    sgnUpOrLogOut.textContent = "Sign Up";
    sgnUpOrLogOut.setAttribute("data-bs-target", "#signUpModal");
    sgnUpOrLogOut.setAttribute("data-bs-toggle", "modal");
    sgnUpOrLogOut.onclick = null;
  }
}
//FIX THIS!!!
function handleReview() {}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#reviewModal .btn-primary")
    .addEventListener("click", handleReview);
});

var currGrad = 0;
console.log(currGrad);
var rotiraj_sliki = true;

prevslideBtn.addEventListener("click", () => {
  console.log("levo");
  rotiranjeSliki(0);
});

nextslideBtn.addEventListener("click", () => {
  rotiranjeSliki(1);
});

function updateSlideshow() {
  slidingGalery.style.backgroundImage = `url('${
    gradSlikiLokacii[currGrad][currGradoviSlikiIndeksi[currGrad]]
  }')`;
  cityIntroName.textContent = `${gradoviNames[currGrad]}`;
  visitCityBtn.textContent = `Explore ${gradoviNames[currGrad]}`;
  if (currGrad === 0) {
    visitCityBtn.href = "cityStip.html";
  } else {
    visitCityBtn.href = "Catfish.html";
  }
}

function updateCurrGrad(nasoka) {
  if (nasoka) {
    if (currGrad == gradoviNames.length - 1) {
      currGrad = 0;
    } else {
      currGrad++;
    }
  } else {
    if (currGrad == 0) {
      currGrad = gradoviNames.length - 1;
    } else {
      currGrad--;
    }
  }
}

var autoRotateInterval = setInterval(() => {
  if (rotiraj_sliki) {
    rotiranjeSliki(1);
  }
}, 5000);

function rotiranjeSliki(nasoka) {
  if (nasoka) {
    updateCurrGrad(nasoka);
    if (currGrad === 0) {
      for (let i = 0; i < gradoviNames.length; i++) {
        if (currGradoviSlikiIndeksi[i] < gradSlikiLokacii[i].length - 1) {
          currGradoviSlikiIndeksi[i]++;
        } else {
          currGradoviSlikiIndeksi[i] = 0;
        }
      }
    }
  } else {
    updateCurrGrad(nasoka);
    if (currGrad === gradoviNames.length - 1) {
      for (let i = 0; i < gradoviNames.length; i++) {
        if (currGradoviSlikiIndeksi[i] > 0) {
          currGradoviSlikiIndeksi[i]--;
        } else {
          currGradoviSlikiIndeksi[i] = gradSlikiLokacii[i].length - 1;
        }
      }
    }
  }

  updateSlideshow();
}
function checkUser(usr, pasw) {
  var user = users.find((u) => u.username == usr);
  if (user) {
    if (pasw == user.password) {
      return true;
    } else {
      console.log("netocen pasvord");
    }
  } else {
    console.log("ne postoecki akaunt");
  }
}

function createNewAccount(usr, pswd) {
  var user = users.find((u) => u.username == usr);
  if (user) {
    console.log("veke postoe takov akaunt baki");
    return false;
  } else {
    users.push({ username: usr, password: pswd });
    console.log("nov kreiran akaunt");
  }
}

//review submit only u slucaj ako e logiran

const dropdownElement = document.querySelector(".dropdown, .btn-group");

document.querySelectorAll(".dropdown-submenu").forEach(function (element) {
  element.addEventListener("mouseenter", function () {
    this.querySelector(".dropdown-menu").classList.add("show");
  });

  element.addEventListener("mouseleave", function () {
    this.querySelector(".dropdown-menu").classList.remove("show");
  });
});

// document.querySelectorAll(".dropdown-submenu > a").forEach(function (element) {
//   element.addEventListener("click", function (e) {
//     e.stopPropagation();
//     e.preventDefault();
//   });
// });

// document.querySelectorAll(".dropdown-submenu > a").forEach(function (element) {
//   element.addEventListener("click", function (e) {
//     window.location.href = this.getAttribute("href");
//   });
// });

cityBtn = document.getElementById("visit-city-btn");
cityBtn.addEventListener("click", function () {
  if (currGrad) {
    rotiraj_sliki = false;
  }
});
