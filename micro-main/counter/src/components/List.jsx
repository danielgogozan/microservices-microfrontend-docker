import React, { useState } from "react";

const List = ({ list, remove, canRemove}) => {
    return (
        <>
            {list?.length > 0 ? (
                <ul className="todo-list">
                    {list.map((entry, index) => (
                        <div key={index} className={canRemove === true ? "recipe" : "trendingrecipe" }>
                            <li className={canRemove === true ? "lirecipe" : "litrending"} key={index}>
                                <div>
                                    <b className={"title"}>{entry.name}</b>
                                </div>

                                <div className={"recipe-description"}>
                                    {entry.description}
                                </div>
                            </li>
                            { canRemove &&
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        remove(entry);
                                    }}
                                >
                                    Delete
                                </button>
                            }
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p>no recipes found</p>
                </div>
            )}
        </>
    );
};

export default List;