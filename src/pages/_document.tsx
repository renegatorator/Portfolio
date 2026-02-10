import type { DocumentContext, DocumentInitialProps } from 'next/document';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = ({ locale }: { locale: string }) => {
  return (
    <Html lang={locale || 'en'} data-theme="dark">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

Document.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & { locale: string }> => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  return {
    ...initialProps,
    locale: ctx.locale || 'en',
  };
};

export default Document;
