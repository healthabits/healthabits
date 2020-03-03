---
layout: page
title: Chat
permalink: /about/
---
  
<body>
  <div class="members-count">-</div>
  <div class="members-list">-</div>
  <div class="messages"></div>
  <form class="message-form" onsubmit="return false;">
    <input class="message-form__input" placeholder="Type a message.." type="text"/>
    <input class="message-form__button" value="Send" type="submit"/>
  </form>
  <script src="{{ "/assets/js/chat.js" | relative_url }}"></script>
</body>
