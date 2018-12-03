var MessageView = {

  render:
    _.template(`
      <div class="chat"><!--
      --><span data-username="<%=_.escape(username)%>" class="username" ><%=_.escape(username)%></span><!--
      --><div><%=_.escape(text)%></div><!--
      --></div>
    `)

};// $(`#chats .username[data-anything=${name}]`).css('color', 'red');
 // `<div class="username">${name}</div>`