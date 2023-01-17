import './Video.css'


function Video(props) {
    return (
        <div>
            <embed className="Video"
                src={"https://www.youtube.com/embed/" + props.video.split("v=")[1]}
                frameborder='0'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title='video' />
        </div>
    )
}

export default Video