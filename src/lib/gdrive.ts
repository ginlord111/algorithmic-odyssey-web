import fs from 'fs';
import path from 'path';
import { google as GdriveApi } from 'googleapis';

// Google OAuth setup (same as before)
const oAuth2Client = new GdriveApi.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GDRIVE_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.NEXT_PUBLIC_GDRIVE_REFRESH_TOKEN,
});
const drive = GdriveApi.drive({
  version: 'v3',
  auth: oAuth2Client,
});

// Helper function to handle file upload and Google Drive upload
export async function uploadGdrive(fileName: string, mimeType: string, fileBuffer: NodeJS.ArrayBufferView ) {
  try {
    const tmpDir = '/tmp'; // Use the provided /tmp directory in Vercel
    const tempFilePath = path.join(tmpDir, fileName);

    // Write the buffer to the /tmp directory
    fs.writeFileSync(tempFilePath, fileBuffer) ;

    // Upload to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType,
      },
      media: {
        mimeType,
        body: fs.createReadStream(tempFilePath),
      },
    });

    const fileId = response.data.id as string;
    console.log(response.data.id, "RESPONSE DATA ID");

    // Set permissions
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Get the file's web links
    const result = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });

    return {
      fileUrl: result.data.webViewLink,
      fileUrlDownload: result.data.webContentLink,
    };
  } catch (error) {
    console.log(error, "ERROR");
  }
}