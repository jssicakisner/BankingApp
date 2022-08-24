function Logout() {
    const [show, setShow] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        fetch(`/account/loggedin`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(data);
            setEmail(data.email);
            setPassword(data.password);
          });
      }, []);

    let status = `Hello ${data.name}`;

    const logout = () => {
        const url = `/account/logout/${email}/${password}`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
        })();
        setShow(false);
        };

    return(
       <Card
        bgcolor="secondary"
        header={status}
        body={show ? (
            <>
              <h5>Click here to log out</h5>
              <button onClick={logout}>Log Out</button><br />
            </>
         ):(
            <>
              <h5>Success! You are now logged out of your account.</h5>
              <a id="link" title="BadBank Home Page" href="/">
                  <button>Continue</button>
              </a>
            </>
        )}/>
    );
};