import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <main className='container min-vh-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='display-1'>Homepage</h1>
            <p className='lead'>Express, React and Routing Combined!</p>
            <Link to='/about' className='btn btn-primary px-3 py-1 fs-3'>Learn More &gt;</Link>
        </main>
    );
}

export default Homepage;