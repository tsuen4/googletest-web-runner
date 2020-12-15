const React = require('react')

function DefaultLayout (props) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="none" />
                <title>{props.title}</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js"></script>
            </head>
            <body>{props.children}</body>
        </html>
    )
}

module.exports = DefaultLayout