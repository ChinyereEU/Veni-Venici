import React from "react";
import './APIForm.css'
import { useState } from "react";

const APIForm = ({inputs, handleChange, onSubmit, apiKey}) => {
    /**form to input the URL of the puppy image */
    // const [puppyInfo, setPuppyInfo] = useState({
    //     imageUrl: "",
    //     name: "",
    //     breed: "",
    //     age: ""
    // });

    const [puppyInfo, setPuppyInfo] = useState([]);
    const [banList, setBanList] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        let defaultValues = {
            format: "jpeg",
            no_ads: "true",
            no_cookie_banners: "true",
            width: "1920",
            height: "1080",
        };

        // if(inputs.url == "" || inputs.url == " "){
        //     alert("URL cannot be empty");
        // } 
        // else{
            for(const [key, value] of Object.entries(inputs)) {
                if(value === ""){
                    inputs[key] = defaultValues[key]
                }
            // }
        }
        makeQuery();

        // onSubmit(inputs.url, defaultValues, setPuppyInfo);
    };

    const makeQuery = async () => {
        // let wait_until = "network_idle";
        // let response_type = "json";
        // let fail_on_status = "400%2C404%2C500-511";
        // let url_starter = "https://";
        // let fullURL = url_starter + inputs.url;

        // let query = `?wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

        // for (let key in inputs) {
        //     if(inputs.hasOwnProperty(key)){
        //         query += `&${key}=${inputs[key]}`;
        //     }
        // }

        // fullURL += query;
        // console.log(fullURL); //to debug
/////////////////////////////
        const headers = new Headers({
            "Content-Type": "application/json",
            // "x-api-key": "DEMO-API-KEY"
            "x-api-key": apiKey
        });
        
        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions);
                const result = await response.json();
                const filteredResult = result.filter(puppy => !banList.includes(puppy.breeds[0].name));
                setPuppyInfo(filteredResult);
        }
        catch (error) {
            console.log("error", error);
        };


        // fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        // .then(response => response.json())
        // .then(result => {
        //     setPuppyInfo(result);
        // })
        // .catch(error => console.log('error', error));        
/////////////////////////////
        // fetch(fullURL, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${apiKey}`
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     setPuppyInfo({
        //         imageUrl: data.imageUrl,
        //         name: data.name,
        //         breed: data.breed,
        //         age: data.age
        //     });
        // })
        // .catch(error => console.error("Error fetching puppy info:", error));
    };

    const addToBanList = (attribute) => {
        setBanList([...banList, attribute]);
    };

    // return (
    //     // <div>
    //     //     <form onSubmit={submitForm}>
    //     //         <label>
    //     //             Puppy Image URL:
    //     //             <input
    //     //                 type="text"
    //     //                 name="url"
    //     //                 value={inputs.url}
    //     //                 onChange={handleChange}    
    //     //             />
    //     //         </label>
    //     //         <button type="submit">Shuffle</button>
    //     //     </form>
    //     //     {puppyInfo.imageUrl && (
    //     //         <div>
    //     //             <img src={puppyInfo.imageUrl} alt="Puppy" width="300" />
    //     //             <p>Name: {puppyInfo.name}</p>
    //     //             <p>Breed: {puppyInfo.breed}</p>
    //     //             <p>Age: {puppyInfo.age}</p>
    //     //         </div>
    //     //     )}
    //     // </div>
    // );
    return (
        <div>
            {/* <form onSubmit={submitForm}>
                <label>
                    Puppy Image URL:
                    <input
                        type="text"
                        name="url"
                        value={inputs.url}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form> */}
            <div className="puppy-cards">
                {puppyInfo.map((puppy, index) => (
                    <div key={index} className="puppy-card">
                        <img src={puppy.url} alt="Puppy" className="puppy-image" />
                        {puppy.breeds && puppy.breeds.length > 0 && (
                            <div className="puppy-details">
                                <p onClick={() => addToBanList(puppy.breeds[0].name)}>Name: {puppy.breeds[0].name}</p>
                                <p>Breed: {puppy.breeds[0].breed_group}</p>
                                <p>Age: {puppy.breeds[0].life_span}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="button" type="submit">Submit</button>
            <div className="ban-list">
                <h3>Ban List</h3>
                <ul>
                    {banList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default APIForm;