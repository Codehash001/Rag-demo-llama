import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VectorStoreIndex } from "llamaindex";
import { storageContextFromDefaults } from "llamaindex/storage/StorageContext";
import { getDocuments } from '../chat/engine/loader';
import { initSettings } from "../chat/engine/settings";
import { STORAGE_CACHE_DIR } from "../chat/engine/shared";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'File is missing' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.split('.')[0]; // Remove file extension
  const directoryPath = path.join(process.cwd(), 'data', fileName);
  const filePath = path.join(directoryPath, file.name);

  const cacheDirPath = path.join(process.cwd(), 'cache', fileName);

  try {
    // Create the cache directory if it doesn't exist
    await fs.promises.mkdir(cacheDirPath, { recursive: true });

    // Create the directory if it doesn't exist
    await fs.promises.mkdir(directoryPath, { recursive: true });
    
    // Write the file
    await fs.promises.writeFile(filePath, buffer);
    
    // Process the uploaded file
    await processUploadedFile(directoryPath, fileName);

    return NextResponse.json({ 
      message: 'File uploaded and processed successfully',
      path: `/data/${fileName}/${file.name}`
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}

async function getRuntime(func: () => Promise<void>) {
  const start = Date.now();
  await func();
  const end = Date.now();
  return end - start;
}

async function processUploadedFile(uploadedFilePath: string, cacheFileName: string) {
  initSettings();

  console.log(`Generating storage context...`);
  const ms = await getRuntime(async () => {
    const storageContext = await storageContextFromDefaults({
      persistDir: `./cache/${cacheFileName}`,
    });
    const documents = await getDocuments(uploadedFilePath);
    await VectorStoreIndex.fromDocuments(documents, {
      storageContext,
    });
  });
  console.log(`Storage context successfully generated in ${ms / 1000}s.`);
}
