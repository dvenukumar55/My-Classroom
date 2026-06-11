
console.log("MyClass Loaded");

const role = localStorage.getItem("role");

// LOGOUT

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

  logoutBtn.addEventListener("click",()=>{

    localStorage.clear();

    window.location.href =
    "login.html";

  });

}


// HIDE FACULTY CONTROLS

if(role === "student"){

  document.getElementById("postSection")
  ?.style.setProperty("display","none");

  document.getElementById("fileBtn")
  ?.style.setProperty("display","none");

}


// ANNOUNCEMENT TOGGLE

const postBtn =
document.getElementById("postBtn");

const postForm =
document.getElementById("postForm");

if(postBtn && postForm){

  postBtn.addEventListener("click",()=>{

    postForm.style.display =
    postForm.style.display === "block"
    ? "none"
    : "block";

  });

}


// FILE TOGGLE

const fileBtn =
document.getElementById("fileBtn");

const fileForm =
document.getElementById("fileForm");

if(fileBtn && fileForm){

  fileBtn.addEventListener("click",()=>{

    fileForm.style.display =
    fileForm.style.display === "block"
    ? "none"
    : "block";

  });

}


// ADD ANNOUNCEMENT CARD

const submitPost =
document.getElementById("submitPost");

if(submitPost){

submitPost.addEventListener(
"click",

async()=>{

const subject =
document.getElementById("subject").value;

const description =
document.getElementById("description").value;

const token =
localStorage.getItem("token");

const res =
await fetch(
"http://localhost:5000/api/announcements",
{
method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:token
},

body:JSON.stringify({
subject,
description
})
}
);

const data =
await res.json();

alert("Announcement Added");

location.reload();

});

}

// ADD FILE CARD
const uploadFileBtn =
document.getElementById("uploadFileBtn");

if(uploadFileBtn){

  uploadFileBtn.addEventListener(
    "click",
    async ()=>{

      const subject =
      document.getElementById("fileSubject").value;

      const file =
      document.getElementById("fileUpload").files[0];

      const formData =
      new FormData();

      formData.append(
        "subject",
        subject
      );

      formData.append(
        "file",
        file
      );

      const res =
      await fetch(
        "http://localhost:5000/api/files",
        {
          method:"POST",

          headers:{
            Authorization:
            localStorage.getItem("token")
          },

          body:formData
        }
      );

      if(res.ok){

        alert("File Uploaded");

        loadFiles(); // reload cards

      }

    }
  );

}

//delete announcement
async function deleteAnnouncement(id){

  const confirmDelete =
  confirm(
    "Delete Announcement?"
  );

  if(!confirmDelete)
  return;

  const res =
  await fetch(

    `http://localhost:5000/api/announcements/${id}`,

    {
      method:"DELETE",

      headers:{
        Authorization:
        localStorage.getItem(
          "token"
        )
      }
    }

  );

  const data =
  await res.json();

  alert(data.msg);

  location.reload();

}
//loading announcements
async function loadAnnouncements(){
 
const res =
await fetch(
"http://localhost:5000/api/announcements"
);

const data =await res.json();
console.log(data);

const list =
document.getElementById(
"announcementList"
);

if(!list) return;
    //empty state
      if(data.length === 0){

    list.innerHTML =
    '<p class="empty">📢 No announcements available</p>';

    return;

  }
console.log("List:", list);
list.innerHTML = "";

data.forEach(item=>{

const card =
document.createElement("div");

card.className = "card";

card.innerHTML = `
  <h3>${item.subject}</h3>

  <p>${item.description}</p>

  <small>
    ${new Date(item.createdAt).toDateString()}
  </small>

  ${
    role === "faculty"
    ?
    `
    <br><br>

    <button
      class="deleteBtn"
      onclick="deleteAnnouncement('${item._id}')">

     🗑️ Delete

    </button>
    `
    :
    ""
  }
`;

list.appendChild(card);

});

}

loadAnnouncements();

//loading files

async function loadFiles(){


  const res =
  await fetch(
    "http://localhost:5000/api/files"
  );

  const data =
  await res.json();

  console.log(data);

  const filesList =
  document.getElementById(
    "filesList"
  );
  //empty state
  
   if(data.length === 0){

    filesList.innerHTML =
    '<p class="empty">📂 No files uploaded yet</p>';

    return;

  }
  filesList.innerHTML = "";

  data.forEach(file=>{

    const card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <h3>
        📄 ${file.subject}
      </h3>

      <a
      href="http://localhost:5000/${file.filepath}"
      target="_blank">

      Open File

      </a>
      ${
    role === "faculty"
    ?
    `<button
      class="deleteBtn"
      onclick="deleteFile('${file._id}')">

      🗑️ Delete

    </button>`
    :
    ""
  }
    `;

    filesList.appendChild(card);

  });

}

loadFiles();

//delete file
async function deleteFile(id){

  const confirmDelete =
  confirm("Delete File?");

  if(!confirmDelete){
    return;
  }

  try{

    const res =
    await fetch(

      `http://localhost:5000/api/files/${id}`,

      {
        method:"DELETE",

        headers:{
          Authorization:
          localStorage.getItem("token")
        }
      }

    );

    const data =
    await res.json();

    alert(data.msg);

    loadFiles();

  }

  catch(err){

    console.log(err);

  }

}

//delete announcement
async function deleteAnnouncement(id){

  const confirmDelete =
  confirm("Delete Announcement?");

  if(!confirmDelete){
    return;
  }

  const res =
  await fetch(

    `http://localhost:5000/api/announcements/${id}`,

    {
      method:"DELETE",

      headers:{
        Authorization:
        localStorage.getItem("token")
      }
    }

  );

  const data =
  await res.json();

  alert(data.msg);

  loadAnnouncements();

}

