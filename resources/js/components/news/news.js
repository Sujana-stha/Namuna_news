import React from 'react';
import { Link } from 'react-router-dom';


const NewsList = (props) => {
    return (
        <tbody>
            {props.news.map((newsList, index) => {
                return (
                    <tr key={newsList.id} className={`row-${newsList.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td className="news-title">{newsList.slug == null ? '-': newsList.slug}</td>
                        <td>{newsList.category.slug}</td>
                        <td>{newsList.province.slug}</td>
                        <td>{newsList.author}</td>
                        <td>{newsList.news_label}</td>
                        <td>{newsList.status}</td>
                        <td className="action">
                            <Link to="/edit-news" onClick={props.onEditNews.bind(null, newsList.id)} className="btn btn-info btn-sm">Edit</Link>
                            <button type="button" onClick={()=>props.showConfirmBox( newsList.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            
                            {props.confirmText==newsList.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteNews.bind(null, newsList.id)} href="# ">Yes</a> &nbsp;
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

export default NewsList;