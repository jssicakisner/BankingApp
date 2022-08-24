function AllData(){
    const [data, setData] = React.useState('');
  
    React.useEffect(() => {
      fetch(`/account/all`)
        .then(response => response.json())
        .then(data => {
          setData(JSON.stringify(data));
        });
    }, []);
  
    return (<>
      <h3>All Data</h3>
      <h9>{data}</h9>
      </>
    );
  };