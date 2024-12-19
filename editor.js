document.addEventListener("DOMContentLoaded", () => {
  const EDITOR = document.getElementById("editor");
  const pageHeight = 1545;

  function paginateContent() {
    const pages = Math.ceil(EDITOR.scrollHeight / pageHeight);
    const container = document.getElementById("editorcontainer");
    container.querySelectorAll(".page-label").forEach(label => label.remove());
    for (let i = 1; i <= pages; i++) {
      const label = document.createElement("div");
      label.className = "page-label inter-regular";
      label.innerText = `Page ${i}`;
      label.style.position = "absolute";
      label.style.top = `${(i - 1) * pageHeight}px`;
      const padding = document.createElement("div");
      padding.style.height = "91px";
      EDITOR.appendChild(padding);
      container.appendChild(label);
    }
  }

  function loadCurrentNovel() {
    const novelData = localStorage.getItem("currentNovel");
    if (novelData) {
      const novel = JSON.parse(novelData);
      if (novel) {
        EDITOR.innerHTML = novel.content || ""; 
        document.getElementById("novel-title").innerHTML = novel.title || "Untitled Novel";
      }
    }
  }

  function saveDraft() {
    const currentNovelData = localStorage.getItem("currentNovel");
    if (currentNovelData) {
      const currentNovel = JSON.parse(currentNovelData);
      
      currentNovel.content = EDITOR.innerHTML;

      const titleElement = document.getElementById("novel-title");
      if (titleElement) {
        currentNovel.title = titleElement.innerHTML;
      }

      localStorage.setItem("currentNovel", JSON.stringify(currentNovel));

      const savedNovels = JSON.parse(localStorage.getItem("novels")) || [];
      const updatedNovels = savedNovels.map(novel => 
        novel.title === currentNovel.title ? currentNovel : novel
      );

      localStorage.setItem("novels", JSON.stringify(updatedNovels));

      alert("Novel saved successfully!");
    }
  }

  
  let savedSelection = null;

  function saveSelection() {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
          savedSelection = selection.getRangeAt(0);
      }
  }
  
  function applyFormatting(formatType) {
      // Restore the saved selection if it exists
      if (savedSelection) {
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(savedSelection);
      }
  
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const selectedText = range.toString();
          
          if (selectedText) {
              let formattedContent;
              switch(formatType) {
                  case 'bold':
                      formattedContent = `<strong>${selectedText}</strong>`;
                      break;
                  case 'italic':
                      formattedContent = `<em>${selectedText}</em>`;
                      break;
                  case 'center':
                      formattedContent = `<div style="text-align: center;">${selectedText}</div>`;
                      break;
              }
  
              const span = document.createElement('span');
              span.innerHTML = formattedContent;
              
              range.deleteContents();
              range.insertNode(span);
              
              selection.removeAllRanges();
              const newRange = document.createRange();
              newRange.selectNodeContents(span);
              selection.addRange(newRange);
          }
      }
  }
  
 
  document.getElementById('boldBtn').addEventListener('mousedown', function(e) {
    e.preventDefault(); 
    saveSelection();
    applyFormatting('bold');
});

document.getElementById('italicBtn').addEventListener('mousedown', function(e) {
    e.preventDefault();
    saveSelection();
    applyFormatting('italic');
});

document.getElementById('centerBtn').addEventListener('mousedown', function(e) {
    e.preventDefault(); 
    saveSelection();
    applyFormatting('center');
});

  function download() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [1000, 1545 + 45.5] });
    pdf.html(EDITOR, {
      callback: doc => doc.save("novel.pdf"),
      x: 68,
      y: 45.5,
      width: 1000,
      html2canvas: { scale: 1, useCORS: true },
    });
  }

 
  document.getElementById("saveBtn").addEventListener("click", saveDraft);
  document.getElementById("downloadBtn").addEventListener("click", download);

  loadCurrentNovel(); 
  paginateContent();  
  EDITOR.addEventListener("input", paginateContent); 
});