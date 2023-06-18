import type { CheerioAPI, load as LoadT } from 'cheerio';
import { Document } from 'langchain/document';
import { BaseDocumentLoader } from 'langchain/document_loaders';
import type { DocumentLoader } from 'langchain/document_loaders';
import { CheerioWebBaseLoader } from 'langchain/document_loaders';

export class CustomWebLoader
  extends BaseDocumentLoader
  implements DocumentLoader
{
  constructor(public webPath: string) {
    super();
  }

  static async _scrape(url: string): Promise<CheerioAPI> {
    const { load } = await CustomWebLoader.imports();
    const response = await fetch(url);
    const html = await response.text();
    return load(html);
  }

  async scrape(): Promise<CheerioAPI> {
    return CustomWebLoader._scrape(this.webPath);
  }

  async load(): Promise<Document[]> {
    const $ = await this.scrape();
    const title = $('h1').text();
    // const title = $('title').text();
    // const date = $('meta[property="article:published_time"]').attr('content');
    //const price = $('.mensalidade').children('p:eq(2)').text() ?? 0;
    //remova o ultimo asterisco da variavel $price e coloque o valor em $price
    const oldprice = $('.mensalidade').children('p:eq(1)').text() ?? 0;
    const newprice = $('.mensalidade').children('p:eq(2)').text().replace(/\*/g, '') ?? 0;
    // const price = $('p.mensalidade') ?? 0;
    // console.log("price: ", oldprice);

    const content = $('.section-courses-grad')
      .clone()
      .find('div.elementor, style, script, h3.titulo-form-inscricao, .legend-form')
      .remove()
      .end()
      .text();
    // const content = $('.section-courses-grad').text();

    const cleanedContent = content.replace(/\s+/g, ' ').trim();

    const contentLength = cleanedContent?.match(/\b\w+\b/g)?.length ?? 0;

    const metadata = { source: this.webPath, title, oldprice, newprice, contentLength };

    return [new Document({ pageContent: cleanedContent, metadata })];
  }

  static async imports(): Promise<{
    load: typeof LoadT;
  }> {
    try {
      const { load } = await import('cheerio');
      return { load };
    } catch (e) {
      console.error(e);
      throw new Error(
        'Please install cheerio as a dependency with, e.g. `yarn add cheerio`',
      );
    }
  }
}
