import { SimpleDirectoryReader } from "llamaindex/readers/SimpleDirectoryReader";

export const DATA_DIR = "./data";

export async function getDocuments(filePath:string) {
  return await new SimpleDirectoryReader().loadData({
    directoryPath: filePath,
  });
}
