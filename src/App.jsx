import { useState } from 'react'
import './App.css'
import { QRCodeSVG } from "qrcode.react";

function App() {
  const [urlOrText, setUrlOrText] = useState("")
  const [genQRCode, setGenQRCode] = useState(false)

  function handleSubmit(e){
    e.preventDefault()

    if(!urlOrText){
      document.getElementById("message").innerHTML = "Provide some URL or text"
      return
    }

    setGenQRCode(true)
  }

  function handleDownload(){
    const canvas = document.getElementById("qr-code-url")
    const pngURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    const downLink = document.createElement("a")
    downLink.href = pngURL
    downLink.download = urlOrText + ".png"
    document.body.appendChild(downLink)
    downLink.click()
    document.body.removeChild(downLink)
  }

  function handleFormChange(e){
    setGenQRCode(false)
    document.getElementById("message").innerHTML = "";
    setUrlOrText(e.target.value)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <p id="message"></p>
        <input type="text" onChange={handleFormChange} />
        <input type="submit" value="Generate QR code" />
        {genQRCode && (
          <>
            <div>
              <QRCodeSVG value={urlOrText} id="qr-code-url" />
            </div>
            <input type="button" onClick={handleDownload} value="Download as png"/>
          </>
        )}
      </form>
    </div>
  );
}

export default App
