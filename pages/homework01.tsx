import Head from "next/head";
import Link from "next/link";
import Layout from '../components/layout';
import index from "../styles/index.module.scss";
export default function homework01() {
    return (
        <Layout>
            <Head>
                <title>Homework 01</title>
            </Head>
            <div className={`${index.App}`} >
                <h1>homework01</h1>
                <Link href="/">
                    Home
                </Link>
            </div>
        </Layout>
    )
}
