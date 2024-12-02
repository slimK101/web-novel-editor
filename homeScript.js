const createNewNovelButton = document.getElementById("createNewNovel");
const novelCreationPrompt = document.getElementById("novelCreationPrompt");
const titleInput = document.getElementById("titleInput");
const confirmButton = document.getElementById("confirmNovelCreation");
const cancelButton = document.getElementById("cancelNovelCreation");
const overlay = document.getElementById("overlay");




createNewNovelButton.addEventListener("click", ()=>{
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
        // Create the novel
        const newNovel = new Novel(title); 
        saveNovel(newNovel); 
        //alert(`Novel "${title}" created!`);
        message.textContent = "Sucessfully Created!";
        // Hide the prompt
        novelCreationPrompt.addChild(message);
        closePrompt();
        updateNovelList(); // Update the list of novels on the homepage
    } else {
        alert("Please enter a title!");
    }
});

function closePrompt() {
    novelCreationPrompt.style.display = "none";
    overlay.style.display = "none";
    titleInput.value = ""; // Clear the input field
}

cancelButton.addEventListener("click", closePrompt);
overlay.addEventListener("click", closePrompt);





//----------------------------------------------------
document.getElementById("showNovels").addEventListener("click", ()=>{
   
    updateNovelList();
});



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

    // Redirect to the editor page or load content dynamically
    localStorage.setItem("currentNovel", JSON.stringify(novel));
    window.location.href = "editor.html"; // Example for redirection
    
}




//----------------------------------------------------
class Novel{
    constructor(title){
        this.title = title;
    }



}