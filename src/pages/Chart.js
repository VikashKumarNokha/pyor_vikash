import React, { useEffect, useState } from 'react'

import ReactEcharts from "echarts-for-react"; 
import axios from 'axios';
import { Option } from '../component/Option';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "ethereum",
  "dogecoin",
  "solana"
];



function Chart() {
    const [data, setData] = useState({"ethereum" : [],   "dogecoin" : [], "solana" : [] });
    
    const [newpersonName, setNewpersonName ] = useState([]);
    const [personName, setPersonName] = React.useState([]);
      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };


    const getdatafun = (name)=>{
         return axios.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=365&interval=daily`).then((res)=>{
            //console.log("ress", res.data.prices);
             if(name == "ethereum" && data["ethereum"].length == 0 ){
              setData( {...data, ethereum : res.data.prices } );
             }else if(name == "ethereum" && data["ethereum"].length != 0){
              setData( {...data, ethereum : [] } );   
             }
             else if(name == "dogecoin" && data["dogecoin"].length == 0 ){
                 setData({...data, dogecoin : res.data.prices });
             }else if(name == "dogecoin" && data["dogecoin"].length != 0){
              setData( {...data, dogecoin : [] } );              
             }else if(name == "solana" && data["solana"].length == 0){
              setData({...data, solana : res.data.prices });
             }
             else if(name == "solana" && data["solana"].length != 0){
                setData({...data, solana : []})
             }     
             
         }).catch((err)=>{
           console.log('err', err);
         })
    }
    
     useEffect(()=>{
       
        if(personName.length > newpersonName.length){
           for(let i=0; i<personName.length; i++){
               getdatafun(personName[i]);
           }
           setNewpersonName(personName)
        }else{
           for(let i=0; i<newpersonName.length; i++){
               if(!personName.includes(newpersonName[i])){
                  getdatafun(newpersonName[i]);
               }
           }
           setNewpersonName(personName);
        }
       
     },[personName]);

     console.log("dda", data)
  
  
  
   console.log("pp",personName)

  return (
    <div>
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {
         Object.entries(data).map((e)=>{
             if(e[1].length != 0){
                 return  <ReactEcharts option={Option( e[0] , e[1])} />
             }
         })
      }
     

    </div>
  )
}

export default Chart