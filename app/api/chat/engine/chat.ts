import { ContextChatEngine, Settings, RetrieverQueryEngine } from "llamaindex";
import { getDataSource } from "./index";

export async function createChatEngine(filename:string) {
  const index = await getDataSource(filename);
  if (!index) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`,
    );
  }
  const retriever = index.asRetriever();
  retriever.similarityTopK = process.env.TOP_K
    ? parseInt(process.env.TOP_K)
    : 3;
  

  return new ContextChatEngine({
    chatModel: Settings.llm,
    retriever,
  });
}
