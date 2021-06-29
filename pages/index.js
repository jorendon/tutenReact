import Layout from "../components/Layout";
import {useState} from "react";
import {BootstrapTable, TableHeaderColumn, ExportCSVButton, SearchField} from 'react-bootstrap-table';

const Index = () => {
    const [person, setPerson] = useState({'usuario': '', 'password': ''})
    const [viewAlert, setViewAlert] = useState(false)
    const [viewLogin, setViewLogin] = useState(true)
    const [viewTable, setViewTable] = useState(false)
    const [message, setMessage] = useState('')
    const alertCLose = () => {
        setViewAlert(false);
    }

    const handleExportCSVButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for ExportCSVButton click event');
        onClick();
    }
    const createCustomExportCSVButton = (onClick) => {
        return (
            <ExportCSVButton
                btnText='Down CSV'
                onClick={() => handleExportCSVButtonClick(onClick)}/>
        );
    }
    const createCustomSearchField = (props) => {
        return (
            <SearchField
                className='my-custom-class'
                defaultValue=''
                placeholder='Input a bookingid or bookingPrice '/>
        );
    }
    const options = {
        exportCSVBtn: createCustomExportCSVButton,
        searchField: createCustomSearchField
    };
    const [data, setData] = useState([]);

    const login = async (e) => {
        e.preventDefault()
        console.log(person)

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'App': 'APP_BCK',
                password: person.password
            },
            body: JSON.stringify({email: person.usuario})
        };

        fetch('https://dev.tuten.cl:443/TutenREST/rest/user/testapis%40tuten.cl', requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setViewLogin(false)
                setViewTable(true)
                getDataTable(data.email, data.sessionTokenBck);

            })
            .catch(error => {
                setMessage('Usuario o contraseña incorrecto')
                setViewAlert(true)
            });


    }

    function getDataTable(email, token) {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'App': 'APP_BCK',
                token: token,
                Adminemail: email
            }
        };
        fetch('https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true', requestOptions)
            .then(response => response.json())
            .then(data => {

                const newData = data.map((element) => {

                    return {
                        bookingId: element.bookingId,
                        Cliente: element.tutenUserClient.lastName + ' ' + element.tutenUserClient.firstName,
                        bookingTime: element.bookingTime,
                        streetAddress: element.locationId.streetAddress,
                        bookingPrice: element.bookingPrice
                    }

                })

                setData(newData)
            });
    }

    function handleInputChange(event) {
        setPerson({...person, [event.currentTarget.id]: event.currentTarget.value})
    }


    return (
        <Layout>
            {/* Header Card */}
            <header className="row">
                <div
                    className="col-md-12 animate__animated animate__slideInUp animate__slower text-center text-white">
                    <h2>Tuten</h2>
                </div>
            </header>

            {/* Second section */}
            <section className="row pl-2 justify-content-center align-items-center">
                {viewLogin &&
                <div className="col-lg-6 text-center">
                    {viewAlert && <Alert message={message} handleClose={alertCLose}/>}
                    <div className="col-md-12 py-2 animate__animated animate__fadeInLeft animate__slower text-center ">
                        <form onSubmit={login}>
                            <div className="form-group text-center">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="usuario" name="usuario"
                                           placeholder="name@example.com" onChange={handleInputChange} required
                                           pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"/>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="password" name="password"
                                           placeholder="Password" onChange={handleInputChange} required/>
                                </div>
                                <div className="form-floating">
                                    <button type="submit"
                                            className="btn btn-success btn-md mt-1 mr-md-1">Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>}
                {viewTable &&
                <>
                    <div className="row pl-2 justify-content-right align-items-right">
                        <button type="button" onClick={()=>{
                            setViewTable(false)
                            setViewLogin(true)

                        }}
                                className="btn btn-danger btn-md mt-1 mr-md-1">Logout
                        </button>
                    </div>
                    <div className="card border-secondary mb-2 animate__animated animate__fadeInUp animate__slower"
                         style={{minHeight: 250}}>
                        <div className="card-header  text-primary">Bookings</div>
                        <div className="card-body">
                            <BootstrapTable
                                data={data}
                                pagination striped hover options={options} exportCSV search sort>
                                <TableHeaderColumn dataField='bookingId' isKey dataSort>BookingId</TableHeaderColumn>
                                <TableHeaderColumn dataField='Cliente' dataSort>Cliente</TableHeaderColumn>
                                <TableHeaderColumn dataField='bookingTime' dataSort>Fecha de
                                    Creación</TableHeaderColumn>
                                <TableHeaderColumn dataField='streetAddress' dataSort>Dirección</TableHeaderColumn>
                                <TableHeaderColumn dataField='bookingPrice' dataSort>Precio</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </>}

            </section>

        </Layout>)
};

export function Alert(props) {

    return (<div className="alert alert-dismissible alert-danger">
        <button type="button" className="close" onClick={props.handleClose} data-dismiss="alert">&times;</button>
        <strong>{props.message}</strong>
    </div>)

}

export default Index;
