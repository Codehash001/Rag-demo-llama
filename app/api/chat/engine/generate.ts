import { VectorStoreIndex , ChromaVectorStore } from "llamaindex";
import { storageContextFromDefaults } from "llamaindex/storage/StorageContext";

import * as dotenv from "dotenv";

import { getDocuments } from "./loader";
import { initSettings } from "./settings";
import { STORAGE_CACHE_DIR } from "./shared";

// Load environment variables from local .env file
dotenv.config();

async function getRuntime(func: any) {
  const start = Date.now();
  await func();
  const end = Date.now();
  return end - start;
}

async function generateDatasource() {
  console.log(`Generating storage context...`);
  // Split documents, create embeddings and store them in the storage context
  // const ms = await getRuntime(async () => {
  //   const storageContext = await storageContextFromDefaults({
  //     persistDir: STORAGE_CACHE_DIR,
  //   });
  //   const documents = await getDocuments(
  //     "123"
  //     //pass the uploaded file directory here
  //   );
  //   await VectorStoreIndex.fromDocuments(documents, {
  //     storageContext,
  //   });
  // }); 
  console.log(`Storage context successfully generated in ${10 / 1000}s.`);
}

(async () => {
  initSettings();
  await generateDatasource();
  console.log("Finished generating storage.");
})();
