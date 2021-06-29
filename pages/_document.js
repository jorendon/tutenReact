import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="Tuten Labs Website"/>
                    <title>Tuten Labs Website</title>
                    {/* Nprogress css */}
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css"
                    />
                    <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
                    </link>
                    <link rel="icon" type="image/png" sizes="32x32" href="/logo-tutenlabs.png"/>
                </Head>
                <body>

                
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
