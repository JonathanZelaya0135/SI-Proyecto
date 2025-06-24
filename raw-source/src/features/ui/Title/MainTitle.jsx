import './MainTitle.css'

export default function MainTitle({ title, icon }){
    return(
        <div className="title-container">
            <span id='main-icon' className="material-icons">{ icon }</span>
            <h1 className="main-title">{ title }</h1>
        </div>
    )
}