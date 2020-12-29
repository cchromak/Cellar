const express = require('express');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')



 let streamUpload = (type,file) => {
    console.log(file)
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream( {folder: type},
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

       streamifier.createReadStream(file.buffer).pipe(stream);
    });
};
 let uload =async function upload(type,file) {
    let result = await streamUpload(type,file);
    return (result);
}
let del= async function del(id) {
    let result= await cloudinary.uploader.destroy(id,function(result) { console.log(result) });
   
}

module.exports.upload = uload;
module.exports.delete=del;


