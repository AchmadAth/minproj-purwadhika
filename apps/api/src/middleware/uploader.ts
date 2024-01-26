import { Request } from 'express';
import multer from 'multer';
import { join } from 'path';

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, '../../../web/public');

  const configStorage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) => {
      const fileDestination = folderName ? defaultDir + folderName : defaultDir;
      console.log('FOLDER TUJUAN : ', fileDestination);
      cb(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const originalNameParts = file.originalname.split('.');
      console.log('ORIGINAL FILE NAME : ', originalNameParts);
      const extention = originalNameParts[originalNameParts.length - 1];
      const newName = filePrefix + Date.now() + '.' + extention;
      console.log('NEW FILE NAME :', newName);

      cb(null, newName);
    },
  });
  return multer({ storage: configStorage });
};
