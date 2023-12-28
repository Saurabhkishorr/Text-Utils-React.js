import React, { useState } from 'react'

export default function TextForm(props) {
  
  const handleupclick = () => {
    let newtext = text.toUpperCase();
    settext(newtext);
    props.showalert('Converted to Uppercase!', 'success')
  }
  const handledownclick = () => {
    let newtext = text.toLowerCase();
    settext(newtext);
    props.showalert('Converted to Lowercase!', 'success')
  }

  const handleonchange = (e) => {
    settext(e.target.value)
    setMystyle({
      display: "none"
    })
    setSentencetext(``)
  }

  const handlesentence = () => {
    let number = parseInt(text.split(/\.|!/).filter((word) => { return word.length !== 0 }).length);
    setSentencetext(`${number} sentences`)
    props.showalert('Sentences Counted!', 'success')
  }
  const handlecleartext = () => {
    settext("");
    setSentencetext(``)
    props.showalert('Text Cleared!', 'success')
  }
  const handlecopytext = () => {
    navigator.clipboard.writeText(text);
    props.showalert('Text Copied!', 'success')
  }

  const handleExtraspaces = () => {
    let newtext = text.split(/[ ]+/);
    settext(newtext.join(" "));
    props.showalert('Extraspaces Removed!', 'success')
  }

  const handlefirstUpword = () => {
    const capitalize = (text) => {

      const words = text.split(" ");
      const capitalizedWords = words.map(word => {
        if (word.length > 0) { 
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word; 
        }
      });
      return capitalizedWords.join(" ")
    }
  
    const result = capitalize(text)
    settext(result);
  }

  const [text, settext] = useState("");
  const [mystyle, setMystyle] = useState({
    display: "none"
  })

  const [sentencetext, setSentencetext] = useState("");



  const togglestyle = () => {
    if (mystyle.display === "block") {
      setMystyle({
        display: "none"
      })

    }
    else {
      setMystyle({
        display: "block"
      })

    }
  }
  return (
    <>
      <div className="container">
        <h1 className={`text-${props.mode === 'light' ? 'dark' : 'light'} mb-4`}>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : '#fff', color: props.mode === 'dark' ? '#fff' : 'black' }} value={text} onChange={handleonchange} id="mybox" rows="8"></textarea>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handleupclick}>Convert to uppercase</button>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handledownclick}>Convert to lowercase</button>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handlesentence}>Number of sentences</button>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handleExtraspaces}>Remove Extra space</button>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handlecopytext}>copy text</button>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handlecleartext}>clear text</button>
          <button type="button" disabled={text.length === 0} className="btn btn-primary my-3 mx-1" onClick={handlefirstUpword}>Convert first character of word to Uppercase</button>
        </div>
      </div>
      <div className={`container text-${props.mode === 'light' ? 'dark' : 'light'}`}>
        <h2>Your text summary</h2>
        <p>{text.length} characters and {text.split(/\s+/).filter((word) => { return word.length !== 0 }).length} words</p>
        <p>{0.008 * text.split(" ").filter((word) => { return word.length !== 0 }).length} minutes to read</p>
        <h2>{sentencetext}</h2>
        <button type="button" className="btn btn-success mt-3 my-2" onClick={togglestyle}>Preview</button>
        <p style={mystyle}>{text.length > 0 ? text : "Nothing  preview"}</p>
      </div>
    </>
  )
}


