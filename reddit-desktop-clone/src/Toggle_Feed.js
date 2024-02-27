import {useEffect, useState} from 'react'
import './CSS/toggle_feed.css';

const Toggle_Feed = ({chosenTime, setChosenSort, setChosenTime}) => {
    const [dropdownStyle, setDropdownStyle] = useState({display: "none"})
    const [dateSortStyle, setDateSortStyle] = useState({display: "none"})
    
    const [toggleText, setToggleText] = useState("Today");

    const [topselected, setTopselected] = useState(false)
    const [hotselected, setHotselected] = useState(false)
    const [newselected, setNewselected] = useState(false)
    const [contselected, setContselected] = useState(false)
    const [timeSortSelected, setTimeSortSelected] = useState(false)


    const handleSort = (e) => {
        const name = e.target.name;
        setChosenSort(name);
        if(name === "top"){
            setDateSortStyle(topselected ? {display: "none"} : {display: "flex"})
            setTopselected(topselected ? false : true)
            setContselected(false)
            setHotselected(false)
            setNewselected(false)
        }
        else if (name === "controversial"){
            setDateSortStyle(contselected ? {display: "none"} : {display: "flex"})
            setContselected(contselected ? false : true)
            setTopselected(false)
            setHotselected(false)
            setNewselected(false)
        }
        else if(name === "hot"){
            setHotselected(hotselected ? false : true)
            setTopselected(false)
            setNewselected(false)
            setContselected(false)
            setDateSortStyle({display: "none"})
        }
        else{
            setNewselected(newselected ? false : true)
            setTopselected(false)
            setHotselected(false)
            setContselected(false)
            setDateSortStyle({display: "none"})
        }
    }

    const handleTime = () => {
        setDropdownStyle(timeSortSelected ? {display: "none"} : {display: "flex"})
        setTimeSortSelected(timeSortSelected ? false : true)
    }

    const handleTimeOption = (e) => {
        const name = e.target.name;
        console.log("selected", name);
        setChosenTime(name)
        setToggleText(name)
        setDropdownStyle({display: "none"})
    }



    return (
        <>
            <div className="toggle_feed">
                <button name="hot" className={hotselected ? 'selected_feed' : ''} onClick={(e) => handleSort(e)}>Hot</button>
                <button name="new" className={newselected ? 'selected_feed' : ''} onClick={(e) => handleSort(e)}>New</button>
                <button name="top"  className={topselected ? 'selected_feed' : ''} onClick={(e) => handleSort(e)}>Top</button>
                <button className={`controversial ${contselected ? 'selected_feed' : ''}`} name="controversial" onClick={(e) => handleSort(e)}>Controversial</button>
                <button name="sort_by_time" style={dateSortStyle} onClick={() => handleTime()}>{toggleText}</button>
            </div>
            <div className="home_feed_dropdown" style={dropdownStyle}>
                <button name="This Day" onClick={(e) => handleTimeOption(e)}>Today</button>
                <button name="This Week" onClick={(e) => handleTimeOption(e)}>This Week</button>
                <button name="This Month" onClick={(e) => handleTimeOption(e)}>This Month</button>
                <button name="This Year" onClick={(e) => handleTimeOption(e)}>This Year</button>
            </div>
        </>
    );
}

export default Toggle_Feed;