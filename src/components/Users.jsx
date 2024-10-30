import React,{useState} from 'react'
import CustomDropDown from './CustomDropDown'
import CustomSidebar from './CustomSidebar';

import '../App.css'

function Users() {
// const data=['abc','abc','abc','abc']
const [selectedOption, setSelectedOption] = useState('');

const handleOptionChange = (value) => {
  setSelectedOption(value);
};

const options = [
   {label:'first',value:1,image:'https://cdn-icons-png.flaticon.com/512/147/147142.png' },
{label:'Option 2',value:[2,3,4,5,6]},
  { label: 'Option 3', value: 3,image:'https://cdn-icons-png.flaticon.com/512/147/147142.png' },
  { label: 'Flipkart', value:4 ,image:'https://www.citypng.com/public/uploads/preview/flipkart-logo-icon-hd-png-701751694706828v1habfry9b.png',link:'https://www.flipkart.com/'},

];


const sidebar=[
  {label:'Home',value:'Home'},
  {label:'Services',value:['App Development','Cloud Management','Website Development']},
  {label:'About Us',value:'About Us Page'},
  {label:'Contact Us',value:'Contact Us Page'},
  {label:'Logout',value:'Logout '}
]

    return (
    <div    >
<h2>Users</h2>

<CustomDropDown options={options} selectedValue={selectedOption}  onChange={handleOptionChange} label="Select a option" />
<br /><br />
<CustomSidebar values={sidebar}/>
    </div>
  )
}

export default Users