import React, {useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import style from './MyBlog.module.css'
import Loader from "../../Loader/Loader";
import MyBlogItem from "./MyBlogItem";

const MyBlog = (props) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [theme, setTheme] = useState(props.themes[0].id)
    const [addBlogMode, setAddBlogMode] = useState(false)
    const [msg, setMsg] = useState('')

    const ckeditorstate = (event, editor) => {
        const data = editor.getData();
        setText(data);
    }
    const editorConfiguration = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'link',
                'alignment',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'imageInsert',
                'insertTable',
                'blockQuote',
                'undo',
                'redo',
                'horizontalLine',
                'removeFormat',
                'specialCharacters',
                'findAndReplace',
                '|'
            ]
        },
        language: 'en',
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        image: {
            toolbar: [
                'imageStyle:block',
                'imageStyle:side',
                'imageStyle:inline', 'imageStyle:alignLeft', 'imageStyle:alignRight',
                'imageStyle:alignCenter', 'imageStyle:alignBlockLeft', 'imageStyle:alignBlockRight',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
            ]
        }
    };

    const send = () => {
        let data = {
            "theme": theme,
            "title": title,
            "markdown": text
        }
        if (theme && title.trim() && text.trim()) {
            if(title.trim().length > 255){
                setMsg('The maximum length of the title is 255 characters')
            }else{
                props.addBlog(data)
                setMsg('')
            }

        } else {
            setMsg('Fill in the blank fields')
        }
    }
    return (
        <>
            <div className='text-end'>
                <button onClick={()=>setAddBlogMode(prev=> !prev)} className='btn btn-success'>
                    Add new {addBlogMode ? '-' : '+'}
                </button>
            </div>
            {addBlogMode ?
                <div className={style.addBlog}>
                    {msg ? <p className={style.title + ' text-danger'}>{msg}</p> : null}
                    <p className={style.title}>Title</p>
                    <input
                        className='form-control'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <p className={style.title}>Select a theme</p>

                    {props.themes.length ?
                        <select defaultValue={props.themes[0].id}
                                onChange={(e) => setTheme(e.target.value)}
                                className="form-select"
                                aria-label="Default select example">
                            {props.themes.map((a) => {
                                return <option key={a.id} value={a.id}>{a.name}</option>
                            })}

                        </select> : <Loader fix={false}/>

                    }

                    <p className={style.title}>Blog text</p>

                    <CKEditor
                        editor={Editor}
                        onChange={ckeditorstate}
                        config={editorConfiguration}
                    />


                    <div className='text-end'>
                        <button onClick={send} className='btn btn-primary mt-4'>To publish</button>
                    </div>

                    {/*<div className='ck-content'>*/}
                    {/*    <div dangerouslySetInnerHTML={{__html: text}}/>*/}

                    {/*</div>*/}
                </div>
                :
                null
            }
            {props.blogs.length ? <div className={style.blogList }>
                {props.blogs.map((item) => {
                    return <MyBlogItem
                        themes={props.themes}
                        updateBlog={props.updateBlog}
                        editorConfiguration={editorConfiguration}
                        key={item.id}
                        blog={item}
                        deleteBlog={props.deleteBlog} />
                })}
            </div> :
                <div className='text-center'>
                    <h4>Share your thoughts on the blog</h4>
                </div>

            }

        </>
    );
};

export default MyBlog;