import React from 'react'

const FormPractice = () => {
    const [toggle,setToggle]= React.useState(false);
    function handleToggle(){
      setToggle(prevVal=>!prevVal);
    }
    console.log(toggle);
    function handleSubmit(formData){
        const name = formData.get("name");
        console.log(name);
    }
  return (
    <form action={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        <button onClick={handleToggle}>submit</button>
    </form>
  )
}

export default FormPractice