const input=document.getElementById("user-input");
const button=document.getElementById("user-button");
const result=document.querySelector(".result")
let processing=false;
button.addEventListener("click",async()=>{
    const user=input.value;
    const unfollowers=await unfollower(user);
    result.textContent=unfollowers;
});
async function unfollower(username){
    const nowFollowers=await nowFollower(username);
    return nowFollowers
}
async function nowFollower(username){
    let page=1;
    let hasMore=true;
    const nowFollowers=[];
    while(hasMore){
        const response=await fetch(`https://scratch.mit.edu/users/${username}/followers/?page=${page}`);
        if(!response.ok)throw new Error("User not found");
        const html=await response.text();
        const parser=new DOMParser();
        const doc=parser.parseFromString(html);
        
        const users=[...doc.querySelectorAll("span.title > a")].map(el=>el.textContent.trim());
        if(users.length===0)hasMore=false;
        nowFollowers.push(...users);
        page++;
        if(page>1000)hasMore=false;
    }
}