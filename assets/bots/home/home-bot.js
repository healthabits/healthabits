
var selections = [];
var questioncounter = 0;
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hello, welcome! 👋 Here is WoeBot.'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Have you ever heard about the ways to live a more healthy lifestyle?'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Is a new way to experience life'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'More engaging and interactive.'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 2200,
    content: 'Can I know your name?'
  });
  questioncounter = 0;
}).then(function () {
  return homeBot.action.text({
    delay: 800,
    action: {
      value: 'John Doe',
      placeholder: 'Your name'
    }
  });
}).then(function (res) {
  selections[0] = res.value;
  localStorage.setItem("username", res.value);
  return homeBot.message.bot({
    delay: 1500,
    content: res.value + ' nice to meet you!'
  });
  
}).then(function () {
  return homeBot.message.add({
    delay: 2200,
    content: 'What is your Gender?'
  });
  questioncounter = 1;
}).then(function () {
  return homeBot.action.select({ 
    action: {
        placeholder : "Select Gender", 
        value: 'SG', 
        searchselect : true, 
        label : 'text',
        options : [
                        {value: "Other", text : "Other" }, 
                        {value: "Male", text : "Male" },
                        {value: "Female", text : "Female" },
                  ],
        button: {
          icon: 'check', 
          label: 'OK'
        }
      }
    });
}).then(function (res) {
  console.log(res.value); 
  selections[1] = res.value;
  localStorage.setItem("gender", res.value);
  var js = JSON.stringify(selections) ;
	 
$.ajax({
  type: "POST",
  dataType: 'jsonp',
  crossDomain: true,
  //headers: {  'Access-Control-Allow-Origin': '*' },
  url: "https://voice-app.000webhostapp.com/database.php",
  
  data: js,
  success: 
    $.post( 'https://voice-app.000webhostapp.com/database.php', {'x':js} ).done(function( data ) {
        console.log( "Data Loaded: " + data );  
          
      })
      .fail(function() {
       
        alert( 'No internet connection!\n');
      
      })
  
  
});
	
});

