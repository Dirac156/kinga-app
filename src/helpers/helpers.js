


export const isObjectEmpty = (obj) => {
    try {
        const keys = Object.keys(obj);
        if ( keys.length ) return false;
        return true;
    }catch(err){
        console.log(err);
        return true;
    }
}