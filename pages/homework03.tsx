import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/layout'
import index from "../styles/index.module.scss";
export default function homework03() {
    return (
        <Layout>
            <Head>
                <title>Homework 03</title>
            </Head>
            <div className={`${index.App}`} >
                <div>
                    <h1>homework03</h1>
                </div>

                <div>
                    <Link href="/">
                        Home
                    </Link>
                </div>
            </div>
        </Layout>
    )
}