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
    const oldFollowers=await oldFollower(username);

    const set=new Set(oldFollowers);
    const unfollowers=oldFollowers.filter(name=>set.has(name));
    return unfollowers;
}
async function oldFollower(username) {
    let offset=0;
    let hasMore=true;
    const oldFollowers=[];
    const proxy="https://api.allorigins.win/get?url="
    while(hasMore){
        const url=proxy+encodeURIComponent(`https://api.scratch.mit.edu/users/${username}/followers?offset=${offset}`)
        const res=await fetch(url);
        if(!res.ok)break;
        const data=await res.json();
        if(data.length===0)hasMore=false;
        else {
            const names=data.map(item=>item.username);
            oldFollowers.push(...names);
        }
    }
    return oldFollowers;
}
async function nowFollower(username){
    let page=1;
    let hasMore=true;
    const nowFollowers=[];
    while(hasMore){
        const res=await fetch(`https://scratch.mit.edu/users/${username}/followers/?page=${page}`);
        if(!res.ok){
            if(page!==1)return nowFollowers;
            else throw new Error("User not found");
        }
        const html=await res.text();
        const parser=new DOMParser();
        const doc=parser.parseFromString(html,"text/html");
        
        const users=[...doc.querySelectorAll("span.title > a")].map(el=>el.textContent.trim());
        if(users.length===0)hasMore=false;
        nowFollowers.push(...users);
        page++;
        if(page>1000)hasMore=false;
    }
    return nowFollowers;
}