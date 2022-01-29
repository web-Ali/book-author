import React, {useState} from 'react';
import ModalAccept from "../../UI/ModalAccept";
import style from './MyBlog.module.css'
import Loader from "../../Loader/Loader";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import {Link} from "react-router-dom";
import {BLOG_ROUTE} from "../../../routing/consts";


const MyBlogItem = ({blog, deleteBlog, updateBlog, themes, editorConfiguration}) => {
    const [title, setTitle] = useState(blog.title)
    const [text, setText] = useState(blog.markdown)
    const [theme, setTheme] = useState(themes[0].id)
    const [msg, setMsg] = useState('')
    const [editMode, setEditMode] = useState(false)

    let markdown = blog.markdown.replace(/<img[^>]*>/g, "")

    const deleteFunc = () => {
        deleteBlog(blog.id)
    }
    const ckeditorstate = (event, editor) => {
        const data = editor.getData();
        setText(data);
    }

    const save = () => {
        let data = {
            "theme": theme,
            "title": title,
            "markdown": text
        }
        if (theme && title.trim() && text.trim()) {
            if (title.trim().length > 255) {
                setMsg('The maximum length of the title is 255 characters')
            } else {
                updateBlog(data, blog.id)
                setEditMode(false)
                setMsg('')
            }
        } else {
            setMsg('Fill in the blank fields')
        }
    }

    return (
        <div style={{border: '10px solid #eef3fb', padding: 10}}>
            {editMode ?
                <div className={style.addBlog}>
                    {msg ? <p className={style.title + ' text-danger'}>{msg}</p> : null}
                    <p className={style.title}>Title</p>
                    <input
                        className='form-control'
                        type="text"
                        defaultValue={blog.title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <p className={style.title}>Select a theme</p>

                    {themes.length ?
                        <select defaultValue={themes[0].id}
                                onChange={(e) => setTheme(e.target.value)}
                                className="form-select"
                                aria-label="Default select example">
                            {themes.map((a) => {
                                return <option key={a.id} value={a.id}>{a.name}</option>
                            })}

                        </select> : <Loader fix={false}/>

                    }

                    <p className={style.title}>Blog text</p>

                    {blog.markdown.length ?
                        <CKEditor
                            onReady={editor => {
                                editor.setData(blog.markdown)
                            }}
                            editor={Editor}
                            onChange={ckeditorstate}
                            config={editorConfiguration}

                        /> : <Loader fix={false}/>

                    }
                </div>
                :
                <>
                    <div className='text-end'>
                        <p className='text-secondary fst-italic'>{blog.created_at.slice(0, 10)}</p>
                    </div>
                    <div className='mt-3'><h4>{blog.title}</h4></div>
                    <p style={{color: '#4582af', fontStyle: 'italic'}}>{blog?.theme.name}</p>
                    <hr/>
                    <div className='ck-content'>
                        <div
                            dangerouslySetInnerHTML={{__html: markdown.length > 300 ? markdown.slice(0, 300) + ' ......' : markdown}}/>
                    </div>
                </>
            }


            <div className='d-flex justify-content-end mt-3'>
                {editMode ?
                    <button onClick={save} className='btn btn-success me-2'>Save</button>
                    :
                    <button onClick={() => setEditMode(true)} className='btn btn-secondary me-2'>Edit</button>
                }


                <ModalAccept
                    button={<button className='btn me-2 btn-danger'>Delete</button>}
                    text={"Delete?"}
                    desc={'After deleting, the entry will disappear forever'}
                    call={deleteFunc}
                />
                <Link to={BLOG_ROUTE +'/'+blog.id}><button className='btn btn-primary'>Read more...</button></Link>

            </div>
        </div>
    );
};

export default MyBlogItem;