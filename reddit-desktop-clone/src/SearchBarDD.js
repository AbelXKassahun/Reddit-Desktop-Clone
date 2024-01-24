import React, { useEffect, useState }from 'react';
import { useInfn } from './Cache'
import './CSS/SearchBarDD.css';

const SearchDD = (props) => {
    const fromCache = useInfn();

    return (
        <>
            {/* iterate through the search results using .map*/}
            {/* distinguish between community and user */}
            {/* display those that are relevant and have higher number of members or karma */}
            {/* dont show more than 4 for each (community and user) */}
            <div className={`search_results + ${fromCache.theme === 'dark' ? "search_results_dark" : "search_results_light"}`}>
                <div className={`title + ${fromCache.theme === 'dark' ? "title_dark" : "title_light"}`}>
                    <h3>Communities</h3>
                </div>
                <div className={`individual_result + ${fromCache.theme === 'dark' ? "individual_result_dark" : "individual_result_light"}`}>
                    <img src="" alt="" />
                    <div className={`result_infn + ${fromCache.theme === 'dark' ? "result_infn_dark" : "result_infn_light"}`}>
                        <h3>r/askreddit</h3> 
                        <p> Community 345k members</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDD;