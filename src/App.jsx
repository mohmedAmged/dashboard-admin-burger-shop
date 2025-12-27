import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router-dom"
import { Token } from "./functions/Token"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
function App() {
  console.log(Token);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main>

        <Routes>
          {
            // secure routes with token
            Token ?
              <Route path="/*" element={<Home />} />
              :
              <Route path="*" element={<SignIn />} />
          }
        </Routes>


      </main>
    </>
  )
}

export default App
