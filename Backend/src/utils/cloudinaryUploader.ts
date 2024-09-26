import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
// Configure Cloudinary with environment variables
const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

 cloudinary.config(cloudinaryConfig);

// single image upload function
export async function uploadImage(image: string) {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image,
        {transformation:[
            {   aspect_ratio: '1.0',
                folder:'equipment',
                width: 500,
                crop: 'fill',}
              ]});
    
    
    console.log(`Successfully uploaded ${image}`);
    console.log(`> Result: ${result.secure_url}`);
    
    return result.secure_url;
    
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}


//multiple image upload function
const images=[
   'https://img.freepik.com/free-photo/still-life-yoga-equipment_23-2151725283.jpg?t=st=1727268975~exp=1727272575~hmac=89020842261e61ee8d4530841cb187a15b4c58c5123d8519df425c1e41d8508e&w=1380',
  'https://img.freepik.com/free-psd/top-view-dumbbells-isolated_23-2151849396.jpg?w=740&t=st=1727269417~exp=1727270017~hmac=078400cda910c2030f9bd334ffcff477e9636101da1d73ab11df1bc3ba36e04a',
  'https://img.freepik.com/free-psd/top-view-dumbbells-isolated_23-2151849458.jpg?w=826&t=st=1727270234~exp=1727270834~hmac=82101e352a5c0932355127c7ba42c4cca54c47f20ea4599228d92e7d675a6826'

]

export async function uploadMultipleImages() {
for(const image of images){
    try {
        const result = await cloudinary.uploader.upload(image,
            {transformation:[
            {   aspect_ratio: '1.0',
                folder:'equipment',
                width: 500,
                crop: 'fit',}
              ]});
        
        console.log(`Successfully uploaded ${image}`);
        console.log(`> Result: ${result.secure_url}`);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
    }
}