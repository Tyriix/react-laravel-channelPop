/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateChannel(){
    const navigate = useNavigate();

    const {id} = useParams();
    const [channelName, setChannelName] = useState("")
    const [population, setPopulation] = useState("")
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchProduct()
      }, []);
    
      const fetchProduct = async () => {
        await axios.get(`http://localhost:8000/api/channels/${id}`).then(({data})=>{
           const { channelName, population } = data.channel
           console.log(data)
           setChannelName(channelName)
           setPopulation(population)
        }).catch(({response:{data}})=>{
          Swal.fire({
            text:data.message,
            icon:"error"
          })
        })
      }
      const updateChannel = async (e: any) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('channelName', channelName)
        formData.append('population', population)
    
        await axios.post(`http://localhost:8000/api/channels/${id}`, formData).then(({data})=>{
          Swal.fire({
            icon:"success",
            text:data.message
          })
          navigate("/")
        }).catch(({response})=>{
          if(response.status===422){
            setValidationError(response.data.errors)
          }else{
            Swal.fire({
              text:response.data.message,
              icon:"error"
            })
          }
        })
      }
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Update Product</h4>
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
                    <Form onSubmit={updateChannel}>
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
                                <Form.Label>Amount</Form.Label>
                                <Form.Control as="textarea" rows={3} value={population} onChange={(event)=>{
                                  setPopulation(event.target.value)
                                }}/>
                            </Form.Group>
                          </Col>
                      </Row>
                      <Button variant="success" className="mt-2" size="lg" type="submit">
                        Update
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