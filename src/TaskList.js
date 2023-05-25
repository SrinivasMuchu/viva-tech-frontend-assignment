import React, { useState } from "react";
import * as XLSX from "xlsx";
import './TaskList.css'

function Taskmanagement() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [saveInput1, setSaveInput1] = useState("");
  const [saveInput2, setSaveInput2] = useState("");
  const [saveInput3, setSaveInput3] = useState("");
  const [editIndex1, setEditIndex1] = useState(-1);
  const [editIndex2, setEditIndex2] = useState(-1);
  const [editIndex3, setEditIndex3] = useState(-1);

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleInput3Change = (event) => {
    setInput3(event.target.value);
  };

  const handleInput1Add = () => {
    setList1([...list1, input1]);
    setInput1("");
  };

  const handleInput2Add = () => {
    setList2([...list2, input2]);
    setInput2("");
  };

  const handleInput3Add = () => {
    setList3([...list3, input3]);
    setInput3("");
  };

  const handleInput1Edit = (index) => {
    setSaveInput1(list1[index]);
    setEditIndex1(index);
  };

  const handleInput2Edit = (index) => {
    setSaveInput2(list2[index]);
    setEditIndex2(index);
  };

  const handleInput3Edit = (index) => {
    setSaveInput3(list3[index]);
    setEditIndex3(index);
  };

  const handleInput1Save = () => {
    const updatedList = [...list1];
    updatedList[editIndex1] = saveInput1;
    setList1(updatedList);
    setSaveInput1("");
    setEditIndex1(-1);
  };

  const handleInput2Save = () => {
    const updatedList = [...list2];
    updatedList[editIndex2] = saveInput2;
    setList2(updatedList);
    setSaveInput2("");
    setEditIndex2(-1);
  };

  const handleInput3Save = () => {
    const updatedList = [...list3];
    updatedList[editIndex3] = saveInput3;
    setList3(updatedList);
    setEditIndex3("");
    setEditIndex3(-1);
  };

  const handleInput1Delete = (index) => {
    const updatedList = [...list1];
    updatedList.splice(index, 1);
    setList1(updatedList);
  };

  const handleInput2Delete = (index) => {
    const updatedList = [...list2];
    updatedList.splice(index, 1);
    setList2(updatedList);
  };

  const handleInput3Delete = (index) => {
    const updatedList = [...list3];
    updatedList.splice(index, 1);
    setList3(updatedList);
  };


  const handleMove = (index, sourceList, targetList) => {
    let itemToMove;
    if (sourceList === "list1") {
      itemToMove = list1[index];
      setList1((prevList) => prevList.filter((_, i) => i !== index));
    } else if (sourceList === "list2") {
      itemToMove = list2[index];
      setList2((prevList) => prevList.filter((_, i) => i !== index));
    } else if (sourceList === "list3") {
      itemToMove = list3[index];
      setList3((prevList) => prevList.filter((_, i) => i !== index));
    }

    if (targetList === "list1") {
      setList1([...list1, itemToMove]);
    } else if (targetList === "list2") {
      setList2([...list2, itemToMove]);
    } else if (targetList === "list3") {
      setList3([...list3, itemToMove]);
    }
  };


  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Create worksheet for List 1
    const worksheet1 = XLSX.utils.json_to_sheet(
      list1.map((item, index) => ({ Index: index + 1, Value: item }))
    );
    XLSX.utils.sheet_add_aoa(worksheet1, [["Index", "Value"]], { origin: "A1" });

    // Create worksheet for List 2
    const worksheet2 = XLSX.utils.json_to_sheet(
      list2.map((item, index) => ({ Index: index + 1, Value: item }))
    );
    XLSX.utils.sheet_add_aoa(worksheet2, [["Index", "Value"]], { origin: "A1" });

    // Create worksheet for List 3
    const worksheet3 = XLSX.utils.json_to_sheet(
      list3.map((item, index) => ({ Index: index + 1, Value: item }))
    );
    XLSX.utils.sheet_add_aoa(worksheet3, [["Index", "Value"]], { origin: "A1" });

    // Add worksheets to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet1, "List 1");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "List 2");
    XLSX.utils.book_append_sheet(workbook, worksheet3, "List 3");

    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, "task_management.xlsx");
  };

  return (
    <div className="todolist">
      <h1 className="heading">VIVA-TECH ASSIGNMENT</h1>
      <h3 className="sub-heading">Task Managaement</h3>
      <div className="addingtext">
      <div className="addlist1">
        <h2 style={{color:"black"}}>List 1</h2>
        <input type="text" value={input1} onChange={handleInput1Change} placeholder="Enter a task to add in list 1" /><br/>
        <button onClick={handleInput1Add}>Add</button>

      </div>
      <div className="addlist2">
        <h2 className="h2-head" style={{color:"black"}}>List 2</h2>
        <input type="text" value={input2} onChange={handleInput2Change} placeholder="Enter a task to add in list 2" /><br/>
        <button onClick={handleInput2Add}>Add</button>

      </div>
      <div className="addlist3">
        <h2 style={{color:"black"}}>List 3</h2>
        <input type="text" value={input3} onChange={handleInput3Change} placeholder="Enter a task to add in list 3" /><br/>
        <button onClick={handleInput3Add}>Add</button>
        
      </div>
      </div>
      
      <div className="lists">
        
        <div className="list1">
        <h1 className="h1-con">List - 1</h1>
        <ul>
          {list1.map((item, index) => (
            <li key={index} style={{listStyle:"none"}}>
              {editIndex1 === index ? (
                <div>
                  <input 
                  className="save-inp"
                    type="text"
                    value={saveInput1}
                    onChange={(e)=>setSaveInput1(e.target.value)}
                    placeholder="Value"
                  />
                  <button onClick={handleInput1Save} className="save">Save</button>
                  <button onClick={() => handleInput1Delete(index)} className="delete">Delete</button>
                  <select onChange={(e) => handleMove(index, "list1", e.target.value)}>
              <option value="">Move to List</option>
              <option value="list2">List 2</option>
              <option value="list3">List 3</option>
            </select>
                </div>
              ) : (
                <div>
                 <input value={item} disabled className="edit-inp"/>
                  <button onClick={() => handleInput1Edit(index)} className="edit">Edit</button>
                  <button onClick={() => handleInput1Delete(index)} className="delete">Delete</button>
                  <select onChange={(e) => handleMove(index, "list1", e.target.value)}>
              <option value="">Move to List</option>
              <option value="list2">List 2</option>
              <option value="list3">List 3</option>
            </select>
                </div>
              )}
            </li>
          ))}
        </ul>
        </div>
       
        <div className="list2">
        <h1 className="h1-con">List - 2</h1>
        <ul>
          {list2.map((item, index) => (
            <li key={index} style={{listStyle:"none"}}>
              {editIndex2 === index ? (
                <div>
                  <input
                  className="save-inp"
                    type="text"
                    value={saveInput2}
                    onChange={(e)=>setSaveInput2(e.target.value)}
                    placeholder="Value"
                  />
                  <button onClick={handleInput2Save} className="save">Save</button>
                  <button onClick={() => handleInput2Delete(index)} className="delete">Delete</button>
                  <select onChange={(e) => handleMove(index, "list2", e.target.value)}>
              <option value="">Move to List</option>
              <option value="list1">List 1</option>
              <option value="list3">List 3</option>
            </select>
                </div>
              ) : (
                <div>
                  <input value={item} disabled className="edit-inp"/>
                  <button onClick={() => handleInput2Edit(index)} className="edit">Edit</button>
                  <button onClick={() => handleInput2Delete(index)} className="delete">Delete</button>
                  <select onChange={(e) => handleMove(index, "list2", e.target.value)}>
              <option value="">Move to List</option>
              <option value="list1">List 1</option>
              <option value="list3">List 3</option>
            </select>
                </div>
              )}
            </li>
          ))}
        </ul>
        </div>
        
        <div className="list3">
        <h1 className="h1-con">List - 3</h1>
        <ul>
          {list3.map((item, index) => (
            <li key={index} style={{listStyle:"none"}}>
              {editIndex3 === index ? (
                <div>
                  <input
                  className="save-inp"
                    type="text"
                    value={saveInput3}
                    onChange={(e)=>setSaveInput3(e.target.value)}
                    placeholder="Value"
                  />
                  <button onClick={handleInput3Save} className="save">Save</button>
                  <button onClick={() => handleInput3Delete(index)} className="delete">Delete</button>
                  <select onChange={(e) => handleMove(index, "list3", e.target.value)} >
              <option value="">Move to List</option>
              <option value="list1">List 1</option>
              <option value="list2">List 2</option>
            </select>
                  
                </div>
              ) : (
                <div>
                  <input value={item} disabled className="edit-inp"/>
                  <button onClick={() => handleInput3Edit(index)} className="edit">Edit</button>
                  <button onClick={() => handleInput3Delete(index)} className="delete">Delete</button>
                  <select onChange={(e) => handleMove(index, "list3", e.target.value)} >
              <option value="">Move to List</option>
              <option value="list1">List 1</option>
              <option value="list2">List 2</option>
            </select>
                </div>
              )}
            </li>
          ))}
        </ul>
        </div>
      </div>
    

      
      <button onClick={exportToExcel} className="export-btn">Export to Excell</button>
    </div>
  );
}

export default Taskmanagement;
