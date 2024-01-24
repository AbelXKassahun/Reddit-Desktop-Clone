import React, { useState }from 'react';

const SearchDD = (props) => {
    const [box, setBox] = useState()

    if(props.isFocused){
        if(props.query && props.isFocused){
            setBox((<div className="search_results">
                <h1>SR</h1>
            </div>))
        }
        else{
            setBox((<div className="popular_today">
                <h1>Pop</h1>
            </div>))
        }
    }

    return (
        <>
            { box }
        </>
    );
}

export default SearchDD;