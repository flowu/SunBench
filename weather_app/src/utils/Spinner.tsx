import Spinner from 'react-bootstrap/Spinner';

function BrotatingSpinner() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">AntonKingen...</span>
    </Spinner>
  );
}

export default BrotatingSpinner;