import { useState } from 'react';
import * as XLSX from 'xlsx';
import Tableval from "./screens/province";
//import './App.css';
import './styles/App.css';
import BarChart from './screens/province/Barchart';
export default function ExcelData_handling(){
    
// onchange states
const [excelFile, setExcelFile] = useState(null);
const [typeError, setTypeError] = useState(null);

// submit state
const [excelData, setExcelData] = useState(null);
const [barchart,  setbarchartData] = useState(null);

// onchange event
const handleFile=(e)=>{
  let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
  let selectedFile = e.target.files[0];
  if(selectedFile){
    if(selectedFile&&fileTypes.includes(selectedFile.type)){
      setTypeError(null);
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload=(e)=>{
        setExcelFile(e.target.result);
      }
    }
    else{
      setTypeError('Please select only excel file types');
      setExcelFile(null);
    }
  }
  else{
    console.log('Please select your file');
  }
}

// submit event
const handleFileSubmit=(e)=>{
  e.preventDefault();
  if(excelFile!==null){
    const workbook = XLSX.read(excelFile,{type: 'buffer'});
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    console.log("data: ", data);
    //setExcelData(data.slice(0,10));
    //setExcelData(data);

    /***********************************TEST */
   // Create a dictionary to store postal code-wise data
const postalCodeData = {};

// Iterate through the Excel data and organize it by postal code
data.forEach((item) => {
  let postalCodeFSA = item["Postal Code FSA"].replace(/\s/g, ''); // Remove spaces from postal code
  const completedJobs = parseInt(item["Completed Jobs"]);
  const completedRevenue = parseFloat(item["Completed Revenue"]);
  const city = item["Location City"].replace(/\s/g, '');

  if (!isNaN(completedJobs) && !isNaN(completedRevenue)) {
    if (!postalCodeData[postalCodeFSA]) {
      postalCodeData[postalCodeFSA] = {
        totalCompletedJobs: 0,
        totalCompletedRevenue: 0,
        numberOfLocations: 0,
        city:'',
        locations: [] // Store location details for this postal code
      };
    }

    // Store location details for this postal code
    postalCodeData[postalCodeFSA].locations.push({
      address: item["Location Address"],
      street: item["Location Street"],
      city: item["Location City"],
      postalCodeFSA: postalCodeFSA, // Use the cleaned postal code
      postalCodeNAN: item["Postal Code NAN"]
    });

    // Update values for this postal code
    postalCodeData[postalCodeFSA].totalCompletedJobs += completedJobs;
    postalCodeData[postalCodeFSA].totalCompletedRevenue += completedRevenue;
    postalCodeData[postalCodeFSA].numberOfLocations++;
    postalCodeData[postalCodeFSA].city = city;
  }
});

// Calculate the average and Average Revenue Per Job for each postal code
for (const postalCodeFSA in postalCodeData) {
  const totalCompletedJobs = postalCodeData[postalCodeFSA].totalCompletedJobs;
  const totalCompletedRevenue = postalCodeData[postalCodeFSA].totalCompletedRevenue;
  const numberOfLocations = postalCodeData[postalCodeFSA].numberOfLocations;

  postalCodeData[postalCodeFSA].averageCompletedJobs = totalCompletedJobs / numberOfLocations;
  postalCodeData[postalCodeFSA].averageCompletedRevenue = totalCompletedRevenue / numberOfLocations;
  postalCodeData[postalCodeFSA].averageRevenuePerJob = totalCompletedRevenue / totalCompletedJobs;

}

//...........Test2start:
// Convert postalCodeData to an array of objects
const postalCodeArray = Object.keys(postalCodeData).map((postalCodeFSA) => ({
  postalCodeFSA,
  ...postalCodeData[postalCodeFSA],
}));

// Sort the array by totalCompletedRevenue in descending order
postalCodeArray.sort((a, b) => b.totalCompletedRevenue - a.totalCompletedRevenue);

// Convert the sorted array back into a dictionary (object)
const sortedPostalCodeData = {};
postalCodeArray.forEach((item) => {
  sortedPostalCodeData[item.postalCodeFSA] = item;
});
// Get the top 10 values with postal codes
// Convert the sorted array back into a dictionary (object)
const top10CompletedRevenue = {};
let i = 0;

for (const item of postalCodeArray) {
  top10CompletedRevenue[item.postalCodeFSA] = item;
  i++;
  if (i > 10) {
    break;
  }
}
console.log(top10CompletedRevenue);
//.............test2end

const postalCodeDataArray = [];
const barchartdata ={
    'x': [],
    'Y': []
};
//...
for (const postalCodeFSA in top10CompletedRevenue) {
  barchartdata.x.push(postalCodeFSA);
  barchartdata.Y.push((top10CompletedRevenue[postalCodeFSA].totalCompletedRevenue).toFixed(1));
}
//...
for (const postalCodeFSA in sortedPostalCodeData) {
    postalCodeDataArray.push({
        'Postal Code FSA': postalCodeFSA,
        'City': sortedPostalCodeData[postalCodeFSA].city,
        'Completed # of Jobs': sortedPostalCodeData[postalCodeFSA].totalCompletedJobs,
        'Completed Revenue':sortedPostalCodeData[postalCodeFSA].totalCompletedRevenue.toLocaleString('en-CA', {
            style: 'currency',
            currency: 'CAD',
          }),
        ' Average Revenue Per Job' : sortedPostalCodeData[postalCodeFSA].averageRevenuePerJob.toLocaleString('en-CA', {
            style: 'currency',
            currency: 'CAD',
          })
    })
}
setExcelData(postalCodeDataArray);
setbarchartData(barchartdata);
    /***********************************ENDTEST */

  }
}
return(
<div className="wrapper">
{
  excelData ?
  (<Tableval
    data = {excelData}
    />) 
    :
    (<div>No File is uploaded yet!</div>)
}

{
  barchart?
  (<BarChart
    data = {barchart}
    />) 
    :
    (<div></div>)
}


      <h3>Upload & View Excel Sheets</h3>
      {/* form */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {typeError&&(
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>
    </div>
       );
    }