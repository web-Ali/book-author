import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {addBook} from "../../../../http/booksAPI";
import Select from "react-select";
import style from "./AddBook.module.css";
import {BOOK_ROUTE} from "../../../../routing/consts";
import TagItem from "./TagItem";
import DelTag from "./DelTag";


const AddBook = (props) => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [ageLimit, setAgeLimit] = useState("");
    const [description, setDescription] = useState("");
    // const [file, setFile] = useState("");
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState(0);
    const [tagInput, setTagInput] = useState('');
    const [showTagList, setShowTagList] = useState(false);
    const [paid, setPaid] = useState(false);

    const history = useHistory();

    const typeList = [];
    const genreList = [];
    const [tagsList, setTagsList] = useState([]);
    const tagsListMain = [];
    let newTagsList = [];


    if (props.props?.bookForms) {
        props.props.bookForms.map((a) => {
            typeList.push({value: a.pk, label: a.form})
        })
    }
    if (props.props?.genres) {
        props.props.genres.map((a) => {
            genreList.push({value: a.pk, label: a.genre})
        })
    }
    if (props.props?.tags) {
        props.props.tags.map((a) => {
            tagsListMain.push({value: a.pk, label: a.tag})
        })
    }
    if (props?.newTags) {
        props.newTags.map((a) => {

            newTagsList.push({value: a.id, label: a.tag})
            newTagsList = newTagsList.filter(
                (thing, index, self) =>
                    self.findIndex((t) => t.value === thing.value && t.tag === thing.tag) === index
            )
        })
    }else{
        newTagsList= []
    }


    const onSubmit = async () => {
        setMsg('');
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
        }
        formData.name = name;
        formData.age_limit = ageLimit;
        formData.form = type.value;
        formData.description = description;
        try {
            let response = await addBook(formData);
            if (response.status === 201) {
                props.cleanNewTag()
                history.push(BOOK_ROUTE + '/' + response.data.id)
            }
        } catch (e) {
            console.log(e.response.data)
            for (let key in e.response.data) {
                setMsg(key + ': ' + e.response.data[key])
            }
        }
    };

    const tagsListChange = (e) => {
        setTagInput(e.target.value)
        let tempTagList = tagsListMain.filter(i =>
            i.label.toLowerCase().includes(e.target.value.toLowerCase())
        )

        for (let i=0; i < tags.length; i++){
            removeByAttr(tempTagList, 'value', tags[i].value);
        }
        // const results = tempTagList.filter(({ value: id1 }) => !tagsList.some(({ value: id2 }) => id2 === id1));

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
    const addNewTag = () =>{
        try {
            let tagData = new FormData();
            tagData.append('tag',tagInput)
            props.addTag(tagData);
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
        props.delNewTag(tag);
        setTagInput('')
    }
    const inputAge = (e)=>{
         setAgeLimit(prev => e.target.validity.valid && (e.target.value.length < 3) ? e.target.value : prev)
    }
    return (
        <div className={style.wrapper}>
            <h4 className='text-danger'>{msg}</h4>
            <Select
                onChange={(selectedOption) => {
                    setType(selectedOption);
                }}
                value={type}
                className="basic-multi-select"
                classNamePrefix="select"
                options={typeList}
                placeholder='select book form'
            />

            <input onChange={(e) => setName(e.target.value)} value={name} className='form-control mb-3 mt-3' type="text"
                   placeholder="name" name='name'/>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='form-control mb-3'
                      style={{height: 200}} placeholder="description" name='description'/>
            {/*<input onChange={(e) => setFile(e.target.files[0])}  className='form-control mb-3' type="file" placeholder="cover"  />*/}

            <Select
                onChange={(selectedOption) => {
                    setGenre(selectedOption);
                }}
                value={genre}
                isMulti
                className="basic-multi-select mb-3"
                classNamePrefix="select"
                options={genreList}
                placeholder='select genre'
            />
            <div className={style.tagsCont}>
                <input className='form-control' type="text" value={tagInput} placeholder='add tags'
                       onFocus={tagsInputTouch}
                       onBlur={() => setShowTagList(false)}
                       onChange={tagsListChange}/>
                {showTagList && tagsList.length > 0 && tags.length + newTagsList.length < 9 &&
                <div className={style.tagslist}>

                    {tagsList.map(a => {
                        return <TagItem key={a.value} value={a} addTag={addTag}/>
                    })}
                    <div
                        onMouseDown={addNewTag}
                        className={style.tagslistitem + ' ' + style.addNewTag}>Add new tag "{tagInput}"</div>
                </div>
                }
                {showTagList && tagsList.length === 0 && tags.length + newTagsList.length < 9 &&
                <div className={style.tagslist}>
                    <div
                        onMouseDown={addNewTag}
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

            <input
                type="text"
                pattern="[0-9]*"
                value={ageLimit}
                onChange={inputAge}
                className='form-control mt-3'
                placeholder='Age limit'
            />

            <label className='form-check-label mt-4'>
                <input type="checkbox"
                       checked={paid}
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


            <button onClick={onSubmit} className='btn btn-dark w-100 mb-5 mt-3   '>Add</button>

        </div>
    );
};

export default AddBook;