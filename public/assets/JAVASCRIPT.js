$(document).ready(function(){
  console.log("page is ready"); 

  $.ajax({
    url: "/api/typedNotes/",
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
      console.log(reminder[i].id);
      
      $(stickyNoteTitle).html(`<div>${reminder[i].title} <span class="float-right delete" id=${reminder[i].id}>🗑️</span></div>`);

      $(stickyNoteTitle).data("data-reminder", reminder[i]);
      $(stickyNoteText).text(reminder[i].note_text);

    } //end of loop bracket

  });// end of GET ajax

//event listener for a click on delete using card title for now
$(document).on("click",".card-title", function(){
    const data = $(this).data("data-reminder");
    console.log(data);
    console.log(`id #: ${data.id}`);
  
    $.ajax({
      url: `/api/typedNotes/${data.id}`,
      method: "DELETE"
    }).then(deletedNote => {
      console.log("note should be deleted.");
    //display the data
    
    console.log(data);

    $(this).closest(".col-3").remove();
      
    });

   });

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

    //my "solution" to showing & deleting the most recent note posted without refreshing. yes, it's essentially the same code copied from above.
    $.ajax({
      url: "/api/typedNotes",
      method: "GET",
    }).then(reminder => {
      console.log(reminder);
           
      for (var i = (reminder.length - 1); i < reminder.length; i++) {
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
    
        $(stickyNoteTitle).html(`<div>${reminder[i].title} <span class="float-right delete" id=${reminder[i].id}>🗑️</span></div>`);
        $(stickyNoteTitle).data("data-reminder", reminder[i]);
        $(stickyNoteText).text(reminder[i].note_text);
      } //end of loop bracket
  

      $(document).on("click",".card-title", function(){
        const data = $(this).data("data-reminder");
        console.log(data);
        console.log(`id #: ${data.id}`);
      
        $.ajax({
          url: `/api/typedNotes/${data.id}`,
          method: "DELETE"
        }).then(deletedNote => {
          console.log("note should be deleted.");
        //display the data
        console.log(data);
    
        $(this).closest(".col-3").remove();
          
        });
    
       });


    });// end of GET ajax
    
  }); //end on on click

}); //end of .ready