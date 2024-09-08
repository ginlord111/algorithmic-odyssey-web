import { google as GdriveApi } from "googleapis";
import fs from "fs"
import path from "path";
const oAuth2Client = new GdriveApi.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GDRIVE_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.NEXT_PUBLIC_GDRIVE_REFRESH_TOKEN,
});
const drive = GdriveApi.drive({
  version: "v3",
  auth: oAuth2Client,
});
export async function uploadGdrive(fileName:string,mimeType:string) {
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const filePath = path.join(uploadsDir, fileName);
        const response = await drive.files.create({
            requestBody:{
                name:fileName,
                mimeType,
            },
            media:{
                mimeType,
                body:fs.createReadStream(filePath),
            
            }
        });
        const fileId= response.data.id as string
        console.log(response.data.id, "RESPONSE DATA ID")
        await drive.permissions.create({
          fileId,
          requestBody:{
            role:"reader",
            type:"anyone"
          }

        })
        const result = await drive.files.get({
          fileId,
          fields:"webViewLink, webContentLink"
        })
        return {
          fileUrl:result.data.webViewLink,
          fileUrlDownload:result.data.webContentLink,
        }
    } catch (error) {
        console.log(error, "ERROR")
    }
}
