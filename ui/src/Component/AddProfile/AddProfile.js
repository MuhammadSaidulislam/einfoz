import React, { useRef, useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import "./AddProfile.css";
import { v4 as uuidv4 } from 'uuid';
// import { courseAdd } from '../../api/course';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getCategoryList, getSubCategoryList } from '../../api/admin';
import { addProfile } from '../../api/profile';

const AddProfile = (props) => {

    const form = useRef(null);
    const { handleSubmit, register, setValue } = useForm();
    const [content, setContent] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [SubCategoryList, setSubCategoryList] = useState([]);
    const savedUserProfile = localStorage.getItem("niomit");
    const userProfile = JSON.parse(savedUserProfile);

    let onSubmit = () => {
        const courseInfo = new FormData(form.current);
        const course_id = uuidv4();
        courseInfo.append('id', course_id);
        courseInfo.append('description', content);
        courseInfo.append('created_by', userProfile.mobile);
        courseInfo.append('created_at', new Date());
        addProfile(courseInfo).then((data) => {
            props.setProfileShow(false);
            console.log('courseInfo', courseInfo);
        })
    }


    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "align", "size",
    ];

    const handleProcedureContentChange = (content) => {
        setContent(content)
    };


    useEffect(() => {
        getCategoryList().then((data) => {
            setCategoryList(data);
        })
        getSubCategoryList().then((data) => {
            setSubCategoryList(data);
        })
    }, [])
    return (
        <div>
            <Modal show={props.profileShow} onHide={props.handleProfileClose} centered className='userModal'>
                <button className='closeModal btn' onClick={props.handleProfileClose}><FontAwesomeIcon icon={faXmark} /></button>
                <div className='userModalBox'>
                    <h1>Profile Information</h1>
                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <div className='inputField mt-3'>
                            <label>Image</label>
                            <input type='file' {...register("image")} placeholder='Enter your course name' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Profile Name</label>
                            <input type='text' {...register("name")} placeholder='Enter your course name' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Mobile number</label>
                            <input type='text' {...register("mobile")} placeholder='Enter your course name' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Category</label>
                            <Form.Select aria-label="Default select example" {...register("category")}>
                                <option value="">Select Payment Option</option>
                                {categoryList.map((category) =>
                                    <option value={`${category.category}`}>{category.category}</option>
                                )}
                            </Form.Select>
                        </div>
                        <div className='inputField mt-3'>
                            <label>Sub-Category</label>
                            <input  type='text' {...register("sub_category")}  placeholder='Enter your course length' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>City</label>
                            <input type='text' {...register("city")} placeholder='Enter your course length' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Zone</label>
                            <input type='text' {...register("zone")} placeholder='Enter your course length' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Building no</label>
                            <input type='text' {...register("building_no")} placeholder='Enter your course length' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Road name</label>
                            <input type='text' {...register("road_name")} placeholder='Enter your course length' className='form-control' required />
                        </div>
                        <div className='inputField mt-3'>
                            <label>Details</label>
                            <div style={{ display: "grid", justifyContent: "center" }}>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    placeholder="write your content ...."
                                    onChange={handleProcedureContentChange}
                                // style={{ height: "220px" }}
                                >
                                </ReactQuill>
                            </div>
                        </div>
                        <div className=' text-center' style={{ marginTop: "100px" }}>
                            <button type='submit' className='btn btn-primary'>Add Course</button>
                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddProfile