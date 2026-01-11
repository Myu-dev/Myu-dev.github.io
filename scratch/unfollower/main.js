const input=document.getElementById("user-input");
const button=document.getElementById("user-button");
let processing=false;
button.addEventListener("click",async()=>{
    const user=input.value;
    alert(user)
});