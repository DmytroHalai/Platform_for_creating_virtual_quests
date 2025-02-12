import { ExtractedFiles } from 'src/constants/types/file/file';

export function extractFiles(files?: Express.Multer.File[]): ExtractedFiles {
  const photoFiles = files?.filter((file) => file.fieldname === 'photo') || [];
  const mediaFiles =
    files?.filter((file) => file.fieldname.startsWith('media')) || [];
  return { photoFiles, mediaFiles };
}

export function sortMediaFiles(
  mediaFiles: Express.Multer.File[],
): Express.Multer.File[] {
  return mediaFiles.sort((a, b) => {
    const indexA = a.fieldname.match(/\[(\d+)\]/)?.[1] ?? '0';
    const indexB = b.fieldname.match(/\[(\d+)\]/)?.[1] ?? '0';
    return Number(indexA) - Number(indexB);
  });
}
