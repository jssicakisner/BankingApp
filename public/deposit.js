function Deposit() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState('');
    const [balance, setBalance] = React.useState();
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

    let header = `Hello ${data.name}, please make a deposit`;
    let email = data.email;

    function validate(deposit){
        if (deposit <= 0) {
            setStatus('Please deposit a positive value');
            setTimeout(() => setStatus(''), 3000);
            return false;
        } if (!/^[0-9\.\b]+$/.test(deposit)) {
            setStatus('Please enter a Number');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    };

    function handleDeposit() {
        if (!validate(deposit)) return;
        let amount = Number(balance) + Number(deposit);
        console.log('Deposit of ' + deposit + ' made.');
        const url = `/account/update/${email}/${amount}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
        setBalance(amount);
        setShow(false);
    };

    function clearForm(){
        setDeposit('');
        setShow(true);
    };

    return(
        <Card
            bgcolor="success"
            header={header}
            status={status}
            body={show ? (
                <>
                    Balance:
                    <div key="balance" className="balance" id="balance" value={balance}>{balance}</div><br />
                    Deposit<br />
                    <input type="input" className="form-control" id="deposit" placeholder="0" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br />
                    <button disabled={!deposit} type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
                </>
            ):(
                <>
                    Balance:
                    <div key="balance" className="balance" id="balance" value={balance}>{balance}</div><br />
                    Deposit<br />
                    <h5>Your deposit has been made.</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}> Make Another Deposit</button>
                </>
            )} />
    )
};