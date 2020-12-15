const React = require('react')
const DefaultLayout = require('./default')

function FileSelect (props) {
    // const [uuidv4, setuuidv4] = useState(props.uuidv4)
    const acceptType = props.acceptType.join(', ')
    const fileInput = React.createRef()

    function postData (e) {
        e.preventDefault()
        console.log('aaa')
        console.log(fileInput)
        alert(fileInput.current.files[0])
        // const resultElement = document.getElementById('result')
        // const submitButton = document.getElementById('submit')
        // resultElement.textContent = '処理中…'
        // submitButton.disabled = true

        // サーバーにファイルを送信
        // const form = document.getElementById('submit-form')
        const formData = new FormData(fileInput)
        axios.post('/run', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            const result = res.data
            resultElement.innerText = result
        }).catch(err => {
            const result = err.response.data
            resultElement.innerText = result
        }).finally(() => {
            submitButton.disabled = false
        })
    }

    return (
        <form>
            <input type="hidden" name="uuidv4" value={props.uuidv4} />
            <input type="file" name="codes" ref={fileInput} accept={acceptType} multiple required />
            <button type="button" onClick={postData}>送信</button>
        </form>
    )
}

function UploadPage (props) {
    return (
        <DefaultLayout title={props.title}>
            <h1>{props.title}</h1>
            <p>GoogleTest で書かれたプログラムがビルドできます。</p>
            <ul>
                <li>それぞれ 10 KB までの C++ ソースコード(*.cpp, *.h, *.hpp)に対応しています</li>
                <li>次のコマンドでビルドしています<ul>
                    <li>
                        <code>g++ ファイル名 -pthread -lgtest -lgtest_main</code>
                    </li>
                </ul>
                </li>
            </ul>
            <FileSelect
                acceptType={['.cpp', '.h', '.hpp']}
                uuidv4={props.uuidv4}
            />
            <pre id="result">実行結果はここに出力されます。</pre>
            {/* <script>
                axios.get('/uuid').then(res => {
            const uuidv4 = res.data
            document.querySelector("input[name='uuidv4']").attributes['value'].value = uuidv4
        })

        function run() {
            const resultElement = document.getElementById('result')
            const submitButton = document.getElementById('submit')
            resultElement.textContent = '処理中…'
            submitButton.disabled = true

            // サーバーにファイルを送信
            const form = document.getElementById('submit-form')
            const formData = new FormData(form)
            axios.post('/run', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                const result = res.data
                resultElement.innerText = result
            }).catch(err => {
                const result = err.response.data
                resultElement.innerText = result
            }).finally(() => {
                    submitButton.disabled = false
                })
        }
        </script> */}
        </DefaultLayout>
    )
}

module.exports = UploadPage