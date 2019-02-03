$(document).ready(function(){
  console.log("page is ready"); 

  $.ajax({
    url: "/api/typedNotes",
    method: "GET",
  }).then(reminder => {
    console.log(reminder);

    for (var i = 0; i < reminder.length; i++) {
      const noteCol = $(`<div class="col-3">`);
      const stickyNote = $(`<div class="card my-2 bg-warning" style="width: 18rem;">`);
      const stickyNoteBody = $(`<div class="card-body">`);
      const stickyNoteTitle = $(`<h5 class="card-title">`);
      const stickyNoteText = $(`<p class="card-text">`);

      $("#stickyNotes").append(noteCol);
      noteCol.append(stickyNote);
      stickyNote.append(stickyNoteBody);

      stickyNoteBody.append(
        stickyNoteTitle,
        stickyNoteText
      );
  
      $(stickyNoteTitle).html(`${reminder[i].title} <span class="float-right delete" id =${i}>🗑️</span>`);
      $(stickyNoteText).text(reminder[i].note_text);

     $(".delete").on("click", function() {
       //delete from database
      $(this).closest(".col-3").remove();
      
     })

    } //end of loop bracket

  })// end of GET ajax


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
    $("#inputNoteTitle").val("");
    $("#noteTextArea").val("");

    });
  


  }); //end on on click















}); //end script