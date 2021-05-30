import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Add from './AddCat';
import { Button } from 'bootstrap';
import Update from './updateform'

const axios = require('axios');
class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      book:[],
      bookname:'',
      bookdes:'',
      photo:'',
      status:'',
      showUpdateForm:false,
      index:0
    }
  }
  showUpdateForm=(idx)=>{
    const newArr=this.state.book.filter((value,index)=>{
      return idx ===index
    })
this.setState({
  showUpdateForm:true,
  bookdes:newArr[0].description,
  bookname:newArr[0].name,
  photo:newArr[0].image,
  index:idx
})
  }

  componentDidMount=async()=>{
    const {user}=this.props.auth0;
    const getBooks=await axios.get(`http://localhost:8989/book?email=${user.email}`);
    this.setState({
      book:getBooks.data
      
    })
    console.log(this.state.book)
  }
  getAdd=async(e)=>{
    e.preventDefault();
    
    const { user } = this.props.auth0;
    const bodydata={
    description:this.state.bookdes,
     name:this.state.bookname,
     image:this.state.photo,
    //  status: this.state.status,
     email:user.email
  }
  const addbook=await axios.post(`http://localhost:8989/book`,bodydata)
  this.setState({
    book:addbook.data

  })
  
}
addbookname=(e)=>{
  this.setState({
    bookname:e.target.value
  })
}
addbookdes=(e)=>{
  this.setState({
    bookdes:e.target.value
  })
}
addimg=(e)=>{
  this.setState({
    photo:e.target.value
  }) 
}
deleteBook=async(index)=>{
  const newArrbook=this.state.book.filter((bok,idx)=>{
    return idx !== index;
  })
  console.log(newArrbook);
  this.setState({
    book:newArrbook
  })

  const { user } = this.props.auth0;
const queryParams={
  email:user.email
}
await axios.delete(`http://localhost:8989/book/${index}`,{params:queryParams})
}
Updatebook=async(e)=>{
  const { user } = this.props.auth0;
  e.preventDefault();
  const bodydata= {
     description:this.state.bookdes,
     name:this.state.bookname,
     image:this.state.photo,
    //  status: this.state.status,
     email:user.email}
  const newUpd=await axios.put(`http://localhost:8989/book/${this.state.index}`,bodydata)
this.setState({
  book:newUpd.data
})
}


render() {
  console.log('track add',this.state.bookdes,this.state.image,this.state.bookname);
  console.log('addbookarray',this.state.book)
    console.log(this.state.book)
    return(
      // <Jumbotron>
      <Jumbotron>
        {this.state.showUpdateForm&& 
        
        <Update
        addbookname={this.addbookname}
        addbookdes={this.addbookdes}
        addimg={this.addimg}
        name={this.state.bookname}
        des={this.state.bookdes}
        img={this.state.photo}
        Updatebook={this.Updatebook}

        />
        }
        <Add getAdd={this.getAdd}
        addbookname={this.addbookname}
        addbookdes={this.addbookdes}
        addimg={this.addimg}
        />

         <h1>My Favorite Books</h1>
         <p>
           This is a collection of my favorite books
         </p>

       <Carousel style={{width:'40rem',color:'black'}}>
       {this.state.book.map((bok,idx)=>{
         return(
           
         
           <Carousel.Item >

     <img
       className="d-block w-100"
       src={bok.image}
       alt="First slide"
       />
     <Carousel.Caption >
     <>
       <button  onClick={()=>this.deleteBook(idx)}>remove book from shelf</button>
       <button  onClick={()=>this.showUpdateForm(idx)}>update form</button>
       </>
       <h3>{bok.name}</h3>
       <p>{bok.description}</p>
       <p>{bok.status}</p>
     </Carousel.Caption>
     </Carousel.Item>
          )
        })
        
      }
      </Carousel>
      </Jumbotron>
     
     
   
    )
  }
}

export default withAuth0(MyFavoriteBooks);
