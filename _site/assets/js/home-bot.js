
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
    content: 'Do you use any health app?'
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
      return homeBot.action.text({ 
        action: {
          placeholder: 'Enter your text here'
        }
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
  if(text.includes("data") || text.includes("privacy") || analyze((res.value).toString()) <= 0){
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
    if(analyze((res2.value).toString()) > 0 || (text.includes("likely") || text.includes("often") || text.includes("very") && !text.includes("not"))){
      return homeBot.message.add({
        delay: 1500,
        content: 'If I am not asking too much, describe me within a few words how the system helps feeling better?'
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
    
    if(analyze((res2.value).toString()) <= 0 || text.includes("unlikely") || text.includes("not likely")){
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
        value: 'mostly unhealthy',
        icon: 'pizza-slice',
        label: 'pizza'
      }, {
        
        text: 'less healthy',
        value: 'less healthy',
        icon: 'drumstick-bite'
      },{
       
        text: 'unhealthy',
        value: 'unhealthy',
        icon: 'hotdog'
      }, {
        
        text: 'healthy',
        value: 'healthy',
        icon: 'fish'
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
          });

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