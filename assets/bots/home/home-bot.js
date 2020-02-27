
var selections = [];
var questioncounter = 0;
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hi there! 👋 Here is Aiva.'
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
}).then(function (res) {
  return homeBot.message.add({
    delay: 1500,
    type: 'embed',
    content: 'https://giphy.com/embed/3ohze0jPWQJJ2EEo7K'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Do you use any health app?'
  });
  questioncounter = 0;
}).then(function () {
  return homeBot.action.select({ 
    action: {
        placeholder : "Select Option", 
        value: 'Select Option', 
        searchselect : true, 
        label : 'text',
        options : [
                        {value: "Yes", text : "Yes" }, 
                        {value: "No", text : "No" },
                  ],
        button: {
          icon: 'check', 
          label: 'OK'
        }
      }
    });
}).then(function (res) {
  selections[0] = res.value;
  localStorage.setItem("usage_of_health_apps", res.value);
  if(res.value == "No"){
    
      return homeBot.message.add({
      delay: 1500,
      content: 'Could you tell me why you do not use one currently?'
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }

      })
    }).then(function (res1) {
      console.log(res1.value); 
      selections[1] = res1.value;
      localStorage.setItem("reason_he_not_uses", res1.value);
    });
  }
  if(res.value == "Yes"){
    console.log("none"); 
    selections[1] = "none";
    localStorage.setItem("reason_he_not_uses", selections[1]);
  }
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Nice! I was wondering how you feel about the self-tracking apps?'
  });
  questioncounter = 1;
}).then(function () {
  return homeBot.action.select({ 
    action: {
        placeholder : "Select Option", 
        value: 'Select Option', 
        searchselect : true, 
        label : 'text',
        options : [
                        {value: "Dunno", text : "I don't know. I haven't use any health app." }, 
                        {value: "Trust", text : "I don't trust the self-tracking app." },
                        {value: "Useful", text : "I find them quite useful." },
                        {value: "Concerns", text : "I like them, but I have privacy concern." },
                        {value: "Like", text : "I like them because I know the data collection is for better experience." },
                        {value: "Boring", text : "I like the health apps, but I get bored to fill in many data." },
                        {value: "Other", text : "Other" },
                  ],
        button: {
          icon: 'check', 
          label: 'OK'
        }
      }
    });
}).then(function (res) {
  console.log(res.value); 
  selections[2] = res.value;
  localStorage.setItem("self_tracking_apps", res.value);
  if(res.value == "Other"){
    return homeBot.message.add({
      delay: 1500,
      content: 'Please explain me a lil bit more about that?'
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }

      })
    }).then(function (res1) {
      console.log(res1.value); 
      selections[3] = res1.value;
      localStorage.setItem("other_self_track", res1.value);
    });
  }
	if(!(res.value == "Other")){
    return homeBot.message.add({
      delay: 1500,
      content: 'Thank you for telling me!'
    }).then(function (res1) {
      console.log(res1.value); 
      selections[3] = " ";
      localStorage.setItem("other_self_track", " ");
    });
  }
}).then(function(){
  return homeBot.message.add({
    delay: 1500,
    content : 'How likely you will take the advice from a health recommended system?'
  });
}).then(function(){
    return homeBot.action.select({ 
      action: {
          placeholder : "Select Option", 
          value: 'Select Option', 
          searchselect : true, 
          label : 'text',
          options : [
                          {value: "Likely", text : "Likely" }, 
                          {value: "Somewhat", text : "Somewhat Likely" },
                          {value: "Dunno", text : "I don't know" },
                          {value: "Unlikely", text : "Somewhat unlikely" },
                          {value: "Very_unlikely", text : "Very unlikely" },
                          
                    ],
          button: {
            icon: 'check', 
            label: 'OK'
          }
        }
      });

  }).then(function(res){
    console.log(res.value); 
  selections[4] = res.value;
  localStorage.setItem("likelihood", res.value);
  if(res.value == "Likely"){
    return homeBot.message.add({
      delay: 1500,
      content: 'What you think will be helpful for you in such a system?'
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }

      });
    }).then(function (res1) {
      console.log(res1.value); 
      selections[5] = res1.value;
      localStorage.setItem("helpful_self_track", res1.value);
    });
  }
	if(res.value == "Very_unlikely"){
    return homeBot.message.add({
      delay: 1500,
      content: 'Will you please describe the reason behind this choice?'
    }).then(function(){
      return homeBot.action.text({
        action: {
          placeholder: 'Enter your text here'
        }

    });
    }).then(function (res1) {
      console.log(res1.value); 
      selections[5] = res1.value;
      localStorage.setItem("helpful_self_track", res1.value);
    });
  }
  }).then(function(){
    return homeBot.message.add({
      delay:1500,
      content: 'What do you think will be the benefit for a health app?'
    })
  }).then(function(){
      return homeBot.action.select({ 
        action: {
            placeholder : "Select Option", 
            value: 'Select Option', 
            searchselect : true, 
            label : 'text',
            options : [
                            {value: "prediction", text : "predict disease" }, 
                            {value: "consequences", text : "you will get to know about your bad habit that you didn't realize yourself" },
                            {value: "info", text : "quantitative information" },
                            {value: "social_sup", text : "Social support or influence towards a healthy life style" },
                            {value: "none", text : "No I don't think, I would benefit at all" },
                            
                      ],
            button: {
              icon: 'check', 
              label: 'OK'
            }
          }
        });
      }).then(function (res) {
        console.log(res.value); 
        selections[6] = res.value;
        localStorage.setItem("beneficial_self_track", res.value);
      }).then(function(){
        return homeBot.message.add({
          delay:1500,
          content: 'How would you describe your food for the last week?'
        });
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }
  
      });
      }).then(function (res) {
        console.log(res.value); 
        selections[7] = res.value;
        localStorage.setItem("food_habit", res.value);
      }).then(function(){
        return homeBot.message.add({
          delay:1500,
          content: 'Did you workout in last week?'
        })
      }).then(function(){
          return homeBot.action.select({ 
            action: {
                placeholder : "Select Option", 
                value: 'Select Option', 
                searchselect : true, 
                label : 'text',
                options : [
                                {value: "light_activities", text : "Light activities everyday (e.g. walking, biking, taking stairs)" }, 
                                {value: "heavy_activities", text : "Heavy workout(e.g Gym, running)" },
                                {value: "future", text : "I didn't do it last week, but I wish to do it in future." },
                                {value: "none", text : "I don't do it. I don't need that." },                                
                          ],
                button: {
                  icon: 'check', 
                  label: 'OK'
                }
              }
            });
          }).then(function (res) {
            console.log(res.value); 
            selections[8] = res.value;
            localStorage.setItem("work_out", res.value);
          }).then(function(){
            return homeBot.message.add({
              delay: 1500,
              content: 'Are you willing to change your bad habit?'
            });
          }).then(function(){
            return homeBot.action.select({ 
              action: {
                  placeholder : "Select Option", 
                  value: 'Select Option', 
                  searchselect : true, 
                  label : 'text',
                  options : [
                                  {value: "need", text : "I don't have a bad habit" }, 
                                  {value: "Yes", text : "Yes" },
                                  {value: "No", text : "No" },
                                  {value: "Yes_but", text : "I want to change it, but ..." },                                
                            ],
                  button: {
                    icon: 'check', 
                    label: 'OK'
                  }
                }
              });
          }).then(function(res){
            console.log(res.value); 
          selections[9] = res.value;
          localStorage.setItem("willingness", res.value);
          if(res.value == "Yes"){
            return homeBot.message.add({
              delay: 1500,
              content: 'What are the obstacle you face towards changing?'
              }).then(function(){
                return homeBot.action.text({
                  action: {
                    placeholder: 'Enter your text here'
                  }
        
              });
            }).then(function (res1) {
              console.log(res1.value); 
              selections[10] = res1.value;
              localStorage.setItem("obstacles", res1.value);
            });
          }
          if(res.value == "Yes_but"){
            return homeBot.message.add({
              delay: 1500,
              content: 'Will you please describe the reason behind this choice?'
            }).then(function(){
              return homeBot.action.text({
                action: {
                  placeholder: 'Enter your text here'
                }
        
            });
            }).then(function (res1) {
              console.log(res1.value); 
              selections[5] = res1.value;
              localStorage.setItem("obstacle", res1.value);
            });
          }
          }).then(function(){
            return homeBot.message.add({
              delay: 1500,
              content: 'Anyways, thank you for your time!'
            });
          })



/*
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
*/