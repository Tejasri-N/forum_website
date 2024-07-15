import {React,useEffect,useState} from "react";
import ThemeToggleButton from "../components/ThemeToggleButton";

function UserProfile() {
  const name = JSON.parse(localStorage.getItem("user"))

  const [dp,setDp] = useState(null)

  useEffect(() => {
    getDp();
  },[])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async() => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setDp(base64String);
      // localStorage.setItem("dp", base64String); // Store in local storage
      const user = name.username
      try {
        await fetch(`http://localhost:3000/profileApi/saveDp/${user}`,{
          method : "PUT",
          headers: { "Content-Type": "application/json" },
          body : JSON.stringify({base64String})
        })
        .then(response => response.json())
        .then(async(data) => {
          if(data.status === "ok"){
            alert("Updated your dp successfully")  
          }else{
            alert("Cannot able to change the dp, please try again later")
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
      });
      // console.log("entered")
      } catch (error) {
        console.error(error.message);
        alert("An error occured please try again later")
      }
    };
    reader.readAsDataURL(file);
  };

  const getDp = async()=>{
    const user = name.username
    try {
      // console.log(user)
      await fetch(`http://localhost:3000/profileApi/showDp/${user}`)
      .then(response => response.json())
      .then(data => {
        if(data.msg != null){
          setDp(data.msg)   
        }else{
          alert("Error!")
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });
    } catch (error) {
      console.error(error.message);
      alert("An error occured please try again later")
    } 
  }

  const [bio,setBio] = useState({
    text : "Hello world"
  })

  const [newbio, setNewbio] = useState()

  useEffect(() => {
    getBio();
    setNewbio();
  },[])

  const editBio = (e) =>{
    const inputValue = e.target.value;
    setBio({
      text : inputValue,
    });
  }

  const saveBio = async() => {
    const user = name.username
    const data = bio
    try {

      await fetch(`http://localhost:3000/profileApi/saveBio/${user}`,{
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data}),
      })
      .then(response => response.json())
      .then(async(data) => {
        if(data.status === "ok"){
          alert("Updated your bio successfully")  
        }else{
          alert("Cannot able to change the bio, please try again later")
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });
    // console.log("entered")
    } catch (error) {
      console.error(error.message);
      alert("An error occured please try again later")
    }    
    getBio();
  }

  const getBio = async() =>{
    const user = name.username
    try {
      // console.log(user)
      await fetch(`http://localhost:3000/profileApi/showBio/${user}`)
      .then(response => response.json())
      .then(data => {
        if(data.msg != null){
          // console.log(data.msg)
          setNewbio(data.msg)   
        }else{
          alert("Error!")
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });
    } catch (error) {
      console.error(error.message);
      alert("An error occured please try again later")
    } 
    
  }

  const[editZoom,setEditZoom] = useState(false)

  const onEditZoom = () =>{
    if(!editZoom) setEditZoom(true)
    else setEditZoom(false)
  }

  const[zoom, setZoom] = useState(false)

  const onZoom = () =>{
    if(!zoom){
      setZoom(true)
    }else{
      setZoom(false);
    }
  }

  return (
    <div className="p-4 my-4 mx-4 dark:bg-black dark:text-white">
      <div className="mb-4">
        <div className="flex justify-center">
          <div className="flex justify-center rounded-full w-[9%] h-[17vh]">
            <img src={`data:image/png;base64,${dp}`} width={126} className="rounded-full"
                onClick={onZoom} alt="Profile Picture"></img>
            {(!zoom) ? (
              <></>
            ) : (
              <div className="fixed top-0 left-0 w-full h-full bg-overlay-bg z-overlay block" onClick={onZoom}>
                <div className="flex items-center justify-center h-full">
                {dp && (
                  <img
                    src={`data:image/png;base64,${dp}`}
                    alt="Profile Picture"
                    width={300}
                    height={100}
                  />
                )}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="m-2">Name : {name.username}</p>
        <p className="m-2">Email : {name.email}</p>
        <p className="m-2 pb-3">Bio : {newbio}</p>
        <div className="bg-blue-500 text-white px-2 py-1 border border-blue-700 rounded mt-2 w-[11%]">
          <input 
            type="file" 
            id="inputImage" 
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label className="cursor-pointer" htmlFor="inputImage">Change Profile Pic</label>
        </div>
        <div><h1 className="text-red-500">
          <b>NOTE : THE PROFILE PIC SIZE MUST BE WITHIN 600px X 600px</b></h1>
        </div>
        <br/>
        <input 
          type="button" 
          value="Update Bio" 
          className="bg-blue-500 text-white px-2 py-1 border border-blue-700 rounded mt-2" 
          onClick={onEditZoom}
        />
        {(!editZoom) ? (
            <></>
          ) : (
            <div className="fixed top-0 left-0 w-full h-full bg-overlay-bg z-overlay ">
              <div className="flex flex-col items-center justify-center h-full ">
                <textarea
                  type= "text"
                  className="font-normal w-[50%] h-[20%] p-2 dark:text-black"
                  placeholder="Enter your bio here"
                  value={bio.text}
                  onChange={editBio}
                />
                <input 
                  type="button" 
                  value="Update Bio" 
                  className="bg-blue-500 text-white px-2 py-1 border border-blue-700 rounded mt-2
                    dark:text-black"
                  onClick={() =>{onEditZoom(); saveBio();}} 
                />
              </div>
            </div>
          )}
      </div>
      <div className="-ml-4">
        <ThemeToggleButton/>
      </div>
      <div className="m-2">
        <p className="my-4">Number of Posts posted : </p>
        <p className="my-4">Number of Posts answered :</p>
      </div>
      
    </div>
  );
}

export default UserProfile;