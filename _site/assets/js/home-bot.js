
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hello, welcome! 👋 Here is HealthyBot.'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Have you ever heard about living a healthy lifestyle?'
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
    delay: 1500,
    content: 'Want to know more about healthy life style 🤖 ? Or do you want to explore healthy activities that fits you the most?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 2500,
    action: [{
      text: 'Healthy Lifestyle!',
      value: 'history'
    }, {
      text: 'Healthy Activities',
      value: 'landing'
    }]
  });
}).then(function (res) {
  //ga_record('btn_click', res.value); google analitics lock execution
  if(res.value == 'history') {
    story();
  }
  if(res.value == 'landing') {
    land();
  }
});

var story = function () {
  homeBot.message.add({
    delay: 2000,
    content: "Awesome! Let me explain how a healthy lifestyle can improve your life:"
  }).then(function () {
    return homeBot.message.add({
      delay: 1000,
      content: '1) Eating right and exercising regularly can help you avoid excess weight gain and maintain a healthy weight. According to the Mayo Clinic, being physically active is essential to reaching your weight-loss goals. Even if you’re not trying to lose weight, regular exercise can improve cardiovascular health, boost your immune system, and increase your energy level.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 3000,
      content: '2) Doing right by your body pays off for your mind as well. The Mayo Clinic notes that physical activity stimulates the production of endorphins. Endorphins are brain chemicals that leave you feeling happier and more relaxed. Eating a healthy diet as well as exercising can lead to a better physique. You’ll feel better about your appearance, which can boost your confidence and self-esteem. Short-term benefits of exercise include decreased stress and improved cognitive function.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 3000,
      content: '3) Healthy habits help prevent certain health conditions, such as heart disease, stroke, and high blood pressure. If you take care of yourself, you can keep your cholesterol and blood pressure within a safe range. This keeps your blood flowing smoothly, decreasing your risk of cardiovascular diseases.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Regular physical exercise improves muscle strength and boosts endurance, giving you more energy, says the Mayo Clinic. Exercise helps deliver oxygen and nutrients to your tissues and gets your cardiovascular system working more efficiently so that you have more energy to go about your daily activities. It also helps boost energy by promoting better sleep. This helps you fall asleep faster and get deeper sleep.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2500,
      content: 'Bad habits are hard to break, but once you adopt a healthier lifestyle, you won’t regret this decision. Healthy habits reduce the risk of certain diseases, improve your physical appearance and mental health, and give your energy level a much needed boost. You won’t change your mindset and behavior overnight, so be patient and take it one day at a time.'
    });
  }).then(land);
};

var land = function () {
  //ga_record('message', 'end'); google analitics lock execution
  homeBot.message.add({
    delay: 1000,
    content: 'Select a goal. Choose a goal that is the best fit for you. It may not be the first goal you feel you should choose. But you are much more likely to succeed if you set priorities that are compelling to you and feel attainable at present.'
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      content: 'Ask a big question. Do I have a big dream that pairs with my goal? A big dream might be running a marathon or climbing Mt. Kilimanjaro, wiggling back into a closet full of clothes you love, cutting back on blood pressure medication, or playing games and sports energetically with your children. One word to the wise: if you cannot articulate a big dream, donot get hung up on this step. You can still succeed in moving toward your goal through these other approaches.'
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      //type: 'embed',
      content: 'Pick your choice for change. Select a choice that feels like a sure bet. Do you want to eat healthier, stick to exercise, diet more effectively, ease stress? It is best to concentrate on just one choice at a time. When a certain change fits into your life comfortably, you can then focus on the next change.'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Commit yourself. Make a written or verbal promise to yourself and one or two supporters you donot want to let down: your partner or child, a teacher, doctor, boss, or friends. That will encourage you to slog through tough spots. Be explicit about the change you have chosen and why it matters to you. If it is a step toward a bigger goal, include that, too. I am making a commitment to my health by planning to take a mindful walk, two days a week. This is my first step to a bigger goal: doing a stress-reducing activity every day (and it helps me meet another goal: getting a half-hour of exercise every day). I want to do this because I sleep better, my mood improves, and I am more patient with family and friends when I ease the stress in my life.'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 3000,
      content: 'Scout out easy obstacles. Maybe you had love to try meditating, but can not imagine having the time to do it. Or perhaps your hopes for eating healthier run aground if you are hungry when you walk through the door at night, or your kitchen cabinets and refrigerator arenot well-stocked with healthy foods.'
    });
}).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
        value: 'What is your name? ',
        placeholder: 'Your name'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: res.value + ' nice to meet you!'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: 'Such a layout allows you to share only information that may interest readers and skip unnecessary ones to those who are not interested, by means of targeted questions designed to create a suitable path for the player.'
    });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1200,
      type: 'embed',
      content: 'https://giphy.com/embed/3ohze0jPWQJJ2EEo7K'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      content: 'I hope you can come back to creating great communications!'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 1000,
      content: 'If you need further information or have any doubts, drop me in line on !(mail) [rafailiasim@gmail.com](mailto:rafailiasim@gmail.com)'
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 3000,
      content: '👋'
    });
}).then(function () {
  return homeBot.action.button({
    delay: 2500,
    action: [{
      text: 'Healthy Lifestyle!',
      value: 'history'
    }, {
      text: 'Healthy Activities',
      value: 'landing'
    }]
  });
}).then(function (res) {
  //ga_record('btn_click', res.value); google analitics lock execution
  if(res.value == 'history') {
    story();
  }
  if(res.value == 'landing') {
    land();
  }
});
};

var ga_record = function(type, action) {
  if(ga) {
    ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: action
    });
  }
}
