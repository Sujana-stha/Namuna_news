import React from 'react';

const SubscriberList = (props) => {
    return (
        <tbody>
            {props.subscribers.map((subscribe, index) => {
                return (
                    <tr key={subscribe.id} className={`row-${subscribe.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{subscribe.email}</td>
                        <td className="action">
                            <button type="button" onClick={()=>props.showConfirmBox( subscribe.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==subscribe.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteSubscribe.bind(null, subscribe.id)} href="# ">Yes</a> &nbsp;
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

export default SubscriberList;