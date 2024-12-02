const createNewNovelButton = document.getElementById("createNewNovel");
const novelCreationPrompt = document.getElementById("novelCreationPrompt");
const titleInput = document.getElementById("titleInput");
const confirmButton = document.getElementById("confirmNovelCreation");
const cancelButton = document.getElementById("cancelNovelCreation");
const overlay = document.getElementById("overlay");




/*createNewNovelButton.addEventListener("click", ()=>{
    novelCreationPrompt.style.display = "block";
    overlay.style.display = "block";
    if(title){
        const newNovel = new Novel(title);
        saveNovel(newNovel);
        alert("Novel "  + newNovel.title + " is created!");
        updateNovelList();
    }

    



});
confirmButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const message = document.createElement("p1");
    if (title) {
      
        const newNovel = new Novel(title); 
    saveNovel(newNovel); 
        message.textContent = "Sucessfully Created!";
       
        novelCreationPrompt.addChild(message);
        closePrompt();
        updateNovelList(); 
    } else {
        alert("Please enter a title!");
    }
});

function closePrompt() {
    novelCreationPrompt.style.display = "none";
    overlay.style.display = "none";
    titleInput.value = ""; 
}

cancelButton.addEventListener("click", closePrompt);
overlay.addEventListener("click", closePrompt);





//----------------------------------------------------




function saveNovel(novel){
    let novels = getNovels();
    novels.push(novel);
    localStorage.setItem("novels", JSON.stringify(novels));
}

function getNovels(){
    let novels  = JSON.parse(localStorage.getItem("novels")) || []
    return novels;
}

function updateNovelList() {
    const novelListContainer = document.getElementById("novelList");
    novelListContainer.innerHTML = ""; // Clear the list

    const novels = getNovels();
    novels.forEach((novel, index) => {
        const novelItem = document.createElement("div");
        novelItem.textContent = novel.title;
        novelItem.className = "novel-item";

        // Add a button to open the novel
        const openButton = document.createElement("button");
        openButton.textContent = "Open";
        openButton.addEventListener("click", () => openNovel(index));

        novelItem.appendChild(openButton);
        novelListContainer.appendChild(novelItem);
    });
}

function openNovel(index){
    const novels = getNovels();
    const novel = novels[index];

   
    localStorage.setItem("currentNovel", JSON.stringify(novel));
    window.location.href = "editor.html";
    
}



*/

class Novel{
    constructor(title){
        this.title = title;
        this.coverSource = "Assets/Covers/cover2.jpg";
    }



}

function createNovelButton(novel,location){
    
    let th = document.createElement("th");
    let novelDiv = document.createElement("div");
    let coverImage = document.createElement("img");
    let mainDiv = document.getElementById(location).getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];

    
   
    coverImage.classList.add('novelButtonCover');
    novelDiv.classList.add('novelButton');
    coverImage.src = novel.coverSource;
    novelDiv.appendChild(coverImage);
  
    let row = mainDiv.getElementsByTagName("tr")[0];
    row.appendChild(th);
    th.appendChild(novelDiv);

    

}

createNovelButton(new Novel("Slimen"),"recentProjects");
createNovelButton(new Novel("Slimen"),"allProjects");
createNovelButton(new Novel("Slimen"),"allProjects");
createNovelButton(new Novel("Slimen"),"allProjects");







