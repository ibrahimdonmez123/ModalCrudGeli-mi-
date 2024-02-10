document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const addStudentBtn = document.getElementById("addStudentBtn");
    const closeBtn = document.querySelector(".close");
    const studentForm = document.getElementById("studentForm");
    const confirmMsg = document.getElementById("confirmMsg");
    const schoolDropdown = document.getElementById("school");
    const studentList = document.getElementById("studentList");
    let students = []; // Öğrenci verileri için boş bir dizi
  
    // Örnek veri: Öğrenciler ve okullar
    const schools = ["Okul 1", "Okul 2", "Okul 3"];
  
    // Dropdown listesini doldur
    schools.forEach(school => {
      const option = document.createElement("option");
      option.textContent = school;
      option.value = school;
      schoolDropdown.appendChild(option);
    });
  
    // Öğrenci ekleme modalını aç
    addStudentBtn.addEventListener("click", function() {
      modal.style.display = "block";
      document.getElementById("modalTitle").innerText = "Öğrenci Ekle";
      studentForm.reset();
      confirmMsg.innerText = "";
    });
  
    // Modalı kapat
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    // Modal dışına tıklanınca kapat
    window.addEventListener("click", function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  
    // Form submit edildiğinde
    studentForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const school = schoolDropdown.value;
      if (name && school) {
        const student = { name, school };
        students.push(student);
        renderStudentList();
        confirmMsg.innerText = "Öğrenci başarıyla eklendi.";
        setTimeout(() => {
          modal.style.display = "none";
        }, 2000);
      } else {
        confirmMsg.innerText = "Lütfen isim ve okul seçimi yapınız.";
      }
    });
  
    // Öğrenci listesini render et
    function renderStudentList() {
      studentList.innerHTML = "";
      students.forEach((student, index) => {
        const listItem = document.createElement("div");
        listItem.classList.add("student-item");
        listItem.innerHTML = `
          <span>${student.name}</span>
          <span>${student.school}</span>
          <button class="editBtn" data-index="${index}">Düzenle</button>
          <button class="deleteBtn" data-index="${index}">Sil</button>
        `;
        studentList.appendChild(listItem);
      });
      attachEventListeners();
    }
  
    // Düzenle ve Sil butonlarına event listener ekle
    function attachEventListeners() {
      const editButtons = document.querySelectorAll(".editBtn");
      const deleteButtons = document.querySelectorAll(".deleteBtn");
  
      editButtons.forEach(button => {
        button.addEventListener("click", function(event) {
          const index = event.target.dataset.index;
          const student = students[index];
          document.getElementById("modalTitle").innerText = "Öğrenci Güncelle";
          document.getElementById("name").value = student.name;
          schoolDropdown.value = student.school;
          modal.style.display = "block";
  
          // Güncelle butonunu ekle
          const updateBtn = document.createElement("button");
          updateBtn.id = "updateBtn";
          updateBtn.textContent = "Güncelle";
          studentForm.appendChild(updateBtn);
  
          // Güncelle butonuna click eventi ekle
          updateBtn.addEventListener("click", function() {
            students[index] = {
              name: document.getElementById("name").value,
              school: schoolDropdown.value
            };
            renderStudentList();
            modal.style.display = "none";
            studentForm.removeChild(updateBtn);
            confirmMsg.innerText = "Öğrenci başarıyla güncellendi.";
          });
        });
      });
  
      deleteButtons.forEach(button => {
        button.addEventListener("click", function(event) {
          const index = event.target.dataset.index;
          const isConfirmed = confirm("Emin misiniz?");
          if (isConfirmed) {
            students.splice(index, 1);
            renderStudentList();
            confirmMsg.innerText = "Öğrenci başarıyla silindi.";
          }
        });
      });
    }
  });
  