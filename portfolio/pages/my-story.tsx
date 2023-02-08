import Head from "next/head";
import classes from "@/styles/pages/Home.module.scss";

export default function Images() {
  return (
    <>
      <Head>
        <title>My story</title>
        <meta
          name="description"
          content="A summary of my journey from soldier to software engineer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.container}>
        <h1>This is my story</h1>
        <article>Lorem ipsumn</article>
      </main>
    </>
  );
}
