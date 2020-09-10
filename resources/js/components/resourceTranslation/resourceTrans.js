import React from 'react';
import {  NavLink } from 'react-router-dom';

const ResourcesTransList = (props) => {
    return (
        <tbody>
            {props.resourcesTrans.map((resourceTrans, index) => {
                return (
                    <tr key={resourceTrans.id} className={`row-${resourceTrans.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td className="news-title">{resourceTrans.title == null ? '-': resourceTrans.title}</td>
                        <td className="news-content">{resourceTrans.description}</td>
                        <td>{resourceTrans.language.language}</td>
                        <td>{resourceTrans.resource.type}</td>
                        <td className="action">
                            <NavLink to="/edit-translated-resources" onClick={props.onEditResourceTrans.bind(null, resourceTrans.id)} className="btn btn-info btn-sm">Edit</NavLink>
                            <button type="button" onClick={()=>props.showConfirmBox( resourceTrans.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==resourceTrans.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteResourceTrans.bind(null, resourceTrans.id)} href="# ">Yes</a> &nbsp;
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

export default ResourcesTransList;