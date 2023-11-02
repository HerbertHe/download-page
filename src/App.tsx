import { useEffect, useState } from "react"

import "./App.css"
import { QueryData } from "./fn/query"

const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        QueryData().then((res) => console.log(res))
    }, [])

    return (
        <div className="App">
            <header>
                <div className="font-thin text-2xl">Download @ dl.ibert.me</div>
            </header>

            <main>
                {/* 在此生成不同的项目订阅 */}
            </main>

            <footer className="self-center text-dark-600">
                Copyright &copy; Herbert He @ https://dl.ibert.me All Rights
                Reserved!
            </footer>
        </div>
    )
}

export default App
