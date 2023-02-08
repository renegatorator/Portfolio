import { Inter } from '@next/font/google';
import Head from 'next/head';
import React, {FC} from 'react';

import classes from '@/styles/pages/Projects.module.scss';

export default function Projects() {
    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name="description" content="Some of my creations" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={classes.container}>
                <div>
                    <h1>My projects</h1>
                </div>
            </main>
        </>
    )
}