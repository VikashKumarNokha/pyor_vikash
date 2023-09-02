
 
 export function Datefun(timestamp) {
   // const timestamp = 1662163200000; // Unix timestamp in milliseconds
    const date = new Date(timestamp);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
    
}

