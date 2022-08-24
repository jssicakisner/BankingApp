function Home() {
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        fetch(`/account/loggedin`)
          .then(response => response.json())
          .then(data => {
            setData(data);
          });
      }, []);

    let name = data.name || 'there';
    let status = `Hello ${name},`;

    return(
        <Card
            bgcolor="success"
            txtcolor="black"
            header={status}
            title="Welcome to the"
            text="BankingApp Home Page"
            body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
            />
    );
};