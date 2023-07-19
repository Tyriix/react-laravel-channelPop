import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import {Navbar, Container, Row, Col} from "react-bootstrap";
import CreateChannelPop from './components/channelPop/create.component';
import List from './components/channelPop/list.component';
import UpdateChannel from './components/channelPop/update.component';
function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Recruitment Task
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/channel/create" element={<CreateChannelPop />} />
            <Route path='/channel/update/:id' element={<UpdateChannel/>} />
            <Route path='/' element={<List />}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
