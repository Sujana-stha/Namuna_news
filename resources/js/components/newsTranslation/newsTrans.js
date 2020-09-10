import React from 'react';
import { Link } from 'react-router-dom';


const NewsTransList = (props) => {
    return (
        <tbody>
            {props.newsTrans.map((newsTran, index) => {
                return (
                    <tr key={newsTran.id} className={`row-${newsTran.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td className="news-title">{newsTran.title == null ? '-': newsTran.title}</td>
                        <td>{newsTran.news.slug}</td>
                        <td>{newsTran.language.language}</td>
                        <td className="news-content">{newsTran.content}</td>
                        <td className="action">
                            <Link to="/edit-news-translation" onClick={props.onEditNewsTrans.bind(null, newsTran.id)} className="btn btn-info btn-sm">Edit</Link>
                            <button type="button" onClick={()=>props.showConfirmBox( newsTran.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            
                            {props.confirmText==newsTran.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteNewsTrans.bind(null, newsTran.id)} href="# ">Yes</a> &nbsp;
                                    <a href="# " onClick={props.hideConfirmBox.bind(null)}>No</a>
                                </span>
                            ): null}
                        </td>
                            
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default NewsTransList;