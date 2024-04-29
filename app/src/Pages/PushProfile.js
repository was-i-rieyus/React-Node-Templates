import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    };

    const button = {
        width: '5rem',
        height: '40px',

    }



    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);




    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };


    const addData = async (e) => {

        if (!name || !role || !experience || !selectedImage) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('role', role);
            formData.append('experience', experience);
            formData.append('image', selectedImage);
            console.log('Data added successfully:', formData);
            const response = await axios.post('http://localhost:5000/add', formData);
            console.log(response)
            setName('');
            setRole('');
            setExperience('');
            setSelectedImage(null);
            alert("Profile Added Sucessfully")

        } catch (err) {
            console.log(err);
            alert("Failed to add data due to ", err)
        }

    };

    return (
        <div style={containerStyle}>
            <form>
                <div className='card'>
                    <div className='card-body'>
                        <div className='m-2'>
                            <label className='form-label mx-3 text-dark' htmlFor="name">Name:</label>
                            <input className='form-control' id="name" name="name" type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='m-2'>
                            <label className='form-label mx-3' htmlFor="role">Role:</label>
                            <input className='form-control' id="role" name="role" type='text' value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div className='m-2'>
                            <label className='form-label mx-3' htmlFor="exp">Experience:</label>
                            <input className='form-control' id="exp" name="exp" type='text' value={experience} onChange={(e) => setExperience(e.target.value)} />
                        </div>
                        <div className='m-2'>
                            <label className='form-label mx-3' htmlFor="image">Image:</label>
                            <input className='form-control' id="image" name="image" type='file' onChange={handleImageChange} accept='image/*' />
                        </div>
                        <button className='btn btn-primary m-2' style={button} type="button" onClick={addData}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Home;

