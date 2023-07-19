import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChart from "../pieChart.component";
import { Table, Col, Row, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function List() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    const response = await axios.get(`http://localhost:8000/api/channels`);
    if (response && response.data) {
      setChannels(response.data);
    }
  };

  const deleteChannel = async (id: number) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B12929",
      cancelButtonColor: "#198754",
      confirmButtonText: "Delete",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/channels/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchChannels().then(() => {
          refreshPieChart();
        });
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const refreshPieChart = async () => {
    await fetchChannels();
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
        <Col xs="5">
          <Table responsive="sm" borderless striped>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
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
                      className="delButton"
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
        <Col>
        <PieChart channels={channels} />
        </Col>
      </Row>
    </div>
  );
}
