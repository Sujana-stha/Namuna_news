import React from 'react';

const SubscriberList = (props) => {
    return (
        <tbody>
            {props.subscribers.map((subscriber, index) => {
                return (
                    <tr key={subscriber.id} className={`row-${subscriber.id}`}>
                        <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                        <td>{subscriber.email}</td>
                        <td className="action">
                            <button type="button" onClick={()=>props.showConfirmBox( subscriber.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==subscriber.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a onClick={props.deleteSubscriber.bind(null, subscriber.id)} href="# ">Yes</a> &nbsp;
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