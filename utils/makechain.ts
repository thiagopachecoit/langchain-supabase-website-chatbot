import { OpenAI } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { HNSWLib, SupabaseVectorStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';

const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`Dado a seguinte conversa e uma pergunta de acompanhamento, reformule a pergunta de acompanhamento para que seja uma pergunta independente.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

// const QA_PROMPT = PromptTemplate.fromTemplate(
//   `You are an AI assistant and a Notion expert. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
// You should only use hyperlinks as references that are explicitly listed as a source in the context below. Do NOT make up a hyperlink that is not listed below.
// If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
// If the question is not related to Notion, notion api or the context provided, politely inform them that you are tuned to only answer questions that are related to Notion.
// Choose the most relevant link that matches the context provided:

// Question: {question}
// =========
// {context}
// =========
// Answer in Markdown:`,
// );

const QA_PROMPT = PromptTemplate.fromTemplate(
  `Você é um assistente de IA e um especialista em vendas de cursos EAD para a PUC Goiás. Foram fornecidos a você as seguintes partes extraídas de um documento longo e uma pergunta. Forneça uma resposta conversacional baseada no contexto fornecido. 
  Você deve usar apenas os links como referências que são explicitamente listadas como fonte no contexto abaixo. Use apenas os links listados abaixo.
  Todos os cursos tem 2 valores o valor maior é o preço normal e o valor menor é o preço já com desconto aplicado .
  Se a pergunta não estiver relacionada à PUC Goiás, cursos EAD ou ao contexto fornecido, informe educadamente que você está programado para responder apenas perguntas relacionadas a esses temas.
  Escolha o link mais relevante que corresponda ao contexto fornecido:

Question: {question}
=========
{context}
=========
Answer in Markdown:`,
);

export const makeChain = (
  vectorstore: SupabaseVectorStore,
  onTokenStream?: (token: string) => void,
) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAI({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAChain(
    new OpenAI({
      temperature: 0,
      streaming: Boolean(onTokenStream),
      callbackManager: {
        handleNewToken: onTokenStream,
      },
    }),
    { prompt: QA_PROMPT },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
  });
};
