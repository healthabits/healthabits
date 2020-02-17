
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hello, welcome! 👋 Here is HealthyBot.'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Have you ever heard about the ways to live more of a healthy lifestyle?'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Is a new way to experience life 🕶'
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
}).then(function () {
  return homeBot.action.text({
    delay: 800,
    action: {
      value: 'John Doe',
      placeholder: 'Your name'
    }
  });
}).then(function (res) {
  return homeBot.message.bot({
    delay: 1500,
    content: res.value + ' nice to meet you!'
  });
}).then(function () {
  return homeBot.message.add({
    delay: 2200,
    content: 'What is your Gender?'
  });
}).then(function () {
  return homeBot.action.select({ 
    action: {
        placeholder : "Select country", 
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
});
