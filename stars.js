(function(){
    const createStar=()=>{
        const star=document.createElement("div");
        star.className="star";
        const minSize=1;
        const maxSize=2;
        const size=Math.random()*(maxSize-minSize)-minSize;
        star.style.width=`${size}px`;
        star.style.height=`${size}px`;
        star.style.left=`${Math.random()*100}%`;
        star.style.top=`${Math.random()*100}%`;
        star.style.animationDelay=`${Math.random()*10}s`;
        document.body.appendChild(star);
    }
    
    for(let i=0;i<500;i++){
        createStar();
    }
})()