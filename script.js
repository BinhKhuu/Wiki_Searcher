$(document).ready(function(){ 
  var getWikiPages = function (search_term) {
    var url = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?';
    var format = "format=json&";
    var action = "action=query&list=search&srsearch=" + search_term.trim().split(" ").join("%20");
    url = url + format + action;
    $.getJSON(url,function(json){
      showResults(json);
    });
    
  }

  var showResults = function(json) { 
    for(var i = 0; i <= 9; i++) {
      var cName = '.result-' + (i+1).toString();
      var title = '<h3><b>' + json.query.search[i].title + "</b></h3>";
      var url = "https://en.wikipedia.org/wiki/" + json.query.search[i].title.split(" ").join("_");
      var link = "<a href='" + url + "' target='_blank'</a>"
      $(cName).append(title + json.query.search[i].snippet);
      $(cName).wrap(link);
    } 
  }
  
  $("#rand-btn").on('click', function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random');  
  });
  $('.search-box').on('focus', function(){
    $('.search-box').addClass('search-box-focus');
    $('#x-btn').removeClass('invis-btn'); 
    $('#x-btn').addClass('x-btn');
    $('#sub-btn').css('font-size', '30px');  
  });   
 $('.search-box').on('focusout', function(){
    $('#sub-btn').css('font-size', '20px');
 }); 
  $('#x-btn').on('click',function(e){
    $('.search-box').removeClass('search-box-focus');
    $('#x-btn').addClass('invis-btn');
    $('#x-btn').removeClass('x-btn');
    $('.search-box').val('');
    $('#box').addClass('box');
    $('#box').removeClass('box-results');
    $('.info').hide();
    $('.info').empty();
    e.preventDefault();
  })
  $('.search-box').keypress(function(e){
    if(e.which == 13) {
      if( $('.search-box').val() != "" ) {
        $('.info').empty();
        $('#box').addClass('box-results');
        $('#box').removeClass('box');
        $('.info').show();
        getWikiPages($('.search-box').val());
      } else {
        alert('you need to enter something!');  
      }
      e.preventDefault();
    }
  })
  $('#sub-btn').on('click',function(e){
    if( $('.search-box').val() != "" ) {
      $('.info').empty();
      $('#box').addClass('box-results');
      $('#box').removeClass('box');
      $('.info').show();
      getWikiPages($('.search-box').val());   
    } else {
      alert('you need to enter something!');
    }   
    e.preventDefault();
  });
  
});

