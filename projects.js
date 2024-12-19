
class Novel {
  constructor(title, author, genre, content = "") {
    this.id = Date.now(); 
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.coverSrc = `Assets/projects/novelCovers/${this.title}.jpg`;
    this.content = content;
  }

  getHtml() {
    return `    
      <div class="container projectCont novel-button" data-novel-id="${this.id}" style="cursor: pointer;">        
        <p class="inter-bold alt-white" style="position: absolute; margin-top: .5rem; margin-left: .5rem;">${this.title}</p>
        <img src="${this.coverSrc}" class="cover" draggable = false>         
      </div>`;
  }


  updateContent(content) {
    this.content = content;
  }
}

var CLIENT_NOVELS = getSavedNovels();

function addNovelButton(novel) {
  const divContainer = document.getElementById("novelBtnContainer");
  const addBtn = document.getElementById("addBtn");
  const novelBtn = document.createElement("div");
  novelBtn.classList.add("col-2");
  novelBtn.innerHTML = novel.getHtml();
  novelBtn.addEventListener("click", () => openEditor(novel));
  divContainer.insertBefore(novelBtn, addBtn);
}

function openEditor(novel) {
  localStorage.setItem('currentNovel', JSON.stringify(novel));
  window.location.href = "editor.html";
}

function confirmCreation() {
  const titleForm = document.getElementById("titleForm");
  const authorForm = document.getElementById("authorForm");
  const genreForm = document.getElementById("genreForm");

  if (titleForm.value && authorForm.value && genreForm.value) {
    const newNovel = new Novel(
      titleForm.value, 
      authorForm.value, 
      genreForm.value
    );
    CLIENT_NOVELS.push(newNovel);
    saveNovels();
    addNovelButton(newNovel);
    closePrompt();
    titleForm.value = "";
    authorForm.value = "";
    genreForm.value = "";
  }
}

function getSavedNovels() {
  const retrieved = localStorage.getItem('novels');
  const novels = retrieved ? JSON.parse(retrieved) : [];
  return novels.map(n => 
    new Novel(n.title, n.author, n.genre, n.content)
  );
}

function saveNovels() {
  localStorage.setItem('novels', JSON.stringify(CLIENT_NOVELS));
}

function renderNovels(novels) {
  novels.forEach(novel => addNovelButton(novel));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNovels(CLIENT_NOVELS);
});

function promptnewCreation(){
  const prompt = document.getElementById("creationPrompt");
  
  prompt.style.display = "block";
  

}

function closePrompt(){
const prompt = document.getElementById("creationPrompt");
prompt.style.display = "none";
}