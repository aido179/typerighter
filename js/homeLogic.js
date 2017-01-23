var remote = require('electron').remote;
window.$ = window.jQuery = require('jquery');


$(document).ready(function(){
  //debug
  console.log(remote.getGlobal("settings"));


  //set focus to text input
  $('.textInput').focus();
  //load text from local storage if it exists
  loadStoredText();
  $('.textInput').keypress(function(){
    //push written text to the upper box
    var input = $('.textInput').val();
    if(input.length>= 10){
      var lastSpace = input.lastIndexOf(" ");
      appendToStoredText(input.slice(0,lastSpace+1));
      loadStoredText();
    $('.textInput').val(input.slice(lastSpace+1));
    }
  });
  //allow store on enter
  $(document).keypress( function(e){
    if(e.which == 13) {
      var input = $('.textInput').val();
      if(input.length==0){
        input = "\n";
      }
      appendToStoredText(input);
      loadStoredText();
      $('.textInput').val("");
    }
  });
  //allow deletion
  $('.fa-trash-o').click(function(){
    clearStoredText();
  });
  //allow download
  $('.fa-arrow-circle-o-down').click(function(){
    downloadText();
  });
});

function getStoredText(){
  var text = localStorage.getItem('storedText');
  if(text == undefined){
    return "";
  }else{
    return text;
  }
}

function loadStoredText(){
  $('.savedText').html(localStorage.getItem('storedText')+"<span class='caretAnimation'>_</span>");
  $('.lengthIndicator').html($('.savedText').html());
}
function appendToStoredText(text){
  var old = localStorage.getItem('storedText');
  localStorage.setItem('storedText', old+text);
}
function clearStoredText(){
  localStorage.setItem("storedText","");
  loadStoredText();
}

function downloadText(){
  var link = document.createElement('a');
  link.download = 'typerighter.txt';
  var blob = new Blob([localStorage.getItem('storedText')], {type: 'text/plain'});
  link.href = window.URL.createObjectURL(blob);
  link.click();
}
