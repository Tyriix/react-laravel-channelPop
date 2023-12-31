import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateChannelPop(){
    const navigate = useNavigate();

    const [channelName, setChannelName] = useState("");
    const [population, setPopulation] = useState("");
    const [validationError,setValidationError] = useState({})

    const CreateChannelPop = async (e: any) => {
        e.preventDefault();
        const data = new FormData();

        data.append('channelName', channelName);
        data.append('population', population);

        await axios.post(`http://localhost:8000/api/channels`, data).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
        navigate("/")
    }).catch(({response})=>{
        if(response.status===442)
        setValidationError(response.data.errors)
        else{
            Swal.fire({
                icon:"error",
                text:response.data.message
            })
        }
    })
    }
    return(
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Create Channel</h4>
                <hr />
                <div className="form-wrapper">
                  {
                    Object.keys(validationError).length > 0 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="alert alert-danger">
                            <ul className="mb-0">
                              {
                                Object.entries(validationError).map(([key, value]: any)=>(
                                  <li key={key}>{value}</li>   
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <Form onSubmit={CreateChannelPop}>
                    <Row> 
                        <Col>
                          <Form.Group controlId="ChannelName">
                              <Form.Label>Channel Name</Form.Label>
                              <Form.Control type="text" value={channelName} onChange={(event)=>{
                                setChannelName(event.target.value)
                              }}/>
                          </Form.Group>
                        </Col>  
                    </Row>
                    <Row className="my-3">
                        <Col>
                          <Form.Group controlId="Population">
                              <Form.Label>Population</Form.Label>
                              <Form.Control as="textarea" rows={3} value={population} onChange={(event)=>{
                                setPopulation(event.target.value)
                              }}/>
                          </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" className="mt-2" size="lg" type="submit">
                      Save
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

