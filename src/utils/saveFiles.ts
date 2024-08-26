import multer from 'multer';
export async function saveFile(){
    try {
        const storage = multer.diskStorage({
            destination: '/uploads', // Directory where the files will be saved
            filename: (req, file, cb) => {
              cb(null,file.originalname); // Save with a timestamp to avoid duplicates
            },
          });
    
          const upload = multer({ storage: storage });
    
          if(upload){
            return {message:"Success"}
          }
          return  
    } catch (error) {
        console.log(error)
    }
}