


const socket = io('http://localhost:8080');

//Get DOM elements in a respective Js Variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Audio that will play on receiving message
var audio = new Audio('ting_iphone.mp3')

//Function which will append event info to the container
const append  =(message,position)=>{
const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position =='left'){
  audio.play();
}

}

//if the form submitted ,send a server a message
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value ="";
})



//Ask new users for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

//If the new users joins,receive his/her name  from the sever
socket.on('user-joined',name =>{
  append(`${name} joined the chat`,'right')
})

//if server sends a message,receive it 
socket.on('receive',data =>{
  append(`${data.name}:${data.message}`,'left')
})

//If users leaves the chat,append the info to the container
socket.on('left',name =>{
  append(`${name} left the chat`,'right')
})

