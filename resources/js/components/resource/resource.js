import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ResourcesList = (props) => {
    return (
        <tbody>
            {props.resources.map((resource, index) => {
                return (
                    <tr key={resource.id} className={`row-${resource.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{resource.type == null ? '-': resource.type}</td>
                        <td>{resource.url}</td>
                        <td>{resource.videos.map((video, index) => {
                            
                            return (
                            <span key={index}>{video.views}</span>
                            )
                        })}</td>
                        <td>{resource.status}</td>
                        <td className="action">
                            <NavLink to="/edit-resources" onClick={props.onEditResource.bind(null, resource.id)} className="btn btn-info btn-sm">Edit</NavLink>
                            <button type="button" onClick={()=>props.showConfirmBox( resource.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==resource.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteResource.bind(null, resource.id)} href="# ">Yes</a> &nbsp;
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

export default ResourcesList;