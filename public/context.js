const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
let loggedin;

function Card(props) {
    const ctx = React.useContext(UserContext);
    function classes(){
        const bg= props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    };

    const log = ctx.users.find((el)=> {
        if(el.value === true) {
           return el;
        }
    });

    function set () {
        if (log === undefined) {
            loggedin = false;
        } else loggedin = true;
    };
    set();

    return(
        <center>
        <div className={classes()} style={{maxWidth: "22rem", marginTop: "20px"}}>
            <div className="card-header">{props.header}</div> 
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<h5 className="card-text">{props.text}</h5>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
            </div>  
        </center> 
    );
};