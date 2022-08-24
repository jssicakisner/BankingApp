function userProfile() {
    const [show, setShow] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [data, setData] = React.useState({});
    const [errPassword, seterrPassword] = React.useState('');

    React.useEffect(() => {
        fetch(`/account/loggedin`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(data);
            setEmail(data.email);
          });
      }, []);

    let status = `Hello ${data.name},`;

    function valPassword(password){
        let password1 = document.getElementById('password').value;
        if(!password1) {
            seterrPassword("Field Required");
            return true;
        } else if (password1.length < 8) {
            seterrPassword("Minimum 8 characters");
            return true;
        } else return false;
    };

    const profile = () => {
        valPassword(password);
        if (!!valPassword()) {
            setTimeout(() => {
                seterrPassword('');
            }, 5000
            );
        } else {
            console.log('Password successfully changed.');
            const url = `/account/profile/${email}/${password}`;
            (async () => {
              var res = await fetch(url);
              var data = await res.json();
            })();
            setShow(false);
        };
    };
    
    return(
       <Card
        bgcolor="dark"
        header={status}
        body={show ? (
            <>
            Change your password here.<br/>
            New Password<br/>
                <input type="input" className="form-control" id="password" value={password} placeholder="Enter Password" onChange={e => setPassword(e.currentTarget.value)} />
                <div style={{color: 'red'}}>{errPassword}</div><br/>
                <button disabled={!password} onClick={profile}>Update</button>
            </>
            ):(
            <>
                <h5>Password updated!</h5>
            </>
        )}/>
    );
};