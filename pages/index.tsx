import Link from "next/link";
import Head from "next/head";
import Layout from '../components/layout';
import index from "../styles/index.module.scss";


function HomePage() {
    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div className={`${index.App}`} >
                <h1>Home</h1>
                <Link href="/homework01">
                    Homework 01
                </Link>
                <Link href="/homework02">
                    Homework 02
                </Link>
                <Link href="/homework03">
                    Homework 03
                </Link>
                <Link href="/homework04">
                    Homework 04
                </Link>
                <Link href="/homework05">
                    Homework 05
                </Link>
            </div>
        </Layout>
    )
}

export default HomePage