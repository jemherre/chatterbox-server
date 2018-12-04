var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),
  selectedRoom : "0",  //main room name

  initialize: function() {
    RoomsView.$button.on('click',RoomsView.getRoomName); //create event handler for adding room
    $("#currentRoom").on('change',RoomsView.selectRoom);
    RoomsView.renderRoom(RoomsView.selectedRoom); //create main(intial) room
    //we will also have to render all rooms that are availuable in our server to be option :(

    //load all message pertaining to our main room
    $(document).ready(function() {
      RoomsView.pullAllRooms();
      RoomsView.selectRoom();
    });

  },

  //create template for select - options
  render: _.template(`
  <option value="<%=_.escape(roomName)%>"><!--
    --><%=_.escape(roomName)%><!--
  --></option>`
  ),

  //generates/displays rooms when clicked
  renderRoom: function(name) {
    if(Rooms[name] === undefined && name !== undefined){ //only create option room if it doesn't exist
      Rooms[name]= name;
      var html = RoomsView.render({'roomName': name});
      $(document).ready(function() {
        RoomsView.$select.append(html);
        // Create the event handler for highlighted option
      });
    }
  },

  //create pop-up form
  getRoomName: function(){
    $("#getName").remove();//edge case if user accidentally presses addroom twice
    var popUpForm = `
    <form action="#" id="getName" method="post">
      <input type="text" name="roomName"/>
      <button type="button"> Enter Room Name</button>
    </form>`;
    //maybe hide other form and make it re-appear after getting name
    $(document).ready(function(){
      //hide message form
      FormView.$form.css('display','none');
      $('#rooms').append(popUpForm);
      //create handler for when submiting new room name
      $('#getName button').on('click',RoomsView.enterRoomName);
      //create handler upon selecting room
    });

  },

  enterRoomName: function(event){
    event.preventDefault();// do we need this??
    //access and save name into render room
    var newRoom = $('#getName').find('input[type=text]').val();
    console.log("NEW Room>>>",newRoom);
    RoomsView.renderRoom(newRoom);
    //remove form room tag and display message form
    $(document).ready(function(){
      $("#getName").remove();
      FormView.$form.css('display','block');
    });

  },

  selectRoom: function() {
    //capture selected tag value
    var selectTag = document.getElementById("currentRoom");
    // debugger;
    // console.log("SELECT>> ",selectTag);
    //option tag keeps track of highlight(selected) option
    RoomsView.selectedRoom = (selectTag.options[selectTag.selectedIndex].value).toString();

    //pull all messages from parse server with roomName
    RoomsView.pullRooms((data) => {
      // examine the response from the server request:
      //==> pullroom returns a list of objects contained in a results object {results: [ 0:{message1 in roomN}, 1:{message2 in roomN}, ....] }
      var html = "";
      for(var i = 0; i < data['results'].length; i++){
        html += MessageView.render(data['results'][i]);
      }
      //append the DOM with those messages
      $(document).ready(function() {
        //remove sub div elements and then reappend them
        MessagesView.$chats.empty();//<<= always removes previous messages,losing css abilities
        MessagesView.$chats.prepend(html);
      });
    });
    //problem-need to be fixed possibly in the future:
    //friends get unfriended on refresh :(
    //it needs to hold the sttribute after
    setTimeout(() => {
      RoomsView.selectRoom();
    }, 10000);
  },

  pullRooms: function(successCB, errorCB = null) { // data
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: {
        where: {"roomname": RoomsView.selectedRoom},
        order: '-createdAt'
      },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  //when loading page, pull all room channels on channel
  pullAllRooms: function(){

    Parse.readAll((data)=>{
      //==> pullroom returns a list of objects contained in a results object {results: [ 0:{message1 in roomN}, 1:{message2 in roomN}, ....] }
      for(var i = 0; i < data['results'].length; i++){
        var name = data['results'][i]["roomname"];
        RoomsView.renderRoom(name);
      }
    });
  }

};
