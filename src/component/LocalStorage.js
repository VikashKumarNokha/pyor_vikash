

 export function setlocalfun (key,items){
    localStorage.setItem(key, JSON.stringify(items));
 }

 export function getlocalfun(key){
    const items = JSON.parse(localStorage.getItem(key));
    if(items) {
         return items
       }
 }