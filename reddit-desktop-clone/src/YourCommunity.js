import { useEffect, useState } from "react";
import './CSS/your_community.css';
import { useInfn } from './Cache';
import { useNavigate } from 'react-router-dom';


const YourCommunity = ({sub_info}) => {
    const fromCache = useInfn();
    const navigate = useNavigate();


    const maxLength = 100;
    const [createStyle, setCreateStyle] = useState({display: "none"});
    const [updateStyle, setUpdateStyle] = useState({display: "none"});

    const [subName, setSubName] = useState('');
    const [subAltName, setSubAltName] = useState('');
    const [description, setDescription] = useState('');
    const [subIcon, setSubIcon] = useState(null);
    const [bgImg, setBImg] = useState(null);

    const [subIconName, setSubIconName] = useState(null)
    const [bgImgName, setBImgName] = useState(null);

    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('');
    const [error5, setError5] = useState('');

    const [error1Style, setError1Style] = useState({display: 'none'});
    const [error2Style, setError2Style] = useState({display: 'none'});
    const [error3Style, setError3Style] = useState({display: 'none'});
    const [error4Style, setError4Style] = useState({display: 'none'});
    const [error5Style, setError5Style] = useState({display: 'none'});

    const [btnName, setBtnName] = useState('')
    const [formStyle, setFormStyle] = useState({display: "none"})

    
    useEffect(() => {
        if(sub_info){
            setUpdateStyle({display: "flex"});
            setBtnName('Update')
        }
        else{
            setCreateStyle({display : "flex"})
            setBtnName('Create')
        }
        console.log(bgImgName, subIconName, bgImg, subIcon, description, subAltName, subName);
    }, [])


    useEffect(() => {
        if(bgImgName){
            const url = "https://localhost:7166/Subreddit/CreateSubreddit"
            sub_api_call(url)
        }
    }, [bgImgName])

    const handleImg = (e) => {

        const file = e.target.files[0];
        const name = e.target.name;


        setError4('')
        setError5('')

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                name === "subIcon" && setError4('Invalid file type. Please select a .jpg, .png, .gif file.');
                name === "subBgImg" && setError5('Invalid file type. Please select a .mp4, .webm file.');
                return;
            }


            const maxImgSize = 100 * 1024 * 1024; // 100MB

            if (file.size > maxImgSize) {
                name === "subIcon" && setError4('Image size exceeds the limit (100MB). Please choose a smaller image.');
                name === "subBgImg" && setError5('Image size exceeds the limit (100MB). Please choose a smaller image.');
                return;
            }

            if(name === "subIcon"){
                setSubIcon(file);
            }
            else if(name === "subBgImg"){
                setBImg(file);
            }
        }
        e.target.value = null; 
    }


    const optionClick = () => {
        setFormStyle({display: "flex"});
        setCreateStyle({display : "none"})
        setUpdateStyle({display: "none"});
    }

    const createUpdateSub = async () => {
        // first checks if the inputs are empty
        // use Form data for the images
        if(btnName === "Update"){
            // make an update sub api call

        }
        else{
            // make a create sub api call
            const iconName = await sub_img_save(subIcon) // for the sub icon
            if(iconName === "no media submitted"){
                // error msg
                console.log('error icon');
            }
            else{
                if(iconName){
                    setSubIconName(iconName)                    
                }
                const bkImgName = await sub_img_save(bgImg)
                if(bkImgName === "no media submitted"){
                    // error msg
                    console.log('error bk');
                }
                else{
                    if(bkImgName){
                        setBImgName(bkImgName) // for the background image
                    }
                }
            }
        }
    }

    const sub_img_save = async (file) => {
        const formData = new FormData();
        formData.append('media', file);
        formData.append('type', "Image");

        // return await fetch("https://localhost:7166/CRUD/MediaSave", {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => console.log(response.text))
        // .catch(error => console.error('Error uploading post: ', error));

        try {
            const response = await fetch("https://localhost:7166/CRUD/MediaSave", {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload media');
            }

            // Handle success response
            const responseData = await response.text();
            return responseData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const sub_api_call  = async (url) => {
        const value = {
            Subreddit_Genre: "null",        
            User_Id: fromCache.userId,
            Subreddit_Name: subName,
            Subreddit_Alt_Name: subAltName,
            Subreddit_Description: description,
            Sub_IconImg_Name: subIconName,
            Sub_BackgroundImg_Name: bgImgName,
            Allowed_Flairs: ["OC"]
        }
        console.log(value);
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(value)
        // })
        // .then(response => response.text())
        // .catch(error => console.error('Error uploading post: ', error));

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });

            if (!response.ok) {
                throw new Error('Failed to upload media');
            }
            else{
                // Handle success response
                navigate(-1);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const cancelBtn = () => {
        setFormStyle({display: "none"});
        // will show one of the options(create or update)
        if(sub_info){
            setUpdateStyle({display: "flex"});
            setBtnName('Update')
        }
        else{
            setCreateStyle({display : "flex"})
            setBtnName('Create')
        }
    }

    const deleteSub = () => {
        // make an api call
    }


    return (
        <div className="your_community_tab">
            <div className="ccOptions">
                <div className="ccBox" style={createStyle} onClick={() => optionClick()}>
                    <h3>Create your own community <span className="material-symbols-outlined">add</span></h3>
                    <span>You don't have a community yet</span>
                </div>

                <div className="ccBox" style={updateStyle} onClick={() => optionClick()}>
                    <h3>You can update your community here. <span className="material-symbols-outlined">upgrade</span></h3>
                    <span>r/winwin</span>
                </div>

                <div className="deleteSub" style={updateStyle}>
                    <div className="dlt_infn">
                        <p className="dlt_msg">Delete your subreddit</p>
                        <p>sub name</p>
                    </div>
                    <button className="dltSubBtn" onClick={() => deleteSub()}>Delete</button>
                </div>
            </div>
            <div className="createUpdateSub" style={formStyle}>
                <div className="subInfoCont">
                    <p>Subreddit name</p>
                    <input type="text" value={subName} onChange={(e) => setSubName(e.target.value)}/>
                    <p></p>
                </div>
                <div className="subInfoCont">
                    <p>Alternative subreddit name</p>
                    <input type="text" value={subAltName} onChange={(e) => setSubAltName(e.target.value)}/>
                    <p></p>
                </div>
                <div className="subInfoCont subDescription">
                    <p>Subreddit description (100 characters max)</p>
                    <textarea name="" id="" cols="30" rows="10" maxLength={maxLength} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <p></p>
                </div>
                <div className="subInfoCont subImg">
                    <label htmlFor="subIconImg">Choose a subreddit icon</label>
                    <input id="subIconImg" type="file" accept=".png, .jpg " name="subIcon" onInput={(e) => handleImg(e)} style={{border: "none"}}/>
                    {/* onInput={(e) => handleFileChange(e)} */}
                    <p></p>
                </div>

                <div className="subInfoCont subImg" style={{justifySelf: "flex-start"}}>
                    <label htmlFor="subIconImg">Choose a subreddit background image</label>
                    <input id="subIconImg" type="file" accept=".png, .jpg " name="subBgImg" onInput={(e) => handleImg(e)} style={{border: "none"}}/>
                    {/* onInput={(e) => handleFileChange(e)} */}
                    <p></p>
                </div>
                <button className="crtUdtSub" onClick={() => createUpdateSub()}>{btnName}</button>
                <button className="crtUdtSub" onClick={cancelBtn}>Cancel</button>
            </div>
                

        </div>
    );
}

export default YourCommunity;