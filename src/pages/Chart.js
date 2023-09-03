import React, { useCallback, useEffect, useState } from 'react'

import ReactEcharts from "echarts-for-react"; 
import axios from 'axios';
import { Option } from '../component/Option';
import { getlocalfun, setlocalfun } from '../component/LocalStorage';

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
    const [data, setData] = useState( getlocalfun("linechart") ||  {"ethereum" : [],   "dogecoin" : [], "solana" : [] }); 
    const [newpersonName, setNewpersonName ] = useState(getlocalfun("linechartAsset") || []);
    const [personName, setPersonName] = React.useState( getlocalfun("linechartAsset") || []);
        
    // ----------  here the function called  on select tag change  -------------
      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
       
        let personName = typeof value === 'string' ? value.split(',') : value ;

        if(personName.length > newpersonName.length){
          for(let i=0; i<personName.length; i++){
              getdatafun(personName[i]);
          }
          setNewpersonName(personName)
          setlocalfun("linechartAsset",personName)
       }else if(personName.length < newpersonName.length){
          for(let i=0; i<newpersonName.length; i++){
              if(!personName.includes(newpersonName[i])){
                 getdatafun(newpersonName[i]);
              }
          }
          setNewpersonName(personName);
          setlocalfun("linechartAsset",personName)
       }

        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
       
      // -----  Here the function for gettting all asset data from api ------------------------------------
    const getdatafun = (name)=>{
         return axios.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=365&interval=daily`).then((res)=>{
            //console.log("ress", res.data.prices);
             if(name == "ethereum" && data["ethereum"].length == 0 ){
              setData( {...data, ethereum : res.data.prices } );
              setlocalfun("linechart",{...data, ethereum : res.data.prices } );
             }else if(name == "ethereum" && data["ethereum"].length != 0){
              setData( {...data, ethereum : [] } ); 
                setlocalfun("linechart",{...data, ethereum : [] } )
             }
             else if(name == "dogecoin" && data["dogecoin"].length == 0 ){
                 setData({...data, dogecoin : res.data.prices });
                 setlocalfun("linechart",{...data, dogecoin : res.data.prices } )
             }else if(name == "dogecoin" && data["dogecoin"].length != 0){
              setData( {...data, dogecoin : [] } );  
              setlocalfun("linechart",{...data, dogecoin : [] })            
             }else if(name == "solana" && data["solana"].length == 0){
              setData({...data, solana : res.data.prices });
              setlocalfun("linechart",{...data, solana : res.data.prices })
             }
             else if(name == "solana" && data["solana"].length != 0){
                setData({...data, solana : []});
                setlocalfun("linechart",{...data, solana : []})
             }     
             
         }).catch((err)=>{
           console.log('err', err);
         })
    }


  return (
    <div>
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-checkbox-label">Asset</InputLabel>
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
       <h2>
      {
           Object.entries(data).filter((e)=>{
            if(e[1].length != 0){
                return true;
            }
        }).length == 0 ? "Please select asset" : ""
      }
      </h2>
     
    </div>
  )
}

export default Chart