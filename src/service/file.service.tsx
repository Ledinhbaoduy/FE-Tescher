 import { API_FILE } from "../constants/api.constants";
import { Image } from "../models/common.model";
import { Observable } from "rxjs";
import AppService from './app.service';
import axios from 'axios';
// export const uploadImage = async (image: Image, callback: (response: any) => void) => {
//     let url = FILE_API.ADD_IMAGE;
//     let formData = new FormData();
//     formData.append('file', image.file)
//     formData.set('foreignId', image.foreignId);
//     return callback(await post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }));
// }

// export const deletePhoto = async (file: any, callback: (response: any) => void) => {
//     return callback(await post(FILE_API.DELETE_PHOTO, { id: file.id }));
// }
