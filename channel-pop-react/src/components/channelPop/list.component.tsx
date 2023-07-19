import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChart from "./pieChart.component";
import { Table, Col, Row, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function List() {
  const [channels, setChannels] = useState([])

  useEffect(()=>{
      fetchChannels() 
  },[])

  const fetchChannels = async () => {
      await axios.get(`http://localhost:8000/api/channels`).then(({data})=>{
        setChannels(data)
      })
  }

  const deleteChannel = async (id: number) => {
      const isConfirm = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          return result.isConfirmed
        });

        if(!isConfirm){
          return;
        }

        await axios.delete(`http://localhost:8000/api/channels/${id}`).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          })
          fetchChannels().then(() => {
            refreshPieChart();
          });
        }).catch(({response:{data}})=>{
          Swal.fire({
              text:data.message,
              icon:"error"
          })
        })

  }

  const refreshPieChart = async () => {
    await fetchChannels(); // Re-fetch the channels data
  };
  return (
    <div className="container">
      <Row>
        <Col>
          <div className="mb-3">
            <h5 className="card-title">
              Channel List{" "}
              <span className="text-muted fw-normal ms-2">
                ({channels.length})
              </span>
              <Link
                className="btn btn-success mb-2 float-end"
                to={"/channel/create"}
              >
                Create Channel
              </Link>
            </h5>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive borderless>
            <thead>
              <tr>
                <th scope="col">Kanał</th>
                <th scope="col">Ilość</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {channels.length > 0 &&
                channels.map((row: any, key) => (
                  <tr key={key}>
                    <td>{row.channelName}</td>
                    <td>{row.population}</td>
                    <td>
                      <Link
                        to={`/channel/update/${row.id}`}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteChannel(row.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <PieChart channels={channels}/>
      </Row>
    </div>
  );
}