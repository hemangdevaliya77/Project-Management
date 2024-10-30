import React,{useState} from 'react'
import CustomDropDown from './CustomDropDown'
import CustomSidebar from './CustomSidebar';
import './customcss/homeDropdown.css'

function Home() {
    const [selectedOption, setSelectedOption] = useState('');

const handleOptionChange = (value) => {
  setSelectedOption(value);
};

    const options=[
        {label:'user',value:'userPage',image:'https://cdn-icons-png.flaticon.com/512/149/149071.png'},
        {label:'task',value:'taskPage',image:'https://media.istockphoto.com/id/1256489977/vector/tasks-check-checklist-blue-icon.jpg?s=612x612&w=0&k=20&c=dUctYWRSmMz1uiSFCCcJUKOyeoxVbvPuLugf8CLQiSo='},
        {label:'logout',value:'logoutPage',image:'data:image/png;base64,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'},

    ]

    const sidebar=[
      {label:'Accounts',value:['test','jack','john','hemang']},
      {label:'HTML',value:['mmm','nnnn','jjjj','kkkkkk']},
      {label:'CSS',value:['wewe','rtrt','yuyu','opop']},
      {label:'close',value:'close'}
    ]
  return (
    <div >
    <h3>Home Page Compoenent</h3>


<CustomDropDown options={options} selectedValue={selectedOption}  onChange={handleOptionChange} ishome={true}/>
<br /><br />
<CustomSidebar values={sidebar}/>
    </div>
  )
}

export default Home