import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {BOOK_ROUTE} from "../../routing/consts";
import Select from "react-select";
import style from "../Profile/MyBooks/AddBook/AddBook.module.css";
import TagItem from "../Profile/MyBooks/AddBook/TagItem";
import DelTag from "../Profile/MyBooks/AddBook/DelTag";
import ModalAccept from "../UI/ModalAccept";
import ModalInfo from "../UI/ModalInfo";

const EditBook = ({data, bookinfo, save, deleteBook, newTags, cleanNewTag, addNewTag, delNewTag}) => {

    const [msg] = useState("");
    const [name, setName] = useState(data.name);
    const [ageLimit, setAgeLimit] = useState(data.age_limit);
    const [finished, setFinished] = useState(data.finished);
    const [description, setDescription] = useState(data.description);
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState(0);
    const [tagInput, setTagInput] = useState('');
    const [showTagList, setShowTagList] = useState(false);
    const [paid, setPaid] = useState(data.paid);

    const history = useHistory();

    const typeList = [];
    const genreList = [];
    const [tagsList, setTagsList] = useState([]);
    const tagsListMain = [];
    let newTagsList = [];


    useEffect(()=>{
     setName(data.name)
    },[data.name])

    useEffect(()=>{
        setDescription(data.description)
    },[data.description])

    useEffect(()=>{
        setPaid(data.paid)
    },[data.paid])
    useEffect(()=>{
        setPrice(data.price)
    },[data.price])

    if (bookinfo?.bookForms) {
        bookinfo.bookForms.map((a) => {
            typeList.push({value: a.pk, label: a.form})
        })
    }
    if (bookinfo?.genres) {
        bookinfo.genres.map((a) => {
            genreList.push({value: a.pk, label: a.genre})
        })
    }
    if (bookinfo?.tags) {
        bookinfo.tags.map((a) => {
            tagsListMain.push({value: a.pk, label: a.tag})
        })
    }
    if (newTags.length > 0) {
        newTags.map((a) => {

            newTagsList.push({value: a.id, label: a.tag})
            newTagsList = newTagsList.filter(
                (thing, index, self) =>
                    self.findIndex((t) => t.value === thing.value && t.tag === thing.tag) === index
            )
        })
    }else{
        newTagsList= []
    }

    const deleted  = () => {

         deleteBook(data.id);

    }
    const send = async () => {
        const formData = {};
        if (genre) {
            formData.genre = genre.map(a => a.value);
        }
        if(tags.length && newTagsList.length){
            formData.tags = tags.map(a => a.value);
            newTagsList.map(a => formData.tags.push(a.value) );
        }else if (tags.length) {
            formData.tags = tags.map(a => a.value);
        }else if (newTagsList.length) {
            formData.tags = newTagsList.map(a => a.value);
        }

        if (paid) {
            formData.price = price;
        }else{
            formData.price = 0
        }
        formData.name = name;
        formData.age_limit = ageLimit;
        formData.finished = finished.value;
        formData.form = type.value;
        formData.description = description;
        // try {
        //     let response = await save(data.id, formData);
        //
        //     if (response.status === 201) {
        //
        //         history.push(BOOK_ROUTE + '/' + response.data.id)
        //     }
        // } catch (e) {
        //     console.log(e.response)
        //     // for (let key in e.response.data) {
        //     //     setMsg(key + ': ' + e.response.data[key])
        //     // }
        // }
        save(data.id, formData)
        cleanNewTag()
        history.push(BOOK_ROUTE + '/' + data.id)

    }
    const tagsListChange = (e) => {
        setTagInput(e.target.value)
        let tempTagList = tagsListMain.filter(i =>
            i.label.toLowerCase().includes(e.target.value.toLowerCase())
        )
        for (let i=0; i < tags.length; i++){
            removeByAttr(tempTagList, 'value', tags[i].value);
        }

        setTagsList(tempTagList)
    }
    const tagsInputTouch = () =>{
        let tempTagList = [...tagsListMain]
        for (let i=0; i < tags.length; i++){
            removeByAttr(tempTagList, 'value', tags[i].value);
        }
        setTagsList(tempTagList);
        setShowTagList(true)
    }
    const addNewTagFunc = () =>{
        try {
            let tagData = new FormData();
            tagData.append('tag',tagInput)
            addNewTag(tagData);
            setTagInput('')
        }catch (e) {
            console.log(e.response);
        }
    }
    function removeByAttr(arr, attr, value){
        let i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value ) ){

                arr.splice(i,1);

            }
        }
        return arr;
    }
    const addTag = (value) => {
        setTags([...tags, {value: value.value, label: value.label}])
        setTagInput('')
    }
    const delTag = (tag) => {
        setTags(tags.filter(value => value.value !== tag))
    }
    const deleteNewTag = (tag) => {
        delNewTag(tag);
        setTagInput('')

    }
    const inputAge = (e)=>{
        setAgeLimit(prev => e.target.validity.valid && (e.target.value.length < 3) ? e.target.value : prev)
    }
    return (
        <div>
            <div className="container mt-4">
                <h4 className='text-danger'>{msg}</h4>

                <h2 className='mb-4'>Edit book <span className='text-danger'>{data.name}</span></h2>
                <Select
                    onChange={(selectedOption) => {
                        setType(selectedOption);
                    }}

                    value={type}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    options={typeList}
                    placeholder={data?.form?.form}
                />
                <input onChange={(e) => setName(e.target.value)} defaultValue={name} className='form-control mb-3 mt-3'
                       type="text"
                       placeholder="name" name='name'/>
                <textarea onChange={(e) => setDescription(e.target.value)} defaultValue={description}
                          className='form-control mb-3'
                          style={{height: 200}} placeholder="description" name='description'/>
                <Select
                    onChange={(selectedOption) => {
                        setGenre(selectedOption);
                    }}
                    value={genre}
                    isMulti
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                    options={genreList}
                    placeholder={data?.genre?.length && data.genre.map(a=> <span  key={a.id}>{a.genre} | </span>)}
                />
                <div className={style.tagsCont}>
                    <input className='form-control' type="text"
                           value={tagInput}
                           onFocus={tagsInputTouch}
                           onBlur={() => setShowTagList(false)}
                           onChange={tagsListChange}
                           placeholder={data?.tags?.length && data.tags.map(    a =>  a.tag )}
                    />
                    {showTagList && tagsList.length > 0 && tags.length + newTagsList.length < 9 &&
                    <div className={style.tagslist}>

                        {tagsList.map(a => {
                            return <TagItem key={a.value} value={a} addTag={addTag}/>
                        })}
                        <div
                            onMouseDown={addNewTagFunc}
                            className={style.tagslistitem + ' ' + style.addNewTag}>Add new tag "{tagInput}"</div>
                    </div>
                    }
                    {showTagList && tagsList.length === 0 && tags.length + newTagsList.length < 9 &&
                    <div className={style.tagslist}>
                        <div
                            onMouseDown={addNewTagFunc}
                            className={style.tagslistitem + ' ' + style.addNewTag}>Add new tag "{tagInput}"</div>
                    </div>
                    }
                </div>
                <div className={style.tagsTarget}>
                    {tags.length > 0 && tags.map(a=>{
                        return <DelTag key={a.value}
                                       tag={a} delTag={delTag} />
                    })}
                    {newTagsList.length > 0 && newTagsList.map(a=>{
                        return <DelTag key={a.value}
                                       tag={a} delTag={deleteNewTag} type='new' />
                    })}
                    {tags.length + newTagsList.length === 9 &&
                    <span style={{color:'red'}}>
                    (max 9 tags)
                </span>
                    }
                </div>
                <label className='form-check-label mt-4 d-block'>
                    Age limit:

                <input  type="text"
                        pattern="[0-9]*"
                        value={ageLimit}
                        onChange={inputAge}
                        className='form-control w-25'
                        placeholder='Age limit'
                />
                </label>

                <label className='form-check-label mt-4'>
                    <input type="checkbox"
                           defaultChecked={paid}
                           className='form-check-input'
                           id="flexCheckChecked"
                           onChange={(e) => {
                               setPaid(e.target.checked)
                           }}

                    /> Paid:
                </label>

                {paid ? (
                        <div>
                            <input className='form-control w-25' type="number" step='50' value={price} onChange={(e) => {
                                setPrice(e.target.value)
                            }}/>
                        </div>)
                    :
                    (
                        <div>

                        </div>
                    )
                }
                <Select
                    onChange={(selectedOption) => {
                        setFinished(selectedOption);
                    }}

                    value={finished}
                    className="basic-multi-select mt-4"
                    classNamePrefix="select"
                    options={[{value: false, label: 'not finished'},{value: true, label: 'finished'}]}
                    placeholder={data.finished ? 'finished' : 'not finished'}
                />

                <div className='d-flex justify-content-between mt-3'>
                    <button onClick={send} className='btn btn-success'>Save</button>

                    {data.chapters?.length === 0 ?
                        <ModalAccept
                            button={<button  className='btn btn-danger'> Delete </button>}
                            text= {'Are you sure you want to delete the book?'}
                            desc={'After deletion, it will be impossible to return the book! The book will be permanently deleted!'}
                            call={deleted}
                        />

                        :
                        <ModalInfo button={<button  className='btn btn-danger'> Delete</button>}
                                   text= {'Book cannot be deleted   '}
                                   desc={'The book has chapters! Delete them first!'}
                        />
                    }

                </div>
            </div>
        </div>
    );
};

export default EditBook;