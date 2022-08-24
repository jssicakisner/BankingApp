function CreateAccount() {
    const [show, setShow] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errName, seterrName] = React.useState('');
    const [errEmail, seterrEmail] = React.useState('');
    const [errPassword, seterrPassword] = React.useState('');

    function valEmail(value) {
        let email1 = document.getElementById('email').value;
        if (!email1) {
             seterrEmail('Field Required');
             return true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email1)) {
        seterrEmail('Please enter an email');
        return true;
        } else return false;
    };

    function valPassword(value){
        let password1 = document.getElementById('password').value;
        if(!password1) {
            seterrPassword("Field Required");
            return true;
        } else if (password1.length < 8) {
            seterrPassword("Minimum 8 characters");
            return true;
        } else return false;
    };
    
    function valName(value) {
        let name1 = document.getElementById('name').value;
        if(!name1) {
            seterrName("Field Required");
            return true;
        } else return false;
    };

    function handleCreate() {
        valName(name);
        valEmail(email);
        valPassword(password);
        if (!!valName() || !!valEmail() || !!valPassword()) {
            setTimeout(() => {
                seterrName('');
                seterrEmail('');
                seterrPassword('');
            }, 5000
            );
        } else {
            console.log('Account successly created: ' + name + ', ' + email + ', ' + password);
            const url = `account/create/${name}/${email}/${password}`;
            (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
            })();
            setShow(false);
       }};

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    };

    return(
       <Card
            bgcolor="dark"
            header="Create Account"
            body={ show ? (
              <>
              Name <br/>
                  <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} />
                  <div style={{color: 'red'}}>{errName}</div>
              Email Address <br/>
                  <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                  <div style={{color: 'red'}}>{errEmail}</div>
              Password<br/>
                  <input type="input" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e=> setPassword(e.currentTarget.value)} />
                  <div style={{color: 'red'}}>{errPassword}</div>
              <br/> 
              <button disabled={!name && !email && !password} type="submit" className="btn btn-light" id="bttn" onClick={handleCreate}>Create Account</button>
              </>
           ):(
              <>
              <h5>Success! Account Created</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}> Create Another Account</button>
              </>
            )}
        />
    );
};