function Withdraw() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [balance, setBalance] = React.useState();
    const [withdraw, setWithdraw] = React.useState('');
    const [data, setData] = React.useState({});
    
    React.useEffect(() => {
        fetch(`/account/loggedin`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(data);
            setBalance(data.balance);
          });
      }, []);

    let header = `Hello ${data.name}, please make a withdraw`;
    let email = data.email;

    function validate(withdraw){
        if (balance < withdraw) {
            alert ('Inadequate Funds Available');
            return false;
        } if (balance < 0) {
            alert('No funds available.');
            return false;
        } if (withdraw <= 0) {
            setStatus('Please enter a positive value');
            setTimeout(() => setStatus(''), 3000);
            return false;
        } if (!/^[0-9\.\b]+$/.test(withdraw))  {
            setStatus('Enter a Number');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    };

    function handleWithdraw() {
        if (!validate(withdraw)) return;
        let amount = Number(balance) - Number(withdraw);
        setBalance(amount);
        if(amount < 0) {
            setStatus('Your account has been overdrawn.')
        }
        console.log("New Balance: " + amount);
        const url = `/account/update/${email}/${amount}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
        setShow(false);
    };  

    function clearForm(){
        setWithdraw('');
        setShow(true);
    };

    return(
       <Card
        bgcolor="danger"
        header={header}
        status={status}
        body={show ? (
            <>
            Balance: 
            <div key="balance" className="balance" id="balance" value={balance}>{balance}</div><br/>
            Withdraw<br/>
            <input type="input" className="form-control" id="withdraw" placeholder="0" value={withdraw} onChange={e=> setWithdraw(e.currentTarget.value)} />
            <br/>
            <button disabled={!withdraw} type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
            </>
         ):(
            <>
            Balance: 
            <div key="balance" className="balance" id="balance" value={balance}>{balance}</div><br/>
            Withdraw<br/>
            <h5>Your withdraw was successful!</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}> Make Another Withdraw</button>
            </>
        )}
       />
    );
};