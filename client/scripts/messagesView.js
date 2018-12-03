var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    //call messageView.render
    //MessagesView.$chat.on('click', MessagesView.renderMessage);
    $(document).ready(function() {

      $('#chats').on('click','.username', MessagesView.toggleStatus);
    });//create 
  },

  renderMessage: function(obj) {
    // var obj = obj || Messages;
    //append the dom with the messageView.render format
    //var html = '';
    //for (i in obj) {
    var html = MessageView.render(obj);
    //}
    console.log(html);
    $(document).ready(function() { 
      MessagesView.$chats.prepend(html);
    });    
    
  },

  toggleStatus: function(){
    
    var name = this.innerHTML;
    name = _.escape(name);
    // name = name.replace(/#/g,'amp');
    // console.log("name2",name)
    // $('#chats').children(`#${name}`).toggleClass('friend');
    
    // var allUsers = $(`#chats #${name}`);
    // `<div id="1" class="username" data-anything="${name}">${name}</div>`
    $(`#chats .username[data-username='${name}']`).toggleClass('friend');
    // `<div class="username ${name}">${name}</div>`
    // var allUsers = document.getElementById("chats").querySelectorAll(`#${name}`);
    // for (var i = 0; i < allUsers.length; i++) {
    //   allUsers[i].style.color !== "red" ? allUsers[i].style.color = "red" : allUsers[i].style.color = "black";
    // }
 }

  //look for chat id on click
  //change attribute to friend

};

