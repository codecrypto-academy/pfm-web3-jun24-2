import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/logo2.png" />{" "}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          />
          {/* <link rel="icon" type="image/png" sizes="32x32" href="/logo2.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo2.png" />
          <link rel="shortcut icon" href="/logo2.png" /> */}
          <title>HeroChain</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
