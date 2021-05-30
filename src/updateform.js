import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
export class updateCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            showModal:false
        }
    }

showModal = () => {
    this.setState({
        showModal: true
    })

}
handleclose = () => {
    this.setState(
        { showModal: false }
    )
}
render() {
    return (
        <div>
            <Button type="submit" onClick={this.showModal}>update</Button>
            {this.state.showModal && (

                <Modal show={this.state.showModal} onHide={this.handleclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.Updatebook}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Update Book name</Form.Label>
                                <Form.Control type="text"  value={this.props.name}name='name'onChange={this.props.addbookname} />
                           
                                <Form.Label >update book descreption</Form.Label>
                                <Form.Control type="text" value={this.props.des} name='des' onChange={this.props.addbookdes}/>
                                <Form.Label>update book scr</Form.Label>
                                <Form.Control type="text" value={this.props.img} name='img'onChange={this.props.addimg} />
                      <Button type='submit'>update MY BOOK</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* {/* <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button> */}
                <Button variant="primary" onClick={this.handleclose}>
                close
                </Button> 
                    </Modal.Footer>
                </Modal>
            )
            }
        </div>

    )
}
}

export default updateCat
