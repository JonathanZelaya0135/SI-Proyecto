import './TransparentButton.css';

export default function TransparentIconButton({ handleClick, text, icon }) {
    if(text == null){
        return(
        <button className="icon-only" onClick={handleClick}>
            <span className="material-icons">{ icon }</span>
        </button>
        )
    }
  return (
    <button className="transparent-button" onClick={handleClick}>
        <span className="material-icons">{ icon }</span>
        { text }
    </button>
  );
}