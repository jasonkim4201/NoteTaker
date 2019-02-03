$(document).ready(function(){
  console.log("page is ready"); 

  $("#noteSubmit").on("click", function(event) {
    event.preventDefault();
    
    const noteTaken = {
      title:$("#inputNoteTitle").val().trim(),
      note_text:$("#noteTextArea").val().trim()
    };
    console.log(noteTaken);
    //on click make ajax call to post in datatbase

    $.ajax({
      url: "/api/typedNotes",
      method: "POST",
      data: noteTaken
    }).then(response => {
      console.log(response);
    alert("Note added. This is a test");
    $("#inputNoteTitle").val("");
    $("#noteTextArea").val("");
    });
  
    
    $.ajax({
      url: "/api/typedNotes",
      method: "GET",
      data: noteTaken
    }).then(reminder => {
      console.log(reminder);
    })
  });















});