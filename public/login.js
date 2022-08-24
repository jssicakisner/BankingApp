function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errEmail, seterrEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errPassword, seterrPassword] = React.useState('');
    const [data, setData] = React.useState({});

    function valEmail(email) {
        let email1 = document.getElementById('email').value;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email1)) {
        seterrEmail('Please enter an email');
        console.log('email error');
        return false;
        } else return true;
    };

    function logg() {
        valEmail(email);
        if (!valEmail()) {
            setTimeout(() => {
                seterrEmail('');
                },5000
            );
        } else {
        const url = `/account/login/${email}/${password}`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          setData(data);
        })();
        } console.log('Hello ' + email);
        setShow(false);
    };

    return(
       <Card
        bgcolor="dark"
        header="Log In"
        status={status}
        body={show ? (
            <>
            Email<br/>
                <input type='input' className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                <div style={{color: 'red'}}>{errEmail}</div><br/>
            Password<br/>
                <input type="input" className="form-control" id="password" value={password} placeholder="Enter Password" onChange={e => setPassword(e.currentTarget.value)} />
                <div style={{color: 'red'}}>{errPassword}</div>
                <br/>
            <button disabled={!email || !password} onClick={logg}>Log In</button><br/>
            </>
         ):(
            <>
            <h5>Success! You are now logged into your account.</h5>
            <a id="link" title="BadBank Home Page" href="/">
                <button>Continue</button>
            </a>
            </>
        )}/>
    )
};