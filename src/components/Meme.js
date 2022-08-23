import React, { useEffect, useState } from 'react'

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevState => ({
            ...prevState,
            randomImage: url,
            topText: "",
            bottomText: ""
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    return (
        <main>
            <div className="form">
                <input
                    className='form--input'
                    type="text"
                    placeholder='Top text'
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    className='form--input'
                    type="text"
                    placeholder='Bottom text'
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className='form--button'
                    onClick={getMemeImage}>
                    Get a new meme image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme