import React from 'react';
import { Col } from 'react-bootstrap';

export default class Book extends React.Component {
    render (){
        let imagename = this.props.book.cover && this.props.book.cover.medium ? this.props.book.cover.medium : 'none'
        let imageornot 
        if(this.props.book.cover && this.props.book.cover.medium){
            imageornot = <img className="card-image-top" src={imagename} alt=""/>
        }else{
            imageornot = <p style={{height:"200px",backgroundColor:"lightgrey",border:"solid 1px"}}>
                No image available</p>
        }

        return <Col className="book" xs={12} sm={6} md={3} id={this.props.olid}>
                    <div className="card">
                        {imageornot}
                        <div className="card-body">
                            <a href={this.props.book.url}>
                                <h5 className="card-title">{this.props.book.title}</h5>
                            </a>
                            <p>{this.props.book.by_statement}</p>
                            <p>{this.props.olid}</p>
                            
                        </div>
                    </div>
                </Col>
    }
}