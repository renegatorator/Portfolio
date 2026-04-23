import type { DocumentContext, DocumentInitialProps } from 'next/document';
import { Head, Html, Main, NextScript } from 'next/document';

import { themeInitScript } from '@/utils/themeUtils';

const Document = ({ locale }: { locale: string }) => {
  return (
    <Html lang={locale || 'en'} data-theme="dark">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

Document.getInitialProps = async (
  ctx: DocumentContext,
): Promise<DocumentInitialProps & { locale: string }> => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  return {
    ...initialProps,
    locale: ctx.locale || 'en',
  };
};

export default Document;
