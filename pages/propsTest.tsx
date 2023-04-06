import Head from "next/head";
import Layout from "../components/layout";
import ParentComponent from "../components/Props_test/ParentComponent";

export default function propsTest() {
    return (
        <Layout>
            <Head>
                <title>propsTest</title>
            </Head>
            <div>
                <h1>propsTest</h1>
                <ParentComponent />
            </div>
        </Layout>
    );
}
