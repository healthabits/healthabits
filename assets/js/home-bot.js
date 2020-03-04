
var selections = [];
var questioncounter = 0;
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hi there! 👋 Here is Aiva.'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'I am here to help you maintain your well being in a more engaging and interactive way.'
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
    content: 'Please answer my questions so I can know more about you!'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Can I know your name?'
  });
}).then(function () {
  return homeBot.action.text({
    delay: 1500,
    action: {
      placeholder: 'Enter your text here'
    }
  });
}).then(function (res) {
  
  selections[11] = res.value;
  localStorage.setItem("username", res.value);
  return homeBot.message.bot({
    delay: 1500,
    content: res.value + ' nice to meet you!'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'So, I was wondering do you use any health app? Health apps are application programs that offer health-related services (e.g. food habits, workout, medical conditions).'
  });
  questioncounter = 0;
}).then(function () {
  return homeBot.action.text({ 
    action: {
      placeholder: 'Enter your text here'
    }
    });
}).then(function (res) {
  selections[0] = res.value;
  localStorage.setItem("usage_of_health_apps", res.value);
  if(analyze((res.value).toString()) < 0){
    
      return homeBot.message.add({
      delay: 1500,
      content: 'Could you name one or two reasons why you do not use one currently?'
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }

      })
    }).then(function (res1) {
      console.log(res1.value); 
      selections[1] = res1.value;
      selections[2] = " ";
      localStorage.setItem("reason_he_not_uses", res1.value);
      localStorage.setItem("features_self_track", selections[2]);
    });
  }
  if(analyze((res.value).toString()) > 0){
    console.log("none"); 
    selections[1] = " ";
    localStorage.setItem("reason_he_not_uses", selections[1]);
  
    return homeBot.message.add({
      delay:1500,
      content: 'What features do you like most in a health app?'
    })
  .then(function(){
      return homeBot.action.button({ 
        action: [{
          text: 'ability to predict',
          value: 'ability to predict'
        }, {
          text: 'goal setting',
          value: 'goal setting'
        },{
          text: 'rewards',
          value: 'rewards'
        }, {
          text: 'provide information',
          value: 'information'
        }, {
          text: 'self monitoring',
          value: 'self monitoring'
        },{
          text: 'community support',
          value: 'community support'
        }]
        });
  }).then(function (res3) {
      console.log(res3.value); 
      selections[2] = res3.value;
      localStorage.setItem("features_self_track", res3.value);
  });
}
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Nice! I was wondering do you find useful a self-tracking system? A self-tracking system collects data from the user to provide a personalized experience.'
  });
  questioncounter = 1;
}).then(function () {
  return homeBot.action.text({ 
    action: {
      placeholder: 'Enter your text here'
    }

    });
}).then(function (res) {
  console.log(res.value); 
  selections[3] = res.value;
  localStorage.setItem("useful_self_tracking_apps", res.value);
  var text = tokenize(res.value);
  if(text.includes("data") || text.includes("privacy") || text.includes("trust") || analyze((res.value).toString()) <= 0){
    return homeBot.message.add({
      delay: 1500,
      content: 'Please tell me a lil bit more about your concerns?'
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }

      })
    }).then(function (res1) {
      console.log(res1.value); 
      selections[4] = res1.value;
      selections[5] = selections[6] = " ";
      localStorage.setItem("concerns_self_track", res1.value);
      localStorage.setItem("likelihood_of_usage", " ");
      localStorage.setItem("helpful_self_track", " ");

    });
  }
	else{
    return homeBot.message.add({
      delay: 1500,
      content: 'Thank you for letting me know!'
    
    }).then(function (res1) {
      console.log(res1.value); 
      selections[4] = " ";
      localStorage.setItem("concerns_self_track", " ");
    })
  .then(function(){
    return homeBot.message.add({
      delay: 1500,
      content : 'How likely you will follow advices from a health app?'
    });
  }).then(function(){
      return homeBot.action.text({ 
        action: {
          placeholder: 'Enter your text here'
        }
        });
  
    }).then(function(res2){
      console.log(res2.value); 
    selections[5] = res2.value;
    localStorage.setItem("likelihood_of_usage", res2.value);
    var text = tokenize(res2.value);
    if(analyze((res2.value).toString()) > 0 || (text.includes("likely") || text.includes("often") || text.includes("very") ) && !text.includes("not")){
      return homeBot.message.add({
        delay: 1500,
        content: 'If I am not asking too much, describe me within a few words how the system helps you feeling better?'
        }).then(function(){
          return homeBot.action.text({
            action: {
              placeholder: 'Enter your text here'
            }
  
        });
      }).then(function (res3) {
        console.log(res3.value); 
        selections[6] = res3.value;
        localStorage.setItem("helpful_self_track", res3.value);
      });
    }
    
    if(analyze((res2.value).toString()) <= 0 || text.includes("unlikely") || text.includes("not likely") || text.includes("not very likely") ){
      return homeBot.message.add({
        delay: 1500,
        content: 'Will you please describe the reason behind this choice?'
      }).then(function(){
        return homeBot.action.text({
          action: {
            placeholder: 'Enter your text here'
          }
  
      });
      }).then(function (res3) {
        console.log(res3.value); 
        selections[6] = res3.value;
        localStorage.setItem("helpful_self_track", res3.value);
      });
    } });
  }

  
  }).then(function(){
     return homeBot.message.add({
       delay:1500,
       content: 'Anyways, how would you describe your food during the last week?'
  });
  }).then(function(){
    //*
    return homeBot.action.button({
      delay: 2500,
      
      action: [{
        
        text: 'mostly unhealthy',
        value: 'mostly unhealthy'
      }, {
        
        text: 'less healthy',
        value: 'less healthy'
      },{
       
        text: 'unhealthy',
        value: 'unhealthy'
      }, {
        
        text: 'healthy',
        value: 'healthy'
      }]
    });/*/
    /*return homeBot.message.add({
      delay: 1200,
      type: 'embed',
      content: '/assets/img/very_unhealthy_food.png'
    });*/
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
    return homeBot.action.button({
      delay: 2500,
      action: [{
        text: 'light activities',
        value: 'light activities'
      }, {
        text: 'heavy activities',
        value: 'heavy activities'
      },{
        text: 'maybe in the future',
        value: 'maybe in the future'
      }, {
        text: 'not at all',
        value: 'not at all'
      }]
    });
    
   }).then(function (res) {
      console.log(res.value); 
      selections[8] = res.value;
      localStorage.setItem("work_out", res.value);
   }).then(function(){
       return homeBot.message.add({
       delay: 1500,
     content: 'Are you aware of the bad consequences that arise when living unhealthy? Are you willing to improve your self?'
    });
   }).then(function(){
       return homeBot.action.text({ 
        action: {
          placeholder: 'Enter your text here'
        }
   });
          }).then(function(res){
            console.log(res.value); 
          selections[9] = res.value;
          localStorage.setItem("willingness", res.value);
          if(analyze((res.value).toString()) < 0){
            return homeBot.message.add({
              delay: 1500,
              content: 'What are the obstacles you face towards changing?'
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
          else{
            return homeBot.message.add({
              delay: 1500,
              content: 'So what do you usually do to live more healthy?'
              }).then(function(){
                return homeBot.action.text({
                  action: {
                    placeholder: 'Enter your text here'
                  }
        
              })
            }).then(function (res1) {
              console.log(res1.value); 
              selections[10] = res1.value;
              localStorage.setItem("obstacles", res1.value);
            });
          }
          }).then(function(){
            return homeBot.message.add({
              delay: 1500,
              content: 'Anyways, thank you for your time!'
            });
          }).then(function () {
            return homeBot.action.button({
              delay: 2500,
              action: [{
                text: 'See my results',
                value: 'results'
              }, {
                text: 'repeat test',
                value: 'repeat'
              }]
            });
          }).then(function (res) {
            //ga_record('btn_click', res.value); google analitics lock execution
            if(res.value == 'results') {
              results();
            }
            if(res.value == 'repeat') {
              repeat();
            }
          });


var results = function () {
  
   // LIFE CONSCIOUS
    if ((selections[7] != "unhealthy" && selections[7] != "mostly unhealthy") && analyze(selections[0])>0 && analyze(selections[3]) >0 && analyze(selections[9]) >0 ) {
      
      document.getElementById("home-demo").style.display="none"; 
      document.getElementById('profile').style.display="block";
      var node = document.getElementById('profile');
      var x = document.createElement("IMG");
      x.setAttribute("src", "/assets/img/Persona2.png");
      x.setAttribute("display", "block");

      x.setAttribute("width", "50%");
      x.setAttribute("margin-left", "auto");
      x.setAttribute("margin-right", "auto");

      x.setAttribute("alt", "The Life Conscious");
      document.body.appendChild(x);
      
      var g = document.createElement("H1");
      var s = document.createTextNode("Life Conscious");
      g.appendChild(s);
      document.body.appendChild(g);
      var h = document.createElement("LI");                
      var t = document.createTextNode("Conscious about lifestyle");
      var k = document.createElement("LI");   
      var m = document.createTextNode("Satisfied with app");
      var r = document.createElement("LI");
      var w = document.createTextNode("Trusts easily technology");
      var l = document.createElement("LI");   
      var n= document.createTextNode("Find apps useful");     // Create a text node
      h.appendChild(t); k.appendChild(m); l.appendChild(n);
      document.body.appendChild(h);document.body.appendChild(k);document.body.appendChild(l);
      //var r = document.createElement("p");
      //var w = document.createTextNode("He/She has motivation and willingness to change, mostly eats healthy food and follows the flow (social). Because of lack of time he/she might lose motivation and willingness to improve his/her lifestyle");
      r.appendChild(w);
      document.body.appendChild(r);
      document.getElementById("profile").appendChild(g);
      document.getElementById("profile").appendChild(h);
      document.getElementById("profile").appendChild(k);
      document.getElementById("profile").appendChild(l);
      document.getElementById("profile").appendChild(r);
      document.getElementById('profile').appendChild(x);
   }
   // LIFE AND TECH CONSCIOUS
    if (analyze(selections[3])< 0 && (selections[7] != "unhealthy"  && selections[7] !="mostly unhealthy") &&  analyze(selections[0])>0 && analyze(selections[9])>0) {
      
      document.getElementById("home-demo").style.display="none"; 
      document.getElementById('profile').style.display="block";
      var node = document.getElementById('profile');
      var x = document.createElement("IMG");
      x.setAttribute("src", "/assets/img/Persona1.png");
      x.setAttribute("display", "block");

      x.setAttribute("width", "50%");
      x.setAttribute("margin-left", "auto");
      x.setAttribute("margin-right", "auto");

      x.setAttribute("alt", "The Life and Tech Conscious");
      document.body.appendChild(x);
      
      var g = document.createElement("H1");
      var s = document.createTextNode("Life and Tech Conscious");
      g.appendChild(s);
      document.body.appendChild(g);
      var h = document.createElement("LI");                
      var t = document.createTextNode("Conscious about life");
      var k = document.createElement("LI");   
      var m = document.createTextNode("Conscious about tech");
      var r = document.createElement("LI");
      var w = document.createTextNode("Conscious about apps");
      var l = document.createElement("LI");   
      var n= document.createTextNode("Lives a healthy life already");     // Create a text node
      h.appendChild(t); k.appendChild(m); l.appendChild(n);
      document.body.appendChild(h);document.body.appendChild(k);document.body.appendChild(l);
      //var r = document.createElement("p");
      //var w = document.createTextNode("He/She has motivation and willingness to change, mostly eats healthy food and follows the flow (social). Because of lack of time he/she might lose motivation and willingness to improve his/her lifestyle");
      r.appendChild(w);
      document.body.appendChild(r);
      document.getElementById("profile").appendChild(g);
      document.getElementById("profile").appendChild(h);
      document.getElementById("profile").appendChild(k);
      document.getElementById("profile").appendChild(l);
      document.getElementById("profile").appendChild(r);
      document.getElementById('profile').appendChild(x);
    
    }
    // TECH SKEPTIC
    if (analyze(selections[0])< 0 && selections[8] != "mostly unhealthy" && selections[8] != "unhealthy" && analyze(selections[9]) >0) {
      
      document.getElementById("home-demo").style.display="none"; 
      document.getElementById('profile').style.display="block";
      var node = document.getElementById('profile');
      var x = document.createElement("IMG");
      x.setAttribute("src", "/assets/img/Persona5.png");
      x.setAttribute("display", "block");

      x.setAttribute("width", "50%");
      x.setAttribute("margin-left", "auto");
      x.setAttribute("margin-right", "auto");

      x.setAttribute("alt", "The Tech Skeptic");
      document.body.appendChild(x);
      
      var g = document.createElement("H1");
      var s = document.createTextNode("Tech Skeptic");
      g.appendChild(s);
      document.body.appendChild(g);
      var h = document.createElement("LI");                
      var t = document.createTextNode("A Dinosaur type person do not use any health app.");
      var k = document.createElement("LI");   
      var m = document.createTextNode("Might be health conscious (diet, sport)");
      var r = document.createElement("LI");
      var w = document.createTextNode("Want to change unhealthy behaviours to live healthier ");
      var l = document.createElement("LI");   
      var n= document.createTextNode("Believes in traditional values");     
      h.appendChild(t); k.appendChild(m); l.appendChild(n);
      document.body.appendChild(h);document.body.appendChild(k);document.body.appendChild(l);
      //var r = document.createElement("p");
      //var w = document.createTextNode("He/She has motivation and willingness to change, mostly eats healthy food and follows the flow (social). Because of lack of time he/she might lose motivation and willingness to improve his/her lifestyle");
      r.appendChild(w);
      document.body.appendChild(r);
      document.getElementById("profile").appendChild(g);
      document.getElementById("profile").appendChild(h);
      document.getElementById("profile").appendChild(k);
      document.getElementById("profile").appendChild(l);
      document.getElementById("profile").appendChild(r);
      document.getElementById('profile').appendChild(x);
    
    }
        // IGNORANT
        if ((selections[7] != "healthy") && (selections[7] != "less healthy")  && (analyze(selections[9]) < 0 )) {
      
          document.getElementById("home-demo").style.display="none"; 
      document.getElementById('profile').style.display="block";
      var node = document.getElementById('profile');
      var x = document.createElement("IMG");
          x.setAttribute("src", "/assets/img/Persona4.png");
          x.setAttribute("display", "block");
    
          x.setAttribute("width", "50%");
          x.setAttribute("margin-left", "auto");
          x.setAttribute("margin-right", "auto");
    
          x.setAttribute("alt", "The Sloth");
          document.body.appendChild(x);
          
          var g = document.createElement("H1");
          var s = document.createTextNode("The Sloth");
          g.appendChild(s);
          document.body.appendChild(g);
          var h = document.createElement("LI");                
          var t = document.createTextNode("Sloth type person is indifferent regarding to food habits.");
          var k = document.createElement("LI");   
          var m = document.createTextNode("Does not live health consciously (diet)");
          var r = document.createElement("LI");
          var w = document.createTextNode("Does not use health apps");
          var l = document.createElement("LI");   
          var n= document.createTextNode("He/She is careless");     
          h.appendChild(t); k.appendChild(m); l.appendChild(n);
          document.body.appendChild(h);document.body.appendChild(k);document.body.appendChild(l);
          //var r = document.createElement("p");
          //var w = document.createTextNode("He/She has motivation and willingness to change, mostly eats healthy food and follows the flow (social). Because of lack of time he/she might lose motivation and willingness to improve his/her lifestyle");
          r.appendChild(w);
          document.body.appendChild(r);
          document.getElementById("profile").appendChild(g);
          document.getElementById("profile").appendChild(h);
          document.getElementById("profile").appendChild(k);
          document.getElementById("profile").appendChild(l);
          document.getElementById("profile").appendChild(r);
          document.getElementById('profile').appendChild(x);
        
        }
          // BLOCKED
          if (selections[7] != "healthy" && selections[7] != "less healthy"  && (analyze(selections[9])>0) ) {
      
            document.getElementById("home-demo").style.display="none"; 
      document.getElementById('profile').style.display="block";
      var node = document.getElementById('profile');
      var x = document.createElement("IMG");
            x.setAttribute("src", "/assets/img/Persona3.png");
            x.setAttribute("display", "block");
      
            x.setAttribute("width", "50%");
            x.setAttribute("margin-left", "auto");
            x.setAttribute("margin-right", "auto");
      
            x.setAttribute("alt", "The Penguin");
            document.body.appendChild(x);
            
            var g = document.createElement("H1");
            var s = document.createTextNode("The Penguin");
            g.appendChild(s);
            document.body.appendChild(g);
            var h = document.createElement("LI");                
            var t = document.createTextNode("The Penguin type person has strong cultural or social obstacles.");
            var k = document.createElement("LI");   
            var m = document.createTextNode("Have motivation and willingness to change, but they can quickly lost interest.");
            var r = document.createElement("LI");
            var w = document.createTextNode("Tries a lot of things");
            //var l = document.createElement("LI");   
            //var n= document.createTextNode("He/She is careless");     
            h.appendChild(t); k.appendChild(m); //l.appendChild(n);
            document.body.appendChild(h);document.body.appendChild(k);//document.body.appendChild(l);
            //var r = document.createElement("p");
            //var w = document.createTextNode("He/She has motivation and willingness to change, mostly eats healthy food and follows the flow (social). Because of lack of time he/she might lose motivation and willingness to improve his/her lifestyle");
            r.appendChild(w);
            document.body.appendChild(r);
            document.getElementById("profile").appendChild(g);
            document.getElementById("profile").appendChild(h);
            document.getElementById("profile").appendChild(k);
            //document.getElementById("profile").appendChild(l);
            document.getElementById("profile").appendChild(r);
            document.getElementById('profile').appendChild(x);
          
          }
}

          var repeat = function () {
            var selections = [];            
            homeBot.message.add({
              content: 'Hi there! 👋 Here is Aiva.'
            }).then(function () {
              return homeBot.message.add({
                delay: 1500,
                content: 'I am here to help you maintain your well being in a more engaging and interactive way.'
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
                content: 'Please answer my questions so I can know more about you!'
              });
            }).then(function () {
              return homeBot.message.add({
                delay: 1500,
                content: 'Can I know your name?'
              });
            }).then(function () {
              return homeBot.action.text({
                delay: 1500,
                action: {
                  placeholder: 'Enter your text here'
                }
              });
            }).then(function (res) {
              
              selections[11] = res.value;
              localStorage.setItem("username", res.value);
              return homeBot.message.bot({
                delay: 1500,
                content: res.value + ' nice to meet you!'
              });
            }).then(function () {
              return homeBot.message.add({
                delay: 1500,
                content: 'So, I was wondering do you use any health app? Health apps are application programs that offer health-related services (e.g. food habits, workout, medical conditions).'
              });
              questioncounter = 0;
            }).then(function () {
              return homeBot.action.text({ 
                action: {
                  placeholder: 'Enter your text here'
                }
                });
            }).then(function (res) {
              selections[0] = res.value;
              localStorage.setItem("usage_of_health_apps", res.value);
              if(analyze((res.value).toString()) < 0){
                
                  return homeBot.message.add({
                  delay: 1500,
                  content: 'Could you name one or two reasons why you do not use one currently?'
                  }).then(function(){
                    return homeBot.action.text({
                      action: {
                        placeholder: 'Enter your text here'
                      }
            
                  })
                }).then(function (res1) {
                  console.log(res1.value); 
                  selections[1] = res1.value;
                  selections[2] = " ";
                  localStorage.setItem("reason_he_not_uses", res1.value);
                  localStorage.setItem("features_self_track", selections[2]);
                });
              }
              if(analyze((res.value).toString()) > 0){
                console.log("none"); 
                selections[1] = " ";
                localStorage.setItem("reason_he_not_uses", selections[1]);
              
                return homeBot.message.add({
                  delay:1500,
                  content: 'What features do you like most in a health app?'
                })
              .then(function(){
                  return homeBot.action.button({ 
                    action: [{
                      text: 'ability to predict',
                      value: 'ability to predict'
                    }, {
                      text: 'goal setting',
                      value: 'goal setting'
                    },{
                      text: 'rewards',
                      value: 'rewards'
                    }, {
                      text: 'provide information',
                      value: 'information'
                    }, {
                      text: 'self monitoring',
                      value: 'self monitoring'
                    },{
                      text: 'community support',
                      value: 'community support'
                    }]
                    });
              }).then(function (res3) {
                  console.log(res3.value); 
                  selections[2] = res3.value;
                  localStorage.setItem("features_self_track", res3.value);
              });
            }
            }).then(function () {
              return homeBot.message.add({
                delay: 1500,
                content: 'Nice! I was wondering do you find useful a self-tracking system? A self-tracking system collects data from the user to provide a personalized experience.'
              });
              questioncounter = 1;
            }).then(function () {
              return homeBot.action.text({ 
                action: {
                  placeholder: 'Enter your text here'
                }
            
                });
            }).then(function (res) {
              console.log(res.value); 
              selections[3] = res.value;
              localStorage.setItem("useful_self_tracking_apps", res.value);
              var text = tokenize(res.value);
              if(text.includes("data") || text.includes("privacy") || text.includes("trust") || analyze((res.value).toString()) <= 0){
                return homeBot.message.add({
                  delay: 1500,
                  content: 'Please tell me a lil bit more about your concerns?'
                  }).then(function(){
                    return homeBot.action.text({
                      action: {
                        placeholder: 'Enter your text here'
                      }
            
                  })
                }).then(function (res1) {
                  console.log(res1.value); 
                  selections[4] = res1.value;
                  selections[5] = selections[6] = " ";
                  localStorage.setItem("concerns_self_track", res1.value);
                  localStorage.setItem("likelihood_of_usage", " ");
                  localStorage.setItem("helpful_self_track", " ");
            
                });
              }
              else{
                return homeBot.message.add({
                  delay: 1500,
                  content: 'Thank you for letting me know!'
                
                }).then(function (res1) {
                  console.log(res1.value); 
                  selections[4] = " ";
                  localStorage.setItem("concerns_self_track", " ");
                })
              .then(function(){
                return homeBot.message.add({
                  delay: 1500,
                  content : 'How likely you will follow advices from a health app?'
                });
              }).then(function(){
                  return homeBot.action.text({ 
                    action: {
                      placeholder: 'Enter your text here'
                    }
                    });
              
                }).then(function(res2){
                  console.log(res2.value); 
                selections[5] = res2.value;
                localStorage.setItem("likelihood_of_usage", res2.value);
                var text = tokenize(res2.value);
                if(analyze((res2.value).toString()) > 0 || (text.includes("likely") || text.includes("often") || text.includes("very") ) && !text.includes("not")){
                  return homeBot.message.add({
                    delay: 1500,
                    content: 'If I am not asking too much, describe me within a few words how the system helps you feeling better?'
                    }).then(function(){
                      return homeBot.action.text({
                        action: {
                          placeholder: 'Enter your text here'
                        }
              
                    });
                  }).then(function (res3) {
                    console.log(res3.value); 
                    selections[6] = res3.value;
                    localStorage.setItem("helpful_self_track", res3.value);
                  });
                }
                
                if(analyze((res2.value).toString()) <= 0 || text.includes("unlikely") || text.includes("not likely") || text.includes("not very likely")){
                  return homeBot.message.add({
                    delay: 1500,
                    content: 'Will you please describe the reason behind this choice?'
                  }).then(function(){
                    return homeBot.action.text({
                      action: {
                        placeholder: 'Enter your text here'
                      }
              
                  });
                  }).then(function (res3) {
                    console.log(res3.value); 
                    selections[6] = res3.value;
                    localStorage.setItem("helpful_self_track", res3.value);
                  });
                } });
              }
            
              
              }).then(function(){
                 return homeBot.message.add({
                   delay:1500,
                   content: 'Anyways, how would you describe your food during the last week?'
              });
              }).then(function(){
                //*
                return homeBot.action.button({
                  delay: 2500,
                  
                  action: [{
                    
                    text: 'mostly unhealthy',
                    value: 'mostly unhealthy'
                  }, {
                    
                    text: 'less healthy',
                    value: 'less healthy'
                  },{
                   
                    text: 'unhealthy',
                    value: 'unhealthy'
                  }, {
                    
                    text: 'healthy',
                    value: 'healthy'
                  }]
                });/*/
                /*return homeBot.message.add({
                  delay: 1200,
                  type: 'embed',
                  content: '/assets/img/very_unhealthy_food.png'
                });*/
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
                return homeBot.action.button({
                  delay: 2500,
                  action: [{
                    text: 'light activities',
                    value: 'light activities'
                  }, {
                    text: 'heavy activities',
                    value: 'heavy activities'
                  },{
                    text: 'maybe in the future',
                    value: 'maybe in the future'
                  }, {
                    text: 'not at all',
                    value: 'not at all'
                  }]
                });
                
               }).then(function (res) {
                  console.log(res.value); 
                  selections[8] = res.value;
                  localStorage.setItem("work_out", res.value);
               }).then(function(){
                   return homeBot.message.add({
                   delay: 1500,
                 content: 'Are you aware of the bad consequences that arise when living unhealthy? Are you willing to improve your self?'
                });
               }).then(function(){
                   return homeBot.action.text({ 
                    action: {
                      placeholder: 'Enter your text here'
                    }
               });
                      }).then(function(res){
                        console.log(res.value); 
                      selections[9] = res.value;
                      localStorage.setItem("willingness", res.value);
                      if(analyze((res.value).toString()) < 0){
                        return homeBot.message.add({
                          delay: 1500,
                          content: 'What are the obstacles you face towards changing?'
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
                      else{
                        return homeBot.message.add({
                          delay: 1500,
                          content: 'So what do you usually do to live more healthy?'
                          }).then(function(){
                            return homeBot.action.text({
                              action: {
                                placeholder: 'Enter your text here'
                              }
                    
                          })
                        }).then(function (res1) {
                          console.log(res1.value); 
                          selections[10] = res1.value;
                          localStorage.setItem("obstacles", res1.value);
                        });
                      }
                      }).then(function(){
                        return homeBot.message.add({
                          delay: 1500,
                          content: 'Anyways, thank you for your time!'
                        });
                      }).then(function () {
                        return homeBot.action.button({
                          delay: 2500,
                          action: [{
                            text: 'See my results',
                            value: 'results'
                          }, {
                            text: 'repeat test',
                            value: 'repeat'
                          }]
                        });
                      }).then(function (res) {
                        //ga_record('btn_click', res.value); google analitics lock execution
                        if(res.value == 'results') {
                          results();
                        }
                        if(res.value == 'repeat') {
                          repeat();
                        }
                      });



          }

          /*exportToCsv('export.csv', [['name', 'usage_of_health_apps', 'obstacles', 'food_habit', 'work_out', 'willingness', 'reason_he_not_uses', 'features_self_track', 'helpful_self_track', 'concerns_self_track', 'likelihood_of_usage','useful_self_tracking_apps'],
       [selections[11], analyze(selections[0]), analyze(selections[10]), analyze(selections[7]), analyze(selections[8]), analyze(selections[9]),analyze(selections[1]), analyze(selections[2]),analyze(selections[6]),analyze(selections[4]),analyze(selections[5]),analyze(selections[3])]])
          */

         
var lexico = {};
const afinn = $.getJSON("afinn.json", function(json) {
    lexico = json;
});
function tokenize(text){
  return text
  .toLowerCase()
  .split(" ");
}
function deleteUselessChars(word){
  return word.replace(/[^\w]/g, "");
}
function rateWord(word){
  return (word in lexico) ? lexico[word] : 0;
}
function sum(x, y){
  return x + y;
}
function analyze(text){
  return tokenize(text)
  .map(deleteUselessChars)
  .map(rateWord)
  .reduce(sum);
}
function exportToCsv(filename, rows) {
  var processRow = function (row) {
      var finalVal = '';
      for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? '' : row[j].toString();
          if (row[j] instanceof Date) {
              innerValue = row[j].toLocaleString();
          };
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              finalVal += ',';
          finalVal += result;
      }
      return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
  
}



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