

export function generate(){
    let ret="";
    const subset="253sfasg28saajhbr135v23g";

    for(let i=0;i<5;i++){
        ret+=subset[Math.floor(Math.random()*subset.length)];
    }

    return ret;
}

export {};