var photosStip;
var users;
var brSliki;
var htmlPhtoIds = ["firstPicGal", "secondPicGal", "thirdPicGal"];
const nextPicBtn = document.getElementById("nextPicBtn");
const prevPicBtn = document.getElementById("prevPicBtn");
const otvorenaSlika = document.getElementById("openPic");
const smHeader = document.getElementById("socialMedia-header");
const smComments = document.getElementById("socialMedia-comments");
const socialMedia = document.getElementById("socialMedia");
var startIndex = 0;

var tourContent = [
  {
    title: "",
    photo_lokacija: "",
    text: "",
    link: "",
  },
];

loadPhotosStip().then((data) => {
  photosStip = data;
  brSliki = photosStip.length;
  console.log(data);
  initVar();
  setupEventListeners();
});

function initVar() {
  updatePhotos();
}

function updatePhotos() {
  for (let i = 0; i < 3 && i < brSliki; i++) {
    let photoIndex = (startIndex + i) % brSliki;
    document.getElementById(htmlPhtoIds[i]).src = photosStip[photoIndex].src;
  }
}

function changePhotos(nasoka) {
  if (nasoka) {
    startIndex = (startIndex + 3) % brSliki; //7 ->4,0n=
  } else {
    startIndex = (startIndex - 3 + brSliki) % brSliki;
  }
  updatePhotos();
}

function setupEventListeners() {
  prevPicBtn.addEventListener("click", function () {
    changePhotos(0);
  });

  nextPicBtn.addEventListener("click", function () {
    changePhotos(1);
    console.log("desno oj be");
  });

  document.querySelectorAll(".gallery-pic").forEach(function (element) {
    element.addEventListener("click", function () {
      openPhoto(this.id);
    });
  });

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.className = "btn-close-photo";
  closeBtn.style.display = "none";
  closeBtn.addEventListener("click", closePhoto);
  otvorenaSlika.parentElement.appendChild(closeBtn);
}

function updateComments(photoIndex) {
  smComments.innerHTML = "";
  photosStip[photoIndex].comentari.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment-item";
    commentDiv.innerHTML = `
        <div class="comment-by">By: ${comment.by || "Anonymous"}</div>
        <div class="comment-content">${comment.sodrzina}</div>
    `;
    smComments.appendChild(commentDiv);
  });
}

function openPhoto(id) {
  const closeBtn = document.querySelector(".btn-close-photo");
  const likesDiv = document.getElementById("socialMedia-likes");
  const commentsDiv = document.getElementById("socialMedia-comments");

  let photoIndex = -1;
  for (let i = 0; i < 3; i++) {
    if (id == htmlPhtoIds[i]) {
      photoIndex = (startIndex + i) % brSliki;
      break;
    }
  }

  if (photoIndex === -1) return;

  otvorenaSlika.src = photosStip[photoIndex].src;
  otvorenaSlika.style.display = "block";
  closeBtn.style.display = "block";

  socialMedia.style.display = "block";

  smHeader.querySelector("#socialMedia-title").textContent =
    photosStip[photoIndex].lokacija;

  likesDiv.innerHTML = `
    <div class="text-center">
      <button id="likeBtn" class="btn btn-outline-success btn-sm me-2">
        👍 <span id="likeCount">${photosStip[photoIndex].brLikes}</span>
      </button>
      <button id="dislikeBtn" class="btn btn-outline-danger btn-sm">
        👎 <span id="dislikeCount">${photosStip[photoIndex].brDislikes}</span>
      </button>
    </div>
  `;

  updateComments(photoIndex);

  const commentInputDiv = document.createElement("div");
  commentInputDiv.className = "input-group mt-3";
  commentInputDiv.innerHTML = `
    <input type="text" id="newCommentInput" class="form-control" placeholder="Add a comment..." />
    <button class="btn btn-primary" id="addCommentBtn">Comment</button>
  `;
  smComments.appendChild(commentInputDiv);

  if (!photosStip[photoIndex].userReaction) {
    photosStip[photoIndex].userReaction = null;
  }

  const updateButtonStates = () => {
    const likeBtn = document.getElementById("likeBtn");
    const dislikeBtn = document.getElementById("dislikeBtn");

    if (photosStip[photoIndex].userReaction === "like") {
      likeBtn.classList.add("active");
      likeBtn.classList.remove("btn-outline-success");
      likeBtn.classList.add("btn-success");
      dislikeBtn.classList.remove("active", "btn-danger");
      dislikeBtn.classList.add("btn-outline-danger");
    } else if (photosStip[photoIndex].userReaction === "dislike") {
      dislikeBtn.classList.add("active");
      dislikeBtn.classList.remove("btn-outline-danger");
      dislikeBtn.classList.add("btn-danger");
      likeBtn.classList.remove("active", "btn-success");
      likeBtn.classList.add("btn-outline-success");
    } else {
      likeBtn.classList.remove("active", "btn-success");
      likeBtn.classList.add("btn-outline-success");
      dislikeBtn.classList.remove("active", "btn-danger");
      dislikeBtn.classList.add("btn-outline-danger");
    }
  };

  updateButtonStates();

  document.getElementById("likeBtn").addEventListener("click", () => {
    if (photosStip[photoIndex].userReaction === "like") {
      photosStip[photoIndex].brLikes--;
      photosStip[photoIndex].userReaction = null;
    } else if (photosStip[photoIndex].userReaction === "dislike") {
      photosStip[photoIndex].brDislikes--;
      photosStip[photoIndex].brLikes++;
      photosStip[photoIndex].userReaction = "like";
    } else {
      photosStip[photoIndex].brLikes++;
      photosStip[photoIndex].userReaction = "like";
    }
    document.getElementById("likeCount").textContent =
      photosStip[photoIndex].brLikes;
    document.getElementById("dislikeCount").textContent =
      photosStip[photoIndex].brDislikes;
    updateButtonStates();
  });

  document.getElementById("dislikeBtn").addEventListener("click", () => {
    if (photosStip[photoIndex].userReaction === "dislike") {
      photosStip[photoIndex].brDislikes--;
      photosStip[photoIndex].userReaction = null;
    } else if (photosStip[photoIndex].userReaction === "like") {
      photosStip[photoIndex].brLikes--;
      photosStip[photoIndex].brDislikes++;
      photosStip[photoIndex].userReaction = "dislike";
    } else {
      photosStip[photoIndex].brDislikes++;
      photosStip[photoIndex].userReaction = "dislike";
    }
    document.getElementById("likeCount").textContent =
      photosStip[photoIndex].brLikes;
    document.getElementById("dislikeCount").textContent =
      photosStip[photoIndex].brDislikes;
    updateButtonStates();
  });

  const handleAddComment = () => {
    const input = document.getElementById("newCommentInput");
    const newComment = input.value.trim();
    if (newComment) {
      photosStip[photoIndex].comentari.push({
        by: "Current User",
        sodrzina: newComment,
      });

      input.value = "";

      const commentInputDiv = document.querySelector(
        "#socialMedia-comments .input-group"
      );
      updateComments(photoIndex);
      smComments.appendChild(commentInputDiv);
    }
  };

  document
    .getElementById("addCommentBtn")
    .addEventListener("click", handleAddComment);

  document
    .getElementById("newCommentInput")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleAddComment();
      }
    });
}

function closePhoto() {
  const closeBtn = document.querySelector(".btn-close-photo");
  otvorenaSlika.src = "";
  otvorenaSlika.style.display = "none";
  closeBtn.style.display = "none";
  socialMedia.style.display = "none";
}
async function loadPhotosStip() {
  const response = await fetch("Data/photos-stip.json");
  return await response.json();
}

async function loadTourContentStip() {
  const response = await fetch("Data/tourContent-stip.json");
  return await response.json();
}

async function loadUsers() {
  const response = await fetch("Data/users.json");
  return await response.json();
}
