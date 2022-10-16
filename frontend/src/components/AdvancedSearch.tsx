import React from 'react';
import { removeToken, useAuth } from "../authHanlder";

const AdvancedSearch = () => {
    return (
        <div className="dropdown dropdown-right">
            <label tabIndex={0} className="btn m-1">Adv. Search</label>
            <div className='card dropdown-content compact shadow bg-base-300 rounded-box w-16 h-16'>
                <p>Test text</p>
            </div>
        </div>
    );
};

export default AdvancedSearch;
