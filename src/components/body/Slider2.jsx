import React from 'react'
import movieTrailer from "movie-trailer"

const Slider2 = (props) => {
    return (
        <div>
            <div>
                <img src={props.janvi} alt="" 
                title = {props.nameMovie}
                onClick={()=>{
                    console.log("clicked")
                    console.log(props.nameMovie)
                    movieTrailer(props.nameMovie).then((url) => {
                        for (let i = 0; i < url.length; i++) {
                            if (url[i] == "=") {
                                localStorage.setItem("currentMovieUrl", url.slice(i + 1, url.length) )
                            }
                        }
                    }).then(()=>{
                        localStorage.setItem("clickCheck", "yes")
                    })
                }} />
            </div>
        </div>
    )
}

export default Slider2
